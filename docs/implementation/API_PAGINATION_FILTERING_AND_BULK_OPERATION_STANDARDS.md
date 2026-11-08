# API Pagination, Filtering and Bulk Operation Standards

| Metadata | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines consistent standards for pagination, filtering, sorting and bulk operations across the multi-store retail platform APIs.

Its objectives are to:

- Keep collection endpoints predictable and efficient.
- Prevent clients from requesting unbounded datasets.
- Preserve store-level data isolation.
- Ensure stable pagination while records change.
- Standardise query validation and response metadata.
- Define safe behaviour for bulk operations.
- Support future migration from the current Netlify Functions API to the target NestJS modular monolith.

These standards apply to platform APIs, store administration APIs, storefront APIs and internal service endpoints that return or modify collections of resources.

## 2. Scope

This standard covers:

- Collection endpoint design.
- Offset-based and cursor-based pagination.
- Filtering and search.
- Sorting and deterministic ordering.
- Query parameter validation.
- Maximum page sizes and resource limits.
- Bulk creation, updates and deletion.
- Partial success and failure reporting.
- Asynchronous bulk processing.
- Authorization and tenant isolation.
- Testing and operational monitoring.

It does not define business-specific eligibility rules, financial posting rules or transaction semantics. Those remain governed by their respective domain standards.

## 3. Core Principles

### 3.1 Bounded responses

Every collection endpoint must impose a server-controlled maximum result size.

Clients must never be able to request an unlimited collection through a query parameter.

### 3.2 Server-controlled authorization

Pagination, filters and sorting must not expand the caller's authorized data scope.

The server must apply authorization and store isolation before returning records.

### 3.3 Predictable behaviour

Equivalent requests must follow the same documented query and response conventions.

The API must not silently interpret invalid filters, unsupported sort fields or malformed pagination parameters.

### 3.4 Efficient database access

Collection queries must use appropriate indexes and avoid unnecessary loading of related records.

Large datasets must not require loading every matching record into application memory before returning a page.

### 3.5 Explicit mutation outcomes

Bulk operations must report which items succeeded, which failed and whether processing is still in progress.

A successful HTTP response must not imply that every item succeeded unless the operation guarantees atomic completion.

## 4. Collection Endpoint Standards

Collection endpoints should use resource-oriented paths.

Examples:

- `GET /api/products`
- `GET /api/orders`
- `GET /api/stores/{storeId}/customers`
- `GET /api/admin/users`

Collection endpoints must:

1. Apply authentication and authorization where required.
2. Resolve the caller's permitted platform or store scope.
3. Validate all query parameters.
4. Apply mandatory security and business constraints.
5. Apply approved filters and sorting.
6. Apply pagination.
7. Return a documented response structure.

A client-supplied store identifier must never override the caller's authorized store scope.

Public storefront endpoints may expose only fields explicitly approved for public access.

## 5. Pagination Models

### 5.1 Offset pagination

Offset pagination may be used for small or moderately sized collections where numbered pages are useful.

Standard parameters:

| Parameter | Meaning |
|---|---|
| `page` | One-based page number |
| `pageSize` | Requested number of records |

Example:

`GET /api/products?page=2&pageSize=20`

Rules:

- Page numbers must be positive integers.
- Page size must be a positive integer.
- The server must enforce a maximum page size.
- Missing parameters must use documented defaults.
- Negative, fractional or malformed values must be rejected.
- Excessively large page numbers must not cause uncontrolled database work.
- The database query must apply pagination before materialising the result set.

Offset pagination can produce duplicates or omissions when records are inserted or removed between requests. Clients must not assume a multi-page traversal represents an immutable snapshot.

### 5.2 Cursor pagination

Cursor pagination should be preferred for large, frequently changing collections and feeds.

Standard parameters:

| Parameter | Meaning |
|---|---|
| `cursor` | Opaque continuation position |
| `pageSize` | Requested number of records |

Example:

`GET /api/orders?pageSize=25&cursor={opaque-cursor}`

Rules:

- Cursors must be generated and validated by the server.
- Clients must treat cursors as opaque values.
- Cursors must not expose sensitive database identifiers or internal query details.
- Cursor values must be bound to the relevant resource, ordering and applicable query context.
- Invalid or incompatible cursors must return a clear client error.
- Cursor pagination must use deterministic ordering.
- A cursor must not grant access to records outside the caller's current authorization scope.

