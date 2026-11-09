# Product Catalogue Performance and Reliability

**Document status:** Architecture specification
**Scope:** Current Yotaabo and Porschs stores, with provisions for future multi-store expansion
**Implementation status:** Performance and reliability requirements. Actual performance must be measured against the deployed application before requirements are classified as achieved.

## 1. Purpose

This document defines performance, scalability, and reliability requirements for the shared product catalogue.

It covers:

- Database query efficiency.
- Catalogue search and filtering.
- Pagination.
- Database indexing.
- Store-scoped queries.
- Caching.
- Product media delivery.
- Concurrent operations.
- Failure handling.
- Monitoring.
- Performance testing.
- Future scalability.

The objective is to keep catalogue operations responsive, predictable, and reliable while maintaining the separation between shared source products and store-specific records.

## 2. Performance principles

The catalogue architecture must follow these principles:

1. Retrieve only the information required by each operation.
2. Apply filtering and store scoping in the database query.
3. Avoid unrestricted catalogue retrieval.
4. Use bounded queries and pagination.
5. Prevent N+1 query patterns.
6. Index frequently queried fields based on actual access patterns.
7. Keep store-specific cache entries isolated.
8. Avoid unnecessary infrastructure and premature optimisation.
9. Measure performance using representative data.
10. Preserve correctness and data isolation when optimising.

Performance improvements must not weaken authorisation or data integrity.

## 3. Query efficiency

Catalogue queries must be designed around the operation being performed.

Examples include:

- Searching products by name.
- Filtering by category.
- Retrieving product details.
- Retrieving variants.
- Retrieving a store's listings.
- Retrieving published storefront products.
- Retrieving store-specific inventory.

The backend must apply validated criteria before retrieving records.

It must not:

- Retrieve the entire catalogue and filter it in application memory.
- Load every product relationship by default.
- Retrieve unused product fields.
- Load all media when only one image is required.
- Execute additional queries for every product in a result set.
- Request unbounded result sets.
- Perform unnecessary repeated queries.

Queries should select only the fields and relationships required by the requesting operation.

## 4. Store-scoped query performance

Store context must be included in store-specific database queries.

Examples include:

- Retrieving Yotaabo listings.
- Retrieving Porschs listings.
- Retrieving store-specific prices.
- Retrieving store-specific publication status.
- Retrieving inventory for one store.

The backend must apply store scope at the database query level.

Do not retrieve listings or inventory for every store and filter them after retrieval.

Query optimisation must preserve the same store isolation requirements defined in `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`.

## 5. Search and filtering

The catalogue should support efficient search and filtering.

Potential search criteria include:

- Product name.
- Brand.
- Category.
- Product type.
- Product status.
- Product attributes.
- Variant information.
- Eligibility.
- Other validated fields.

### 5.1 Search implementation

Search should use database capabilities appropriate to the actual data model and query patterns.

Depending on requirements, this may include:

- Exact matching.
- Partial matching.
- Case-insensitive matching.
- Prefix matching.
- Full-text search.
- Attribute-based filtering.

Search behaviour must be consistent and documented.

The system should avoid expensive wildcard searches across large datasets without appropriate indexing or query planning.

### 5.2 Search relevance

If relevance ranking is introduced, its behaviour should be defined and tested.

Potential ranking criteria include:

- Exact product name match.
- Brand match.
- Prefix match.
- Attribute match.
- Other approved relevance signals.

Search ranking must not override store eligibility or access restrictions.

### 5.3 Advanced search infrastructure

A dedicated search engine may become useful as catalogue size or search complexity increases.

However, introducing one must be justified by measured limitations of the existing database search implementation.

The initial architecture should prefer the simplest solution that meets actual performance requirements.

## 6. Pagination

Catalogue and listing endpoints must use bounded pagination.

The API must define:

- Default page size.
- Maximum page size.
- Supported sort fields.
- Sort direction.
- Stable ordering.
- Pagination metadata.
- Behaviour when records change between requests.

### 6.1 Offset pagination

