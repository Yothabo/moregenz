# Product Catalogue APIs and Integration

**Document status:** Architecture specification
**Scope:** Current Yotaabo and Porschs stores, with provisions for future multi-store expansion
**Implementation status:** API and integration requirements. Endpoint names, request contracts, and behaviours must be verified against the live application before being classified as implemented.

## 1. Purpose

This document defines the API and integration requirements for the shared product catalogue.

It describes how:

- Administrators submit and manage source products.
- Stores access products available in the shared catalogue.
- Each store creates and manages its own listings.
- Storefronts retrieve their own published products.
- Store-specific pricing and inventory remain isolated.
- Backend services enforce permissions and business rules.
- Future storefronts may integrate without duplicating catalogue infrastructure.

The API must preserve the distinction between shared catalogue data and store-specific commercial data.

## 2. Integration principles

The API architecture must follow these principles:

1. The backend is the authoritative source for catalogue and listing data.
2. The frontend must not independently determine permissions or product eligibility.
3. Store scope must be verified by the backend.
4. Shared catalogue access must not expose unrestricted source-product editing.
5. Store listings must remain independent.
6. Store pricing, promotions, publication, and inventory must remain store-specific.
7. API responses must return only the data required by the requesting operation.
8. Queries must be bounded, validated, and efficient.
9. Sensitive operations must be authenticated, authorised, and audited.
10. API contracts must be documented and versioned where necessary.

## 3. Integration architecture

The conceptual integration is:

    Yotaabo Storefront --------\
                                \
                                 Shared Backend API
                                /        |
    Porschs Storefront --------/         |
                                         |
                              Shared Product Catalogue
                                         |
                              Store Listing Services
                                         |
                              Store Inventory Services
                                         |
                              Authentication and
                              Authorisation Services

Both storefronts use the shared backend and catalogue infrastructure.

They do not require separate product catalogue databases merely because they have different storefront experiences.

The Porschs storefront currently uses the `/porschs` route on the existing domain. This route establishes the Porschs storefront context; it does not represent a separate backend or catalogue.

## 4. API domain boundaries

The API should maintain clear domain boundaries.

### 4.1 Catalogue API

Responsible for shared source-product operations.

Potential responsibilities:

- Search catalogue products.
- Retrieve source-product details.
- Submit a product for catalogue admission.
- Validate product data.
- Manage product attributes and variants.
- Retrieve catalogue status.
- Perform authorised source-product administration.

The catalogue API must enforce source-product permissions independently of store listing permissions.

### 4.2 Store listing API

Responsible for store-specific product listings.

Potential responsibilities:

- Retrieve products available for a store to list.
- Create a store listing.
- Retrieve a store's listings.
- Update permitted listing fields.
- Update store-specific pricing.
- Manage promotions.
- Publish and unpublish listings.
- Archive listings.

Every listing operation must be scoped to the authorised store.

### 4.3 Storefront API

Responsible for supplying public storefront data.

Potential responsibilities:

- Retrieve published products for a storefront.
- Retrieve product details.
- Retrieve permitted product variants.
- Retrieve store-specific prices.
- Retrieve promotional information.
- Retrieve permitted product media.
- Retrieve category and presentation information.

Public storefront endpoints must not expose administrative information, private product data, or another store's commercial records.

### 4.4 Inventory API

Responsible for store-specific inventory operations.

Potential responsibilities:

- Retrieve authorised stock information.
- Record stock receipts.
- Record stock adjustments.
- Manage reservations.
- Release reservations.
- Retrieve stock movement history.
- Support approved inventory reconciliation.

Inventory operations must enforce store scope and inventory permissions.

The inventory API must not treat the shared catalogue as a shared stock pool.

## 5. Store context and request scoping

Every store-specific API operation must operate within a verified store context.

The backend must establish that context through the authenticated session, authorised store membership, or another approved server-side mechanism.

A store identifier supplied by the frontend may be used as a requested context, but it must never be trusted without backend validation.

### 5.1 Required checks

For store-scoped operations, the backend must verify:

- The requesting actor is authenticated where authentication is required.
- The actor has access to the requested store.
- The actor has the permission required for the operation.
- The target record belongs to the relevant store where applicable.
- The source product is eligible for the requested store.
- The requested state transition is valid.

### 5.2 Storefront context

The storefront route or domain may identify the intended store.

For the current arrangement:

- The existing root storefront resolves to Yotaabo.
- The `/porschs` route resolves to Porschs.

The backend must not rely solely on a client-supplied store name or route value for authorisation.

