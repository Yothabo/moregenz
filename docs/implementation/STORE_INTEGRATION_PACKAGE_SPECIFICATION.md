# Store Integration Package Specification

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

This document specifies the implementation requirements for generating and managing the integration package used by an independently developed store frontend.

The package connects a store's frontend to the shared platform backend and product catalogue while preserving store isolation, security and independent frontend development.

## Scope

This specification covers:

- Store-specific integration package provisioning.
- Package contents and structure.
- Public configuration and private credentials.
- Frontend developer access and handover.
- Package versioning and regeneration.
- Credential rotation and revocation.
- Domain and deployment configuration.
- Provisioning failures and recovery.
- Testing and operational monitoring.

It does not define final API endpoints, credential formats, environment variable names or package file schemas. Those must be established through approved implementation decisions and actual API contracts.

## Core Requirements

The integration package is a required capability of store onboarding.

When an authorised Platform Super Admin creates a store, the platform must automatically initiate generation of the store's integration package.

The package must be associated with the authoritative store record.

Each store must receive its own configuration and integration context.

All participating store frontends connect to the shared backend and catalogue through the supported API.

A store's frontend must not receive privileged platform or database credentials.

## Provisioning Trigger

Package generation must be initiated by the successful creation of an authorised store record.

The process must not depend on a developer manually creating credentials or assembling configuration values.

The provisioning process must use the store record and approved platform configuration as its source of truth.

Repeated provisioning requests must not create uncontrolled duplicate credentials, package records or integration registrations.

The process must support safe retries and recovery from partial failures.

## Provisioning Lifecycle

The expected lifecycle is:

1. Platform Super Admin submits an authorised store creation request.
2. Backend validates the request and creates the store record.
3. Store-specific integration provisioning is initiated.
4. Required store-scoped public configuration is generated.
5. Domain, API and catalogue configuration is prepared.
6. Developer documentation and integration resources are assembled.
7. Package contents are validated.
8. Package availability and provisioning status are recorded.
9. An authorised developer receives access through the approved handover process.
10. The store frontend is developed, tested and connected.
11. The integration is verified before storefront activation.

The store record remains authoritative throughout the process.

## Package Identity

Every package must be associated with:

- The relevant store.
- The authoritative store identifier.
- A package identifier or equivalent reference.
- A package version.
- Its provisioning status.
- Its creation and update timestamps.
- Its configuration version.
- Its access and distribution records.

A package must never be transferable between stores without an explicit, authorised provisioning process.

## Required Package Contents

The generated package must provide the information needed to develop and connect the store frontend.

The exact file structure remains an implementation decision, but the package should provide the following categories.

### Store identification

- Store identifier or approved public reference.
- Store display name and approved public identity.
- Store integration reference.
- Relevant environment designation.

### API connection information

- Supported API base URL.
- API version information.
- Required endpoint documentation.
- Authentication and session integration instructions.
- Store-context handling requirements.
- Error and response conventions.

### Public configuration

- Store-scoped public identifiers where required.
- Publishable keys where supported.
- Public frontend configuration.
- Approved domain and CORS information.
- Public media and asset configuration.

### Product catalogue integration

- Catalogue access instructions.
- Product and variant data contracts.
- Product availability and listing rules.
- Product media handling.
- Search, filtering and pagination conventions.
- Relevant catalogue examples.

### Developer resources

- API documentation references.
- Request and response examples.
- Environment configuration examples.
- Supported SDK or client resources where available.
- Frontend integration instructions.
- Local development and testing guidance.
- Deployment and domain configuration instructions.

The package must not contain fabricated endpoints or configuration values. Generated documentation must reflect the actual supported API contract and configuration.

## Package Structure

The package format must be machine-readable where configuration is intended for application use and human-readable where developer instructions are required.

The final file names, directory structure, manifest schema and distribution format remain open implementation decisions.

The package should distinguish clearly between:

- Public frontend configuration.
- Developer documentation.
- Environment-specific configuration.
- Non-public operational information that must remain server-side.

Do not combine private credentials with files intended for browser delivery.

## Public and Private Credentials

Public configuration may be included in a frontend package when the values are specifically designed for public use.

Examples include approved store identifiers, public API configuration and publishable provider keys.

The package must never expose:

- Database passwords.
- PostgreSQL connection strings containing credentials.
- Supabase service-role keys.
- Private signing secrets.
- Backend service credentials.
- Privileged provider credentials.
- Administrative access tokens.
- Private encryption keys.

Private credentials must remain in approved server-side secret management.

The backend must enforce store context and permissions independently of values supplied by the frontend.

A public store identifier is not proof of identity, ownership or permission.

## Store Context

Every store frontend must operate within its assigned store context.

The backend must validate the store context for every relevant request.

The backend must not trust a store identifier supplied by a browser without verifying that the request is authorised for that store.

A frontend must not be able to switch to another store's data by changing a configuration value or request parameter.

Shared catalogue access must follow the product ownership, availability and permission rules defined by the product catalogue architecture.

## Frontend Developer Handover

The package must be made available to authorised developers through a controlled handover process.

The handover must include:

- Store identity and integration reference.
- Package version.
- Relevant environment information.
- Public configuration.
- API and catalogue documentation.
- Development and testing instructions.
- Deployment and domain requirements.
- Known limitations and outstanding dependencies.

Access must be limited to developers authorised for the relevant store.

A developer working on one store must not automatically receive private configuration or administrative access for another store.

Handover and package access must be recorded.

## Domain and CORS Configuration

The package must identify the approved frontend domain configuration requirements.

The backend must apply explicit origin rules.

Wildcard origins must not be used as a shortcut for production configuration where restricted origins are required.

Development, staging and production origins must be distinguishable.

