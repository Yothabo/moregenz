# Operations Runbook

## Document Control

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-08 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-OPS-50BCC8FCF7 |
| Category | Operations |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This runbook defines the practical procedures for operating, monitoring and supporting the shared retail platform.

It translates the platform's operational architecture and governance requirements into repeatable activities for the Platform Owner, authorised platform administrators, Store Admins and delegated operational personnel.

It covers routine operations, platform and store administration, incident response, service continuity, security-related operations, financial controls and operational recordkeeping.

This document does not replace technical architecture, security policies, governance requirements or provider-specific procedures.

## 2. Operational Objectives

Platform operations must:

- Maintain availability of shared platform services.
- Protect each store's operational independence and data.
- Preserve the integrity of products, inventory, orders and financial records.
- Maintain controlled access to platform and store capabilities.
- Detect and respond to service failures and security incidents.
- Support store administrators without unnecessarily interfering with ordinary store operations.
- Maintain reliable integrations and background processing.
- Preserve operational evidence and accountability.
- Support controlled onboarding, changes, recovery and store expansion.

## 3. Operational Principles

### 3.1 Clear Ownership

Every operational activity must have an identifiable responsible person or role.

Platform-level responsibilities and store-level responsibilities must remain distinct.

### 3.2 Least Privilege

Personnel must receive only the access required for their assigned responsibilities.

Privileged access must be controlled, reviewed and revoked when no longer required.

### 3.3 Store Isolation

Operational procedures must preserve store boundaries.

Platform personnel must not assume that platform-wide access grants unrestricted authority to perform ordinary store operations.

### 3.4 Controlled Changes

Production changes must follow the applicable approval, testing and deployment procedures.

Urgent protective actions may be taken when necessary to limit immediate harm, with appropriate recording and review.

### 3.5 Evidence and Accountability

Material operational actions must be recorded sufficiently to establish who acted, what changed, when it happened and why.

### 3.6 Recovery Before Convenience

When operational integrity is at risk, prioritise protecting data, transactions and access boundaries over restoring convenience or speed.

### 3.7 Human Oversight

Financial adjustments, stock or capital assistance, serious access restrictions and other material business decisions require authorised human review.

Automated alerts or performance indicators must not independently authorise such decisions.

## 4. Operational Roles and Responsibilities

### 4.1 Platform Owner

The Platform Owner is accountable for the overall operation of the platform.

Responsibilities include:

- Platform-level administration and oversight.
- Appointment and control of platform administrators.
- Approval of material platform changes.
- Oversight of security, availability and continuity.
- Coordination of major incidents.
- Approval of platform-level financial and commercial decisions.
- Review of store performance and operational risks.
- Ensuring operational responsibilities are assigned.

### 4.2 Platform Super Admin

The Platform Super Admin performs authorised platform-level administration.

Responsibilities may include:

- Creating and configuring stores.
- Managing platform-level settings.
- Administering authorised platform accounts.
- Initiating store provisioning.
- Monitoring shared platform services.
- Supporting store administrators.
- Managing authorised platform-level integrations.

A Super Admin must remain within the authority granted by the platform governance model.

### 4.3 Store Admin

The Store Admin is responsible for ordinary operations within their assigned store.

Responsibilities include:

- Store profile and operational settings.
- Product listings and commercial terms.
- Store inventory and stock movements.
- Store orders and fulfilment.
- Store customer operations.
- Store employees and delegated permissions.
- Store financial records and reconciliation.
- Store-specific marketing and notifications.
- Reporting operational issues.

### 4.4 Store Employees

Store employees perform activities assigned through delegated permissions.

They must not exceed their authorised scope or use another person's credentials.

### 4.5 Technical and Support Personnel

Technical and support personnel perform assigned maintenance, troubleshooting and support activities.

Access to production systems and store data must be purpose-limited, authorised, appropriately recorded and revoked when no longer required.

## 5. Operational Ownership Boundaries

