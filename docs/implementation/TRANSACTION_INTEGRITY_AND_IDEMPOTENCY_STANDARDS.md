# Transaction Integrity and Idempotency Standards

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines standards for maintaining transaction integrity across the multi-store retail platform.

It establishes requirements for atomic operations, concurrent requests, duplicate prevention, retries, external provider interactions, and recovery from partial failures.

The objective is to prevent duplicate business actions, inconsistent records, lost updates, and incorrect financial or inventory outcomes.

## 2. Scope

This standard applies to:

- Order creation and updates.
- Payment initiation and confirmation.
- Refunds and cancellations.
- Inventory reservations and adjustments.
- Stock transfers.
- Financial postings and settlements.
- Product and store configuration changes.
- Webhook processing.
- Background jobs.
- External API integrations.
- Administrative operations.
- Data migration and reconciliation.

It applies to synchronous API requests, asynchronous processing, scheduled jobs, and provider callbacks.

## 3. Core Principles

### 3.1 Atomicity

Operations that must succeed or fail together must use an appropriate transactional boundary.

### 3.2 Consistency

Every completed operation must preserve defined business and data invariants.

### 3.3 Isolation

Concurrent operations must not create invalid or conflicting business outcomes.

### 3.4 Durability

Once a transaction is reported as successfully committed, its required records must be durably persisted.

### 3.5 Idempotency

Repeating an equivalent request must not create duplicate business effects where the operation is designed to be idempotent.

### 3.6 Explicit uncertainty

An unknown external outcome must remain identifiable as uncertain until verified.

### 3.7 Traceability

Related operations must be linkable through stable identifiers and audit records.

## 4. Transaction Boundaries

Each material business operation must define its transaction boundary.

The design must identify:

- Records created or modified.
- Required database constraints.
- Preconditions.
- Authorisation checks.
- Atomic changes.
- External dependencies.
- Failure behaviour.
- Retry behaviour.
- Audit requirements.
- Recovery procedure.

A transaction must not be split across multiple independent writes without an explicit consistency strategy.

## 5. Database Transaction Standards

### 5.1 Atomic writes

Related database changes must be committed together where partial completion would violate business integrity.

Examples include:

- Creating an order and its required order items.
- Recording an inventory movement and updating the corresponding balance.
- Posting a financial transaction and its ledger entries.
- Completing a stock transfer and updating both affected store balances.

### 5.2 Constraints

Database constraints must protect critical invariants.

These may include:

- Foreign keys.
- Unique constraints.
- Non-null constraints.
- Check constraints.
- Appropriate exclusion constraints.
- Valid status and relationship restrictions.

Application validation must complement database constraints.

### 5.3 Isolation

The transaction isolation level must be selected according to the operation's concurrency requirements.

Where necessary, implementations should use:

- Row-level locking.
- Optimistic concurrency checks.
- Unique constraints.
- Atomic conditional updates.
- Serializable transactions for suitable high-risk operations.

The implementation must account for deadlocks, lock timeouts, and transaction retries.

### 5.4 Transaction duration

Transactions should remain short.

Network calls, user interaction, and slow external provider operations must not be performed while holding database locks unnecessarily.

## 6. Idempotency Requirements

Idempotency must be implemented for operations where duplicate execution could create material business effects.

Examples include:

- Order submission.
- Payment initiation.
- Refund requests.
- Inventory adjustments.
- Stock transfer creation.
- Financial postings.
- Webhook processing.
- Scheduled job execution.

### 6.1 Idempotency key

An idempotency key must uniquely identify the intended operation within its defined scope.

The key should be:

- Generated or accepted through a documented trusted process.
- Bound to the authenticated actor or relevant store scope.
- Bound to the operation type.
- Associated with a request fingerprint.
- Protected by a uniqueness constraint.
- Retained for an approved period.

A client-generated key must not be treated as proof of authorisation.

### 6.2 Request fingerprint