Offset pagination may be sufficient for smaller datasets and administrative screens.

However, large offsets can become inefficient depending on the database and query plan.

### 6.2 Cursor pagination

Cursor pagination should be considered when:

- Catalogue size grows substantially.
- Deep pagination becomes expensive.
- Results change frequently.
- Stable traversal is important.

Cursor values must be validated and must not allow a client to bypass store scope or other query restrictions.

### 6.3 Unbounded results

The API must not allow clients to request unlimited catalogue or listing results.

Bulk retrieval should use a separate controlled workflow with explicit limits and permissions.

## 7. Database indexing

Indexes must reflect actual query patterns.

Potential index candidates include:

- Product status.
- Product name.
- Brand reference.
- Category relationships.
- Product type.
- Store identifier.
- Source product identifier.
- Listing status.
- Publication status.
- Variant relationships.
- SKU.
- Inventory product or variant reference.
- Inventory store scope.
- Frequently used combinations of filter and sort fields.

These are candidates, not instructions to create every listed index.

### 7.1 Index design

Before adding an index:

1. Identify the query it is intended to improve.
2. Inspect the query plan.
3. Evaluate selectivity and expected data volume.
4. Consider existing indexes.
5. Measure read and write impact.
6. Confirm that the index supports the required ordering or filtering.

Composite indexes should be considered where queries consistently combine fields such as store scope, listing status, and publication status.

Index design must be based on measured query patterns.

### 7.2 Index maintenance

Indexes introduce storage and write costs.

The system should review index effectiveness as data volume and query patterns change.

Unused or redundant indexes should be evaluated rather than retained indefinitely without justification.

## 8. Database query planning

Representative catalogue queries should be reviewed using the database's query-plan tools.

Review should consider:

- Index usage.
- Full table scans.
- Join behaviour.
- Sort operations.
- Estimated and actual row counts.
- Query execution time.
- Data retrieval volume.
- Relationship loading.
- Locking behaviour.

Slow queries should be investigated before adding infrastructure or rewriting the data model.

Performance testing must use representative data volumes rather than relying exclusively on a small development dataset.

## 9. Caching

Caching may reduce repeated database queries and improve storefront response times.

However, cache boundaries must reflect the separation between source products and store-specific records.

### 9.1 Potential cache areas

Potential cache targets include:

- Public catalogue information.
- Product detail data.
- Category information.
- Product media references.
- Published storefront listings.
- Stable store configuration.

### 9.2 Store-specific cache isolation

Store-specific cache keys must include the relevant store context.

For example, a Yotaabo listing response must not be returned as a Porschs listing response.

Cache separation must also account for:

- Price.
- Promotion.
- Publication status.
- Store-specific presentation.
- Inventory availability where exposed.

### 9.3 Cache invalidation

The system must invalidate or refresh affected cache entries when relevant data changes.

Examples:

- Source-product changes may affect product detail responses in multiple stores.
- A Yotaabo price change must affect Yotaabo listing caches only.
- A Porschs publication change must not change Yotaabo publication state.
- A store category ordering change must affect only that store's category presentation.

Cache invalidation must not be treated as the authoritative persistence mechanism.

The database remains the authoritative source of record.

### 9.4 Cache consistency

The system must define acceptable cache freshness for each data type.

Administrative operations should not create misleading results because stale cached information is presented as the current authoritative state.

Private administrative data must not be exposed through public cache entries.

## 10. Product media performance

Product images and other media can materially affect storefront performance.

The media delivery strategy should consider:

- Appropriate image dimensions.
- Efficient image formats.
- Compression.
- Responsive image delivery.
- Lazy loading.
- Thumbnail generation.
- Media caching.
- Storage access permissions.
- Missing or unavailable media.

The frontend should not load full-resolution source images when a smaller display asset is sufficient.

Media delivery should be independent of catalogue query performance.

The storage provider and exact media-processing architecture remain subject to the wider platform decisions.

## 11. Frontend performance

The storefront should avoid unnecessary product data loading and rendering.

