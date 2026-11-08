# Inventory Stocktake and Reconciliation Procedure

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-6209B2C662 |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This procedure defines how participating stores count physical inventory, compare count results with recorded stock, investigate discrepancies and approve inventory adjustments.

The objective is to maintain accurate store-level inventory records, reduce unexplained stock losses and ensure that inventory changes remain traceable.

## 2. Scope

This procedure applies to:

- Store Admins.
- Employees authorised to handle or count inventory.
- Platform personnel responsible for inventory oversight.
- All products and variants tracked through the platform.
- Stock held at a store, warehouse or other approved inventory location.

It covers scheduled stocktakes, cycle counts, investigation counts and reconciliation after identified discrepancies.

## 3. Inventory Ownership and Store Separation

Inventory must be recorded independently for each participating store.

The same product or variant may be available at multiple stores, but each store maintains its own inventory quantity and movement history.

A stocktake must not combine inventory belonging to different stores unless an explicitly approved shared physical storage arrangement exists.

Product ownership or catalogue source ownership does not establish ownership of physical stock.

Stock transfers between stores must be recorded as explicit transfers and must not be treated as ordinary stock adjustments.

## 4. Core Principles

All stocktakes and inventory reconciliations must follow these principles:

1. Count physical stock rather than relying on expected quantities.
2. Identify products and variants accurately.
3. Preserve the original inventory movement history.
4. Investigate discrepancies before approving adjustments.
5. Prevent unauthorised stock changes.
6. Maintain store-level inventory isolation.
7. Record the person responsible for each count and adjustment.
8. Distinguish damaged, reserved, unavailable and sellable stock.
9. Prevent duplicate adjustments.
10. Maintain an auditable reconciliation outcome.

## 5. Responsibilities

### 5.1 Store Admin

The Store Admin is responsible for:

- Planning and approving stocktakes.
- Assigning authorised counting personnel.
- Ensuring inventory movements are controlled during counts.
- Reviewing discrepancies.
- Approving adjustments within delegated authority.
- Escalating material or suspicious losses.
- Confirming completion of reconciliation.

### 5.2 Counting Employee

The assigned employee must:

- Count the physical inventory accurately.
- Identify products and variants correctly.
- Record damaged or unusable stock separately.
- Avoid changing inventory records during an independent count.
- Report missing, unidentified or unexpected stock.
- Submit count results for review.

### 5.3 Platform Personnel

Platform personnel may provide technical and operational support.

They must not alter store inventory merely to make reported quantities appear consistent.

Any authorised platform-level intervention must be documented and auditable.

## 6. Stocktake Types

Stores may use the following stocktake methods.

| Type | Description |
|---|---|
| Full Stocktake | Physical count of all tracked inventory within the selected store or location. |
| Cycle Count | Count of selected products or variants at scheduled intervals. |
| Investigation Count | Additional count triggered by a discrepancy, suspected loss or operational incident. |
| Opening Stocktake | Initial physical count used to establish or validate inventory records. |
| Closing Stocktake | Final count performed when a store or inventory location is being closed or transferred. |

The Store Admin must determine the appropriate frequency based on stock value, transaction volume, operational risk and available staffing.

## 7. Stocktake Preparation

Before a stocktake begins, the Store Admin must:

1. Define the store and physical locations included.
2. Identify the products and variants to be counted.
3. Assign counting responsibilities.
4. Select a count date and time.
5. Review outstanding orders and reservations.
6. Review pending stock receipts and transfers.
7. Identify damaged, returned or quarantined inventory.
8. Communicate any temporary movement restrictions.
9. Prepare the approved count sheet or inventory counting interface.

Where possible, stock movements should be paused during the count.

If operations cannot be paused, all movements during the count must be recorded and reconciled separately.

## 8. Count Identification Requirements

Every count must identify inventory at the most specific supported level.

Where applicable, the count record must include:

- Store identifier.
- Inventory location.
- Product identifier.
- Variant identifier.
- SKU.
- Product description.
- Count quantity.
- Stock condition.
- Count timestamp.
- Counting employee.

A product with multiple variants must not be counted as one undifferentiated quantity when the platform tracks stock separately by variant.

