# Scope and Exclusions

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-PRD-E1F7625114 |
| Category | Product requirements |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-09
**Approval:** Approved by business owner

## 1. Purpose

This document defines the functional boundaries of the central retail platform.

It establishes:

- The capabilities that belong within the platform.
- The capabilities required to support participating stores.
- The boundaries between platform-level and store-level responsibilities.
- The distinction between initial delivery scope and future capabilities.
- Features and responsibilities that are explicitly excluded.
- Rules for evaluating proposed additions to the platform.

This document establishes scope boundaries. It does not replace detailed functional specifications, architecture decisions or implementation plans.

## 2. Platform Scope

The platform is a centrally operated retail commerce and business management environment supporting multiple participating stores.

Its scope includes shared infrastructure, independent store operations, central governance, commerce capabilities, financial visibility and business support.

The platform must support multiple stores without requiring a separate platform deployment for each store.

Yotaabo is one participating store. It must operate within the same applicable store-level rules and controls as other stores.

## 3. Core Functional Scope

The following capability areas are within the overall platform scope.

### 3.1 Platform Administration

- Platform-level administration.
- Platform configuration and policies.
- Participating store management.
- Store approval, activation, suspension and closure.
- Platform-level identity and access management.
- Platform-wide operational visibility.
- Platform audit and accountability records.

### 3.2 Store Management

- Store registration and onboarding workflows.
- Store identity and branding configuration.
- Store-specific settings.
- Store Admin appointment and access management.
- Store lifecycle management.
- Store-level operational administration.

### 3.3 Identity and Permissions

The current two-store application uses a deliberately limited administrator model:

- One Super Admin account with platform-wide authority over both stores.
- One Store Admin account for Yotaabo.
- One Store Admin account for Porschs.
- Invitations are restricted to creating or assigning the two Store Admin positions.
- Store-scoped access ensures each Store Admin can administer only their own store, while the Super Admin can administer both.
- Authentication, session management, account security and auditable access changes.

The current application does not include employee accounts, employee invitations, delegated administrators, nested roles, departments or a configurable organisational hierarchy.

The broader role, employee and delegation models remain documented as future platform capabilities and are not current implementation requirements.

### 3.4 Product Catalogue

- Product creation and management.
- Product ownership and origin records.
- Product information and descriptive content.
- Controlled product sharing between stores.
- Store-specific product availability.
- Store-specific pricing and commercial information.
- Product status and publication controls.

Product ownership must remain distinct from store availability and inventory.

Sharing a product must not automatically transfer ownership or grant unrestricted editing rights.

### 3.5 Commerce

- Storefront presentation.
- Product discovery and browsing.
- Shopping cart and checkout.
- Order creation and processing.
- Order status and fulfilment management.
- Customer order communication.
- Returns, cancellations and refunds.
- Relevant customer service workflows.

Each store must retain its own public identity and store-specific commercial presentation.

### 3.6 Inventory

- Store-specific inventory records.
- Stock quantities and availability.
- Stock adjustments.
- Stock movements and transfers.
- Inventory reconciliation.
- Inventory history and accountability.
- Recording stock supplied through platform assistance.

Inventory must not be treated as one undifferentiated platform-wide stock balance.

### 3.7 Financial Management

- Store revenue and expense records.
- Platform revenue and expense records.
- Commission calculations.
- Commission settlements.
- Stock supplied and capital advanced.
- Repayments and outstanding obligations.
- Financial reporting and reconciliation.
- Documented financial disputes.

Store financial activity must remain distinguishable from platform financial activity.

Commercial terms, commission rates, calculation rules and settlement procedures require separate approval.

### 3.8 Performance and Business Support

- Store performance monitoring.
- Operational and financial reporting.
- Performance reviews.
- Agreed targets and action plans.
- Marketing and growth coordination.
- Store support requests.
- Stock and capital assistance reviews.
- Audits and authorised interventions.

Performance information must support informed human decisions. It must not automatically determine funding, suspension or other material interventions.

### 3.9 Governance and Accountability

- Platform policies and standards.
- Authorised approval workflows.
- Audit records.
- Decision records.
- Amendment history.
- Store responses and disputes.
- Intervention records.
- Suspension and closure procedures.

## 4. Platform-Level and Store-Level Boundaries

The platform provides shared infrastructure and central governance. Each store remains responsible for its authorised day-to-day operations.

