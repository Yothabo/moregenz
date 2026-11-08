# Operations Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-40979EE8A4 |
| Category | Architecture |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the operational architecture of the multi-store platform.

It describes how the platform and participating stores are supported, administered, monitored and maintained throughout their operational lifecycles.

It establishes operational responsibilities, procedures, controls and coordination requirements without prescribing unnecessary implementation details.

The document applies to platform-level operations, store-level operations and the operational responsibilities shared between them.

## 2. Operational Objectives

The operational architecture must:

- Maintain reliable platform and storefront operations.
- Preserve the separation of platform and store responsibilities.
- Protect store data, customer information and financial records.
- Establish clear operational ownership and accountability.
- Provide consistent support to participating stores.
- Define processes for onboarding, activation, suspension and deactivation.
- Support incident detection, response, investigation and resolution.
- Maintain operational continuity during failures and disruptions.
- Ensure operational changes are controlled and traceable.
- Provide sufficient information for informed operational decisions.
- Support platform growth without creating unnecessary operational complexity.

## 3. Operational Principles

### 3.1 Clear ownership

Every operational responsibility must have an identifiable owner.

Responsibilities must not be assumed merely because a person has technical access or administrative privileges.

### 3.2 Separation of platform and store operations

Platform operations and store operations must remain distinguishable.

The Platform Owner is responsible for platform-level operation and oversight.

Store Admins are responsible for the ordinary operation of their respective stores.

### 3.3 Proportionate oversight

Platform oversight must be proportionate to the operational, financial, security or compliance risk involved.

Normal store operations should not require unnecessary platform approval.

### 3.4 Controlled intervention

Material interventions affecting a store must have an appropriate reason, authority and operational record.

Platform access must not become unrestricted authority to manage every store activity.

### 3.5 Operational traceability

Material operational actions must be traceable to the responsible actor, relevant store or platform context, time and action performed.

### 3.6 Continuity and recoverability

Operational procedures must account for service interruptions, provider failures, data recovery and the restoration of critical business activities.

### 3.7 Documented exceptions

Exceptions to normal operational procedures must be documented, justified and approved by the appropriate authority.

## 4. Operational Structure

### 4.1 Platform operations

Platform operations cover responsibilities that affect the shared platform or multiple participating stores.

These include:

- Platform availability and technical operation.
- Platform-level identity and access administration.
- Store onboarding and platform activation.
- Shared service configuration.
- Platform security and incident coordination.
- Shared infrastructure and provider management.
- Platform-wide operational reporting.
- Platform-level governance and operational reviews.
- Coordination of shared marketing and business support activities.

### 4.2 Store operations

Each store remains responsible for its ordinary business activities.

These include:

- Storefront content and presentation within supported configuration.
- Store product listings and commercial terms.
- Store pricing and promotions.
- Store inventory and stock movements.
- Order processing and fulfilment.
- Customer service.
- Employee administration and delegated permissions.
- Store expenses and operational records.
- Store-level business performance and daily activities.

### 4.3 Shared operational responsibilities

Some activities require coordination between platform and store operations.

Examples include:

- Store onboarding.
- Shared product catalogue changes.
- Platform-wide promotions.
- Technical incidents affecting a store.
- Stock or capital assistance.
- Store performance reviews.
- Security incidents involving shared services.
- Changes affecting multiple stores.

The responsible parties and approval requirements must be established for each activity.

## 5. Operational Roles and Responsibilities

### 5.1 Platform Owner

The Platform Owner is responsible for overall platform operation and business oversight.

Responsibilities include:

- Maintaining platform-level operational direction.
- Appointing and controlling platform-level privileged access.
- Approving material platform changes.
- Authorising store onboarding and activation.
- Coordinating platform-wide incidents.
- Reviewing material security and operational risks.
- Maintaining platform-level provider and service relationships.
- Reviewing platform performance and participating store performance.
- Authorising material interventions within approved governance rules.

