# Centralised Customer Identity and Cross-Store Account Architecture

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-ARCH-50CDB9F896 |
| Category | Architecture |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This document defines the architecture for a single, centralised customer identity and account system shared across all participating stores.

A customer must be able to create one platform account and use that account to purchase from any participating store without registering separately for each store.

The platform owns customer identity, authentication and the central customer record. Individual stores operate within this shared identity system while retaining appropriate boundaries around their orders, customer interactions and commercial information.

## 2. Architectural Decision

The platform will maintain one authoritative customer identity for each registered customer.

Participating stores will not create independent customer accounts or maintain separate authoritative customer identity records.

All storefronts will use the platform's central customer identity and authentication capabilities.

A customer account is platform-wide, not store-specific.

This decision applies to current and future participating stores.

## 3. Design Principles

The architecture must follow these principles:

1. One customer identity across the entire platform.
2. One authoritative central customer record.
3. No duplicate registration merely because a customer visits another store.
4. All purchases must retain their originating store attribution.
5. Customer authentication must be centrally managed.
6. Customer purchase history must be traceable across stores.
7. Store access must remain appropriately isolated.
8. Customer consent must be recorded with its relevant purpose and scope.
9. Historical transaction records must remain intact.
10. Customer identity must be independent of storefront design and implementation.

## 4. Central Customer Identity

Each registered customer must receive a unique, permanent platform customer identifier.

The identifier must not depend on:

- A particular store.
- A storefront URL or domain.
- A product purchased.
- A telephone number that may change.
- An email address that may change.
- A store-specific customer number.

The platform customer identifier is the authoritative reference used to associate the customer's account, orders and other permitted records.

A customer's contact details may change without creating a new customer identity.

The platform must not automatically merge customer accounts solely because they share a name, telephone number or email address.

## 5. Customer Account and Authentication Ownership

The platform is responsible for:

- Customer registration.
- Customer authentication.
- Account recovery.
- Credential management.
- Account status.
- Session management.
- Account security.
- Customer identity references.
- Account deactivation and deletion workflows.

Storefronts must use approved platform authentication interfaces or integration packages.

A store must not independently create passwords, authentication tokens or competing customer identity records.

Authentication must follow the platform's approved security standards, including session expiry, revocation, secure credential storage and account recovery controls.

## 6. Customer Registration

A customer may register through any participating storefront that supports customer registration.

The registration process must create or identify a platform-wide customer account.

The registration workflow must:

1. Collect the information required for account creation.
2. Validate the submitted information.
3. Check for an existing account using approved identity-matching procedures.
4. Prevent unintended duplicate account creation.
5. Create the central customer record where no existing account is found.
6. Establish authentication credentials or an approved identity-provider relationship.
7. Record relevant privacy notices and consent decisions.
8. Return the authenticated customer identity to the requesting storefront.

The storefront through which registration occurs must not become the permanent owner of the customer account.

## 7. Cross-Store Authentication

A registered customer must be able to authenticate when visiting any participating storefront.

Example:

1. A customer registers through Store A.
2. The platform creates customer identifier `CUST-001`.
3. The customer later visits Store C.
4. Store C uses the platform's authentication capability.
5. The platform recognises the existing account.
6. The customer signs in without creating another account.
7. Store C receives the authenticated platform customer reference.
8. A purchase at Store C is associated with `CUST-001`.

The platform must not create another customer identity merely because authentication originates from a different storefront.

The exact authentication experience may differ according to supported integration and domain configuration, but the underlying identity must remain the same.

## 8. Customer Data Model

The database must distinguish central customer identity from store-specific transactions and relationships.

The following logical entities define the intended model. Exact table names and physical implementation must follow the approved database architecture.

### 8.1 Customers

The central customer record.

Suggested attributes:

- Customer ID.
- Display name.
- Primary email address, where provided.
- Primary telephone number, where provided.
- Account status.
- Account creation timestamp.
- Last profile update timestamp.
- Relevant verification status.
- Deactivation timestamp, where applicable.

This record must not contain a store-specific ownership field that makes the customer belong exclusively to one participating store.

