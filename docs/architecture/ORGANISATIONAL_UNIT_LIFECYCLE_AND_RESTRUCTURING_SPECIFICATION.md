# Organisational Unit Lifecycle and Restructuring Specification

## 1. Purpose

This specification defines the lifecycle and governance of organisational units across the parent company and its stores.

It covers departments, teams, stores and other approved organisational units.

The platform MUST manage organisational units through one consistent model. Stores MUST NOT use a separate organisational lifecycle or access-control model.

## 2. Organisational Unit Types

The platform MUST support these unit types:

- Parent company.
- Department.
- Team.
- Store.
- Operational unit.
- Temporary project unit.

Each unit MUST have a unique identifier and an explicit parent relationship where applicable.

A store MUST be represented as an organisational unit with its own identity, ownership history, operational records and authorised scope.

## 3. Organisational Unit Record

Each organisational unit MUST contain:

- Unique unit ID.
- Unit name.
- Unit type.
- Parent unit ID, where applicable.
- Description and purpose.
- Unit status.
- Effective start date.
- Effective end date, where applicable.
- Authorised creation record.
- Created and updated timestamps.
- Relevant governance or approval reference.

Names MUST NOT be used as primary identifiers.

Renaming a unit MUST NOT change its ID or break historical references.

## 4. Unit Lifecycle

Supported statuses:

- Proposed: Awaiting approval.
- Active: Authorised and operational.
- Suspended: Temporarily inactive.
- Restructuring: Under an approved structural change.
- Closing: Closure process underway.
- Closed: No longer operational.
- Rejected: Proposal not approved.

Only authorised users may create, activate, suspend, restructure or close units.

Every transition MUST be validated against the unit's type, parent relationship and approval authority.

## 5. Creation and Activation

Creating a unit MUST require:

1. A valid unit type.
2. An authorised parent unit, where required.
3. A documented purpose.
4. An authorised creator.
5. Required approvals.
6. An effective date.

A unit MUST NOT become active before its required approvals are complete.

A store activation MUST additionally satisfy the applicable Store Owner appointment, agreement, onboarding and operational launch requirements.

## 6. Parent and Child Relationships

The organisational hierarchy MUST be explicit.

A child unit MUST have a valid parent unless its type is authorised to exist at the root level.

The system MUST prevent:
- A unit being its own parent.
- Circular parent-child relationships.
- A child unit being attached to a closed parent.
- Unauthorised movement between unrelated organisational branches.

Moving a unit MUST create an auditable structural change.

Existing records MUST retain their original organisational attribution.

## 7. Restructuring

Restructuring includes:

- Renaming a unit.
- Moving a unit under another parent.
- Splitting a unit.
- Merging units.
- Creating or removing teams.
- Changing departmental boundaries.
- Changing store operational structure.

Every restructuring operation MUST have:
- A documented reason.
- An authorised initiator.
- Required approvals.
- An effective date.
- A defined impact assessment.
- A migration plan for affected relationships.

The system MUST NOT silently rewrite historical organisational references.

## 8. Splitting and Merging

### 8.1 Split

When one unit is split into multiple units:

- New units MUST receive new IDs.
- The original unit MUST retain its historical identity.
- Memberships MUST be assigned to destination units through explicit transitions.
- Positions and occupancies MUST be reviewed.
- Role assignments and scopes MUST be reviewed.
- Operational records MUST retain their original source attribution.

### 8.2 Merge

When units are merged:

- The surviving unit MUST be explicitly identified.
- The merged unit MUST retain its historical identity and records.
- Memberships MUST be transferred through auditable transitions.
- Position conflicts MUST be resolved.
- Role assignments MUST be reviewed.
- Duplicate operational references MUST be reconciled without deleting history.

A merge MUST NOT combine private store customer, order, inventory or financial records unless an explicitly authorised business process permits it.

## 9. Suspension and Closure

Suspension temporarily prevents normal unit operations.

Closure permanently ends the unit's operational lifecycle but does not erase its history.

Before closure, the platform MUST require an impact review covering:

- Active memberships.
- Position occupancies.
- Role assignments.
- Pending approvals.
- Open orders and fulfilment.
- Inventory and supplier obligations.
- Outstanding financial settlements.
- Customer support responsibilities.
- Domains, integrations and infrastructure.
- Data retention and legal obligations.

A unit MUST NOT close while unresolved critical obligations remain, unless an authorised exception is recorded.

## 10. Store-Specific Safeguards

A store closure, transfer or restructuring MUST preserve:

- Store identity and historical ownership.
- Customer and order attribution.
- Inventory ownership and movement history.
- Financial and settlement history.
- Product and catalogue assignment history.
- Brand and creative asset ownership records.
- Marketing and campaign history.

Cloning a store MUST create a distinct organisational unit with a new ID.

A cloned store MUST NOT inherit the original store's customers, orders, stock balances, financial records or private operational history.

Shared catalogue definitions do not create shared inventory.

## 11. Impact on Membership and RBAC

Every structural change MUST trigger a review of:

- Organisational memberships.
- Position occupancies.
- Reporting relationships.
- Role assignments.
- Permission scopes.
- Delegations.
- Approval responsibilities.

The platform MUST NOT assume that a user's previous permissions remain appropriate after restructuring.

Access MUST be recalculated and enforced by the unified RBAC model.

## 12. Audit and Recovery

Every structural operation MUST record:

- Affected unit IDs.
- Previous and resulting relationships.
- Initiating user.
- Approving authority.
- Timestamp.
- Effective date.
- Reason.
- Related migration or reconciliation records.

Failed restructuring operations MUST NOT leave partially migrated organisational relationships.

The platform MUST support controlled recovery or compensation procedures.

Historical records MUST remain attributable to the organisational structure that applied when the activity occurred.

## 13. Acceptance Criteria

Implementation is compliant only when:

- Parent company and stores use the same organisational unit model.
- Unit types and parent relationships are validated.
- Unit names can change without changing identity.
- Unit lifecycle transitions require appropriate authority.
- Splits and merges preserve historical attribution.
- Closure requires an operational impact review.
- Store closure preserves financial, customer and operational history.
- Store cloning creates independent operational records.
- Structural changes trigger membership, position and RBAC reviews.
- Failed restructuring cannot leave partial changes.
- All structural changes are auditable.
