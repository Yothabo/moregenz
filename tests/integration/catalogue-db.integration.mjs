import assert from 'node:assert/strict';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: false,
  max: 1,
});

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

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

async function insertProduct(client, fixture, name) {
  const result = await client.query(
    `INSERT INTO public.products (
       name, price, category, subcategory,
       storefront, store_id, category_id, subcategory_id
     )
     VALUES ($1, 100, 'Incorrect', 'Incorrect',
             $2, $3, $4, $5)
     RETURNING *`,
    [
      name,
      fixture.storefront,
      fixture.store_id,
      fixture.category_id,
      fixture.subcategory_id,
    ]
  );

  return result.rows[0];
}

async function getEvents(client, productId) {
  const result = await client.query(
    `SELECT event_type, entity_type, entity_id,
            actor_email, description, metadata
     FROM public.admin_activity_log
     WHERE entity_type = 'product'
       AND entity_id = $1
     ORDER BY created_at, id`,
    [productId]
  );

  return result.rows;
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

    const fixtureResult = await client.query(`
      SELECT s.slug AS storefront,
             s.id AS store_id,
             c.id AS category_id,
             c.name AS category,
             sc.id AS subcategory_id,
             sc.name AS subcategory
      FROM public.stores s
      JOIN public.categories c
        ON c.store_id = s.id AND c.is_active
      JOIN public.subcategories sc
        ON sc.store_id = s.id
       AND sc.category_id = c.id
       AND sc.is_active
      WHERE
        (s.slug = 'yotaabo' AND c.name = 'His' AND sc.name = 'Deodorant')
        OR
        (s.slug = 'poshies' AND c.name = 'His' AND sc.name = 'Boxers')
    `);

    const fixtures = Object.fromEntries(
      fixtureResult.rows.map((row) => [row.storefront, row])
    );

    assert.ok(fixtures.yotaabo, 'Yotaabo fixture missing.');
    assert.ok(fixtures.poshies, 'Poshies fixture missing.');

    await client.query('BEGIN');
    await client.query(
      `SELECT set_config('app.actor_email', $1, true)`,
      ['integration-test@example.invalid']
    );

    // Catalogue relationship tests

    test('Yotaabo category IDs resolve canonical names', async () => {
      const product = await insertProduct(
        client, fixtures.yotaabo, 'Integration Yotaabo'
      );

      assert.equal(product.category, 'His');
      assert.equal(product.subcategory, 'Deodorant');
      assert.equal(product.storefront, 'yotaabo');
    });

    test('Poshies category IDs resolve canonical names', async () => {
      const product = await insertProduct(
        client, fixtures.poshies, 'Integration Poshies'
      );

      assert.equal(product.category, 'His');
      assert.equal(product.subcategory, 'Boxers');
      assert.equal(product.storefront, 'poshies');
    });

    test('Cross-store category references are rejected', async () => {
      await expectFailure(
        client,
        `INSERT INTO public.products (
           name, price, category, subcategory,
           storefront, store_id, category_id, subcategory_id
         )
         VALUES ('Cross-store test', 100, 'His', 'Boxers',
                 'yotaabo', $1, $2, $3)`,
        [
          fixtures.yotaabo.store_id,
          fixtures.poshies.category_id,
          fixtures.poshies.subcategory_id,
        ],
        /store|category|invalid|match/i
      );
    });

    test('Invalid subcategory references are rejected', async () => {
      await expectFailure(
        client,
        `INSERT INTO public.products (
           name, price, category, subcategory,
           storefront, store_id, category_id, subcategory_id
         )
         VALUES ('Invalid subcategory test', 100, 'His', 'Boxers',
                 'yotaabo', $1, $2, $3)`,
        [
          fixtures.yotaabo.store_id,
          fixtures.yotaabo.category_id,
          fixtures.poshies.subcategory_id,
        ],
        /subcategory|category|invalid|store/i
      );
    });

    test('Deactivating a category deactivates its subcategories', async () => {
      await client.query(
        `UPDATE public.categories SET is_active = FALSE WHERE id = $1`,
        [fixtures.yotaabo.category_id]
      );

      const result = await client.query(
        `SELECT COUNT(*)::int AS count
         FROM public.subcategories
         WHERE category_id = $1 AND is_active`,
        [fixtures.yotaabo.category_id]
      );

      assert.equal(result.rows[0].count, 0);
    });

    test('Active subcategories cannot belong to inactive categories', async () => {
      await expectFailure(
        client,
        `UPDATE public.subcategories SET is_active = TRUE WHERE id = $1`,
        [fixtures.yotaabo.subcategory_id],
        /active|inactive|category|parent/i
      );
    });

    test('Legacy Poshies Spaces resolves to Lounge', async () => {
      const result = await client.query(`
        SELECT c.id AS category_id, sc.id AS subcategory_id,
               sc.name AS subcategory
        FROM public.categories c
        JOIN public.stores s ON s.id = c.store_id
        JOIN public.subcategories sc
          ON sc.category_id = c.id AND sc.store_id = c.store_id
        WHERE s.slug = 'poshies'
          AND c.name = 'Lounge'
          AND sc.name = 'Lounge Sets'
          AND c.is_active AND sc.is_active
        LIMIT 1
      `);

      assert.equal(result.rowCount, 1);

      const fixture = result.rows[0];

      const inserted = await client.query(
        `INSERT INTO public.products (
           name, price, category, subcategory,
           storefront, store_id, category_id, subcategory_id
         )
         VALUES (
           'Legacy Spaces test', 100, 'Spaces', $1, 'poshies',
           (SELECT id FROM public.stores WHERE slug = 'poshies'),
           $2, $3
         )
         RETURNING category, subcategory`,
        [fixture.subcategory, fixture.category_id, fixture.subcategory_id]
      );

      assert.equal(inserted.rows[0].category, 'Lounge');
      assert.equal(inserted.rows[0].subcategory, 'Lounge Sets');
    });

    // Product activity audit tests

    let auditProduct;

    test('Product creation records product.created with actor and metadata', async () => {
      auditProduct = await insertProduct(
        client, fixtures.yotaabo, 'Audit integration product'
      );

      const events = await getEvents(client, auditProduct.id);
      const created = events.find((event) => event.event_type === 'product.created');

      assert.ok(created, 'Creation event missing.');
      assert.equal(created.entity_type, 'product');
      assert.equal(created.actor_email, 'integration-test@example.invalid');
      assert.equal(created.metadata.product_name, auditProduct.name);
      assert.equal(created.metadata.storefront, 'yotaabo');
      assert.equal(created.metadata.category, 'His');
      assert.equal(created.metadata.subcategory, 'Deodorant');
    });

    test('Product changes record product.updated with before and after values', async () => {
      await client.query(
        `UPDATE public.products SET price = 175 WHERE id = $1`,
        [auditProduct.id]
      );

      const events = await getEvents(client, auditProduct.id);
      const updated = events.find((event) => event.event_type === 'product.updated');

      assert.ok(updated, 'Update event missing.');
      assert.equal(Number(updated.metadata.previous.price), 100);
      assert.equal(Number(updated.metadata.current.price), 175);
      assert.equal(updated.actor_email, 'integration-test@example.invalid');
    });

    test('Hiding a product records product.hidden without duplicate update event', async () => {
      await client.query(
        `UPDATE public.products SET is_active = FALSE WHERE id = $1`,
        [auditProduct.id]
      );

      const events = await getEvents(client, auditProduct.id);

      assert.equal(
        events.filter((event) => event.event_type === 'product.hidden').length,
        1
      );

      assert.equal(
        events.filter((event) => event.event_type === 'product.updated').length,
        1
      );
    });

    test('Reactivating a product records product.reactivated', async () => {
      await client.query(
        `UPDATE public.products SET is_active = TRUE WHERE id = $1`,
        [auditProduct.id]
      );

      const events = await getEvents(client, auditProduct.id);

      assert.equal(
        events.filter((event) => event.event_type === 'product.reactivated').length,
        1
      );
    });

    test('Deleting a product records product.deleted', async () => {
      await client.query(
        `DELETE FROM public.products WHERE id = $1`,
        [auditProduct.id]
      );

      const events = await getEvents(client, auditProduct.id);
      const deleted = events.find((event) => event.event_type === 'product.deleted');

      assert.ok(deleted, 'Deletion event missing.');
      assert.equal(deleted.metadata.product_name, auditProduct.name);
      assert.equal(deleted.metadata.storefront, 'yotaabo');
      assert.equal(deleted.actor_email, 'integration-test@example.invalid');
    });

    let passed = 0;

    for (const { name, fn } of tests) {
      await fn();
      passed++;
      console.log(`PASS ${name}`);
    }

    console.log(`\n${passed}/${tests.length} database integration tests passed.`);
  } finally {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('\nDATABASE INTEGRATION TEST FAILED');
  console.error(error);
  process.exitCode = 1;
});
