import { createClient } from '@supabase/supabase-js';
import { createInterface } from 'node:readline/promises';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

const targets = [
  'his/yotaabo.png',
  'hers/her.png',
  ...Array.from({ length: 6 }, (_, i) => `his/${i + 1}.png`),
];

try {
  const email = await rl.question('Admin email: ');
  const password = await rl.question('Admin password: ');

  const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
  if (loginError) throw loginError;

  const remaining = [];

  for (const folder of ['his', 'hers']) {
    const { data, error } = await supabase.storage.from('products').list(folder, { limit: 1000 });
    if (error) throw error;

    for (const item of data ?? []) {
      const path = `${folder}/${item.name}`;
      if (targets.includes(path)) remaining.push(path);
    }
  }

  if (remaining.length === 0) {
    console.log('\nPASS: All 8 old images are absent from the products bucket.');
  } else {
    console.log(`\nWARNING: ${remaining.length} old image(s) remain:`);
    remaining.forEach(path => console.log(`  ${path}`));
  }

  await supabase.auth.signOut();
} catch (error) {
  console.error('\nVerification failed:', error.message);
  process.exitCode = 1;
} finally {
  rl.close();
}
