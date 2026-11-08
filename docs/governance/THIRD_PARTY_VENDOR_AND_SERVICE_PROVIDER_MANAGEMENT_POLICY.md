# Third-Party Vendor and Service Provider Management Policy

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-GOV-ACB5141B4A |
| Category | Governance |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Establish standards for selecting, assessing, approving, integrating, monitoring and discontinuing third-party vendors and service providers used by the platform or participating stores.

The policy aims to reduce operational, security, financial, legal and dependency risks arising from external services.

## Scope

This policy applies to external providers supplying:

- Application hosting.
- Database and storage services.
- Authentication.
- Payment processing.
- Email and SMS delivery.
- Domain registration and DNS.
- Analytics and monitoring.
- Marketing services.
- Software development tools.
- Customer support systems.
- Financial and accounting services.
- Logistics and fulfilment.
- Other services supporting platform or store operations.

## Core Principles

External providers must have a defined business purpose.

Provider selection must consider security, reliability, cost, operational suitability and dependency risk.

The platform must retain control of its own business records and access decisions.

Provider integration must not bypass platform security or store isolation.

Provider access must be limited to the information and operations required.

## Provider Classification

Classify providers according to their function and risk.

| Classification | Examples |
|---|---|
| Critical infrastructure | Hosting, database, authentication |
| Financial | Payment processing, banking, accounting |
| Customer data | CRM, messaging, support |
| Operational | Logistics, fulfilment, inventory services |
| Development | Source control, build and deployment tools |
| Marketing | Campaign delivery, analytics |
| General business | Other supporting services |

A provider may belong to multiple categories.

## Provider Ownership

Every material provider relationship must have an identified internal owner.

The owner is responsible for:

- Business justification.
- Provider assessment.
- Access requirements.
- Contract and commercial records.
- Integration oversight.
- Operational monitoring.
- Renewal review.
- Incident escalation.
- Exit planning.

Platform-level providers are managed under platform authority.

Store-specific provider relationships remain under the relevant Store Admin's authority, subject to platform rules and applicable agreements.

## Provider Assessment

Before onboarding a material provider, assess:

- Business purpose.
- Service capabilities.
- Reliability.
- Security controls.
- Privacy practices.
- Data processing locations.
- Access requirements.
- Integration methods.
- Availability commitments.
- Support arrangements.
- Pricing and commercial terms.
- Contract conditions.
- Data export capabilities.
- Termination procedures.
- Dependency and lock-in risks.

The depth of assessment must reflect the provider's risk and access.

## Provider Approval

Provider onboarding must receive approval from the authority responsible for the affected service and data.

Platform-wide providers require platform-level approval.

Store-specific providers require the appropriate store approval.

Providers processing sensitive information or supporting critical operations require additional review.

No provider should receive production access before the required approval and security assessment.

## Contracts and Commercial Records

Maintain relevant provider agreements and commercial records.

Records should identify:

- Provider legal or trading name.
- Service description.
- Internal owner.
- Contract or agreement reference.
- Effective date.
- Renewal date.
- Fees and billing arrangements.
- Service commitments.
- Data processing terms.
- Termination conditions.
- Support contacts.

Do not assume a provider's advertised service level is a contractual commitment.

## Data Protection

Before sharing data with a provider, establish:

- What information is required.
- Why it is required.
- Which party controls the relevant processing.
- Whether the provider acts as a processor or independent service provider.
- Where the information is processed.
- How long it is retained.
- How deletion and export requests are handled.
- What happens when the relationship ends.

Only disclose the minimum information necessary.

## Store Data Boundaries

Provider access must respect platform and store ownership boundaries.

Where a provider serves multiple stores, the integration must preserve reliable store attribution.

A provider must not receive unrestricted access to all store data merely because it serves one participating store.

Shared provider accounts require reliable separation of transactions, events, fees, settlements and operational records.

## Security Assessment

Assess provider security controls proportionately to risk.

Consider:

- Authentication.
- Access control.
- Encryption.
- Credential management.
- Vulnerability management.
- Incident response.
- Audit capabilities.
- Data retention.
- Backup and recovery.
- Subcontractors.
- Security certifications or independent assessments where relevant.

Do not rely solely on a provider's marketing claims.

## Credential Management

Provider credentials must be protected and managed through approved secret-management practices.

Requirements include:

- No privileged credentials in browser code.
- No secrets committed to source control.
- Least-privilege access.
- Restricted credential distribution.
- Rotation where appropriate.
- Revocation when access is no longer required.
- Secure handling of test and production credentials.

Provider credentials must not be included in public store integration packages.

## Integration Approval

Every material integration must have a documented purpose and owner.

Before activation, verify:

- API or integration contract.
- Authentication method.
- Store attribution.
- Permission scope.
- Data exchanged.
- Error handling.
- Retry behaviour.
- Idempotency.
- Webhook validation.
- Monitoring.
- Failure and recovery procedures.

Use approved integration patterns.

## Provider Environments

Use separate provider environments where supported.

Development and testing must not unintentionally affect production transactions or customer data.

Production credentials must not be reused in ordinary development environments.

## Payment Providers

Payment providers require additional financial and security assessment.

Verify:

- Supported payment methods.
- Transaction references.
- Store attribution.
- Refund handling.
- Settlement reporting.
- Dispute and chargeback support.
- Webhook authenticity.
- Idempotency.
- Reconciliation capabilities.
- Data security responsibilities.

Do not store unnecessary cardholder information.

Do not assume a shared provider account can support multiple stores until reliable attribution and reconciliation have been demonstrated.

## Provider Reliability

Monitor material provider dependencies.

Track:

- Availability.
- Response times.
- Errors.
- Rate limits.
- Processing delays.
- Support responsiveness.
- Planned maintenance.
- Service changes.

A provider outage must not automatically be treated as a platform application defect.

## Provider Incidents

Provider-related incidents must follow the incident response process.

The internal owner must:

- Assess affected services and stores.
- Determine customer and financial impact.
- Confirm whether data or credentials are at risk.
- Contact the provider where necessary.
- Coordinate internal containment.
- Communicate material impact.
- Track recovery.
- Preserve relevant evidence.

## Provider Changes

Material provider changes require impact assessment.

Examples include:

- API changes.
- Authentication changes.
- Pricing changes.
- Service discontinuation.
- Data processing changes.
- New subcontractors.
- Hosting location changes.
- Security incidents.
- Contract changes.

Changes affecting shared integrations must be assessed across all affected stores.

## Provider Performance Reviews

Review critical provider relationships periodically.

Consider:

- Service reliability.
- Support quality.
- Security posture.
- Commercial value.
- Data handling.
- Operational burden.
- Contract compliance.
- Alternative providers.
- Exit readiness.

Reviews should be proportionate to provider risk and importance.

## Provider Renewal

Before renewal, assess whether the service remains necessary and suitable.

Confirm current pricing, terms, usage, service performance and any outstanding risks.

Renewal must receive the appropriate approval.

## Provider Exit

Provider termination must be planned and controlled.

Consider:

- Alternative service availability.
- Data export.
- Data retention and deletion.
- Credential revocation.
- Webhook and integration shutdown.
- DNS and domain dependencies.
- Pending transactions.
- Financial reconciliation.
- Customer impact.
- Store-specific dependencies.
- Historical records.
- Contractual obligations.

Do not terminate a critical provider relationship before required data and operational continuity arrangements are in place.

## Subcontractors and Subprocessors

Where a provider uses subcontractors or subprocessors, assess material downstream risks.

Understand whether information is shared with additional parties and whether the relevant contractual and privacy arrangements permit it.

## Provider Risk Register

Maintain a record of material provider risks.

Include:

- Provider.
- Service.
- Internal owner.
- Risk description.
- Impact.
- Likelihood.
- Existing controls.
- Treatment.
- Review date.
- Exit considerations.

## Prohibited Practices

The following are prohibited:

- Connecting unapproved providers to production systems.
- Sharing privileged credentials through unsecured channels.
- Giving a provider unrestricted access without justification.
- Allowing provider payloads to establish unverified store authority.
- Ignoring provider security incidents.
- Using production customer data unnecessarily in testing.
- Terminating critical services without continuity planning.
- Treating provider availability as guaranteed without evidence.

## Open Decisions

The following require further agreement:

- Approved provider assessment criteria.
- Contract approval thresholds.
- Provider review frequency.
- Minimum security evidence.
- Data processing agreement requirements.
- Provider risk scoring.
- Provider exit approval authority.
- Critical provider alternatives.
- Shared account attribution requirements.
- Provider inventory ownership and maintenance.

## Relationship to Other Documents

This policy should be read with:

- `DATA_GOVERNANCE.md`
- `RISK_MANAGEMENT_POLICY.md`
- `CHANGE_MANAGEMENT_POLICY.md`
- `INTEGRATION_ARCHITECTURE.md`
- `INTEGRATION_ARCHITECTURE.md`
- `FINANCIAL_CONTROLS_AND_APPROVALS.md`
- `STORE_SUPPORT_AND_ESCALATION_POLICY.md`
- `INCIDENT_RESPONSE_PLAYBOOK.md`
- `STORE_EXIT_AND_DATA_HANDOVER_PROCEDURE.md`
- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`

## Document Management

This policy is maintained by the Platform Owner.

Changes must be assessed for their effect on provider risk, data protection, store isolation, financial accountability and operational continuity.
