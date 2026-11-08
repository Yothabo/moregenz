# Customer Account Management and Self-Service Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines the customer-facing account management and self-service capabilities available through participating storefronts.

It establishes consistent behaviour for profile management, authentication, addresses, purchase history, communication preferences, privacy requests and account security.

These capabilities must operate through the platform's central customer identity system.

## 2. Scope

This standard applies to:

- Registered customers.
- Participating storefronts.
- Platform customer identity services.
- Customer account interfaces.
- Store personnel handling customer account enquiries.
- Platform personnel responsible for account support.

It covers customer self-service and the operational controls needed to support it.

## 3. Core Principles

Customer account management must follow these principles:

1. One account works across all participating stores.
2. Customers control their own permitted profile information.
3. Customer identity remains centrally managed by the platform.
4. Purchase history retains originating store attribution.
5. Stores cannot independently create or take ownership of customer accounts.
6. Account security takes priority over convenience.
7. Customers must be able to manage relevant communication preferences.
8. Sensitive account actions require appropriate verification.
9. Account changes must be auditable.
10. Storefront design differences must not change the underlying account rules.

## 4. Central Account Experience

Every participating storefront that supports customer accounts must use the platform's central customer identity.

A customer who registers through Store A must be able to sign in through Store B or Store C using the same account.

The platform must not create separate customer credentials or duplicate customer identities for each storefront.

The account experience may be presented through different storefront designs, but its underlying identity, security and data ownership rules must remain consistent.

## 5. Customer Account Dashboard

The authenticated customer dashboard should provide access to:

- Account overview.
- Personal profile.
- Contact details.
- Saved addresses.
- Orders across participating stores.
- Order details.
- Payment and fulfilment status.
- Communication preferences.
- Privacy requests.
- Account security.
- Sign-out and session management.

The dashboard must clearly identify the store associated with each order.

The customer must not be presented with separate accounts simply because purchases were made through different stores.

## 6. Profile Management

Customers should be able to view and update permitted profile information.

This may include:

- Display name.
- First and last name, where collected.
- Email address.
- Telephone number.
- Other approved profile fields.

Profile updates must be validated and securely stored.

Changes to verified contact details must follow the appropriate verification process.

The platform must preserve necessary historical transaction information rather than rewriting old orders whenever a customer updates their profile.

## 7. Contact Detail Verification

Email addresses and telephone numbers may be used for authentication, account recovery and customer communication.

The platform must distinguish between:

- A contact detail submitted by the customer.
- A contact detail verified by the platform.
- A contact detail that is no longer current.
- A contact detail awaiting verification.

Verification must use an approved mechanism.

A customer must not gain access to an existing account merely by submitting another person's email address or telephone number.

Changes to primary authentication contact details must trigger appropriate security controls.

## 8. Password and Authentication Management

Where password-based authentication is supported, customers must be able to:

- Create a password.
- Sign in securely.
- Change their password.
- Request password recovery.
- Complete account recovery through an approved process.

Passwords must be stored using an appropriate secure password-hashing mechanism.

The platform must never expose existing passwords to customers, store administrators or support personnel.

Where an external identity provider is used, credential management must follow the provider's supported security model.

Authentication requirements must remain consistent across all participating storefronts.

## 9. Session and Device Management

The platform must maintain central session control.

Customers must be able to sign out from the current session.

Where supported, the account experience should allow customers to review active sessions or devices and revoke sessions they no longer recognise.

Security-sensitive actions may require reauthentication.

Revoked sessions must no longer grant access to protected account information.

A storefront must not maintain an independent session that remains valid after the platform has revoked the underlying customer authentication.

## 10. Account Recovery

Account recovery must establish that the person requesting access is authorised to recover the account.

The recovery process must:

- Use approved verification channels.
- Avoid revealing whether another person has an account.
- Use time-limited recovery mechanisms.
- Prevent reuse of expired recovery credentials.
- Apply rate limits and abuse controls.
- Record relevant security events.
- Revoke or refresh sessions where required after recovery.

