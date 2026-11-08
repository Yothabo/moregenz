# Webhook Delivery and Consumption Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-E54C127C91 |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

---

## 1. Purpose

This document defines standards for receiving, validating, processing, retrying, and monitoring webhook events across the multi-store retail platform.

It establishes consistent controls for reliable communication between the platform and external services, including payment providers, shipping providers, notification services, and approved business integrations.

## 2. Scope

These standards apply to:

- Inbound provider webhooks.
- Outbound platform webhooks.
- Payment and refund notifications.
- Order status notifications.
- Shipping and fulfilment updates.
- Approved inventory-related integrations.
- Store integration events.
- Webhook event storage and processing.
- Retry, replay, and reconciliation mechanisms.

This document does not replace provider-specific integration requirements, transaction integrity standards, or secrets management standards.

## 3. Core Principles

### 3.1 Authenticate Before Trusting

Every inbound webhook must be authenticated using the provider's approved verification mechanism.

A request must not be trusted because it contains a familiar event name, store identifier, transaction identifier, or provider reference.

### 3.2 Durable Receipt

A webhook event must be durably recorded before the platform acknowledges successful receipt.

The platform must not acknowledge an event and then rely exclusively on in-memory processing.

### 3.3 Idempotent Processing

Webhook delivery may be repeated.

Processing must not cause duplicate financial postings, orders, refunds, inventory movements, or other business effects.

### 3.4 Independent Attribution

The platform must determine store and transaction attribution using verified server-side records.

A store identifier supplied only in the webhook payload is insufficient.

### 3.5 Observable Processing

Every webhook must have a traceable processing lifecycle, including receipt, validation, processing, failure, retry, and final outcome.

## 4. Webhook Architecture

Webhook handling should follow a controlled processing pipeline:

1. Receive the HTTP request.
2. Identify the configured provider endpoint.
3. Validate the provider signature or authentication mechanism.
4. Validate request structure and required metadata.
5. Identify the provider event and enforce deduplication.
6. Persist the event durably.
7. Acknowledge receipt according to provider requirements.
8. Process the event through the appropriate worker or application service.
9. Record the processing outcome.
10. Retry or escalate failures according to policy.

The HTTP receipt path should remain short and predictable.

Business processing that may be slow, retryable, or dependent on other services should generally run asynchronously.

## 5. Inbound Webhook Authentication

Every inbound webhook endpoint must use the authentication mechanism supported by its provider.

Approved mechanisms may include:

- HMAC signatures.
- Asymmetric digital signatures.
- Provider-issued signing secrets.
- Mutual TLS where supported.
- Provider-specific verification APIs.

### 5.1 Signature Validation

Signature validation must use the exact request representation required by the provider.

Where the provider requires raw request bytes, the application must preserve the raw body for verification.

The platform must not verify a signature against a transformed or re-serialised body when the provider requires the original representation.

### 5.2 Timestamp Validation

Where signed requests include timestamps, validate them against an approved tolerance window.

Reject requests that fall outside the permitted window unless the provider's protocol explicitly requires another approach.

Timestamp validation supplements event deduplication. It does not replace it.

### 5.3 Constant-Time Comparison

Where application code compares secret-derived signatures, use an appropriate constant-time comparison mechanism.

Avoid ordinary string comparison for sensitive signature values where timing differences could reveal information.

### 5.4 Verification Failure

Invalid signatures, malformed authentication headers, and unsupported verification methods must be rejected.

The platform must not continue processing an event after signature verification fails.

Failure responses must not expose signing secrets or internal verification details.

## 6. Endpoint Design

Webhook endpoints must be purpose-specific and associated with known providers or approved integration configurations.

The platform should avoid generic endpoints that accept arbitrary event types without an explicit routing and validation policy.

Each endpoint must define:

- Provider identity.
- Expected authentication mechanism.
- Supported event types.
- Request size limits.
- Required headers.
- Payload validation rules.
- Acknowledgement behaviour.
- Retry expectations.
- Monitoring requirements.

Provider credentials must be managed through the secrets management standards.

## 7. Durable Event Receipt

After successful authentication and structural validation, persist the event before acknowledging successful receipt.

The durable record should contain:

- Internal event identifier.
- Provider identity.
- Provider event identifier.
- Event type.
- Receipt timestamp.
- Relevant provider timestamp.
- Verification outcome.
- Processing status.
- Attempt count.
- Safe correlation references.
- Payload or approved payload representation.

