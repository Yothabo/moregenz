# Store Product Pricing and Promotions Management Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-OPS-7163346E9C |
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

This document defines how Store Owners set product prices, create promotions, manage discounts and communicate offers to customers.

The objective is to give each Store Owner meaningful control over their store's commercial decisions while maintaining pricing accuracy, customer transparency, financial accountability and platform-wide compliance.

## 2. Core Principles

1. Each store maintains independent selling prices.
2. A shared catalogue does not create shared pricing.
3. Store Owners control their own promotions within documented platform and legal requirements.
4. Prices must be accurate, understandable and visible before purchase.
5. Promotional claims must be genuine and verifiable.
6. Discounts must not create incorrect order totals or financial records.
7. Price changes must not silently alter existing orders.
8. Every price change and promotion must be auditable.
9. Parent company pricing restrictions must have a documented commercial or legal basis.
10. The platform must not advertise a discount that the customer cannot actually receive.

## 3. Pricing Responsibilities

### 3.1 Store Owner

The Store Owner is responsible for:

- Setting store-specific product prices.
- Reviewing supplier and sourcing costs.
- Considering packaging and fulfilment costs.
- Setting appropriate selling margins.
- Configuring promotional prices.
- Approving discount campaigns.
- Ensuring advertised prices are accurate.
- Reviewing price changes before publication.
- Monitoring product profitability.
- Honouring valid prices and promotions accepted by customers.

### 3.2 Parent Company

The parent company is responsible for:

- Maintaining the platform's pricing functionality.
- Enforcing documented pricing and promotional rules.
- Maintaining accurate order calculations.
- Preventing unauthorised price manipulation.
- Supporting campaign and promotional workflows.
- Maintaining financial and audit records.
- Identifying pricing errors and suspicious activity.
- Communicating platform-wide restrictions and their basis.

The parent company must not silently change a Store Owner's selling price.

### 3.3 Platform Administration

Platform administrators maintain:

- Currency configuration.
- Decimal precision.
- Tax calculation rules.
- Discount calculation rules.
- Promotion eligibility logic.
- Price validation.
- Order price snapshots.
- Audit history.
- Permissions and approval workflows.

## 4. Store-Specific Pricing

Every store listing must maintain its own selling price.

The same catalogue product may have different prices across stores because of differences in:

- Supplier arrangements.
- Sourcing costs.
- Operating costs.
- Target customers.
- Market positioning.
- Fulfilment arrangements.
- Commercial strategy.

The platform must not automatically synchronise selling prices between stores.

A change to Store A's selling price must not modify Store B's price.

## 5. Pricing Components

The platform should distinguish the following values where applicable:

- Supplier or acquisition cost.
- Landed product cost.
- Store selling price.
- Promotional price.
- Discount amount.
- Tax amount.
- Delivery or fulfilment charge.
- Payment processing charge.
- Final customer payable amount.

These values must not be treated as interchangeable.

Private supplier costs and internal margin information must only be accessible to authorised users.

## 6. Price Configuration

When setting a selling price, the dashboard must allow the Store Owner to:

- Enter the selling price.
- Select the applicable currency where supported.
- Configure variant-specific prices where necessary.
- Review the displayed customer price.
- Save changes as a draft where supported.
- Publish the updated price.

The platform must validate that:

- The price is numeric.
- The price is greater than zero unless an authorised exception applies.
- Decimal precision follows the configured currency.
- The product listing is valid.
- The Store Owner has permission to change the price.
- The price complies with applicable platform restrictions.

The system must not silently round or alter a submitted price without displaying the resulting value.

## 7. Price Change Behaviour

A price change applies to future purchases after the change becomes effective.

It must not silently rewrite:

- Existing orders.
- Completed transactions.
- Historical invoices.
- Previous payment records.
- Previously issued receipts.

If a customer has already submitted an order, the order must retain its recorded price unless a lawful and documented adjustment is made through an authorised process.

The platform should record:

- Previous price.
- New price.
- Store listing.
- Actor.
- Effective timestamp.
- Reason where required.
- Approval reference where applicable.

## 8. Promotional Pricing

Store Owners may create temporary promotional prices for eligible products.

A promotion should include:

- Promotion name.
- Description.
- Applicable store.
- Eligible products or categories.
- Eligible variants.
- Promotion type.
- Discount value.
- Start date and time.
- End date and time.
- Eligibility conditions.
- Usage limits where applicable.
- Customer restrictions where applicable.
- Publication status.

Promotion types may include:

- Fixed amount discount.
- Percentage discount.
- Temporary promotional price.
- Bundle offer.
- Multi-item offer.
- Category-wide discount.
- Store-wide promotion.
- Approved coupon or voucher.

The platform must clearly show which products and customers qualify.

## 9. Promotional Price Validation

Before activation, the platform must validate:

- The promotion belongs to the correct store.
- Eligible products are active.
- The promotion dates are valid.
- The discount value is valid.
- The resulting price is not negative.
- The promotion does not conflict with another incompatible promotion.
- The promotional terms are clear.
- Required legal pricing information is available.

