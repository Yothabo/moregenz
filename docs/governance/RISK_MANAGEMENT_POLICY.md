# Risk Management Policy

## Document Control

| Field | Value |
|---|---|
| Document Type | Risk Management Policy |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This policy establishes how risks affecting the platform and participating stores are identified, assessed, prioritised, treated, monitored and reported.

It provides a consistent approach to managing technical, security, financial, operational, commercial, legal and organisational risks.

## 2. Objectives

Risk management must:

- Protect platform and store operations.
- Reduce the likelihood and impact of avoidable failures.
- Protect customer and business information.
- Preserve financial and data integrity.
- Support informed decision-making.
- Identify dependencies and single points of failure.
- Establish accountability for risk treatment.
- Ensure material risks are visible to the appropriate authority.

## 3. Scope

This policy applies to risks involving:

- Platform architecture and technology.
- Identity and access management.
- Store isolation and data ownership.
- Product catalogue and inventory.
- Orders, payments and financial records.
- Customers and personal information.
- External integrations and providers.
- Infrastructure and deployment.
- Backup and disaster recovery.
- Store onboarding and lifecycle.
- Business continuity.
- Commercial agreements.
- Governance and regulatory obligations.
- Platform expansion and operational capacity.

## 4. Risk Management Principles

Risk management must follow these principles:

- Identify risks early.
- Assess likelihood and impact consistently.
- Consider affected stores and shared services.
- Assign every material risk an accountable owner.
- Distinguish inherent risk from residual risk.
- Select proportionate treatment measures.
- Record accepted risks and approval authority.
- Review risks when circumstances change.
- Do not treat the absence of reported incidents as proof of safety.

## 5. Risk Categories

### 5.1 Strategic Risk

Risks affecting platform direction, sustainability, growth and long-term viability.

### 5.2 Technical Risk

Risks involving architecture, software defects, scalability, dependencies, data integrity and system reliability.

### 5.3 Security and Privacy Risk

Risks involving unauthorised access, credential compromise, data exposure, malicious activity and inappropriate processing of personal information.

### 5.4 Operational Risk

Risks involving service disruption, inadequate procedures, human error, staffing limitations and operational dependencies.

### 5.5 Financial Risk

Risks involving payment processing, inaccurate financial records, cash flow, fraud, credit exposure, stock assistance and unreconciled transactions.

### 5.6 Commercial Risk

Risks involving store agreements, commission arrangements, supplier relationships, pricing and unclear responsibilities.

### 5.7 Legal and Regulatory Risk

Risks involving applicable legislation, contractual obligations, privacy, consumer protection, financial requirements and intellectual property.

### 5.8 Provider and Third-Party Risk

Risks involving external hosting, payment, communication, storage and other service providers.

### 5.9 Project and Migration Risk

Risks involving implementation delays, incomplete migration, incompatible systems, insufficient testing and production disruption.

## 6. Risk Identification

Risks may be identified through:

- Architecture and security reviews.
- Development and code reviews.
- Testing and quality assurance.
- Incident reports.
- Operational monitoring.
- Financial reconciliation.
- Store feedback.
- Provider assessments.
- Migration planning.
- Performance reviews.
- Governance meetings.
- Changes in business or regulatory conditions.

Anyone involved in platform or store operations may raise a risk.

## 7. Risk Assessment

Each material risk should be assessed using:

- Description of the risk.
- Underlying cause.
- Potential event.
- Potential consequences.
- Affected systems and stores.
- Existing controls.
- Likelihood.
- Impact.
- Inherent risk.
- Residual risk.
- Proposed treatment.
- Accountable owner.

Assessments must distinguish established facts from assumptions and uncertainties.

## 8. Likelihood Assessment

Use the following qualitative scale:

| Level | Description |
|---|---|
| Rare | Unlikely under normal operating conditions |
| Unlikely | Possible but not expected |
| Possible | Could occur under identifiable circumstances |
| Likely | Expected to occur in relevant circumstances |
| Almost Certain | Expected to occur frequently or imminently |

Likelihood assessments should use available evidence, incident history and relevant operating conditions.

## 9. Impact Assessment

Assess impact across relevant dimensions.

| Level | Description |
|---|---|
| Insignificant | Minimal disruption or loss |
| Minor | Limited impact with straightforward recovery |
| Moderate | Meaningful operational or financial impact |
| Major | Significant disruption, exposure or financial consequences |
| Severe | Critical platform, security, legal or business consequences |

Impact must consider customers, stores, financial exposure, data sensitivity, service availability and recovery complexity.

## 10. Risk Prioritisation

Risk priority must consider both likelihood and impact.

The platform may use a documented risk matrix to support consistent prioritisation.

However, a numerical score must not replace professional judgement.

Risks involving severe security exposure, cross-store data access, financial integrity or legal obligations require appropriate escalation even where their likelihood is uncertain.

## 11. Risk Treatment

Risk treatment may include:

### 11.1 Avoid

Stop or redesign the activity that creates an unacceptable risk.

### 11.2 Reduce

Introduce controls that reduce likelihood or impact.

### 11.3 Transfer or Share

Allocate specific responsibilities or exposure through an appropriate agreement or insurance arrangement.

Transfer does not remove the platform's responsibility to oversee risks within its control.

### 11.4 Accept

Accept the residual risk through an authorised and documented decision.

Risk acceptance must not override legal obligations or mandatory security requirements.

## 12. Risk Ownership

Every material risk must have an accountable owner.

The owner is responsible for:

- Maintaining an accurate risk description.
- Reviewing the assessment.
- Coordinating treatment.
- Tracking corrective actions.
- Reporting changes in exposure.
- Escalating risks that exceed their authority.

Risk ownership does not automatically grant authority to accept the risk.

## 13. Risk Acceptance

Risk acceptance must be performed by an authority appropriate to the risk's scope and impact.

Acceptance records must include:

- Risk identifier.
- Description.
- Residual exposure.
- Reason for acceptance.
- Existing controls.
- Compensating measures.
- Accepting authority.
- Approval date.
- Review date or triggering conditions.

Unacceptable risks must not be treated as accepted merely because remediation has been delayed.

## 14. Platform and Store Risk Boundaries

Risks must be assessed at the correct level.

Platform-level risks may affect shared infrastructure, multiple stores or central services.

Store-level risks may be limited to an individual store's operations.

Shared risks must identify all affected stores and the responsible platform authority.

A store must not be required to accept risks created by platform-wide changes without appropriate assessment and governance.

## 15. Security and Privacy Risk Management

Security and privacy risks require particular attention.

Assessment should consider:

- Privileged account compromise.
- Weak authentication or authorisation.
- Cross-store data exposure.
- Insecure frontend configuration.
- Exposed private credentials.
- Vulnerable dependencies.
- Inadequate encryption.
- Unsafe file uploads.
- Data exports.
- Inadequate retention or deletion.
- Provider security failures.

Critical security risks must be escalated and addressed through the relevant incident and security processes.

## 16. Financial and Commercial Risk

Financial and commercial risk assessments should consider:

- Unauthorised payments or refunds.
- Duplicate transactions.
- Incorrect financial postings.
- Unreconciled settlements.
- Stock ownership disputes.
- Capital advances.
- Outstanding repayments.
- Unclear commission terms.
- Provider fees.
- Store financial distress.
- Conflicts of interest.

Material financial exposure requires appropriate approval and separation of duties.

Performance scores alone must not authorise financial assistance, penalties or commercial intervention.

## 17. Technology and Provider Dependency Risk

The platform must identify critical dependencies, including:

- Hosting providers.
- Database services.
- Authentication services.
- Payment providers.
- Communication providers.
- Storage services.
- Domain and DNS services.
- External APIs.
- Software libraries.

