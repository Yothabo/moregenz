# Secrets and Credential Management Standards

| Metadata | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines how secrets, credentials, keys and other sensitive authentication material must be created, stored, accessed, rotated and revoked across the multi-store retail platform.

Its objectives are to:

- Prevent credential exposure.
- Establish consistent secret ownership.
- Separate public configuration from private credentials.
- Restrict access according to least privilege.
- Define rotation and revocation procedures.
- Reduce the impact of compromised credentials.
- Protect development, staging and production environments.
- Support the current deployment architecture and future backend migration.

Secrets management is a security control. It must not depend on developers remembering to keep sensitive values private.

## 2. Scope

This standard applies to:

- Database credentials.
- Supabase service-role keys.
- API keys.
- JWT signing and verification keys.
- OAuth client secrets.
- Payment provider credentials.
- Email provider credentials.
- Storage access credentials.
- Webhook signing secrets.
- Encryption keys.
- Session and token signing material.
- CI/CD deployment credentials.
- Administrative recovery credentials.
- Third-party integration credentials.
- Local development secrets.

It applies to developers, administrators, deployment systems, application services and approved third-party integrations.

## 3. Definitions

### 3.1 Secret

A value that must remain confidential because possession of it could grant access, authorize an operation or expose protected information.

### 3.2 Credential

Information used to establish identity or authenticate a user, service or system.

### 3.3 Public configuration

Information intentionally designed for delivery to browser clients.

Public configuration is not a secret, even when it identifies a platform project or public API endpoint.

### 3.4 Private credential

A credential that must remain within an authorized server-side or controlled operational environment.

### 3.5 Secret owner

The person or responsible team accountable for the purpose, access, rotation and revocation of a secret.

## 4. Core Principles

### 4.1 No secrets in source control

Private credentials must never be committed to Git repositories.

This includes application source files, configuration examples, documentation, scripts, test fixtures and generated artifacts.

### 4.2 Least privilege

Each secret must grant only the permissions required by its intended workload.

Broad administrative credentials must not be used for ordinary application operations.

### 4.3 Environment separation

Development, staging and production must use separate credentials wherever the infrastructure supports it.

A development credential must not grant access to production data.

### 4.4 Server-side protection

Private credentials must never be delivered to browser clients, mobile applications or public integration packages.

### 4.5 Controlled lifecycle

Every production secret must have an identifiable owner and a documented rotation and revocation procedure.

## 5. Secret Classification

Secrets must be classified according to the potential impact of exposure.

| Classification | Examples | Handling |
|---|---|---|
| Critical | Database administrator credentials, production signing keys, service-role keys | Strictly restricted |
| High | Payment provider secrets, deployment credentials, webhook signing secrets | Restricted |
| Standard | Limited-scope service API keys | Controlled access |
| Public | Public API endpoints and browser-safe keys | May be published intentionally |

A public key must not be treated as a private secret merely because its name contains `KEY`.

Its actual provider permissions and intended exposure must determine its classification.

## 6. Secret Ownership

Every production secret must have:

- A documented purpose.
- An accountable owner.
- An associated system or integration.
- An environment scope.
- An access policy.
- A rotation method.
- A revocation method.
- A recovery procedure.

Secrets without an identifiable owner must be investigated and either assigned or retired.

Ownership must not depend solely on an individual developer's personal account.

## 7. Approved Storage

Secrets must be stored in approved secret-management systems or protected deployment environment variables.

Acceptable mechanisms may include:

- Managed cloud secret stores.
- Approved CI/CD secret stores.
- Protected hosting environment variables.
- Secure local development environment files excluded from source control.

The selected mechanism must provide appropriate access control and protection for the environment.

Secrets must not be stored in:

- Source code.
- Public repositories.
- Frontend environment variables.
- Browser local storage.
- Browser session storage.
- URL query parameters.
- Public object storage.
- Unprotected shared documents.
- Chat messages or issue comments.
- Unencrypted backups.

## 8. Environment Separation

Each environment must have its own credentials where supported.

At minimum, production credentials must be isolated from development credentials.

Requirements:

- Development services use development credentials.
- Staging services use staging credentials.
- Production services use production credentials.
- Test automation must not use unrestricted production credentials.
- Local development must not require copying production secrets.
- Environment-specific credentials must not be reused without an approved reason.

A deployment must not silently fall back to a different environment's credentials when configuration is missing.

## 9. Frontend and Browser Exposure

Frontend code is public code.

Any value included in a browser bundle, browser network request or public configuration response must be treated as publicly accessible.

The following must never be exposed to browser clients:

- Database passwords.
- Supabase service-role keys.
- Payment provider secret keys.
- Private API credentials.
- JWT signing secrets.
- Webhook signing secrets.
- Private storage credentials.
- Deployment tokens.
- Administrative recovery secrets.

Browser-safe public keys may be exposed only where the provider explicitly supports that usage and the associated server-side security policies are correctly configured.

A frontend environment variable prefix does not make a value secret.

## 10. Store Integration Credentials

Each store may receive a store-specific integration package.

The package must distinguish public configuration from private credentials.

Public configuration may include:

- Store identifier.
- Approved public API base URL.
- Public storefront configuration.
- Public integration version.
- Approved browser-safe keys.

Private credentials must remain server-side.

Store integration packages must not contain:

- Platform administrator credentials.
- Database service-role credentials.
- Shared provider master secrets.
- Private signing keys.
- Other stores' credentials.
- Unrestricted platform API tokens.

Store-specific integration credentials must be scoped to the intended store and integration capabilities.

## 11. Platform and Store Administrative Access

Platform Super Admin access must remain separate from ordinary Store Admin access.

Secrets used for platform-level administration must not be shared with store administrators.

Store Admin credentials must not grant access to:

- Another store's private data.
- Platform-wide secret management.
- Infrastructure administration.
- Database administration.
- Platform recovery controls.

Administrative access must use the platform's identity and access controls rather than distributing shared master passwords.

## 12. Secret Creation

Secrets must be generated using cryptographically secure methods appropriate to their purpose.

Requirements:

- Avoid predictable values.
- Avoid hard-coded credentials.
- Avoid manually invented production secrets.
- Use provider-supported generation mechanisms where appropriate.
- Use sufficient entropy.
- Record the secret owner and intended scope.
- Avoid unnecessary duplication of secret values.

Production secrets must not be derived from usernames, store names, dates or other predictable information.

## 13. Secret Distribution

Secrets must be distributed only through approved secure channels.

Requirements:

- Verify the recipient's authorization.
- Share only the required secret.
- Avoid sending credentials through ordinary chat or email.
- Avoid including secrets in support tickets.
- Avoid placing secrets in screenshots.
- Use short-lived access mechanisms where supported.
- Remove temporary access after the task is complete.

A secret must not be copied into documentation merely to make setup instructions easier.

Documentation must describe where a value belongs, not reproduce its private contents.

## 14. Access Control

Access to secrets must be restricted by role and operational need.

The access model must consider:

- Secret classification.
- Environment.
- Application or service identity.
- Human operator role.
- Business purpose.
- Duration of access.
- Approval requirements.

Developers must not automatically receive production secret access merely because they can access the source repository.

Production secret access should be granted only to authorized personnel and services.

## 15. Service Credentials

Applications and background workers must use dedicated service identities where supported.

Service credentials must:

- Have narrowly scoped permissions.
- Be associated with a specific workload.
- Be stored outside source code.
- Be rotated and revocable.
- Be monitored for unusual use.
- Avoid unnecessary sharing between services.

A single unrestricted credential must not be reused across unrelated application modules when separate permissions can be provided.

## 16. Credential Rotation

Production secrets must have a documented rotation policy.

Rotation frequency must consider:

- Credential sensitivity.
- Provider capabilities.
- Exposure risk.
- Access scope.
- Regulatory or contractual requirements.
- Operational impact.

Rotation must also occur when:

- A credential is suspected to be compromised.
- An authorized holder leaves or changes responsibilities.
- A provider requires rotation.
- A credential is found in source control or logs.
- Access scope has changed.
- A security incident requires replacement.

