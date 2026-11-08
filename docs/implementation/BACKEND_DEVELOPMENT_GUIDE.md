# Backend Development Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Backend Development Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This guide defines practical standards for implementing, maintaining, testing and operating the platform's backend services.

The target backend supports multiple independently operated storefronts through a shared platform, shared catalogue and centrally managed business services.

## 2. Scope

This guide covers:

- Backend architecture.
- Application modules.
- Business logic.
- API implementation.
- Database interaction.
- Store context.
- Authentication and authorisation.
- Transactions.
- Background processing.
- External integrations.
- Logging and audit.
- Testing.
- Deployment.
- Migration.

## 3. Backend Development Principles

Backend development must:

- Enforce business rules centrally.
- Treat all external input as untrusted.
- Enforce authentication and authorisation.
- Enforce store isolation.
- Preserve data ownership.
- Maintain transactional consistency.
- Protect sensitive information.
- Use documented API contracts.
- Support reliable recovery.
- Avoid unnecessary architectural complexity.

## 4. Target Backend Architecture

The target architecture favours a modular monolith initially.

The backend should have clear internal module boundaries without introducing distributed services unnecessarily.

Modules should communicate through defined application interfaces and business operations.

The initial architecture should remain suitable for future extraction of services where measurable requirements justify it.

## 5. Backend Technology

The target backend architecture identifies NestJS and PostgreSQL.

Implementation must follow the formally approved technology and infrastructure decisions.

Existing production functionality must remain operational until its migration is authorised and verified.

Do not introduce new frameworks or infrastructure solely to match an architectural preference.

## 6. Module Boundaries

Expected business modules include:

- Identity and Access.
- Platform Administration.
- Stores.
- Products.
- Product Catalogue.
- Inventory.
- Commerce.
- Customers.
- Finance.
- Activity and Audit.
- Performance.
- Marketing.
- Notifications.
- Integrations.

Each module should own its business responsibilities and expose clearly defined operations.

Avoid circular dependencies and direct access to another module's internal implementation.

## 7. Business Logic

Business rules must be implemented in the backend.

The backend is authoritative for:

- Permissions.
- Store eligibility.
- Product ownership.
- Store product availability.
- Pricing.
- Inventory.
- Orders.
- Payments.
- Refunds.
- Customer access.
- Financial records.
- Approval workflows.

Frontend calculations may support presentation but must not replace authoritative backend calculations.

## 8. API Controllers and Services

Controllers should handle HTTP concerns, including:

- Request handling.
- Input validation.
- Authentication context.
- Response mapping.
- Appropriate HTTP status codes.

Business logic should reside in appropriate application services or domain components.

Controllers should not become large repositories of business rules or database operations.

## 9. Data Access

Database access must follow the approved persistence and transaction patterns.

Requirements:

- Use parameterised queries or safe ORM operations.
- Avoid unsafe dynamic SQL.
- Preserve foreign-key relationships.
- Respect database constraints.
- Apply appropriate transaction boundaries.
- Avoid unnecessary queries.
- Handle concurrency.
- Avoid returning unrestricted database entities directly.

Direct database administration uses PostgreSQL `psql` with connection settings loaded from `.env`.

## 10. Database Migrations

Schema changes must use version-controlled migration files.

Migrations must:

- Follow repository conventions.
- Be reviewed before application.
- Account for existing records.
- Preserve data integrity.
- Consider application compatibility.
- Avoid destructive defaults.
- Include verification.
- Follow approved deployment sequencing.

Do not use ad hoc production SQL as a substitute for migrations.

## 11. Store Context Enforcement

Every store-scoped backend operation must establish the relevant store context through trusted server-side information.

The backend must verify:

- The store exists.
- The store is in an eligible state.
- The caller has the required membership or authority.
- The resource belongs to the relevant store or is legitimately shared.
- The requested operation is permitted.

Never rely solely on a client-supplied store identifier.

## 12. Multi-Store Data Isolation

The backend must preserve isolation across participating stores.

Verify isolation for:

- Products and listings.
- Inventory.
- Orders.
- Customers.
- Employees.
- Financial records.
- Store configuration.
- Notifications.
- Reports.
- Uploaded files.
- Integration records.

Shared platform resources must have explicit ownership and access rules.

## 13. Identity and Access

Authentication establishes caller identity.

Authorisation determines what the caller may do.

The backend must distinguish:

- Platform Super Admin.
- Store Admin.
- Store employee.
- Customer.
- Service account.
- External integration.

Permissions must be checked against current authoritative account and membership state or an approved freshness and revocation mechanism.

