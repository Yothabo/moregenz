# Platform and Store Configuration Management Standards

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define consistent standards for managing platform-wide and store-specific configuration.

Configuration must support independently operated storefronts while preserving shared platform rules, security boundaries and operational consistency.

## Scope

These standards apply to:

- Platform configuration.
- Store identity and settings.
- Storefront configuration.
- API configuration.
- Database connections.
- Authentication settings.
- Feature flags.
- Domain and CORS settings.
- External provider settings.
- Notification settings.
- Integration packages.
- Environment-specific settings.
- Deployment configuration.

## Core Principles

Configuration must be explicit, validated and traceable.

Platform-wide settings and store-specific settings must remain distinguishable.

A store must not be able to modify platform-wide security or operational controls through its own configuration.

Configuration must not be used to bypass backend authorisation or business rules.

Private credentials must never be exposed through public frontend configuration.

## Configuration Categories

Configuration should be classified according to ownership and purpose.

| Category | Examples |
|---|---|
| Platform | Shared service settings, global security controls, platform defaults |
| Store | Store identity, branding, contact details, enabled features |
| Environment | Development, testing and production settings |
| Integration | Provider account references, API endpoints, callback settings |
| Frontend | Public API configuration, storefront presentation settings |
| Operational | Monitoring, background processing and maintenance settings |
| Secret | Database credentials, private keys and provider secrets |

## Ownership and Authority

Platform configuration is controlled by authorised platform administrators.

Store configuration is managed by the relevant Store Admin within delegated permissions.

Some settings may require platform approval because they affect shared infrastructure, security, integrations or other stores.

Configuration ownership must be documented.

A store's configuration authority must not extend to another store's settings.

## Configuration Separation

Shared platform settings must not be copied into individual store records unnecessarily.

Store-specific settings must not be implemented as hard-coded frontend assumptions.

Environment-specific configuration must be separate from store-specific business configuration.

Avoid duplicated values that can become inconsistent.

Where a value has an authoritative source, other components should reference that source rather than maintain independent copies.

## Store Configuration

Store configuration may include:

- Store identity and display name.
- Public branding.
- Storefront domain.
- Contact and support details.
- Supported currencies where approved.
- Store timezone.
- Store-specific feature availability.
- Catalogue presentation settings.
- Approved integration references.
- Notification preferences.
- Operational settings.

The exact configurable fields must be defined by the relevant domain and permissions.

## Storefront Configuration Boundaries

Storefronts may have distinct branding and supported presentation options.

Configuration must use approved design-system capabilities and supported layout patterns.

Do not allow arbitrary executable code, unrestricted component injection or unrestricted page composition through store settings.

Store configuration must not override security controls, API permissions or authoritative commerce rules.

## Environment Configuration

Development, testing and production environments must have separate configuration.

Environment changes must be reviewed before deployment.

Do not point a development frontend at production services unintentionally.

Production configuration must not be copied into local files or shared without authorisation.

## Environment Variables

Use environment variables for appropriate deployment and runtime configuration.

Local development may use `.env` files according to the Environment and Configuration Guide.

Do not commit local environment files containing secrets.

Document required variable names and expected formats without publishing secret values.

Validate required configuration at application startup.

Fail safely when critical configuration is missing or invalid.

## Public and Private Configuration

Public frontend configuration may contain only values intended for browser exposure.

Examples may include:

- Public API base URL.
- Public store identifier or reference.
- Publishable provider identifiers.
- Public feature configuration.

Private configuration includes:

- Database passwords.
- Supabase service-role credentials.
- Private signing keys.
- Secret API keys.
- Provider credentials.
- Internal service credentials.

Private values must remain server-side.

A store integration package must not include privileged credentials for use in a public frontend.

## Automatic Store Provisioning

Authorised store creation must automatically initiate the generation of the store-specific integration package.

The package must contain the approved public configuration and developer connection information required to build an independent storefront against the shared backend and catalogue.

Provisioning must use the authoritative store record.

Provisioning status, failures, regeneration and credential lifecycle must be managed through controlled platform operations.

