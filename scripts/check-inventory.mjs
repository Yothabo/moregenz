import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [
  'docs/pilot/INVENTORY_GUIDELINES.md',
  'docs/pilot/INVENTORY_IMPLEMENTATION.md',
];

const errors = [];
const exists = (file) => fs.existsSync(path.join(root, file));
const read = (file) =>
  exists(file) ? fs.readFileSync(path.join(root, file), 'utf8') : null;

const requiredFiles = [
  'src/features/admin/components/inventory/AdminInventory.tsx',
  'netlify/functions/inventory.mjs',
  'database/migrations/20261111_001_inventory_financial_foundation.sql',
  'database/migrations/20261112_001_inventory_store_integrity.sql',
  'database/migrations/20261112_002_inventory_integrity_corrections.sql',
  'tests/unit/inventory-api.test.ts',
];

const requiredTopics = [
  /purpose|objective|scope/i,
  /stock|inventory/i,
  /API|endpoint/i,
  /migration|database|schema/i,
  /store isolation|store-scoped|authorization|authorisation/i,
  /test coverage|automated test|unit test/i,
  /limitations|gaps|non-goals|not implemented/i,
  /opening stock/i,
  /replenishment|adjustment/i,
  /direct sales|receipts/i,
];

console.log('Simatu Inventory compliance');
console.log('Mode:', process.argv.includes('--completion') ? 'completion' : 'document and structure');

const documentPath = candidates.find(exists);

if (!documentPath) {
  errors.push(`Inventory document not found. Expected one of: ${candidates.join(', ')}`);
}

const markdown = documentPath ? read(documentPath) : '';

if (markdown) {
  console.log(`Document: ${documentPath}`);

  const headings = markdown.match(/^#{1,6}\s+.+$/gm) ?? [];

  if (headings.length < 10) {
    errors.push(`Document has only ${headings.length} headings; at least 10 are required.`);
  }

  for (const topic of requiredTopics) {
    if (!topic.test(markdown)) {
      errors.push(`Missing required documentation topic: ${topic}`);
    }
  }

  if (!/verification gates|verification checklist|verification requirements/i.test(markdown)) {
    errors.push('Verification section is missing.');
  }

  if (!/do not commit or push|must not be committed or pushed|local development controls/i.test(markdown)) {
    errors.push('The local-only documentation restriction is missing.');
  }

  const lines = markdown.split('\n');
  const verificationIndex = lines.findIndex((line) =>
    /^#{1,6}\s+.*verification/i.test(line)
  );

  const tableRows = verificationIndex < 0
    ? []
    : lines.slice(verificationIndex + 1)
        .filter((line) => line.trim().startsWith('|'))
        .filter((line) => {
          const cells = line.trim().replace(/^\||\|$/g, '').split('|');
          const firstCell = (cells[0] ?? '').trim().toLowerCase();
          return firstCell !== 'gate' &&
            !cells.every((cell) => /^[\s:|-]*$/.test(cell));
        });

  for (const line of tableRows) {
    if (!/\b(PASS|FAIL|NOT RUN)\b/i.test(line)) {
      errors.push(`Verification table row has no recognised status: ${line.trim()}`);
    }

    if (
      /\bPASS\b/i.test(line) &&
      /\b(pending|not verified|todo|unknown|tbc)\b/i.test(line)
    ) {
      errors.push(`PASS row contains placeholder evidence: ${line.trim()}`);
    }
  }

  if (process.argv.includes('--completion')) {
    if (tableRows.length < 10) {
      errors.push('Completion requires at least 10 verification table rows.');
    }

    const failedRows = tableRows.filter((line) => !/\bPASS\b/i.test(line));

    if (failedRows.length > 0) {
      errors.push(`${failedRows.length} verification table row(s) are not marked PASS.`);
    }
  }
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    errors.push(`Missing required source file: ${file}`);
  }
}

console.log(`Required source files: ${requiredFiles.length}`);
console.log(`Required documentation topics: ${requiredTopics.length}`);

if (errors.length > 0) {
  console.error(`\nInventory compliance failed with ${errors.length} issue(s).`);

  for (const error of errors) {
    console.error(`FAIL: ${error}`);
  }

  process.exitCode = 1;
} else {
  console.log('\nPASS: Inventory documentation and structure checks passed.');

  if (process.argv.includes('--completion')) {
    console.log('PASS: All verification table rows are marked PASS.');
  }
}