### 5.1 Shared Platform Services

The platform operations function is responsible for shared infrastructure, central services, platform security controls, common integrations and platform-wide monitoring.

### 5.2 Store Operations

Each Store Admin remains responsible for ordinary commercial and operational decisions within their store.

### 5.3 Shared Responsibilities

Some activities require coordination between platform and store personnel.

Examples include:

- Store onboarding and provisioning.
- Shared catalogue changes.
- Platform-wide incidents affecting stores.
- External provider failures.
- Financial reconciliation involving platform and store transactions.
- Store suspension or reactivation.
- Migration and production cutover.

The responsible parties and approval requirements must be established before execution.

### 5.4 No Implied Authority

Operational support does not automatically grant authority to approve financial transactions, change store ownership, alter commercial agreements or access unrelated store information.

## 6. Operational Records

### 6.1 Required Records

Maintain appropriate records for:

- Production deployments and configuration changes.
- Store creation, activation and suspension.
- Privileged access and permission changes.
- Incidents and service interruptions.
- Data migrations and recovery operations.
- Financial reconciliation and adjustments.
- Integration failures and provider escalations.
- Support access and material interventions.
- Security events and investigations.
- Operational reviews and corrective actions.

### 6.2 Record Quality

Records must be accurate, attributable and sufficiently detailed for later investigation.

Sensitive information, authentication secrets and unnecessary personal data must not be included in operational notes.

### 6.3 Retention

Operational records must follow approved retention requirements and applicable legal obligations.

### 6.4 Review

Material operational records must be reviewed by the responsible authority where approval, escalation or corrective action is required.


## 7. Daily Platform Operations

### 7.1 Service Health

Review the health of critical shared services.

Check:

- Frontend availability.
- Backend and API availability.
- Database connectivity and health.
- Authentication services.
- File and media storage.
- Background workers and scheduled jobs.
- External provider connectivity.
- Error rates and unusual response times.

Investigate material failures and record unresolved issues.

Monitoring architecture, observability requirements, health checks, alert definitions and technical monitoring controls are governed by `PLATFORM_MONITORING_OBSERVABILITY_AND_ALERTING_STANDARDS.md`. Operational alert acknowledgement, handling and escalation are governed by `PLATFORM_MONITORING_ALERTING_AND_ESCALATION_STANDARDS.md`. The daily checks in this runbook do not replace those requirements.

### 7.2 Background Processing

Monitor scheduled and asynchronous processing.

Review failed, delayed and repeatedly retried jobs.

Confirm that failed operations have not resulted in duplicate transactions, missing notifications or inconsistent business records.

### 7.3 Integration Health

Review the status of critical integrations.

Check provider connectivity, webhook processing, authentication failures, delivery failures and outstanding reconciliation work.

Escalate failures that affect payments, orders, customer communication or other critical workflows.

### 7.4 Capacity and Resource Usage

Monitor database capacity, storage consumption, API traffic and infrastructure resource utilisation.

Investigate unusual increases and identify capacity risks before they affect service availability.

### 7.5 Operational Review

Record material findings, assign responsible personnel and track corrective actions until resolution.

## 8. Store Administration Operations

### 8.1 Store Creation

Only authorised Platform Super Admin personnel may create stores.

Before creation, confirm the required store identity and configuration information.

The store-creation workflow must initiate the required integration-package provisioning process.

Verify that the store record and provisioning status are available for administrative review.

### 8.2 Provisioning Verification

Confirm that the generated integration package:

- References the correct store.
- Contains the required public configuration.
- Identifies the correct API environment and base URL.
- Provides the required API and catalogue documentation.
- Includes relevant frontend connection instructions.
- Does not expose private credentials.
- Can be securely handed to the authorised frontend developer.

Failed provisioning must be investigated and recovered through the controlled provisioning process.

### 8.3 Store Activation

Before activation, verify store identity, authorised Store Admin access, required configuration, integration readiness and operational acceptance.

