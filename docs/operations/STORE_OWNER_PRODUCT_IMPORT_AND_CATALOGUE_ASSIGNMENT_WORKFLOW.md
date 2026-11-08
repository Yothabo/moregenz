# Store Owner Product Import and Catalogue Assignment Workflow

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-OPS-EE0160FCA0 |
| Category | Operations |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This document defines how Store Owners discover, select, import and assign products from the central product catalogue to their individual storefronts.

The workflow must preserve the distinction between:

- The central product catalogue.
- A store's individual product listing.
- Each store's independent pricing and merchandising decisions.
- Each store's independent inventory and sales records.

The purpose is to make product onboarding efficient while preventing accidental changes to another store's catalogue presentation, pricing, stock or commercial records.

## 2. Core Principles

1. A central catalogue product is a reusable product record, not a shared store listing.
2. Assigning a catalogue product to a store creates a distinct store-level listing.
3. Each store controls its own selling price, product visibility, merchandising order and promotional presentation, subject to platform rules.
4. Inventory remains independent for every store.
5. Updating a store listing must not silently modify another store's listing.
6. Updating a shared catalogue record must follow controlled catalogue governance.
7. Product ownership, supplier rights, image rights and content permissions must be verified before publication.
8. Every important assignment, edit, approval and removal must be auditable.

## 3. Roles and Responsibilities

### 3.1 Store Owner

The Store Owner may:

- Browse products available in the central catalogue.
- Search and filter products.
- Request access to restricted catalogue products.
- Assign eligible products to their store.
- Create store-specific product listings.
- Set store-specific selling prices.
- Configure product descriptions and presentation where permitted.
- Select available product variants.
- Manage store-specific stock.
- Control product visibility and merchandising order.
- Request a new product catalogue entry.
- Report inaccurate or duplicate catalogue records.
- Request corrections to centrally managed product information.

### 3.2 Parent Company Catalogue Administration

The parent company catalogue team is responsible for:

- Maintaining the central catalogue.
- Reviewing new product submissions.
- Managing duplicate records.
- Verifying shared product information.
- Managing product identifiers and variant structures.
- Defining which catalogue fields are centrally controlled.
- Managing restricted or discontinued products.
- Recording catalogue changes and their reasons.
- Resolving product data conflicts.

### 3.3 Platform Administration

Platform administrators are responsible for:

- Maintaining the assignment workflow.
- Enforcing store isolation.
- Controlling permissions.
- Maintaining catalogue and listing relationships.
- Preventing unauthorised cross-store changes.
- Monitoring errors and suspicious activity.

## 4. Product Data Structure

The platform must distinguish between three primary records.

### 4.1 Global Catalogue Product

The global catalogue product represents the underlying product and its reusable information.

It may contain:

- Global product ID.
- Product name.
- Manufacturer or brand.
- Product category.
- Product type.
- General description.
- Product specifications.
- Available variants.
- Standardised attributes.
- Approved product images.
- Supplier or source information.
- Product identifiers such as SKU, GTIN or barcode where available.
- Catalogue status.
- Content verification status.
- Creation and update history.

A global catalogue record must not contain store-specific selling prices, stock balances, customer orders or store performance figures.

### 4.2 Store Product Listing

A store product listing represents a particular store's decision to offer a catalogue product.

It must contain:

- Store listing ID.
- Store ID.
- Global catalogue product ID.
- Store-specific product title where permitted.
- Store-specific description or merchandising copy.
- Store-specific selling price.
- Store-specific promotional price where applicable.
- Store-specific product images where permitted.
- Store-specific category assignment.
- Store-specific display order.
- Publication status.
- Visibility settings.
- Store-specific product metadata.
- Assignment date.
- Last modification date.

The relationship between a store and a catalogue product must be controlled so that duplicate active assignments are not created accidentally.

Where the business intentionally offers the same product through multiple distinct listings, the platform must support an authorised exception with a recorded reason.

### 4.3 Store Inventory Record

Inventory must remain separate from both the global catalogue product and the store listing.

It must contain:

- Store ID.
- Store listing ID or applicable product variant reference.
- Variant ID where applicable.
- Quantity on hand.
- Reserved quantity.
- Available quantity.
- Reorder threshold where configured.
- Stock location where applicable.
- Inventory status.
- Last stocktake date.
- Inventory movement history.

One store's inventory changes must never automatically change another store's inventory.

## 5. Catalogue Discovery

The Store Owner dashboard must provide a catalogue discovery interface.

Store Owners should be able to:

- Search by product name.
- Search by brand or manufacturer.
- Search by SKU, GTIN or barcode where available.
- Browse product categories.
- Filter by product type.
- Filter by availability for assignment.
- Filter by catalogue status.
- View product specifications.
- Preview approved images.
- Identify available variants.
- See whether the product is already assigned to their store.

Catalogue search results must clearly distinguish:

- Available for assignment.
- Already assigned to this store.
- Restricted.
- Pending verification.
- Discontinued.
- Archived.

The interface must not expose another store's private prices, stock quantities, customer activity or sales performance.

## 6. Product Assignment Workflow

### Step 1: Select a Product

The Store Owner opens the central catalogue and selects a product.

The platform displays the available product information and any assignment restrictions.

### Step 2: Verify Product Suitability

Before assignment, the Store Owner confirms:

- The product is the correct item.
- The selected brand and manufacturer are accurate.
- The product specifications match the intended offering.
- The available variants are appropriate.
- The product is lawful and suitable for sale.
- The Store Owner has the necessary authority to offer the product.

The platform must not treat catalogue availability as proof that a Store Owner has supplier rights, distribution authority or permission to use every associated asset.

### Step 3: Check Existing Assignment

The platform checks whether the same catalogue product is already assigned to the store.

If an active assignment exists, the platform should direct the Store Owner to edit the existing listing rather than create an accidental duplicate.

If a previous listing exists in an archived or discontinued state, the platform should offer a controlled reactivation workflow where permitted.

### Step 4: Create Store Listing

The platform creates a store-specific listing linked to the selected global catalogue product.

The listing receives its own identifier and store ownership relationship.

The Store Owner can configure permitted store-specific fields without modifying the central catalogue record.

### Step 5: Configure Variants

Where the product has variants, the Store Owner selects the variants they intend to offer.

Examples include:

- Clothing sizes.
- Clothing colours.
- Fragrance sizes.
- Product pack sizes.
- Material or finish options.
- Other product-specific attributes.

The platform must not assume that every catalogue variant is available to every store.

Each selected variant must have its own applicable store inventory record.

### Step 6: Set Store Pricing

The Store Owner configures the store's selling price for each applicable product or variant.

The platform must validate:

- The price is greater than zero unless an authorised free-product workflow applies.
- The currency is correct.
- The price uses supported decimal precision.
- Promotional prices follow the platform's pricing rules.
- Any required pricing disclosures are present.

A catalogue reference price, supplier cost or suggested retail price must not silently become the store's selling price.

Where the parent company imposes a documented pricing restriction, the dashboard must explain the restriction and its basis.

### Step 7: Configure Inventory

The Store Owner records the initial stock position or connects the listing to an authorised inventory workflow.

The platform must verify that inventory is associated with the correct store and product variant.

The listing must not become purchasable with stock that has not been confirmed, unless the store is explicitly configured for backorders or made-to-order fulfilment.

### Step 8: Configure Store Presentation

The Store Owner may configure permitted presentation fields, including:

- Store-specific product title.
- Store-specific merchandising description.
- Store category.
- Product display order.
- Featured status.
- Product badges where supported.
- Store-specific images where authorised.
- Product visibility.

The platform must retain central product facts that are required for accurate identification and compliance.

### Step 9: Review and Publish

Before publication, the dashboard must show a summary of:

- Selected catalogue product.
- Selected variants.
- Store-specific price.
- Promotional price, if applicable.
- Inventory status.
- Product images.
- Product description.
- Publication status.
- Any outstanding warnings.

The Store Owner confirms the listing before publication.