The Platform Owner should not need to approve routine operational decisions already delegated to Store Admins.

### 5.2 Platform Super Admin

The Platform Super Admin performs authorised platform-level administrative and technical activities.

Responsibilities may include:

- Platform configuration.
- Store administration.
- Platform identity and access administration.
- Operational monitoring.
- Technical support and troubleshooting.
- Incident investigation.
- Execution of approved operational changes.

Super Admin access does not independently establish business authority to make financial, contractual or governance decisions.

### 5.3 Store Admin

Each Store Admin is responsible for the ordinary administration and operation of their store.

Responsibilities include:

- Managing store employees and delegated permissions.
- Maintaining store product listings.
- Managing store pricing and promotions.
- Managing inventory and stock movements.
- Processing and overseeing orders.
- Managing store customers and service issues.
- Maintaining store operational records.
- Monitoring store performance.
- Raising platform support requests.
- Reporting incidents affecting the store.

A Store Admin must operate within their store's authority and must not access or administer another store without explicit authorisation.

### 5.4 Store employees

Employees perform activities delegated by their Store Admin.

Their access must be limited to the permissions required for their responsibilities.

Employees must follow applicable store procedures and report operational or security issues through the designated support process.

### 5.5 External providers

External providers may support hosting, databases, authentication, payments, communications, storage and other platform services.

Provider responsibilities must be documented.

External provider access must not replace internal ownership and accountability.

## 6. Store Onboarding and Activation

### 6.1 Onboarding objectives

Store onboarding must establish a correctly configured, authorised and operationally ready store.

A store must not become publicly operational solely because a database record has been created.

### 6.2 Onboarding information

The onboarding process must establish the information necessary to operate the store.

This may include:

- Store identity and public brand information.
- Store ownership and authorised representatives.
- Primary Store Admin.
- Store contact and operational details.
- Storefront configuration.
- Product catalogue and listing arrangements.
- Pricing and commercial settings.
- Inventory arrangements.
- Order fulfilment arrangements.
- Customer support responsibilities.
- Applicable financial arrangements.
- Required platform permissions and agreements.

Information requirements must be proportionate to the store's operating model.

Legal, tax and contractual requirements must be reviewed by appropriately qualified professionals where necessary.

### 6.3 Store readiness

Before activation, the responsible parties must verify:

- Store identity and administrative authority.
- Store Admin access.
- Required employee permissions, where applicable.
- Storefront configuration.
- Product and listing availability.
- Pricing and inventory configuration.
- Order processing and fulfilment readiness.
- Customer support arrangements.
- Applicable financial configuration.
- Required operational documentation.

### 6.4 Activation authority

Store activation must be authorised by the appropriate platform authority.

The person performing technical setup must not automatically be treated as the person authorised to approve business activation.

### 6.5 Activation verification

After activation, the store must be checked in its intended operating context.

Verification must confirm that the store can operate without exposing another store's data or administrative functions.

## 7. Store Lifecycle Operations

### 7.1 Lifecycle states

The platform must support an explicit store lifecycle.

Potential states include:

- Draft.
- Onboarding.
- Pending activation.
- Active.
- Suspended.
- Deactivated.

The exact state transitions and permissions remain subject to approval.

### 7.2 Store suspension

Suspension is a controlled restriction of some or all store operations.

It may be considered where there is:

- A material security concern.
- An unresolved operational risk.
- A serious policy or governance issue.
- A contractual or other authorised basis.
- A need to prevent further transactions while an issue is investigated.

Suspension must have an authorised reason, defined scope and review process.

The effect on storefront access, new orders, existing orders, inventory and outstanding obligations must be considered.


#### Emergency protective suspension

An emergency protective suspension may be initiated by an authorised platform incident responder when immediate restriction is reasonably necessary to contain a credible security threat, prevent material data exposure, protect transaction integrity or limit serious operational harm.