Where authorization or relevant query context changes, the server may reject a previously issued cursor and require the client to restart pagination.

### 5.3 Choosing a pagination model

| Use case | Preferred model |
|---|---|
| Small administrative reference lists | Offset |
| Large order history | Cursor |
| Frequently changing activity feeds | Cursor |
| Simple bounded lookup lists | Offset |
| Large product catalogues | Cursor |
| Reports requiring a fixed result set | Report-specific snapshot or export process |

The chosen model must be documented per endpoint.

## 6. Page Size Limits

Each collection endpoint must define:

- Default page size.
- Maximum page size.
- Whether the endpoint supports offset or cursor pagination.
- Whether total counts are available.

A general starting policy is:

| Setting | Default |
|---|---:|
| Default page size | 20 |
| Maximum page size | 100 |
| Large export threshold | Separate export workflow |

These are platform defaults, not immutable business rules. Endpoint-specific limits may be lower where query cost or data sensitivity requires it.

Clients requesting a page size above the permitted maximum must receive a validation error or a documented server-enforced limit response. The API must not silently return an unexpectedly large result.

## 7. Response Structure

Collection responses must use a consistent structure appropriate to the pagination model.

Offset response example:

    {
      "data": [],
      "pagination": {
        "page": 1,
        "pageSize": 20,
        "totalItems": 0,
        "totalPages": 0,
        "hasNextPage": false,
        "hasPreviousPage": false
      }
    }

Cursor response example:

    {
      "data": [],
      "pagination": {
        "pageSize": 25,
        "nextCursor": null,
        "hasMore": false
      }
    }

Rules:

- `data` must always be an array for a successful collection response.
- Pagination metadata must match the endpoint's documented model.
- Empty collections must return an empty array.
- Cursor values must be opaque.
- Sensitive internal query information must not be exposed.
- Total counts should be omitted where they are expensive or unnecessary.
- A total count must reflect the same authorization and filter constraints as the returned collection.

The API must not fabricate totals or imply snapshot consistency where none exists.

## 8. Filtering Standards

### 8.1 Explicit filter support

Each endpoint must document its supported filters.

Examples include:

- `status`
- `categoryId`
- `createdAfter`
- `createdBefore`
- `updatedAfter`
- `updatedBefore`
- `sku`
- `search`

Unsupported filters must be rejected rather than silently ignored.

### 8.2 Validation

Filter values must be validated according to their expected type and domain.

Examples:

- Dates must use a documented ISO 8601 format.
- Numeric ranges must reject invalid or reversed boundaries.
- Enumerated statuses must match supported values.
- Identifiers must follow the expected identifier format.
- Search terms must have documented minimum and maximum lengths.

The API must reject malformed filter expressions.

### 8.3 Filter composition

The API must document how multiple filters combine.

Unless an endpoint explicitly defines another rule, separate filters should combine using logical AND.

The API must not accept arbitrary SQL expressions, raw database operators or client-controlled query fragments.

### 8.4 Store isolation

Store-scoped filters must be constrained by the authenticated caller's permitted store scope.

A request containing another store's identifier must not expose that store's records.

Platform Super Admin access must follow explicit platform-level authorization rules rather than bypassing all query constraints.

### 8.5 Sensitive fields

Filters must not reveal the existence or values of fields the caller is not authorized to access.

Sensitive personal, financial and security-related fields must not become searchable merely because they exist in the database.

## 9. Search Standards

Search parameters must have clearly documented behaviour.

The API must define:

- Searchable fields.
- Matching behaviour.
- Case sensitivity.
- Minimum and maximum query length.
- Whether partial matching is supported.
- Whether results are ranked.
- Whether search is available to public or authenticated callers.

Search must operate only within the caller's authorized dataset.

Search input must be parameterized and safely handled. It must never be inserted directly into SQL or another query language.

Search endpoints must have suitable indexes or search infrastructure for their expected workload.

Search results must not disclose hidden products, private customer records or restricted administrative data.

## 10. Sorting Standards

### 10.1 Allowlisted fields

Clients may sort only by explicitly approved fields.

Example:

`GET /api/products?sortBy=createdAt&sortDirection=desc`

The server must validate both the sort field and direction.

Arbitrary column names, SQL fragments and expressions must never be accepted.

### 10.2 Deterministic ordering