Private credentials must remain protected and must not be included in the public developer package.

## Configuration Validation

Validate configuration before saving or deploying it.

Validation should cover:

- Required values.
- Data types.
- Allowed formats.
- Domain and URL validity.
- Uniqueness where required.
- Permission boundaries.
- Environment compatibility.
- Cross-field dependencies.
- Integration compatibility.

Invalid configuration must not silently become active.

## Configuration Changes

Material configuration changes must be traceable.

Record:

- Actor.
- Timestamp.
- Affected platform or store.
- Configuration item.
- Previous and new values where safe.
- Reason.
- Approval reference where required.
- Result.

Never record secret values in audit logs.

Secret changes should be represented through safe references or change events.

## Configuration Versioning

Important configuration changes should support version history or an equivalent recovery mechanism.

The platform must be able to identify which configuration was active when a significant business or technical event occurred.

Where configuration affects historical transaction interpretation, preserve the relevant transaction snapshot or reference.

## Feature Flags

Feature flags may control the gradual release of approved functionality.

Flags must have:

- An identified owner.
- A defined purpose.
- An intended scope.
- A default state.
- An expiry or review condition.
- Appropriate audit records for material changes.

Store-specific feature flags must not bypass authorisation or expose unfinished functionality to unauthorised users.

Temporary flags should be removed when no longer required.

## Domain and CORS Configuration

Store domains and allowed origins must be explicitly registered and validated.

CORS configuration must not use unrestricted origins for convenience.

Domain ownership and verification must follow the approved onboarding process.

Changes must be checked for their effect on active storefronts and integration packages.

## Integration Configuration

Integration settings must distinguish between:

- Provider identity.
- Provider account references.
- Store attribution.
- Public identifiers.
- Private credentials.
- Callback and webhook configuration.
- Environment.
- Operational status.

A provider payload must not establish store authority by itself.

Changes to integration configuration must consider pending transactions, callbacks, retries and reconciliation.

## Secret Rotation and Revocation

Private credentials must support controlled rotation and revocation.

Rotation must consider dependent services and active integrations.

Do not remove an old credential until the replacement has been verified, unless immediate revocation is required for security containment.

Record the operation without exposing the secret.

## Configuration Recovery

Configuration recovery must use an authorised previous version or documented recovery process.

Restoration must preserve security controls and store ownership.

Do not restore obsolete secrets or revoked credentials automatically.

Verify critical configuration after recovery.

## Testing Requirements

Test:

- Valid and invalid configuration.
- Missing required settings.
- Environment separation.
- Store isolation.
- Permission enforcement.
- Domain and CORS restrictions.
- Public and private configuration separation.
- Provisioning package generation.
- Configuration regeneration.
- Credential rotation and revocation.
- Recovery of previous configuration.
- Configuration changes during active operations.

## Operational Monitoring

Monitor configuration provisioning failures, invalid settings, integration failures and unexpected changes.

Alert on security-sensitive configuration changes where appropriate.

Configuration monitoring must distinguish platform-wide changes from store-specific changes.

## Open Decisions

The following require further technical agreement:

- Configuration storage strategy.
- Configuration schema and validation framework.
- Configuration version-history mechanism.
- Store setting approval boundaries.
- Feature flag implementation.
- Domain provisioning automation.
- CORS management strategy.
- Secret storage and rotation tooling.
- Configuration change notification requirements.

## Relationship to Other Documents

This document should be read with:

- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `STORE_INTEGRATION_PACKAGE_SPECIFICATION.md`
- `BACKEND_DEVELOPMENT_GUIDE.md`
- `FRONTEND_DEVELOPMENT_GUIDE.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`
- `API_VERSIONING_AND_LIFECYCLE_STANDARDS.md`
- `CHANGE_MANAGEMENT_POLICY.md`
- `STORE_ONBOARDING_GUIDE.md`
- `docs/architecture/STORE_ARCHITECTURE.md`
- `docs/architecture/INTEGRATION_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to configuration standards must be assessed for their effect on shared platform services, store autonomy, security and independently developed storefronts.
