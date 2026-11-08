# Commerce Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-2EA763DE29 |
| Category | Architecture |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the commerce architecture for the multi-store retail platform.

It establishes how customers interact with participating store offerings and how commercial transactions are processed, recorded and managed.

The architecture covers:

- Storefront purchasing journeys.
- Shopping carts.
- Checkout and order creation.
- Product availability and pricing.
- Promotions and discounts.
- Payment initiation and confirmation.
- Order lifecycle and fulfilment.
- Cancellations, refunds and returns.
- Transaction integrity and reconciliation.
- Store and platform commercial boundaries.
- Commerce security, auditability and migration.

The document defines architectural responsibilities and controls. It does not approve specific payment providers, commercial terms, legal policies or fulfilment arrangements that remain undecided.

## 2. Architectural Objectives

The commerce architecture must:

- Support multiple participating stores within one platform.
- Preserve the commercial identity and operational boundaries of each store.
- Ensure each order belongs to one store.
- Prevent customers from purchasing unavailable stock.
- Preserve the prices and product details agreed at the time of purchase.
- Prevent duplicate orders, charges, refunds or fulfilment actions.
- Maintain reliable payment and order state transitions.
- Support payment providers through controlled integration boundaries.
- Preserve financial separation between stores and the platform.
- Provide traceable records for commercial activity.
- Support incremental migration from the existing Yotaabo application.
- Protect existing customer, product and transaction data.

Commerce operations must remain understandable, recoverable and auditable.

## 3. Commerce Architecture Principles

### 3.1 Store-specific commerce

Each store operates its own commercial transaction context.

A customer purchase must be associated with the relevant store, its product listings, prices, availability and fulfilment arrangements.

The initial architecture treats an order as belonging to one store. A multi-store cart or checkout that combines different stores is not assumed.

### 3.2 Trusted server-side processing

The backend is authoritative for:

- Product and listing eligibility.
- Store context.
- Price calculation.
- Discount eligibility.
- Stock availability.
- Order creation.
- Payment state.
- Refund state.
- Fulfilment state.
- Financial transaction records.

Frontend calculations may support presentation but must never establish authoritative commercial values.

### 3.3 Transaction integrity

Commerce operations must preserve consistency across orders, inventory, payments and financial records.

Where an operation spans multiple records or domains, the backend must define the required transaction boundary, failure handling and recovery behaviour.

### 3.4 Explicit state transitions

Orders, payments, refunds and fulfilment must use defined states and permitted transitions.

A client request, browser redirect or provider callback must not directly assign an arbitrary transaction state.

### 3.5 Idempotent processing

Operations that may be retried must use suitable idempotency controls.

Repeated requests or provider notifications must not create duplicate commercial effects.

### 3.6 Historical accuracy

Completed commercial records must preserve the information that applied when the transaction occurred.

Later changes to products, listings, prices, customer details or store configuration must not silently rewrite historical transactions.

### 3.7 Human-authorised exceptions

Material financial adjustments, disputed transactions and exceptional commercial decisions must follow approved authority and review processes.

Automated processing may apply explicitly approved operational rules but must not independently make material financial or governance decisions based solely on calculated scores.

## 4. Commerce Domain Boundaries

Commerce is a logical application domain responsible for coordinating the customer purchasing lifecycle.

It works with other application domains through defined interfaces.

### 4.1 Commerce responsibilities

The Commerce domain coordinates:

- Cart validation.
- Checkout preparation.
- Order creation.
- Order item snapshots.
- Payment initiation requests.
- Payment status coordination.
- Cancellation requests.
- Refund requests.
- Fulfilment status coordination.
- Customer-facing order information.

### 4.2 Related domain responsibilities

The following responsibilities remain outside the Commerce domain:

| Domain | Responsibility |
|---|---|
| Identity and Access | Customer and staff identity, authentication and permissions |
| Stores | Store identity, status and operational configuration |
| Products | Source product identity and descriptive information |
| Catalogue | Store product listings and commercial availability |
| Inventory | Stock balances, reservations and movements |
| Customers | Customer records and permitted customer information |
| Payments and Integrations | Provider communication, callbacks and payment verification |
| Finance | Financial records, settlement, commissions and reconciliation |
| Notifications | Transactional communication |
| Activity and Audit | Accountability and traceable business activity |

Commerce may coordinate these domains but must not bypass their ownership rules.

### 4.3 Domain ownership and consistency

Each domain must remain authoritative for the data it owns.

Commerce must not maintain independent copies of inventory balances, payment-provider truth or financial ledger balances as competing sources of authority.

Where a commerce operation requires data from another domain, the relevant interface and consistency requirements must be defined.

## 5. Store and Transaction Context

### 5.1 Store ownership of orders

Every order must belong to exactly one participating store.

The store identifier must be established and validated by the backend using trusted application context.

A frontend-supplied store identifier is input, not proof of authority or eligibility.

### 5.2 Store-specific commercial terms

The following must be resolved in the context of the selected store:

- Product listing.
- Selling price.
- Currency.
- Promotion eligibility.
- Stock availability.
- Fulfilment options.
- Applicable delivery charges.
- Applicable taxes and fees.
- Customer-facing policies.

The platform must not assume that stores share prices, stock, promotions or fulfilment rules.

### 5.3 Cross-store purchasing

The initial architecture does not assume that one order can contain items from multiple stores.

A future multi-store shopping experience would require explicit decisions about:

- Separate or combined orders.
- Separate payments or payment allocation.
- Delivery and fulfilment boundaries.
- Refund allocation.
- Customer communication.
- Platform fees and financial settlement.
- Failure handling across participating stores.

Until those decisions are approved, checkout must remain store-specific.

### 5.4 Store lifecycle restrictions

A store that is suspended, deactivated or otherwise restricted must not continue accepting new purchases where its current operational state prohibits sales.

Existing orders, payments, refunds, financial records and obligations must remain accessible to authorised users for their permitted purposes.

Store deactivation must not automatically erase or invalidate historical commercial records.

## 6. Product Eligibility and Commercial Data

### 6.1 Product and listing validation

A product being present in the platform catalogue does not automatically make it purchasable by every store.

Before checkout, the backend must verify:

- The product exists and is valid.
- The relevant store listing exists.
- The listing belongs to the selected store.
- The listing is active and eligible for sale.
- The product is permitted for the requested transaction.
- The current selling price is valid.
- Required product options or variations are valid.
- Inventory availability satisfies the purchase requirements.

The backend must not rely on stale storefront data as proof of eligibility.

### 6.2 Ownership and commercial authority

Product source ownership, store listing authority and transaction ownership are separate concerns.

A store may manage its own permitted commercial terms and availability without gaining unrestricted authority to change source product identity or descriptive information owned elsewhere.

Commerce must preserve those boundaries when creating order snapshots.

### 6.3 Transaction-time product snapshots

An order item must preserve the relevant product and listing information as it applied when the order was placed.

Depending on the product and transaction, the snapshot may include:

- Product identifier.
- Store listing identifier.
- Product name.
- Product description or selected descriptive details.
- SKU or product reference.
- Selected variation or options.
- Quantity.
- Unit price.
- Discount allocation.
- Applicable tax and fee information.
- Currency.

The snapshot must not replace the underlying product or listing record. It preserves the historical transaction context.

### 6.4 Product changes after purchase

Changes to a product or listing must not silently alter an existing order.

Where a post-purchase change affects an unfulfilled order, the system must use an explicit amendment, cancellation or customer-resolution process.

The original transaction values must remain traceable.

## 7. Cart Architecture

### 7.1 Cart purpose

A cart represents a customer's intended purchase before an order is created.

It is not a financial transaction, confirmed order or stock reservation unless a separately approved mechanism explicitly establishes such behaviour.

### 7.2 Store-specific cart

A cart must be associated with a clear store context.

The initial implementation must prevent items from different stores from being combined into one checkout transaction.

If a customer changes store context, the application must not silently reinterpret existing cart items as belonging to another store.

### 7.3 Cart contents

A cart item may reference:

- Store.
- Product.
- Store listing.
- Selected product variation or options.
- Requested quantity.
- Customer-selected configuration.

The backend must revalidate all references and commercial values before order creation.

### 7.4 Cart pricing

Displayed cart totals are estimates until checkout validation is completed.

The frontend may calculate indicative totals for usability, but the backend must independently calculate authoritative amounts.

Client-supplied prices, discounts, delivery charges, taxes and totals must not be trusted.

### 7.5 Cart persistence

Cart persistence must support the approved customer identity and session model.

The platform must decide whether anonymous carts, authenticated carts or both are supported.

Cart persistence must not create an unintended cross-store customer data relationship.

### 7.6 Cart expiration and stale items

The architecture must support handling of:

- Removed or deactivated listings.
- Changed prices.
- Unavailable stock.
- Invalid product options.
- Expired promotions.
- Inactive stores.
- Expired customer sessions.

The customer must receive a clear explanation when an item can no longer be purchased as originally selected.

### 7.7 Cart modification

Adding, removing or changing quantities must validate the relevant store and product references.

Cart changes must not directly modify inventory balances or create financial records.

## 8. Checkout Architecture

### 8.1 Checkout purpose

Checkout converts a validated cart into a proposed commercial transaction.

It must establish the final transaction context before order creation and payment processing.

### 8.2 Checkout validation

The backend must validate:

- Store status and sales eligibility.
- Product and listing eligibility.
- Product options and variations.
- Quantity limits where configured.
- Current prices.
- Promotion eligibility.
- Stock availability.
- Customer information required for the transaction.
- Delivery or collection details where applicable.
- Applicable fees, taxes and charges.
- Currency consistency.
- Any store-specific checkout requirements.

Validation must be performed using authoritative server-side data.

### 8.3 Price calculation

The backend must calculate the transaction total from validated line items and applicable charges.

The calculation must define:

- Unit prices.
- Quantities.
- Line totals.
- Discount allocation.
- Delivery charges.
- Other approved fees.
- Tax treatment.
- Final payable amount.
- Currency and rounding rules.

The same calculation rules must be used consistently when preparing, confirming and recording the transaction.

The platform must not assume tax rates, tax registration status or legal treatment without approved business and professional guidance.

### 8.4 Checkout review

Before the customer confirms the purchase, the checkout response must present the material transaction details.

These should include the selected store, items, quantities, prices, discounts, applicable charges, delivery or collection information and final payable amount.

Where the transaction changes before confirmation, the customer must be informed and asked to accept the revised details where required.

### 8.5 Order creation boundary

An order must be created through a controlled backend operation.

The operation must validate the checkout context again or use a safely persisted, time-limited checkout representation whose validity is explicitly enforced.

Order creation must not rely solely on values previously calculated or submitted by the browser.

### 8.6 Checkout expiration

If a checkout session or quote expires, the backend must revalidate the transaction before allowing order creation.

Expired checkout data must not be treated as authority for current prices, promotions or stock availability.

### 8.7 Checkout failure

A checkout failure must not leave an apparently successful order or payment without a traceable state.

Where a failure occurs after some operations have succeeded, the system must preserve the outcome and provide a controlled recovery path.

## 9. Pricing, Promotions and Discounts

### 9.1 Pricing authority

The relevant store listing is the source of the store's applicable selling price, subject to approved platform rules.

The backend must resolve the price using the store and listing context.

The platform must not assume that a source product's descriptive record is itself the store's selling price.

### 9.2 Price representation

Prices must use an appropriate precise representation for monetary values.

Floating-point arithmetic must not be used as the authoritative method for financial calculations.

Currency must be explicit and consistently validated throughout the transaction.

### 9.3 Price changes

A price change must affect new validated transactions according to the applicable rules.

It must not silently rewrite the price recorded on an existing order.

Where a price changes during checkout, the backend must apply the approved checkout validity policy and communicate any material change to the customer before purchase confirmation.

### 9.4 Promotions

Promotions must be associated with an explicit owner and scope.

A promotion may be store-specific or platform-managed, but its authority and permitted application must be defined.

The system must validate:

- Promotion status and validity period.
- Eligible stores and products.
- Customer eligibility where applicable.
- Minimum purchase requirements.
- Usage limits.
- Combination or stacking rules.
- Discount calculation.
- Currency compatibility.

A promotion must not be applied solely because the frontend submits a promotion code or discount amount.

### 9.5 Discount allocation

Discounts applied to an order must be recorded in a way that preserves the resulting line-level and order-level financial values.

Where discounts affect refunds, commissions, taxes or settlement, the allocation method must be consistently defined.

### 9.6 Unresolved commercial policies

The following require explicit business decisions before implementation:

- Who may create and approve promotions.
- Whether platform promotions can be funded by stores, the platform or both.
- Promotion stacking rules.
- Maximum discount limits.
- Promotion usage and customer eligibility rules.
- Price-change handling during an active checkout.
- Tax and fee treatment.
- Rounding and allocation policy.

These rules must remain configurable or deferred until approved. They must not be invented as fixed platform policy.


## 10. Order Architecture

### 10.1 Order purpose

An order is the durable commercial record created from a validated customer purchase.

It records the agreed transaction between the customer and the relevant store.

An order is distinct from:

- A shopping cart.
- A checkout session.
- A payment attempt.
- A payment-provider transaction.
- An inventory reservation.
- A fulfilment request.
- A financial settlement record.

These records may be related, but they must not be treated as interchangeable.

### 10.2 Order ownership

Every order must belong to exactly one store.

The backend must establish the store relationship using validated transaction context.

An order must not be reassigned to another store through ordinary administrative editing.

Any exceptional correction to transaction ownership must follow a controlled, authorised and auditable process.

### 10.3 Order creation

Order creation must be performed by an authoritative backend operation.

The operation must:

- Validate the store and its sales status.
- Validate product listings and selected options.
- Recalculate prices and applicable charges.
- Confirm the required customer and fulfilment information.
- Validate inventory availability.
- Apply approved promotion rules.
- Persist transaction-time snapshots.
- Establish the initial order state.
- Record the relevant activity.
- Coordinate any required inventory reservation.

Order creation must be idempotent where retries could otherwise create duplicate orders.

### 10.4 Order reference

Each order must have a unique, non-guessable public reference suitable for customer-facing communication.

Internal database identifiers and public references must remain distinct where appropriate.

A public order reference must not grant access to an order without the required customer or staff authorisation.

### 10.5 Order contents

An order must preserve:

- Store identity.
- Customer reference where applicable.
- Order items and quantities.
- Product and listing snapshots.
- Unit prices and line totals.
- Discounts and allocations.
- Delivery charges and other applicable fees.
- Tax information where applicable.
- Currency.
- Final payable amount.
- Customer-provided fulfilment details.
- Creation timestamp.
- Relevant transaction references.
- Applicable policy or terms version where required.

The order must preserve the commercial values agreed at purchase time.

### 10.6 Order state

The order lifecycle must use explicit states and permitted transitions.

The target model may include:

- Pending confirmation.
- Awaiting payment.
- Payment processing.
- Confirmed.
- Processing.
- Ready for collection or dispatch.
- Partially fulfilled.
- Fulfilled.
- Completed.
- Cancellation requested.
- Cancelled.
- Partially refunded.
- Refunded.
- Failed or expired where applicable.

The exact state vocabulary and transition rules must be defined during implementation.

Not every order will use every state. For example, collection and delivery may require different fulfilment transitions.

### 10.7 State transition authority

Only authorised backend operations may change order state.

Each transition must validate:

- Current state.
- Requested next state.
- Actor identity or trusted system identity.
- Store context.
- Relevant payment and inventory conditions.
- Required permissions.
- Applicable business rules.

The frontend must not directly assign order states.

A transition must preserve the previous state and relevant reason or evidence in the activity history.

### 10.8 Order amendments

Changes to an order after creation must follow explicit amendment rules.

The system must distinguish between:

- Correcting non-financial administrative information.
- Changing quantities or products.
- Changing fulfilment details.
- Changing transaction values.
- Cancelling items.
- Recording refunds.

Material changes must not overwrite the original transaction evidence.

Where a change affects the payable amount, payment, inventory, tax or settlement, the corresponding domains must be coordinated.

### 10.9 Historical order preservation

Orders and their associated transaction records must remain available according to approved retention requirements.

Product, customer, store or employee changes must not silently remove the evidence needed to understand a historical transaction.

## 11. Inventory and Order Coordination

### 11.1 Inventory authority

The Inventory domain remains authoritative for stock balances, reservations and stock movements.

Commerce must request inventory operations through defined interfaces.

It must not maintain a separate competing stock balance.

### 11.2 Availability validation

Inventory availability must be checked before an order is confirmed under the applicable purchasing policy.

The check must use the correct store and product relationship.

Stock held by one store must not be treated as available to another store merely because the underlying product is shared.

### 11.3 Inventory reservation

The platform may reserve inventory during checkout or order creation, subject to an approved reservation policy.

The reservation policy must define:

- When stock is reserved.
- Reservation expiry.
- Whether payment must be completed before confirmation.
- What happens when payment remains pending.
- How reservations are released.
- How failed or abandoned checkout attempts are handled.
- How concurrent purchases are prevented from overselling stock.

A reservation must be represented explicitly and must not be confused with a completed stock deduction.

### 11.4 Atomicity and concurrency

The backend must prevent concurrent transactions from successfully purchasing stock that is no longer available.

The Inventory domain must implement appropriate transactional or concurrency controls.

Where order creation and inventory reservation span different processing boundaries, the application must define reliable coordination and recovery behaviour.

### 11.5 Stock deduction

The point at which stock is deducted must follow an approved inventory policy.

The system must distinguish reservation, allocation, dispatch, collection and completed fulfilment where those events have different inventory consequences.

A payment success notification alone must not be assumed to prove that goods have been dispatched or collected.

### 11.6 Reservation release

Reservations must be released when their governing conditions are no longer met.

Examples include:

- Checkout expiration.
- Payment failure.
- Order cancellation.
- Reservation timeout.
- Administrative resolution of an abandoned transaction.

Release operations must be idempotent and recorded.

### 11.7 Stock movement history

Inventory changes resulting from commerce must create the appropriate inventory movement records.

The movement must be attributable to the store, product, quantity, reason and relevant order or transaction.

Historical inventory movements must not be silently overwritten to correct an error.

Corrections must use authorised adjustment records.

### 11.8 Inventory exceptions

Where an order cannot be fulfilled because stock is unavailable or inaccurate, the system must support a controlled exception process.

The process may require customer communication, partial fulfilment, substitution, cancellation or refund.

The system must not silently substitute products or alter agreed quantities.

## 12. Payment Architecture

### 12.1 Payment domain boundary

Payment-provider communication belongs to the Payments and Integrations responsibilities.

Commerce coordinates the business transaction and consumes trusted payment outcomes through defined interfaces.

The application must distinguish:

- Order.
- Payment attempt.
- Provider transaction.
- Payment confirmation.
- Refund.
- Settlement.
- Financial ledger entry.

These records represent different stages and responsibilities.

### 12.2 Provider independence

The architecture must support payment providers through controlled integration adapters or equivalent boundaries.

Provider-specific request formats, credentials, response formats and callback details must not spread throughout the Commerce domain.

The payment-provider choice remains an open business and technical decision.

### 12.3 Payment initiation

Payment initiation must occur through an authorised backend operation.

The backend must establish:

- The relevant order.
- Store context.
- Amount and currency.
- Payment method or provider.
- Unique payment attempt reference.
- Idempotency key where supported.
- Provider transaction reference when available.

The amount submitted to the provider must come from authoritative order data, not a client-supplied total.

### 12.4 Payment attempts

A single order may have more than one payment attempt where the approved payment policy permits retries or alternative methods.

Each attempt must have its own identity and traceable provider references.

The system must distinguish a failed attempt from a failed order.

A new attempt must not duplicate a charge that may already have succeeded.

### 12.5 Payment states

The payment model must support explicit states such as:

- Created.
- Initiated.
- Pending.
- Processing.
- Succeeded.
- Failed.
- Cancelled.
- Expired.
- Reversed.
- Partially refunded.
- Refunded.
- Unknown or requiring verification.

The exact state model must be aligned with the selected provider's capabilities and the platform's business requirements.

### 12.6 Payment confirmation

A payment must not be considered successful solely because:

- The customer returns to a success page.
- The browser displays a success message.
- The frontend submits a success flag.
- A client-controlled redirect contains a transaction identifier.
- A request times out after payment initiation.

Payment confirmation must be based on trusted provider evidence or a verified server-to-server status enquiry.

