# Admin and Inventory Overview Alignment

## Active development phase

**Phase:** Admin and Inventory Overview Alignment
**Status:** IN PROGRESS
**Document type:** Local development guide
**Purpose:** Define, track and verify the implementation requirements for the active development section.

This is a working document. It changes as development progresses. It is not a permanent architecture specification or a release document.

This freeze covers the Admin Overview and Inventory module, with particular focus on consistent, database-backed reporting. It remains active until all acceptance criteria and verification gates pass.

Do not commit or push this document or its compliance script.

---

## 1. Scope

Implement and verify the pilot's inventory functionality and align the Admin Overview with Inventory Overview. Both pages must report the same underlying business activity using consistent definitions and authoritative data.

The work covers:

- Inventory database integrity and migrations.
- Inventory balances and stock movements.
- Stock availability and reservation handling.
- Checkout integration and order-related stock transitions.
- Pending-order expiry and reservation release.
- Inventory overview and stock management.
- Main Admin Overview reporting and its integration with inventory data.
- Shared metric definitions, storefront scope and data authenticity.
- Direct sales.
- Receipts.
- Store-level access control.
- Admin interface integration.
- Automated tests and regression verification.

The four inventory interface sections are:

1. **Overview:** Inventory position, stock availability and inventory activity.
2. **Stock Management:** Opening stock, replenishment and controlled adjustments.
3. **Direct Sales:** Record sales made outside the online checkout process.
4. **Receipts:** Create and manage receipts against supported transactions.

## 2. Scope boundaries

Do not expand this phase into unrelated work.

Out of scope:

- Storefront redesign or unrelated storefront functionality.
- General dashboard redesign outside the two Overview reporting surfaces.
- Product catalogue redesign.
- Admin settings redesign.
- Unrelated authentication redesign.
- General analytics unrelated to inventory and sales.
- Unrelated performance optimisation or bundle-size work.

If an unrelated defect blocks inventory implementation, document the blocker and its impact before changing unrelated code.

Preserve existing working changes. Do not discard or overwrite work simply because it predates this phase.

## 3. Existing implementation to assess

The following implementation already exists and must be inspected before extending it:

- `netlify/functions/inventory.mjs`
- `src/features/admin/components/inventory/AdminInventory.tsx`
- `src/features/admin/components/AdminOverview.tsx`
- `src/features/admin/types/admin.types.ts`
- `src/pages/Admin.tsx`
- `database/migrations/20261111_001_inventory_financial_foundation.sql`
- `database/migrations/20261112_001_inventory_store_integrity.sql`
- `database/migrations/20261112_002_inventory_integrity_corrections.sql`

Existing implementation is not automatically considered complete. Each requirement below must be verified against code, database behaviour and tests.

---

## 4. Database and integrity

- [x] Review the existing inventory migrations against the actual database schema.
- [x] Verify inventory balances are unique per store and product.
- [ ] Verify inventory movements retain an auditable history.
- [x] Verify reservations are associated with the correct store, order and product.
- [x] Verify direct sales and their items have correct store relationships.
- [x] Verify receipts have valid store and transaction relationships.
- [x] Verify foreign keys, unique constraints, check constraints and indexes.
- [ ] Verify existing products and orders are backfilled without overwriting valid inventory data.
- [ ] Verify migration ordering and safe repeatability where applicable.
- [ ] Identify and resolve schema inconsistencies before relying on the affected functionality.

**Database verification evidence**

