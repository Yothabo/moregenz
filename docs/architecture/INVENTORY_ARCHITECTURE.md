# Inventory Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-00784C0AC1 |
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

This document defines the inventory architecture for the multi-store retail platform.

It establishes how inventory is represented, owned, controlled, recorded and made available to commerce operations across participating stores.

The architecture must support independent store inventory while allowing products to be shared across stores where ownership and commercial permissions permit.

It defines the technical boundaries between:

- Product identity and descriptive information.
- Store product listings and commercial terms.
- Store-owned inventory.
- Inventory locations and storage arrangements.
- Stock movements and adjustments.
- Reservations and order fulfilment.
- Transfers between inventory locations or stores.
- Inventory valuation and financial records.
- Inventory reconciliation and audit history.

This document describes architectural requirements and boundaries. It does not establish final operational policies, accounting methods, valuation methods or approval thresholds that have not yet been agreed.

## 2. Architectural Objectives

The inventory architecture must:

1. Maintain independent inventory records for each store.
2. Preserve the distinction between product ownership and stock ownership.
3. Prevent one store from changing another store's inventory without explicit authority.
4. Support platform-owned and store-owned products.
5. Support shared products without combining participating stores' stock.
6. Maintain accurate stock quantities through controlled transactions.
7. Support reservations without treating them as physical stock movements.
8. Record transfers with traceable dispatch and receipt events.
9. Support stock counts, discrepancies and authorised adjustments.
10. Preserve inventory history and accountability.
11. Coordinate inventory availability with orders and fulfilment.
12. Support reconciliation between recorded stock and physical stock.
13. Provide reliable information for store operations and platform oversight.
14. Protect existing Yotaabo inventory and production operations during migration.

The architecture must be extensible without introducing unnecessary complexity or requiring every participating store to use identical operational processes.

## 3. Inventory Architecture Principles

### 3.1 Store-level inventory ownership

Inventory belongs to the store that owns or controls the relevant stock.

A shared product does not create shared inventory.

Each store must maintain its own quantities, stock movements, reservations, adjustments and inventory history.

### 3.2 Product identity is separate from inventory

A product catalogue record describes a product.

An inventory record describes the quantity and status of that product's stock within a particular store and, where applicable, a particular inventory location.

Neither record should be used as a substitute for the other.

### 3.3 Authoritative stock records

The backend and database are authoritative for inventory quantities and inventory transaction history.

Frontend calculations, cached catalogue data and customer-submitted quantities must never independently establish available stock.

### 3.4 Recorded movements

Changes to inventory must be represented through controlled operations and traceable records.

Directly overwriting stock quantities without an associated reason, authorised operation and audit history must not be the normal inventory transaction model.

### 3.5 Transactional consistency

Inventory operations that affect related records must preserve business consistency.

Where a stock operation involves an order, reservation, transfer or adjustment, the relevant records must be coordinated through appropriate database transactions and recoverable processing.

### 3.6 Explicit authority

Every inventory operation must be authorised against the relevant store context and effective permissions.

Platform-level access does not automatically grant unrestricted authority to modify every store's inventory.

### 3.7 Historical integrity

Completed inventory movements and adjustments must remain traceable.

Corrections must use controlled reversal or compensating records rather than silently rewriting historical transactions.

### 3.8 Configurable operating policies

Stock thresholds, reorder rules, approval limits, valuation methods and other commercial or operational policies must remain configurable or explicitly unresolved until approved.

They must not be introduced as unexplained hard-coded assumptions.

## 4. Inventory Architecture Boundaries

### 4.1 Inventory domain responsibility

The Inventory domain is responsible for:

- Inventory balances.
- Stock availability calculations.
- Inventory locations.
- Stock reservations.
- Stock movements.
- Transfers.
- Stock adjustments.
- Physical stock counts.
- Inventory reconciliation.
- Inventory-related audit records.
- Inventory reporting data.

### 4.2 Product Catalogue domain responsibility

The Product Catalogue domain remains responsible for product identity, descriptive information, ownership and the relevant catalogue relationships.

The Inventory domain references valid product and store relationships. It must not independently redefine product ownership.

### 4.3 Store domain responsibility

The Store domain establishes store identity, operational status, memberships and store context.

Inventory operations must respect the store's lifecycle and permitted operational capabilities.

### 4.4 Commerce domain responsibility

The Commerce domain manages carts, checkout, orders, payments, cancellations, returns and refunds.

The Inventory domain provides stock availability and processes authorised inventory operations associated with commerce transactions.

An order must not be treated as an inventory movement merely because it exists.

### 4.5 Finance domain responsibility

The Finance domain remains authoritative for financial transactions, inventory-related financial postings, approved valuation records and financial reconciliation.

The Inventory domain supplies operational stock information and movement records.

An inventory quantity change must not automatically be treated as a financial posting.

### 4.6 Audit and Activity responsibility

The Activity and Audit capabilities record relevant inventory actions, responsible actors, timestamps and outcomes.

Inventory transaction records must retain their own domain-level history and references.

General application activity logs do not replace inventory transaction records.

## 5. Store and Inventory Ownership Model

### 5.1 Store-specific inventory

Every inventory balance must be associated with a specific store.

A store must not read or modify another store's inventory through ordinary store-level permissions.

The architecture must support multiple stores carrying the same product with different quantities and inventory histories.

### 5.2 Product ownership and stock ownership

Product ownership and stock ownership are separate concepts.

A platform-owned product may be listed and stocked by multiple stores.

A store-owned product may be stocked by its owning store and made available to other stores only through an explicitly permitted arrangement.

The owner of a product's source information does not automatically own every physical unit held by participating stores.

Likewise, a store holding physical stock does not automatically gain authority to change the source product's identity or descriptive information.

### 5.3 Stock acquired from the platform

Where the platform supplies stock to a store, the architecture must distinguish:

- The source of the stock.
- The receiving store.
- The physical quantity supplied.
- The transfer or supply reference.
- The agreed commercial arrangement.
- Any outstanding financial obligation.
- The relevant receipt and acceptance records.

The legal ownership of supplied stock must follow the agreed commercial arrangement. It must not be inferred solely from the fact that a store has received or physically holds the stock.

### 5.4 Stock acquired independently

Stock independently acquired by a store must be identifiable as part of that store's inventory.

The platform must not assume ownership of independently acquired stock simply because it is recorded in the platform.

### 5.5 Inventory isolation

Inventory records must preserve store boundaries at database and application levels.

Store identifiers must be enforced through appropriate relationships and constraints.

Backend authorisation must independently validate the actor's authority and store context.

### 5.6 Platform-level inventory access

