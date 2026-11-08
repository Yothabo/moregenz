# Unified Organisational Administration Console Specification

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-BA4D961474 |
| Category | Architecture |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This specification defines the administrative interface for managing the parent company's organisational structure and its relationships with stores.

The console MUST use the unified organisational data model, authority registry and permission evaluation engine.

It MUST NOT introduce a separate administrative role or permission system.

## 2. Administrative Scope

The console MUST support authorised administration of:

- Parent-company departments.
- Teams and organisational units.
- Store organisational records.
- Organisational memberships.
- Positions and reporting relationships.
- Role assignments.
- Permission scopes.
- Delegations.
- Approval authorities.
- Shared-service relationships.
- Organisational lifecycle changes.

Each operation MUST be restricted to the user's effective authority and assigned scope.

## 3. Console Areas

### 3.1 Organisation Overview

Display the organisational hierarchy, including:
- Parent company.
- Departments.
- Teams.
- Shared-service units.
- Stores.
- Store-level teams and positions.

Users MUST only see organisational information permitted by their scope.

### 3.2 Department and Team Administration

Authorised administrators MAY:
- Create organisational units.
- Update names and descriptions.
- Assign parent organisational units.
- Assign department heads and team leads.
- Change reporting relationships.
- Activate, suspend or archive units.

Changes MUST preserve organisational history.

### 3.3 Store Administration

The console MUST distinguish:
- Store identity and status.
- Store Owner assignment.
- Store personnel and positions.
- Parent-company service relationships.
- Store operational configuration.
- Store access assignments.

Changing a Store Owner MUST NOT create a new store or erase its history.

### 3.4 Membership and Position Administration

Authorised administrators MAY:
- Invite or register organisational members.
- Assign members to organisational units.
- Assign positions.
- Change reporting relationships.
- Suspend or terminate memberships.
- Review current and historical assignments.

Membership, position and user identity MUST remain separate records.

### 3.5 Role and Permission Administration

The console MUST reference the approved role catalogue and permission definitions.

Administrators MUST NOT create unrestricted permissions through free-text configuration.

Role assignment MUST include:
- Member.
- Role.
- Organisational scope.
- Effective start.
- Expiry, where applicable.
- Assigning authority.
- Approval reference, where required.

Every assignment MUST pass backend authorisation.

### 3.6 Delegation and Approval Administration

The console MUST support authorised delegation and approval configuration.

Delegations MUST specify:
- Delegating authority.
- Recipient.
- Permitted actions.
- Scope.
- Start and end dates.
- Restrictions.
- Revocation status.

Delegation MUST NOT grant greater authority than the delegator possesses.

## 4. Administrative Workflows

Every administrative action MUST follow this sequence:

1. Authenticate the acting member.
2. Load effective permissions and scope.
3. Validate authority for the requested change.
4. Display the affected records and consequences.
5. Obtain required approval.
6. Apply the change through the backend.
7. Record the audit event.
8. Notify affected parties where required.
9. Refresh relevant organisational views.

The interface MUST NOT treat a successful button click as proof that a backend operation succeeded.

## 5. Change Impact and Validation

Before consequential changes, the console MUST identify affected relationships.

Examples include:
- Moving a team to another department.
- Reassigning a department head.
- Changing a Store Owner.
- Suspending a membership.
- Revoking a role.
- Restructuring a shared-service relationship.

The backend MUST reject changes that violate organisational constraints or leave required authority assignments invalid.

## 6. Access and Visibility

The console MUST distinguish:
- View permission.
- Create permission.
- Update permission.
- Suspend or archive permission.
- Role assignment permission.
- Approval permission.
- Authority administration permission.

Access to the console MUST NOT imply access to every administrative function.

Store Owners MAY manage permitted store-level records but MUST NOT administer parent-company departments or other stores.

Parent-company administrators MUST still operate within their assigned authority.

## 7. Historical Records

Organisational changes MUST preserve:
- Previous values.
- New values.
- Effective dates.
- Acting member.
- Approval reference.
- Reason for change.
- Audit event reference.

Historical assignments MUST remain available to authorised audit and reporting workflows.

Deleting an organisational unit MUST NOT cascade-delete its historical memberships, transactions or audit records.

## 8. Interface Requirements

The console MUST provide:
- Search and filtering.
- Hierarchical navigation.
- Record detail views.
- Permission-aware actions.
- Confirmation for consequential changes.
- Clear validation errors.
- Change history.
- Effective and expiry dates.
- Approval status.
- Accessible loading, empty and failure states.

The interface MUST clearly distinguish active, pending, suspended and archived records.

## 9. Backend Enforcement

All writes MUST pass through authorised backend services.

The backend MUST independently validate:
- Actor identity.
- Effective permission.
- Organisational scope.
- Record ownership.
- Approval requirements.
- Lifecycle constraints.

Hiding a control in the interface MUST NOT be considered an access-control mechanism.

Direct database changes outside approved administrative workflows MUST be restricted and audited.

## 10. Relationship With Other Specifications

This specification MUST operate with:

- UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md
- UNIFIED_ORGANISATIONAL_DATA_MODEL_AND_ENTITY_RELATIONSHIPS.md
- UNIFIED_ORGANISATIONAL_API_AND_BACKEND_ENFORCEMENT_SPECIFICATION.md
- UNIFIED_PERMISSION_EVALUATION_AND_EFFECTIVE_ACCESS_ENGINE.md
- ORGANISATIONAL_MEMBERSHIP_AND_POSITION_LIFECYCLE_SPECIFICATION.md
- ORGANISATIONAL_UNIT_LIFECYCLE_AND_RESTRUCTURING_SPECIFICATION.md
- ORGANISATIONAL_AUTHORITY_REGISTRY_AND_DECISION_RIGHTS_SPECIFICATION.md
- UNIFIED_ORGANISATIONAL_AUDIT_TRAIL_AND_CHANGE_HISTORY_SPECIFICATION.md

## 11. Acceptance Criteria

Implementation is compliant only when:

- One administrative console supports the parent company and stores.
- All actions use the unified permission model.
- Administrative scope is enforced by the backend.
- Store Owners cannot administer unrelated stores or parent-company structures.
- Role assignments require valid scope and authority.
- Consequential changes expose their impact before execution.
- Required approvals are enforced.
- Historical organisational records are preserved.
- Administrative actions produce audit events.
- Failed operations do not appear as successful changes.