### 12.7 Uncertain payment outcomes

A timeout or interrupted response may leave the payment outcome unknown.

The system must not assume that the provider failed to process the payment.

Before initiating another charge, the backend must query or reconcile the existing attempt using its idempotency key or provider transaction reference.

The customer must not be charged again merely because the application did not receive the original response.

### 12.8 Payment failure

A failed payment must be recorded with the relevant provider response and internal reason where available.

Sensitive provider details must be filtered before storage or logging.

A failed attempt must not automatically erase the order or its history.

The order's next state must follow the approved order and payment policies.

### 12.9 Payment allocation

Payments must be associated with the correct order and store.

Where a provider account is shared across multiple stores, trusted internal mappings must support attribution of charges, refunds, fees and settlements.

A store identifier supplied only in a browser request or unverified provider payload must not establish payment ownership.

### 12.10 Payment security

Payment handling must minimise exposure to sensitive payment data.

Where supported, hosted or tokenised provider flows should be used.

The application must not store full card numbers, card verification values or raw payment credentials unless a separately approved architecture and compliance assessment explicitly requires it.

Payment tokens and provider references must be treated as sensitive data.

### 12.11 Payment-provider failure

Provider outages, delayed responses and callback failures must not result in fabricated payment success or uncontrolled duplicate attempts.

The application must preserve the attempt state, provide safe retry behaviour and support later reconciliation.


### 12.12 Payment disputes and chargebacks

Payment disputes and chargebacks must be treated as distinct financial and operational events, not as ordinary refund requests.

A dispute may be initiated by a customer through a payment provider, card issuer or other applicable payment channel, including after an order has been fulfilled.

The architecture must support:

- Recording the dispute and its provider reference.
- Linking the dispute to the original payment, order and store.
- Recording the disputed amount and currency.
- Recording the dispute reason and available provider information.
- Recording notification and response timestamps.
- Tracking evidence requirements and submission deadlines.
- Recording evidence submitted and the responsible actor.
- Tracking dispute outcomes and financial consequences.
- Reconciling provider adjustments, fees and reversals.

Dispute notifications must be authenticated and processed through trusted integration boundaries. Unverified callback data must not establish a valid dispute or authorise a financial adjustment.

Each dispute must have an explicit lifecycle, with states appropriate to the provider's process, such as received, under review, evidence required, evidence submitted, won, lost, withdrawn or closed.

The system must preserve the original payment and order records. A dispute must not automatically cancel an order, reverse fulfilment or restore inventory.

Evidence must be associated with the relevant transaction and protected according to applicable access, privacy and retention requirements. Evidence may include transaction records, fulfilment information, delivery confirmation, customer communications and other relevant supporting material.

The platform must make response deadlines visible to authorised responsible parties. Where automated reminders or task creation are used, they must not replace human review of the evidence or the decision to submit a response.

Responsibility for preparing and submitting evidence must be defined between the store, platform and payment provider according to approved operating arrangements.

Any chargeback, reversal, dispute fee or resulting financial adjustment must be recorded separately from the original sale and any customer refund. Finance remains authoritative for financial recording and reconciliation.

Dispute outcomes must be verified using trusted provider information. A timeout or missing callback must not be interpreted as a successful dispute outcome.

Material financial adjustments, acceptance of disputed liability and exceptional commercial resolutions must follow the approved authority and approval model.

Dispute processing must be idempotent, auditable and recoverable. Repeated provider notifications must not create duplicate disputes, financial entries or operational tasks.

The selected provider's dispute capabilities, evidence requirements, deadlines, fees and account responsibilities must be assessed before the integration is approved.

## 13. Fulfilment Architecture

### 13.1 Fulfilment ownership

The relevant store remains responsible for its approved fulfilment operations.

The platform provides the application capabilities and controls needed to record and coordinate fulfilment.

The platform must not assume that all stores use the same delivery, collection or dispatch process.

### 13.2 Fulfilment methods

The architecture may support:

- Store collection.
- Store-managed delivery.
- Third-party delivery.
- Other explicitly approved fulfilment arrangements.

The available methods and their operational rules must be configured according to store capabilities.

### 13.3 Fulfilment records

Fulfilment information must be associated with the relevant order and store.

Where applicable, records may include:

- Fulfilment method.
- Delivery or collection details.
- Fulfilment status.
- Dispatch timestamp.
- Collection timestamp.
- Delivery provider reference.
- Tracking reference.
- Responsible store employee.
- Relevant status history.

Sensitive customer delivery information must be access-controlled.

### 13.4 Fulfilment states

The system may represent states such as:

- Not started.
- Awaiting processing.
- Preparing.
- Ready for collection.
- Dispatched.
- In transit.
- Delivered.
- Collected.
- Failed.
- Returned.
- Cancelled.

The exact state model must support the selected fulfilment methods.

A fulfilment state must not be used as a substitute for payment or order state.

### 13.5 Fulfilment authorisation

Store employees may perform fulfilment operations only within their delegated permissions.

The backend must verify the actor's current store membership, permissions and order access.

A store employee must not fulfil another store's order through ordinary store-scoped access.

### 13.6 Delivery integrations

External delivery providers must be accessed through controlled integration boundaries.

External tracking updates must be validated and associated with trusted internal fulfilment references.

Unverified callback data must not directly establish delivery completion or authorise a financial action.

### 13.7 Partial fulfilment

Where an order contains multiple items, the architecture may support partial fulfilment if approved.

The system must track fulfilled and outstanding quantities per order item.

Partial fulfilment must not incorrectly mark the entire order as completed.

### 13.8 Failed fulfilment

Failed delivery, missed collection and other fulfilment exceptions must be recorded with relevant reasons and timestamps.

Resolution may require a retry, customer contact, return, cancellation or refund.

The system must preserve the original fulfilment history.

## 14. Cancellation Architecture

### 14.1 Cancellation boundary

Cancellation is a controlled business operation, not simply deletion of an order.

The architecture must distinguish:

- Customer cancellation request.
- Store cancellation decision.
- Platform-authorised intervention where applicable.
- Payment cancellation or reversal.
- Inventory reservation release.
- Stock restoration.
- Refund processing.

These actions may have different authorities and outcomes.

### 14.2 Cancellation eligibility

Cancellation eligibility must be determined using the current order, payment, inventory and fulfilment states.

The system must apply approved store policies and applicable legal requirements.

It must not assume that every order can be cancelled at every stage.

### 14.3 Cancellation request

A customer cancellation request must be recorded separately from the final cancellation outcome.

The request should include:

- Order reference.
- Requesting actor.
- Request timestamp.
- Reason where provided.
- Relevant order state.
- Resulting decision.

### 14.4 Cancellation authority

The authority to approve or execute cancellation must follow the approved permission model.

Store Admins and delegated employees may act within their assigned authority.

Platform-level intervention must have a defined purpose and must not imply unrestricted control over ordinary store operations.

### 14.5 Cancellation processing

