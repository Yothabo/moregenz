# Data Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-E7AD4A809A |
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

This document defines the proposed logical data architecture for the platform.

It establishes the principal data domains, entities, relationships, ownership boundaries, integrity requirements and access principles required to support multiple independently operated stores.

It describes the target logical model rather than claiming that every proposed entity or relationship already exists in the current production database.

The architecture must support the approved product vision, business model, store operating model, scope and system architecture.

## 2. Data Architecture Principles

The data model must follow these principles:

1. **Clear ownership:** Every business record must have an identifiable owning entity or business context.
2. **Store isolation:** Store-specific operational data must remain scoped to the relevant store.
3. **Controlled sharing:** Shared information must not imply unrestricted access or transfer of ownership.
4. **Financial separation:** Platform finances and individual store finances must remain distinguishable.
5. **Inventory accountability:** Stock quantities and movements must be attributable to the relevant store or stock owner.
6. **Historical integrity:** Important commercial, financial, inventory and administrative changes must remain traceable.
7. **Referential integrity:** Relationships between records must be enforced through appropriate database constraints.
8. **Configurable rules:** Unresolved business policies must not be embedded as permanent assumptions in the database.
9. **Least privilege:** Data access must be restricted according to the user's authorised platform or store scope.
10. **Migration safety:** The target model must accommodate existing Yotaabo data without unnecessary loss or disruption.

## 3. Database and Tenancy Model

### 3.1 Initial database model

The proposed initial architecture uses:

- One central relational PostgreSQL database.
- One shared database schema for platform and store records, unless a later decision justifies separation.
- Explicit store ownership and store context on store-specific records.
- Platform-level records for information owned or administered centrally.
- Database constraints and controlled backend access to enforce data boundaries.

The initial model is a single platform operating multiple stores. It is not a design for multiple independent platform instances.

### 3.2 Store isolation

Store-specific records must reference their owning store.

Examples include:

- Store product listings.
- Store inventory.
- Store orders.
- Store customer records where customer data is store-scoped.
- Store employees and operational permissions.
- Store financial transactions.
- Store promotions and commercial settings.

A request operating in a store context must not access another store's records merely because the user is authenticated.

The backend must validate the user's authorised store access independently of any store identifier supplied by the frontend.

### 3.3 Platform-level records

Platform-level records include information such as:

- Platform configuration.
- Platform administrators.
- Store registrations and lifecycle records.
- Platform-wide product records where the platform owns the source information.
- Platform financial transactions.
- Platform policies and configuration.
- Cross-store operational records where access is authorised.

Platform-level access must not automatically grant unrestricted access to every store's operational information.

## 4. Core Data Domains

The logical data model is divided into these domains:

| Domain | Responsibility |
|---|---|
| Identity and Access | Users, authentication references, roles and permissions |
| Platform Administration | Platform configuration and administration |
| Store Management | Store identity, status and operational configuration |
| Product Catalogue | Product identity, ownership and descriptive information |
| Store Listings | Store-specific product availability and commercial terms |
| Inventory | Stock balances, reservations and movements |
| Customers | Customer records and store relationships |
| Commerce | Carts, orders, order items and fulfilment |
| Finance | Financial records, obligations and settlements |
| Activity and Audit | Traceable records of important actions and changes |
| Performance | Store performance measurements and assessments |
| Marketing | Store campaigns and promotional activity |
| Notifications | Messages and delivery records |
| Integrations | External service configuration and references |

These domains describe logical responsibilities. They do not require every domain to become a separate database schema or deployed service.

## 5. Identity and Access Data

### 5.1 User identity

A user represents an individual who can authenticate and interact with the platform.

The proposed user record should support:

- A stable internal identifier.
- Authentication provider reference.
- Account status.
- Created and updated timestamps.
- Relevant account lifecycle information.

Authentication credentials and secrets must not be stored as ordinary application profile fields.

The identity architecture must allow the existing authentication provider to be retained or replaced without making business records dependent on provider-specific identifiers as their only identity.

### 5.2 Platform roles

