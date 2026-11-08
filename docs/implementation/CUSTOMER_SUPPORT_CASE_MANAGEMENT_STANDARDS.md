# Customer Support Case Management Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-7C45A012DF |
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

This document defines standards for recording, assigning, investigating, resolving and closing customer support cases across the platform.

It establishes a consistent support process while preserving the separation between platform responsibilities and individual store responsibilities.

## 2. Scope

These standards apply to:

- Customer enquiries and complaints.
- Store-related support requests.
- Order, delivery and fulfilment enquiries.
- Payment and refund investigations.
- Product and catalogue enquiries.
- Account and access issues.
- Technical incidents reported by customers or store personnel.
- Requests requiring escalation to platform operations or specialist teams.

This document governs support case management. It does not replace the incident response playbook, store support and escalation policy, financial controls or operational runbooks.

## 3. Support ownership

### 3.1 Platform support

Platform support is responsible for issues involving:

- Shared platform functionality.
- Platform authentication and access.
- Shared infrastructure and integrations.
- Platform-wide service interruptions.
- Store onboarding and platform configuration.
- Issues that cannot be resolved within an individual store's authority.

### 3.2 Store support

Each store is responsible for its own customer-facing operational matters, including:

- Product enquiries.
- Store-specific order enquiries.
- Store fulfilment and delivery coordination.
- Store-specific customer service.
- Store-approved commercial arrangements.
- Store-level complaints and service recovery.

### 3.3 Ownership boundaries

- Every case must have a clearly identified responsible team or owner.
- A store must not access another store's support cases unless explicitly authorised for a legitimate platform responsibility.
- Platform support may investigate cross-store or shared-service issues within its authorised scope.
- Transferring a case does not remove the original case history.
- A case must not be closed merely because it has been transferred.

## 4. Case identification and records

Every support case must have a unique identifier.

Where applicable, a case should record:

- Case identifier.
- Case category and subcategory.
- Date and time received.
- Customer or reporting party reference.
- Relevant store identifier.
- Related order, payment or transaction reference.
- Case description.
- Priority and severity.
- Assigned team and responsible owner.
- Current status.
- Investigation notes.
- Communication history.
- Resolution details.
- Closure date and responsible person.

Only information necessary to investigate and resolve the case should be collected.

Sensitive authentication credentials, payment card security data and unnecessary personal information must not be stored in case notes.

## 5. Case lifecycle

The standard lifecycle is:

1. Received.
2. Categorised.
3. Assigned.
4. Under investigation.
5. Awaiting information or action.
6. Resolved.
7. Closed.

Cases may be reopened when the reported issue remains unresolved or the same issue recurs.

Every status change must be recorded with its timestamp and responsible actor.

### 5.1 Received

- Acknowledge receipt through the relevant support channel.
- Generate or identify the case record.
- Capture the information required for initial assessment.
- Avoid requesting information already available through authorised platform records.

### 5.2 Categorised

Assign the case to an appropriate category and store scope.

Where the correct category is uncertain, use a general category and refine it during investigation.

### 5.3 Assigned

- Assign the case to an accountable team.
- Identify an individual owner where the workflow supports individual assignment.
- Ensure the assigned party has the required permissions.
- Preserve ownership history when reassignment occurs.

### 5.4 Under investigation

- Record relevant findings and actions.
- Use authorised systems and records.
- Separate verified facts from assumptions.
- Record dependencies and outstanding actions.
- Escalate issues that exceed the assigned team's authority.

### 5.5 Awaiting information or action

Use this status when progress depends on a customer, store, payment provider or another authorised party.

Record:

- What information or action is required.
- Who is responsible for providing it.
- When the request was made.
- The next review point.

A case must not remain indefinitely in this status without review.

### 5.6 Resolved

A case may be marked resolved when the issue has been addressed or an acceptable resolution has been communicated.

Record the resolution and any relevant supporting references.

### 5.7 Closed

Close a case after confirming that the required resolution and communication steps are complete.

Closure must not delete the case history or associated evidence.

## 6. Priority and severity

Priority must reflect customer impact, business impact, urgency and the availability of workarounds.

The following levels provide a baseline:

| Priority | Description | Examples |
|---|---|---|
| Critical | Major platform or business operation disruption | Platform-wide checkout failure, confirmed widespread security incident |
| High | Significant impact affecting a store or important business process | Store checkout unavailable, widespread order processing failure |
| Normal | Limited impact with a reasonable workaround | Individual order issue, product information discrepancy |
| Low | General enquiry or non-urgent request | Product information request, general assistance |

Priority must be reviewed when the impact changes.

A support case that reveals a security incident, financial integrity issue or major service interruption must be escalated through the relevant incident or specialist procedure.

## 7. Response and resolution targets

- Support teams should define measurable response and resolution targets for their responsibilities.
- Targets must distinguish initial acknowledgement from actual resolution.
- Targets should account for operating hours, support coverage and dependencies.
- Critical and high-priority cases require clearly defined escalation paths.
- Waiting on external information must be recorded without silently resetting the case history.
- Missed targets must be visible for operational review.

