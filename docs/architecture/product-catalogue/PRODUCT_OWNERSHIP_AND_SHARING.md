# Product Ownership and Sharing

**Document status:** Architecture specification
**Version:** 1.0
**Scope:** Source product ownership, shared catalogue access and store-level product usage
**Last reviewed:** 9 November 2026

---

## 1. Purpose

This document defines how product ownership, catalogue availability and store-level product usage must be distinguished.

The product catalogue is shared between Yotaabo and Porschs. Both stores must be able to use valid products added to that catalogue without creating duplicate source product records.

However, shared catalogue access does not mean that every store owns every product or has unrestricted authority to modify or delete source product information.

The architecture must protect source product integrity while allowing each store to manage its own commercial operations independently.

This document also preserves the broader ownership and sharing models proposed for the future multi-store platform. Those proposals must not be confused with the current two-store operating arrangement.

## 2. Core concepts

The following concepts must remain separate throughout the application, database, APIs and administrative workflows.

### 2.1 Source product

A source product is the underlying product record maintained in the shared catalogue.

It contains the product information used by participating stores.

Examples include:

- Product name.
- Brand.
- Product description.
- Category.
- Product attributes.
- Variants and identifiers.
- Product media.
- Product classification.

A source product is not the same thing as a store's commercial listing.

### 2.2 Product ownership

Product ownership identifies the party or authority responsible for the underlying source product.

Ownership may determine who can approve source changes, control product information, authorise sharing or request withdrawal.

Ownership must not be inferred solely from the store that first displays a product.

The exact ownership and modification authority must be supported by explicit permissions and documented decisions.

### 2.3 Catalogue availability

Catalogue availability determines whether a store can discover and use a source product in its listing workflow.

Availability is not publication.

A product can be available to a store without appearing on that store's public storefront.

### 2.4 Store product listing

A store product listing represents a store's decision to offer a source product through its own storefront.

It connects the source product to a specific store and contains the relevant store-level commercial and presentation information.

Each store must control its own listing independently.

### 2.5 Store inventory

Store inventory represents stock and stock-related records maintained within a store's operational boundary.

A shared source product does not create shared inventory.

Each store must retain control of its own stock records and inventory operations.

## 3. Current Yotaabo and Porschs ownership and sharing model

The initial two-store arrangement uses one shared product catalogue.

The confirmed requirements are:

1. Yotaabo and Porschs use the same source product catalogue.
2. An authorised administrator of either store can add a valid product to the shared catalogue, subject to applicable validation and permissions.
3. Once accepted into the catalogue, the product is available to both stores' listing workflows.
4. A second store does not need to upload a duplicate source product merely to use it.
5. Catalogue availability does not automatically create or publish a listing.
6. Each store independently decides whether to list the product.
7. Each store independently manages its selling price, promotions, publication status, presentation and availability.
8. Each store maintains its own inventory relationship.
9. Access to a source product does not automatically grant unrestricted source editing or deletion authority.

The shared catalogue is intended to simplify product administration while preserving independent storefront operations.

## 4. Product creation and catalogue admission

An authorised administrator may submit a product for inclusion in the shared catalogue.

The catalogue admission process should validate the product before it becomes available to both stores.

Validation should consider:

- Required product information.
- Product identity.
- Duplicate detection.
- Valid category references.
- Valid attributes and variant information.
- Media references.
- Data format and field constraints.
- Applicable administrative permissions.

A product should not become available merely because a frontend form has been submitted.

The backend must validate and persist the record before confirming successful catalogue admission.

### 4.1 Duplicate prevention

The shared catalogue should avoid unnecessary duplicate source products.

Duplicate detection may use relevant product identifiers and identifying information, including:

- SKU or other product identifiers where applicable.
- Brand.
- Product name.
- Variant identifiers.
- Other approved identity attributes.

The exact matching strategy must account for products that legitimately share a name or brand but differ in size, variant, formulation or other meaningful characteristics.

Duplicate detection must not automatically merge records without an appropriate validation process.

### 4.2 Catalogue availability after admission

Once a product is accepted into the initial shared catalogue, it becomes available to both Yotaabo and Porschs listing workflows.

This does not mean:

- Both stores must list it.
- Both stores must publish it.
- Both stores must use the same price.
- Both stores must use the same promotion.
- Both stores must maintain the same stock.
- Both stores must display identical product content.

These decisions remain store-specific.

## 5. Source product authority

Source product authority must be distinguished from the ability to use a product in a store listing.

The following operations represent different permissions:

| Operation | Meaning |
|---|---|
| View source product | Read catalogue product information |
| Add source product | Create a new catalogue record |
| Modify source product | Change underlying product information |
| Delete source product | Permanently remove a source record |
| Retire source product | Make a source record inactive or unavailable |
| List product | Associate a source product with a store |
| Modify listing | Change store-specific listing information |
| Publish listing | Make the store listing publicly visible |
| Manage inventory | Perform store-specific stock operations |

Permission to perform one operation must not automatically imply permission to perform another.

