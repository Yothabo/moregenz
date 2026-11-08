# Financial Controls and Approvals

## Document Control

| Field | Value |
|---|---|
| Document Type | Financial Controls and Approvals |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines the control framework for authorising, recording, reviewing and monitoring financial activity across the platform and participating stores.

Its purpose is to protect financial integrity, maintain clear accountability and prevent unauthorised financial actions.

## 2. Scope

The controls apply to:

- Platform financial activity.
- Store financial activity.
- Customer payments.
- Refunds and reversals.
- Provider settlements and fees.
- Store expenses.
- Platform expenses.
- Commissions and service charges where agreed.
- Stock assistance.
- Capital advances and repayments.
- Financial adjustments.
- Reconciliation and reporting.
- Financial access and approval permissions.

This document does not establish accounting policies, statutory requirements, commission rates or commercial terms that have not been formally agreed.

## 3. Control Objectives

Financial controls must:

- Prevent unauthorised transactions and adjustments.
- Preserve separation between platform and store finances.
- Ensure that financial activity has an identifiable business purpose.
- Maintain reliable transaction records.
- Require appropriate approval for restricted actions.
- Reduce fraud, error and duplicate processing.
- Support reconciliation and audit.
- Protect financial information.
- Make outstanding obligations visible.
- Provide a clear route for escalation.

## 4. Control Principles

### 4.1 Authority Before Execution

Restricted financial actions must be authorised before execution, except where an approved emergency procedure explicitly permits immediate protective action.

### 4.2 Separation of Duties

Where practical, initiation, review, approval and execution should be separated for material or sensitive financial operations.

### 4.3 Traceability

Every material financial action must have a traceable record linking the action to its initiator, authority, supporting evidence and outcome.

### 4.4 Least Privilege

Financial permissions must be limited to the responsibilities assigned to each user.

### 4.5 Independent Store Accounting

Store financial activity must remain distinguishable from platform financial activity.

### 4.6 No Silent Corrections

Historical financial records must not be silently overwritten or deleted to conceal an error.

## 5. Financial Authority Structure

Financial authority is divided between platform-level and store-level responsibilities.

### 5.1 Platform Owner

The Platform Owner is responsible for platform-level financial governance, platform expenses, platform obligations and authorised platform assistance.

Platform authority does not automatically grant unrestricted access to every store's financial operations.

### 5.2 Store Admin

The Store Admin manages authorised store-level financial operations within the store's delegated authority and applicable agreements.

### 5.3 Financial Reviewer

A financial reviewer examines transactions, evidence, proposed adjustments and reconciliation results.

Review authority does not automatically include approval or execution authority.

### 5.4 Financial Approver

A financial approver authorises actions within explicitly assigned approval limits.

The platform must not infer approval authority merely from a user's job title.

### 5.5 Finance and Accounting Professionals

Professional advisers may provide accounting, tax or financial guidance within their engagement.

Their access and authority must be explicitly defined and must not be assumed to include operational approval rights.

## 6. Financial Permission Categories

Financial permissions should distinguish:

- View financial records.
- View financial reports.
- Create financial records.
- Initiate payments.
- Approve payments.
- Execute approved payments.
- Initiate refunds.
- Approve refunds.
- Execute refunds.
- Record expenses.
- Approve expenses.
- Propose financial adjustments.
- Approve financial adjustments.
- Post journal entries.
- Reconcile transactions.
- Close financial periods.
- Export financial data.
- Manage financial integrations.
- Review financial audit records.

Permissions should be assigned independently where the system supports that distinction.

## 7. Store and Platform Financial Boundaries

Platform and store financial records must remain separately attributable.

Controls must prevent:

- A store employee from accessing another store's financial records without authority.
- A Store Admin from changing platform financial records.
- Platform operational access from silently changing store financial records.
- One store's balance from being used to conceal another store's shortfall.
- Shared provider settlements from losing store attribution.
- Financial assistance from being recorded without supporting evidence.

Cross-boundary transactions require explicit references and an approved business basis.

## 8. Transaction Initiation Controls

A financial transaction must have:

