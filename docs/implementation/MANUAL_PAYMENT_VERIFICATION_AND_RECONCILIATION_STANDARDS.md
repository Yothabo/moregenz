# Manual Payment Verification and Reconciliation Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-BD9D0B932D |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This document defines the operational controls for receiving, verifying, recording and reconciling customer payments under the platform's current WhatsApp-first commerce model.

It establishes a consistent process for linking payment evidence to the correct store, customer and order while reducing errors, duplicate records, fraudulent evidence and unauthorised financial changes.

## 2. Scope

This standard applies to:

- Store Admins and authorised store employees handling payments.
- Platform personnel responsible for financial oversight.
- Orders paid through manually supported payment methods.
- Payment evidence received through WhatsApp or another approved communication channel.
- Manual reconciliation against bank statements and other authoritative payment records.

This document does not introduce an online payment gateway or automated payment processing.

## 3. Current Payment Operating Model

The platform currently uses a manual payment workflow.

Customers receive payment instructions from the relevant store and complete payment outside the platform. They may send proof of payment through WhatsApp or another approved channel.

An authorised store employee verifies the payment against an authoritative financial record before updating the order's payment status.

A screenshot, notification, emailed receipt or customer statement is evidence submitted for review. It is not, by itself, confirmation that funds have been received.

Future payment-provider integrations must be assessed and approved separately.

## 4. Core Control Principles

All manual payment handling must follow these principles:

1. Verify funds independently of customer-submitted evidence.
2. Associate every payment with the correct store and order.
3. Preserve original payment and reconciliation records.
4. Prevent duplicate payment allocation.
5. Separate payment verification from financial adjustments where staffing permits.
6. Record who performed each material action and when.
7. Escalate uncertain, suspicious or disputed payments.
8. Never mark an order as paid solely to satisfy a customer or operational deadline.
9. Do not treat a pending or delayed bank transaction as settled funds.
10. Preserve an auditable history of corrections.

## 5. Supported Manual Payment Methods

Stores may support payment methods approved for their operating model, including:

- Electronic funds transfers.
- Direct bank deposits.
- Cash, where the store has an approved cash-handling process.
- Other manually verifiable methods approved by the Platform Owner.

Each store must publish accurate payment instructions through its approved customer communication channels.

Payment instructions must identify the intended beneficiary and must not expose another store's private banking information.

## 6. Payment Reference Requirements

Where the payment method supports references, customers should be instructed to include a unique order reference.

The store must provide the reference in a clear and usable format.

Payment references should help identify:

- The relevant store.
- The order.
- The intended customer or payer, where necessary.

A payment reference is an identification aid, not proof of payment.

Where a customer uses an incorrect or missing reference, staff must verify the transaction using additional information before allocating it.

## 7. Receiving Payment Evidence

When payment evidence is received, authorised staff must:

1. Identify the customer and relevant order.
2. Confirm the amount the customer claims to have paid.
3. Record the date and approximate time of the claimed transaction.
4. Record the payment method.
5. Capture the submitted reference or transaction identifier, if available.
6. Store the evidence through an approved, access-controlled process.
7. Mark the payment as awaiting verification.

Staff must not represent an order as paid while verification remains outstanding.

## 8. Independent Payment Verification

Payment verification must use an authoritative source appropriate to the payment method.

For bank transfers and deposits, staff must inspect the relevant bank account transaction record or statement through an authorised banking channel.

The verification must establish, as far as the available records permit:

- The transaction exists.
- The correct beneficiary account received the funds.
- The amount received matches the expected amount or is otherwise explainable.
- The transaction has reached the required cleared or available state.
- The transaction has not already been allocated to another order.
- The transaction reference and payer details are reasonably consistent with the order.

A bank notification may assist with locating a transaction but must not replace verification against the authoritative account record.

Where the bank record is delayed, unclear or unavailable, the payment remains unverified.

## 9. Payment Statuses

The platform's payment status must distinguish operational states clearly.

| Status | Meaning |
|---|---|
| Awaiting Payment | No payment has been confirmed. |
| Evidence Received | Customer has submitted payment evidence. |
| Verification Pending | Staff must independently verify the transaction. |
| Partially Paid | Some, but not all, required funds have been verified. |
| Paid | The required funds have been verified and allocated. |
| Overpaid | Verified funds exceed the amount due. |
| Failed or Reversed | The transaction failed, was reversed or did not result in retained funds. |
| Refunded | A refund has been completed and verified. |
| Under Review | A discrepancy or suspected irregularity requires investigation. |

