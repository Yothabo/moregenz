# Integration Architecture

**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the integration architecture for the multi-store retail platform.

It establishes how the platform communicates with internal application modules, external service providers and third-party systems while maintaining security, data integrity, store isolation and operational accountability.

The architecture supports the current Yotaabo implementation and the planned transition towards a multi-store platform.

This document defines integration principles and technical boundaries. It does not select unapproved service providers, establish commercial agreements or make unresolved business decisions.

## 2. Integration Objectives

The integration architecture must:

- Support reliable communication between platform modules.
- Enable secure connections to approved external providers.
- Preserve store-level data ownership and isolation.
- Protect financial and transactional integrity.
- Prevent external providers from gaining unnecessary access to platform data.
- Support provider replacement without requiring extensive changes to core business logic.
- Provide traceability for external requests, callbacks and transactions.
- Handle failures, delays, retries and duplicate events safely.
- Support incremental migration from existing Netlify Functions to NestJS.
- Avoid unnecessary integration complexity during initial implementation.

## 3. Integration Principles

### 3.1 Controlled integration boundaries

All integrations must have defined responsibilities, interfaces and permitted data exchanges.

Core business logic must not depend directly on provider-specific implementation details.

### 3.2 Least privilege

Integrations must receive only the permissions and data required for their approved purpose.

Credentials and access must be scoped to the relevant environment, provider account and business function wherever supported.

### 3.3 Store context preservation

External operations initiated on behalf of a store must retain the correct store and transaction context.

An external provider response or callback must not be allowed to establish store authority solely through an identifier supplied in an untrusted payload.

### 3.4 Provider independence

Provider-specific functionality must be separated from core business rules.

Where practical, provider integrations should use internal interfaces or adapters so that a provider can be replaced without rewriting unrelated business modules.

### 3.5 Transaction integrity

External communication must not bypass internal transaction validation, authorisation or financial controls.

A successful external request must not automatically be treated as proof that the corresponding internal business transaction is complete.

### 3.6 Explicit configuration

Provider credentials, endpoints, environment settings and supported capabilities must be configurable.

Unresolved provider choices and business rules must not be embedded as permanent assumptions in application code.

### 3.7 Traceability

Integration requests, responses, callbacks, failures and relevant state changes must be traceable using appropriate correlation identifiers and activity records.

Sensitive credentials and payment data must not be exposed in logs.

## 4. Integration Architecture Overview

The target architecture consists of:

- React and Vite frontend.
- NestJS modular monolith backend.
- PostgreSQL data layer.
- Approved managed services, where retained.
- External service providers.
- Background processing for asynchronous integration tasks.

The backend acts as the controlled boundary between the platform and external providers.

The frontend must not directly access privileged provider credentials or perform operations that require trusted server-side authority.

External providers must not receive unrestricted database access.

### 4.1 Integration flow

A typical integration follows this sequence:

1. An authorised user or internal process initiates an operation.
2. The backend authenticates the request and verifies permissions.
3. The relevant business module validates the operation and store context.
4. The integration layer prepares a provider-specific request.
5. The provider processes the request.
6. The backend validates and interprets the provider response.
7. The relevant internal transaction or integration state is updated.
8. An activity or audit record is created where required.
9. The result is returned or delivered through an approved notification mechanism.

The exact sequence may differ by integration type.

## 5. Internal Application Integration

### 5.1 Modular application boundaries

The initial target backend is a modular monolith.

Modules must communicate through defined application services and interfaces rather than relying on uncontrolled access to another module's internal implementation.

Relevant modules include:

- Identity and Access.
- Platform Administration.
- Stores.
- Products and Catalogue.
- Inventory.
- Commerce and Orders.
- Customers.
- Finance.
- Activity and Audit.
- Performance.
- Marketing.
- Notifications.
- Integrations.

### 5.2 Module responsibilities

Each module remains responsible for its own business rules and authoritative data.

An integration module may coordinate provider communication, but it must not independently redefine the business rules owned by another module.

For example:

