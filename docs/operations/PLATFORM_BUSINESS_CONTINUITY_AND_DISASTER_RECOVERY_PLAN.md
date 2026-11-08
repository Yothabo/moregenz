# Platform Business Continuity and Disaster Recovery Plan

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-OPS-302ED5158F |
| Category | Operations |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This document defines how the parent company prepares for, responds to and maintains business operations during incidents that threaten the availability, integrity or continuity of the multi-store platform. It establishes business priorities, continuity decisions, responsibilities and communication requirements. Technical backup and restoration execution is governed by BACKUP_AND_DISASTER_RECOVERY.md.

The plan covers:

- Website and storefront outages.
- Admin dashboard outages.
- Database failures.
- Data corruption or accidental deletion.
- Hosting and infrastructure failures.
- Payment integration failures.
- Domain and DNS problems.
- Security incidents and ransomware.
- Third-party service outages.
- Loss of access to critical accounts.
- Operational disruptions affecting Store Owners and customers.

The objective is to restore essential services safely, protect business records and minimise disruption to participating stores.

## 2. Core Principles

1. Customer safety, privacy and financial integrity take priority.
2. Recovery must not introduce additional data corruption.
3. Backups must be protected from the systems they are intended to recover.
4. Recovery procedures must be documented and tested.
5. Incident ownership and accountability must follow the platform incident management standard.
6. Store Owners must receive timely and accurate communications.
7. Recovery priorities must reflect business impact.
8. No one should claim that data has been restored until verification is complete.
9. Financial and order records must be reconciled after recovery.
10. Lessons from incidents must lead to measurable improvements.

## 3. Scope and Critical Services

The parent company must maintain an inventory of critical platform services.

At minimum, assess:

### 3.1 Customer-Facing Services

- Public storefronts.
- Product catalogue and product details.
- Search and navigation.
- Customer accounts.
- Shopping carts.
- Checkout.
- Payment initiation.
- Order confirmation.
- Order status and tracking.

### 3.2 Store Owner Services

- Store Owner dashboards.
- Product management.
- Inventory management.
- Pricing and promotions.
- Order management.
- Customer service workflows.
- Store performance reporting.
- Marketing and creative request workflows.
- Store change requests.

### 3.3 Central Platform Services

- Authentication and authorisation.
- Database services.
- API services.
- Background jobs and scheduled tasks.
- File and media storage.
- Email and notification services.
- Payment provider integrations.
- Domain and DNS management.
- Monitoring and logging.
- Deployment pipelines.
- Administrative access.

Each service must have a named technical or operational owner.

## 4. Business Impact Assessment

Every critical service must be assessed for:

- Operational importance.
- Number of stores affected.
- Number of customers affected.
- Financial exposure.
- Privacy and security implications.
- Dependency on third-party providers.
- Availability of manual alternatives.
- Recovery complexity.

Incidents affecting multiple stores or shared infrastructure generally require central coordination.

A single-store issue should not automatically be treated as a platform-wide incident unless the underlying cause or risk affects other stores.

## 5. Recovery Objectives

The parent company must define two recovery measures for each critical service.

### 5.1 Recovery Time Objective (RTO)

The maximum acceptable period for restoring a service after disruption.

### 5.2 Recovery Point Objective (RPO)

The maximum acceptable amount of data loss measured in time.

The following are proposed initial targets, not confirmed infrastructure capabilities:

| Service | Proposed RTO | Proposed RPO |
|---|---:|---:|
| Customer storefronts | 4 hours | 1 hour |
| Checkout and order creation | 2 hours | 15 minutes |
| Core database | 2 hours | 15 minutes |
| Store Owner dashboard | 8 hours | 1 hour |
| Product media | 24 hours | 24 hours |
| Reporting and analytics | 48 hours | 24 hours |
| Internal documentation | 24 hours | 24 hours |

These targets must be validated against hosting plans, database capabilities, backup frequency, staffing and recovery costs.

