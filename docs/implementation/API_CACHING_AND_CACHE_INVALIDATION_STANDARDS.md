# API Caching and Cache Invalidation Standards

| Metadata | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines how caching must be designed, implemented, secured and invalidated across the multi-store retail platform.

Its objectives are to:

- Reduce unnecessary database and API workload.
- Improve storefront response times.
- Keep cached data consistent with its source.
- Prevent one store from receiving another store's data.
- Protect sensitive and private information.
- Establish predictable cache expiration and invalidation behaviour.
- Support the current production architecture and future backend migration.

Caching is a performance mechanism. It must never replace authorization, business-rule enforcement or durable database records.

## 2. Scope

This standard applies to:

- Public storefront APIs.
- Store administration APIs.
- Platform administration APIs.
- Internal service-to-service requests.
- Database query caching.
- Application-level caching.
- CDN and edge caching.
- Browser and client-side caching.
- Static assets.
- Generated reports and export files.
- Cached configuration and integration metadata.

It covers cache selection, cache keys, expiration, invalidation, consistency, security, monitoring and testing.

## 3. Core Principles

### 3.1 The database remains authoritative

PostgreSQL and approved durable storage remain the authoritative sources of platform data.

A cached value must never be treated as the only surviving copy of business-critical information.

### 3.2 Authorization precedes access

A cache hit must not bypass authentication, authorization or store isolation.

The application must establish the caller's permitted scope before returning protected cached data.

### 3.3 Cache only where justified

Caching must be introduced where it provides measurable performance or operational benefits.

Not every endpoint or database query requires a cache.

### 3.4 Explicit consistency expectations

Every cached resource must have a defined freshness expectation, expiration policy and invalidation mechanism.

### 3.5 Failure must be controlled

Cache failures must not silently cause incorrect business operations or expose stale sensitive data.

The application must define whether each cache is optional or required for the operation.

## 4. Cache Categories

The platform may use the following cache categories.

| Category | Typical use |
|---|---|
| Browser cache | Static frontend assets |
| CDN cache | Public static assets and approved public responses |
| Application cache | Frequently accessed application data |
| Distributed cache | Shared data across multiple application instances |
| Database query cache | Reusable query results where justified |
| Job result cache | Temporary access to generated processing results |

The selected cache technology must be documented for each implementation.

## 5. Data Classification

Cache eligibility must be based on data sensitivity and access scope.

### 5.1 Public data

Examples:

- Public product descriptions.
- Published product images.
- Public category information.
- Public storefront configuration.
- Published marketing content.

Public data may be cached where the response is identical for all authorized public visitors within the relevant store context.

### 5.2 Store-scoped data

Examples:

- Store-specific product listings.
- Store inventory availability.
- Store-specific prices.
- Store configuration.
- Store-specific promotional information.

Store-scoped data must use cache isolation that prevents cross-store exposure.

### 5.3 User-specific data

Examples:

- Customer account information.
- Shopping carts.
- Order history.
- Personal preferences.
- User-specific administrative views.

User-specific information must not be placed in shared public caches.

Where application caching is justified, keys must include the correct authenticated identity and authorization context.

### 5.4 Sensitive data

Examples:

- Authentication credentials.
- Access tokens.
- Payment credentials.
- Private financial records.
- Security secrets.
- Sensitive personal information.

Sensitive data must not be placed in public caches or exposed through shared cache layers.

Any narrowly justified internal caching must receive explicit security review and strict access and expiration controls.

## 6. Cache Key Design

Cache keys must uniquely identify the resource, representation and relevant access scope.

Keys must be:

- Deterministic.
- Consistent across application instances.
- Versionable where necessary.
- Free from unnecessary personal information.
- Designed to avoid collisions.
- Scoped to the correct platform, store or user context.

Examples of logical key structures:

- `store:{storeId}:products:{queryVersion}`
- `store:{storeId}:product:{productId}`
- `store:{storeId}:configuration:{version}`
- `user:{userId}:cart:{cartId}`

