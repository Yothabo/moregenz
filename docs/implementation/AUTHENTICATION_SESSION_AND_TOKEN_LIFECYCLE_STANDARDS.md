# Authentication Session and Token Lifecycle Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

---

## 1. Purpose

This document defines how authentication sessions, access tokens, refresh tokens, and related credentials must be created, validated, renewed, expired, revoked, and audited across the multi-store retail platform.

Its purpose is to ensure that authentication remains secure throughout the lifecycle of a user's access to the platform.

## 2. Scope

These standards apply to:

- Platform Super Admin accounts.
- Store Admin accounts.
- Store employees.
- Customer accounts where supported.
- Browser-based storefronts.
- Administrative interfaces.
- Backend APIs.
- Authentication providers.
- Service-to-service authentication.
- Future mobile and external client applications.

This document covers authentication lifecycle management. Authorisation and permission assignment remain governed by the identity and access architecture and the relevant access-control standards.

## 3. Core Principles

### 3.1 Server-Side Authority

The server is authoritative for authentication state and access permissions.

A browser must never be trusted to determine whether a user is authenticated, whether a session remains valid, or which administrative privileges the user holds.

### 3.2 Short-Lived Access

Access credentials should have limited lifetimes.

Long-lived credentials must not be exposed to browser code or embedded in public frontend configuration.

### 3.3 Revocability

The platform must provide a controlled mechanism to revoke sessions and credentials when access is no longer authorised.

Revocation must take effect within a documented and acceptable period.

### 3.4 Least Privilege

A valid authenticated session does not automatically grant access to every platform operation.

Every protected request must still enforce current permissions and the correct store scope.

### 3.5 Traceability

Authentication lifecycle events must be recorded sufficiently to investigate security incidents and administrative access changes without logging credential values.

## 4. Authentication Architecture

The platform must use an approved authentication provider or centrally managed authentication service.

The architecture must define:

- User identity source.
- Authentication method.
- Credential verification process.
- Session creation.
- Access token issuance.
- Refresh mechanism.
- Session revocation.
- Password recovery.
- Multi-factor authentication support.
- Service-to-service authentication.
- Audit event generation.

The application must not independently invent authentication rules in individual storefronts or administrative components.

### 4.1 Current and Target Architecture

The current production application uses Supabase and Netlify Functions.

Authentication behaviour must remain consistent with the deployed provider configuration until an approved migration changes the authentication architecture.

The planned NestJS modular monolith must preserve identity continuity, permission enforcement, session revocation, and auditability.

A migration must not create two independent sources of authentication authority.

## 5. Identity and Account Requirements

Every authenticated user must have a stable platform identity.

The identity must be distinct from:

- Store identifiers.
- Product identifiers.
- Customer-facing display names.
- Email addresses.
- Usernames that may change.

Account creation and role assignment must follow the approved identity and access procedures.

### 5.1 Platform Super Admin

Platform Super Admin access must be controlled through the platform's privileged account process.

The platform must prevent:

- Public self-registration as Super Admin.
- Privilege elevation through client requests.
- Unauthorised role changes.
- Uncontrolled creation of privileged accounts.

Privileged account recovery must follow a documented, independently verifiable process.

### 5.2 Store Accounts

Store Admin and employee accounts must be associated with the appropriate store membership.

A user may have more than one authorised store relationship where the business model permits it.

The active store context must be validated server-side for each protected operation.

Removing a user from a store must revoke their access to that store without incorrectly granting access elsewhere.

## 6. Authentication Methods

Supported authentication methods must be explicitly approved.

They may include:

- Email and password.
- Passwordless authentication.
- One-time verification codes.
- Multi-factor authentication.
- Approved identity-provider integrations.

The platform must not enable an authentication method without defining its recovery, expiry, abuse prevention, and audit requirements.

### 6.1 Password Requirements

Where passwords are used:

- Passwords must never be stored in plaintext.
- Passwords must be handled by an approved authentication provider or secure password-hashing implementation.
- Password reset must use a verified recovery mechanism.
- Passwords must not be included in application logs.
- Passwords must not be sent through ordinary support channels.
- Repeated authentication failures must be handled through abuse-prevention controls.