Do not allow self-elevation or privilege escalation through request manipulation.

## 14. Platform Administration

Platform administration operations must require platform-level authority.

Examples include:

- Creating stores.
- Suspending stores.
- Reactivating stores.
- Managing platform configuration.
- Provisioning store integration packages.
- Managing platform-wide services.
- Reviewing platform-level performance.
- Managing platform financial operations.

These operations must be separated from ordinary store administration.

## 15. Store Administration

Store Admin operations must remain within the assigned store's authority.

Examples include:

- Managing store information.
- Managing permitted product listings.
- Managing inventory.
- Managing orders.
- Managing employees.
- Reviewing store finances.
- Managing supported storefront settings.
- Participating in approved marketing activities.

Store Admin permissions must not imply platform-level authority.

## 16. Product Catalogue Responsibilities

The backend must distinguish source product identity from store-specific commercial listings.

It must enforce:

- Product ownership.
- Source information editing rights.
- Store availability.
- Listing status.
- Pricing.
- Variants.
- Media references.
- Publication rules.

A store may manage its own permitted commercial terms without modifying source information owned by another party.

## 17. Inventory Responsibilities

The backend must maintain independent inventory for each store.

Inventory operations must support the approved model for:

- Stock balances.
- Reservations.
- Movements.
- Adjustments.
- Transfers.
- Counts.
- Returns.
- Variant-level quantities.

All material stock changes must be attributable and traceable.

## 18. Commerce Responsibilities

The backend owns authoritative commerce processing.

It must validate:

- Product eligibility.
- Store availability.
- Pricing.
- Promotions.
- Inventory.
- Customer eligibility.
- Order creation.
- Payment status.
- Fulfilment.
- Cancellation.
- Refunds.
- Returns.

Related operations must use appropriate transaction boundaries and idempotency controls.

## 19. Financial Responsibilities

Financial operations must preserve separation between platform and store records.

The backend must support appropriate controls for:

- Revenue.
- Expenses.
- Receivables.
- Payables.
- Settlements.
- Commissions.
- Refunds.
- Chargebacks.
- Stock assistance.
- Capital assistance.
- Repayments.
- Adjustments.

Financial changes must be authorised, attributable and auditable.

Do not introduce unapproved commission rates, settlement rules or financial thresholds.

## 20. Customer Data Responsibilities

Customer data access must follow purpose limitation and store scope.

The backend must:

- Restrict personal information access.
- Prevent unauthorised cross-store access.
- Enforce communication preferences.
- Support approved data correction and deletion workflows.
- Apply retention requirements.
- Avoid unnecessary personal data in API responses and logs.

## 21. Transaction Management

Use database transactions when related changes must succeed or fail together.

Transaction boundaries should reflect business operations.

Examples include:

- Creating an order and its required records.
- Reserving inventory.
- Applying an authorised financial adjustment.
- Recording a stock movement.
- Updating related business state.

Avoid holding transactions open while waiting for external network calls.

Where external providers are involved, use recoverable workflows and idempotency rather than assuming a database transaction can roll back an external operation.

## 22. Concurrency and Data Integrity

The backend must account for concurrent requests.

Consider:

- Simultaneous stock reservations.
- Concurrent order updates.
- Duplicate payment submissions.
- Repeated webhook events.
- Conflicting administrative changes.
- Concurrent financial adjustments.

Use database constraints, appropriate locking, transaction isolation and idempotency controls where justified.

Application-level checks alone may not prevent concurrent data corruption.

## 23. Background Processing

Background jobs should handle work that does not need to complete within the immediate HTTP request.

Examples include:

- Notifications.
- Scheduled tasks.
- Provider reconciliation.
- Retry processing.
- Reporting.
- Performance calculations.
- Integration synchronisation.

Jobs must support:

- Durable execution where required.
- Duplicate prevention.
- Retry policies.
- Failure visibility.
- Controlled concurrency.
- Monitoring.
- Recovery.

A job must not silently lose a consequential business operation.

## 24. External Integrations

External provider communication must be isolated behind integration boundaries.

The backend must handle:

- Provider authentication.
- Credential protection.
- Request validation.
- Timeouts.
- Retries.
- Idempotency.
- Webhook verification.
- Provider errors.
- Reconciliation.
- Store attribution.

Provider responses must not automatically be treated as authoritative without the required verification.

## 25. Webhooks

Webhook handlers must:

- Verify authenticity.
- Validate event structure.
- Resolve trusted provider and store context.
- Detect duplicate events.
- Persist events durably where required.
- Acknowledge only according to the documented processing contract.
- Support controlled retries.
- Record processing status.
- Preserve recovery information.

