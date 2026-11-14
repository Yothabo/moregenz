import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const documentPath = 'docs/pilot/ADMIN_OVERVIEW_GUIDELINES.md';
const completionMode = process.argv.includes('--completion');

const errors = [];
const exists = (file) => fs.existsSync(path.join(root, file));
const read = (file) =>
  exists(file) ? fs.readFileSync(path.join(root, file), 'utf8') : null;

const requiredFiles = [
  'src/features/admin/components/AdminOverview.tsx',
  'src/features/admin/types/admin.types.ts',
  'netlify/functions/orders.mjs',
];

const requiredSections = [
  'Purpose and launch boundary',
  'Dashboard structure',
  'Business summary',
  'Sales performance',
  'Order operations',
  'Product performance',
  'Store comparison',
  'Date filters and time',
  'Data contracts and architecture',
  'Data integrity and financial semantics',
  'Empty, loading, and error states',
  'Customer data restrictions',
  'Explicit gaps and non-goals',
  'Verification gates',
  'Completion criteria',
  'Development rules',
];

const requiredGates = [
  'Dashboard structure and five-section order',
  'Order API authentication and store authorisation',
  'Order API response contract and product identifiers',
  'Date filters and Africa/Johannesburg boundaries',
  'Business summary calculations',
  'Recorded sales activity calculations',
  'Order operations and status distribution',
  'Product performance aggregation',
  'Store comparison and server-side isolation',
  'Loading, empty, error, and partial-data states',
  'Customer-data restrictions and financial labels',
  'Automated tests, typecheck, and production build',
];

function normaliseHeading(value) {
  return value
    .replace(/^#{1,6}\s+/, '')
    .replace(/^\d+(?:\.\d+)*\.?\s*/, '')
    .trim()
    .toLowerCase();
}

console.log('Simatu Admin Overview compliance');
console.log(`Mode: ${completionMode ? 'completion' : 'document and structure'}`);

const markdown = read(documentPath);

if (!markdown) {
  errors.push(`Missing document: ${documentPath}`);
} else {
  const headings = markdown.match(/^#{1,6}\s+.+$/gm) ?? [];
  const normalisedHeadings = headings.map(normaliseHeading);

  for (const section of requiredSections) {
    if (!normalisedHeadings.includes(section.toLowerCase())) {
      errors.push(`Missing document section: ${section}`);
    }
  }

  if (!markdown.includes('Africa/Johannesburg')) {
    errors.push('The approved timezone is missing.');
  }

  if (!/customer analytics/i.test(markdown)) {
    errors.push('Customer-data restrictions are not documented.');
  }

  if (!/do not commit or push|must not be committed or pushed|local development control/i.test(markdown)) {
    errors.push('The local-only documentation restriction is missing.');
  }

  const verificationHeadingIndex = normalisedHeadings.indexOf('verification gates');

  if (verificationHeadingIndex < 0) {
    errors.push('Verification gates heading is missing.');
  }

  const lines = markdown.split('\n');
  const verificationLineIndex = lines.findIndex((line) =>
    /^#{1,6}\s+/.test(line) &&
    normaliseHeading(line) === 'verification gates'
  );

  const tableRows = verificationLineIndex < 0
    ? []
    : lines.slice(verificationLineIndex + 1)
        .filter((line) => line.trim().startsWith('|'))
        .filter((line) => {
          const cells = line.trim().replace(/^\||\|$/g, '').split('|');
          const firstCell = (cells[0] ?? '').trim().toLowerCase();

          return firstCell !== 'gate' &&
            !cells.every((cell) => /^[\s:|-]*$/.test(cell));
        });

  for (const gate of requiredGates) {
    const matchingRow = tableRows.find((line) =>
      line.toLowerCase().includes(gate.toLowerCase())
    );

    if (!matchingRow) {
      errors.push(`Missing verification gate: ${gate}`);
      continue;
    }

    if (!/\b(PASS|FAIL|NOT RUN)\b/i.test(matchingRow)) {
      errors.push(`Verification gate has no recognised status: ${gate}`);
    }

    if (
      /\bPASS\b/i.test(matchingRow) &&
      /\b(pending|not verified|todo|unknown|tbc)\b/i.test(matchingRow)
    ) {
      errors.push(`PASS gate contains placeholder evidence: ${gate}`);
    }
  }

  if (completionMode) {
    for (const gate of requiredGates) {
      const matchingRow = tableRows.find((line) =>
        line.toLowerCase().includes(gate.toLowerCase())
      );

      if (!matchingRow || !/\bPASS\b/i.test(matchingRow)) {
        errors.push(`Completion requires PASS with evidence: ${gate}`);
      }
    }

    if (tableRows.length < requiredGates.length) {
      errors.push(`Expected ${requiredGates.length} verification rows; found ${tableRows.length}.`);
    }
  }
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    errors.push(`Missing required source file: ${file}`);
  }
}

console.log(`Required source files: ${requiredFiles.length}`);
console.log(`Required document sections: ${requiredSections.length}`);
console.log(`Required verification gates: ${requiredGates.length}`);

if (errors.length > 0) {
  console.error(`\nAdmin Overview compliance failed with ${errors.length} issue(s).`);

  for (const error of errors) {
    console.error(`FAIL: ${error}`);
  }

  process.exitCode = 1;
} else {
  console.log('\nPASS: Admin Overview documentation and structure checks passed.');

  if (completionMode) {
    console.log('PASS: All verification gates are marked PASS.');
  }
}
