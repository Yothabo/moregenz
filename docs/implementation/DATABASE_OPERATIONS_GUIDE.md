# Database Operations Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Database Operations Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This guide defines the practical procedures for accessing, inspecting, querying, changing and maintaining the PostgreSQL database used by the platform.

It establishes `psql` with environment configuration loaded from `.env` as the standard direct database administration workflow.

## 2. Scope

This guide covers:

- PostgreSQL access.
- Environment configuration.
- `psql` usage.
- Database inspection.
- SQL execution.
- Schema changes.
- Migration management.
- Data correction.
- Backup and recovery considerations.
- Database security.
- Operational verification.
- Termux development.

## 3. Database Operations Principles

Database operations must:

- Target the correct environment.
- Use authorised credentials.
- Preserve data integrity.
- Respect store ownership and isolation.
- Prefer version-controlled migrations for schema changes.
- Use transactions where appropriate.
- Preserve financial and audit history.
- Be traceable and verifiable.
- Avoid exposing credentials or personal information.
- Minimise direct production changes.

## 4. Standard Database Access Method

Direct PostgreSQL communication and administration use the PostgreSQL command-line client, `psql`.

Local database connection settings are loaded from the repository's `.env` file where applicable.

The standard approach is:

1. Navigate to the correct project directory.
2. Confirm the intended environment.
3. Load the appropriate `.env` configuration.
4. Verify the database target.
5. Connect using `psql`.
6. Execute the required operation.
7. Verify the result.
8. Exit the database session.

The actual environment variable names and loading method must follow the repository's configuration. Do not assume or invent them.

## 5. Environment File Security

The `.env` file may contain sensitive credentials.

Requirements:

- Do not commit populated `.env` files.
- Do not print the complete file in terminal output.
- Do not paste credentials into chat, documentation or issue reports.
- Do not include connection strings in screenshots.
- Do not copy production credentials into local development.
- Use `.env.example` for non-secret configuration documentation.
- Restrict access to environment files.
- Rotate credentials after suspected exposure.

## 6. Database Target Verification

Before connecting or executing SQL, establish:

- Environment.
- Database host.
- Database name.
- Database user.
- Intended schema.
- Expected operation.

A successful connection does not prove that the correct database was selected.

Production and staging must never be treated as interchangeable with local development.

## 7. Connecting with psql

Use the connection settings already defined by the repository.

The exact command depends on the actual `.env` variable names and the project's environment-loading conventions.

Do not put passwords directly into command-line arguments.

Where supported, use environment variables or an approved password file mechanism rather than embedding credentials in commands.

After connecting, verify the session target before running any modifying SQL.

## 8. Useful psql Inspection Commands

The following commands are useful inside an interactive `psql` session:

- `\conninfo` displays connection information.
- `\l` lists databases.
- `\dn` lists schemas.
- `\dt` lists tables in the current search path.
- `\dt *.*` lists tables across schemas.
- `\d table_name` describes a table.
- `\d+ table_name` provides additional table information.
- `\di` lists indexes.
- `\df` lists functions.
- `\dv` lists views.
- `\du` lists database roles.
- `\x` toggles expanded output.
- `\timing` toggles query timing.
- `\q` exits `psql`.

Use commands appropriate to the permissions of the connected database role.

## 9. SQL Inspection

Use read-only queries when investigating database state.

Typical inspection tasks include:

- Checking table definitions.
- Reviewing constraints.
- Inspecting indexes.
- Verifying foreign keys.
- Checking migration history.
- Counting records.
- Identifying duplicate values.
- Reviewing store ownership references.
- Investigating inconsistent relationships.

Limit queries to the required data.

Avoid unrestricted queries that expose unnecessary customer or financial information.

## 10. Query Safety

Before executing a query:

- Read the complete statement.
- Confirm the intended tables.
- Confirm the filtering conditions.
- Estimate the affected records.
- Check whether the operation is read-only or modifying.
- Use a transaction where appropriate.
- Verify the result.

For updates and deletes, perform a corresponding `SELECT` first to establish which records will be affected.

Do not execute broad modifications without understanding their full scope.

## 11. Transactions

Use transactions when multiple SQL statements must succeed or fail together.

The general PostgreSQL transaction pattern is:

    BEGIN;

    -- Execute the reviewed SQL statements.

    -- Inspect the resulting data before finalising.

    COMMIT;

If the operation is incorrect or incomplete, use:

    ROLLBACK;

Do not assume every SQL statement can safely be rolled back. Some operations have external effects or PostgreSQL-specific transaction limitations.

## 12. Database Schema Inspection

Before modifying a schema, inspect:

- Existing tables.
- Column types.
- Nullability.
- Default values.
- Primary keys.
- Foreign keys.
- Unique constraints.
- Check constraints.
- Indexes.
- Triggers.
- Functions.
- Views.
- Row-level security policies where applicable.

Consider dependencies before changing or removing database objects.

## 13. Migration Management

Database schema changes must be represented by version-controlled migration files.

A migration should:

- Have a clear purpose.
- Follow repository naming conventions.
- Be deterministic.
- Account for existing data.
- Preserve referential integrity.
- Consider concurrent application versions.
- Be safe to execute through the approved migration process.
- Include verification where appropriate.

Do not modify an already-applied migration casually.

If an applied migration needs correction, create a subsequent migration unless the approved migration policy explicitly permits another approach.

## 14. Migration Verification

Before applying a migration:

- Confirm the target database.
- Inspect the migration.
- Review dependencies.
- Check whether the migration has already been applied.
- Assess data-loss risk.
- Confirm backup and recovery readiness for high-risk changes.

After applying it:

- Verify migration history.
- Inspect affected schema objects.
- Check relevant constraints and indexes.
- Run application tests.
- Verify affected business workflows.

