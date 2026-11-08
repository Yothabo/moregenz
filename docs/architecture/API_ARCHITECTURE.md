# API Architecture

**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the API architecture for the multi-store retail platform.

It establishes how the frontend, backend modules, database and external services communicate, and how requests are authenticated, authorised, validated, processed and recorded.

The architecture must support the existing Yotaabo storefront and administrative functionality while providing a controlled transition towards the target NestJS backend.

## 2. Architectural Objectives

The API architecture must:

- Provide consistent interfaces between frontend and backend capabilities.
- Support multiple stores with enforced data isolation.
- Separate platform-level and store-level operations.
- Enforce authentication and authorisation on the server.
- Preserve clear ownership of business rules and data.
- Prevent clients from bypassing access controls through manipulated requests.
- Support reliable order, inventory and financial operations.
- Provide consistent validation and error responses.
- Support activity recording and auditability.
- Integrate external services through controlled boundaries.
- Allow incremental migration from Netlify Functions to NestJS.
- Avoid unnecessary distributed infrastructure during the initial platform development.

## 3. Architectural Direction

### 3.1 API model

The target backend will expose application APIs through a modular monolith built with NestJS.

The frontend will communicate with backend capabilities through defined API contracts rather than directly implementing privileged business operations against the database.

The backend will coordinate business rules, authorisation, validation, persistence and relevant integrations.

### 3.2 Current architecture

The existing Yotaabo application uses:

- React and Vite for the frontend.
- Netlify Functions for server-side API operations.
- Supabase PostgreSQL for persistent data.
- Supabase Authentication for supported identity operations.
- Supabase Storage for managed media.
- Netlify hosting and routing.

Existing production functions must be treated as part of the current system until their responsibilities have been reviewed and migrated.

### 3.3 Target architecture

The target architecture consists of:

- React and Vite frontend.
- NestJS modular monolith.
- PostgreSQL relational database.
- Defined application modules and service boundaries.
- Controlled integrations with authentication, storage, payment and notification providers.
- Centralised API validation, authorisation and error handling.

Supabase services may continue to be used where appropriate. The decision to retain, replace or selectively migrate individual services must be made separately.

### 3.4 Modular monolith

The initial backend must use clear internal module boundaries without requiring each business capability to become an independently deployed service.

Modules may communicate through defined application interfaces and service contracts.

Direct access to another module's internal implementation or persistence details should be avoided.

## 4. API Boundaries

### 4.1 Frontend boundary

The frontend is responsible for:

- Rendering public and administrative interfaces.
- Collecting user input.
- Performing basic client-side validation for usability.
- Sending requests to the backend.
- Presenting responses and errors.
- Maintaining appropriate client-side application state.

The frontend is not an authority for:

- User identity.
- Store ownership.
- Role or permission assignment.
- Product ownership.
- Inventory availability.
- Transaction prices.
- Financial calculations.
- Order ownership.
- Approval of privileged operations.

These decisions must be validated by the backend.

### 4.2 Backend boundary

The backend is responsible for:

- Authentication verification.
- Authorisation enforcement.
- Store-context resolution.
- Business-rule execution.
- Request validation.
- Data integrity.
- Transaction management.
- Controlled access to persistent storage.
- Integration orchestration.
- Activity and audit recording.
- Consistent response generation.

### 4.3 Database boundary

The database provides persistent storage and enforces applicable integrity constraints.

Database access must occur through approved backend or service boundaries.

Database constraints complement application validation and authorisation. They do not replace them.

### 4.4 External service boundary

External providers must be accessed through controlled integration boundaries.

Provider credentials must remain server-side.

External service failures must be handled without exposing secrets, internal configuration or sensitive provider responses to clients.

## 5. API Organisation

### 5.1 Resource-oriented design

APIs should use resource-oriented routes and HTTP methods where appropriate.

Routes should represent business resources and operations clearly.

Examples of resource groups include:

- Authentication and identity.
- Platform administration.
- Stores.
- Store configuration.
- Memberships and permissions.
- Products.
- Product listings.
- Catalogue.
- Inventory.
- Customers.
- Cart and checkout.
- Orders.
- Payments.
- Financial records.
- Activity and audit.
- Performance and reporting.
- Notifications.
- Integrations.

The final route structure must reflect the approved module boundaries.

### 5.2 API versioning

The target API should use an explicit versioned route convention, with `/api/v1/` as the proposed initial prefix.