| Area | Assessment | Evidence and limitation |
|---|---|---|
| Migration/schema comparison | VERIFIED | Migration definitions compared with live columns, constraints and trigger function bodies. |
| Balance uniqueness | VERIFIED | Unique `(store_id, product_id)` index and composite product/store foreign key. |
| Movement audit history | PARTIAL | Movement table, source fields and store/product relationships exist. Application-level protection against inappropriate alteration or deletion remains unverified. |
| Reservation relationships | VERIFIED | Store, order and product foreign keys, including composite store-scoped references. |
| Direct-sale relationships | VERIFIED | Store ownership, sale/item relationships and composite store-scoped references. |
| Receipt relationships | VERIFIED | Store/order foreign keys, composite store/order reference and validation trigger. |
| Constraints and indexes | VERIFIED | Inspected foreign keys, unique and check constraints, generated line total, and 41 indexes across eight tables. |
| Existing data backfill | PARTIAL | One product has a balance and no orders currently exist. Historical order backfill cannot be validated against populated order data. |
| Migration ordering/repeatability | PENDING | Migration sequence reviewed, but repeatability and migration-runner behaviour have not been verified. |
| Schema inconsistencies | PENDING | Inactive-store product handling and receipt support for direct sales still require policy decisions. |

**Runtime access limitation:** The inspected `.env` connection uses the `postgres` role with `BYPASSRLS`. The deployed Netlify function connection role and its effective table privileges have not been verified.

**Store policy observation:** `sync_order_store_id()` rejects inactive stores, while `sync_product_catalogue_refs()` does not. Decide whether product writes should also reject inactive stores.

**Receipt scope decision:** The current receipt schema requires an order reference. Receipts for direct sales are not supported by the current schema.

**Database policy:** Do not execute migrations against a live or shared production database without explicit approval.

## 5. Inventory balances and stock movements

- [x] Opening stock can be recorded once for an inventory balance.
- [x] Replenishment increases physical stock.
- [x] Adjustment increases physical stock with a required reason.
- [x] Adjustment decreases physical stock with a required reason.
- [x] Stock cannot be reduced below the quantity reserved for outstanding orders.
- [x] Every stock change creates an auditable movement.
- [x] Movement records identify the store, product, movement type, quantity, reason and relevant transaction.
- [x] Balance updates and movement creation occur in the same database transaction.
- [x] Failed operations roll back without leaving partial changes.
- [ ] Concurrent stock updates cannot produce an invalid balance.
- [x] Uninitialised stock is distinguishable from a genuine zero-stock balance.
- [x] Available stock is calculated as physical stock minus active reservations.

**Section 5 implementation evidence**

- `netlify/functions/inventory.mjs` locks the product and inventory balance during stock mutation.
- Opening stock is protected by the `is_initialized` state and cannot be recorded twice.
- Replenishment and increase/decrease adjustments update physical stock. Non-opening movements require a reason.
- The API prevents stock from falling below reserved quantity and rejects balances above PostgreSQL's `int4` maximum.
- Balance updates and movement inserts execute in one transaction. Database errors trigger rollback, and the connection is released.
- Movement inserts include store, product, movement type, quantity delta, reason, source type and administrator identity.
- `is_initialized` distinguishes an uninitialised balance from a genuine zero balance. Available quantity is calculated as on-hand minus reserved.
- Focused API tests: 16 passed.
- Full unit suite: 252 tests passed across 7 files.
- TypeScript check and `git diff --check` passed.

**Still open:** The row-locking implementation has been inspected, but concurrent stock mutations have not been tested against a real PostgreSQL database. The concurrency criterion remains unchecked until that test is completed.

## 6. Inventory overview

- [x] Overview displays accurate physical stock.
- [x] Overview displays reserved stock.
- [x] Overview displays available stock.
- [x] Overview distinguishes uninitialised inventory from zero stock.
- [x] Overview stock totals are based on authoritative balances.
- [x] Stock received metrics use complete movement data, not only the latest 50 movements.
- [x] Stock adjustment metrics use complete movement data, not only the latest 50 movements.
- [x] Movement history is presented accurately and supports the intended filtering.
- [x] Empty, loading and error states are handled.
- [x] Overview data respects the active store's access scope.

**Section 6 evidence and remaining limitation**

