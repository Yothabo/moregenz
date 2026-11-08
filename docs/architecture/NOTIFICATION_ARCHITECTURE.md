# Notification Architecture

**Status:** DRAFT
**Version:** 0.1
**Last updated:** 2026-11-06
**Approval:** Pending business owner review

## 1. Purpose

This document defines the notification architecture for the multi-store platform.

It establishes how notifications are created, classified, authorised, processed, delivered, tracked and audited across platform-level and store-level operations.

The architecture supports communication with customers, store administrators, employees, platform administrators and other authorised recipients.

It defines the shared notification capabilities required by the platform while preserving store boundaries, communication ownership, customer preferences and applicable consent requirements.

This document focuses on the technical and architectural design of notification services. It does not establish final commercial communication policies, provider contracts, message pricing or legal interpretations.

## 2. Architectural Objectives

The notification architecture must:

- Provide shared notification infrastructure for all participating stores.
- Support platform-level and store-level communication.
- Support multiple notification channels through controlled provider integrations.
- Distinguish transactional, operational, security and marketing notifications.
- Enforce recipient eligibility, permissions, preferences and consent requirements.
- Preserve store context and prevent cross-store information disclosure.
- Support configurable notification templates and controlled content management.
- Provide reliable delivery processing, retries and failure handling.
- Prevent duplicate or unintended message delivery where idempotency can be applied.
- Maintain delivery, processing and administrative audit records.
- Support monitoring, reporting and operational investigation.
- Allow notification providers to be changed without redesigning the entire application.
- Protect personal information and confidential business information.
- Support incremental migration from the existing Yotaabo application.

## 3. Notification Architecture Principles

### 3.1 Shared notification infrastructure

Notification processing must be provided through shared platform services.

Individual stores must not require separate notification engines or independent notification databases to use platform communication capabilities.

Store-specific configuration, templates, sender identities and provider settings may be supported within the shared architecture.

### 3.2 Explicit communication ownership

Every notification must have an identifiable originating context.

The architecture must distinguish:

- Platform-originated notifications.
- Store-originated notifications.
- System-generated notifications.
- Provider-generated delivery events.

A platform notification must not be presented as a store-originated message, or vice versa, without an explicitly authorised communication arrangement.

### 3.3 Store isolation

Store-originated notifications must remain associated with the originating store.

Recipient resolution, message content, delivery records and reporting must respect the relevant store boundary.

A store must not access another store's private notification content, recipient information or delivery history unless an explicitly authorised platform-level function permits it.

### 3.4 Communication classification

Notifications must be classified according to their purpose before delivery.

The architecture must distinguish transactional, operational, security, administrative and marketing communications.

Classification must influence authorisation, consent checks, recipient eligibility, priority, retention and delivery handling.

### 3.5 Provider independence

Business logic must not depend directly on the implementation details of a specific email, SMS, push or messaging provider.

Provider integrations must be implemented behind controlled interfaces so that providers can be replaced or supplemented without rewriting notification business rules.

### 3.6 Reliable processing

Notification requests must be processed through controlled and observable workflows.

Temporary provider failures must not silently discard messages that are required to be delivered.

Retry behaviour must account for provider capabilities, message expiry, duplicate-delivery risk and the nature of the notification.

### 3.7 Data minimisation

Notifications must contain only information necessary for their intended purpose.

Sensitive customer, financial, authentication and business information must not be exposed unnecessarily through message content, subject lines, previews or delivery metadata.

### 3.8 Human and business authority

Automated notification processing must not create business authority that does not otherwise exist.

Sending a notification must not itself approve a financial adjustment, authorise a stock transfer, approve a funding request or change a store's operational status.

## 4. Notification Domain Boundaries

### 4.1 Notification responsibilities

The notification domain is responsible for:

- Accepting authorised notification requests.
- Validating notification classification and delivery context.
- Resolving eligible recipients.
- Applying communication preferences and applicable consent rules.
- Selecting approved templates and delivery channels.
- Rendering and preparing messages.
- Coordinating delivery through configured providers.
- Processing delivery results and provider callbacks.
- Managing retries and recoverable failures.
- Maintaining notification processing and delivery records.
- Providing authorised notification history and operational reporting.

### 4.2 Responsibilities outside the notification domain

The notification domain does not own the underlying business events that cause messages to be sent.

Other platform domains remain authoritative for their respective business records and decisions.

Examples include:

- Commerce owns orders, checkout and order status.
- Finance owns financial transactions, settlements and financial adjustments.
- Inventory owns stock balances, reservations and stock movements.
- Customer owns customer identity, contact information and communication preferences.
- Identity and Access owns user authentication and permissions.
- Stores owns store identity, configuration and lifecycle.
- Marketing owns campaigns, campaign participation and marketing execution rules.
- Operations owns operational incident and support workflows.

The notification domain consumes authorised events or requests from these domains. It must not become an alternative source of truth for their business records.

### 4.3 Notification versus communication history

A notification delivery record confirms that a communication was requested or processed through the notification system.

It does not automatically establish that the recipient read, understood or acted on the message.

Where a business workflow requires acknowledgement, acceptance or a formal response, that action must be represented in the relevant authoritative business domain.

### 4.4 Notification versus marketing