- An identifiable initiator or trusted system process.
- A valid business purpose.
- A relevant store or platform context.
- An amount and currency where applicable.
- A transaction reference.
- Supporting records where required.
- An appropriate authorisation path.

System-generated transactions must identify the triggering business event and responsible system process.

## 9. Payment Controls

Payment processing must use approved payment integrations.

Controls must ensure:

- Payment requests are linked to valid orders or authorised obligations.
- Amount and currency are validated server-side.
- Store attribution is established by trusted backend context.
- Client-side payment claims are not treated as authoritative.
- Duplicate payment requests are controlled through idempotency.
- Provider outcomes are verified.
- Uncertain outcomes are investigated before retrying.
- Sensitive payment credentials remain protected.

Full card numbers, CVV values and other restricted cardholder data must not be stored unless a separately approved architecture and compliance assessment explicitly permits it.

## 10. Refund Controls

Refunds must be linked to an original transaction wherever possible.

Before approval, verify:

- Original payment.
- Related order.
- Store attribution.
- Refund reason.
- Requested amount.
- Previous refunds.
- Provider status.
- Applicable business policy.

Partial and full refunds must be distinguishable.

Refund approval must not automatically grant authority to alter unrelated financial records or inventory.

## 11. Expense Controls

Expense records must identify:

- Expense owner.
- Store or platform attribution.
- Business purpose.
- Supplier or recipient.
- Amount and currency.
- Date.
- Supporting evidence.
- Approval status.
- Payment reference where applicable.

Expense approval and payment execution should be separated where practical.

Personal expenditure must not be recorded as platform or store expenditure without an approved and properly documented business basis.

## 12. Financial Adjustment Controls

Financial adjustments must be justified and traceable.

A proposed adjustment must include:

- Original transaction reference.
- Reason for correction.
- Amount and currency.
- Affected financial account.
- Proposed accounting treatment.
- Supporting evidence.
- Initiator.
- Reviewer.
- Required approver.

Approved corrections must preserve the original record and create a traceable adjustment.

## 13. Commission and Service Charge Controls

Commissions and service charges must be based on documented agreements.

Each applicable agreement must define, where relevant:

- Parties.
- Calculation basis.
- Rate or amount.
- Effective date.
- Applicable transactions.
- Deductions and exclusions.
- Settlement frequency.
- Payment responsibilities.
- Changes and termination.
- Dispute handling.

The platform must not apply an assumed commission rate or retrospectively invent commercial terms.

## 14. Stock and Capital Assistance Controls

Stock or capital assistance requires documented assessment and approval.

The record should identify:

- Beneficiary store.
- Assistance type.
- Amount or quantity.
- Business purpose.
- Ownership and repayment terms.
- Supporting evidence.
- Approval authority.
- Delivery or disbursement confirmation.
- Outstanding obligations.

Performance scores may inform an assessment but must not independently approve assistance.

## 15. Settlement Controls

Settlement instructions and records must be protected against unauthorised modification.

Controls should verify:

- Correct beneficiary.
- Correct store or platform attribution.
- Approved amount.
- Currency.
- Settlement reference.
- Provider status.
- Bank or destination details.
- Approval record.

Changes to settlement destinations require additional verification and an auditable record.

## 16. Financial Period Controls

Financial periods should have defined ownership and close procedures.

Once a period is formally closed, changes must follow an approved adjustment process.

The system should retain:

- Period status.
- Closing reviewer.
- Approval record.
- Outstanding exceptions.
- Post-close adjustments.
- Reopening authority where supported.

A closed period must not be silently altered.

## 17. Financial Access Controls

Financial access must be granted according to current role, store membership and assigned permissions.

Controls must include:

- Verified user identity.
- Current account status.
- Active store membership where required.
- Permission checks on the backend.
- Store-scoped data access.
- Access revocation.
- Privileged action logging.
- Periodic access review.

A frontend restriction alone is not sufficient to protect financial operations.

## 18. Approval Workflow

A controlled approval workflow should contain:

1. Initiation.
2. Validation.
3. Evidence submission.
4. Review.
5. Approval or rejection.
6. Execution by an authorised process or person.
7. Outcome verification.
8. Record retention.