Every paginated query must have deterministic ordering.

When the selected sort field is not unique, the server must append a stable unique tie-breaker.

For example:

- Primary ordering: `createdAt DESC`
- Tie-breaker: `id DESC`

This reduces duplicate and missing records during pagination.

### 10.3 Null handling

The endpoint must define how null values are ordered where nullable fields are sortable.

Database-specific default behaviour must not create inconsistent results between environments.

### 10.4 Business-sensitive ordering

Sorting must not reveal restricted internal rankings, financial information or performance indicators.

Any business-specific ranking must follow the relevant domain policy and authorization rules.

## 11. Date and Time Filters

Date filters must use a consistent timezone convention.

The API should accept ISO 8601 timestamps with explicit timezone information for timestamp-based filters.

Date-only filters must be documented as calendar dates and interpreted using the relevant business timezone.

The server must define whether date boundaries are inclusive or exclusive.

For timestamp ranges, the preferred convention is:

- `createdAfter`: exclusive lower boundary.
- `createdBefore`: exclusive upper boundary.

This supports adjacent time windows without overlapping records.

The server must validate that the lower boundary precedes the upper boundary.

## 12. Bulk Operation Standards

Bulk operations allow clients to submit multiple resource changes in one request.

They must be introduced only where the business operation benefits from batching and where authorization, validation and failure behaviour can be defined safely.

Examples:

- Bulk product status changes.
- Bulk catalogue updates.
- Bulk inventory adjustments.
- Bulk administrative imports.
- Bulk record archival.

Bulk operations must not be used to bypass individual resource permissions or domain validation.

## 13. Bulk Request Limits

Every bulk endpoint must define:

- Maximum items per request.
- Maximum request body size.
- Allowed operation types.
- Required permissions.
- Validation rules.
- Atomicity behaviour.
- Timeout behaviour.
- Retry behaviour.

A general starting limit is 100 items per synchronous request.

Larger workloads must use an asynchronous job or import workflow.

The limit may be reduced for expensive operations or operations that affect financial records, inventory or external providers.

## 14. Bulk Validation

The server must validate:

1. The overall request structure.
2. The number of submitted items.
3. Each item's identifier and data types.
4. The caller's permission for each target resource.
5. Store ownership and scope.
6. Domain-specific business rules.
7. Duplicate or conflicting items.
8. Whether the requested operation is currently permitted.

Validation must occur server-side even when the frontend has already performed validation.

The server must not trust client-supplied ownership, pricing, inventory balances or authorization claims.

## 15. Atomic and Partial-Success Behaviour

Every bulk endpoint must explicitly document one of these behaviours.

### 15.1 Atomic operation

All items succeed together or the operation is rolled back.

Use atomic behaviour where partial completion would violate business integrity.

Atomic operations must use appropriate database transaction boundaries and must account for external side effects that cannot participate in the database transaction.

### 15.2 Partial-success operation

Each item is processed independently.

Successful items remain committed while failed items are reported.

The response must identify each submitted item and its outcome.

Example:

    {
      "status": "completed_with_errors",
      "results": [
        {
          "itemId": "item-1",
          "status": "succeeded"
        },
        {
          "itemId": "item-2",
          "status": "failed",
          "errorCode": "VALIDATION_FAILED"
        }
      ]
    }

The API must not report the entire operation as successful when one or more items failed.

### 15.3 Choosing the behaviour

Financial posting, inventory transfers and other integrity-sensitive workflows must follow their domain transaction rules.

A generic bulk endpoint must not decide to partially apply a domain operation where the domain requires atomicity.

## 16. Bulk Authorization

Authorization must be checked for every affected resource.

The server must not assume that permission to submit a bulk request grants permission to modify every included record.

The following must be enforced:

- Platform-level permissions.
- Store-level permissions.
- Resource ownership and visibility.
- Action-specific permissions.
- Approval requirements.
- Restrictions on sensitive fields.

A request containing unauthorized records must follow a documented rejection policy. It must not reveal information about records outside the caller's scope.

## 17. Bulk Idempotency and Retries

Bulk mutation endpoints must define safe retry behaviour.

Where retries could duplicate an operation or create additional side effects, the endpoint must use an idempotency mechanism consistent with the platform transaction integrity standard.

The server must distinguish:

- A new request.
- A repeated request with the same idempotency key and payload.
- Reuse of an idempotency key with a different payload.
- A request whose previous outcome is still being processed.