Do not activate a store merely because its database record exists.

### 8.4 Store Configuration Changes

Store configuration changes must be authorised and recorded.

Assess whether a change affects the storefront, API access, domain configuration, integrations, notifications or other shared services.

### 8.5 Store Suspension

Ordinary store suspension must follow the applicable governance and approval process.

Emergency protective suspension may be used where necessary to contain an immediate security, fraud, legal or operational threat.

Record the initiator, reason, scope, time and authority for emergency action. Arrange prompt review.

### 8.6 Store Reactivation

Before reactivation, confirm that the reason for suspension has been addressed.

Verify access, configuration, integrations, outstanding obligations and operational readiness.

### 8.7 Store Deactivation and Historical Access

Deactivation must not automatically delete historical orders, customer records, financial evidence or audit records.

Preserve access and retention arrangements according to approved policy and applicable obligations.

## 9. User and Access Administration

### 9.1 Account Creation

Create or invite users through approved identity-management procedures.

Verify that the intended person is associated with the correct platform or store context.

### 9.2 Permission Assignment

Assign permissions according to actual job responsibilities.

Store Admins may delegate permissions within their authorised store scope and must not grant authority beyond their own permitted delegation boundaries.

### 9.3 Privileged Access

Platform-level and other privileged access must be limited to authorised personnel.

Use additional approval and verification for sensitive administrative actions where required.

### 9.4 Access Review

Review active accounts, memberships and privileged permissions periodically and when personnel change responsibilities.

### 9.5 Access Revocation

Revoke access promptly when a user leaves, changes responsibilities, loses authorisation or is suspected of compromise.

Verify that relevant sessions, tokens and other access mechanisms are invalidated according to the identity architecture.

### 9.6 Lost or Compromised Accounts

Follow the approved account recovery and security incident procedures.

Do not bypass identity verification or grant replacement access solely on an informal request.

### 9.7 Support Access

Support access must have a defined purpose, authorised scope and limited duration.

Sensitive access should receive additional approval where practical.

Record the access granted, activities performed and time of revocation.

## 10. Product and Catalogue Operations

### 10.1 Product Source Records

Identify whether a product's source information is platform-owned or store-owned.

Only the authorised owner may change protected source identity and descriptive information.

### 10.2 Store Product Listings

A store may manage its own product availability, pricing, commercial terms and listing status within its authority.

Changes to a store listing must not silently modify another store's listing.

### 10.3 Shared Products

Sharing a product does not transfer ownership.

Verify that the receiving store has authorised access and that the product is available for listing.

### 10.4 Product Changes

Material changes to product identity, variants, SKU information, descriptions or media must follow the applicable ownership and approval rules.

### 10.5 Product Removal

Removing a product from a store must not automatically delete its source record or historical order references.

Check for active listings, orders and inventory dependencies before destructive actions.

### 10.6 Catalogue Verification

Investigate incorrect product visibility, missing images, inaccurate pricing and unauthorised cross-store catalogue access.

Prioritise issues that could mislead customers or expose restricted information.

## 11. Inventory Operations

### 11.1 Stock Updates

Inventory changes must be recorded against the correct store and applicable product variant or stock location.

### 11.2 Stock Movements

Record receipts, sales, adjustments, returns, transfers and other stock movements using the approved movement procedures.

### 11.3 Stock Counts

Store Admins must coordinate stock counts and investigate material differences between physical and recorded quantities.

### 11.4 Stock Transfers

Transfers between stores must have explicit authorisation, source and destination records, quantities and movement status.

Do not treat a transfer as a simple change to one store's stock balance.

### 11.5 Reserved Stock

Review outstanding reservations and investigate expired, abandoned or inconsistent reservations.

Ensure that reservation release and order processing remain consistent.

### 11.6 Stock Assistance

Platform-provided stock assistance must follow an authorised agreement and documented approval.