Marketing campaigns and promotional communication remain governed by the Marketing Architecture.

The notification domain may provide delivery infrastructure for marketing communications, but it must not independently determine campaign eligibility, audience selection, campaign approval or marketing consent.

### 4.5 Notification versus authentication

Authentication and account recovery workflows may use notification channels.

However, authentication tokens, verification challenges, password recovery rules and account security decisions remain under the authority of the Identity and Access domain.

The notification service must not independently create or validate authentication authority.

## 5. Notification Classification and Types

### 5.1 Transactional notifications

Transactional notifications communicate events associated with an actual customer or business transaction.

Examples include:

- Order confirmation.
- Payment status updates.
- Order fulfilment updates.
- Dispatch and delivery updates.
- Cancellation confirmations.
- Return and refund status updates.
- Customer account transaction-related notices.

Transactional notifications must be generated from authoritative business events or authorised requests.

Their classification does not automatically exempt them from applicable privacy, communication or legal requirements.

### 5.2 Operational notifications

Operational notifications support the day-to-day operation of stores and the platform.

Examples include:

- New order alerts for authorised store personnel.
- Low-stock alerts where configured.
- Inventory exceptions.
- Failed integration alerts.
- Reconciliation exceptions.
- Store onboarding progress.
- Operational task reminders.
- Service availability and processing alerts.

Operational notifications must be delivered only to recipients with a legitimate operational relationship to the relevant store or platform function.

### 5.3 Security notifications

Security notifications communicate events that may affect account or system security.

Examples include:

- New or unusual account access.
- Password or recovery changes.
- Privileged permission changes.
- Store membership changes.
- Administrative security events.
- Relevant security incident notifications.

Security notification requirements must align with the Identity and Access and Security Architectures.

Security messages must not disclose secrets, authentication tokens or information that could enable account compromise.

### 5.4 Administrative notifications

Administrative notifications support authorised platform and store administration.

Examples include:

- Store creation and onboarding updates.
- Store configuration changes.
- Platform policy announcements.
- Administrative review requests.
- Approval workflow updates.
- Governance and compliance reminders.

Administrative notifications must respect the authority and scope of the originating administrative function.

### 5.5 Marketing notifications

Marketing notifications promote products, services, campaigns or commercial offers.

Examples include:

- Promotional email.
- Promotional SMS.
- Campaign announcements.
- Product launch communications.
- Store offers and discounts.
- Customer re-engagement campaigns.

Marketing notifications must follow the Marketing Architecture and the applicable customer consent and preference rules.

### 5.6 Classification precedence

Where a message could appear to fit more than one classification, the originating business purpose and applicable policy must determine its classification.

A message must not be classified as transactional or operational merely to avoid marketing consent or preference requirements.

The classification decision must be recorded or otherwise traceable.

## 6. Notification Actors and Responsibilities

### 6.1 Platform services

Authorised platform services may generate notifications in response to platform events and approved workflows.

They must identify the originating module, event, platform context and intended recipient scope.

### 6.2 Platform Super Admin

The Platform Super Admin may manage platform-level notification configuration and authorised platform communications.

This authority does not automatically grant unrestricted access to private store communications or customer information.

Privileged notification administration must be subject to permission checks and audit logging.

### 6.3 Store Admin

A Store Admin may manage store-level notification configuration and authorised store communications within the store's permitted scope.

This may include:

- Managing approved store notification templates.
- Configuring supported notification channels.
- Managing authorised employee notification preferences.
- Reviewing store notification activity.
- Managing store-specific sender information where supported.
- Initiating authorised store communications.

Store Admin authority must not extend to another store's notification configuration or private delivery records.

### 6.4 Store employees

Employees may receive notifications and perform notification-related actions according to their assigned permissions.

Access to notification history, recipient details, communication configuration and administrative actions must be separately authorised where appropriate.

### 6.5 Customers

Customers may receive eligible notifications through supported channels.

They may manage communication preferences and applicable consent choices through approved customer-facing workflows.

Customer preferences must be respected according to the communication classification and applicable rules.

### 6.6 External providers

External providers may process messages and return delivery or failure information.

Providers must not be treated as authoritative sources for platform permissions, store ownership or business transaction decisions.

Provider access and data sharing must be limited to the information required for the contracted service.

## 7. Notification Channels

### 7.1 Email

The architecture must support email delivery through approved providers.

Email may be used for transactional, operational, security, administrative and marketing communication, subject to the relevant classification and authorisation rules.

Store-specific sender identities and domains may be supported through controlled configuration and verification.

### 7.2 SMS

The architecture may support SMS delivery for communication that is suitable for short text messages.

SMS may be used for eligible transactional, operational and security messages, as well as marketing messages where permitted.

Sensitive information must not be included unnecessarily because SMS content may be visible on device lock screens and may be accessible through telecommunications providers.

### 7.3 Push notifications

The architecture may support browser or mobile push notifications where the relevant application, device and provider capabilities exist.

Push delivery must account for device registration, subscription validity, permission status and token lifecycle.

Push notification previews must avoid exposing sensitive information.

### 7.4 In-application notifications

The platform may provide an in-application notification centre for authenticated customers, employees, Store Admins and platform administrators.

In-application notifications must be scoped to the intended user and relevant platform or store context.