### 5.1 Creator and ownership distinction

The identity of the person who creates a product should be recorded where supported.

However, the creator of a product and its legal or operational owner are not necessarily the same.

The system must not automatically treat the first administrator who submits a product as its permanent owner unless that rule is explicitly approved.

### 5.2 Source editing authority

The precise authority to modify source product records remains subject to the approved permission model and backend implementation.

Potential models include:

- The original creator can modify the source product.
- A designated catalogue administrator controls source changes.
- A platform administrator controls source changes.
- A combination of creator, catalogue administrator and platform-level authority.

These are alternatives requiring an explicit decision.

This document does not select one of these models as implemented.

### 5.3 Source deletion and retirement authority

Source product deletion and retirement are separate from removing a product from a store's listing.

A store administrator must not be assumed to have source deletion authority simply because the store can list the product.

The final rules for deletion, retirement, withdrawal and recovery must be documented in the permission model and lifecycle specification.

Permanent deletion should account for existing store listings, inventory history, transactions and audit requirements.

Where historical references must be retained, retirement or archival may be more appropriate than permanent deletion.

## 6. Independent store listing authority

Each store controls its own use of a shared product.

For example, if a product is available in the shared catalogue:

- Yotaabo may create a listing and publish it.
- Porschs may leave the product unlisted.
- Porschs may create its own listing later.
- Yotaabo may change its price without changing Porschs' price.
- Porschs may run a promotion without changing Yotaabo's promotion.
- Either store may unpublish its listing without automatically unpublishing the other store's listing.

A store-level listing operation must be scoped to the relevant store.

The backend must reject attempts to modify another store's listing unless the acting user has an explicitly authorised cross-store capability.

## 7. Store-specific commercial information

The following information belongs to the individual store listing or its related store-specific records:

- Selling price.
- Promotional price.
- Discount rules.
- Publication status.
- Store-specific availability.
- Store-specific description or presentation.
- Display ordering.
- Store-specific merchandising information.
- Store-specific inventory relationships.

These values must not be unintentionally shared between stores.

### 7.1 Pricing independence

A shared source product may have different selling prices in Yotaabo and Porschs.

Changing the price in one store must not change the price in the other.

The system must preserve the distinction between source product identity and store-level commercial pricing.

### 7.2 Publication independence

A product can be published by one store and unpublished by another.

Publication state must be maintained at the store listing level.

Changing the publication state of one listing must not automatically change another store's listing.

### 7.3 Presentation independence

Each store may maintain its own product presentation where the architecture permits it.

This includes store-specific descriptions, display preferences and merchandising information.

Store-level presentation changes must not silently overwrite shared source product information.

The exact fields that may be overridden require a documented data ownership decision.

## 8. Inventory independence

The shared catalogue does not combine store inventory.

A product listed by both stores may have separate:

- Stock quantities.
- Stock locations.
- Stock movements.
- Replenishment records.
- Availability states.
- Inventory adjustments.
- Stock histories.

Inventory operations must be scoped to the relevant store.

A store must not be able to alter another store's stock records through ordinary listing administration.

Platform-funded stock, shared procurement and financial treatment remain separate business and inventory decisions.

See `../INVENTORY_ARCHITECTURE.md`.

## 9. Product sharing models for the future platform

The broader platform may eventually support more flexible ownership and sharing arrangements.

The following models are retained as future architectural options.

### 9.1 Platform-owned products

The platform may maintain products that are available to participating stores.

Potential characteristics include:

- Central source product administration.
- Platform-controlled product identity.
- Availability to eligible stores.
- Store-specific listings and commercial information.
- Central governance of source product changes.

The exact approval and authority model remains to be decided.

### 9.2 Store-owned products

A store may introduce a product for its own business.

Potential characteristics include:

- The originating store is recorded.
- The product may initially be restricted to that store.
- The store may request sharing with other stores.
- Source editing authority follows an approved ownership policy.
- Store listings remain independently controlled.

This model is described in the broader platform business model and must not replace the current initial shared-catalogue rule without an explicit decision.

### 9.3 Selected-store sharing

A source product may eventually be made available to selected stores.

Potential characteristics include:

- Explicit store eligibility.
- Approval or authorisation for sharing.
- A record of the originating party.
- Independent receiving-store listings.
- Defined rules for sharing changes and withdrawal.

This is a future capability unless verified in the implementation.

### 9.4 Platform-wide availability

The platform may eventually support products that are available to all eligible stores.

Platform-wide availability must remain distinct from automatic publication.

Each store must still decide whether to create and publish its own listing.

### 9.5 Central catalogue assignment

A future central catalogue workflow may allow store owners to select products from a central catalogue and request or complete assignment to their stores.

That workflow may include suitability checks, approval, variant selection, pricing, inventory setup, presentation and publication.

It is not required for the current two-store arrangement merely to make an accepted shared product available to both stores.

The existing proposed workflow is retained in:

`../../operations/STORE_OWNER_PRODUCT_IMPORT_AND_CATALOGUE_ASSIGNMENT_WORKFLOW.md`