If an item cannot be identified reliably, it must be recorded as unidentified stock and investigated before allocation.

## 9. Physical Counting Procedure

Counting employees must:

1. Inspect the designated physical location.
2. Identify each product and variant.
3. Count actual units present.
4. Separate sellable and non-sellable stock.
5. Record damaged or incomplete items.
6. Identify unexpected or unrecorded stock.
7. Avoid estimating quantities where a physical count is possible.
8. Submit the count for review.

Where a quantity is uncertain, the employee must request a recount rather than submit an unsupported estimate.

High-value or high-risk inventory should receive an independent second count where practical.

## 10. Stock Condition Classification

Physical stock must be classified according to its actual condition.

| Condition | Meaning |
|---|---|
| Sellable | Physically present and suitable for sale. |
| Damaged | Physically present but not suitable for ordinary sale. |
| Quarantined | Temporarily withheld pending inspection or investigation. |
| Returned | Received from a customer and awaiting assessment. |
| Reserved | Allocated to an order or another approved commitment. |
| Missing | Expected in the records but not physically located. |
| Unidentified | Physically present but not reliably matched to a catalogue item or variant. |

The implementation must use the approved inventory model. These classifications must not be introduced as conflicting stock states without an approved design change.

## 11. Inventory Movement Controls During Counting

Inventory movements during a stocktake must be controlled.

Relevant movements include:

- Customer sales.
- Order reservations.
- Customer returns.
- Supplier receipts.
- Stock transfers.
- Damaged-stock write-offs.
- Manual adjustments.

Where movement cannot be paused, the count record must capture the movement and its timing so the final reconciliation can account for it.

A stocktake must not overwrite legitimate movements that occurred during the counting period.

## 12. Comparing Physical and Recorded Stock

After counting, the Store Admin or authorised reviewer must compare physical quantities with recorded inventory.

The comparison must account for:

- Existing inventory quantity.
- Approved reservations.
- Sales during the counting period.
- Supplier receipts.
- Transfers into and out of the location.
- Returns.
- Damaged or quarantined stock.
- Previously approved adjustments.

The reconciliation must identify the difference between the expected and physically counted quantities.

A discrepancy must not be automatically corrected without review.

## 13. Discrepancy Investigation

Every material discrepancy must be investigated before adjustment.

The investigation should consider:

- Counting errors.
- Incorrect product or variant identification.
- Duplicate SKU or catalogue records.
- Unrecorded sales.
- Unrecorded supplier receipts.
- Incorrect transfer records.
- Returns not processed correctly.
- Damaged stock not classified.
- Unauthorised inventory changes.
- Possible theft, loss or fraud.
- System synchronisation or integration errors.

A recount should be performed where the original count may be inaccurate.

The investigation outcome must explain whether the discrepancy resulted from a counting error, process failure, recording error or unexplained loss.

## 14. Recounts

A recount is required when:

- The original count is uncertain.
- A material discrepancy is identified.
- The product or variant may have been misidentified.
- A reviewer disputes the submitted count.
- The discrepancy exceeds a threshold established by the store's approved operating policy.

Where practical, a different employee should perform the recount.

The original count must remain available for comparison and must not be overwritten.

## 15. Inventory Adjustments

Inventory adjustments may only be made after the discrepancy has been reviewed and the required approval obtained.

An adjustment record must include:

- Store identifier.
- Product and variant identifiers.
- Previous recorded quantity.
- Verified physical quantity.
- Approved adjustment quantity.
- Reason for adjustment.
- Supporting investigation reference.
- Requesting employee.
- Approving employee.
- Timestamp.
- Related stocktake identifier.

Adjustments must be recorded as auditable inventory movements.

The platform must not silently replace historical inventory quantities or delete earlier movements.

## 16. Adjustment Approval

Approval requirements must reflect the value and risk of the affected inventory.

The Store Admin may approve ordinary adjustments within delegated authority.

Material losses, repeated discrepancies, suspected fraud or adjustments outside delegated limits must be escalated under the platform's financial and operational governance procedures.

Where practical, the person requesting an adjustment should not be the only person approving it.