- Inventory calculations use authoritative inventory balances and the complete movement aggregates returned by the API. The latest-50 limit applies to displayed movement history, not the received or adjustment totals.
- Physical, reserved and available quantities remain distinct. Uninitialised inventory is not treated as a genuine zero-stock balance.
- Supplier-cost valuation excludes products without a supplier cost. Those products must be identified as unvalued rather than assigned an invented cost.
- Movement filtering supports product name, SKU and movement type. The panel displays up to eight matches from the latest 50 loaded movements.
- API tests verify store-scoped movement retrieval and product SKU association. The full unit suite, TypeScript check and production build passed.
- **Manual browser verification remains pending.** Confirm the rendered filters, SKU display, empty and no-match states, and storefront switching in the running application.

## 7. Stock management interface

- [ ] Products and their inventory balances load correctly.
- [ ] Opening stock can be submitted with validation.
- [ ] Replenishment can be submitted with validation.
- [ ] Increase adjustments can be submitted with a reason.
- [ ] Decrease adjustments can be submitted with a reason.
- [ ] Invalid quantities and missing reasons are rejected.
- [ ] The interface prevents or clearly explains adjustments that would breach reserved stock.
- [ ] Successful operations refresh the displayed balance and movement history.
- [ ] Failed operations display useful feedback without showing false success.
- [ ] Controls follow the existing admin design system.

## 8. Order checkout and stock reservations

- [ ] Checkout validates product availability using authoritative database data.
- [ ] Checkout locks relevant inventory rows in a deterministic order.
- [ ] Checkout prevents overselling under concurrent requests.
- [ ] Order creation and stock reservation occur in one transaction.
- [ ] A successful checkout creates a pending order and its reservations atomically.
- [ ] Failed checkout leaves neither a partial order nor partial reservations.
- [ ] Duplicate product lines are handled correctly.
- [ ] Order item supplier cost is snapshotted at checkout.
- [ ] Reservation records identify the store, order, product and quantity.
- [ ] Reservation quantities cannot exceed available stock.
- [ ] Retrying a checkout request cannot create duplicate orders or reservations where an idempotency key is required.

## 9. Order lifecycle and reservation transitions

Required lifecycle behaviour:

| Transition | Inventory behaviour |
|---|---|
| Pending → Confirmed | Keep reservation active |
| Pending → Cancelled | Release reservation |
| Confirmed → Cancelled | Release reservation |
| Confirmed → Delivered | Deduct physical stock and convert/release reservation |
| Pending → Expired | Release reservation; system-controlled transition |

Implementation requirements:

- [ ] Only permitted order status transitions are accepted.
- [ ] Expired orders cannot be confirmed.
- [ ] Cancellation releases reservations exactly once.
- [ ] Delivery deducts physical stock exactly once.
- [ ] Expiry releases reservations exactly once.
- [ ] Inventory and order status changes occur transactionally.
- [ ] Invalid transitions are rejected by the backend.
- [ ] Permanent order deletion is removed or disabled where it would destroy required transaction history.
- [ ] The admin interface displays the expired status.
- [ ] Expiry is a system-controlled transition, not a manual admin action.

**Policy decision pending:** The reservation expiry duration has not yet been approved. Do not assume 24 hours is final.

**Policy decision pending:** The expiry schedule and deployment configuration must be confirmed before implementation is considered complete.

## 10. Direct sales

- [ ] Admin can create a direct sale containing multiple products.
- [ ] Product quantities and available stock are validated server-side.
- [ ] Direct sale creation and stock deduction occur in one transaction.
- [ ] Concurrent direct sales cannot oversell stock.
- [ ] Direct sale items snapshot the relevant selling price and supplier cost.
- [ ] Direct sales create auditable inventory movements.
- [ ] Direct sales are associated with the correct store and administrator.
- [ ] Direct sale details can be retrieved.
- [ ] Direct sale history can be listed and filtered as required.
- [ ] Voiding a sale uses a controlled reversal process.
- [ ] A void operation restores stock exactly once.
- [ ] Voided sales retain their audit history.
- [ ] Duplicate requests cannot create duplicate sales or reversals.
- [ ] Direct Sales interface is connected to real backend functionality.

## 11. Receipts