These are logical examples. Actual key formats must follow the selected cache technology.

### 6.1 Store isolation

Store-scoped keys must contain a verified store scope.

The store identifier must be resolved from trusted server-side context, not blindly accepted from a client request.

### 6.2 User isolation

User-specific keys must include the authenticated user identity.

If permissions affect the response, the key must also account for the relevant authorization context or the cached response must be invalidated when permissions change.

### 6.3 Key versioning

Key versioning should be used where data structures or serialization formats change.

A new key version can prevent incompatible cached values from being interpreted by newer application code.

## 7. Cache-Control and HTTP Headers

Public API responses may use HTTP caching where the response is safe to share.

The server must set appropriate cache headers according to the endpoint's classification.

Relevant directives include:

- `Cache-Control`
- `ETag`
- `Last-Modified`
- `Vary`

Private or sensitive responses must use appropriate private or no-store directives.

The API must not use public caching for responses that contain user-specific or administrative information.

### 7.1 Public response caching

Public caching may be used for stable published content.

The response must not vary according to hidden identity, private permissions or unrepresented store context.

### 7.2 Private response caching

Private caching may be used for user-specific responses where appropriate.

The cache must remain within the user's authorized context.

### 7.3 No-store responses

Authentication responses, secrets and highly sensitive information should use no-store behaviour unless a security-reviewed exception is approved.

## 8. Cache Expiration

Every cache entry must have an expiration policy.

Expiration values must be selected according to:

- Data volatility.
- Business impact of stale information.
- Update frequency.
- Expected request volume.
- Cost of recomputation.
- Availability requirements.

Suggested starting guidance:

| Data type | Initial policy |
|---|---|
| Static versioned assets | Long-lived with content-based filenames |
| Public product descriptions | Short to moderate TTL |
| Public category information | Moderate TTL |
| Store configuration | Short TTL with active invalidation |
| Inventory availability | Very short TTL or event-driven invalidation |
| Prices and promotions | Short TTL with explicit invalidation |
| User-specific data | Private cache with strict expiration |
| Financial records | Avoid shared caching |

These are starting guidelines, not universal values. Final TTLs must be defined by endpoint or resource category.

## 9. Cache Invalidation

Cache invalidation must occur when a source change makes a cached representation incorrect or unauthorized.

Invalidation events may include:

- Product creation.
- Product updates.
- Product status changes.
- Product deletion.
- Store configuration changes.
- Inventory adjustments.
- Price changes.
- Promotion activation or expiry.
- Store suspension or reactivation.
- Permission changes.
- User account changes.
- Catalogue publication changes.

The responsible domain module must define which cache entries are affected by each event.

### 9.1 Invalidation ownership

The service responsible for changing the source data must also trigger the required invalidation process.

Frontend clients must not be responsible for ensuring server-side cache correctness.

### 9.2 Invalidation scope

Invalidation must target the smallest safe scope.

A change to one store's product listing must not unnecessarily invalidate unrelated stores' caches.

Broad invalidation is acceptable where targeted invalidation cannot be performed reliably, but its operational impact must be understood.

### 9.3 Failed invalidation

Where invalidation fails, the system must have a recovery mechanism.

Options include:

- Retryable invalidation events.
- Durable event records.
- Shorter TTLs as a safety boundary.
- Versioned cache namespaces.
- Operational alerts for persistent failures.

A database write must not be reported as fully consistent if a required invalidation process has failed and the system cannot safely tolerate the stale state.

## 10. Database Write and Cache Consistency

The database remains authoritative during mutations.

The platform should use a write-through or write-invalidate approach according to the resource and operation.

A typical write-invalidate sequence is:

1. Validate the request.
2. Authorize the operation.
3. Commit the database transaction.
4. Publish or record the invalidation event.
5. Invalidate affected cache entries.
6. Return the result according to the operation's consistency contract.

Where database writes and event publication must remain consistent, use a durable mechanism such as a transactional outbox.

The platform must avoid a design where a successful database transaction can permanently lose its corresponding invalidation event.

