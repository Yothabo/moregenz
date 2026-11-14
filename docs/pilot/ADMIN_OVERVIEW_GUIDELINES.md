# Simatu Admin Overview Guidelines

## 1. Purpose and launch boundary

This document defines the current Admin Overview requirements for the Simatu launch.

It is an implementation specification and verification record. It does not certify that the dashboard or its calculations are complete.

The scope is the admin dashboard only. Do not modify the public storefront as part of this work.

These guidelines cover the current launch. Broader platform architecture, future capabilities, and multi-store plans remain documented separately under the main documentation structure.

## 2. Dashboard structure

The Admin Overview contains five sections, in this order:

1. Business summary
2. Sales performance
3. Order operations
4. Product performance
5. Store comparison

Each section must use the same selected date range and applicable store scope.

The dashboard must distinguish recorded business activity from confirmed cash collection. A completed fulfilment or sales record is not proof that payment was received.

## 3. Business summary

The business summary provides a concise view of activity and operational workload.

Requirements:

- Orders received means non-cancelled orders created within the selected period.
- Cancelled orders must be reported separately in the order breakdown.
- Pending, confirmed, and delivered counts represent the current persisted order statuses.
- Pending plus confirmed represents the outstanding order workload.
- Current product catalogue counts may appear as secondary information.
- Catalogue counts represent current state and must not be presented as period-based activity.
- Do not label order values or delivered order values as money received.
- Do not introduce a financial KPI that implies payment settlement when payment data is unavailable.

## 4. Sales performance

The chart and section must use the label **Recorded sales activity**.

It combines two separately identified sources:

**Online sales activity**

- Include delivered online orders only.
- Use `orders.subtotal`.
- Use the order's `created_at` timestamp for the selected date range.

**Direct sales activity**

- Include completed direct sales only.
- Use `direct_sales.total_amount`.
- Exclude voided direct sales.
- Use `direct_sales.sold_at` for the selected date range.

Requirements:

- Display values in South African rand.
- Tooltips must identify the source and show the exact amount.
- Use calendar-correct day, week, and month buckets according to the selected range.
- Do not fabricate averages, projections, or missing values.
- Do not describe recorded sales activity as paid revenue or cash collected.
- Do not calculate gross profit until reliable historical cost snapshots are populated and verified.
- Do not reconstruct historical cost of goods sold using current supplier costs.

The current database does not provide payment settlement fields. A delivered order or completed direct-sale record does not independently establish that funds were collected.

## 5. Order operations

Order operations show workload and order-status distribution.

Requirements:

- Show pending, confirmed, delivered, and cancelled statuses.
- Show order volume over the selected period.
- Report cancelled orders separately.
- Pending plus confirmed represents outstanding workload.
- Order counts use the same selected date range.
- Status distribution reflects current persisted status, not historical status at the time an order was created.
- Recent orders may be displayed as an operational list.

There is no verified `delivered_at` timestamp or order status history.

Do not infer when an order entered a particular status or present current status counts as historical status-transition activity.

## 6. Product performance

Product performance ranks products by units sold, not by the number of order-item rows.

Online eligibility:

- Include delivered orders only.
- Exclude cancelled orders.
- Sum item quantities.

Direct-sale eligibility:

- Include completed direct sales only.
- Exclude voided direct sales.
- Sum direct-sale item quantities.

Aggregation and value rules:

- Aggregate using stable product IDs, not product names.
- Online product value uses `unit_price * quantity`.
- Direct-sale product value uses `line_total`.
- Validate API payloads before using them in calculations.
- Distinguish online and direct-sale sources where the presentation combines them.
- Do not present catalogue items with zero sales as sales-performance results.
- Catalogue information may be shown separately from sales performance.
- Category performance is allowed only when product identity and category data are reliable.

An existing TypeScript `OrderItem` definition does not include `product_id`, while the API has reportedly returned it. Verify the actual API response and validation contract before changing types or relying on the field.

Delivered-order item quantities represent quantities associated with delivered orders. They do not independently prove item-level fulfilment.

## 7. Store comparison

Store comparison uses the same date range and metric definitions for each store.

The all-store view compares Yotaabo and Poshies.

Permitted comparison metrics:

- Delivered online order count.
- Delivered online order value.
- Completed direct-sale count.
- Completed direct-sale value.
- Units sold.

Requirements:

- Use identical date boundaries and calculation rules for both stores.
- Use stable store identifiers.
- A single-store filter must display only the selected store.
- Do not show a misleading comparison when only one store is selected.
- Missing store activity may be represented as zero only when the underlying data confirms zero activity.
- Do not fabricate missing store data.
- Store-admin access isolation must be enforced server-side.
- A frontend filter is not an authorisation boundary.

## 8. Date filters and time

The approved date filters are:

- 7 days
- 30 days (default)
- 90 days
- This year
- All time

Timezone: `Africa/Johannesburg`.

Date-field rules:

- Orders use `created_at`.
- Direct sales use `sold_at`.
- The same selected range applies consistently to orders, direct sales, and product performance.
- Current catalogue counts are not restricted by the selected activity period.
- Date boundaries must be calculated consistently in the approved timezone.
- Day, week, month, and year aggregation must be calendar-correct.
- Aggregation keys must avoid month and year collisions.

Previous-period comparisons may be shown only when a valid equivalent baseline exists.

Do not calculate or display percentage growth when the baseline is missing, invalid, or not comparable.

## 9. Data contracts and architecture

Keep the dashboard implementation separated into three responsibilities.

**Data layer**