The platform performs its required validation and publishes the listing only when all mandatory conditions are satisfied.

## 7. New Product Catalogue Requests

If a required product does not exist in the central catalogue, the Store Owner may submit a new product request.

The request should capture:

- Proposed product name.
- Brand or manufacturer.
- Product category.
- Product type.
- Product description.
- Available variants.
- Product identifiers where available.
- Supplier or manufacturer information.
- Supporting images.
- Evidence of authority to use submitted content.
- Reason the product is needed.
- Relevant supplier or sourcing information.

The parent company catalogue team reviews the submission for:

- Accuracy.
- Completeness.
- Existing duplicates.
- Product legitimacy.
- Brand and image rights.
- Category suitability.
- Restricted or prohibited product concerns.
- Reusability across participating stores.

The request may be:

- Approved.
- Rejected.
- Returned for additional information.
- Merged with an existing catalogue product.
- Held pending verification.

Approval creates or updates a central catalogue record. It does not automatically publish the product in every store.

The requesting Store Owner must still complete the store assignment workflow.

## 8. Catalogue Data Changes

Centrally managed catalogue fields must be changed through controlled catalogue administration.

Examples include:

- Correcting manufacturer information.
- Correcting product specifications.
- Updating a product identifier.
- Correcting factual product information.
- Replacing an inaccurate central image.
- Changing product classification.
- Marking a product discontinued.

Before a central change is applied, the platform should identify affected store listings.

Where a change materially affects product identity, customer expectations, compliance or existing orders, the parent company must review the impact before publication.

A central catalogue update must not overwrite store-specific:

- Selling prices.
- Promotional prices.
- Inventory.
- Store-specific descriptions.
- Store-specific images.
- Display order.
- Publication preferences.
- Store-specific campaign settings.

Store Owners must be notified when a central change materially affects their listings.

## 9. Product Removal and Unassignment

A Store Owner may remove a product from their storefront without deleting the underlying global catalogue product.

The unassignment process must:

1. Check for active orders and fulfilment obligations.
2. Prevent new purchases where appropriate.
3. Preserve historical order references.
4. Preserve inventory movement records.
5. Record the reason for removal where required.
6. Mark the store listing as inactive or archived.
7. Preserve the catalogue product for other stores.

Removing a product from one store must not remove it from another store.

A global catalogue product may only be discontinued, restricted or archived through authorised catalogue governance.

## 10. Duplicate Prevention

The platform should detect likely duplicates using available identifiers and product attributes.

Possible matching criteria include:

- GTIN or barcode.
- Manufacturer SKU.
- Brand and model.
- Product name.
- Variant attributes.
- Supplier reference.

A matching name alone must not automatically prove that two products are identical.

When a duplicate is suspected, catalogue administrators review the records before merging them.

Merging must preserve:

- Historical product references.
- Store listing relationships.
- Variant mappings.
- Inventory references.
- Order history.
- Audit history.

A merge must not silently combine stock, prices or financial records between stores.

## 11. Product Data Validation

Before a listing can be published, the platform validates:

- Required product identity fields.
- Valid store assignment.
- Valid catalogue relationship.
- Valid variant selection.
- Valid pricing.
- Valid inventory configuration.
- Image and content permissions.
- Product publication status.
- Required compliance information.
- Store-specific publication permissions.

Validation errors must identify the affected field and explain how the Store Owner can correct the problem.

The platform must distinguish blocking errors from non-blocking warnings.

## 12. Permissions and Store Isolation

A Store Owner may only create, view, edit, publish or remove listings belonging to their assigned store, subject to their permissions.

The platform must enforce store scope on the server side.

It must never rely only on frontend filtering or hidden dashboard controls.

Store Owners must not be able to:

- Modify another store's listing.
- Change another store's price.
- Change another store's stock.
- View another store's private supplier costs.
- View another store's sales or customer records.
- Modify global catalogue records without authorised permission.
- Reassign products between stores without an authorised workflow.

Administrative catalogue permissions must be separate from Store Owner permissions.

## 13. Audit and Activity Records

The platform must record significant product assignment and catalogue events.

