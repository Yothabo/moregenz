# Local Development Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Local Development Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-7D6BB2A16E |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide defines the standard workflow for developing, running, debugging and verifying the platform locally.

It covers the existing Yotaabo application and the future multi-store platform while preserving the current production system during development and migration.

## 2. Scope

This guide covers:

- Local development environment preparation.
- Repository setup.
- Termux development.
- Dependency installation.
- Environment configuration.
- Frontend development.
- Backend development.
- PostgreSQL access.
- Database migrations.
- Local testing.
- Debugging.
- Git workflow.
- Development safety.

## 3. Development Principles

Development must:

- Follow the repository's documented standards.
- Preserve existing working functionality.
- Use environment-specific configuration.
- Keep secrets out of source control.
- Use version-controlled database migrations.
- Verify changes before considering work complete.
- Avoid unnecessary dependencies and architectural complexity.
- Keep frontend and backend responsibilities separate.
- Preserve store isolation in all multi-store functionality.

## 4. Supported Development Environment

The Platform Owner's primary development environment is Termux on Android.

Development instructions should work within Termux wherever practical.

Do not assume the availability of:

- `sudo`.
- `systemd`.
- Docker Desktop.
- Desktop-only IDE tooling.
- Conventional Linux desktop services.

Use installed and supported tools appropriate to the actual environment.

## 5. Repository Setup

Before development:

1. Open the correct repository.
2. Confirm the current working directory.
3. Inspect the current Git branch.
4. Check the working tree for existing changes.
5. Review relevant documentation.
6. Confirm the target environment.
7. Identify the affected application or module.

Do not overwrite existing work or assume the repository is clean.

## 6. Dependency Management

Dependencies must be installed using the package manager and lockfile appropriate to the application.

Requirements:

- Prefer existing dependencies where they satisfy the requirement.
- Avoid unnecessary packages.
- Do not introduce unmaintained dependencies without justification.
- Preserve lockfile consistency.
- Review dependency changes.
- Avoid installing global packages when a local project dependency is appropriate.
- Verify compatibility with the supported runtime.

## 7. Environment Configuration

Local development must use the appropriate local environment configuration.

The `.env` file is used for local configuration where supported.

Requirements:

- Do not commit populated `.env` files.
- Do not expose secrets in terminal output.
- Do not use production credentials unnecessarily.
- Confirm the intended environment before running commands.
- Follow ENVIRONMENT_AND_CONFIGURATION_GUIDE.md.

## 8. Starting the Frontend

Frontend development should use the repository's configured development scripts.

Before starting the application:

- Confirm dependencies are installed.
- Confirm required environment variables exist.
- Confirm the API base URL points to the intended backend.
- Confirm public configuration contains no privileged secrets.
- Confirm the correct store configuration is being used.

Use the package scripts defined by the actual project rather than assuming script names.

## 9. Starting the Backend

Backend development should use the repository's configured runtime and scripts.

Before starting the backend:

- Confirm the correct project directory.
- Confirm required dependencies are available.
- Confirm environment configuration.
- Confirm database connectivity.
- Confirm required external services are available or appropriately mocked.
- Check application logs for startup failures.

Do not invent runtime commands or configuration variable names. Follow the actual project setup.

## 10. Database Development Workflow

PostgreSQL is accessed directly through `psql`.

The appropriate `.env` configuration supplies the database connection settings.

The standard workflow is:

1. Confirm the repository and working directory.
2. Load the correct local environment configuration.
3. Verify the intended database target.
4. Connect using `psql`.
5. Inspect the relevant schema or records.
6. Execute the approved SQL operation.
7. Verify the result.
8. Exit the database session.

Do not expose passwords or connection strings in command output.

## 11. Database Inspection

Use `psql` for direct database inspection and controlled administration.

Inspection may include:

- Database and schema information.
- Table definitions.
- Columns and data types.
- Constraints.
- Indexes.
- Foreign keys.
- Migration history.
- Relevant records.
- Query execution plans where needed.

Use read-only queries when investigating production data unless an approved operation requires modification.

## 12. Database Schema Changes

Schema changes must be implemented through version-controlled migration files.

Before creating a migration:

- Inspect the current schema.
- Review existing migration conventions.
- Check for related constraints and dependencies.
- Identify data migration requirements.
- Assess backward compatibility.
- Identify rollback or recovery requirements.

Do not treat manual SQL execution as a replacement for a migration.

## 13. SQL Execution Safety

Before executing SQL:

- Confirm the database environment.
- Confirm the database and schema.
- Review the statement.
- Understand its expected impact.
- Use a transaction where appropriate.
- Avoid unnecessary broad updates or deletes.
- Verify affected records.
- Preserve audit and historical records where required.

High-risk operations require appropriate backup and recovery preparation.

## 14. Frontend Development

Frontend changes should:

- Follow existing component conventions.
- Reuse established design-system values.
- Keep business rules out of presentation components.
- Handle loading, empty and error states.
- Validate user input.
- Avoid exposing private credentials.
- Use documented API contracts.
- Respect the active store context.
- Remain responsive across supported screen sizes.

