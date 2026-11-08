# Customer Order History and Cross-Store Purchase Visibility Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-1F50512D69 |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** DRAFT
**Version:** 0.1
**Last Updated:** 2026-11-07
**Document Owner:** Platform Owner
**Review Status:** Pending
**Classification:** Internal

## 1. Purpose

This document defines how customer purchase history is recorded, accessed, displayed and maintained across participating stores.

The platform uses one central customer identity. A customer must not need a separate account for every store.

Purchase history must provide customers with a consistent view of their purchases while preserving store-level data isolation and commercial confidentiality.

## 2. Core Principles

1. A customer has one platform-wide customer identity.
2. Every order belongs to one originating store.
3. Every order associated with an authenticated customer links to the central customer ID.
4. Customers may view their permitted purchase history across participating stores.
5. Store administrators may only access orders and customer information within their authorised store scope.
6. Historical order records must remain accurate even when products, prices, store details or customer profile information change.
7. Purchase history must not expose another customer's information.
8. Access to order history must be authorised server-side.

## 3. Order Ownership and Attribution

Every order must retain its originating store attribution.

The order record must identify:

- Unique order ID.
- Originating store ID.
- Customer ID, where the order is associated with an authenticated customer.
- Order reference.
- Order creation timestamp.
- Order status.
- Payment status.
- Fulfilment status.
- Currency.
- Order total.
- Relevant timestamps for subsequent lifecycle events.

The originating store must never be inferred from the customer's current storefront or most recent visit.

A customer purchasing from Store A and later purchasing from Store C must have two separate orders linked to the same customer identity.

## 4. Historical Order Snapshots

Order history must reflect what the customer actually purchased at the time of the transaction.

Each order item must preserve the relevant historical details, including:

- Product name at the time of purchase.
- Product or variant identifier where available.
- SKU at the time of purchase.
- Selected variant or product options.
- Quantity.
- Unit price.
- Discounts applied.
- Line total.
- Applicable tax information where recorded.
- Currency.

Historical order items must not depend on the current product catalogue to reconstruct their original descriptions or prices.

Changes to a product listing must not silently rewrite an existing order.

Product deletion, archival or unavailability must not remove historical purchase information.

## 5. Customer Purchase History

Authenticated customers must be able to access their permitted purchase history from any participating storefront.

The customer history view must support:

- Orders from multiple participating stores.
- Store identification for each order.
- Order reference.
- Purchase date.
- Order total and currency.
- Order and payment status.
- Fulfilment status.
- Purchased item summaries.
- Access to available order details.

The customer must not need to create another account when moving between stores.

The platform must identify the customer through the central identity service rather than creating a new store-specific customer record.

## 6. Store Identification

Every order displayed in a consolidated customer history must clearly identify the originating store.

Store identification may include:

- Store name.
- Store logo or approved brand representation.
- Store-specific order reference.
- Store contact or support route where configured.

A customer must be able to distinguish a purchase made through Store A from one made through Store C.

Store branding must not change the underlying ownership or attribution of an order.

## 7. Customer Access Controls

Customers may access only purchase history associated with their verified central customer identity.

The API must enforce customer ownership checks for:

- Order lists.
- Individual order details.
- Order item details.
- Order documents or attachments.
- Available order actions.
- Order-related support requests.

A customer must not gain access to another customer's order by changing an order ID, reference or request parameter.

Unpredictable identifiers are useful but do not replace authorisation checks.

## 8. Store Administrator Access

Store administrators may access purchase history relevant to their own store.

A Store Admin for Store A must not automatically gain access to orders originating from Store C.

Store administrators may access the customer information necessary to manage their store's orders and fulfilment.

The platform must not expose another store's:

- Order history.
- Product purchase details.
- Customer contact information.
- Payment evidence.
- Refund or adjustment records.
- Internal operational notes.
- Commercial information.

Platform Super Admin access remains governed by platform-level permissions, audit requirements and applicable data-access policies.

## 9. Store-Scoped Order Queries

Store-facing order queries must enforce store scope on the server.

The server must derive or validate the permitted store scope from the authenticated user's current permissions.

A request parameter containing a store ID must never be sufficient to grant access to that store's orders.

Cross-store customer history must be available through the customer-facing access model, not by weakening store administrator restrictions.

## 10. Guest Orders

Guest purchases may be recorded without a central customer ID.

The platform must not automatically associate a guest order with an account based only on an unverified email address or telephone number.

A guest order may be linked to a customer account after an approved identity-verification process.

The linking process must:

- Verify control of the relevant identity or contact channel.
- Check that the order is eligible for linking.
- Prevent association with another customer's account.
- Record the linking action.
- Preserve the original order and store attribution.
- Prevent duplicate or conflicting associations.

The platform must retain the ability to distinguish an unlinked guest order from an authenticated customer order.

## 11. Order History Across Storefronts

The customer account experience must remain consistent across participating storefronts.

When a customer signs in through another store:

1. The central identity service identifies the existing customer.
2. The platform establishes the customer's authenticated session.
3. The customer history service retrieves the orders the customer is authorised to view.
4. Each order retains its originating store identity.
5. The customer may access permitted details regardless of which storefront they used to sign in.

The storefront must not create a duplicate customer account simply because the customer entered through a different store.

## 12. Order Status and Historical Accuracy

Order, payment and fulfilment statuses must remain separate concepts.