Events should include:

- Catalogue product selected.
- Store listing created.
- Variant assigned or removed.
- Price changed.
- Promotional price changed.
- Inventory record created or linked.
- Product published or unpublished.
- Product archived or reactivated.
- Catalogue change received.
- New catalogue request submitted.
- Catalogue request approved or rejected.
- Duplicate review completed.
- Product assignment removed.

Each event should record:

- Event ID.
- Store ID where applicable.
- Catalogue product ID.
- Store listing ID where applicable.
- Actor ID.
- Actor role.
- Action.
- Previous value where appropriate.
- New value where appropriate.
- Reason where required.
- Timestamp.
- Relevant request or approval reference.

Audit records must be protected against unauthorised modification.

## 14. Notifications

The dashboard should notify Store Owners about:

- New catalogue products relevant to their store.
- Approval or rejection of product requests.
- Catalogue corrections affecting their listings.
- Product restrictions or discontinuation.
- Missing or invalid product information.
- Publication failures.
- Product assignment conflicts.
- Required action before a listing can remain active.

Notifications must not disclose another store's private information.

## 15. Error Handling and Recovery

The workflow must handle:

- Duplicate assignment attempts.
- Missing catalogue data.
- Invalid variant mappings.
- Pricing validation failures.
- Inventory configuration failures.
- Permission errors.
- Concurrent product updates.
- Catalogue product discontinuation during assignment.
- Network interruptions.
- Partial assignment failures.

Operations should be transactional where multiple records must be created or updated together.

If an assignment fails, the platform must not leave behind an active listing with incomplete variant or inventory relationships.

Retrying an operation must not create duplicate listings or duplicate inventory records.

## 16. Reporting and Monitoring

The parent company should be able to report on:

- Products assigned per store.
- New catalogue requests.
- Catalogue approval times.
- Duplicate product submissions.
- Product publication failures.
- Inactive and discontinued listings.
- Missing product information.
- Store-specific catalogue adoption.
- Product assignment changes.
- Catalogue data quality.

Reports must respect store-level permissions.

Store Owners may view their own product assignment and listing information but not another store's private operational data.

## 17. Testing Requirements

The implementation must test:

1. A Store Owner can assign an eligible catalogue product to their store.
2. The assignment creates a distinct store listing.
3. Another store can independently assign the same catalogue product.
4. Store A can change its selling price without changing Store B's price.
5. Store A can edit its listing without changing Store B's listing.
6. Store A inventory changes do not affect Store B inventory.
7. Duplicate assignment attempts are handled safely.
8. Variant assignments are correctly isolated.
9. Restricted products cannot be published without the required authorisation.
10. New catalogue requests follow the approval workflow.
11. Catalogue updates preserve store-specific fields.
12. Unassigning a product does not delete the global catalogue product.
13. Historical orders remain readable after product unassignment.
14. Store Owners cannot access another store's listings through direct API requests.
15. Failed assignments do not leave incomplete records.
16. Retrying failed operations does not create duplicates.
17. Catalogue merges preserve historical references.
18. Audit records accurately capture important changes.

## 18. Implementation Guidance

Before implementation:

- Review the existing product, variant, store listing and inventory schemas.
- Confirm the current global catalogue and store-specific relationships.
- Identify existing duplicate-prevention constraints.
- Review product APIs and Store Owner permissions.
- Confirm how existing orders reference products and variants.
- Review the existing product content and merchandising standards.
- Review inventory isolation and stock reconciliation procedures.

Do not introduce a second product-management model if the existing architecture already supports the required relationships.

Any schema changes must include appropriate migrations, data integrity constraints, rollback considerations and tests.

Implementation must preserve existing storefront and administration behaviour unless a documented change is approved.

## 19. Governing Rule

The central catalogue provides reusable product identity and verified shared information.

Each Store Owner independently decides which eligible products to offer, how to present them, what price to charge and how much stock to maintain.

A shared catalogue must never become shared ownership of store operations.

Every product assignment must preserve store identity, commercial independence, inventory isolation, historical records and clear accountability.
