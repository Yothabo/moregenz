# Product Data Model

**Document status:** Architecture specification
**Scope:** Current Yotaabo and Porschs stores, with provisions for future multi-store expansion
**Implementation status:** Conceptual model. This document does not confirm that the proposed entities, fields, constraints, or relationships exist in the live database.

## 1. Purpose

This document defines the conceptual data model for the shared product catalogue and the store-specific records that depend on it.

It establishes the distinction between:

- A product as a catalogue record.
- The ownership and origin of that product.
- The stores permitted to use that product.
- A store's individual listing of the product.
- The inventory maintained by each store.
- Product variants, SKUs, categories, attributes, and media.

The model must support the current Yotaabo and Porschs arrangement without preventing a broader multi-store platform in the future.

For the overall architecture and domain boundaries, see `PRODUCT_CATALOGUE_ARCHITECTURE.md`.

## 2. Data modelling principles

The data model must follow these principles:

1. Shared product identity must not be confused with store-specific commercial information.
2. A product's availability to a store must not automatically publish it on that store's storefront.
3. Each store must maintain its own listing, pricing, promotions, presentation, and inventory relationship.
4. A store must not gain unrestricted source-product editing or deletion authority merely because it can list that product.
5. Product variants and SKUs must have an unambiguous relationship to their parent product.
6. Store-specific records must have explicit store scope.
7. Ownership, origin, eligibility, and permission must be represented separately where the business rules require it.
8. Relationships and constraints must be enforced by the backend and database, not only by the frontend.
9. The model must support audit history and traceability.
10. Proposed future capabilities must remain distinguishable from the current two-store requirements.

## 3. Conceptual entity overview

The following entities describe the intended domain model. They are conceptual names, not confirmed database table names.

### 3.1 Store

Represents an independently operated storefront within the platform.

Potential information:

- Store identifier.
- Store name.
- Store status.
- Store configuration.
- Storefront route or domain configuration.
- Store-specific presentation settings.
- Store category display preferences.

Yotaabo and Porschs are the initial participating stores.

A store has its own commercial and operational context even when it uses shared catalogue records.

### 3.2 Source Product

Represents the shared identity and descriptive information for a product in the catalogue.

Potential information:

- Product identifier.
- Product name.
- Brand.
- Description.
- Product type.
- General product attributes.
- Product status.
- Origin or creation reference.
- Ownership reference, if the ownership model is established.
- Creation timestamp.
- Last modification timestamp.

The source product is distinct from the way an individual store presents and sells that product.

The precise source-product ownership and editing authority remain subject to the decisions documented in `PRODUCT_OWNERSHIP_AND_SHARING.md`.

### 3.3 Store Product Listing

Represents a store's use of a source product in its own storefront.

A source product can have a separate listing for each participating store.

Potential information:

- Listing identifier.
- Store identifier.
- Source product identifier.
- Store-specific title override, if permitted.
- Store-specific description override, if permitted.
- Store-specific price.
- Promotional price or promotion reference.
- Listing status.
- Publication status.
- Store-specific display configuration.
- Store-specific availability information.
- Listing creation timestamp.
- Last modification timestamp.

A listing belongs to one store and references one source product.

A shared source product does not require both stores to publish a listing.

### 3.4 Store Inventory

Represents the stock position and inventory movements maintained by an individual store.

Potential information:

- Inventory record identifier.
- Store identifier.
- Product or variant identifier.
- Quantity on hand.
- Reserved quantity.
- Available quantity.
- Reorder threshold.
- Stock status.
- Inventory location, if supported.
- Last stock update.
- Stock movement history.

Inventory must remain store-specific.

A shared catalogue product does not imply shared stock, pooled inventory, or automatic stock synchronisation between stores.

For the detailed inventory requirements, see `../INVENTORY_ARCHITECTURE.md`.

### 3.5 Product Variant

Represents a distinct purchasable or selectable variation of a source product.

Examples may include:

- Different bottle sizes.
- Different volumes.
- Different colours.
- Different product configurations.
- Other meaningful product variations.

Potential information:

- Variant identifier.
- Parent source product identifier.
- Variant name.
- Variant attributes.
- Variant status.
- Variant creation timestamp.

A product may have no variants or multiple variants.

The model must not create unnecessary variants where the product does not require them.

### 3.6 SKU

Represents a stock-keeping unit used to identify a specific product or variant for inventory and fulfilment purposes.

Potential information:

- SKU identifier.
- SKU code.
- Source product identifier.
- Variant identifier, where applicable.
- Barcode, where applicable.
- SKU status.