Storefront resolution and administrative authorisation are separate concerns.

## 6. Catalogue discovery and search

The API must support catalogue discovery for authorised store administrators.

Search and filtering should support applicable criteria such as:

- Product name.
- Brand.
- Category.
- Product type.
- Product status.
- Relevant attributes.
- Variant information.
- Product eligibility.
- Other validated catalogue fields.

### 6.1 Query requirements

Search must be performed by the backend.

The API must not retrieve the entire product catalogue and filter it in frontend memory.

Queries should:

- Validate search criteria.
- Apply filters in the database query.
- Apply store eligibility constraints.
- Use bounded result limits.
- Retrieve only required fields.
- Use pagination.
- Avoid unnecessary relationship loading.
- Avoid N+1 query patterns.
- Use appropriate indexes.

### 6.2 Pagination

Catalogue search must support pagination.

Offset pagination may be acceptable for smaller datasets, but cursor-based pagination should be considered when catalogue size or query performance makes offsets inefficient.

The API must define:

- Default page size.
- Maximum page size.
- Supported sort fields.
- Sort direction.
- Cursor format, where applicable.
- Behaviour when records change during pagination.

Clients must not be allowed to request unbounded result sets.

## 7. Product submission and admission APIs

Product submission must be a controlled backend operation.

The conceptual request flow is:

1. An authorised administrator submits product information.
2. The backend validates the actor and operation.
3. The backend validates the submitted product data.
4. The backend checks for possible duplicates.
5. The backend applies the applicable admission rules.
6. The backend creates or rejects the catalogue submission.
7. The result is recorded and returned to the client.

The API must distinguish between a submitted product and an accepted source product.

A successful HTTP request must not be interpreted as catalogue acceptance unless the API contract explicitly confirms that the product has been accepted.

### 7.1 Duplicate handling

The API should return a meaningful result when a possible duplicate exists.

The response should allow the client to distinguish between:

- A new product accepted.
- A submission requiring review.
- A rejected submission.
- A possible duplicate.
- An invalid request.
- An unauthorised operation.

The API must not silently create duplicate source products where the duplicate rules identify an existing record.

## 8. Store listing APIs

Store listing endpoints must operate on the authenticated store context.

### 8.1 Listing creation

A listing creation request should identify the source product and provide the store-specific fields required for that listing.

The backend must verify:

- The source product exists.
- The source product is in an eligible state.
- The store may use the source product.
- The actor may create listings for that store.
- Required listing fields are valid.
- A duplicate listing is not created contrary to the business rules.

The backend then creates a store-scoped listing.

### 8.2 Listing retrieval

Listing retrieval must be restricted to the relevant store unless the actor has an explicitly authorised broader role.

The API must not return another store's private listing data through a normal store-admin request.

### 8.3 Listing updates

Listing updates must use an explicit field allowlist.

The backend must distinguish between:

- Permitted store-specific fields.
- Source-product fields.
- Fields managed by another service.
- Fields requiring higher authority.

A store listing update must not allow the client to overwrite source-product ownership, source-product identity, or another store's commercial information.

### 8.4 Publication operations

Publication and unpublication must be explicit operations or validated state transitions.

The backend must check all required publication conditions.

Publishing a listing in one store must not publish another store's listing.

Unpublishing a listing must not automatically retire the source product.

## 9. Storefront product APIs

Public storefront APIs must return only products that are published and available for the resolved store.

The response should contain the information required to render the storefront, such as:

- Product identity.
- Permitted product description.
- Store listing information.
- Store-specific price.
- Applicable promotional information.
- Published variants.
- Permitted media.
- Category information.
- Store-specific presentation data.

Public endpoints must not expose:

- Internal ownership metadata.
- Private administrative notes.
- Permission information.
- Unpublished listings.
- Another store's prices.
- Another store's inventory.
- Internal audit records.
- Private supplier or operational data.

### 9.1 Store-specific results

The same source product may appear differently in each storefront.

For example:

- Yotaabo may publish a listing at one price.
- Porschs may publish a listing at a different price.
- Yotaabo may use different presentation media.
- Porschs may use a different description override.
- One store may publish the product while the other does not.

The API must resolve these differences using the relevant store listing rather than assuming that the source product contains all storefront information.

## 10. Inventory API boundaries

Inventory APIs must require store-specific authorisation.

A request to retrieve or modify stock must identify the authorised store context.

The backend must ensure that:

- Stock records belong to the correct store.
- Inventory adjustments affect only the intended store.
- Reservations are store-scoped.
- Stock movement records are attributable.
- Concurrent stock updates are handled safely.
- Invalid stock transitions are rejected.

