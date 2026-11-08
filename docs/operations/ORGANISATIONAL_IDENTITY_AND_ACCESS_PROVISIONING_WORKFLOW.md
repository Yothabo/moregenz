# Organisational Identity and Access Provisioning Workflow

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-OPS-E223E40681 |
| Category | Operations |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This specification defines the operational workflow for creating, activating, changing, suspending and terminating user access across the parent company and all stores.

The workflow MUST use the unified organisational and RBAC architecture.

Identity creation, organisational membership, position appointment and permission assignment MUST remain separate operations.

## 2. Core Principles

- Every person MUST have one platform identity.
- One identity MAY have multiple organisational memberships.
- Every membership MUST identify its organisational unit.
- Positions MUST be assigned independently of permissions.
- Roles MUST be assigned explicitly with defined scopes.
- Access MUST only become effective after required validation and approval.
- Departures and suspensions MUST trigger access reviews.
- All changes MUST be auditable.

## 3. Identity Registration

An authorised onboarding process MAY initiate identity registration.

The workflow MUST:
1. Capture the required identity information.
2. Check for an existing platform identity.
3. Prevent duplicate identity creation.
4. Link the identity to the approved authentication provider.
5. Record the account's initial status.
6. Record the person responsible for initiating registration.

Creating an identity MUST NOT automatically create organisational membership or grant business permissions.

## 4. Organisational Admission

Before a person joins an organisational unit, the workflow MUST identify:

- User identity.
- Parent company, department, team or store.
- Membership type.
- Proposed position, if applicable.
- Responsible onboarding authority.
- Required agreements or supporting documentation.
- Effective start date.
- Required approvals.

The membership MUST remain pending until the applicable admission requirements are satisfied.

Store Owner admission MUST follow the approved recruitment, agreement and onboarding frameworks.

## 5. Position Appointment

Where a position is required:

1. Confirm the position exists and is active.
2. Verify that the position has available holder capacity.
3. Verify appointment authority.
4. Obtain required approval.
5. Create a new position occupancy.
6. Record the effective date.
7. Notify relevant organisational stakeholders.

Position appointment MUST NOT automatically grant system permissions.

## 6. Role and Permission Provisioning

Role assignment MUST be a separate controlled workflow.

The request MUST identify:

- User.
- Role.
- Organisational scope.
- Required permissions.
- Business justification.
- Effective start date.
- Expiry date, where applicable.
- Requesting authority.
- Required approver.

The backend MUST validate the assignment against active membership, role eligibility, scope and approval requirements.

Access MUST NOT become effective before approval.

## 7. Access Activation

Before activation, the platform MUST verify:

- User account is active.
- Required membership is active.
- Position requirements are satisfied.
- Role assignment is approved.
- Permission scope is valid.
- Mandatory training or agreements are complete, where applicable.
- No conflicting restriction exists.

The platform MUST record the resulting effective access state.

The user MUST receive only the access required for their assigned responsibilities.

## 8. Changes and Transfers

When a person changes responsibilities, department or store:

1. Submit an authorised change request.
2. Validate the destination membership.
3. Approve the new position, where applicable.
4. Review existing role assignments.
5. Revoke or adjust obsolete access.
6. Create required new role assignments.
7. Update reporting relationships.
8. Record the effective date.
9. Notify affected stakeholders.

The platform MUST prevent unintended overlap between old and new access scopes.

A transfer MUST NOT silently grant access to the destination store before approval.

## 9. Temporary Access

Temporary access MUST specify:

- User.
- Required role or permission.
- Organisational scope.
- Business justification.
- Authorising person.
- Start date.
- Expiry date.

Temporary access MUST expire automatically.

Extensions MUST require a new authorised decision.

Temporary access MUST NOT be used to bypass permanent role-assignment or approval requirements.

## 10. Suspension

When a person or membership is suspended:

- The affected membership MUST be suspended.
- Relevant role assignments MUST be suspended or revoked.
- Delegated access MUST be reviewed.
- Active sessions MUST be handled under identity-security controls.
- Pending approvals MUST be reassigned where necessary.
- Assigned work MUST be reviewed.
- The reason and effective time MUST be recorded.

Suspending one membership MUST NOT unintentionally suspend unrelated valid memberships.

## 11. Termination and Offboarding

When an organisational relationship ends:

1. Record the authorised termination decision.
2. End the relevant membership.
3. End applicable position occupancy.
4. Revoke relevant role assignments.
5. Revoke delegations.
6. Terminate active sessions and credentials as required.
7. Reassign pending approvals and work.
8. Recover or transfer company assets where applicable.
9. Preserve historical records.
10. Record completion of offboarding.

A person leaving one store MUST NOT automatically lose unrelated parent-company or other store memberships unless separately authorised.

## 12. Notifications

The workflow SHOULD notify relevant parties when:

- Identity registration is initiated.
- Membership is approved or rejected.
- Position appointment is completed.
- Access is activated.
- Access changes.
- Temporary access is nearing expiry.
- Membership is suspended or ended.
- Offboarding is completed.

Notifications MUST NOT disclose sensitive access details to unauthorised recipients.

## 13. Audit Requirements

Every provisioning operation MUST record:

- User affected.
- Acting user.
- Operation.
- Organisational unit.
- Previous and resulting state.
- Role and scope changes.
- Approval reference.
- Effective date.
- Timestamp.
- Reason.

Audit history MUST be retained after access is revoked.

## 14. Relationship With Other Specifications

This workflow MUST comply with:

- UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md
- ORGANISATIONAL_MEMBERSHIP_AND_POSITION_LIFECYCLE_SPECIFICATION.md
- ROLE_ASSIGNMENT_DELEGATION_AND_ACCESS_REVIEW.md
- UNIFIED_PERMISSION_EVALUATION_AND_EFFECTIVE_ACCESS_ENGINE.md
- UNIFIED_ORGANISATIONAL_API_AND_BACKEND_ENFORCEMENT_SPECIFICATION.md
- STORE_OWNER_RECRUITMENT_ASSESSMENT_AND_ADMISSION_FRAMEWORK.md
- STORE_OWNER_ONBOARDING_AND_STORE_LAUNCH_PROCEDURE.md
- PARENT_COMPANY_WORKFORCE_AND_CONTRACTOR_MANAGEMENT_POLICY.md

## 15. Acceptance Criteria

Implementation is compliant only when:

- Identity creation does not automatically grant access.
- Membership, position and role assignment remain separate.
- Admission and access activation require the appropriate approvals.
- Transfers trigger access reviews.
- Temporary access expires automatically.
- Suspension blocks the affected access.
- Offboarding revokes relevant access and delegations.
- Unrelated memberships remain intact.
- Pending work and approvals are reassigned.
- All provisioning changes are auditable.