- Payment integration communicates with payment providers.
- Commerce determines the authoritative order state.
- Finance records authorised financial transactions.
- Inventory determines stock availability and movement.
- Notifications deliver approved messages.
- Identity and Access determines whether a user or service is authorised.

### 5.3 Synchronous communication

Synchronous internal communication may be used where the initiating operation requires an immediate result.

Examples include:

- Validating a request.
- Retrieving an approved integration configuration.
- Checking whether a provider operation can be initiated.
- Returning a confirmed provider response.

Synchronous external calls must use appropriate timeouts and failure handling.

### 5.4 Asynchronous communication

Asynchronous processing should be used where an operation may take time, depends on an external callback or should not block the initiating request.

Examples include:

- Sending email notifications.
- Processing provider webhooks.
- Retrying eligible failed requests.
- Generating reports.
- Reconciling provider transactions.
- Processing delayed fulfilment updates.

The platform must maintain enough state to determine whether an asynchronous operation is pending, completed, failed or requires intervention.

### 5.5 Future distributed architecture

The initial implementation must not introduce microservices solely to create integration boundaries.

Any future separation of modules into independent services must be supported by demonstrated operational, scaling, security or organisational requirements.

## 6. External Integration Categories

The platform may integrate with the following categories of external services:

### 6.1 Payment providers

Payment providers may support:

- Payment initiation.
- Hosted payment checkout.
- Payment authorisation and confirmation.
- Payment status enquiries.
- Refund requests.
- Provider settlement information.
- Transaction reconciliation.

Provider selection, supported payment methods, transaction fees, settlement periods and commercial terms remain open decisions.

### 6.2 Email providers

Email services may support:

- Account verification.
- Password recovery.
- Store invitations.
- Order confirmations.
- Payment and fulfilment notifications.
- Administrative communications.
- Approved marketing communications.

Email delivery status must be distinguished from proof that a recipient has read or acted on a message.

### 6.3 SMS and messaging providers

Messaging providers may support transactional or operational notifications.

Any use must comply with applicable consent, privacy, communication and provider requirements.

Marketing messages must be distinguished from essential transactional communications.

### 6.4 Shipping and fulfilment providers

Future shipping integrations may support:

- Delivery quotations.
- Shipment creation.
- Collection scheduling.
- Tracking references.
- Delivery status updates.
- Proof of delivery.

The platform must retain the authoritative order and fulfilment records internally.

Shipping provider selection, coverage, rates and service arrangements remain open decisions.

### 6.5 Analytics and reporting services

Approved analytics services may receive limited information for operational reporting and performance analysis.

Personal, financial and commercially sensitive data must be minimised or excluded unless a specific approved purpose requires it.

Analytics data must not replace authoritative transaction records.

### 6.6 Identity and authentication services

External identity services may be considered where they meet the platform's security and operational requirements.

The platform remains responsible for its authorisation model, store membership rules and permission enforcement.

An external authentication result does not automatically grant platform or store permissions.

### 6.7 Storage and file-processing services

Managed storage or file-processing services may be used for approved media and document workflows.

Access must be scoped and controlled.

Files received from external users or providers must be treated as untrusted input.

### 6.8 Future business integrations

Additional integrations may include accounting systems, tax services, enterprise resource planning systems, supplier systems and other business platforms.

Each proposed integration requires an explicit business purpose, data-flow assessment and approval before implementation.

## 7. Integration Layer and Provider Adapters

### 7.1 Provider adapters

External provider implementations should be isolated behind defined interfaces.

An adapter is responsible for translating between internal platform operations and the provider's API or protocol.

Adapters may handle:

- Provider authentication.
- Request construction.
- Response parsing.
- Provider error translation.
- Provider-specific status mapping.
- Timeout handling.
- Request identifiers.
- Provider capability differences.

### 7.2 Core business independence

Core business modules must not depend on provider-specific response structures.

Provider responses must be translated into internal representations before they affect business state.

### 7.3 Provider capability differences

Not all providers offer identical capabilities.

The platform must explicitly represent unsupported or unavailable capabilities rather than assuming every provider supports the same operations.

### 7.4 Provider replacement

Provider replacement must consider:

- Existing transactions.
- Outstanding payment or fulfilment operations.
- Stored provider references.
- Webhook configuration.
- Historical reconciliation.
- Credential rotation.
- Operational continuity.

Replacing a provider must not invalidate historical transaction records or remove the ability to investigate previous activity.

## 8. Payment Integration Architecture

### 8.1 Payment initiation

Payment initiation must originate from an authorised backend workflow.

The backend must validate the relevant order, amount, currency and transaction state before requesting payment.

The client must not be trusted to determine the authoritative amount payable.

### 8.2 Payment status

Payment states must distinguish between pending, successful, failed, cancelled, expired, refunded and other provider-supported outcomes.

The exact internal state model must be defined in the commerce and finance specifications.

### 8.3 Payment confirmation

A browser redirect or client-side success message is not sufficient proof of payment.

Payment confirmation must be established through a trusted provider response, verified callback or authoritative provider status enquiry.

### 8.4 Idempotency

Payment initiation and other financial operations must support appropriate idempotency controls.

Repeated requests, provider retries or network failures must not create duplicate financial transactions.

### 8.4.1 Uncertain payment outcomes

A timeout or interrupted connection after a payment request has been submitted must be treated as an uncertain outcome, not automatic proof of failure.

Before initiating another payment attempt, the platform must use the existing idempotency reference, provider transaction reference or an authoritative provider status enquiry to determine whether the original request was processed.

Where the outcome cannot be established, the transaction must remain in an appropriate pending or investigation state until it can be resolved.

The platform must not create a second charge merely because the original response was not received.

### 8.5 Refunds and reversals

Refunds and reversals must be validated against the original transaction and applicable business permissions.

The platform must retain references to both the original transaction and the resulting financial adjustment.

### 8.6 Payment reconciliation

Provider transaction information must be compared with internal payment and order records.

Differences must be recorded for investigation.

A reconciliation result must not automatically authorise an unapproved financial adjustment.

### 8.7 Cardholder data

The platform must minimise its exposure to cardholder data.

Hosted or tokenised provider payment handling should be preferred where supported.

Full card numbers, CVV values and raw payment credentials must not be stored unless a separately approved architecture and compliance assessment explicitly require it.

Payment tokens and provider references must be treated as sensitive information.

## 9. Webhook and Callback Architecture

### 9.1 Purpose

Webhooks allow external providers to notify the platform about events occurring outside the platform's direct request lifecycle.

Examples include:

- Payment status changes.
- Refund updates.
- Email delivery events.
- Shipment status changes.
- Provider account events.

### 9.2 Verification

Webhook endpoints must verify the authenticity and integrity of incoming events using the provider's supported verification mechanism.

Verification may include signatures, shared secrets, certificates, timestamps or other provider-defined mechanisms.

### 9.3 Trusted context resolution

Store and transaction context must be resolved using verified provider account details, trusted internal mappings and existing transaction records.

A store identifier or transaction identifier supplied in an unverified payload must not establish authority.

### 9.4 Duplicate event handling

Webhook processing must be idempotent.

The platform must recognise duplicate provider events and prevent repeated processing from creating duplicate state changes or financial records.

### 9.5 Event ordering

The platform must not assume that provider events always arrive in chronological order.

Where necessary, processing must validate current transaction state and use provider event timestamps or authoritative status enquiries to resolve conflicts.

### 9.6 Acknowledgement and processing

Webhook receipt and business processing must be treated as separate stages where appropriate.

The platform should acknowledge verified receipt promptly and process longer-running work asynchronously.

Failed processing must remain observable and recoverable.

### 9.6.1 Durable event receipt

A verified webhook must be durably recorded before the platform acknowledges successful receipt, unless the provider's protocol requires a different acknowledgement strategy supported by an equivalent reliable recovery mechanism.

The durable record must contain sufficient information to identify the event, verify its processing state and recover it after an application or worker failure.

Webhook acknowledgement must not create the appearance of successful processing when the event has not been safely recorded.

If durable recording fails, the platform must follow a controlled failure and provider retry strategy rather than silently discarding the event.

### 9.7 Replay protection

The platform must use appropriate replay protection and event uniqueness controls.