The platform must not rely on a fixed calendar interval as the only rotation trigger.

## 17. Safe Rotation Procedure

A rotation procedure should include:

1. Identify the secret and affected workloads.
2. Confirm the authorized owner.
3. Generate or obtain the replacement credential.
4. Store the replacement in the approved secret manager.
5. Update the relevant application configuration.
6. Deploy or reload the affected workload.
7. Verify successful authentication and operation.
8. Confirm that the old credential is no longer required.
9. Revoke the old credential.
10. Record the rotation outcome.

Where the provider supports overlapping credentials, use a controlled transition to reduce downtime.

Where overlap is not supported, plan the change and recovery procedure before revoking the existing credential.

## 18. Emergency Revocation

Suspected compromise requires immediate assessment and, where appropriate, revocation.

The response must:

- Identify the affected credential.
- Determine its permissions and scope.
- Revoke or disable it.
- Replace it through an approved process.
- Identify affected services.
- Review access and activity logs.
- Assess potential data exposure.
- Check for unauthorized changes.
- Record the incident.
- Verify that the compromised credential can no longer be used.

Credential revocation must not be delayed merely to preserve application convenience.

Where immediate revocation could interrupt critical operations, the incident owner must coordinate a safe replacement while containing the exposure.

## 19. Secret Leakage Response

If a secret is exposed:

1. Treat it as compromised.
2. Do not assume deleting the visible copy is sufficient.
3. Identify all locations where it may have been copied.
4. Revoke or rotate the credential.
5. Review repository history and deployment artifacts.
6. Review logs and provider activity.
7. Remove the exposed value from accessible locations where possible.
8. Assess whether unauthorized access occurred.
9. Document remediation.
10. Add preventive controls to reduce recurrence.

Removing a secret from the latest Git commit does not remove it from repository history, forks, caches or existing clones.

The credential must still be revoked.

## 20. Logging and Error Handling

Application logs must never record secret values.

Sensitive values must be redacted from:

- Request headers.
- Authorization headers.
- Environment dumps.
- Exception messages.
- Provider request details.
- Deployment output.
- Debug traces.
- Background job payload logs.

Logs may record a safe secret reference or identifier where operationally necessary.

Error messages must not reveal credentials, signing material or provider authentication details.

## 21. CI/CD and Deployment Credentials

CI/CD credentials must be stored in the approved CI/CD secret-management facility.

Requirements:

- Use the narrowest available permissions.
- Separate deployment credentials by environment.
- Restrict production deployment access.
- Avoid long-lived personal access tokens where alternatives exist.
- Rotate credentials when access changes or compromise is suspected.
- Prevent secrets from appearing in build output.
- Restrict access to protected deployment workflows.
- Review repository and workflow permissions.

A successful build must not print secret values as part of diagnostic output.

## 22. Local Development

Local development credentials must remain outside version control.

Developers should use:

- Local environment files excluded through `.gitignore`.
- Safe example files containing placeholders.
- Development-specific provider accounts or projects.
- Restricted test credentials.
- Documented setup instructions.

The repository may include an example environment file with variable names and non-secret placeholders.

It must not include real credentials.

Local tools must avoid printing complete environment contents during diagnostics.

## 23. Secret Scanning

Repositories and deployment workflows should use automated secret detection.

Scanning should cover:

- New commits.
- Pull requests.
- Repository history where supported.
- Configuration files.
- Build artifacts where appropriate.
- Known credential patterns.

A detected secret must be investigated.

False positives may be documented, but real exposed credentials must be revoked or rotated.

Secret scanning does not replace careful handling by developers.

## 24. Encryption

Secrets must be protected in transit and at rest.

Requirements:

- Use secure transport for secret delivery.
- Use provider-supported encryption at rest.
- Restrict access to encryption keys.
- Separate encryption key management from protected data where practical.
- Avoid hard-coding encryption keys.
- Define recovery and rotation procedures.
- Protect backups containing encrypted secrets.

Encryption does not replace access control or secret lifecycle management.

## 25. Third-Party Provider Credentials

