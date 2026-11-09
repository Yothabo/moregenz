# Product Catalogue Architecture

**Document status:** Architecture specification
**Version:** 1.0
**Scope:** Product catalogue architecture for the Yotaabo and Porschs stores, with provisions for the future multi-store platform
**Last reviewed:** 9 November 2026

---

## 1. Purpose

This document defines the architectural structure and responsibilities of the product catalogue.

The catalogue provides a shared source of product information that participating stores can use without requiring every store to create and maintain duplicate product records.

It separates central product information from the commercial and operational decisions each store makes when presenting and selling a product.

The architecture must support the current Yotaabo and Porschs arrangement while retaining a clear path towards the broader multi-store platform described in the platform documentation.

This document establishes the high-level architecture. Detailed specifications are maintained in the related documents listed at the end.

## 2. Architectural status and scope

The architecture contains two distinct scopes. They must not be treated as if they are already implemented together.

### 2.1 Current two-store scope

The initial arrangement covers Yotaabo and Porschs.

The confirmed operating requirements are:

1. Both stores use one shared product catalogue.
2. An authorised administrator of either store can add a valid product to the shared catalogue, subject to the applicable permissions and validation rules.
3. Once accepted into the shared catalogue, a product is available to both stores' product-listing workflows.
4. Adding a product to the shared catalogue does not automatically publish it on either storefront.
5. Each store independently controls its own product listings and commercial information.
6. Each store maintains its own inventory relationship.
7. A store's ability to list a shared product does not automatically grant unrestricted authority to edit or delete the underlying source product.

The shared catalogue avoids duplicate product uploads. It does not combine the stores' storefront operations.

### 2.2 Future platform scope

The broader platform may eventually support:

- Products owned by the platform.
- Products introduced and owned by individual stores.
- Products shared with selected stores.
- Products eligible for use across the platform.
- Store-specific product selection and assignment.
- More advanced ownership, modification, withdrawal and access rules.
- Additional stores operating through the same platform infrastructure.

These are future architectural capabilities, not confirmation that the complete model is currently implemented.

The future model must remain compatible with the current two-store arrangement where practical. Any change to the current operating rules must be recorded as an explicit decision.

## 3. Architectural objectives

The product catalogue must:

- Maintain a consistent source of product information.
- Avoid unnecessary duplication of product records.
- Support multiple stores using the same product data.
- Separate source product information from store-specific commercial data.
- Preserve independent storefront publication and presentation.
- Support independent store inventory.
- Enforce permissions at the backend.
- Maintain traceability for product creation and changes.
- Support predictable catalogue queries as the number of products and stores grows.
- Allow the platform to evolve without requiring an unnecessary rebuild of the existing storefronts.

## 4. Core architectural principles

### 4.1 Shared source, independent storefronts

A shared product record can be used by more than one store.

However, each store decides whether and how that product appears on its own storefront.

The catalogue is therefore a shared source of product information, not a shared storefront or a shared publication system.

### 4.2 Source data and store data are separate

Product information that describes the underlying product must be distinguished from information that describes how a particular store sells it.

Examples of source product information may include:

- Product name.
- Product description.
- Brand.
- Product category.
- Product attributes.
- Product variants.
- Product media and identifying information.

Examples of store-specific information may include:

- Store selling price.
- Store publication status.
- Store-specific description or presentation.
- Promotions and discounts.
- Store availability.
- Store inventory.
- Store-specific ordering and display preferences.

The exact field ownership and data model are specified in `PRODUCT_DATA_MODEL.md` and `PRODUCT_OWNERSHIP_AND_SHARING.md`.

### 4.3 Catalogue availability is not publication

A product being available in the shared catalogue means that a store can use it in its listing workflow.

It does not mean that the product is automatically visible to customers.

Publication must remain an explicit store-level decision.

### 4.4 Store independence

Each store must be able to manage its own commercial operation without unintentionally changing another store's configuration.

Changes to one store's price, promotion, publication status, presentation or inventory must not silently modify another store's corresponding information.

### 4.5 Backend-enforced authority

The frontend must not be treated as the security boundary.

