# API Rate Limiting and Abuse Prevention Standards

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines standards for protecting platform APIs and public-facing services against excessive traffic, automated abuse, resource exhaustion, credential attacks, and unintended service disruption.

The objective is to maintain service availability and fair resource usage across participating stores without introducing arbitrary restrictions that interfere with legitimate business activity.

## 2. Scope

This standard applies to:

- Public storefront APIs.
- Authenticated customer APIs.
- Store administration APIs.
- Platform administration APIs.
- Authentication and account recovery endpoints.
- Search and catalogue endpoints.
- Order and checkout endpoints.
- Payment and refund endpoints.
- File upload and download endpoints.
- Webhook endpoints.
- Integration APIs.
- Background processing interfaces.
- Publicly accessible application services.

It applies to current Netlify Functions and the future NestJS backend.

## 3. Governance Principles

### 3.1 Availability

Rate limiting must protect critical platform services from excessive or abusive traffic.

### 3.2 Fairness

Resource limits must account for legitimate differences between public users, authenticated users, stores, integrations, and trusted services.

### 3.3 Server-side enforcement

Limits must be enforced by trusted backend infrastructure.

Frontend restrictions alone are insufficient.

### 3.4 Store isolation

One store must not be able to consume unlimited shared resources at the expense of other stores.

### 3.5 Proportional response

Protective controls must respond proportionately to the risk and observed behaviour.

### 3.6 Transparency

Where practical, API responses must communicate when a request has been limited and when a retry may be appropriate.

### 3.7 No implicit privilege

A store must not receive elevated limits merely because it is the first participating store or has a particular commercial relationship.

## 4. Threat Model

The platform must consider the following abuse patterns:

- Excessive request volume.
- Credential stuffing.
- Brute-force authentication attempts.
- Automated account creation.
- Password reset abuse.
- Search scraping.
- Catalogue enumeration.
- Checkout automation.
- Repeated payment initiation.
- Refund endpoint abuse.
- File upload abuse.
- Oversized request payloads.
- Expensive query abuse.
- Webhook flooding.
- Malformed request floods.
- Distributed denial-of-service attempts.
- Repeated requests designed to exhaust database connections or background workers.

Rate limiting is one control within a broader security and availability strategy. It does not replace authentication, authorisation, input validation, or infrastructure-level protection.

## 5. Rate-Limit Dimensions

Rate limits should use one or more appropriate dimensions.

### 5.1 Network source

Limits may be applied using trusted client IP information or network ranges.

The application must not blindly trust arbitrary forwarded IP headers.

The trusted proxy chain must be explicitly configured.

### 5.2 Authenticated identity

Authenticated requests may be limited by user or service identity.

### 5.3 Store scope

Store-scoped APIs may apply limits by verified store identity.

A client-supplied store ID must not determine the authoritative rate-limit scope.

### 5.4 API route

Different endpoints may require different limits according to processing cost and business risk.

### 5.5 Resource

Limits may apply to expensive resources such as:

- Search operations.
- Report generation.
- File processing.
- Bulk updates.
- Exports.
- Inventory synchronisation.

### 5.6 Integration identity

Trusted integrations should have identifiable credentials and separately governed usage limits.

## 6. Limit Categories

The platform should distinguish between:

- Request-rate limits.
- Concurrent-request limits.
- Payload-size limits.
- Upload-size limits.
- Query-complexity limits.
- Export-volume limits.
- Background-job submission limits.
- Authentication attempt limits.
- Provider-specific usage limits.

A request-rate limit alone may not protect against a small number of extremely expensive requests.

## 7. Endpoint Risk Classification

Endpoints must be classified according to their sensitivity and resource cost.

### 7.1 Public read endpoints

Examples:

- Public product listings.
- Product details.
- Public store information.
- Public category data.

These endpoints may support anonymous access but must be protected against scraping and excessive query volume.

### 7.2 Authentication endpoints

Examples:

- Login.
- Registration where supported.
- Password recovery.
- Account verification.
- Token issuance.

These endpoints require stricter abuse controls because they can be targeted for credential attacks and automated abuse.

### 7.3 Transaction endpoints

Examples:

- Order submission.
- Checkout.
- Payment initiation.
- Refund requests.
- Inventory adjustments.

These endpoints require both rate limiting and transaction-level duplicate prevention.

A rate limit must not be treated as a substitute for idempotency.

### 7.4 Administrative endpoints

Administrative operations must require authentication and authorisation in addition to appropriate rate limits.

