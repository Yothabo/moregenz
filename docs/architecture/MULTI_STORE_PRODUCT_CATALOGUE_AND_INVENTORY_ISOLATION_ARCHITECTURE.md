# Multi-Store Product Catalogue and Inventory Isolation Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-B8E871DF35 |
| Category | Architecture |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This document defines how products and inventory are represented across the parent company's multi-store platform.

It establishes the distinction between:
- A centrally maintained product catalogue.
- Store-specific product listings.
- Independent store inventory.
- Store-specific pricing and merchandising.
- Product information shared between participating stores.
- Transactions that affect stock.

The architecture must allow the parent company to reuse approved product information and creative assets without combining the independent commercial operations of different stores.

## 2. Core Architectural Principle

A shared product catalogue does not mean shared inventory.

Two stores may sell the same underlying product while maintaining independent:
- Stock quantities.
- Selling prices.
- Discounts.
- Product availability.
- Listings.
- Orders.
- Sales history.
- Supplier arrangements.
- Financial records.
- Performance history.

A sale in Store A must never automatically reduce Store B's inventory.

Every stock movement must belong to a specific store and an identifiable inventory record.

## 3. Product Data Layers

The architecture should distinguish three logical layers.

### 3.1 Global Product Catalogue

The global catalogue stores reusable product information maintained centrally or supplied by an authorised source.

Possible fields include:
- Global product identifier.
- Product name.
- Manufacturer or brand.
- Product category.
- General description.
- Standard specifications.
- Shared media references.
- Product identifiers such as GTIN, where available.
- Product status.
- Data source.
- Verification status.
- Created and updated timestamps.

The global catalogue must not contain a store's private inventory or financial information.

### 3.2 Store Product Listing

A store product listing connects a global product to a particular store.

It contains store-specific commercial and presentation information, including:
- Store identifier.
- Global product identifier, where applicable.
- Store listing identifier.
- Store-specific product title.
- Store-specific description.
- Selling price.
- Promotional price.
- Store-specific images.
- Product variants.
- Publication status.
- Search visibility.
- Merchandising position.
- Listing-specific attributes.
- Store-specific terms.

A store may use the shared product information as a starting point and customise its own listing within platform standards.

A store listing must not silently overwrite another store's content.

### 3.3 Store Inventory

Inventory records belong to a specific store and product listing or approved inventory item.

They contain:
- Store identifier.
- Inventory identifier.
- Product or listing identifier.
- Variant identifier, where applicable.
- Quantity on hand.
- Reserved quantity.
- Available quantity.
- Damaged quantity.
- Reorder threshold.
- Stock location, where supported.
- Last stocktake.
- Inventory status.

The system must enforce store-level inventory isolation.

## 4. Store Product Relationship

A global product may be associated with multiple stores.

Example:

- Global Product: Classic White T-Shirt.
- Store A listing: Store A's branded presentation and price.
- Store B listing: Store B's branded presentation and price.
- Store A inventory: 25 units.
- Store B inventory: 12 units.

These listings remain distinct even though they reference the same global product.

The platform must not assume that a matching product name means the records should be merged.

Product matching should use reliable identifiers and review where ambiguity exists.

## 5. Product Catalogue Ownership and Authority

The parent company may maintain the global catalogue to improve consistency and reduce duplicated product data.

However, the source and rights of product information must be recorded.

The catalogue must distinguish between:
- Parent-company-created product information.
- Manufacturer-supplied information.
- Supplier-supplied information.
- Store Owner-submitted information.
- Licensed third-party information.
- Shared creative assets.
- Store-specific creative assets.

The parent company must not assume that a Store Owner's independently created product content becomes parent-company property merely because it is uploaded to the platform.

Content ownership and permitted reuse must follow the applicable agreements.

## 6. Store-Specific Product Customisation

A Store Owner may be permitted to customise supported listing fields.

Examples include:
- Display title.
- Store-specific description.
- Selling price.
- Promotional pricing.
- Product images.
- Product presentation.
- Store-specific labels.
- Merchandising position.
- Product visibility.

Some fields may be centrally controlled where consistency, accuracy, legal compliance or product safety requires it.

The platform must clearly identify which fields are:
- Globally managed.
- Store-editable.
- Restricted.
- Subject to approval.

Store-specific changes must not alter the global source record without the appropriate permission.

## 7. Inventory Independence

Every store must maintain independent stock balances.

For example:

| Inventory event | Store A | Store B |
|---|---:|---:|
| Opening stock | 25 | 12 |
| Store A sale | -1 | 0 |
| Closing stock | 24 | 12 |

A transaction in one store must not affect another store's inventory unless an explicitly approved inter-store transfer or shared-stock arrangement exists.

The default architecture is independent stock.

## 8. Inventory Calculation

The system should distinguish:

- Quantity on hand.
- Quantity reserved.
- Quantity available.
- Quantity damaged or quarantined.

A general calculation is:

Available quantity = Quantity on hand - Reserved quantity - Unavailable quantity

The exact formula must align with the implemented inventory model.

The platform must not allow unavailable or reserved units to be sold again.

## 9. Order and Stock Relationship

Each order item must identify:
- Store identifier.
- Store listing identifier.
- Product identifier.
- Variant identifier, where applicable.
- Quantity ordered.
- Price at the time of purchase.
- Relevant product description snapshot.

When an order is accepted under the applicable order workflow, the inventory system must reserve or deduct stock according to the approved stock policy.

The operation must be atomic or otherwise protected against concurrent overselling.

A failed or cancelled order must release reservations or restore stock according to the order lifecycle rules.

Historical order records must preserve the product and price information applicable at the time of purchase.

## 10. Concurrent Sales Protection

The inventory service must protect against two customers purchasing the final unit simultaneously.

Controls should include:
- Atomic inventory updates.
- Transactional stock reservation.
- Concurrency checks.
- Idempotent order processing.
- Reservation expiry where supported.
- Duplicate event protection.
- Consistent order and inventory status transitions.

The platform must not rely only on frontend stock displays to prevent overselling.

Inventory validation must occur on the server.

## 11. Product Variants

Products may have variants such as:
- Size.
- Colour.
- Volume.
- Material.
- Packaging.
- Model.
- Configuration.

The architecture must distinguish the parent product from its sellable variants.

Where stock differs by variant, inventory must be tracked independently per store and variant.

Example:

Store A:
- Small: 5 units.
- Medium: 8 units.
- Large: 3 units.

Store B may have a completely different quantity distribution.

A sale of Medium in Store A must not change any variant quantity in Store B.

## 12. Store Cloning and Product Reuse

When a store is cloned, the platform may copy approved product information and listing configuration.

The clone process may copy:
- Product catalogue associations.
- Approved descriptions.
- Product categories.
- Approved images.
- Variant definitions.
- Storefront presentation templates.
- Merchandising configuration.

The clone must create independent:
- Store listing records where required.
- Inventory records.
- Stock balances.
- Pricing decisions.
- Promotional settings.
- Order history.
- Sales history.
- Financial records.
- Customer relationships and permissions.

Inventory quantities must never be copied as live shared balances.

Any initial stock quantity for the new store must be explicitly entered, imported or confirmed.

## 13. Shared Catalogue Updates

When a global product record changes, the platform must determine whether the change should affect associated store listings.

Updates should be classified as:

### Global Reference Update

Examples:
- Corrected manufacturer specification.
- Verified product identifier.
- Updated factual safety information.

The platform may notify affected stores or apply an approved update.

### Store Presentation Update

Examples:
- Store-specific title.
- Promotional description.
- Local marketing copy.
- Store-specific imagery.

These changes must remain isolated to the relevant store.

### Compliance-Critical Update

Examples:
- Product recall.
- Confirmed safety issue.
- Materially incorrect product specification.
- Legal restriction.

The parent company may restrict affected listings while the issue is investigated.

The system must preserve the previous value and record the reason for a material change.

## 14. Product Availability and Publication

Product listing status and inventory availability must be separate concepts.

A product may be:
- Published and in stock.
- Published but out of stock.
- Published with limited stock.
- Unpublished but retained in inventory records.
- Temporarily unavailable.
- Restricted pending review.
- Archived.

The storefront must display availability based on the correct store's inventory.

An out-of-stock product must not automatically be unpublished unless the store's configured policy requires it.

## 15. Inter-Store Transfers

Inter-store stock transfers are not part of the default shared-inventory model.

If transfers are supported in the future, they must be explicit transactions.

A transfer record should include:
- Source store.
- Destination store.
- Product and variant.
- Quantity.
- Requesting person.
- Authorising person.
- Dispatch date.
- Receipt date.
- Transfer status.
- Stock adjustments.
- Supporting evidence.

Stock must not be counted in both stores during the transfer.

The transfer process must record the movement out of the source store and into the destination store.

## 16. Inventory Adjustments

Stock adjustments must be traceable.

Reasons may include:
- Stocktake correction.
- Damaged goods.
- Lost goods.
- Supplier delivery.
- Customer return.
- Approved transfer.
- Data correction.
- Other documented reason.

Every adjustment must record:
- Store.
- Product.
- Variant.
- Previous quantity.
- Adjustment quantity.
- New quantity.
- Reason.
- Responsible person.
- Date and time.
- Approval where required.

Historical inventory events must not be silently overwritten.

## 17. Supplier and Procurement Separation

A global product catalogue does not imply shared supplier relationships.