Read status, acknowledgement and dismissal must be represented separately where those actions have different business meanings.

### 7.5 Other communication channels

Additional channels may be introduced through approved provider integrations.

Examples may include supported messaging platforms or voice communication services.

A new channel must undergo security, privacy, operational and cost assessment before production use.

### 7.6 Channel selection

Channel selection must be based on the notification's purpose, recipient eligibility, configured preferences, provider availability and applicable communication rules.

The platform must not assume that every recipient has access to every channel.

A notification must not be sent through an alternative channel merely because the preferred channel failed, unless the fallback is authorised by the relevant policy and the recipient is eligible to receive it.

## 8. Notification Ownership and Store Context

### 8.1 Platform-level notifications

Platform-level notifications originate from platform operations, shared services or authorised platform administration.

They must be associated with the relevant platform context and must not be incorrectly attributed to an individual store.

### 8.2 Store-level notifications

Store-level notifications originate from a store's business operations or authorised store administration.

Each store-level notification must retain its originating store identifier throughout processing and delivery.

### 8.3 Recipient scope

Recipients must be resolved within the scope of the notification.

Depending on the notification type, recipients may include:

- A customer associated with a store transaction.
- An employee with an active membership in the originating store.
- A Store Admin authorised for that store.
- A Platform Super Admin authorised for the relevant platform function.
- An external recipient explicitly authorised for the communication.

The notification service must not infer recipient authority from an email address, telephone number or client-supplied store identifier alone.

### 8.4 Store isolation

Store notification queries, configuration, templates, delivery records and reporting must enforce store-level access boundaries.

A store must not retrieve another store's private notification information by changing a request parameter or supplying another store identifier.

Backend authorisation and data-access controls must enforce these boundaries.

### 8.5 Shared recipients

A user may have authorised relationships with more than one store or with both a store and the platform.

The notification system must resolve the intended context for each notification rather than treating the recipient's identity as unrestricted access to every associated store.

A notification intended for one store must not expose information belonging to another store.

### 8.6 Store lifecycle changes

Store suspension, deactivation or other lifecycle changes may affect the ability to initiate or deliver store-originated notifications.

The notification service must respect authoritative store lifecycle state and applicable operational rules.

Historical notification and delivery records must remain available according to approved retention and access policies.


## 9. Notification Template Architecture

### 9.1 Template management

The platform must provide centrally managed notification templates with controlled store-level customisation.

Templates must support the notification classifications and delivery channels approved by the platform.

Template management must distinguish shared platform templates from store-specific templates.

### 9.2 Template ownership

Platform-owned templates must be managed by authorised platform administrators.

Store-specific templates may be managed by authorised Store Admins within the permitted configuration boundaries.

A store must not modify a shared platform template in a way that changes communications for other stores.

### 9.3 Template structure

Templates should support:

- Template identifier and name.
- Notification classification.
- Delivery channel.
- Subject or title where applicable.
- Message body.
- Supported dynamic variables.
- Language and locale.
- Version and publication status.
- Owning platform or store context.
- Creation and modification history.

The exact template model remains subject to implementation decisions.

### 9.4 Dynamic content

Templates may include approved dynamic values obtained from authoritative platform records.

Examples include:

- Customer display name.
- Store name and approved branding.
- Order reference.
- Order status.
- Relevant product information.
- Transaction date.
- Support contact information.
- Approved action links.

Dynamic values must be validated and safely rendered for the destination channel.

The notification service must not accept arbitrary executable content or unrestricted template expressions from users.

### 9.5 Template validation

Templates must be validated before publication.

Validation must cover required fields, supported variables, channel constraints, content rendering and relevant security rules.

Invalid or incomplete templates must not be used for production delivery.

### 9.6 Template versioning

Published template versions must be identifiable and traceable.

Changes to a template must not silently alter messages that have already been generated or are awaiting delivery.

The system must retain sufficient version information to establish which template version was used for a notification.

### 9.7 Template approval

Template approval requirements must reflect the template's classification and ownership.

Platform-wide templates and sensitive communication templates may require additional review.

Store Admins may manage permitted store-specific content but must not bypass platform restrictions, legal requirements or approved communication policies.

### 9.8 Language and localisation

The architecture should support multiple languages and locale-specific formatting.

Dates, times, currencies and other formatted values must follow the intended recipient's applicable locale.

The initial supported languages and translation responsibilities remain open decisions.

## 10. Recipient Preferences and Consent

### 10.1 Preference ownership

Customer communication preferences remain authoritative within the Customer domain.

Employee and administrator notification preferences must be associated with their relevant user identity and notification context.

The notification service must consume authoritative preference information rather than maintain competing sources of truth.

### 10.2 Preference categories

Preferences may include:

- Email delivery.
- SMS delivery.
- Push notification delivery.
- In-application notifications.
- Marketing communication.
- Optional operational alerts.
- Notification frequency or grouping where supported.

The available preferences may differ by recipient type and notification classification.

### 10.3 Consent requirements

Marketing communications must be subject to applicable consent and opt-out requirements.

The notification service must verify the current authoritative consent state before dispatch.

A marketing audience or delivery queue created earlier must not override a later withdrawal of consent.

### 10.4 Transactional and operational communication

Transactional and operational notifications must follow their applicable legal basis, business purpose and communication rules.

