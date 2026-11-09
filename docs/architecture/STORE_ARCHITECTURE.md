# Store Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-D1AC1DB6C8 |
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

This document defines the architecture and operating boundaries of stores participating in the centrally managed retail platform.

It establishes how stores are represented, administered, presented to customers, and separated from one another while operating on shared platform infrastructure.

The architecture must support multiple independently operated stores without treating any individual store as the platform itself.

Yotaabo is the first participating store and must use the same store-level architecture and operating boundaries as other participating stores.

## 2. Architectural Objectives

The store architecture must:

- Support multiple stores within one centrally managed platform.
- Give each store an independent public storefront and commercial identity.
- Preserve independent store administration and operational responsibility.
- Enforce store-level data and access boundaries.
- Support independently managed products, listings, prices, promotions and inventory.
- Support product sharing without transferring product ownership.
- Keep store transactions and financial records distinguishable.
- Allow platform-level oversight without removing ordinary store autonomy.
- Support onboarding and removal of stores without disrupting other stores.
- Protect existing Yotaabo storefront functionality and production data during migration.

## 3. Store Architecture Principles

### 3.1 One platform, multiple stores

The platform is the shared technical and operational foundation.

Stores participate in the platform and operate their own commercial activities within the platform's approved rules.

A store must not be treated as a separate platform or receive unrestricted control over shared platform infrastructure.

### 3.2 Store independence

Each store must have its own:

- Public identity and storefront.
- Store administration.
- Employee memberships and delegated permissions.
- Product listings and commercial terms.
- Inventory records.
- Orders and fulfilment operations.
- Store-scoped customer records, subject to the approved customer identity model.
- Store financial records and reporting.
- Store activity and operational history.

Shared infrastructure must not mean shared operational authority.

### 3.3 Explicit ownership and scope

Every store-owned record must have an explicit store relationship or a clearly defined platform-level ownership classification.

A record must not become store-owned merely because it is displayed in a store.

Platform-owned records and store-owned records must remain distinguishable.

### 3.4 Backend-enforced isolation

Store separation must be enforced by backend authorisation and data-access rules.

Frontend filtering, hidden controls, URL parameters, request payloads and client-side store selection are not security boundaries.

### 3.5 Controlled platform oversight

The platform may inspect and administer store information where authorised by its platform responsibilities.

Platform-level access must be controlled, attributable and auditable.

Store Admins must not receive platform-level privileges through ordinary store administration.

## 4. Store Identity and Representation

### 4.1 Store record

Each participating store must have a persistent platform identity.

A store record should support, at minimum:

- Unique store identifier.
- Store name.
- Unique public slug or equivalent routing identifier.
- Store status.
- Public display information.
- Store configuration.
- Creation and update timestamps.

The database identifier must be stable and must not depend on the store name, slug or domain.

### 4.2 Store identifiers

Internal relationships must use stable identifiers rather than names or public slugs.

Public slugs and domains are routing and presentation identifiers. They must not be accepted as proof of authorisation or record ownership.

Changing a store name, slug or domain must not change the identity of the store or invalidate its historical records.

### 4.3 Store status

The store lifecycle must support explicit operational states.

The initial model should distinguish:

- Pending: onboarding has started but the store is not yet operational.
- Active: the store is authorised to operate.
- Suspended: platform access or selected operations have been restricted.
- Inactive: the store is no longer operating on the platform.

The exact transition rules and authority for each transition must be defined through governance and operational policies.

A status change must not silently delete the store's records or historical transactions.

## 5. Store Ownership and Responsibilities

### 5.1 Store-level responsibility

Each store is responsible for its ordinary commercial operations within the platform.

This includes managing its authorised employees, listings, pricing, promotions, stock, orders, customer interactions and store-level records.

### 5.2 Platform-level responsibility

The platform is responsible for shared infrastructure, platform administration, platform-wide security, approved governance rules and oversight.

The platform may also coordinate marketing, growth support, performance reviews, meetings, audits and other agreed business support activities.

These responsibilities do not automatically give the platform unrestricted authority over every store decision.

### 5.3 Responsibility boundaries

The platform and stores must have clearly separated responsibilities.

Platform-wide configuration must not be confused with store-specific configuration.