Requirements include:

- Fetch only the data needed for the current view.
- Use pagination or controlled incremental loading.
- Avoid repeated requests for identical data.
- Avoid rendering unnecessary product relationships.
- Load media at appropriate sizes.
- Handle loading and error states.
- Avoid blocking the entire storefront while unrelated product data loads.

The frontend must not compensate for inefficient backend queries by downloading the entire catalogue.

## 12. Concurrent operations

Multiple administrators may update catalogue and store records at the same time.

The backend must protect against conflicting operations.

Requirements include:

- Transactional updates where related records must change together.
- Appropriate concurrency controls.
- Duplicate submission protection.
- Safe inventory adjustments.
- Valid lifecycle transitions.
- Consistent handling of simultaneous listing updates.
- Explicit conflict responses.

A later request must not silently overwrite a conflicting update without the application's defined concurrency policy.

Inventory operations require particular care because concurrent stock changes can produce incorrect quantities.

## 13. Reliability and failure handling

Catalogue operations must fail safely.

The system should handle:

- Database connection failures.
- Query timeouts.
- Validation failures.
- Permission failures.
- Concurrent update conflicts.
- Media storage failures.
- Cache failures.
- External service failures.
- Partial operation failures.

A failure must not leave source products, listings, or inventory in an inconsistent state.

Where an operation involves multiple dependent changes, use an appropriate transaction or controlled recovery process.

### 13.1 Database failures

Database errors should be handled without exposing internal database information to public clients.

The application should distinguish recoverable failures from permanent validation or permission errors.

### 13.2 Media failures

If media upload or processing fails, the system must not create an invalid media reference.

The application should provide a recoverable failure state and avoid presenting missing media as successfully stored.

### 13.3 Cache failures

A cache failure should not compromise the authoritative catalogue or store records.

Where appropriate, the application should be able to retrieve data from the authoritative database.

## 14. Availability and recovery

The catalogue's availability depends on the wider backend, database, hosting, and storage architecture.

The platform must define:

- Backup frequency.
- Backup retention.
- Recovery procedures.
- Recovery Point Objective (RPO).
- Recovery Time Objective (RTO).
- Database restoration testing.
- Media recovery requirements.
- Incident responsibilities.

The exact values must be approved based on business requirements and operational capacity.

A successful backup job alone does not prove that restoration is possible.

Recovery procedures must be tested.

## 15. Monitoring and observability

Performance and reliability must be measured.

Monitoring should include:

- API response times.
- Database query duration.
- Slow queries.
- Error rates.
- Database connection health.
- Catalogue search performance.
- Listing retrieval performance.
- Cache hit and miss rates.
- Media delivery failures.
- Inventory update failures.
- Request volume.
- Resource utilisation.

Monitoring should distinguish shared catalogue failures from store-specific failures where possible.

Logs must not expose authentication secrets or unnecessary personal information.

## 16. Performance targets

Performance targets must be established using real usage patterns and deployment characteristics.

The following are proposed starting targets, not verified current service-level commitments.

| Operation | Proposed target |
|---|---|
| Cached public product retrieval | p95 under 300 ms |
| Standard catalogue search | p95 under 500 ms |
| Store listing retrieval | p95 under 500 ms |
| Product detail retrieval | p95 under 500 ms |
| Standard administrative update | p95 under 800 ms |
| Database query timeout | Explicitly configured and monitored |
| API error rate | Measured and reviewed |
| Media loading | Appropriate to asset size and network conditions |

Targets should be evaluated under representative load.

The system should measure:

- p50 latency.
- p95 latency.
- p99 latency.
- Throughput.
- Error rate.
- Resource utilisation.

Do not treat proposed targets as achieved until load and performance tests provide evidence.

## 17. Load and stress testing

Performance tests should cover realistic usage patterns.

Scenarios should include:

- Catalogue searches with multiple filters.
- Deep pagination.
- Concurrent administrative users.
- Simultaneous storefront traffic.
- Product detail retrieval.
- Store-specific listing retrieval.
- Concurrent price updates.
- Concurrent inventory adjustments.
- Cache invalidation.
- Media-heavy storefront pages.

