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

  assert.ok(error, 'Expected operation to fail.');
  assert.match(error.message, pattern);
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

    const stores = await client.query(`
      SELECT id, slug FROM public.stores
      WHERE slug IN ('yotaabo', 'poshies')
    `);

    const store = Object.fromEntries(
      stores.rows.map((row) => [row.slug, row])
    );

    assert.ok(store.yotaabo);
    assert.ok(store.poshies);

    const category = await client.query(`
      SELECT id, store_id
      FROM public.categories
      WHERE store_id = $1 AND name = 'His'
    `, [store.yotaabo.id]);

    assert.equal(category.rowCount, 1);

    const categoryId = category.rows[0].id;

    const subcategory = await client.query(`
      SELECT id
      FROM public.subcategories
      WHERE category_id = $1 AND name = 'Deodorant'
    `, [categoryId]);

    assert.equal(subcategory.rowCount, 1);

    const subcategoryId = subcategory.rows[0].id;

    const tests = [];

    const test = async (name, fn) => {
      await fn();
      tests.push(name);
      console.log(`PASS ${name}`);
    };

    await client.query('BEGIN');

    await test('Category names are unique within each store', async () => {
      const result = await client.query(`
        SELECT s.slug, COUNT(c.id)::int AS count
        FROM public.stores s
        JOIN public.categories c ON c.store_id = s.id
        WHERE c.name = 'His'
        GROUP BY s.slug
      `);

      assert.equal(result.rowCount, 2);
      assert.ok(result.rows.every((row) => row.count === 1));

      await expectFailure(
        client,
        `INSERT INTO public.categories (store_id, name, slug)
         VALUES ($1, 'His', 'duplicate-his')`,
        [store.yotaabo.id],
        /duplicate|unique/i
      );
    });

    await test('Category slugs are unique within each store', async () => {
      await expectFailure(
        client,
        `INSERT INTO public.categories (store_id, name, slug)
         VALUES ($1, 'Integration Duplicate Slug', 'his')`,
        [store.yotaabo.id],
        /duplicate|unique/i
      );
    });

    await test('Invalid category slugs are rejected', async () => {
      await expectFailure(
        client,
        `INSERT INTO public.categories (store_id, name, slug)
         VALUES ($1, 'Invalid Slug Test', 'Invalid Slug!')`,
        [store.yotaabo.id],
        /categories_slug_valid|check constraint/i
      );
    });

    await test('Duplicate subcategory names are rejected within a category', async () => {
      await expectFailure(
        client,
        `INSERT INTO public.subcategories (
           store_id, category_id, name, slug
         )
         VALUES ($1, $2, 'Deodorant', 'duplicate-deodorant')`,
        [store.yotaabo.id, categoryId],
        /duplicate|unique/i
      );
    });

    await test('Subcategory names can be reused in another category', async () => {
      const newCategory = await client.query(`
        INSERT INTO public.categories (store_id, name, slug)
        VALUES ($1, 'Integration Temporary', 'integration-temporary')
        RETURNING id
      `, [store.yotaabo.id]);

      const newCategoryId = newCategory.rows[0].id;

      const result = await client.query(`
        INSERT INTO public.subcategories (
          store_id, category_id, name, slug
        )
        VALUES ($1, $2, 'Deodorant', 'deodorant')
        RETURNING name
      `, [store.yotaabo.id, newCategoryId]);

      assert.equal(result.rows[0].name, 'Deodorant');
    });

    await test('A category with subcategories cannot be deleted', async () => {
      await expectFailure(
        client,
        `DELETE FROM public.categories WHERE id = $1`,
        [categoryId],
        /foreign key|violates/i
      );
    });

    await test('A subcategory referenced by products cannot be deleted', async () => {
      const product = await client.query(`
        SELECT id
        FROM public.products
        WHERE category_id = $1 AND subcategory_id = $2
        LIMIT 1
      `, [categoryId, subcategoryId]);

      assert.equal(product.rowCount, 1, 'Product fixture missing.');

      await expectFailure(
        client,
        `DELETE FROM public.subcategories WHERE id = $1`,
        [subcategoryId],
        /foreign key|violates/i
      );
    });

    console.log(`\n${tests.length}/7 category constraint tests passed.`);
  } finally {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('\nCATEGORY CONSTRAINT TEST FAILED');
  console.error(error);
  process.exitCode = 1;
});