The action must be limited to the scope necessary to address the immediate risk. The responsible actor must record the reason, affected capabilities, time, available evidence and actions taken. The Platform Owner or other appropriate authority must be notified promptly, and the suspension must receive a timely review.

An emergency protective suspension is a temporary containment measure. It must not be treated as a final finding of misconduct, permanent deactivation or authority to impose unrelated business or financial consequences.

#### Ordinary administrative suspension

An ordinary administrative suspension must be initiated or approved by the authority designated for the relevant business or governance matter. The reason, scope, expected duration or review point, affected operations and reinstatement conditions must be recorded and communicated to the affected Store Admin where appropriate.


### 7.3 Store deactivation

Deactivation ends or disables the store's active participation in the platform.

Deactivation must not be treated as automatic deletion of the store or its records.

Historical orders, financial records, audit history and outstanding obligations must be preserved according to applicable retention requirements.

### 7.4 Reinstatement

A suspended or deactivated store may be reinstated only after the relevant conditions have been reviewed and the appropriate authority has approved reinstatement.

Required access, configuration and operational readiness must be verified before normal operation resumes.

### 7.5 Store lifecycle accountability

Material lifecycle actions must record:

- Store identifier.
- Previous and new lifecycle state.
- Reason for the change.
- Responsible actor.
- Approval authority where applicable.
- Date and time.
- Operational consequences.
- Relevant review or reinstatement conditions.

## 8. Operational Support Model

### 8.1 Support ownership

Store Admins are the primary operational support contact for their own store employees.

The platform support function handles platform-related issues and matters that cannot be resolved within the store's authority.

### 8.2 Support categories

Support requests should be classified into appropriate categories, including:

- Account and access problems.
- Storefront issues.
- Product catalogue issues.
- Inventory problems.
- Orders and fulfilment.
- Payment and financial reconciliation.
- Customer service issues.
- Platform availability.
- Security incidents.
- Data correction and recovery.
- General operational assistance.

### 8.3 Support escalation

Issues must be escalated when they exceed the authority, access or technical capability of the person handling them.

Escalation may move from an employee to a Store Admin, then to platform support or the Platform Owner depending on the issue.

Security, financial integrity and cross-store isolation concerns require appropriate priority and escalation.

### 8.4 Support records

Material support requests should record:

- Requesting store or platform function.
- Requester.
- Issue description.
- Date and time reported.
- Impact and urgency.
- Assigned responsible person.
- Actions taken.
- Resolution or current status.
- Any required follow-up.

### 8.5 Support boundaries

Platform support must not use a support request as justification for unrestricted access to store data.

Access must be limited to what is necessary and authorised for the support activity.

Where access to sensitive store information is necessary, the reason and actions must be recorded.


#### Access controls during support

Support access must be limited to the information and capabilities necessary to investigate or resolve the reported issue. Access must be purpose-specific and time-bound, and must be revoked when the support activity is complete or the access is no longer required.

Access to sensitive store information must receive approval from the appropriate authority for that store or platform function, unless an emergency exception is necessary to contain an immediate security or operational threat. Any such exception must be justified, recorded and reviewed promptly.

Support personnel must not use information obtained during support for unrelated purposes. Material access to sensitive information and actions taken using that access must be traceable.


### 8.6 Support service levels

Formal support hours, response targets, resolution targets and escalation timeframes remain open business and operational decisions.

They must not be assumed or represented as guaranteed service levels until approved.

## 9. Incident Management

### 9.1 Incident definition

An incident is an unplanned event that disrupts, degrades or threatens platform or store operations, security, data integrity or service availability.

### 9.2 Incident categories

Incidents may include:

- Platform or storefront outage.
- Backend or database failure.
- Authentication or access failure.
- Cross-store data exposure.
- Unauthorised access.
- Data loss or corruption.
- Order processing failure.
- Payment or reconciliation discrepancies.
- Inventory inconsistencies.
- External provider outage.
- Malicious activity.
- Loss of critical operational credentials.

### 9.3 Incident severity

