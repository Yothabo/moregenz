# Unified Organisational Data Model and Entity Relationships

## 1. Purpose

This specification defines the logical data model for the parent company and all participating stores.

The platform MUST use one organisational data model. Corporate departments, teams and stores MUST NOT maintain separate identity, membership or authority structures.

This document defines logical entities and relationships. Physical table names, database types and migrations MUST follow the approved implementation architecture.

## 2. Identity and Organisation Entities

### 2.1 User

Represents an authenticated person.

Required attributes:
- User ID.
- Identity-provider reference.
- Account status.
- Created timestamp.
- Updated timestamp.

Authentication credentials MUST remain under the identity provider's security controls.

### 2.2 OrganisationalUnit

Represents the parent company, department, team, store, operational unit or project unit.

Required attributes:
- Unit ID.
- Unit type.
- Name.
- Parent unit ID.
- Status.
- Effective dates.
- Created and updated timestamps.

The parent unit relationship MUST support a hierarchical organisational structure without circular references.

### 2.3 OrganisationalMembership

Connects a user to an organisational unit.

Required attributes:
- Membership ID.
- User ID.
- Unit ID.
- Membership type.
- Status.
- Start date.
- End date.
- Approval reference.

A user MAY have multiple memberships.

## 3. Positions and Reporting

### 3.1 Position

Represents an approved organisational seat.

Required attributes:
- Position ID.
- Unit ID.
- Title.
- Description.
- Position category.
- Holder capacity.
- Status.
- Reporting position ID.

### 3.2 PositionOccupancy

Records a user's appointment to a position.

Required attributes:
- Occupancy ID.
- Position ID.
- User ID.
- Start date.
- End date.
- Status.
- Appointment approval reference.

Historical occupancies MUST be retained.

### 3.3 ReportingRelationship

Records formal reporting or supervision.

Required attributes:
- Relationship ID.
- Reporting user ID.
- Supervising user ID.
- Relevant unit ID.
- Relationship type.
- Start date.
- End date.
- Status.

Reporting relationships MUST remain separate from permissions.

## 4. Access-Control Entities

### 4.1 Role

Defines a reusable set of permissions.

Required attributes:
- Role ID.
- Role name.
- Description.
- Role category.
- Status.
- Version.

### 4.2 Permission

Defines an individual permitted action.

Required attributes:
- Permission ID.
- Permission key.
- Description.
- Resource category.
- Action.
- Status.

Permission keys MUST be unique.

### 4.3 RolePermission

Associates permissions with roles.

Required attributes:
- Role ID.
- Permission ID.
- Assignment metadata.

Duplicate role-permission relationships MUST be prevented.

### 4.4 RoleAssignment

Connects a user to a role within an explicit scope.

Required attributes:
- Assignment ID.
- User ID.
- Role ID.
- Scope type.
- Scope unit ID.
- Status.
- Start date.
- End date.
- Assigning user.
- Approval reference.

A role assignment MUST NOT grant access beyond its approved scope.

## 5. Authority Entities

### 5.1 AuthorityDefinition

Defines an approved decision right.

Required attributes:
- Authority ID.
- Name.
- Decision category.
- Description.
- Applicable scope type.
- Status.
- Version.

### 5.2 AuthorityAssignment

Connects an authority definition to a user or position.

Required attributes:
- Assignment ID.
- Authority ID.
- User ID or Position ID.
- Scope unit ID.
- Start date.
- End date.
- Status.
- Approval reference.

The assignment MUST identify exactly one authority holder type unless an explicitly approved group-authority model is introduced.

### 5.3 DecisionRecord

Records a formal business decision.

Required attributes:
- Decision ID.
- Decision category.
- Subject.
- Initiator user ID.
- Responsible authority ID.
- Affected unit ID.
- Status.
- Outcome.
- Decision timestamp.

### 5.4 DecisionApproval

Records each approval or rejection.

Required attributes:
- Approval ID.
- Decision ID.
- Approver user ID.
- Authority assignment ID.
- Outcome.
- Reason.
- Timestamp.

