# Product Lifecycle and Administration

**Document status:** Architecture specification
**Scope:** Current Yotaabo and Poshies stores, with provisions for future multi-store expansion
**Implementation status:** Requirements specification. The workflows and states described here must be verified against the live application before being classified as implemented.

## 1. Purpose

This document defines the lifecycle and administrative requirements for products in the shared catalogue.

It covers:

- Product creation.
- Product validation.
- Catalogue admission.
- Product administration.
- Store listing creation.
- Store-specific publication.
- Source-product changes.
- Store listing changes.
- Suspension and retirement.
- Audit and administrative controls.

The central requirement is that source-product administration and store listing administration remain separate responsibilities.

A product may exist in the shared catalogue without being listed or published by either store.

## 2. Lifecycle boundaries

Product administration has two distinct lifecycle areas.

### 2.1 Source product lifecycle

The source product represents the shared catalogue record.

Its lifecycle covers:

- Creation.
- Validation.
- Catalogue admission.
- Source data maintenance.
- Suspension.
- Retirement.

Changes to the source product may affect information used by multiple stores. Consequently, source-product operations require explicitly defined authority.

### 2.2 Store listing lifecycle

A store listing represents an individual store's decision to use a source product.

Its lifecycle covers:

- Listing creation.
- Store-specific configuration.
- Pricing.
- Promotion configuration.
- Publication.
- Unpublication.
- Archiving.

Each store controls its own listing independently.

Changing a listing must not automatically change the source product or another store's listing.

## 3. Product creation

### 3.1 Current two-store arrangement

Yotaabo and Poshies use one shared product catalogue.

An authorised administrator of either store may submit a product for addition to the shared catalogue, subject to the application's actual permissions and validation rules.

After a product is successfully accepted into the shared catalogue:

- It becomes available to both stores' listing workflows.
- The other store does not need to upload a duplicate product.
- Neither store is required to publish it.
- Each store independently decides whether to create and publish its own listing.

The shared catalogue is the common product identity layer, not a shared storefront.

### 3.2 Product submission requirements

A product submission should provide the information required to establish a valid catalogue record.

Depending on product type, this may include:

- Product name.
- Brand.
- Description.
- Category.
- Relevant attributes.
- Variant information.
- SKU or product reference, where applicable.
- Product media.
- Origin or supplier information, where required.

Required fields and validation rules must be defined by product type.

The system should reject incomplete or invalid submissions with clear validation feedback.

### 3.3 Duplicate prevention

The system should check for possible duplicate products before admitting a new source product.

Duplicate detection may consider:

- Brand.
- Product name.
- Manufacturer reference.
- Barcode.
- SKU.
- Product attributes.
- Other reliable identifying information.

A matching product name alone must not automatically establish that two submissions represent the same product.

Where a possible duplicate is detected, the system should provide an appropriate review or resolution process rather than silently creating another record.

## 4. Product validation

Validation must occur on the backend.

The frontend may provide immediate feedback, but it must not be the sole enforcement mechanism.

Validation should cover:

- Required fields.
- Field length and format.
- Valid category references.
- Valid attribute values.
- Valid variant relationships.
- SKU rules.
- Media references and permitted file types.
- Product status.
- Duplicate detection.
- Actor permissions.
- Catalogue admission rules.

Validation must also protect existing records from invalid updates.

A failed update must not leave a partially modified product.

## 5. Catalogue admission

Catalogue admission determines whether a submitted source product is accepted into the catalogue.

The admission process may include:

1. Submission.
2. Backend validation.
3. Duplicate detection.
4. Required review.
5. Acceptance or rejection.
6. Recording the result and responsible actor.

The exact approval requirements depend on the final catalogue governance model.

For the current Yotaabo and Poshies arrangement, an accepted product is available to both stores' listing workflows.

A separate upload or duplicate admission by the second store should not be necessary.

### 5.1 Rejected submissions

A rejected submission should:

- Remain distinguishable from an accepted product.
- Provide a reason where appropriate.
- Avoid creating an active catalogue record.
- Allow correction and resubmission where permitted.
- Retain appropriate administrative history.

The retention period and exact rejection workflow require implementation-level confirmation.

## 6. Source product administration

Source-product administration concerns the shared catalogue record.

Potential operations include:

- Viewing source-product details.
- Updating permitted descriptive information.
- Managing product attributes.
- Managing product variants.
- Managing source media.
- Changing catalogue status.
- Reviewing product history.
- Suspending or retiring a product.

These operations must be protected by explicit backend permissions.

### 6.1 Editing authority

The following permissions must be treated separately:

- Permission to create a product.
- Permission to submit a product.
- Permission to approve catalogue admission.
- Permission to edit source-product information.
- Permission to manage variants.
- Permission to replace source media.
- Permission to suspend a product.
- Permission to permanently delete a product.

A user who can add a product must not automatically be assumed to have every other permission.

The exact source-product editing authority between the two stores remains unresolved until confirmed by the permission model and verified backend implementation.