Record ownership, value, obligations, movement and any repayment or settlement arrangements.

### 11.7 Inventory Discrepancies

Investigate unexplained negative stock, duplicate movements, missing receipts and inconsistencies between orders and inventory.

Preserve original movement records and use authorised adjustments rather than silently overwriting history.

## 12. Order and Fulfilment Operations

### 12.1 Order Monitoring

Monitor order creation, payment status, fulfilment progress, cancellations and exceptions.

### 12.2 Order Ownership

Confirm that every order is associated with the correct store.

Store personnel must not access or modify another store's orders without explicitly authorised platform-level authority.

### 12.3 Payment Status

Use verified provider or trusted internal transaction evidence to establish payment status.

A customer-facing message or frontend response alone must not be treated as proof of payment.

### 12.4 Fulfilment

Store personnel are responsible for fulfilment within their assigned store and authorised workflows.

Record dispatch, delivery, collection and other fulfilment events accurately.

### 12.5 Cancellations and Returns

Follow approved cancellation and return procedures.

Verify order status, inventory implications, payment state and required approvals before applying changes.

### 12.6 Refunds and Disputes

Refunds and payment disputes must be handled as distinct processes.

Verify provider status and preserve transaction history.

A chargeback or dispute must not automatically be treated as a refund, cancellation or inventory restoration.

### 12.7 Order Exceptions

Escalate stuck payments, inconsistent order states, duplicate submissions, missing fulfilment events and unresolved customer-impacting failures.


## 13. Customer Operations

### 13.1 Customer Records

Customer records must be accessed and managed within the authorised store context.

Personnel must use customer information only for legitimate operational purposes.

### 13.2 Customer Support

Customer enquiries must be directed to the responsible store unless the issue concerns shared platform services.

Support personnel must avoid disclosing information belonging to another customer or store.

### 13.3 Customer Data Corrections

Correct customer information through authorised procedures.

Material corrections must preserve appropriate audit history.

### 13.4 Privacy Requests

Requests involving access, correction, deletion or restriction of personal information must follow the applicable privacy procedures.

Verify the requester and assess legal retention obligations before making changes.

### 13.5 Customer Communication

Use approved communication channels and respect recorded customer preferences and consent.

Do not send marketing communications merely because a customer has an active order or account.

## 14. Financial Operations

### 14.1 Financial Separation

Maintain clear separation between platform finances and individual store finances.

Store revenue, expenses, liabilities and obligations must not be treated as platform revenue or expenses without an appropriate recorded basis.

### 14.2 Transaction Records

Ensure financial records reference the relevant store, transaction, currency, amount and applicable business event.

Preserve original transaction evidence.

### 14.3 Reconciliation

Perform reconciliation between internal records and relevant external provider statements, payment records, settlements and bank information.

Investigate unexplained differences.

### 14.4 Adjustments

Financial corrections must be recorded as authorised adjustments.

Do not silently overwrite original transactions or remove evidence of previous financial activity.

### 14.5 Separation of Duties

Where practical, separate the person investigating a financial discrepancy from the person approving and posting its correction.

Where separation is not practical, record the compensating review.

### 14.6 Platform Commissions

Apply only approved commission terms and calculation rules.

Do not assume a default rate, calculation basis or settlement schedule.

### 14.7 Stock and Capital Assistance

Record assistance as an explicit arrangement.

Distinguish stock supplied, capital advanced, repayments, ownership, outstanding obligations and any agreed commercial terms.

### 14.8 Financial Reporting

Reports must identify their scope, source, currency, reporting period and relevant limitations.

Store and platform figures must remain distinguishable.

### 14.9 Financial Escalation

Escalate unexplained material balances, suspected fraud, duplicate charges, settlement failures and unauthorised adjustments.

## 15. Integration Operations

### 15.1 Provider Configuration

Maintain provider configuration and credentials through approved secure procedures.

Do not expose private credentials in frontend configuration, source repositories, support messages or operational documentation.