Password policy must follow current security guidance rather than relying on arbitrary complexity rules alone.

### 6.2 Multi-Factor Authentication

Multi-factor authentication should be required for privileged accounts.

The platform should support stronger authentication for sensitive operations where appropriate.

MFA enrolment, recovery, removal, and reset must be auditable.

Support staff must not bypass MFA solely because a user requests assistance.

## 7. Session Creation

A session may be created only after successful authentication.

Session creation must establish:

- Authenticated user identity.
- Session identifier or equivalent provider-managed reference.
- Issuance time.
- Expiry information.
- Authentication method.
- Relevant security context.
- Revocation capability.

The platform must not accept client-generated session identifiers as proof of authentication.

Session identifiers must be unpredictable and protected from unauthorised access.

### 7.1 Session Rotation

Where session identifiers are used, rotate them after important authentication events, including:

- Successful login.
- Privilege elevation.
- Reauthentication.
- Credential recovery.
- Other security-sensitive transitions.

Rotation must prevent session fixation.

## 8. Access Token Standards

Access tokens are credentials used to authenticate API requests.

They must be issued and validated through the approved authentication architecture.

### 8.1 Token Validation

The backend must validate all relevant token properties, including:

- Signature or trusted provider verification.
- Issuer.
- Audience.
- Expiry.
- Not-before time where applicable.
- Token type.
- Required identity claims.

The server must reject invalid, expired, malformed, or untrusted tokens.

### 8.2 Token Contents

Tokens should contain only the claims required for authentication and efficient request processing.

Avoid placing unnecessary personal information, financial information, or sensitive administrative metadata in tokens.

Store permissions and memberships must not be treated as permanently authoritative merely because they appear in a previously issued token.

Current server-side permission state or an approved revocation mechanism must be consulted for protected operations.

### 8.3 Token Exposure

Access tokens must not be:

- Embedded in frontend source code.
- Committed to version control.
- Included in public integration packages.
- Written to application logs.
- Added to analytics events.
- Placed in URLs.
- Shared through screenshots or support messages.

## 9. Refresh Token Standards

Refresh tokens allow a client to obtain new access credentials without repeating the full authentication process.

They must be protected more strictly than ordinary access tokens.

### 9.1 Rotation

Where supported, refresh token rotation should be enabled.

A previously used refresh token must not remain indefinitely reusable.

### 9.2 Reuse Detection

The authentication architecture should detect suspicious refresh token reuse.

When reuse is detected, the system should revoke the affected token family or session according to the provider's supported controls.

### 9.3 Storage

Refresh tokens must not be exposed to unnecessary JavaScript access.

Where browser cookies are used, configure secure attributes and apply CSRF protections.

Where provider-managed browser storage is used, document the security model and assess the risks.

### 9.4 Expiry

Refresh tokens must have defined inactivity and absolute expiry limits where supported.

The platform must not permit indefinitely renewable sessions without an approved security decision.

## 10. Session Expiry

Sessions must expire according to documented policy.

Expiry policy should consider:

- User role.
- Privilege level.
- Authentication method.
- Device and client type.
- Risk of the requested operation.
- Provider capabilities.

Privileged administrative sessions should use stricter expiry and reauthentication requirements than ordinary public browsing sessions.

### 10.1 Idle Expiry

The platform should support idle expiry for administrative sessions.

Activity must not be extended by meaningless background requests alone.

### 10.2 Absolute Expiry

Sessions must have an absolute maximum lifetime.

Repeated token refresh must not bypass the absolute session lifetime unless explicitly approved.

### 10.3 Reauthentication

Require fresh authentication or an approved step-up mechanism before particularly sensitive operations.

Examples include:

- Changing privileged account credentials.
- Changing MFA configuration.
- Creating or elevating privileged users.
- Changing financial settlement settings.
- Changing payment provider credentials.
- Performing sensitive account recovery actions.

## 11. Session Revocation

The platform must support revoking sessions and credentials.

Revocation triggers include:

- User logout.
- Password change or reset.
- Account compromise.
- Account suspension.
- Employee departure.
- Store membership removal.
- Privilege reduction.
- Administrative security intervention.
- Detected credential theft.
- Relevant authentication-provider security events.

