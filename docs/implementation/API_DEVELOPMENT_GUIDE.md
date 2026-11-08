# API Development Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | API Development Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-3E0E57E665 |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide defines practical standards for designing, implementing, testing and maintaining platform APIs.

It applies to the existing Yotaabo application and the future shared multi-store backend.

## 2. Scope

This guide covers:

- API development principles.
- Endpoint design.
- Request and response contracts.
- Authentication and authorisation.
- Store context.
- Validation.
- Error handling.
- Database interaction.
- API security.
- Integration endpoints.
- Testing.
- Documentation.
- Versioning.
- Migration from existing APIs.

## 3. API Development Principles

APIs must:

- Enforce business rules on the server.
- Validate all untrusted input.
- Enforce authentication and authorisation.
- Resolve store context through trusted mechanisms.
- Preserve data ownership and isolation.
- Use consistent request and response structures.
- Handle failures predictably.
- Protect sensitive information.
- Support maintainable frontend integration.
- Remain compatible with documented contracts.

## 4. API Architecture

The target platform uses a shared backend serving independently developed store frontends.

The backend owns business logic, data access, permissions, store isolation and authoritative transaction processing.

Frontend applications consume published API contracts.

The current production API implementation remains authoritative until an approved migration replaces it.

## 5. API Versioning

The target API architecture uses versioned routes, with `/api/v1/` as the documented initial version.

Versioning must:

- Be consistent.
- Be documented.
- Avoid unnecessary breaking changes.
- Provide a controlled deprecation process.
- Preserve existing consumers during migration.

The target versioning convention must not be used to create competing production write paths during the transition.

## 6. Endpoint Design

Endpoints should represent clear business resources and operations.

Design requirements:

- Use consistent resource naming.
- Use appropriate HTTP methods.
- Avoid ambiguous endpoint behaviour.
- Separate read and write responsibilities.
- Use explicit action endpoints when an operation is a business command rather than ordinary resource editing.
- Apply consistent pagination and filtering.
- Avoid exposing internal database implementation details.

Endpoint design must follow the API architecture and established repository conventions.

## 7. HTTP Methods

Use HTTP methods according to their intended semantics.

- `GET` retrieves resources.
- `POST` creates resources or initiates operations.
- `PUT` replaces a resource where appropriate.
- `PATCH` applies partial updates.
- `DELETE` requests resource deletion where permitted.

The backend must enforce the actual business permissions and consequences of each operation.

A frontend hiding a button does not prevent direct API access.

## 8. Request Validation

Every API request must be treated as untrusted.

Validate:

- Required fields.
- Data types.
- String lengths.
- Numeric ranges.
- Identifiers.
- Enumerated values.
- Dates and timestamps.
- File metadata.
- Related resource references.
- Store ownership.
- Business-rule constraints.

Reject invalid input before performing consequential operations.

Validation errors must not reveal internal secrets or unnecessary implementation details.

## 9. Response Contracts

API responses should use consistent structures.

Responses should:

- Return the expected resource or operation result.
- Use appropriate HTTP status codes.
- Avoid exposing database internals.
- Avoid returning private credentials.
- Include useful validation information.
- Represent errors consistently.
- Avoid leaking information across store boundaries.

Response contracts must be documented and tested.

## 10. Authentication

Protected endpoints must require the appropriate authentication mechanism.

Authentication must establish the identity of the caller.

The backend must verify account status and relevant session or token validity.

A token's presence alone does not establish that the account or its permissions remain valid.

Public storefront operations must be distinguished from authenticated administrative operations.

## 11. Authorisation

Authorisation must be enforced server-side for every protected operation.

The backend must evaluate:

- User identity.
- Account status.
- Role.
- Active store membership.
- Delegated permissions.
- Resource ownership.
- Operation scope.
- Current authorisation state.

Users must not be able to grant themselves additional privileges through API requests.

## 12. Store Context

Every store-scoped operation must resolve the relevant store context.

The backend must not trust a browser-supplied store identifier as proof of access.

Store context must be checked against trusted server-side records, permissions and resource ownership.

The API must reject requests that attempt to access another store's restricted data.

## 13. Platform and Store Administration

Platform-level and store-level operations must remain separate.

Platform Super Admin endpoints may perform authorised platform administration.

Store Admin endpoints must remain limited to the relevant store and delegated authority.

Employee endpoints must enforce assigned permissions.

The backend must not allow store-level access to become platform-level authority.

## 14. Product Catalogue APIs

Catalogue APIs must respect product ownership and store availability.

They should distinguish:

- Source product information.
- Product ownership.
- Store product listings.
- Store-specific commercial terms.
- Store availability.
- Product variants.
- Media references.
- Publication status.

A store must not be able to edit source product information it does not own.

A store's commercial changes must not silently modify another store's listing.

## 15. Inventory APIs

Inventory APIs must enforce store ownership and inventory rules.

Operations should account for:

- Product and variant identity.
- Store and location.
- Available stock.
- Reserved stock.
- Stock movements.
- Adjustments.
- Transfers.
- Stock counts.
- Order-related reservations.

Inventory changes must be traceable.

A client must not be allowed to set arbitrary stock values without the required permission and business validation.

## 16. Commerce APIs

Commerce APIs must enforce authoritative pricing and transaction rules.

The backend must validate:

- Product availability.
- Store eligibility.
- Variant selection.
- Current prices.
- Promotions.
- Stock availability.
- Order ownership.
- Customer permissions.
- Payment status.
- Fulfilment state.

Do not trust client-calculated totals or payment-success messages.

Order and payment operations must use appropriate transaction and idempotency controls.

## 17. Customer APIs

Customer endpoints must enforce store scope and privacy requirements.