- [ ] Receipt creation is implemented through the backend.
- [ ] Receipt records have valid store ownership.
- [ ] Receipt records have a valid relationship to their source transaction.
- [ ] Receipt numbers or identifiers are unique within the required scope.
- [ ] Receipt details can be retrieved.
- [ ] Receipt history can be listed and filtered as required.
- [ ] Receipt state transitions are validated server-side.
- [ ] Receipt creation and state changes are auditable.
- [ ] Receipt access is restricted to authorised administrators.
- [ ] Receipts interface is connected to real backend functionality.

**Policy decision pending:** Confirm whether receipts must support online orders, direct sales, or both. Do not assume the current database relationship is the final business requirement.

## 12. Store isolation and authorisation

- [ ] Store administrators can access only their own store's inventory.
- [ ] Store administrators cannot submit another store's identifier to bypass access restrictions.
- [ ] Super administrators can access the stores permitted by their role.
- [ ] Every inventory API operation enforces authorisation server-side.
- [ ] Orders, reservations, movements, direct sales and receipts enforce store ownership.
- [ ] Cross-store references are rejected.
- [ ] Unauthorised requests do not expose another store's data.
- [ ] Tests cover both permitted and denied cross-store operations.

## 13. Admin integration and Overview reporting contract

### 13.1 Admin Overview

The main Admin Overview contains four sections: Store Performance, Order Overview, Recent Activity and Quick Actions.

- [ ] Store Performance values come from real, traceable business records and documented calculations.
- [ ] Order Overview counts are derived from actual orders and their persisted statuses.
- [ ] Recent Activity contains only events that were actually recorded by the system.
- [ ] Quick Actions navigate to or execute genuine supported admin operations.
- [ ] Every displayed metric, chart, trend, percentage and comparison has an identified data source and calculation.
- [ ] No mock data, hardcoded sample metrics, fabricated activity, invented chart series or placeholder business figures are presented as live data.
- [ ] Missing data is not silently replaced with fabricated values or misleading zeroes.
- [ ] Loading, empty, partial-data and error states are distinguishable.
- [ ] Admin Overview respects the active storefront filter and server-side administrator permissions.

### 13.2 Shared reporting contract

Admin Overview and Inventory Overview must use consistent definitions wherever they report related business activity.

- [ ] Revenue uses one documented definition and a consistent source across reporting surfaces.
- [ ] Order totals use the same order population, status rules and storefront scope.
- [ ] Sales, revenue, receipts, stock valuation and inventory movements are not treated as interchangeable measures.
- [ ] Physical stock means on-hand quantity.
- [ ] Reserved stock is reported separately from physical stock.
- [ ] Available stock means on-hand quantity minus active reserved quantity.
- [ ] Stock valuation uses recorded supplier cost multiplied by physical on-hand quantity; missing supplier cost is excluded and disclosed.
- [ ] Received quantities and adjustment quantities use complete movement aggregates, not the latest-50 display history.
- [ ] Opening stock and replenishment are distinguished from adjustment increases and decreases.
- [ ] Low-stock reporting is not shown as authoritative until a real, persisted reorder threshold is defined and used.
- [ ] Zero, no records, uninitialised, partially available and unavailable data are represented as distinct conditions where applicable.
- [ ] Both Overview pages apply the same storefront filter semantics. Store administrators remain restricted to their assigned store, including when the All option is available to authorised super administrators.
- [ ] Shared metrics are not independently recalculated using conflicting formulas or different date and status rules.
- [ ] Each displayed value can be traced from the UI through its API response to the underlying database query or documented calculation.

### 13.3 Inventory integration

- [ ] All four inventory sections load correctly.
- [ ] Inventory Overview uses real inventory data.
- [ ] Stock Management uses real inventory APIs.
- [ ] Direct Sales uses real direct-sale APIs.
- [ ] Receipts uses real receipt APIs.
- [ ] Loading, empty, validation, success and error states are implemented.
- [ ] Order management reflects inventory-related lifecycle states.
- [ ] Expired orders cannot be confirmed through the UI.
- [ ] Destructive actions preserve required order and sales history.
- [ ] Existing admin navigation and design-system conventions are preserved.
- [ ] Storefront functionality remains unchanged.

## 14. Testing and verification

