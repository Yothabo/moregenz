# Role Assignment, Delegation and Access Review

**Status:** Authoritative access lifecycle specification
**Applies to:** Parent company, departments, shared services and all stores
**Related documents:**
- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md`
- `APPROVAL_AUTHORITY_AND_SEPARATION_OF_DUTIES.md`
- `STORE_OWNER_AND_STORE_ADMINISTRATION_ROLES.md`

## 1. Purpose

This document governs how platform identities receive organisational membership, role assignments, delegated authority and permission changes.

Access MUST follow a controlled lifecycle. Creating a user account MUST NOT automatically grant organisational or store access.

## 2. Role assignment requirements

Every role assignment MUST contain:

- Unique assignment identifier.
- User identity.
- Role identifier.
- Organisational unit or store scope.
- Assigning authority.
- Assignment reason.
- Effective start date.
- Expiry or review date where applicable.
- Assignment status.
- Approval reference where required.

An assignment MUST NOT be activated until all required approvals and validation checks succeed.

## 3. Assignment lifecycle

The platform MUST support these lifecycle states:

- `pending`
- `active`
- `suspended`
- `expired`
- `revoked`

Only active assignments MAY authorise access.

A suspended, expired or revoked assignment MUST immediately stop authorising new actions.

Historical records MUST retain the original assignment reference.

## 4. Who may assign roles

1. Parent-company authorities MAY assign roles within their approved organisational delegation.
2. Department Heads MAY request or assign permitted departmental roles within their delegation.
3. Store Owners MAY assign permitted store personnel roles within their store.
4. Store Administrators MAY manage personnel only where explicitly delegated.
5. Privileged, financial, security and executive assignments MUST follow their designated approval rules.
6. No user MAY grant themselves additional authority.
7. No Store Owner MAY assign parent-company roles.
8. No parent-company department member MAY assign themselves Store Owner authority.

## 5. Delegated authority

Delegation is temporary permission to perform defined actions on behalf of another authority. It is not a permanent transfer of role membership.

Every delegation MUST specify:

- Delegator and delegate.
- Permitted actions.
- Resource and organisational scope.
- Start and expiry.
- Applicable limits.
- Reason and approval reference.

Delegation MUST NOT exceed the delegator's authority or bypass separation-of-duties controls.

## 6. Role changes and organisational transfers

When a user changes department, position, store or responsibilities:

1. The existing assignment MUST be reviewed.
2. Unneeded permissions MUST be revoked.
3. New permissions MUST be granted through a new authorised assignment.
4. Historical actions MUST remain attributed to the original user and assignment.
5. Access MUST NOT expand automatically because of a reporting-line change.
6. Cross-store work MUST use separate store-scoped assignments.

## 7. Suspension and termination

Access MUST be suspended or revoked when:

- Employment or contractual engagement ends.
- A Store Owner or personnel assignment ends.
- A security incident requires access restriction.
- An assignment expires.
- An authorised authority withdraws access.
- The user no longer requires the access.

Revocation MUST prevent future access without deleting historical records.

Where immediate suspension is required, the platform MUST support emergency access revocation without waiting for a routine review.

## 8. Access reviews

1. Every active assignment MUST be periodically reviewed.
2. Privileged and sensitive assignments MUST receive more frequent reviews than ordinary operational access.
3. Reviewers MUST be authorised and independent where required.
4. Review outcomes MUST support retain, modify, suspend and revoke.
5. Unreviewed high-risk assignments MUST be escalated.
6. Review evidence and decisions MUST be retained.

The review schedule and escalation periods MUST be defined in the platform's access-review policy configuration.

## 9. Temporary and external access

Contractors, consultants, agency personnel and temporary workers MUST receive individual assignments.

Each assignment MUST have:
- Named identity.
- Explicit task and scope.
- Minimum required permissions.
- Expiry date.
- Responsible internal sponsor.

Temporary access MUST expire automatically unless renewed through approval.

## 10. Audit and notification

The platform MUST record:

- Assignment creation and approval.
- Role and scope changes.
- Delegation creation and revocation.
- Suspension and reinstatement.
- Expiry and revocation.
- Access-review decisions.
- Acting authority and reason.

Relevant users and responsible authorities MUST receive notifications for material access changes.

Audit records MUST NOT be editable by ordinary role administrators.

## 11. Acceptance criteria

This specification is satisfied only when:

- Every role assignment has an identified user, role and scope.
- Pending assignments cannot authorise access.
- Self-elevation is prevented.
- Delegations are limited and expire.
- Role changes remove obsolete permissions.
- Cross-store access requires separate assignments.
- Revocation takes effect without deleting history.
- Periodic access reviews are recorded and escalated.
- All access lifecycle events are auditable.
