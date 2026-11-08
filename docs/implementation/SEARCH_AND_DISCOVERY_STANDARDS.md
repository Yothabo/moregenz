# Search and Discovery Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-811590FB89 |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

---

## 1. Purpose

This document defines standards for implementing search and discovery across the multi-store retail platform.

It establishes how users discover products and categories while protecting store boundaries, product visibility, data integrity, and consistent search behaviour.

The standards apply to:

- Public storefront search.
- Product and category discovery.
- Store-specific catalogue browsing.
- Platform administration search.
- Store administration search.
- Search indexing and synchronisation.
- Search relevance, filtering, and sorting.
- Search analytics and operational monitoring.

## 2. Scope

Search and discovery provide ways to find and navigate information already available to the requesting user.

They do not replace:

- API authorisation.
- Product publication rules.
- Store-specific catalogue availability.
- Inventory and pricing validation.
- API pagination and filtering standards.
- Business rules governing product visibility and purchasing.

A search result is not proof that a product can be purchased. The platform must validate current availability, price, publication status, and store eligibility when the user accesses or purchases the product.

## 3. Core Principles

### 3.1 Authoritative Data

The primary database remains the authoritative source for product, category, store, and publication data.

Search indexes and cached search results are derived representations. They must never become the only source of truth.

### 3.2 Store Isolation

Every storefront search must be scoped to the correct store.

A store must not discover another store's private catalogue records, unpublished products, internal metadata, or administrative information through search.

Store isolation must be enforced server-side.

### 3.3 Consistent Discovery

Users should receive predictable search behaviour across supported storefronts.

Storefronts may use different visual designs, but the underlying search rules, visibility constraints, and supported discovery capabilities must remain consistent.

### 3.4 Explainable Relevance

Search ranking must use documented and understandable factors.

Ranking must not introduce hidden commercial advantages, arbitrary store preferences, or undisclosed paid placement.

### 3.5 Graceful Degradation

Search infrastructure failures must not expose private data or compromise the primary catalogue.

Where practical, the platform should fall back to a controlled database-backed search method.

## 4. Search Domains

The platform must distinguish between public discovery and administrative search.

### 4.1 Public Storefront Search

Public search may return only information that is:

- Published and active.
- Eligible for the requesting storefront.
- Approved for public display.
- Within the requesting store's catalogue scope.
- Available under the platform's publication and visibility rules.

Typical searchable fields include:

- Product name.
- Product description.
- Brand.
- Category.
- Product type.
- Approved product attributes.
- Public SKU, only where intentionally exposed.

Internal cost prices, supplier details, private notes, unpublished content, internal identifiers, and administrative metadata must not be exposed.

### 4.2 Store Administration Search

Store administrators may search records within their authorised store scope.

Searchable information may include:

- Products and variants.
- Store listings.
- Inventory records.
- Orders.
- Customers.
- Staff records.
- Store-specific reports.

The result fields must reflect the administrator's current permissions.

### 4.3 Platform Administration Search

Platform Super Admin search may cover platform-wide records where the administrator has the relevant permission.

Platform-wide search must not automatically grant access to sensitive financial, customer, credential, or security information.

Sensitive records require their own authorisation checks before details are returned.

### 4.4 Search Scope Selection

The server must determine the search scope from the authenticated identity, authorised store context, and requested operation.

A client-supplied store identifier may select a supported context, but it must never independently establish permission to search that store.

## 5. Searchable Data and Field Governance

Every searchable entity must have an explicit field definition.

For each field, document:

- Whether it is searchable.
- Whether it is publicly searchable.
- Whether it is available to store administrators.
- Whether it is available to platform administrators.
- Whether it contributes to relevance ranking.
- Whether it may appear in result snippets.
- Whether it contains sensitive or personal information.

Search indexing must use an allowlist of approved fields.

Do not index entire database records by default.

### 5.1 Product Ownership and Store Listings

The platform must distinguish between product source ownership and store-specific product availability.

A shared product record may be associated with multiple store listings.

Search results must represent the requesting store's permitted listing and commercial information.

A product being owned by one participating store or supplier does not automatically make it visible to every storefront.

### 5.2 Product Variants

Where variants are independently identifiable, the search model must preserve their relationship to the parent product.

Variant-level attributes may be searchable when useful, including:

- Size.
- Colour.
- Volume.
- Model.
- Variant SKU.

The search response must make clear whether a result represents a product or a specific variant.

## 6. Search Query Processing

The backend must validate and normalise search input before executing a search.

Processing may include:

- Trimming unnecessary whitespace.
- Normalising supported character representations.
- Applying case-insensitive matching where appropriate.
- Removing unsupported control characters.
- Enforcing minimum and maximum query lengths.
- Validating supported search operators.
- Applying query complexity limits.

Search input must be treated as untrusted data.

The platform must use parameterised database queries or safe search-engine query APIs. User input must never be concatenated into executable SQL or query expressions.

### 6.1 Empty Queries

Empty or whitespace-only queries must not trigger unrestricted catalogue scans.

The storefront may instead display supported discovery content, such as featured categories or recently published products, subject to the same publication and store-scope rules.

### 6.2 Partial Matching

Partial matching may be supported for product names, brands, categories, and selected attributes.

The implementation must avoid overly broad matching that produces excessive or misleading results.

### 6.3 Typographical Tolerance

Fuzzy matching may be introduced where it materially improves product discovery.

It must be bounded to prevent unrelated results from dominating the response.

Exact matches should generally rank above approximate matches.

### 6.4 Language and Localisation

Search must account for supported languages and the platform's target markets.

Normalisation must not incorrectly remove meaningful characters, accents, or language-specific distinctions.

Language-specific stemming, synonyms, and transliteration may be introduced through documented configuration.

## 7. Search Relevance and Ranking

Search ranking must be deterministic where the same query, catalogue state, and configuration are supplied.

Supported ranking factors may include:

1. Exact product-name match.
2. Exact brand match.
3. Product-name relevance.
4. Category relevance.
5. Approved product attribute matches.
6. Description relevance.
7. Publication and eligibility status.

Inventory availability may be used as a discovery signal only where the business rules explicitly permit it.

Ranking must not silently replace the platform's stock validation or purchasing rules.

### 7.1 Commercial Neutrality

The platform must not secretly prioritise products because of:

- A store's ownership status.
- A store's relationship with the platform owner.
- An administrator's personal preference.
- An undocumented commission arrangement.
- An undisclosed payment or promotion.

Any sponsored placement or paid ranking feature requires an explicit business decision, clear labelling, and documented implementation rules.

### 7.2 Stable Ordering

When relevance scores are equal, use a deterministic secondary ordering.

The ordering must avoid unpredictable result movement between requests where the underlying data has not changed.

## 8. Filters, Sorting, and Facets

Search may support approved filters such as:

- Category.
- Brand.
- Product type.
- Price range.
- Product attributes.
- Publication status for authorised administrative users.
- Availability indicators where supported.

Filters must be validated against the requesting user's permissions and the active search scope.

Public users must not be able to request internal administrative filters or fields.

### 8.1 Price Filtering

Price filtering must use the applicable store listing price.

The platform must not substitute another store's price or a product's internal cost price.

The currency and price representation must be consistent with the store's configured commercial context.

### 8.2 Sorting

Supported sorting options must be explicit and validated.

Possible options include:

- Relevance.
- Price ascending.
- Price descending.
- Newest.
- Product name.

Unsupported sort fields must be rejected or handled through a documented default.

Client-supplied sort expressions must never be passed directly into database query construction.

### 8.3 Facet Accuracy

Facet counts must reflect the same visibility and store-scope rules as the search results.

Counts must not reveal the existence of hidden products, private categories, or records belonging to another store.

## 9. Search Index Architecture

The platform may begin with database-backed search and introduce a dedicated search engine when justified by scale, relevance requirements, or operational needs.

Any search index must be treated as a derived data store.

The architecture must define:

- The authoritative source tables.
- Indexed entities and fields.
- Store-scoping strategy.
- Index document identifiers.
- Update and deletion mechanisms.
- Rebuild procedures.
- Consistency expectations.
- Failure and recovery procedures.

### 9.1 Index Document Identity

Index document identifiers must be stable and unambiguous.

Where products can appear in multiple stores, the index must preserve the distinction between the shared product and each store-specific listing.

A single global product document must not cause store-specific prices, visibility, or availability to leak across storefronts.

### 9.2 Index Updates

Changes to authoritative data must trigger appropriate index updates.

Relevant changes include:

- Product creation.
- Product updates.
- Product publication.
- Product unpublication.
- Store listing activation or deactivation.
- Category changes.
- Variant changes.
- Store-specific price changes.
- Approved searchable attribute changes.

Index updates should be asynchronous where appropriate, using durable event or job processing.

The system must not assume that an event was processed merely because it was published.

### 9.3 Deletions and Visibility Changes

