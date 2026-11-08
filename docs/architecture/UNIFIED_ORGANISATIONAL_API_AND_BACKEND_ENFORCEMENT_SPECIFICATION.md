# Unified Organisational API and Backend Enforcement Specification

## 1. Purpose

This specification defines the backend API and enforcement requirements for the unified organisational model.

All organisational operations MUST use controlled backend services. The frontend MUST NOT directly modify protected organisational, membership, authority or access-control records.

The same API and enforcement model MUST apply to parent-company departments, teams and stores.

## 2. API Design Principles

The organisational API MUST:

- Use stable entity IDs.
- Enforce authentication on protected operations.
- Enforce permissions and organisational scope server-side.
- Validate lifecycle transitions.
- Preserve historical records.
- Apply approval requirements before execution.
- Record auditable changes.
- Prevent cross-store data exposure.
- Return consistent errors and resource representations.

Frontend visibility MUST NOT be treated as an authorisation control.

## 3. API Resource Groups

The backend MUST expose logically separated resource groups.

### 3.1 Organisational Units

Operations:
- List authorised organisational units.
- Retrieve a unit by ID.
- Create a unit proposal.
- Update permitted unit attributes.
- Submit a unit for approval.
- Activate, suspend or close a unit.
- Initiate restructuring.

### 3.2 Memberships

Operations:
- List memberships within authorised scope.
- Retrieve a membership.
- Propose a membership.
- Approve or reject a membership.
- Activate, suspend or end a membership.
- Transfer a membership to another unit.

### 3.3 Positions and Occupancies

Operations:
- Create and update positions.
- Retrieve positions and vacancies.
- Appoint a position holder.
- End or suspend an occupancy.
- Record reporting relationships.
- Review position history.

### 3.4 Roles and Permissions

Operations:
- Retrieve available roles.
- Retrieve role permission definitions.
- Propose role assignments.
- Approve assignments where required.
- Revoke or suspend assignments.
- Review effective access.

These operations MUST comply with the unified RBAC specifications.

### 3.5 Authority and Decisions

Operations:
- Retrieve authority definitions.
- Create or amend authority assignments.
- Submit formal decisions.
- Record approvals or rejections.
- Execute approved decisions.
- Retrieve decision history.

### 3.6 Shared Services

Operations:
- Define shared services.
- Assign services to stores.
- Activate or suspend service relationships.
- Create and assign service requests.
- Record delivery and completion.
- Review service history.

## 4. Request Validation

Every protected request MUST validate:

1. Authenticated user identity.
2. Active account status.
3. Required permission.
4. Applicable organisational scope.
5. Relevant membership status.
6. Relevant role assignment status.
7. Authority assignment where a decision is involved.
8. Required approval state.
9. Entity lifecycle status.
10. Request data integrity.

The backend MUST reject requests that fail any mandatory validation.

## 5. Lifecycle Enforcement

Lifecycle changes MUST use explicit backend operations.

Clients MUST NOT directly set protected status fields through generic update operations.

Examples:
- A membership transfer MUST invoke a transfer workflow.
- A position appointment MUST create an occupancy record.
- A unit closure MUST invoke closure validation.
- A role revocation MUST create an auditable assignment transition.
- An authority change MUST validate the acting user's authority.

The backend MUST prevent invalid state transitions.

## 6. Transaction and Concurrency Controls

Operations that affect multiple related entities MUST execute transactionally where supported.

Examples include:
- Unit restructuring.
- Membership transfers.
- Position replacement.
- Role revocation and replacement.
- Service relationship termination.
- Approved decision execution.

The backend MUST prevent duplicate execution and conflicting concurrent updates.

Operations that cannot be completed atomically MUST use a tracked workflow with retry and compensation handling.

## 7. Database Enforcement

The database MUST enforce appropriate:

- Foreign keys.
- Unique constraints.
- Check constraints.
- Effective-date rules.
- Store ownership constraints.
- Row-level security policies.
- Audit persistence requirements.

Backend validation MUST complement database enforcement, not replace it.

Service-role credentials MUST remain server-side. They MUST NOT be exposed to browser clients.

## 8. Response and Error Standards

API responses MUST use consistent structures.

Successful responses MUST identify:
- Resource ID.
- Current state.
- Relevant effective dates.
- Resulting operation status.

Errors MUST distinguish:
- Unauthenticated request.
- Insufficient permission.
- Scope violation.
- Invalid lifecycle transition.
- Missing approval.
- Conflicting update.
- Missing resource.
- Validation failure.
- Operational failure.

Error responses MUST NOT disclose confidential data or internal security details.

## 9. Audit and Idempotency

Every material mutation MUST record:
- Acting user.
- Operation.
- Resource type and ID.
- Previous state.
- New state.
- Timestamp.
- Reason.
- Approval reference.
- Correlation or request ID.

Operations that may be retried MUST support idempotency where duplicate execution could create financial, organisational or access-control consequences.

Audit records MUST NOT be editable through ordinary organisational APIs.

## 10. Frontend and Service Communication

The frontend MUST communicate with the authorised backend API.

The frontend MAY:
- Display permitted organisational information.
- Submit proposals.
- Request approvals.
- Display workflow status.
- Show actions available to the authenticated user.

The frontend MUST NOT:
- Determine final permissions independently.
- Grant roles or authorities.
- Bypass approval workflows.
- Directly alter protected lifecycle states.
- Infer access from hidden or visible interface elements.

Backend responses MUST determine whether an operation is permitted.

## 11. Notifications and Events

Material lifecycle events SHOULD publish structured internal events.

Examples:
- Membership activated or ended.
- Position appointed or vacated.
- Role assigned or revoked.
- Authority changed.
- Unit restructured.
- Shared service activated or ended.
- Decision approved or rejected.

Events MUST contain stable identifiers and minimal necessary information.

Consumers MUST validate event authenticity and MUST NOT treat an event as an independent grant of authority.

## 12. Acceptance Criteria

Implementation is compliant only when:

- All protected organisational mutations use backend-controlled operations.
- Parent-company and store resources use the same API enforcement model.
- Permission and scope validation occurs server-side.
- Lifecycle transitions cannot be bypassed through generic updates.
- Multi-entity changes are transactionally controlled or tracked.
- Database constraints and backend validation are aligned.
- Service-role credentials remain private.
- Audit records cover all material mutations.
- Retryable operations cannot execute consequential actions twice.
- Frontend visibility never substitutes for backend authorisation.
- API errors do not expose confidential information.