Support personnel must not bypass recovery controls merely because a customer claims to be the account owner.

Manual recovery exceptions must follow an approved, auditable procedure.

## 11. Saved Addresses

Customers may manage saved delivery addresses through their central account.

They should be able to:

- Add an address.
- View saved addresses.
- Update an address.
- Remove an address where permitted.
- Select a default address.
- Choose an address for an individual order.

Stores may access an address only where required to process an authorised transaction.

A store must not automatically receive access to all addresses saved by a customer.

An address used in a historical order must be preserved as an appropriate order snapshot where necessary for fulfilment, dispute handling or recordkeeping.

## 12. Consolidated Order History

The account dashboard must provide a consolidated view of the customer's purchases across participating stores.

Each order must display enough information to identify:

- Store name.
- Order reference.
- Order date.
- Products purchased.
- Order total.
- Payment status.
- Fulfilment status.
- Relevant order actions.

Selecting an order should show its relevant details and the store responsible for handling it.

Orders from different stores must remain separate transactions.

The customer must not be shown an artificial combined order simply because several purchases share the same customer account.

## 13. Order Management Actions

Available customer actions must depend on the order's current state and the store's approved operating policy.

Possible actions include:

- Viewing order details.
- Requesting an order amendment.
- Requesting cancellation.
- Contacting the responsible store.
- Requesting return or refund assistance.
- Viewing fulfilment updates.

A customer request must not automatically change an order's operational status.

Where the current commerce model uses WhatsApp and manual store processes, the account interface may direct the customer to the relevant approved communication channel.

The store remains responsible for reviewing and approving actions that require operational intervention.

## 14. Cross-Store Customer Support

Customers may contact the platform or a participating store for account assistance.

Support must distinguish between:

- Platform-wide identity and authentication issues.
- Store-specific order enquiries.
- Payment enquiries.
- Delivery and collection enquiries.
- Privacy and data requests.
- Marketing preference requests.

A store should only handle customer information required for its own responsibilities.

Where an issue relates to another store, the request must be directed through an approved support or escalation process without exposing unrelated customer information.

Platform support access must be purpose-limited and auditable.

## 15. Communication Preferences

Customers should be able to manage relevant communication preferences through their central account.

Preferences may include:

- Email marketing.
- WhatsApp marketing.
- SMS marketing, where supported.
- Store-specific promotional communications.
- Other approved communication channels.

Preferences must distinguish between platform-wide communications and store-specific communications.

A customer must be able to withdraw a marketing preference without losing access to essential transactional communication where legally permitted.

The platform must retain a history of relevant consent and withdrawal decisions.

## 16. Customer Privacy Controls

The account experience should provide access to appropriate privacy information and request channels.

Customers should be able to:

- View the applicable privacy notice.
- Request access to their personal information.
- Request correction of inaccurate information.
- Submit an objection or restriction request where applicable.
- Withdraw consent where consent is the relevant legal basis.
- Request account deactivation.
- Submit a deletion request for assessment.

Requests must be handled according to applicable law and the platform's approved privacy procedures.

The interface must not promise deletion of information that the platform or store is legally required to retain.

## 17. Account Deactivation

Customers may request account deactivation through an approved process.

Before deactivation, the platform should explain relevant consequences, including:

- Loss of authenticated account access.
- Revocation of active sessions.
- Inability to use account-based self-service.
- Continued retention of records where legally or operationally required.
- Available support channels for outstanding transactions.

Deactivation must not automatically cancel orders, reverse payments or delete historical financial records.

Outstanding orders and customer obligations must continue to be handled through the relevant store processes.

## 18. Account Deletion Requests

A deletion request must be assessed against applicable privacy and recordkeeping obligations.

The platform must determine which information can be deleted, anonymised, restricted or retained.

The process must preserve required transaction, audit and financial records.

Deletion must not be implemented as an uncontrolled cascading database delete that removes historical orders or financial information.

The outcome of the request must be recorded and communicated appropriately.

## 19. Storefront Consistency

Participating storefronts may present account pages using their approved visual design and supported configuration.