Platform-level users may require inventory visibility for approved oversight, support, audits or assistance.

Such access must be governed by explicit permissions and recorded accountability.

Platform access must not silently convert store inventory into centrally controlled inventory.

## 6. Product and Inventory Relationships

### 6.1 Product reference

An inventory record must reference a valid product or an explicitly defined store-product relationship.

The architecture must prevent inventory from referencing an unrelated or unavailable product relationship.

### 6.2 Store product listing

A store's product listing represents the store's commercial availability of a product.

It may contain store-specific:

- Selling price.
- Listing status.
- Commercial description or permitted presentation fields.
- Availability settings.
- Store-specific product references.

The inventory record must remain distinct from these commercial attributes.

### 6.3 Listing and stock availability

A product listing may exist without physical stock.

A product may also have physical stock while its public listing is inactive.

Public sale eligibility must consider the listing's status, store operational status, inventory availability and applicable commerce rules.

A positive inventory balance alone must not make a product publicly purchasable.

### 6.4 Product changes

Changes to product identity or descriptive information must follow the product ownership and catalogue permissions defined in the Product Catalogue architecture.

Such changes must not silently alter inventory quantities or erase inventory history.

### 6.5 Product deactivation

Deactivating a product or store listing must not automatically delete its inventory history.

Any remaining stock must be handled through an explicit operational process.

Historical orders, movements, adjustments and financial references must remain available according to applicable retention requirements.

### 6.6 Product variants and SKUs

Where a product is offered in multiple stock-distinguishable variants, the catalogue must represent those variants explicitly.

Examples include:

- Different fragrance volumes or bottle sizes.
- Different product sizes.
- Different colours.
- Other options that represent separately managed stock.

A variant must reference its parent product while retaining a stable identity for inventory operations.

Where applicable, each variant must have a unique SKU within the relevant agreed scope.

The inventory architecture must distinguish the parent product from its stock-managed variants. A parent product must not combine the quantities of independently managed variants into one indistinguishable stock balance.

Variant identity and descriptive attributes remain under the authority of the Product Catalogue domain.

## 7. Inventory Records and Data Model

### 7.1 Inventory record

An inventory record represents stock associated with a store, product and, where applicable, an inventory location.

The record must support:

- Unique inventory identity.
- Store reference.
- Product reference.
- Inventory location reference where applicable.
- Recorded on-hand quantity.
- Relevant reserved quantity or reservation relationships.
- Calculated available quantity.
- Inventory status where required.
- Creation and update timestamps.
- Relevant source or provenance references.

The precise database schema and quantity representation remain subject to detailed data modelling.

### 7.2 Quantity representation

The architecture must distinguish at least:

- On-hand quantity: physical stock recorded as held.
- Reserved quantity: stock allocated to active reservations.
- Available quantity: stock eligible for new allocations under applicable rules.
- In-transit quantity: stock dispatched but not yet received at its destination.
- Damaged or quarantined quantity: stock not eligible for ordinary sale.

These quantities must not be combined into a single ambiguous stock figure.

The system must define how each quantity is calculated and which transaction types affect it.

### 7.3 Available quantity

Available quantity must be calculated from authoritative inventory records and applicable reservation and stock-status rules.

A simplified conceptual relationship is:

Available quantity = eligible on-hand quantity - active reserved quantity

The final calculation must account for stock that is damaged, quarantined, unavailable or otherwise excluded from sale.

In-transit stock must not be treated as available at the destination before receipt has been recorded.

### 7.4 Inventory transaction history

Inventory changes must produce traceable transaction records.

A transaction should capture, where applicable:

- Transaction identity.
- Store and product references.
- Inventory location.
- Transaction type.
- Quantity affected.
- Previous and resulting balances or sufficient references to reconstruct them.
- Source and destination references where relevant.
- Business reason.
- Initiating actor or system process.
- Authorisation context.
- Timestamp.
- Related order, reservation, transfer, count or adjustment reference.
- Processing status and relevant failure information.

### 7.5 Quantity precision

Quantity precision must reflect the supported product and stock-handling model.

The system must not assume that every product is necessarily managed as an integer number of units.

Supported fractional quantities, measurement units and conversion rules must be defined before implementation where required.

### 7.6 Record identity and integrity

Inventory records must have stable identifiers.

Database constraints must prevent duplicate balances for the same permitted store, product and location combination.

Where a product can be stocked at multiple locations, location identity must be included in the relevant uniqueness and relationship rules.

### 7.7 Historical records

Completed inventory transactions must not be silently deleted or rewritten to correct a balance.

Corrections must preserve the original record and establish a traceable relationship to the correcting transaction.

### 7.8 Variant-level inventory

Where a product has separately stock-managed variants, inventory records must reference the specific variant rather than relying only on the parent product reference.

The inventory identity must therefore support the relevant store, variant and inventory location relationship.

Each independently managed variant must have its own on-hand, reserved, available, damaged and other applicable stock quantities.

Inventory movements, receipts, reservations, transfers, adjustments, counts and order-related deductions must identify the affected variant.

The system must prevent a transaction for one variant from changing the inventory balance of another variant belonging to the same parent product.

Where a product does not require variants, the catalogue must provide a consistent representation that allows it to be managed as a single stock-managed item.

Database constraints must prevent duplicate inventory balances for the same store, stock-managed variant and location combination.

SKU uniqueness scope and rules must be established by the Product Catalogue architecture. The inventory system must not assume that SKU values are globally unique unless that rule is explicitly approved.

## 8. Inventory Locations

### 8.1 Location model

The architecture must support inventory being held at identifiable locations within a store where operational requirements justify it.

A location may represent a warehouse, stockroom, retail location or another approved physical storage area.

The initial deployment may use a simpler store-level inventory arrangement if multiple locations are not yet required.

### 8.2 Store ownership of locations

Inventory locations must belong to a specific store.

A location must not be referenced by inventory belonging to another store unless an explicitly approved shared-location model is introduced.

### 8.3 Location status

Locations may have operational statuses such as active, inactive or restricted.

The system must prevent new ordinary inventory operations against locations that are not eligible for the relevant operation.

Deactivating a location must not erase its historical movements or stock records.

### 8.4 Location transfers

Moving stock between locations within the same store must be represented as an explicit transfer.

The system must record both the source and destination and preserve the movement history.

### 8.5 Location configuration

The initial implementation must not require a complex warehouse-management system unless approved operational needs justify it.

Location-level functionality must remain extensible without making basic store inventory unnecessarily difficult to manage.

## 9. Inventory Balance and Availability Management

### 9.1 Authoritative balance

The backend must determine inventory balances from authoritative records.

Client-provided stock values must never be accepted as authoritative replacements for existing inventory balances.

