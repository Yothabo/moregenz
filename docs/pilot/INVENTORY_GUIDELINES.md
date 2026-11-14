# Simatu Inventory Implementation and Compliance

## 1. Purpose

This document defines the scope, implementation record, data integrity rules and verification requirements for the Inventory module.

It is the authoritative implementation document for the current Inventory workstream. Its compliance checks are independent of Admin Overview.

This document records the implementation as it exists. A database table, UI placeholder, planned feature or descriptive message must not be reported as a completed operational feature.

This is a local development document. Do not commit or push it unless that restriction is explicitly changed.

## 2. Scope and boundaries

Inventory covers:

- Store-scoped product stock balances.
- Opening stock initialization.
- Stock received from suppliers.
- Audited stock increases and decreases.
- Stock reservations and available quantities.
- Stock movement history.
- Inventory overview metrics.
- The database foundation for direct sales and receipts.

Inventory does not include the implementation of Admin Overview reporting.

The Direct sales and Receipts navigation sections currently render explanatory placeholder content. They are not operational workflows. Their presence in the interface must not be interpreted as completed direct-sales or receipt functionality.

Do not modify storefront behaviour as part of Inventory work.

## 3. Implementation architecture

The current implementation consists of:

| Layer | Location | Responsibility |
|---|---|---|
| Admin interface | `src/features/admin/components/inventory/AdminInventory.tsx` | Inventory navigation, overview, stock balances, stock actions and movement history |
| API | `netlify/functions/inventory.mjs` | Authenticated inventory reads and stock movement operations |
| Database foundation | `database/migrations/20261111_001_inventory_financial_foundation.sql` | Inventory, reservations, direct-sales and receipt schema |
| Store integrity | `database/migrations/20261112_001_inventory_store_integrity.sql` | Additional store-level integrity constraints |
| Integrity corrections | `database/migrations/20261112_002_inventory_integrity_corrections.sql` | Follow-up inventory integrity corrections |
| API tests | `tests/unit/inventory-api.test.ts` | Inventory API behaviour and stock movement tests |

The interface consumes backend inventory data. It must not independently invent or persist stock balances.

The API is responsible for authorization, store resolution, input validation, database transactions and returning persisted results.

Database constraints and transactional operations remain the final protection for stock integrity. Frontend validation is not a substitute.

## 4. Data model and migration record

The inventory foundation introduces or extends the following data areas:

- Product supplier cost and SKU fields.
- Store ownership on orders.
- Nullable `order_items.unit_cost` for a historical cost snapshot.
- Inventory balances.
- Inventory movements.
- Order stock reservations.
- Direct sales and direct-sale items.
- Receipt records.

The migration sequence currently associated with this work is:

1. `20261111_001_inventory_financial_foundation.sql`
2. `20261112_001_inventory_store_integrity.sql`
3. `20261112_002_inventory_integrity_corrections.sql`

All migrations must be reviewed as a sequence. Do not assume that the existence of a migration file proves that it has been applied to a database.

### 4.1 Inventory balances

Balances are store-scoped and product-scoped.

The API exposes:

- `on_hand_quantity`: physical units recorded on hand.
- `reserved_quantity`: units allocated to reservations.
- `available_quantity`: physical stock less reserved stock.
- `is_initialized`: whether opening stock has been recorded.
- `updated_at`: last balance update.

An uninitialized balance is not equivalent to an initialized zero balance. The interface must preserve that distinction.

### 4.2 Inventory movements

Movements provide an audit record of stock changes. Relevant movement types include:

- `opening_stock`
- `replenishment`
- `adjustment_increase`
- `adjustment_decrease`

Movement records include the quantity delta, reason, actor and creation timestamp, together with the relevant store and product.

A balance change must not be treated as complete if its corresponding movement record fails to persist.

### 4.3 Direct sales and receipts schema

The database foundation includes `direct_sales`, `direct_sale_items` and `receipts`.

Direct-sale records support completed and voided states. Direct-sale items preserve product identity, quantity, unit price, optional unit cost and generated line total.

Receipt records support draft, approved, sent and voided states.

