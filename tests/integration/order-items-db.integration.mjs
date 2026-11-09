import assert from 'node:assert/strict';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: false,
  max: 1,
});

async function expectFailure(client, sql, values, pattern) {
  await client.query('SAVEPOINT expected_failure');

  let error;

  try {
    await client.query(sql, values);
  } catch (caught) {
    error = caught;
  }

  await client.query('ROLLBACK TO SAVEPOINT expected_failure');
  await client.query('RELEASE SAVEPOINT expected_failure');

  assert.ok(error, 'Expected database operation to fail.');
  assert.match(error.message, pattern);
}

async function createOrder(client, suffix) {
  const result = await client.query(
    `INSERT INTO public.orders (
       order_number, customer_name, customer_phone,
       subtotal, storefront
     )
     VALUES ($1, 'Integration Customer', '0000000000', 100, 'yotaabo')
     RETURNING id`,
    [`IT-ITEM-${suffix}-${Date.now()}`]
  );

  return result.rows[0].id;
}

async function main() {
  if (!process.env.SUPABASE_DB_URL) {
    throw new Error('SUPABASE_DB_URL is required.');
  }

  const client = await pool.connect();

  try {
    const identity = await client.query(`
      SELECT current_database() AS database,
             current_user AS db_user,
             inet_server_addr() AS server_address
    `);

    assert.equal(identity.rows[0].database, 'yotaabo_integration_test');
    assert.equal(identity.rows[0].db_user, 'thabo_test');
    assert.equal(identity.rows[0].server_address, null);

    console.log('Local database identity confirmed.');

    await client.query('BEGIN');

    const productResult = await client.query(`
      SELECT id, name, price
      FROM public.products
      WHERE storefront = 'yotaabo'
      LIMIT 1
    `);

    assert.equal(productResult.rowCount, 1, 'Yotaabo product fixture missing.');

    const product = productResult.rows[0];
    const passed = [];

    const test = async (name, fn) => {
      await fn();
      passed.push(name);
      console.log(`PASS ${name}`);
    };

    await test('Valid order item can be inserted', async () => {
      const orderId = await createOrder(client, 'VALID');

      const result = await client.query(
        `INSERT INTO public.order_items (
           order_id, product_id, product_name, unit_price, quantity
         )
         VALUES ($1, $2, $3, 100, 2)
         RETURNING *`,
        [orderId, product.id, product.name]
      );

      assert.equal(result.rows[0].order_id, orderId);
      assert.equal(result.rows[0].product_id, product.id);
      assert.equal(result.rows[0].quantity, 2);
      assert.equal(Number(result.rows[0].unit_price), 100);
    });

    await test('Zero quantity is rejected', async () => {
      const orderId = await createOrder(client, 'ZERO');

      await expectFailure(
        client,
        `INSERT INTO public.order_items (
           order_id, product_name, unit_price, quantity
         )
         VALUES ($1, 'Invalid quantity', 100, 0)`,
        [orderId],
        /order_items_quantity_check|check constraint/i
      );
    });

    await test('Negative unit price is rejected', async () => {
      const orderId = await createOrder(client, 'PRICE');

      await expectFailure(
        client,
        `INSERT INTO public.order_items (
           order_id, product_name, unit_price, quantity
         )
         VALUES ($1, 'Invalid price', -1, 1)`,
        [orderId],
        /order_items_unit_price_check|check constraint/i
      );
    });

    await test('Deleting a product preserves the order item and clears product_id', async () => {
      const orderId = await createOrder(client, 'PRODUCT-DELETE');

      const itemResult = await client.query(
        `INSERT INTO public.order_items (
           order_id, product_id, product_name, unit_price, quantity
         )
         VALUES ($1, $2, $3, 100, 1)
         RETURNING id`,
        [orderId, product.id, product.name]
      );

      const itemId = itemResult.rows[0].id;

      await client.query(
        `DELETE FROM public.products WHERE id = $1`,
        [product.id]
      );

      const result = await client.query(
        `SELECT product_id, product_name, quantity
         FROM public.order_items WHERE id = $1`,
        [itemId]
      );

      assert.equal(result.rowCount, 1);
      assert.equal(result.rows[0].product_id, null);
      assert.equal(result.rows[0].product_name, product.name);
      assert.equal(result.rows[0].quantity, 1);
    });

    await test('Deleting an order cascades to its order items', async () => {
      const orderId = await createOrder(client, 'CASCADE');

      const itemResult = await client.query(
        `INSERT INTO public.order_items (
           order_id, product_name, unit_price, quantity
         )
         VALUES ($1, 'Cascade test item', 50, 1)
         RETURNING id`,
        [orderId]
      );

      const itemId = itemResult.rows[0].id;

      await client.query(
        `DELETE FROM public.orders WHERE id = $1`,
        [orderId]
      );

      const result = await client.query(
        `SELECT id FROM public.order_items WHERE id = $1`,
        [itemId]
      );

      assert.equal(result.rowCount, 0);
    });

    console.log(`\n${passed.length}/5 order-item integration tests passed.`);
  } finally {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('\nORDER ITEM INTEGRATION TEST FAILED');
  console.error(error);
  process.exitCode = 1;
});