- [ ] Unit tests cover inventory validation and calculations.
- [ ] Tests cover Admin Overview metric calculations and status definitions.
- [ ] Tests prove Admin Overview values are sourced from real API responses rather than mock or hardcoded business data.
- [ ] Tests cover shared metric definitions across Admin Overview and Inventory Overview.
- [ ] Tests cover storefront filtering and denied cross-store access on both Overview surfaces.
- [ ] Tests cover empty, partial-data, loading and error states for both Overview surfaces.
- [ ] Tests cover recent activity source integrity and ordering.
- [ ] Integration tests cover inventory balance updates.
- [ ] Integration tests cover stock movement creation.
- [ ] Tests cover transaction rollback.
- [ ] Tests cover concurrent checkout and overselling prevention.
- [ ] Tests cover reservation creation and release.
- [ ] Tests cover cancellation and expiry idempotency.
- [ ] Tests cover delivery exactly once.
- [ ] Tests cover direct sale creation and stock deduction.
- [ ] Tests cover direct sale void and stock reversal.
- [ ] Tests cover receipt creation, state and ownership.
- [ ] Tests cover store isolation.
- [ ] Existing order and storefront regression tests pass.
- [ ] TypeScript check passes.
- [ ] Production build passes.
- [ ] `git diff --check` passes.
- [ ] Changed code has been reviewed for security, transaction integrity and unintended scope expansion.

## 15. Verification evidence

Record actual command results. Do not mark a gate PASS based on an assumption.

| Gate | Result | Evidence |
|---|---|---|
| Database migration review | PENDING | Not verified |
| Inventory API tests | PASS | 19 focused inventory API tests passed. |
| Order and reservation tests | PENDING | Not verified |
| Direct sales tests | PENDING | Not verified |
| Receipt tests | PENDING | Not verified |
| Store isolation tests | PENDING | Not verified |
| Existing regression tests | PASS | Full unit suite: 7 files, 255 tests passed. |
| TypeScript check | PASS | `npx tsc --noEmit` exited 0. |
| Production build | PASS | `npm run build` completed successfully, including TypeScript, Vite production build and size checks. |
| Diff and scope review | PENDING | `git diff --check` passed; full scope review remains outstanding. |

Allowed results: `PENDING`, `PASS`, `FAIL`, `BLOCKED`.

## 16. Completion criteria

The Inventory phase is complete only when:

- Every required acceptance checkbox in sections 4–14 is checked.
- Every verification gate in section 15 is marked `PASS`.
- Policy decisions that affect implementation have been resolved.
- No known inventory-critical defect remains unresolved.
- All four inventory interface sections are functional.
- Store isolation and transaction integrity have been verified.
- The final implementation has been reviewed against this document.

Do not mark the phase complete merely because the UI renders or the build succeeds.

## 17. Development rules

- Work on one clearly defined requirement at a time.
- Inspect existing code before changing it.
- Preserve unrelated and existing user changes.
- Keep implementation within the active Inventory scope.
- Add or update tests alongside the relevant implementation.
- Update this document as requirements are verified or policy decisions are made.
- Record blockers instead of silently skipping requirements.
- Do not execute live database migrations without explicit approval.
- Do not commit, push, merge or deploy without explicit approval.
- This document and its compliance script remain local development tools and must not be committed or pushed.

---

## 18. Next development step

Next, audit the main Admin Overview from the rendered component back to its API endpoints, database queries and calculations. Identify every metric, chart, activity item, comparison and status that is hardcoded, mocked, fabricated, unsupported or inconsistently defined.

Then align the Admin Overview and Inventory Overview with the shared reporting contract in Section 13. Add tests for data authenticity, metric consistency, storefront scope and unavailable-data handling. Keep new Overview requirements unchecked until their implementation and evidence have been verified.

Manual browser verification of Inventory Overview remains open. Section 5 concurrency verification also remains open and requires a real PostgreSQL test proving concurrent stock mutations cannot produce an invalid balance.

Do not assume an existing feature is complete until its behaviour and tests have been verified.