### 11.1 Revocation Behaviour

Revocation must prevent continued use of the affected session within the documented revocation target.

The platform must not rely solely on access token expiry where immediate or prompt revocation is required.

Use provider revocation, session records, token versioning, or another approved mechanism.

### 11.2 Account-Wide Revocation

Authorised administrators and account owners should have a supported process to revoke all active sessions where necessary.

The process must not allow an ordinary Store Admin to revoke unrelated users outside their authorised scope.

### 11.3 Store Membership Revocation

Removing a user's store membership must immediately prevent new authorised operations in that store, subject to the documented revocation mechanism.

Existing tokens must not preserve stale store permissions indefinitely.

## 12. Logout

Logout must invalidate or revoke the relevant session and clear locally held authentication state.

The application must not treat hiding the user interface or navigating to a public page as sufficient logout.

Where a provider manages sessions, use its supported sign-out and revocation mechanisms.

For shared devices, provide a clear logout path and avoid retaining unnecessary authenticated state.

## 13. Concurrent Sessions and Devices

The platform must define its policy for concurrent sessions.

Possible controls include:

- Allowing multiple sessions.
- Limiting privileged sessions.
- Showing active sessions to users.
- Revoking individual sessions.
- Revoking all sessions.

Any session limit must be enforced server-side.

Device labels or metadata must not be treated as reliable proof of device identity.

## 14. Account Recovery

Account recovery must verify the claimant through an approved method.

Recovery procedures must not rely solely on information that is publicly discoverable or easily guessed.

### 14.1 Recovery Tokens

Recovery tokens must:

- Be generated securely.
- Have short and defined lifetimes.
- Be single-use where practical.
- Be stored securely.
- Be invalidated after successful use.
- Be excluded from logs and analytics.

### 14.2 Recovery of Privileged Accounts

Platform Super Admin recovery requires stronger controls than ordinary customer account recovery.

The process must include independent verification and appropriate audit records.

Support personnel must not create an undocumented authentication bypass.

## 15. Service-to-Service Authentication

Backend services and scheduled workers must use dedicated service credentials.

Service credentials must:

- Be issued for a specific purpose.
- Have limited permissions.
- Be stored in approved secret-management systems.
- Be rotated according to policy.
- Be revocable.
- Be excluded from frontend bundles.
- Be excluded from ordinary application logs.

A service credential must not be used as a substitute for an individual administrator's identity when recording human actions.

Automated actions must be attributed to the relevant service identity and, where applicable, the initiating user or approved job context.

## 16. Store Integration Authentication

Store integration packages may contain public configuration required by a storefront.

They must not contain:

- Service-role keys.
- Database credentials.
- Private API secrets.
- Payment provider secrets.
- Administrative tokens.
- Long-lived privileged credentials.

Public store identifiers and publishable configuration must not be treated as authentication credentials.

Every protected store operation must authenticate the caller and validate the store scope independently.

## 17. Browser and Client Storage

Authentication architecture must document where each credential is stored.

The implementation must assess:

- JavaScript accessibility.
- Cross-site request risks.
- XSS exposure.
- Browser persistence.
- Shared-device behaviour.
- Session restoration.
- Token renewal.
- Logout behaviour.

Long-lived secrets must not be stored in locations accessible to arbitrary frontend scripts without a documented security justification.

Frontend route guards are usability controls only. They do not replace backend authentication or authorisation.

## 18. Authentication Error Handling

Authentication errors must provide enough information for legitimate users to recover without revealing sensitive account or system details.

Avoid exposing:

- Whether a privileged account exists.
- Internal identity-provider configuration.
- Token validation internals.
- Credential values.
- Detailed authentication stack traces.

Authentication failures must be recorded using safe event metadata.

## 19. Audit and Monitoring

The platform must record significant authentication lifecycle events.

Events should include:

- Successful login.
- Failed login.
- Logout.
- Token refresh failure.
- Session expiry.
- Session revocation.
- Password change.
- Password recovery.
- MFA enrolment and removal.
- Privileged account recovery.
- Suspicious refresh token reuse.
- Account suspension.
- Store membership removal.

