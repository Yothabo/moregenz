import assert from 'node:assert/strict';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: false,
  max: 1,
});

async function main() {
  if (!process.env.SUPABASE_DB_URL) {
    throw new Error('SUPABASE_DB_URL is required.');
  }

  const client = await pool.connect();
  let passed = 0;

  const test = async (name, fn) => {
    await fn();
    passed++;
    console.log(`PASS ${name}`);
  };

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
    await client.query(
      `SELECT set_config('app.actor_email', $1, true)`,
      ['integration-test@example.invalid']
    );

    const orderResult = await client.query(
      `INSERT INTO public.orders (
         order_number, customer_name, customer_phone,
         subtotal, status, storefront
       )
       VALUES ($1, $2, $3, $4, 'pending', 'yotaabo')
       RETURNING *`,
      [
        `IT-${Date.now()}`,
        'Integration Test Customer',
        '0000000000',
        250,
      ]
    );

    const order = orderResult.rows[0];

    const getEvents = async () => {
      const result = await client.query(
        `SELECT event_type, entity_type, entity_id,
                actor_email, description, metadata
         FROM public.admin_activity_log
         WHERE entity_type = 'order' AND entity_id = $1
         ORDER BY created_at, id`,
        [order.id]
      );

      return result.rows;
    };

    await test('Order creation records order.received', async () => {
      const events = await getEvents();
      const event = events.find((row) => row.event_type === 'order.received');

      assert.ok(event, 'Order received event missing.');
      assert.equal(event.entity_type, 'order');
      assert.equal(event.actor_email, null);
      assert.equal(event.metadata.order_number, order.order_number);
      assert.equal(event.metadata.storefront, 'yotaabo');
      assert.equal(event.metadata.status, 'pending');
      assert.equal(Number(event.metadata.subtotal), 250);
    });

    await test('Order status change records order.status_changed', async () => {
      await client.query(
        `UPDATE public.orders SET status = 'confirmed' WHERE id = $1`,
        [order.id]
      );

      const events = await getEvents();
      const event = events.find(
        (row) => row.event_type === 'order.status_changed'
      );

      assert.ok(event, 'Order status change event missing.');
      assert.equal(event.actor_email, 'integration-test@example.invalid');
      assert.equal(event.metadata.previous_status, 'pending');
      assert.equal(event.metadata.new_status, 'confirmed');
    });

    await test('Customer detail changes do not create order.updated events', async () => {
      await client.query(
        `UPDATE public.orders
         SET customer_name = 'Updated Test Customer',
             customer_phone = '0000000001'
         WHERE id = $1`,
        [order.id]
      );

      const events = await getEvents();

      assert.equal(
        events.filter((row) => row.event_type === 'order.updated').length,
        0
      );
    });

    await test('Order subtotal changes record order.updated', async () => {
      await client.query(
        `UPDATE public.orders SET subtotal = 300 WHERE id = $1`,
        [order.id]
      );

      const events = await getEvents();
      const event = events.find((row) => row.event_type === 'order.updated');

      assert.ok(event, 'Order update event missing.');
      assert.equal(Number(event.metadata.previous.subtotal), 250);
      assert.equal(Number(event.metadata.current.subtotal), 300);
      assert.equal(event.actor_email, 'integration-test@example.invalid');
    });

    await test('Order deletion records order.deleted', async () => {
      await client.query(
        `DELETE FROM public.orders WHERE id = $1`,
        [order.id]
      );

      const events = await getEvents();
      const event = events.find((row) => row.event_type === 'order.deleted');

      assert.ok(event, 'Order deletion event missing.');
      assert.equal(event.metadata.order_number, order.order_number);
      assert.equal(event.metadata.previous_status, 'confirmed');
      assert.equal(event.actor_email, 'integration-test@example.invalid');
    });

    console.log(`\n${passed}/5 order integration tests passed.`);
  } finally {
    await client.query('ROLLBACK').catch(() => {});
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('\nORDER INTEGRATION TEST FAILED');
  console.error(error);
  process.exitCode = 1;
});
