# Platform Monitoring, Observability and Alerting Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-OPS-FA5D32685B |
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

This document defines the standards for monitoring the multi-store platform, identifying operational problems, investigating failures and notifying the responsible people.

The platform must provide sufficient visibility into its infrastructure, application services, storefronts, integrations and business-critical workflows.

Monitoring must help the parent company identify:

- Service outages.
- Application errors.
- Performance degradation.
- Database problems.
- Failed background jobs.
- Payment integration failures.
- Inventory inconsistencies.
- Order processing failures.
- Security-related anomalies.
- Storage and infrastructure capacity problems.
- Store-specific operational issues.

The objective is to detect problems early, understand their impact and support timely corrective action.

## 2. Core Principles

1. Critical services must be monitored continuously where technically possible.
2. Monitoring must distinguish platform-wide incidents from individual store problems.
3. Alerts must be actionable and routed to an accountable person.
4. Monitoring must not expose customer information unnecessarily.
5. Logs, metrics and traces must be protected against unauthorised access.
6. Business events must be distinguishable from technical errors.
7. Monitoring must not rely exclusively on customer complaints.
8. Alert thresholds must be based on observed behaviour and business impact.
9. Monitoring systems must themselves be monitored.
10. Every critical alert must have a documented response procedure.

## 3. Monitoring Scope

Monitoring must cover five main areas.

### 3.1 Infrastructure Monitoring

Monitor the underlying infrastructure supporting the platform.

Examples:

- Hosting availability.
- CPU utilisation.
- Memory utilisation.
- Disk capacity.
- Network connectivity.
- Database resource consumption.
- Storage availability.
- Server restarts.
- Infrastructure health checks.

### 3.2 Application Monitoring

Monitor application behaviour.

Examples:

- API availability.
- API response times.
- HTTP error rates.
- Application exceptions.
- Authentication failures.
- Failed requests.
- Unhandled errors.
- Application startup failures.
- Dependency failures.

### 3.3 Storefront Monitoring

Monitor the customer-facing experience.

Examples:

- Storefront availability.
- Product page availability.
- Catalogue loading.
- Search functionality.
- Cart operations.
- Checkout availability.
- Mobile rendering failures.
- Broken media references.
- Store-specific configuration errors.

### 3.4 Integration Monitoring

Monitor external services.

Examples:

- Payment providers.
- Email delivery.
- File storage.
- DNS.
- Domain and TLS certificate status.
- Analytics services.
- Courier and fulfilment integrations.
- Authentication providers.

### 3.5 Business Operations Monitoring

Monitor important business workflows.

Examples:

- Orders created.
- Orders awaiting payment confirmation.
- Payment verification delays.
- Failed payment callbacks.
- Inventory reservation failures.
- Stock reconciliation differences.
- Refund processing failures.
- Failed fulfilment updates.
- Unprocessed administrative requests.

Business monitoring must not be confused with technical monitoring. A successful API response does not necessarily mean that the business operation completed correctly.

## 4. Monitoring Architecture

Monitoring should follow a layered structure.

### Layer 1: Infrastructure Telemetry

Collect infrastructure health and resource metrics.

### Layer 2: Application Telemetry

Collect application logs, exceptions, request metrics and dependency information.

### Layer 3: Business Event Monitoring

Record important events such as order creation, payment confirmation, stock adjustment and refund completion.

### Layer 4: Alert Evaluation

Evaluate metrics and events against documented thresholds and business rules.

### Layer 5: Incident Management

Route actionable alerts into the incident management process.

Monitoring components should be independent enough that an application outage does not automatically disable all visibility into that outage.

## 5. Health Checks

Critical services should expose appropriate health information.

Where supported, distinguish:

### 5.1 Liveness

Indicates whether a process is running and able to continue operating.

### 5.2 Readiness

Indicates whether a service is ready to receive normal traffic.

### 5.3 Dependency Health

Indicates whether critical dependencies are available.

Examples include:

- Database connectivity.
- Storage access.
- Authentication services.
- Required external APIs.

Health endpoints must not expose secrets, connection strings, internal infrastructure details or sensitive configuration.

A temporary external provider failure should not automatically cause every application component to restart continuously.

## 6. Application Performance Monitoring

The platform should monitor:

- Request volume.
- Request duration.
- Error rate.
- Database query duration.
- Slow queries.
- External API duration.
- Background job duration.
- Queue depth where applicable.
- Memory consumption.
- Resource exhaustion.
- Unhandled exceptions.

Where possible, performance should be measured using percentiles such as p50, p95 and p99 rather than relying only on average response time.

Performance thresholds must be established from actual usage patterns and service requirements.

## 7. Database Monitoring

Monitor database health and performance.

Important indicators include:

- Database availability.
- Connection count.
- Connection pool exhaustion.
- Query latency.
- Slow queries.
- Lock contention.
- Deadlocks.
- Storage utilisation.
- Backup status.
- Replication health where applicable.
- Failed migrations.
- Unusual database errors.

Monitor critical relationships and constraints through controlled integrity checks.

Do not run expensive integrity queries continuously against production without assessing their performance impact.

## 8. Store-Level Monitoring

The architecture must support identifying operational issues affecting individual stores.

Examples:

- One store's storefront is unavailable.
- A store has broken product images.
- Product listings are failing to load.
- A store has repeated checkout errors.
- A store has an unusually high number of failed fulfilment updates.
- A store's inventory records require reconciliation.
- A store's domain has a TLS or DNS problem.

Store-level monitoring must preserve isolation.

A Store Owner may receive information about their own store's operational health but must not see another store's private logs, customer activity, orders or internal operational information.

Central administrators may access cross-store monitoring according to their authorised responsibilities.

## 9. Business Event Monitoring

Important business operations should generate structured events.

Examples include:

- Product published.
- Product unpublished.
- Inventory adjusted.
- Inventory reservation created.
- Order created.
- Payment initiated.
- Payment confirmed.
- Payment failed.
- Refund requested.
- Refund completed.
- Order fulfilled.
- Order cancelled.
- Store Owner assigned.
- Store configuration changed.
- Store change request approved.
- Marketing campaign launched.

Events should include the relevant identifiers, timestamp, event type, outcome and correlation information.

Avoid placing full customer details, payment credentials or unnecessary personal information in event payloads.

Business event monitoring must not replace the authoritative order, payment, inventory or audit records.

## 10. Logging Standards

Application logs should be structured and searchable.

Where appropriate, log records should contain:

- Timestamp.
- Severity.
- Service name.
- Environment.
- Event name.
- Correlation ID.
- Request ID.
- Store ID where relevant.
- User or actor identifier where appropriate.
- Operation.
- Outcome.
- Error classification.

Logs must not contain:

- Passwords.
- Access tokens.
- API secrets.
- Full payment card details.
- Authentication recovery codes.
- Unnecessary customer personal information.
- Sensitive data from request or response bodies.

Sensitive fields must be excluded or redacted before logging.

Production logging must be configured deliberately. Debug logging should not remain enabled unnecessarily.

## 11. Distributed Tracing and Correlation

Where multiple services participate in one operation, correlation identifiers should allow the operation to be followed across service boundaries.

For example, an order may involve:

1. Storefront request.
2. API request.
3. Database transaction.
4. Payment provider interaction.
5. Payment callback.
6. Order status update.
7. Notification delivery.

A correlation ID should help investigators understand where the operation failed.

Tracing data must follow the same privacy and access-control requirements as application logs.

## 12. Alert Severity

Alerts should use a consistent severity model.

### Critical

Immediate attention required.

Examples:

- Platform-wide outage.
- Database unavailable.
- Confirmed compromise of critical infrastructure.
- Checkout or order creation unavailable across multiple stores.
- Critical data corruption.

### High

Urgent investigation required.

Examples:

- Several stores affected.
- Payment callbacks failing.
- Background jobs accumulating without processing.
- Database capacity approaching exhaustion.
- Significant error-rate increase.

### Medium

Investigation and corrective action required.

Examples:

- One storefront experiencing repeated errors.
- Elevated API latency.
- Email delivery degradation.
- Storage utilisation increasing unusually.

### Low

Informational or planned maintenance alert.

Examples:

- Non-critical service degradation.
- Upcoming certificate expiry.
- Routine backup completion.
- Capacity trend requiring future review.

Severity must reflect business impact, not simply the technical error message.

## 13. Alert Routing

Every actionable alert must have:

- Alert identifier.
- Description.
- Severity.
- Affected service.
- Affected stores where known.
- Detection time.
- Relevant metric or event.
- Recommended initial action.
- Responsible team or role.
- Escalation path.

