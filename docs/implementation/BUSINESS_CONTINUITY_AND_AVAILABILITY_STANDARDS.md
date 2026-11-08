# Business Continuity and Service Availability Standards

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define the technical and operational standards for maintaining essential platform services during disruptions and restoring normal operations safely.

Continuity planning must protect stores, customers, business transactions, financial records and platform operations.

## Scope

These standards apply to:

- Public storefronts.
- Platform administration.
- Store administration.
- Backend APIs.
- Database services.
- Product catalogue services.
- Inventory and order processing.
- Payment integrations.
- Notifications.
- External providers.
- Background processing.
- Deployment and infrastructure.
- Operational support functions.

## Continuity Principles

Critical business operations must have identified dependencies and recovery procedures.

Availability must be considered across the complete service, not only the application server.

A service is not considered operational merely because its endpoint responds.

Recovery must preserve data integrity, financial accuracy, store isolation and security controls.

Degraded operation must be communicated clearly.

Do not promise uninterrupted availability where the platform or its providers cannot guarantee it.

## Service Classification

Classify services according to their operational importance.

Suggested categories:

| Classification | Description |
|---|---|
| Critical | Failure prevents essential business operations or creates significant security or financial risk |
| High | Failure materially disrupts store or platform operations |
| Standard | Failure affects non-essential functionality with available workarounds |
| Supporting | Failure affects supplementary functionality without immediately stopping core operations |

Final service classifications must be approved and documented.

## Service Dependencies

Document dependencies for each critical service.

Dependencies may include:

- Hosting and DNS.
- Frontend delivery.
- Backend APIs.
- PostgreSQL database.
- Authentication.
- File and media storage.
- Payment providers.
- Notification providers.
- External APIs.
- Background job processing.
- Developer and operational access.

Assess the effect of a dependency failure on each affected store and shared platform service.

## Availability Monitoring

Monitor critical services continuously where supported.

Monitoring should identify:

- Service unavailability.
- Elevated response times.
- Increased error rates.
- Database connection failures.
- Authentication failures.
- Payment processing disruption.
- Delayed background jobs.
- Webhook processing failures.
- Storage and media delivery problems.
- Capacity constraints.

Monitoring must distinguish a shared platform outage from an isolated store or provider issue.

## Degraded Operation

Where full service is unavailable, identify which operations can safely continue.

Examples may include:

- Displaying previously cached public catalogue information.
- Allowing users to view existing non-sensitive content.
- Temporarily disabling checkout when price or inventory cannot be confirmed.
- Preserving submitted requests for controlled recovery where safe.
- Displaying clear service-status messages.

Do not permit operations that could create inconsistent orders, duplicate charges or inaccurate inventory.

Cached information must not be presented as confirmed current availability.

## Payment Service Disruption

Payment provider outages require special handling.

A payment request with an uncertain outcome must not automatically be treated as failed.

Use provider references and idempotency controls to determine the actual transaction outcome.

Do not create duplicate charges by blindly retrying uncertain requests.

Do not confirm an order as paid solely because the customer reports successful payment.

Follow the payment reconciliation procedure before resolving uncertain financial outcomes.

## Database Disruption

Database availability is essential to authoritative business operations.

During database disruption:

- Prevent writes that cannot be safely persisted.
- Do not use unapproved alternative databases as competing sources of truth.
- Preserve pending operation references where appropriate.
- Avoid manual changes that bypass normal transaction controls.
- Follow the backup and disaster recovery procedures.
- Verify recovered data before restoring dependent operations.

## External Provider Disruption

External providers may experience outages independently of the platform.

Maintain provider dependency records and escalation contacts.

Where practical, support controlled retries and recovery of pending operations.

Do not switch providers without assessing data consistency, transaction references, credentials, integration compatibility and settlement implications.

## Storefront Continuity

Each store storefront must be assessed independently as well as part of the shared platform.

A storefront failure should not unnecessarily affect other stores.

Store-specific configuration and deployment failures must be distinguishable from shared backend failures.

Where supported, static public content may remain available during limited backend disruption, provided it does not misrepresent current prices, inventory or transaction status.

## Administrative Continuity

Platform and Store Admin operations must have documented recovery paths.

Loss of administrative access must not lead to uncontrolled account creation or privilege escalation.