A customer opting out of marketing must not automatically be treated as having opted out of every necessary transactional communication.

The platform must not use notification classification to avoid consent or preference requirements.

### 10.5 Preference enforcement

Preference and consent checks must occur close enough to dispatch to account for changes made after a notification was originally requested or queued.

Where an applicable preference or consent check cannot be completed, the system must apply the defined safe handling policy rather than silently assume permission.

### 10.6 Opt-out processing

Opt-out requests must be processed through approved workflows and reflected in the authoritative preference record.

The platform must record relevant preference changes and their effective times.

Where provider-side suppression or preference synchronisation is required, failures must be visible and recoverable.

### 10.7 Store-specific preferences

Where customers interact with multiple stores, the platform must preserve the intended scope of their communication preferences.

A preference associated with one store must not automatically be interpreted as a preference for every other store unless the approved preference model explicitly establishes that scope.

### 10.8 Preference conflicts

Where platform-level and store-level communication rules interact, the system must apply the applicable higher-level restrictions and authoritative customer preferences.

Store configuration must not override a customer's applicable opt-out or a platform-wide communication restriction.

### 10.9 Preference audit history

Changes to consent and communication preferences must be traceable.

Records should identify the affected preference, effective time, source of the change and relevant authorised actor or customer action.

## 11. Notification Processing Architecture

### 11.1 Notification request initiation

Notifications may be initiated by authorised application workflows, domain events, scheduled processes or approved administrative actions.

Each request must identify its originating domain, event or workflow.

### 11.2 Request validation

Before processing, the notification service must validate:

- Notification type and classification.
- Originating platform or store context.
- Authorised initiating service or user.
- Intended recipient or recipient-resolution criteria.
- Permitted delivery channel.
- Required message data.
- Template availability.
- Relevant preference and consent requirements.
- Idempotency information where applicable.

Invalid or unauthorised requests must be rejected or placed into a controlled exception workflow.

### 11.3 Notification orchestration

The notification service coordinates recipient resolution, classification checks, template selection, content rendering, channel selection and delivery.

Business decisions must remain with their authoritative domains.

The notification service must not independently determine whether an order, payment, refund, financial adjustment or operational action has been approved.

### 11.4 Event-driven processing

Domain events may initiate notification workflows.

Events must contain or reference sufficient information to identify the originating business context and retrieve the authoritative records needed for message generation.

The notification service must not trust unverified client-supplied event data.

### 11.5 Scheduled notifications

The architecture may support scheduled and delayed notifications.

Examples include reminders, scheduled operational summaries and approved campaign delivery.

Scheduled processing must account for the recipient's current eligibility, preferences, consent and the validity of the underlying business event at dispatch time.

### 11.6 Notification state

The system must maintain identifiable processing states.

Possible states include:

- Requested.
- Validated.
- Queued.
- Processing.
- Submitted to provider.
- Accepted by provider.
- Delivered.
- Failed.
- Cancelled.
- Suppressed.
- Expired.

The final state model must distinguish internal processing status from provider-reported delivery status.

### 11.7 Notification cancellation

Authorised workflows may cancel notifications that have not yet been submitted for delivery.

Cancellation must be traceable.

Once a provider has accepted a message, cancellation may no longer be possible. The platform must not claim successful cancellation unless the provider confirms it.

### 11.8 Processing isolation

A failure affecting one store or notification type should not unnecessarily prevent unrelated notification workflows from processing.

Queue organisation, concurrency limits and worker allocation should support appropriate isolation.

### 11.9 Transactional consistency

Where a business transaction must trigger a notification, the architecture should use reliable event publication or an equivalent mechanism to prevent events from being lost between database commit and message processing.

Notification delivery must not be treated as part of the authoritative business transaction unless a specific workflow explicitly requires that behaviour.

## 12. Delivery Reliability and Failure Management

### 12.1 Delivery guarantees

The platform must define delivery expectations for each notification classification and channel.

The architecture must not assume that every provider supports exactly-once delivery.

Where duplicate delivery is possible, idempotency and duplicate detection must reduce unintended repetition.

### 12.2 Idempotency

Notification requests must support idempotency where duplicate processing could cause repeated or harmful communication.

Idempotency keys must be associated with the originating event or workflow and relevant notification purpose.

The same business event may legitimately produce more than one distinct notification. Idempotency must not incorrectly suppress those separate communications.

### 12.3 Retry handling

Transient failures may be retried according to controlled retry policies.

Retry policies must consider:

- Provider response and error category.
- Maximum retry attempts.
- Retry intervals and backoff.
- Message expiry.
- Rate limits.
- Duplicate-delivery risk.
- Notification priority.

Permanent failures must not be retried indefinitely.

### 12.4 Dead-letter handling

Notifications that cannot be processed after the permitted recovery attempts must enter a controlled failure or dead-letter workflow.

Authorised operators must be able to investigate the failure and determine whether retry, correction, cancellation or another action is appropriate.

Reprocessing must preserve the original notification identity and relevant audit history.

### 12.5 Provider timeouts and uncertain outcomes

A timeout after submitting a message may leave its delivery outcome uncertain.

The system must not automatically assume that the provider did not accept the message.

