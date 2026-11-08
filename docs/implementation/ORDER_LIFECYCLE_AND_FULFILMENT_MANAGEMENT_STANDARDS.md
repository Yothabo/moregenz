# Order Lifecycle and Fulfilment Management Standards

**Status:** DRAFT
**Version:** 0.1
**Last Updated:** 2026-11-07
**Document Owner:** Platform Owner
**Review Status:** Pending
**Classification:** Internal

## 1. Purpose

This document defines standards for recording, managing, fulfilling and closing customer orders across the multi-store platform.

The current operating model is WhatsApp-first. Customers discuss orders, payment arrangements and delivery with the relevant store through WhatsApp. Store personnel verify payment and coordinate fulfilment manually.

These standards establish a consistent order lifecycle without assuming integrated checkout, online payment processing or automated courier services.

## 2. Scope

These standards apply to:

- Order creation and recording.
- Store and customer attribution.
- Product and variant selection.
- Order confirmation.
- Price and quantity validation.
- Payment coordination and verification.
- Order preparation.
- Delivery and collection.
- Cancellations and amendments.
- Returns and refunds.
- Order history and reporting.
- Future order-processing integrations.

## 3. Core principles

- Every order belongs to one identifiable store.
- Orders must preserve the products, variants, quantities and agreed prices at the time of acceptance.
- Store personnel remain responsible for confirming customer agreements.
- Payment must be verified before an order is treated as paid.
- Fulfilment status must reflect actual operational progress.
- Inventory changes must follow the approved inventory rules.
- Historical orders must remain available after product or store changes.
- Order records must not be silently rewritten to conceal previous activity.
- The current WhatsApp-first model must remain supported without requiring payment gateway integrations.

## 4. Order ownership and attribution

Every order must have a unique internal identifier and an explicit store association.

The order must retain:

- Store identifier.
- Customer reference where available.
- Order identifier.
- Order creation timestamp.
- Responsible store or staff actor.
- Relevant product and variant references.
- Order status.
- Payment status.
- Fulfilment status.

Store attribution must be established and validated server-side.

A client-submitted store identifier must not independently determine order ownership.

A store must not view or modify another store's orders without explicit platform authorisation.

## 5. Order creation

An order may originate from a customer enquiry through WhatsApp or another approved customer communication channel.

Before accepting an order, store personnel must establish the agreed order details.

The order record should capture:

- Products.
- Variants.
- Quantities.
- Agreed unit prices.
- Discounts or adjustments.
- Currency.
- Applicable delivery charges.
- Agreed order total.
- Customer contact reference.
- Delivery or collection method.
- Relevant instructions.

Where the platform supports order creation, the backend must validate the submitted information before saving the order.

Orders coordinated outside the platform must follow the approved interim store recordkeeping process.

## 6. Order line integrity

Each order line must preserve the product information agreed at the time of the transaction.

Where applicable, retain:

- Product reference.
- Variant reference.
- Product name snapshot.
- Variant description snapshot.
- SKU snapshot.
- Quantity.
- Unit price.
- Discount.
- Line total.

Historical order lines must not change merely because the current product listing is edited.

Product deletion or discontinuation must not invalidate historical order information.

## 7. Pricing and totals

Order totals must be based on trusted business data.

- Store personnel must confirm the agreed price with the customer.
- The backend must calculate authoritative totals where order management is implemented.
- Client-submitted totals must not be trusted.
- Currency must be explicit.
- Discounts must follow approved store permissions and commercial rules.
- Delivery charges must be communicated before order acceptance.
- Any change to the agreed total must be communicated and accepted by the customer.
- Original order values must remain traceable after adjustments.

Financial calculations must use appropriate decimal or integer minor-unit representations rather than binary floating-point arithmetic.

## 8. Order confirmation

An order is confirmed only after the store and customer have agreed on the essential order details.

Confirmation should cover:

- Product and variant selection.
- Quantities.
- Prices and total.
- Payment arrangements.
- Delivery or collection arrangements.
- Relevant terms and expectations.