### 8.2 Customer Authentication

Authentication records must be maintained separately from general customer profile information.

They may include:

- Customer ID.
- Authentication provider reference.
- Credential metadata.
- Authentication method.
- Account recovery metadata.
- Credential creation and update timestamps.

Passwords and other authentication secrets must never be stored in plaintext.

Where an external identity provider is used, the platform must retain the appropriate stable provider identifier and securely manage the association with the central customer ID.

### 8.3 Customer Addresses

Addresses must be associated with the central customer identity.

Suggested attributes:

- Address ID.
- Customer ID.
- Recipient name.
- Address fields.
- Delivery instructions.
- Address label.
- Default preference.
- Creation and update timestamps.

Access to addresses must be restricted to authorised processes and stores with a legitimate need for the relevant transaction.

A store must not automatically gain unrestricted access to every address associated with the customer.

### 8.4 Orders

Every order must reference:

- A central customer ID, where the customer is registered.
- The originating store ID.
- The order reference.
- The order date.
- The order status.
- The payment status.
- The fulfilment status.
- The relevant transaction details.

Guest orders may initially have no registered customer ID. They must follow a controlled process if later associated with an authenticated customer account.

### 8.5 Order Items

Each order item must preserve the product and variant information applicable when the order was placed.

The record should retain appropriate historical snapshots, including:

- Product identifier.
- Variant identifier.
- Product name.
- SKU.
- Quantity.
- Unit price.
- Applicable discounts.
- Relevant product attributes.

A later product catalogue change must not rewrite the customer's historical purchase information.

### 8.6 Customer-Store Relationships

Where necessary, the platform may maintain a separate relationship between a customer and a participating store.

This may support:

- Store-specific preferences.
- Store-specific marketing subscriptions.
- Store-specific communication settings.
- Customer support relationships.
- Store-specific loyalty programmes, if approved in future.

Such a relationship must not create a second customer identity.

A customer-store relationship must only exist where there is a defined operational or business requirement.

### 8.7 Customer Consent

Consent records must be maintained with enough detail to identify:

- Customer ID.
- Store ID, where consent is store-specific.
- Processing purpose.
- Communication channel.
- Consent status.
- Collection method.
- Timestamp.
- Applicable notice or policy version.
- Withdrawal timestamp, where applicable.

A platform-wide account registration must not automatically create marketing consent for every participating store.

## 9. Centralised Purchase History

The platform must maintain a consolidated purchase history associated with the central customer ID.

The history must include purchases made across participating stores.

Example:

| Customer ID | Store | Order | Purchase |
|---|---|---|---|
| CUST-001 | Store A | ORD-1001 | Perfume X |
| CUST-001 | Store C | ORD-2045 | Perfume Y |
| CUST-001 | Store B | ORD-3020 | Room Fragrance Z |

The customer must not need separate accounts to access these transactions.

The platform should provide an authenticated customer account experience that can present the customer's permitted cross-store purchase history.

Purchase history must preserve originating store attribution and must not combine separate store transactions into one artificial order.

## 10. Store-Level Customer Access

Centralised customer identity does not grant every store unrestricted access to the customer's complete platform history.

Store access must be restricted by server-side authorisation.

A store may access customer information necessary for its legitimate activities, including:

- Orders placed with that store.
- Relevant order items.
- Contact details required to process those orders.
- Delivery or collection details required for fulfilment.
- Relevant customer communications.
- Support cases associated with that store.

A store must not automatically access:

- Orders placed with other stores.
- Another store's private customer communications.
- Another store's commercial notes.
- Another store's customer support history.
- Unrelated customer addresses or personal information.
- Another store's marketing consent records.

Access must be checked against the authenticated employee's current permissions and the originating store.

Frontend filtering alone is not sufficient.

## 11. Customer Access Across Stores

An authenticated customer should be able to view their own permitted account information across participating stores.

This may include:

- Account profile.
- Contact information.
- Saved addresses.
- Orders from all participating stores.
- Order details and status.
- Relevant payment and fulfilment information.
- Customer communication preferences.
- Privacy and account management options.

