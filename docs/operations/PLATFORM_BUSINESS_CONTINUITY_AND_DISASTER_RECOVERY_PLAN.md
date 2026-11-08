# Platform Business Continuity and Disaster Recovery Plan

## 1. Purpose

This document defines how the parent company prepares for, responds to and recovers from incidents that threaten the availability, integrity or continuity of the multi-store platform.

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
5. Every major incident must have an accountable incident lead.
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

## 6. Incident Severity

### Severity 1: Critical

Examples:

- Complete platform outage.
- Confirmed unauthorised access to critical infrastructure.
- Database loss or widespread corruption.
- Payment or order processing failure affecting multiple stores.
- Active incident threatening customer or financial data.

Response:

- Immediate escalation.
- Assign an incident lead.
- Protect affected systems.
- Notify relevant internal decision-makers.
- Begin recovery or containment.
- Assess legal and regulatory notification duties.

### Severity 2: High

Examples:

- Several stores unavailable.
- Major API failure.
- Admin dashboard unavailable across the platform.
- Significant payment integration disruption.
- Important data inconsistency affecting operations.

Response:

- Prioritised technical investigation.
- Store Owner communication where affected.
- Recovery plan and progress updates.
- Escalation if the incident worsens.

### Severity 3: Moderate

Examples:

- One storefront unavailable.
- Non-critical feature failure.
- Delayed notifications.
- Limited reporting disruption.

Response:

- Assign an owner.
- Record impact.
- Apply a controlled fix.
- Confirm service restoration.

### Severity 4: Low

Examples:

- Minor visual defect.
- Non-critical performance issue.
- Small administrative inconvenience.

Response:

- Record and schedule remediation.
- Escalate if impact increases.

## 7. Incident Response Procedure

Every significant incident must follow a controlled process.

### Step 1: Detection

An incident may be detected through:

- Automated monitoring.
- Error alerts.
- Customer reports.
- Store Owner reports.
- Payment provider notifications.
- Hosting provider notifications.
- Internal operational checks.

### Step 2: Registration

Create an incident record containing:

- Incident ID.
- Date and time detected.
- Reporter.
- Affected systems.
- Affected stores.
- Initial severity.
- Known symptoms.
- Suspected cause.
- Incident lead.

### Step 3: Assessment

Determine:

- What is unavailable?
- Which stores are affected?
- Are customers affected?
- Are payments or orders affected?
- Is data integrity at risk?
- Is the incident security-related?
- Are third-party providers involved?
- Is manual operation possible?

### Step 4: Containment

Take appropriate steps to prevent further damage.

Examples:

- Disable an affected integration.
- Restrict compromised credentials.
- Stop unsafe deployments.
- Suspend affected background jobs.
- Isolate compromised systems.
- Disable affected checkout functionality.
- Prevent additional writes to corrupted data.

Do not delete evidence or destroy logs during containment.

### Step 5: Recovery

Restore services using approved procedures.

Recovery must be controlled, verified and documented.

### Step 6: Validation

Confirm:

- Services are responding.
- Authentication works.
- Store isolation remains intact.
- Products and inventory are accurate.
- Orders are present and consistent.
- Payments reconcile.
- Customer information remains protected.
- Background jobs are functioning.
- Notifications are operating.

### Step 7: Closure

Close the incident only after:

- Service restoration is confirmed.
- Remaining risks are documented.
- Affected parties have been informed.
- Financial and data reconciliation is complete or assigned.
- Follow-up actions have owners and deadlines.

## 8. Backup Policy

Backups must cover critical business information.

### 8.1 Database Backups

The backup strategy must define:

- Backup frequency.
- Backup type.
- Retention period.
- Encryption.
- Storage location.
- Access permissions.
- Backup verification.
- Restoration procedures.

The database backup scope should include:

- Store records.
- Store Owner assignments.
- Customer accounts.
- Customer consent records.
- Product catalogue.
- Store-specific product listings.
- Inventory.
- Orders.
- Payments and reconciliation records.
- Refunds and returns.
- Supplier records.
- Marketing and creative records.
- Audit history.
- Platform configuration.

### 8.2 File and Media Backups

Protect:

- Original product photographs.
- Optimised product images.
- Videos.
- Store branding assets.
- Creative deliverables.
- Documents.
- Relevant configuration files.

Media backups must preserve relationships between files and their owning stores or products.

### 8.3 Configuration Backups

Maintain protected copies of:

- Infrastructure configuration.
- DNS configuration.
- Deployment configuration.
- Environment variable names and required configuration references.
- Database migration history.
- CI/CD workflows.
- Application source code.
- Critical operational documentation.