The system must define appropriate storage and retention controls for raw webhook payloads.

Sensitive fields must be minimised, protected, or excluded from stored payloads where possible.

### 7.1 Acknowledgement

The acknowledgement response must follow the provider's documented requirements.

A successful acknowledgement must mean that the platform has durably accepted responsibility for the event.

It must not imply that every downstream business operation has already completed.

### 7.2 Persistence Failure

If the event cannot be durably stored, do not return a success acknowledgement unless the provider protocol defines a safe alternative.

The platform should return a retryable failure response where supported.

## 8. Event Identity and Deduplication

Every provider integration must define how unique events are identified.

Use the provider's stable event identifier where available.

If the provider does not supply a reliable event identifier, define a provider-specific deduplication strategy using verified event attributes.

Deduplication must be enforced through durable storage and appropriate database constraints.

### 8.1 Duplicate Receipt

A repeated event must not create a second business effect.

The platform may acknowledge an already accepted duplicate according to provider requirements, while retaining sufficient information to monitor repeated delivery.

### 8.2 Distinct Events for One Transaction

Different events may legitimately refer to the same payment, order, refund, or shipment.

The platform must distinguish event-level deduplication from business-level idempotency.

A unique event identifier alone does not prevent two different events from attempting the same business operation.

## 9. Store and Transaction Attribution

Webhook attribution must use verified server-side relationships.

The platform should resolve the relevant store and transaction through trusted records such as:

- Provider account mapping.
- Verified merchant account configuration.
- Internal payment reference.
- Internal order reference.
- Approved integration configuration.
- Previously recorded transaction metadata.

A payload-supplied store identifier must not independently establish ownership or access scope.

### 9.1 Shared Provider Accounts

Where multiple stores share a provider account, the integration must define a reliable attribution mechanism.

The platform must be able to identify the correct store for:

- Payments.
- Refunds.
- Fees.
- Settlements.
- Disputes.
- Chargebacks.
- Reversals.

If reliable attribution cannot be established, the event must be quarantined for investigation rather than assigned to a guessed store.

### 9.2 Attribution Conflicts

If provider account information, transaction references, and internal records conflict, processing must stop.

The conflict must be recorded and escalated through the appropriate operational process.

## 10. Payload Validation

Webhook payloads must be treated as untrusted input even after signature verification.

Validation must include:

- Supported event type.
- Required fields.
- Data types.
- Identifier formats.
- Expected provider account.
- Transaction references.
- Currency and amount formats where relevant.
- Timestamp validity.
- Payload size.
- Supported event version.

Unexpected fields must not be interpreted as trusted business instructions.

The application must not allow a webhook payload to directly modify arbitrary database fields.

## 11. Event Processing

Each supported event type must have a documented processing handler.

Handlers should:

- Validate the event against current business state.
- Resolve the relevant internal records.
- Apply the appropriate business rules.
- Use transactional database operations where necessary.
- Record the outcome.
- Preserve an audit trail.
- Remain safe under repeated execution.

Processing must not bypass existing authorisation, financial, inventory, or transaction integrity controls.

### 11.1 State Transitions

Webhook events must not cause invalid state transitions.

For example, an event indicating payment success must not automatically overwrite a later verified reversal or refund state.

The application must evaluate event ordering, current state, provider references, and business rules before applying changes.

### 11.2 Out-of-Order Events

Providers may deliver events out of order.

The platform must define how each event type is handled when it arrives before or after another related event.

Where necessary, retrieve the current transaction state from the provider through an authenticated API rather than relying solely on event arrival order.

### 11.3 Unknown Events

Unknown or unsupported event types must not trigger generic business processing.

Record the event safely and apply the provider-specific acknowledgement or rejection policy.

Unsupported events should be observable so that provider changes can be investigated.

## 12. Financial Webhook Handling

Payment-related events require additional controls.

The platform must distinguish between:

- Payment initiated.
- Payment pending.
- Payment authorised.
- Payment captured or completed.
- Payment failed.
- Payment expired.
- Payment reversed.
- Refund requested.
- Refund completed.
- Chargeback or dispute opened.
- Settlement recorded.

The exact state model must reflect the provider's documented payment lifecycle.

### 12.1 Payment Confirmation

A browser redirect or client-side success message is not proof of payment.