SKU ownership, uniqueness scope, and whether each store may use its own SKU for the same source product require confirmation before implementation.

A shared source product must not create ambiguity when two stores maintain separate inventory.

### 3.7 Product Category

Represents the classification of a product.

Potential information:

- Category identifier.
- Category name.
- Category description.
- Parent category identifier, where hierarchical categories are supported.
- Category status.
- Category display metadata.

The model must distinguish the underlying product classification from the order in which categories appear on a storefront.

Yotaabo and Porschs may present categories in different orders without changing the underlying product classification.

For example, Porschs may display Hers before His while Yotaabo retains its existing category order.

### 3.8 Product Attribute

Represents a descriptive property associated with a product or variant.

Examples include:

- Fragrance family.
- Volume.
- Concentration.
- Colour.
- Material.
- Intended use.
- Other product-specific characteristics.

Potential information:

- Attribute identifier.
- Attribute name.
- Attribute data type.
- Validation rules.
- Applicable product type.
- Whether the attribute applies to the source product or a variant.

Attributes should be structured where filtering, validation, comparison, or reporting depends on them.

The model should avoid placing every product characteristic into a single unstructured description field.

### 3.9 Product Media

Represents images and other approved media associated with a product.

Potential information:

- Media identifier.
- Source product identifier.
- Variant identifier, where applicable.
- Storage reference.
- Media type.
- Alternative text.
- Display order.
- Media status.
- Creation timestamp.

The model must distinguish shared source-product media from any store-specific presentation media.

The storage provider and exact media ownership rules remain implementation and platform decisions.

### 3.10 Product Availability or Eligibility

Represents whether a source product is permitted to be used by a particular store.

This is especially important for the future multi-store model.

Potential information:

- Eligibility identifier.
- Source product identifier.
- Store identifier, where applicable.
- Availability scope.
- Eligibility status.
- Effective date.
- Expiry date, where applicable.
- Approval reference.
- Audit information.

Possible future availability scopes include:

- Private to an originating store.
- Shared with selected stores.
- Available across the platform.

These are future model capabilities. They must not be interpreted as proof that the current system supports all three scopes.

For the initial Yotaabo and Porschs arrangement, an accepted source product in the shared catalogue is available to both stores' listing workflows.

That rule does not automatically publish the product in either store.

## 4. Conceptual relationships

The intended relationships are:

- A Store may have many Store Product Listings.
- A Store Product Listing references one Source Product.
- A Source Product may have many Store Product Listings.
- A Source Product may have many Product Variants.
- A Product Variant belongs to one Source Product.
- A Source Product may have one or more Product Categories, depending on the final classification model.
- A Product Category may classify many Source Products.
- A Source Product may have many Product Attributes.
- A Product Variant may have variant-specific attributes.
- A Source Product may have many Product Media records.
- A Store maintains its own inventory records.
- Store Inventory references the relevant product or variant and identifies the store responsible for that stock.
- Product Availability or Eligibility controls which stores may use a source product in the future expanded platform model.

Conceptual relationship outline:

    Store
      |
      | one-to-many
      |
    Store Product Listing
      |
      | many-to-one
      |
    Source Product
      |
      |---- Product Variants
      |
      |---- Product Categories
      |
      |---- Product Attributes
      |
      |---- Product Media
      |
      |---- Product Availability / Eligibility

    Store
      |
      | one-to-many
      |
    Store Inventory
      |
      | references
      |
    Source Product or Product Variant

This outline is conceptual. It does not prescribe physical database foreign keys or table names.

## 5. Current Yotaabo and Porschs data requirements

The initial implementation must support the following behaviour.

### 5.1 Shared catalogue identity

Yotaabo and Porschs use one shared product catalogue.

An authorised administrator of either store may add a valid product to the shared catalogue, subject to the applicable backend permissions and validation rules.

Once accepted into the shared catalogue, the product is available to both stores' listing workflows without requiring a duplicate product upload.

### 5.2 Independent listings

Each store controls its own listing.

For the same source product:

- Yotaabo may create and publish its listing.
- Porschs may create and publish its listing independently.
- One store may leave the product unpublished.
- One store may change its price without changing the other store's price.
- One store may run a promotion without changing the other store's promotion.
- One store may change its presentation without changing the other store's presentation.

The model must not treat shared catalogue availability as a shared publication record.

### 5.3 Independent inventory

Each store maintains its own inventory relationship.

For example:

- Yotaabo may hold 10 units.
- Porschs may hold 4 units.
- A stock adjustment in Yotaabo must not automatically change Porschs' quantity.
- A stock adjustment in Porschs must not automatically change Yotaabo's quantity.

Any future stock transfer or central inventory arrangement requires an explicit business process and separate authority.

### 5.4 Category presentation

The underlying category identity must remain separate from store-specific display ordering.

Each store must be able to configure its own category presentation without changing another store's ordering.

## 6. Field ownership and responsibility

The following matrix describes conceptual responsibility. It does not settle every source-data editing permission.

| Data area | Conceptual responsibility |
|---|---|
| Source product identity | Shared catalogue |
| Source product descriptive data | Source product authority, subject to confirmed permissions |
| Product origin and ownership | Explicit ownership and origin rules |
| Store listing | Individual store |
| Store price | Individual store |
| Store promotions | Individual store |
| Store publication status | Individual store |
| Store presentation | Individual store |
| Store category ordering | Individual store |
| Store inventory | Individual store |
| Product variant identity | Catalogue model, subject to SKU rules |
| Store-specific stock quantities | Individual store |
| Product eligibility | Platform or authorised catalogue governance, subject to the future model |
| Audit history | Platform-level record of relevant actions |

A store's ability to create or manage a listing must not be interpreted as unrestricted permission to modify or delete the source product.

The exact source-product editing, deletion, and ownership authority remains unresolved until verified against the permission model and implemented backend controls.

## 7. Identity, uniqueness, and integrity requirements

The physical database design must define and enforce appropriate constraints.

At minimum, the model should address the following.

### 7.1 Product identity

- Every source product must have a stable identifier.
- Duplicate source products should be detected and prevented where the matching rules allow reliable identification.
- Product names alone should not be treated as globally unique identifiers.
- Product identity must remain stable when a store changes its own listing presentation.

### 7.2 Store listing identity

- Every listing must reference a valid store.
- Every listing must reference a valid source product.
- A store should not accidentally create duplicate active listings for the same source product unless the business explicitly supports multiple listings.
- Store-specific listing records must not be confused with source product records.

### 7.3 Variant and SKU integrity

- Every variant must reference a valid source product.
- A variant must not be associated with an unrelated source product.
- SKU uniqueness scope must be explicitly defined.
- Inventory must reference a valid product or variant.
- Variant deletion or retirement must not silently invalidate historical transactions or inventory records.

### 7.4 Inventory integrity

- Every inventory record must identify the responsible store.
- Stock quantities must not be shared implicitly between stores.
- Inventory movements should be traceable.
- Reserved, available, and on-hand quantities must follow one documented calculation model.
- Negative stock behaviour must be explicitly defined and consistently enforced.

### 7.5 Referential integrity

- Relationships must be enforced by database constraints where appropriate.
- Deletion behaviour must be explicit.
- Historical records must not be destroyed through uncontrolled cascading deletion.
- Retired products and variants should remain traceable where historical transactions depend on them.

## 8. Lifecycle states

The model must distinguish source-product lifecycle from store-listing lifecycle.

### 8.1 Source product lifecycle

Potential states include:

- Draft: product information is being prepared.
- Pending review: product is awaiting required validation or approval.
- Active: product is accepted into the catalogue.
- Suspended: product is temporarily restricted.
- Retired: product is no longer available for new catalogue use.

These states are proposed conceptual states. The actual lifecycle and transitions must be confirmed against the existing application.

### 8.2 Store listing lifecycle

Potential states include:

- Not listed: the store has not created a listing.
- Draft: a listing is being prepared.
- Pending review: the listing requires review.
- Published: the listing is visible on the store's storefront.
- Unpublished: the listing is not publicly visible.
- Archived: the listing is retained for historical or administrative purposes.

The store listing lifecycle must be independent of the source-product lifecycle.

A source product being active does not mean every store listing is published.

A store unpublishing a listing must not automatically retire the source product or unpublish another store's listing.

## 9. Ownership and provenance fields

The future model may require explicit fields or related records for:

- Product creator.
- Product origin.
- Current source-product owner.
- Catalogue admission authority.
- Source modification authority.
- Source deletion authority.
- Sharing or eligibility scope.
- Approval history.
- Ownership transfer history, if permitted.

These concepts must not be collapsed into one generic `created_by` or `store_id` field.

Creating a product, owning a product, administering a store, and being authorised to edit a source product are different concepts.

The exact representation and enforcement rules remain open until the ownership and sharing policy is approved.

See `PRODUCT_OWNERSHIP_AND_SHARING.md` and the platform role and permission specifications.