An approved cancellation must coordinate the required operations:

- Update the order state.
- Cancel or stop fulfilment where possible.
- Release eligible inventory reservations.
- Resolve pending payment attempts.
- Initiate a refund where money was captured and a refund is required.
- Record the financial consequences.
- Notify relevant parties.

The operation must be recoverable if one of the dependent actions fails.

### 14.6 Cancellation after fulfilment

A fulfilled order must not be treated as an ordinary pre-fulfilment cancellation.

It may require a return, refund or other approved post-sale resolution process.

The original order and fulfilment records must remain intact.

### 14.7 Cancellation audit

Cancellation records must preserve the actor, reason, decision, timestamps and resulting operations.

A cancellation must not erase the original order, payment or inventory history.

## 15. Returns and Refund Architecture

### 15.1 Separate return and refund concepts

A return represents the handling of goods after purchase.

A refund represents the return of money to a customer.

They may be related but are not interchangeable.

A refund may occur without a physical return where an approved policy or legal requirement permits it.

A return may be completed before a refund is issued.

### 15.2 Return records

Where returns are supported, a return record should identify:

- Original order and order items.
- Store.
- Customer.
- Returned quantities.
- Return reason.
- Request timestamp.
- Authorised decision.
- Receipt or inspection details where applicable.
- Resulting inventory action.
- Linked refund where applicable.

Return handling must follow the applicable approved store policy and legal requirements.

### 15.3 Return eligibility

Eligibility must be assessed using the relevant purchase, fulfilment, product and policy information.

The system must not invent universal return periods, conditions or exceptions.

Unresolved policies must remain configurable or deferred.

### 15.4 Refund records

Refunds must be represented as separate records linked to the original order and, where relevant, the original payment.

A refund record must preserve:

- Refund reference.
- Order reference.
- Payment attempt or provider transaction.
- Amount and currency.
- Reason.
- Requesting actor.
- Authorising actor where required.
- Provider reference.
- Current refund state.
- Relevant timestamps.

### 15.5 Refund authority

Refund permissions must follow the approved identity and access model.

Store employees may request or execute refunds only within their delegated authority.

Additional approval must be enforced for amounts or situations that exceed delegated limits, once those limits have been formally approved.

Platform oversight must not silently bypass the store's recorded authority.

### 15.6 Partial refunds

The architecture must support partial refunds where the selected payment provider and approved business rules permit them.

Refund amounts must be validated against the refundable amount remaining on the original transaction.

The system must prevent cumulative refunds from exceeding the amount actually captured, except where a separately approved financial adjustment process applies.

### 15.7 Refund processing

Refund initiation must use a trusted backend operation and a unique refund reference.

Provider responses must be verified.

A timeout or uncertain result must trigger status verification before retrying.

Repeated requests must not create duplicate refunds.

### 15.8 Refund states

The refund lifecycle may include:

- Requested.
- Awaiting approval.
- Approved.
- Submitted.
- Pending.
- Succeeded.
- Failed.
- Rejected.
- Cancelled.
- Unknown or requiring verification.

The exact state model must reflect provider capabilities and approved business rules.

### 15.9 Refund and inventory coordination

A refund must not automatically restore inventory.

The physical goods may not have been returned, inspected or accepted back into saleable stock.

Inventory restoration must follow an explicit inventory operation supported by the return or cancellation outcome.

### 15.10 Refund history

Refunds must remain linked to their original transactions.

Corrections must create traceable adjustment records rather than silently rewriting provider outcomes or historical refund values.

## 16. Financial Transaction Coordination

### 16.1 Finance domain authority

The Finance domain remains authoritative for financial records, ledger entries, commissions, settlement and reconciliation.

Commerce provides the transaction facts required for financial recording.

It must not create a competing financial ledger.

### 16.2 Financial separation

Store financial activity and platform financial activity must remain separately attributable.

The architecture must preserve distinctions between:

- Customer payments.
- Store sales.
- Store refunds.
- Platform commissions.
- Platform fees.
- Payment-provider fees.
- Delivery charges.
- Stock supplied by the platform.
- Capital advanced to a store.
- Repayments.
- Other approved obligations.

The existence of an order does not automatically establish the final accounting treatment of every amount.

### 16.3 Transaction references

Financial records must be traceable to the relevant order, payment, refund, store and provider transaction where applicable.

References must remain consistent across domain boundaries.

### 16.4 Commission calculation

Commission terms, rates, calculation basis, timing, settlement and exceptions remain unresolved business decisions.

Commerce must not hard-code an assumed commission rate or calculate a final platform entitlement using an unapproved rule.

The Finance domain must apply only approved commission configuration and record the applicable rule or terms version.

### 16.5 Payment-provider fees

Provider fees must be recorded separately from store sales and platform commissions.

Their attribution must follow verified provider statements, transaction details and approved financial rules.

### 16.6 Financial adjustments

Corrections to financial records must use authorised adjustment operations.

Original transaction evidence must remain preserved.

An operational status change must not silently modify an amount already recorded in financial history.

### 16.7 Financial consistency

Commerce, Payments, Inventory and Finance must coordinate through defined transaction boundaries and recoverable operations.

Where distributed operations cannot share one database transaction, the application must use reliable workflow coordination and reconciliation.

A successful order update must not be treated as proof that all related financial operations succeeded.

## 17. Reconciliation and Exception Management

### 17.1 Reconciliation purpose

Reconciliation verifies that the platform's recorded transaction state agrees with trusted external and internal records.

It is required because network failures, delayed callbacks, provider outages, retries and operational errors may leave transaction records temporarily incomplete or inconsistent.

### 17.2 Payment reconciliation

Payment reconciliation may compare:

- Internal payment attempts.
- Provider transaction references.
- Captured amounts.
- Currency.
- Payment status.
- Refund status.
- Provider fees.
- Settlement records.

A provider statement or verified provider query must be associated with the correct internal transaction.

### 17.3 Order and inventory reconciliation

The platform must be able to identify inconsistencies involving:

- Orders without expected inventory reservations.
- Expired reservations that remain active.
- Orders confirmed without the required stock outcome.
- Stock movements without an expected order reference.
- Fulfilment records inconsistent with order quantities.
- Orders whose dependent operations remain incomplete.

The reconciliation process must distinguish genuine errors from valid intermediate states.

### 17.4 Refund reconciliation

Refund reconciliation must compare internal refund records with provider outcomes and relevant settlement information.

A refund must not be marked successful solely because a refund request was accepted for processing.

### 17.5 Exception records

An unresolved discrepancy must be recorded with enough information for investigation.

An exception record may include:

- Relevant order and store.
- Payment or refund reference.
- Provider reference.
- Amount and currency.
- Observed discrepancy.
- Detection timestamp.
- Investigation status.
- Assigned responsible party.
- Resolution details.

Sensitive information must be minimised.

### 17.6 Automated reconciliation

Scheduled or event-driven reconciliation may identify discrepancies and perform safe, explicitly approved technical corrections.

