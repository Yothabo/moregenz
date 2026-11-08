# Unified Organisational RBAC Testing and Validation Standards

## 1. Purpose

This specification defines mandatory testing for the organisational model, role-based access control, authority assignments and permission evaluation engine.

Testing MUST verify that the same rules apply to parent-company departments, shared services and stores.

A successful frontend test alone MUST NOT establish that access control is secure.

## 2. Testing Layers

The engineering team MUST maintain:

- Unit tests for permission and lifecycle logic.
- Database tests for constraints and row-level security.
- API integration tests for authentication and authorisation.
- Cross-store isolation tests.
- Workflow tests for approvals and organisational changes.
- Security tests for privilege escalation.
- Regression tests for previously fixed defects.

Tests MUST run against controlled test data and isolated environments.

## 3. Identity and Membership Tests

The test suite MUST verify:

- One user can hold multiple valid memberships.
- Memberships cannot be created without required authority.
- Suspended memberships cannot satisfy access requirements.
- Ended memberships cannot grant access.
- Membership transfers preserve history.
- Ending one membership does not end unrelated memberships.
- Historical actions retain the original user and organisational attribution.

## 4. Position and Reporting Tests

The test suite MUST verify:

- Positions can exist without holders.
- Position appointments create occupancy history.
- Single-holder positions cannot have overlapping active occupancies.
- Ending an occupancy preserves its history.
- Reporting relationships cannot form cycles.
- Reporting relationships do not independently grant permissions.
- Replacements do not overwrite previous position holders.

## 5. Permission Evaluation Tests

The test suite MUST verify:

- A valid role assignment grants only its defined permissions.
- Expired and revoked assignments grant no access.
- Multiple roles do not expand authorised scope.
- Parent-company access does not imply unrestricted store access.
- Department access does not automatically grant store access.
- Delegation respects its permitted actions and expiry.
- Restrictions override ordinary permission grants.
- Missing permission results in denial.
- Missing authority results in denial for decision-controlled actions.

## 6. Cross-Store Isolation Tests

Create at least two independent test stores.

The test suite MUST attempt authorised and unauthorised access across both stores.

It MUST verify isolation of:
- Customers.
- Orders.
- Inventory balances.
- Inventory movements.
- Financial transactions.
- Settlements.
- Store-specific suppliers.
- Service requests.
- Private operational reports.

A user authorised for Store A MUST NOT retrieve or modify Store B records without a separate valid scope.

Tests MUST cover direct ID access, filtered queries, exports, background jobs and API endpoints.

Shared catalogue visibility MUST NOT expose store-specific operational records.

## 7. Approval and Authority Tests

The test suite MUST verify:

- Only authorised users can approve decisions.
- Required approval stages cannot be skipped.
- The initiator cannot approve their own action where separation of duties applies.
- Expired authority assignments are rejected.
- Delegated approval respects delegation limits.
- Rejected decisions cannot execute.
- Duplicate approval requests cannot execute an action twice.
- Emergency authority is restricted and auditable.

## 8. Organisational Restructuring Tests

The test suite MUST verify:

- Invalid parent-child relationships are rejected.
- Circular organisational hierarchies are prevented.
- Unit renaming preserves stable IDs.
- Splits and merges preserve historical attribution.
- Transfers trigger membership and access reviews.
- Closed units cannot receive new active memberships.
- Failed restructuring leaves no partially migrated state.
- Store cloning creates independent operational records.

## 9. Shared-Service Tests

The test suite MUST verify:

- Services cannot be assigned without authorised approval.
- Department membership alone does not grant store access.
- Service access is limited to the assigned store and service scope.
- Ending a service relationship revokes relationship-specific access.
- Historical service requests remain auditable.
- Service personnel cannot approve decisions reserved to the Store Owner unless separately authorised.

## 10. API and Database Security Tests

Tests MUST attempt:

- Unauthenticated requests.
- Requests with insufficient permissions.
- Requests using another user's resource IDs.
- Requests using another store's IDs.
- Direct updates to protected status fields.
- Attempts to bypass lifecycle operations.
- Invalid foreign-key references.
- Duplicate assignments.
- Expired authority references.
- Manipulated client-supplied scope values.

The backend MUST reject unauthorised operations regardless of frontend behaviour.

Database row-level security MUST be tested independently of API checks.

## 11. Regression and Release Gates

Every security or organisational defect MUST produce a regression test.

A release MUST be blocked when:
- A critical cross-store isolation test fails.
- A privilege escalation test succeeds.
- An unauthorised approval can execute.
- Historical attribution is corrupted.
- Required database constraints are missing.
- A protected operation bypasses backend enforcement.

Exceptions MUST be formally approved, documented, scoped and time-limited.

## 12. Test Evidence

Each test run MUST retain:

- Test suite and version.
- Environment.
- Test data reference.
- Execution timestamp.
- Passed and failed test counts.
- Failure details.
- Relevant build or commit reference.
- Reviewer or release approval.

Sensitive production data MUST NOT be copied into test environments without approved safeguards.

## 13. Acceptance Criteria

Implementation is compliant only when:

- All testing layers are maintained.
- Membership and position lifecycle tests pass.
- Permission and scope tests pass.
- Cross-store isolation is independently verified.
- Approval and delegation rules are tested.
- Restructuring and shared-service workflows are tested.
- API and database controls are tested independently.
- Security defects produce regression tests.
- Critical failures block release.
- Test evidence is retained and reviewable.