Severity must reflect actual or potential business impact, security exposure, affected stores and urgency.

The incident process may use severity levels such as:

- Critical.
- High.
- Medium.
- Low.

Severity definitions and response targets must be approved separately.

### 9.4 Incident detection and reporting

Incidents may be identified through monitoring, automated alerts, support requests, store reports, provider notifications or internal reviews.

Employees and Store Admins must have a clear way to report suspected incidents.

### 9.5 Incident response

Incident response should follow a controlled sequence:

1. Detect and report the incident.
2. Record and classify the incident.
3. Assess impact and affected services or stores.
4. Assign an incident owner.
5. Contain the incident where necessary.
6. Investigate the cause.
7. Restore affected services or operations.
8. Verify recovery and data integrity.
9. Communicate relevant outcomes.
10. Record lessons and corrective actions.

The response must prioritise safety, security, data integrity and continuity of critical business operations.


#### Major incident authority and coordination

A major incident may be declared by the Platform Owner or a person formally designated to perform that responsibility. A Store Admin may identify and declare an incident affecting their own store for store-level response and escalation.

The Platform Owner or designated incident lead is responsible for coordinating the overall response to a major platform incident, including prioritisation, stakeholder communication and escalation. An authorised technical responder, including a Platform Super Admin acting within delegated authority, may coordinate technical investigation and containment.

Prior business approval must not be required for proportionate emergency containment actions that are necessary to protect security, data integrity or service continuity, provided the responder is authorised under the incident procedures. Such actions must be recorded and escalated for review as soon as practicable.

Incident coordination authority does not independently grant authority to make unrelated financial, contractual or governance decisions.


### 9.6 Cross-store incidents

Incidents affecting shared platform services must be assessed for their impact on every potentially affected store.

Containment and recovery must preserve store isolation.

An incident affecting one store must not result in unnecessary disruption to unrelated stores.

### 9.7 Security incidents

Suspected unauthorised access, data exposure, credential compromise or other security incidents must follow the Security Architecture and applicable incident response requirements.

Evidence must be preserved where appropriate.

Access restrictions, credential rotation, session invalidation and notifications must be handled by authorised personnel.

Legal notification and reporting obligations must be assessed by appropriately qualified professionals.

### 9.8 Incident closure

An incident may be closed after:

- The immediate issue has been resolved or accepted as a known limitation.
- Affected services have been verified.
- Required stakeholders have been informed.
- Relevant records have been completed.
- Outstanding corrective actions have been assigned.

### 9.9 Post-incident review

Material incidents should receive a post-incident review.

The review should examine:

- What happened.
- Which services and stores were affected.
- The cause and contributing factors.
- How the incident was detected.
- Whether the response was effective.
- Whether data or financial integrity was affected.
- What corrective actions are required.

The purpose is to improve operational controls and reduce recurrence.

## 10. Change and Release Operations

### 10.1 Change management

Operational changes must be assessed according to their risk and potential impact.

Changes include application releases, database migrations, infrastructure changes, permissions, production configuration and external provider settings.

### 10.2 Change classification

Changes may be classified as:

- Routine, low-risk changes within approved procedures.
- Planned changes requiring review and coordination.
- High-risk changes requiring explicit approval and recovery planning.
- Emergency changes required to contain or resolve an incident.

Classification criteria remain subject to operational approval.

### 10.3 Change assessment

A change assessment should consider:

- Purpose and expected outcome.
- Affected services and stores.
- Security and privacy impact.
- Data integrity impact.
- Financial and operational impact.
- Dependencies and compatibility.
- Required approvals.
- Verification requirements.
- Rollback or recovery approach.
- Communication requirements.

### 10.4 Change execution

Production changes must be executed by authorised personnel through documented procedures.

High-risk changes must not rely on undocumented manual actions.

### 10.5 Emergency changes

Emergency changes may use an expedited approval process where delay would create unacceptable risk.

The change must still be recorded, justified and reviewed after execution.