A customer history response must not treat payment confirmation as proof of fulfilment or treat order completion as proof of payment settlement.

Status changes must follow the approved order lifecycle and manual payment verification procedures.

The history view must display the current authorised status while retaining relevant historical events where the platform supports an order timeline.

A status update must not erase previous events or change the original purchase timestamp.

## 13. Order Amendments and Cancellations

Order amendments, cancellations, returns and refunds must preserve the original order history.

The platform must retain:

- Original order details.
- Approved amendments.
- Cancellation records.
- Return records where applicable.
- Refund records where applicable.
- Relevant reasons and timestamps.
- The identity of the actor responsible for authorised changes.

The customer-facing history must clearly distinguish the original purchase from subsequent actions.

Financial corrections must not be implemented by silently rewriting historical order totals.

## 14. Privacy and Data Minimisation

Customer purchase history is personal information and must be protected accordingly.

The platform must:

- Display only information necessary for the customer-facing purpose.
- Avoid exposing internal store notes.
- Avoid exposing payment evidence to unauthorised users.
- Avoid exposing other customers' details.
- Restrict employee access to the information required for their role.
- Apply approved retention and deletion procedures.
- Support applicable customer data-access and privacy requests.

A customer's ability to view their own cross-store history does not grant any participating store unrestricted access to that history.

## 15. Search, Filtering and Pagination

Customer purchase history should support practical retrieval as the number of orders increases.

Supported query capabilities may include:

- Date range.
- Originating store.
- Order status.
- Payment status.
- Fulfilment status.
- Order reference.

The API must use bounded pagination and validated filtering.

The server must apply customer ownership restrictions before returning results.

Store administrator search must remain restricted to the administrator's authorised store scope.

The platform must not retrieve an unrestricted cross-store dataset and rely on the frontend to hide unauthorised records.

## 16. Performance and Caching

Customer order history must remain responsive as the platform grows.

Implementation must:

- Use indexed customer and store relationships.
- Avoid unnecessary queries for each order item.
- Apply bounded page sizes.
- Return only required fields.
- Avoid caching private order data in shared public caches.
- Ensure private responses cannot be served to another authenticated customer.
- Invalidate or refresh relevant views after authorised order changes.

Any private caching strategy must account for customer identity, authorisation and data freshness.

## 17. Audit and Monitoring

The platform must record relevant administrative access and changes to customer-order associations.

Auditable activities include:

- Manual guest-order linking.
- Correction of customer-order associations.
- Administrative access to sensitive order details where required by policy.
- Changes to order ownership associations.
- Exceptional cross-store access.
- Data exports containing customer order history.

Audit records must identify the actor, action, affected record, timestamp and relevant context.

Audit records must not unnecessarily duplicate sensitive payment evidence or authentication secrets.

## 18. Data Integrity Requirements

The platform must enforce the following integrity rules:

1. Every order has exactly one originating store.
2. An authenticated customer order references one valid central customer identity.
3. A guest order may have no customer association until verified.
4. Order items preserve historical purchase details.
5. Store attribution remains unchanged through normal order lifecycle operations.
6. Customer history is derived from authorised order-to-customer relationships.
7. Store administrator queries remain store-scoped.
8. Customer identity merges must preserve valid order associations.
9. Customer account deletion or deactivation must follow approved retention and legal requirements.
10. Historical financial records must remain traceable.

## 19. Testing Requirements

Tests must cover:

- One customer purchasing from multiple stores.
- Signing in through a different storefront.
- Consolidated customer order history.
- Correct originating store labels.
- Store administrator access to own-store orders.
- Denial of cross-store administrator access.
- Denial of access to another customer's orders.
- Guest-order linking after verification.
- Rejection of unverified guest-order linking.
- Preservation of historical product names and prices.
- Order amendments and cancellations.
- Customer identity merges.
- Pagination and filtering.
- Private response caching isolation.
- Audit records for sensitive administrative actions.

Security tests must attempt direct API access using modified customer IDs, order IDs and store IDs.

## 20. Acceptance Criteria

This standard is satisfied when:

- A customer can use one account across participating stores.
- Purchases from different stores appear in the same permitted customer history.
- Every order retains its originating store attribution.
- Historical order details remain accurate after catalogue changes.
- Customers cannot access another customer's purchase history.
- Store administrators cannot access another store's orders through ordinary store permissions.
- Guest orders are not linked without verification.
- Order amendments and financial corrections preserve historical traceability.
- Cross-store access and sensitive administrative actions are appropriately audited.
- Automated tests verify the required access boundaries and data integrity rules.

## 21. Implementation Boundaries

This standard defines customer order-history behaviour and access boundaries.

It does not introduce:

- A separate customer account for every store.
- Unrestricted cross-store access for Store Admins.
- Automatic guest-order ownership based on unverified contact details.
- Automatic payment verification.
- Payment gateway processing.
- Courier or delivery-provider integration.
- Automatic refunds or financial adjustments.

Current payment communication, payment verification and fulfilment continue to follow the approved WhatsApp-first manual operating model.

## 22. Review and Approval

This document remains a draft until reviewed and approved through the platform's architecture and governance processes.

Any proposed change to customer identity, order ownership, cross-store visibility or store access boundaries must be assessed against the central customer identity architecture, customer data standards, order lifecycle standards and applicable privacy requirements.
