# Background Jobs and Scheduled Task Processing Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-9465FD6706 |
| Category | Implementation |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


| Metadata | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines standards for background processing, scheduled tasks and asynchronous workloads across the multi-store retail platform.

Its objectives are to:

- Move long-running work outside synchronous API requests.
- Keep scheduled operations predictable and recoverable.
- Prevent duplicate or conflicting job execution.
- Protect store-level data isolation.
- Provide reliable retry and failure handling.
- Make job execution observable and auditable.
- Support the current production architecture and future backend migration.

Background processing must preserve the same security, transaction integrity and business-rule requirements as synchronous operations.

## 2. Scope

This standard applies to:

- Scheduled maintenance tasks.
- Product and catalogue processing.
- Inventory reconciliation.
- Order-related asynchronous work.
- Notification delivery.
- Data imports and exports.
- Report generation.
- Payment and provider reconciliation.
- Webhook follow-up processing.
- Cache invalidation events.
- Data retention and archival tasks.
- Store lifecycle operations.
- Administrative bulk operations.

It covers job creation, execution, scheduling, retries, concurrency, cancellation, security, monitoring and recovery.

## 3. Core Principles

### 3.1 Durable job intent

Work that must survive application restarts or temporary infrastructure failures must be recorded durably before it is considered accepted.

In-memory queues must not be the sole record of important business work.

### 3.2 At-least-once execution awareness

Background workers must assume that a job may execute more than once.

Operations must be idempotent or use explicit deduplication and transaction controls.

### 3.3 Explicit ownership

Every job must have a defined owner, purpose, execution scope and failure policy.

### 3.4 Bounded execution

Jobs must have limits for execution time, resource consumption, retry count and concurrency.

### 3.5 No hidden business authority

A background worker must not bypass domain authorization, approval requirements or business rules merely because it runs internally.

## 4. Job Categories

Jobs should be classified according to their operational characteristics.

| Category | Examples |
|---|---|
| Scheduled | Daily maintenance, scheduled reports |
| Event-driven | Process an order event, invalidate a cache |
| User-requested | Generate an export, process an import |
| Reconciliation | Compare provider and platform records |
| Maintenance | Archive expired data, clean temporary files |
| Notification | Send approved email or other notifications |
| Recovery | Retry a previously failed operation |

The category must be recorded or otherwise identifiable through the job definition.

## 5. Job Definition

Every production job must define:

- Unique job type.
- Business purpose.
- Owning module or service.
- Execution trigger.
- Required permissions or trusted execution context.
- Input schema.
- Store or platform scope.
- Expected duration.
- Maximum execution time.
- Retry policy.
- Concurrency policy.
- Idempotency strategy.
- Failure handling.
- Monitoring requirements.
- Data retention requirements.

Job payloads must contain only the information needed to perform the work.

Large files and sensitive source records should be referenced through controlled storage rather than embedded unnecessarily in queue messages.

## 6. Job Lifecycle

A job must have an explicit lifecycle.

Suggested states:

- `queued`
- `scheduled`
- `processing`
- `retrying`
- `completed`
- `completed_with_errors`
- `failed`
- `cancelled`
- `dead_lettered`

State transitions must be controlled by the job-processing system.

A job must not transition to `completed` until its required business effects and durable result records have been committed.

A failed job must not be silently marked as completed.

The system must preserve sufficient execution history to investigate important failures.

## 7. Durable Job Records

Important jobs must have durable records containing:

- Job identifier.
- Job type.
- Current state.
- Creation time.
- Scheduled execution time, where applicable.
- Start and completion timestamps.
- Attempt count.
- Execution scope.
- Correlation identifier.
- Idempotency reference, where applicable.
- Result summary.
- Failure classification.
- Last error reference.
- Cancellation information.

Sensitive payload data must not be copied into general-purpose logs or administrative screens.

Job records must follow the platform's retention and disposal requirements.

## 8. Job Submission

Job submission must validate:

1. The caller's authorization.
2. The job type.
3. The input schema.
4. The permitted execution scope.
5. Applicable business rules.
6. Resource and batch limits.
7. Idempotency requirements.

A successful submission response means the job has been durably accepted, not that it has completed.

The API must provide a job reference or another documented way to inspect the result.

## 9. Scheduled Task Standards

Scheduled tasks must define:

- Schedule expression or interval.
- Timezone.
- Start and end conditions.
- Expected execution duration.
- Missed-run behaviour.
- Overlap policy.
- Retry policy.
- Monitoring owner.