Critical alerts must reach the designated on-call or incident response contact.

Alerts must not depend on a single communication channel.

Where an alert is not acknowledged within its defined response period, escalation rules should apply.

## 14. Alert Fatigue Prevention

The platform must avoid excessive or repetitive alerts.

Controls should include:

- Grouping related alerts.
- Deduplicating repeated events.
- Suppressing known maintenance noise.
- Applying sensible thresholds.
- Using recovery notifications.
- Defining alert ownership.
- Reviewing frequently triggered alerts.
- Closing alerts when their underlying condition is resolved.

Alert suppression must not hide critical security or data-integrity events.

## 15. Monitoring Storefront Availability

External availability checks should test representative customer-facing routes.

Checks may include:

- Homepage availability.
- Product page availability.
- Catalogue response.
- Store domain resolution.
- TLS certificate validity.
- Critical API availability.

Monitoring should use safe, non-destructive requests.

Do not create real orders, payments or customer accounts merely to test availability unless a controlled synthetic transaction environment has been established.

Where synthetic checkout tests are used, they must not create unintended charges or fulfilment activity.

## 16. Payment Monitoring

Payment monitoring must distinguish:

- Payment initiation.
- Provider acceptance.
- Customer authentication.
- Payment confirmation.
- Callback delivery.
- Platform status update.
- Refund initiation.
- Refund confirmation.

A payment initiation response must not be treated as proof of successful payment.

Monitor:

- Provider availability.
- Callback failures.
- Invalid signatures.
- Repeated callback delivery.
- Unmatched provider references.
- Transactions pending beyond expected periods.
- Refund failures.
- Reconciliation differences.

Financial alerts must be routed to authorised operational or finance personnel.

## 17. Inventory and Order Integrity Monitoring

The platform should identify conditions that may indicate inconsistent business records.

Examples:

- Orders referencing missing products.
- Invalid inventory reservations.
- Negative stock where not permitted.
- Unreleased reservations.
- Duplicate payment references.
- Paid transactions without matching orders.
- Orders marked fulfilled without required fulfilment evidence.
- Refunds without corresponding original transactions.

These checks must respect the platform's inventory and financial architecture.

A detected inconsistency should create an investigation record. The monitoring system must not silently modify financial or inventory records to make the discrepancy disappear.

## 18. Security Monitoring

Security monitoring should include:

- Repeated authentication failures.
- Unusual administrative activity.
- Privilege changes.
- Unexpected access to sensitive records.
- Suspicious API request patterns.
- Unexpected configuration changes.
- Secret or credential exposure indicators.
- Unusual export activity.
- Failed security controls.
- Potential cross-store access violations.

Security alerts must be routed according to the incident response policy.

Monitoring must not become an excuse to collect unnecessary personal information or track users beyond legitimate security and operational purposes.

## 19. Capacity and Resource Monitoring

Monitor resource consumption and trends.

Examples:

- Database storage growth.
- Media storage growth.
- Bandwidth.
- API request volume.
- CPU and memory.
- Background job queues.
- Email sending limits.
- Provider quotas.
- Concurrent connections.

Capacity alerts should provide enough warning for the team to act before a service becomes unavailable.

Growth forecasts should account for the increasing number of stores, products, customers, images, videos and orders.

## 20. TLS, Domain and DNS Monitoring

Monitor:

- Domain expiry.
- DNS resolution.
- Certificate validity.
- Certificate renewal failures.
- Incorrect redirects.
- Domain verification failures.
- Unexpected DNS changes.

Alerts should be sent sufficiently early to allow renewal or correction before service interruption.

Domain ownership and registrar access must remain under approved governance.

## 21. Monitoring Dashboard Requirements

The parent company should maintain a central operational dashboard.

It should show:

- Overall platform status.
- Critical service status.
- Active incidents.
- Storefront availability.
- API performance.
- Database health.
- Payment integration health.
- Background job status.
- Backup status.
- Storage and capacity.
- Security alerts.
- Recent deployments.
- Outstanding operational actions.

The dashboard should support filtering by:

- Environment.
- Service.
- Store.
- Severity.
- Time range.
- Incident status.

Sensitive technical and business information must remain restricted to authorised roles.

## 22. Store Owner Operational Visibility

Store Owners may receive a simplified view of their own store's operational status.