It must not independently approve material financial adjustments, waive obligations or decide disputed commercial outcomes.

Those decisions require the appropriate human authority.

### 17.7 Manual resolution

Manual resolution must record:

- The person responsible.
- The evidence reviewed.
- The decision.
- The authorised adjustment.
- The resulting transaction state.
- The timestamp.
- Any required approval.

Corrections must preserve original records and audit history.

### 17.8 Reconciliation completeness

Reconciliation must be repeatable and safe to rerun.

A repeated reconciliation must not create duplicate financial entries, refunds, inventory movements or other transaction effects.

The system must distinguish an already-applied correction from an outstanding discrepancy.

## 18. Commerce Notifications and Customer Communication

### 18.1 Notification responsibility

The Notifications domain is responsible for message delivery.

Commerce supplies verified business events and the relevant customer-facing transaction information.

Notification delivery must not become the source of truth for order, payment or fulfilment state.

### 18.2 Transactional events

Potential notification events include:

- Order received.
- Order confirmed.
- Payment pending.
- Payment confirmed.
- Payment failed.
- Order processing.
- Ready for collection.
- Dispatched.
- Delivered.
- Cancellation requested.
- Order cancelled.
- Refund submitted.
- Refund completed.
- Refund failed.

The exact events and channels must be selected according to approved business requirements.

### 18.3 Reliable event publication

Where commerce state changes require a notification, the event must be published reliably.

The architecture should use an outbox or equivalent durable event publication mechanism where a database change and event publication must remain consistent.

A failed notification must not reverse a valid order or payment transaction.

### 18.4 Duplicate notifications

Notification processing must tolerate retries and duplicate event delivery.

The customer should not receive uncontrolled duplicate messages for the same business event.

### 18.5 Notification content

Messages must use the correct store identity and transaction context.

They must not expose another store's data or unnecessary customer information.

Order and payment details included in notifications must come from trusted transaction records.

### 18.6 Delivery failures

Notification delivery failures must be observable and recoverable.

A failed email, SMS or other message must not be interpreted as a failed commercial transaction.

Customer communication channels, provider selection and retention requirements remain subject to separate decisions.


## 19. Commerce Security and Authorisation

### 19.1 Security boundary

Commerce operations must be protected by backend authentication, authorisation and transaction validation.

The frontend must not be treated as a trusted security boundary.

Every operation must verify the current actor, relevant store context and applicable permissions.

### 19.2 Customer access

Customers may access only their own permitted commerce information.

Access to an order must be established through an authenticated customer relationship or another explicitly approved access mechanism.

Knowledge of a public order reference must not be sufficient to retrieve private order details.

### 19.3 Store staff access

Store staff may access commerce records only within their active store membership and delegated permissions.

The backend must verify:

- Current account status.
- Active store membership.
- Relevant store context.
- Effective permissions.
- Order ownership.
- Requested operation.
- Any required approval.

A user with access to one store must not gain access to another store's orders through manipulated identifiers or requests.

### 19.4 Platform access

Platform Super Admin access must follow the approved platform-level permission model.

Platform access must not automatically grant unrestricted authority to execute ordinary store transactions or alter historical commercial records.

Privileged commercial interventions must have a defined purpose, authority and audit trail.

### 19.5 Payment security

Payment initiation, confirmation, cancellation and refund operations must be performed through trusted backend processes.

The application must:

- Protect provider credentials.
- Avoid exposing privileged secrets to the frontend.
- Validate provider responses.
- Verify callback authenticity.
- Protect against replay and duplicate processing.
- Minimise sensitive payment data.
- Record relevant security events.

### 19.6 Cross-store isolation

Every store-scoped commerce query and mutation must enforce the relevant store boundary.

The backend must not rely solely on a frontend-supplied store identifier.

Database constraints and access policies must complement application authorisation.

Cross-store access must be explicitly authorised where a legitimate platform-level operation requires it.

### 19.7 Sensitive customer information

Customer addresses, contact details and transaction information must be accessible only for legitimate operational purposes.

The platform must minimise collection, exposure and retention of personal information.

Customer information must not be disclosed through public API responses, logs, notifications or administrative interfaces beyond what the operation requires.

### 19.8 Abuse protection

Commerce endpoints must apply appropriate validation, rate limiting and abuse controls.

Controls should address:

- Repeated checkout attempts.
- Payment initiation abuse.
- Promotion code abuse.
- Order enumeration.
- Unauthorised cancellation.
- Refund abuse.
- Manipulated quantities and prices.
- Replayed requests.
- Automated traffic.

Security controls must not prevent legitimate retries required for safe transaction recovery.

### 19.9 Security auditability

Security-sensitive commerce operations must generate appropriate activity and audit records.

These include privileged order access, payment actions, refunds, cancellations, financial corrections and cross-store interventions.

Audit records must not contain raw credentials or unnecessary sensitive payment data.

## 20. Customer Data and Privacy

### 20.1 Customer data responsibility

The Customers domain remains responsible for customer identity and customer profile information.

Commerce stores only the customer references and transaction information required to fulfil its responsibilities.

### 20.2 Store-scoped customer relationships

The initial architecture retains the approved store-scoped customer model unless a separate cross-store customer identity decision is approved.

A customer's activity with one store must not automatically become visible to another store.

### 20.3 Transaction snapshots

Orders must preserve the customer and fulfilment information necessary to understand the original transaction.

Historical transaction snapshots must be distinguished from the customer's current editable profile.

Updating a customer profile must not silently rewrite historical order details.

### 20.4 Data minimisation

Commerce must collect only information necessary for the relevant purchasing, payment, fulfilment, support and legal purposes.

Optional information must not become mandatory without a defined requirement.

### 20.5 Data access and disclosure

Customer data access must be purpose-limited and permission-controlled.

Exports, administrative access and support access must follow the approved security and operational procedures.

### 20.6 Retention and deletion

Customer data retention, anonymisation and deletion must follow approved retention policies and applicable South African legal requirements.

An erasure request must not automatically remove financial or transaction records that must lawfully be retained.

Where personal data must be removed or restricted, the application must preserve the integrity of records that remain legally or operationally necessary.

### 20.7 Privacy and legal review

The platform's handling of personal information must be reviewed against applicable privacy and consumer protection requirements, including POPIA where applicable.

Specific legal retention periods, consent requirements and consumer policy rules must be confirmed through appropriate professional review rather than invented in application code.

## 21. Commerce API Architecture

### 21.1 API ownership

Commerce APIs must expose business operations rather than unrestricted database manipulation.

The backend must coordinate the relevant domain operations and enforce the transaction rules.

### 21.2 API organisation

Commerce endpoints should follow the approved API versioning and organisation conventions.

The target API uses the established versioned API direction, including the `/api/v1/` prefix where applicable.

Existing production Netlify Function routes remain valid until their corresponding migration is completed.

### 21.3 Customer operations