Versioning rules must be applied consistently to public and administrative endpoints.

A breaking contract change must not be introduced without an appropriate migration and compatibility plan.

The final versioning policy remains subject to architecture approval.

### 5.3 HTTP methods

The API should use HTTP methods according to their intended semantics:

- `GET` for retrieving resources.
- `POST` for creating resources or executing defined operations.
- `PUT` for replacing a resource where appropriate.
- `PATCH` for partial updates.
- `DELETE` for authorised deletion where deletion is permitted.

Operations with material business consequences must have explicit backend handling and validation.

A client must not be able to turn a read operation into a write operation by manipulating request parameters.

### 5.4 Route naming

Routes should use consistent naming and resource identifiers.

Route names must not expose internal database implementation details unnecessarily.

Identifiers supplied in routes must be validated and authorised before the corresponding resource is accessed.

### 5.5 API contract

Each endpoint must define:

- Purpose.
- HTTP method and route.
- Authentication requirements.
- Required permissions.
- Store-context requirements.
- Request parameters and body schema.
- Validation rules.
- Response structure.
- Possible error responses.
- Side effects.
- Activity or audit requirements.

API contracts must remain consistent across modules.

## 6. Authentication

### 6.1 Authentication responsibility

Protected API operations must require a verifiable authenticated identity.

The backend must validate the authentication credential using the approved authentication mechanism.

The presence of a user identifier in a request body or query parameter is not proof of identity.

### 6.2 Existing authentication

The current application uses Supabase Authentication for supported authentication workflows.

Existing authentication identities and administrative access must be protected during migration.

The target NestJS backend must integrate with the approved identity provider or authentication mechanism.

The final token-validation and identity-provider strategy remains an open architecture decision.

### 6.3 Token verification

Where bearer tokens are used, the backend must validate:

- Token authenticity.
- Signature or provider verification.
- Issuer.
- Intended audience where applicable.
- Expiry.
- Relevant authentication claims.
- Revocation or session state where supported and required.

A decoded token must not be treated as valid without cryptographic or trusted-provider verification.

### 6.4 Public endpoints

Public endpoints may allow unauthenticated access where the business capability requires it.

Public access must be explicitly defined per endpoint.

Public access does not remove the need for input validation, rate limiting where appropriate, data minimisation and abuse protection.

### 6.5 Authentication failures

Missing, invalid, expired or otherwise unacceptable credentials must not grant access to protected operations.

Authentication failures must return consistent responses without disclosing sensitive verification details.

## 7. Authorisation

### 7.1 Server-side enforcement

Every protected endpoint must enforce authorisation on the backend.

Frontend route guards and hidden interface elements are usability controls, not security boundaries.

### 7.2 Role and permission model

Authorisation must follow the approved identity and access model.

The API must distinguish:

- Platform Super Admin permissions.
- Store Admin permissions.
- Store employee permissions.
- Public access.
- Any additional explicitly approved system roles.

Permissions must be evaluated for the requested action and relevant resource.

Role and permission information carried in authentication tokens may be used as supporting claims, but must not be treated as permanently authoritative.

The backend must verify current account status, active store membership and effective permissions through authoritative server-side state or an explicitly approved mechanism with defined freshness and revocation behaviour.

Changes to roles, memberships or account status must take effect within the approved revocation and freshness requirements.

### 7.3 Resource-level authorisation

A valid role does not automatically grant access to every resource.

The backend must establish whether the authenticated actor may perform the requested operation on the specific resource.

This includes checks for:

- Resource ownership.
- Store membership.
- Store scope.
- Delegated permissions.
- Resource status.
- Operation-specific restrictions.

### 7.4 Privileged operations

Privileged operations must have explicit permission requirements.

Sensitive actions must be recorded with the responsible actor and relevant context.

The API must not allow ordinary store administration to grant platform privileges or bypass platform-level restrictions.

### 7.5 Authorisation consistency

Authorisation rules must apply consistently across:

- Direct API requests.
- Administrative interfaces.
- Background jobs.
- Integration callbacks.
- Internal module operations.
- Bulk operations.

Internal execution must not become an unrecorded bypass of business permissions.

## 8. Store Context and Multi-Store Isolation

### 8.1 Trusted store context

The backend must establish the relevant store context using trusted information.

For authenticated operations, this normally involves the authenticated actor's authorised store membership and the requested resource's ownership.

For public storefront operations, the store may be resolved from an approved domain or public storefront identifier.