Where provider capabilities allow, the system should query the existing provider reference or delivery status before resubmission.

Retries must account for the possibility that the original message was already accepted.

### 12.6 Rate limiting and throttling

The platform must respect provider rate limits and apply appropriate internal throttling.

Limits may apply at platform, store, channel, recipient or provider-account level.

One store's excessive notification activity must not unnecessarily exhaust shared delivery capacity for every other store.

### 12.7 Message expiry

Time-sensitive notifications may have an expiry period.

Expired notifications must not be delivered after their business purpose is no longer valid.

Expiry rules must be defined according to notification classification and originating workflow.

### 12.8 Delivery fallback

Alternative channels may be used only where the relevant communication policy permits fallback and the recipient is eligible for the alternative channel.

Fallback must not bypass consent, preferences, channel restrictions or security requirements.

### 12.9 Provider outages

Provider outages must be observable and handled through controlled recovery procedures.

The platform should support queue preservation, provider health monitoring and controlled resumption of delivery.

### 12.10 Recovery and reconciliation

The notification service must support reconciliation between internal submission records and provider delivery information.

Uncertain, missing or conflicting delivery outcomes must be identifiable for investigation.

Recovery must not silently create duplicate notifications or overwrite historical delivery evidence.

## 13. Notification Provider Integration Architecture

### 13.1 Provider abstraction

External notification providers must be accessed through controlled integration interfaces.

The notification domain must define internal contracts for message submission, delivery status retrieval, callback processing and provider error handling.

Provider-specific implementation details must remain isolated behind these interfaces.

### 13.2 Provider configuration

Provider configuration may include:

- Provider identity.
- Supported channels.
- Account or service references.
- Sender identities.
- Delivery limits.
- Environment association.
- Supported message capabilities.
- Health and status information.

Configuration must be scoped appropriately and must not expose private provider credentials.

### 13.3 Credential management

Provider credentials must remain in trusted server-side environments.

Credentials must be protected, access-controlled, revocable and subject to rotation.

They must never be embedded in browser-delivered frontend applications or included in publicly distributed store integration packages.

### 13.4 Store-specific provider configuration

The platform may support platform-wide provider accounts and approved store-specific provider accounts.

Where a provider account is shared, the platform must maintain reliable attribution of messages, provider costs, delivery outcomes and relevant store activity.

A store must not gain access to another store's provider credentials or private provider configuration.

### 13.5 Provider account ownership

The architecture must distinguish platform-owned provider accounts from store-owned or store-managed accounts.

Account ownership, billing responsibility, sender identity and operational responsibility must be explicitly configured.

The platform must not assume that a store owns a provider account merely because the store uses its delivery capabilities.

### 13.6 Provider selection and routing

The platform may route notifications through different providers based on channel, store configuration, availability, cost or approved operational policy.

Routing decisions must be controlled and observable.

Provider selection must not change the notification's classification, recipient eligibility or communication authority.

### 13.7 Webhook and callback processing

Provider callbacks must be authenticated and validated according to the provider's supported security mechanisms.

Callback processing must use trusted provider references and internal notification mappings.

A callback payload must not establish store ownership or internal authorisation merely by supplying a store identifier.

### 13.8 Callback reliability

Provider callback events must be persisted sufficiently to support recovery and investigation.

Duplicate callbacks must be handled idempotently.

Out-of-order callbacks must not incorrectly regress a notification's authoritative processing state.

### 13.9 Provider replacement

The architecture should permit a provider to be replaced or supplemented without changing unrelated business-domain workflows.

Provider replacement must consider in-flight notifications, queued messages, callback routing, delivery reconciliation and historical records.

### 13.10 Provider assessment

New providers must undergo technical, security, privacy, reliability and commercial assessment before production use.

Provider capabilities, service availability, data processing arrangements and operational dependencies must be documented.

## 14. Notification Security and Privacy

### 14.1 Backend authorisation

All administrative notification operations must be authorised by the backend.

Frontend visibility or possession of a store identifier must not grant permission to access notification records or initiate privileged communications.

### 14.2 Store isolation enforcement

The backend and database access layer must enforce store-scoped access to notification configuration, recipient information, message content and delivery history.

Store context must be derived from trusted authenticated or server-side request context and verified against current permissions.

### 14.3 Personal information protection

Notification processing must follow applicable data-protection requirements.

Personal information must be collected, used, transmitted and retained only for authorised purposes.

Access to recipient contact details and message content must be restricted to users and services with a legitimate operational need.

### 14.4 Sensitive message content

Sensitive authentication, financial, personal and business information must not be included unnecessarily in notification content.

Where a recipient needs to view sensitive information, the notification should direct them to an appropriately authenticated application workflow rather than expose the information in the message itself.

### 14.5 Authentication and verification messages

Authentication and account recovery notifications must follow the security requirements defined by the Identity and Access Architecture.

Verification codes, recovery links and security tokens must be protected against disclosure and misuse.

They must not be written to ordinary notification logs or exposed through administrative reporting.

### 14.6 Message rendering security

Dynamic message content must be escaped and rendered safely for the destination channel.

The system must prevent injection of executable markup, malicious links or unsafe content through untrusted dynamic values.

### 14.7 Administrative access

Access to notification templates, recipient data, provider configuration and message history must be permission-controlled.