Emergency protective actions must be documented and reviewed afterward.

## 17. Damaged and Non-Sellable Stock

Damaged or non-sellable stock must be recorded separately from ordinary sellable inventory.

The record should identify:

- Product and variant.
- Quantity affected.
- Date discovered.
- Condition and reason.
- Supporting evidence where appropriate.
- Person reporting the damage.
- Inspection outcome.
- Approved disposition.

Possible dispositions include repair, return to supplier, controlled disposal or another approved outcome.

A damaged item must not be counted as sellable stock merely because it remains physically present.

## 18. Stock Transfers

Transfers between stores or inventory locations must follow the approved stock transfer process.

A transfer must identify:

- Sending store or location.
- Receiving store or location.
- Product and variant.
- Quantity dispatched.
- Quantity received.
- Dispatch date.
- Receipt date.
- Responsible employees.
- Transfer reference.
- Any quantity or condition discrepancy.

A transfer must not be used to conceal a stocktake discrepancy.

Differences between dispatched and received quantities must be investigated.

## 19. Reconciliation Completion

A stocktake may be marked complete only when:

- Required physical counts have been submitted.
- Recounts have been completed where necessary.
- Discrepancies have been investigated.
- Adjustments have been approved or explicitly left pending.
- Relevant stock movements have been accounted for.
- Outstanding exceptions have been assigned for follow-up.
- The Store Admin has reviewed the final result.

Unresolved discrepancies must remain visible and must not be treated as reconciled.

## 20. Reporting

Where supported, the platform should provide stocktake reports containing:

- Stocktake reference.
- Store and inventory location.
- Products and variants counted.
- Recorded quantities.
- Physical quantities.
- Quantity differences.
- Recount results.
- Approved adjustments.
- Pending approvals.
- Unresolved exceptions.
- Counting and approval personnel.
- Completion status.

Reports must distinguish physical count results from approved inventory balances.

## 21. Audit and Record Retention

The platform must retain a traceable history of:

- Stocktake creation.
- Count submissions.
- Recounts.
- Discrepancy investigations.
- Adjustment requests.
- Adjustment approvals.
- Inventory movement records.
- Reconciliation completion.

Records must identify the relevant store and responsible personnel.

Retention must follow the platform's approved data retention and financial recordkeeping policies.

## 22. Security and Access Control

Inventory operations must enforce store-level access restrictions.

Employees may only count, view or adjust inventory within their authorised scope.

Permissions should distinguish:

- Viewing inventory.
- Creating stocktakes.
- Submitting counts.
- Reviewing counts.
- Investigating discrepancies.
- Requesting adjustments.
- Approving adjustments.
- Reviewing inventory audit history.

Frontend access restrictions are not a substitute for server-side authorisation.

## 23. Operational Exceptions

The following situations require escalation:

- Repeated unexplained stock losses.
- Material discrepancies.
- Suspected theft or fraud.
- Unauthorised inventory adjustments.
- Inventory records associated with the wrong store.
- Product or variant identification failures.
- Stock transfer disputes.
- System errors affecting inventory accuracy.

The Store Admin must preserve relevant records and follow the applicable incident and escalation procedures.

## 24. Platform Limitations

This procedure does not assume that the platform currently supports:

- Barcode or RFID scanning.
- Automated warehouse management.
- Automated physical stock counting.
- Predictive stock reconciliation.
- Automatic approval of stock adjustments.
- Automatic inter-store stock transfers.
- Integrated supplier inventory feeds.

These capabilities may be considered in future development through the platform's change-management and architecture governance processes.

## 25. Review and Maintenance

This procedure must be reviewed when:

- Inventory workflows change.
- New inventory locations are introduced.
- Stock transfer rules change.
- A material stocktake incident exposes a control weakness.
- Inventory automation is introduced.
- Legal, accounting or operational advice requires changes.

All amendments must follow the platform's document and change-management procedures.

## 26. Approval

This document remains a draft until formally reviewed and approved by the appropriate platform governance authority.

Approval must confirm that the procedure is practical for participating stores and consistent with the platform's inventory architecture, financial controls, audit requirements and store operating model.