Schedules must use explicit timezone rules.

The system must not rely on the server's implicit local timezone.

For business operations, the relevant business timezone must be documented.

### 9.1 Daylight saving considerations

Where a schedule operates in a timezone that observes daylight saving time, the implementation must define how skipped or repeated local times are handled.

South African business schedules generally use the Africa/Johannesburg timezone, but the schedule's actual business context must determine the timezone.

### 9.2 Missed executions

The platform must define whether a missed scheduled run is:

- Skipped.
- Executed once after recovery.
- Replayed for each missed interval.
- Reconstructed through a reconciliation process.

The choice must reflect the business consequence of missing the task.

Financial and inventory reconciliation tasks must not silently skip required periods.

## 10. Overlapping Execution

Scheduled jobs must define whether overlapping executions are allowed.

Where overlap is unsafe, the scheduler or job-processing system must enforce a concurrency limit or distributed lock.

A local process lock is insufficient when multiple application instances can execute the same job.

Locks must:

- Have a bounded lease or expiration.
- Be safely renewed where required.
- Handle worker termination.
- Prevent stale lock holders from committing conflicting work.
- Avoid indefinite lock retention.

A lock alone does not replace transaction integrity or idempotency.

## 11. Retry Policy

Retry behaviour must be defined by job type.

The system should distinguish:

### 11.1 Transient failures

Examples:

- Temporary network errors.
- Provider timeouts.
- Temporary database connectivity failures.
- Rate-limit responses from external providers.

These may be retried using bounded exponential backoff with jitter.

### 11.2 Permanent failures

Examples:

- Invalid payloads.
- Unsupported job types.
- Missing required configuration.
- Unauthorized execution scope.
- Business-rule rejection.

These should not be retried indefinitely.

### 11.3 Retry limits

Every job must define:

- Maximum attempts.
- Minimum delay.
- Maximum delay.
- Backoff strategy.
- Retryable error categories.
- Terminal failure behaviour.

Retries must not create duplicate payments, inventory movements, notifications or other business effects.

## 12. Dead-Letter Handling

Jobs that exhaust their retry policy or cannot be processed must enter a controlled failure state or dead-letter mechanism.

Dead-letter records must preserve enough information to support investigation and safe recovery.

They must not expose sensitive payloads to unauthorized operators.

Reprocessing a dead-lettered job requires:

1. Investigation of the original failure.
2. Confirmation that the underlying issue is resolved.
3. Verification that replay is safe.
4. Authorization where required.
5. Recording of the replay action.
6. Monitoring of the new execution.

A dead-lettered job must never be replayed automatically without a defined recovery policy.

## 13. Idempotency and Duplicate Prevention

Every job that can create business effects must have an idempotency strategy.

The strategy may use:

- A unique business operation reference.
- A durable idempotency key.
- A unique event identifier.
- A database uniqueness constraint.
- A processed-event record.
- A domain-specific state transition.

The system must distinguish a repeated delivery from a new business operation.

A retry must not create:

- Duplicate orders.
- Duplicate financial postings.
- Duplicate inventory movements.
- Duplicate refunds.
- Duplicate provider transactions.
- Duplicate notifications where duplication would be harmful.

Job execution must use the transaction integrity and idempotency standards for the relevant domain.

## 14. Transaction Boundaries

A job must define which actions belong in a single database transaction.

Long-running jobs should not hold database transactions open while waiting for external services or processing large files.

For workflows involving external providers:

1. Persist the operation intent.
2. Execute the external action using a stable reference.
3. Record the provider result.
4. Reconcile uncertain outcomes.
5. Apply the resulting domain transition.

A timeout must not be treated as proof that an external operation failed.

Where a workflow spans multiple systems, use explicit state transitions and compensating actions where necessary.

## 15. Job Concurrency and Ordering

The platform must define concurrency rules for jobs that affect the same business resource.

Examples include:

- Multiple inventory adjustments for one product and store.
- Concurrent order processing.
- Repeated updates to the same product.
- Multiple reconciliation jobs for one provider account.
- Simultaneous store lifecycle operations.

The system may use:

- Resource-level serialization.
- Partitioned queues.
- Database constraints.
- Optimistic concurrency checks.
- Distributed locks.
- Version checks.

Ordering must be explicit where event sequence affects business correctness.

A general-purpose queue must not be assumed to provide business ordering unless its delivery guarantees are documented and tested.

## 16. Store and Platform Isolation

Every store-scoped job must carry a verified store context.