### 9.2 Balance consistency

Inventory operations must preserve consistency between transaction history and current balances.

Where balances are maintained as stored values for performance, the architecture must provide reliable controls to detect and resolve inconsistencies.

### 9.3 Availability checks

Availability checks must consider:

- Store context.
- Product and listing eligibility.
- Relevant inventory location.
- On-hand stock.
- Active reservations.
- Damaged or quarantined stock.
- Other approved stock restrictions.
- Applicable commerce rules.

### 9.4 Concurrent operations

The system must handle concurrent requests attempting to allocate or change the same stock.

Concurrency controls must prevent overselling and prevent two operations from consuming the same available quantity.

The implementation may use appropriate database transactions, locking, conditional updates or equivalent controls.

### 9.5 Stale availability information

Availability displayed to customers or staff may become stale.

The final stock check must occur within the authoritative backend transaction responsible for creating or confirming the relevant reservation or order operation.

A previous catalogue or cart availability result must not guarantee stock allocation.

### 9.6 Negative inventory

Negative inventory must not be permitted through ordinary stock allocation or sale operations.

Any exceptional negative balance requirement must be explicitly justified, approved and governed by a defined operational and accounting policy.

### 9.7 Availability and public storefronts

Each storefront must receive inventory availability only for its own permitted product listings and store context.

One store's stock must not increase or otherwise affect another store's displayed availability.

The storefront must not expose internal inventory information beyond what is required for the approved customer experience.

## 10. Stock Receiving and Initial Inventory

### 10.1 Stock receiving

The architecture must support recording stock received by a store from approved sources.

Receiving sources may include:

- Independent suppliers.
- The platform.
- Another participating store.
- Customer returns approved for restocking.
- Other explicitly authorised sources.

Each receiving operation must identify the source where known, receiving store, relevant product, quantity, destination location and receiving actor.

### 10.2 Receiving records

A stock receipt must capture:

- Receipt identifier.
- Receiving store.
- Product and inventory location.
- Quantity expected, where applicable.
- Quantity physically received.
- Source or supplier reference.
- Purchase order, transfer or supply reference where applicable.
- Receipt date and recording timestamp.
- Condition of received stock.
- Receiving actor.
- Relevant discrepancies and notes.

The architecture must distinguish an expected delivery from stock that has actually been received and accepted.

### 10.3 Partial receipts

The system must support partial receipts where the quantity received differs from the quantity expected.

A partial receipt must not automatically close the outstanding quantity.

Outstanding quantities must remain traceable until the receipt is completed, cancelled or otherwise resolved through an authorised process.

### 10.4 Receiving discrepancies

Short deliveries, excess quantities, incorrect products and damaged goods must be recorded as receiving discrepancies.

The system must not silently adjust the expected quantity to match the received quantity.

Discrepancies must have a recorded resolution and, where required, supporting evidence.

### 10.5 Initial inventory

Initial inventory may be loaded during store onboarding or migration.

Initial balances must have an identifiable source, effective date, responsible actor and verification status.

Opening balances must not be represented as ordinary sales, purchases or transfers unless those transactions actually occurred.

### 10.6 Acceptance and stock eligibility

Physical receipt and acceptance for sale are distinct concepts.

Stock that requires inspection or verification must remain unavailable for ordinary sale until it has been accepted or otherwise released under approved rules.

## 11. Stock Movement Architecture

### 11.1 Movement model

A stock movement records a change in inventory quantity or location.

The architecture must distinguish movement types, including:

- Receipt.
- Sale-related deduction.
- Reservation-related allocation or release.
- Location transfer.
- Store-to-store transfer.
- Customer return received.
- Restocking.
- Damage or loss.
- Quarantine.
- Adjustment.
- Approved correction.
- Other explicitly defined movement types.

### 11.2 Movement identity and references

Every movement must have a stable identifier and sufficient information to establish its origin, purpose and effect.

Where a movement results from another business operation, it must reference that operation.

Examples include an order, reservation, receipt, transfer, return or stock count.

### 11.3 Movement direction

A movement must clearly identify whether it increases, decreases or relocates eligible stock.

Transfers must preserve the relationship between the source and destination movements.

A location transfer must not be recorded as a new purchase or sale.

### 11.4 Atomic movement processing

Where an operation changes more than one inventory balance, the required changes must be processed atomically where they belong to one database transaction.

For example, a completed location transfer must not leave stock permanently deducted from the source while failing to record the destination receipt.

Where distributed processing is necessary, the architecture must provide durable state tracking, retry handling and reconciliation.

### 11.5 Idempotency

Operations that may be retried must have suitable idempotency controls.

Repeated requests, callbacks or background processing must not create duplicate stock movements.

The system must be able to recognise an already processed business operation and return or recover its existing result.

### 11.6 Movement corrections

Completed movements must not be silently edited or deleted to correct errors.

A correction must create an authorised compensating movement linked to the original transaction.

The original movement and its correction must remain traceable.

### 11.7 Movement status

Where processing is not immediate, movement records must distinguish pending, completed, failed, cancelled and other relevant states.

A movement must not affect available stock as completed until the applicable processing rules have been satisfied.

## 12. Stock Reservations and Allocation

### 12.1 Reservation purpose

A reservation temporarily allocates eligible stock to a defined business operation, such as an order awaiting payment or confirmation.

A reservation is not itself a physical stock movement.

It must be represented separately from on-hand inventory and from the final deduction of stock.

### 12.2 Reservation records

A reservation must identify:

- Reservation identifier.
- Store.
- Product and inventory location where applicable.
- Reserved quantity.
- Related order or business operation.
- Creation timestamp.
- Expiry or review information where applicable.
- Current reservation status.
- Release or consumption reference.
- Initiating actor or system process.

### 12.3 Reservation lifecycle

The architecture must support a controlled reservation lifecycle, including:

- Creation.
- Active allocation.
- Expiry.
- Release.
- Consumption.
- Cancellation.
- Failure or recovery.

The precise transition rules must be defined by approved commerce and inventory policies.

### 12.4 Reservation availability

Active reservations must reduce the quantity available for additional allocation.

Expired, released or consumed reservations must no longer reduce availability as active reservations.

The system must prevent a reservation from being consumed or released more than once.

### 12.5 Reservation expiry

Reservation expiry must be governed by an approved policy.

The system must not assume a universal expiry duration across all stores or order types.

Expiry processing must be reliable, idempotent and recoverable.

### 12.6 Concurrent reservations

Concurrent reservation requests must be coordinated against the same authoritative stock balance.

The system must not permit aggregate active reservations to exceed eligible available stock through race conditions.

### 12.7 Reservation release