A frontend must never be trusted to enforce access control or store isolation on its own.

## 15. Backend Development

Backend changes should:

- Keep business rules in the appropriate backend domain.
- Validate incoming data.
- Enforce authentication and authorisation.
- Resolve store context through trusted server-side mechanisms.
- Enforce store ownership and data boundaries.
- Use database transactions for related business operations.
- Apply consistent error handling.
- Record required audit events.
- Avoid returning private internal data.

## 16. API Development

API changes must follow the documented API architecture and contracts.

Before changing an endpoint:

- Identify existing consumers.
- Check request and response compatibility.
- Review authentication requirements.
- Review store-context requirements.
- Assess pagination and validation.
- Consider rate limits and failure behaviour.
- Update relevant documentation and tests.

Do not introduce competing write paths during migration.

## 17. Local Testing

Run the tests relevant to the changed functionality.

Testing may include:

- Unit tests.
- Integration tests.
- API tests.
- Frontend tests.
- Type checking.
- Linting.
- Build verification.
- Database migration verification.
- Store-isolation tests.

A successful build alone does not establish that a business workflow is correct.

## 18. Debugging

Debugging should follow a controlled process:

1. Reproduce the issue.
2. Identify the affected layer.
3. Inspect relevant logs and error output.
4. Verify configuration.
5. Check API requests and responses.
6. Inspect database state where necessary.
7. Identify the root cause.
8. Apply the smallest appropriate correction.
9. Retest the affected workflow.

Do not make unrelated changes while investigating a specific defect.

## 19. Logging and Diagnostic Output

Diagnostic output must not reveal:

- Passwords.
- Database connection strings.
- API secrets.
- Authentication tokens.
- Payment credentials.
- Private personal information.

Use targeted logging rather than dumping complete environment variables or unrestricted database records.

## 20. Multi-Store Development

All new multi-store functionality must be tested with more than one store context.

Verify that:

- Store-owned records are correctly attributed.
- Store Admins cannot access unauthorised stores.
- Employees cannot exceed delegated permissions.
- Shared catalogue records follow their ownership rules.
- Inventory remains independent per store.
- Orders and financial records remain correctly attributed.
- Storefront configuration cannot override server-side authority.

Yotaabo must not receive special-case privileges that bypass the normal store model.

## 21. Integration Development

External integrations should use development or test credentials where available.

Verify:

- Correct provider environment.
- Credential scope.
- Store attribution.
- Authentication and signature validation.
- Timeout behaviour.
- Retry behaviour.
- Idempotency.
- Error handling.
- Logging and audit records.

Never assume a provider operation failed merely because a request timed out. Verify the provider's transaction state before retrying potentially duplicate operations.

## 22. Git Workflow

Before changing files:

- Inspect the current branch.
- Inspect existing modifications.
- Understand the intended scope.

During development:

- Keep changes focused.
- Avoid unrelated file modifications.
- Review staged changes before committing.
- Do not include secrets or local environment files.
- Follow the repository's commit and branch conventions.

Do not commit or push unless the responsible person explicitly authorises it.

## 23. Documentation Updates

Update documentation when a development change affects:

- Architecture.
- API contracts.
- Database schema.
- Environment configuration.
- Security controls.
- Operational procedures.
- Store onboarding.
- Deployment or recovery.

Documentation must describe implemented behaviour accurately and distinguish current implementation from planned architecture.

## 24. Development Completion Criteria

A development task is ready for review when:

- The intended change is implemented.
- Relevant tests have been run.
- Type checking and build checks have been performed where applicable.
- Database changes are represented by migrations.
- Security and store-isolation implications have been considered.
- Documentation is updated where required.
- The diff has been inspected.
- Known limitations are recorded.

## 25. Common Development Mistakes

Avoid:

- Running SQL against an unverified database.
- Editing generated files unnecessarily.
- Committing `.env` files.
- Exposing private credentials in frontend code.
- Making direct production changes without approval.
- Assuming frontend store identifiers establish authority.
- Changing API contracts without checking consumers.
- Retrying uncertain payment operations without checking provider state.
- Making unrelated changes during a focused task.
- Treating a successful build as complete functional verification.

## 26. Open Development Decisions

The following remain subject to formal decision:

- Standard local environment setup scripts.
- Backend development runtime and tooling.
- Local test database strategy.
- Automated database migration workflow.
- Local integration service strategy.
- Standard frontend and backend startup scripts.
- Development database access roles.
- Automated test execution requirements.

## 27. Relationship to Other Documents

This guide must be read alongside:

- DEVELOPMENT_STANDARDS.md
- ENVIRONMENT_AND_CONFIGURATION_GUIDE.md
- IMPLEMENTATION_ROADMAP.md
- TESTING_STRATEGY.md
- MIGRATION_PLAN.md
- APPLICATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- DEPLOYMENT_ARCHITECTURE.md
- OPERATIONS_RUNBOOK.md

## 28. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant developers.