The platform should calculate a stable fingerprint of the material request attributes.

If the same key is reused with materially different request data, the platform must reject the request rather than silently treating it as the original operation.

### 6.3 Repeated requests

When an equivalent request is repeated using the same valid key, the platform should return the original operation result or its current processing state.

It must not create a second business operation.

### 6.4 Key scope

Idempotency keys must be scoped to prevent collisions between unrelated stores, actors, and operation types.

The scope must be documented for each operation.

### 6.5 Retention

Idempotency records must remain available for a period appropriate to the operation and its retry window.

Financial and provider operations require particular care because a delayed retry may otherwise create duplicate effects.

Retention periods must be explicitly approved.

## 7. Order Transaction Integrity

Order creation must protect against duplicate submissions and inconsistent order contents.

The platform must:

- Validate the current product listing.
- Validate the applicable store.
- Validate product and variant availability.
- Validate pricing using authoritative server-side data.
- Record the commercial values applicable at the time of order.
- Create required order records atomically.
- Apply the approved inventory reservation process.
- Associate the order with a stable reference.
- Record relevant audit events.

A browser-submitted total must not be accepted as the authoritative order amount.

Order status transitions must follow approved business rules.

## 8. Payment Transaction Integrity

Payment operations must distinguish internal order state from external provider state.

### 8.1 Payment initiation

Payment initiation must use a stable internal payment reference and an appropriate provider idempotency mechanism where supported.

The platform must prevent repeated requests from creating multiple unintended payment attempts.

### 8.2 Provider confirmation

Payment success must be established using a trusted provider response or verified provider transaction status.

A client redirect or browser success message is not sufficient evidence of payment.

### 8.3 Uncertain outcomes

A timeout or interrupted provider response does not prove that payment failed.

The payment must remain in an appropriate pending or uncertain state until verified.

Before retrying, the platform must query the existing provider reference or idempotency record where supported.

### 8.4 Payment and order consistency

Payment confirmation, order state, and required financial records must be updated through a controlled workflow.

The platform must handle delayed confirmations and repeated provider notifications safely.

### 8.5 Provider reconciliation

Unresolved payment outcomes must be reconciled against provider records.

The reconciliation process must identify missing, duplicated, delayed, and mismatched transactions.

## 9. Refund and Cancellation Integrity

Refund and cancellation operations must be idempotent and authorised.

The platform must:

- Verify the original transaction.
- Verify refund eligibility.
- Verify the remaining refundable amount.
- Prevent duplicate refund requests.
- Apply required approval controls.
- Preserve the original financial record.
- Record provider references.
- Reconcile uncertain outcomes.

A cancellation must not automatically be interpreted as a successful refund.

The order, payment, and refund states must remain distinct.

## 10. Inventory Transaction Integrity

Inventory operations must prevent overselling and inconsistent stock balances.

### 10.1 Reservations

Stock reservation must be atomic with the relevant availability check.

Concurrent orders must not reserve the same available quantity beyond the permitted balance.

### 10.2 Stock movements

Every material stock change must have a traceable movement record.

The current inventory balance must remain consistent with the approved movement and adjustment model.

### 10.3 Transfers

A stock transfer must identify:

- Source store.
- Destination store.
- Product and variant.
- Quantity.
- Initiating actor.
- Transfer reference.
- Current status.

The transfer must not be treated as completed until the required source and destination operations have been confirmed.

### 10.4 Duplicate prevention

Repeated stock receipt, adjustment, or transfer requests must not create duplicate movements.

Idempotency and database constraints must protect these operations.

## 11. Financial Posting Integrity

Financial posting must preserve accounting traceability.

The platform must:

- Use authoritative transaction references.
- Prevent duplicate postings.
- Preserve original transaction records.
- Apply approved debit and credit relationships where ledger accounting is used.
- Enforce currency consistency.
- Record store attribution.
- Apply approval controls.
- Support reconciliation.
- Prevent unauthorised modification of posted entries.

