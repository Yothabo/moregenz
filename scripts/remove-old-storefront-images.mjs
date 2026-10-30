import { createClient } from '@supabase/supabase-js';
import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const url = process.env.VITE_SUPABASE_URL;
const key =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

const targets = [
  'his/yotaabo.png',
  'hers/her.png',
  'his/1.png',
  'his/2.png',
  'his/3.png',
  'his/4.png',
  'his/5.png',
  'his/6.png',
];

try {
  if (!url || !key) {
    throw new Error(
      'Missing VITE_SUPABASE_URL or Supabase publishable/anon key.'
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const email = await rl.question('Admin email: ');
  const password = await rl.question('Admin password: ');

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) throw loginError;

  console.log('\nChecking the specified objects...');

  const found = [];

  for (const prefix of ['his', 'hers']) {
    const { data, error } = await supabase.storage
      .from('products')
      .list(prefix, { limit: 1000 });

    if (error) throw error;

    for (const item of data ?? []) {
      const path = `${prefix}/${item.name}`;
      if (targets.includes(path)) found.push(path);
    }
  }

  if (found.length === 0) {
    console.log('None of the eight specified objects were found.');
    process.exitCode = 0;
  } else {
    console.log('\nObjects found in products:');
    found.forEach((path) => console.log(`  ${path}`));

    const confirm = await rl.question(
      `\nDelete these ${found.length} objects? Type DELETE to confirm: `
    );

    if (confirm !== 'DELETE') {
      console.log('Cancelled. Nothing was deleted.');
    } else {
      const { data, error } = await supabase.storage
        .from('products')
        .remove(found);

      if (error) throw error;

      console.log('\nRemoval completed. Objects reported removed:');
      for (const item of data ?? []) console.log(`  ${item.name}`);

      console.log('\nFinished.');
    }
  }

  await supabase.auth.signOut();
} catch (error) {
  console.error('\nFailed:', error.message ?? error);
  process.exitCode = 1;
} finally {
  rl.close();
}
