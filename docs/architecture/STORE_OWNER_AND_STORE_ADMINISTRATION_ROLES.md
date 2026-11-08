# Store Owner and Store Administration Roles

**Status:** Authoritative role specification
**Applies to:** All stores operating on the platform
**Related documents:**
- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `STORE_OWNERSHIP_HISTORY_SUCCESSION_AND_CLONING_ARCHITECTURE.md`
- `STORE_OWNER_AGREEMENT_AND_GOVERNANCE_FRAMEWORK.md`
- `STORE_OWNER_ONBOARDING_AND_STORE_LAUNCH_PROCEDURE.md`

## 1. Purpose

This document defines the roles responsible for store ownership, administration and delegated store-level management.

All store roles use the unified platform identity, role, permission and scope model. A store is an organisational scope, not a separate authentication system.

## 2. Store Owner

**Purpose:** Lead the commercial and operational direction of an assigned store.

**Responsibilities:**
- Direct the store's business activities.
- Maintain its brand identity and positioning.
- Manage authorised products, merchandising and pricing.
- Direct store marketing and creative requirements.
- Manage authorised store personnel.
- Review store performance and operational reports.
- Submit platform support and feature requests.

**Authority:**
- Store-scoped administrative permissions defined by the Store Owner agreement.
- Brand and merchandising decisions within the store's approved scope.
- Authority to assign delegated store roles where permitted.
- Access to the store's own operational, customer and financial records according to assigned permissions.

**Restrictions:**
- MUST NOT claim ownership of the parent company's platform, infrastructure or shared systems.
- MUST NOT access another store's private records.
- MUST NOT grant parent-company permissions.
- MUST NOT bypass platform-wide security, legal or commercial controls.
- MUST NOT transfer Store Owner authority outside the approved succession process.

## 3. Deputy Store Owner

**Purpose:** Support the Store Owner through explicitly delegated store authority.

**Responsibilities:**
- Assist with store administration.
- Coordinate authorised store personnel.
- Handle delegated operational decisions.
- Escalate matters reserved for the Store Owner.

**Authority:**
- Explicitly delegated store-scoped permissions.
- Access limited to the duties and duration of the assignment.

**Restrictions:**
- MUST NOT automatically inherit all Store Owner permissions.
- MUST NOT transfer ownership or appoint another Store Owner.
- MUST NOT change protected financial, legal or identity settings without separate authority.

## 4. Store Administrator

**Purpose:** Maintain the store's administrative configuration and daily platform operations.

**Responsibilities:**
- Maintain approved store information.
- Manage authorised store users and assignments.
- Coordinate store settings and operational records.
- Escalate restricted changes for approval.

**Authority:**
- Store-scoped administrative permissions explicitly assigned.
- Manage only the settings and workflows included in the assignment.

**Restrictions:**
- MUST NOT assign themselves Store Owner authority.
- MUST NOT access parent-company administration.
- MUST NOT change ownership, settlement beneficiaries or protected legal details without the required approval.

## 5. Store Finance Administrator

**Purpose:** Maintain the store's authorised financial administration records.

**Responsibilities:**
- Review store sales and settlement reports.
- Maintain supporting financial records.
- Prepare authorised reconciliation submissions.
- Escalate discrepancies.

**Authority:**
- Store-scoped financial permissions.
- Access only to financial records required for assigned duties.

**Restrictions:**
- MUST NOT release funds without separate payment authority.
- MUST NOT approve their own restricted financial submissions.
- MUST NOT access another store's financial records.

## 6. Store Catalogue Administrator

**Purpose:** Maintain the store's product catalogue and merchandising records.

**Responsibilities:**
- Create and maintain store product listings.
- Assign eligible shared catalogue products to the store.
- Maintain descriptions, images and merchandising information.
- Submit product changes for approval where required.

**Authority:**
- Store-scoped catalogue permissions.
- Edit only products and fields authorised for that store.

**Restrictions:**
- MUST NOT change another store's private catalogue configuration.
- MUST NOT change shared master product data without central authority.
- MUST NOT alter stock ownership or inventory records through catalogue permissions.

## 7. Store Marketing Administrator

**Purpose:** Coordinate the store's marketing activities and central agency requests.

**Responsibilities:**
- Submit campaign and creative requests.
- Maintain approved store marketing content.
- Coordinate publishing schedules.
- Review campaign performance reports.

**Authority:**
- Store-scoped marketing permissions.
- Submit and review requests within the Store Owner's delegated authority.

**Restrictions:**
- MUST NOT approve reserved Store Owner decisions unless explicitly delegated.
- MUST NOT access another store's marketing accounts or audience data.
- MUST NOT publish content requiring approval before approval is recorded.

## 8. Store personnel assignment

1. Every store role MUST be assigned to an identified platform user.
2. Every assignment MUST reference one store.
3. Store Owners MAY request or assign permitted personnel roles.
4. Parent-company governance controls MUST determine which assignments require central approval.
5. Store personnel MUST NOT inherit parent-company membership.
6. A person working across multiple stores MUST have a separate assignment for each store.
7. Removing a user from one store MUST NOT automatically remove unrelated assignments.
8. All assignments, changes and revocations MUST be auditable.

## 9. Store Owner succession

1. Each active store MUST have one recognised primary Store Owner at a time.
2. A pending ownership transfer MUST NOT grant the proposed successor active authority.
3. Succession MUST follow the approved verification and approval workflow.
4. Historical actions MUST remain attributed to the person who performed them.
5. Reassignment MUST preserve the store's operational history and records.
6. The parent company retains platform governance and infrastructure ownership throughout succession.

## 10. Acceptance criteria

This specification is satisfied only when:

- Store Owner authority is distinct from parent-company authority.
- Store administration roles are separately assignable.
- Every store role has an explicit store scope.
- Store Owners cannot access another store's private records by default.
- Delegated personnel cannot inherit unrestricted Store Owner authority.
- Catalogue, inventory, finance and marketing permissions remain distinct.
- Ownership transfers follow an auditable succession process.
- Historical actions remain attributed to their original actors.
