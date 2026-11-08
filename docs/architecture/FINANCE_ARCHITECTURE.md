# Finance Architecture

**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the target financial architecture for the multi-store retail platform.

It establishes how financial information, transactions, obligations, expenditure, funding, settlements and reconciliation are represented and controlled across the platform and participating stores.

The architecture must preserve the financial separation between the platform and each store while supporting agreed commercial relationships and coordinated business operations.

It provides the financial domain boundaries and technical direction required by the application, commerce, inventory, marketing, reporting and operational domains.

This document defines architectural requirements. It does not establish final commission rates, service fees, tax treatments, accounting policies or commercial agreements.

## 2. Financial Architecture Objectives

The financial architecture must:

- Preserve the distinction between platform finances and each participating store's finances.
- Record financial activity against the correct platform, store and business context.
- Support revenue, expenses, payments, refunds, settlements, funding and outstanding obligations.
- Distinguish commercial agreements from actual financial transactions.
- Support commissions and platform charges without assuming unapproved rates or calculation rules.
- Record stock supplied, capital advanced, reimbursements and repayments where applicable.
- Support accurate reconciliation between internal records, payment providers, banks and other external sources.
- Preserve transaction history, approval records and auditability.
- Provide authorised financial reporting at platform and store levels.
- Prevent unauthorised access to another store's confidential financial information.
- Support incremental migration without disrupting existing Yotaabo operations.
- Allow future financial capabilities to be introduced without unnecessary architectural complexity.

## 3. Finance Architecture Principles

### 3.1 Financial Separation

The platform and each participating store must have distinguishable financial records and reporting boundaries.

A platform-level financial record must not automatically become a store financial record, and a store transaction must not automatically become platform revenue.

Where a financial arrangement involves more than one party, the architecture must record the parties, amounts, basis and agreed allocation.

### 3.2 Explicit Financial Ownership

Every financial record must have an identifiable financial owner or responsible entity.

The record must distinguish the party that earns revenue, incurs expenditure, owes an amount, receives funds or provides funding.

Ownership must not be inferred solely from who initiated a transaction or which user entered the record.

### 3.3 Authoritative Transaction Records

Financial transactions must be recorded through controlled backend processes.

Client-submitted values, marketing metrics, inventory figures and provider notifications must not independently establish an authoritative financial outcome.

Where an external provider processes a payment or settlement, the system must retain the relevant provider references and verify the outcome through trusted provider information.

### 3.4 Traceability

Financial records must be traceable to their originating business event, supporting documents, approvals and related transactions.

Corrections must preserve the original record and provide a traceable adjustment history.

### 3.5 No Implicit Commercial Rules

The architecture must not invent commission rates, service fees, allocation percentages, payment terms, repayment schedules or settlement rules.

Commercial terms must be explicitly agreed, recorded and effective-dated before they are used in financial calculations.

### 3.6 Controlled Financial Authority

Creating, approving, posting, adjusting, settling and reconciling financial records are distinct actions.

The system must enforce the appropriate authority for each action. A user who can enter a financial record must not automatically be able to approve or settle it.

### 3.7 Accounting and Legal Review

The architecture must support the applicable accounting, tax, privacy and regulatory requirements.

Specific accounting treatments, tax obligations and legal structures require review by appropriately qualified South African professionals. The architecture must not assume that every participating store has the same legal or tax status.

## 4. Finance Domain Boundaries

### 4.1 Finance Domain Responsibilities

The finance domain is responsible for:

- Financial transaction records.
- Revenue and expense records.
- Amounts owed and amounts receivable.
- Platform and store financial balances.
- Commission and service-charge calculations once approved rules exist.
- Funding and financial assistance records.
- Repayment and reimbursement records.
- Settlement and payout records.
- Financial adjustments and reversals.
- Financial approvals and posting controls.
- Reconciliation and financial exceptions.
- Financial reporting and audit references.

### 4.2 Commerce Domain Boundary

The commerce domain owns the order and payment workflow, including checkout, order state and payment initiation.

The finance domain consumes verified financial outcomes and maintains the corresponding financial records.

An order total is not, by itself, proof that payment has been received or revenue has been settled.

Refunds, cancellations, payment reversals and chargebacks must retain their commerce and provider references and must be reflected through controlled financial records.

### 4.3 Inventory Domain Boundary

The inventory domain owns stock quantities, movements, reservations, transfers and inventory availability.

The finance domain may record financial consequences associated with stock purchases, supplied stock, transfers or adjustments.

A stock movement must not automatically create a financial posting unless an approved business and accounting rule explicitly defines that relationship.

### 4.4 Marketing Domain Boundary

The marketing domain owns campaign budgets, planned expenditure, campaign participation and marketing attribution records.

The finance domain remains authoritative for actual financial expenses, liabilities, payments and settlements.

A campaign budget or attributed sale must not automatically be treated as a posted financial transaction.

### 4.5 Customer Domain Boundary

The customer domain owns customer identity, customer records, privacy preferences and customer relationships.

The finance domain may reference customers where necessary for a financial transaction but must not become an alternative customer identity or profile system.

### 4.6 External Provider Boundary

Banks, payment providers, accounting systems and other external services may provide financial evidence or execute financial operations.

Their records must be connected through trusted references and controlled integration processes.

External provider data must not bypass internal authorisation, validation, transaction history or reconciliation controls.

## 5. Financial Operating Model

### 5.1 Platform Financial Operations

The platform maintains its own financial records for activities it owns or is responsible for.

These may include:

- Platform revenue.
- Platform operating expenses.
- Agreed platform service charges.
- Commission income where an approved arrangement exists.
- Marketing expenditure funded by the platform.
- Capital or financial assistance provided to stores.
- Amounts receivable from stores.
- Platform settlement and payment obligations.

Platform financial records must not be combined with store financial records merely because both are managed through the same application.

### 5.2 Store Financial Operations

Each participating store has its own financial context.

Store financial activity may include:

- Store sales and revenue.
- Store operating expenses.
- Product procurement and stock costs.
- Customer refunds and other transaction adjustments.
- Store-funded marketing expenditure.
- Amounts payable to the platform.
- Amounts receivable from the platform or other parties.
- Funding received and repayments due.
- Store settlements and payouts.

A Store Admin must be able to access the financial information permitted for their store without receiving unrestricted access to platform or other-store finances.

### 5.3 Joint Financial Arrangements

Some activities may involve financial contributions or obligations from both the platform and one or more stores.

Examples include joint marketing campaigns, shared services, stock assistance and agreed operational support.

The system must record each party's agreed contribution and resulting financial responsibility separately.