Approvals MUST be independently auditable.

## 6. Shared-Service Entities

### 6.1 ServiceDefinition

Defines a service owned by a parent-company department.

Required attributes:
- Service ID.
- Owning department ID.
- Name.
- Description.
- Status.
- Service-level reference.

### 6.2 StoreServiceRelationship

Connects a store to an approved shared service.

Required attributes:
- Relationship ID.
- Store unit ID.
- Service ID.
- Responsible department ID.
- Scope.
- Status.
- Start date.
- End date.
- Approval reference.

### 6.3 ServiceRequest

Tracks work requested under a service relationship.

Required attributes:
- Request ID.
- Service relationship ID.
- Requesting user ID.
- Assigned user ID.
- Status.
- Priority.
- Due date.
- Completion reference.

## 7. Relationship Rules

The logical relationships MUST support:

- User 1-to-many OrganisationalMembership.
- OrganisationalUnit 1-to-many child OrganisationalUnit.
- OrganisationalUnit 1-to-many OrganisationalMembership.
- OrganisationalUnit 1-to-many Position.
- Position 1-to-many historical PositionOccupancy.
- User 1-to-many PositionOccupancy.
- Role many-to-many Permission through RolePermission.
- User 1-to-many RoleAssignment.
- Role 1-to-many RoleAssignment.
- AuthorityDefinition 1-to-many AuthorityAssignment.
- DecisionRecord 1-to-many DecisionApproval.
- Department 1-to-many ServiceDefinition.
- Store 1-to-many StoreServiceRelationship.
- ServiceDefinition 1-to-many StoreServiceRelationship.
- StoreServiceRelationship 1-to-many ServiceRequest.

Every relationship MUST use stable identifiers, not names.

## 8. Integrity and Constraint Requirements

The database MUST enforce:

- Primary-key uniqueness.
- Foreign-key integrity.
- Valid organisational unit types.
- Valid lifecycle statuses.
- Valid effective-date ranges.
- No circular organisational hierarchy.
- No overlapping occupancy for single-holder positions.
- No duplicate active role assignment for the same user, role and scope.
- No duplicate active store-service relationship where only one is permitted.
- No approval referencing an unrelated decision.
- No authority assignment outside its valid organisational scope.

Where historical overlap is legitimate, the relevant entity MUST support explicit effective dates and status rules.

## 9. Store Data Isolation

Organisational relationships MUST NOT weaken store data isolation.

Every store-owned operational record MUST retain its store ID or an explicit ownership reference.

The database and backend MUST enforce store-scoped access for:
- Orders.
- Customers and private customer activity.
- Inventory balances and movements.
- Financial transactions.
- Settlements.
- Supplier records where store-confidential.
- Store-specific operational requests.

Shared catalogue definitions MUST remain distinct from store-specific stock and commercial records.

Cross-store reporting MUST require explicit permissions and an authorised scope.

## 10. Historical Integrity

Memberships, occupancies, role assignments, authority assignments and service relationships MUST use lifecycle records rather than destructive replacement.

Completed decisions and approvals MUST preserve the identities and organisational context applicable at the time.

Corrections MUST be recorded through an auditable amendment process.

## 11. Implementation Boundary

This is the logical source-of-truth model.

Before implementation, the engineering team MUST map each entity to:
- Physical database table.
- Primary and foreign keys.
- Unique constraints.
- Check constraints.
- Row-level security policies.
- Backend validation.
- API operations.
- Audit events.

No entity MUST be duplicated merely because it is used by both a parent-company department and a store.

## 12. Acceptance Criteria

Implementation is compliant only when:

- Parent company and stores share the same organisational entities.
- Identity, membership, position, role and authority remain separate.
- All relationships use stable IDs.
- Database constraints enforce structural integrity.
- Historical assignments remain queryable.
- Store-owned operational data remains isolated.
- Shared services are represented through explicit relationships.
- Authority and approval records are linked and auditable.
- Backend and database enforcement agree with the logical model.
