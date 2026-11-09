# Identity and Access Management

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-SEC-D43D6A668D |
| Category | Security |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the identity, authentication and access-control model for the platform.

It establishes how users authenticate, how platform and store roles are assigned, how permissions are enforced, and how access is granted, changed, suspended and revoked.

The model must support multiple independently operated stores while maintaining clear separation between platform administration and store operations.

It must align with:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/PLATFORM_BUSINESS_MODEL.md`
- `docs/product/STORE_OPERATING_MODEL.md`
- `docs/product/SCOPE_AND_EXCLUSIONS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATA_ARCHITECTURE.md`

## 2. Identity and Access Principles

The access model must follow these principles:

1. **Individual accountability:** Each human user must have an identifiable account.
2. **Separate authority:** Platform permissions and store permissions must be distinct.
3. **Explicit membership:** Store access must be granted through an authorised store membership.
4. **Least privilege:** Users receive only the permissions required for their responsibilities.
5. **Store isolation:** Store permissions apply only to the relevant store context.
6. **Backend enforcement:** Authorisation must be enforced by the backend, not trusted to the frontend.
7. **Traceability:** Important access changes and privileged actions must be attributable to an actor.
8. **Revocability:** Access must be capable of being suspended or revoked without deleting historical business records.
9. **Secure authentication:** Credentials, sessions and recovery processes must be protected.
10. **Controlled store access:** Store Admins operate within their assigned store scope. In the current application, appointment and removal of Store Admins are controlled by the Platform Super Admin.
11. **Controlled platform authority:** Platform-level privileges must not be silently inherited by store users.
12. **Provider independence:** Business identities and permissions must not depend entirely on one authentication provider.

## 3. Identity Model

### 3.1 User identity

A user represents an individual who can authenticate and interact with the platform.

Each user must have a stable internal identifier that remains consistent if the authentication provider changes.

The user identity should support:

- Internal user identifier.
- Authentication provider reference.
- Display name.
- Email address or other approved login identifier.
- Account status.
- Account creation timestamp.
- Last relevant account update.
- Account lifecycle information.

Authentication credentials must be managed by the selected authentication system rather than stored as ordinary application profile data.

### 3.2 One person, one accountable identity

The platform should maintain one accountable user identity per individual.

Where a person works with multiple stores, their store memberships should be associated with that identity rather than requiring unrelated accounts for every store.

Any account-linking or duplicate-account resolution process must verify ownership before identities are merged.

### 3.3 Identity and business records

Business records must reference the platform's internal user identifier where an actor or responsible user must be identified.

External authentication provider identifiers should be maintained as authentication references, not used as the sole identity for business ownership and historical accountability.

### 3.4 Account status

The account lifecycle should support statuses such as:

- Pending verification.
- Active.
- Suspended.
- Disabled.

The final status transitions and account recovery rules must be specified in the authentication implementation.

A disabled account must not be able to obtain new authorised access.

Disabling a user must not delete their historical activity, orders, approvals or other business records.

## 4. Authentication

### 4.1 Authentication responsibility

Authentication verifies the identity of a user.

Authorisation determines what that authenticated user is permitted to do.

These are separate responsibilities.

Successful authentication must not automatically grant access to platform administration or any store.

### 4.2 Authentication provider

The current production application uses Supabase Authentication.

The target architecture may retain Supabase Authentication or adopt another provider following technical and operational evaluation.

The selected provider must support the platform's requirements for:

- Secure sign-in.
- Credential verification.
- Session management.
- Password recovery where applicable.
- Email verification where applicable.
- Token issuance and validation.
- Account lifecycle management.
- Secure integration with the backend.

The provider decision must not change the platform's internal role and permission model.

### 4.3 Login identifiers

Email-based authentication is supported by the current application.

Additional authentication methods may be considered later if justified by business and security requirements.

The platform must define how login identifiers are verified, changed and recovered.

### 4.4 Password security

Where passwords are used:

- Passwords must be handled by the authentication provider.
- Passwords must never be stored in plaintext.
- Password reset flows must use secure, time-limited verification mechanisms.
- Password changes must follow the provider's security requirements.
- Authentication secrets must not appear in application logs or audit records.

### 4.5 Authentication failures

The platform must handle failed authentication without revealing unnecessary information about whether an account exists.

Abuse protection, rate limiting and suspicious sign-in handling must be defined during security implementation.

## 5. Authorisation Model

### 5.1 Role-based access control

The platform will use role-based access control as its primary permission assignment model.

Roles group permissions according to responsibilities.

The backend must evaluate:

- Authenticated user identity.
- Account status.
- Platform role assignments.
- Store memberships.
- Store role assignments.
- Resource ownership and scope.
- Any additional applicable restrictions.

A role name supplied by the frontend must never be accepted as proof of authority.

### 5.2 Permission checks

Permissions must be checked for every protected operation.

A permission check must establish that:

1. The user is authenticated.
2. The account is active.
3. The user has the required permission.
4. The permission applies to the relevant platform or store scope.
5. The user is authorised to access the requested resource.
6. The requested action is permitted under the applicable business rules.

### 5.3 Platform and store scopes

The platform must distinguish at least two permission scopes:

**Platform scope**

Applies to authorised platform administration and oversight.

**Store scope**

Applies to operations within one identified store.

A platform role must not automatically be interpreted as a store role.

A store role must not automatically grant platform administration rights.

### 5.4 Resource-level restrictions

Some operations require additional restrictions beyond a role permission.

Examples include:

- A user may edit a store listing but not the source identity of a product owned by another entity.
- A user may view an order only if authorised for its store context.
- A user may update inventory only within the permitted stockholding context.
- A user may access financial records only when their role permits that financial access.

Resource ownership and business rules must be evaluated in addition to role permissions.

## 6. Platform Roles

### 6.1 Platform Super Admin

The Platform Super Admin is responsible for authorised platform-level administration.

Responsibilities may include:

- Managing participating stores.
- Managing platform configuration.
- Managing platform-level access.
- Overseeing platform-wide operations.
- Accessing authorised cross-store reporting.
- Reviewing platform activity and audit records.
- Managing approved platform-wide policies.
- Coordinating platform support and governance processes.

Platform Super Admin authority must be limited to approved platform responsibilities.

It must not imply unrestricted authority to change store-owned commercial information, transfer product ownership, or make unapproved financial decisions.

### 6.2 Platform role assignment

Platform roles must be assigned through an authorised platform-level process.

The initial Platform Super Admin assignment must be established through a controlled bootstrap or provisioning process that verifies the authority of the person initiating it.

The platform must not allow an ordinary user to grant themselves platform privileges or elevate their own account.

The bootstrap process must not expose a public or generally accessible route for assigning the initial Super Admin role.

A documented recovery procedure must exist for loss or compromise of the only active Platform Super Admin account. Recovery must require independent verification of the authorised Platform Owner, use a controlled administrative process, and generate an auditable record.

Changes to the bootstrap and recovery mechanisms must receive appropriate security review.

### 6.3 Additional platform roles

Additional platform roles may be introduced when justified by operational requirements.

They must have explicit permissions, scope and assignment rules.

They must not be created merely to duplicate store-level responsibilities.

## 7. Store Roles

### 7.1 Store Admin

A Store Admin manages the authorised operations of one store.

Responsibilities may include:

- Managing store information and settings.
- Managing store product listings.
- Managing store-specific pricing and promotions.
- Managing store inventory.
- Managing store orders and fulfilment.
- Managing authorised customer information.
- Viewing permitted store financial information.
- Reviewing store activity and performance.

A Store Admin's authority is limited to the store or stores explicitly assigned to them.

A Store Admin must not automatically receive access to platform administration or another store's private operational information.

### 7.2 Future capability: Store employees

Future capability only: If employee accounts are introduced and implemented, store employees may receive permissions according to their assigned responsibilities. The current application does not support these accounts.

Potential responsibility groups include:

- Product and catalogue operations.
- Inventory operations.
- Order processing and fulfilment.
- Customer service.
- Marketing operations.
- Reporting.
- Financial administration where specifically authorised.

These are responsibility categories, not a mandatory fixed list of employee roles.

The platform should support configurable employee roles rather than requiring a separate hard-coded role for every job title.

### 7.3 Future capability: Store role assignment

Future capability only: A future implementation may allow Store Admins to manage approved employee memberships and permissions within their authorised store scope. This authority is not available in the current application.

If employee membership and permission delegation are introduced, the future implementation must prevent Store Admins from:

- Granting platform-level privileges.
- Assigning themselves privileges outside their authority.
- Granting another user permissions beyond their own delegated authority.
- Creating or modifying roles to bypass permission boundaries.
- Managing employees belonging exclusively to another store.
- Bypassing restrictions on sensitive platform or financial operations.

Any future permission delegation must be limited to permissions the Store Admin is explicitly authorised to assign. Exceptions must follow a separately approved delegation or governance rule.

The backend must enforce these restrictions if the capability is implemented. Store Admin appointment and removal remain controlled by the Platform Super Admin in the current application.

### 7.4 Future capability: Multiple store memberships

Future capability only: A future implementation may allow a user to have authorised memberships in more than one store. The current application uses one assigned Store Admin account per store.

Each membership must be evaluated independently.

Access to one store must not grant implicit access to another.

The active store context must be explicit and validated by the backend for each relevant operation.

## 8. Roles and Permission Structure

### 8.1 Role definitions

A role should contain:

- Role identifier.
- Role name.
- Scope type.
- Description.
- Permission assignments.
- Status.
- Created and updated information.

Roles must be distinguishable by scope.

A platform role and a store role with similar names must not be treated as interchangeable.

### 8.2 Permission definitions

A permission represents an authorised action on a resource or capability.

Permission definitions should identify:

- Permission identifier.
- Resource or functional area.
- Action.
- Scope.
- Description.
- Status.

Examples of actions include:

- View.
- Create.
- Update.
- Delete.
- Manage.
- Approve.
- Export.

Not every resource must support every action.

### 8.3 Future capability: Configurable employee permissions

The future workforce-management model may allow authorised Store Admins to assign approved permissions to employee roles. This functionality is not available in the current application.

The future permission catalogue and its restrictions must be centrally defined and enforced by the backend.

If this capability is implemented, Store Admins may assign only permissions they are explicitly authorised to delegate.

The future implementation must prevent Store Admins from creating permissions that bypass platform security or governance boundaries.

### 8.4 Permission changes

Permission changes must:

- Identify the affected user.
- Identify the relevant store or platform scope.
- Identify the actor making the change.
- Record the previous and resulting permissions where applicable.
- Take effect according to the approved session and authorisation rules.
- Produce an appropriate audit record.

## 9. Future Capability: Store Membership Lifecycle

The membership lifecycle described below is a proposed future capability. The current application does not support general employee memberships, employee invitations or employee-level role assignments. Current Store Admin appointments are controlled by the Platform Super Admin.

### 9.1 Membership record

A store membership connects a user to a store.

It should identify:

- Membership identifier.
- User identifier.
- Store identifier.
- Assigned role or permission set.
- Membership status.
- Invitation reference where applicable.
- Assigned by.
- Created and updated timestamps.
- Relevant lifecycle timestamps.

The membership is the basis for store-scoped access.

### 9.2 Invitation process

The platform should support controlled invitations to join a store.

An invitation should identify:

- Intended recipient.
- Store.
- Proposed role or permission set.
- Inviting actor.
- Invitation status.
- Expiry timestamp.
- Creation timestamp.
- Acceptance timestamp where applicable.

Invitation tokens must be secure, unpredictable and time-limited.

An invitation must not grant access before the required acceptance and verification steps are complete.

### 9.3 Invitation acceptance

Acceptance must verify that the person accepting the invitation is the intended recipient or otherwise satisfies the approved verification process.

The platform must prevent:

- Reuse of an accepted invitation.
- Acceptance of a revoked invitation.
- Acceptance after expiry.
- Assignment of privileges beyond those authorised by the invitation.

### 9.4 Invitation lifecycle

The invitation process should support:

- Pending.
- Accepted.
- Expired.
- Revoked.

The system must record relevant status changes.

### 9.5 Membership suspension and removal

A membership may be suspended or revoked without deleting the user identity.

When a membership is revoked, the user must lose access to the relevant store according to the approved session invalidation policy.

Historical records created by that user must remain attributable to the original actor.

## 10. Sessions and Token Management

### 10.1 Session responsibility

The authentication provider manages authentication sessions and token issuance.

The backend must validate the credentials or tokens it receives before authorising protected requests.

### 10.2 Token validation

The backend must validate relevant token properties, including:

- Signature or trusted verification result.
- Issuer.
- Audience where applicable.
- Expiry.
- Subject or user identity.
- Required authentication claims.

The backend must not trust unverified token contents.

### 10.3 Session lifecycle

The platform must support:

- Sign-in.
- Session renewal where supported.
- Sign-out.
- Session expiry.
- Session revocation where supported.
- Account suspension handling.
- Membership revocation handling.

### 10.4 Permission changes during active sessions

Permission changes must not remain ineffective indefinitely because a user has an existing session.

The implementation must define how permission changes and membership revocations are detected and enforced.

Possible mechanisms include current permission checks, short-lived claims, session versioning or explicit session revocation.

The selected approach must balance security and operational requirements.

### 10.5 Device and session visibility

The platform may introduce user-facing session and device management.

If implemented, users and authorised administrators must be able to identify and revoke relevant sessions according to the approved policy.

The exact session visibility and device limits remain to be specified.

## 11. Account Recovery and Lifecycle

### 11.1 Password recovery

Where password authentication is used, users must have a secure recovery process.

Recovery must verify control of the approved recovery channel.

Recovery tokens must expire and must not be reusable.

### 11.2 Account verification

The platform must define when email or other login identifiers require verification.

Unverified accounts must not receive privileges that require verified identity.

### 11.3 Account suspension

Accounts may be suspended where access must be temporarily blocked.

Suspension must prevent new authorised operations.

The system must preserve historical business records and audit history.

### 11.4 Account disablement

Account disablement is distinct from removing one store membership.

Disabling a user affects the user's platform account, while membership revocation affects access to a specific store.

These operations must be distinguishable.

### 11.5 Account deletion

Account deletion and personal data erasure must follow approved retention, privacy and legal requirements.

The platform must not delete financial, order or audit history indiscriminately when an account is disabled or a user requests deletion.

The detailed anonymisation and retention approach remains to be specified.

## 12. Privileged Operations

### 12.1 Sensitive actions

Sensitive operations require appropriate permissions and additional controls where justified.

Examples include:

- Granting or revoking platform roles.
- Appointing or removing Store Admins.
- Changing sensitive access permissions.
- Accessing restricted financial records.
- Performing high-impact store administration.
- Changing security configuration.

### 12.2 Additional verification

The platform may require re-authentication or additional verification for particularly sensitive operations.

The requirements must be proportionate to the risk and must be defined in the security implementation.

### 12.3 Separation of duties

Where a business process requires independent review or approval, the system should distinguish the initiating actor from the approving actor.

The database and audit records must preserve both identities.

The platform must not assume that every ordinary store operation requires platform approval.

### 12.4 Platform access to store data

Platform administrators may require access to store information for legitimate support, oversight, audit or governance purposes.

Such access must be authorised, proportionate and traceable.

The platform must distinguish ordinary platform administration from access to restricted store information.

## 13. Backend Authorisation Enforcement

### 13.1 Authoritative enforcement

The backend is the authority for access decisions.

The frontend may hide or disable controls for usability, but this does not replace backend checks.

### 13.2 Store context validation

For store-scoped requests, the backend must:

1. Authenticate the user.
2. Resolve the user's internal identity.
3. Verify the account is active.
4. Verify the relevant store membership or platform authority.
5. Resolve the required permission.
6. Verify the target resource belongs to or is accessible within that scope.
7. Execute the operation only after all checks pass.

### 13.3 Request-supplied identifiers

Store identifiers, user identifiers, role names and resource identifiers supplied by the frontend must be treated as untrusted input.

The backend must not assume that a user is authorised merely because a request contains a valid store identifier.

### 13.4 Database enforcement

Database access controls, including PostgreSQL Row-Level Security where adopted, should provide an additional layer of protection.

Database policies must align with the backend authorisation model.

Privileged database credentials must not be exposed to the frontend.

### 13.5 API protection

Protected API endpoints must declare and enforce their required permissions.

Unauthorised requests must fail without disclosing restricted information.

## 14. Audit and Accountability

### 14.1 Access-related audit events

The platform must record important identity and access events.

Examples include:

- Account creation and status changes.
- Authentication security events where appropriate.
- Invitation creation, acceptance and revocation.
- Membership creation and removal.
- Role assignments and changes.
- Permission changes.
- Platform role changes.
- Session revocation where supported.
- Sensitive access and administrative operations.

### 14.2 Audit information

Where applicable, an access audit record should identify:

- Actor.
- Affected user.
- Store or platform scope.
- Action.
- Previous and resulting state.
- Timestamp.
- Relevant request or source reference.
- Reason where required.

Secrets, passwords, authentication tokens and recovery codes must never be recorded.

### 14.3 Audit protection

Access audit records must be protected against unauthorised alteration or deletion.

Audit access must itself be permission-controlled.

Retention requirements must be defined in the platform's audit and data retention specifications.

## 15. Security Requirements

The identity and access implementation must address:

- Secure password and credential handling.
- Strong session and token validation.
- Protection against account enumeration.
- Rate limiting and abuse prevention.
- Secure invitation and recovery tokens.
- Protection against privilege escalation.
- Protection against cross-store access.
- Secure handling of authentication provider credentials.
- Appropriate transport encryption.
- Safe error handling.
- Security event monitoring.
- Timely access revocation.
- Protection of privileged accounts.

Multi-factor authentication should be evaluated for privileged platform accounts and other high-risk access.

The final authentication and security controls must be documented in the security specification.

## 16. Operational and Administrative Boundaries

The access model must preserve the approved operating relationship between the platform and participating stores.

The Platform Super Admin is responsible for platform-level authority and controls Store Admin appointments and removals.

Each Store Admin manages ordinary operations within their assigned store. Store Admins cannot create additional administrator accounts or delegate their authority.

Employee accounts, delegated employee access and routine employee permission management are future capabilities, not current operating functions.

Any future delegation model must define the authority boundaries before implementation.

Material governance, ownership, financial and other reserved decisions must follow their respective approval processes rather than being treated as ordinary access-management actions.

## 17. Current Application Access Baseline

The current application access baseline comprises:

1. Individual user identities.
2. Supabase Authentication.
3. One Platform Super Admin account.
4. One Store Admin account for Yotaabo.
5. One Store Admin account for Porschs.
6. Store-scoped access for each Store Admin.
7. Platform Super Admin control over Store Admin appointments and removals.
8. Backend-enforced authorisation and protection against cross-store access.

Employee accounts, employee invitations, delegated administrators, configurable employee permissions and general workforce membership lifecycle are not part of the current implementation. They remain future capabilities subject to approval and implementation.

Advanced identity federation, enterprise single sign-on, complex approval workflows and extensive device-management capabilities may be deferred unless required by an approved business or security need.

## 18. Open Identity and Access Decisions

The following decisions require further specification:

1. Final authentication provider strategy.
2. Email verification requirements.
3. Password and authentication policy.
4. Multi-factor authentication requirements.
5. Initial platform role bootstrap and recovery process.
6. Final platform permission catalogue.
7. Future store employee role templates, if workforce management is approved.
8. Future permission delegation boundaries, if delegated access is approved.
9. Future employee invitation expiry and resend policy, if employee accounts are introduced.
10. Session duration and renewal policy.
11. Session revocation implementation.
12. Permission refresh behaviour during active sessions.
13. Account recovery and identity verification procedures.
14. Account deletion and anonymisation requirements.
15. PostgreSQL Row-Level Security implementation.
16. Privileged action re-authentication requirements.
17. Access audit retention and review requirements.

These decisions must be resolved through the relevant business, security and technical specifications.

## 19. Relationship to Other Documents

This document must be read alongside:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/PLATFORM_BUSINESS_MODEL.md`
- `docs/product/STORE_OPERATING_MODEL.md`
- `docs/product/SCOPE_AND_EXCLUSIONS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATA_ARCHITECTURE.md`

The security architecture must define the technical controls that implement these identity and access requirements.

The API and implementation specifications must apply the permission boundaries defined here.

## 20. Governance

Changes to platform roles, store authority, permission delegation or access boundaries must be reviewed before implementation.

Changes must preserve:

- Separation between platform and store authority.
- Store-level data isolation.
- Least-privilege access.
- Individual accountability.
- Traceable permission changes.
- Secure access revocation.

New roles and permissions must have an identified operational purpose and clearly defined scope.

This document defines the approved identity and access baseline for the current application. Future identity, workforce-management and delegated-access capabilities remain subject to separate approval, specification and implementation.
