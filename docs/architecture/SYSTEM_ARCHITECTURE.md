# System Architecture

**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the high-level technical architecture for the central multi-store retail platform.

It establishes the current technical baseline, target architecture, major system components, architectural boundaries, security principles, deployment considerations and migration approach.

The architecture must support multiple participating stores while preserving their operational independence, data separation and commercial boundaries.

The platform must be capable of growing without introducing unnecessary infrastructure complexity.

## 2. Architectural Direction

The target platform will use a modular monolith architecture.

The backend will be developed using NestJS, with clearly separated business modules and controlled communication between them.

The architecture will initially favour:

- One centrally managed backend application.
- Clearly defined business modules.
- A shared relational database with enforced store-level data boundaries.
- Centralised authentication and authorisation.
- Explicit platform-level and store-level access.
- Shared infrastructure with independently managed store operations.
- Auditable business operations and financial records.
- Controlled integrations with external services.

Microservices are not part of the initial architecture.

A module must not become a separate service merely because it represents a distinct business capability. Service separation should only be considered when justified by measurable operational, technical or organisational requirements.

## 3. Current System Architecture

The existing Yotaabo application provides the initial production foundation.

### 3.1 Frontend

The current frontend uses:

- React 18.
- TypeScript.
- Vite.
- React Router.
- Material UI.
- Tailwind CSS.
- Supabase JavaScript client.

The frontend contains storefront, administration, product management, order management and supporting application functionality.

### 3.2 Backend

The current backend uses Netlify Functions.

Existing function responsibilities include:

- Product operations.
- Order operations.
- Administrator management.
- Administrator sessions and context.
- Administrator invitations.
- Administrator deletion and lifecycle operations.
- Activity records.

Shared backend authentication logic is located in:

`netlify/functions/_shared/auth.mjs`

### 3.3 Database and Managed Services

Supabase currently provides the primary managed data platform.

The existing implementation uses:

- PostgreSQL through Supabase.
- Supabase Authentication.
- Supabase Storage.
- Supabase JavaScript client.
- Server-side Supabase administrative access through protected environment credentials.

Database changes are maintained under:

`database/migrations/`

### 3.4 Hosting and Deployment

The current application is configured for:

- Netlify frontend hosting.
- Netlify Functions for API execution.
- Vite production builds.
- Environment-based configuration.
- Netlify redirects for API routing and frontend navigation.

### 3.5 Current Architecture Boundary

The existing architecture is the production baseline, not the final multi-store architecture.

Existing functionality, data, authentication workflows and deployed integrations must be understood and protected during migration.

No existing service or technology should be removed solely because the target architecture uses a different implementation approach.

## 4. Target System Architecture

The target architecture consists of the following logical layers:

1. Storefront and platform interfaces.
2. API and application backend.
3. Business domain modules.
4. Data access and persistence.
5. Managed infrastructure and external integrations.

### 4.1 Frontend Layer

The frontend will continue using React, TypeScript and Vite unless a documented architectural decision justifies a change.

The frontend layer will support:

- Public store storefronts.
- Store administration interfaces.
- Platform administration interfaces.
- Employee-facing operational interfaces.
- Authentication and account management.
- Store-specific presentation and configuration.

Store interfaces must operate within their authorised store context.

The frontend must not be treated as the security boundary. All access restrictions must be enforced by the backend.

Whether participating stores use one shared frontend application, separate deployments or another delivery arrangement remains an implementation decision.

### 4.2 API and Backend Layer

NestJS will serve as the central backend application.

It will provide:

- API routing and request validation.
- Authentication integration.
- Authorisation and permission enforcement.
- Store-context resolution.
- Business rules and workflows.
- Transaction management.
- Audit recording.
- Integration coordination.
- Consistent error handling.

The backend is the authoritative enforcement point for business rules and data access.

Business rules must not exist exclusively in frontend code.

### 4.3 Business Domain Modules

The initial target module boundaries are:

| Module | Responsibility |
|---|---|
| Identity and Access | Users, authentication integration, roles and permissions |
| Platform Administration | Platform-level administration and governance |
| Stores | Store registration, configuration, status and lifecycle |
| Products | Product records, ownership and sharing |
| Catalogue | Store-specific product presentation and availability |
| Inventory | Store stock, movements, adjustments and transfers |
| Commerce | Carts, checkout and order processing |
| Customers | Customer records and customer-facing relationships |
| Finance | Store financial records, commissions and obligations |
| Activity and Audit | Business activity, accountability and audit history |
| Performance | Store performance information and reviews |
| Marketing | Coordinated marketing and store campaigns |
| Notifications | Transactional and operational notifications |
| Integrations | Controlled communication with external services |