### 15.2 Provider Availability

Monitor provider health and identify failures affecting payments, notifications, storage or other dependent workflows.

### 15.3 Webhook Processing

Verify webhook authenticity and process events through the authorised integration path.

Confirm that events are durably recorded before acknowledging successful receipt.

### 15.4 Failed Webhooks

Investigate failed, delayed and repeatedly delivered webhook events.

Retries must not create duplicate transactions or business actions.

### 15.5 Uncertain Outcomes

When a provider request times out after submission, treat the outcome as uncertain.

Check the provider or trusted transaction record using the relevant reference or idempotency key before retrying.

### 15.6 Provider Credential Rotation

Rotate credentials through a controlled procedure.

Verify the replacement credential before retiring the previous one, where the provider supports a safe overlap.

### 15.7 Provider Changes

Assess provider API changes, account changes, pricing changes and service retirement notices.

Plan and test changes before applying them to production.

### 15.8 Integration Reconciliation

Reconcile provider events and transaction records when processing failures, outages or delayed callbacks may have caused inconsistencies.

## 16. Notification Operations

### 16.1 Delivery Monitoring

Monitor email, SMS, push and in-app notification processing where those channels are enabled.

### 16.2 Failed Delivery

Investigate provider rejection, invalid destination details, rate limits and repeated delivery failures.

### 16.3 Template Changes

Only authorised personnel may modify templates within their ownership and approval scope.

Verify that changes preserve required business information and do not expose sensitive data.

### 16.4 Consent and Preferences

Respect the latest authoritative customer consent and communication preferences before dispatch.

A customer opt-out must not be ignored because the recipient was selected earlier.

### 16.5 Duplicate Notifications

Investigate repeated notifications and verify idempotency and event-processing behaviour.

### 16.6 Critical Communications

Security, payment and other operational notifications must use their approved delivery and escalation procedures.

Marketing communication rules must not override transactional or security requirements.

## 17. Incident Management

This section defines the operational routing of incidents. Mandatory incident governance is defined by `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md`. Operational response procedures are defined by `INCIDENT_RESPONSE_PLAYBOOK.md`.

The incident management standard is authoritative for severity definitions, Incident Lead accountability, the mandatory incident lifecycle, affected-audience communication, recovery declaration, closure and post-incident review requirements.

The playbook is authoritative for triage, containment, investigation, eradication, evidence preservation, technical recovery and specialist incident procedures.

### 17.1 Initial Identification

An incident may be identified through monitoring, personnel reports, customer reports, provider notifications or security alerts.

Record the available facts, detection time, affected service or store and known operational impact. Do not delay urgent protective action while waiting for a complete report.

### 17.2 Incident Assignment and Routing

An Incident Lead MUST be assigned and recorded for every incident, regardless of severity.

Classify the incident using the incident management standard. Do not introduce a separate severity scheme or substitute an informal incident owner.

Refer responders to the incident response playbook for the applicable operational procedures.

### 17.3 Operational Coordination

The Incident Lead coordinates incident response and communications within the authority assigned to that role.

Platform and Store Admin personnel must provide relevant operational information and support without exceeding their delegated authority.

Urgent protective action may be taken by an authorised responder where delay would increase harm. Record the action, reason, initiator and outcome, and arrange the required review.

All incident communications, recovery declarations, closure decisions and post-incident reviews MUST follow the incident management standard.

This runbook does not establish alternative incident response or closure requirements.

## 18. Security Operations

This section covers routine operational security activities. Security architecture and approved security policies remain authoritative for technical security requirements. Active security incidents MUST be handled under `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md` and `INCIDENT_RESPONSE_PLAYBOOK.md`.

### 18.1 Routine Security Monitoring

Review relevant authentication failures, unusual privileged activity, access changes, suspicious API behaviour and other security events.

Investigate material anomalies through authorised procedures and preserve relevant references for further assessment.

### 18.2 Access and Configuration Controls