The customer account experience must clearly identify which store handled each order.

Customer access must be based on the authenticated central customer identity, not a customer ID supplied freely by the browser.

## 12. Guest Purchases and Account Linking

The platform may allow customers to purchase without creating an account.

A guest order must retain its originating store and transaction information.

Where the customer later creates an account, the platform may support linking eligible guest orders to the central customer identity.

Account linking must require sufficient identity verification.

The platform must not automatically attach guest orders to an account solely because an email address or telephone number matches.

The process must prevent:

- Unauthorised claims over another customer's orders.
- Duplicate order associations.
- Cross-store data exposure.
- Changes to historical transaction ownership without an auditable record.

Any account-linking action must be recorded in the audit history.

## 13. Customer Identity Changes and Duplicate Accounts

Customer contact details may change over time.

The platform must support controlled updates to:

- Names.
- Email addresses.
- Telephone numbers.
- Other permitted profile fields.

Changes to verified contact details must follow the approved verification process.

Where duplicate accounts are suspected, the platform must provide a controlled investigation and merge process.

A merge must:

1. Verify that both accounts belong to the same person.
2. Confirm the appropriate authority for the change.
3. Identify related orders and records.
4. Preserve historical transaction references.
5. Reassign eligible relationships through an auditable operation.
6. Prevent duplicate order associations.
7. Preserve relevant consent and communication history.
8. Record the original and resulting customer identifiers.

Customer records must not be physically merged through uncontrolled database edits.

## 14. Customer Account Deactivation and Deletion

Account deactivation must be distinct from deletion of historical business records.

Where a customer deactivates an account:

- Authentication must be disabled or restricted as appropriate.
- Active sessions must be revoked.
- The account must not be usable for new authenticated activity.
- Historical orders and financial records must remain intact where retention is required.
- Store access must remain subject to applicable retention and privacy rules.

Deletion requests must be assessed against applicable law and the platform's retention requirements.

The platform must support appropriate deletion, anonymisation or restriction processes where legally required and permitted.

Deactivating an account must not automatically delete order history belonging to participating stores.

## 15. Customer Marketing and Preferences

Marketing preferences must be independent of authentication status.

A customer may have one platform account and different communication preferences for different stores.

For example:

- The customer may consent to Store A marketing.
- The customer may decline Store B marketing.
- The customer may withdraw consent for Store C marketing.
- Transactional communications may still be necessary for existing orders where legally permitted.

A store must not inherit another store's marketing consent.

The platform must maintain the purpose, store scope, channel and history of relevant consent decisions.

## 16. Storefront Integration Requirements

Every participating storefront that supports customer accounts must integrate with the platform's central identity capability.

The integration must:

- Use approved platform authentication interfaces.
- Use the central customer identity.
- Avoid creating local authoritative customer accounts.
- Associate orders with the authenticated central customer ID.
- Preserve originating store attribution.
- Enforce server-side authorisation.
- Avoid exposing private authentication information.
- Support secure logout and session revocation.
- Follow approved account recovery procedures.

Storefronts may customise the visual presentation of registration, sign-in and account pages within the supported storefront design system.

They may not change the underlying customer identity ownership model.

## 17. API and Security Requirements

The platform must provide controlled interfaces for:

- Customer registration.
- Customer authentication.
- Customer profile management.
- Customer address management.
- Customer order history.
- Customer consent management.
- Customer account recovery.
- Customer account deactivation.
- Guest order linking, where supported.

All customer endpoints must enforce authentication and authorisation server-side.

The platform must validate:

- The authenticated customer identity.
- The requesting store.
- The employee or customer permissions.
- The requested record ownership.
- The permitted operation.
- The current account status.

Customer IDs supplied by a storefront must not be trusted as proof of ownership.

Authentication tokens must not contain permanently authoritative store permissions or customer access rights that cannot be revoked.

Sensitive operations must be logged without recording passwords, tokens or other secrets.

## 18. Data Integrity and Transaction Requirements

The platform must enforce appropriate database relationships and constraints.