- Fetch backend records.
- Validate API responses.
- Enforce the expected data contract.
- Preserve loading, empty, error, and partial-data distinctions.
- Respect server-side authorisation and store scope.

**Analytics layer**

- Calculate summary metrics.
- Calculate period comparisons.
- Aggregate chart datasets.
- Apply date and store filters.
- Aggregate product performance using stable identifiers.
- Keep financial and operational definitions consistent.

**Presentation layer**

- Render KPI values.
- Render Recharts visualisations.
- Render loading, empty, error, and partial-data states.
- Consume prepared datasets rather than implementing business calculations inside chart components.

Avoid multiple sources of truth. Chart components must not independently recalculate business metrics.

Development test data must remain isolated from production data. Any seed and cleanup scripts must be deterministic and must not introduce fabricated business activity into production.

## 10. Data integrity and financial semantics

The current data model has important limitations.

Orders are created with:

- `subtotal`
- `status` initially set to `pending`
- `storefront`
- Order-item product ID, product name, unit price, and quantity

The order creation flow does not currently populate `order_items.unit_cost`.

The database includes a nullable `unit_cost` field intended for historical cost snapshots. Its existence does not mean historical cost data is populated.

The direct-sales schema includes:

- Sale amount and sale status.
- Store identity.
- Sale timestamp.
- Direct-sale item quantities and prices.
- Generated line totals.
- Nullable item cost snapshots.

The current schema does not provide verified payment settlement fields such as payment status, payment method, payment reference, `paid_at`, or `amount_paid`.

Therefore:

- Do not call a completed direct sale a settled payment.
- Do not call a delivered order a paid order.
- Do not report cash collected.
- Do not calculate gross profit from current supplier costs.
- Do not infer historical costs from current product records.

## 11. Empty, loading, and error states

The dashboard must distinguish:

- Loading.
- Successful empty results.
- API errors.
- Partial data.
- Known zero values.
- Unavailable or missing values.

Requirements:

- API failure must never be represented as zero.
- A verified zero count may display as zero.
- An unavailable or missing value should use an appropriate unavailable indicator, such as an em dash.
- Charts with no valid records must show an informative empty state.
- Growth percentages require a valid comparison baseline.
- Partial data must be identified rather than silently presented as complete.
- Do not insert mock or fabricated business records to fill empty states.

## 12. Customer data restrictions

Customer name and phone number are collected for order processing and fulfilment only.

The Admin Overview must not introduce:

- Customer profiles.
- Customer segmentation.
- Repeat-customer metrics.
- Customer lifetime value.
- Customer comparisons.
- Customer marketing analytics.
- Customer ranking or behavioural reporting.

Retain customer information only where required to process and fulfil an order.

## 13. Explicit gaps and non-goals

The following are not established capabilities and must not be presented as implemented:

- Payment settlement reporting.
- Cash collected reporting.
- Gross-profit reporting based on verified historical costs.
- Historical order-status transition reporting.
- Direct-sales analytics until the direct-sales API and data contract are implemented and verified.
- Receipt-based payment confirmation.
- Customer analytics or customer comparison reporting.
- Item-level fulfilment reporting beyond what the underlying records establish.

Direct-sales tables and receipt tables in the database do not, by themselves, establish that the corresponding API or admin workflows exist.

A receipt marked as sent records issuance. It does not prove payment.

The work covered by this document must not modify the public storefront.

## 14. Verification gates

Every gate starts as `NOT RUN`. Change a status to `PASS` or `FAIL` only after executing the relevant checks and recording evidence.

| Gate | Status | Evidence |
|---|---|---|
| Dashboard structure and five-section order | NOT RUN | Pending verification |
| Order API authentication and store authorisation | NOT RUN | Pending verification |
| Order API response contract and product identifiers | NOT RUN | Pending verification |
| Date filters and Africa/Johannesburg boundaries | NOT RUN | Pending verification |
| Business summary calculations | NOT RUN | Pending verification |
| Recorded sales activity calculations | NOT RUN | Pending verification |
| Order operations and status distribution | NOT RUN | Pending verification |
| Product performance aggregation | NOT RUN | Pending verification |
| Store comparison and server-side isolation | NOT RUN | Pending verification |
| Loading, empty, error, and partial-data states | NOT RUN | Pending verification |
| Customer-data restrictions and financial labels | NOT RUN | Pending verification |
| Automated tests, typecheck, and production build | NOT RUN | Pending verification |

A gate must not be marked PASS merely because a component renders or a database table exists.

Evidence should identify the relevant test, command, API response, source inspection, or reproducible manual verification.

## 15. Completion criteria

Admin Overview documentation is complete when:

- All required sections and definitions are documented.
- The implementation follows the approved five-section order.
- Date and store filters apply consistently.
- Calculations follow the definitions in this document.
- Financial labels do not imply payment settlement.
- Product aggregation uses verified stable identifiers.
- Store access is enforced server-side.
- Empty and error states are distinguishable.
- Customer analytics remain excluded.
- All verification gates have PASS status supported by evidence.
- Relevant automated tests, typecheck, and production build pass.
- No public storefront files have been changed as part of this work.

Documentation completion is not implementation completion.

## 16. Development rules

- Do not modify the public storefront.
- Do not introduce customer analytics.
- Do not invent payment or cost data.
- Do not change API types before verifying the actual API contract.
- Do not move business calculations into chart components.
- Do not treat frontend filtering as authorisation.
- Do not mark verification gates PASS without evidence.
- Preserve unrelated working-tree changes.
- Keep broad platform documentation separate from current launch requirements.
- This document is a local development control. Do not commit or push it unless that restriction is explicitly changed.