Potential customer-facing operations include:

- Retrieve permitted cart contents.
- Add or remove cart items.
- Update cart quantities.
- Validate checkout.
- Create an order.
- Initiate payment.
- Retrieve permitted order details.
- Request cancellation.
- Request a return or refund where supported.

The final endpoint contracts must be documented separately during API implementation planning.

### 21.4 Store administration operations

Potential store-scoped operations include:

- Retrieve store orders.
- Retrieve order details.
- Update permitted processing information.
- Record fulfilment progress.
- Review cancellation requests.
- Request or process authorised refunds.
- Retrieve relevant transaction summaries.
- Resolve permitted operational exceptions.

Each operation must enforce current store membership and delegated authority.

### 21.5 Platform operations

Platform-level commerce operations must be limited to explicitly approved responsibilities.

Examples may include:

- Platform-wide operational visibility.
- Investigation of cross-store integration failures.
- Oversight of unresolved transaction exceptions.
- Authorised support interventions.
- Reconciliation monitoring.

Platform-level visibility must not automatically imply authority to alter store-owned transactions.

### 21.6 API validation

All commerce requests must validate:

- Identifiers and references.
- Store context.
- Quantities.
- Monetary values.
- Currency.
- Customer input.
- Allowed state transitions.
- Request size and format.
- Idempotency requirements.

Unknown or unsupported fields must not silently override trusted transaction values.

### 21.7 API responses

Responses must expose only information needed by the requesting actor.

Internal provider credentials, privileged implementation details and unrelated customer or store information must never be returned.

### 21.8 API errors

Errors must distinguish validation failures, permission failures, unavailable resources, conflicts and recoverable provider or processing failures.

Error responses must not disclose sensitive internal implementation information.

A failed request must not be presented as a failed transaction when its outcome remains uncertain.

## 22. Background Processing and Reliability

### 22.1 Asynchronous processing

Some commerce operations may require background processing.

Examples include:

- Payment status verification.
- Provider callback processing.
- Refund status verification.
- Expired checkout cleanup.
- Inventory reservation expiration.
- Reconciliation.
- Notification publication.
- Fulfilment status synchronisation.

The use of background processing must be justified by operational requirements.

### 22.2 Durable processing

Important business events must not exist only in transient application memory.

Where an operation must survive process failure, its pending work must be durably recorded.

The application must be able to identify and recover work that was accepted but not completed.

### 22.3 Idempotency

Background jobs and event handlers must tolerate retries and duplicate delivery.

The same event must not create duplicate orders, payments, refunds, inventory movements or financial entries.

Idempotency keys and event identifiers must be retained for an appropriate period.

### 22.4 Retry strategy

Retries must distinguish transient failures from permanent validation or business failures.

The system should use bounded retries and appropriate delay strategies.

Repeated failure must result in observable unresolved work rather than an endless retry loop.

### 22.5 Failure isolation

A failure in notification delivery must not invalidate a successful order.

A provider outage must not block unrelated store operations unnecessarily.

Background processing must isolate failures where practical and preserve the state needed for recovery.

### 22.6 Concurrent processing

Concurrent jobs must not process the same financial or inventory operation in a way that creates duplicate effects.

Appropriate locking, idempotency or concurrency controls must be applied.

### 22.7 Operational recovery

Authorised operators must be able to identify, investigate and resolve stuck or failed commerce operations.

Manual replay or recovery must preserve idempotency and audit history.

## 23. Reporting and Commerce Performance

### 23.1 Reporting responsibility

Commerce provides reliable transaction data for reporting.

The Performance and Finance domains remain responsible for their respective reporting models and financial interpretation.

Commerce must not become a competing source of financial reporting truth.

### 23.2 Store-level visibility

Store reporting may include:

- Order counts.
- Order status distribution.
- Sales values.
- Average order values.
- Cancellation rates.
- Refund activity.
- Fulfilment progress.
- Unresolved transaction exceptions.

Access must remain scoped to the relevant store and authorised role.

### 23.3 Platform-level visibility

Platform reporting may provide appropriately authorised cross-store operational visibility.

Comparisons must account for relevant differences such as store operating history, product category, business model and agreed targets.

Raw rankings or calculated scores must not independently determine material financial or governance decisions.

### 23.4 Financial reporting

Sales, captured payments, refunds, provider fees, commissions and settlement must remain distinct measures.

A placed order must not automatically be reported as collected revenue or settled funds.

Financial reporting must use authoritative Finance records and clearly defined measurement rules.

### 23.5 Reporting consistency

Reports must identify the relevant period, store context, currency and calculation basis.

Where reporting data is delayed or eventually consistent, that limitation must be visible.

### 23.6 Performance requirements

Commerce operations must provide acceptable response times under expected workloads.

Performance requirements must account for:

- Storefront traffic.
- Checkout concurrency.
- Inventory contention.
- Payment-provider latency.
- Background processing.
- Order history queries.
- Reporting workloads.

Actual performance targets must be established through implementation and operational measurement.

### 23.7 Scalability

The architecture should scale through appropriate database indexing, query optimisation, caching and controlled background processing.

Premature distribution into separate services is not required.

The modular monolith remains the initial target unless measured requirements justify a different architecture.

## 24. Testing Architecture

### 24.1 Testing objectives

Commerce testing must verify transaction correctness, security, store isolation and recoverability.

A successful build alone is insufficient evidence that commerce workflows are safe.

### 24.2 Unit testing

Unit tests must cover:

- Price calculation.
- Discount calculation.
- Checkout validation.
- Order state transitions.
- Payment state handling.
- Refund limits.
- Cancellation eligibility.
- Fulfilment transitions.
- Idempotency behaviour.

### 24.3 Integration testing

Integration tests must verify interactions among:

- Commerce.
- Catalogue.
- Inventory.
- Payments.
- Finance.
- Customers.
- Notifications.
- External providers.

Tests must cover both successful and failed interactions.

### 24.4 Store isolation testing

Tests must prove that:

- A customer cannot access another customer's order.
- Store staff cannot access another store's orders.
- A store cannot use another store's inventory.
- A store cannot alter another store's commercial terms.
- Payment events are attributed to the correct order and store.
- Cross-store references are rejected where not authorised.
- Platform privileges are limited to their approved scope.

### 24.5 Payment testing

Payment tests must cover:

- Successful payments.
- Failed payments.
- Pending payments.
- Delayed callbacks.
- Duplicate callbacks.
- Invalid callback signatures.
- Provider timeouts.
- Uncertain outcomes.
- Retry attempts.
- Refund success and failure.
- Reconciliation discrepancies.

Test environments must not use live payment credentials or accidentally initiate real charges.

### 24.6 Inventory and concurrency testing

Tests must cover:

- Successful reservation.
- Reservation expiration.
- Reservation release.
- Concurrent checkout attempts.
- Stock exhaustion.
- Duplicate stock operations.
- Partial fulfilment.
- Return-related stock restoration.
- Failed order and inventory coordination.