| Area | Platform scope | Store scope |
|---|---|---|
| Administration | Platform governance and oversight | Store administration |
| Identity | Super Admin access, platform security and store-admin appointments | One Store Admin account per store; access limited to that store |
| Branding | Shared platform standards | Store identity and presentation |
| Products | Catalogue infrastructure and ownership controls | Authorised product management |
| Pricing | Shared pricing capabilities and applicable policies | Store-specific prices and promotions |
| Inventory | Shared inventory controls and audit | Store stock management |
| Orders | Shared commerce infrastructure and standards | Store order processing and fulfilment |
| Finance | Platform financial records and commission administration | Store financial records and operations |
| Performance | Monitoring, reviews and oversight | Store targets and operational improvement |
| Marketing | Coordinated platform initiatives | Store participation and authorised store campaigns |

The platform must not become the routine operator of every participating store.

Store Admins must retain authority over ordinary activities within their assigned permissions and applicable platform policies.

## 5. Initial Release Scope

The initial release must establish the foundation required to operate multiple stores safely and consistently.

The following are foundational capabilities:

### 5.1 Multi-Store Foundation

- A central platform supporting multiple stores.
- Reliable store identification and separation.
- Store-specific configuration.
- Store-level data access restrictions.
- Platform-level administration.

### 5.2 Access Control

- Exactly one Super Admin account for the current platform.
- Exactly one Store Admin account for Yotaabo.
- Exactly one Store Admin account for Porschs.
- Invitations limited to the two Store Admin positions.
- No employee accounts, employee invitations or delegated administrator accounts.
- No departments, nested leadership or configurable organisational hierarchy.
- Secure authentication and session management.
- Store-scoped authorisation, with the Super Admin able to administer both stores.

### 5.3 Core Store Operations

- Storefront and store branding.
- Product catalogue management.
- Store-specific product availability.
- Pricing and promotions.
- Inventory management.
- Shopping cart and checkout.
- Order processing and management.

### 5.4 Operational Accountability

- Auditable administrative actions.
- Store and platform activity records.
- Basic store performance visibility.
- Financial record separation.
- Secure access to store-specific records.

### 5.5 Existing System Continuity

Existing Yotaabo storefront and administrative functionality must be protected during platform development and migration.

Migration must account for:

- Existing product records.
- Product images and associated media.
- Storefront content and configuration.
- Existing administrative access.
- Existing orders and relevant historical records.
- Customer and transaction data where applicable.
- Existing integrations and deployed functionality.

No existing production data or functionality should be removed or replaced without an understood migration plan and verification.

The precise delivery sequence and acceptance criteria for the initial release will be defined in the implementation specifications.

## 6. Future and Deferred Capabilities

The following capabilities belong to the broader platform direction but may be delivered after the initial release.

Their inclusion in this section does not constitute a commitment to a delivery date.

### 6.1 Advanced Performance Management

- Advanced performance scoring.
- Historical trend analysis.
- Comparative store reporting.
- Automated performance alerts.
- More detailed business health indicators.

Any scoring or automated alerting must remain explainable and subject to appropriate human oversight.

### 6.2 Marketing and Growth

- Coordinated campaigns across stores.
- Advanced campaign management.
- Customer retention programmes.
- Promotional performance analysis.
- Cross-store marketing opportunities.

### 6.3 Stock and Capital Assistance

- Formal stock assistance workflows.
- Capital assistance requests.
- Assistance assessment and approval.
- Disbursement and repayment tracking.
- Assistance programme reporting.

The financial, legal and commercial terms must be approved before these capabilities are used operationally.

### 6.4 Advanced Reporting

- Consolidated platform reporting.
- Advanced inventory analysis.
- Demand and sales forecasting.
- Financial trend analysis.
- More detailed operational dashboards.

Access to consolidated information must follow platform permissions and confidentiality requirements.

### 6.5 Integrations

- Additional payment integrations.
- Accounting and financial integrations.
- Marketing and communication integrations.
- Logistics and fulfilment integrations.
- Other approved external services.

### 6.6 Advanced Organisation and Workforce Management

The broader platform may later introduce:

- Multiple platform administrators and delegated platform responsibilities.
- Employee accounts and employee invitations.
- Store teams, departments and reporting structures.
- Employee roles, permission templates and delegated authority.
- Nested leadership and approval workflows.
- Employee onboarding, role changes and offboarding.

These capabilities are future platform proposals. They are explicitly outside the current Yotaabo and Porschs application scope.

Each integration must have a defined purpose, security assessment and ownership of operational responsibilities.

## 7. Explicit Exclusions

Unless formally approved through a scope change, the platform does not include the following responsibilities or capabilities.

### 7.1 Unrestricted Platform Control

The platform does not provide unrestricted authority over ordinary store operations.