Platform-level role assignments must be separate from store-level role assignments.

The initial platform role includes:

- Platform Super Admin.

Additional platform roles may be introduced through an approved permission model.

### 5.3 Store memberships

A user may be associated with one or more stores through explicit store membership records.

A membership should identify:

- User.
- Store.
- Assigned store role or permission set.
- Membership status.
- Assignment and revocation information.

Store roles include:

- Store Admin.
- Store employee roles with delegated permissions.

A user's membership in one store must not imply membership in another.

### 5.4 Permissions

Role assignments and permission definitions must support controlled access to platform and store operations.

The model must distinguish:

- Platform permissions.
- Store-scoped permissions.
- Resource-specific permissions where required.

Permission changes must be attributable to the responsible actor and recorded where they affect access or accountability.

## 6. Store Data

### 6.1 Store entity

Each participating store must have a stable store record.

The proposed store record includes:

- Store identifier.
- Store name.
- Public brand identity.
- Store description and contact information.
- Store status.
- Operational configuration.
- Created and updated timestamps.

Additional legal, tax, registration and ownership information may be introduced once the business and professional requirements are confirmed.

The database must not assume that every participating store is a separately incorporated legal entity.

### 6.2 Store lifecycle

Store lifecycle changes must be recorded.

A store's status must control whether it can participate in relevant platform operations.

Deactivation must not automatically delete historical orders, financial records, audit history or other records that must be retained.

### 6.3 Store configuration

Store-specific settings must be stored independently from platform-wide configuration.

Examples include:

- Public storefront settings.
- Contact and business information.
- Operational preferences.
- Store-specific commercial settings.
- Approved feature configuration.

Platform defaults may exist, but store-specific values must remain distinguishable from inherited defaults.

## 7. Product Catalogue and Ownership

### 7.1 Product identity

A product represents the underlying product identity and descriptive information.

A product record may include:

- Product identifier.
- Product name.
- Description.
- Brand or manufacturer information.
- Product category.
- Product attributes.
- Product images and media references.
- Product ownership reference.
- Created and updated timestamps.

The product identity must be distinguishable from the way an individual store sells that product.

### 7.2 Product ownership

Product ownership must be explicit.

A product may be owned by:

- The platform.
- An individual participating store.

The ownership reference must identify the owning entity.

Making a product available to another store must not change its ownership.

### 7.3 Product sharing

A separate relationship must represent which stores are permitted to use a product in their catalogues.

The proposed logical relationship is:

`ProductStoreAccess`

It connects a product to a store and records the relevant access or availability status.

The relationship may support:

- Product identifier.
- Store identifier.
- Access status.
- Effective dates where required.
- Approval or authorisation reference where applicable.

Sharing a product does not grant another store unrestricted authority to change its source identity, ownership or descriptive information.

### 7.4 Store product listings

A store listing represents a product as offered by a particular store.

The proposed relationship is:

`StoreProductListing`

It connects a product to a store and holds store-specific commercial information.

This may include:

- Store identifier.
- Product identifier.
- Listing status.
- Store-specific selling price.
- Store-specific promotional price or offer reference.
- Store-specific display settings.
- Availability configuration.
- Created and updated timestamps.

The store controls its own commercial terms and listing status within the platform's approved rules.

Changes to a store listing must not overwrite the source product record.

### 7.5 Product changes

Changes to shared product identity and descriptive information must follow the product ownership and access rules.

Store-specific changes must remain within the store listing.

The system must be able to identify the source and history of important product changes.

The detailed approval process for shared product information remains subject to business rules.

## 8. Inventory Data

### 8.1 Inventory ownership and scope

Inventory must be tracked independently for each store.

A store's stock balance must not be inferred from another store's balance or from the total quantity of a shared product across the platform.

The model must distinguish:

- Product identity.
- Store listing.
- Stock ownership.
- Physical or recorded stock location.
- Available quantity.
- Reserved quantity.
- Stock movement history.

### 8.2 Inventory records

The proposed logical entities include:

**InventoryBalance**