Audit records should include the relevant user or service identity, timestamp, outcome, and applicable context.

Never record raw passwords, access tokens, refresh tokens, recovery tokens, or secret values.

Authentication monitoring must support investigation of suspicious access patterns and account compromise.

## 20. Rate Limiting and Abuse Prevention

Authentication endpoints must have appropriate abuse-prevention controls.

Controls should cover:

- Login attempts.
- Password recovery requests.
- One-time code requests.
- MFA verification attempts.
- Token refresh abuse.
- Account recovery.
- Session creation.

Rate limiting must avoid unnecessarily locking out legitimate users through easily abused mechanisms.

Suspicious activity should trigger proportionate protective controls and monitoring.

## 21. Testing Requirements

Authentication lifecycle implementations must include tests for:

### Authentication

- Valid credentials.
- Invalid credentials.
- Expired credentials.
- Malformed tokens.
- Invalid token signatures.
- Incorrect issuer or audience.
- Unauthenticated API access.

### Session Lifecycle

- Session creation.
- Session rotation.
- Idle expiry.
- Absolute expiry.
- Logout.
- Session revocation.
- Concurrent session behaviour.
- Account-wide revocation.

### Token Lifecycle

- Access token expiry.
- Refresh token rotation.
- Refresh token reuse detection.
- Revoked refresh token rejection.
- Invalid token claims.
- Token exposure prevention.

### Permissions and Store Scope

- Store membership removal.
- Role reduction.
- Privilege revocation.
- Stale token claims.
- Cross-store access attempts.
- Platform Super Admin restrictions.

### Recovery and MFA

- Recovery token expiry.
- Recovery token reuse.
- Password reset.
- MFA enrolment.
- MFA recovery.
- Privileged account recovery.

### Security

- Credential leakage through logs.
- Credential exposure in frontend bundles.
- CSRF protections where cookies are used.
- Authentication endpoint rate limiting.
- Session fixation resistance.
- Service credential isolation.

## 22. Migration Requirements

Migration from the current Supabase authentication architecture to a future authentication service or NestJS implementation must be controlled.

The migration plan must define:

- Identity mapping.
- Existing user continuity.
- Password and credential migration constraints.
- Session invalidation strategy.
- Token compatibility.
- Store membership preservation.
- Privileged account handling.
- Recovery procedures.
- Rollback behaviour.
- Audit continuity.

The platform must not silently accept tokens from an untrusted issuer or allow old credentials to remain valid beyond the approved migration window.

Where existing sessions cannot be migrated safely, users must complete a controlled reauthentication process.

## 23. Acceptance Criteria

An authentication lifecycle implementation is acceptable when:

1. Authentication authority is clearly defined.
2. User identities are stable and centrally managed.
3. Access tokens are validated on protected requests.
4. Sensitive token claims are minimised.
5. Refresh tokens are securely handled.
6. Session expiry is defined and enforced.
7. Revocation takes effect within the approved target.
8. Stale permissions cannot remain authoritative indefinitely.
9. Logout invalidates the relevant session.
10. Account recovery follows verified procedures.
11. Privileged accounts receive stronger protection.
12. Service credentials are separated from human identities.
13. Public integration configuration contains no private credentials.
14. Authentication events are auditable without credential leakage.
15. Authentication endpoints have abuse-prevention controls.
16. Lifecycle and security tests pass.

## 24. Open Decisions

The following decisions require explicit approval:

- Final authentication provider and architecture.
- Access token lifetime.
- Refresh token lifetime and rotation policy.
- Idle and absolute session expiry values.
- Session revocation target.
- Concurrent session policy.
- Required MFA methods and privileged account enforcement.
- Browser credential storage strategy.
- Account recovery verification requirements.
- Service credential rotation intervals.
- Authentication event retention period.
- Migration strategy from the current provider to the target backend.

Until approved, implementations must preserve the existing production authentication architecture and must not introduce independent session authorities.

---

## 25. Review and Approval

This document remains a draft until reviewed and approved by the Platform Owner.

Approval must confirm alignment with the identity and access architecture, security architecture, secrets management standards, API security requirements, and incident response procedures.
