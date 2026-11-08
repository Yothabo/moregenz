# Environment and Configuration Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Environment and Configuration Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-6F8CF32136 |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide defines how application environments, configuration values, environment variables and secrets are managed during development, testing, deployment and production operations.

It establishes a consistent configuration approach for the existing Yotaabo application and the future multi-store platform.

## 2. Scope

This guide covers:

- Local development environments.
- Testing environments.
- Staging environments.
- Production environments.
- Frontend configuration.
- Backend configuration.
- Database connection settings.
- Environment variables.
- `.env` files.
- Secret management.
- Store-specific configuration.
- API and integration credentials.
- Configuration changes and rotation.
- Environment verification.

## 3. Configuration Principles

Configuration must:

- Be separated from application source code.
- Be appropriate to its target environment.
- Avoid hard-coded credentials.
- Keep privileged secrets server-side.
- Use documented variable names.
- Be validated before application startup.
- Be changed through controlled processes.
- Avoid accidental production access from development tools.
- Support reproducible deployments.
- Preserve store-specific configuration boundaries.

## 4. Environment Separation

The platform should distinguish the following environments.

### 4.1 Local Development

Used for development on the developer's machine or device.

Local development configuration must not automatically connect to production services.

### 4.2 Testing

Used for automated tests, integration tests and controlled manual verification.

Test data and credentials must be separate from production data and credentials.

### 4.3 Staging

Used to verify release candidates in an environment representative of production.

Staging must use appropriately isolated services and credentials.

### 4.4 Production

Used by live stores and customers.

Production configuration must be restricted to authorised deployment and operational processes.

## 5. Environment Configuration Files

Environment variables may be supplied through environment-specific configuration files and the deployment platform's secure configuration facilities.

The local `.env` file is the normal source of local development configuration where the application supports it.

Common file patterns include:

- `.env`
- `.env.local`
- `.env.development`
- `.env.test`
- `.env.production`

The actual files used must follow the framework and repository configuration.

Do not create unnecessary environment files simply because a framework supports them.

## 6. `.env` File Handling

The `.env` file may contain sensitive connection settings and credentials.

Requirements:

- Keep local `.env` files out of Git.
- Verify `.gitignore` covers sensitive environment files.
- Do not commit populated production environment files.
- Do not copy production credentials into development environments.
- Restrict access to local environment files.
- Use placeholder values in example files.
- Do not paste secrets into documentation or issue reports.
- Rotate credentials if accidental exposure is suspected.

A `.env.example` file may document required variable names without containing real secrets.

## 7. Configuration Ownership

Every configuration value should have an identifiable owner.

Configuration categories include:

- Application settings.
- Database settings.
- Authentication settings.
- API settings.
- Store settings.
- Frontend settings.
- Integration settings.
- Notification settings.
- Storage settings.
- Logging and monitoring settings.
- Deployment settings.

The relevant technical or operational owner must approve sensitive changes.

## 8. Database Configuration

### 8.1 Database Access Standard

PostgreSQL database communication and direct administration use `psql`.

Connection settings are loaded from the appropriate `.env` configuration.

The normal local development workflow is:

1. Load the correct environment configuration.
2. Verify the target database.
3. Connect using `psql`.
4. Inspect or execute the required SQL.
5. Verify the result.
6. Exit the database session.

### 8.2 Connection Security

Database connection strings and passwords must not be hard-coded in application source code or committed documentation.

Use appropriate credentials for each environment.

Privileged database credentials must never be included in browser-side configuration.

### 8.3 Database Changes

Schema changes must use version-controlled migration files and the approved migration process.

Direct SQL through `psql` is appropriate for inspection, controlled administration and approved operational tasks. It must not become an undocumented alternative migration system.

High-risk production changes require appropriate backup, approval, execution and verification.

### 8.4 Database Target Verification

Before executing SQL, verify:

- Environment.
- Database host.
- Database name.
- Database user.
- Intended schema.
- Expected operation.

Never assume that an active `psql` session is connected to the intended environment.

## 9. Frontend Configuration

Frontend configuration must distinguish public values from private credentials.

Public configuration may include:

- Public API base URL.
- Store public identifier.
- Public publishable keys.
- Public storefront settings.
- Non-sensitive analytics identifiers.

Frontend bundles and browser-accessible environment variables must be treated as public.

Never expose:

- Database passwords.
- Supabase service-role keys.
- Private API credentials.
- Private signing secrets.
- Payment provider secret keys.
- Backend administrative tokens.
- Unrestricted storage credentials.

The backend must enforce authentication, authorisation and store isolation independently of frontend configuration.

## 10. Backend Configuration

Backend configuration may include:

- Database connection settings.
- Authentication and token validation settings.
- Private API credentials.
- Payment provider secrets.
- Notification provider credentials.
- Storage credentials.
- Webhook verification secrets.
- Background processing settings.
- Logging configuration.

Backend secrets must remain in server-side environment configuration or an approved secret-management facility.

They must not be returned through public API responses.

## 11. Store-Specific Configuration

Each store may require its own configuration for:

- Store identifier.
- Public storefront identifier.
- API access context.
- Allowed frontend domains.
- Storefront settings.
- Notification sender configuration.
- Payment provider mapping.
- Analytics integration.
- Media configuration.

Store-specific configuration must be associated with the authoritative store record.

A frontend must not be allowed to choose another store's context simply by changing a browser-visible value.

## 12. Automatic Store Configuration Provisioning

When an authorised Platform Super Admin creates a store, the platform must automatically generate its required integration configuration package.