Domain changes must trigger the appropriate configuration review and package update.

A domain registration or hosting account must not automatically grant access to platform administration or another store's data.

## Environment Separation

Packages and their configurations must distinguish supported environments.

Development configuration must not accidentally connect to production services.

Production credentials and privileged settings must not be copied into local development examples.

Environment-specific configuration must be validated before deployment.

The package must identify the environment for which its configuration is intended.

## Package Access and Distribution

Package access must be authenticated and authorised.

The platform must avoid exposing package contents through publicly guessable URLs or unrestricted storage locations.

Where packages are downloadable, access must be controlled and revocable.

Distribution records should identify the package version, recipient, store and handover time.

A package containing only public configuration may be distributed more broadly than a package containing operational information, but it must still be associated with the correct store.

## Versioning

Packages must be versioned.

A package version must identify the configuration and contract generation used to produce it.

Regeneration must not silently overwrite the history of an earlier package.

The platform must retain enough information to determine which package version a frontend was developed against.

Breaking API or configuration changes must be communicated through an appropriate versioning and migration process.

## Regeneration

An authorised change to store configuration may require package regeneration.

Examples include:

- Store domain changes.
- API base URL changes.
- Public identifier changes.
- Catalogue integration changes.
- Supported authentication changes.
- API contract changes.
- Environment configuration changes.

Regeneration must preserve store identity and must not create duplicate store records.

The platform must identify which package version is current and whether an older package remains supported.

## Credential Rotation and Revocation

Credentials and public identifiers must have an appropriate lifecycle.

Where a credential is compromised or no longer required, the platform must support revocation or rotation.

Rotation must not be treated as complete until the relevant backend configuration and authorised frontend deployment have been updated and verified.

Private credentials must never be exposed to developers merely to simplify rotation.

Revocation of an integration credential must not automatically delete store business records or historical transactions.

## Provisioning Status

The platform must record provisioning status.

The exact status values remain an implementation decision, but the lifecycle must distinguish successful completion, pending work, failure and recovery where relevant.

A store must not be treated as technically ready merely because its store record exists.

The platform must make provisioning failures visible to authorised administrators.

## Failure Handling and Recovery

Provisioning must be recoverable.

A failure during package generation must not leave an apparently complete package with missing or invalid configuration.

Retries must be safe and must not create duplicate registrations or credentials.

The platform must record enough information to investigate failures without logging private secrets.

Recovery must validate the generated package before making it available for handover.

If provisioning cannot complete, the store creation record must remain traceable and the failure must be visible to authorised administrators.

## Security Requirements

The implementation must enforce:

- Authorised store creation.
- Store-scoped package generation.
- Restricted package access.
- Public and private credential separation.
- Server-side store-context enforcement.
- Credential rotation and revocation.
- Audit records for provisioning and access.
- Secure storage and transmission.
- No secrets in browser bundles, source control or logs.
- Protection against cross-store package access.

Security verification must include attempts to access or use another store's package and configuration.

## Audit and Monitoring

Record significant events, including:

- Package provisioning initiated.
- Provisioning completed or failed.
- Package generated or regenerated.
- Package accessed or downloaded.
- Package version changed.
- Configuration changed.
- Credential rotated or revoked.
- Developer access granted or withdrawn.

Logs must not contain private credentials or unnecessary personal information.

Monitoring must identify repeated provisioning failures, stale configurations and integration errors.

## Testing Requirements

Tests must verify:

- Store creation initiates provisioning.
- The correct store record is used.
- Repeated requests do not create uncontrolled duplicates.
- Package contents match the approved configuration.
- Public configuration contains no privileged secrets.
- Package access is restricted.
- Store context is enforced by the backend.
- Cross-store package access is denied.
- Regeneration produces a traceable version.
- Revoked credentials no longer authorise requests.
- Provisioning failures can be recovered safely.
- Development and production configuration remain separated.

Tests must include both permitted and denied operations.

## Operational Responsibilities

The Platform Owner is responsible for approving the provisioning capability and its security boundaries.

Platform administrators are responsible for authorised store creation and oversight of provisioning status.

Developers are responsible for using the correct package and following its integration instructions.

The backend implementation is responsible for enforcing access, store context and credential security.

Store Admins remain responsible for their store's operational content and authorised storefront decisions.

## Implementation Constraints

The implementation must not:

- Require manual credential creation for every new store.
- Expose privileged secrets to frontend developers.
- Treat a public store identifier as an authorisation mechanism.
- Allow frontend configuration to override backend access controls.
- Generate a package using unverified store data.
- Silently replace package versions.
- Allow one store's package to configure another store.
- Introduce unsupported API endpoints or invented environment variables.
- Make a store active before required integration checks are complete.

## Open Implementation Decisions

The following require explicit technical decisions:

- Package file format and manifest schema.
- Package storage and distribution mechanism.
- Package versioning format.
- Public identifier and publishable key strategy.
- Authentication and session integration format.
- SDK or starter-template strategy.
- Domain registration and CORS automation.
- Package expiry and access revocation model.
- Provisioning job and retry implementation.
- Package compatibility and deprecation policy.

These decisions must be recorded before implementation depends on specific formats or technologies.

## Relationship to Other Documents

This document should be read with:

- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `FRONTEND_DEVELOPER_GUIDE.md`
- `STORE_ONBOARDING_GUIDE.md`
- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `API_DEVELOPMENT_GUIDE.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`
- `IMPLEMENTATION_ROADMAP.md`
- `docs/architecture/API_ARCHITECTURE.md`
- `docs/architecture/INTEGRATION_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to the package contract, provisioning lifecycle or credential boundaries must be reviewed before implementation.

The package specification must remain aligned with the actual backend API, security architecture and store onboarding process.
