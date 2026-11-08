# Store Frontend Developer Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Frontend Developer Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-USR-2F0628D157 |
| Category | User guidance |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide explains how developers build and maintain independent storefront frontends that connect to the shared multi-store platform backend.

Each participating store may have its own frontend, visual identity, domain and customer experience. Storefronts use shared platform services and must follow the platform's API contracts, security requirements and store-isolation rules.

The guide is intended for developers receiving a store-specific integration package generated during store provisioning.

## 2. Architecture Overview

The platform follows a shared-backend, independent-storefront model.

Each storefront:

- Is developed and deployed independently.
- Represents one authorised store.
- Connects to the shared platform backend.
- Uses its own store-specific public configuration.
- Retrieves catalogue and availability data through authorised APIs.
- Submits customer and commerce operations through backend services.
- Must not access another store's private operational data.

The backend remains responsible for authentication, authorisation, store context, business rules and data access.

A frontend is not a trusted security boundary.

## 3. Developer Responsibilities

The frontend developer is responsible for:

- Implementing the approved storefront experience.
- Consuming the supplied API contracts.
- Maintaining store-specific configuration.
- Handling loading, empty, error and unavailable states.
- Preserving customer and transaction integrity.
- Following accessibility and responsive-design requirements.
- Protecting public configuration from misuse.
- Avoiding exposure of private credentials.
- Testing store-specific behaviour.
- Maintaining deployment and release documentation.

The developer must not independently change backend permissions, catalogue ownership rules, financial rules or platform-wide behaviour.

## 4. Store Integration Package

### 4.1 Provisioning

When an authorised Platform Super Admin creates a store, the platform must automatically initiate generation of its store-specific integration package.

The package is the primary source of frontend connection information.

Developers must use the package generated for the intended store. They must not copy another store's configuration and substitute identifiers manually.

### 4.2 Package Contents

Depending on the platform's implemented capabilities, the package should provide:

- Store identifier and public reference.
- API base URL.
- Supported API version.
- Store-scoped public configuration.
- Publishable identifiers or keys, where applicable.
- API endpoint documentation.
- Catalogue and search integration instructions.
- Product media instructions.
- Domain and CORS configuration details.
- Environment variable examples.
- SDK or starter integration tooling, where available.
- Development and testing instructions.
- Deployment guidance.
- Configuration version and generation status.
- Support and escalation information.

The exact contents are determined by the provisioning implementation and generated package.

### 4.3 Package Access

Integration packages must be made available through an authorised platform administration and developer handover process.

Access must be limited to people authorised to work on the relevant storefront.

Private integration credentials must not be included in a browser-facing configuration package.

### 4.4 Package Updates

The platform may regenerate or update integration packages when relevant configuration, API contracts, domains or public identifiers change.

Developers must use the current package and follow communicated compatibility requirements.

## 5. Frontend Technology

The platform does not require every store to use the same frontend framework.

The chosen technology must support:

- Secure HTTPS communication.
- API integration.
- Responsive layouts.
- Accessible user interfaces.
- Reliable production builds.
- Environment-specific configuration.
- Appropriate error handling.
- Maintainable application code.

The frontend must remain compatible with the documented backend API contracts.

## 6. Environment Configuration

Each storefront must maintain separate development, testing and production configuration where those environments are provided.

Configuration must be loaded through the frontend framework's supported environment mechanism.

The developer must distinguish between:

- Public configuration intended for browser use.
- Private server-side configuration.
- Environment-specific deployment settings.

Public configuration may be visible to customers through browser inspection. It must contain no privileged secrets.

Do not commit private credentials, access tokens, database passwords or provider secrets to source control.

## 7. Store Identity and Context

Every storefront must operate under its assigned store identity.

The supplied integration package identifies the store context expected by the platform.

The backend must validate store context and permissions. A frontend-supplied store identifier is not proof of authorisation.

The developer must not:

- Allow customers to select arbitrary internal store identifiers.
- Change store context to access another store's information.
- Reuse privileged credentials across storefronts.
- Treat hidden UI controls as access control.
- Assume that a public identifier grants administrative access.

Store context must remain consistent across catalogue, cart, checkout and order operations.

## 8. API Integration

### 8.1 Contract-First Development

Developers must use the API documentation and contracts supplied by the platform.

The generated package and current API documentation determine the supported:

- Endpoints.
- HTTP methods.
- Request structures.
- Response structures.
- Authentication requirements.
- Validation rules.
- Pagination.
- Error responses.
- Rate limits.
- Version compatibility.

Do not invent endpoints or assume undocumented behaviour.

### 8.2 API Versioning

Use the API version supplied in the integration package.

Do not silently switch API versions or rely on undocumented compatibility behaviour.

Changes to API contracts must follow the platform's change and release process.

### 8.3 Request Handling

Frontend requests must:

- Use HTTPS in production.
- Follow the documented request format.
- Send only required data.
- Handle expected status codes.
- Avoid exposing sensitive information in logs.
- Respect rate limits.
- Prevent duplicate customer actions where appropriate.
- Handle network failures and timeouts.