Store-level decisions must not be allowed to modify shared infrastructure or another store's records.

Where a platform intervention is necessary, its authority, reason and scope must be identifiable and recorded.

## 6. Storefront Architecture

### 6.1 Independent storefront identity

Each store must have its own public storefront identity.

Customers must be able to distinguish which store they are browsing and which store is responsible for a displayed listing, order and customer interaction.

Storefront routing must resolve to a valid store using a controlled mapping, such as an approved domain or public slug.

For the initial two-store arrangement, Yotaabo remains the existing storefront and Poshies is served at the `/poshies` path on the existing domain. The Poshies route must resolve to the Poshies store context; it must not create a separate platform, backend or product catalogue. This path-based arrangement records the current implementation direction and does not prevent a separately approved domain arrangement in the future.

### 6.2 Standard storefront template

The initial platform will use one standard storefront template across participating stores.

Stores may configure approved presentation settings through their authorised dashboard.

The initial customisation boundary is:

- Store-controlled colours within the platform's supported configuration.
- Store-controlled fonts within the platform's supported configuration.
- Store-specific branding and approved content.
- Store-specific product catalogue and presentation data.

Stores may not independently change the underlying storefront layout, page structure or carousel configuration.

The platform owns and maintains the standard template.

Stores may not independently modify page layouts, component positions, navigation structure, page composition or carousel behaviour. These elements remain centrally maintained so that the storefront experience stays consistent across participating stores.

Any future expansion of storefront customisation must be explicitly approved and implemented through supported configuration options rather than unrestricted store-level code or layout overrides.

### 6.3 Storefront configuration

Storefront configuration must be stored separately from application code.

Configuration must be validated against supported values and must not allow arbitrary code execution, unsafe markup or unrestricted styling injection.

A store must not be able to modify another store's storefront configuration.

Storefront configuration must support independent category display ordering. Yotaabo must retain its existing category order. Poshies must display Hers before His. A category-order change for one store must not change the other store's presentation.

### 6.4 Storefront resolution

The storefront must resolve its store context from a trusted server-side mapping.

The client may receive the resolved public store information needed to render the storefront.

The client must not be trusted to establish ownership or authorisation by submitting a different store identifier.

### 6.5 Storefront availability

Only stores authorised for public operation may expose their active catalogue and accept new customer transactions.

Suspension or deactivation must follow defined operational rules.

Historical order information and records must remain available to authorised users where retention and legal obligations require it.

## 7. Product Ownership and Store Listings

### 7.1 Product identity

A product represents the underlying product identity and descriptive information.

Product identity must be distinguishable from a store's commercial listing of that product.

Product ownership must be explicitly recorded and must not be inferred from which store currently sells the product.

The product owner is responsible for the source product identity and descriptive information, subject to the platform's governance and applicable permissions.

The initial Yotaabo and Poshies arrangement uses one shared product catalogue. A product added by either authorised store administrator must be available for both stores to list, without requiring a duplicate upload.

The source product record must remain distinct from each store's listing. The platform must retain the creator and modification history and enforce explicit permissions for source-record editing and deletion. Shared catalogue availability does not grant either store unrestricted authority over the other store's listing or commercial records.

### 7.2 Store product listings

A store listing connects a product to a participating store.

The listing represents that store's decision to make the product available for sale.

A listing may contain store-specific information, including:

- Store-specific selling price.
- Store-specific promotion.
- Store-specific availability.
- Store-specific product presentation where supported.
- Store-specific listing status.

The listing must reference the relevant product and store.

### 7.3 Product sharing

Yotaabo and Poshies share the same product catalogue. A product added by either authorised administrator must be available for listing by both stores without a second upload.

Sharing catalogue availability does not publish the product automatically on both storefronts. Each store controls its own listing status, price, promotions, availability and presentation. Inventory remains store-specific.

Source product editing and deletion remain subject to explicit backend permissions and audit controls. A store's listing changes must not alter the other store's listing.

### 7.4 Product changes

Changes to shared product identity or source descriptive information must follow the permissions of the product owner or other explicitly authorised party.

A store's listing changes must not unintentionally modify another store's listing.

Product deletion or withdrawal must account for existing listings, inventory, orders and historical references.

### 7.5 Product images and media

Product media ownership and storage scope must be explicit.