They may not independently change:

- Customer identity ownership.
- Authentication rules.
- Password security requirements.
- Cross-store account recognition.
- Customer data access boundaries.
- Consent scope.
- Account recovery controls.
- Account deactivation rules.

A customer should receive consistent account behaviour regardless of which storefront they use.

## 20. Accessibility and Usability

Customer account interfaces must follow the platform's accessibility standards.

Requirements include:

- Clear field labels.
- Accessible validation messages.
- Keyboard navigation.
- Appropriate focus management.
- Understandable error messages.
- Visible loading and processing states.
- Confirmation for consequential actions.
- Mobile-friendly layouts.
- Clear distinction between saved and unsaved changes.

Sensitive actions must not be hidden behind confusing or misleading interface behaviour.

## 21. Security and Abuse Prevention

The platform must protect account functionality against:

- Credential stuffing.
- Brute-force login attempts.
- Account enumeration.
- Password reset abuse.
- Session theft.
- Unauthorised profile changes.
- Unauthorised order access.
- Cross-store data access.
- Automated account creation.
- Unauthorised account linking.

Controls must include appropriate rate limiting, server-side validation, secure session management, audit logging and monitoring.

Sensitive account actions must require appropriate authentication and verification.

## 22. Audit Requirements

The platform must record relevant account events, including:

- Registration.
- Authentication.
- Failed authentication attempts where appropriate.
- Contact detail changes.
- Verification events.
- Password or credential changes.
- Account recovery.
- Session revocation.
- Address changes.
- Consent changes.
- Account deactivation.
- Deletion request outcomes.
- Administrative account interventions.

Audit records must not contain plaintext passwords, authentication tokens or unnecessary sensitive information.

## 23. Platform Limitations and Future Capabilities

The current commerce model is WhatsApp-first and uses manual store processes for customer communication, payment coordination and fulfilment.

The account architecture must not assume that all order actions can currently be completed automatically.

Future capabilities may include:

- Self-service order cancellation.
- Automated return requests.
- Customer loyalty programmes.
- Store-specific rewards.
- Saved payment methods.
- Online payment integrations.
- Advanced customer communication preferences.
- Customer support case tracking.

Each capability requires separate business, privacy, security and architecture approval.

## 24. Acceptance Criteria

The customer account experience is acceptable when:

- A customer can use one account across participating stores.
- Storefronts do not create independent customer credentials.
- Customers can manage permitted profile information.
- Verified contact detail changes follow approved procedures.
- Customers can securely recover account access.
- Customers can view consolidated purchase history.
- Every order identifies its originating store.
- Stores cannot access unrelated customer orders.
- Customers can manage relevant communication preferences.
- Privacy requests can be submitted through an approved channel.
- Account deactivation does not erase required historical records.
- Session revocation is enforced across participating storefronts.
- Sensitive account actions are auditable.
- The interface follows accessibility and security standards.

## 25. Related Documents

This standard must be implemented consistently with:

- CENTRALISED_CUSTOMER_IDENTITY_AND_CROSS_STORE_ACCOUNT_ARCHITECTURE.md
- CUSTOMER_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- CUSTOMER_DATA_CAPTURE_AND_CONSENT_STANDARDS.md
- AUTHENTICATION_SESSION_AND_TOKEN_LIFECYCLE_STANDARDS.md
- ORDER_LIFECYCLE_AND_FULFILMENT_MANAGEMENT_STANDARDS.md
- CUSTOMER_SUPPORT_CASE_MANAGEMENT_STANDARDS.md
- DATA_RETENTION_ARCHIVING_AND_SECURE_DISPOSAL_STANDARDS.md
- ACCESSIBILITY_STANDARDS.md
- SECURITY_IMPLEMENTATION_GUIDE.md

## 26. Review and Approval

This document remains a draft until formally reviewed and approved by the appropriate platform governance authority.

Approval must confirm consistency with the central customer identity architecture, customer privacy requirements, authentication standards, store operating model and supported storefront capabilities.