Review privileged settings, production access, public endpoints, storage permissions and secret exposure risks according to the applicable security and identity requirements.

Revoke access and rotate credentials through controlled procedures when authorised and necessary.

### 18.3 Vulnerability Handling

Record reported vulnerabilities and refer them for assessment under the applicable security and change-management processes.

Prioritise vulnerabilities affecting authentication, authorisation, store isolation, payment integrity and sensitive information.

### 18.4 Suspected Security Incidents

Suspected account compromise, unauthorised access, data exposure or active exploitation MUST be escalated through the incident process.

Responders must use the incident response playbook for containment, investigation, evidence preservation, recovery and specialist procedures.

This runbook does not establish separate security incident notification, containment or recovery rules.

### 18.5 Security Review

Material security incidents and significant access-boundary changes must receive the reviews required by the applicable security and incident governance documents.

## 19. Backup and Recovery Operations

Technical backup, restoration and disaster recovery procedures are governed by `BACKUP_AND_DISASTER_RECOVERY.md`.

Business continuity priorities, critical service decisions, continuity responsibilities and stakeholder communication are governed by `PLATFORM_BUSINESS_CONTINUITY_AND_DISASTER_RECOVERY_PLAN.md`.

This section provides operational coordination guidance only. It does not establish separate backup schedules, retention periods, recovery objectives or technical restoration instructions.

### 19.1 Recovery Need Identification

Identify the affected service, store, dataset or infrastructure and the reason recovery may be necessary.

Preserve relevant incident, deployment, provider and operational records.

### 19.2 Recovery Authorisation and Handover

Refer the recovery requirement to the authority responsible for the affected service and follow the applicable business continuity and incident procedures.

Technical restoration MUST be performed by authorised personnel using the technical backup and disaster recovery plan.

Do not initiate an improvised restoration or select a recovery point without following the governing technical procedure.

### 19.3 Recovery Coordination

Coordinate the operational impact, affected stores, required personnel and business decisions with the Incident Lead or designated continuity authority.

Technical recovery verification and reconciliation MUST follow the technical recovery plan and incident response requirements.

### 19.4 Recovery Records

Ensure that the recovery record identifies the authorisation, affected scope, responsible personnel, relevant recovery reference, outcome, verification evidence and unresolved risks.

Do not treat restored infrastructure health alone as proof that all business operations and transactions are reconciled.

## 20. Deployment and Change Operations

Production release, deployment approval, release controls and deployment execution are governed by `PLATFORM_RELEASE_AND_DEPLOYMENT_GOVERNANCE_STANDARDS.md` and the applicable change-management requirements.

This runbook provides operational coordination guidance and does not create a competing release approval or deployment process.

### 20.1 Deployment Authority

Production deployments and material configuration changes MUST follow the approved release and change governance procedures.

Only authorised personnel may perform the assigned deployment activities.

### 20.2 Operational Readiness

Before a deployment, confirm that the responsible personnel can identify:

- The approved release and deployment record.
- The affected services and stores.
- Required approvals and outstanding conditions.
- Relevant database migrations and dependencies.
- Required backup and recovery arrangements.
- The applicable deployment and verification procedures.
- The responsible technical and operational contacts.

The governing release procedure determines the required gates and acceptance criteria.

### 20.3 Deployment Coordination

Coordinate application releases, database migrations, background processing and affected shared services to avoid conflicting operational changes.

Record material deployment activity through the approved change and release records.

### 20.4 Post-Deployment Operations

Perform the post-deployment checks required by the release procedure.

Record material failures, unexpected behaviour and unresolved risks.

### 20.5 Failed Deployment

A failed deployment MUST be handled under the approved deployment recovery procedure.

Where it causes an incident or material service disruption, invoke the incident management standard and incident response playbook.

Do not improvise an alternative rollback or recovery process from this runbook.

## 21. Service Continuity