Previously processed events must not be allowed to repeat sensitive operations.

## 10. Data Exchange and Ownership

### 10.1 Data minimisation

Only information necessary for the approved integration purpose may be exchanged.

Data fields must be reviewed before being exposed to an external provider.

### 10.2 Authoritative records

The platform remains authoritative for its internal stores, products, listings, inventory, customers, orders and financial records unless a separately approved design establishes otherwise.

External provider records are not substitutes for internal business records.

### 10.3 Data ownership

Integration does not transfer ownership of platform or store data to an external provider.

Provider access and processing must be governed by the approved service arrangement and applicable legal requirements.

### 10.4 Store-specific information

Where an integration operates on behalf of a store, the platform must retain the relevant store context.

Provider accounts, credentials, configuration and settlement arrangements may be platform-level or store-specific depending on the approved business model.

That distinction must be explicit for each integration.

### 10.5 Cross-store data exposure

An integration serving multiple stores must not expose one store's information to another store.

Shared provider accounts must not be treated as permission to share all associated business data.

### 10.6 Data retention

Integration payloads, logs, provider references and transaction evidence must follow approved retention and privacy requirements.

Sensitive payloads should not be retained longer than necessary.

## 11. Integration Configuration and Lifecycle

### 11.1 Configuration model

Integration configuration should identify:

- Integration type.
- Provider identity.
- Environment.
- Enabled capabilities.
- Account or tenant reference.
- Store scope, where applicable.
- Endpoint configuration.
- Credential reference.
- Operational status.
- Configuration version.
- Responsible owner.

The final configuration schema remains subject to detailed implementation design.

### 11.2 Credential management

Credentials must be stored in approved secret-management facilities.

They must not be hard-coded, committed to source control, exposed to frontend code or included in ordinary logs.

### 11.3 Environment separation

Development, testing, staging and production environments must use appropriately separated credentials and provider configurations.

Test credentials must not be treated as production credentials.

Production provider activity must not be triggered accidentally by development or test workflows.

### 11.4 Activation and deactivation

An integration must be explicitly configured and activated before use.

Deactivation must prevent new operations while preserving historical records and the ability to investigate outstanding transactions.

Any outstanding operations must be assessed before a provider is disconnected.

### 11.5 Credential rotation

Credential rotation must be supported without requiring unrelated application changes.

Rotation procedures must account for provider-side configuration, webhook verification and any overlap period required by the provider.

### 11.6 Provider onboarding

Before activating a provider, the responsible team must confirm:

- Business purpose and approval.
- Provider account ownership.
- Required contractual and compliance review.
- Supported capabilities.
- Security and data-flow assessment.
- Credential storage.
- Environment configuration.
- Webhook verification.
- Failure and recovery procedures.
- Monitoring and operational ownership.

## 12. Reliability and Failure Handling

### 12.1 External dependency failures

External providers may experience downtime, degraded performance, rejected requests or delayed responses.

The platform must handle these conditions without compromising internal data integrity.

### 12.2 Timeouts

External requests must have defined timeout behaviour appropriate to the operation.

A timeout must not automatically be interpreted as proof that the provider did not process the request.

### 12.3 Retry policy

Retries must be limited, controlled and appropriate to the operation.

Retryable failures must be distinguished from permanent failures such as invalid credentials, rejected requests or unsupported operations.

Financial operations must use idempotency and transaction-state checks before retries.

### 12.4 Exponential backoff

Where repeated attempts are appropriate, backoff and retry limits should prevent excessive requests and provider overload.

The exact retry intervals and limits remain implementation decisions.

### 12.5 Circuit breaking

Circuit-breaking controls may be used to prevent repeated requests to providers experiencing sustained failures.

Recovery behaviour must be observable and must not silently discard pending operations.

### 12.6 Failure isolation

A failure in one external provider must not unnecessarily disable unrelated platform functionality.

Where possible, affected capabilities should degrade independently.

### 12.7 Manual recovery

The platform must provide authorised operational procedures for investigating and resolving integration failures that cannot be recovered automatically.

Manual intervention must be recorded.

## 13. Asynchronous Processing and Message Reliability