These database structures do not establish that the corresponding API or admin workflows are implemented. The current UI sections remain placeholders.

A sent receipt proves that a receipt was issued. It does not prove that payment was received.

## 5. API behaviour and contract

The inventory endpoint is implemented in `netlify/functions/inventory.mjs` and is exposed through `/api/inventory`.

The API is responsible for returning store-scoped inventory data, including product identity, SKU, supplier cost, active state, balance quantities and initialization state.

Movement history includes the movement type, quantity delta, reservation delta, source information, reason, actor and timestamp. The response also exposes received and adjusted aggregates.

Stock writes must:

1. Authenticate the caller.
2. Resolve the caller's authorized store context.
3. Validate the requested action, product, quantity and reason.
4. Confirm that the product belongs to the authorized store and is eligible for the operation.
5. Execute balance and movement changes transactionally.
6. Roll back on failure.
7. Release the database connection.
8. Return the persisted result.

The API must reject invalid product identifiers, invalid quantities, duplicate opening-stock initialization, movements before opening stock initialization, decreases that would reduce physical stock below reserved stock, and balances beyond the supported PostgreSQL integer range.

Non-opening movements require a reason.

Opening stock may omit a reason. The interface must make this exception clear and must not weaken the API validation.

## 6. Stock lifecycle and integrity rules

### 6.1 Opening stock

Opening stock initializes a product's inventory balance. It may only be recorded once for a product balance.

A second opening-stock operation must be rejected. Replenishment and adjustments must not silently initialize an uninitialized balance.

### 6.2 Replenishment

Replenishment increases physical stock and records a `replenishment` movement with a reason.

### 6.3 Adjustments

Adjustments record verified physical stock corrections.

An increase records `adjustment_increase`. A decrease records `adjustment_decrease`.

A decrease must not cause on-hand stock to fall below reserved stock. The API must reject the operation rather than silently changing reservations.

### 6.4 Reservations

Available stock is calculated as:

`available_quantity = on_hand_quantity - reserved_quantity`

Reservations must not be confused with physical stock movements. Inventory reporting must distinguish physical, reserved and available quantities.

### 6.5 Transaction consistency

A stock balance update and its movement record form one logical operation. If either write fails, the transaction must roll back. Connections must be released on both successful and failed paths.

## 7. Inventory interface

The Inventory interface currently has four sections:

### 7.1 Overview

Displays:

- Stock units, representing physical units on hand.
- Stock valuation, based on recorded supplier costs.
- Out-of-stock product count, based on available quantity.
- Reserved units.
- Available units.
- Uninitialized products.
- Recent stock movements.

Stock valuation is partial when stocked products have no supplier cost. The interface must disclose the number of unvalued stocked products and must not imply that a partial valuation is complete.

Recent movements support product/SKU search and movement-type filtering. The interface displays a limited set of the latest loaded records.

### 7.2 Stock management

Displays store-scoped stock balances and supports:

- Product/SKU search.
- Receiving stock.
- Increasing stock through a verified adjustment.
- Decreasing stock through a verified adjustment.
- Quantity validation.
- Reason capture.
- Submission/loading and error feedback.

The balance table distinguishes on-hand, reserved and available quantities. Missing supplier cost is displayed as unavailable, not as zero.

### 7.3 Direct sales

This section currently contains placeholder explanatory content only.

The text describes a future workflow for recording offline transactions, selecting products, capturing quantities and payment details, and updating inventory through audited movements.

Do not report any of those operations as implemented. The existence of direct-sales database tables does not make this section operational.

### 7.4 Receipts

This section currently contains placeholder explanatory content only.

The text describes a future workflow for reviewing, approving and sending receipt records and tracking their status.

Do not report receipt creation, approval, sending or status tracking as implemented in the admin interface.

## 8. Store isolation and authorization

Inventory data and mutations must be scoped to the authenticated user's authorized store.

The API must derive store authorization from the authenticated session and server-side authorization context. A client-supplied store identifier must never grant access to another store.

Product ownership, inventory balances, movements, direct-sale records and receipt records must preserve store consistency through database constraints and API validation.

A frontend filter is not an authorization boundary.