Joint activity must not create an undocumented shared balance or obscure which party owes or receives an amount.

### 5.4 Financial Assistance

The platform may provide financial assistance, capital advances, stock support or other agreed resources to participating stores.

Each arrangement must record its nature, parties, approved value, terms, dates, supporting evidence and applicable obligations.

Financial assistance must not automatically be classified as a loan, grant, investment or revenue. Its legal and accounting treatment must follow the actual approved agreement and professional advice.

### 5.5 Financial Independence and Oversight

Stores retain their own financial operating responsibilities within the platform's agreed operating model.

Platform oversight may include financial reviews, reconciliation checks, agreed reporting and investigation of outstanding obligations.

Oversight does not grant unrestricted authority to alter a store's financial records or make financial commitments on its behalf.

## 6. Financial Actors and Responsibilities

### 6.1 Platform Owner

The Platform Owner has platform-level business authority, subject to the approved governance and access model.

Platform-level financial responsibilities may include:

- Approving platform financial policies and commercial arrangements.
- Reviewing platform financial performance.
- Approving platform expenditure and funding commitments.
- Approving financial assistance within authorised limits.
- Reviewing platform-to-store obligations.
- Appointing or authorising personnel for financial administration.
- Resolving escalated financial exceptions.

The Platform Owner must not be assumed to have unrestricted authority to alter every store's financial records.

### 6.2 Platform Super Admin

The Platform Super Admin manages platform-level administration and access according to the Identity and Access Architecture.

Super Admin status does not automatically grant business authority to approve payments, create financial commitments, alter accounting records or settle obligations.

Financial permissions must be separately defined and explicitly assigned.

### 6.3 Store Admin

A Store Admin is responsible for authorised financial operations within their own store.

These responsibilities may include:

- Reviewing store financial activity.
- Recording permitted store expenses.
- Reviewing store revenue and settlements.
- Providing supporting financial information.
- Reviewing amounts owed or receivable.
- Approving store expenditure within delegated limits.
- Reviewing reconciliation exceptions.
- Managing store-level financial administration.

A Store Admin must not approve or modify platform financial records or another store's financial records without explicit authority.

### 6.4 Finance Personnel

Authorised finance personnel may perform assigned financial administration, reconciliation, reporting and review activities.

Their permissions must distinguish between data entry, verification, approval, posting, adjustment and settlement.

Access must be limited to the platform or store contexts and financial functions assigned to them.

### 6.5 External Accountants and Service Providers

External accountants, auditors and financial service providers may receive controlled access or financial information where authorised.

Their access must be purpose-limited, documented and consistent with applicable confidentiality and professional requirements.

External service providers must not receive unrestricted platform access merely because they perform a financial function.

### 6.6 System and Integration Processes

Automated processes may import provider records, calculate approved amounts, prepare reconciliation proposals and generate reports.

Automation must operate within approved rules and permissions.

Automated calculations or imported records must not bypass required human approval for material financial commitments, adjustments or settlements.

## 7. Financial Ownership and Scope

### 7.1 Platform Financial Ownership

Financial records owned by the platform must be explicitly associated with the platform financial context.

Examples include platform operating expenses, platform revenue, platform-funded marketing expenditure and financial assistance provided by the platform.

### 7.2 Store Financial Ownership

Financial records belonging to a store must be associated with that store's financial context.

A store's financial information must remain identifiable independently of other stores and platform-level records.

### 7.3 Multi-Party Financial Records

Where a transaction or arrangement involves multiple parties, the architecture must distinguish:

- The originating business event.
- The party responsible for the financial obligation.
- The party entitled to receive funds.
- The party making or receiving payment.
- The amount attributable to each party.
- The applicable agreement or allocation rule.

A single multi-party activity may therefore produce separate financial records for the relevant parties.

### 7.4 Ownership Versus Administration

The user or organisation administering a financial record is not necessarily the party that owns the underlying financial activity.

The architecture must preserve the distinction between financial ownership, operational responsibility, approval authority and system administration.

### 7.5 Historical Financial Ownership

Historical financial records must retain the platform or store context that applied when the underlying transaction occurred.

Changing a store's current configuration, ownership or administrative users must not silently transfer or rewrite historical financial ownership.

## 8. Core Financial Records

### 8.1 Financial Transaction

A financial transaction represents a recorded financial event or movement.

It should contain, where applicable:

- A unique transaction identifier.
- Transaction type and status.
- Financial owner or responsible entity.
- Related platform or store context.
- Amount and currency.
- Transaction date and effective date.
- Originating business event or source reference.
- External provider reference where applicable.
- Supporting documentation references.
- Creation and approval details.
- Related reversal or adjustment references.

The architecture must distinguish a proposed transaction from an authorised and posted transaction.

### 8.1.1 Accounting Ledger and Journal Entries

The finance architecture must support an auditable accounting ledger appropriate to the approved accounting model.

Where double-entry accounting is required, journal entries must maintain balanced debit and credit totals for each applicable currency and accounting transaction.

Journal entries must retain their source transaction, posting date, accounting period, financial owner, currency, approval and reversal or adjustment references.

Posted journal entries must not be silently overwritten or deleted. Corrections must use traceable reversal or adjustment entries in accordance with the approved accounting rules.

The specific ledger structure, chart of accounts, accounting basis and posting rules remain subject to the accounting model decision and professional review.

### 8.2 Revenue Record

A revenue record represents an amount recognised or attributed to the relevant financial owner under the approved accounting rules.

It should retain the source business event, amount, currency, applicable store or platform context and recognition status.

An order, payment authorisation or marketing attribution event must not automatically establish recognised revenue.

### 8.3 Expense Record

An expense record represents expenditure attributable to the platform or a participating store.

It should identify the responsible financial owner, supplier or payee where applicable, amount, currency, expense category, date, supporting evidence and approval status.

Planned expenditure, committed expenditure, incurred expenses and paid expenses must remain distinguishable.

### 8.4 Receivable and Payable Record

A receivable represents an amount due to a financial owner.

A payable represents an amount that the financial owner is responsible for paying.

Records must identify the parties, originating agreement or transaction, amount, currency, due date where applicable, outstanding balance and settlement history.

The same obligation may appear as a receivable for one party and a payable for another. The relationship must remain traceable without treating the two records as unrelated obligations.

### 8.5 Financial Agreement and Obligation

An agreement defines an approved financial arrangement between identified parties.

It may establish service charges, commission terms, funding, repayment, reimbursement, shared expenditure or other obligations.

The architecture must distinguish agreement terms from the transactions generated under those terms.