### 8.2 Client-supplied store identifiers

A client-supplied store identifier is a request parameter, not proof of authority.

The backend must validate that the actor or public operation is permitted to use the requested store context.

Changing a store identifier in a URL, query parameter, request body or header must not grant access to another store.

### 8.3 Store-scoped reads

Read operations must return only records the caller is authorised to access.

Store Admins and employees must not retrieve another store's protected records by changing resource identifiers or request filters.

### 8.4 Store-scoped writes

Write operations must establish the correct store ownership before creating or modifying records.

The backend must not blindly accept store ownership fields supplied by an untrusted client.

Where ownership is derived from the authenticated context, the backend must assign or validate it server-side.

### 8.5 Cross-store operations

Cross-store operations must be explicitly defined and authorised.

Examples include:

- Platform oversight.
- Shared product availability.
- Stock transfers.
- Approved shared services.
- Platform-level reporting.

A cross-store operation must not become an unrestricted data-access mechanism.

### 8.6 Background processing

Background jobs must carry or resolve the appropriate platform or store context.

Jobs must not accidentally process records belonging to unrelated stores.

Where a job operates across multiple stores, its authority and scope must be explicit.

## 9. Request Validation

### 9.1 Backend validation

Every request must be validated by the backend before business processing.

Client-side validation may improve usability but cannot replace backend validation.

### 9.2 Schema validation

Request bodies, route parameters, query parameters and relevant headers must be checked against defined schemas.

Validation must cover:

- Required fields.
- Data types.
- Field lengths.
- Numeric ranges.
- Enumerated values.
- Identifier formats.
- Relationships between fields.
- Resource ownership.
- Business-specific constraints.

### 9.3 Unknown fields

The API should reject or safely ignore unexpected fields according to a documented validation policy.

Unexpected fields must never be allowed to overwrite protected properties through mass assignment.

### 9.4 Sensitive properties

Clients must not directly assign protected system properties unless the endpoint explicitly authorises the operation.

Examples include:

- Store ownership.
- Product ownership.
- User roles.
- Permission assignments.
- Financial status.
- Payment verification status.
- Order ownership.
- Audit metadata.
- Administrative approval state.

### 9.5 Normalisation

Input normalisation must be applied consistently where required.

Normalisation must not silently change the meaning of a business transaction or overwrite authoritative historical information.

## 10. Business Logic and Transaction Processing

### 10.1 Business-rule ownership

Business rules must be implemented in the appropriate backend module.

The frontend must not be the authoritative location for prices, permissions, financial calculations, inventory decisions or transaction state.

### 10.2 Transaction integrity

Operations involving related records must preserve data consistency.

Where multiple database changes represent one logical business operation, they should be processed within an appropriate database transaction.

A partial failure must not leave the system in an invalid business state.

### 10.3 Order processing

Order creation must validate:

- Store context.
- Product and listing availability.
- Applicable prices.
- Quantities.
- Customer and checkout information.
- Applicable commercial rules.
- Required payment state.

The backend must calculate or verify authoritative transaction values.

Historical order information must preserve the relevant transaction-time values.

### 10.4 Inventory operations

Inventory changes must be performed through authorised backend operations.

The API must prevent unauthorised stock changes and preserve stock movement history where required.

Concurrent requests must not silently produce invalid stock quantities or inconsistent reservations.

### 10.5 Financial operations

Financial records and calculations must follow approved business rules.

The API must distinguish store financial activity from platform financial activity.

Unresolved commission, capital assistance, stock-supply and repayment rules must not be invented or permanently hard-coded.

Material financial actions must be attributable and appropriately authorised.

### 10.6 Idempotency

Operations that may be retried and could otherwise create duplicate business effects should support idempotency.

This is particularly important for:

- Checkout.
- Order creation.
- Payment initiation.
- Payment callbacks.
- Refund processing.
- Stock movements.
- Other operations with financial or inventory consequences.

The implementation must define the relevant idempotency key, scope, retention and duplicate-request behaviour.

## 11. Response Architecture

### 11.1 Consistent response structure

Responses must follow a consistent contract.

Successful responses should return the requested resource or operation result in a predictable structure.

The exact response envelope and pagination representation must be documented as part of the API contract.

### 11.2 HTTP status codes

The API should use appropriate HTTP status codes.

Common examples include:

- `200 OK` for successful requests.
- `201 Created` for successful resource creation.
- `202 Accepted` for operations accepted for asynchronous processing.
- `204 No Content` for successful operations without a response body.
- `400 Bad Request` for malformed or invalid requests.
- `401 Unauthorized` for missing or invalid authentication.
- `403 Forbidden` for authenticated users without the required permission.
- `404 Not Found` when a resource does not exist or should not be disclosed.
- `409 Conflict` for conflicting resource or transaction state.
- `422 Unprocessable Content` for requests that fail applicable semantic validation.
- `429 Too Many Requests` when rate limits are exceeded.
- `500 Internal Server Error` for unexpected server failures.
- `503 Service Unavailable` when the service cannot currently handle the request.

The implementation must apply these consistently.

### 11.3 Error response structure

Error responses should provide:

- A stable machine-readable error code.
- A safe, understandable message.
- Field-level validation details where appropriate.
- A request or correlation identifier where available.

Internal stack traces, database details, credentials, secrets and provider internals must not be returned to clients.

### 11.4 Error consistency

Equivalent failures across modules should use consistent response conventions.

Frontend error handling must not depend on internal exception names or database error messages.

### 11.5 Not-found and forbidden behaviour

The API must avoid exposing sensitive resource existence information.

Where appropriate, inaccessible resources may return a not-found response instead of revealing that a protected record exists.

The choice must be consistent with the relevant security policy.

## 12. Pagination, Filtering and Sorting

### 12.1 Pagination

List endpoints must use pagination where returning the complete result set could create excessive response sizes or processing costs.

The API must define page size limits and predictable pagination behaviour.

### 12.2 Filtering

Filtering must be restricted to supported fields and values.

The backend must apply store and permission boundaries independently of client-supplied filters.

### 12.3 Sorting

Sorting must use approved fields and deterministic ordering where pagination requires it.

Clients must not be able to inject arbitrary database expressions or query fragments.

### 12.4 Search

Search endpoints must enforce the same authorisation and store-scoping rules as ordinary list endpoints.

Search results must not reveal records outside the caller's permitted scope.

## 13. File and Media APIs

### 13.1 Media access

File upload and retrieval operations must follow explicit ownership and access rules.

Media access must respect whether an object is:

- Public platform media.
- Store-specific public media.
- Private store media.
- Restricted administrative or operational media.

### 13.2 Upload validation

Uploads must be validated for:

- Permitted file types.
- File size.
- Content type.
- Ownership and store scope.
- Applicable security restrictions.

File extensions alone must not be trusted to establish file content.

### 13.3 Storage authorisation

The backend must validate upload and deletion permissions.

Clients must not be able to delete or replace another store's media by manipulating storage paths or object identifiers.

### 13.4 Signed access

Where private objects require temporary access, signed URLs or equivalent controlled mechanisms may be used.

Their expiry, scope and permissions must be appropriate to the resource.

### 13.5 Existing media

Existing Yotaabo media and storage references must remain functional during migration.

Storage provider decisions must be made separately from the API contract.

## 14. External Integrations

### 14.1 Integration boundary

External providers must be accessed through controlled backend integration modules or adapters.

Business modules should not become tightly coupled to provider-specific implementation details.

### 14.2 Provider credentials

API keys, signing secrets, service credentials and other private integration configuration must remain server-side.

Secrets must not be included in frontend bundles or exposed through public API responses.

### 14.3 Webhooks and callbacks

Incoming provider callbacks must be verified using the provider's supported verification mechanism.

The backend must validate the event, prevent unauthorised processing and handle duplicate delivery.

Webhook endpoints must not trust event payloads solely because they originate from a public URL.

Store and transaction context must be resolved using verified provider account and event details, together with trusted internal configuration or transaction mappings.

A store identifier or ownership claim supplied only in the callback payload must not establish authority or determine which store's records may be modified.

### 14.4 External service failures

The API must handle provider timeouts, unavailable services, invalid responses and delivery failures.

A failed external call must not silently mark an underlying business operation as successful.

### 14.5 Integration independence

Where practical, provider-specific logic should be isolated behind stable internal interfaces.

Replacing an external provider should not require rewriting unrelated store, order or inventory business logic.

## 15. Rate Limiting and Abuse Protection

Public and sensitive endpoints must be protected against excessive or abusive requests.

Rate limiting should account for the type of operation and relevant risk.

Controls may include:

- Per-IP limits.
- Per-account limits.
- Per-session limits.
- Endpoint-specific limits.
- Authentication attempt restrictions.
- Upload limits.
- Checkout and transaction limits.