### 13.1 Background processing

Long-running or delayed integration tasks should use the approved background-processing architecture.

The processing mechanism must support controlled retries, failure visibility and operational recovery.

### 13.2 Reliable event publication

Where a database transaction must result in an asynchronous event, the implementation should prevent a committed business transaction from silently losing its corresponding event.

A transactional outbox or an equivalent reliability mechanism may be considered.

### 13.3 Processing state

Asynchronous operations should have identifiable processing states, such as:

- Pending.
- Processing.
- Completed.
- Failed.
- Awaiting retry.
- Requires intervention.

The final state model must be defined by the relevant module.

### 13.4 Duplicate processing

Background workers must tolerate duplicate execution where delivery guarantees do not ensure exactly-once processing.

Business effects must be protected through idempotency and state validation.

### 13.5 Dead-letter handling

Repeatedly failing tasks may be moved into a controlled failure queue or equivalent operational mechanism.

Authorised personnel must be able to inspect and recover eligible tasks without bypassing business validation.

## 14. Security Architecture

### 14.1 Server-side integration

Privileged external API calls must be made through trusted backend services.

Provider secrets must never be exposed to browsers or public frontend bundles.

### 14.2 Authentication and verification

Each provider integration must use the strongest appropriate authentication and request-verification mechanisms supported by the provider.

### 14.3 Least privilege

Provider credentials and service accounts must have the minimum required access.

Where supported, separate credentials should be used for distinct environments and integration responsibilities.

### 14.4 Transport security

External communication must use secure transport protocols.

Certificate validation must not be disabled in production.

### 14.5 Input validation

All external responses, callbacks and imported data must be treated as untrusted input.

Data must be validated before it is used in business operations or persisted.

### 14.6 Sensitive information

Logs, traces and error messages must not expose secrets, authentication tokens, payment credentials or unnecessary personal information.

### 14.7 Dependency security

External SDKs and libraries must be reviewed and maintained.

Dependencies must be assessed for security, compatibility and ongoing support.

### 14.8 Integration access control

Only authorised platform or store roles may configure, activate, deactivate or inspect integration capabilities within their permitted scope.

A Store Admin must not gain access to platform-wide credentials or another store's integration configuration without explicit authority.

## 15. Store and Platform Integration Boundaries

### 15.1 Platform-level integrations

Platform-level integrations may support shared services and centrally managed operations.

Their existence does not grant unrestricted access to individual store data.

### 15.2 Store-level integrations

Store-level integrations may be configured for a specific store where the business model and provider capabilities permit it.

Store configuration and provider credentials must remain isolated from other stores.

### 15.3 Shared provider accounts

A shared provider account may serve multiple stores only where the provider arrangement and approved business rules permit it.

The platform must preserve transaction attribution, store context and financial separation.

Before enabling a shared account, the integration must establish reliable attribution of each relevant transaction, refund, fee, settlement and reconciliation record to the correct store or platform-level activity.

Attribution must use trusted provider references and internal mappings, not unverified store identifiers supplied by clients or callbacks.

If the provider cannot support sufficient attribution and reconciliation to preserve the platform's financial separation requirements, that shared-account integration must not be enabled for multi-store operations.

Any limitations and resulting operational responsibilities must be documented and approved before activation.

### 15.4 Store onboarding

Store onboarding must establish which integrations are available, enabled or required for that store.

A store must not automatically inherit access to every platform integration.

### 15.5 Store suspension and deactivation

Suspending or deactivating a store may require disabling selected integration capabilities.

The platform must preserve historical integration evidence and outstanding transaction records.

## 16. Notifications and Communication Integrations

### 16.1 Notification ownership

The Notifications module determines which messages are eligible for delivery and under what business conditions.

The provider adapter is responsible for delivery through the selected external service.

### 16.2 Message categories

Messages should distinguish between:

- Authentication and account security.
- Transactional order communications.
- Payment communications.
- Fulfilment communications.
- Operational and administrative communications.
- Marketing communications.

### 16.3 Delivery status

The platform may record provider acceptance, delivery, failure and other supported delivery events.