Agreement records should preserve their approval, effective dates, amendments, responsible parties and supporting documents.

### 8.6 Settlement Record

A settlement record represents the resolution of one or more financial obligations through payment, payout, transfer or another approved settlement method.

It should reference the obligations being settled, the amount, currency, settlement date, payment method, external references and outcome.

A settlement must not be considered complete solely because a user marks it as paid. Where an external payment provider or bank is involved, the outcome must be verified using trusted evidence.

### 8.7 Financial Adjustment

A financial adjustment records an authorised correction to an existing financial record.

Adjustments must reference the original record, reason, amount, approval and effective date.

The system must preserve the original transaction and its history rather than silently overwriting posted financial information.

### 8.8 Financial Evidence

Financial evidence may include invoices, receipts, provider statements, settlement reports, payment confirmations, agreements and supporting documents.

Evidence must be securely stored or referenced, access-controlled and linked to the relevant financial records.

The system must preserve enough information to identify the source, date, responsible party and verification status of the evidence.


## 9. Financial Categories and Classification

### 9.1 Financial Classification

Financial records must use controlled categories that describe the nature of the financial activity.

The architecture should distinguish:

- Revenue and income.
- Operating expenses.
- Cost of goods and stock procurement.
- Payment processing fees.
- Platform service charges and commissions.
- Marketing expenditure.
- Funding and financial assistance.
- Receivables and payables.
- Repayments and reimbursements.
- Refunds and reversals.
- Taxes and statutory liabilities where applicable.
- Financial adjustments.

The classification model must support additional categories without changing the ownership and transaction boundaries.

### 9.2 Platform and Store Classification

Each financial category must be usable within the appropriate platform or store financial context.

A category name may be shared, but the resulting financial records must retain their individual ownership and reporting context.

Platform and store classifications must not be combined into a single undifferentiated balance.

### 9.3 Transaction Types and Statuses

Financial transaction types must describe the underlying event, while transaction statuses describe its processing state.

The architecture should distinguish states such as:

- Draft.
- Pending approval.
- Approved.
- Pending processing.
- Posted or recorded.
- Partially settled.
- Settled.
- Failed.
- Rejected.
- Reversed.
- Cancelled.

The final status model must be defined according to the transaction type.

A status change must not silently change the financial meaning or ownership of a transaction.

### 9.4 Categories and Historical Consistency

Financial category changes must not silently rewrite historical reporting.

Where a category is renamed, replaced or deactivated, existing records must retain their original classification or an explicitly traceable mapping.

Category management must be permission-controlled and auditable.

## 10. Revenue and Income Architecture

### 10.1 Revenue Sources

The platform may record revenue from approved platform business activities.

Participating stores may record revenue from their own commercial activities.

Potential revenue sources include:

- Completed store sales.
- Approved platform service charges.
- Commission income where an agreement exists.
- Other agreed platform or store income.
- Reimbursements or recoveries where their accounting treatment permits.

The architecture must distinguish revenue earned by the platform from revenue earned by a store.

### 10.2 Order-Related Revenue

Store sales must be traceable to the relevant commerce transaction and store.

Financial recognition must follow the approved accounting treatment and relevant transaction conditions.

An order being created, confirmed or paid does not automatically establish that the corresponding amount is recognised as revenue.

The system must support references to order totals, discounts, refunds, cancellations, taxes and other relevant transaction components without treating all of them as revenue.

### 10.3 Platform Revenue

Platform revenue must be supported by an identifiable business arrangement or other valid source.

Examples may include agreed service charges, commission income and other approved platform services.

A platform service charge must not be created merely because a store participates in the platform.

The applicable commercial agreement, calculation basis, effective period and approval must be available before the charge is calculated or treated as due.

### 10.4 Revenue Adjustments

Revenue corrections, refunds, reversals and other adjustments must be recorded through controlled financial transactions.

The original revenue record must remain traceable.

Adjustments must identify their source, reason, amount, effective date and approval where required.

### 10.5 Revenue Reporting

Revenue reports must distinguish:

- Gross transaction value.
- Discounts and promotional reductions.
- Refunds and reversals.
- Applicable taxes.
- Payment processing charges.
- Net amounts attributable to the relevant party.
- Amounts recognised under the approved accounting treatment.
- Amounts received and amounts outstanding.

These measures must not be treated as interchangeable.

## 11. Expense Architecture

### 11.1 Expense Ownership

Every expense must be attributable to the platform, a specific store or another explicitly identified responsible party.

The person who pays an expense is not necessarily the party that ultimately bears its cost.

Where one party pays on behalf of another, the arrangement must be recorded with the relevant reimbursement or allocation details.

### 11.2 Expense Categories

The architecture should support expense categories such as:

- Stock procurement.
- Packaging and delivery.
- Rent and utilities.
- Salaries and employee-related expenditure.
- Marketing and advertising.
- Software and technology services.
- Payment processing charges.
- Professional and administrative services.
- Maintenance and operational costs.
- Other approved business expenditure.

The category structure must remain configurable and subject to accounting review.

### 11.3 Expense Lifecycle

An expense may move through separate stages:

1. Proposed or planned.
2. Submitted with supporting information.
3. Reviewed.
4. Approved or rejected.
5. Recorded or posted.
6. Paid or settled.
7. Reconciled.

The architecture must not assume that every expense follows an identical workflow.

The distinction between an expense proposal, an incurred obligation, a posted record and a payment must remain clear.

### 11.4 Expense Evidence

Where applicable, expense records must reference invoices, receipts, supplier details, payment evidence and approval records.

Supporting documents must be access-controlled and retained according to applicable retention requirements.

### 11.5 Shared Expenses

Where an expense benefits more than one party, its allocation must be based on an explicitly agreed method.

The system must record the responsible parties, allocation basis, amounts, approvals and effective period.

Equal allocation must not be assumed.

### 11.6 Expense Corrections

Corrections must preserve the original expense record and identify the reason, authorisation and resulting financial effect.

A correction must not be used to conceal an unauthorised payment or remove an outstanding obligation.

## 12. Commission and Platform Service Charges

### 12.1 Commission Architecture

The platform may operate commission arrangements with participating stores where such arrangements have been explicitly agreed.

The architecture must support commission configuration without assuming that every store has the same commercial terms.

Commission arrangements must be represented as approved agreements with identifiable parties and effective dates.

### 12.2 Commission Agreement

A commission agreement should record, where applicable:

- The platform and participating store.
- The commission basis.
- The agreed rate or amount.
- The applicable products, transactions or services.
- The effective start and end dates.
- Applicable exclusions.
- Calculation and rounding rules.
- Settlement terms.
- Approval and amendment history.