Limits must not be so restrictive that ordinary authorised store operations become unreliable.

### 7.5 Expensive operations

Reports, exports, bulk processing, and large searches may require concurrency limits, quotas, and asynchronous processing.

## 8. Limit Configuration

Every implemented limit must have a documented configuration.

The configuration should identify:

- Endpoint or resource.
- Limit dimension.
- Maximum permitted activity.
- Measurement window.
- Burst allowance, if supported.
- Scope.
- Enforcement location.
- Response behaviour.
- Exemption rules.
- Owner.
- Review date.

Exact numerical limits must be established using measured workload, provider constraints, capacity testing, and observed legitimate usage.

They must not be invented without supporting evidence.

## 9. Response Behaviour

When a request exceeds an applicable limit, the API should return HTTP `429 Too Many Requests`.

Where appropriate, the response should include:

- A stable error code.
- A safe explanation.
- Retry guidance.
- A `Retry-After` header where a meaningful retry time is available.
- A correlation identifier.

The response must not expose internal rate-limit implementation details that would materially assist abuse.

Clients should implement bounded retries with backoff and jitter where appropriate.

Clients must not continuously retry requests that have been explicitly rejected.

## 10. Authentication and Credential Abuse

Authentication controls should include:

- Rate limits on repeated failed login attempts.
- Account recovery throttling.
- Verification request throttling.
- Protection against automated credential guessing.
- Monitoring of unusual authentication patterns.
- Appropriate session and token controls.

Controls must avoid unnecessarily revealing whether an account exists.

Account-based restrictions must be designed carefully to avoid allowing attackers to lock out legitimate users through deliberate failed attempts.

## 11. Store-Level Resource Fairness

The platform serves multiple stores using shared infrastructure.

Resource controls should prevent one store from consuming disproportionate shared capacity.

Where appropriate, limits may be applied to:

- API request volume.
- Concurrent requests.
- Search workloads.
- Report generation.
- File processing.
- Background jobs.
- Integration traffic.

Store-specific limits must be based on approved policy and measured capacity.

A store must not be able to bypass limits by creating multiple client sessions or changing untrusted request identifiers.

## 12. Trusted Integrations

Integrations must use identifiable credentials and documented limits.

The platform should:

- Assign limits to verified integration identities.
- Separate integration traffic from anonymous traffic.
- Apply credential rotation and revocation controls.
- Monitor abnormal request patterns.
- Prevent one integration from consuming unrestricted shared resources.
- Document provider-specific quotas.

Integration exemptions must be explicitly approved and scoped.

Trusted status must not mean unlimited access.

## 13. Webhook Protection

Webhook endpoints must be protected through:

- Provider signature verification.
- Trusted provider configuration.
- Request-size limits.
- Event deduplication.
- Durable event persistence.
- Processing concurrency controls.
- Retry-aware handling.
- Monitoring of repeated failures.

A valid webhook may still be delivered more than once.

Rate limiting must not cause legitimate provider retries to create duplicate business effects.

Webhook receipt and processing must follow the transaction integrity standards.

## 14. Payload and Query Protection

The platform must limit request complexity as well as request frequency.

Controls should include:

- Maximum request body size.
- Maximum upload size.
- Allowed content types.
- Pagination limits.
- Search query length limits.
- Query timeout limits.
- Maximum bulk-operation size.
- Export row or file-size limits.
- Appropriate database statement timeouts.

Input validation must occur before expensive processing.

## 15. Distributed Rate-Limit Enforcement

Where requests are handled by multiple server instances or function executions, rate-limit state must be shared or coordinated where required.

In-memory counters alone are insufficient for globally consistent enforcement across independent instances.

The implementation must consider:

- Shared storage.
- Atomic counter updates.
- Expiry.
- Concurrency.
- Clock consistency.
- Failure behaviour.
- Store and identity scope.

The selected mechanism must be compatible with the deployment architecture.

## 16. Rate-Limit Failure Behaviour

The platform must define how rate limiting behaves when its backing service is unavailable.

The decision must consider endpoint risk.

For example:

- High-risk transaction endpoints may require conservative protective behaviour.
- Low-risk public read endpoints may use a controlled fallback where appropriate.
- Authentication and privileged operations require explicit security review.

The platform must not silently disable all abuse protection when a rate-limit dependency fails.

Failure behaviour must be tested and documented.

## 17. Exemptions and Overrides

Exemptions must be limited and auditable.

An exemption must identify:

- Requesting owner.
- Approving authority.
- Identity or integration affected.
- Endpoint or resource scope.
- Business justification.
- Start date.
- Expiry or review date.
- Monitoring requirements.

Permanent unrestricted exemptions must be avoided.

Emergency changes must follow the approved incident and change-management procedures.

## 18. Monitoring and Alerting

The platform should monitor:

- Requests rejected by rate limits.
- Repeated authentication failures.
- High request volume by identity or store.
- Abnormal endpoint usage.
- Expensive query activity.
- Upload and export abuse.
- Integration traffic spikes.
- Rate-limit service failures.
- Unusual geographic or network patterns where lawfully and appropriately assessed.
- Repeated attempts to bypass restrictions.

Alerts must be actionable and proportionate.

A rate-limit event alone does not establish malicious intent.

## 19. Privacy and Data Protection

Rate-limit and abuse-prevention records must follow data minimisation principles.

The platform should avoid retaining unnecessary:

- Full request payloads.
- Authentication credentials.
- Session tokens.
- Payment data.
- Customer information.

Network identifiers and account-related signals must be handled according to applicable privacy and retention requirements.

## 20. Testing Requirements

Rate-limiting and abuse-prevention controls must be tested for:

- Requests below configured limits.
- Requests exceeding configured limits.
- Correct retry guidance.
- Concurrent requests.
- Distributed execution.
- Store isolation.
- Identity isolation.
- Spoofed forwarding headers.
- Credential abuse.
- Expensive queries.
- Oversized payloads.
- Webhook retries.
- Integration traffic.
- Rate-limit dependency failure.
- Legitimate traffic during an attack.
- Exemption expiry.
- Recovery after service restoration.

Tests must verify that protective controls do not break transaction integrity or legitimate store operations.

## 21. Risks and Controls

| Risk | Required control |
|---|---|
| API resource exhaustion | Rate and concurrency limits |
| Credential attacks | Authentication throttling and monitoring |
| Store resource starvation | Verified store-level quotas |
| Distributed limit bypass | Shared enforcement state |
| Expensive query abuse | Complexity and timeout controls |
| Oversized uploads | Payload and file-size limits |
| Duplicate transactions | Idempotency and transaction controls |
| Webhook disruption | Durable receipt and deduplication |
| False client IP attribution | Trusted proxy configuration |
| Rate-limit service failure | Documented fallback behaviour |
| Excessive restrictions | Measured limits and usage review |

## 22. Review and Maintenance

This document must be reviewed:

- When API routes are introduced or materially changed.
- When traffic patterns change.
- When new stores or integrations are onboarded.
- When infrastructure or deployment architecture changes.
- After an abuse or availability incident.
- When provider quotas change.
- During scheduled capacity and security reviews.

The Platform Owner is responsible for coordinating the review.

## 23. Open Decisions

The following matters require explicit decisions:

1. Which rate-limiting technology will be used.
2. Which endpoints require independent limits.
3. What initial limits are supported by measured capacity.
4. Which store-level quotas will be configurable.
5. How trusted integration identities will be represented.
6. How anonymous traffic will be grouped.
7. Which operations require concurrency limits.
8. What happens when the rate-limit service is unavailable.
9. Which events trigger automated protective action.
10. How exemptions will be approved and reviewed.

These decisions must be recorded through the platform decision-management process.

## 24. Related Documents

- `docs/architecture/API_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`
- `docs/architecture/OPERATIONS_ARCHITECTURE.md`
- `docs/implementation/API_DEVELOPMENT_GUIDE.md`
- `docs/implementation/SECURITY_IMPLEMENTATION_GUIDE.md`
- `docs/implementation/API_SECURITY_AND_AUTHORIZATION_TESTING_PROCEDURE.md`
- `docs/implementation/TRANSACTION_INTEGRITY_AND_IDEMPOTENCY_STANDARDS.md`
- `docs/implementation/ERROR_HANDLING_AND_RESPONSE_STANDARDS.md`
- `docs/implementation/CAPACITY_PLANNING_AND_SCALABILITY_STANDARDS.md`
- `docs/implementation/OBSERVABILITY_AND_LOGGING_STANDARDS.md`
- `docs/implementation/PLATFORM_AUDIT_TRAIL_AND_ADMINISTRATIVE_ACTIVITY_STANDARDS.md`
- `docs/operations/INCIDENT_RESPONSE_PLAYBOOK.md`
- `docs/operations/PLATFORM_MONITORING_ALERTING_AND_ESCALATION_STANDARDS.md`