Tests must cover unauthorized access and cross-store isolation wherever those behaviours are implemented by the endpoint.

## 9. Testing requirements

The current Inventory API test file is:

`tests/unit/inventory-api.test.ts`

The test suite includes stock movement coverage for:

- Opening stock and persisted balance/movement results.
- Duplicate opening-stock rejection.
- Rejection of movements before initialization.
- Replenishment.
- Adjustment increases.
- Adjustment decreases.
- Required reasons for non-opening movements.
- Decreases below reserved stock.
- PostgreSQL integer-range protection.
- Invalid product identifiers.
- Transaction rollback and connection release when movement insertion fails.

The test file must remain focused on observable API behaviour. A test that only asserts that a query was attempted is not sufficient when the persisted result or failure behaviour can also be verified.

Do not claim that unit tests prove database migrations have been applied, production authorization is correctly configured, or the UI has been browser-tested.

## 10. Known limitations and exclusions

The following limitations must remain explicit until separately implemented and verified:

1. Direct sales is a UI placeholder. The database foundation does not constitute a working sales workflow.
2. Receipts is a UI placeholder. The database foundation does not constitute a working receipt workflow.
3. No payment settlement fields or payment-confirmation workflow have been established by the current schema. A completed direct sale or sent receipt must not be presented as proof of collected funds.
4. No low-stock threshold has been defined. Do not invent a low-stock metric or alert.
5. Stock valuation depends on recorded supplier costs. Missing supplier costs make the valuation partial.
6. Historical online-order cost snapshots are not reliably populated. Do not calculate historical gross profit by applying current supplier costs to old orders.
7. Do not infer item-level fulfilment or payment settlement from an order status.
8. Migration files existing in the repository does not prove that the migrations have run in the target database.

These limitations must not be hidden by placeholder UI, zero values or optimistic labels.

## 11. Verification gates

Every gate must have a status and evidence. Use `NOT RUN` until the relevant verification has actually been performed.

| Gate | Status | Evidence |
|---|---|---|
| Inventory migration sequence reviewed | NOT RUN | Pending migration review and target-database verification |
| Inventory API authentication and store isolation | NOT RUN | Pending authorization test evidence |
| Inventory read contract and returned balances | NOT RUN | Pending API response verification |
| Opening stock and duplicate initialization | NOT RUN | Pending test execution evidence |
| Replenishment and adjustment behaviour | NOT RUN | Pending test execution evidence |
| Reservation and integer-boundary protections | NOT RUN | Pending test execution evidence |
| Transaction rollback and connection release | NOT RUN | Pending test execution evidence |
| Inventory interface states and stock actions | NOT RUN | Pending browser verification |
| Direct sales and Receipts placeholder boundaries | NOT RUN | Pending source review confirming no operational workflow is claimed |
| Inventory API automated test suite | NOT RUN | Pending test command and result |

A gate may be marked `PASS` only when its evidence identifies the actual command, test result, database verification or browser verification performed.

A gate must be marked `FAIL` when verification identifies a defect. Do not mark a gate `PASS` because implementation is planned or because a file exists.

## 12. Completion criteria

Inventory documentation and compliance are complete when:

- All required sections in this document are present.
- The migration sequence and integrity constraints have been reviewed.
- API authentication and store isolation have been verified.
- Read and write behaviour has been tested.
- Stock movement and transaction failure paths have been tested.
- The interface has been browser-verified.
- Placeholder sections are accurately identified.
- Every verification gate has evidence.
- No unresolved defect is represented as a pass.

Completion of this document does not authorize changes to Admin Overview or storefront functionality.

## 13. Development rules

- Do not modify Inventory implementation while working on Admin Overview.
- Do not combine Inventory and Admin Overview compliance checks.
- Do not claim unimplemented Direct sales or Receipts functionality.
- Do not weaken store isolation or database integrity to make a test pass.
- Do not replace missing or unavailable data with fabricated zero values.
- Do not infer payment, settlement, profit or historical cost information.
- Preserve unrelated working-tree changes.
- Do not commit or push this local development document or its compliance script unless explicitly authorized.
