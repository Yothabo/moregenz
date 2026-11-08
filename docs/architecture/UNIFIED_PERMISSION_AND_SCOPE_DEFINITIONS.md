# Unified Permission and Scope Definitions

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-F2BA1F11D8 |
| Category | Architecture |
| Version | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** Authoritative access-control specification
**Applies to:** Parent company, departments, shared services and all stores
**Related documents:**
- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`

## 1. Purpose

This document defines the common permission vocabulary and scope rules used throughout the platform.

Every role MUST resolve to explicit permissions and scopes. Job titles, reporting relationships, dashboard visibility and organisational seniority MUST NOT independently grant access.

## 2. Permission structure

Every permission MUST identify:

- **Resource:** The system object being accessed.
- **Action:** What the user may do.
- **Scope:** Which organisational resources are affected.
- **Conditions:** Any additional restrictions.
- **Assignment:** The role or authorised grant providing the permission.

Permission evaluation MUST consider all five elements.

## 3. Standard actions

The platform MUST support these distinct action types:

| Action | Meaning |
|---|---|
| `view` | Read an authorised record |
| `create` | Create a new record |
| `update` | Change an existing record |
| `delete` | Permanently remove a record where permitted |
| `submit` | Submit a record or request for review |
| `review` | Examine a submission |
| `approve` | Authorise a submitted action |
| `reject` | Decline a submitted action |
| `assign` | Allocate work or responsibility |
| `manage` | Administer a defined resource within scope |
| `export` | Extract authorised records |
| `publish` | Make approved content publicly available |
| `execute` | Perform an authorised operational action |

These actions MUST NOT be treated as interchangeable. For example, `view` MUST NOT imply `export`, and `review` MUST NOT imply `approve`.

## 4. Standard organisational scopes

### 4.1 Platform scope

Applies to platform-wide infrastructure or governance resources explicitly designated for platform administration.

It MUST NOT automatically include private business records from every store.

### 4.2 Parent company scope

Applies to parent-company records, resources and operations.

It does not automatically grant access to every department's restricted records.

### 4.3 Department scope

Applies to resources owned by one assigned department.

A department assignment MUST NOT grant access to another department by default.

### 4.4 Team scope

Applies to resources assigned to a specific team or functional unit within a department.

### 4.5 Store scope

Applies to one explicitly identified store and its authorised resources.

A store-scoped permission MUST NOT apply to another store.

### 4.6 Record or task scope

Applies only to a specific record, case, order, request, project or task.

This scope MUST be used where broader access is unnecessary.

## 5. Scope inheritance

1. Scope inheritance MUST be explicitly configured.
2. A child organisational unit MAY inherit permitted access from a parent scope only where the permission definition allows it.
3. Parent-company membership MUST NOT imply store membership.
4. Department membership MUST NOT imply access to every department record.
5. Store membership MUST NOT imply access to another store.
6. Reporting relationships MUST NOT automatically expand data access.
7. A broader scope MUST NOT be inferred from a user's seniority or job title.

## 6. Conditional permissions

Permissions MAY include enforceable conditions such as:

- Transaction amount limits.
- Assignment start and expiry dates.
- Approval status.
- Required independent reviewer.
- Record ownership or assignment.
- Environment restrictions.
- Data sensitivity classification.
- Approved business purpose.

Conditions MUST be evaluated by the backend. A user interface restriction alone is insufficient.

## 7. Denial and conflict rules

1. Access MUST be denied when no active permission grants the requested action.
2. An expired, suspended or revoked assignment MUST NOT authorise access.
3. A prohibition or explicit denial MUST override an ordinary grant where the unified RBAC architecture defines that precedence.
4. Conflicting permissions MUST be resolved by a documented policy, never by arbitrary application behaviour.
5. Failure to resolve identity, scope or permission conditions MUST result in denial.
6. Emergency access MUST use the separately documented emergency-access procedure.

## 8. Sensitive actions

The following actions require additional controls where applicable:

- Financial approval and fund release.
- Settlement beneficiary changes.
- Store ownership transfer.
- Privileged role assignment.
- Production deployment.
- Security-policy changes.
- Personal-data export.
- Permanent deletion of protected records.

Each sensitive action MUST define its approval authority, separation-of-duties requirements and audit evidence.

## 9. Backend enforcement

1. Every protected API operation MUST authenticate the actor.
2. Every protected operation MUST resolve active role assignments and permissions.
3. Every operation MUST verify the requested resource's organisational scope.
4. Database access policies MUST enforce applicable data boundaries.
5. Client-side role checks MUST be treated as presentation controls only.
6. Background jobs and integrations MUST use explicit service identities and scoped permissions.
7. Direct database access MUST remain governed by database-level security and operational controls.

## 10. Permission naming

Permission identifiers MUST use a consistent resource-action convention:

`resource.action`

Examples:

- `store.view`
- `store.update`
- `product.create`
- `product.publish`
- `order.view`
- `order.update`
- `payment.verify`
- `settlement.approve`
- `inventory.adjust`
- `campaign.publish`
- `user.assign_role`

Identifiers MUST be stable, unique and documented. Applications MUST NOT invent permissions dynamically from display labels.

## 11. Acceptance criteria

This specification is satisfied only when:

- Every role resolves to explicit permissions and scopes.
- Actions remain distinct and independently assignable.
- Parent-company, department, team and store boundaries are enforced.
- Scope inheritance is explicit.
- Conditional and sensitive permissions are backend-enforced.
- Unresolved or expired access is denied.
- API, database and background-service access follow the same authority model.
- Permission decisions and sensitive actions are auditable.