The platform must rely on authenticated provider confirmation and, where necessary, a provider-side transaction query.

### 12.2 Uncertain Outcomes

A timeout or missing webhook does not prove that a payment failed.

The platform must query the provider using the appropriate idempotency key or provider transaction reference before initiating a potentially duplicate operation.

### 12.3 Financial Posting

Webhook receipt must not directly create uncontrolled financial adjustments.

Financial records must be posted through the approved transaction and financial control processes.

Original transaction records must remain preserved.

### 12.4 Reconciliation

Webhook processing must be supported by periodic provider reconciliation.

Reconciliation must identify:

- Missing events.
- Duplicate events.
- Unmatched transactions.
- Incorrect attribution.
- Amount discrepancies.
- Currency discrepancies.
- Settlement discrepancies.
- Failed or incomplete refunds.

## 13. Inventory and Order Events

Webhook-driven order or inventory changes must use the authoritative commerce and inventory services.

The handler must not directly bypass stock reservation, stock movement, or order state rules.

Repeated delivery must not:

- Reserve stock twice.
- Release stock twice.
- Create duplicate orders.
- Fulfil an order more than once.
- Apply duplicate inventory adjustments.

Where an event conflicts with current inventory or order state, apply the documented business process and escalate unresolved conflicts.

## 14. Retry Strategy

Transient failures should be retried using controlled backoff.

The retry policy must define:

- Maximum attempts.
- Initial delay.
- Backoff strategy.
- Maximum delay.
- Retryable error classes.
- Non-retryable error classes.
- Final failure handling.

Retries must not create duplicate business effects.

### 14.1 Retryable Failures

Examples may include:

- Temporary database unavailability.
- Temporary provider API failure.
- Network interruption.
- Worker interruption.
- Temporary dependency unavailability.

### 14.2 Non-Retryable Failures

Examples may include:

- Invalid signature.
- Unsupported event type.
- Permanently malformed payload.
- Invalid provider account mapping.
- Confirmed attribution conflict.

Non-retryable failures must be recorded and routed for appropriate investigation.

### 14.3 Retry Exhaustion

Events that exceed the retry policy must move to a controlled failed or dead-letter state.

They must remain available for authorised investigation and recovery.

## 15. Replay and Manual Recovery

The platform must provide a controlled way to replay eligible events.

Replay must require appropriate permissions and record:

- Original event reference.
- Replay requestor.
- Replay timestamp.
- Reason.
- Processing result.

Replay must preserve idempotency.

A replay must not silently bypass the original validation, attribution, or business rules.

Events rejected because of invalid signatures must not be made executable merely by changing their status manually.

## 16. Outbound Webhooks

If the platform sends webhooks to participating stores or approved external systems, outbound delivery must follow equivalent reliability and security standards.

Each outbound subscription must define:

- Receiving endpoint.
- Store or integration scope.
- Supported event types.
- Authentication method.
- Signing configuration.
- Timeout.
- Retry policy.
- Payload version.
- Delivery status.
- Subscription lifecycle.

### 16.1 Payload Minimisation

Outbound payloads must include only the information required by the receiving integration.

Customer data, financial information, and internal administrative metadata must not be included unnecessarily.

### 16.2 Signing

Outbound webhook payloads should be signed using a dedicated secret or approved cryptographic mechanism.

Each recipient must have independently managed credentials where practical.

### 16.3 Delivery Attempts

Delivery attempts must be recorded with safe metadata.

The platform must avoid logging secret signing headers or unnecessary personal data.

### 16.4 Endpoint Validation

Outbound destination URLs must be validated to prevent server-side request forgery.

The platform must restrict destinations to approved protocols and enforce controls against access to internal network resources and cloud metadata endpoints.

Redirects must be handled cautiously and must not bypass destination validation.

### 16.5 Subscription Revocation

Store or integration subscriptions must be revocable.

A deactivated or suspended store must not continue receiving events unless an explicitly approved operational requirement permits it.

## 17. Webhook Versioning

Webhook payloads must include a documented version or follow a clearly defined versioning policy.

Changes must consider:

- Field additions.
- Field removals.
- Field type changes.
- Event semantics.
- Ordering guarantees.
- Retry behaviour.
- Signature format.

Breaking changes must follow the platform's API and integration lifecycle standards.

## 18. Data Protection and Retention