These are logical boundaries. They do not require every module to be implemented immediately.

Modules must have clear ownership of their business responsibilities and data operations.

Modules should communicate through defined service interfaces or explicitly documented events rather than directly manipulating another module's internal implementation.

### 4.4 Data and Persistence Layer

PostgreSQL is the target relational database foundation.

The initial architecture should favour a shared database with logically separated business domains.

The database must support:

- Platform-level records.
- Store-specific records.
- Explicit store relationships.
- Product ownership and sharing.
- Independent store inventory.
- Store-specific commercial information.
- Financial separation.
- Historical records.
- Auditability.
- Referential integrity.

Store-level data isolation must be enforced through backend authorisation and appropriate database constraints.

Row-level security may provide an additional enforcement layer where appropriate.

The final database access strategy and Supabase integration model must be documented before implementation.

### 4.5 Infrastructure and Managed Services

The platform may continue using managed services where they provide appropriate operational value.

Potential responsibilities include:

- PostgreSQL hosting.
- Authentication services.
- Object and image storage.
- Email delivery.
- Application hosting.
- Scheduled background processing.
- Monitoring and logging.

The decision to retain or replace individual Supabase capabilities must be based on security, maintainability, cost and operational requirements.

Using NestJS does not automatically require replacing Supabase.

## 5. Multi-Store Architecture

Multi-store support is a fundamental architectural requirement.

The platform must support multiple participating stores through one centrally managed platform.

### 5.1 Platform Context

The platform has a central administrative context responsible for:

- Platform administration.
- Store onboarding and lifecycle oversight.
- Shared infrastructure.
- Platform-wide policies.
- Authorised governance.
- Platform financial records.
- Coordinated services and initiatives.

### 5.2 Store Context

Each store has its own operational context.

Store-level operations include:

- Store administration.
- Store employees and permissions.
- Product availability.
- Store pricing and promotions.
- Inventory.
- Orders and fulfilment.
- Customers and customer-related records.
- Store financial records.
- Store-specific reporting.

A store must not access another store's restricted records merely because both participate in the same platform.

### 5.3 Store Context Resolution

Every store-scoped backend operation must resolve and validate the applicable store context.

The backend must not trust a store identifier supplied by the frontend without checking whether the authenticated user is authorised to operate within that store.

Platform-level permissions and store-level permissions must remain distinct.

### 5.4 Data Isolation

Store-scoped records must have explicit relationships to their owning or assigned store.

Where a record is genuinely platform-wide, its platform-level ownership must be explicit.

The architecture must prevent:

- Unauthorised cross-store data access.
- Cross-store inventory manipulation.
- Unauthorised order access.
- Unauthorised financial record access.
- Unauthorised modification of another store's commercial settings.

The database and backend must support consistent enforcement of these restrictions.

### 5.5 Shared Products

Product identity and ownership must be separated from store-specific commercial operations.

A product may be made available to multiple stores without transferring its ownership.

Each authorised store may manage its own:

- Availability.
- Price.
- Promotions.
- Inventory.
- Storefront presentation.

Changes to shared source product information must follow the applicable ownership and permission rules.

## 6. Identity and Access Architecture

The target system must support distinct platform and store access contexts.

### 6.1 Platform-Level Access

Platform Super Admin permissions apply to authorised platform-level responsibilities.

Platform access must not automatically grant unrestricted authority over every store operation.

### 6.2 Store-Level Access

Store Admin permissions apply to the authorised store.

Store employees receive permissions according to their assigned roles and responsibilities.

### 6.3 Authorisation

Authorisation must be enforced by the backend on every protected operation.

The architecture must support:

- Role-based permissions.
- Store-scoped access.
- Platform-scoped access.
- Explicit resource ownership checks.
- Permission validation.
- Session and token validation.
- Auditable privileged actions.

The system must not rely on hidden frontend routes or interface restrictions as security controls.

Detailed role definitions belong in the Identity and Access specification.

## 7. API Architecture

The NestJS application will expose versioned APIs.

The initial API structure should use a consistent namespace, such as:

`/api/v1/`

API responsibilities will be organised around business domains.

The API must provide:

- Consistent request and response structures.
- Input validation.
- Authentication and authorisation.
- Explicit resource ownership checks.
- Predictable error responses.
- Appropriate pagination and filtering.
- Request and operation tracing.
- Compatibility management.

Frontend applications must access protected business functionality through authorised API operations.

Direct database access from the frontend must not be used to bypass backend business rules or access controls.

Existing frontend integrations may be migrated incrementally to the new API.

## 8. Data Ownership and Business Transactions

Data ownership must be explicit.

The architecture must distinguish:

- Platform-owned records.
- Store-owned records.
- Shared product information.
- Store-specific product settings.
- Store inventory.
- Platform financial records.
- Store financial records.
- Customer-related records.
- Historical and audit records.

Business operations that affect multiple related records must use appropriate database transactions.

Examples include:

- Order creation and inventory allocation.
- Inventory adjustments.
- Stock transfers.
- Financial postings.
- Commission calculations and settlements.
- Administrative lifecycle changes.

Financial and inventory records must preserve sufficient history to explain changes and reconcile balances.

Historical records must not be silently overwritten when an auditable correction is required.

Detailed entity relationships and data constraints belong in the Data Architecture specification.

## 9. Security Architecture

Security must be applied across all system layers.

The target architecture must include:

- Secure authentication.
- Backend-enforced authorisation.
- Store-level data isolation.
- Protected service credentials.
- Environment-based secrets.
- Input validation.
- Secure session and token handling.
- Appropriate rate limiting.
- Audit logging.
- Secure file upload and storage policies.
- Protection against common web application vulnerabilities.
- Controlled administrative operations.

Privileged Supabase credentials must never be exposed to frontend applications.

Sensitive operations must be performed through trusted backend execution.

Security controls must be tested independently of frontend behaviour.

Detailed controls belong in the Security Architecture specification.

## 10. Deployment Architecture

The target deployment must support independent deployment and maintenance of the frontend and backend.

The intended logical deployment arrangement is:

- Frontend application hosted through an appropriate static or web application hosting service.
- NestJS backend deployed as a managed server application.
- PostgreSQL database hosted through an appropriate managed database service.
- Object storage for product images and other authorised files.
- External services connected through controlled integration interfaces.

The initial hosting providers and deployment topology remain subject to technical and operational evaluation.

The architecture must support separate development, testing and production environments.

Production credentials and data must not be casually reused in development environments.

Database migrations must be version-controlled and applied through a controlled deployment process.

## 11. Background Processing and Integrations

The platform may require asynchronous processing for:

- Email notifications.
- Order-related notifications.
- Scheduled operational tasks.
- Reporting.
- Data reconciliation.
- Approved external integrations.

Background processing must not bypass business rules or authorisation requirements.

Operations requiring retries must be designed to avoid unintended duplicate financial, inventory or order changes.

The initial implementation should use the simplest suitable processing mechanism.

A separate queue or distributed messaging platform should only be introduced when justified by actual requirements.

## 12. Auditability and Observability

The system must provide sufficient operational visibility to investigate failures and account for material business actions.

The architecture must support:

- Structured application logs.
- Error monitoring.
- Request tracing.
- Administrative activity records.
- Security-related events.
- Business audit records.
- Database migration history.
- Operational health monitoring.

Business audit records and technical application logs serve different purposes and must not be treated as interchangeable.

Material changes to products, inventory, orders, financial records, permissions and governance decisions must have appropriate accountability records.

## 13. Non-Functional Requirements

The architecture must account for:

### Security

Enforce access controls, protect sensitive data and prevent unauthorised cross-store access.

### Reliability

Protect critical business operations against partial failure and inconsistent data changes.

### Maintainability

Keep business modules clearly organised and avoid unnecessary coupling.

### Scalability

Support growth in stores, products, customers, orders and operational activity without requiring premature distributed architecture.

### Performance

Use appropriate database indexing, query optimisation, pagination and caching where justified.

### Availability

Use deployment and recovery practices appropriate to the operational importance of the platform.

### Data Integrity

Protect financial, inventory, ownership and order records through database constraints and controlled transactions.

### Portability

Avoid unnecessary dependency on one hosting provider where reasonable alternatives exist.

### Testability

Support unit, integration, API and end-to-end testing.

### Recoverability

