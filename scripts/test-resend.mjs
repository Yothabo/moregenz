import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .map(line => {
      const index = line.indexOf('=');
      return [
        line.slice(0, index).trim(),
        line.slice(index + 1).trim()
      ];
    })
);

const apiKey = env.RESEND_API_KEY;
const from = env.RESEND_FROM_EMAIL;

if (!apiKey || !from) {
  console.error('Missing RESEND_API_KEY or RESEND_FROM_EMAIL.');
  process.exit(1);
}

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from,
    to: ['mpolosjams@gmail.com'],
    subject: 'Yotaabo | Resend email test',
    html: `
      <div style="font-family:Arial,sans-serif;padding:24px">
        <h2>Yotaabo</h2>
        <p>Your Resend email integration is working.</p>
        <p>This is a test of the transactional email service.</p>
      </div>
    `
  })
});

const result = await response.json();

if (!response.ok) {
  console.error('Resend rejected the request:', result);
  process.exit(1);
}

console.log('Test email accepted by Resend.');
console.log('Email ID:', result.id);