Webhook payloads may contain personal, financial, or commercially sensitive information.

The platform must:

- Minimise retained payload data.
- Restrict access to stored events.
- Encrypt data through approved storage controls.
- Define retention periods.
- Apply secure disposal procedures.
- Avoid storing unnecessary authentication headers.
- Redact sensitive information from logs.
- Preserve records required for legal, financial, or dispute obligations.

Raw payload retention must be justified by operational and compliance requirements.

## 19. Observability

Webhook monitoring must cover:

- Receipt volume.
- Signature failures.
- Validation failures.
- Duplicate deliveries.
- Processing latency.
- Processing failures.
- Retry volume.
- Dead-letter events.
- Provider response failures.
- Attribution conflicts.
- Reconciliation discrepancies.

Each event must have a correlation identifier that connects receipt, processing, business operations, and relevant audit records.

Monitoring must not expose secret values or full sensitive payloads.

## 20. Security Controls

Webhook implementations must enforce:

- Provider authentication.
- Signature validation.
- Timestamp validation where supported.
- Payload size limits.
- Safe parsing.
- Schema validation.
- Event deduplication.
- Store attribution checks.
- Rate limiting.
- Durable receipt.
- Controlled replay.
- Secret rotation.
- Access-controlled event inspection.

Webhook endpoints must not expose administrative operations merely because a request originates from a known provider.

## 21. Testing Requirements

Webhook implementations must include:

### Authentication Testing

- Valid signatures.
- Invalid signatures.
- Missing signatures.
- Altered payloads.
- Expired timestamps.
- Unsupported provider credentials.

### Delivery Testing

- Duplicate delivery.
- Delayed delivery.
- Out-of-order events.
- Provider retries.
- Processing interruption.
- Database failure during receipt.
- Worker failure after durable receipt.

### Attribution Testing

- Valid store attribution.
- Missing store attribution.
- Conflicting provider account mapping.
- Forged store identifiers.
- Shared provider account scenarios.
- Cross-store transaction references.

### Business Integrity Testing

- Duplicate payment events.
- Duplicate refund events.
- Payment reversal after success.
- Delayed payment confirmation.
- Duplicate stock reservation.
- Invalid order state transitions.
- Uncertain provider outcomes.

### Recovery Testing

- Retry exhaustion.
- Dead-letter handling.
- Authorised replay.
- Replay idempotency.
- Provider reconciliation.
- Outbound delivery recovery.

## 22. Operational Procedures

The operations team must have documented procedures for:

- Provider webhook configuration.
- Secret creation and rotation.
- Endpoint deployment.
- Signature failure investigation.
- Processing backlog investigation.
- Dead-letter review.
- Manual replay approval.
- Financial event reconciliation.
- Provider outage response.
- Subscription suspension and recovery.

Manual intervention must be authorised and audited.

## 23. Acceptance Criteria

A webhook implementation is acceptable when:

1. Every inbound provider is authenticated.
2. Signatures are validated correctly.
3. Events are durably recorded before successful acknowledgement.
4. Duplicate delivery cannot create duplicate business effects.
5. Store attribution uses verified server-side records.
6. Shared provider accounts have reliable attribution.
7. Payloads are validated as untrusted input.
8. Out-of-order events are handled safely.
9. Financial events preserve transaction integrity.
10. Retry and dead-letter policies are implemented.
11. Replay is authorised and auditable.
12. Outbound endpoints are validated against SSRF risks.
13. Sensitive payload data is protected.
14. Webhook processing is observable.
15. Reconciliation and recovery procedures exist.
16. Required security and business integrity tests pass.

## 24. Open Decisions

The following decisions require explicit approval:

- Supported webhook providers and event types.
- Provider-specific signature verification methods.
- Event retention periods.
- Retry limits and backoff values.
- Dead-letter review ownership.
- Manual replay approval requirements.
- Outbound webhook availability for participating stores.
- Outbound signing and key rotation policy.
- Event ordering guarantees.
- Reconciliation frequency.
- Webhook processing service architecture.
- Operational alert thresholds.

Until approved, implementations must follow provider-specific security requirements and existing transaction integrity controls.

---

## 25. Review and Approval

This document remains a draft until reviewed and approved by the Platform Owner.

Approval must confirm alignment with the integration architecture, transaction integrity standards, financial controls, secrets management standards, API lifecycle standards, and incident response procedures.