Where multiple discounts may apply, the platform must use an explicit, predictable calculation order.

The customer must see the final payable amount before confirming the purchase.

## 10. Reference Prices and Discount Claims

The platform must not allow misleading reference prices.

Where a product is displayed with an original price and a discounted price, the original price must have a genuine and supportable basis.

The platform must retain sufficient pricing history to substantiate promotional claims where required.

Store Owners must not:

- Artificially inflate a price immediately before a promotion.
- Advertise a discount that does not exist.
- Use a false original price.
- Display an expired promotion as active.
- Hide mandatory conditions.
- Misrepresent the quantity or duration of an offer.

Promotional pricing must comply with applicable South African consumer protection and advertising requirements.

## 11. Coupons and Vouchers

Where coupon functionality is supported, each coupon must define:

- Unique code.
- Issuing store.
- Discount type.
- Discount value.
- Start and end dates.
- Eligible products.
- Minimum order value where applicable.
- Maximum discount where applicable.
- Usage limit.
- Customer eligibility.
- Whether it can be combined with other offers.
- Redemption status.

Coupon codes must be validated server-side.

The platform must prevent:

- Unauthorised reuse.
- Exceeding redemption limits.
- Cross-store redemption without permission.
- Expired coupon redemption.
- Invalid discount stacking.
- Manipulation of coupon values through frontend requests.

## 12. Bundle and Multi-Product Offers

Bundle promotions may include:

- Buy multiple items for a fixed price.
- Buy one product and receive another at a discount.
- Purchase a qualifying combination.
- Category-specific bundles.

The platform must clearly define:

- Required products.
- Required quantities.
- Eligible variants.
- Discount calculation.
- Stock availability.
- Substitution rules where applicable.
- Refund treatment.

Each participating product must retain its own store and inventory relationship.

Bundle orders must preserve enough line-item detail for fulfilment, refunds and reconciliation.

## 13. Promotion Scheduling

Promotions must follow their configured effective dates.

The platform must:

- Activate promotions at the configured start time.
- Deactivate promotions at the configured end time.
- Use the platform's documented timezone rules.
- Handle daylight-saving differences where relevant.
- Prevent expired offers from remaining purchasable.
- Record activation and expiry events.

A failed scheduled activation or expiry must be visible to authorised administrators.

The platform must not rely solely on a browser countdown or frontend timer to enforce promotion validity.

## 14. Advertising and Campaign Alignment

Promotional prices used in marketing campaigns must match the actual store listing and checkout calculation.

Before publishing campaign material, the responsible team must verify:

- Product eligibility.
- Current selling price.
- Promotional price.
- Start and end dates.
- Stock availability.
- Customer eligibility.
- Terms and conditions.
- Advertising content.

If a Store Owner changes or withdraws a promotion after campaign material has been prepared, the campaign team must be notified.

Marketing content must not continue advertising an expired or withdrawn offer.

## 15. Customer Price Presentation

The storefront and checkout must clearly communicate:

- Current selling price.
- Promotional price where applicable.
- Discount amount or percentage where applicable.
- Promotion conditions.
- Delivery charges where known.
- Applicable taxes or tax treatment.
- Final payable amount.

Mandatory charges must not be hidden until after the customer has committed to purchase.

Any price change between product selection and checkout must be handled transparently.

The customer must be shown the updated total before confirming the order.

## 16. Order Price Snapshot

At order creation, the platform must preserve the applicable pricing information.

The order should retain:

- Product identifier.
- Store listing identifier.
- Product variant.
- Quantity.
- Unit price.
- Applied discount.
- Promotion reference.
- Tax treatment.
- Delivery charge.
- Other applicable charges.
- Line total.
- Final order total.
- Currency.
- Pricing calculation timestamp.

Historical order calculations must remain reproducible even after the product price or promotion changes.

## 17. Refunds, Cancellations and Promotion Reversals

Refund and cancellation calculations must use the actual order price snapshot.

The platform must not recalculate a historical purchase using today's product price.

Where a promotion involved multiple products or bundle conditions, the refund process must follow the documented promotion and refund rules.

The system must retain:

- Original order total.
- Original discount.
- Refunded amount.
- Remaining order value.
- Promotion adjustment where applicable.
- Reason for the adjustment.
- Authorising actor.
- Timestamp.

Refunds must be handled through the existing order and financial reconciliation procedures.

## 18. Price Approval and Restrictions

Store Owners should be able to manage ordinary product prices and promotions without unnecessary approval delays.

Additional approval may be required for:

- Platform-wide promotions.
- Parent-company-funded discounts.
- Multi-store campaigns.
- Promotions using centrally funded advertising.
- Exceptional pricing arrangements.
- Restricted product categories.
- Campaigns with shared financial liability.

Any restriction must be documented and communicated.

The parent company must distinguish between:

- A legal or regulatory restriction.
- A platform-wide technical limitation.
- A contractual commercial restriction.
- A voluntary recommendation.

Recommendations must not be presented as mandatory rules.

## 19. Promotion Funding and Cost Allocation

Every promotion must identify who funds the discount.

