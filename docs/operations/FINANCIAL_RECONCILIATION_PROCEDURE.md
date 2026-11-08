# Financial Reconciliation Procedure

## Document Control

| Field | Value |
|---|---|
| Document Type | Financial Reconciliation Procedure |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-OPS-67AC348832 |
| Category | Operations |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This procedure defines how financial transactions and balances are compared, investigated, corrected and reconciled across the platform and participating stores.

It establishes a controlled process for identifying discrepancies, preserving financial evidence and ensuring that adjustments are authorised.

## 2. Scope

This procedure covers:

- Customer payments.
- Orders and refunds.
- Payment provider settlements.
- Provider fees and deductions.
- Store revenue and expenses.
- Platform revenue and expenses.
- Platform commissions where agreed.
- Stock supplied to stores.
- Capital advances and repayments.
- Store obligations.
- Financial adjustments.
- Bank and payment account reconciliation.
- Accounting records and supporting evidence.

The procedure applies only to financial activities supported by the platform's approved architecture and applicable agreements.

## 3. Reconciliation Principles

Reconciliation must:

- Use authoritative financial records.
- Preserve original transaction history.
- Distinguish platform and store finances.
- Match transactions using reliable references.
- Identify missing, duplicated and inconsistent records.
- Investigate discrepancies before correction.
- Separate investigation from financial approval.
- Preserve an auditable record of adjustments.
- Avoid treating unresolved balances as confirmed.
- Follow applicable accounting and legal requirements.

## 4. Financial Record Ownership

Financial records must retain their correct ownership and attribution.

Platform financial records must remain distinct from store financial records.

Where transactions involve multiple parties, the records must identify the relevant store, platform activity, provider and transaction relationship.

A shared database does not make platform and store funds interchangeable.

## 5. Roles and Responsibilities

### 5.1 Platform Owner

The Platform Owner oversees platform-level reconciliation and ensures that financial discrepancies are escalated to the appropriate authority.

### 5.2 Store Admin

The Store Admin is responsible for reviewing store-level financial information and supplying supporting evidence for store transactions.

### 5.3 Financial Reviewer

An authorised financial reviewer investigates discrepancies, verifies supporting records and proposes corrections.

### 5.4 Financial Approver

An authorised approver reviews and approves adjustments, settlements or other restricted financial actions.

Where practical, the person investigating a discrepancy should not independently approve and execute the resulting financial adjustment.

### 5.5 External Professionals

Qualified accounting, tax or legal professionals should be consulted where the matter requires professional interpretation or statutory treatment.

## 6. Reconciliation Sources

Depending on the transaction type, reconciliation may use:

- Platform order records.
- Payment transaction records.
- Payment provider statements.
- Bank statements.
- Refund records.
- Provider settlement reports.
- Fee and deduction statements.
- Store expense evidence.
- Supplier invoices.
- Stock transfer records.
- Capital assistance agreements.
- Repayment records.
- Approved journal entries.
- Other authorised financial documents.

The source used must be appropriate to the transaction being reconciled.

## 7. Reconciliation Frequency

Reconciliation frequency must be established according to transaction volume, financial exposure and provider settlement arrangements.

Until formal intervals are approved:

- Material discrepancies should be investigated promptly.
- Payment and settlement records should be reviewed regularly.
- Outstanding financial obligations should be monitored.
- Period-end reconciliation should be performed where applicable.
- High-risk or unusual transactions should receive additional scrutiny.

No specific frequency should be represented as a contractual or statutory requirement unless formally established.

## 8. Reconciliation Process

### 8.1 Establish the Reconciliation Scope

Record:

- Reconciliation identifier.
- Period covered.
- Store or platform scope.
- Account or provider.
- Currency.
- Responsible reviewer.
- Source records.
- Date of review.

### 8.2 Collect Source Records

Obtain the relevant records from authorised systems and providers.

Confirm that the records cover the intended period and have not been unintentionally truncated or duplicated.

### 8.3 Match Transactions

Match records using reliable references such as:

- Internal transaction ID.
- Order ID.
- Provider transaction reference.
- Settlement reference.
- Refund reference.
- Bank transaction reference.

Amount and date alone are insufficient when reliable transaction identifiers are available.

### 8.4 Compare Amounts

Compare:

- Original transaction amount.
- Captured amount.
- Refunded amount.
- Provider fees.
- Settlement amount.
- Bank receipt or payment.
- Currency.
- Relevant financial adjustments.

Account for documented timing differences and provider settlement cycles.

### 8.5 Identify Discrepancies