Where a provider cannot support the proposed target, document the actual capability and associated business risk.

## 6. Incident Management Interface

All incidents MUST be classified and managed in accordance with `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md`.

That standard is authoritative for:

- Severity definitions and classification.
- Incident ownership and Incident Lead accountability.
- Mandatory incident lifecycle.
- Escalation and incident governance.
- Audience identification and incident communications.
- Recovery declaration and resolution communication.
- Incident closure and post-incident review requirements.

`INCIDENT_RESPONSE_PLAYBOOK.md` governs operational triage, containment, investigation, eradication, evidence preservation, technical response and specialist incident procedures.

This plan does not establish alternative severity definitions, severity-based response instructions, escalation thresholds or incident lifecycle requirements.

During an incident, business continuity assessment must establish:

- Which critical services and business operations are affected.
- Which stores, customers and business functions are affected.
- The operational, financial and privacy implications.
- Whether essential activities can continue safely.
- Whether manual or alternative operating arrangements are required.
- Which business recovery priorities and dependencies apply.

The business impact assessment informs the Incident Lead and authorised decision-makers. It does not replace incident classification or response governance.

## 7. Business Continuity Activation and Coordination

Business continuity arrangements should be activated when a disruption threatens the availability of critical services or the organisation's ability to maintain essential business operations.

Business continuity activation is a business operations decision. It does not create a separate incident declaration, severity classification or response process.

When continuity arrangements are needed, the parent company must:

1. Identify the critical services and business activities affected.
2. Assess the number of affected stores, customers and operational functions.
3. Establish the immediate business and financial consequences.
4. Identify safe manual procedures or alternative operating arrangements.
5. Determine which services and business activities require priority.
6. Identify the personnel and provider dependencies needed to maintain operations.
7. Communicate continuity requirements and business decisions to the Incident Lead.
8. Record material continuity decisions, limitations and outstanding risks.
9. Review whether the arrangements remain safe and effective as conditions change.

Continuity measures must not bypass security, payment, privacy, financial or store-isolation controls.

The Incident Lead and response participants must continue to follow the incident standard and playbook. Technical containment, investigation and restoration must follow the applicable specialist procedures.

Business continuity arrangements remain active until authorised decision-makers determine that normal business operations can safely resume.

## 8. Backup and Technical Recovery Governance

The parent company must ensure that critical business information is protected through documented and tested backup and recovery arrangements.

The technical requirements for backup scope, backup types, frequency, retention, encryption, storage isolation, access controls and restoration procedures are governed by `BACKUP_AND_DISASTER_RECOVERY.md`.

From a business continuity perspective, the parent company must ensure that:

- Critical business information and services are identified.
- Each critical information category has an accountable owner.
- Business recovery priorities are documented.
- Backup and recovery arrangements support approved business recovery objectives.
- Provider limitations and material recovery risks are visible to decision-makers.
- Unresolved backup and recovery dependencies are tracked before production readiness approval.

This plan does not establish competing technical backup configurations or retention requirements.

## 9. Backup Assurance and Recovery Readiness

The parent company must obtain sufficient evidence that the technical backup and recovery arrangements can support business continuity.

Backup verification, restoration testing, technical validation and evidence requirements are defined in `BACKUP_AND_DISASTER_RECOVERY.md`.

Business continuity reviews must consider:

- Whether critical services and business information are covered.
- Whether restoration exercises address the highest-impact business scenarios.
- Whether actual recovery performance is consistent with approved business objectives.
- Whether identified recovery gaps have accountable owners and corrective actions.
- Whether Store Owner and customer continuity arrangements remain workable during recovery.

A successful backup report must not be treated as proof that the business can resume normal operations.

## 10. Technical Recovery Activation

When a disruption requires database, file, object storage, application or infrastructure restoration, the Incident Lead must coordinate the business decisions and ensure that authorised technical personnel follow `BACKUP_AND_DISASTER_RECOVERY.md`.