Public storefront responses should expose only the stock or availability information explicitly approved for public display.

Detailed stock quantities and movement history must remain protected.

## 11. Authentication and authorisation

Authentication establishes the identity of the requesting actor.

Authorisation determines which operations that actor may perform.

These checks must remain separate.

The API must enforce permissions for:

- Catalogue search.
- Product submission.
- Catalogue admission.
- Source-product editing.
- Variant administration.
- Media administration.
- Listing creation.
- Listing updates.
- Pricing.
- Promotions.
- Publication.
- Inventory operations.
- Suspension.
- Retirement.
- Deletion.

A store administrator's authority must be limited to the operations granted by the permission model.

The API must not assume that access to a store automatically grants unrestricted access to the shared catalogue.

See the platform identity and access architecture and the role and permission specifications.

## 12. Validation and error handling

API requests must be validated on the server.

Validation must include:

- Required fields.
- Data types.
- Field lengths.
- Supported values.
- Related record existence.
- Store scope.
- Product eligibility.
- Permission checks.
- Lifecycle transitions.
- Pricing rules.
- Variant relationships.
- Media references.

Errors should use consistent response structures.

The API should distinguish between:

- Invalid input.
- Unauthenticated requests.
- Unauthorised requests.
- Missing resources.
- Conflicting state.
- Duplicate submissions.
- Rate limiting.
- Unexpected server errors.

Error responses must not expose secrets, internal credentials, database details, or sensitive implementation information.

## 13. Concurrency and data consistency

Catalogue and listing operations may be performed by multiple administrators.

The backend must protect against conflicting updates.

Requirements include:

- Transactional handling for related database changes.
- Appropriate concurrency controls.
- Validation of state before updates.
- Protection against duplicate submissions.
- Safe handling of repeated requests where idempotency is required.
- Consistent inventory updates.
- Clear conflict responses when a record has changed since it was retrieved.

Where a multi-step operation cannot be completed, the system must avoid leaving partially applied changes.

## 14. Caching and invalidation

Caching may improve catalogue and storefront performance, but cache boundaries must respect store-specific data.

The caching strategy must distinguish between:

- Shared source-product data.
- Store-specific listings.
- Store-specific prices.
- Store-specific publication status.
- Store-specific inventory.
- Public storefront responses.

A cache key for store-specific data must include the relevant store context.

A source-product update may require invalidation of dependent catalogue or storefront caches.

A listing or price update in one store must not invalidate or overwrite another store's commercial state unnecessarily.

Private administrative responses must not be cached as public storefront responses.

Cache duration and invalidation behaviour must be based on actual data freshness requirements.

## 15. API security

The API must apply appropriate security controls.

Requirements include:

- Authentication for protected operations.
- Server-side permission enforcement.
- Input validation.
- Parameterised database access.
- Rate limiting where appropriate.
- Protection against mass assignment.
- Protection against insecure direct object references.
- Secure handling of uploaded media.
- Restricted administrative endpoints.
- Safe error responses.
- Audit logging for material operations.
- Appropriate CORS configuration.
- Secure credential management.

The API must never rely on obscured endpoint URLs or frontend-only checks as security controls.

## 16. Storefront integration

Yotaabo and Porschs should consume the shared backend through documented API contracts.

Each storefront must resolve its own store context and request the corresponding listing data.

The integration must avoid:

- Duplicating source product records.
- Maintaining independent copies of shared catalogue data without an explicit synchronisation strategy.
- Hardcoding commercial information that belongs in the backend.
- Using one store's listing data to render the other store.
- Treating a product's existence as proof that it is published.
- Treating frontend route selection as an authorisation mechanism.

Store-specific configuration should be managed through the approved configuration architecture.

The `/porschs` route must resolve the Porschs storefront context consistently across product listing, product detail, category, cart, and checkout workflows where those workflows are supported.

## 17. API versioning and contract management

API contracts should be documented and reviewed when changed.

Changes that may affect clients include:

- Field removal.
- Field renaming.
- Type changes.
- Changed validation rules.
- Changed permissions.
- Changed response structure.
- Changed pagination behaviour.
- Changed lifecycle semantics.

Breaking changes should use an appropriate versioning or migration strategy.

Both storefronts must be tested against relevant API changes before deployment.

The API contract must describe which fields are:

- Required.
- Optional.
- Read-only.
- Store-specific.
- Source-product controlled.
- Public.
- Administrative.
- Deprecated.

