# Approval Authority and Separation of Duties

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-DF31451362 |
| Category | Architecture |
| Version | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** Authoritative governance and access-control specification
**Applies to:** Parent company, departments, shared services and all stores
**Related documents:**
- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md`
- `FINANCE_LEGAL_AND_COMPLIANCE_ROLES.md`
- `STORE_OWNER_AND_STORE_ADMINISTRATION_ROLES.md`

## 1. Purpose

This document defines how decisions are submitted, reviewed, approved, rejected and executed.

Approval authority MUST be explicit. A person's job title, seniority, reporting relationship or technical access MUST NOT independently grant approval authority.

## 2. Approval model

Every controlled action MUST identify:

1. The requesting actor.
2. The resource and organisational scope.
3. The requested action.
4. The applicable approval policy.
5. The authorised approver or approval group.
6. Required supporting evidence.
7. The decision and recorded reason.
8. The authorised execution step.

The platform MUST distinguish request submission, review, approval and execution.

## 3. Approval authority levels

### 3.1 Parent company authority

Applies to decisions reserved for parent-company governance, including company policies, platform-wide controls and delegated corporate commitments.

Only explicitly appointed authorities MAY approve these actions.

### 3.2 Department authority

Applies to decisions within an assigned department and its approved delegation.

Department Heads MAY approve only the actions and limits assigned to them.

### 3.3 Store authority

Applies to decisions within one store.

The Store Owner holds the store-level authority defined by the Store Owner agreement, subject to parent-company platform governance, contractual obligations and applicable law.

### 3.4 Delegated authority

A person MAY approve an action on behalf of another authority only through a recorded delegation.

A delegation MUST identify:
- Delegating authority.
- Recipient.
- Permitted actions.
- Organisational scope.
- Effective start and expiry.
- Applicable limits.
- Any prohibited actions.

Delegation MUST NOT exceed the delegator's own authority.

## 4. Separation of duties

The platform MUST support separation between these stages where the applicable risk policy requires it:

- Request creation.
- Evidence preparation.
- Independent verification.
- Review.
- Approval.
- Execution or release.
- Reconciliation.
- Independent audit.

The same person MUST NOT perform incompatible stages of a controlled transaction.

## 5. Mandatory control examples

### 5.1 Payments and settlements

- A payment submitter MUST NOT independently verify their own submission where independent verification is required.
- A settlement preparer MUST NOT approve their own restricted settlement.
- A payment approver MUST NOT release funds unless separately authorised.
- Changes to settlement beneficiaries MUST require verification and independent approval.

### 5.2 Procurement

- A purchase requester MUST NOT approve their own restricted purchase.
- Supplier onboarding and supplier payment-detail verification MUST be separable.
- Purchase approval MUST respect configured financial limits.

### 5.3 Inventory

- A stocktake officer MUST NOT approve their own restricted stock adjustment.
- Inventory adjustments MUST retain original count evidence.
- Material discrepancies MUST follow the configured escalation path.

### 5.4 Store ownership and administration

- A proposed successor MUST NOT approve their own Store Owner appointment.
- Store Owner transfer MUST follow the documented succession process.
- Privileged role assignments MUST require an authorised independent approval where policy requires it.

### 5.5 Technology and security

- A developer MUST NOT independently approve a restricted production release they created.
- Emergency production access MUST be reviewed after use.
- Security exceptions MUST be approved by an authority independent of the requester where required.

## 6. Approval limits and policy configuration

1. Approval limits MUST be stored as explicit configuration.
2. Limits MUST identify currency, amount, transaction type and organisational scope.
3. Financial limits MUST use the relevant transaction currency and MUST NOT rely on ambiguous conversions.
4. Approval policies MUST define whether multiple approvals are required.
5. The platform MUST reject actions that exceed the actor's authority.
6. Changing an approval limit MUST itself require authorised approval and an audit record.
7. No default unlimited approval authority may be inferred from an executive or Store Owner title.

## 7. Approval workflow states

Controlled requests MUST support these states where applicable:

- `draft`
- `submitted`
- `under_review`
- `approved`
- `rejected`
- `returned_for_changes`
- `cancelled`
- `expired`
- `executed`

A request MUST NOT be treated as approved merely because it was submitted or reviewed.

Execution MUST verify that the approval remains valid and applies to the exact action and resource.

## 8. Delegation and absence

1. Delegations MUST be time-bounded.
2. Delegated authority MUST be limited to named actions and scopes.
3. Delegation MUST NOT silently transfer permanent role membership.
4. Delegations MUST be revocable.
5. Expired delegations MUST stop authorising approvals.
6. A person MUST NOT approve an action outside the delegator's original authority.

## 9. Audit requirements

Every approval decision MUST record:

- Request identifier.
- Requesting actor.
- Approving actor.
- Decision.
- Decision timestamp.
- Reason or supporting evidence.
- Applicable policy and limit.
- Resource and organisational scope.
- Delegation reference, if applicable.
- Execution result.

Approval records MUST be retained according to the platform data-retention policy. Users MUST NOT be able to erase their own approval history.

## 10. Exceptions and emergency decisions

Emergency approval paths MAY exist for documented operational necessity.

They MUST:
- Identify the emergency and reason.
- Limit the permitted action and duration.
- Record the acting authority.
- Notify the responsible oversight function.
- Require retrospective review within a defined policy period.

Emergency access MUST NOT become a routine alternative to normal approval workflows.

## 11. Acceptance criteria

This specification is satisfied only when:

- Approval authority is explicit and scope-bound.
- Request, review, approval and execution are distinct.
- Delegation is recorded, limited and revocable.
- Financial and other high-risk actions enforce separation of duties.
- Approval limits are configurable and auditable.
- Execution revalidates approval authority.
- Emergency decisions receive retrospective review.
- Users cannot approve actions outside their assigned authority.