Rate limiting must not be treated as a substitute for authentication, authorisation or input validation.

The exact thresholds and enforcement strategy require implementation-specific configuration.

## 16. API Security Requirements

The API must:

- Use HTTPS in production.
- Verify authentication credentials.
- Enforce server-side permissions.
- Validate every protected resource against its ownership and scope.
- Validate all untrusted input.
- Prevent mass-assignment vulnerabilities.
- Protect against injection and unsafe query construction.
- Keep secrets and private credentials server-side.
- Restrict cross-origin access to approved origins.
- Protect sensitive operations against abuse and replay where appropriate.
- Apply secure session and token handling.
- Avoid leaking internal implementation details.
- Record relevant privileged and sensitive actions.
- Apply secure upload and media-access controls.
- Protect webhook and integration endpoints.
- Avoid logging passwords, access tokens, payment credentials or unnecessary personal data.

Security controls must be implemented consistently across all API modules.

## 17. Activity, Audit and Observability

### 17.1 Activity recording

Material operations must generate appropriate activity records.

Relevant records should identify:

- Actor.
- Action.
- Affected resource.
- Store context where applicable.
- Timestamp.
- Outcome.
- Relevant request or correlation identifier.

### 17.2 Audit requirements

Sensitive administrative, financial, inventory and access-control operations must be auditable.

Audit records must not be silently overwritten through ordinary application operations.

### 17.3 Correlation identifiers

Requests should have a correlation identifier that can be used to trace related logs and processing activity.

The identifier must not be treated as an authentication credential.

### 17.4 Logging

Logs should capture sufficient operational information to diagnose failures and investigate incidents.

Logs must not expose secrets or unnecessarily reproduce sensitive customer information.

### 17.5 Monitoring

The platform should monitor:

- API availability.
- Request failures.
- Latency.
- Authentication failures.
- Authorisation failures.
- Integration failures.
- Background processing failures.
- Relevant transaction errors.

Monitoring must support investigation without creating unnecessary access to sensitive data.

## 18. API Documentation and Contract Management

### 18.1 Endpoint documentation

API endpoints must be documented with their request, response, security and validation requirements.

Documentation must reflect implemented behaviour rather than intended behaviour alone.

### 18.2 Contract consistency

The API contract should be maintained alongside implementation.

Changes to an endpoint must consider its frontend consumers, integrations and dependent modules.

### 18.3 OpenAPI

OpenAPI may be used to describe the NestJS API contract and support validation, testing and frontend integration.

The exact tooling and publication strategy remain implementation decisions.

### 18.4 Contract testing

Critical API contracts should have automated tests.

Tests should verify:

- Authentication requirements.
- Permission enforcement.
- Store isolation.
- Request validation.
- Response structure.
- Error handling.
- Transaction behaviour.
- Integration callback verification.

## 19. Testing Requirements

The API test strategy must cover unit, integration and end-to-end behaviour as appropriate.

### 19.1 Authorisation tests

Tests must verify that:

- Unauthenticated users cannot access protected endpoints.
- Store employees cannot exceed their assigned permissions.
- Store Admins cannot access another store's protected records.
- Store Admins cannot grant unauthorised platform privileges.
- Platform-level operations require the appropriate platform permission.
- Manipulated store identifiers do not bypass access controls.

### 19.2 Data integrity tests

Tests must verify that:

- Store-scoped relationships remain valid.
- Cross-store references are rejected where unauthorised.
- Product ownership is preserved.
- Orders retain transaction-time values.
- Inventory operations preserve consistency.
- Financial records remain correctly separated.

### 19.3 Transaction tests

Tests must cover duplicate requests, concurrent operations, failed transactions and recovery from partial external-service failures.

### 19.4 Regression tests

Existing Yotaabo API behaviour must have appropriate regression coverage before migration or replacement.

## 20. Deployment and Runtime Architecture

### 20.1 Current runtime

The current production API runs through Netlify Functions.

Its existing routes, redirects, environment configuration and dependencies must be considered during migration.

### 20.2 Target runtime

The target NestJS backend will run as a separately managed backend application or service.

The final hosting provider, deployment topology and infrastructure configuration remain open decisions.

### 20.3 Environment separation

Development, testing and production environments must have appropriately separated configuration and credentials.

Production secrets must not be copied into frontend build-time variables.

### 20.4 Health checks