Store-specific media must not be writable by another store without permission.

Where media is shared, the platform must distinguish shared source media from store-specific presentation assets.

Existing Yotaabo image objects and URLs must be preserved or migrated through a verified process.

## 8. Inventory Architecture

### 8.1 Independent inventory

Inventory must be maintained independently for each store.

A product being available in one store must not imply that it is available in another store.

Stock quantities, reservations, adjustments and availability must be scoped to the relevant store.

### 8.2 Inventory records

Inventory records must identify:

- Store.
- Product or applicable store listing.
- Quantity or stock state.
- Relevant location where location-level inventory is supported.
- Record status.
- Creation and update information.

The final inventory model may be refined as operational requirements become clearer.

### 8.3 Stock movements

Inventory changes must be traceable.

The system should record the type, quantity, source, destination where applicable, reason and responsible actor for each material stock movement.

Manual adjustments must have an identifiable reason and audit history.

### 8.4 Transfers and shared stock

Stock must not move between stores through an implicit quantity update.

Any supported transfer must be an explicit operation with a recorded source store, destination store, quantities, status and responsible actors.

Ownership, custody and financial treatment of transferred stock must follow separately approved business rules.

## 9. Orders and Fulfilment

### 9.1 Store ownership of orders

Every customer order must belong to one store.

The store context must be established by the trusted storefront or checkout process and validated by the backend.

A client must not be able to change the owning store by modifying a request payload.

### 9.2 Order contents

Order items must preserve the relevant transaction-time information.

This includes the product identity, applicable listing, quantity, price and other commercial details needed to interpret the transaction later.

Subsequent product or listing changes must not rewrite historical order values.

### 9.3 Order isolation

Store Admins and employees may access orders only within their authorised store scope.

A Store Admin must not view or manage another store's orders through direct API requests, manipulated identifiers or frontend navigation.

Platform-level access must follow the approved platform permission model.

### 9.4 Fulfilment

Each store is responsible for its own fulfilment operations unless a separately approved shared fulfilment arrangement exists.

Fulfilment responsibilities, status changes and relevant actors must be recorded.

### 9.5 Checkout boundaries

Public checkout must remain scoped to the storefront from which the customer initiated the transaction.

The initial architecture must not assume that a cart can combine products from multiple stores into one order.

Any future cross-store checkout capability requires a separate business and technical decision.

## 10. Customer Data

### 10.1 Initial customer scope

Customer records must respect store boundaries.

The initial architecture should treat customer relationships and store customer records as store-scoped unless an approved platform-wide customer identity model is established.

### 10.2 Customer isolation

A store must not automatically gain access to another store's customer records, order history or customer interactions.

Platform access to customer information must be limited to authorised purposes and permissions.

### 10.3 Cross-store customer identity

Whether one customer account or identity may be recognised across multiple stores remains an open decision.

The architecture must not assume that shared platform infrastructure authorises unrestricted cross-store customer profiling or data sharing.

### 10.4 Customer data protection

Customer data must be handled according to applicable privacy, security and retention requirements.

Collection, access, use, disclosure and deletion rules require appropriate policy and legal review.

## 11. Store Administration and Employees

### 11.1 Store Admin

Each store must have authorised Store Admin access.

A Store Admin manages the store's permitted operational activities and employee memberships within that store.

A Store Admin does not receive platform-wide administrative privileges.

### 11.2 Employee memberships

Employee access must be associated with a specific store and the permissions granted for that store.

An employee's membership in one store must not imply membership in another.

Where an individual works across multiple stores, each store relationship must be explicitly authorised and independently scoped.

### 11.3 Platform administration

Platform Super Admin access is separate from Store Admin access.

Platform administrators may perform authorised platform-level functions and controlled oversight.

Cross-store access must be attributable and must not be implemented as an unrestricted bypass of normal security controls.

### 11.4 Permission enforcement

Store permissions must be enforced by the backend for every protected operation.

The user interface may hide unavailable functions, but it must not be the only enforcement mechanism.

The identity and access model is defined in `docs/identity-access/IDENTITY_AND_ACCESS.md`.

## 12. Store Financial Separation

### 12.1 Store financial records

Each store's financial records must be identifiable independently.