Represents the recorded stock position for a product within a store or other explicitly identified stockholding context.

It should identify:

- Product.
- Store or stockholding owner.
- Location where applicable.
- Quantity on hand.
- Quantity reserved.
- Relevant timestamps.

**StockMovement**

Records a change in stock.

Movement records should identify:

- Product.
- Source and destination where applicable.
- Quantity.
- Movement type.
- Reference to the related transaction.
- Responsible actor or originating process.
- Timestamp.

### 8.3 Stock movement types

The model should accommodate movements such as:

- Stock received.
- Stock sold.
- Customer return.
- Supplier return.
- Stock adjustment.
- Stock transfer.
- Stock reservation.
- Reservation release.

The final movement types and validation rules must be defined in the inventory specification.

### 8.4 Transfers and supplied stock

Transfers between stores must be represented as explicit transactions.

A transfer must identify the sending and receiving contexts, quantities, status and relevant timestamps.

Stock supplied by the platform or another store must have an identifiable source and ownership or custody arrangement.

The model must not assume that receiving stock automatically transfers legal ownership.

### 8.5 Inventory integrity

Stock balances must be reconcilable against their movement history.

Stock movements must not be silently overwritten or deleted to correct historical mistakes.

Corrections should be represented through appropriate adjustment or reversal records.

## 9. Customer Data

### 9.1 Customer records

Customer data must support the store's ability to manage its own customer relationships and fulfil orders.

The proposed customer record may include:

- Customer identifier.
- Contact information.
- Relevant delivery information.
- Account or profile status.
- Created and updated timestamps.

Only information required for legitimate operational purposes should be collected.

### 9.2 Store relationship

Customer records must have an explicit store relationship unless a future approved cross-store customer model is adopted.

A customer interacting with one store must not automatically become visible to every other store.

### 9.3 Cross-store customer identity

Whether customers should have one shared platform identity, separate store profiles or an optional linked identity remains an open business and privacy decision.

The initial model must not assume unrestricted cross-store sharing of customer information.

### 9.4 Customer data protection

Customer information must be protected through access controls, appropriate retention practices and secure handling.

Access must be limited to authorised users and legitimate operational purposes.

## 10. Commerce and Order Data

### 10.1 Order ownership

Every order must belong to one store.

The order must identify the store responsible for the sale and fulfilment.

A platform administrator's access to order information must follow the platform's authorised oversight and support responsibilities.

### 10.2 Order records

The proposed `Order` entity should include:

- Order identifier.
- Store identifier.
- Customer reference.
- Order status.
- Order totals.
- Currency.
- Payment status.
- Fulfilment status.
- Relevant timestamps.
- External payment or integration references where applicable.

The precise payment and fulfilment workflows will be defined separately.

### 10.3 Order items

An order must contain one or more order item records.

Each order item should preserve the relevant transaction-time information, including:

- Product reference.
- Product name or description snapshot.
- Quantity.
- Unit selling price.
- Applicable discount.
- Line total.

Historical order values must not change when the current product description or store listing price changes.

### 10.4 Order lifecycle

Order status changes must follow defined transition rules.

Important changes must be traceable, including cancellations, refunds and fulfilment changes.

A historical order must not be silently rewritten to reflect a later operational or pricing change.

### 10.5 Transactions and stock

Order processing and inventory updates must preserve transactional consistency.

Where a business operation changes both an order and stock, the system must prevent partial updates that leave the records inconsistent.

The exact reservation, payment confirmation and stock deduction sequence remains part of the commerce specification.

## 11. Financial Data

### 11.1 Financial separation

The data model must distinguish platform financial activity from store financial activity.

Financial records must have an explicit ownership or accounting context.

The platform must not combine store revenue and platform revenue into an undifferentiated balance.

### 11.2 Store financial records

Store financial records may include:

- Sales revenue.
- Refunds.
- Operating expenses.
- Payment fees.
- Stock purchases.
- Stock-related obligations.
- Other approved store financial transactions.

Each transaction must be attributable to the relevant store and source operation.

### 11.3 Platform financial records