### 6.2 Source-product changes

Source-product changes may affect more than one store.

Before implementing changes to shared source data, the system must establish:

- Which fields are centrally controlled.
- Which fields may be overridden by a store.
- Which changes are immediately visible to existing listings.
- Which changes require store review.
- Whether a change can invalidate an existing listing.
- Whether affected stores must be notified.

A source-product update must not silently overwrite independent store pricing, promotions, publication status, inventory, or presentation settings.

## 7. Store listing creation

A store listing is created when a store decides to use an available source product.

The listing must reference:

- The store.
- The source product.
- Any applicable variant or SKU mapping.
- Store-specific commercial information.
- Store-specific presentation information.
- Listing lifecycle status.

### 7.1 Listing creation workflow

The conceptual workflow is:

1. An authorised store administrator opens the available catalogue.
2. The administrator selects an eligible source product.
3. The backend verifies the administrator's permissions.
4. The backend verifies that the store may use the source product.
5. The administrator supplies the store-specific listing information.
6. The backend validates the listing.
7. The listing is saved in the selected store's scope.
8. The listing remains unpublished until the store completes its publication process.

The workflow must not create a duplicate source product when a valid shared catalogue record already exists.

### 7.2 Independent listing records

Yotaabo and Poshies must have separate listing records for their use of the same source product.

This allows each store to control:

- Listing title and permitted overrides.
- Description and permitted overrides.
- Selling price.
- Promotional pricing.
- Promotion availability.
- Publication status.
- Store-specific media or presentation.
- Display order.
- Store-specific availability information.

The exact overrideable fields must be defined by the source-data ownership policy.

## 8. Pricing and promotions

Pricing belongs to the individual store listing.

The same source product may have different prices in Yotaabo and Poshies.

A price update in one store must not change the other store's price.

Promotion information must also remain store-specific.

The model must distinguish:

- Standard selling price.
- Promotional price.
- Promotion start and end dates.
- Promotion eligibility.
- Promotion status.
- Any applicable pricing rules.

The system must validate pricing values and prevent invalid promotional configurations.

Any future platform-wide pricing or central commercial policy requires a separate approved decision.

## 9. Product publication

Catalogue admission and storefront publication are separate operations.

An accepted source product is not automatically visible to customers.

A store must create and publish its own listing.

### 9.1 Publication requirements

Before publication, the backend should verify:

- The source product is in an eligible state.
- The store is permitted to use the product.
- The listing belongs to the requesting store.
- Required listing information is complete.
- Required media is available.
- Pricing is valid.
- The listing satisfies applicable store rules.
- The actor has publication permission.

### 9.2 Independent publication

Publication must be controlled independently by each store.

For example:

- Yotaabo may publish a product while Poshies leaves it unpublished.
- Poshies may unpublish its listing without affecting Yotaabo.
- A store may update its listing without changing the other store's publication status.

A shared source-product status must not be used as a substitute for individual listing publication status.

## 10. Store listing administration

An authorised store administrator may manage the listing operations permitted within that store.

Potential operations include:

- Viewing the store's listings.
- Editing permitted listing fields.
- Updating prices.
- Managing promotions.
- Changing listing presentation.
- Publishing a listing.
- Unpublishing a listing.
- Archiving a listing.

Every operation must verify store scope and the actor's permission.

A store administrator must not be able to change another store's commercial information through a shared source-product reference.

## 11. Inventory administration

Inventory administration is separate from catalogue and listing administration.

A store manages its own stock records and inventory movements.

Listing a source product does not create shared stock.

The inventory workflow must define:

- Stock receipt.
- Stock adjustment.
- Reservation.
- Release of reserved stock.
- Stock correction.
- Stock transfer, if supported.
- Inventory reconciliation.
- Stock movement history.

Any stock transfer between stores must be an explicit operation with its own authorisation and audit requirements.

See `../INVENTORY_ARCHITECTURE.md`.

## 12. Product suspension

Suspension is a restriction that prevents normal use of a source product or listing while preserving its history.

The system must distinguish between:

- Source-product suspension.
- Store-specific listing suspension.

A store-specific suspension must not automatically suspend another store's listing.

A source-product suspension may affect multiple stores and therefore requires explicitly defined authority and impact handling.

The system should record:

- Reason for suspension.
- Responsible actor.
- Timestamp.
- Affected record.
- Scope of suspension.
- Conditions for reinstatement.

The exact effect of source-product suspension on existing published listings must be formally decided before implementation.

## 13. Product retirement and deletion

Retirement and permanent deletion are different operations.

### 13.1 Retirement

Retirement removes a product from normal new catalogue use while preserving relevant historical records.

A retired source product may still be referenced by:

- Existing or archived store listings.
- Historical orders.
- Inventory movements.
- Audit records.
- Reports.

Retirement rules must define how existing store listings are handled.

### 13.2 Listing archival

A store may archive its own listing without retiring the shared source product.

Archiving one store's listing must not archive another store's listing.