### 10.6 Store-impacting changes

Changes to shared services must be assessed for their impact on participating stores.

Where appropriate, affected Store Admins must receive advance communication.

Store-specific data, configuration, permissions and operational boundaries must be verified after the change.

### 10.7 Release coordination

Application releases, database migrations, configuration changes and background processing changes must be coordinated.

Conflicting production changes must not be executed concurrently against shared resources.

Release controls are further defined in the Deployment Architecture.

## 11. Product, Inventory and Order Operations

### 11.1 Product catalogue operations

Product source information and store-specific listings must be managed according to the ownership rules defined in the Store Architecture and Data Architecture.

Operational changes must preserve the distinction between:

- Product identity and descriptive source information.
- Product ownership.
- Store availability.
- Store-specific pricing and commercial terms.
- Store-specific inventory.

### 11.2 Product sharing

Making a product available to another store must not transfer ownership.

Store Admins may manage their own authorised listings and commercial terms without gaining unrestricted authority over another owner's source product information.

### 11.3 Inventory operations

Each store must maintain independent inventory records.

Inventory adjustments must have an identifiable reason and responsible actor.

Stock transfers between stores must be explicitly recorded and must not be represented as ordinary inventory adjustments.

### 11.4 Inventory discrepancies

Discrepancies must be investigated and corrected through authorised procedures.

Corrections must preserve the original transaction history where required for accountability.

### 11.5 Order operations

Orders belong to the relevant store and must retain their store context throughout processing.

Operational procedures must cover order acceptance, processing, fulfilment, cancellation, returns and other supported order states.

### 11.6 Order exceptions

Exceptions affecting orders must be recorded and handled by authorised personnel.

Corrections must preserve transaction history and must not silently alter completed financial or fulfilment records.

## 12. Financial and Reconciliation Operations

### 12.1 Financial separation

Store financial activity and platform financial activity must remain separately identifiable.

Operational reporting must not combine them in a way that obscures ownership, obligations or responsibility.

### 12.2 Store financial operations

Store financial records may include:

- Sales and revenue.
- Refunds and reversals.
- Store expenses.
- Payment settlements.
- Outstanding customer amounts.
- Stock purchases.
- Other store obligations.

### 12.3 Platform financial operations

Platform financial records may include:

- Platform revenue.
- Platform operating expenses.
- Approved commissions.
- Amounts owed to or by stores.
- Stock or capital assistance.
- Repayments and outstanding obligations.

### 12.4 Reconciliation

Reconciliation procedures must compare relevant transaction, order, payment and settlement records.

Differences must be investigated and resolved through authorised corrections.


#### Reconciliation findings and financial adjustments

Reconciliation must distinguish the investigation of a discrepancy, the proposal of a correction and the authorisation and posting of that correction or settlement.

A person investigating a discrepancy must not be assumed to have authority to approve a material financial adjustment or settlement. Approval must follow the applicable financial authority and separation-of-responsibility rules once those rules have been defined.

Corrections must preserve the original transaction and reconciliation history. They must identify the reason, supporting evidence, responsible actor, approval where required and resulting adjustment. Records must not be silently overwritten to make a discrepancy appear resolved.

Urgent protective actions to prevent further incorrect processing may be taken by authorised personnel under documented procedures. Such actions do not replace the required review and approval of any resulting financial adjustment.


### 12.5 Stock and capital assistance

Stock or capital assistance must follow an explicit human review and approval process.

Performance indicators may inform a decision but must not independently approve, reject or execute material financial assistance.

The terms, authority, accounting treatment and repayment arrangements must be documented where applicable.

### 12.6 Unresolved financial rules

Commission rates, calculation basis, settlement frequency, payment responsibility and other commercial arrangements remain open decisions until explicitly approved.

They must not be hard-coded or treated as established operational policy before approval.

## 13. Operational Monitoring and Reviews

### 13.1 Platform monitoring

Platform operations must monitor the availability and health of critical services.