## 10. Sharing withdrawal and source product changes

The future platform must define what happens when a product is no longer available to a particular store.

Potential scenarios include:

- A source product is withdrawn from one selected store.
- A source product is withdrawn from all stores.
- A source product is retired.
- A source product is corrected or materially changed.
- A source product is replaced by a new product record.
- A product owner requests removal.
- A platform administrator restricts a product for compliance reasons.

The system must distinguish source product changes from store listing changes.

A sharing withdrawal must not silently destroy a store's historical sales or inventory records.

The effect on active listings, existing orders, historical transactions and inventory must be explicitly defined.

The withdrawal policy remains an open design matter until approved.

## 11. Source product changes and store overrides

A future architecture may permit stores to override selected source product fields.

Potential examples include:

- Store-specific product descriptions.
- Store-specific display names.
- Store-specific images.
- Store-specific merchandising content.

This must be implemented through explicit store-level fields or override relationships.

A store override must not modify the shared source record.

The platform must define which fields are centrally controlled and which fields may be overridden.

No unrestricted override capability should be assumed to exist until the data model, permissions and APIs support it.

## 12. Data and audit requirements

The architecture should preserve enough information to establish:

- Which source product was created.
- Which actor submitted it.
- When it was created.
- Which party or store is recorded as its origin, where applicable.
- Which stores can access it.
- Which stores have created listings.
- Which actor changed a store listing.
- Which actor changed source product information.
- Which actor published or unpublished a listing.
- Which actor performed a retirement or deletion operation.
- When material changes occurred.

The precise audit fields and retention requirements must be defined in the security and governance specification.

Audit records should not be treated as optional merely because the frontend does not display them.

## 13. Backend enforcement

Ownership and sharing rules must be enforced by the backend.

The backend must validate:

- The authenticated actor.
- The requested operation.
- The actor's permissions.
- The relevant store context.
- Source product access.
- Listing ownership and scope.
- Whether the operation is permitted for the product's lifecycle state.

The backend must not rely solely on frontend controls or client-supplied store identifiers.

Requests that attempt unauthorised cross-store changes must be rejected.

Database constraints and transaction boundaries should protect data integrity where appropriate.

## 14. Current requirements versus future proposals

The following table provides the authoritative scope distinction for this document.

| Capability | Current two-store arrangement | Future platform |
|---|---|---|
| Shared source catalogue | Required | Retained or extended |
| Either store can add a valid shared product | Required, subject to permissions | May be extended |
| Product available to both listing workflows after admission | Required | Depends on eligibility model |
| Duplicate upload required for second store | No | Depends on ownership and sharing model |
| Independent store listings | Required | Required |
| Independent store pricing | Required | Required |
| Independent publication | Required | Required |
| Independent inventory | Required | Required |
| Platform-owned products | Not established as implemented | Proposed |
| Store-owned private products | Not established as implemented | Proposed |
| Selected-store sharing | Not established as implemented | Proposed |
| Platform-wide eligibility rules | Not established as implemented | Proposed |
| Central assignment workflow | Not required for current shared catalogue | Proposed |
| Source product ownership transfer | Unresolved | Requires policy |
| Source product withdrawal rules | Unresolved | Requires policy |
| Store-specific source field overrides | Unresolved | Proposed option |

## 15. Unresolved decisions

The following matters must remain open until formally decided and reflected in the implementation.

1. Who has final authority to modify source product information?
2. Does the original creator retain any special modification authority?
3. Who can permanently delete a source product?
4. Who can retire or withdraw a source product?
5. Can source product ownership be transferred?
6. Can a store override selected source product fields?
7. What happens to active listings when sharing is withdrawn?
8. Can a product be restricted to selected stores in the future?
9. What approval is required for platform-owned products?
10. How are product ownership disputes handled?
11. What audit history must be retained after deletion or retirement?
12. How should historical orders and inventory records reference retired products?

These decisions must be recorded in the platform decision records.

Do not infer approval from the existence of a proposed architecture document.

## 16. Related documentation

### Product catalogue documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`

### Existing architecture

- `../STORE_ARCHITECTURE.md`
- `../PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `../MULTI_STORE_PRODUCT_CATALOGUE_AND_INVENTORY_ISOLATION_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../API_ARCHITECTURE.md`

### Platform and governance

- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`
- `../../operations/STORE_OWNER_PRODUCT_IMPORT_AND_CATALOGUE_ASSIGNMENT_WORKFLOW.md`
- `../UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `../UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`

## 17. Document maintenance

This document must be updated when an approved ownership, sharing or permission decision changes the product catalogue model.

Before changing its requirements:

1. Verify the relevant backend implementation and database schema.
2. Check the approved role and permission definitions.
3. Review related platform and business-model decisions.
4. Preserve conflicting and superseded proposals with their historical status.
5. Update related catalogue documents where necessary.
6. Record material decisions in the appropriate decision register.
7. Distinguish implemented functionality from approved future work.

The document must not assign ownership or authority based on assumptions.