Platform oversight must follow defined roles, policies and authorised intervention procedures.

### 7.2 Automatic Financial or Governance Decisions

The platform must not independently approve funding, impose financial obligations, suspend stores or make other material governance decisions solely through automated scores or calculations. This exclusion does not prevent routine administrative automation operating within explicitly approved rules and permissions.

### 7.3 Automatic Transfer of Product Ownership

Making a product available to another store does not automatically transfer its ownership or grant unrestricted editing rights.

### 7.4 Undifferentiated Inventory

The platform does not treat all stock as one shared inventory balance.

Stock ownership, store allocation, transfers and assistance arrangements must be recorded appropriately.

### 7.5 Unapproved Financial Services

The platform does not automatically become a lender, bank, payment institution or regulated financial services provider.

Any proposed lending, credit, financing or related financial service requires separate legal, regulatory, accounting and commercial assessment.

### 7.6 Unapproved Legal and Accounting Responsibilities

The platform does not replace professional legal, tax or accounting services.

Specific statutory responsibilities and contractual arrangements must be established separately.

### 7.7 Unapproved External Integrations

External services, integrations and third-party capabilities are not included merely because they may be technically possible.

They require an approved business purpose, scope and implementation decision.

### 7.8 Expanded Workforce and Organisational Administration in the Current Release

The current application does not include employee management, staff invitations, delegated administrators, department structures, nested leadership, multiple layers of platform administration or complex role hierarchies.

The current administrator model is limited to one Super Admin and one Store Admin for each of the two stores, Yotaabo and Porschs. Invitations must be restricted to the two Store Admin positions.

The broader workforce and organisational capabilities remain preserved in the future-platform documentation. Their presence in those documents does not authorise their implementation in the current application.

## 8. Scope Change Control

Proposed additions or changes to platform scope must be evaluated before implementation.

A scope change should identify:

- The business problem being addressed.
- The intended users and affected stores.
- The expected business value.
- The functional requirements.
- The impact on existing capabilities.
- The data and security implications.
- The financial and operational implications.
- The implementation effort and dependencies.
- The risks of introducing the change.
- Whether the change affects approved business or operating rules.

Changes affecting approved business models, store responsibilities, product ownership, financial arrangements or governance must receive the appropriate business approval.

Approved scope changes must be documented with their rationale, approval and revision history.

## 9. Scope Dependencies and Unresolved Decisions

Some platform capabilities depend on decisions that have not yet been approved.

These include:

- Commission rates and calculation basis.
- Commission settlement frequency and procedures.
- Product sharing permissions and restrictions.
- Store participation and commercial agreements.
- Stock assistance and capital programme terms.
- Customer account and cross-store data policies.
- Returns, refunds and financial reconciliation rules.
- Legal, tax and accounting responsibilities.
- Detailed initial release priorities.

Development must not silently convert these unresolved matters into permanent business rules.

Where implementation depends on an unresolved decision, the dependency must be recorded and the affected functionality must not be treated as commercially approved. Where practical, unresolved rules must remain configurable or be deferred rather than permanently hard-coded into the system.

## 10. Scope Governance

The approved Product Vision, Platform Business Model and Store Operating Model establish the direction and operating boundaries for this document.

If a proposed feature conflicts with an approved business or operating principle, the conflict must be resolved through formal review before implementation.

This document must remain consistent with the approved product and governance specifications.

## 11. Relationship to Other Documents

This document must be read alongside:

- `PRODUCT_VISION.md`
- `PLATFORM_BUSINESS_MODEL.md`
- `STORE_OPERATING_MODEL.md`

Detailed implementation requirements belong in the relevant specifications covering architecture, identity and access, stores, operations, governance and implementation planning.

## 12. Discussion Clarification: Community Capabilities

The Store Owner Community documents describe capabilities intended for the broader future platform. Their inclusion in the documentation does not make them part of the current running application.

The following capabilities are excluded from the current project scope and retained for future consideration:

- Store-owner community spaces and discussion forums.
- Peer networking and collaboration.
- Mentorship and entrepreneur development programmes.
- Community knowledge libraries and learning resources.
- Community events and gatherings.
- Business challenges, competitions and recognition programmes.
- Community moderation and member-safety workflows.
- Community programme funding and sponsorship.
- Community-specific notifications and participation workflows.

These ideas are preserved in their existing specifications. They are deferred, not rejected or deleted. Their implementation belongs to the broader platform and requires a separate future scope decision.

Community functionality must not be confused with ordinary store operations or direct communication between platform administration and stores.

Marketing, promotional activity and operational communication remain distinct business capabilities.
