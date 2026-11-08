# Application Architecture

**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the application-level architecture for the multi-store retail platform.

It establishes the responsibilities, boundaries, internal organisation and interaction patterns of the frontend and backend applications.

It also defines how the existing Yotaabo application will evolve into the target platform without unnecessarily disrupting production storefront operations, administration, customer transactions or existing data.

This document complements the System Architecture, Data Architecture, Store Architecture, API Architecture, Security Architecture, Deployment Architecture, Operations Architecture and Integration Architecture.

It does not replace detailed implementation specifications, database schemas, API contracts or security policies.

## 2. Architectural Objectives

The application architecture must:

- Support multiple independently operated stores within one centrally managed platform.
- Preserve clear boundaries between platform-level and store-level functionality.
- Support the Platform Super Admin, Store Admin and delegated employee roles.
- Keep public storefront and administrative responsibilities distinct.
- Maintain consistent business rules across frontend and backend applications.
- Enforce authorisation and store isolation on the backend.
- Support incremental migration from the existing Yotaabo implementation.
- Avoid unnecessary architectural complexity during the initial platform release.
- Allow application modules to evolve without uncontrolled dependencies.
- Support maintainable testing, deployment, monitoring and future extension.
- Protect existing production data, authentication, storage and customer workflows.

## 3. Architectural Principles

### 3.1 Clear application boundaries

The frontend is responsible for presentation and user interaction.

The backend is responsible for business rules, authorisation, transaction processing, data access and enforcement of platform policies.

The frontend must not be treated as a trusted enforcement boundary.

### 3.2 Modular monolith

The initial target backend will use a modular monolith.

Business capabilities will be organised into defined modules within one backend application and deployment unit.

Modules must have explicit responsibilities and controlled dependencies.

Microservices are not required for the initial platform architecture.

### 3.3 Shared platform, isolated store operations

The platform provides shared application capabilities while preserving store-level operational boundaries.

A request involving a store must execute within a validated store context.

Store-specific data access and business operations must not depend solely on a store identifier supplied by the frontend.

### 3.4 Reusable application capabilities

Common functionality should be implemented once where appropriate.

Examples include authentication handling, permission evaluation, validation, error handling, audit recording and API communication.

Reuse must not introduce inappropriate coupling between independent business domains.

### 3.5 Incremental migration

The target architecture must accommodate the current production implementation.

Existing functionality must remain operational until its replacement has been implemented, tested and verified.

A migration must not assume that all existing functionality can be replaced in one release.

### 3.6 Explicit ownership

Each application module must have a clear responsibility for the business capabilities and records it manages.

Shared functionality must not blur the distinction between platform ownership and store ownership.

### 3.7 Configuration over uncontrolled customisation

Store-specific differences must use supported configuration and defined extension points.

Stores must not introduce unrestricted application code, page layouts or business logic that bypass platform controls.

## 4. Application Architecture Overview

The target application consists of the following logical layers:

1. Public storefront frontend.
2. Administrative frontend.
3. Backend API application.
4. Backend business modules.
5. Persistence and data access.
6. External service integrations.
7. Background processing.

These are logical boundaries. They do not necessarily represent separate deployable applications or infrastructure services.

### 4.1 Target application structure

The target application is logically organised as follows:

    Platform
    |
    |-- Public Storefront
    |   |-- Store selection and store context
    |   |-- Product discovery
    |   |-- Product details
    |   |-- Cart and checkout
    |   |-- Customer order workflows
    |
    |-- Administrative Application
    |   |-- Platform administration
    |   |-- Store administration
    |   |-- Employee management
    |   |-- Product and catalogue management
    |   |-- Inventory management
    |   |-- Order management
    |   |-- Financial and operational views
    |
    |-- Backend API
    |   |-- Identity and Access
    |   |-- Platform Administration
    |   |-- Stores
    |   |-- Products
    |   |-- Catalogue
    |   |-- Inventory
    |   |-- Commerce
    |   |-- Customers
    |   |-- Finance
    |   |-- Activity and Audit
    |   |-- Performance
    |   |-- Marketing
    |   |-- Notifications
    |   |-- Integrations
    |
    |-- Persistence
    |   |-- PostgreSQL
    |   |-- File and media storage
    |
    |-- External Providers
        |-- Payment
        |-- Email and messaging
        |-- Shipping and fulfilment

This is a logical representation, not a final repository or deployment specification.

### 4.2 Current and target implementation

| Area | Current implementation | Target direction |
|---|---|---|
| Frontend | React, TypeScript and Vite | Retain React, TypeScript and Vite |
| Routing | React Router | Retain or refine |
| UI | MUI and Tailwind | Retain with controlled component boundaries |
| Backend | Netlify Functions | Incrementally migrate to NestJS |
| Database | Supabase PostgreSQL | PostgreSQL with an approved data access strategy |
| Authentication | Supabase Auth | Retain or evolve through an approved identity strategy |
| Storage | Supabase Storage | Retain or replace through an explicit decision |
| Hosting | Netlify | Hosting strategy remains subject to deployment decisions |