Each store may have independent:
- Suppliers.
- Purchase prices.
- Procurement arrangements.
- Supplier terms.
- Delivery arrangements.
- Product sourcing.

Where the parent company negotiates shared procurement, the arrangement must be separately documented.

Supplier information must only be visible to authorised users.

## 18. Financial and Reporting Isolation

Store-specific financial reports must use the relevant store's transactions and costs.

The platform must not combine different stores' financial records merely because they sell the same global product.

Parent-company reporting may aggregate permitted information for platform-wide analysis.

Aggregated reporting must preserve the confidentiality of individual stores where required.

## 19. Customer and Order Isolation

A central customer identity may recognise the same customer across multiple stores.

However:
- Each order belongs to one store.
- Each store's order history remains store-scoped.
- Store Owners may only access permitted customer records.
- One store cannot inspect another store's private order details.
- Shared product catalogue data does not grant access to another store's customers.

Cross-store customer visibility must follow the centralised customer identity and privacy architecture.

## 20. Data Model Considerations

The implementation should support entities or equivalent structures for:

- GlobalProduct.
- GlobalProductVariant.
- StoreProductListing.
- StoreProductVariant.
- StoreInventory.
- InventoryLocation.
- InventoryMovement.
- StockReservation.
- Stocktake.
- ProductMediaAsset.
- ProductSource.
- ProductCatalogueAssociation.
- StoreProductChange.
- InterStoreTransfer, if implemented.

The exact schema must follow the existing architecture and avoid duplicating data unnecessarily.

Every store-owned record must have a reliable store relationship.

## 21. Access Control

Access rules must distinguish between global catalogue administration and store-level operations.

The parent company may have authorised global catalogue permissions.

Store Owners may have permissions to:
- View approved global products.
- Create store listings.
- Edit permitted store-specific fields.
- Manage their own inventory.
- View their own stock movements.
- Request global catalogue corrections.

Store Owners must not:
- Modify another store's inventory.
- Access another store's private listing data.
- Change global records without permission.
- Alter another store's order or financial records.

Privileged actions must be logged.

## 22. Audit and Data Integrity

The system must preserve:
- Product source history.
- Listing changes.
- Price changes.
- Inventory movements.
- Stock reservations.
- Adjustments.
- Transfers.
- Product status changes.
- User or system actor.
- Relevant timestamps.

The system must support investigation of stock discrepancies and unauthorised changes.

Data integrity checks should detect:
- Inventory without a valid store.
- Listings linked to invalid products.
- Duplicate or conflicting variant identifiers.
- Negative stock where prohibited.
- Invalid reservations.
- Cross-store inventory mutations.
- Orphaned media references.

## 23. Testing Requirements

The architecture must be tested for:

1. Two stores selling the same global product.
2. Different prices for the same product.
3. Different stock quantities.
4. Independent variant quantities.
5. A sale in Store A leaving Store B unchanged.
6. Concurrent attempts to purchase the final unit.
7. Order cancellation and reservation release.
8. Refunds and returned stock.
9. Store cloning with independent inventory.
10. Global catalogue updates.
11. Store-specific listing changes.
12. Product recall and restriction.
13. Unauthorised cross-store inventory access.
14. Inventory reconciliation.
15. Historical order accuracy.

Automated integration tests must verify that cross-store stock isolation cannot be bypassed.

## 24. Implementation Principles

The implementation must:
- Treat store identity as a mandatory inventory boundary.
- Keep global catalogue data separate from store operations.
- Preserve historical transaction snapshots.
- Use server-side inventory validation.
- Prevent concurrent overselling.
- Make stock movements auditable.
- Keep store-specific commercial decisions independent.
- Support future catalogue sharing without forcing shared stock.
- Follow existing access-control and data-retention standards.

## 25. Related Documents

This architecture must be read alongside:

- Store Ownership History, Succession and Cloning Architecture.
- Product Content and Merchandising Standards.
- Inventory Stocktake and Reconciliation Procedure.
- Order Lifecycle and Fulfilment Management Standards.
- Customer Order History and Cross-Store Purchase Visibility Standards.
- Centralised Customer Identity and Cross-Store Account Architecture.
- Payment Provider Integration Standards.
- Manual Payment Verification and Reconciliation Standards.
- Store Owner Revenue Settlement and Financial Reconciliation Policy.
- Access Control and Privileged Account Standards.

## 26. Governance Status

This document establishes the target multi-store product and inventory architecture.

Before implementation, the parent company must confirm:
- Global catalogue ownership and maintenance.
- Store listing permissions.
- Inventory reservation rules.
- Variant handling.
- Stock transfer requirements.
- Product update and recall procedures.
- Financial and reporting boundaries.
- Data access rules.
- Integration with the existing product and inventory schema.

The implemented architecture must preserve independent store inventory even when products and catalogue information are shared.