## 18. Observability and operational monitoring

API operations should produce sufficient telemetry for diagnosis and performance analysis.

Monitoring should cover:

- Request volume.
- Response latency.
- Error rates.
- Database query performance.
- Slow catalogue searches.
- Failed listing operations.
- Permission failures.
- Product submission outcomes.
- Cache performance.
- Inventory update failures.
- Integration failures.

Logs must avoid exposing passwords, access tokens, private credentials, or unnecessary personal information.

Operational monitoring must make it possible to identify whether a failure affects:

- The shared catalogue.
- Yotaabo.
- Porschs.
- Store listings.
- Inventory.
- Public storefront delivery.

## 19. Future integrations

The API architecture should leave room for future integrations, subject to approved business and security requirements.

Potential integrations include:

- Additional storefronts.
- Supplier systems.
- Product import services.
- Inventory management systems.
- Order management.
- Shipping and fulfilment.
- Payment services.
- Reporting and analytics.
- External marketplace channels.

Each integration must have defined ownership, authentication, permissions, data contracts, failure handling, and audit requirements.

Future integrations must not bypass the catalogue's source-data and store-scope rules.

## 20. Performance requirements

The API must remain efficient as the catalogue and number of stores grow.

Requirements include:

- Database-level filtering.
- Bounded result sets.
- Pagination.
- Selective field retrieval.
- Appropriate indexes.
- Query-plan review.
- Avoidance of N+1 queries.
- Avoidance of unnecessary relationship loading.
- Appropriate caching.
- Efficient media delivery.
- Monitoring of slow endpoints.

Do not introduce a separate search engine, message broker, or additional infrastructure solely because it may be useful at a larger scale.

Additional infrastructure should be justified by measured requirements and operational cost.

See `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`.

## 21. Testing requirements

API and integration tests must cover:

- Catalogue search.
- Product submission.
- Duplicate detection.
- Catalogue admission.
- Source-product permission checks.
- Store listing creation.
- Store listing updates.
- Independent pricing.
- Independent publication.
- Storefront product retrieval.
- Store-specific inventory.
- Cross-store isolation.
- Invalid store identifiers.
- Unauthorised record access.
- Invalid lifecycle transitions.
- Concurrent updates.
- Cache invalidation.
- API error responses.

Tests must verify both positive and negative access cases.

A successful Yotaabo operation must not be treated as proof that Porschs isolation works, or vice versa.

## 22. Current and future integration distinction

| Capability | Current requirement | Future consideration |
|---|---|---|
| Shared backend | Required | Additional stores |
| Shared product catalogue | Required | Expanded catalogue governance |
| Yotaabo integration | Required | Additional channels |
| Porschs integration | Required | Separate domain if approved |
| Porschs `/porschs` route | Current storefront arrangement | Independent domain |
| Store-scoped listings | Required | More detailed listing policies |
| Independent pricing | Required | Central commercial rules |
| Independent publication | Required | Configurable review workflows |
| Independent inventory | Required | Controlled transfers or central inventory |
| Selected-store product eligibility | Not established as current functionality | Future capability |
| External catalogue integrations | Not established | Future capability |

## 23. Open decisions

The following matters require verification or approval:

1. Exact API endpoint names and request contracts.
2. Current authentication mechanism.
3. Authoritative source of store context.
4. Current store membership and permission enforcement.
5. Source-product administration permissions.
6. Catalogue admission workflow.
7. Duplicate detection implementation.
8. Store listing uniqueness rules.
9. SKU and variant API boundaries.
10. Public inventory and availability exposure.
11. Cache keys and invalidation rules.
12. API versioning policy.
13. Rate limits.
14. Idempotency requirements.
15. Audit event structure.
16. External integration authentication.
17. Monitoring and alerting requirements.

Do not invent endpoint names or claim an API operation exists without checking the actual application.

## 24. Related documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`
- `../API_ARCHITECTURE.md`
- `../STORE_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../SYSTEM_ARCHITECTURE.md`
- `../UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `../UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`

## 25. Document maintenance

Update this document when API contracts, integration boundaries, security rules, or store-scoping requirements change.

Before marking an API requirement as implemented:

1. Inspect the actual endpoint or service.
2. Verify the request and response contract.
3. Verify backend authentication and authorisation.
4. Verify database-level store scoping.
5. Verify cross-store isolation.
6. Verify error handling.
7. Verify relevant automated tests.
8. Record any difference between the intended architecture and the live implementation.

This document describes required API behaviour. It does not prove that any particular endpoint or integration is implemented.