### 8.4 Error Handling

The storefront must handle:

- Validation errors.
- Authentication failures.
- Authorisation failures.
- Missing or unavailable products.
- Out-of-stock conditions.
- Expired sessions.
- Rate limiting.
- Network interruptions.
- Temporary service failures.
- Unexpected server responses.

Customer-facing messages should be clear without exposing internal stack traces, database details or security information.

## 9. Product Catalogue Integration

The storefront must retrieve catalogue information through authorised platform APIs.

Developers must distinguish between:

- Product source identity.
- Product ownership.
- Store product availability.
- Store-specific product listing.
- Store pricing and commercial terms.
- Product variants.
- Store inventory and availability.

A product appearing in a shared catalogue does not automatically mean it is available for sale through every storefront.

The backend determines which products and listings the store may display.

### 9.1 Product Presentation

The frontend may control presentation of authorised product information, including:

- Product images.
- Names and descriptions.
- Variant selection.
- Store-specific pricing.
- Availability indicators.
- Product categories.
- Product detail layouts.

The frontend must not independently invent authoritative prices, ownership or stock quantities.

### 9.2 Product Media

Use media references and delivery instructions supplied by the platform.

Do not assume that every product image is publicly accessible or that a media URL will remain permanent.

Handle missing, unavailable or removed media gracefully.

## 10. Inventory and Availability

Inventory is maintained independently for each store.

The storefront must display availability based on authoritative backend responses.

Do not calculate authoritative stock levels from browser-side state.

The frontend must handle:

- Available stock.
- Unavailable stock.
- Variant-specific availability.
- Stock changes during shopping.
- Reservation or allocation outcomes.
- Failed checkout due to insufficient stock.

A product displayed as available may become unavailable before checkout. The backend response at the relevant transaction stage is authoritative.

## 11. Cart and Checkout Integration

Cart and checkout operations must follow the documented commerce API.

The frontend must not be treated as the authority for:

- Product eligibility.
- Prices.
- Discounts.
- Tax calculations.
- Shipping charges.
- Stock reservations.
- Payment status.
- Order totals.

The backend must validate transaction details before creating or confirming an order.

The frontend must handle changed prices, unavailable products, expired carts and failed checkout attempts.

Prevent repeated submissions where a customer action could create duplicate operations.

## 12. Payment Integration

Payment integration must follow the approved payment architecture and provider instructions.

Where hosted or tokenised payment flows are used, the frontend must follow the provider's documented process.

The frontend must not:

- Collect or store full card details unless explicitly approved by the payment architecture.
- Store card verification values.
- Treat a browser redirect as proof of payment.
- Mark an order paid based only on client-side state.
- expose private payment credentials.
- Bypass backend payment verification.

Payment confirmation must come from the trusted backend and verified provider transaction state.

## 13. Customer Data and Privacy

Collect only information required for the storefront's approved customer and commerce functions.

The frontend must:

- Use secure transport.
- Avoid unnecessary personal information in browser storage.
- Avoid logging sensitive customer data.
- Protect account and session information.
- Respect consent and preference mechanisms.
- Handle customer data according to documented retention and deletion requirements.
- Prevent cross-store customer data exposure.

Customer data must not be copied into unrelated analytics or external services without appropriate authorisation and privacy assessment.

## 14. Authentication and Sessions

Authentication behaviour must follow the platform's identity and access architecture.

The frontend must use the documented authentication flow.

Developers must not:

- Implement their own privilege escalation mechanism.
- Store passwords in application configuration.
- expose session tokens in URLs.
- treat a decoded token as proof of current permissions.
- assume that a previously authorised session remains valid indefinitely.

The backend remains responsible for checking current account status, membership and permissions.

## 15. Domain and CORS Configuration

Each storefront may use its own approved domain.

The integration package should identify the configured API origin and the domain configuration requirements.

Developers must:

- Register approved frontend origins through the authorised process.
- Use HTTPS in production.
- Avoid wildcard CORS settings in production.
- Avoid changing backend CORS policy through frontend code.
- Verify domain ownership where required.
- Coordinate domain changes with the platform administrator.

CORS is not a substitute for authentication or authorisation.

## 16. Frontend Design and Storefront Configuration

Storefronts may have distinct branding, visual design and customer-facing presentation.

Developers must use supported storefront configuration and approved platform capabilities.

The platform does not automatically permit arbitrary changes to shared backend behaviour or unrestricted layout configuration.

Changes to navigation, page composition, reusable components or supported storefront options must remain within the approved technical and product boundaries.

Store-specific frontend code must not modify another store's configuration.

## 17. Security Requirements

Frontend developers must follow secure development practices.

At minimum:

- Keep dependencies maintained.
- Review third-party packages.
- Avoid unsafe rendering of untrusted content.
- Validate and safely encode displayed data.
- Protect against cross-site scripting.
- Avoid exposing internal API errors.
- Use secure authentication flows.
- Do not embed private secrets.
- Avoid unnecessary browser storage.
- Keep production dependencies and source maps appropriately controlled.
- Report suspected vulnerabilities promptly.

The frontend must not bypass backend security controls.

## 18. Accessibility and Performance

The storefront should provide:

- Responsive layouts.
- Keyboard accessibility.
- Appropriate semantic HTML.
- Accessible form labels.
- Clear validation feedback.
- Adequate colour contrast.
- Optimised images.
- Reasonable loading performance.
- Graceful handling of slow connections.

Performance decisions must not compromise transaction integrity or security.

## 19. Testing Requirements

Before release, test:

- Store-specific configuration.
- API connectivity.
- Catalogue retrieval.
- Product and variant presentation.
- Pricing display.
- Inventory availability.
- Cart operations.
- Checkout.
- Payment flow.
- Customer data handling.
- Authentication and session expiry.
- Error and timeout handling.
- Mobile and desktop layouts.
- Accessibility.
- Cross-store isolation.

Testing must include attempts to access unauthorised store data and operations.

Use designated test environments and test data. Do not perform destructive tests against production stores without explicit approval.

## 20. Deployment and Release

Frontend deployment is independent from backend deployment but must remain compatible with the platform API.

Before release, confirm:

- Correct store integration package.
- Correct environment configuration.
- Approved domain and CORS configuration.
- Successful production build.
- Required tests passed.
- No private credentials in browser assets.
- API compatibility.
- Monitoring and error reporting.
- Rollback or redeployment procedure.
- Store Admin acceptance where required.

Production configuration must not be copied blindly from development or testing environments.

## 21. Monitoring and Support

Developers should provide sufficient diagnostic information to support troubleshooting without exposing sensitive data.

Report:

- Store identity.
- Frontend release version.
- Environment.
- Relevant request correlation reference, where available.
- Time of failure.
- Expected and observed behaviour.
- Steps to reproduce.

Do not include passwords, access tokens, private keys or unnecessary customer information in support reports.

Backend service incidents must be escalated through the platform's operational support process.

## 22. API and Configuration Changes

Developers must monitor platform communications for:

- API version changes.
- Contract changes.
- Configuration updates.
- Credential rotation.
- Domain changes.
- Security requirements.
- Deprecation notices.
- Integration package regeneration.

Changes must be implemented and tested within communicated compatibility requirements.

If a change breaks the storefront, coordinate with the platform team rather than introducing undocumented backend workarounds.

## 23. Prohibited Practices

The following practices are prohibited:

- Embedding privileged backend credentials in browser code.
- Sharing one store's private integration configuration with another store.
- Accessing another store's data without authority.
- Treating client-side checks as security controls.
- Hardcoding authoritative prices or inventory.
- Faking payment confirmation.
- Bypassing documented API contracts.
- Exposing customer or financial data through logs.
- Using production credentials in public repositories.
- Making unauthorised changes to shared platform services.
- Introducing undocumented direct database access from the frontend.

## 24. Developer Handover Checklist

Before development begins, confirm receipt of:

- Correct store integration package.
- API documentation.
- Environment configuration instructions.
- Storefront design and branding requirements.
- Approved domain information.
- Catalogue and media instructions.
- Authentication requirements.
- Testing environment access.
- Technical support contact.
- Applicable security and development standards.

Before handover to the Store Admin, provide:

- Source repository and ownership details.
- Deployment information.
- Environment configuration inventory.
- Build and release instructions.
- Known limitations.
- Test results.
- Support and maintenance arrangements.
- Outstanding issues.

## 25. Constraints and Open Decisions

The following matters depend on platform implementation and must not be assumed:

- Final frontend framework recommendations.
- SDK availability and supported languages.
- Exact API endpoints and schemas.
- Authentication flow and token format.
- Public identifier and publishable key formats.
- API rate limits.
- Domain provisioning automation.
- CORS management workflow.
- API documentation delivery format.
- Integration package distribution method.
- Frontend hosting standards.
- Monitoring and error-reporting provider.
- API deprecation and support periods.

The generated integration package and current platform documentation remain authoritative for implemented connection details.

## 26. Relationship to Other Documents

This guide must be read alongside:

- PRODUCT_VISION.md
- STORE_ONBOARDING_GUIDE.md
- STORE_ADMIN_GUIDE.md
- STORE_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- API_ARCHITECTURE.md
- APPLICATION_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- COMMERCE_ARCHITECTURE.md
- INVENTORY_ARCHITECTURE.md
- CUSTOMER_ARCHITECTURE.md
- INTEGRATION_ARCHITECTURE.md
- DEVELOPMENT_STANDARDS.md
- TESTING_STRATEGY.md
- DEPLOYMENT_ARCHITECTURE.md
- CHANGE_MANAGEMENT_POLICY.md

## 27. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to developers and relevant store administrators.