## 15. Data Correction

Data corrections must have a defined reason and scope.

Before modifying records:

- Identify the affected records.
- Confirm their ownership and store attribution.
- Establish the expected values.
- Check dependent records.
- Preserve historical and audit requirements.
- Obtain approval where required.
- Prepare recovery measures for high-risk changes.

Record the correction and its verification.

Do not silently overwrite financial, order or audit history.

## 16. Multi-Store Data Integrity

Database operations must preserve store boundaries.

Verify that:

- Store-owned records reference the correct store.
- Store-specific relationships cannot cross stores improperly.
- Composite constraints are respected where defined.
- Shared catalogue records follow ownership rules.
- Inventory remains independently attributed.
- Orders and financial records retain their store attribution.
- Platform-level records remain distinct from store-level records.

A query that works for one store may still be unsafe in a multi-store environment.

## 17. Row-Level Security

Where PostgreSQL row-level security is used, verify:

- Policies exist for the relevant tables.
- Policies cover required operations.
- Application roles have appropriate permissions.
- Store context is established through trusted mechanisms.
- Direct database roles cannot bypass intended controls unexpectedly.
- Administrative access is separately controlled.

Do not assume that RLS alone replaces backend authorisation and business-rule enforcement.

## 18. Production Database Operations

Production database changes require additional controls.

Before a high-risk operation:

- Obtain required approval.
- Confirm the production target.
- Review the SQL or migration.
- Confirm a recent usable backup or recovery point.
- Understand the rollback or recovery approach.
- Consider active application traffic.
- Coordinate with deployment activity.

After execution, verify the result and record the operation.

Avoid unplanned production SQL changes.

## 19. Backup and Recovery

Database backups and recovery must follow the approved backup and disaster recovery policy.

Before destructive operations, establish that the required recovery point exists and is usable.

Restoration must consider:

- Database consistency.
- Application compatibility.
- File and media dependencies.
- Integration state.
- Pending transactions.
- Audit history.
- Store attribution.
- Potential reappearance of deleted data.

A backup is not proven usable until restoration has been tested.

## 20. Database Performance Investigation

Performance investigation may include:

- Query execution plans.
- Index usage.
- Slow queries.
- Table sizes.
- Index sizes.
- Connection usage.
- Lock contention.
- Long-running transactions.
- Database resource utilisation.

Use `EXPLAIN` to inspect query plans.

Use `EXPLAIN ANALYZE` only when executing the query is safe and its operational impact is understood.

Avoid running expensive analysis against production without considering load.

## 21. Database Roles and Permissions

Database credentials must follow least-privilege principles.

Separate application access from administrative access where practical.

Do not use a database owner or superuser account as the routine application connection.

Review database role permissions when:

- A developer leaves.
- A service is retired.
- Credentials are rotated.
- Access requirements change.
- A security incident occurs.

## 22. Database Logging and Sensitive Data

Database queries, diagnostic output and logs must not expose unnecessary sensitive information.

Protect:

- Passwords.
- Connection strings.
- Authentication tokens.
- Customer personal information.
- Payment references where sensitive.
- Financial records.
- Private integration credentials.

Use redacted and limited diagnostic output.

## 23. Troubleshooting

When database access fails, investigate in this order:

1. Confirm the working directory.
2. Confirm the expected `.env` file is present.
3. Verify the environment configuration without displaying secret values.
4. Confirm the connection variable is available.
5. Check network and database availability.
6. Verify the target host and database.
7. Check the database role and permissions.
8. Inspect the exact error message.
9. Retry only after identifying and addressing the cause.

Do not solve connection problems by exposing credentials or switching to an unverified database target.

## 24. Termux Considerations

The Platform Owner's primary development environment is Termux on Android.

Database procedures must support the available Termux tooling.

Do not assume desktop-only PostgreSQL administration software or conventional Linux service managers.

Use the installed `psql` client and the repository's actual environment-loading approach.

Keep commands concise and verify the working directory before executing them.

## 25. Database Operation Records

Record material database operations where appropriate.

The record should identify:

- Date and time.
- Environment.
- Responsible operator.
- Reason.
- Migration or SQL operation.
- Approval where required.
- Affected database objects or records.
- Verification performed.
- Outcome.
- Any recovery or follow-up action.

Never include passwords or private credentials in the record.

## 26. Prohibited Practices

The following practices are prohibited:

- Committing populated `.env` files.
- Hard-coding database credentials.
- Running SQL against an unverified target.
- Using privileged credentials in browser code.
- Making undocumented production schema changes.
- Bypassing migration history.
- Deleting historical financial or audit records without an approved retention process.
- Running broad updates or deletes without reviewing affected records.
- Treating a successful connection as proof of correct environment.
- Exposing sensitive records during debugging.

## 27. Open Decisions

The following require formal definition:

- Database role structure for each environment.
- Production database access approval.
- Exact environment variable names.
- Standard local connection procedure.
- Migration execution ownership.
- Production SQL emergency procedure.
- Backup verification frequency.
- Database monitoring and alert thresholds.
- Database maintenance responsibilities.

## 28. Relationship to Other Documents

This guide must be read alongside:

- DEVELOPMENT_STANDARDS.md
- ENVIRONMENT_AND_CONFIGURATION_GUIDE.md
- LOCAL_DEVELOPMENT_GUIDE.md
- DATA_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- DEPLOYMENT_ARCHITECTURE.md
- MIGRATION_PLAN.md
- TESTING_STRATEGY.md
- OPERATIONS_RUNBOOK.md
- BACKUP_AND_DISASTER_RECOVERY.md
- FINANCIAL_RECONCILIATION_PROCEDURE.md
- FINANCIAL_RECORDS_AND_RETENTION_POLICY.md

## 29. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant developers and database operators.