### 24.7 Order lifecycle testing

Tests must verify permitted and rejected state transitions.

They must include cancellation, partial fulfilment, completed orders, refunds and historical record preservation.

### 24.8 Failure and recovery testing

Tests must simulate failures between dependent operations.

The system must demonstrate that it can recover without losing accepted transactions or creating duplicate effects.

### 24.9 Regression testing

Migration must include regression testing against existing Yotaabo storefront and administration behaviour.

Existing production workflows must remain functional until their replacements are verified.

### 24.10 Security testing

Testing must include authorisation bypass attempts, identifier manipulation, replay, request tampering, sensitive-data exposure and privilege escalation.

## 25. Migration from the Existing Yotaabo Application

### 25.1 Migration objective

Commerce migration must extend the existing Yotaabo application into the multi-store platform without unnecessary disruption to existing operations.

The existing application remains the production baseline until individual capabilities have been migrated and verified.

### 25.2 Existing functionality assessment

Before migrating commerce capabilities, document:

- Existing cart behaviour.
- Checkout implementation.
- Existing order records.
- Current payment integration, if applicable.
- Existing product and listing relationships.
- Current inventory behaviour.
- Customer information and references.
- Existing notifications.
- Current Netlify Function routes.
- Database dependencies.
- Operational and recovery requirements.

Existing behaviour must be verified from the actual application rather than assumed from this target architecture.

### 25.3 Incremental migration

Migration should proceed through defined capabilities.

Possible stages include:

- Cart and checkout validation.
- Order creation and retrieval.
- Inventory coordination.
- Payment initiation and confirmation.
- Fulfilment.
- Cancellation and refund processing.
- Reconciliation and reporting.

Each stage must define its authoritative implementation and production consumers.

### 25.4 API compatibility

Existing Netlify Function routes and request/response contracts must remain valid until the corresponding functionality is migrated.

The target NestJS API must not introduce competing write paths that can create inconsistent commerce or financial records.

### 25.5 Data migration

Migration must preserve:

- Existing orders.
- Order item details.
- Transaction-time prices.
- Customer references.
- Payment references and available history.
- Refund information.
- Inventory relationships.
- Fulfilment history.
- Relevant activity records.

Migration transformations must be documented and verified.

### 25.6 In-flight transactions

Migration planning must account for transactions that are not complete at cutover.

This includes:

- Pending payments.
- Uncertain provider outcomes.
- Active checkout sessions.
- Inventory reservations.
- Pending refunds.
- Provider callbacks.
- Queued notifications.
- Background jobs.
- Orders awaiting fulfilment.

The migration must establish which implementation is authoritative for each in-flight operation.

### 25.7 Cutover and rollback

Each capability migration must define:

- Cutover conditions.
- Authoritative processing path.
- Data consistency checks.
- Provider callback routing.
- Background job ownership.
- Rollback conditions.
- Recovery of in-flight work.

Rollback must not blindly restore older data or repeat external financial operations.

### 25.8 Production protection

No commerce migration may silently remove existing Yotaabo functionality, customer access or transaction history.

Material changes to customer purchasing behaviour must be justified, tested and approved before production release.

## 26. Architectural Constraints

The following constraints apply to the Commerce domain:

- Every initial-release order belongs to one store.
- Store context must be validated by the backend.
- Cart values are not authoritative transaction values.
- Checkout and order creation require server-side validation.
- Product ownership and store commercial authority remain distinct.
- Inventory remains independently attributable to each store.
- Payment-provider outcomes must be verified.
- Uncertain payment outcomes must not trigger blind retries.
- Order, payment, refund and fulfilment states remain distinct.
- Financial records remain under Finance domain authority.
- Refunds must not automatically restore inventory.
- Historical transactions must remain traceable.
- Material financial decisions require appropriate human authority.
- Existing Yotaabo production functionality must be protected.
- Provider-specific implementation details must remain behind integration boundaries.
- Unresolved business rules must not be hard-coded.

These constraints complement the approved Product, Store, Data, API, Security, Integration, Application and Operations Architecture documents.

## 27. Open Commerce Architecture Decisions

The following decisions remain open and must be resolved through approved business decisions or implementation planning.

| Decision | Area | Current position |
|---|---|---|
| Payment provider | Payments | Not selected |
| Payment provider account structure | Payments | Shared or separate accounts require assessment |
| Supported payment methods | Payments | To be approved |
| Payment capture timing | Payments | To be defined |
| Checkout expiration | Checkout | To be defined |
| Inventory reservation timing | Inventory | To be defined |
| Reservation duration | Inventory | To be defined |
| Stock deduction timing | Inventory | Align with approved inventory policy |
| Guest checkout | Customers | Not decided |
| Customer account requirements | Customers | Governed by Identity and Access decisions |
| Cross-store cart | Commerce | Excluded from initial assumption |
| Promotion authority | Commercial policy | To be approved |
| Promotion funding | Finance | To be approved |
| Commission rates and basis | Finance | Not decided |
| Delivery pricing | Fulfilment | Store and platform responsibilities to be defined |
| Delivery provider | Integrations | Not selected |
| Collection workflows | Fulfilment | To be defined |
| Cancellation policy | Commercial policy | Requires business and legal review |
| Return policy | Commercial policy | Requires business and legal review |
| Refund approval limits | Governance | To be approved |
| Tax treatment | Finance and legal | Requires professional review |
| Currency support | Commerce | Initial currency scope to be confirmed |
| Payment settlement model | Finance | To be defined |
| Order retention | Governance | Subject to legal and business requirements |
| Commerce notification channels | Notifications | To be selected |
| Background processing technology | Runtime | Governed by Application Architecture |

An unresolved decision must not be represented as an approved business rule.

Implementation must use configurable policies where appropriate or defer functionality until the required decision is approved.

## 28. Relationship to Other Documents and Governance

### 28.1 Product documents

This document implements the commerce-related direction established by:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.

### 28.2 Architecture documents

This document must be read alongside:

- System Architecture.
- Data Architecture.
- Store Architecture.
- Identity and Access Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Operations Architecture.
- Integration Architecture.
- Application Architecture.

### 28.3 Domain consistency

Where a commerce decision affects another domain's data ownership or authority, the responsible domain architecture remains authoritative for that boundary.

Conflicts must be resolved through documented architecture decisions rather than informal implementation assumptions.

### 28.4 Architecture decisions

Material decisions affecting order ownership, payment handling, financial authority, inventory consistency, store isolation or transaction integrity must be documented.

Changes to unresolved decisions must identify the business owner, technical impact and affected documents.

### 28.5 Governance

This document defines the target architecture and does not by itself authorise production implementation of unresolved policies or integrations.

Implementation must follow approved architecture, security, operational and business requirements.

Architecture changes must preserve:

- Store autonomy.
- Platform and store financial separation.
- Transaction integrity.
- Customer data protection.
- Historical accuracy.
- Auditability.
- Existing production continuity.