Platform financial records may include:

- Platform revenue.
- Platform operating expenses.
- Commissions or service charges where agreed.
- Stock supplied by the platform.
- Capital advanced by the platform.
- Repayments and outstanding obligations.

Platform transactions must remain distinguishable from store transactions.

### 11.4 Financial transaction records

The proposed financial transaction model should support:

- Transaction identifier.
- Financial owner or accounting context.
- Transaction type.
- Amount and currency.
- Transaction date.
- Related store where applicable.
- Related order, stock movement or assistance record where applicable.
- Status.
- Reference information.
- Created by and created at.

Financial records must preserve historical values and provide traceability.

### 11.5 Stock and capital assistance

Stock supplied and capital advanced must be represented separately from ordinary sales revenue.

Where an assistance arrangement creates an obligation, the model must identify:

- Providing party.
- Receiving party.
- Amount or stock value.
- Arrangement reference.
- Applicable terms.
- Outstanding balance where relevant.
- Repayments or settlement transactions.
- Status and history.

The database must not assume that all assistance is a loan, that all stock supplied is a sale, or that all support has identical repayment terms.

### 11.6 Commissions and settlements

Commission rates, calculation basis, settlement periods, deductions and payment arrangements remain unresolved business decisions.

The data architecture must allow approved terms to be represented explicitly once agreed.

It must not hard-code unapproved rates or settlement assumptions.

### 11.7 Financial integrity

Financial records must be auditable.

Corrections must preserve the original transaction history through appropriate reversals or adjustment entries.

Financial reporting must distinguish recorded transactions from calculated summaries and estimates.

## 12. Performance and Reporting Data

### 12.1 Performance measurements

Performance data must be attributable to the relevant store and measurement period.

Potential measures include:

- Sales.
- Order volume.
- Product performance.
- Inventory movement.
- Customer activity.
- Operating performance.
- Agreed business targets.

### 12.2 Assessment context

Performance assessments must preserve the context in which they were produced.

Relevant context may include:

- Measurement period.
- Store operating history.
- Product category.
- Store circumstances.
- Agreed targets.
- Data sources.
- Calculation or assessment methodology.

### 12.3 Explainability

Performance results must be traceable to their source data and calculation method.

A score must not become an unexplained substitute for the underlying business information.

Performance data may inform human review but must not independently authorise material financial or governance decisions.

### 12.4 Reporting

Reports must respect platform and store access boundaries.

A cross-store report must only expose information permitted by the user's platform-level permissions and the applicable governance rules.

Store comparisons must account for relevant differences rather than treating all stores as directly equivalent.

## 13. Marketing and Promotion Data

Marketing records must identify the store responsible for the activity.

The model may support:

- Campaigns.
- Promotional offers.
- Campaign schedules.
- Target audiences.
- Campaign status.
- Performance measurements.
- Related products and store listings.

Promotional pricing must remain associated with the relevant store listing or approved promotion.

A promotion created by one store must not unintentionally modify another store's commercial terms.

Platform-wide marketing activities must be distinguishable from store-specific campaigns.

## 14. Activity and Audit Data

### 14.1 Activity records

The system must maintain activity records for important operational and administrative actions.

Examples include:

- Store configuration changes.
- User and role changes.
- Product changes.
- Listing and pricing changes.
- Inventory movements.
- Order status changes.
- Financial transactions.
- Platform administrative actions.

### 14.2 Audit record fields

An audit record should capture, where applicable:

- Actor identifier.
- Actor's platform or store context.
- Action performed.
- Affected entity and record identifier.
- Relevant before and after values.
- Timestamp.
- Source or request reference.
- Reason or supporting reference where required.

Sensitive values, credentials and secrets must not be copied into audit records.

### 14.3 Audit integrity

Audit history must be protected against unauthorised modification and deletion.

Business records that require historical accountability must not rely solely on mutable current-state fields.

The detailed retention periods and audit access policy remain to be specified.

## 15. Notifications and Integration Data

### 15.1 Notifications

Notification records should identify:

- Recipient.
- Relevant store or platform context.
- Notification type.
- Delivery channel.
- Delivery status.
- Related business record.
- Creation and delivery timestamps.

Notifications must not expose information outside the recipient's authorised access.

### 15.2 Integration records

External integrations should have identifiable configuration and transaction references.

Integration records may include:

- Provider.
- Integration status.
- Store or platform scope.
- External reference identifiers.
- Synchronisation status.
- Error and retry information.

Secrets and API credentials must be stored in an appropriate secure configuration or secrets-management system, not ordinary business tables.

External integration failures must not silently corrupt internal business records.

## 16. Data Relationships

The following relationships describe the proposed logical model.

| Parent | Relationship | Child | Expected cardinality |
|---|---|---|---|
| User | Has | Store Membership | One to many |
| Store | Has | Store Membership | One to many |
| User | Has | Platform Role Assignment | One to many |
| Store | Owns | Store Product Listing | One to many |
| Product | Has | Store Product Listing | One to many |
| Product | Has | Product Store Access | One to many |
| Store | Has | Product Store Access | One to many |
| Store | Owns or manages | Inventory Context | One to many |
| Product | Has | Inventory Balance | One to many |
| Inventory Balance | Records | Stock Movement | One to many |
| Store | Owns | Customer Relationship | One to many |
| Store | Owns | Order | One to many |
| Customer | Places | Order | One to many, subject to customer model |
| Order | Contains | Order Item | One to many |
| Store | Has | Financial Transaction | One to many |
| Platform | Has | Platform Financial Transaction | One to many |
| Store | Has | Performance Record | One to many |
| Store | Has | Marketing Campaign | One to many |
| User or System Actor | Generates | Audit Record | One to many |

These relationships are logical. Their exact physical implementation, cardinality constraints and optionality must be confirmed during detailed database design.

## 17. Data Integrity and Database Constraints

The database must enforce integrity wherever practical.

### 17.1 Referential integrity

Foreign keys must protect relationships between users, stores, products, orders, inventory, financial records and other dependent entities.

A record must not reference a non-existent store or product.

### 17.1.1 Store-scoped referential integrity

Where records belong to a store, database relationships must preserve that store boundary.

Where applicable, composite unique constraints and composite foreign keys must include the store identifier to prevent records from referencing entities belonging to another store.

For example:

- An order must reference a customer within the permitted store context.
- An order item must reference a valid product and listing for the relevant transaction context.
- An inventory record must reference a valid store and product relationship.
- A store membership must reference an existing user and store.

Independent foreign keys that validate only the existence of a record are insufficient where the relationship must also enforce store ownership.

These constraints complement backend authorisation and must not replace it.

### 17.2 Uniqueness

Unique constraints must be applied to identifiers and business keys where appropriate.

Examples include:

- Stable internal identifiers.
- Unique membership combinations where only one active membership is permitted.
- Store-specific product listing combinations where duplicate active listings are not permitted.
- External transaction references within their relevant provider and scope.

Uniqueness rules must reflect approved business behaviour rather than assumptions.

### 17.3 Quantity and amount validation

Quantities and monetary values must use appropriate numeric database types.

The database must prevent invalid values where the business rules are established.

Currency must be explicit for monetary records.

Rounding and precision rules must be defined consistently.

### 17.4 Deletion and retention

Deletion policies must distinguish between:

- Records that may be safely deleted.
- Records that should be deactivated or archived.
- Records that must be retained for historical, operational or legal reasons.

Deleting a store, user or product must not unintentionally destroy historical orders, financial transactions, stock movements or audit records.

### 17.5 Concurrency

Operations that update stock, orders, financial balances or other shared records must account for concurrent requests.

The system must prevent lost updates, duplicate processing and inconsistent balances.

## 18. Data Access and Security

### 18.1 Backend enforcement

The backend must enforce access to business data.

Frontend filtering is not a security boundary.

Every operation involving store data must validate the authenticated actor's permissions and authorised store context.

### 18.2 Row-level security

PostgreSQL Row-Level Security may be used as an additional enforcement layer.