Financial corrections must use authorised adjustment or reversal processes.

A reporting calculation must not be treated as a financial posting.

## 12. Webhook Processing

Webhook processing must be durable, verifiable, and idempotent.

### 12.1 Verification

Incoming webhook signatures or equivalent provider authentication mechanisms must be verified before processing.

Store attribution must come from a verified provider mapping or trusted internal reference.

A store identifier in an unverified payload must not determine authority.

### 12.2 Durable receipt

The webhook event must be persisted durably before the platform acknowledges successful receipt to the provider.

### 12.3 Duplicate delivery

Providers may retry delivery.

The platform must identify previously processed events using a stable provider event identifier or another documented deduplication mechanism.

Repeated delivery must not repeat the underlying business action.

### 12.4 Event ordering

The platform must not assume that webhook events always arrive in business-event order.

Where ordering matters, the implementation must verify current provider state or use a reliable sequence mechanism.

### 12.5 Failure handling

Failed processing must remain recoverable.

The platform must support controlled retries, dead-letter handling where appropriate, and reconciliation.

## 13. Background Jobs and Scheduled Processing

Background jobs must be safe to retry.

They must:

- Use stable job or operation identifiers.
- Prevent concurrent duplicate execution where necessary.
- Record processing state.
- Handle partial failure.
- Apply the same business rules as API operations.
- Support safe recovery.
- Record material outcomes.
- Avoid duplicate financial or inventory effects.

Job execution must not rely only on an in-memory flag for duplicate prevention.

## 14. External Service Integrations

External service calls introduce uncertainty because the platform cannot always know whether the provider completed an operation.

Integration workflows must define:

- Internal operation reference.
- Provider request reference.
- Provider idempotency support.
- Timeout behaviour.
- Retry policy.
- Status verification.
- Reconciliation procedure.
- Compensation or reversal process where supported.

A network timeout must not trigger an unconditional repeat of a potentially non-idempotent operation.

## 15. Distributed Workflows and Sagas

Operations spanning multiple services or external systems may require a distributed workflow.

Where a single database transaction is not practical, the platform may use a saga or equivalent orchestration pattern.

The workflow must define:

- Steps and dependencies.
- Durable progress state.
- Retryable operations.
- Non-retryable operations.
- Compensation actions.
- Terminal failure conditions.
- Manual intervention requirements.
- Reconciliation procedures.

Compensation must not be represented as if the original action never occurred.

Financial reversals and inventory corrections must preserve the relevant history.

## 16. Concurrency and Duplicate Request Protection

The platform must account for simultaneous requests affecting the same resource.

Examples include:

- Two customers attempting to purchase the final available unit.
- Two administrators adjusting the same inventory balance.
- Repeated payment confirmation events.
- Concurrent refund requests.
- Multiple jobs processing the same settlement.

Appropriate controls may include:

- Database uniqueness constraints.
- Atomic conditional updates.
- Row locks.
- Optimistic concurrency tokens.
- Idempotency records.
- Job-level execution locks.

Concurrency controls must be tested under realistic parallel request conditions.

## 17. Failure Recovery and Reconciliation

Every material transaction workflow must define how incomplete operations are detected and resolved.

Recovery procedures should identify:

- Original operation reference.
- Last confirmed state.
- External provider state.
- Missing or duplicated records.
- Required corrective action.
- Approval requirements.
- Audit references.

Automated recovery must not guess whether an external transaction succeeded.

Manual correction must preserve original records and follow the applicable approval process.

## 18. Transaction State Models

Material workflows must use documented state models.

Each state model must define:

- Valid states.
- Permitted transitions.
- Transition authority.
- Terminal states.
- Retryable states.
- Uncertain states.
- Failure states.
- Recovery paths.

The platform must reject invalid transitions.

A status field must not be updated directly in a way that bypasses required business checks.

## 19. Observability and Audit

Transaction processing must produce sufficient operational and audit information.