The backend should expose controlled health information for operational monitoring.

Health endpoints must not disclose sensitive infrastructure details or application secrets.

### 20.5 Configuration

Environment-specific configuration must be externalised and validated at application startup.

Missing or invalid critical configuration should prevent unsafe operation rather than silently fall back to insecure defaults.

## 21. Migration from Netlify Functions to NestJS

### 21.1 Incremental migration

Migration must proceed by capability rather than replacing the entire API in one operation.

Existing Netlify Functions may continue serving production traffic while equivalent NestJS capabilities are introduced and verified.

Existing Netlify Function routes and their current request and response contracts remain the production baseline until individually migrated.

The proposed `/api/v1/` prefix applies to the target NestJS API. It must not be applied retrospectively to existing Netlify Function routes without a reviewed compatibility plan.

During coexistence, routing must clearly identify which backend owns each endpoint and must not create ambiguous or competing write paths.

Existing frontend consumers must continue to work until they are migrated or deliberately updated and tested.

### 21.2 Function assessment

Before migration, each existing function must be assessed for:

- Purpose.
- Request and response contract.
- Authentication behaviour.
- Authorisation rules.
- Store context.
- Database operations.
- External integrations.
- Side effects.
- Error handling.
- Existing frontend consumers.

### 21.3 Contract preservation

Where existing frontend functionality depends on an established API contract, the migration should preserve compatibility or introduce a controlled frontend transition.

A replacement endpoint must not silently change response semantics or security behaviour.

### 21.4 Data and transaction safety

Migration must not create competing write paths that can produce inconsistent records.

Where old and new backends temporarily coexist, ownership of each operation and its write path must be explicit.

### 21.5 Verification

Each migrated capability must be tested for:

- Functional equivalence where required.
- Authentication.
- Authorisation.
- Store isolation.
- Data integrity.
- Error behaviour.
- Performance and operational reliability.

### 21.6 Retirement

A Netlify Function may be retired only after its consumers have been migrated, its replacement verified and its production dependencies reviewed.

### 21.7 Rollback

Each migration stage must have an appropriate rollback or recovery strategy.

Rollback must account for database changes and transactions that may already have occurred.

## 22. Non-Functional Requirements

The API architecture must support:

- Security and confidentiality.
- Data integrity.
- Reliable transaction processing.
- Maintainability.
- Testability.
- Observability.
- Appropriate performance.
- Controlled scalability.
- Availability and recoverability.
- Consistent behaviour across stores.
- Safe incremental migration.

Specific service-level targets, performance thresholds and recovery objectives must be defined separately.

## 23. Open API Architecture Decisions

The following decisions require further specification:

- Final API versioning policy.
- Final route naming and response envelope.
- Authentication provider and token-validation strategy.
- Whether Supabase Auth remains the identity provider.
- NestJS database access technology and transaction strategy.
- API hosting and deployment topology.
- CORS policy and approved production origins.
- Rate-limiting implementation and thresholds.
- API documentation and OpenAPI publication tooling.
- Background job and event-processing strategy.
- File upload and signed URL strategy.
- API gateway or reverse-proxy requirements.
- Idempotency storage and retention strategy.
- Webhook retry and failure handling.
- API deprecation and compatibility policy.
- Logging, monitoring and retention configuration.

These decisions must be approved before they become permanent implementation assumptions.

## 24. Relationship to Other Documents

This document must be read alongside:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/PLATFORM_BUSINESS_MODEL.md`
- `docs/product/STORE_OPERATING_MODEL.md`
- `docs/product/SCOPE_AND_EXCLUSIONS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATA_ARCHITECTURE.md`
- `docs/architecture/STORE_ARCHITECTURE.md`
- `docs/identity-access/IDENTITY_AND_ACCESS.md`

The System Architecture defines the overall application structure.

The Data Architecture defines data ownership, relationships and integrity.

The Store Architecture defines store boundaries and operating capabilities.

The Identity and Access Management document defines authentication, roles and permissions.

This document defines how those responsibilities are exposed and enforced through application APIs.

## 25. Architecture Governance

API changes that affect security, store isolation, data ownership, financial operations or business-critical transaction behaviour must receive appropriate review.

API implementation must not introduce undocumented permission bypasses or weaken approved business boundaries.

Unresolved requirements must remain configurable or deferred until approved.

This document must be reviewed when material changes are made to backend architecture, API contracts or integration responsibilities.