Reservations must be released when the associated operation no longer requires the allocation, according to the applicable business rules.

Release must be recorded and must restore availability only to the extent that the stock remains eligible for sale.

### 12.8 Reservation consumption

When an order reaches the approved point at which stock is committed or deducted, the reservation must be consumed or otherwise resolved through a controlled transaction.

The implementation must prevent both the reservation and the resulting stock deduction from being counted as separate physical stock reductions.

### 12.9 Failed and uncertain operations

If reservation creation or consumption encounters an uncertain outcome, the system must verify the existing transaction state before retrying.

A timeout must not result in duplicate reservations, duplicate deductions or an uncontrolled release of stock that may already have been committed.

## 13. Inventory and Order Fulfilment Coordination

### 13.1 Domain separation

Commerce owns order lifecycle and fulfilment decisions.

Inventory owns stock balances, reservations and physical stock movements.

The domains must coordinate through explicit references and controlled operations.

### 13.2 Order creation

Creating an order must not automatically be assumed to deduct physical stock.

The approved reservation and commitment policy determines when stock is allocated and when on-hand quantity is reduced.

### 13.3 Order confirmation

Order confirmation must use the authoritative inventory state and applicable reservation rules.

The system must not rely solely on an earlier availability result returned to the frontend.

### 13.4 Stock commitment

The architecture must define the event or transaction that commits reserved stock to an order.

The commitment must be idempotent and traceable to the relevant order and reservation.

### 13.5 Fulfilment

Inventory operations must support the fulfilment model approved for the relevant store.

Where stock is picked, packed or dispatched, the system may record the corresponding operational events without confusing those events with the original sale or payment.

### 13.6 Partial fulfilment

Where an order is fulfilled in multiple parts, inventory records must support the corresponding quantities and fulfilment references.

The system must prevent a partially fulfilled order from causing the full ordered quantity to be deducted again.

### 13.7 Cancellation

Order cancellation must coordinate with reservation and stock commitment state.

Uncommitted reservations may be released according to approved rules.

Stock already deducted or dispatched must not be automatically restored merely because the order has been cancelled.

Any return to inventory must follow an explicit receiving, inspection and restocking operation.

### 13.8 Payment outcomes

Payment success, failure or uncertainty must be coordinated with Commerce.

Inventory must not independently infer payment success from frontend state or unverified provider messages.

Payment uncertainty must be resolved through the authoritative payment process before a related stock operation is repeated or reversed.

### 13.9 Returns and refunds

A refund is a financial operation and does not establish that physical stock has been returned.

Returned products must be received and assessed before their quantities or eligibility are changed.

The inventory outcome must be recorded separately from the refund outcome.

## 14. Inventory Transfers

### 14.1 Transfer types

The architecture must distinguish:

- Transfers between locations belonging to the same store.
- Transfers between participating stores.
- Stock supplied by the platform to a store.
- Other explicitly approved stock movement arrangements.

Each transfer type must preserve its source, destination and applicable ownership or commercial arrangement.

### 14.2 Transfer initiation

A transfer must be created with a unique reference and identify:

- Source store and location.
- Destination store and location.
- Product and requested quantity.
- Initiating actor.
- Transfer reason.
- Creation timestamp.
- Relevant approval or agreement.
- Current transfer status.

### 14.3 Transfer authority

The actor initiating a transfer must have authority over the relevant source operation.

Where the transfer affects another store, the applicable receiving or approval authority must also be established.

Platform ownership of the platform does not automatically authorise the transfer of store-owned stock.

### 14.4 Transfer approval

Approval requirements must follow the approved store operating and governance policies.

The architecture must support approval where required without assuming that every internal location movement requires platform-level approval.

### 14.5 Dispatch

Dispatch must record the quantity actually released from the source location, the dispatch actor and timestamp.

The system must distinguish requested quantity from dispatched quantity.

A transfer must not be treated as fully dispatched merely because it was created or approved.

### 14.6 In-transit inventory

Dispatched stock that has not yet been received must remain identifiable as in transit.

In-transit stock must not be treated as available stock at the destination.

The source deduction and in-transit record must be linked to the transfer.

### 14.7 Receipt

The destination must record the quantity physically received and its condition.

The system must support partial receipts, excess receipts, shortages and damaged goods.

The received quantity must not be assumed to equal the dispatched quantity.

### 14.8 Transfer completion

A transfer may be completed when the applicable dispatch and receipt obligations have been resolved.

Unreceived or disputed quantities must remain visible as outstanding exceptions.

### 14.9 Transfer cancellation

A transfer may be cancelled only in accordance with its current state.

A dispatched transfer must not be cancelled by simply restoring source stock while the goods may still be in transit.

The system must record any return, recovery or other resolution as a separate controlled operation.

### 14.10 Store-to-store ownership and accounting

A transfer between stores must not automatically establish a sale, purchase, loan or change in legal ownership.

The commercial and ownership consequences must follow the approved arrangement between the parties.

Where the transfer has financial consequences, Finance must record them separately using the relevant transaction references.

### 14.11 Transfer reconciliation

The system must support matching requested, approved, dispatched, received and outstanding quantities.

Unresolved differences must remain traceable until an authorised resolution is recorded.

## 15. Inventory Adjustments and Corrections

### 15.1 Adjustment purpose

An inventory adjustment records an authorised correction or change that cannot be represented accurately through an ordinary receipt, sale, transfer or other existing movement.

Adjustments must not become a routine method of bypassing the proper inventory transaction process.

### 15.2 Adjustment reasons

The architecture must support identifiable adjustment reasons, such as:

- Physical count discrepancy.
- Damage or spoilage.
- Loss or theft.
- Data correction.
- Receiving discrepancy.
- Unrecorded stock movement.
- Other approved operational reasons.

The reason categories must be configurable or governed rather than embedded as an unchangeable application assumption.

### 15.3 Adjustment records

An adjustment must capture:

- Adjustment identifier.
- Store and inventory location.
- Product.
- Quantity before and after the adjustment, or sufficient transaction references to establish the difference.
- Adjustment quantity and direction.
- Reason.
- Supporting evidence where applicable.
- Initiating actor.
- Authorising actor where approval is required.
- Timestamp.
- Related count, incident or investigation reference.

### 15.4 Adjustment authority

Adjustments must be subject to effective store permissions and applicable approval limits.

The system must support separation between the person requesting an adjustment and the person approving it where required by policy.

The platform must not silently impose an unapproved universal approval threshold.

### 15.5 Adjustment execution

An approved adjustment must create a traceable inventory transaction.

The resulting balance and movement history must remain consistent.

Repeated execution must not apply the same adjustment more than once.