The worker must validate that context before reading or modifying store data.

Requirements:

- Store A jobs cannot modify Store B records.
- Store-scoped job results remain isolated.
- Platform jobs require explicit platform-level authority.
- A client-supplied store identifier is not sufficient proof of scope.
- Shared resources must follow their documented ownership rules.
- Store suspension must be considered when deciding whether pending jobs may continue.

Platform Super Admin authority and Store Admin authority must remain distinct during background execution.

## 17. Store Lifecycle Interactions

Jobs must respect store lifecycle states.

A store suspension or deactivation must trigger an assessment of pending work.

The system must classify jobs as:

- Safe to continue.
- Safe to pause.
- Must be cancelled.
- Must complete to preserve an existing obligation.
- Requires manual review.

Suspension must not automatically erase queued financial, order or audit obligations.

Reactivation must not blindly replay every previously paused job without checking current business state.

## 18. External Provider Processing

Jobs that communicate with payment, email, storage or other external providers must follow the relevant integration contract.

Requirements:

- Use approved server-side credentials.
- Validate provider responses.
- Apply provider-specific retry rules.
- Respect provider rate limits.
- Preserve stable operation references.
- Record uncertain outcomes.
- Verify webhook or callback authenticity.
- Avoid logging secrets or full sensitive payloads.

Provider timeouts must be handled as uncertain outcomes where the provider may have completed the operation.

The worker must query or reconcile the provider before retrying an operation that could create duplicate effects.

## 19. Notifications

Notification jobs must define:

- Recipient source.
- Delivery channel.
- Template or message version.
- Triggering business event.
- Retry policy.
- Duplicate-prevention policy.
- Delivery result tracking.

Notifications must be generated from approved business events.

A notification failure must not reverse an already completed business transaction unless the domain explicitly requires that behaviour.

Sensitive information must not be included in notification content unless the channel and use case have been approved.

## 20. Job Cancellation

Cancellation must be supported only where safe.

The system must distinguish:

- Cancellation before execution.
- Cancellation during execution.
- Cancellation after partial completion.
- Cancellation after completion.

Cancellation must not imply that committed actions have been reversed.

Where an operation has already produced business effects, any reversal must use an explicit domain-approved compensating process.

The cancellation request and outcome must be recorded.

## 21. Resource Limits

Every job must have appropriate limits for:

- Execution duration.
- Memory usage.
- CPU usage.
- Input size.
- Items processed per batch.
- Database query volume.
- External provider calls.
- Retry count.
- Concurrent workers.

Large jobs should process data in bounded batches.

A single job must not consume all worker capacity or starve higher-priority business operations.

Priority levels must be defined by operational importance, not arbitrary client input.

## 22. Job Priority and Fairness

Where multiple stores share worker infrastructure, the platform must avoid allowing one store's workload to monopolize processing capacity.

The scheduler or queue system should support fair resource allocation where workload justifies it.

Priority must not create an undocumented commercial advantage for a participating store.

Platform-critical security and infrastructure tasks may receive higher priority under approved operational policy.

Priority changes must be controlled and observable.

## 23. Job Monitoring and Alerting

The platform should monitor:

- Queue depth.
- Oldest queued job age.
- Job execution duration.
- Success and failure rates.
- Retry volume.
- Dead-letter volume.
- Worker availability.
- Scheduled task delay.
- Overlapping execution attempts.
- Lock acquisition failures.
- External provider failure rates.
- Store-specific workload distribution.

Alerts must identify the affected job type and operational scope without exposing sensitive payload data.

Persistent failures and growing queue backlogs must have defined escalation paths.

## 24. Logging and Audit

Job logs must include appropriate correlation and execution references.

Useful fields include:

- Job identifier.
- Job type.
- Attempt number.
- Worker identifier.
- Execution start and completion.
- Result state.
- Error classification.
- Correlation identifier.
- Store scope, where applicable.

Logs must not contain:

- Passwords.
- Access tokens.
- Private keys.
- Payment credentials.
- Unnecessary personal data.
- Unredacted sensitive provider payloads.

Administrative actions such as manual retry, cancellation, priority changes and job deletion must be recorded according to the platform audit standards.

## 25. Security Requirements

Background workers must:

- Use least-privilege service identities.
- Access only required secrets.
- Validate job payloads.
- Verify store and platform scope.
- Enforce domain authorization.
- Protect queue and job storage.
- Restrict administrative job controls.
- Prevent untrusted users from creating privileged job types.
- Avoid executing arbitrary code or commands from job payloads.
- Apply retention controls to job data and generated files.

