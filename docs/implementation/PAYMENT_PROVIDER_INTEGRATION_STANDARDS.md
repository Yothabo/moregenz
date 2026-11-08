# Payment Provider Integration Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-F9CC89ED8A |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** DRAFT
**Version:** 0.1
**Last Updated:** 2026-11-07
**Document Owner:** Platform Owner
**Review Status:** Pending
**Classification:** Internal

## 1. Purpose

This document defines the technical and operational standards for integrating payment providers into the multi-store platform.

It establishes consistent controls for payment initiation, provider communication, transaction attribution, payment status management, refunds, reconciliation and failure recovery.

## 2. Scope

These standards apply to:

- Payment provider integrations.
- Payment initiation and confirmation.
- Payment status enquiries.
- Provider callbacks and webhooks.
- Refunds and reversals.
- Provider fees and settlement information.
- Store attribution and financial reporting.
- Provider credentials and configuration.
- Payment integration monitoring and incident handling.

These standards complement the finance, commerce, transaction integrity, webhook and secrets management documentation.

## 3. Integration architecture

- Payment integrations must use a controlled server-side integration layer.
- Storefronts must not communicate directly with provider APIs using private credentials.
- Provider-specific logic must be isolated behind a consistent internal payment interface.
- Storefronts must consume platform-defined payment operations and statuses.
- Provider integrations must not bypass order validation, financial controls or transaction records.
- The current production integration must remain operational until a replacement has passed controlled migration and acceptance.

The target architecture is a modular payment integration capability within the platform backend.

## 4. Provider selection and approval

A payment provider must be evaluated before production integration.

Evaluation should consider:

- Supported payment methods.
- South African market availability and applicable jurisdictions.
- Store attribution capabilities.
- Transaction and refund APIs.
- Webhook authentication and delivery behaviour.
- Settlement and reconciliation reporting.
- Fee transparency.
- Credential and access controls.
- Availability and support arrangements.
- Data protection and contractual obligations.
- Integration and operational costs.

Provider selection requires platform approval.

Legal, tax, accounting and regulatory requirements must be reviewed by appropriately qualified advisers. Technical documentation must not be treated as legal approval.

## 5. Store attribution

Every payment must be attributable to the correct store and platform context.

- Store attribution must be established by trusted server-side records.
- A browser-supplied store identifier must not independently determine financial ownership.
- The platform must preserve the relationship between store, order, payment and provider transaction.
- Provider accounts shared by multiple stores must support reliable attribution.
- If the provider cannot reliably distinguish transactions by store, the integration must document the limitation and obtain approval before production use.
- Refunds, fees, chargebacks and settlements must retain the original store attribution.
- Attribution must remain available for historical reporting after a store is deactivated.

A payment must not be reassigned to another store merely by changing a request parameter or client-side value.

## 6. Payment initiation

Before initiating a payment, the backend must validate:

- The order exists.
- The order belongs to the relevant store.
- The order is eligible for payment.
- The amount and currency are valid.
- The order total is calculated from trusted server-side data.
- The requested payment method is supported.
- The customer and order references are valid.
- The operation has not already been completed or initiated in an incompatible state.

The backend must create a durable internal payment record before or as part of the controlled provider initiation workflow.

The record must preserve:

- Internal payment identifier.
- Order identifier.
- Store identifier.
- Expected amount and currency.
- Provider identifier.
- Provider transaction reference when available.
- Payment status.
- Creation and update timestamps.
- Relevant idempotency reference.

## 7. Amount and currency integrity

- Payment amounts must be calculated server-side.
- Client-submitted totals must never be authoritative.
- Use a consistent currency representation and precision.
- Avoid binary floating-point arithmetic for financial calculations.
- Validate provider amounts against the expected internal amount.
- Reject unexpected currencies or amount discrepancies for investigation.
- Preserve the original amount and currency in transaction history.
- Any approved adjustment must be recorded separately.

The platform must not silently alter an order total to match an unexpected provider response.

## 8. Idempotency and duplicate prevention

Payment operations must be designed to tolerate retries and repeated requests.

- Use stable idempotency keys for payment initiation where supported.
- Associate idempotency keys with the intended business operation.
- Repeated requests must not create duplicate charges.
- Store provider references and internal operation identifiers.
- Reconcile uncertain outcomes before retrying.
- Provider idempotency support must be documented, including its scope and retention period.
- Internal duplicate-prevention controls remain necessary even when a provider supports idempotency.

A network timeout does not prove that a payment failed.

Before retrying an uncertain operation, query the provider or reconcile its transaction reference where possible.

## 9. Payment status management

Provider-specific statuses must be mapped to a controlled internal payment lifecycle.

The internal model should distinguish:

- Created.
- Pending.
- Processing.
- Succeeded.
- Failed.
- Cancelled.
- Expired.
- Refund pending.
- Partially refunded.
- Refunded.
- Disputed or charged back.

Not every provider will support every status.

The integration must document provider-specific mappings and avoid treating an unknown status as successful.

A browser redirect or success page must not independently confirm payment.

The platform must rely on verified provider evidence and reconciliation controls before treating a payment as confirmed.

## 10. Provider API communication

- Provider API calls must originate from trusted backend services.
- Use authenticated and encrypted connections.
- Apply appropriate request timeouts.
- Validate provider responses before updating internal records.
- Handle provider rate limits and transient failures.
- Avoid exposing provider credentials, internal secrets or unnecessary provider response data to clients.
- Record relevant provider references for investigation.
- Do not log full payment credentials or sensitive authentication data.

Provider-specific request and response formats must remain isolated from the platform's internal domain model.

## 11. Webhook and callback processing

Provider webhooks must follow the platform webhook delivery and consumption standards.

At minimum:

- Verify the provider's authentication or signature mechanism.
- Validate the event structure and required fields.
- Establish store attribution from trusted server-side records.
- Persist the event durably before acknowledging receipt.
- Process events idempotently.
- Prevent unverified events from changing financial state.
- Preserve event identifiers and processing history.
- Handle duplicate and out-of-order delivery.
- Support safe replay and investigation.
- Monitor repeated delivery failures.

A webhook payload containing a store identifier must not be accepted as sufficient proof of store ownership.

## 12. Refunds and reversals

Refunds must be initiated through authorised backend operations.

Before a refund is submitted, validate:

- The original payment exists.
- The payment belongs to the relevant store.
- The payment is eligible for refund.
- The requested refund amount is valid.
- The cumulative refund amount does not exceed the refundable amount.
- The requesting actor has the required permission.
- Required approval controls have been satisfied.

The platform must preserve:

- Original payment record.
- Refund request identifier.
- Provider refund reference.
- Requested amount and currency.
- Refund status.
- Requesting and approving actors where applicable.
- Timestamps and reason.
- Provider response and reconciliation outcome.

A refund timeout must be treated as an uncertain outcome until verified.

Refunds must not overwrite or delete the original payment transaction.

## 13. Fees, settlements and reconciliation

The integration must support reconciliation between:

- Internal payment records.
- Provider transaction records.
- Refund and reversal records.
- Provider fee records.
- Settlement reports.
- Bank settlement information where available.

Reconciliation must identify:

- Missing transactions.
- Duplicate transactions.
- Amount discrepancies.
- Currency discrepancies.
- Unmatched refunds.
- Unexpected fees.
- Delayed or missing settlements.
- Incorrect store attribution.

Differences must be investigated and resolved through authorised financial procedures.

Do not silently modify historical transactions to force reconciliation.

## 14. Provider credentials and configuration

- Private credentials must remain server-side.
- Use approved secrets management facilities.
- Separate development, staging and production credentials.
- Never commit secrets to source control.
- Restrict credential access to authorised services and personnel.
- Rotate credentials according to provider capabilities and platform policy.
- Record credential rotation and emergency revocation procedures.
- Public configuration must not expose private provider settings.

Provider credentials must not be embedded in generated store integration packages or browser-delivered configuration.

## 15. Security and fraud controls

- Validate payment initiation against trusted order data.
- Enforce store and actor authorisation server-side.
- Prevent replay and duplicate processing.
- Validate provider signatures and transaction references.
- Apply rate limits to payment-related endpoints.
- Protect payment operations against CSRF where relevant to the authentication model.
- Avoid exposing sensitive payment information in logs or error responses.
- Monitor suspicious payment and refund patterns.
- Escalate suspected fraud or account compromise through the incident response process.

The platform must not store sensitive card authentication data unless the applicable provider model and formally approved compliance requirements explicitly permit it.

## 16. Failure handling and recovery

Payment failures must be classified according to their actual cause.

Examples include:

- Provider unavailable.
- Network timeout.
- Invalid provider credentials.
- Rejected payment.
- Invalid request.
- Rate limit exceeded.
- Webhook verification failure.
- Amount mismatch.
- Unknown provider status.
- Settlement discrepancy.

Recovery must preserve transaction integrity.

For uncertain outcomes:

1. Retain the internal payment record.
2. Preserve the provider request and reference information.
3. Query the provider where supported.
4. Reconcile provider events and transaction reports.
5. Determine the authoritative outcome.
6. Update the internal record through the controlled workflow.
7. Record the investigation and outcome.

Do not automatically create another charge because the original request timed out.

## 17. Monitoring and operational visibility

Monitor:

- Payment initiation success and failure rates.
- Provider response times.
- Pending payments beyond expected processing windows.
- Duplicate request attempts.
- Webhook delivery and processing failures.
- Refund failures and delays.
- Amount and currency discrepancies.
- Reconciliation exceptions.
- Provider availability.
- Credential and authentication failures.