A product enquiry or unfinished WhatsApp discussion must not automatically be treated as a confirmed order.

Where a confirmation message is used, it should clearly identify the agreed order details.

## 9. Order lifecycle

The order lifecycle should distinguish commercial agreement, payment and fulfilment.

Suggested order states:

- Draft.
- Awaiting customer confirmation.
- Confirmed.
- Processing.
- Ready for collection or dispatch.
- Fulfilment in progress.
- Completed.
- Cancelled.
- On hold.

These states must not be confused with payment or delivery states.

### 9.1 Draft

The order is being prepared or discussed.

It is not yet an accepted customer commitment.

### 9.2 Awaiting customer confirmation

The store has proposed order details and is waiting for the customer to accept them.

Changes may still be made before confirmation.

### 9.3 Confirmed

The customer and store have agreed on the order details.

The order is now an accepted commercial commitment, subject to the agreed payment and fulfilment conditions.

### 9.4 Processing

The store has started the required preparation or fulfilment work.

### 9.5 Ready for collection or dispatch

The store has completed preparation and the order is ready for the agreed handover or delivery process.

### 9.6 Fulfilment in progress

The order has been handed over for delivery or is otherwise progressing through its agreed fulfilment process.

### 9.7 Completed

The customer has received the order or completed the agreed collection process.

Completion must be supported by an appropriate confirmation or operational record.

### 9.8 Cancelled

The order has been cancelled through an authorised process.

The original order and cancellation history must remain available.

### 9.9 On hold

The order cannot currently proceed because of a material issue requiring investigation or further action.

The reason and responsible party must be recorded.

## 10. Payment lifecycle

Payment status must be maintained separately from order status.

The current operating model uses payment arrangements communicated through WhatsApp and completed outside the platform.

Suggested payment states include:

- Not requested.
- Awaiting payment.
- Payment reported.
- Under verification.
- Verified.
- Disputed.
- Not received.
- Refund pending.
- Partially refunded.
- Refunded.

Only authorised store personnel may confirm externally completed payment.

An order must not be treated as paid solely because the customer reports making payment.

Online payment gateway statuses must not be introduced as current functionality before an approved provider integration exists.

## 11. Inventory coordination

Order confirmation and inventory handling must follow the inventory architecture.

- Product availability must be checked against the relevant store's inventory or approved manual process.
- A product listing does not prove that stock is available.
- Variant-level inventory must be respected.
- Inventory reservations, deductions and releases must follow approved business rules.
- Duplicate order processing must not cause duplicate inventory deductions.
- Cancelled orders must follow the approved stock restoration process.
- Cross-store inventory must not be used without an authorised transfer or allocation process.

Where the current WhatsApp-first process does not provide automated reservation, stores must manually verify stock before confirming availability.

## 12. Order preparation

Before preparation begins, the store must confirm:

- The order is valid.
- Product availability has been checked.
- Required payment conditions have been satisfied.
- Product and variant details are correct.
- Customer instructions are available.
- Delivery or collection arrangements are understood.

Before dispatch or collection, check:

- Correct products.
- Correct variants.
- Correct quantities.
- Acceptable product condition.
- Appropriate packaging.
- Required order references and delivery information.

Discrepancies must be resolved before handover.

## 13. Delivery and collection

Delivery is currently coordinated manually through WhatsApp.

Stores must communicate:

- Delivery or collection method.
- Relevant delivery charges.
- Delivery address or collection location.
- Expected delivery window where available.
- Relevant customer instructions.
- Delays or changes.
- Completion confirmation.

The store is responsible for ensuring that delivery commitments are realistic.

A dispatched order must not automatically be marked delivered.

Where a third-party courier is used, the store should preserve available tracking or delivery evidence.

## 14. Order amendments

Changes to confirmed orders must follow an authorised amendment process.

Examples include:

- Product replacement.
- Variant change.
- Quantity change.
- Price adjustment.
- Delivery address change.
- Delivery method change.
- Customer instruction update.

The process must:

1. Record the requested change.
2. Assess inventory and fulfilment impact.
3. Recalculate affected totals.
4. Communicate the revised details.
5. Obtain customer agreement.
6. Record the authorised amendment.
7. Update the order without losing its original history.

Changes affecting payment must follow the financial controls.

## 15. Cancellations

Cancellation requests must be assessed against the order's current state and applicable store terms.

- Record who requested the cancellation.
- Record the reason and timestamp.
- Determine whether preparation or dispatch has begun.
- Confirm whether payment was received.
- Determine whether inventory must be restored.
- Assess whether a refund or other adjustment is required.
- Communicate the outcome to the customer.

Cancellation must not delete the original order.

Any refund must follow the approved financial approval and verification process.

## 16. Returns and refunds

Returns and refunds must preserve the relationship between the original order and the subsequent adjustment.

- Record the returned product and quantity.
- Record the reason.
- Assess the product condition where relevant.
- Confirm the applicable store terms and legal requirements.
- Record the approved outcome.
- Update inventory only through authorised processes.
- Record any refund separately from the original payment.
- Communicate the outcome to the customer.

A returned item must not automatically be considered suitable for resale.

## 17. Customer communication

WhatsApp remains the current primary communication channel for order coordination.

Stores should communicate:

- Order confirmation.
- Payment instructions.
- Payment verification outcome.
- Preparation progress where relevant.
- Collection or delivery arrangements.
- Delays and exceptions.
- Cancellation or amendment outcomes.
- Completion confirmation.

Messages must be accurate and consistent with the actual order record.

The platform must not claim to have automatically sent or recorded a WhatsApp message unless that capability has been implemented and verified.

## 18. Exceptions and disputes

Orders may require investigation when:

- Payment cannot be verified.
- Product availability changes.
- The customer disputes the agreed price.
- The wrong product or variant is prepared.
- Delivery is delayed or unsuccessful.
- The customer reports missing or damaged items.
- An order is duplicated.
- An unauthorised amendment is suspected.
- Customer information may have been exposed.

Record the issue, preserve relevant evidence and escalate it through the appropriate support or incident process.

Do not resolve disputes by silently changing order or financial history.

## 19. Audit and history

Important order actions must be traceable.

Audit history should capture:

- Order creation.
- Confirmation.
- Material amendments.
- Status changes.
- Payment verification updates.
- Fulfilment transitions.
- Cancellation.
- Refund references.
- Responsible actors.
- Timestamps.
- Relevant reasons.

Historical records must remain accessible according to authorised permissions and retention requirements.

## 20. Future order-processing capabilities

The current operating model is intentionally manual and WhatsApp-first.

Future capabilities may include:

- Integrated online checkout.
- Payment provider integrations.
- Automated payment confirmation.
- Customer order portals.
- Automated order notifications.
- Courier integrations.
- Delivery tracking.
- Automated fulfilment workflows.
- Customer self-service cancellation or return requests.

These are future considerations and are not current platform commitments.

Any future implementation must preserve store isolation, financial attribution, transaction integrity, customer privacy and operational accountability.

## 21. Acceptance criteria

Order lifecycle management is acceptable when:

- Every order has a unique identifier and store attribution.
- Customer and store agreement is recorded.
- Order lines preserve historical product and price information.
- Order totals are validated.
- Order, payment and fulfilment statuses are distinct.
- Payment verification follows the current manual process.
- Inventory handling follows approved rules.
- Preparation and delivery are traceable.
- Amendments and cancellations preserve history.
- Refunds follow financial controls.
- Customer communication reflects actual operational progress.
- Store access boundaries are enforced.
- Historical order records are retained appropriately.

## 22. Outstanding decisions

The following require platform approval:

- Mandatory order fields.
- Order confirmation requirements.
- Final order and fulfilment status model.
- Manual order recording procedure.
- Inventory reservation policy.
- Payment verification evidence requirements.
- Order amendment permissions.
- Cancellation and return rules.
- Delivery evidence requirements.
- Order completion criteria.
- Future checkout and fulfilment integration roadmap.
