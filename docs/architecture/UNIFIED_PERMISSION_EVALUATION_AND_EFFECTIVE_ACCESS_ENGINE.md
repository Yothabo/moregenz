# Unified Permission Evaluation and Effective Access Engine

## 1. Purpose

This specification defines how the platform calculates and enforces a user's effective permissions.

The engine MUST apply consistently across the parent company, departments, teams, shared services and stores.

Access MUST be evaluated by the backend for every protected operation.

## 2. Evaluation Inputs

The engine MUST evaluate the following information:

- Authenticated user identity.
- Account status.
- Active organisational memberships.
- Current position occupancies, where relevant.
- Active role assignments.
- Role-to-permission relationships.
- Permission scope.
- Authority assignments, where required.
- Active delegations.
- Resource ownership and organisational attribution.
- Applicable restrictions and approval requirements.
- Effective dates and expiry dates.

No single input independently establishes unrestricted access.

## 3. Evaluation Sequence

For every protected request, the backend MUST:

1. Authenticate the user.
2. Confirm the account is active.
3. Identify the requested action and resource.
4. Determine the resource's organisational ownership.
5. Retrieve applicable active role assignments.
6. Resolve permissions granted by those roles.
7. Validate each assignment's scope.
8. Apply relevant membership and lifecycle restrictions.
9. Validate delegation where applicable.
10. Validate decision authority and approval requirements.
11. Evaluate explicit restrictions and separation-of-duties rules.
12. Return an allow or deny result.

The evaluation MUST use current authoritative records, not client-supplied permission claims.

## 4. Scope Resolution

Supported scope types MUST include:

- Platform-wide.
- Parent company.
- Department.
- Team.
- Store.
- Specific resource.
- Assigned service relationship.

A permission MUST only apply within its authorised scope.

A parent-company department assignment MUST NOT automatically grant access to every store.

Access to one store MUST NOT imply access to another store.

A platform-wide scope MUST require an explicitly defined permission and authorised assignment. It MUST NOT be inferred from executive seniority or technical administration.

## 5. Multiple Roles and Memberships

A user MAY hold multiple active roles and memberships.

The engine MUST evaluate all applicable assignments independently.

Where multiple valid role assignments grant the same permission within the same resource scope, the permission MAY be satisfied by any one valid assignment unless an additional approval or restriction applies.

A permission granted in one scope MUST NOT be extended to another scope.

An expired, suspended or revoked assignment MUST NOT contribute to effective access.

## 6. Denial and Restriction Rules

The engine MUST deny access when:

- Authentication fails.
- The account is inactive.
- No applicable permission exists.
- The permission scope does not cover the resource.
- A required membership is inactive.
- The relevant assignment has expired.
- The resource is outside the user's authorised scope.
- A mandatory approval is missing.
- A separation-of-duties restriction is violated.
- A security restriction blocks the operation.

Restrictions MUST take precedence over ordinary permission grants.

An administrator MUST NOT bypass restrictions merely by changing frontend state.

## 7. Delegated Access

Delegated permissions MUST be evaluated against:

- Original authority.
- Delegate identity.
- Permitted actions.
- Organisational scope.
- Effective dates.
- Expiry.
- Delegation status.
- Restrictions inherited from the original authority.

A delegate MUST NOT receive greater authority than the original authority holder.

Delegation MUST NOT override mandatory independent approvals.

## 8. Decision Authority

Permission to access a function and authority to make a business decision are separate checks.

For actions requiring formal decision authority, the engine MUST validate both:

1. Permission to perform the operation.
2. Valid authority to make or approve the decision.

The engine MUST additionally validate required approvals before execution.

A user who can submit a decision MUST NOT automatically be allowed to approve it.

## 9. Store Isolation

For every store-owned resource, the engine MUST establish the resource's store attribution before granting access.

It MUST enforce isolation for:
- Customer records.
- Orders.
- Inventory.
- Financial transactions.
- Settlements.
- Supplier information.
- Store-specific service records.
- Private operational reports.

Cross-store access MUST require an explicit permission and scope covering the requested data.

Shared catalogue access MUST NOT grant access to another store's inventory, orders or customer records.

## 10. Effective Access Result

The engine MUST produce a structured internal decision containing:

- Decision: Allow or Deny.
- User ID.
- Requested permission.
- Resource type and ID.
- Resource organisational scope.
- Matching assignment IDs.
- Applicable authority reference, where required.
- Applicable restrictions.
- Denial reason, where applicable.
- Evaluation timestamp.
- Correlation ID.

The result MUST NOT expose sensitive internal security details to unauthorised clients.

## 11. Caching and Revocation

Permission caching MAY be used for performance.

Cached decisions MUST:
- Have a defined expiry.
- Be invalidated after relevant access changes.
- Respect membership suspension and termination.
- Respect role revocation.
- Respect delegation expiry.
- Respect organisational restructuring.
- Respect security restrictions.

High-risk actions MUST use sufficiently current authoritative access data.

Revoked access MUST NOT remain effective merely because a stale cache exists.

## 12. Audit and Monitoring

The platform MUST record material access decisions, especially:

- Denied privileged operations.
- Cross-store access attempts.
- Sensitive financial operations.
- Authority and approval checks.
- Delegated actions.
- Administrative access.
- Security restriction events.

Audit records MUST identify the user, resource, requested action, outcome and applicable assignment references.

Monitoring MUST detect repeated denial patterns and suspicious scope violations.

## 13. Relationship With Other Specifications

This engine MUST operate with:

- UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md
- UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md
- ROLE_ASSIGNMENT_DELEGATION_AND_ACCESS_REVIEW.md
- ORGANISATIONAL_MEMBERSHIP_AND_POSITION_LIFECYCLE_SPECIFICATION.md
- ORGANISATIONAL_AUTHORITY_REGISTRY_AND_DECISION_RIGHTS_SPECIFICATION.md
- UNIFIED_ORGANISATIONAL_DATA_MODEL_AND_ENTITY_RELATIONSHIPS.md
- UNIFIED_ORGANISATIONAL_API_AND_BACKEND_ENFORCEMENT_SPECIFICATION.md

## 14. Acceptance Criteria

Implementation is compliant only when:

- Every protected operation is evaluated server-side.
- Permissions are resolved from active assignments.
- Scope is checked against actual resource ownership.
- Multiple roles do not cause scope expansion.
- Restrictions take precedence over ordinary grants.
- Delegation cannot exceed original authority.
- Decision authority is checked separately from function access.
- Store-owned records remain isolated.
- Revocation invalidates effective access.
- Access decisions are auditable.
- Unauthorised requests fail closed.