### 13.3 Permanent deletion

Permanent source-product deletion is a high-impact operation.

Before it is permitted, the system must establish:

- Who has deletion authority.
- Whether any store listings reference the product.
- Whether inventory records exist.
- Whether historical transactions reference the product.
- Whether dependent records can be safely retained.
- Whether legal, accounting, or audit retention requirements apply.

A product's presence in a shared catalogue does not grant either store unrestricted deletion rights.

The source-product deletion authority and exact deletion policy remain unresolved.

Where historical references exist, retirement or controlled archival may be more appropriate than physical deletion.

## 14. Store removal and sharing withdrawal

The current two-store shared catalogue arrangement must not be confused with the future flexible sharing model.

In the current arrangement, accepted source products are available to both stores' listing workflows.

The future platform may introduce:

- Store-specific product availability.
- Selected-store sharing.
- Platform-wide availability.
- Sharing withdrawal.
- Ownership transfer.
- Central catalogue governance.

If these capabilities are introduced, withdrawal of one store's eligibility must not automatically delete the source product or alter another store's independent listing.

The effect on existing listings, orders, inventory, and historical records must be defined before implementing withdrawal.

## 15. Audit requirements

The system should record material administrative operations.

At minimum, audit history should cover:

- Product submissions.
- Validation failures where operationally relevant.
- Catalogue admission decisions.
- Source-product changes.
- Variant changes.
- Media changes.
- Listing creation.
- Listing updates.
- Price and promotion changes.
- Publication and unpublication.
- Inventory adjustments.
- Suspension and reinstatement.
- Retirement and deletion attempts.
- Permission and eligibility changes.

Each audit event should identify:

- Actor.
- Action.
- Affected entity.
- Timestamp.
- Store scope, where applicable.
- Relevant change context.
- Outcome.

Audit records must be protected from unauthorised modification.

## 16. Backend enforcement

Lifecycle and administration rules must be enforced by backend services and database constraints where appropriate.

The backend must not rely on:

- Hidden frontend buttons.
- Client-side role checks alone.
- Store identifiers supplied by the browser without validation.
- Product status displayed by the frontend.
- Assumptions that a user belongs to only one store.

Every sensitive operation must verify the actor, permission, entity, and applicable store scope.

The backend must also prevent invalid state transitions and concurrent updates from silently overwriting changes.

## 17. Notifications and operational feedback

The future workflow may notify relevant administrators when:

- A product submission is accepted or rejected.
- A source product is suspended.
- A source product is materially changed.
- A store listing requires review.
- A listing is published or unpublished.
- A product becomes unavailable to a store.
- A product is retired.

Notifications must respect store boundaries and administrative permissions.

Notification channels and delivery requirements remain separate implementation decisions.

## 18. Current and future capability distinction

| Capability | Current requirement | Future consideration |
|---|---|---|
| Shared Yotaabo and Poshies catalogue | Required | Extend to more stores |
| Product added by either store | Available to both listing workflows after acceptance | Configurable eligibility |
| Duplicate upload by second store | Not required | Import and assignment workflows |
| Independent store listings | Required | More detailed override policies |
| Independent publication | Required | Configurable approval workflows |
| Independent pricing | Required | Optional central commercial rules |
| Independent inventory | Required | Controlled transfers or central inventory |
| Source-product ownership | Must be distinguished from listing access | Expanded ownership models |
| Selected-store sharing | Not established as current functionality | Future capability |
| Platform-wide eligibility | Current two-store shared availability only | Broader platform capability |
| Ownership transfer | Not established | Future capability |
| Central catalogue approval | Subject to current verified permissions | Expanded governance |

## 19. Open decisions

The following matters require explicit decisions or implementation verification:

1. Which actors may approve catalogue submissions?
2. Who may edit source-product fields?
3. Who may replace or remove source-product media?
4. Who may suspend a source product?
5. Who may permanently delete a source product?
6. Which source fields may be overridden by individual stores?
7. What happens to existing listings after a source-product change?
8. What happens to published listings when a source product is suspended?
9. What happens to inventory and historical records when a product is retired?
10. What are the permitted listing lifecycle transitions?
11. What are the permitted source-product lifecycle transitions?
12. Which operations require approval or dual authorisation?
13. What notifications are required for material shared-catalogue changes?
14. What is the exact product admission workflow in the current application?

Record approved decisions in the relevant decision register. Do not treat this document as approval of unresolved authority or deletion rules.

## 20. Related documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`
- `../STORE_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../API_ARCHITECTURE.md`
- `../UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `../UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`

## 21. Document maintenance

Update this document when approved business rules or implementation decisions change product lifecycle behaviour or administrative authority.

When documenting implementation status:

1. Verify the relevant backend endpoint or service.
2. Verify permission enforcement.
3. Verify database constraints and relationships.
4. Verify the actual state transitions.
5. Verify the effect on both stores.
6. Record any difference between the intended architecture and the live implementation.

A documented workflow is not proof that the workflow has been implemented.