Sensitive actions may require additional approval or stronger authentication according to the risk of the operation.

### 14.8 Support access

Support access to notification content and recipient information must be purpose-limited and recorded.

Where practical, access must be time-bound and restricted to the minimum information necessary to resolve the support issue.

### 14.9 Retention and deletion

Notification content, delivery metadata and audit records must follow approved retention requirements.

Deletion or anonymisation must account for applicable legal obligations, business records and provider-side copies.

Backups and recovery processes must be considered so that information subject to an approved deletion requirement is not unintentionally restored into active use.

### 14.10 Security incident handling

Suspected notification abuse, unauthorised bulk messaging, credential exposure or disclosure of recipient information must be handled through the platform's security incident procedures.

The architecture must support investigation through relevant audit and delivery records.

## 15. Notification Auditability and Observability

### 15.1 Notification audit records

The system must maintain records of significant notification actions.

Records should identify:

- Notification identifier.
- Originating domain or workflow.
- Platform or store context.
- Notification classification.
- Intended recipient reference.
- Delivery channel.
- Template identifier and version.
- Initiating service or authorised actor.
- Relevant processing timestamps.
- Provider reference where applicable.
- Final or current processing status.

### 15.2 Administrative activity

Administrative changes to templates, provider configuration, sender identities, routing rules and notification permissions must be auditable.

Records must identify the relevant actor, action, affected configuration and time of change.

### 15.3 Delivery observability

The platform must monitor notification processing and delivery performance.

Relevant measurements may include:

- Requested notifications.
- Queued notifications.
- Provider submissions.
- Accepted and delivered messages.
- Failed and expired messages.
- Suppressed messages.
- Retry counts.
- Provider response times.
- Queue age and processing delay.

Metrics must be interpreted according to the delivery capabilities of each provider and channel.

### 15.4 Operational alerting

The platform should alert authorised operators to significant delivery failures, provider outages, abnormal queue growth and potential notification abuse.

Alert routing must respect operational ownership and escalation rules.

### 15.5 Store-level reporting

Store Admins may receive authorised reports about their store's notification activity.

Reports must not expose another store's recipients, message content, provider configuration or delivery history.

### 15.6 Platform-level reporting

Authorised platform administrators may review platform-wide notification health and operational performance.

Access to store-specific content and personal information must remain subject to appropriate permissions and legitimate purpose.

### 15.7 Log protection

Logs must not contain passwords, authentication tokens, private provider credentials or unnecessary sensitive message content.

Log access, retention and export must be controlled.

### 15.8 Audit integrity

Notification audit records must be protected against unauthorised modification or deletion.

Corrections to notification metadata must preserve sufficient history to explain the original record and subsequent changes.

## 16. Notification Reporting and Performance

### 16.1 Reporting objectives

Notification reporting must help the platform and participating stores understand communication activity, delivery reliability and operational performance.

Reports must distinguish message requests, provider acceptance and confirmed delivery where those states are available.

### 16.2 Delivery metrics

The platform may measure:

- Submission success rate.
- Confirmed delivery rate.
- Failure rate.
- Retry rate.
- Suppression rate.
- Average delivery delay.
- Queue processing time.
- Provider availability.
- Cost per message where reliable cost information is available.

### 16.3 Store comparisons

Store-level notification performance comparisons must account for relevant differences in communication volume, channel mix, provider configuration and business activity.

Metrics must not be presented as direct indicators of store performance without appropriate context.

### 16.4 Cost reporting

Notification costs must be attributable to the correct platform or store context where reliable provider data permits.

Shared provider charges and platform-level costs must be distinguished from directly attributable store costs.

Cost allocation rules must remain configurable until formally approved.

### 16.5 Reporting freshness

Reports must identify relevant reporting periods and data freshness where delivery information may arrive late or be corrected.

Provider-reported delivery outcomes must not be treated as complete when the provider does not supply reliable confirmation.

### 16.6 Reporting access

Reporting access must follow platform and store permissions.

Exported reports must preserve the same data boundaries as the source reporting interfaces.

### 16.7 Reporting limitations

Open, clicked or read indicators may be unavailable, unreliable or affected by privacy protections and client behaviour.

The platform must distinguish observed provider events from assumptions about recipient behaviour.


## 17. Notification Testing Architecture

### 17.1 Testing objectives

Notification testing must verify that messages are correctly classified, authorised, generated, processed, delivered and recorded.

Testing must cover functional behaviour, security boundaries, provider integrations, reliability and failure recovery.

### 17.2 Unit testing

Unit tests must cover:

- Notification classification.
- Request validation.
- Recipient resolution.
- Store context enforcement.
- Template selection and rendering.
- Preference and consent evaluation.
- Channel selection.
- Idempotency handling.
- Retry and expiry rules.
- Notification state transitions.
- Provider response interpretation.

### 17.3 Integration testing

Integration tests must verify interactions between the notification domain and:

- Customer services.
- Identity and Access services.
- Store services.
- Commerce services.
- Finance services.
- Inventory services.
- Marketing services.
- External notification providers.
- Background processing infrastructure.

Tests must verify that originating business events produce the expected notification requests without changing authoritative business records.

### 17.4 Store isolation testing

Testing must verify that a store cannot access or manipulate another store's notification records, templates, recipients, provider settings or reports.