The target direction does not authorise immediate replacement of existing production services.

## 5. Frontend Architecture

### 5.1 Frontend responsibilities

The frontend is responsible for:

- Rendering public and administrative interfaces.
- Collecting and validating user input for usability.
- Displaying products, availability, prices and promotions.
- Managing presentation state and temporary interaction state.
- Communicating with approved backend APIs.
- Displaying transaction and operational outcomes.
- Respecting permissions and capabilities returned by the backend.
- Providing accessible and consistent user experiences.

The frontend must not independently determine whether a user is authorised to perform a protected operation.

### 5.2 Public storefront

The public storefront presents the customer-facing experience of a participating store.

It must support:

- Store-specific branding and approved configuration.
- Product discovery and catalogue browsing.
- Product details and availability.
- Store-specific pricing and promotions.
- Shopping cart operations.
- Checkout and payment initiation.
- Customer order information and relevant order updates.

Storefront identity must be resolved using a trusted store reference or approved domain configuration.

The storefront must not expose administrative functionality or internal platform data.

### 5.3 Store administration

The store administration interface supports authorised store operations.

Its capabilities may include:

- Store profile and approved storefront configuration.
- Product listings and commercial terms.
- Inventory and stock movements.
- Orders and fulfilment.
- Customer-related operational information.
- Employee membership and delegated permissions.
- Store financial information.
- Activity records and performance visibility.

Available functionality must be restricted to the authenticated user's effective permissions and validated store membership.

### 5.4 Platform administration

Platform administration provides platform-level capabilities.

It may include:

- Store onboarding and lifecycle management.
- Platform-level identity and access administration.
- Platform oversight and governance.
- Cross-store operational visibility where authorised.
- Platform financial records.
- Shared catalogue and product governance.
- Platform-wide operational reporting.

Platform administration must not imply unrestricted access to every store operation or sensitive record.

Access must follow the approved identity, access and governance rules.

### 5.5 Frontend separation

Public storefront and administrative functionality must have clear application boundaries.

They may initially share a frontend repository or build system where practical.

Shared code should be limited to reusable components, approved utilities, API clients and common types.

Administrative components must not become accessible merely because they are included in a public frontend bundle.

Backend authorisation remains mandatory regardless of frontend separation.

### 5.6 Storefront configuration boundaries

Storefront presentation must use supported platform configuration.

Store-specific branding and approved content may vary between stores.

The architecture must not permit unrestricted merchant-defined page layouts, component placement, navigation structures or application code overrides.

Any future storefront customisation must use explicitly supported configuration and controlled extension points.

### 5.7 Shared frontend components

Common interface components may be shared where they represent genuinely common functionality.

Examples include:

- Form controls.
- Tables and pagination.
- Modal and confirmation interfaces.
- Notifications and feedback.
- Loading and empty states.
- Error presentation.
- Permission-aware navigation.
- Reusable display components.

Shared components should not contain unrelated store or platform business rules.

## 6. Frontend Routing and State Management

### 6.1 Routing responsibilities

Routes must be organised around application responsibilities.

The routing architecture must support:

- Public storefront routes.
- Customer-facing commerce routes.
- Administrative routes.
- Platform administration routes.
- Store administration routes.
- Authentication and account recovery routes.
- Not-found and access-denied states.

Protected routes may provide navigation and user experience controls.

Backend authorisation remains authoritative regardless of route protection.

Store context must be resolved and validated before store-specific administrative operations are performed.

### 6.2 State categories

Frontend state must distinguish between different types of information.

| State category | Responsibility |
|---|---|
| Server state | Backend-owned records and business data |
| Authentication state | Current authenticated identity and session information |
| Store context | Selected and validated application store context |
| UI state | Dialogs, navigation, filters and interface preferences |
| Form state | User input before submission |
| Cart state | Current shopping selections, subject to backend validation |

Server-owned data must not become authoritative merely because it is stored in frontend state.

Sensitive information, effective permissions and financial transaction outcomes must not be trusted solely from cached or locally modified values.

### 6.3 State management strategy

The implementation must select and document appropriate state management and server-state caching libraries.

The selection must consider:

- Server-state fetching and caching.
- Cache invalidation after mutations.
- Authentication and session changes.
- Store-context changes.
- Form state and validation.
- Cart persistence and recovery.
- Avoidance of duplicated sources of truth.

The architecture should avoid introducing multiple competing state systems without a clear responsibility for each.

### 6.4 Store context changes

Changing the active store context must trigger appropriate updates to store-scoped frontend state.

Data cached for one store must not be displayed as if it belongs to another store.

Store changes must clear, invalidate or reload affected server state, cart information and administrative views as required by the relevant business rules.

The backend must independently validate every request regardless of frontend state handling.

## 7. Frontend API Communication and Validation

### 7.1 API communication layer

Frontend business operations must communicate with the backend through defined API contracts.

A shared API communication layer should handle:

- Base URL and environment configuration.
- Authentication credentials or tokens.
- Request construction.
- Response parsing.
- Standardised error handling.
- Request cancellation where appropriate.
- Correlation identifiers where supported.
- Consistent handling of expired or invalid sessions.

Components should not independently implement inconsistent authentication, retry or error-handling behaviour.

The frontend must not contain privileged service credentials or database administrative secrets.

### 7.2 Frontend validation

Frontend validation exists primarily to improve usability.

It may validate required fields, data formats, ranges and other known constraints before submitting requests.

The backend must independently validate all untrusted input and enforce business constraints.

A frontend validation result must never be treated as proof that a transaction is valid or authorised.

### 7.3 API contracts and data models

Frontend request and response types must correspond to documented API contracts.

The frontend must not assume that internal backend entities and public API response models are interchangeable.

Changes to shared API contracts must be coordinated with all affected frontend consumers.

Backward compatibility must be preserved during incremental migration where existing consumers still depend on an older interface.

## 8. Target Backend Application Architecture

The target backend will use NestJS with TypeScript and a modular monolith architecture.

The backend exposes the platform API and owns enforcement of business rules.

Its responsibilities include:

- Authentication and session verification.
- Authorisation and permission evaluation.
- Store-context validation.
- Business rule enforcement.
- Input validation.
- Transaction processing.
- Database access.
- Financial and inventory integrity.
- Audit and activity recording.
- External integration coordination.
- Background processing.
- Operational error reporting.

### 8.1 Backend logical layers

The backend should use clearly separated responsibilities.

| Layer | Responsibility |
|---|---|
| API and presentation | HTTP routes, controllers, request and response handling |
| Application | Use cases, orchestration and transaction workflows |
| Domain | Business rules, entities and domain policies |
| Infrastructure | Database access, external providers and technical adapters |

The final implementation may use NestJS modules, providers and services to express these boundaries.

### 8.2 Controllers

Controllers expose API operations and translate HTTP requests into application operations.

They should:

- Accept validated request data.
- Obtain authenticated request context.
- Delegate business operations to application services.
- Return defined response structures.
- Avoid direct implementation of complex business rules.

Controllers must not become general-purpose database access layers.

### 8.3 Application services

Application services coordinate use cases.

Examples include:

- Creating a store.
- Activating a store.
- Creating a product.
- Publishing a store listing.
- Recording an inventory movement.
- Creating an order.
- Processing a payment result.
- Issuing an approved refund.
- Recording a financial adjustment.

They coordinate domain rules, persistence and external dependencies where necessary.

### 8.4 Domain layer

The domain layer represents business concepts and rules.

It must express important invariants such as:

- A store cannot access another store's restricted records without authorised platform-level access.
- Product ownership is distinct from store availability.
- Inventory is maintained independently for each store.
- Orders belong to a defined store context.
- Financial records preserve platform and store separation.
- Material financial adjustments require appropriate authority.
- Historical transaction records must remain traceable.

Domain rules must not be implemented only in frontend components.

### 8.5 Infrastructure layer

Infrastructure provides technical implementations of application requirements.

It may include:

- Database repositories.
- Authentication adapters.
- Payment provider adapters.
- Email and messaging adapters.
- File storage adapters.
- Logging and monitoring integrations.
- Background job infrastructure.

Business modules should depend on defined interfaces rather than becoming tightly coupled to individual external providers.

## 9. Backend Module Architecture

The target backend will be divided into business modules.

Each module must have a defined responsibility and controlled access to other modules.

| Module | Primary responsibility |
|---|---|
| Identity and Access | Accounts, authentication, roles, permissions and memberships |
| Platform Administration | Platform-level configuration and administration |
| Stores | Store identity, configuration, lifecycle and administration |
| Products | Product identity, ownership and source information |
| Catalogue | Store product listings, visibility and commercial presentation |
| Inventory | Store-level stock, movements and adjustments |
| Commerce | Cart validation, checkout, orders and fulfilment workflows |
| Customers | Store-scoped customer records and customer relationships |
| Finance | Financial records, obligations, settlements and reconciliation |
| Activity and Audit | Traceable records of relevant actions and events |
| Performance | Operational metrics and explainable performance reporting |
| Marketing | Approved campaigns, promotions and growth capabilities |
| Notifications | Application and customer communication workflows |
| Integrations | External provider connections, events and adapters |

### 9.1 Module ownership

Each module owns its business rules and the application operations that modify its data.

Other modules must not bypass those rules by directly modifying its internal records.

Where another module needs information or functionality, it should use an explicitly defined service interface, application contract or approved event.

### 9.2 Module dependencies

Module dependencies must be intentional and documented.

The architecture should favour:

- Narrow service interfaces.
- Explicit input and output contracts.
- Controlled domain events.
- Clear ownership of transactions.
- Minimal circular dependencies.

Circular module dependencies and unrestricted access to another module's internal implementation must be avoided.

### 9.3 Shared technical capabilities