Unpublished, removed, or store-ineligible records must stop appearing in public search within the documented consistency window.

A failed index deletion must not leave a product publicly discoverable indefinitely.

Where immediate removal is required for security, legal, or operational reasons, the public search path must check authoritative eligibility or apply an immediate suppression mechanism.

### 9.4 Rebuilding the Index

The platform must support rebuilding search indexes from authoritative data.

Rebuild procedures must:

- Preserve store isolation.
- Avoid exposing partially rebuilt data.
- Support progress monitoring.
- Handle interrupted rebuilds.
- Avoid uncontrolled load on the production database.
- Verify record counts and scope.
- Provide a controlled cutover to the rebuilt index.

## 10. Search Consistency and Freshness

Search results may be eventually consistent when a dedicated index is used.

The platform must define acceptable freshness targets for:

- Product creation.
- Product updates.
- Publication changes.
- Store listing changes.
- Price changes.
- Category changes.
- Product removal.

The freshness target must reflect the business impact of stale data.

Search results must not be treated as authoritative for financial or inventory decisions.

Before checkout or any transaction, the backend must retrieve and validate the current authoritative product listing, price, and inventory state.

## 11. Search Result Contracts

Search responses must use documented API response contracts.

A public result should contain only approved display information, such as:

- Product identifier.
- Product name.
- Public description or summary.
- Approved product image references.
- Brand.
- Category.
- Store-specific displayed price.
- Approved variant information.
- Supported availability indicator.

Administrative responses may include additional fields when the requesting role is authorised.

Responses must not expose:

- Database credentials.
- Internal supplier costs.
- Private administrative notes.
- Unauthorised customer information.
- Internal security metadata.
- Private records from another store.

Search response contracts must remain consistent with API versioning standards.

## 12. Pagination and Result Limits

Search must use the platform's API pagination standards.

The implementation must define:

- Default page size.
- Maximum page size.
- Supported pagination method.
- Stable ordering.
- Maximum result window.
- Behaviour when the underlying catalogue changes.

Large unrestricted result sets must not be returned.

Cursor-based pagination should be considered where deep pagination or large catalogues make offset pagination inefficient.

## 13. Performance and Resource Protection

Search endpoints must have defined performance objectives.

The implementation should monitor:

- Search response latency.
- Query volume.
- Database query cost.
- Index response latency.
- Index update delay.
- Failed queries.
- Empty-result frequency.
- Timeout frequency.

Expensive query patterns must be bounded.

The platform may apply:

- Query length limits.
- Search rate limits.
- Result limits.
- Query complexity restrictions.
- Timeouts.
- Controlled caching.
- Index optimisation.

Search must not become an unrestricted mechanism for extracting the entire catalogue.

## 14. Caching

Search responses may be cached where the cache key includes every factor that affects result visibility or content.

Relevant cache dimensions may include:

- Store context.
- Publication state.
- Search query.
- Filters.
- Sorting.
- Pagination cursor.
- Currency or pricing context.
- Relevant catalogue version.

Public search caches must not be shared across stores where the response contains store-specific information.

Administrative search responses must not be placed in public caches.

Cache invalidation must follow the platform's caching standards.

## 15. Search Analytics

Search analytics may help identify customer demand and catalogue gaps.

Permitted metrics may include:

- Search volume.
- Common search terms.
- Search result counts.
- Searches returning no results.
- Filter usage.
- Result selection rates.
- Search-to-product-view conversion.
- Search-to-purchase conversion.

Analytics must respect privacy, data retention, and access-control requirements.

Search terms may contain personal or sensitive information. Collection, retention, and reporting must therefore be governed.

Analytics must not be used to infer sensitive personal characteristics or make unauthorised decisions about customers.

### 15.1 Store Attribution

Search analytics must be attributed to the correct store using verified server-side store context.

A client-supplied store identifier alone must not establish attribution.

Platform-wide reports may aggregate store metrics only where authorised and where the aggregation does not expose protected store information.

## 16. Security and Abuse Prevention

Search endpoints must enforce:

- Authentication where required.
- Server-side authorisation.
- Store isolation.
- Input validation.
- Query complexity limits.
- Rate limiting.
- Safe query construction.
- Controlled error responses.
- Appropriate logging.

Search must not provide a way to enumerate hidden product identifiers or discover unpublished records.

Administrative search must enforce permissions at the record and field level where necessary.

Search results must not be used as a substitute for access checks on the underlying record.

## 17. Failure Handling

The system must define behaviour for:

- Search index unavailability.
- Database search failure.
- Index update failure.
- Stale index documents.
- Invalid search requests.
- Query timeouts.
- Partial search infrastructure outages.

Where a safe fallback is available, the platform may use database-backed search.

If no safe fallback is available, return a controlled error and preserve the integrity of the underlying catalogue.

Do not return unrestricted or cross-store results as a fallback.

Index update failures must be observable and recoverable through retries or controlled reconciliation.

## 18. Administrative Controls

Only authorised platform administrators may change global search configuration.

Store administrators may manage store-level searchable content only within their permitted scope.

Configuration changes must be audited where they affect:

- Search visibility.
- Ranking behaviour.
- Searchable fields.
- Store-specific discovery.
- Synonyms or language rules.
- Indexing configuration.

Changes to ranking or visibility must not silently alter the commercial or operational rules of participating stores.

## 19. Testing Requirements

Search implementations must include tests for:

### Functional Testing

- Exact product-name search.
- Partial matching.
- Brand and category matching.
- Variant search.
- Filtering.
- Sorting.
- Pagination.
- Empty queries.
- No-result queries.

### Store Isolation Testing

- Store A cannot discover private Store B listings.
- Store-specific prices remain isolated.
- Unpublished products are excluded from public results.
- Deactivated listings are excluded according to the defined consistency target.
- Administrative search respects store permissions.
- Platform-wide search requires appropriate privileges.

### Security Testing

- SQL and search-expression injection attempts.
- Excessively long queries.
- Malformed filters.
- Unsupported sort fields.
- Identifier enumeration.
- Rate-limit enforcement.
- Sensitive-field exposure.
- Cache isolation.

### Consistency Testing

- Product updates reach the index.
- Publication changes are reflected.
- Deletions are processed.
- Failed index updates are retried.
- Rebuilds produce the expected records.
- Stale documents do not bypass authoritative eligibility checks.

### Performance Testing

- Normal catalogue search.
- Large catalogue search.
- Concurrent search requests.
- Expensive filter combinations.
- Index rebuild load.
- Database fallback load.

## 20. Operational Monitoring

Monitoring must cover:

- Search availability.
- Search latency.
- Error rates.
- Index freshness.
- Failed indexing jobs.
- Rebuild status.
- Search backlog.
- Database fallback frequency.
- Search resource consumption.

Alerts must be based on defined thresholds and operational impact.

A search outage must not automatically imply that the catalogue or transaction system is unavailable. The platform should preserve unaffected functionality.

## 21. Implementation Guidance

The current production implementation uses React/Vite, Supabase/PostgreSQL, and Netlify Functions.

Search changes must follow the existing production architecture until a controlled migration is approved.

The planned NestJS modular monolith may introduce dedicated search modules and indexing workers.

Migration must preserve:

- Existing API contracts where required.
- Store isolation.
- Product visibility rules.
- Searchable field governance.
- Index consistency.
- Administrative permissions.
- Monitoring and recovery procedures.

No second search implementation should independently become authoritative for product visibility or commercial eligibility.

## 22. Acceptance Criteria

A search implementation is acceptable when:

1. Search results are restricted to the authorised store or platform scope.
2. Public search exposes only approved fields.
3. Product source ownership and store listings remain distinct.
4. Search ranking follows documented rules.
5. Filters and sorting are validated.
6. Search input is safely processed.
7. Result sets are bounded and paginated.
8. Index updates and deletions are recoverable.
9. Search freshness expectations are documented.
10. Search caches preserve store isolation.
11. Search failures do not expose unauthorised data.
12. Administrative searches enforce current permissions.
13. Search analytics respect privacy and retention requirements.
14. Functional, security, consistency, and performance tests pass.
15. Search operations are observable and recoverable.

## 23. Open Decisions

The following decisions require explicit approval before implementation:

- Whether PostgreSQL full-text search is sufficient for the initial production scale.
- Whether a dedicated search engine is justified.
- Which languages require dedicated search configuration.
- Which product attributes should be searchable.
- Whether fuzzy matching is enabled.
- Whether synonyms are centrally managed or configurable.
- Search freshness targets for each data category.
- Whether sponsored placement will ever be supported.
- Search analytics retention periods.
- Performance targets and alert thresholds.

Until approved, implementations must use the simplest architecture that meets the documented requirements without weakening security or store isolation.

---

## 24. Review and Approval

This document remains a draft until reviewed and approved by the Platform Owner.

Approval must confirm that the search rules align with the platform's product catalogue, store operating model, security architecture, API standards, and data governance requirements.