Testing should identify:

- Response-time degradation.
- Database bottlenecks.
- Connection exhaustion.
- Memory pressure.
- Excessive query counts.
- Lock contention.
- Cache inconsistency.
- Failure under increased load.

Load tests should not use production credentials or uncontrolled production mutations.

## 18. Scalability

The catalogue architecture should support additional stores without requiring a separate catalogue for every storefront.

Scaling should preserve:

- Shared source-product identity.
- Store-scoped listings.
- Independent pricing.
- Independent publication.
- Independent inventory.
- Explicit eligibility.
- Permission enforcement.
- Audit history.

Potential future scaling measures include:

- Query and index optimisation.
- Connection pooling.
- Caching.
- Background processing.
- Read replicas.
- Dedicated search infrastructure.
- Distributed media delivery.

These measures should be introduced only when justified by actual workload and operational requirements.

## 19. Avoiding premature infrastructure

The following technologies may be useful in a larger deployment but are not automatically required for the current two-store arrangement:

- Dedicated search engines.
- Distributed caches.
- Message brokers.
- Event streaming platforms.
- Microservices.
- Database sharding.
- Separate catalogue databases per store.
- Complex multi-region infrastructure.

Any proposed infrastructure addition should identify:

1. The current limitation.
2. Supporting measurements.
3. Expected benefit.
4. Operational cost.
5. Security implications.
6. Failure and recovery implications.
7. Alternatives considered.

The simplest architecture that satisfies measured requirements should be preferred.

## 20. Current and future performance distinction

| Area | Current requirement | Future consideration |
|---|---|---|
| Shared catalogue queries | Required | Larger catalogue volumes |
| Store-scoped queries | Required | More participating stores |
| Pagination | Required | Cursor pagination where justified |
| Database indexing | Based on actual query patterns | Expanded index strategy |
| Search | Database-backed search where sufficient | Dedicated search service |
| Store-specific caching | Correct store separation | Distributed caching |
| Media optimisation | Required where assets justify it | Dedicated media processing |
| Concurrent updates | Required | Higher write throughput |
| Inventory consistency | Required | Multi-location inventory |
| Monitoring | Required | Advanced observability |
| Backup and recovery | Required | Defined service-level objectives |
| Read replicas | Not assumed necessary | Consider when measured |
| Database sharding | Not assumed necessary | Consider only at substantial scale |

## 21. Open decisions

The following matters require measurement or approval:

1. Actual catalogue volume and expected growth.
2. Expected concurrent administrative users.
3. Expected storefront traffic.
4. Search complexity and relevance requirements.
5. Default and maximum page sizes.
6. Pagination strategy.
7. Database indexes required by measured queries.
8. Cache provider and cache duration.
9. Cache invalidation strategy.
10. Media transformation and delivery approach.
11. Database connection limits.
12. API and query timeout values.
13. Performance targets.
14. Load-testing thresholds.
15. Backup frequency and retention.
16. RPO and RTO.
17. Monitoring and alerting thresholds.
18. Conditions that justify additional infrastructure.

## 22. Related documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`
- `../API_ARCHITECTURE.md`
- `../DATA_ARCHITECTURE.md`
- `../SYSTEM_ARCHITECTURE.md`
- `../STORE_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../../product/PRODUCT_VISION.md`
- `../../product/SCOPE_AND_EXCLUSIONS.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`

## 23. Document maintenance

Update this document when measured performance, data volume, infrastructure, or reliability requirements change.

Before marking a performance or reliability requirement as achieved:

1. Identify the relevant operation.
2. Use representative data.
3. Measure actual performance.
4. Review query plans where applicable.
5. Verify store isolation.
6. Test failure handling.
7. Record the test conditions and results.
8. Document any remaining limitations.

A proposed target is not an achieved service level. An architectural recommendation is not proof of deployed infrastructure.