## 10. Store-specific overrides

The model may need to support store-specific overrides for selected descriptive and presentation fields.

Examples include:

- Store listing title.
- Store listing description.
- Store-specific product images.
- Display order.
- Promotional labels.
- Store-specific merchandising information.

An override must not silently overwrite the shared source product.

The system must define which fields may be overridden, which remain controlled by the source product authority, and how changes to source data affect existing store listings.

This policy is not fully settled by this document.

## 11. Audit and traceability

Relevant changes must be attributable to an actor and an authorised action.

The audit model should support recording:

- Source product creation.
- Source product modification.
- Product admission or rejection.
- Ownership or origin changes, where supported.
- Store listing creation.
- Listing publication and unpublication.
- Store-specific pricing changes.
- Promotion changes.
- Inventory adjustments.
- Product retirement or suspension.
- Permission and eligibility changes.

Audit records should capture the actor, action, affected entity, timestamp, and relevant change context.

Audit history must not be treated as a replacement for the current authorised state of a record.

## 12. Data protection and access boundaries

The backend must enforce access at the entity and operation level.

Requirements include:

- Store administrators may access only the store-scoped records permitted by their role.
- Listing access must not grant unrestricted source-product modification.
- Store-specific pricing and inventory must remain isolated.
- Product eligibility must be checked before a store can create or publish a listing.
- Sensitive administrative and ownership operations must require explicit permissions.
- Frontend visibility must not be treated as an authorisation mechanism.

The precise permission matrix is maintained separately.

See:

- `../IDENTITY_AND_ACCESS_ARCHITECTURE.md`, if present.
- `../UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`.
- `../UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`.

If a referenced document has a different filename in the repository, update the link rather than creating a duplicate document.

## 13. Reporting and query requirements

The model must support efficient queries for:

- Source product lookup.
- Store-specific catalogue browsing.
- Store listing status.
- Store-specific pricing.
- Product variant selection.
- Store-specific inventory.
- Product eligibility.
- Product lifecycle status.
- Audit history.

Queries must apply store scope and other validated filters at the backend/database level.

Avoid retrieving an unrestricted catalogue and filtering it in application memory.

Use pagination, selective field retrieval, appropriate indexes, and bounded query limits.

Detailed requirements are documented in `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md` and `../API_ARCHITECTURE.md`.

## 14. Future model extensions

The conceptual model should leave room for future capabilities without treating them as current functionality.

Potential extensions include:

- Platform-owned products.
- Store-owned products.
- Products shared with selected stores.
- Products available across the entire platform.
- Central catalogue admission and governance.
- Product ownership transfers.
- Store-specific product variants or SKU mappings.
- Multiple inventory locations per store.
- Central inventory or controlled stock transfers.
- Product bundles and kits.
- Supplier and manufacturer relationships.
- Product import and assignment workflows.
- Advanced product attribute schemas.
- Multi-currency and regional commercial data.

Each extension requires its own business rules, authority model, validation, and implementation decision.

## 15. Decisions still required

The following matters must not be treated as settled solely by this conceptual model:

1. Exact source-product ownership representation.
2. Who may edit source product fields.
3. Who may permanently delete a source product.
4. Whether source-product deletion is permitted after listings or transactions exist.
5. Product admission and approval authority.
6. Product eligibility rules beyond the initial shared two-store catalogue.
7. SKU uniqueness scope across stores.
8. Whether stores may define their own SKU mappings.
9. Which source fields may be overridden by a store.
10. How source-product changes affect existing store listings.
11. Whether product categories are globally managed or may be extended by stores.
12. Whether product variants are shared or may be store-specific.
13. Media ownership, storage, and replacement permissions.
14. Inventory location and stock movement requirements.
15. The exact lifecycle states and permitted transitions.

Record decisions in `../../governance/DECISION_REGISTER.md` and `../../decisions/PLATFORM_DECISIONS.md`, using the repository's established decision format.

## 16. Related documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../STORE_ARCHITECTURE.md`
- `../API_ARCHITECTURE.md`
- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`

## 17. Document maintenance

Update this document when an approved decision changes the conceptual product model, entity relationships, data ownership boundaries, or integrity requirements.

When implementation diverges from the conceptual model:

1. Record the actual implementation.
2. Identify the architectural difference.
3. Determine whether the difference is intentional.
4. Record the decision and its rationale.
5. Update the relevant implementation and architecture documentation.

Do not mark a proposed entity, field, relationship, or constraint as implemented without verifying it against the application and database.