An untrusted payload field must not grant access to a store or resource.

## 26. Error Handling

Backend errors must be consistent and safe.

Distinguish:

- Validation errors.
- Authentication failures.
- Authorisation failures.
- Missing resources.
- Business-rule conflicts.
- Provider failures.
- Database failures.
- Unexpected internal failures.

Do not expose stack traces, credentials, private configuration or internal database details to clients.

## 27. Logging and Audit

Operational logs and audit records serve different purposes.

Operational logs support diagnostics and service monitoring.

Audit records preserve accountability for important actions and business changes.

Audit records should identify:

- Actor or service.
- Action.
- Affected resource.
- Store context where applicable.
- Timestamp.
- Relevant outcome.
- Correlation reference.

Do not log passwords, tokens or unnecessary personal information.

## 28. Backend Security

Backend security must include:

- Input validation.
- Authentication.
- Authorisation.
- Store isolation.
- Secure session handling.
- Secret management.
- Database access controls.
- Rate limiting.
- Safe file handling.
- Secure integration handling.
- Dependency maintenance.
- Security monitoring.

Security controls must be tested through both permitted and denied operations.

## 29. Configuration and Secrets

Backend configuration must be environment-specific.

Private credentials must remain server-side.

Do not:

- Hard-code secrets.
- Commit populated `.env` files.
- Return private configuration through APIs.
- Place service-role keys in browser bundles.
- Expose database passwords to frontend developers.

Follow the Environment and Configuration Guide.

## 30. Testing Requirements

Backend testing should cover:

- Unit tests.
- Module integration tests.
- API tests.
- Database integration tests.
- Transaction behaviour.
- Authentication and authorisation.
- Store isolation.
- Concurrency.
- Financial controls.
- Provider integrations.
- Webhook handling.
- Failure and recovery behaviour.
- Migration compatibility.

Test realistic business workflows and unauthorised access attempts.

## 31. Performance and Resource Management

Backend performance work should consider:

- Query efficiency.
- Indexing.
- Connection pooling.
- Pagination.
- Caching.
- Background processing.
- Resource limits.
- External provider latency.
- Concurrent workloads.

Optimisation must preserve correctness and isolation.

Do not introduce distributed infrastructure without a demonstrated requirement.

## 32. Deployment and Release

Backend deployment must follow the approved deployment process.

Before release:

- Review changes.
- Run relevant tests.
- Verify configuration.
- Review migrations.
- Confirm compatibility.
- Assess security impact.
- Prepare rollback or recovery.
- Coordinate dependent frontend changes.

Production migrations must be coordinated with application deployments.

## 33. Migration from Existing Backend Services

Migration from the existing Netlify Functions implementation must be incremental.

For each migrated capability:

- Identify current behaviour.
- Identify consumers.
- Document the existing contract.
- Define the new authoritative implementation.
- Preserve data and store attribution.
- Plan in-flight operation handling.
- Prevent duplicate processing.
- Test rollback.
- Verify production behaviour.

Do not retire existing functionality before its replacement is verified.

## 34. Backend Development Completion Criteria

A backend change is ready for review when:

- Business rules are implemented server-side.
- Input validation is present.
- Authentication and authorisation are enforced.
- Store context is verified.
- Database integrity is preserved.
- Transactions and idempotency are appropriate.
- Errors are handled safely.
- Audit requirements are met.
- Relevant tests pass.
- API documentation is updated.
- Migration and deployment implications are addressed.

## 35. Open Backend Development Decisions

The following remain subject to formal definition:

- Final backend module boundaries.
- ORM and persistence strategy.
- Transaction management conventions.
- Authentication implementation.
- Permission evaluation strategy.
- Background job infrastructure.
- API error response standard.
- Logging and tracing implementation.
- Database connection pooling.
- Backend hosting and scaling.
- Production migration execution ownership.

## 36. Relationship to Other Documents

This guide must be read alongside:

- APPLICATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- API_DEVELOPMENT_GUIDE.md
- DATA_ARCHITECTURE.md
- STORE_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- FINANCE_ARCHITECTURE.md
- COMMERCE_ARCHITECTURE.md
- INVENTORY_ARCHITECTURE.md
- DEVELOPMENT_STANDARDS.md
- DATABASE_OPERATIONS_GUIDE.md
- ENVIRONMENT_AND_CONFIGURATION_GUIDE.md
- TESTING_STRATEGY.md
- MIGRATION_PLAN.md
- DEPLOYMENT_ARCHITECTURE.md

## 37. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant backend developers.
