import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const documentPath = path.join(root, 'docs/pilot/INVENTORY_IMPLEMENTATION.md');

const allowedExact = new Set([
  'docs/pilot/INVENTORY_IMPLEMENTATION.md',
  'scripts/check-pilot-session.mjs',
  'src/features/admin/components/AdminBottomNavigation.tsx',
  'src/features/admin/components/AdminOverview.tsx',
  'src/features/admin/types/admin.types.ts',
  'src/pages/Admin.tsx',
  'src/features/admin/hooks/useAdminOrders.ts',
  'src/features/admin/components/AdminOrderDetailsModal.tsx',
  'netlify/functions/inventory.mjs',
  'netlify/functions/orders.mjs',
  'netlify/functions/expire-pending-orders.mjs',
  'netlify/functions/direct-sales.mjs',
  'netlify/functions/receipts.mjs',
  'package.json',
]);

const allowedPrefixes = [
  'src/features/admin/components/inventory/',
  'docs/pilot/',
];

const allowedMigrationPattern =
  /^database\/migrations\/.*(inventory|reservation|direct.?sale|receipt|order.?lifecycle).*\.sql$/i;

const allowedTestPattern =
  /^tests\/(unit|integration)\/.*(inventory|reservation|order|direct.?sale|receipt|stock|overview).*$/i;

const requiredOverviewHeadings = [
  '### 13.1 Admin Overview',
  '### 13.2 Shared reporting contract',
  '### 13.3 Inventory integration',
];

const requiredOverviewGates = [
  'Inventory Overview browser verification',
  'Admin Overview source trace',
  'Shared reporting definitions',
  'Fabricated data audit',
  'Overview storefront isolation',
  'Overview automated tests',
];

const requiredReportingTerms = [
  'Store Performance',
  'Order Overview',
  'Recent Activity',
  'Quick Actions',
  'no mock data',
  'hardcoded sample metrics',
  'fabricated activity',
  'Physical stock means on-hand quantity',
  'Reserved stock is reported separately',
  'Available stock means on-hand quantity minus active reserved quantity',
  'supplier cost',
  'storefront',
];

function git(args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function getChangedFiles() {
  const output = git(['status', '--porcelain=v1', '--untracked-files=all']);

  return output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      let file = line.slice(3).trim();

      if (file.includes(' -> ')) {
        file = file.split(' -> ').at(-1);
      }

      return file.replace(/^"|"$/g, '');
    });
}

function isAllowed(file) {
  return (
    allowedExact.has(file) ||
    allowedPrefixes.some((prefix) => file.startsWith(prefix)) ||
    allowedMigrationPattern.test(file) ||
    allowedTestPattern.test(file)
  );
}

function extractAcceptanceItems(markdown) {
  const start = markdown.indexOf('## 4. Database and integrity');
  const end = markdown.indexOf('## 15. Verification evidence');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error(
      'Could not locate the acceptance checklist sections in the implementation document.',
    );
  }

  const section = markdown.slice(start, end);
  const items = [...section.matchAll(/^- \[([ xX])\] (.+)$/gm)];

  return {
    total: items.length,
    completed: items.filter((item) => item[1].toLowerCase() === 'x').length,
    pending: items
      .filter((item) => item[1] !== 'x' && item[1] !== 'X')
      .map((item) => item[2]),
  };
}

function extractVerificationGates(markdown) {
  const start = markdown.indexOf('## 15. Verification evidence');
  const end = markdown.indexOf('## 16. Completion criteria');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Could not locate the verification evidence table.');
  }

  const section = markdown.slice(start, end);
  const rows = [
    ...section.matchAll(
      /^\| ([^|]+) \| (PENDING|PASS|FAIL|BLOCKED) \| ([^|]+) \|$/gm,
    ),
  ];

  return rows.map((row) => ({
    gate: row[1].trim(),
    result: row[2].trim(),
    evidence: row[3].trim(),
  }));
}