Specific service-level agreements remain subject to approval and must not be invented by individual support personnel.

## 8. Customer communication

- Communication must be clear, factual and respectful.
- Avoid promising outcomes or deadlines that have not been confirmed.
- Do not expose internal investigation details, security controls or another store's information.
- Explain delays when they materially affect the customer.
- Provide relevant case references where supported.
- Record material customer communications in the case history.
- Use approved communication channels and templates where available.

Store-specific communications must use the correct store identity and authorised sender configuration.

## 9. Evidence and investigation

Evidence may include:

- Relevant order references.
- Transaction identifiers.
- System-generated event records.
- Relevant audit entries.
- Error messages and timestamps.
- Customer-provided screenshots or documents.
- Provider references and delivery records.

Evidence handling must follow the platform's data protection, retention and access standards.

Support personnel must not alter financial records, delete audit evidence or bypass approval controls to resolve a case.

## 10. Privacy and access control

- Case access must follow role-based and store-scoped authorisation.
- Staff must only access information necessary for their assigned responsibilities.
- Sensitive customer information must be minimised.
- Case exports must be restricted and auditable.
- Support access to production systems must be purpose-limited.
- Temporary elevated access must follow the platform access review procedure.
- Customer identity verification must be appropriate to the sensitivity of the requested action.
- Case records must not become an alternative storage location for secrets or credentials.

## 11. Financial and payment-related cases

Cases involving payments, refunds, commissions, settlements or financial adjustments require additional controls.

- Record the relevant transaction and provider references.
- Distinguish a reported payment issue from a verified payment failure.
- Treat uncertain payment outcomes as unresolved until reconciled.
- Do not initiate duplicate charges or refunds as a troubleshooting shortcut.
- Do not modify original financial records to make a case appear resolved.
- Financial adjustments must follow the approved financial controls and separation-of-duties requirements.
- Investigation and financial approval must remain distinct responsibilities where required.

## 12. Escalation

Escalate a case when:

- The assigned team lacks the required authority.
- The issue affects multiple stores.
- The issue indicates a platform-wide defect.
- A security or privacy incident is suspected.
- Financial records or payment integrity may be affected.
- A provider or infrastructure dependency is involved.
- The case exceeds its approved service target.
- The customer impact is increasing.
- A dispute requires management or specialist review.

Escalation must preserve the case identifier, history, evidence and current status.

The receiving team must acknowledge ownership before the originating team considers the handover complete.

## 13. Reopening and recurring cases

- Reopen a case when the original issue remains unresolved.
- Link recurring cases where they share a common underlying issue.
- Avoid creating duplicate cases for the same reported event when an existing case can be updated.
- Preserve previous resolution details when reopening.
- Repeated cases should be reviewed for systemic causes rather than handled indefinitely as isolated incidents.

## 14. Reporting and operational review

Support reporting may include:

- Cases received by category and store.
- Open and overdue cases.
- Response and resolution times.
- Cases awaiting external information.
- Reopened and recurring cases.
- Escalation volumes.
- Customer satisfaction where measured.
- Common causes and recurring defects.

Reports must respect store-level access boundaries.

Performance indicators must not be used as the sole basis for automated penalties, store suspension, financial intervention or staff disciplinary action.

## 15. Retention and closure controls

- Case records must follow approved data retention schedules.
- Retention must account for legal, financial, contractual and dispute-related obligations.
- Closing a case must not remove related orders, transactions, audit records or evidence.
- Secure disposal must follow the data retention and secure disposal standards.
- Legal holds and active investigations must prevent premature disposal where applicable.

## 16. Operational safeguards

- Case status transitions must be validated server-side.
- Store ownership and access scope must be checked on every relevant operation.
- Case assignment must not grant permissions beyond the recipient's authorised role.
- Important changes must be auditable.
- Concurrent updates must not silently overwrite investigation history.
- Case creation and notification workflows should be idempotent where duplicate processing is possible.
- Failed notifications must not result in the loss of the underlying case record.

## 17. Acceptance criteria

A support case management implementation is acceptable when:

- Every case has a unique identifier.
- Cases have clear ownership and store attribution.
- Lifecycle transitions are recorded and controlled.
- Priority and escalation rules are documented.
- Customer communications are traceable.
- Evidence is protected against unauthorised access or alteration.
- Financial and security-related cases follow specialist controls.
- Store isolation is enforced.
- Reporting respects access permissions.
- Retention and disposal requirements are applied.
- Reopening and recurring-case handling preserve historical context.

## 18. Outstanding decisions

The following require explicit platform approval:

- Final support channels and intake mechanisms.
- Support operating hours and coverage.
- Approved response and resolution targets.
- Customer identity verification requirements by case type.
- Case management tooling and integration approach.
- Customer satisfaction measurement approach.
- Escalation ownership for specialist functions.
- Final retention periods for support records.