Provider acceptance must not be represented as confirmed delivery.

Delivery must not be represented as proof of reading.

### 16.4 Consent and preferences

Marketing communication must respect applicable consent requirements and user preferences.

Transactional communications must be handled according to their actual purpose and applicable requirements.

### 16.5 Template management

Message templates should be managed independently from provider-specific delivery code.

Templates must support approved platform and store branding without allowing unrestricted modification of system-critical content.

## 17. Integration Monitoring and Observability

### 17.1 Operational visibility

The platform must monitor integration health and operational performance.

Monitoring should include, where relevant:

- Request volume.
- Success and failure rates.
- Response times.
- Timeout frequency.
- Retry volume.
- Pending task volume.
- Webhook verification failures.
- Processing delays.
- Provider availability.
- Reconciliation differences.

### 17.2 Correlation identifiers

Requests, callbacks and asynchronous tasks should use correlation identifiers to connect related operations across system boundaries.

### 17.3 Logging

Integration logs must capture sufficient operational detail to investigate failures without exposing sensitive information.

### 17.4 Alerting

Alerts should be based on meaningful operational conditions and appropriate thresholds.

Critical failures affecting payments, orders, security or data integrity must have defined escalation procedures.

### 17.5 Provider status

Provider availability indicators may support operational monitoring.

They must not be treated as proof that a specific transaction succeeded.

### 17.6 Audit records

Configuration changes, credential changes, privileged integration operations and material transaction state changes must be recorded according to the Activity and Audit Architecture.

## 18. Testing and Verification

### 18.1 Unit testing

Provider adapters and internal integration logic must have unit tests covering normal responses, error handling, validation and state mapping.

### 18.2 Contract testing

Internal interfaces and provider request/response contracts should be tested to identify incompatibilities.

### 18.3 Integration testing

Tests must verify communication with provider test environments where available.

### 18.4 Webhook testing

Webhook tests must cover:

- Valid signatures.
- Invalid signatures.
- Duplicate events.
- Replay attempts.
- Out-of-order events.
- Unknown provider references.
- Incorrect store or transaction mappings.
- Processing failures.
- Recovery and retry behaviour.

### 18.5 Failure testing

Tests must cover timeouts, unavailable providers, malformed responses, rate limits and authentication failures.

### 18.6 Financial testing

Payment and refund workflows must be tested for duplicate requests, incorrect amounts, invalid state transitions and reconciliation differences.

### 18.7 Store isolation testing

Tests must verify that integration operations cannot access or modify another store's data through manipulated identifiers, callbacks or configuration.

### 18.8 Production readiness

A new or materially changed integration must not enter production until its security, failure handling, monitoring, recovery procedures and operational ownership have been reviewed.

Successful compilation alone is not sufficient evidence of integration readiness.

## 19. Deployment and Environment Management

### 19.1 Configuration deployment

Integration configuration must be deployed and managed separately from application source code where appropriate.

### 19.2 Secret provisioning

Production secrets must be provisioned through approved environment or secret-management facilities.

They must not be embedded in build artifacts.

### 19.3 Endpoint management

Provider endpoints must be environment-specific where applicable.

Test and production endpoints must not be confused.

### 19.4 Webhook deployment

Webhook endpoints must be deployed with appropriate authentication, verification and monitoring.

Provider-side webhook configuration must be coordinated with application deployment.

### 19.5 Compatibility

Application releases must account for existing provider integrations and outstanding operations.

A release must not unintentionally invalidate active callbacks, credentials or stored provider references.

## 20. Migration and Existing Yotaabo Integrations

### 20.1 Current integration baseline

The existing Yotaabo implementation uses React, Vite, Netlify Functions and Supabase services.

Existing production integrations and their actual configuration must be identified before migration.

### 20.2 Incremental migration

Integration capabilities must be migrated incrementally from existing Netlify Functions to the target NestJS backend.

The migration must preserve existing frontend consumers until their replacement contracts are implemented and verified.

### 20.3 Existing provider behaviour

Existing provider behaviour, credentials, callbacks, transaction references and operational dependencies must be documented before changing implementation.

### 20.4 Avoiding competing processing paths