Common technical capabilities may be provided through shared infrastructure or core application libraries.

Examples include:

- Configuration.
- Database connectivity.
- Logging.
- Error handling.
- Validation.
- Authentication utilities.
- Correlation identifiers.
- Transaction management.

Shared technical libraries must not become a place for unrelated business logic.

### 9.4 Module communication

Modules within the modular monolith should communicate through defined application interfaces.

Direct function or service calls are appropriate for operations that require an immediate result.

Domain events may be used where a completed operation needs to notify other modules without tightly coupling the initiating module to every downstream action.

Events must have defined ownership, payload contracts and processing expectations.

An event must not be treated as proof that a downstream operation has completed successfully.

## 10. Identity and Request Context

Every protected backend operation must execute with a validated request context.

The context may contain:

- Authenticated user identity.
- Account status.
- Effective platform permissions.
- Active store membership.
- Effective store permissions.
- Requested store context.
- Request correlation information.

The backend must establish this information using trusted authentication and authoritative application data.

A user identifier, role, permission or store identifier supplied by the client must not independently establish authority.

### 10.1 Platform context

Platform-level operations must require the relevant platform permissions.

Platform Super Admin authority must be distinguished from ordinary store-level authority.

### 10.2 Store context

Store-specific operations must validate:

- The requested store exists and is active where required.
- The authenticated user has the required relationship to the store.
- The requested operation is permitted.
- The relevant record belongs to the authorised store context.

Where an authorised platform-level operation crosses store boundaries, that authority must be explicit and auditable.

### 10.3 Context propagation

Validated request context must be passed through the application layers that need it.

Background jobs and asynchronous operations must carry sufficient trusted context to establish their intended store, user or system authority.

They must not rely on a browser session or an unverified client-supplied identifier.

### 10.4 System-initiated operations

Some operations may execute without a directly authenticated human user.

Examples include scheduled tasks, webhook processing and approved automated workflows.

Such operations must use explicitly defined system identities or execution permissions.

System authority must be limited to the capabilities required for the operation.

System-initiated activity must remain attributable and auditable.

## 11. Data Access Architecture

PostgreSQL is the target relational data foundation.

The application must access persistent data through controlled backend data-access mechanisms.

### 11.1 Repository and persistence boundaries

Repositories or equivalent persistence abstractions should be organised around business module ownership.

They must:

- Apply required store and platform scope.
- Use parameterised database operations.
- Preserve transaction boundaries.
- Support required integrity constraints.
- Avoid exposing unrestricted database access to controllers.
- Avoid returning sensitive fields unnecessarily.

The final persistence library and repository implementation remain open technical decisions.

### 11.2 Database transactions

Operations that modify multiple related records must use appropriate database transaction boundaries.

Examples include:

- Creating an order and its order items.
- Recording an inventory movement and updating the relevant stock balance.
- Recording financial transactions and their associated references.
- Applying approved order or payment state changes.

A transaction must not be considered successful if only part of a required atomic operation has been committed.

External provider calls must be coordinated carefully because a database transaction cannot automatically roll back an action already completed by an external service.

### 11.3 Data ownership

Application modules must respect the ownership rules established in the Data Architecture.

Product identity, store listings, inventory, orders, customers and financial records must remain distinct concepts.

The application must not use one generic ownership field to represent unrelated business relationships.

### 11.4 Query boundaries

Queries must apply the relevant access scope before returning data.

Store-specific queries must not retrieve unrestricted records and depend on frontend filtering to hide unauthorised data.

Cross-store reporting must require explicit authority and defined aggregation rules.

### 11.5 Persistence technology boundaries

Application business rules must not depend unnecessarily on database-specific implementation details.

Persistence-specific functionality should remain within infrastructure boundaries where practical.

The architecture does not yet mandate a particular ORM, query builder or database access library.

Any selected technology must support the required transaction handling, relational integrity, migration management and testing requirements.

## 12. Business Transaction Architecture

Business transactions must be processed through controlled application workflows.

The frontend initiates requests, but the backend determines whether the requested operation is valid and permitted.

### 12.1 Order workflow

An order workflow must coordinate the relevant operations, including:

1. Validate store context.
2. Validate the customer's permitted purchasing context.
3. Validate product listings and current prices.
4. Validate stock availability.
5. Calculate authoritative totals.
6. Create the order and transaction-time item information.
7. Coordinate payment where applicable.
8. Update order state using verified outcomes.
9. Record relevant inventory and financial effects.
10. Record required activity and audit information.

The exact sequence and transaction boundaries depend on the selected payment and fulfilment workflows.

### 12.2 Inventory workflow

Inventory changes must be recorded through authorised operations.

The application must preserve:

- Store ownership.
- Product relationship.
- Movement type.
- Quantity.
- Relevant references.
- Actor or system responsible.
- Timestamp.
- Required approval information.

Direct frontend modification of stock balances must not bypass the backend inventory workflow.

### 12.3 Financial workflow

Financial operations must preserve separate platform and store financial records.