function validateOverviewContract(markdown, gates) {
  const issues = [];

  for (const heading of requiredOverviewHeadings) {
    if (!markdown.includes(heading)) {
      issues.push(`Missing required document section: ${heading}`);
    }
  }

  for (const term of requiredReportingTerms) {
    if (!markdown.toLowerCase().includes(term.toLowerCase())) {
      issues.push(`Missing reporting-contract requirement: ${term}`);
    }
  }

  for (const requiredGate of requiredOverviewGates) {
    if (!gates.some((gate) => gate.gate === requiredGate)) {
      issues.push(`Missing required verification gate: ${requiredGate}`);
    }
  }

  for (const gate of gates) {
    if (
      gate.result === 'PASS' &&
      /\b(not verified|not audited|not implemented|not completed|pending|todo|unknown)\b/i.test(
        gate.evidence,
      )
    ) {
      issues.push(
        `Gate "${gate.gate}" is marked PASS but its evidence is incomplete or contradictory.`,
      );
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

function extractNextStep(markdown) {
  const heading = '## 18. Next development step';
  const start = markdown.indexOf(heading);

  if (start === -1) {
    return 'Not specified in the implementation document.';
  }

  const remaining = markdown.slice(start + heading.length);
  const nextHeading = remaining.search(/^## \d+\./m);
  const content = nextHeading === -1
    ? remaining
    : remaining.slice(0, nextHeading);

  return content.trim() || 'Not specified in the implementation document.';
}

function printReport(markdown) {
  const phaseMatch = markdown.match(/^\*\*Phase:\*\* (.+)$/m);
  const statusMatch = markdown.match(/^\*\*Status:\*\* (.+)$/m);

  const phase = phaseMatch?.[1]?.trim() ?? 'UNKNOWN';
  const status = statusMatch?.[1]?.trim() ?? 'UNKNOWN';
  const acceptance = extractAcceptanceItems(markdown);
  const gates = extractVerificationGates(markdown);
  const contract = validateOverviewContract(markdown, gates);
  const nextStep = extractNextStep(markdown);

  console.log('\nPILOT IMPLEMENTATION COMPLIANCE');
  console.log('================================');
  console.log(`Phase: ${phase}`);
  console.log(`Document status: ${status}`);
  console.log(
    `Acceptance criteria: ${acceptance.completed}/${acceptance.total} complete`,
  );
  console.log(
    `Verification gates: ${gates.filter((gate) => gate.result === 'PASS').length}/${gates.length} passed`,
  );

  if (acceptance.pending.length) {
    console.log('\nOPEN / NOT YET VERIFIED');
    console.log('------------------------------');

    for (const item of acceptance.pending) {
      console.log(`- ${item}`);
    }
  } else {
    console.log('\nAll acceptance checklist items are checked.');
  }

  const unfinishedGates = gates.filter((gate) => gate.result !== 'PASS');

  if (unfinishedGates.length) {
    console.log('\nVERIFICATION STILL REQUIRED');
    console.log('---------------------------');

    for (const gate of unfinishedGates) {
      console.log(`- ${gate.gate}: ${gate.result} (${gate.evidence})`);
    }
  }

  if (!contract.valid) {
    console.log('\nFREEZE CONTRACT VALIDATION FAILED');
    console.log('---------------------------------');

    for (const issue of contract.issues) {
      console.log(`- ${issue}`);
    }
  } else {
    console.log('\nOverview reporting contract structure: VALID');
  }

  console.log('\nNEXT DEVELOPMENT STEP');
  console.log('---------------------');
  console.log(nextStep);

  return {
    phase,
    status,
    acceptance,
    gates,
    contract,
    complete:
      acceptance.total > 0 &&
      acceptance.completed === acceptance.total &&
      gates.length > 0 &&
      gates.every((gate) => gate.result === 'PASS') &&
      contract.valid,
  };
}

function main() {
  if (!fs.existsSync(documentPath)) {
    console.error(`Implementation document not found: ${documentPath}`);
    process.exitCode = 2;
    return;
  }

  const markdown = fs.readFileSync(documentPath, 'utf8');

  let changedFiles;

  try {
    changedFiles = getChangedFiles();
  } catch (error) {
    console.error(
      'Unable to inspect Git working tree. Run this script inside the repository.',
    );
    console.error(error.message);
    process.exitCode = 2;
    return;
  }

  const outOfScope = changedFiles.filter((file) => !isAllowed(file));

  console.log('\nACTIVE SCOPE CHECK');
  console.log('==================');

  if (outOfScope.length) {
    console.error('OUT-OF-SCOPE CHANGES DETECTED:');

    for (const file of outOfScope) {
      console.error(`- ${file}`);
    }
  } else {
    console.log('All current working-tree changes are within the active phase allowlist.');
  }

  console.log(`Changed files inspected: ${changedFiles.length}`);

  let report;

  try {
    report = printReport(markdown);
  } catch (error) {
    console.error(`\nCompliance document validation failed: ${error.message}`);
    process.exitCode = 2;
    return;
  }

  if (process.argv.includes('--completion') && !report.complete) {
    console.error('\nCompletion check failed. Outstanding requirements remain.');
    process.exitCode = 1;
    return;
  }

  if (process.argv.includes('--unfreeze')) {
    if (outOfScope.length || !report.complete) {
      console.error(
        '\nCannot close this phase: scope, acceptance criteria, evidence or contract validation has not passed.',
      );
      process.exitCode = 1;
      return;
    }

    const updated = markdown.replace(
      /^\*\*Status:\*\* .+$/m,
      '**Status:** COMPLETE',
    );

    fs.writeFileSync(documentPath, updated);
    console.log(`\n${report.phase} marked COMPLETE in the local development document.`);
    return;
  }

  if (outOfScope.length) {
    process.exitCode = 1;
    return;
  }

  if (!report.complete) {
    console.log('\nDevelopment phase remains IN PROGRESS.');
  }
}

main();