They must:

- Return only authorised customer information.
- Limit access to the required purpose.
- Avoid unnecessary personal information.
- Prevent account enumeration.
- Enforce consent and communication preferences.
- Support applicable data correction and deletion processes.

Cross-store customer access must not be assumed.

## 18. Financial APIs

Financial endpoints require stricter authorisation and audit controls.

They must distinguish platform and store financial records.

Operations involving refunds, adjustments, settlements, commissions, assistance or financial corrections must follow their relevant approval rules.

The API must not allow an ordinary user to bypass financial approval workflows.

## 19. File and Media APIs

File upload and media endpoints must validate:

- File size.
- File type.
- Content.
- Ownership.
- Store context.
- Upload permissions.
- Storage destination.

Treat uploaded content as untrusted.

Do not allow a file extension alone to establish that content is safe.

Private files must not become publicly accessible through predictable or unrestricted references.

## 20. Error Handling

Errors must be handled consistently.

The API should distinguish:

- Authentication failures.
- Authorisation failures.
- Validation failures.
- Missing resources.
- Conflicts.
- Rate limits.
- External provider failures.
- Internal server failures.

Do not expose stack traces, database credentials, internal tokens or sensitive implementation details to clients.

Log sufficient diagnostic information securely.

## 21. Idempotency and Duplicate Requests

Operations that may create financial or other consequential effects must consider duplicate requests.

Use idempotency controls where appropriate.

The backend must handle:

- Repeated client submissions.
- Network retries.
- Provider timeouts.
- Duplicate webhooks.
- Concurrent requests.
- Uncertain operation outcomes.

A timeout must not automatically be interpreted as proof that an operation failed.

Check the authoritative transaction state before retrying operations that could create duplicate effects.

## 22. Rate Limiting and Abuse Protection

Apply appropriate limits to:

- Authentication attempts.
- Public endpoints.
- Search endpoints.
- Customer lookup.
- File uploads.
- Administrative operations.
- Expensive queries.
- Integration callbacks.

Rate limits should account for endpoint sensitivity and abuse risk.

Do not rely on frontend restrictions as an abuse-control mechanism.

## 23. API and Database Interaction

API handlers must not bypass established business rules to manipulate database records directly.

Database operations should use the approved backend data-access and transaction patterns.

Direct database administration uses `psql` with connection settings loaded from `.env`.

Schema changes must use version-controlled migrations.

API implementation must preserve database constraints and referential integrity.

## 24. External Integrations and Webhooks

Webhook endpoints must verify provider authenticity.

Store attribution must be established through trusted provider account details, verified event information and internal mappings.

A store identifier included only in an untrusted payload must not establish authority.

Webhook processing must:

- Validate the event.
- Persist it durably before acknowledgement where required.
- Handle duplicate delivery.
- Support controlled retries.
- Record processing outcomes.
- Preserve enough information for recovery.

## 25. API Documentation

API documentation must describe:

- Endpoint paths.
- HTTP methods.
- Authentication requirements.
- Required permissions.
- Store context.
- Request schemas.
- Response schemas.
- Error responses.
- Pagination.
- Rate limits where applicable.
- Idempotency behaviour.
- Example requests and responses.

Generated store integration packages must provide the documentation needed by independent frontend developers.

Documentation must reflect actual implemented contracts.

## 26. API Testing

Test:

- Valid requests.
- Invalid requests.
- Missing authentication.
- Insufficient permissions.
- Inactive accounts.
- Revoked access.
- Cross-store access attempts.
- Invalid resource ownership.
- Duplicate requests.
- Concurrent operations.
- Provider failures.
- Rate-limit behaviour.
- Error responses.
- API compatibility.

Test both permitted and denied operations.

A successful response for one authorised user does not prove that the endpoint is secure.

## 27. API Monitoring

Monitor:

- Request volume.
- Response times.
- Error rates.
- Authentication failures.
- Authorisation failures.
- Rate-limit events.
- Provider failures.
- Database-related failures.
- Unusual cross-store access attempts.

Logs and metrics must not expose sensitive request bodies or credentials unnecessarily.

## 28. API Migration

Migration from the existing Netlify Functions API to the target backend must be controlled.

Before replacing an endpoint:

- Identify all consumers.
- Document the existing contract.
- Identify pending operations.
- Define the authoritative processing path.
- Preserve authentication and store boundaries.
- Verify data compatibility.
- Plan rollback.
- Test the new implementation.

Do not operate two independent write implementations for the same business operation without an explicitly designed and controlled transition.

## 29. API Development Completion Criteria

An API change is ready for review when:

- Its contract is documented.
- Validation is implemented.
- Authentication and authorisation are verified.
- Store context is enforced.
- Business rules are applied server-side.
- Errors are handled consistently.
- Relevant tests pass.
- Security implications are reviewed.
- Documentation is updated.
- Existing consumers are considered.

## 30. Open API Development Decisions

The following remain subject to formal definition:

- Final API framework and module boundaries.
- Standard response envelope.
- Error-code convention.
- API documentation generation tooling.
- Authentication and token validation implementation.
- API rate-limit thresholds.
- Idempotency storage and retention.
- API deprecation periods.
- Webhook endpoint conventions.
- API monitoring thresholds.

## 31. Relationship to Other Documents

This guide must be read alongside:

- API_ARCHITECTURE.md
- APPLICATION_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- STORE_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- DEVELOPMENT_STANDARDS.md
- LOCAL_DEVELOPMENT_GUIDE.md
- ENVIRONMENT_AND_CONFIGURATION_GUIDE.md
- TESTING_STRATEGY.md
- MIGRATION_PLAN.md

## 32. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant developers.