The implementation must use the approved order and payment state model. This table does not authorise the introduction of conflicting status fields or duplicate state machines.

## 10. Payment Allocation

A verified payment must be allocated to the correct store and order.

Before allocation, staff must check:

- The order belongs to the store receiving the funds.
- The amount is consistent with the order balance.
- The transaction has not already been allocated.
- The payment is not associated with another customer or order.
- Any partial payment or overpayment is recorded accurately.

A single payment must not be allocated more than once.

Where one transfer covers multiple orders, each allocation must be documented and the total allocated amount must not exceed the verified funds received.

Where one order is paid through multiple transactions, each transaction must be recorded separately and linked to the same order.

## 11. Partial Payments

A store may accept partial payments only under its approved commercial policy.

For every partial payment:

- Record the amount received.
- Record the transaction identifier and verification evidence.
- Update the outstanding balance.
- Communicate the remaining amount to the customer.
- Keep the order payment status distinct from the order fulfilment status.

An order must not be treated as fully paid until the full required amount has been verified or an authorised exception has been recorded.

## 12. Overpayments and Unmatched Payments

Overpayments must be recorded without silently changing the original order amount.

Staff must:

1. Verify the full amount received.
2. Record the excess amount.
3. Notify the appropriate Store Admin.
4. Confirm the customer's preferred resolution where applicable.
5. Obtain approval for any refund, credit or other adjustment.
6. Preserve the original payment record and adjustment history.

Unmatched payments must be placed in an exception queue or controlled reconciliation register.

Staff must not allocate an unidentified payment based only on a similar amount or an assumption about the payer.

## 13. Cash Payments

Stores accepting cash must maintain controls appropriate to their physical operating environment.

At minimum:

- Issue a receipt or other approved acknowledgement.
- Record the amount, date, time and receiving employee.
- Link the receipt to the relevant order.
- Secure cash until it is deposited or otherwise handled under approved procedures.
- Reconcile recorded cash receipts against physical cash and deposit records.
- Investigate shortages and overages.

Cash received must not be recorded as a bank deposit before the deposit is independently confirmed.

Cash-handling responsibilities should be separated from reconciliation and approval duties where practical.

## 14. Daily Reconciliation

Each participating store must perform reconciliation at an appropriate operating frequency. Daily reconciliation is the preferred baseline where transaction volume and available banking records permit.

The reconciliation process must compare:

- Orders expected to have been paid.
- Payment evidence received.
- Payments independently verified.
- Transactions allocated to orders.
- Bank account or cash records.
- Outstanding balances.
- Unmatched transactions.
- Refunds, reversals and adjustments.

The reconciliation must identify differences rather than forcing records to balance through unsupported adjustments.

## 15. Reconciliation Exceptions

Examples of exceptions include:

- Customer evidence with no corresponding bank transaction.
- A transaction received for a different amount.
- Duplicate payment evidence.
- A transaction already allocated to another order.
- A missing or incorrect payment reference.
- A reversed or returned payment.
- An unexplained cash shortage or overage.
- A payment received into an unexpected account.
- A transaction that cannot be reliably attributed to a store.

Each exception must have:

- A unique or traceable reference.
- The affected store and order, where known.
- The amount involved.
- A description of the discrepancy.
- The date identified.
- The person responsible for investigation.
- The investigation outcome.
- Any approved corrective action.

Unresolved exceptions must remain visible until formally resolved.

## 16. Refunds and Reversals

Refunds must follow the applicable financial controls and approval procedures.

Staff must not delete or overwrite the original payment record to represent a refund.

A refund record must identify:

- The original payment.
- The affected order.
- The amount refunded.
- The reason.
- The approval.
- The person who initiated the refund.
- The date and reference of the outgoing transaction.
- Confirmation that the funds were returned, where independently verifiable.

A refund must not be marked complete solely because a refund request has been submitted.

Reversed or returned payments must be reflected in the payment and order records without erasing the original transaction history.

## 17. Separation of Duties and Approval

Where staffing allows, the person verifying a payment should not be the sole person approving a related financial adjustment.

The following actions require the applicable approval authority:

- Refunds.
- Write-offs.
- Manual balance corrections.
- Reallocation of previously allocated payments.
- Resolution of material reconciliation differences.
- Changes to payment records after period close.

Small stores with limited staff must use compensating controls, such as documented owner review and periodic independent checks.

Platform Super Admin authority must not be used as a substitute for ordinary store-level payment verification.

## 18. Fraud and Suspicious Evidence

Staff must treat the following as potential warning signs:

- Edited or inconsistent payment screenshots.
- Missing or inconsistent transaction identifiers.
- Payment notifications without a corresponding account transaction.
- Reused evidence submitted for multiple orders.
- Unusual payer or beneficiary details.
- Requests to release goods before verification.
- Pressure to bypass the normal payment process.
- Transactions that appear and later disappear or reverse.

When suspicious activity is identified:

1. Do not mark the payment as paid.
2. Do not release goods solely on the submitted evidence.
3. Preserve the evidence and relevant records.
4. Escalate to the Store Admin.
5. Restrict access to the investigation records to authorised personnel.
6. Record the investigation and final outcome.

Staff must not make unsupported accusations against customers.

## 19. Customer Communication

Payment-related communication must be clear and factual.

Staff should distinguish between:

- Evidence received.
- Payment verification in progress.
- Payment confirmed.
- Payment not located.
- Payment discrepancy requiring clarification.
- Refund requested.
- Refund completed.

Staff must not promise that a payment has cleared when it has not been verified.

Where verification is delayed, customers should receive a reasonable update without being given unsupported completion estimates.

## 20. Recordkeeping and Auditability

The platform must preserve a traceable history of material payment actions.

Records should include, where applicable:

- Store and order identifiers.
- Payment amount and currency.
- Payment method.
- Transaction reference.
- Payment evidence reference or secure storage location.
- Verification status.
- Verification timestamp.
- Verifying employee.
- Allocation details.
- Reconciliation results.
- Exception records.
- Refund and adjustment references.
- Approval details.
- Audit history.

Sensitive banking information and customer evidence must be protected through access controls and appropriate retention rules.

Payment evidence must not be placed in public storage or exposed through public storefront APIs.

## 21. Access Control

Payment-related permissions must be limited to staff with a legitimate operational need.

The platform must distinguish permissions for:

- Viewing payment status.
- Viewing payment evidence.
- Recording payment evidence.
- Verifying payments.
- Allocating payments.
- Initiating refunds.
- Approving financial adjustments.
- Reviewing reconciliation records.

Store personnel must only access payment records within their authorised store scope.

Platform-level access must be purpose-limited and auditable.

## 22. Period-End Reconciliation

At the end of each accounting period, the store must reconcile payment records against the relevant bank, cash and accounting records.

The review must identify:

- Unallocated receipts.
- Outstanding customer balances.
- Duplicate allocations.
- Reversals and returned payments.
- Refunds awaiting completion.
- Unresolved reconciliation exceptions.
- Manual adjustments.
- Differences between platform records and financial records.

Period-end differences must be documented and reviewed by an authorised person.

Financial records must remain traceable to their original transactions and supporting evidence.

## 23. Platform Reporting

Where supported by the platform, authorised reporting should provide:

- Verified payments by store and period.
- Payments awaiting verification.
- Partially paid orders.
- Unmatched receipts.
- Overpayments.
- Failed or reversed transactions.
- Refunds and adjustments.
- Outstanding reconciliation exceptions.
- Verification and approval activity.

Reports must distinguish order totals from actual funds received.

A report must not present customer-submitted evidence as confirmed revenue.

## 24. Operational Limitations

The current platform does not:

- Automatically verify bank transfers.
- Connect directly to store bank accounts.
- Guarantee that submitted proof of payment is genuine.
- Automatically allocate incoming bank transactions.
- Initiate online payment-provider transactions.
- Automatically confirm that a refund has reached a customer.

These capabilities may be considered in future phases following business, legal, security and technical assessment.

## 25. Future Payment Integration Requirements

Any future payment-provider integration must preserve the control principles in this document.

The design must address:

- Verified store attribution.
- Provider transaction identifiers.
- Idempotent payment processing.
- Webhook authentication and durable event handling.
- Payment and refund state transitions.
- Settlement and fee reconciliation.
- Dispute handling.
- Provider outages and uncertain transaction outcomes.
- Auditability and financial reporting.
- Separation of duties and approval controls.

A future integration must not be introduced merely because a provider offers an API. It must fit the platform's multi-store financial model and operating controls.

## 26. Review and Maintenance

This document must be reviewed when:

- The manual payment workflow changes.
- A store introduces a new payment method.
- Financial controls or approval responsibilities change.
- A material payment incident exposes a control weakness.
- Payment-provider integration is approved.
- Legal, accounting or regulatory advice requires a change.

Changes must follow the platform's document and change-management procedures.

## 27. Approval

This document remains a draft until formally reviewed and approved by the appropriate platform governance authority.

Approval must confirm that the procedures are operationally practical and consistent with the platform's financial controls, order lifecycle, data governance and store operating model.