Monitoring responsibilities are further defined in the Deployment Architecture and Security Architecture.

### 13.2 Store operational visibility

Store Admins should have visibility into the operational information needed to manage their own stores.

Platform-level visibility may support coordination and oversight but must respect store data boundaries.

### 13.3 Performance reviews

Store performance reviews should consider relevant operational and business context.

Assessments should account for:

- Store operating history.
- Product categories.
- Store size and operating capacity.
- Agreed targets.
- Availability and stock constraints.
- Relevant market and operational circumstances.

Performance indicators must be explainable.

A score or ranking alone must not trigger a material financial, governance or operational intervention.

### 13.4 Operational reviews

The platform should conduct periodic reviews of:

- Service reliability.
- Open incidents.
- Support requests.
- Security concerns.
- Store operational health.
- Outstanding obligations.
- Provider dependencies.
- Required corrective actions.

### 13.5 Action tracking

Material review findings must have an assigned owner, expected action and appropriate follow-up.

## 14. Communication and Operational Coordination

### 14.1 Communication responsibilities

Operational communication must identify who is responsible for communicating with affected stores, employees, customers or providers.

### 14.2 Planned maintenance

Planned maintenance that may affect store operations should be communicated in advance where practical.

Communication should identify the affected services, expected impact and relevant time window.

### 14.3 Incidents and disruptions

Material incidents must be communicated to affected stakeholders according to severity, impact and applicable obligations.

Communication must distinguish confirmed facts from preliminary findings.

### 14.4 Store coordination

The platform may coordinate meetings, business reviews, marketing activities and operational initiatives involving participating stores.

Participation, responsibilities and expected outcomes should be documented where material.

### 14.5 Communication records

Material operational decisions and communications should be retained in an appropriate record.

Sensitive information must be shared only with authorised recipients.

## 15. Operational Continuity

### 15.1 Continuity objectives

The platform must be able to respond to service disruption while preserving critical records and restoring essential operations.

### 15.2 Critical operations

Continuity planning must consider:

- Customer access to storefronts.
- Order capture and processing.
- Payment status verification.
- Inventory integrity.
- Store administration.
- Platform administration.
- Customer support.
- Financial records and reconciliation.

### 15.3 Service disruption

When a service becomes unavailable, the responsible operator must assess which operations can continue safely and which must be paused.

Manual workarounds must not create duplicate orders, payments, inventory movements or financial records.

### 15.4 Recovery coordination

Recovery must be coordinated with the Deployment Architecture, Data Architecture and Security Architecture.

Restored services must be checked for data consistency, store isolation and transaction integrity.

### 15.5 Provider failure

Operational procedures must account for critical external provider failures.

Provider-specific recovery options and alternative arrangements must be documented where available and appropriate.

### 15.6 Continuity testing

Recovery and continuity procedures should be tested periodically.

Test results and identified gaps must be documented and addressed.

## 16. Access and Operational Accountability

### 16.1 Operational access

Operational access must follow the Identity and Access Management document and Security Architecture.

Users must receive only the access required for their assigned responsibilities.

### 16.2 Privileged operations

Privileged actions must be limited to authorised roles.

Material privileged actions must be recorded and periodically reviewed.

### 16.3 Temporary access

Temporary access for troubleshooting, maintenance or incident response must have a defined purpose and appropriate duration.

Temporary privileges must be revoked when no longer required.

### 16.4 Personnel changes

When an employee or administrator leaves a role, their access must be reviewed and adjusted promptly.

Store Admins are responsible for notifying the platform when a change requires platform-level action.

### 16.5 Accountability

Operational records must make it possible to establish who performed a material action and under which authority.

Shared accounts must not be used where individual accountability is required.

## 17. Operational Records and Documentation

### 17.1 Required records

Operational records should cover:

- Store onboarding and activation.
- Store suspension and deactivation.
- Support requests.
- Incidents and post-incident reviews.
- Material changes and releases.
- Security investigations.
- Operational approvals.
- Financial and inventory exceptions.
- Continuity and recovery tests.
- Provider and dependency changes.
- Periodic operational reviews.

### 17.2 Record integrity

Operational records must be protected against unauthorised modification or deletion.

Corrections must preserve appropriate history and accountability.

### 17.3 Documentation ownership

Each operational procedure must have an identifiable owner.

Documentation must be reviewed when the relevant process, responsibility or system changes materially.

### 17.4 Retention

Operational records must be retained according to approved retention requirements and applicable legal obligations.

Retention periods must not be invented or assumed by application defaults.

## 18. External Provider Operations

### 18.1 Provider ownership

Critical provider accounts must have identifiable business ownership and authorised administrative access.

### 18.2 Provider inventory

The platform must maintain an inventory of critical providers, their purpose, operational dependencies and support arrangements.

### 18.3 Provider incidents

Provider outages or service degradation must be assessed for their impact on platform and store operations.

Where possible, affected stores should receive relevant updates.

### 18.4 Provider access and credentials

Provider credentials must be managed securely.

Changes in personnel or provider relationships must trigger an access review.

### 18.5 Provider exit and replacement

The platform should understand the operational impact of losing or replacing a critical provider.

Data export, migration, credential revocation and service continuity must be considered before a provider transition.

## 19. Operational Security and Compliance

### 19.1 Security responsibilities

Operational personnel must follow the approved security procedures and access controls.

### 19.2 Security reviews

Operational reviews should identify access anomalies, unresolved vulnerabilities, suspicious activity and other material risks.

### 19.3 Data handling

Customer, employee, store and financial information must be handled according to applicable privacy, security and retention requirements.

### 19.4 Legal and regulatory obligations

The platform's operational procedures must be reviewed against applicable South African legal, tax, consumer protection, privacy and other regulatory obligations.

The precise obligations depend on the actual business structure and activities and must be confirmed with appropriately qualified professionals.

### 19.5 Compliance evidence

Where applicable, operational records must support evidence of required controls, approvals and actions.

## 20. Operational Non-Functional Requirements

The operational model must support:

- Clear ownership and escalation.
- Reliable service operation.
- Controlled operational changes.
- Store-level isolation.
- Traceable administrative actions.
- Recoverable data and services.
- Secure provider access.
- Explainable operational reporting.
- Maintainable procedures.
- Scalable support as stores are added.

Specific availability targets, support hours, response times, recovery objectives and retention periods remain open decisions.

## 21. Open Operational Decisions

The following matters require explicit business or technical decisions before they become fixed platform rules:

- Formal support hours and service levels.
- Incident severity definitions and response targets.
- Store onboarding approval requirements.
- Store suspension and reinstatement authority.
- Store deactivation procedures and notice requirements.
- Operational review frequency.
- Store performance review criteria.
- Platform and store communication channels.
- Planned maintenance notification periods.
- Operational staffing and support capacity.
- Provider support and escalation arrangements.
- Continuity testing frequency.
- Recovery responsibilities and escalation.
- Financial reconciliation frequency.
- Commission and settlement procedures.
- Stock and capital assistance approval thresholds.
- Operational record retention periods.
- Legal and regulatory responsibilities based on the final business structure.

Unresolved decisions must remain configurable or deferred rather than being silently converted into fixed application behaviour.

## 22. Relationship to Other Documents

This document must be read alongside:

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
- Identity and Access Management.

The Operations Architecture defines operational responsibilities and procedures.

It does not replace the technical controls, data ownership rules, access requirements or business decisions defined in those documents.

## 23. Architecture Governance

Changes to this document must be reviewed when operational responsibilities, store lifecycle rules, support arrangements, incident procedures or continuity requirements change materially.

Approved operational rules must be reflected consistently in relevant procedures, application behaviour and technical documentation.

No operational authority, financial rule or governance power should be inferred solely from technical implementation.