The business continuity plan governs:

- The business priority of affected services.
- The stores, customers and operations affected.
- Whether manual or alternative operating arrangements are required.
- The business impact of the proposed recovery point.
- The authority required to accept residual data loss or recovery risk.
- The conditions for resuming affected business operations.

Technical personnel must not treat a successful restoration as permission to resume business processing. Required integrity checks, transaction reconciliation, store-isolation verification and recovery approval must be completed under the technical recovery procedure.

Payment, financial and order continuity requirements remain governed by the dedicated sections of this plan and the applicable payment, financial and order-management standards.

## 11. Payment and Financial Continuity

Payment disruptions require additional controls.

During an incident:

- Do not claim a payment succeeded without confirmation.
- Do not repeatedly submit payment requests without checking transaction status.
- Record uncertain transactions for reconciliation.
- Preserve provider references.
- Identify orders with pending or unknown payment status.
- Prevent duplicate fulfilment.
- Communicate delays accurately.

After recovery:

- Reconcile platform orders against provider transaction records.
- Identify successful payments without corresponding orders.
- Identify orders without confirmed payments.
- Identify duplicate transactions.
- Review refunds and reversals.
- Record manual corrections with supporting evidence.

Manual payment verification must follow the existing payment verification and reconciliation standards.

## 12. Order and Fulfilment Continuity

Where checkout or order management is unavailable, the parent company may activate an approved manual continuity process.

The process must define:

- Who may accept manual orders.
- Which channels are authorised.
- How customer details are protected.
- How payment is verified.
- How duplicate orders are prevented.
- How stock is checked.
- How orders are entered after recovery.
- How customers receive confirmation.

Manual orders must be marked as manually captured and linked to the relevant store.

Never silently recreate orders or payments without an audit record.

## 13. Store Owner Communication

The parent company must maintain a communication process for affected Store Owners. Incident communication channels, mandatory notices and update requirements are governed by `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md`; this section addresses continuity-specific information.

Updates should explain:

- What happened, where known.
- Which services are affected.
- Which stores are affected.
- What Store Owners should avoid doing.
- Available workarounds.
- Current recovery status.
- Expected next update.
- When normal operations resume.

Do not disclose sensitive security information that could increase risk.

Do not promise a restoration time unless it is supported by the incident assessment.

Store Owners should receive closure communication when the incident materially affected their operations.

## 14. Customer Communication

Where customers are affected, communication must be accurate and proportionate. Customer incident notices must follow the incident management standard and applicable privacy requirements.

Depending on the incident, customers may need information about:

- Checkout availability.
- Payment status.
- Order status.
- Delivery delays.
- Account access.
- Refund processing.
- Personal information incidents.

Customer communications must not expose another customer's information or disclose unnecessary technical details.

Where a personal information breach occurs, assess applicable POPIA notification obligations and obtain appropriate legal guidance.

## 15. Security Incident Continuity

Security incidents must be reported and managed under `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md`, `INCIDENT_RESPONSE_PLAYBOOK.md` and the applicable security policies.

The incident response playbook governs security investigation, containment, evidence preservation, eradication and technical response. Technical backup and restoration requirements remain governed by `BACKUP_AND_DISASTER_RECOVERY.md`.

From a business continuity perspective, the parent company must:

- Identify critical business services and operations affected by the security incident.
- Assess the impact on stores, customers, financial records and business information.
- Determine which affected services must remain restricted to prevent further harm.
- Identify safe alternative operating arrangements.
- Assess provider and infrastructure dependencies.
- Coordinate business recovery priorities with authorised technical and security personnel.
- Determine the business conditions required before affected operations resume.

A service or system must not be returned to normal business use solely because it is technically available. Authorised personnel must establish that the relevant security risks have been addressed and required technical verification has been completed.