The actual terms remain subject to business agreement.

### 12.3 Commission Calculation

Commission calculations must use the applicable approved agreement and the authoritative underlying transaction data.

The system must not assume that commission is calculated from gross order value, net sales, amounts collected or another basis until that basis has been agreed.

Where refunds, cancellations, discounts, taxes or chargebacks affect commission, the treatment must follow the approved agreement.

### 12.4 Effective-Dated Rules

Commission terms must be effective-dated.

Changes to rates, calculation bases or eligibility must not silently alter commissions already calculated under an earlier agreement.

The system must retain the rule version and agreement applicable to each calculation.

### 12.5 Commission Review and Approval

Commission calculations should be traceable to their source transactions and agreement terms.

The system should support review of calculated amounts, exceptions and disputed calculations before the applicable settlement process.

A calculated commission must not automatically be treated as paid or settled.

### 12.6 Service Charges and Other Fees

Platform service charges, subscription fees, administrative charges and other commercial fees must be distinguished from commissions.

Each charge must have an approved commercial basis, applicable parties, amount or calculation rule, effective period and settlement treatment.

No service fee or recurring charge may be assumed solely from store participation.

### 12.7 Unresolved Commercial Terms

Commission rates, service charges, minimum fees, payment timing, settlement frequency, thresholds and exemptions remain open business decisions.

The architecture must support these decisions without embedding assumed defaults in application logic.

## 13. Funding and Financial Assistance Architecture

### 13.1 Funding Types

The platform may provide or coordinate different forms of financial or operational assistance.

The architecture should distinguish:

- Capital advances.
- Stock supplied or financed.
- Approved grants or contributions.
- Reimbursements.
- Short-term operational assistance.
- Other agreed funding arrangements.

These categories describe operational arrangements and do not determine their final legal or accounting classification.

### 13.2 Funding Arrangement Records

Each funding arrangement must identify:

- The providing party.
- The receiving party.
- The type and purpose of assistance.
- The approved amount or value.
- The currency where applicable.
- The approval and agreement records.
- The effective date.
- Applicable conditions.
- Repayment or reimbursement terms where agreed.
- Outstanding obligations.
- Supporting evidence.

### 13.3 Approval and Disbursement

Funding decisions must follow an authorised human approval process.

A store performance score, low stock level or automated recommendation must not independently approve or release financial assistance.

Approval and actual disbursement must be recorded as separate events.

### 13.4 Capital Advances

Where the platform advances capital to a store, the arrangement must identify the parties, amount, purpose, approved terms and applicable repayment obligations.

The system must not assume that an advance is interest-free, repayable on demand or subject to a particular repayment schedule.

Such terms must be agreed and recorded before they are applied.

### 13.5 Stock Assistance

Where the platform supplies stock or funds stock procurement, the financial arrangement must remain linked to the relevant inventory and procurement records.

The system must distinguish:

- Stock physically supplied.
- Stock purchased using provided funds.
- Stock transferred between parties.
- Financial value attributed to the assistance.
- Any repayment or reimbursement obligation.

Inventory receipt or transfer does not by itself establish the final accounting treatment.

### 13.6 Repayments and Reimbursements

Repayments and reimbursements must reference the original funding or expense arrangement.

The system must track amounts due, amounts paid, outstanding balances, due dates where applicable and payment evidence.

Partial payments must be supported without losing the remaining obligation.

### 13.7 Funding Changes and Exceptions

Changes to approved funding terms must be authorised and recorded with an effective date.

Disputes, overdue obligations, failed payments and proposed write-offs must be visible for review.

The original agreement and transaction history must remain available.

## 14. Payment Architecture

### 14.1 Payment Domain Relationship

The commerce domain initiates and manages customer payment workflows.

The finance domain consumes verified payment outcomes and records the corresponding financial consequences.

Other financial payments, such as supplier payments, platform expenses, store reimbursements and funding disbursements, must follow their own authorised payment workflows.

### 14.2 Payment Records

A payment record should identify, where applicable:

- A unique internal payment identifier.
- The paying party.
- The receiving party.
- The responsible financial owner.
- The amount and currency.
- The payment purpose.
- The related order, expense, obligation or agreement.
- Payment method or provider.
- External provider reference.
- Initiation and completion timestamps.
- Current payment status.
- Verification evidence.

### 14.3 Payment States

The architecture must distinguish payment states such as:

- Initiated.
- Pending.
- Authorised.
- Processing.
- Successful.
- Failed.
- Cancelled.
- Reversed.
- Partially refunded.
- Refunded.

The exact state transitions must follow the relevant payment method and provider contract.

An authorisation is not the same as a completed payment or settled amount.

### 14.4 Payment Verification

Payment outcomes must be verified through trusted provider responses, authenticated callbacks, provider queries or other approved evidence.

A client-side success message or user-submitted reference must not independently establish that funds were received.

Provider event processing must be authenticated, validated and idempotent.

### 14.5 Payment Fees and Net Amounts

Payment processing fees, deductions, currency conversions and other provider charges must be recorded separately from the underlying payment amount.

The architecture must distinguish the amount charged, amount received, provider fees and amount ultimately settled.

### 14.6 Payment Failure and Uncertain Outcomes

The system must distinguish a confirmed failure from an uncertain payment outcome.

A timeout or interrupted response does not prove that a payment failed.

Before retrying an uncertain payment, the system must check the existing internal and provider references where possible to avoid duplicate charges or transfers.

Unresolved outcomes must remain visible for investigation and reconciliation.

### 14.7 Payment Security

Payment processing must minimise exposure to sensitive payment information.

Where supported, hosted or tokenised provider payment handling should be used.

Full card numbers, card verification values and raw payment credentials must not be stored unless a separately approved architecture and compliance assessment explicitly require it.

Payment tokens and provider references must be treated as sensitive data.

### 14.8 Payment Reversals and Refunds

Payment reversals, refunds and chargebacks must reference the original payment and relevant business transaction.

They must be recorded as distinct financial events with their own amounts, dates, statuses and provider references.

A refund must not silently delete the original payment record.

## 15. Settlement and Payout Architecture

### 15.1 Settlement Objectives

Settlement records must explain how financial obligations are resolved between the platform, stores, customers, providers and other relevant parties.

The architecture must support partial and full settlement while preserving the underlying obligation and transaction history.

### 15.2 Store Payouts

Where the platform collects funds on behalf of a store or coordinates store payouts, the system must record the relationship between the original customer payment, applicable deductions, adjustments and the amount payable to the store.