Maintain appropriate backup, restoration and disaster recovery procedures.

Detailed measurable targets must be established in the relevant technical specifications.

## 14. Migration Architecture

Migration from the current Yotaabo implementation to the target architecture must be incremental and controlled.

The migration must not assume that the existing application can be replaced in one operation.

### 14.1 Existing System Protection

Before migration, the existing production system must be understood and its critical workflows documented.

The following must be protected:

- Storefront functionality.
- Administrator access.
- Product records.
- Product images and storage references.
- Orders and order history.
- Customer and transaction-related records.
- Authentication and password recovery.
- Invitations and administrator lifecycle operations.
- Existing integrations.
- Production configuration.

### 14.2 Incremental Backend Migration

The target NestJS backend should be introduced alongside the existing backend.

Migration should proceed by defined business capability.

For each migrated capability:

1. Document existing behaviour.
2. Define the target API and business rules.
3. Implement the NestJS module.
4. Add appropriate tests.
5. Validate database compatibility.
6. Verify authorisation and store isolation.
7. Test against representative existing data.
8. Migrate frontend integration.
9. Verify production behaviour.
10. Retire the old endpoint only after successful validation.

### 14.3 Data Migration

Data migration must be controlled and verifiable.

The process must include:

- Source data assessment.
- Ownership and relationship mapping.
- Schema compatibility checks.
- Backup and recovery planning.
- Migration scripts.
- Data integrity validation.
- Record-count reconciliation where applicable.
- Verification of images and file references.
- Post-migration application testing.

Production data must not be deleted or overwritten merely because a new schema has been introduced.

### 14.4 Coexistence

During migration, the existing Netlify Functions and new NestJS APIs may coexist.

There must be clear ownership of each migrated business capability.

The architecture must prevent conflicting writes and inconsistent business rules between old and new implementations.

### 14.5 Completion

A legacy capability may be retired only when:

- Its replacement is operational.
- Required tests pass.
- Data integrity is verified.
- Security controls are verified.
- Frontend dependencies are migrated.
- Production behaviour is confirmed.
- A recovery approach exists.

## 15. Architectural Constraints

The following constraints apply:

- Preserve existing Yotaabo production functionality during migration.
- Treat Yotaabo as a participating store, not as the platform itself.
- Enforce store isolation at the backend and data layers.
- Keep platform and store permissions distinct.
- Keep store and platform financial records separate.
- Preserve product ownership and sharing boundaries.
- Do not introduce microservices without a justified requirement.
- Do not expose privileged credentials to frontend applications.
- Do not implement unresolved business rules as permanent assumptions.
- Do not automate material financial or governance decisions without approved rules and human oversight.
- Maintain auditable business operations.

## 16. Decisions Requiring Further Specification

The following decisions remain open and must be resolved through the relevant technical specifications or architecture decisions:

- Final Supabase retention and integration strategy.
- Whether NestJS will access PostgreSQL directly or through selected Supabase capabilities.
- Authentication token validation and identity integration details.
- Final hosting provider and deployment topology.
- Whether stores share one frontend deployment or use separate storefront deployments.
- API versioning and compatibility policy.
- Background processing technology.
- File storage access and delivery strategy.
- Backup, recovery and disaster recovery targets.
- Monitoring and alerting services.
- Detailed database tenancy and row-level security strategy.
- Data migration sequencing and production cutover strategy.

Open decisions must not be silently treated as approved implementation requirements.

## 17. Relationship to Other Documents

This document must be read alongside:

- `../product/PRODUCT_VISION.md`
- `../product/PLATFORM_BUSINESS_MODEL.md`
- `../product/STORE_OPERATING_MODEL.md`
- `../product/SCOPE_AND_EXCLUSIONS.md`

Supporting architecture specifications will define:

- Data Architecture.
- Identity and Access Architecture.
- Store Architecture.
- API Architecture.
- Security Architecture.
- Implementation and Migration Plan.

Detailed business rules remain governed by the approved product documents.

## 18. Architecture Governance

Changes to the approved target architecture must be documented and reviewed before implementation where they materially affect:

- System boundaries.
- Data ownership.
- Store isolation.
- Authentication and authorisation.
- Financial integrity.
- Security.
- Deployment and operational responsibilities.
- Migration strategy.

Architecture decisions must include their rationale, consequences and affected components.

The architecture must evolve with the platform while preserving the approved business and operating principles.