Business continuity governance, critical service priorities, continuity responsibilities, manual continuity decisions and stakeholder communication are governed by `PLATFORM_BUSINESS_CONTINUITY_AND_DISASTER_RECOVERY_PLAN.md`.

Technical backup, restoration and disaster recovery execution are governed by `BACKUP_AND_DISASTER_RECOVERY.md`.

### 21.1 Routine Continuity Readiness

Maintain awareness of dependencies on hosting, databases, identity providers, payment providers, communication services, storage and other external systems.

Report material dependency changes and operational risks through the applicable governance process.

### 21.2 Provider Disruption

When an external provider is unavailable, identify the affected services and business workflows.

Treat uncertain transaction outcomes as unresolved until verified through the provider or trusted transaction records.

Communicate material service limitations through the approved incident and continuity communication procedures.

### 21.3 Manual Workarounds

Manual workarounds may be used only when authorised and when they preserve sufficient transaction evidence and data integrity.

The business continuity plan governs continuity decisions. Reconciliation with platform records must be completed through the applicable operational and financial procedures.

### 21.4 Extended Disruption

For prolonged disruption, refer continuity activation, service prioritisation, responsibilities and stakeholder communication to the business continuity plan.

Where an incident is active, the Incident Lead coordinates the response in accordance with the incident management standard.

### 21.5 Continuity Review

Review operational readiness after material provider changes, major incidents, recovery exercises and significant architecture changes.

Do not establish or imply unapproved recovery targets or continuity commitments in this runbook.

## 22. Performance and Capacity Operations

### 22.1 Performance Monitoring

Monitor API response times, database performance, frontend availability, background processing and external provider latency.

### 22.2 Store-Level Impact

Investigate whether performance degradation affects one store or shared platform services.

Avoid treating a store-specific configuration problem as a platform-wide failure without evidence.

### 22.3 Capacity Planning

Review usage trends, storage growth, transaction volumes and expected store expansion.

Plan capacity changes before resource constraints affect critical workflows.

### 22.4 Performance Incidents

Prioritise performance problems according to user impact and business criticality.

Record the cause and any temporary mitigation.

### 22.5 Performance Reviews

Performance indicators may support operational reviews but must not independently trigger financial penalties, stock or capital decisions, access restrictions or store suspension.

Material decisions require human review and documented justification.

## 23. Store Support and Escalation

`STORE_SUPPORT_AND_ESCALATION_POLICY.md` is authoritative for support categories, request information, priority classification, support channels, support lifecycle, escalation levels, service expectations, complaints and support records.

This runbook defines only the operational boundaries and routing principles needed by platform personnel.

### 23.1 Operational Routing

Ordinary store-level questions and operational issues should be directed to the responsible Store Admin.

Issues involving shared platform services, platform configuration or central technical support should be routed through the approved platform support process.

### 23.2 Specialist and Incident Escalation

Security, privacy, suspected fraud, financial integrity and cross-store access issues MUST be escalated through the applicable incident and specialist procedures.

A support request must not delay urgent protective action where an authorised response is necessary.

### 23.3 Support Authority Boundaries

Support personnel must not make unauthorised commercial decisions, alter financial records, change store ownership or bypass store-level permissions to resolve ordinary requests.

Support access to production systems must remain authorised, purpose-limited and recorded.

### 23.4 Resolution and Handover

Record material investigation findings, actions, decisions and unresolved risks through the approved support or incident record.

When an issue is transferred to another person or process, preserve the relevant context and confirm who is responsible for the next action.

Support must not be treated as complete solely because an issue has been referred to another team.

## 24. Operational Reviews

### 24.1 Platform Review

Review shared service availability, security events, incidents, deployment history, capacity, integration health and outstanding operational risks.

### 24.2 Store Review

Review store operations with the relevant Store Admin.

Topics may include product availability, inventory accuracy, orders, fulfilment, customer issues, financial reconciliation and operational support.

### 24.3 Financial Review

Review platform and store financial records separately.