### 15.6 Corrections

Where an earlier inventory transaction is incorrect, the correction must reference the original transaction and preserve its history.

The correction must not disguise the original error or remove accountability.

### 15.7 Financial consequences

An inventory adjustment may have financial consequences.

Those consequences must be assessed and recorded through the Finance domain according to the applicable accounting policy.

The inventory adjustment must not independently create an unapproved financial posting.

## 16. Physical Stock Counts

### 16.1 Count purpose

Physical stock counts compare recorded inventory balances with quantities physically observed at an approved location.

The architecture must support planned counts, targeted counts and investigation counts.

### 16.2 Count records

A stock count must identify:

- Count identifier.
- Store and inventory location.
- Products included.
- Count scope.
- Recorded balance used for comparison.
- Physical quantity counted.
- Count date and time.
- Counting actor.
- Review or approval information.
- Resulting discrepancies.
- Final count status.

### 16.3 Count scope

The system must support counts covering a full location, selected products or another approved inventory scope.

The count scope must be identifiable and reproducible.

### 16.4 Count snapshot

The architecture must preserve the recorded inventory position used as the basis for comparison.

Movements occurring during a count must be accounted for so that the comparison does not incorrectly treat valid intervening transactions as discrepancies.

### 16.5 Count execution

The system must support recording physical quantities independently of the expected quantity.

Where operationally appropriate, counters should not be forced to accept the expected balance as the physical count.

### 16.6 Count discrepancies

Differences between recorded and counted quantities must be recorded for investigation.

A discrepancy must not automatically become an approved stock adjustment.

### 16.7 Count review

Count results and material discrepancies must be reviewable by authorised users.

Approval requirements and thresholds must follow the approved operating policy.

### 16.8 Count finalisation

Finalising a count must preserve the original count result, reviewed discrepancies and resulting adjustment references.

Any inventory adjustment resulting from a count must be a separate traceable transaction.

### 16.9 Recounts

The architecture must support recounts where discrepancies require verification.

A recount must retain its relationship to the original count rather than silently replacing the original result.

### 16.10 Count concurrency

Stock movements during a count must be handled through an explicit consistency strategy.

The implementation may use controlled count windows, movement snapshots, transaction sequencing or equivalent mechanisms.

The selected approach must preserve accurate comparisons without unnecessarily preventing normal store operations.

## 17. Damaged, Lost and Quarantined Stock

### 17.1 Stock condition

Inventory records must distinguish ordinary saleable stock from stock that is damaged, defective, expired, quarantined or otherwise unsuitable for sale.

The architecture must support relevant condition and disposition records.

### 17.2 Quarantine

Stock requiring inspection or investigation may be placed in quarantine.

Quarantined quantities must be excluded from ordinary sale availability.

The system must record the reason, quantity, location, responsible actor and date of quarantine.

### 17.3 Damage and loss

Damage or loss must be recorded through a traceable inventory operation.

Where relevant, the record must include:

- Affected product and quantity.
- Store and location.
- Incident or investigation reference.
- Reason and known circumstances.
- Supporting evidence.
- Responsible actor.
- Disposition or resolution.

### 17.4 Inspection and disposition

Quarantined or damaged stock may be released, repaired, returned, written off or otherwise disposed of according to an approved process.

Each outcome must be recorded explicitly.

The system must not assume that inspection automatically makes stock saleable.

### 17.5 Expiry and product restrictions

Where product categories require expiry dates, batch identifiers or other restrictions, the inventory model must support those attributes where approved.

The architecture must not assume that all products require batch-level or expiry-level tracking.

### 17.6 Write-offs

A write-off must be an authorised inventory operation with a recorded reason and quantity.

Any related financial recognition must be handled separately through Finance.

### 17.7 Returns to saleable inventory

Stock returned from quarantine or another restricted state must pass the applicable inspection and authorisation requirements.

The system must preserve the history of its restricted and released states.

## 18. Inventory Reconciliation and Exception Management

### 18.1 Reconciliation purpose

Inventory reconciliation compares authoritative inventory records with relevant operational evidence and physical stock positions.

It is required to identify discrepancies, incomplete transactions and inconsistencies between recorded balances and actual stock.

### 18.2 Reconciliation scope

Reconciliation may cover:

- Inventory balances.
- Inventory movement history.
- Stock receipts.
- Reservations and commitments.
- Transfers.
- Order-related deductions.
- Returns and restocking.
- Adjustments.
- Physical stock counts.
- In-transit stock.
- Damaged and quarantined quantities.

### 18.3 Reconciliation records

A reconciliation record must identify:

- Reconciliation identifier.
- Store and relevant inventory scope.
- Period or effective timestamp.
- Data sources compared.
- Expected and observed values.
- Discrepancies.
- Investigation status.
- Responsible actor.
- Resolution references.
- Completion timestamp.

### 18.4 Reconciliation exceptions

The system must support recording and tracking exceptions such as:

- Missing stock movements.
- Duplicate movements.
- Reservations not released or consumed correctly.
- Transfer dispatches without corresponding receipts.
- Unexpected balance differences.
- Orders with unresolved inventory operations.
- Failed or incomplete background processing.
- Incorrect product or location references.

### 18.5 Investigation and resolution

An identified discrepancy must be investigated before an adjustment or other corrective operation is authorised.

The investigation record must preserve the evidence, findings, decision and responsible parties.

### 18.6 Reconciliation corrections

Corrections must use the appropriate inventory transaction and must preserve the original records.

A reconciliation process must not silently rewrite balances or delete transaction history.

### 18.7 Automated reconciliation

Automated checks may identify discrepancies and generate investigation tasks.

Automation must not independently approve material adjustments, transfer ownership or make financial decisions without an explicitly approved authority model.

### 18.8 Reconciliation completion

A reconciliation must distinguish completed checks from unresolved exceptions.

A process must not be marked fully resolved merely because its automated checks have finished.

### 18.9 Auditability

Reconciliation results and corrections must be traceable to their source records, investigation evidence and authorised actions.

The history must support subsequent store reviews and platform oversight.

## 19. Inventory Security and Authorisation

### 19.1 Security boundaries

Inventory access must be enforced by the backend using authenticated identity, active store membership, effective permissions and validated store context.

Frontend visibility controls are not security boundaries.

### 19.2 Store-level authorisation

Every inventory operation must establish the store to which it applies.

A user authorised to manage inventory for one store must not automatically gain access to another store's inventory.

The backend must validate store ownership and operation authority for every relevant request.

### 19.3 Platform-level access

Platform Super Admin permissions and other platform-level permissions must be distinct from ordinary Store Admin permissions.