Do not restore from potentially compromised recovery sources without the investigation and validation required by the applicable technical and security procedures.

## 16. Third-Party Dependency Failure

The parent company must maintain a dependency register covering important providers.

Examples include:

- Hosting.
- Database services.
- DNS and domain registrars.
- Payment providers.
- Email delivery.
- File storage.
- Monitoring.
- Authentication.
- Courier and fulfilment providers.

For each critical dependency, record:

- Provider.
- Service.
- Business purpose.
- Internal owner.
- Support contact.
- Contract or subscription details.
- Recovery options.
- Data portability.
- Known limitations.
- Exit or migration considerations.

Where a provider fails, determine whether the platform can continue safely through an alternative service or manual procedure.

Do not switch critical providers without considering data integrity, security, contractual obligations and migration risk.

## 17. Domain and DNS Recovery

Domain and DNS incidents may make otherwise healthy storefronts inaccessible.

Maintain protected records of:

- Domain ownership.
- Registrar.
- Renewal dates.
- DNS records.
- Nameserver configuration.
- TLS certificate dependencies.
- Verification records.
- Authorised account holders.

Protect registrar access with strong authentication and controlled recovery methods.

Test recovery procedures without disrupting live domains.

Domain recovery must not transfer ownership or control of Store Owner brand assets without an explicit legal basis.

## 18. Access and Account Recovery

Critical infrastructure accounts must have documented recovery arrangements.

Controls should include:

- Named authorised administrators.
- Multi-factor authentication.
- Secure recovery contacts.
- Emergency access procedures.
- Credential rotation.
- Access revocation.
- Recovery-code protection.
- Periodic access reviews.

Avoid relying on a single person's personal email address or phone number for critical business infrastructure.

Emergency access must be logged and reviewed.

## 19. Business Continuity Functions and Responsibilities

Incident ownership, Incident Lead accountability and response participant assignments are governed by the incident management standard and incident response playbook.

For business continuity, the parent company must ensure that the following functions are covered by appropriately authorised personnel:

### Business Continuity Coordination

Maintain business impact assessments, critical service priorities and continuity arrangements. Coordinate business continuity decisions with the Incident Lead.

### Technical Recovery

Coordinate the technical personnel responsible for restoring infrastructure, applications, databases and services under the applicable backup and disaster recovery procedures.

### Security and Compliance

Provide authorised security, privacy and compliance assessment for continuity decisions involving compromised systems, sensitive information or regulatory obligations.

### Finance and Reconciliation

Coordinate payment verification, transaction reconciliation, financial exposure assessment and authorised financial corrections.

### Store Operations

Coordinate Store Owner impact assessments, safe workarounds, manual operating arrangements and store-level recovery requirements.

### Communications

Coordinate continuity-related information for internal teams, Store Owners and customers in accordance with the incident communication standard.

One person may cover multiple functions in a small organisation, provided responsibilities and decision-making authority remain clear.

This section defines business continuity functions. It does not appoint individuals, grant additional authority or replace the responsibilities established by specialist governance documents.

## 20. Business Continuity Documentation

Maintain a protected continuity repository containing:

- Current system architecture.
- Service dependency register.
- Current backup inventory and restore-procedure references maintained under `BACKUP_AND_DISASTER_RECOVERY.md`.
- Provider support details.
- Infrastructure recovery instructions.
- DNS and domain records.
- Incident contacts.
- Communication templates.
- Manual order procedures.
- Financial reconciliation procedures.
- Recovery test results.

Documentation must remain accessible during a production outage.

Sensitive credentials must be stored in an approved secrets manager or equivalent secure system, not directly in the continuity document.

## 21. Recovery Exercises

The parent company must conduct periodic recovery exercises.

Exercises may include:

- Database restoration.
- Media restoration.
- Hosting failure simulation.
- DNS recovery.
- Payment provider outage.
- Storefront outage.
- Admin access loss.
- Security incident response.
- Manual order processing.