Internal execution does not automatically make a job trusted.

## 26. Deployment and Version Compatibility

Job payloads may remain queued while application versions change.

Job schemas must therefore be versioned or designed for controlled compatibility.

Deployments must account for:

- Jobs created by the previous application version.
- Jobs already being processed.
- Delayed scheduled tasks.
- Retry queues.
- Dead-letter records.
- Worker shutdown.
- In-flight external operations.

Workers must handle supported older payload versions or reject incompatible payloads safely with an actionable failure state.

Deployment procedures must define how workers are drained or restarted without losing durable work.

## 27. Current and Target Architecture

The current production API uses Netlify Functions and Supabase/PostgreSQL.

The platform must use only background-processing capabilities compatible with the current production architecture.

The implementation must not assume that a serverless function remains alive indefinitely or that process-local memory provides durable scheduling.

A durable scheduler or queue mechanism must be selected and documented before production workloads depend on it.

The target NestJS modular monolith may centralize job registration, scheduling, workers and monitoring while keeping business processing within the responsible domain modules.

The migration must preserve job identifiers, idempotency behaviour, execution history and recovery procedures where required.

## 28. Testing Requirements

Tests must cover:

### Lifecycle
- Job submission.
- Durable acceptance.
- Valid state transitions.
- Successful completion.
- Terminal failure.
- Cancellation.
- Dead-letter handling.

### Reliability
- Worker restart.
- Duplicate delivery.
- Retry after transient failure.
- Permanent failure handling.
- Lost worker recovery.
- Lock expiration.
- Concurrent execution.

### Security
- Unauthorized job submission.
- Cross-store job access.
- Unauthorized job cancellation.
- Unauthorized manual retry.
- Secret exposure prevention.
- Payload validation.

### Business integrity
- Duplicate financial operation prevention.
- Duplicate inventory movement prevention.
- Provider timeout reconciliation.
- Partial completion recovery.
- Store suspension interaction.
- Transaction boundary enforcement.

### Scheduling
- Correct timezone execution.
- Missed-run behaviour.
- Daylight saving handling where applicable.
- Overlap prevention.
- Schedule changes and deployment compatibility.

## 29. Operational Recovery

The operations team must have documented procedures for:

- Pausing a job type.
- Pausing a worker group.
- Draining a queue.
- Investigating stuck jobs.
- Replaying failed jobs.
- Handling dead-letter records.
- Recovering after scheduler failure.
- Reconciling external provider operations.
- Restoring job infrastructure after an outage.

Recovery actions must be authorized and recorded.

A recovery procedure must not instruct operators to delete job records merely to clear a queue unless a domain-approved disposal process explicitly permits it.

## 30. Acceptance Criteria

A background-processing implementation complies with this standard when:

- Its purpose and ownership are documented.
- Job acceptance is durable where required.
- Its lifecycle and state transitions are defined.
- Retry and failure policies are explicit.
- Duplicate execution is safely handled.
- Store and platform scope are enforced.
- Concurrency and ordering requirements are addressed.
- Resource limits are configured.
- External provider uncertainty is handled safely.
- Cancellation behaviour is documented.
- Monitoring and audit records are available.
- Recovery procedures are documented and tested.
- Deployment compatibility is considered.

## 31. Open Decisions

The following decisions require explicit platform approval:

- Queue and scheduler technology.
- Durable job storage implementation.
- Worker deployment model.
- Standard retry profiles by job category.
- Job priority and fairness model.
- Distributed locking mechanism.
- Job history retention periods.
- Dead-letter review ownership.
- Job cancellation permissions.
- Operational alert thresholds.
- Migration approach from current scheduled processing to the target architecture.

Until approved, production jobs must use conservative execution limits and explicit recovery procedures.

## 32. Related Documents

- Operations Architecture
- Deployment Architecture
- Backend Development Guide
- API Development Guide
- Transaction Integrity and Idempotency Standards
- API Pagination, Filtering and Bulk Operation Standards
- API Rate Limiting and Abuse Prevention Standards
- API Caching and Cache Invalidation Standards
- Integration Architecture
- Notification Architecture
- Inventory Architecture
- Finance Architecture
- Platform Audit Trail and Administrative Activity Standards
- Data Retention, Archiving and Secure Disposal Standards
- Observability and Logging Standards
- Incident Response Playbook
- Business Continuity and Availability Standards
- Release Management and Deployment Procedure