The application must distinguish transaction recording, investigation, reconciliation and authorised adjustment.

Calculated totals or performance scores must not independently authorise material financial decisions.

### 12.4 External transaction coordination

Payment, messaging and other external operations must follow the Integration Architecture.

The backend must account for:

- Duplicate requests.
- Idempotency.
- Timeouts and uncertain outcomes.
- Provider callbacks.
- Retry handling.
- Reconciliation.
- Auditability.

An interrupted external request must not automatically be treated as proof that the external operation failed.

### 12.5 Transaction ownership

Each business transaction must have a clearly identified application module responsible for its lifecycle and authoritative state.

Other modules may contribute information or perform related operations through defined interfaces.

They must not independently create conflicting representations of the same transaction.

## 13. API Contract and Response Architecture

The target backend API must use explicit request and response contracts.

The API Architecture defines the wider API rules, including versioning, authentication, validation, error handling and compatibility.

The application architecture requires:

- Consistent response structures.
- Defined request DTOs or equivalent validation contracts.
- Explicit handling of optional and required fields.
- Consistent error representation.
- Predictable pagination.
- Appropriate filtering and sorting.
- Clear distinction between public and administrative operations.

Internal domain entities must not automatically become public API response models.

API responses must expose only information required by the consuming application.

### 13.1 Contract ownership

The backend owns authoritative API contracts.

Changes must be coordinated with all affected consumers, including the public storefront, administrative application and approved integrations.

Contract changes must not silently break existing consumers.

### 13.2 Contract validation

Request data must be validated at the API boundary before it reaches business operations.

Validation must include structural requirements and any applicable business constraints.

The application must not rely on TypeScript types alone to validate untrusted HTTP input at runtime.

### 13.3 API compatibility

During migration, existing Netlify Function interfaces must remain supported until their consumers have been migrated and verified.

The target NestJS API must follow the versioning strategy established in the API Architecture.

Competing implementations must not create ambiguous ownership of write operations.

## 14. Error Handling

Errors must be handled consistently across frontend and backend boundaries.

### 14.1 Backend errors

The backend must distinguish between:

- Validation failures.
- Authentication failures.
- Authorisation failures.
- Missing resources.
- Business rule conflicts.
- Rate limits.
- External provider failures.
- Unexpected internal failures.

Error responses must not expose stack traces, secrets, internal credentials or sensitive implementation details.

### 14.2 Frontend errors

The frontend must present useful feedback without exposing sensitive backend information.

It should distinguish recoverable validation issues from authentication, permission, network and service failures.

The frontend must not silently treat a failed transaction as successful.

### 14.3 Operational correlation

Where appropriate, errors must include a correlation identifier that allows authorised operators to investigate the corresponding backend logs and activity records.

### 14.4 Transaction uncertainty

Where a request may have reached the backend or an external provider but its outcome is unknown, the frontend must not encourage uncontrolled repetition of a potentially consequential operation.

The backend must provide an appropriate status or recovery mechanism.

The handling of uncertain payments and external operations must follow the Integration Architecture.

## 15. File and Media Handling

File and media operations must use controlled backend workflows and approved storage services.

The application must distinguish:

- Public storefront media.
- Administrative uploads.
- Private documents.
- Sensitive records.
- Temporary processing files.

File access must follow the applicable ownership and authorisation rules.

Uploaded files must be treated as untrusted input.

The application must validate permitted file types and sizes, prevent unsafe file execution or interpretation, and use appropriate malware scanning or quarantine controls where required.

Public media URLs must not expose private files or privileged storage credentials.

### 15.1 Upload ownership

The application must establish which store or platform entity owns an uploaded file.

A file uploaded in one store context must not automatically become accessible to another store.

Shared product media must follow the product ownership and media-sharing rules established by the platform.

### 15.2 Media lifecycle

The application must account for media replacement, deletion, retention and references from historical records.

Removing a product or changing a listing must not automatically destroy media that remains required by another store or historical record.

## 16. Background Processing

Long-running or asynchronous work must not unnecessarily block ordinary HTTP request handling.

Potential background operations include:

- Email and notification delivery.
- Webhook processing.
- Scheduled tasks.
- Reconciliation.
- Report generation.
- Media processing.
- Retry and recovery workflows.

Background jobs must have explicit ownership, execution state, retry rules and failure handling.

Jobs that modify store-specific records must preserve the relevant store context.

Jobs that perform sensitive or financial operations must enforce the same authority and integrity requirements as synchronous application operations.

The job-processing technology and scheduling implementation remain open decisions.

### 16.1 Job execution

Background jobs must define:

- The operation being performed.
- The responsible application module.
- The trusted execution context.
- Required input and references.
- Expected outcomes.
- Retry and failure behaviour.
- Relevant audit information.

### 16.2 Duplicate execution

Jobs may be delivered or executed more than once.

Operations that must occur only once logically must use appropriate idempotency or duplicate-detection controls.

A retry must not create duplicate payments, financial entries, inventory movements, notifications or other consequential records.