Investigate unresolved balances, outstanding obligations, settlements and material adjustments.

### 24.4 Corrective Actions

Record identified actions with an owner, expected outcome and review status.

### 24.5 Review Records

Maintain sufficient evidence of the review, material findings, decisions and follow-up actions.

## 25. Operational Metrics and Reporting

### 25.1 Service Metrics

Monitor relevant measures such as availability, error rates, response times, job failures and recovery performance.

### 25.2 Operational Metrics

Track relevant operational measures including order-processing failures, inventory discrepancies, integration failures, support requests and unresolved incidents.

### 25.3 Store Attribution

Reports must distinguish platform-wide metrics from store-specific metrics.

### 25.4 Metric Interpretation

Document metric definitions, reporting periods, source systems and known limitations.

### 25.5 Reporting Access

Restrict operational reports according to their sensitivity and intended audience.

Store-specific reports must not expose another store's restricted information.

## 26. Operational Constraints and Open Decisions

### 26.1 Operational Constraints

Operations depend on available personnel, provider capabilities, hosting arrangements, budget and technical maturity.

Procedures must reflect the actual production environment and approved architecture.

### 26.2 Unresolved Procedures

Detailed provider-specific recovery steps, operational service targets, escalation contacts and support schedules must be confirmed before production reliance.

### 26.3 Service Targets

Availability, response, recovery and support targets must be approved and documented.

This runbook does not assume specific service-level commitments.

### 26.4 Legal and Regulatory Requirements

Applicable privacy, consumer, tax, accounting and other obligations require appropriate professional review.

Operational procedures must be updated when confirmed obligations affect platform or store operations.

## 27. Relationship to Other Documents

This runbook must be read alongside:

- Platform Business Model.
- Store Operating Model.
- Platform Governance.
- Architecture Governance.
- Decision Register.
- System Architecture.
- Application Architecture.
- Data Architecture.
- Store Architecture.
- Identity and Access Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Integration Architecture.
- Operations Architecture.
- Commerce Architecture.
- Inventory Architecture.
- Customer Architecture.
- Finance Architecture.
- Notification Architecture.
- Performance Architecture.
- Implementation Roadmap.
- Migration Plan.
- Testing Strategy.
- Development Standards.

The following operational standards and procedures also govern the activities covered by this runbook:

- `PLATFORM_MONITORING_OBSERVABILITY_AND_ALERTING_STANDARDS.md`
- `PLATFORM_MONITORING_ALERTING_AND_ESCALATION_STANDARDS.md`
- `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md`
- `INCIDENT_RESPONSE_PLAYBOOK.md`
- `PLATFORM_BUSINESS_CONTINUITY_AND_DISASTER_RECOVERY_PLAN.md`
- `BACKUP_AND_DISASTER_RECOVERY.md`
- `PLATFORM_RELEASE_AND_DEPLOYMENT_GOVERNANCE_STANDARDS.md`
- `PLATFORM_CHANGE_COMMUNICATION_AND_FEATURE_ANNOUNCEMENT_STANDARDS.md`
- `STORE_SUPPORT_AND_ESCALATION_POLICY.md`
- `SECURITY_ARCHITECTURE.md`

Detailed technical requirements remain governed by the relevant architecture and implementation documents.

## 28. Operations Runbook Document Management

### 28.1 Ownership

The Platform Owner is accountable for this document.

### 28.2 Maintenance

Update procedures when operational responsibilities, production infrastructure, provider integrations, security controls or approved workflows change.

### 28.3 Review

Review this runbook before major production changes and after significant incidents or recovery exercises.

### 28.4 Procedure Verification

Procedures must be tested where practical, especially those involving privileged access, financial integrity, security containment, backup restoration and service recovery.

### 28.5 Version Control

Maintain this document in version control.

Material changes must be traceable through repository history.

### 28.6 Approval

This document remains a draft until formally reviewed and approved by the authorised owner.