Store revenue, expenses, refunds, obligations and other store-level transactions must not be merged into an undifferentiated platform balance.

### 12.2 Platform financial records

Platform revenue and expenses must be recorded separately from store financial activity.

Where the platform receives commissions, supplies stock, advances capital or receives repayments, those transactions must be represented explicitly.

### 12.3 Financial relationships

Financial relationships between the platform and a store must be traceable to their underlying agreements and transactions.

The architecture must support recording the relevant parties, amounts, dates, status, references and settlement information.

### 12.4 Unresolved commercial terms

Commission rates, commission calculation basis, settlement schedules, stock-supply terms, capital assistance terms and repayment conditions remain business decisions.

They must not be invented or permanently hard-coded into the store architecture before approval.

## 13. Store Activity and Performance

### 13.1 Store activity

Material store operations must generate attributable activity records.

Records should identify the store, actor, action, affected resource and relevant time.

Platform-level interventions must be distinguishable from ordinary store activity.

### 13.2 Store performance

The platform may provide store-level performance visibility and reporting.

Performance information must be interpreted in context, including the store's operating history, product categories, circumstances and agreed targets.

### 13.3 Performance oversight

Performance indicators may inform reviews and support decisions.

They must not independently trigger material financial, governance or operational interventions without the required human review and authority.

## 14. Store Lifecycle

### 14.1 Onboarding

Store onboarding must establish the store's identity, authorised representatives, administrative access and approved operating configuration.

The process must verify that the store is authorised to participate before enabling public operations.

Onboarding should include:

- Creation of the store record.
- Assignment of a stable store identifier and public routing identity.
- Initial Store Admin provisioning.
- Storefront configuration.
- Product listing setup.
- Inventory setup where applicable.
- Required operational and financial configuration.
- Verification before activation.

Detailed onboarding requirements and approval responsibilities belong in the operational documentation.

### 14.2 Activation

A store may become active only after the required onboarding conditions have been satisfied.

Activation must not automatically grant permissions beyond the approved store role model.

### 14.3 Suspension

Suspension must be an explicit and auditable administrative action.

The system must support restricting selected operations or public access according to approved policy.

Suspension must not silently erase orders, financial records, inventory history or audit records.

### 14.4 Deactivation and exit

Store deactivation must be distinguished from deletion of the store record.

Deactivation may disable public storefront access, new sales, selected administrative functions or other capabilities according to the approved suspension or exit process. It must not automatically delete the store identity or its historical records.

Store exit must be handled through a controlled process.

The process must account for outstanding orders, customer obligations, inventory, financial balances, access revocation, data retention and applicable agreements.

Historical orders, financial records, audit history and records required to resolve outstanding obligations must remain preserved and accessible to appropriately authorised users.

Deactivation must not be treated as permission to erase records that must be retained. Any eventual deletion or anonymisation must follow approved retention rules and applicable legal obligations.

### 14.5 Reinstatement

Reinstatement must follow an authorised process and restore only the access and capabilities approved for the store.

Historical records must remain distinguishable from new activity.

## 15. Data Isolation and Security Requirements

The platform must enforce the following:

- Every store-owned record must have a validated store relationship.
- Store context must be derived or validated by trusted backend logic.
- Store Admin access must be restricted to the assigned store.
- Store employees must be restricted to their authorised store and permissions.
- Cross-store references must be rejected where the relationship is not authorised.
- Store identifiers supplied by clients must never override authenticated access scope.
- Database constraints must protect store-scoped relationships where applicable.
- Backend authorisation must apply to reads, writes, updates, deletes and background processing.
- Storage access must respect the ownership and visibility of the associated resource.
- Platform-level access must be controlled and auditable.
- Store suspension must be enforced across relevant APIs and public operations.
- Security failures must not expose another store's records.

Database-level row security may provide additional protection where appropriate, but it does not replace backend authorisation.

## 16. Shared Platform Services

The platform may provide shared services to participating stores, including:

- Authentication and identity infrastructure.
- Store and membership administration.
- Product catalogue capabilities.
- Inventory and order processing.
- Payment and notification integrations.
- Media storage.
- Reporting and performance tools.
- Marketing and business support capabilities.

Shared services must preserve store context and ownership.

A shared service must not treat all participating stores as one commercial entity.