Its implementation must be compatible with the selected authentication and backend access model.

Policies must distinguish platform-level access from store-scoped access.

Privileged database credentials must never be exposed to the frontend.

### 18.3 Sensitive data

Sensitive information must receive appropriate protection.

This includes:

- Authentication-related data.
- Customer personal information.
- Financial information.
- Integration credentials.
- Private administrative information.

The platform must minimise unnecessary collection, exposure and retention.

### 18.4 Access history

Important access-control changes must be recorded.

Access revocation must take effect according to the approved session and authorisation lifecycle.

## 19. Data Migration and Existing Yotaabo Data

### 19.1 Existing production data

The current Yotaabo production database is an existing operational asset.

Migration to the target architecture must protect:

- Existing products.
- Product images and storage references.
- Storefront information.
- Store administration records.
- User and authentication relationships.
- Orders and transaction history where present.
- Existing operational records.

The target data model must not be implemented by casually replacing or dropping existing production tables.

### 19.2 Migration approach

Migration must be incremental and verifiable.

The process should include:

1. Inspect and document the current database schema.
2. Identify existing entities, constraints and relationships.
3. Map existing records to the target logical model.
4. Identify incompatible or incomplete data.
5. Define migration scripts and rollback procedures.
6. Test migrations against a non-production environment.
7. Validate record counts and important relationships.
8. Verify application behaviour against migrated data.
9. Plan production cutover and recovery.
10. Retain appropriate migration and reconciliation records.

### 19.3 Data ownership mapping

Existing Yotaabo records must be mapped to the correct store context.

Historical records must not be assigned to the platform merely because the platform now centrally manages the application.

Ownership and responsibility must be determined from the actual business context.

### 19.4 Coexistence

During migration, the existing application and new backend may temporarily coexist.

Both systems must not independently modify the same data without a defined consistency strategy.

The migration plan must identify the authoritative write path for each migrated capability.

## 20. Backup, Recovery and Retention

The platform must have a documented data protection strategy.

It should address:

- Database backups.
- Backup encryption and access control.
- Backup retention.
- Recovery procedures.
- Recovery testing.
- Storage and media recovery.
- Migration rollback.
- Data retention and deletion policies.

Recovery objectives and retention periods must be agreed according to business requirements and applicable obligations.

A backup is not considered reliable until restoration has been tested.

## 21. Open Data Architecture Decisions

The following decisions require further specification or approval:

1. Final physical database schema and naming conventions.
2. Whether selected domains require separate schemas.
3. Final product ownership and sharing approval workflows.
4. Whether product owners can delegate descriptive information maintenance.
5. Store and platform stock ownership and custody arrangements.
6. Stock transfer acceptance and reconciliation rules.
7. Customer identity and cross-store data-sharing model.
8. Customer account and guest checkout behaviour.
9. Financial ledger and accounting representation.
10. Commission calculation and settlement model.
11. Capital and stock assistance record structures and terms.
12. Financial reporting and reconciliation requirements.
13. Audit retention and access policy.
14. PostgreSQL Row-Level Security implementation.
15. Database access technology and transaction boundaries.
16. Backup frequency and recovery objectives.
17. Data retention and deletion requirements.
18. Existing production schema mapping and migration sequence.

These decisions must be resolved through the relevant business, security, governance and technical specifications.

## 22. Relationship to Other Documents

This document must be read alongside:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/PLATFORM_BUSINESS_MODEL.md`
- `docs/product/STORE_OPERATING_MODEL.md`
- `docs/product/SCOPE_AND_EXCLUSIONS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`

Detailed specifications should build on this logical model without contradicting approved product and architecture decisions.

## 23. Architecture Governance

Changes to the data architecture must preserve the approved ownership, store isolation, financial separation and auditability principles.

Material changes to data ownership, cross-store access, financial representation or historical retention require review before implementation.

Implementation details may evolve as the platform develops, but unresolved business decisions must not be silently converted into permanent database rules.

This document remains a target logical architecture until its approval and subsequent detailed database design.