Alerts must be actionable and routed to the responsible operational team.

Monitoring must not expose sensitive payment information.

## 18. Testing requirements

Payment integrations must be tested in an isolated non-production environment before release.

Testing should cover:

- Successful payment.
- Rejected payment.
- Cancelled payment.
- Expired payment.
- Delayed provider response.
- Network timeout.
- Duplicate initiation.
- Idempotent retry.
- Invalid provider response.
- Invalid webhook signature.
- Duplicate webhook.
- Out-of-order webhook.
- Unknown provider status.
- Partial refund.
- Full refund.
- Refund timeout.
- Amount mismatch.
- Currency mismatch.
- Cross-store access attempts.
- Store attribution failures.
- Provider reconciliation discrepancies.

Production credentials and real customer payment data must not be used in ordinary development testing.

## 19. Migration and provider replacement

Replacing a payment provider requires a controlled migration plan.

The plan must address:

- Existing pending payments.
- In-flight transactions.
- Outstanding refunds.
- Existing provider references.
- Webhook endpoints and subscriptions.
- Settlement and reconciliation obligations.
- Credential revocation.
- Historical reporting.
- Customer communication where required.
- Rollback and recovery procedures.

Do not disable an existing provider integration until outstanding operations have been accounted for and the replacement has passed acceptance testing.

## 20. Acceptance criteria

A payment provider integration is acceptable when:

- Provider approval and evaluation are documented.
- Payment initiation is server-side.
- Store attribution is verified.
- Amounts and currencies are validated.
- Duplicate payment prevention is implemented.
- Payment statuses are mapped and verified.
- Webhooks are authenticated and processed idempotently.
- Refunds follow approval and authorisation controls.
- Provider fees and settlements can be reconciled.
- Credentials are securely managed.
- Failure recovery preserves transaction integrity.
- Monitoring and operational ownership are established.
- Required security and integration tests pass.
- Migration and rollback procedures are documented where applicable.

## 21. Outstanding decisions

The following require explicit platform approval:

- Approved payment providers.
- Provider account ownership and shared-account model.
- Store-level merchant account requirements.
- Supported payment methods and currencies.
- Provider fee allocation and settlement model.
- Refund approval thresholds.
- Chargeback and dispute ownership.
- Provider-specific idempotency behaviour.
- Reconciliation frequency and exception ownership.
- Applicable legal, tax, accounting and compliance requirements.


## 22. Current payment operating model and future integrations

### 22.1 Current operating model

The platform does not currently process or integrate online payments through payment gateway APIs.

The current customer journey is WhatsApp-first:

- Customers communicate with the relevant store through WhatsApp.
- Product enquiries, order discussions and payment arrangements take place through WhatsApp.
- Payment is arranged and completed through the methods communicated by the store.
- Delivery arrangements and customer updates are coordinated through WhatsApp.
- Store personnel remain responsible for verifying payment and confirming order readiness.
- The platform may maintain relevant product, customer, order or operational records, but must not represent an externally arranged payment as a platform-verified gateway transaction.

The current implementation must not assume that Stripe, PayPal or another online payment provider is connected.

### 22.2 Payment status and verification

Where payment takes place outside the platform:

- Payment confirmation must be based on evidence verified by the responsible store.
- A customer statement or screenshot alone must not automatically mark an order as paid.
- Store personnel must follow their approved payment verification process.
- Payment status must distinguish awaiting payment, payment reported, payment verified and payment disputed where those states are supported.
- The platform must not fabricate provider transaction references or gateway confirmations.
- Financial records must preserve the actual payment method and verification source where recorded.

### 22.3 Future online payment capability

Online payment integration is a planned future capability, not a current production requirement.

Potential future providers include:

- Stripe.
- PayPal.
- Other payment service providers appropriate to the platform's operating markets.

The provider list is illustrative and is not an approval or commitment to integrate any particular provider.

Future integration must be considered when:

- Store operations have reached the required operational standard.
- Store onboarding and customer service processes are sufficiently mature.
- Financial controls and reconciliation procedures are established.
- The platform has approved the commercial and technical integration model.
- Applicable legal, tax, accounting and regulatory requirements have been reviewed.

### 22.4 No premature gateway implementation

Until a future integration is formally approved:

- Do not embed payment gateway SDKs or checkout components into storefronts.
- Do not introduce provider credentials or webhook endpoints without an approved integration project.
- Do not expose gateway-specific configuration through store integration packages.
- Do not make gateway integration a dependency of current order processing.
- Do not describe the platform as supporting integrated online payments.

When approved, gateway integration must follow this document and the platform's transaction integrity, finance, webhook and secrets management standards.
