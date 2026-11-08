# Organisational Authority Registry and Decision Rights Specification

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-DC34D20023 |
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

This specification defines how decision-making authority is represented, assigned, checked and audited across the parent company and its stores.

The platform MUST maintain one consistent authority model for corporate departments, shared services and store operations.

Authority MUST NOT be inferred solely from job titles, department membership, seniority or technical access.

## 2. Authority Model

The platform MUST distinguish five concepts:

1. **Organisational responsibility:** The unit or position responsible for a business function.
2. **Decision authority:** The right to make a defined business decision.
3. **Approval authority:** The right to approve or reject a proposed action.
4. **Execution authority:** The right to carry out an approved action.
5. **Oversight authority:** The right to review, audit or intervene within an approved governance scope.

These authorities MUST be independently identifiable.

Possessing one authority MUST NOT automatically grant the others.

## 3. Authority Registry

The platform MUST maintain a central registry of defined decision rights.

Each authority definition MUST contain:

- Unique authority ID.
- Authority name.
- Description.
- Decision category.
- Applicable organisational scope.
- Responsible organisational unit.
- Eligible positions or roles.
- Required permissions.
- Approval requirements.
- Delegation rules.
- Separation-of-duties requirements.
- Effective date.
- Status.

Authority definitions MUST be versioned. Changes MUST NOT rewrite the authority applicable to historical decisions.

## 4. Decision Categories

The registry MUST support, at minimum:

- Corporate governance.
- Organisational restructuring.
- Department operations.
- Store appointment and succession.
- Store commercial decisions.
- Product and catalogue governance.
- Pricing and promotions.
- Marketing and brand approvals.
- Procurement and supplier decisions.
- Inventory adjustments.
- Payments and settlements.
- Refunds and financial adjustments.
- Customer data access.
- Legal and compliance matters.
- Platform administration.
- Security and incident response.
- Infrastructure and production releases.
- Service delivery and escalation.

New categories MUST be added through an authorised registry amendment.

## 5. Authority Assignment

An authority assignment connects a defined decision right to an authorised person or organisational position.

Each assignment MUST record:

- Assignment ID.
- Authority ID.
- Assigned user or position.
- Applicable organisational scope.
- Effective start and end dates.
- Assignment status.
- Assigning authority.
- Approval reference.
- Reason.
- Audit timestamps.

Assignments MUST be validated against the person's active membership, position occupancy and role assignments.

An authority assignment MUST NOT override the user's permission scope.

## 6. Decision Records

A decision requiring formal authority MUST create a decision record.

Each record MUST contain:

- Unique decision ID.
- Decision category.
- Subject and description.
- Affected organisational units.
- Initiating user.
- Responsible authority.
- Decision status.
- Supporting evidence.
- Required approvals.
- Decision outcome.
- Decision date.
- Execution reference, where applicable.

Supported statuses MUST include:

- Draft.
- Submitted.
- Under review.
- Awaiting approval.
- Approved.
- Rejected.
- Withdrawn.
- Executing.
- Completed.
- Failed.
- Reversed, where reversal is permitted.

The platform MUST preserve the complete decision history.

## 7. Approval Validation

Before an approval is accepted, the backend MUST verify:

1. The authority definition is active.
2. The approver has a valid authority assignment.
3. The assignment covers the affected organisational scope.
4. Required permissions are present.
5. Required supporting evidence exists.
6. Separation-of-duties requirements are satisfied.
7. The decision has not already been finalised.
8. Any required independent approvals are complete.

A user interface control MUST NOT be treated as proof of authority.

The backend is the final enforcement point.

## 8. Store and Parent-Company Boundaries

Parent-company authority applies only to decisions within its defined governance and platform responsibilities.

Store-level authority applies only to the relevant store and its authorised operations.

A parent-company department MUST NOT acquire unrestricted store decision authority merely because it provides a shared service.

A Store Owner MUST retain the decision rights reserved to that Store Owner by the applicable agreement and governance framework.

Where corporate approval is also required, both authority requirements MUST be satisfied.

## 9. Delegation

Delegation MUST be explicit, limited and auditable.

Each delegation MUST specify:

- Original authority holder.
- Delegate.
- Authority being delegated.
- Organisational scope.
- Permitted actions.
- Restrictions.
- Start and expiry dates.
- Authorising person.
- Approval reference.

Delegation MUST NOT exceed the delegator's own authority.

Delegated authority MUST expire automatically at its recorded expiry date.

Delegation MUST NOT bypass mandatory independent approval or separation-of-duties controls.

## 10. Conflicts and Authority Changes

If authority assignments conflict, are expired or cannot be validated, the affected decision MUST be blocked.

The platform MUST identify the conflict and route it to the designated governance authority.

Changes to positions, memberships, reporting relationships or organisational structure MUST trigger an authority assignment review.

Authority changes MUST NOT retroactively alter completed decisions.

## 11. Emergency Authority

Emergency authority MUST be separately defined and restricted to approved emergency categories.

Each emergency action MUST record:

- Incident reference.
- Acting user.
- Emergency authority invoked.
- Scope and duration.
- Reason for bypassing normal workflow, if applicable.
- Actions performed.
- Review authority.
- Post-incident review outcome.

Emergency authority MUST NOT become a permanent alternative approval route.

## 12. Audit and Reporting

The platform MUST retain:

- Authority definition changes.
- Authority assignments and revocations.
- Delegations.
- Decision submissions.
- Approval and rejection events.
- Execution outcomes.
- Emergency actions.
- Post-decision amendments.

Reports MUST support filtering by authority, decision category, organisational unit, user, status and period.

Sensitive decision records MUST remain restricted to authorised scopes.

## 13. Relationship With Other Specifications

This specification MUST operate with:

- UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md
- UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md
- APPROVAL_AUTHORITY_AND_SEPARATION_OF_DUTIES.md
- ROLE_ASSIGNMENT_DELEGATION_AND_ACCESS_REVIEW.md
- ORGANISATIONAL_MEMBERSHIP_AND_POSITION_LIFECYCLE_SPECIFICATION.md
- ORGANISATIONAL_UNIT_LIFECYCLE_AND_RESTRUCTURING_SPECIFICATION.md
- CENTRAL_SHARED_SERVICES_AND_STORE_SERVICE_RELATIONSHIP_SPECIFICATION.md

The approval and separation-of-duties specification remains authoritative for approval workflow controls. This document defines the registry and representation of decision rights.

## 14. Acceptance Criteria

Implementation is compliant only when:

- Decision rights are centrally defined and versioned.
- Authority assignments have explicit scopes and effective dates.
- Membership and position do not independently grant decision authority.
- Decision records identify the responsible authority.
- Backend validation is mandatory.
- Parent-company and store authority boundaries are enforced.
- Delegation is restricted and auditable.
- Conflicting or expired authority blocks decisions.
- Emergency authority is controlled and reviewed.
- Historical decisions preserve the authority applicable at the time.