The package should provide the frontend developer with the information needed to connect an independently developed storefront to the shared backend and product catalogue.

It may include:

- Store-specific public identifier.
- API base URL.
- API documentation.
- Store-scoped public configuration.
- Allowed domain and CORS setup information.
- Catalogue and media integration instructions.
- Example environment configuration.
- SDK or starter tooling where supported.
- Development and deployment instructions.

The package must not contain privileged backend secrets.

Provisioning status, failures and recovery must be recorded.

## 13. Secret Management

Secrets must be:

- Stored in approved secure locations.
- Accessible only to authorised processes and personnel.
- Separated by environment.
- Scoped to the required service or integration.
- Rotated when necessary.
- Revoked when no longer required.
- Excluded from logs and source control.

Where a secret is exposed, treat it as compromised until rotated or revoked.

## 14. API Configuration

API configuration should identify:

- Base URL.
- API version.
- Environment.
- Authentication requirements.
- Store context requirements.
- Rate-limit behaviour where applicable.
- Timeout settings.
- Retry behaviour.
- Allowed origins.

The API contract and generated integration package must remain the authoritative references for frontend integration.

## 15. External Integration Configuration

External integrations must use environment-specific credentials and endpoints.

Examples include:

- Payment providers.
- Email providers.
- SMS providers.
- Storage services.
- Analytics providers.
- Shipping services.
- Accounting systems.

Configuration must identify the relevant provider account and store attribution.

Shared provider accounts require reliable transaction attribution before they are used across multiple stores.

## 16. Configuration Validation

Applications should validate required configuration at startup.

Validation should detect:

- Missing required variables.
- Invalid URLs.
- Invalid environment values.
- Missing credentials.
- Incorrect configuration formats.
- Incompatible settings.
- Missing store configuration.
- Unsafe production defaults.

The application should fail safely when critical configuration is missing or invalid.

Sensitive values must not appear in validation error messages.

## 17. Configuration Changes

Configuration changes must follow the applicable change management process.

Changes should identify:

- Affected environment.
- Configuration key.
- Reason.
- Responsible owner.
- Expected impact.
- Approval where required.
- Deployment or activation method.
- Verification.
- Rollback or recovery approach.

Do not change production configuration casually or without a record.

## 18. Credential Rotation and Revocation

Credentials should be rotated when:

- Exposure is suspected.
- A developer or administrator leaves.
- A provider integration is replaced.
- Access is no longer required.
- A security review requires rotation.
- A credential reaches an approved rotation point.

Rotation must account for dependent services to avoid unnecessary outages.

Revoked credentials must no longer be accepted by the relevant service.

## 19. Local Development on Termux

The Platform Owner's primary development environment is Termux on Android.

Development instructions must support this environment where practical.

Commands and tooling must not assume:

- `sudo` availability.
- A conventional Linux desktop.
- Docker Desktop.
- `systemd`.
- Desktop-only environment managers.
- Desktop IDE features.

Use the tools available in the actual Termux environment.

Database access uses `psql` with connection settings loaded from `.env`.

Commands that modify files or execute SQL must identify the intended working directory and target environment.

## 20. Deployment Configuration

Deployment platforms must receive configuration through their supported secure environment-variable or secret-management facilities.

Production configuration must not depend on a developer's local `.env` file.

Deployment processes must ensure:

- Required variables exist.
- Secrets are available only to authorised runtime processes.
- Public frontend variables contain no private values.
- Environment-specific URLs are correct.
- Store configuration is available.
- Configuration changes are traceable.

## 21. Logging and Diagnostics

Logs may identify configuration failures but must not expose secret values.

Diagnostic output should use redaction for:

- Passwords.
- Connection strings.
- Access tokens.
- API keys.
- Signing secrets.
- Payment credentials.
- Sensitive personal information.

Do not use unrestricted environment dumps as routine debugging output.

## 22. Configuration Backup and Recovery

Configuration required to restore a service must be included in approved recovery planning.

Secrets should be recoverable only through authorised secure processes.

Backups of configuration must receive protection appropriate to the sensitivity of their contents.

Recovery procedures must verify that restored credentials remain valid and have not been revoked.

## 23. Configuration Documentation

Each application or service should document:

- Required variables.
- Optional variables.
- Purpose.
- Expected format.
- Environment scope.
- Whether the value is public or private.
- Responsible owner.
- Default behaviour where safe.

Example files must use placeholders rather than real credentials.

## 24. Common Configuration Failures

Common failures include:

- Missing environment variables.
- Wrong database target.
- Incorrect API base URL.
- Expired credentials.
- Invalid provider configuration.
- Incorrect CORS settings.
- Incorrect store identifier.
- Public/private key confusion.
- Mismatched frontend and backend environments.

Investigate the configuration source before changing application logic.

## 25. Open Decisions

The following require formal definition:

- Final environment naming.
- Local environment file conventions.
- Production secret-management service.
- Staging infrastructure.
- Database connection variable names.
- Environment-specific database roles.
- Store configuration schema.
- Configuration provisioning implementation.
- Credential rotation intervals.
- Configuration backup ownership.
- Deployment platform configuration standards.

## 26. Relationship to Other Documents

This guide must be read alongside:

- DEVELOPMENT_STANDARDS.md
- APPLICATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- DEPLOYMENT_ARCHITECTURE.md
- INTEGRATION_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- IMPLEMENTATION_ROADMAP.md
- MIGRATION_PLAN.md
- OPERATIONS_RUNBOOK.md
- BACKUP_AND_DISASTER_RECOVERY.md

## 27. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant developers and operational stakeholders.