The architecture must not assume that all customer payments are received or held by the platform.

The actual payment flow and responsible parties must follow the approved provider and commercial arrangements.

### 15.3 Platform Settlements

Platform settlements may include receipts of platform revenue, commission income, service charges, reimbursements and other amounts due.

Each settlement must reference the originating financial obligation and applicable payment evidence.

### 15.4 Settlement Calculations

Settlement calculations must use approved agreements and verified transaction data.

Where a settlement includes commissions, provider fees, refunds, adjustments or other deductions, each component must be separately identifiable.

The system must preserve the calculation inputs and applicable rule versions.

### 15.5 Partial Settlements

The architecture must support partial payment of an obligation.

Each partial settlement must reduce the outstanding amount by the verified amount settled.

The remaining balance, settlement history and any overdue status must remain visible.

### 15.6 Settlement Reversals and Corrections

A failed, reversed or incorrect settlement must be recorded through a controlled correction process.

The original settlement record must remain available, with links to the reversal or replacement transaction.

### 15.7 Settlement Schedules

Settlement frequency, cut-off times, payout delays, minimum thresholds and payment windows must be determined by the relevant commercial agreements and provider capabilities.

The architecture must not assume a daily, weekly or monthly settlement schedule.

### 15.8 Settlement Approval

Where approval is required, the system must distinguish preparation, review, authorisation, payment execution and confirmation.

A prepared settlement batch must not automatically authorise payment.

The approval and execution authority must follow the applicable financial governance rules.

## 16. Financial Reconciliation and Exception Management

### 16.1 Reconciliation Objectives

Reconciliation must establish whether internal financial records agree with relevant external evidence and underlying business transactions.

The architecture should support reconciliation across:

- Orders and verified payments.
- Payment provider transactions and settlements.
- Bank deposits and withdrawals.
- Store payouts and platform deductions.
- Commission calculations and agreements.
- Supplier invoices and payments.
- Expenses and supporting evidence.
- Funding disbursements and repayments.
- Refunds, reversals and chargebacks.

### 16.2 Reconciliation Sources

Reconciliation may use provider reports, bank statements, accounting records, invoices, receipts and internal transaction records.

Each source must retain its identity, reporting period, currency and import or verification status.

Imported external data must not automatically overwrite internal financial records.

### 16.3 Matching and Reconciliation Rules

The architecture should support matching using trusted identifiers, provider references, transaction dates, amounts, currencies and other relevant attributes.

Matching rules must account for partial settlements, processing fees, timing differences, reversals and currency conversions.

Exact matching requirements may vary by provider and transaction type.

### 16.4 Reconciliation Statuses

Reconciliation records should distinguish states such as:

- Unmatched.
- Matched.
- Partially matched.
- Discrepant.
- Under investigation.
- Resolved.
- Approved for adjustment.
- Closed.

A matched record indicates that the relevant evidence has been linked. It does not automatically establish that every accounting treatment is correct.

### 16.5 Financial Exceptions

Exceptions may include:

- Missing provider transactions.
- Duplicate payments.
- Amount or currency differences.
- Unexpected provider fees.
- Failed or delayed settlements.
- Unexplained bank movements.
- Incorrect commission calculations.
- Outstanding store obligations.
- Unmatched refunds or reversals.
- Missing or invalid supporting evidence.

Exceptions must have an identifiable owner, status, investigation history and resolution outcome.

### 16.6 Investigation and Adjustment Authority

Investigating a discrepancy and proposing a correction are separate from authorising and posting a financial adjustment.

The person investigating an exception must not automatically have authority to approve their own material correction or settlement.

The required separation of duties and approval limits must be defined by the financial governance model.

### 16.7 Reconciliation History

The system must preserve reconciliation runs, source records, matching results, manual decisions, approvals and resolution history.

Reprocessing an imported source must not silently duplicate transactions or erase earlier reconciliation decisions.

### 16.8 Period-End Reconciliation

The architecture should support controlled financial period reviews and reconciliation.

Period definitions, close procedures, adjustment cut-offs and reopening authority require accounting and business approval.

Closed periods must not be silently altered. Any permitted correction must remain traceable and follow the approved accounting process.

The architecture must support:

- Explicit period status, including open, closing and closed states where applicable.
- Defined authority to close and reopen financial periods.
- Restrictions on posting or changing records in closed periods.
- Controlled approval for permitted reopening.
- Traceable handling of backdated transactions and adjustments.
- Preservation of the original posting date and the date an adjustment is recorded.

The accounting treatment of prior-period corrections and the authority to reopen periods must follow approved accounting policies.

### 16.9 Reconciliation Reporting

Authorised users should be able to review:

- Reconciled and unreconciled amounts.
- Outstanding exceptions.
- Settlement differences.
- Aged receivables and payables.
- Unresolved funding obligations.
- Reconciliation completion by period.
- Adjustments awaiting approval.

Reports must preserve platform and store financial boundaries.


## 17. Financial Reporting and Analytics

### 17.1 Reporting Objectives

Financial reporting must provide accurate, traceable information for platform oversight, store operations, financial review and business decision-making.

Reports must preserve the distinction between operational metrics, financial transaction values, recognised amounts, outstanding obligations and settled funds.

### 17.2 Platform Financial Reporting

Authorised platform personnel should be able to review:

- Platform revenue and income.
- Platform operating expenses.
- Platform financial obligations.
- Commission and service-charge income where applicable.
- Marketing and other platform expenditure.
- Financial assistance provided to stores.
- Amounts receivable from stores.
- Platform settlements and outstanding balances.
- Reconciliation exceptions.
- Financial performance over defined periods.

Platform reports must not automatically include unrestricted access to detailed store financial records.

### 17.3 Store Financial Reporting

Authorised Store Admins should be able to review financial information for their own store, including:

- Store revenue and sales-related financial activity.
- Store expenses.
- Payment and refund activity.
- Store payouts and settlements.
- Amounts payable to or receivable from the platform.
- Funding received and repayment obligations.
- Outstanding financial exceptions.
- Financial performance over defined periods.

Store reports must not expose another store's confidential financial information.

### 17.4 Consolidated Platform Reporting

The platform may provide consolidated reporting across participating stores where authorised and supported by the underlying data.

Consolidated reports must distinguish platform-owned financial activity from store-owned financial activity.

Aggregated store figures must not be presented as platform revenue or platform assets merely because the platform coordinates the underlying activity.

### 17.5 Financial Metrics

Financial reports may include:

- Gross sales.
- Discounts and refunds.
- Net sales measures.
- Recognised revenue.
- Operating expenses.
- Gross margin where reliable cost information exists.
- Outstanding receivables and payables.
- Cash received and cash paid.
- Settlement amounts.
- Funding outstanding.
- Commission and service charges.
- Reconciliation differences.

Metric definitions must be documented and consistent.

The system must not present a calculated measure as an accounting result unless the relevant accounting treatment has been approved.

### 17.6 Reporting Periods and Currency

Reports must identify their reporting period, currency and relevant time zone.

Where multiple currencies are supported, original transaction currency and any converted reporting amount must remain distinguishable.

Exchange rates, conversion dates and rounding methods must be recorded where conversion is performed.

### 17.7 Financial Data Exports

Financial exports must follow the same ownership, authorisation and confidentiality boundaries as the underlying records.

Exports should identify the reporting period, currency, data source and generation date.

Sensitive exports must be protected against unauthorised access and unnecessary distribution.

## 18. Financial Data Security and Access Control

### 18.1 Identity and Access Integration

The finance domain must use the platform's central identity and access architecture.

Financial permissions must be assigned according to role, financial context and authorised responsibilities.

Authentication alone does not grant access to financial records.

### 18.2 Platform Financial Access

Platform financial access must be explicitly assigned.

Platform-level administrative roles must not automatically receive every financial approval, payment execution or adjustment permission.

Sensitive financial operations must require the appropriate delegated authority.

### 18.3 Store Financial Access

Store financial records must be restricted to authorised members of the relevant store and appropriately authorised platform personnel.

Store context must be established and verified by the backend.

A client-supplied store identifier must not independently establish access to that store's financial information.

### 18.4 Separation of Duties

The architecture should support separation between:

- Financial record creation.
- Supporting evidence submission.
- Review and verification.
- Approval.
- Posting.
- Payment execution.
- Reconciliation.
- Adjustment approval.

The level of separation required must reflect the value, risk and nature of the financial activity.

Material financial actions should not rely on a single unchecked user action where independent review is appropriate.

Where required by the approved financial authority model, the system must support independent preparation and approval.

The architecture should allow approval requirements to reflect transaction value, risk, financial category and responsible entity without embedding unapproved monetary thresholds.

A user must not approve their own transaction where the applicable control requires independent approval.

Delegated approval limits, exceptions, escalation and emergency procedures must be explicitly authorised and auditable.

### 18.5 Privileged Financial Operations

Sensitive operations must require explicit permission and appropriate safeguards.

Examples include:

- Changing approved financial agreements.
- Modifying commission terms.
- Approving significant expenditure.
- Authorising funding disbursements.
- Executing settlement batches.
- Posting material adjustments.
- Writing off outstanding obligations.
- Changing financial access permissions.

These actions must be recorded and traceable.

### 18.6 Data Protection

Financial information must be protected in transit and at rest using the platform's approved security controls.

Sensitive payment details, bank information, provider credentials and financial documents must not be exposed through public APIs, frontend bundles or unrestricted logs.

Access to financial documents must be purpose-limited and auditable.

### 18.7 Backend Enforcement

Financial authorisation must be enforced by trusted backend services.

Frontend visibility rules are not sufficient security controls.

The backend must verify the user's current account status, applicable permissions, financial ownership and store context for every protected operation.

### 18.8 Financial Data Isolation

Where financial records belong to a store, database relationships and backend validation must preserve that store boundary.

Where applicable, composite unique constraints and foreign keys must prevent records from referencing financial entities belonging to another store.

Platform-level records must have explicit platform ownership rather than relying on an ambiguous missing store reference.

### 18.9 Financial Access Revocation

Changes to user roles, store memberships or financial permissions must take effect through the approved access-revocation mechanism.

Previously issued sessions or tokens must not preserve financial authority indefinitely after access has been revoked.

## 19. Financial Audit and Accountability

### 19.1 Audit Objectives

Financial audit records must establish who performed an action, what changed, when it occurred, which financial context was affected and what authority was used.

Auditability must cover both user-initiated and automated financial activity.

### 19.2 Auditable Financial Actions

The system should record material actions including:

- Financial record creation and modification.
- Financial approval and rejection.
- Posting and reversal.
- Agreement creation and amendment.
- Commission calculation and recalculation.
- Funding approval and disbursement.
- Payment initiation and confirmation.
- Settlement preparation and execution.
- Reconciliation and exception resolution.
- Financial exports.
- Financial permission changes.
- Changes to financial categories and configuration.

### 19.3 Audit Record Contents

An audit record should include, where applicable:

- A unique event identifier.
- The responsible user or system process.
- The action performed.
- The affected financial record.
- Platform or store context.
- Event timestamp.
- Relevant before-and-after values.
- Approval or delegation reference.
- Request or correlation identifier.
- Reason or supporting reference.

Sensitive information must not be unnecessarily duplicated in audit records.

### 19.4 Immutability and Corrections

Posted financial records and audit history must not be silently overwritten or deleted.

Corrections must be represented through authorised adjustments, reversals or replacement records.

The system must preserve the relationship between the original record and subsequent changes.

### 19.5 Financial Approval Evidence

Approval records must identify the approving authority, decision, timestamp and relevant transaction or agreement.

Where additional evidence is required, the approval must reference that evidence.

A record created by a user must not be interpreted as proof that the transaction was approved.

### 19.6 Audit Access

Audit records must be accessible only to authorised users.

Access to audit history must not grant permission to alter the underlying financial transactions.

Audit access and exports should themselves be traceable where appropriate.

## 20. Financial Integrations and External Services

### 20.1 Integration Principles

Financial integrations must use controlled backend interfaces and trusted provider references.

External services may provide transaction evidence, payment execution, settlement information, accounting data or supporting documents.

The finance domain remains responsible for applying internal ownership, validation, authorisation and reconciliation rules.

### 20.2 Payment Providers

Payment provider integrations must support the relevant payment lifecycle, including initiation, confirmation, failure, refunds and settlement information where available.

Provider capabilities and account structures must be assessed before selecting an integration.

The architecture must not assume that every provider supports the same payment, refund, payout or reconciliation operations.

### 20.3 Banking and Settlement Data

Where bank feeds, statements or payout reports are integrated, imported records must retain source identifiers and reporting periods.

Imported data should be validated and processed through controlled reconciliation workflows.

An imported bank transaction must not automatically create an approved financial adjustment.

### 20.4 Accounting Systems

The platform may integrate with external accounting systems where required.

The integration must define which system is authoritative for each financial record type and process.

Data exchange must preserve transaction identifiers, ownership, currency, effective dates and audit references.