Tests must include attempts to bypass store boundaries through modified identifiers, request parameters and unauthorised API operations.

### 17.5 Authorisation testing

Tests must verify that Platform Super Admins, Store Admins and employees can perform only the notification operations permitted by their effective permissions.

Tests must include denied operations and attempts to escalate privileges through notification configuration or template management.

### 17.6 Consent and preference testing

Testing must verify that current preferences and applicable consent requirements are respected at dispatch time.

Scenarios must include:

- Consent withdrawal after notification creation.
- Preference changes while messages are queued.
- Store-specific preference boundaries.
- Marketing opt-out.
- Invalid or unavailable preference records.
- Provider-side suppression failures.

### 17.7 Provider integration testing

Provider integration tests must cover successful submission, rejection, timeouts, authentication failures, rate limits, duplicate callbacks and provider outages.

Test environments and provider sandboxes should be used where available.

Production credentials must not be exposed in test environments.

### 17.8 Reliability testing

Reliability testing must cover queue recovery, worker interruption, duplicate events, retry exhaustion, dead-letter processing, uncertain submission outcomes and provider recovery.

The tests must verify that recovery does not silently lose notifications or create uncontrolled duplicate delivery.

### 17.9 Security testing

Security testing must cover:

- Unauthorised notification access.
- Cross-store data exposure.
- Privileged credential disclosure.
- Message content injection.
- Malicious links and dynamic content.
- Authentication notification security.
- Bulk messaging abuse.
- Sensitive information in logs and exports.
- Provider callback verification.

### 17.10 End-to-end testing

End-to-end tests must verify representative customer, store and platform workflows from the originating business event through notification processing and delivery status recording.

### 17.11 Regression testing

Changes to notification templates, channels, providers, preferences or processing rules must include regression testing for existing supported notification workflows.

### 17.12 Production readiness

Before production release, critical notification workflows must be tested for both successful and denied operations.

Provider failure handling, security controls, consent enforcement, monitoring and recovery procedures must be verified.

A successful build alone is insufficient evidence of notification readiness.

## 18. Migration from the Existing Yotaabo Application

### 18.1 Migration objectives

Notification migration must introduce shared platform notification capabilities without disrupting existing Yotaabo customer and operational workflows.

The migration must preserve existing communication behaviour unless an intentional and approved change is introduced.

### 18.2 Existing notification assessment

Before migration, the existing application must be assessed for:

- Email delivery.
- SMS or other messaging integrations.
- Existing templates.
- Sender identities.
- Customer communication preferences.
- Provider credentials and configuration.
- Scheduled messages.
- Delivery callbacks.
- Existing notification history.
- Failure and retry behaviour.

The actual production implementation must be established through repository and environment inspection.

### 18.3 Notification inventory

Existing notification workflows must be documented and mapped to their intended notification classifications and target platform modules.

Unnecessary, duplicated or obsolete notification workflows should be identified before migration.

### 18.4 Provider continuity

Existing provider accounts and sender identities must remain operational during migration unless a controlled replacement has been approved.

Provider credentials must be transferred through secure configuration processes and must not be copied into frontend code or source control.

### 18.5 Template migration

Existing templates must be reviewed before migration.

Their content, dynamic variables, branding, language and delivery behaviour must be verified against the target template model.

### 18.6 Preference migration

Existing customer preferences and consent records must be preserved and migrated with their available scope, source and effective timestamps.

Missing or ambiguous preference data must be identified rather than silently converted into assumed consent.

### 18.7 Delivery history migration

Existing notification history should be retained or migrated where it has continuing operational, customer service, audit or legal value.

Historical provider references and delivery outcomes must not be presented as newly generated platform notifications.

### 18.8 Incremental migration

Notification workflows may be migrated individually.

The existing production implementation must remain authoritative for workflows that have not yet been migrated.

### 18.9 Avoiding competing delivery paths

The migration must define which implementation is authoritative for each notification workflow.

The same originating event must not unintentionally trigger delivery through both the existing and target systems.

Where temporary coexistence is necessary, routing and idempotency controls must prevent uncontrolled duplicate delivery.

### 18.10 In-flight notifications

The migration plan must account for queued notifications, scheduled messages, pending provider submissions, callbacks and uncertain delivery outcomes.

In-flight work must be reconciled before changing the authoritative processing path.

### 18.11 Rollback

Rollback planning must identify the authoritative notification implementation, queued work, provider references, callback routing and delivery history.

Rollback must not result in duplicate messages or loss of important notification records.

### 18.12 Migration verification

Each migrated workflow must be tested for request generation, recipient eligibility, content correctness, provider submission, delivery tracking and failure recovery.

Existing Yotaabo storefront and administrative functionality must remain operational throughout the migration.

## 19. Non-Functional Requirements

### 19.1 Availability

Notification services should be available according to the operational importance of their supported workflows.

Critical security and transactional notification workflows may require different availability expectations from optional operational summaries or marketing communications.

Specific availability targets remain open decisions.

### 19.2 Performance

Notification requests should be accepted and processed without unnecessarily delaying the originating business transaction.

The architecture must support asynchronous delivery where appropriate.

Specific latency and throughput targets require measurement and approval.

### 19.3 Scalability