The backend must validate the acting user's identity, permissions, store scope and requested operation before accepting catalogue or listing changes.

Hiding a button or restricting a page is not sufficient authorisation.

### 4.6 Traceability

Material product operations should be attributable to an actor and recorded where appropriate.

The architecture must support investigation of who created, modified, approved, published, retired or otherwise acted on product records.

The exact audit requirements belong in `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`.

### 4.7 Incremental evolution

The existing stores should remain operational while the platform develops.

New architecture must be introduced in controlled stages, with migration, verification and rollback considerations documented before material changes are deployed.

## 5. Conceptual architecture

The catalogue architecture separates four principal responsibilities.

### 5.1 Product catalogue

The product catalogue maintains the shared source product records.

It is responsible for product identity and the source information used by participating stores.

For the initial Yotaabo and Porschs arrangement, both stores use the same catalogue.

### 5.2 Store product listings

A store product listing represents a store's decision to offer a catalogue product through its own storefront.

The listing connects a source product to a particular store and contains that store's commercial and presentation information.

A source product can therefore be associated with multiple independent store listings.

The listing relationship must not be confused with ownership of the source product.

### 5.3 Store inventory

Inventory represents stock and stock-related operations within a particular store's operational boundary.

The shared catalogue does not imply shared stock.

A product may be available to both stores while each store maintains different stock quantities, availability and inventory movements.

### 5.4 Storefront presentation

Each storefront retrieves and presents the products that are eligible and published for that store.

The storefront must resolve the correct store context before retrieving store-specific listings and related information.

The storefront must not determine product eligibility or permissions solely through client-side filtering.

## 6. High-level relationship

The intended conceptual relationship is:

    Shared Product Catalogue
              |
      +-------+-------+
      |               |
    Source          Source
    Product         Product
      |               |
    +---------+   +---------+
    |         |   |         |
  Yotaabo  Porschs Other   ...
  Listing  Listing Store
    |         |
  Yotaabo  Porschs
   Data     Data
    |         |
  Yotaabo  Porschs
   Stock    Stock
    |         |
  Yotaabo  Porschs
 Storefront Storefront

This is a conceptual model, not a declaration of the current database schema.

The diagram illustrates the separation between source product information, store listings, inventory and storefront presentation.

The actual database relationships, constraints and ownership fields must be documented in the relevant data-model specification.

## 7. Product catalogue responsibilities

The catalogue is responsible for maintaining and making available valid source product records.

Its responsibilities include:

- Product identity.
- Product creation and validation.
- Source product attributes.
- Product categorisation.
- Product variants and identifiers.
- Product media references.
- Product lifecycle state.
- Catalogue search and retrieval.
- Source product audit information.
- Access control over source product operations.

The catalogue must not become the owner of every store-level commercial decision simply because it supplies the source product information.

## 8. Store listing responsibilities

A store listing is responsible for the store's commercial use of a catalogue product.

Its responsibilities include:

- Selecting a catalogue product for the store.
- Enabling or disabling the store's listing.
- Controlling publication on that store's storefront.
- Setting the store's selling price.
- Managing promotions.
- Managing store-specific product presentation.
- Controlling store-level availability.
- Connecting the listing to the store's inventory operations.
- Maintaining store-specific ordering and display preferences.

A listing operation must not implicitly change another store's listing.

Likewise, the ability to create, update or remove a listing must not be interpreted as unrestricted authority over the underlying source product.

## 9. Inventory boundary

Inventory must remain independently scoped to the relevant store.

For example, a product listed by both Yotaabo and Porschs may have:

- Different stock quantities.
- Different stock movements.
- Different availability.
- Different replenishment activity.
- Different inventory histories.

A stock change made within one store must not silently change the other store's inventory.

The treatment of platform-funded stock, shared purchasing and related financial ownership remains subject to the broader inventory and business-model decisions.

See `../INVENTORY_ARCHITECTURE.md` for the detailed inventory specification.

## 10. Storefront integration

The catalogue must support independent storefront experiences.

### 10.1 Yotaabo