Assess provider availability, security, cost, contractual terms, data portability, recovery capabilities and exit options.

Critical services should have documented contingency arrangements where practical.

## 18. Migration and Change Risk

Material changes and migrations must include risk assessment before implementation.

Consider:

- Data loss or corruption.
- Incompatible API contracts.
- Concurrent write paths.
- Failed migrations.
- Provider-side transactions.
- Incomplete rollback.
- Storefront disruption.
- Permission changes.
- Unverified production configuration.

High-risk changes require explicit approval and appropriate recovery arrangements.

## 19. Risk Register

Material risks must be recorded in a central risk register.

Each entry should include:

- Risk ID.
- Title and description.
- Category.
- Date identified.
- Risk owner.
- Affected services and stores.
- Likelihood and impact.
- Inherent and residual ratings.
- Existing controls.
- Treatment actions.
- Action owners.
- Due dates where applicable.
- Acceptance or escalation status.
- Last review date.

Risk records must remain traceable when risks are closed, transferred or superseded.

## 20. Monitoring and Review

Risk owners must review risks when:

- A material incident occurs.
- A significant change is proposed.
- A new store is onboarded.
- A provider or dependency changes.
- A vulnerability is discovered.
- Financial or operational exposure changes.
- A control fails.
- New legal or contractual obligations emerge.

The platform should establish a regular risk review schedule appropriate to its operational maturity.

## 21. Risk Escalation

Risks must be escalated when:

- They exceed the owner's authority.
- They affect multiple stores.
- They create significant customer or financial exposure.
- They involve suspected legal or regulatory breaches.
- Existing controls are ineffective.
- Treatment is overdue.
- Residual risk exceeds approved tolerance.

Critical risks require prompt escalation to the Platform Owner and relevant technical or operational authorities.

## 22. Risk Reporting

Risk reports should communicate:

- Highest-priority risks.
- Changes in risk exposure.
- Newly identified risks.
- Overdue treatment actions.
- Accepted residual risks.
- Significant incidents.
- Control failures.
- Decisions requiring approval.

Reports must distinguish actual incidents from potential future events.

## 23. Risk Management and Business Decisions

Risk assessments should inform platform investment, implementation sequencing, store onboarding, provider selection and operational decisions.

Risk information must support accountable decisions rather than create automatic interventions.

Decisions involving financial assistance, penalties, access restrictions or store suspension must follow their separate approval requirements.

## 24. Exceptions

Exceptions to this policy must be documented and approved by the appropriate authority.

Each exception must identify its scope, justification, duration, residual risk and compensating controls.

No exception may authorise unlawful activity or bypass mandatory security boundaries.

## 25. Open Decisions

The following matters require further definition:

- Formal risk appetite and tolerance.
- Risk scoring methodology.
- Risk acceptance thresholds.
- Risk review frequency.
- Central risk register ownership and location.
- Mandatory escalation thresholds.
- Risk reporting format.
- Treatment action deadlines.
- Independent risk review requirements.
- Risk assessment requirements for new stores and providers.

## 26. Relationship to Other Documents

This policy must be read alongside:

- PLATFORM_GOVERNANCE.md
- ARCHITECTURE_GOVERNANCE.md
- DECISION_REGISTER.md
- DATA_GOVERNANCE.md
- CHANGE_MANAGEMENT_POLICY.md
- SECURITY_ARCHITECTURE.md
- DEPLOYMENT_ARCHITECTURE.md
- OPERATIONS_RUNBOOK.md
- INCIDENT_RESPONSE_PLAYBOOK.md
- BACKUP_AND_DISASTER_RECOVERY.md
- FINANCE_ARCHITECTURE.md
- PERFORMANCE_ARCHITECTURE.md
- MIGRATION_PLAN.md

## 27. Document Management

This policy remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to affected stakeholders.
