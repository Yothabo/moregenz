# Organisational Membership and Position Lifecycle Specification

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-43414BAD54 |
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

This specification defines how people become members of the parent company, its departments, teams and stores.

It establishes the relationship between:
- User identity.
- Organisational membership.
- Organisational positions.
- Role assignments.
- Reporting relationships.
- Employment or contractual status.

Membership and position records MUST NOT independently grant system permissions. Access is governed by the unified RBAC architecture and role-assignment specifications.

## 2. Authoritative Relationship

The platform MUST treat the following as separate records:

1. **User Identity:** Identifies the person using the platform.
2. **Organisational Membership:** Records the person's formal association with an organisational unit.
3. **Position:** Represents an authorised organisational seat or responsibility.
4. **Position Occupancy:** Records which person holds a position and during which period.
5. **Role Assignment:** Grants defined permissions within an approved scope.
6. **Reporting Relationship:** Defines organisational supervision and accountability.

A person may have multiple memberships, positions and role assignments where authorised.

A position MUST NOT automatically grant permissions. A role assignment MUST explicitly establish the permissions and scope.

## 3. Membership Model

An organisational membership links one user to one organisational unit.

Supported organisational units include:
- Parent company.
- Department.
- Team.
- Store.
- Approved operational unit.

Each membership MUST contain:
- Unique membership ID.
- User ID.
- Organisational unit ID.
- Membership type.
- Membership status.
- Effective start date.
- Effective end date, when applicable.
- Created by.
- Creation timestamp.
- Last updated timestamp.
- Reason for creation or change.

Membership types MUST distinguish employment, contract, ownership, partnership, temporary engagement and other formally approved relationships.

The system MUST NOT assume that every member is an employee.

## 4. Membership Lifecycle

Membership statuses:

- Pending: Created but not yet approved or activated.
- Active: Current organisational association.
- Suspended: Temporarily inactive.
- Ended: Association has formally ended.
- Rejected: Proposed membership was not approved.

Permitted lifecycle transitions MUST be enforced.

A membership MUST have an authorised creator and, where required, an independent approver.

Activation MUST validate:
- User identity.
- Organisational unit status.
- Membership type.
- Required documentation or agreements.
- Required approvals.
- Effective dates.

Suspension MUST NOT delete historical records.

Ending a membership MUST record the effective end date and reason. Historical activity and accountability MUST remain attributable to the original member.

## 5. Position Model

A position represents an approved organisational seat, not a person or permission.

Examples include:
- Finance Head.
- Marketing Team Lead.
- Store Owner.
- Inventory Controller.
- Customer Support Supervisor.

Each position MUST contain:
- Unique position ID.
- Position title.
- Organisational unit ID.
- Position description.
- Position category.
- Reporting position ID, where applicable.
- Position status.
- Whether the position is single-holder or multi-holder.
- Creation and approval records.

Positions MUST be linked to valid organisational units.

A position MUST NOT be used to bypass role assignment, permission scope or approval controls.

## 6. Position Occupancy

Position occupancy records connect a user to a position for a defined period.

Each occupancy MUST contain:
- Unique occupancy ID.
- Position ID.
- User ID.
- Effective start date.
- Effective end date, when applicable.
- Occupancy status.
- Appointment authority.
- Approval reference.
- Reason for appointment or change.

The system MUST support vacant positions.

When a person leaves a position, the occupancy MUST end. The position itself remains available unless separately abolished.

For single-holder positions, overlapping active occupancies MUST be prohibited.

A replacement MUST receive a new occupancy record. The system MUST NOT overwrite the previous holder's historical record.

## 7. Reporting Relationships

Reporting relationships define accountability and supervision.

They MUST be stored separately from permissions and role assignments.

A reporting relationship MUST identify:
- Reporting person.
- Supervising person.
- Relevant organisational unit.
- Effective start and end dates.
- Relationship type.
- Authorising person.

The platform MUST support:
- Direct reporting.
- Functional reporting.
- Temporary reporting.
- Approved cross-department reporting.

Reporting relationships MUST NOT automatically grant access to the subordinate's confidential records.

Access to information remains subject to explicit permissions and scope.

The system MUST prevent circular reporting relationships.

## 8. Transfers and Organisational Changes

A transfer MUST create or activate the destination membership and update the previous membership through an auditable transition.

Where a person changes department, team or store:
- Previous membership history MUST be retained.
- New membership MUST reference the destination unit.
- Existing role assignments MUST be reviewed.
- Permissions MUST be adjusted independently.
- Reporting relationships MUST be updated where authorised.
- Outstanding approvals and responsibilities MUST be reassigned explicitly.

A transfer MUST NOT silently preserve access to the previous organisational scope.

## 9. Suspension and Termination

When a person's organisational relationship is suspended or terminated:

1. Membership status MUST be updated.
2. Relevant position occupancy MUST be ended or suspended.
3. Role assignments MUST be reviewed and revoked or suspended as appropriate.
4. Active sessions and credentials MUST be handled under identity-security controls.
5. Outstanding approvals and assigned work MUST be reassigned.
6. Historical records MUST remain available to authorised auditors.

Termination of one membership MUST NOT automatically terminate unrelated memberships.

The platform MUST support a person who belongs to multiple organisational units.

## 10. Relationship With Unified RBAC

This specification MUST operate together with:

- UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md
- UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md
- UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md
- ROLE_ASSIGNMENT_DELEGATION_AND_ACCESS_REVIEW.md
- APPROVAL_AUTHORITY_AND_SEPARATION_OF_DUTIES.md
- PARENT_COMPANY_DEPARTMENT_AND_FUNCTIONAL_STRUCTURE_SPECIFICATION.md

Membership establishes organisational association.

Position establishes organisational responsibility.

Role assignment establishes authorised system capabilities.

Permission scope establishes where those capabilities may be exercised.

Reporting establishes accountability.

These concepts MUST NOT be merged into one field or one record.

## 11. Audit and Historical Integrity

All membership, position, occupancy and reporting changes MUST be auditable.

Audit records MUST identify:
- Previous state.
- New state.
- Acting user.
- Timestamp.
- Reason.
- Approval reference, where required.

Historical records MUST NOT be physically deleted through ordinary administration.

Corrections MUST use an auditable amendment process.

The platform MUST preserve the organisational context applicable when a historical action occurred.

## 12. Acceptance Criteria

Implementation is compliant only when:

- A user can hold multiple organisational memberships.
- Membership and position records are independent of role assignments.
- Positions can exist without current holders.
- Position appointments preserve previous occupancy history.
- Single-holder positions cannot have overlapping active holders.
- Transfers preserve historical attribution.
- Reporting relationships do not independently grant permissions.
- Suspension and termination trigger access reviews.
- Ending one membership does not unintentionally end unrelated memberships.
- All lifecycle changes are auditable.
- Backend enforcement prevents unauthorised membership and position changes.