The architecture must avoid uncontrolled duplicate posting between the platform and an external accounting system.

### 20.5 Provider Webhooks and Notifications

Provider callbacks and webhooks must be authenticated and validated.

Where an event can affect a financial record, the system must verify the relevant provider account, transaction reference and internal mapping.

A provider payload containing a store identifier must not independently establish store authority or financial ownership.

### 20.6 External Document Sources

Invoices, receipts, statements and other financial documents may originate from external providers or user submissions.

Their source, integrity and relationship to the relevant financial transaction must be recorded.

Uploaded documents must be treated as untrusted files and handled according to the platform's security architecture.

### 20.7 Integration Failure and Recovery

Integration failures must be visible and recoverable.

Retries must be controlled and idempotent where the provider supports suitable identifiers or request controls.

Uncertain payment or settlement outcomes must be investigated before repeating an operation that could move funds.

### 20.8 Provider Replacement

The architecture should isolate provider-specific behaviour behind defined integration boundaries.

Replacing a payment provider, bank integration or accounting service must not require rewriting unrelated financial ownership and transaction rules.

Historical provider references must remain available after a provider is replaced.

## 21. Financial Reliability and Background Processing

### 21.1 Transaction Integrity

Financial operations must preserve data consistency across related records.

Where one business operation affects multiple financial records, the backend must use appropriate database transactions and consistency controls.

Partial processing must be detectable and recoverable.

### 21.2 Idempotency

Financial operations that may be retried must use suitable idempotency controls.

Repeated requests, provider callbacks or background jobs must not create duplicate payments, settlements, obligations or financial postings.

Idempotency keys and provider references must be scoped and retained appropriately.

### 21.3 Concurrency Control

Concurrent financial operations must not produce conflicting balances or duplicate settlement activity.

The architecture should use appropriate database constraints, transaction isolation, locking or equivalent concurrency controls.

Financial balances must not rely solely on client-side calculations or cached values.

### 21.4 Background Processing

Background jobs may support:

- Approved commission calculations.
- Settlement preparation.
- Provider statement imports.
- Reconciliation processing.
- Scheduled financial reports.
- Outstanding obligation monitoring.
- Notifications and reminders.
- Financial period processing.

Background jobs must use controlled permissions and preserve their execution history.

### 21.5 Retry and Failure Management

Transient failures may be retried under defined policies.

Permanent failures and exhausted retries must be recorded for investigation.

A failed job must not silently discard financial data or create duplicate financial effects when retried.

### 21.6 Financial Period Processing

Scheduled period processing must use explicit period boundaries and time-zone rules.

The system must prevent conflicting or repeated period-close operations.

Any reopening or correction of a completed period must follow approved authority and preserve the original processing history.

### 21.7 Monitoring and Alerts

Financial operations should be monitored for:

- Failed payment processing.
- Uncertain payment outcomes.
- Duplicate transaction attempts.
- Failed settlements.
- Reconciliation backlogs.
- Unexpected financial differences.
- Overdue obligations.
- Failed background jobs.
- Unusual access or approval activity.

Alerts must provide sufficient operational context without unnecessarily exposing sensitive financial data.

## 22. Financial Testing Architecture

### 22.1 Unit Testing

Unit tests should cover financial calculations, transaction classification, agreement rules, commission calculations, settlement calculations, outstanding balances and allocation logic.

Tests must verify boundary conditions, rounding, currency handling and effective dates.

### 22.2 Integration Testing

Integration tests should cover database transactions, financial APIs, payment providers, bank imports, accounting integrations, webhook processing and background jobs.

### 22.3 Ownership and Isolation Testing

Tests must verify that:

- Store financial records remain isolated.
- Store Admins cannot access another store's restricted financial information.
- Platform and store transactions are not incorrectly combined.
- Multi-party obligations retain the correct parties and allocations.
- Historical ownership remains unchanged when store administration changes.

Both allowed and denied operations must be tested.

### 22.4 Financial Authority Testing

Tests must verify approval limits, role boundaries and separation of duties.

Users must not be able to approve or execute operations outside their assigned authority.

Revoked financial permissions must no longer permit protected operations.

### 22.5 Transaction Integrity Testing

Tests must cover duplicate requests, concurrent operations, partial failures, reversals, retries and recovery.

Financial balances and obligations must remain consistent after failed or repeated operations.

### 22.6 Payment and Settlement Testing

Tests must cover payment success, failure, uncertain outcomes, duplicate provider events, refunds, chargebacks, partial settlement and settlement reversal.

Provider test environments should be used where available.

### 22.7 Reconciliation Testing

Tests must cover exact matches, partial matches, missing transactions, duplicate imports, amount differences, currency differences, provider fees and manual resolution.

Reprocessing the same source data must not silently duplicate financial records.

### 22.8 Audit Testing

Tests must verify that material financial actions produce the required audit evidence and that audit history cannot be silently altered through ordinary application permissions.

### 22.9 Security and Performance Testing

Testing must cover financial data exposure, insecure direct object references, privilege escalation, sensitive document access and integration secret protection.

Performance testing should include realistic transaction volumes, reconciliation workloads and concurrent financial operations.

## 23. Migration from the Existing Yotaabo Application

### 23.1 Migration Objectives

Financial architecture must be introduced without disrupting existing Yotaabo production operations.

Migration must preserve existing customer transactions, payments, refunds, product information, inventory relationships and administrative workflows.

### 23.2 Existing Financial Data Assessment

Before migration, existing financial data must be assessed for:

- Data ownership.
- Source and origin.
- Transaction references.
- Amounts and currencies.
- Payment and refund states.
- Settlement evidence.
- Existing financial classifications.
- Relationships to orders and stores.
- Data quality and completeness.

The migration must not invent missing financial history or silently treat incomplete records as verified.

### 23.3 Data Mapping and Reconciliation

Existing records must be mapped to the target financial model through documented rules.

Records that cannot be confidently mapped must be identified for review rather than assigned an assumed financial meaning.

Migration totals and transaction counts should be reconciled against the source data.

### 23.4 Incremental Financial Migration

Financial capabilities should be introduced in controlled stages.

Potential stages include:

- Establishing platform and store financial ownership.
- Introducing financial transaction records.
- Connecting verified payment outcomes.
- Introducing expenses and obligations.
- Adding approved commission and funding arrangements.
- Introducing settlements and reconciliation.
- Enabling financial reporting.

Each stage must have defined verification criteria.

### 23.5 Existing Production Protection

Existing production routes, request and response contracts, payment processing and administrative workflows must remain operational until their replacements have been implemented and verified.