The workflow must prevent a user from approving an action that exceeds their authority.

Where approval is rejected, the reason should be recorded.

## 19. Approval Thresholds

Financial approval thresholds have not yet been established.

Thresholds must be defined through an approved financial authority framework before being enforced in production.

The framework should consider:

- Transaction value.
- Financial exposure.
- Transaction type.
- Store or platform ownership.
- Risk level.
- Reversibility.
- Legal or contractual obligations.

Until thresholds are approved, the system must not invent monetary limits or treat informal assumptions as authority.

## 20. Conflicts of Interest

A person with a direct personal or financial interest in a transaction should not be the sole reviewer and approver of that transaction where independent review is practical.

Potential conflicts must be disclosed and recorded.

The appropriate independent authority must determine whether additional review or restrictions are necessary.

## 21. Emergency Financial Controls

Emergency financial action may be necessary to prevent further loss or protect customers and stores.

Emergency action must:

- Be limited to the immediate protective purpose.
- Use the least disruptive effective control.
- Identify the person or system initiating it.
- Record the reason and time.
- Preserve relevant evidence.
- Receive prompt retrospective review.
- Be reversed or replaced when no longer justified.

Emergency protective suspension is not a substitute for ordinary financial approval.

## 22. Financial Fraud and Misconduct

Suspected fraud, unauthorised payments, deliberate record manipulation or misuse of financial access must be escalated through the incident response process.

Relevant access or processing may be restricted through authorised protective procedures.

Evidence must be preserved and access to investigation details limited to authorised parties.

## 23. Audit and Evidence

Financial control records must support reconstruction of material actions.

Records should identify:

- Actor or system process.
- Action.
- Timestamp.
- Store or platform context.
- Affected transaction.
- Previous and resulting state where applicable.
- Approval reference.
- Supporting evidence.
- Execution outcome.

Audit records must be protected from unauthorised modification.

## 24. Monitoring and Review

Financial controls should be reviewed for:

- Unauthorised actions.
- Failed approvals.
- Unusual transaction patterns.
- Duplicate payments.
- Unusual refunds.
- Repeated adjustments.
- Settlement destination changes.
- Unreconciled balances.
- Privileged access changes.
- Overdue obligations.

Monitoring should produce actionable exceptions rather than unsupported accusations.

## 25. Control Failures

When a financial control fails:

1. Protect affected funds and records where authorised.
2. Establish the affected transactions and parties.
3. Preserve evidence.
4. Assess whether other stores or platform functions are affected.
5. Escalate according to severity.
6. Correct the underlying control weakness.
7. Reconcile affected financial records.
8. Record the outcome and follow-up actions.

Do not conceal control failures by changing historical records.

## 26. Reporting

Financial control reporting may include:

- Transactions awaiting approval.
- Rejected transactions.
- Outstanding refunds.
- Unreconciled settlements.
- Financial adjustments.
- Access review findings.
- Outstanding store obligations.
- Control exceptions.
- Emergency actions.
- Overdue remediation.

Reports must distinguish confirmed facts from estimates and unresolved matters.

## 27. Open Decisions

The following require formal definition:

- Financial approval roles.
- Approval thresholds.
- Payment initiation and execution permissions.
- Refund approval limits.
- Expense approval limits.
- Period-close authority.
- Journal posting authority.
- Commission and settlement agreements.
- Financial record retention.
- Independent review arrangements.
- Emergency financial authority.
- Professional accounting oversight.

## 28. Relationship to Other Documents

This document must be read alongside:

- FINANCE_ARCHITECTURE.md
- COMMERCE_ARCHITECTURE.md
- INTEGRATION_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- DATA_GOVERNANCE.md
- PLATFORM_GOVERNANCE.md
- IDENTITY_AND_ACCESS.md
- SECURITY_ARCHITECTURE.md
- FINANCIAL_RECONCILIATION_PROCEDURE.md
- OPERATIONS_RUNBOOK.md
- INCIDENT_RESPONSE_PLAYBOOK.md
- RISK_MANAGEMENT_POLICY.md

## 29. Document Management

This document remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to affected platform and store stakeholders.