The notification service must support increasing numbers of stores, recipients, messages, channels and provider integrations.

Scaling must account for shared provider limits and store-level workload isolation.

### 19.4 Reliability

The system must preserve notification processing records and support recovery from application, infrastructure and provider failures.

### 19.5 Maintainability

Notification channels and provider integrations must be modular and maintainable.

Business rules must remain separate from provider-specific delivery implementation.

### 19.6 Extensibility

New notification types, templates, channels and provider integrations should be introduced through controlled extension of existing capabilities.

### 19.7 Observability

The platform must provide sufficient monitoring, logging and metrics to investigate delivery failures, processing delays and abnormal communication activity.

### 19.8 Privacy

Notification processing must minimise personal information exposure and enforce approved retention and access requirements.

### 19.9 Cost efficiency

The architecture should support monitoring and controlling provider costs, unnecessary retries, duplicate delivery and excessive message volume.

### 19.10 Compatibility

Notification interfaces and event contracts must evolve through controlled versioning and migration practices.

## 20. Architectural Constraints

The notification architecture must comply with the following constraints:

- Shared notification infrastructure must support all participating stores.
- Platform and store communication ownership must remain distinct.
- Store isolation must be enforced by backend authorisation and data-access controls.
- Customer preferences and consent must remain authoritative in the Customer domain.
- Marketing campaign decisions must remain governed by the Marketing domain.
- Business transaction records must remain authoritative in their originating domains.
- Provider credentials must remain server-side.
- Browser-delivered configuration must not grant privileged access.
- Notification delivery must not imply business approval or acknowledgement.
- Provider callbacks must be authenticated and validated.
- Duplicate processing and uncertain delivery outcomes must be handled explicitly.
- Notification history and audit records must remain traceable.
- Existing Yotaabo production workflows must be protected during migration.
- Provider-specific behaviour must remain isolated behind controlled integration interfaces.
- No final provider, channel, cost or retention assumptions may be introduced without approval.

## 21. Open Notification Architecture Decisions

The following decisions remain subject to further specification and approval.

| Decision area | Open question |
|---|---|
| Initial channels | Which notification channels must be supported at initial launch? |
| Email provider | Which email delivery provider will be selected? |
| SMS provider | Which SMS provider will be selected, if required? |
| Push infrastructure | Which browser or mobile push infrastructure will be used? |
| In-app notifications | What notification centre capabilities are required initially? |
| Provider ownership | Which provider accounts will be platform-owned or store-managed? |
| Sender identities | What verification and approval process will govern store sender identities? |
| Template model | Which template engine and storage model will be used? |
| Template approval | Which template classifications require platform approval? |
| Localisation | Which languages and locales must be supported initially? |
| Preference model | How will platform-wide and store-specific preferences interact? |
| Delivery guarantees | What delivery expectations apply to each notification classification? |
| Retry policies | What retry limits, intervals and expiry periods will apply? |
| Idempotency | What identifiers and retention periods will be used for deduplication? |
| Queue infrastructure | Which background processing and queue technology will be selected? |
| Provider routing | Will multiple providers be supported per channel? |
| Cost allocation | How will shared provider costs be attributed to stores? |
| Retention | What retention periods apply to notification content and delivery records? |
| Reporting | Which notification metrics and reports are required at launch? |
| Migration | Which existing Yotaabo notification workflows will migrate first? |

These decisions must be resolved through the appropriate architecture decisions, implementation planning and business approval processes.

No provider, cost, consent or operational policy should be treated as approved solely because it appears as an example in this document.

## 22. Relationship to Other Documents

The Notification Architecture must be read alongside:

- System Architecture.
- Application Architecture.
- Data Architecture.
- API Architecture.
- Identity and Access Architecture.
- Security Architecture.
- Store Architecture.
- Operations Architecture.
- Integration Architecture.
- Customer Architecture.
- Commerce Architecture.
- Inventory Architecture.
- Finance Architecture.
- Marketing Architecture.
- Performance Architecture.
- Product Catalogue Architecture.
- Deployment Architecture.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.
- Product Vision.

The Notification Architecture defines notification processing and delivery responsibilities.

It does not replace the business authority, data ownership, consent rules, security controls or operational procedures established by these related documents.

Where responsibilities overlap, the authoritative domain document governs the underlying business rule.

## 23. Architecture Governance

### 23.1 Ownership

The platform architecture owner is responsible for maintaining this document and ensuring that notification architecture remains aligned with the overall platform direction.

### 23.2 Approval

Material changes to notification architecture must be reviewed and approved through the platform's architecture governance process.

### 23.3 Change management

Changes to notification channels, provider integrations, data handling, consent enforcement or store isolation must undergo appropriate impact and security assessment.

### 23.4 Documentation maintenance

This document must be updated when approved architectural decisions materially change notification responsibilities, interfaces, security boundaries or operational requirements.

### 23.5 Implementation alignment

Implementations must follow the approved architecture and must not introduce undocumented notification delivery paths, provider dependencies or store access exceptions.

### 23.6 Exception management

Any exception to the architecture must have a documented purpose, scope, owner, risk assessment and approval.

### 23.7 Periodic review

The notification architecture should be reviewed periodically and when significant platform, provider, legal or operational changes occur.