The migration must avoid two independent backend paths processing the same financial or business operation without explicit coordination.

Ownership of each migrated integration must be clear.

For each migration stage, the responsible implementation must identify the authoritative processing path for new requests, provider callbacks, scheduled tasks and pending operations.

Webhook routing, background jobs, retry mechanisms and in-flight transactions must be included in the migration plan.

Where both old and new implementations must temporarily coexist, explicit coordination and idempotency controls must prevent duplicate processing or conflicting state changes.

### 20.5 Verification

Each migrated integration must be tested against the existing production behaviour and relevant business records.

Verification must include outstanding and in-flight operations, webhook delivery, retry behaviour, duplicate-event handling and reconciliation continuity.

### 20.5.1 Rollback safety

A rollback must identify which implementation is authoritative for each integration operation and how pending work will be handled.

Switching between implementations must not cause provider callbacks or scheduled tasks to be processed twice, lost or applied against inconsistent transaction state.

Before rollback, the responsible team must assess in-flight requests, provider-side transaction status, queued events and outstanding reconciliation work.

Where transaction outcomes remain uncertain, they must be resolved through the appropriate provider and internal records before affected operations are repeated.

Rollback procedures must preserve historical records, provider references and audit evidence.

### 20.6 Data preservation

Historical provider references, payment records, order states, notification records and audit evidence must be preserved according to approved retention requirements.

### 20.7 Retirement

An existing integration path may be retired only after its replacement is operational, verified and able to handle outstanding work.

## 21. Governance and Provider Management

### 21.1 Integration approval

New integrations require an identified business purpose, responsible owner and appropriate technical and security review.

### 21.2 Provider assessment

Provider assessment should consider:

- Functional suitability.
- Security capabilities.
- Reliability and availability.
- Data protection and privacy.
- Geographic coverage.
- Commercial terms and fees.
- Support arrangements.
- Regulatory and contractual obligations.
- Portability and exit arrangements.

### 21.3 Contractual responsibilities

Provider contracts, data-processing arrangements and service commitments must be reviewed by the appropriate business and professional advisers.

This architecture does not establish legal or regulatory compliance by itself.

### 21.4 Change management

Material changes to provider configuration, authentication, data exchange or business-critical integration behaviour must follow the approved change and release processes.

### 21.5 Provider exit

Provider termination or replacement must include a plan for outstanding transactions, data retrieval, credential revocation, webhook removal and continuity of business operations.

## 22. Open Integration Architecture Decisions

The following decisions remain open and must be resolved through the appropriate business and technical processes:

- Which payment providers will be supported.
- Whether payment accounts are platform-level, store-level or a permitted combination.
- Which payment methods and currencies will be supported.
- Payment fee, settlement and refund arrangements.
- Which email and messaging providers will be selected.
- Whether shipping integrations are required in the initial release.
- Which shipping and fulfilment providers will be supported.
- Whether Supabase services will remain part of the target integration architecture.
- Which background-processing mechanism will be adopted.
- Whether a transactional outbox is required in the initial implementation.
- How integration configuration will be stored and administered.
- Which secret-management facility will be used.
- Which external analytics services, if any, will be permitted.
- Provider-specific webhook verification and retention requirements.
- Integration-specific service levels and escalation arrangements.
- Data-processing and contractual requirements for each provider.
- Whether external accounting or business systems will be integrated.
- Provider exit and data portability requirements.

Unresolved decisions must not be converted into permanent assumptions in implementation.

## 23. Relationship to Other Documents

This document must be read together with:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.
- System Architecture.
- Data Architecture.
- Store Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Operations Architecture.
- Identity and Access Management.

Where integration responsibilities overlap with another architecture document, the relevant document remains authoritative for its defined subject.

## 24. Architecture Governance

This document establishes the approved direction for integration design once formally approved.

Implementation decisions must remain consistent with its principles and constraints.

Material deviations require documented review and approval.

Provider-specific implementation details may be maintained in separate technical specifications without weakening the platform-wide integration requirements.

This document must be reviewed when material changes occur to the platform architecture, business model, security requirements or external provider strategy.