The same logical operation must not be applied twice merely because the client did not receive the original response.

## 18. Asynchronous Bulk Jobs

Large or long-running operations must be processed asynchronously.

Examples include:

- Large product imports.
- Large catalogue updates.
- Bulk image processing.
- Historical data exports.
- Large inventory reconciliation tasks.

The API should return a job resource that allows the caller to inspect progress.

Example submission response:

    {
      "jobId": "job-reference",
      "status": "queued",
      "statusUrl": "/api/jobs/job-reference"
    }

A job status endpoint should expose:

- Job identifier.
- Current status.
- Submission time.
- Start time, when available.
- Completion time, when available.
- Total item count.
- Processed item count.
- Success count.
- Failure count.
- A permitted error summary.
- Result or report reference, where applicable.

Supported states should be explicitly defined. A typical lifecycle is:

- `queued`
- `processing`
- `completed`
- `completed_with_errors`
- `failed`
- `cancelled`

The system must not claim a job is complete until its required processing and durable result recording have finished.

## 19. Job Authorization and Retention

Job records and results must be accessible only to authorized users.

A user must not gain access to another store's job by guessing or changing a job identifier.

Job result files must follow the platform's data retention, privacy and secure disposal standards.

Sensitive records must not be included in downloadable error reports unless the caller is authorized to view them.

## 20. Bulk Cancellation

Cancellation must be supported only where the operation can stop safely.

The API must distinguish:

- A job cancelled before processing.
- A job cancelled during processing.
- A job that has already completed.
- A job that cannot be safely cancelled.

Cancellation must not imply that already committed operations have been reversed.

Where compensation is required, it must use an explicit domain-approved process.

## 21. Export Operations

Large exports must not be implemented by asking clients to retrieve an unlimited collection.

Exports must:

- Require explicit authorization.
- Enforce store and platform scope.
- Apply approved filters.
- Define supported file formats.
- Record export activity where required.
- Protect generated files.
- Apply expiration and retention controls.
- Avoid exposing fields outside the exporter's permissions.

Exports containing customer or financial data must receive additional privacy and access controls.

## 22. Error Responses

Invalid collection query parameters must use the platform's standard error response format.

Common error codes may include:

| Code | Meaning |
|---|---|
| `INVALID_PAGE` | Invalid page number |
| `INVALID_PAGE_SIZE` | Invalid or excessive page size |
| `INVALID_CURSOR` | Invalid or incompatible cursor |
| `UNSUPPORTED_FILTER` | Filter is not supported |
| `INVALID_FILTER_VALUE` | Filter value is malformed |
| `UNSUPPORTED_SORT_FIELD` | Sort field is not allowed |
| `INVALID_SORT_DIRECTION` | Sort direction is invalid |
| `BULK_LIMIT_EXCEEDED` | Bulk request exceeds permitted size |
| `BULK_VALIDATION_FAILED` | One or more items failed validation |
| `JOB_NOT_FOUND` | Job does not exist or is not visible to the caller |
| `JOB_NOT_CANCELLABLE` | Job cannot be cancelled in its current state |

Error responses must not expose database queries, stack traces, internal identifiers or sensitive resource details.

## 23. Performance and Database Requirements

Collection and bulk endpoints must be designed with database workload in mind.

Requirements:

- Index commonly filtered and sorted fields.
- Use composite indexes where query patterns justify them.
- Review query plans for high-volume endpoints.
- Avoid N+1 database access patterns.
- Select only required fields.
- Avoid loading large related collections unnecessarily.
- Use streaming or asynchronous processing for large exports.
- Apply database transaction boundaries deliberately.
- Avoid unbounded in-memory processing.
- Monitor slow queries and expensive filters.

Indexes must support actual query patterns rather than being added indiscriminately.

## 24. Security Requirements

The implementation must protect against:

- Cross-store data exposure.
- Unauthorized resource modification.
- Enumeration through pagination.
- Expensive or unbounded queries.
- Injection through search and filter parameters.
- Excessive request bodies.
- Duplicate bulk operations.
- Unauthorized job access.
- Sensitive information in export files.
- Denial of service through expensive sorting or filtering.

Pagination and bulk limits must work alongside the API rate-limiting and abuse-prevention controls.

## 25. Frontend Client Requirements

Frontend clients must:

- Use only documented query parameters.
- Respect page-size limits.
- Treat cursors as opaque.
- Handle empty collections.
- Handle expired or invalid cursors.
- Avoid assuming total counts are always available.
- Preserve filters and sort settings when navigating pages.
- Prevent duplicate bulk submissions.
- Display per-item failures for partial-success operations.
- Show asynchronous job progress accurately.
- Avoid exposing unauthorized fields in the interface.

The frontend must not implement security-sensitive filtering as a substitute for server-side authorization.

## 26. Testing Requirements

Tests must cover:

### Pagination
- Default page behaviour.
- Maximum page size.
- Invalid page values.
- Empty collections.
- First and final pages.
- Cursor continuation.
- Invalid and expired cursors.
- Stable ordering with duplicate sort values.
- Record insertion and deletion during traversal.

### Filtering and sorting
- Valid and invalid filters.
- Multiple filter composition.
- Date boundaries.
- Unsupported sort fields.
- Invalid sort directions.
- Null ordering.
- Search scope and authorization.

### Bulk operations
- Empty request.
- Maximum permitted batch.
- Oversized batch.
- Duplicate items.
- Unauthorized resources.
- Invalid item data.
- Atomic rollback.
- Partial-success reporting.
- Retry and idempotency behaviour.
- Job status transitions.
- Cancellation behaviour.
- Job access across store boundaries.

### Performance
- Large collection queries.
- Expensive filters.
- Concurrent pagination requests.
- Bulk processing under load.
- Database query count and execution time.

Tests must verify actual database behaviour where correctness depends on transaction isolation, ordering or query execution.

## 27. Monitoring and Operational Metrics

The platform should monitor:

- Collection request volume.
- Pagination model usage.
- Average and maximum page size.
- Query execution time.
- Slow filter and sort combinations.
- Cursor validation failures.
- Bulk request volume.
- Bulk validation failure rates.
- Bulk processing duration.
- Asynchronous job queue depth.
- Job failure and cancellation rates.
- Export volume and file generation failures.

Metrics must not include unnecessary personal data or sensitive query values.

Repeated expensive queries or unusually large bulk requests should be investigated.

## 28. Implementation Guidance

The current production API uses Netlify Functions and Supabase/PostgreSQL.

The standards in this document must be implemented within that architecture without introducing competing API write paths.

The target NestJS modular monolith should provide reusable pagination, query validation and bulk-processing components while keeping domain-specific authorization and business rules within their responsible modules.

Migration must preserve:

- Existing API contracts unless a versioned change is approved.
- Store isolation.
- Pagination semantics.
- Bulk operation outcomes.
- Idempotency behaviour.
- Job access controls.
- Audit and operational records.

## 29. Acceptance Criteria

An endpoint complies with this standard when:

- Its pagination model is documented.
- Page sizes are bounded.
- Ordering is deterministic.
- Filters and sorting are allowlisted and validated.
- Authorization is applied before results are returned.
- Store isolation is enforced server-side.
- Collection responses follow the documented structure.
- Bulk limits and outcomes are explicit.
- Retry behaviour is safe.
- Large operations use an appropriate asynchronous workflow.
- Error responses follow platform standards.
- Automated tests cover relevant success, failure and authorization paths.
- Operational metrics are available for high-volume endpoints.

## 30. Open Decisions

The following decisions require explicit platform approval:

- Whether cursor pagination becomes the default for all new collection endpoints.
- Final default and maximum page sizes by endpoint category.
- Whether total counts are returned by default or only when requested.
- Standard cursor expiration and invalidation behaviour.
- Standard bulk request size by operation category.
- Which bulk operations require atomic execution.
- Asynchronous job queue and worker implementation.
- Export file formats and expiration periods.
- Whether bulk result reports use downloadable files or paginated job resources.

Until approved, implementation teams must use conservative limits and document endpoint-specific behaviour.

## 31. Related Documents

- API Development Guide
- API Architecture
- API Security and Authorization Testing Procedure
- API Rate Limiting and Abuse Prevention Standards
- Transaction Integrity and Idempotency Standards
- Database Schema and Data Modeling Standards
- Data Import, Export and Portability Standards
- Data Retention, Archiving and Secure Disposal Standards
- Error Handling and Response Standards
- Store Integration Package Specification
- Observability and Logging Standards
- Security Implementation Guide