## 11. Inventory and Pricing Consistency

Inventory and pricing have direct commercial consequences.

Their caching policies must account for the risk of stale values.

### 11.1 Inventory

Cached inventory values may be used for display where the endpoint's freshness contract permits it.

A cached inventory value must never be the sole authority for confirming that a sale, reservation or stock movement can proceed.

The actual inventory operation must validate current authoritative state within the appropriate transaction boundary.

### 11.2 Pricing

Published prices may be cached for storefront display.

The checkout or order-creation process must revalidate the applicable price and commercial rules before confirming the transaction.

A stale cached price must not silently become the authoritative transaction price.

### 11.3 Promotions

Promotion eligibility and validity must be checked against authoritative rules during the relevant transaction.

Cache expiration must account for promotion start and end times.

## 12. Store Configuration Caching

Store configuration may be cached to reduce repeated database access.

The cache must distinguish:

- Public storefront configuration.
- Private administrative configuration.
- Integration configuration.
- Security-sensitive settings.

Only approved public configuration may be delivered to storefront clients.

Private integration credentials and server-side secrets must never be included in public configuration responses.

Configuration changes must trigger invalidation or version changes so that storefronts do not continue using obsolete settings indefinitely.

## 13. Permission and Session Changes

Permission changes must take effect according to the platform's authorization freshness requirements.

Cached authorization decisions must not allow revoked permissions to remain effective beyond the approved revocation window.

The system must invalidate or re-evaluate relevant cached access decisions after:

- Role changes.
- Permission changes.
- User deactivation.
- Store membership changes.
- Store suspension.
- Session revocation.
- Platform administrative access changes.

A stale cache entry must never override current server-side authorization state.

## 14. Cache Stampede Protection

The platform should protect expensive cache misses from triggering large numbers of identical database queries.

Possible controls include:

- Request coalescing.
- Single-flight loading.
- Short-lived locks.
- Stale-while-revalidate for approved public content.
- Background refresh.
- Randomized expiration offsets.

Locking must not introduce deadlocks or make the cache a single point of failure.

Stale-while-revalidate must not be used for data where stale values could cause security, financial or inventory integrity problems.

## 15. Cache Failure Behaviour

Each cache dependency must have a documented failure policy.

### 15.1 Optional cache

Where the cache is only a performance optimization, the application may fall back to the authoritative data source.

Fallback behaviour must remain bounded and must not overload the database.

### 15.2 Required cache

Where an operation genuinely depends on a cache-backed coordination mechanism, the application must fail safely if the dependency is unavailable.

The application must not assume a missing cache value means that a protected resource or operation is available.

### 15.3 Degraded operation

The platform may temporarily disable selected cache features during incidents.

Such changes must follow operational controls and must not weaken authorization or transaction integrity.

## 16. CDN and Static Asset Caching

Static assets should use content-based or versioned filenames.

When an asset changes, the new asset should receive a new URL so that browsers and CDNs can safely retain older versions without serving them as current.

HTML entry points and other asset manifests must use cache settings that allow clients to discover current asset versions.

Private uploads must not become publicly cacheable merely because they are stored in an object-storage service.

Public and private storage access must remain explicitly separated.

## 17. Cache Data Privacy

Cache contents must follow the platform's privacy and data retention requirements.

Requirements:

- Do not cache credentials or secrets in shared caches.
- Do not place unnecessary personal data in cache keys.
- Restrict access to cache infrastructure.
- Encrypt cache traffic where supported.
- Protect cache backups and persistence files.
- Define expiration and deletion behaviour.
- Avoid logging sensitive cached values.
- Ensure cache data is not exposed through public debugging endpoints.

Cache entries containing personal data must be removed or invalidated when required by an approved retention or disposal process.

## 18. Cache Technology and Architecture

The current production platform uses Netlify Functions and Supabase/PostgreSQL.

Implementation must use caching capabilities that are compatible with the current deployment environment.

The platform must not assume that process-local memory is shared across serverless function instances.