Possible funding arrangements include:

- Store-funded discount.
- Parent-company-funded discount.
- Jointly funded promotion.
- Supplier-funded promotion.
- Sponsored campaign discount.

The funding arrangement must be agreed before activation.

Where the parent company contributes financially, the agreement must define:

- Contribution amount or percentage.
- Maximum exposure.
- Eligible products.
- Campaign period.
- Settlement treatment.
- Responsibility for refunds and cancellations.
- Reporting requirements.

Advertising expenditure must remain separate from the discount itself and from marketing service fees.

## 20. Permissions and Store Isolation

Store Owners may only manage prices and promotions belonging to their assigned store.

The platform must enforce this restriction server-side.

Store Owners must not be able to:

- Change another store's prices.
- Create promotions for another store.
- Redeem another store's private coupon.
- View another store's private pricing history.
- Access another store's supplier costs.
- Change global pricing configuration.
- Modify centrally controlled promotional rules without permission.

Parent-company administrators must have clearly defined permissions for centrally managed campaigns and funding arrangements.

## 21. Audit and Activity Records

The platform must record:

- New selling price.
- Previous selling price.
- Promotional price creation.
- Promotion modification.
- Promotion activation.
- Promotion expiry.
- Promotion cancellation.
- Coupon creation.
- Coupon redemption.
- Discount application.
- Price override.
- Approval or rejection.
- Funding arrangement changes.

Each record should include:

- Event ID.
- Store ID.
- Product or listing ID.
- Promotion ID where applicable.
- Actor ID.
- Actor role.
- Action.
- Previous value.
- New value.
- Reason where required.
- Timestamp.
- Approval reference where applicable.

Audit records must be protected against unauthorised modification.

## 22. Reporting and Monitoring

Store Owners should be able to review:

- Current product prices.
- Upcoming promotions.
- Active promotions.
- Expired promotions.
- Discounted sales.
- Promotion redemption.
- Gross sales before discounts.
- Discounts granted.
- Net sales after discounts.
- Product-level promotional performance.

The parent company may review platform-wide promotion activity and shared campaign performance.

Reports must preserve store-level financial separation and must not expose another store's private financial information.

## 23. Error Handling and Recovery

The platform must handle:

- Invalid prices.
- Invalid discount values.
- Expired promotions.
- Overlapping promotions.
- Conflicting coupon rules.
- Insufficient stock.
- Failed scheduled activation.
- Failed scheduled expiry.
- Concurrent price updates.
- Invalid store permissions.
- Checkout price changes.
- Duplicate coupon redemption.
- Partial promotion application.

Pricing and discount calculations must be performed and validated server-side.

The platform must not trust a final amount supplied by the browser.

Failed operations must not leave partially active promotions or inconsistent order totals.

## 24. Testing Requirements

The implementation must test:

1. Store A can set a price independently of Store B.
2. Store A price changes do not affect Store B.
3. Existing orders retain their original price snapshots.
4. Promotional prices activate at the configured time.
5. Expired promotions cannot be redeemed.
6. Percentage discounts calculate correctly.
7. Fixed amount discounts calculate correctly.
8. Invalid discounts are rejected.
9. Coupon usage limits are enforced.
10. Coupon redemption is isolated by store.
11. Bundle calculations preserve line-item detail.
12. Conflicting promotions follow documented rules.
13. Checkout displays the correct final amount.
14. Refund calculations use historical order pricing.
15. Parent-company-funded promotions follow their funding agreement.
16. Store Owners cannot modify another store's pricing.
17. Price changes are recorded in the audit history.
18. Scheduled promotion failures are detected.
19. Concurrent updates do not produce inconsistent prices.
20. Frontend manipulation cannot alter server-calculated totals.

## 25. South African Compliance

The platform and participating stores must comply with applicable South African consumer protection, electronic communications, advertising, tax and pricing requirements.

The compliance implementation must be reviewed against current legislation and authoritative guidance, including the Consumer Protection Act and applicable regulations.

Where a product or promotion has specific disclosure requirements, those requirements must be identified before publication.

The platform must not treat a generic pricing disclaimer as a substitute for legally required disclosures.

Legal and tax advice should be obtained where the applicable treatment is uncertain.

## 26. Implementation Guidance

Before implementation:

- Review existing product pricing fields.
- Review order price snapshots.
- Review promotion and coupon functionality.
- Review payment and refund calculations.
- Review tax configuration.
- Review store-level permissions.
- Review existing financial reconciliation standards.
- Confirm how the storefront displays promotional prices.

Avoid creating duplicate pricing or promotion systems where existing platform functionality already supports the required behaviour.

Any schema changes must include migrations, data integrity constraints, appropriate indexes, rollback considerations and automated tests.

## 27. Governing Rule

Each Store Owner controls the commercial pricing and promotional strategy of their own store within applicable legal, contractual and platform requirements.

The parent company provides the infrastructure, validation, financial controls and shared campaign support.

Every displayed price must be genuine, every promotion must be enforceable, and every completed order must preserve the exact pricing terms accepted by the customer.
