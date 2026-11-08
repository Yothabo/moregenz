# Platform Decision Records

## Document Control

| Field | Value |
|---|---|
| Document Type | Platform Decision Records |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-DEC-EE93AC0565 |
| Category | Architecture |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This document provides a central collection of material decisions governing the design, development, operation and growth of the multi-store platform.

It records decisions that have been explicitly established, distinguishes them from proposals and unresolved matters, and provides traceability to the relevant architecture and governance documentation.

This document works alongside the Decision Register and individual decision records.

## 2. Decision Recording Principles

- A documented requirement is not automatically an approved technical implementation decision.
- A proposed approach must remain distinguishable from an approved decision.
- Unresolved choices must remain open until the authorised decision-maker resolves them.
- Decisions must identify their scope and affected platform areas.
- Changes to approved decisions must be recorded with their rationale and impact.
- Existing production behaviour must not be changed merely because a target architecture describes a different approach.

## 3. Confirmed Platform Direction

The following decisions represent established platform direction.

### PD-001: Multi-Store Platform Model

**Status:** Confirmed

**Decision:** Build a centrally operated platform that supports multiple participating stores through shared platform infrastructure and services.

Each store retains its own operational identity, products, inventory, pricing, orders, employees, customers and financial records within the platform's defined ownership boundaries.

**Rationale:** The platform must support expansion without treating every store as a separate platform implementation.

**Related documents:**
- PRODUCT_VISION.md
- PLATFORM_BUSINESS_MODEL.md
- STORE_OPERATING_MODEL.md
- SYSTEM_ARCHITECTURE.md

### PD-002: Yotaabo as the First Participating Store

**Status:** Confirmed

**Decision:** Yotaabo will be the first participating store and will be treated according to the same store-level architecture and operational boundaries as future stores.

Yotaabo's existing production storefront and administration capabilities must be protected during migration.

**Rationale:** The platform must establish its multi-store foundation without unnecessarily disrupting the existing business.

**Related documents:**
- STORE_ARCHITECTURE.md
- MIGRATION_PLAN.md
- IMPLEMENTATION_ROADMAP.md

### PD-003: Separate Platform and Store Authority

**Status:** Confirmed

**Decision:** Platform-level authority and store-level administration must remain distinct.

The Platform Owner has platform-level Super Admin authority and separately operates Yotaabo through its Store Admin role.

Store Admins retain ordinary operational autonomy within their authorised scope.

**Rationale:** Platform oversight must not eliminate store-level responsibility or create unrestricted access to every store operation.

**Related documents:**
- IDENTITY_AND_ACCESS.md
- PLATFORM_GOVERNANCE.md
- STORE_OPERATING_MODEL.md

### PD-004: Shared Backend and Independent Storefronts

**Status:** Confirmed

**Decision:** Each participating store may have its own independently developed frontend while connecting to the shared platform backend and catalogue through authorised store-specific integration configuration.

Storefronts may have different visual identities and supported configuration, but must operate within platform-defined capabilities and security boundaries.

**Rationale:** Stores need independent public-facing experiences without requiring separate backend platforms.

**Related documents:**
- APPLICATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- STORE_ONBOARDING_GUIDE.md

### PD-005: Automatic Store Integration Package Provisioning

**Status:** Confirmed

**Decision:** Authorised store creation must automatically initiate provisioning of the store-specific integration package required for frontend development and connection to the shared platform.

The package must provide the necessary public configuration, API connection information, documentation and developer tooling.

Provisioning failures must be visible and recoverable.

**Rationale:** Store onboarding must not depend on manually assembling integration details for every new storefront.

**Related documents:**
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- IMPLEMENTATION_ROADMAP.md
- STORE_ONBOARDING_GUIDE.md

### PD-006: Public and Private Credential Separation

**Status:** Confirmed

**Decision:** Browser-based storefronts may receive only public configuration and appropriately scoped publishable identifiers.

Privileged credentials, database passwords, service-role keys and private signing secrets must remain server-side.

Backend authorisation must enforce store context and permissions independently of frontend configuration.

**Rationale:** Frontend developers must be able to integrate storefronts without receiving credentials that grant privileged platform access.

**Related documents:**
- SECURITY_ARCHITECTURE.md
- API_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md

### PD-007: Product Ownership and Store Availability Separation

**Status:** Confirmed

**Decision:** Product source ownership and descriptive information must be distinct from store-specific product availability and commercial terms.

A store's ability to list or sell a product does not automatically grant permission to edit its source identity or descriptive information.

**Rationale:** Shared catalogue capabilities must preserve ownership boundaries while allowing stores to manage their own commercial operations.

**Related documents:**
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- STORE_ARCHITECTURE.md
- DATA_ARCHITECTURE.md

### PD-008: Independent Store Inventory

**Status:** Confirmed

**Decision:** Inventory must be independently recorded and controlled for each store.

Stock transfers, reservations, adjustments and movements must be explicit and traceable.

**Rationale:** Shared catalogue products must not result in shared or ambiguous stock ownership.