Account recovery must follow identity verification and approved access recovery procedures.

Critical operational responsibilities must have identified authorised replacements or escalation arrangements.

## Recovery Priorities

Recovery priorities must be based on business impact and service dependencies.

Consider:

1. Security containment and protection of data.
2. Database and authoritative record integrity.
3. Identity and access services.
4. Critical backend APIs.
5. Payment and order processing.
6. Storefront availability.
7. Inventory and fulfilment operations.
8. Notifications and supporting services.
9. Reporting and supplementary features.

The final recovery sequence must account for actual architecture and dependencies.

## Recovery Objectives

Define a Recovery Time Objective (RTO) and Recovery Point Objective (RPO) for each critical service and data category.

RTO represents the target time to restore service.

RPO represents the acceptable amount of data loss measured in time.

Targets must be agreed according to business impact, technical capability and recovery cost.

Do not claim that an objective is achievable until the recovery process has been tested.

## Manual Workarounds

Manual workarounds must be documented and authorised.

They must identify:

- Permitted operations.
- Responsible personnel.
- Required records.
- Approval requirements.
- Data protection measures.
- Reconciliation requirements.
- Conditions for stopping the workaround.

Manual processes must not bypass financial approvals, store isolation or transaction integrity controls.

## Communication

During significant disruption, communicate:

- Affected services.
- Affected stores.
- Known customer impact.
- Current operational status.
- Available workarounds.
- Next communication point.
- Recovery status.

Avoid unsupported restoration estimates.

Internal operational communication must remain distinguishable from public status communication.

## Incident Coordination

Major disruptions must have an identified incident coordinator.

The coordinator manages investigation, communication, recovery priorities and escalation.

Emergency containment actions may be taken under the authority defined in the Incident Response Playbook.

Preserve evidence and maintain a record of significant decisions.

## Backup and Disaster Recovery

Backups are a critical continuity control.

Backup procedures, retention, restoration testing and recovery objectives must follow `BACKUP_AND_DISASTER_RECOVERY.md`.

A successful backup job does not prove that recovery is possible.

Restoration must be tested and verified.

## Testing and Exercises

Continuity arrangements must be exercised periodically.

Exercises should cover:

- Database unavailability.
- Hosting or DNS failure.
- Authentication disruption.
- Payment provider outage.
- Notification provider outage.
- Failed deployment.
- Data corruption.
- Loss of administrative access.
- Shared platform disruption.
- Store-specific storefront disruption.

Record exercise findings and corrective actions.

## Recovery Verification

Before declaring normal service restored:

- Confirm service health.
- Verify database integrity.
- Verify critical business workflows.
- Check pending and uncertain transactions.
- Check background jobs and webhook queues.
- Confirm store isolation.
- Verify authentication and permissions.
- Review monitoring and error rates.
- Communicate restoration.
- Record remaining risks.

Do not close an incident solely because the application is reachable.

## Responsibilities

The Platform Owner is responsible for platform continuity governance and approval of material recovery decisions.

Technical operators execute approved recovery procedures.

Store Admins coordinate store-level continuity and communicate store-specific impact.

External providers remain responsible for their own service operations under their applicable agreements.

## Open Decisions

The following require further agreement:

- Service availability targets.
- RTO and RPO by service and data category.
- Monitoring and alerting provider.
- Public service-status communication method.
- Backup and recovery service ownership.
- Provider redundancy requirements.
- Continuity exercise frequency.
- Emergency operational delegation.
- Manual workaround approval boundaries.

## Relationship to Other Documents

This document should be read with:

- `OPERATIONS_RUNBOOK.md`
- `INCIDENT_RESPONSE_PLAYBOOK.md`
- `BACKUP_AND_DISASTER_RECOVERY.md`
- `PRODUCTION_READINESS_CHECKLIST.md`
- `OBSERVABILITY_AND_LOGGING_STANDARDS.md`
- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `MIGRATION_PLAN.md`
- `CHANGE_MANAGEMENT_POLICY.md`
- `docs/architecture/OPERATIONS_ARCHITECTURE.md`
- `docs/architecture/DEPLOYMENT_ARCHITECTURE.md`
- `docs/architecture/INTEGRATION_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to continuity arrangements must be assessed for their effect on shared platform services and every participating store.