## 17. Store Architecture and Application Modules

The initial target architecture is a modular monolith.

Store-related capabilities should be separated into clear application modules while remaining within the initial backend deployment model.

Relevant modules include:

- Store Management.
- Store Configuration.
- Storefront and Catalogue.
- Product Ownership and Listings.
- Inventory.
- Commerce and Orders.
- Customer Management.
- Store Membership and Access.
- Financial Records.
- Activity and Audit.
- Performance and Reporting.

Module boundaries must preserve the ownership and access rules defined in this document.

The system must avoid introducing distributed services or unnecessary infrastructure solely to represent individual stores.

## 18. Migration and Existing Yotaabo Operations

### 18.1 Existing store protection

Yotaabo is an existing operating storefront and must remain functional throughout the transition to the multi-store architecture.

Migration must not assume that existing Yotaabo records can be discarded or recreated without verification.

### 18.2 Existing data

Existing products, listings, images, orders, customer records, authentication identities, administrative access and other production data must be assessed before migration.

Existing records must be mapped to the correct store ownership and relationships.

### 18.3 Incremental migration

The multi-store architecture must be introduced incrementally.

Existing functionality may continue operating while new store-aware capabilities are introduced and verified.

### 18.4 Migration verification

Before a migration or cutover is considered complete, verification must establish that:

- Existing Yotaabo products and listings remain correct.
- Existing images and media remain accessible.
- Existing orders and historical records remain intact.
- Existing administrative identities and authorised access remain valid.
- Store ownership is assigned correctly.
- Store isolation is enforced.
- Public browsing and checkout continue to work.
- No participating store can access another store's protected data.

### 18.5 No premature platform cutover

The architecture document does not authorise an immediate production migration or replacement of existing application services.

Implementation and cutover must follow separately reviewed migration plans.

## 19. Operational and Non-Functional Requirements

The store architecture must support:

- Reliable store-context resolution.
- Consistent store-level authorisation.
- Data integrity across store relationships.
- Secure handling of customer and financial information.
- Traceable administrative and commercial actions.
- Independent store availability and operational status.
- Maintainable shared storefront components.
- Configurable store presentation within approved limits.
- Safe onboarding and deactivation.
- Incremental platform growth without unnecessary architectural complexity.

Performance and availability targets must be specified in the relevant non-functional requirements.

## 20. Open Store Architecture Decisions

The following decisions require further specification and approval:

- Final store onboarding and approval workflow.
- Store domain and subdomain strategy.
- Whether stores may use custom domains.
- Exact storefront configuration options.
- Whether any store-specific layout variations will ever be supported.
- Product ownership and approval rules for shared catalogue items.
- Whether product owners may withdraw shared products and under what conditions.
- Inventory location and warehouse requirements.
- Stock transfer and stock-supply rules.
- Cross-store customer identity and account scope.
- Cross-store checkout, if ever required.
- Payment account and settlement arrangements.
- Commission rates, calculation basis and settlement rules.
- Stock and capital assistance terms.
- Store suspension, exit and reinstatement policies.
- Data retention and export obligations.
- Platform oversight and intervention procedures.

These decisions must remain configurable or deferred until approved. They must not be silently converted into permanent technical assumptions.

## 21. Relationship to Other Documents

This document must be read alongside:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/PLATFORM_BUSINESS_MODEL.md`
- `docs/product/STORE_OPERATING_MODEL.md`
- `docs/product/SCOPE_AND_EXCLUSIONS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATA_ARCHITECTURE.md`
- `docs/identity-access/IDENTITY_AND_ACCESS.md`

The System Architecture defines the overall application structure.

The Data Architecture defines data ownership, relationships and integrity.

The Identity and Access Management document defines authentication, roles, permissions and access enforcement.

This document defines store boundaries and how store capabilities operate within that architecture.

## 22. Architecture Governance

Changes to store boundaries, ownership rules, storefront customisation, cross-store access or shared operational capabilities must receive appropriate architecture and business review.

Implementation must not weaken approved store isolation or transfer authority between the platform and stores without an approved decision.

Where requirements remain unresolved, implementation must preserve the existing boundaries and defer the unresolved capability.

This document must be reviewed when material changes are made to the platform's store model.