Requirements include:

- Unique central customer identifiers.
- Valid customer references on registered-customer orders.
- Valid originating store references on orders.
- Referential integrity between orders and order items.
- Controlled customer identity changes.
- Protection against duplicate account creation.
- Protection against duplicate order linking.
- Auditable customer account merges.
- Transaction-safe updates to customer and order relationships.

A customer profile update must not unintentionally alter historical order snapshots.

A store deactivation must not remove the central customer identity or historical orders associated with that store.

## 19. Reporting and Analytics

The platform may provide authorised cross-store customer reporting for legitimate operational and governance purposes.

Potential reporting includes:

- Total registered customers.
- New customer registrations.
- Active and deactivated accounts.
- Customer purchase frequency.
- Cross-store purchase activity.
- Customer retention.
- Customer support activity.
- Consent and communication preferences.

Store-level reporting must remain restricted to the relevant store's authorised information.

Cross-store reporting must follow data governance, privacy and access-control requirements.

Customer analytics must not automatically trigger financial assistance, penalties, account restrictions or store interventions.

## 20. Prohibited Architecture Patterns

The following patterns are prohibited:

- Creating a separate customer account for each store.
- Treating a store ID as part of the customer's permanent identity.
- Allowing storefronts to own independent authentication credentials.
- Duplicating central customer records for ordinary cross-store purchases.
- Automatically sharing all customer purchase history with every store.
- Treating a matching email address as sufficient proof for account merging.
- Allowing a browser to choose another customer's identity.
- Allowing a store to modify another store's customer relationships.
- Automatically applying one store's marketing consent to another store.
- Deleting historical transactions when a customer account is deactivated.

## 21. Implementation and Migration Considerations

Implementation must be phased and must preserve existing store operations.

Before enabling central customer accounts, the platform must:

1. Establish the authoritative customer identity model.
2. Define the central customer schema.
3. Define authentication and account recovery.
4. Define store-level access boundaries.
5. Define customer and store consent relationships.
6. Define guest order linking.
7. Define customer profile and order APIs.
8. Implement database constraints and audit records.
9. Test cross-store identity and access isolation.
10. Prepare migration procedures for any existing customer records.

Existing customer records must not be merged automatically without an approved identity-resolution process.

The migration must preserve order references, store attribution and financial history.

The current production API and database must remain the operational baseline until a controlled migration is approved.

## 22. Acceptance Criteria

The architecture is correctly implemented when:

- A customer can register through one participating store.
- The same account can authenticate through another participating store.
- Visiting another store does not create a duplicate account.
- All registered-customer orders reference the same central customer ID.
- Every order retains its originating store ID.
- Customers can access their permitted cross-store purchase history.
- Store employees cannot access unrelated stores' private customer records.
- Store-specific marketing consent remains separate.
- Customer contact changes do not create a new identity.
- Duplicate account resolution is controlled and auditable.
- Guest order linking requires appropriate verification.
- Account deactivation does not erase retained historical transactions.
- Customer data access is enforced server-side.
- Relevant identity and administrative actions are auditable.

## 23. Related Documents

This architecture must be implemented consistently with:

- CUSTOMER_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- DATA_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- DATABASE_SCHEMA_AND_DATA_MODELING_STANDARDS.md
- CUSTOMER_DATA_CAPTURE_AND_CONSENT_STANDARDS.md
- AUTHENTICATION_SESSION_AND_TOKEN_LIFECYCLE_STANDARDS.md
- ORDER_LIFECYCLE_AND_FULFILMENT_MANAGEMENT_STANDARDS.md
- PLATFORM_AUDIT_TRAIL_AND_ADMINISTRATIVE_ACTIVITY_STANDARDS.md
- STORE_INTEGRATION_PACKAGE_SPECIFICATION.md

## 24. Review and Approval

This document remains a draft until formally reviewed and approved by the appropriate platform governance authority.

Approval must confirm that the central customer identity model, cross-store access boundaries, authentication responsibilities and customer privacy controls are consistent with the platform's overall architecture and operating model.