Relevant records should include:

- Internal transaction reference.
- Idempotency key reference, without exposing unnecessary sensitive values.
- Store attribution.
- Actor or service identity.
- Correlation ID.
- Provider reference where applicable.
- Current processing state.
- Attempt count.
- Last failure reason.
- Completion timestamp.
- Reconciliation status.

Sensitive credentials and payment secrets must not be logged.

## 20. Testing Requirements

Transaction integrity tests must cover:

- Repeated equivalent requests.
- Reuse of an idempotency key with different request data.
- Concurrent requests.
- Database constraint violations.
- Transaction rollback.
- Process interruption.
- Network timeout.
- Provider success with lost response.
- Duplicate webhooks.
- Out-of-order webhooks.
- Background job retries.
- Partial distributed workflow failure.
- Recovery and reconciliation.
- Store isolation.
- Duplicate financial posting prevention.
- Inventory overselling prevention.

Tests must verify actual persisted outcomes, not only API response messages.

## 21. Risks and Controls

| Risk | Required control |
|---|---|
| Duplicate orders | Order idempotency and uniqueness controls |
| Duplicate payments | Provider and internal idempotency |
| Duplicate refunds | Refund state checks and approval controls |
| Overselling | Atomic stock reservation |
| Lost webhook events | Durable receipt before acknowledgement |
| Duplicate webhook processing | Event deduplication |
| Inconsistent financial records | Atomic posting and reconciliation |
| Partial workflow completion | Durable state and recovery procedures |
| Concurrent update conflicts | Database concurrency controls |
| Incorrect retry after timeout | Provider status verification |
| Untraceable corrections | Audit records and preserved originals |

## 22. Review and Maintenance

This document must be reviewed:

- When payment or inventory workflows change.
- When new external providers are introduced.
- When transaction architecture changes.
- When background processing changes.
- After duplicate or inconsistent transaction incidents.
- When database transaction strategy changes.
- During scheduled platform governance reviews.

The Platform Owner is responsible for coordinating the review.

## 23. Open Decisions

The following matters require explicit decisions:

1. Which operations require mandatory idempotency keys.
2. Approved idempotency retention periods by operation.
3. Which payment providers support reliable idempotency.
4. The transaction isolation strategy for critical workflows.
5. Whether distributed workflows will use a dedicated orchestration service.
6. How webhook events will be stored and deduplicated.
7. Which operations require manual reconciliation.
8. How uncertain provider outcomes will be surfaced to administrators.
9. Which transaction states require human intervention.
10. How transaction references will be standardised across services.

These decisions must be recorded through the platform decision-management process.

## 24. Related Documents

- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATA_ARCHITECTURE.md`
- `docs/architecture/COMMERCE_ARCHITECTURE.md`
- `docs/architecture/INVENTORY_ARCHITECTURE.md`
- `docs/architecture/FINANCE_ARCHITECTURE.md`
- `docs/architecture/INTEGRATION_ARCHITECTURE.md`
- `docs/implementation/DATABASE_SCHEMA_AND_DATA_MODELING_STANDARDS.md`
- `docs/implementation/API_DEVELOPMENT_GUIDE.md`
- `docs/implementation/API_SECURITY_AND_AUTHORIZATION_TESTING_PROCEDURE.md`
- `docs/implementation/BUSINESS_RULES_AND_POLICY_ENFORCEMENT_STANDARDS.md`
- `docs/implementation/PLATFORM_AUDIT_TRAIL_AND_ADMINISTRATIVE_ACTIVITY_STANDARDS.md`
- `docs/implementation/ERROR_HANDLING_AND_RESPONSE_STANDARDS.md`
- `docs/operations/FINANCIAL_RECONCILIATION_PROCEDURE.md`
- `docs/operations/FINANCIAL_CONTROLS_AND_APPROVALS.md`
- `docs/operations/INCIDENT_RESPONSE_PLAYBOOK.md`