Never store plaintext production secrets in source control or ordinary backup archives.

### 8.4 Backup Isolation

At least one recovery copy should be protected against compromise of the primary production environment.

Use appropriate access separation, encryption and retention controls.

A backup stored in the same account with unrestricted production access may be vulnerable to the same incident.

## 9. Backup Verification and Restore Testing

A successful backup job does not prove that restoration will work.

The parent company must periodically:

1. Confirm that backups completed.
2. Verify backup integrity.
3. Confirm encryption and access controls.
4. Restore a backup into an isolated environment.
5. Verify database relationships and constraints.
6. Check media references.
7. Run application health checks.
8. Validate representative orders and financial records.
9. Record restoration duration.
10. Document any failures.

Restore testing must not overwrite production data.

The testing schedule must reflect system criticality and the actual backup capabilities.

## 10. Database Recovery

Database recovery must follow a controlled procedure.

Before restoration:

- Identify the failure.
- Determine the affected database and tables.
- Identify the latest valid backup.
- Assess whether point-in-time recovery is available.
- Preserve current database evidence where appropriate.
- Obtain approval for the restoration approach.

After restoration:

- Verify schema and migration state.
- Check foreign-key relationships.
- Check store ownership and assignment records.
- Validate order and payment records.
- Confirm inventory consistency.
- Check audit history.
- Review data created after the recovery point.
- Reconcile missing or duplicated transactions.

Never assume that restoring the database automatically restores external payment, email or storage systems.

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

The parent company must maintain a communication process for affected Store Owners.

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

Where customers are affected, communication must be accurate and proportionate.

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

## 15. Security Incident Recovery

Security incidents require coordination between incident response and disaster recovery.

The parent company must:

1. Contain the threat.
2. Preserve relevant evidence.
3. Identify affected systems and data.
4. Revoke compromised credentials.
5. Rotate affected secrets.
6. Investigate persistence mechanisms.
7. Confirm that recovery systems are safe.
8. Restore from trusted sources.
9. Patch the underlying vulnerability.
10. Monitor for recurrence.

Do not restore compromised backups without investigating whether they contain the same threat.

Security incident handling must follow the platform's existing incident response and security policies.

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

## 19. Recovery Roles

The parent company must assign clear responsibilities.

### Incident Lead

Coordinates the response, assigns actions and manages escalation.

### Technical Recovery Lead

Responsible for infrastructure, application, database and service restoration.

### Security Lead

Assesses security exposure, containment and safe restoration.

### Finance Lead

Coordinates payment verification, transaction reconciliation and financial corrections.

### Store Operations Lead

Coordinates Store Owner communication and operational workarounds.

### Communications Lead

Manages approved internal, Store Owner and customer updates.

One person may hold multiple roles in a small team, but responsibilities must remain clear.

## 20. Business Continuity Documentation

Maintain a protected continuity repository containing:

- Current system architecture.
- Service dependency register.
- Backup inventory.
- Restore procedures.
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

## 22. Post-Incident Review

Major incidents require a documented review.

The review should identify:

- Root cause.
- Timeline.
- Affected stores and customers.
- Financial impact.
- Data impact.
- Recovery effectiveness.
- Communication effectiveness.
- Control failures.
- Contributing factors.
- Corrective actions.

The review must focus on preventing recurrence rather than assigning blame without evidence.

Corrective actions must have accountable owners and completion dates.

## 23. Platform Implementation Requirements

Where the platform provides continuity-related functionality, it should support:

- Central incident records.
- Incident severity.
- Affected-store relationships.
- Incident ownership.
- Status tracking.
- Communication history.
- Recovery activity logs.
- Backup verification records.
- Recovery exercise records.
- Post-incident actions.

Access must be restricted according to role.

Store Owners must only see incident information relevant to their stores unless broader communication is authorised.

Incident records must not expose sensitive security details to unauthorised users.

## 24. Testing Requirements

Automated and operational tests should verify:

1. Backup jobs report success or failure.
2. Backup records include timestamps and scope.
3. Restore procedures can recreate a usable environment.
4. Restored records preserve store isolation.
5. Customer and order relationships remain valid.
6. Inventory remains consistent.
7. Payment references remain traceable.
8. Media files remain associated with the correct store and product.
9. Recovery does not create duplicate orders.
10. Access controls remain enforced after restoration.
11. Incident records retain an audit trail.
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

## 26. Governing Rule

The platform must be designed and operated on the assumption that failures will eventually happen.

The parent company must be able to identify what failed, protect affected information, restore critical services and account for every important transaction.

A recovery plan is only credible when its backups, procedures, responsibilities and recovery objectives have been tested.