Migration must not introduce competing write or payment-processing paths that could duplicate financial effects.

### 23.6 Cutover and Rollback

Cutover planning must identify the authoritative processing path for new financial operations, provider callbacks, settlement jobs and pending transactions.

Rollback planning must account for payments already initiated, provider-confirmed transactions, in-flight settlements, imported statements, queued jobs and reconciliation history.

Financial records must not be lost or duplicated during a rollback.

### 23.7 Migration Verification

Before production cutover, verification should include:

- Financial ownership and store isolation.
- Transaction counts and totals.
- Payment and refund references.
- Outstanding obligations.
- Settlement records.
- Reconciliation results.
- Approval and audit history.
- Access permissions.
- Recovery procedures.

Production migration must use an appropriate recovery point and a tested recovery process before destructive or high-risk changes.

## 24. Non-Functional Financial Requirements

### 24.1 Accuracy

Financial amounts, ownership and transaction relationships must remain accurate and traceable.

### 24.2 Consistency

Financial records must maintain consistent relationships across transactions, obligations, payments, settlements and adjustments.

### 24.3 Security

Financial data and operations must be protected through server-side authorisation, secure integration and controlled access.

### 24.4 Reliability

Financial operations must support recoverable processing and prevent duplicate or lost financial effects.

### 24.5 Performance

Financial transaction processing, reporting and reconciliation must perform within agreed operational expectations.

Large reporting and reconciliation workloads must not unnecessarily interrupt ordinary storefront and commerce operations.

### 24.6 Scalability

The architecture should support additional stores, transactions, payment providers and financial records without requiring a separate financial application for each store.

### 24.7 Maintainability

Financial rules, integrations, transaction processing and reporting must have clear module boundaries and testable interfaces.

### 24.8 Auditability

Material financial activity must remain attributable, traceable and reviewable throughout its lifecycle.

### 24.9 Recoverability

The platform must maintain appropriate backups and recovery procedures for financial data.

Recovery procedures must preserve transaction integrity and prevent previously deleted or reversed financial information from being incorrectly reintroduced.

## 25. Architectural Constraints

The finance architecture is subject to the following constraints:

- The initial target backend follows a NestJS modular monolith architecture.
- The frontend remains based on React, TypeScript and Vite.
- PostgreSQL is the target relational data platform.
- Platform and store financial ownership must remain explicit.
- Store financial data must be isolated by authorised store context.
- Financial agreements must be distinguished from resulting transactions.
- Financial record creation, approval, posting, payment and settlement must remain distinct operations.
- Commission rates and commercial terms must not be assumed.
- Funding and financial assistance must require authorised human approval.
- The finance domain must not replace commerce payment workflows or inventory ownership.
- Marketing attribution and campaign budgets must not become authoritative financial records.
- External provider outcomes must be verified through trusted evidence.
- Financial corrections must preserve original records and audit history.
- Existing Yotaabo production functionality must remain protected during migration.
- New financial microservices must not be introduced without a justified architectural need.

## 26. Open Finance Architecture Decisions

The following decisions require further specification and approval before the corresponding functionality is implemented.

| Decision | Matters requiring resolution |
|---|---|
| Legal and financial structure | Legal identity and financial responsibility of the platform and participating stores |
| Accounting model | Accounting policies, recognition rules, chart of accounts and reporting requirements |
| Financial ownership | Detailed ownership rules for each category of transaction |
| Commission arrangements | Rates, calculation basis, exclusions, effective dates and settlement terms |
| Platform service charges | Applicable services, fee structures, approval and billing rules |
| Store settlements | Collection model, payout responsibilities, schedules and thresholds |
| Payment providers | Initial providers, account ownership, capabilities and integration contracts |
| Banking integrations | Supported institutions, statement formats and verification processes |
| Accounting integrations | External accounting systems and authoritative record boundaries |
| Tax treatment | Applicable tax treatment and professional review requirements |
| Currency support | Supported currencies, exchange-rate sources, conversion and rounding rules |
| Financial approvals | Approval limits, delegation, separation of duties and escalation |
| Financial assistance | Eligible assistance types, approval criteria and agreement structures |
| Capital advances | Repayment terms, interest treatment and applicable obligations |
| Stock assistance | Ownership, valuation, reimbursement and accounting treatment |
| Shared expenditure | Allocation methods and approval requirements |
| Expense management | Expense categories, evidence requirements and approval workflows |
| Financial periods | Period definitions, close procedures and reopening authority |
| Reconciliation | Matching rules, source systems, frequency and exception ownership |
| Financial retention | Retention periods and treatment of supporting financial evidence |
| Reporting | Approved financial metrics, reporting access and export requirements |
| Migration | Existing financial data mapping, verification and cutover approach |

Unresolved decisions must remain configurable or deferred where practical.

No rate, tax treatment, accounting policy, repayment term, financial approval threshold or settlement schedule may be introduced as a permanent rule without the appropriate business and professional review.

## 27. Relationship to Other Documents

This document must be read alongside:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.
- System Architecture.
- Data Architecture.
- Store Architecture.
- Identity and Access Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Operations Architecture.
- Integration Architecture.
- Application Architecture.
- Commerce Architecture.
- Inventory Architecture.
- Customer Architecture.
- Marketing Architecture.

The finance architecture depends on the commerce domain for order and payment workflows, the inventory domain for stock-related records, the marketing domain for campaign expenditure context and the customer domain for customer references and privacy boundaries.

The finance domain is authoritative for the financial records, obligations, approvals, settlements and reconciliation processes defined within its scope.

Where requirements overlap, each domain must remain authoritative for its own responsibilities and exchange information through defined interfaces.

## 28. Architecture Governance

### 28.1 Approval

This document remains a draft until reviewed and explicitly approved by the business owner.

Approval must not be inferred from implementation activity or the existence of related approved documents.

### 28.2 Change Management

Material changes to financial ownership, commercial agreements, commission calculations, payment flows, settlement responsibilities, funding arrangements or accounting boundaries must be reviewed against the relevant business and architecture documents.

### 28.3 Financial Rule Governance

Financial rules must have an identifiable owner, approval basis, effective date and change history.

Commercial or accounting rules must not be introduced through undocumented implementation assumptions.

### 28.4 Implementation Compliance

Financial implementation must follow the approved architecture and record any authorised deviation.

Unresolved decisions must be escalated rather than silently resolved through code or database defaults.

### 28.5 Review

The architecture should be reviewed when the platform's financial model, store participation arrangements, payment providers, accounting requirements or applicable legal obligations materially change.