Process-local caching may be used only as a short-lived optimization where inconsistent instances cannot compromise correctness.

A distributed cache may be introduced when shared application instances require coordinated caching or when measured workload justifies the additional infrastructure.

The target NestJS modular monolith should centralize cache policy and reusable cache operations while preserving domain ownership of invalidation rules.

The selected technology must be documented and approved before becoming a production dependency.

## 19. Observability and Monitoring

The platform should monitor:

- Cache hit rate.
- Cache miss rate.
- Cache read and write latency.
- Cache errors.
- Invalidation success and failure.
- Invalidation delay.
- Expired entry volume.
- Cache memory usage.
- Eviction rate.
- Database load during cache degradation.
- Stale data incidents.
- Cache stampede events.

Monitoring must distinguish between cache performance problems and application or database failures.

Logs must not expose secrets, authentication tokens or unnecessary personal information.

## 20. Testing Requirements

Tests must cover:

### Cache behaviour
- Cache hit.
- Cache miss.
- Expiration.
- Cache refresh.
- Invalid cache entries.
- Cache backend unavailability.
- Fallback behaviour.

### Isolation
- Store A cannot receive Store B's cached data.
- One user cannot receive another user's private data.
- Administrative responses cannot enter public cache paths.
- Permission changes invalidate or bypass stale authorization results.

### Invalidation
- Product changes invalidate relevant entries.
- Inventory changes invalidate affected availability data.
- Price changes invalidate affected price representations.
- Store configuration changes invalidate the correct scope.
- Failed invalidation is retried or surfaced.
- Deleted resources are not served indefinitely from cache.

### Consistency
- Database writes remain authoritative.
- Cache failures do not duplicate business operations.
- Checkout revalidates current price and inventory.
- Stale cache values cannot bypass business rules.

### Performance
- Cache effectiveness under expected load.
- Database fallback under cache failure.
- Concurrent cache misses.
- Invalidation under concurrent reads and writes.

## 21. Security Review Requirements

A cache implementation must receive security review when it:

- Stores user-specific or sensitive information.
- Shares data across stores.
- Caches authorization decisions.
- Exposes cached content through a CDN.
- Stores private uploads or generated reports.
- Introduces a new distributed infrastructure dependency.
- Changes cache behaviour for financial or inventory operations.

The review must consider data classification, access scope, key construction, invalidation, expiration and failure behaviour.

## 22. Acceptance Criteria

A caching implementation complies with this standard when:

- Its purpose and data classification are documented.
- The authoritative source remains clear.
- Cache keys include the correct scope.
- Sensitive data is not exposed through shared caches.
- Expiration policies are defined.
- Invalidation triggers are documented.
- Failed invalidation has a recovery path.
- Authorization remains independent of cache hits.
- Inventory and pricing are revalidated during relevant transactions.
- Cache failures follow an explicit policy.
- Monitoring and tests cover the implementation.
- The implementation does not introduce competing write paths.

## 23. Open Decisions

The following decisions require explicit platform approval:

- Which distributed cache technology, if any, will be adopted.
- Which endpoints may use CDN caching.
- Final TTL values by resource category.
- Cache invalidation event delivery mechanism.
- Whether stale-while-revalidate is permitted for selected public content.
- Cache namespace and key versioning conventions.
- Cache persistence and backup requirements.
- Cache monitoring thresholds and alert ownership.

Until approved, teams must use conservative cache policies and avoid caching sensitive or integrity-critical data.

## 24. Related Documents

- API Architecture
- API Development Guide
- Backend Development Guide
- Database Operations Guide
- Database Schema and Data Modeling Standards
- Security Architecture
- Security Implementation Guide
- Identity and Access Architecture
- Transaction Integrity and Idempotency Standards
- API Rate Limiting and Abuse Prevention Standards
- Platform and Store Configuration Standards
- Inventory Architecture
- Commerce Architecture
- Data Retention, Archiving and Secure Disposal Standards
- Observability and Logging Standards
- Capacity Planning and Scalability Standards