Each exercise must record:

- Scenario.
- Participants.
- Systems involved.
- Expected outcome.
- Actual outcome.
- Recovery time.
- Data loss observed.
- Problems encountered.
- Corrective actions.
- Responsible owners.
- Completion dates.

Recovery exercises must be planned to avoid unnecessary production disruption.

## 22. Continuity Lessons and Improvement

Formal incident review requirements are governed by `PLATFORM_INCIDENT_MANAGEMENT_AND_SERVICE_DISRUPTION_COMMUNICATION_STANDARDS.md`.

This plan focuses on evaluating whether business continuity arrangements were effective during an actual disruption or recovery exercise.

The continuity assessment should consider:

- Whether critical business services were correctly prioritised.
- Whether the business impact assessment was accurate.
- Whether manual or alternative operating arrangements were workable.
- Whether payment, order and financial records remained controlled.
- Whether affected stores and customers received useful continuity information.
- Whether provider dependencies created unexpected disruption.
- Whether business recovery objectives were achievable.
- Whether recovery decisions introduced additional business risk.

Material findings must be supplied to the applicable incident review or exercise review process.

Continuity improvements must have accountable owners, appropriate priorities and traceable completion records. This section does not establish a separate incident review threshold or replace mandatory post-incident review requirements.

## 23. Business Continuity Platform Requirements

Where the platform provides business continuity functionality, it should support:

- A maintained inventory of critical services and dependencies.
- Identification of affected stores and business functions.
- Business impact assessment records.
- Critical service and recovery priority records.
- Continuity activation decisions.
- Approved manual and alternative operating arrangements.
- Provider dependency and recovery information.
- Continuity-related communications.
- Recovery exercise evidence.
- Continuity findings and corrective actions.

Access must be restricted according to role and information sensitivity.

Store Owners must only see continuity information relevant to their stores unless broader communication is authorised.

Incident classification, Incident Lead assignment, incident lifecycle, incident records and incident communication governance remain subject to the incident management standard and incident response playbook.

## 24. Testing Requirements

Automated and operational tests should verify:

1. The technical backup and recovery standard defines verifiable backup completion and coverage evidence.
2. Business continuity reviews can obtain current backup and restoration evidence from the responsible technical owner.
3. Recovery exercises demonstrate whether critical business services can be restored within approved objectives.
4. Restored records preserve store isolation.
5. Customer and order relationships remain valid.
6. Inventory remains consistent.
7. Payment references remain traceable.
8. Media files remain associated with the correct store and product.
9. Recovery does not create duplicate orders.
10. Access controls remain enforced after restoration.
11. Continuity exercise records, findings and corrective actions remain traceable.
12. Recovery communications can be issued to affected stores.
13. Manual orders can be reconciled after service restoration.

## 25. Review and Ownership

The parent company is responsible for maintaining this plan.

Review it:

- At least annually.
- After a major incident.
- After significant infrastructure changes.
- When a critical provider changes.
- When recovery capabilities materially change.
- When testing reveals weaknesses.

Recovery targets must be updated when actual infrastructure capabilities or business priorities change.

## 26. Relationship to Backup and Disaster Recovery

This plan establishes business continuity priorities, impact assessments, recovery decision-making, operational workarounds and stakeholder communication.

`BACKUP_AND_DISASTER_RECOVERY.md` is the technical authority for backup governance, backup protection, verification, restoration testing and technical recovery execution.

The two documents must be maintained together. Changes to critical services, business priorities or approved recovery objectives must be reflected in the technical recovery arrangements. Changes to actual backup or restoration capabilities must be assessed for their business continuity impact.

## 27. Governing Rule

The parent company must be able to identify what failed, protect affected information, maintain essential operations, restore critical services and account for every important transaction.

A business continuity plan is only credible when its priorities, responsibilities, alternative operating arrangements and recovery objectives are supported by tested technical recovery capabilities.