**Related documents:**
- INVENTORY_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- COMMERCE_ARCHITECTURE.md

### PD-009: Incremental Migration

**Status:** Confirmed

**Decision:** Migration from the existing Yotaabo implementation to the target platform must be incremental and controlled.

Existing production routes and contracts remain authoritative until their replacements are explicitly migrated and verified.

Competing write paths must not be introduced during coexistence.

**Rationale:** Migration must protect existing operations, preserve data integrity and allow controlled recovery.

**Related documents:**
- MIGRATION_PLAN.md
- APPLICATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- DEPLOYMENT_ARCHITECTURE.md

### PD-010: Human Approval for Material Financial Assistance

**Status:** Confirmed

**Decision:** Performance measurements or automated scores must not independently approve stock assistance, capital advances, financial support, penalties or other material commercial interventions.

Such decisions require authorised human review.

**Rationale:** Performance information can support decisions but must not replace accountable financial and commercial judgement.

**Related documents:**
- FINANCE_ARCHITECTURE.md
- PERFORMANCE_ARCHITECTURE.md
- PLATFORM_GOVERNANCE.md

## 4. Open Platform Decisions

The following matters remain unresolved. Their inclusion does not constitute approval of any option.

### OPD-001: Target Database Access Strategy

**Question:** What database access approach will the target NestJS backend use?

**Areas affected:** Data architecture, API implementation, migrations, security and operations.

**Related documents:**
- DATA_ARCHITECTURE.md
- APPLICATION_ARCHITECTURE.md
- API_ARCHITECTURE.md

### OPD-002: Supabase Service Strategy

**Question:** Which Supabase services will remain part of the target architecture, and which responsibilities will move into platform-managed services?

**Areas affected:** Authentication, database access, storage, realtime services and deployment.

**Related documents:**
- SYSTEM_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- DEPLOYMENT_ARCHITECTURE.md

### OPD-003: Backend Hosting

**Question:** Which hosting environment will operate the target NestJS backend and supporting services?

**Areas affected:** Infrastructure, availability, security, deployment, cost and recovery.

**Related documents:**
- DEPLOYMENT_ARCHITECTURE.md
- OPERATIONS_ARCHITECTURE.md

### OPD-004: Frontend Hosting and Domain Provisioning

**Question:** What standard hosting and domain provisioning approach will be used for independently developed store frontends?

**Areas affected:** Store onboarding, DNS, TLS, CORS, deployment and operational support.

**Related documents:**
- DEPLOYMENT_ARCHITECTURE.md
- STORE_ARCHITECTURE.md
- STORE_ONBOARDING_GUIDE.md

### OPD-005: Authentication and Token Validation

**Question:** What authentication and token-validation strategy will the target backend use?

**Areas affected:** Identity, access control, session management, revocation and integration security.

**Related documents:**
- IDENTITY_AND_ACCESS.md
- SECURITY_ARCHITECTURE.md
- API_ARCHITECTURE.md

### OPD-006: Database Backup and Recovery Ownership

**Question:** Which services, responsibilities and recovery targets will govern production database backups and restoration?

**Areas affected:** Data protection, operations, hosting and continuity.

**Related documents:**
- DEPLOYMENT_ARCHITECTURE.md
- OPERATIONS_RUNBOOK.md
- DATA_ARCHITECTURE.md

### OPD-007: Commission and Settlement Model

**Question:** What commercial basis, rates, calculation rules and settlement arrangements will govern platform commissions?

**Areas affected:** Store agreements, finance, reporting, reconciliation and governance.

No commission rate or settlement schedule is approved by this document.

**Related documents:**
- PLATFORM_BUSINESS_MODEL.md
- FINANCE_ARCHITECTURE.md
- PLATFORM_GOVERNANCE.md

### OPD-008: Cross-Store Customer Identity

**Question:** Will customer identity remain store-scoped or support a platform-wide identity model?

**Areas affected:** Customer privacy, account management, consent, data access and reporting.

**Related documents:**
- CUSTOMER_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md

### OPD-009: Storefront Configuration Boundaries

**Question:** Which supported storefront settings and visual customisation capabilities will be exposed to participating stores?

**Areas affected:** Storefront development, administration, frontend integration and platform support.

Arbitrary code, component placement and page-composition overrides are outside the currently established direction.

**Related documents:**
- STORE_ARCHITECTURE.md
- APPLICATION_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md

## 5. Decision Approval and Maintenance

All decisions must follow the authority, approval and record-management requirements defined in:

- DECISION_REGISTER.md
- PLATFORM_GOVERNANCE.md
- ARCHITECTURE_GOVERNANCE.md

An open decision must not be implemented as an approved platform standard without the required authorisation.

When a decision is approved, its record must include the selected outcome, rationale, consequences, implementation requirements and verification conditions.

When a decision is superseded, the earlier record must remain available for historical traceability.

## 6. Document Management

This document is a working collection of platform decision records.

Its status must remain DRAFT until reviewed and approved through the applicable governance process.