Platform-level access must be explicitly defined and limited to approved platform responsibilities.

The existence of a platform role must not create unrestricted access to all store inventory operations.

### 19.4 Store Admin permissions

Store Admins may manage inventory within their authorised store responsibilities.

Their authority may include assigning inventory-related permissions to employees, subject to the approved role and delegation model.

A Store Admin must not grant permissions beyond their own authority or bypass platform-defined security boundaries.

### 19.5 Employee permissions

Employees must receive only the inventory permissions required for their assigned responsibilities.

Permissions may distinguish operations such as:

- View inventory.
- Record stock receipts.
- Manage reservations.
- Initiate transfers.
- Receive transfers.
- Perform stock counts.
- Request adjustments.
- Approve adjustments where authorised.
- Manage inventory locations.
- View inventory reports.

The final permission catalogue must be defined through the identity and access model.

### 19.6 Separation of duties

Where required by approved policy, the system must distinguish between initiating, reviewing and approving sensitive inventory operations.

The architecture must support separation of duties without assuming that every ordinary stock operation requires multiple approvals.

### 19.7 Privileged operations

Operations involving material adjustments, cross-store transfers, exceptional stock corrections or other sensitive changes must follow the relevant authority and approval rules.

Approval must be recorded with the operation.

### 19.8 Data isolation

Store-scoped inventory data must be protected at the database and application layers.

Where Row Level Security is used, its policies must complement backend authorisation rather than replace it.

Database relationships must prevent records from referencing inventory entities belonging to an unrelated store where store ownership is required.

### 19.9 Sensitive information

Inventory data must be exposed according to the user's responsibilities.

Supplier terms, acquisition costs, stock valuation information, investigation evidence and other commercially sensitive information must not be exposed through ordinary inventory endpoints without appropriate authority.

### 19.10 Audit requirements

The system must record relevant inventory actions, including:

- Actor and effective identity.
- Store context.
- Operation performed.
- Affected inventory records.
- Previous and resulting values where applicable.
- Reason and supporting reference.
- Approval information where applicable.
- Timestamp and outcome.

Audit records must not be editable through ordinary inventory administration.

## 20. Inventory Valuation and Financial Boundaries

### 20.1 Domain separation

Inventory records describe physical stock quantities, movements, conditions and availability.

Finance remains authoritative for financial transactions, accounting records and approved financial valuation.

The Inventory domain must not become a substitute accounting ledger.

### 20.2 Stock acquisition information

The architecture must support references to relevant acquisition information where required.

Such information may include supplier references, purchase records, supply arrangements, unit costs and associated financial obligations.

Access to acquisition costs must follow appropriate permissions.

### 20.3 Inventory valuation

Inventory valuation methods must be selected through an approved accounting and business decision.

The architecture must not assume a valuation method such as FIFO, weighted average or specific identification without an explicit decision.

The selected method must be appropriate to the business, supported by the accounting model and reviewed by qualified South African accounting professionals where required.

### 20.4 Valuation snapshots

Where inventory valuation information is recorded or reported, the system must preserve the relevant effective date, valuation method, source data and calculation references.

Historical reports must not silently change because current product costs or commercial arrangements have changed.

### 20.5 Stock supplied by the platform

Stock supplied by the platform must retain references to its source and agreed commercial arrangement.

The architecture must distinguish physical possession, operational control, legal ownership and financial obligations.

The accounting treatment must follow the approved arrangement rather than being inferred from the inventory movement.

### 20.6 Store financial separation

Inventory movements belonging to a store must remain attributable to that store.

Platform-level stock supply, capital assistance, repayments and other financial obligations must be represented through the appropriate Finance records.

Store inventory balances must not be combined with platform financial balances.

### 20.7 Cost and selling price

Acquisition cost, inventory valuation and selling price are separate concepts.

A store's selling price must not automatically change its inventory valuation.

A product's catalogue price must not be used as a substitute for acquisition cost or accounting valuation.

### 20.8 Inventory losses and write-offs

Damage, theft, expiry, loss and authorised write-offs may have financial consequences.

The Inventory domain records the operational event and affected quantity.

Finance determines and records the applicable financial treatment.

### 20.9 Financial reconciliation

Inventory quantities and financial balances may require reconciliation, but they are not interchangeable.

Differences must be investigated using the relevant inventory and financial source records.

Financial corrections and postings must follow the Finance authority and approval model.

## 21. Inventory Reporting and Performance

### 21.1 Reporting responsibilities

The Inventory domain must provide reliable operational data for authorised store management and platform oversight.

Reporting must distinguish operational stock information from financial valuation and accounting information.

### 21.2 Store inventory reporting

Authorised store users may require reports covering:

- Current stock by product.
- Available and reserved quantities.
- Stock by inventory location.
- Stock receipts.
- Stock movements.
- Transfers and outstanding receipts.
- Damaged and quarantined stock.
- Physical stock count results.
- Inventory adjustments.
- Reconciliation exceptions.
- Low-stock indicators where configured.

### 21.3 Platform inventory reporting

Platform users may require approved cross-store reporting for oversight and support.

Reports must preserve store boundaries and identify the store to which each quantity or transaction belongs.

Aggregated platform reports must not imply that stock is centrally owned or freely transferable.

### 21.4 Inventory performance indicators

Potential inventory indicators include:

- Stock availability.
- Stock-out frequency.
- Inventory movement volume.
- Stock adjustment frequency.
- Receiving discrepancies.
- Transfer completion and discrepancy rates.
- Stock count accuracy.
- Damaged or quarantined stock.
- Inventory age where the required data exists.
- Reconciliation exception frequency.

The final indicator definitions and reporting rules must be approved.

### 21.5 Contextual performance assessment

Inventory performance must be interpreted in the context of the store's product categories, operating history, supply arrangements and agreed business targets.

A store must not be judged solely by raw stock quantities or comparison with a materially different store.

### 21.6 Explainability

Reports and performance assessments must identify their underlying data, calculation basis and relevant reporting period.

Material discrepancies and incomplete data must be visible rather than silently excluded.

### 21.7 Reporting consistency

Reports must use clearly defined effective dates and transaction states.

The system must distinguish current inventory balances from historical balances and transaction activity over a reporting period.

### 21.8 Export controls

Inventory exports must respect store scope and effective permissions.

Sensitive supplier, cost, valuation and investigation data must receive appropriate protection.

Exports should be auditable where they expose sensitive or commercially significant information.

## 22. Reliability, Concurrency and Background Processing

### 22.1 Transaction reliability

Inventory operations must preserve consistency across related records.

Where an operation requires multiple database changes, those changes must be coordinated through appropriate transactional boundaries.

### 22.2 Concurrency control