This may include:

- Storefront availability.
- Product publication problems.
- Store-specific integration issues.
- Order processing delays.
- Inventory warnings.
- Relevant maintenance notices.
- Open incidents affecting their store.

The Store Owner view must not expose:

- Other stores' private operational data.
- Central infrastructure secrets.
- Internal security investigation details.
- Another store's customers or transactions.
- Restricted financial or administrative records.

## 23. Maintenance and Deployment Monitoring

Deployments and maintenance activities must be observable.

Record:

- Deployment identifier.
- Application version.
- Environment.
- Deployment time.
- Responsible actor.
- Changes introduced.
- Migration status.
- Health-check results.
- Rollback status where applicable.

Monitor error rates and service health after deployment.

A deployment should be investigated or rolled back when it introduces a serious regression and the rollback is safe.

Database migrations require particular care because application rollback does not automatically reverse schema or data changes.

## 24. Monitoring Data Retention

Define retention periods for:

- Application logs.
- Security logs.
- Metrics.
- Traces.
- Business events.
- Alert history.
- Incident records.
- Monitoring reports.

Retention must balance:

- Operational investigation.
- Security requirements.
- Legal obligations.
- Storage costs.
- Privacy principles.

Do not retain personal information indefinitely merely because a monitoring system can store it.

## 25. Monitoring Access Control

Access must follow least-privilege principles.

Separate permissions for:

- Viewing dashboards.
- Viewing application logs.
- Viewing security logs.
- Managing alert rules.
- Acknowledging alerts.
- Changing monitoring configuration.
- Accessing cross-store reports.

All material changes to monitoring configuration must be recorded.

Store Owners must not receive unrestricted access to central monitoring systems.

## 26. Monitoring System Reliability

The monitoring infrastructure must be monitored independently.

Check:

- Monitoring collector availability.
- Alert delivery.
- Data ingestion delays.
- Missing telemetry.
- Monitoring storage capacity.
- Integration failures.
- Authentication and permission failures.

A silent monitoring failure must not be mistaken for a healthy platform.

## 27. Reporting and Review

Operational reviews should examine:

- Availability.
- Incident frequency.
- Mean time to detect.
- Mean time to acknowledge.
- Mean time to recover.
- Error rates.
- Performance trends.
- Payment failures.
- Background job failures.
- Backup failures.
- Security alerts.
- Store-specific issues.
- Capacity trends.

Metrics must be interpreted in context.

A low incident count does not automatically prove that the platform is healthy. It may also indicate inadequate monitoring.

## 28. Implementation Requirements

Before implementing monitoring:

1. Inventory all platform services.
2. Identify critical dependencies.
3. Define service ownership.
4. Establish health-check endpoints.
5. Introduce structured logging.
6. Define correlation identifiers.
7. Identify critical business events.
8. Establish baseline performance.
9. Configure alert routing.
10. Build operational dashboards.
11. Define retention and access policies.
12. Test monitoring failure scenarios.

Prefer tools that fit the existing hosting and application architecture.

Do not introduce multiple overlapping monitoring platforms without a clear operational reason.

## 29. Testing Requirements

Verify that:

1. Service outages are detected.
2. Health checks return appropriate states.
3. Application exceptions are captured.
4. Sensitive information is excluded from logs.
5. Correlation IDs connect related operations.
6. Store-specific incidents identify the correct store.
7. Cross-store information remains protected.
8. Critical alerts reach the correct contacts.
9. Repeated alerts are deduplicated appropriately.
10. Alert recovery notifications work.
11. Payment failures are distinguishable from successful payments.
12. Inventory inconsistencies are detected without automatic destructive correction.
13. Backup failures generate alerts.
14. TLS and domain problems are detected.
15. Monitoring system failures are themselves reported.
16. Dashboard access follows role permissions.

## 30. Review and Ownership

The parent company is responsible for maintaining monitoring standards.

Review this document:

- At least annually.
- After a major incident.
- After significant infrastructure changes.
- When new services are introduced.
- When monitoring coverage changes.
- When repeated alerts indicate poor thresholds or missing controls.

## 31. Governing Rule

The parent company must be able to see the health of the platform, understand what is happening and identify who must respond.

Monitoring is not simply collecting logs or displaying charts. It is an operational control that connects technical signals to business impact, accountable people and corrective action.