Record unmatched, duplicated, incomplete or inconsistent transactions.

Do not silently modify source records to make balances agree.

### 8.6 Investigate

Determine the likely cause and collect supporting evidence.

Possible causes include:

- Delayed provider settlement.
- Duplicate transaction.
- Failed or reversed payment.
- Partial refund.
- Incorrect fee.
- Missing webhook event.
- Incorrect store attribution.
- Data migration error.
- Manual posting error.
- Bank processing delay.

### 8.7 Propose Resolution

The reviewer documents the proposed resolution and its financial impact.

The proposal must identify the original transaction and the supporting evidence.

### 8.8 Approve and Execute

Only an authorised financial approver may approve restricted adjustments.

Execution must follow the approved financial workflow.

### 8.9 Verify and Close

Confirm that the approved action is reflected in the authoritative financial records.

Record the final outcome and retain the evidence.

## 9. Payment Reconciliation

Payment reconciliation must compare internal order and payment records with trusted provider transaction information.

Verify:

- Payment reference.
- Order reference.
- Store attribution.
- Transaction amount.
- Currency.
- Payment status.
- Capture status.
- Refund status.
- Provider fees.
- Settlement reference.

A customer-facing success page or browser redirect is not proof of payment.

The backend must rely on verified provider information and trusted internal transaction records.

## 10. Uncertain Payment Outcomes

A timeout or interrupted provider response may leave a payment outcome uncertain.

Before retrying a payment operation:

- Check the internal transaction state.
- Query the provider using the relevant reference or idempotency key.
- Determine whether the original request succeeded.
- Avoid creating a second charge.
- Record the investigation.

If the outcome cannot be established, escalate the matter rather than assuming failure or success.

## 11. Settlement Reconciliation

Compare provider settlement reports against internal payment records and bank receipts.

Identify:

- Gross transaction amounts.
- Refunds.
- Reversals.
- Provider fees.
- Chargebacks.
- Other deductions.
- Net settlement.
- Settlement date.
- Bank receipt.

Settlement timing differences must be documented.

A settlement discrepancy must remain open until explained or formally accepted by an authorised authority.

## 12. Refund and Reversal Reconciliation

Refunds and reversals must be linked to their original transactions where possible.

Verify:

- Original order and payment.
- Refund or reversal reference.
- Approved amount.
- Provider status.
- Store attribution.
- Settlement impact.
- Financial posting.

A refund must not be recorded as completed merely because it was requested.

## 13. Chargebacks and Disputes

Chargebacks and payment disputes must be reconciled separately from ordinary refunds.

Preserve:

- Original payment.
- Order record.
- Provider dispute reference.
- Disputed amount.
- Provider fees or deductions.
- Evidence submitted.
- Dispute status.
- Final outcome.

Do not automatically reverse fulfilment, restore inventory or cancel an order solely because a dispute notification was received.

Those actions require the relevant business and operational assessment.

## 14. Store Revenue and Expenses

Store financial records must be reconciled against the store's authorised transaction and supporting records.

Verify:

- Sales.
- Refunds.
- Discounts.
- Store expenses.
- Supplier costs.
- Payment fees.
- Settlement receipts.
- Approved adjustments.

Store revenue must not be treated as platform revenue merely because the platform processes the transaction.

## 15. Platform Revenue and Expenses

Platform financial records must be reconciled separately.

Relevant records may include:

- Platform service revenue.
- Agreed commissions.
- Platform operating expenses.
- Provider expenses.
- Shared service costs.
- Approved assistance.
- Amounts due from or to stores.

Commission and settlement terms must follow documented agreements.

No default commission rate or settlement basis is assumed by this procedure.

## 16. Stock and Capital Assistance

Stock supplied and capital advanced must be traceable to the relevant agreement and supporting records.

Reconciliation should identify:

- Assistance reference.
- Beneficiary store.
- Date.
- Amount or stock quantity.
- Ownership or repayment terms.
- Supporting documentation.
- Repayments or stock returns.
- Outstanding obligations.
- Approved adjustments.

Stock assistance and capital assistance must not be treated as ordinary sales or expenses without appropriate accounting treatment.

## 17. Financial Adjustments

Adjustments must be supported by evidence and approved by the appropriate authority.

Each adjustment must record:

- Original transaction reference.
- Reason.
- Amount and currency.
- Affected store or platform account.
- Proposed accounting treatment.
- Supporting evidence.
- Reviewer.
- Approver.
- Execution reference.
- Date.
- Verification outcome.