Yotaabo remains an existing storefront and must retain its independent store configuration and presentation.

### 10.2 Porschs

Porschs is intended to operate under the `/porschs` path on the existing domain.

The route must resolve the Porschs store context so that the application retrieves Porschs-specific listings, commercial information and presentation settings.

This arrangement does not establish a separate catalogue, backend or platform for Porschs.

A separate domain may be considered in the future, but it is not required by the current arrangement.

### 10.3 Store-specific category presentation

Category ordering is a storefront-level presentation concern.

Yotaabo must retain its existing category ordering.

Porschs may use a different order, including displaying Hers before His.

Changing the category order for one store must not alter the other store's ordering.

The underlying category identity and source catalogue data should remain consistent where the categories are shared.

## 11. Catalogue access and permissions

Catalogue operations must respect the distinction between:

- Access to view catalogue products.
- Authority to add a source product.
- Authority to modify source product information.
- Authority to delete or retire a source product.
- Authority to create a store listing.
- Authority to change store commercial information.
- Authority to publish or unpublish a store listing.
- Authority to manage store inventory.

These are separate capabilities and must not be treated as interchangeable.

The current two-store requirement allows authorised administrators from either store to add valid products to the shared catalogue.

It does not, by itself, settle every source product editing, deletion or ownership permission.

Those permissions must be verified against the implemented backend and the approved permission model before being documented as implemented.

See:

- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `../UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `../UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`

## 12. Data integrity requirements

The catalogue architecture must protect the relationship between source products and store listings.

The implementation should account for:

- Stable product identifiers.
- Valid store identifiers.
- Valid catalogue-to-listing relationships.
- Appropriate uniqueness constraints.
- Referential integrity.
- Valid product and listing lifecycle states.
- Consistent variant relationships.
- Valid media references.
- Store-scoped commercial records.
- Store-scoped inventory records.
- Protection against unauthorised cross-store modification.

Database constraints should enforce integrity wherever practical.

Application-level validation must complement database constraints, not replace them.

The detailed entities, relationships and constraints belong in `PRODUCT_DATA_MODEL.md`.

## 13. API and query boundaries

The backend must provide controlled access to catalogue and store listing data.

Queries should apply relevant store scope, search criteria, filtering and pagination at the database query level.

The implementation must avoid retrieving unrestricted collections and filtering them in application memory.

API design must account for:

- Authentication and authorisation.
- Store context.
- Validated search and filter criteria.
- Bounded result limits.
- Pagination.
- Selective field retrieval.
- Appropriate relationship loading.
- Error handling.
- Audit requirements.
- Consistent response structures.

The API must not expose source product modification operations merely because a user can access a store listing.

Detailed endpoint and integration requirements belong in `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`.

## 14. Performance and reliability

The catalogue must remain practical as product volume, variants, media and participating stores increase.

The implementation should consider:

- Indexes for common search, filter, sort and store-scope patterns.
- Query-plan review using representative data.
- Bounded queries and pagination.
- Avoidance of unnecessary relationship loading.
- Avoidance of N+1 query patterns.
- Selective retrieval of product fields.
- Appropriate media loading strategies.
- Caching where data consistency requirements permit it.
- Reliable handling of catalogue and listing updates.

A specialised search service should only be introduced when measured requirements justify its operational and architectural cost.

Performance requirements and validation methods are defined in `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`.

## 15. Security and audit boundaries

The architecture must protect both shared catalogue data and independent store data.

Security controls must address:

- Authenticated actors.
- Role and permission checks.
- Store-level access boundaries.
- Source product authority.
- Listing-level authority.
- Inventory authority.
- Administrative operations.
- Audit history.
- Sensitive configuration and credentials.
- Prevention of unauthorised cross-store access.

The backend must be authoritative for these controls.

Detailed security and governance requirements belong in `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`.

## 16. Future multi-store extension

The initial two-store catalogue is the starting point for a broader platform architecture.

The future platform may introduce more explicit product eligibility and ownership models.

Potential models include:

1. Platform-owned products available to participating stores.
2. Store-owned products available only to their originating store.
3. Store-owned products shared with selected stores.
4. Products made available across the platform.
5. Products assigned to stores through a central catalogue workflow.

The future model may also require additional controls for:

- Product ownership verification.
- Sharing approval.
- Store eligibility.
- Product withdrawal.
- Source product modification.
- Store-specific overrides.
- Product assignment.
- Platform administration.
- Ownership transfer.
- Commercial and financial responsibility.

These capabilities require further specification and approval.

They must not be assumed to exist merely because the current two-store catalogue is shared.

The broader multi-store target architecture is retained in:

`../MULTI_STORE_PRODUCT_CATALOGUE_AND_INVENTORY_ISOLATION_ARCHITECTURE.md`

The future store-owner workflow is retained in:

`../../operations/STORE_OWNER_PRODUCT_IMPORT_AND_CATALOGUE_ASSIGNMENT_WORKFLOW.md`

## 17. Migration and implementation considerations

Changes to the catalogue architecture must account for existing products, listings, store data and operational behaviour.

Migration work must identify:

- Existing source product records.
- Existing store-specific product information.
- Existing publication states.
- Existing prices and promotions.
- Existing inventory relationships.
- Product variants and media.
- Duplicate or inconsistent records.
- Existing API consumers.
- Storefront dependencies.
- Permission and ownership implications.

Migration must not silently merge independent store information or discard existing commercial data.

Where the existing implementation differs from the target architecture, the difference must be recorded as an implementation gap.

The migration document must define the required validation, testing, deployment and rollback procedures.

See `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`.

## 18. Architectural decisions and unresolved matters

The following distinctions must be maintained during implementation and documentation review.

| Area | Current position |
|---|---|
| Initial catalogue | Shared between Yotaabo and Porschs |
| Product availability | Accepted shared products are available to both listing workflows |
| Product publication | Independently controlled by each store |
| Store pricing | Independently controlled by each store |
| Promotions | Independently controlled by each store |
| Store presentation | Independently controlled by each store |
| Inventory | Independently maintained by each store |
| Source product ownership | Must be distinguished from store listing access |
| Source product editing and deletion | Must be verified against approved permissions and backend implementation |
| Porschs route | `/porschs` on the existing domain |
| Category ordering | Independently configurable per store |
| Broader platform ownership models | Future architecture |
| Selected-store sharing | Future capability unless separately verified |
| Central catalogue assignment workflow | Future platform workflow |

The following matters must remain open until supported by an explicit decision or verified implementation:

- Whether source product editing authority belongs to the creator, a central platform administrator, or another authorised role.
- Who may delete, retire or withdraw a source product.
- Whether source product ownership can be transferred.
- Whether a store may override selected source product fields.
- How product-sharing withdrawal affects existing store listings.
- Whether platform-owned products have different approval requirements.
- How platform-funded inventory is represented financially.
- Whether future stores can operate with private catalogues as well as shared products.

Open matters must be tracked in the platform decision records rather than resolved by assumptions in this document.

## 19. Related documentation

### Product catalogue documentation

- `README.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`

### Existing architecture documentation

- `../SYSTEM_ARCHITECTURE.md`
- `../STORE_ARCHITECTURE.md`
- `../MULTI_STORE_PRODUCT_CATALOGUE_AND_INVENTORY_ISOLATION_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../API_ARCHITECTURE.md`

### Platform, governance and operations

- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`
- `../../operations/STORE_OWNER_PRODUCT_IMPORT_AND_CATALOGUE_ASSIGNMENT_WORKFLOW.md`

## 20. Document maintenance

This document describes the approved high-level architecture and distinguishes it from future proposals.

When the implementation or an approved platform decision changes:

1. Verify the change against the relevant source code, database schema, API and permission configuration.
2. Identify which architectural requirements are affected.
3. Update the relevant detailed specification.
4. Update this document if the high-level architecture changes.
5. Record material decisions in the appropriate decision register.
6. Preserve superseded proposals and historical decisions with clear status labels.
7. Ensure the documentation does not describe planned functionality as implemented.

This document must remain consistent with the detailed catalogue specifications and the platform decision records.