Concurrent operations affecting the same inventory balance must be handled safely.

The implementation must prevent overselling, duplicate allocation and inconsistent resulting balances.

### 22.3 Background processing

Background processes may be used for:

- Reservation expiry.
- Inventory reconciliation.
- Scheduled stock checks.
- Transfer exception detection.
- Low-stock notifications.
- Reporting preparation.
- Recovery of incomplete operations.

Background processing must not bypass the same authorisation, transaction and audit requirements that apply to direct operations.

### 22.4 Durable processing

Where an inventory operation requires asynchronous processing, the system must preserve enough information to recover after a failure.

Queued work must have identifiable status, retry behaviour and failure handling.

### 22.5 Idempotent processing

Background jobs and event handlers must be idempotent.

A retried job must not repeat a completed stock deduction, transfer, reservation release or adjustment.

### 22.6 Failed operations

Failures must remain observable and recoverable.

The system must distinguish operations that failed before changing inventory from operations whose outcomes are uncertain.

Uncertain outcomes must be checked against authoritative records before retrying.

### 22.7 Event ordering

Where the order of inventory events affects correctness, the system must preserve or verify the required sequence.

Late, duplicate or out-of-order events must not silently produce incorrect stock balances.

### 22.8 Notifications

Inventory notifications may communicate low-stock conditions, transfer updates, discrepancies and operational exceptions.

Notification delivery must not be treated as proof that an inventory transaction succeeded.

A notification failure must not reverse a completed inventory operation.

### 22.9 Observability

The platform must provide appropriate logging, metrics and alerts for inventory processing.

Operational visibility must include failed transactions, stuck reservations, incomplete transfers, repeated processing failures and reconciliation exceptions.

Logs must avoid unnecessary exposure of sensitive commercial or personal information.

## 23. Inventory API Architecture

### 23.1 API responsibility

Inventory APIs must expose controlled operations for inventory records, availability, receipts, movements, reservations, transfers, adjustments, stock counts and reconciliation.

The API must not expose unrestricted database operations or permit clients to directly overwrite authoritative balances.

### 23.2 API organisation

Inventory endpoints must follow the approved backend API architecture and module boundaries.

The target NestJS API must use the approved versioned API convention, including `/api/v1/`.

The existing production Netlify Function routes remain the production baseline until their migration is completed and verified.

### 23.3 Store context

Store context must be established and validated by the backend.

A store identifier supplied by the client must not, by itself, establish authority to access or modify that store's inventory.

### 23.4 Request validation

Inventory requests must validate:

- Product and store references.
- Inventory location.
- Quantity and supported precision.
- Operation type.
- Current transaction state.
- Required reason or supporting information.
- Relevant source and destination references.
- Applicable permissions and approval requirements.

Invalid or conflicting requests must be rejected without partially applying an operation.

### 23.5 Availability endpoints

Availability responses must clearly distinguish on-hand, reserved and available quantities where the caller is authorised to see them.

Public storefront responses must expose only the availability information needed for the approved customer experience.

### 23.6 Transaction endpoints

Stock-changing endpoints must use explicit business operations rather than generic balance updates.

The API must return a traceable transaction reference and an appropriate processing outcome.

### 23.7 Idempotency

Operations vulnerable to duplicate submission must support suitable idempotency keys or equivalent transaction identity controls.

The API must distinguish a repeated request from a new business operation.

### 23.8 Pagination and filtering

Inventory lists and transaction histories must support appropriate pagination, filtering and sorting.

Filtering must not allow users to bypass store-level access boundaries.

### 23.9 Error handling

API errors must communicate validation failures, insufficient stock, invalid state transitions, permission failures and recoverable processing conditions without exposing sensitive internal implementation details.

### 23.10 API documentation

Inventory contracts, operation states, request validation and error responses must be documented and tested.

API changes must remain compatible with active consumers or be introduced through a controlled migration.

## 24. Inventory Testing Architecture

### 24.1 Testing objectives

Inventory testing must establish quantity correctness, store isolation, transaction integrity, authorisation and recoverability.

Successful compilation alone is not sufficient evidence that inventory operations are correct.

### 24.2 Unit testing

Unit tests must cover:

- Available quantity calculations.
- Reservation state transitions.
- Movement direction and quantity effects.
- Transfer state transitions.
- Adjustment rules.
- Stock count calculations.
- Inventory status eligibility.
- Validation and error conditions.

### 24.3 Integration testing

Integration tests must verify inventory operations against the database and relevant application modules.

Tests must establish that related records and inventory balances remain consistent.

### 24.4 Store isolation testing

Tests must verify that:

- One store cannot view another store's restricted inventory.
- One store cannot change another store's stock.
- Cross-store transfers require the relevant authority.
- Shared products do not combine store inventory.
- Store identifiers cannot be manipulated to bypass access controls.
- Platform permissions are enforced according to their defined scope.

Both permitted and denied operations must be tested.

### 24.5 Concurrency testing

Tests must simulate concurrent reservations, sales, deductions and transfers against limited stock.

The system must not produce overselling, duplicate deductions or inconsistent balances.

### 24.6 Idempotency testing

Tests must cover repeated requests, duplicate callbacks, retried background jobs and interrupted processing.

A completed business operation must not be applied twice.

### 24.7 Reservation testing

Tests must cover reservation creation, expiry, release, consumption, cancellation and uncertain outcomes.

The tests must establish that reservations affect availability correctly without being counted as separate physical stock movements.

### 24.8 Transfer testing

Tests must cover partial dispatches, partial receipts, damaged quantities, discrepancies, cancellation and recovery.

The source, in-transit and destination quantities must remain consistent.

### 24.9 Stock count and adjustment testing

Tests must cover count snapshots, concurrent movements, discrepancies, recounts, approvals and adjustment execution.

A count discrepancy must not automatically become an authorised adjustment.

### 24.10 Commerce integration testing

Tests must cover order creation, payment outcomes, fulfilment, cancellation, returns and refunds.

A refund must not automatically restore inventory.

A cancelled order must not restore dispatched or physically unavailable stock without a valid inventory operation.

### 24.11 Security testing

Tests must cover employee permissions, Store Admin delegation, platform access, privileged adjustments and sensitive inventory information.

The system must reject unauthorised operations even where a user manipulates API requests or identifiers.

### 24.12 Migration testing

Tests must verify existing Yotaabo stock balances, product relationships, inventory history where available and compatibility with active commerce operations.

Migration tests must include representative data volumes and failure recovery.

## 25. Migration from Existing Yotaabo Inventory

### 25.1 Migration objective

The existing Yotaabo storefront and administrative inventory workflows must continue operating while the platform moves toward the target multi-store architecture.