Original transaction records must remain preserved.

Corrections should use traceable adjustment entries rather than destructive edits to historical financial activity.

## 18. Accounting Records

Where a formal accounting ledger is implemented, reconciliation must use the authoritative journal and ledger records.

Journal entries must follow approved accounting controls.

The reconciliation process must not independently invent accounting treatment for complex or uncertain transactions.

Professional accounting advice should be obtained where required.

## 19. Multi-Store Reconciliation

Shared platform services must preserve transaction attribution for each store.

Reconciliation must verify:

- Correct store attribution.
- Correct platform attribution.
- Provider account mapping.
- Store-specific settlement arrangements.
- Shared fee allocation where agreed.
- Inter-store transfers where supported.
- Outstanding store obligations.

A discrepancy affecting one store must not be concealed by netting it against another store's balance.

## 20. Foreign Currency

Where transactions involve different currencies, retain:

- Original transaction currency.
- Original amount.
- Settlement currency.
- Settlement amount.
- Exchange rate source.
- Conversion date.
- Provider conversion fees.
- Accounting treatment.

Do not compare amounts in different currencies without an appropriate conversion basis.

## 21. Period-End Reconciliation

At the end of an applicable accounting period:

- Confirm the period and scope.
- Collect relevant source records.
- Reconcile outstanding transactions.
- Identify unresolved discrepancies.
- Review adjustments.
- Confirm balances.
- Record outstanding obligations.
- Preserve supporting evidence.
- Escalate material exceptions.

Period-end close must not conceal unresolved discrepancies or remove original transaction history.

## 22. Discrepancy Management

Each discrepancy must have a traceable record.

The record should include:

- Discrepancy identifier.
- Date detected.
- Related transactions.
- Store or platform scope.
- Amount and currency.
- Description.
- Suspected cause.
- Investigation owner.
- Proposed resolution.
- Approval status.
- Current status.
- Closure evidence.

Material unresolved discrepancies must be escalated.

## 23. Fraud and Suspicious Activity

Suspected fraud or unauthorised financial activity must be escalated through the incident response process.

Preserve evidence and restrict further activity only through authorised procedures.

Do not confront suspected parties or disclose sensitive investigation details without appropriate authority.

## 24. Reporting

Reconciliation reports should identify:

- Total transactions reviewed.
- Matched transactions.
- Unmatched transactions.
- Outstanding settlements.
- Refunds and reversals.
- Provider fees.
- Adjustments.
- Unresolved discrepancies.
- Outstanding obligations.
- Review and approval status.

Reports must distinguish verified balances from estimates and unresolved amounts.

## 25. Completion Criteria

A reconciliation is complete when:

- The period and scope are documented.
- Relevant source records are obtained.
- Transactions are matched or exceptions recorded.
- Material discrepancies are investigated.
- Adjustments are approved and executed where required.
- Balances are verified.
- Outstanding items have assigned owners.
- Evidence is retained.
- An authorised reviewer confirms closure.

## 26. Exceptions and Escalation

Escalate matters involving:

- Material unexplained differences.
- Suspected fraud.
- Duplicate or unauthorised payments.
- Missing settlements.
- Incorrect store attribution.
- Unauthorised adjustments.
- Disputed financial obligations.
- Provider failures affecting transaction integrity.
- Potential legal or regulatory exposure.

Exceptions must be documented and approved by the relevant authority.

## 27. Open Decisions

The following matters require further definition:

- Reconciliation frequency.
- Financial approval thresholds.
- Reviewer and approver roles.
- Period-end close timetable.
- Accounting system and ledger ownership.
- Provider statement formats.
- Currency conversion policy.
- Discrepancy materiality thresholds.
- Financial evidence retention periods.
- Reporting format and recipients.
- Professional accounting review arrangements.

## 28. Relationship to Other Documents

This procedure must be read alongside:

- FINANCE_ARCHITECTURE.md
- COMMERCE_ARCHITECTURE.md
- INTEGRATION_ARCHITECTURE.md
- INVENTORY_ARCHITECTURE.md
- DATA_GOVERNANCE.md
- PLATFORM_GOVERNANCE.md
- STORE_OPERATING_MODEL.md
- OPERATIONS_RUNBOOK.md
- INCIDENT_RESPONSE_PLAYBOOK.md
- RISK_MANAGEMENT_POLICY.md
- CHANGE_MANAGEMENT_POLICY.md
- BACKUP_AND_DISASTER_RECOVERY.md

## 29. Document Management

This procedure remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant financial and operational stakeholders.