### 16.3 Job recovery

The application must support investigation and recovery of failed or abandoned jobs.

Failed work must remain visible to authorised operators where manual intervention is required.

The system must not silently discard consequential work.

### 16.4 Asynchronous consistency

Where an operation triggers downstream work, the application must distinguish the successful completion of the initiating transaction from the completion of subsequent asynchronous processing.

Users and operators must receive an accurate representation of the operation's current state.

## 17. Application Security Boundaries

Security must be enforced throughout the application architecture.

The application must:

- Verify authenticated identity on protected operations.
- Enforce backend authorisation.
- Validate store context.
- Prevent privilege escalation.
- Prevent cross-store data exposure.
- Protect sensitive information.
- Keep privileged credentials server-side.
- Validate untrusted input.
- Apply secure file handling.
- Protect payment and provider interactions.
- Record relevant privileged and sensitive actions.

Frontend access controls are supplementary usability controls, not security boundaries.

The Security Architecture and Identity and Access Architecture remain authoritative for detailed security requirements.

### 17.1 Authentication boundaries

The backend must verify authentication using the approved identity provider or token-validation mechanism.

A frontend indication that a user is signed in is not sufficient evidence of authenticated identity.

Account status, session validity and permission freshness must be evaluated using authoritative backend information or an approved revocation mechanism.

### 17.2 Authorisation boundaries

Every protected application operation must enforce the required permissions.

Authorisation must consider the operation, authenticated identity, relevant store membership and requested data scope.

Permission checks must not be limited to frontend navigation or page visibility.

### 17.3 Sensitive operations

Sensitive operations require explicit authorisation and appropriate audit records.

Examples include:

- Platform-level access changes.
- Store membership and permission changes.
- Financial adjustments.
- Refunds and settlements.
- Sensitive data exports.
- Account recovery and privileged access recovery.
- Changes to security-sensitive configuration.

### 17.4 Security failure handling

Authentication or authorisation failures must fail closed.

A failure to retrieve authoritative permission or store-context information must not result in unrestricted access.

Security-relevant failures must be recorded where appropriate without exposing sensitive information in client responses.

## 18. Application Configuration

Application configuration must be environment-specific and managed outside source code where appropriate.

Configuration may include:

- API base URLs.
- Database connection settings.
- Authentication provider settings.
- Storage provider settings.
- Integration configuration.
- Feature availability.
- Logging and monitoring settings.

Secrets must be stored using approved secret-management mechanisms.

Privileged credentials must never be embedded in frontend bundles or committed to source control.

Store-specific business configuration must be stored and managed as application data where appropriate, rather than being hard-coded into deployment configuration.

### 18.1 Configuration ownership

Each configuration value must have a clear owner and intended scope.

The application must distinguish:

- Platform-wide configuration.
- Environment-specific configuration.
- Store-specific business configuration.
- User-specific preferences.
- External provider configuration.

Configuration must not allow a store to override platform security controls or application-wide business rules.

### 18.2 Configuration validation

Required configuration must be validated during application startup or before the affected capability is activated.

Missing or invalid critical configuration must produce a controlled failure.

The application must not silently substitute insecure or unintended defaults for missing production configuration.

### 18.3 Feature availability

Feature flags or equivalent controls may be used to manage the staged introduction of application capabilities.

They must not replace authorisation or business rule enforcement.

Where feature availability differs by store, the backend must validate the relevant store configuration before allowing the operation.

## 19. Testing Architecture

Testing must cover individual modules and end-to-end business workflows.

### 19.1 Unit tests

Unit tests should verify isolated business rules and application logic.

Examples include:

- Permission evaluation.
- Product ownership rules.
- Listing validation.
- Inventory calculations.
- Order totals.
- Financial calculations.
- Store lifecycle rules.

### 19.2 Integration tests

Integration tests should verify interactions between application modules and infrastructure.

Examples include:

- Database persistence.
- Store-scoped queries.
- Transaction boundaries.
- Authentication and authorisation.
- Payment provider adapters.
- Webhook processing.
- Background job execution.

### 19.3 End-to-end tests

End-to-end tests should verify critical workflows across the frontend and backend.

They must include both authorised and unauthorised scenarios.

Critical scenarios include:

- Platform Super Admin operations.
- Store Admin operations.
- Employee permission restrictions.
- Cross-store access prevention.
- Product listing and availability.
- Inventory updates.
- Checkout and order creation.
- Payment status verification.
- Financial separation.
- Account recovery and session invalidation.

### 19.4 Regression testing

Existing Yotaabo functionality must have appropriate regression coverage before its implementation is migrated or replaced.

Migration testing must verify existing records, authentication workflows, storage references and storefront behaviour.

### 19.5 Test environment separation

Test environments must be separated from production resources.

Automated tests must not unintentionally modify production data, trigger real payments or send real customer communications.

Where external provider behaviour is tested, approved test credentials and provider sandbox environments should be used where available.

### 19.6 Test data