Migration must preserve existing production data and avoid unintended changes to live inventory.

### 25.2 Existing inventory assessment

Before migration, the current inventory implementation must be assessed to identify:

- Existing product and listing relationships.
- Existing stock quantity fields.
- Current stock update behaviour.
- Order-related stock deductions.
- Reservation or allocation behaviour, if present.
- Manual stock adjustments.
- Inventory-related database functions and triggers.
- Existing API and frontend dependencies.
- Existing data inconsistencies.

The actual production schema and behaviour must be verified rather than inferred from documentation.

### 25.3 Data mapping

Existing inventory records must be mapped to the target store and product relationships.

Existing Yotaabo inventory must be associated with the Yotaabo store context.

Migration must not create shared inventory merely because products are reused in the target catalogue.

### 25.4 Opening balances

Opening balances must be established from verified existing inventory data or an approved physical stock reconciliation.

The migration must record the source, effective date and verification status of opening quantities.

Unverified balances must be identified for review rather than silently treated as accurate.

### 25.5 Historical transaction migration

Existing inventory movement history should be preserved where it is available and reliable.

Where historical transactions cannot be reconstructed, the migration must document the limitation and preserve the verified opening position.

The system must not fabricate historical receipts, sales or transfers to make incomplete records appear complete.

### 25.6 Migration sequencing

Inventory migration must be coordinated with product catalogue, commerce, database and application migration.

The migration plan must identify which implementation is authoritative for stock-changing operations at each stage.

### 25.7 Coexistence

During coexistence, multiple application components must not independently apply the same inventory transaction.

Existing Netlify Function behaviour remains authoritative until the corresponding target operation has been migrated, verified and activated.

### 25.8 In-flight operations

The migration must account for active reservations, pending orders, incomplete fulfilment, returns, transfers and background jobs.

These operations must remain recoverable and must not be duplicated, lost or incorrectly finalised.

### 25.9 Cutover verification

Before activating a migrated inventory workflow, verification must establish:

- Correct store and product relationships.
- Correct opening balances.
- Correct availability calculations.
- Correct reservation behaviour.
- Correct order-related deductions.
- Correct transfer and adjustment behaviour where applicable.
- Correct store isolation.
- Correct permissions.
- Successful integration and regression tests.

### 25.10 Rollback

A rollback plan must identify the authoritative inventory implementation and the treatment of transactions processed during the migration.

Rolling back application code must not silently reverse valid stock movements or discard completed transactions.

Where data changes have occurred, the recovery plan must preserve transaction history and reconcile the resulting balances.

### 25.11 Production protection

Destructive or high-risk production changes require an appropriate verified recovery point and a tested recovery procedure.

Production migration must be coordinated with active commerce operations and must avoid conflicting inventory writes.

## 26. Architectural Constraints

The inventory implementation must comply with the following constraints:

- Each participating store has independent inventory.
- Shared products do not imply shared stock.
- Product ownership and physical stock ownership remain distinct.
- Store context and authorisation are enforced by the backend.
- Inventory changes are traceable transactions.
- Reservations are distinct from physical stock movements.
- Transfers preserve source, in-transit and destination history.
- Physical stock counts do not automatically authorise adjustments.
- Inventory valuation and financial postings remain within Finance authority.
- Refunds do not automatically establish physical returns.
- Background processing must be durable, idempotent and recoverable.
- Existing Yotaabo production operations must remain protected during migration.
- The initial architecture must avoid unnecessary warehouse-management complexity.
- Unapproved commercial, accounting and operational rules must not be hard-coded.

## 27. Open Inventory Architecture Decisions

The following decisions remain unresolved and must be made through the appropriate business, operational, technical or accounting review.

| Decision | Responsible area | Required clarification |
|---|---|---|
| Inventory location model | Business and Operations | Whether initial stores require multiple locations |
| Quantity precision | Product and Inventory | Supported units and fractional quantities |
| Variant and SKU model | Product Catalogue and Inventory | Which product options require separate stock balances and the scope of SKU uniqueness |
| Reservation policy | Commerce and Inventory | When reservations are created, expire and become committed |
| Stock deduction timing | Commerce and Inventory | The authoritative event that reduces on-hand stock |
| Negative inventory | Business and Operations | Whether any exceptional negative balance is permitted |
| Receiving workflow | Operations | Inspection, acceptance and discrepancy handling |
| Transfer authority | Governance and Operations | Initiation, approval and receipt responsibilities |
| Store-to-store supply | Business and Finance | Ownership and commercial treatment |
| Platform-supplied stock | Business and Finance | Ownership, payment terms and outstanding obligations |
| Adjustment approval | Governance | Approval roles and materiality thresholds |
| Stock count policy | Operations | Frequency, scope and review requirements |
| Damaged stock policy | Operations | Inspection, quarantine and disposition procedures |
| Batch and expiry tracking | Product and Operations | Which product categories require these controls |
| Inventory valuation | Finance | Approved valuation method and accounting treatment |
| Inventory write-offs | Finance and Governance | Financial treatment and approval authority |
| Reorder thresholds | Store Operations | Whether thresholds are configured per store and product |
| Low-stock automation | Product and Operations | Notification and task-generation rules |
| Cross-store inventory visibility | Governance | Platform reporting and access boundaries |
| Inventory retention | Legal and Governance | Applicable record-retention requirements |
| Migration strategy | Engineering and Operations | Detailed production migration and cutover sequence |

No unresolved decision in this table should be interpreted as an approved operational policy.

## 28. Relationship to Other Documents and Governance

### 28.1 Product architecture

This document implements the inventory responsibilities established by:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.

### 28.2 Architecture documents

This document must remain consistent with:

- System Architecture.
- Data Architecture.
- Store Architecture.
- Application Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Operations Architecture.
- Integration Architecture.
- Commerce Architecture.
- Identity and Access Architecture.

### 28.3 Domain boundaries

The Inventory domain must coordinate with Product Catalogue, Stores, Commerce, Finance, Activity and Audit, Notifications and Reporting through explicit contracts.

No domain may silently assume another domain's authority.

### 28.4 Decision management

Material changes to inventory ownership, store isolation, transaction integrity, reservation behaviour or financial boundaries must be reviewed through the appropriate architecture and business governance process.

Unresolved decisions must be documented and approved before they become binding implementation rules.

### 28.5 Architecture changes

Changes to this document must preserve consistency with approved architecture documents.

Material revisions must identify affected domains, migration implications, security consequences and operational impact.

### 28.6 Approval

This document remains a draft until reviewed and explicitly approved by the business owner.

Approval must be reflected in the document metadata only after confirmation.