Credentials for external providers must be managed according to their integration purpose.

Examples include:

- Payment providers.
- Email delivery services.
- Supabase.
- Netlify.
- Object storage.
- Monitoring services.
- Authentication providers.
- Webhook integrations.

Each integration must document:

- Credential owner.
- Provider account.
- Environment.
- Required permissions.
- Storage location.
- Rotation method.
- Revocation method.
- Operational contact or recovery path.

Shared provider accounts must use separate credentials or restricted scopes where supported.

## 26. Audit and Access Review

Secret-management activity must be reviewed periodically.

The review should identify:

- Active secrets.
- Unused credentials.
- Overprivileged credentials.
- Unowned secrets.
- Expired credentials.
- Unusual access.
- Stale deployment tokens.
- Credentials associated with former personnel.
- Secrets shared across environments unnecessarily.

Access changes and emergency rotations must be recorded.

The review frequency must be defined by the platform's security governance process.

## 27. Backup and Recovery

Secret recovery must be planned without exposing secret values unnecessarily.

The platform must document:

- Which secrets can be regenerated.
- Which secrets require provider recovery.
- Which credentials need secure backup.
- Who can authorize recovery.
- How production access is restored.
- How compromised credentials are replaced.
- How dependent services are verified.

A backup must not become an uncontrolled copy of production credentials.

## 28. Current and Target Architecture

The current production platform uses Netlify Functions, Supabase/PostgreSQL and a React/Vite frontend.

Production secrets must remain in protected server-side or hosting environment configuration.

The frontend may receive only explicitly approved public configuration.

Supabase service-role credentials must never be included in the browser bundle.

The target NestJS modular monolith should use a centralized secret-access mechanism or approved secret-management integration.

Application modules should receive only the credentials required for their responsibilities.

Migration must preserve environment separation, access restrictions and rotation procedures.

## 29. Testing Requirements

Tests and security checks must cover:

### Exposure prevention
- No production secrets in source control.
- No private credentials in frontend bundles.
- No credentials in public configuration.
- No secrets in application logs.
- No secrets in error responses.

### Access control
- Unauthorized secret access is denied.
- Store administrators cannot access platform secrets.
- Store-specific credentials cannot access another store.
- Services receive only required permissions.

### Lifecycle
- Credential rotation.
- Old credential revocation.
- Emergency credential replacement.
- Expired credential handling.
- Deployment after secret replacement.

### Operational security
- Secret scanning.
- Build output inspection.
- Environment separation.
- Backup and recovery.
- Provider credential failure handling.

## 30. Acceptance Criteria

A secrets-management implementation complies with this standard when:

- Every production secret has an owner and purpose.
- Secrets are stored in approved protected systems.
- Production and non-production credentials are separated.
- Private credentials never enter frontend code.
- Access follows least privilege.
- Rotation and revocation procedures are documented.
- Credential exposure triggers a defined response.
- Logs and errors redact sensitive values.
- CI/CD credentials are protected.
- Secret scanning is enabled where supported.
- Recovery procedures are documented.
- Automated checks verify exposure prevention.

## 31. Open Decisions

The following decisions require explicit platform approval:

- Primary production secret-management service.
- Secret ownership register.
- Rotation intervals by credential category.
- Emergency revocation authority.
- Production access approval process.
- Secret scanning tools and enforcement.
- CI/CD credential model.
- Encryption key management approach.
- Secret recovery and backup procedure.
- Periodic access review frequency.

Until approved, production credentials must remain restricted to the smallest authorized group and must not be shared through informal channels.

## 32. Related Documents

- Security Architecture
- Security Implementation Guide
- Identity and Access Architecture
- Environment and Configuration Guide
- Deployment Architecture
- Release Management and Deployment Procedure
- Dependency and Supply Chain Security Standards
- Third-Party Vendor and Service Provider Management Policy
- Store Integration Package Specification
- File and Object Storage Management Standards
- Background Jobs and Scheduled Task Processing Standards
- Platform Audit Trail and Administrative Activity Standards
- Observability and Logging Standards
- Incident Response Playbook
- Backup and Disaster Recovery