Test data must be representative of the relevant business scenarios.

It must cover multiple stores, different permission levels, shared products, independent inventory, financial separation and transaction histories.

Sensitive production information must not be copied into test environments without an approved security and data-protection process.

## 20. Application Performance and Scalability

The application should be designed to support growth without introducing unnecessary infrastructure complexity.

The implementation must consider:

- Efficient database queries.
- Appropriate indexes.
- Pagination for large datasets.
- Controlled server-state caching.
- Avoidance of unnecessary frontend re-rendering.
- Appropriate API response sizes.
- Background execution for long-running work.
- File and media delivery performance.
- Monitoring of application bottlenecks.

Performance optimisation must not weaken authorisation, data integrity or auditability.

Scaling decisions must be based on measured application needs rather than assumptions that microservices are immediately necessary.

### 20.1 Frontend performance

The frontend should use appropriate code splitting and lazy loading for non-critical application areas.

Large administrative features should not unnecessarily increase the initial public storefront payload.

Images and other media should use suitable formats, dimensions, caching and delivery strategies.

### 20.2 Backend performance

The backend must avoid unnecessary database queries and repeated expensive operations.

Queries must be designed around expected access patterns and supported by appropriate indexes.

Large datasets must use controlled pagination or other appropriate retrieval strategies.

### 20.3 Performance measurement

Performance must be assessed using observable application behaviour.

Relevant measurements may include:

- API response time.
- Database query duration.
- Error rates.
- Background job execution time.
- Frontend loading performance.
- Resource utilisation.
- Provider response time.

Performance targets must be defined and reviewed as operational requirements become clearer.

## 21. Repository and Code Organisation

The repository structure must reflect application responsibilities and make module boundaries understandable.

The final structure must be based on the approved implementation plan rather than imposed prematurely.

### 21.1 Target repository organisation

A possible logical organisation is:

    repository/
    |
    |-- frontend/
    |   |-- storefront/
    |   |-- administration/
    |   |-- shared/
    |   |-- public/
    |
    |-- backend/
    |   |-- src/
    |   |   |-- modules/
    |   |   |-- common/
    |   |   |-- infrastructure/
    |   |   |-- configuration/
    |   |   |-- main.ts
    |   |-- test/
    |
    |-- database/
    |   |-- migrations/
    |   |-- seeds/
    |
    |-- docs/
    |   |-- product/
    |   |-- architecture/
    |   |-- identity-access/
    |   |-- stores/
    |   |-- operations/
    |   |-- governance/
    |   |-- implementation/
    |   |-- decisions/
    |
    |-- scripts/
    |-- tests/

This is an illustrative target structure, not an instruction to reorganise the existing repository immediately.

### 21.2 Backend module organisation

Each backend module should group its related application responsibilities.

A module may contain:

- Controllers.
- Application services.
- Domain logic.
- DTOs and validation.
- Persistence interfaces.
- Repository implementations where appropriate.
- Module-specific tests.

The final directory layout may differ where another structure provides clearer boundaries.

### 21.3 Frontend feature organisation

Frontend features should group their related pages, components, hooks, API operations and types.

Shared components must be genuinely reusable.

Feature-specific business logic should remain within the relevant feature or application boundary.

### 21.4 Code quality

The implementation must use consistent naming, formatting, linting and type-checking standards.

Code quality checks must be applied through the development and CI workflows.

Technical shortcuts must not bypass security, data integrity or required regression checks.

## 22. Deployment and Runtime Architecture

The application architecture must support the deployment model defined in the Deployment Architecture.

The current production application remains deployed through the existing Netlify and Supabase arrangement until an approved migration changes the relevant components.

### 22.1 Frontend runtime

The public storefront and administrative frontend may be deployed together or separately.

The decision must consider:

- Deployment independence.
- Shared code.
- Environment configuration.
- Public and administrative security boundaries.
- Build complexity.
- Operational ownership.

Separate frontend deployments must not be introduced without a clear operational or architectural benefit.

### 22.2 Backend runtime

The target NestJS application will initially operate as a modular backend deployment.

Its modules must share defined configuration, logging, database access and operational controls.

A module must not be treated as an independently deployable service unless a separate architecture decision establishes that requirement.

### 22.3 Environment separation

Development, testing, staging and production environments must have appropriately separated configuration and resources.

Environment separation must cover:

- Database access.
- Authentication configuration.
- Storage.
- External providers.
- Secrets.
- Background processing.
- Logging and monitoring.

### 22.4 Runtime health

The application must expose appropriate health and readiness information for operational monitoring.

Health checks must distinguish basic process availability from the availability of critical dependencies where appropriate.

Sensitive infrastructure details must not be exposed through public health endpoints.

## 23. Migration from the Existing Application

Migration must be incremental and controlled.

The existing Yotaabo application remains the production baseline until individual capabilities have been migrated and verified.

### 23.1 Migration assessment

Before migrating a capability, identify:

- Existing functionality.
- Current production consumers.
- Existing API contracts.
- Related database records.
- Authentication requirements.
- Store and ownership assumptions.
- External dependencies.
- Background jobs and callbacks.
- Operational and recovery requirements.

The assessment must identify dependencies that could be affected by the migration.

### 23.2 Capability-by-capability migration

Migration should proceed through defined capabilities or business modules.

Each migration stage must identify:

- The existing implementation.
- The target implementation.
- Data ownership.
- API ownership.
- Dependencies.
- Testing requirements.
- Cutover approach.
- Rollback approach.

A complete business capability must not be considered migrated merely because its replacement code has been deployed.

### 23.3 Production compatibility

Existing frontend consumers must continue to operate until they are migrated and tested.

Existing Netlify Function routes and request/response contracts remain valid production interfaces until the corresponding migration is complete.

The target NestJS API must not create competing write paths that can produce inconsistent data.

### 23.4 Data preservation

Migration must preserve:

- Existing product information.
- Store listings and commercial information.
- Customer records.
- Orders and transaction histories.
- Authentication relationships.
- Storage objects and media references.
- Relevant activity and audit records.

Data transformation must be documented and verified.

### 23.5 Migration verification

Each migrated capability must pass relevant:

- Unit tests.
- Integration tests.
- End-to-end tests.
- Security checks.
- Store-isolation tests.
- Data integrity checks.
- Regression tests.
- Operational readiness checks.

Verification must cover both successful and rejected operations.

### 23.6 Rollback safety

Each migration must define a controlled rollback approach.

Rollback must account for:

- New records created by the target implementation.
- Changes to existing records.
- Pending background jobs.
- External provider callbacks.
- In-flight transactions.
- API routing.
- Authentication and session behaviour.

Switching implementations must not cause duplicate processing, lost operations or inconsistent transaction state.

Where data has changed after cutover, rollback must not blindly restore an older application state while leaving newer records unaccounted for.

### 23.7 Existing functionality protection

The migration must not require unnecessary redesign of the current Yotaabo storefront or administration.

Changes to existing interfaces must be justified by a defined business or technical requirement.

The platform expansion must not silently remove existing capabilities or alter approved store operations.

## 24. Architectural Constraints

The following constraints apply to the application architecture:

- The initial backend direction is a NestJS modular monolith.
- The frontend direction remains React, TypeScript and Vite.
- PostgreSQL remains the target relational data foundation.
- Store isolation must be enforced by the backend.
- Product ownership must remain distinct from store product availability.
- Inventory must remain independently attributable to each store.
- Store and platform financial records must remain separate.
- Material financial and governance decisions must not be automated solely through calculated scores.
- Existing production functionality must be protected during migration.
- External provider dependencies must use controlled integration boundaries.
- Privileged credentials must remain outside public frontend code.
- Architectural complexity must be justified by actual requirements.

These constraints complement the approved product and architecture documents.

## 25. Open Application Architecture Decisions

The following decisions remain open and must be resolved through implementation planning or formal architecture decisions.

| Decision | Area | Current position |
|---|---|---|
| Frontend repository layout | Frontend | Existing structure retained until migration is planned |
| Separate frontend builds | Deployment | Evaluate operational benefit |
| Frontend state management | Frontend | Select based on application needs |
| Server-state caching | Frontend | Define library and invalidation strategy |
| API client implementation | Frontend | Establish shared client |
| Backend persistence library | Backend | Evaluate ORM or query-based approach |
| Domain and repository boundaries | Backend | Refine during module design |
| Database transaction strategy | Backend | Define per business workflow |
| Authentication integration | Identity | Retain or evolve through approved decision |
| Store context propagation | Backend | Define trusted request and job context |
| Background job technology | Runtime | Evaluate operational requirements |
| Event processing strategy | Backend | Define only where asynchronous processing is needed |
| Shared application packages | Repository | Determine during implementation planning |
| Frontend deployment boundaries | Deployment | Decide based on operational needs |
| Backend hosting | Deployment | Governed by Deployment Architecture |

An open decision must not be treated as an approved implementation requirement.

Unresolved choices must not be hard-coded in ways that unnecessarily constrain future decisions.

## 26. Relationship to Other Documents

This document must be read together with:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.
- System Architecture.
- Data Architecture.
- Store Architecture.
- API Architecture.
- Security Architecture.
- Identity and Access Management.
- Deployment Architecture.
- Operations Architecture.
- Integration Architecture.

The documents define complementary parts of the platform.

Where an application implementation detail conflicts with an approved business, security or data ownership requirement, the relevant governing document must be followed and the conflict formally resolved.

## 27. Architecture Governance

This document is subject to architecture review and approval.

Material changes to application boundaries, module ownership, technology direction or migration strategy must be reviewed before implementation.

Implementation decisions that resolve an open architectural question must be documented through the approved decision process where they materially affect the platform.

The application architecture must evolve alongside verified business requirements and operational experience.

Changes must preserve platform security, store isolation, data integrity, financial separation and existing production continuity.
