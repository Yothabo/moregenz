# Store Admin Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Store Administration Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-USR-B8C24C7337 |
| Category | User guidance |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide explains the responsibilities, permissions and routine operational activities of a Store Admin using the multi-store platform.

It establishes a consistent operating approach while recognising that each store has its own business identity, products, inventory, customers, orders and financial records.

This guide describes the current Store Admin responsibilities and supported operating boundaries. It does not imply that planned workforce or delegated-administration capabilities are available.

## 2. Store Admin Role

A Store Admin is responsible for managing the ordinary operations of an assigned store within the authority granted by the platform.

The Store Admin is accountable for ensuring that store information, product listings, inventory, orders, customer interactions and operational records are maintained accurately.

A Store Admin does not automatically receive platform-wide administrative authority.

## 3. Responsibilities

The Store Admin is responsible for:

- Maintaining accurate store information.
- Managing store product listings and commercial terms.
- Monitoring store inventory and stock movements.
- Overseeing orders and fulfilment.
- Handling customer service activities.
- Reviewing store financial records and reconciliation.
- Managing authorised store integrations and notifications.
- Monitoring store performance and operational issues.
- Escalating incidents and matters outside store authority.
- Maintaining required operational records.

## 4. Access and Account Security

### 4.1 Account Access

Store Admin access must be provided through an authorised account and active store membership.

Users must not share login credentials or use another person's account.

### 4.2 Authentication

Store Admins must follow the platform's authentication and session security requirements.

Where multi-factor authentication is supported or required, it must be enabled according to platform policy.

### 4.3 Permission Boundaries

Store Admin permissions must remain within the authority assigned to the store.

A Store Admin must not:
- Grant platform Super Admin access.
- Modify another store's records.
- Appoint or invite additional administrators.
- Create employee accounts or delegate administrative access.
- Bypass backend authorisation controls.
- Use private integration credentials in browser-based applications.
- Attempt to access restricted platform information.

### 4.4 Access Changes

Store Admin appointments, replacement and removal are controlled by the Platform Super Admin. A Store Admin cannot create additional administrator accounts or change another user's platform or store assignment.

Access must be removed promptly when an authorised administrator no longer requires it.

## 5. Store Information Management

The Store Admin must maintain accurate operational information, including:

- Store name and public identity.
- Contact details.
- Operating information.
- Storefront configuration.
- Supported delivery and fulfilment information.
- Applicable store-specific policies.

Changes to platform-controlled information must be escalated through the authorised platform process.

## 6. Product Catalogue Management

### 6.1 Product Listings

The Store Admin may manage products that the store is authorised to offer.

Store-level management may include:

- Activating or deactivating a store listing.
- Setting store-specific prices.
- Managing supported commercial terms.
- Configuring store-specific availability.
- Reviewing product presentation and accuracy.

### 6.2 Product Ownership

A product's source ownership must be respected.

The ability to sell a shared product does not automatically grant permission to change its source identity, ownership or descriptive information.

Changes to platform-owned or another store's source product information must follow the relevant authorisation process.

### 6.3 Product Accuracy

Before making a product available, the Store Admin must verify that its description, price, availability and relevant commercial conditions are accurate.

## 7. Inventory Management

The Store Admin is responsible for the store's inventory records.

Routine activities include:

- Reviewing available stock.
- Recording authorised stock receipts.
- Managing stock adjustments.
- Monitoring reservations.
- Recording stock movements.
- Investigating discrepancies.
- Reviewing low-stock conditions.
- Maintaining traceable inventory records.

Stock must not be transferred between stores through informal adjustments.

Transfers must follow the platform's authorised stock-transfer process and preserve the origin, destination, quantities and approval history.

## 8. Order Management

The Store Admin oversees the store's order operations.

Responsibilities include:

- Monitoring incoming orders.
- Reviewing order details.
- Confirming fulfilment readiness.
- Coordinating authorised fulfilment activities.
- Updating order statuses through supported workflows.
- Handling cancellations and returns.
- Coordinating refunds through authorised procedures.
- Escalating payment disputes and suspected fraud.

Order and payment statuses must reflect verified platform or provider information.

A customer message or frontend confirmation must not be treated as proof of payment.

## 9. Customer Management

The Store Admin may access and manage customer information only within the store's authorised scope.

Responsibilities include:

- Handling customer enquiries.
- Maintaining accurate customer records.
- Respecting communication preferences and consent.
- Protecting customer personal information.
- Responding to privacy-related requests through approved procedures.
- Avoiding unnecessary collection or disclosure of personal data.

Customer information must not be exported, shared or used for unrelated purposes without appropriate authority.

## 10. Store Access Administration

The current application does not support employee accounts, employee invitations or delegated store administrators.

Each store has one assigned Store Admin. The Platform Super Admin controls the appointment and removal of Store Admin accounts. Store Admins operate only within their assigned store and cannot create additional users or delegate their authority.

Employee administration and configurable workforce permissions remain future platform capabilities.

## 11. Financial Administration

The Store Admin is responsible for monitoring the store's financial activity.

This may include:

- Reviewing sales and revenue.
- Reviewing store expenses.
- Monitoring payment and refund records.
- Reviewing fees and platform commissions where applicable.
- Monitoring outstanding obligations.
- Reviewing reconciliation reports.
- Maintaining supporting evidence.
- Escalating unexplained differences.

Store financial records must remain distinguishable from platform financial records.

A Store Admin may investigate or propose a correction but must not independently perform financial operations outside their assigned approval authority.

## 12. Storefront and Integration Management

Each store may operate an independently developed frontend connected to the shared platform backend.

The Store Admin must use only authorised storefront configuration and integration capabilities.

Store-specific public configuration may be used by browser-based applications.

Private credentials, service-role keys, database passwords and signing secrets must never be placed in frontend code or exposed to frontend developers for public use.

Changes to domains, API configuration or integration settings must follow approved procedures and be tested before production use.

## 13. Marketing and Notifications

The Store Admin may participate in authorised platform or store marketing activities.

Responsibilities include:

- Reviewing campaign participation.
- Confirming store-specific offers and conditions.
- Ensuring advertised prices and availability are accurate.
- Respecting customer consent and communication preferences.
- Monitoring campaign results.
- Escalating failed or unauthorised communications.

Platform campaign approval does not automatically enrol a store in a campaign.

## 14. Performance Reviews

The Store Admin should review available store performance information and use it to identify operational improvements.

Performance indicators must be interpreted in context, including:

- Store operating history.
- Product category.
- Stock availability.
- Marketing exposure.
- Store capacity.
- Agreed targets.
- Relevant operational constraints.

The Store Admin may provide explanations or challenge information that does not accurately represent the store's circumstances.

Performance scores do not independently authorise financial assistance, penalties or other material interventions.

## 15. Incidents and Escalation

The Store Admin must report incidents that affect store operations, customers, security, financial integrity or platform availability.

Examples include:

- Suspected account compromise.
- Unauthorised access.
- Incorrect cross-store data exposure.
- Suspected payment fraud.
- Unexplained financial discrepancies.
- Inventory integrity failures.
- Failed critical integrations.
- Significant storefront or order-processing outages.
- Customer data exposure.

The Store Admin must follow the platform incident process and preserve relevant evidence.

Matters outside delegated authority must be escalated to the appropriate platform authority.

## 16. Records and Accountability

Store Admins must ensure that material operational activities are recorded through the platform's supported audit and recordkeeping mechanisms.

Records should make it possible to establish:

- Who performed an action.
- Which store was affected.
- What changed.
- When it occurred.
- Whether approval was required and obtained.
- The outcome of the activity.

Users must not attempt to bypass, alter or conceal required audit records.

## 17. Store Suspension and Reactivation

A Store Admin may request suspension or reactivation through the authorised platform process.

A Store Admin must not independently bypass platform-imposed restrictions.

Suspension does not automatically erase historical orders, financial records, audit records or outstanding obligations.

Reactivation must follow the applicable readiness and approval requirements.

## 18. Operational Review Checklist

Store Admins should regularly review:

- The assigned Store Admin account and its store scope.
- Product listing accuracy.
- Product availability and pricing.
- Inventory discrepancies and low-stock conditions.
- Pending and delayed orders.
- Payment and refund exceptions.
- Financial reconciliation differences.
- Customer enquiries and unresolved requests.
- Integration and notification failures.
- Security alerts and reported incidents.
- Store performance and improvement actions.

Review frequency and formal reporting requirements must follow platform policy.

## 19. Matters Requiring Platform Approval

The Store Admin must escalate matters that exceed store-level authority.

These may include:

- Store creation or deletion.
- Changes to platform-controlled identity or configuration.
- Platform-wide security or access changes.
- Changes to shared product ownership.
- Exceptional cross-store data access.
- Material financial assistance.
- Changes to commercial agreements.
- High-risk integrations.
- Exceptions to platform policies.
- Store suspension or reactivation where platform approval is required.

## 20. Store Admin Constraints

This guide does not grant permissions beyond those assigned by the platform.

Actual available actions depend on implemented functionality, active permissions, store configuration and applicable platform policies.

Where a procedure is not yet supported by the platform, the Store Admin must use the authorised interim process rather than bypassing controls.

## 21. Open Decisions

The following matters require further definition:

- Standard Store Admin role and permission templates.
- Mandatory access-review frequency.
- Store-level financial approval thresholds.
- Future workforce account and invitation procedures, if introduced.
- Store-level reporting and review schedules.
- Store-specific incident notification requirements.
- Formal Store Admin training and acknowledgement requirements.

## 22. Relationship to Other Documents

This guide must be read alongside:

- STORE_OPERATING_MODEL.md
- STORE_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- SECURITY_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- INVENTORY_ARCHITECTURE.md
- COMMERCE_ARCHITECTURE.md
- CUSTOMER_ARCHITECTURE.md
- FINANCE_ARCHITECTURE.md
- OPERATIONS_RUNBOOK.md
- STORE_ONBOARDING_GUIDE.md
- PLATFORM_GOVERNANCE.md

## 23. Document Management

This guide remains a draft until reviewed and approved through the applicable platform governance process.

Changes must be version-controlled and must not silently expand Store Admin authority.
