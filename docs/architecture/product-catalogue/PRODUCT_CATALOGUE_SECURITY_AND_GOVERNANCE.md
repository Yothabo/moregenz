# Product Catalogue Security and Governance

**Document status:** Architecture specification
**Scope:** Current Yotaabo and Porschs stores, with provisions for future multi-store expansion
**Implementation status:** Security and governance requirements. Actual permissions and enforcement must be verified against the live backend.

## 1. Purpose

This document defines the security and governance requirements for the shared product catalogue.

It establishes controls for:

- Product ownership and source-data authority.
- Catalogue administration.
- Store-level access.
- Listing permissions.
- Pricing and publication authority.
- Inventory isolation.
- Product eligibility.
- Administrative operations.
- Audit and accountability.
- Future multi-store governance.

The objective is to allow both stores to use a shared catalogue without giving either store unrestricted control over the other's commercial records or the shared source data.

## 2. Security principles

The catalogue security model must follow these principles:

1. Authentication and authorisation are separate controls.
2. Every sensitive operation must be authorised by the backend.
3. Store scope must be verified server-side.
4. Catalogue access does not automatically grant source-product editing authority.
5. Listing access does not grant control over another store's listing.
6. Each store's pricing, promotions, publication, and inventory remain isolated.
7. Permissions must be explicit and based on the actor's assigned authority.
8. High-impact operations require additional controls where appropriate.
9. Material administrative actions must be auditable.
10. Frontend visibility is not a security boundary.
11. The least-privilege principle applies to users, services, and integrations.
12. Future governance capabilities must not be presented as current functionality.

## 3. Security boundaries

The architecture must distinguish the following security boundaries.

### 3.1 Shared catalogue boundary

The shared catalogue contains source-product records used by participating stores.

Access to catalogue records must be separated from permission to modify those records.

A user may be authorised to:

- Search the catalogue.
- View product information.
- Submit a product.
- Create a store listing using an available product.

These permissions do not automatically grant authority to:

- Approve catalogue submissions.
- Edit source-product information.
- Change product ownership.
- Change sharing eligibility.
- Suspend a source product.
- Permanently delete a source product.

Each operation requires an explicit permission.

### 3.2 Store boundary

Each store has its own commercial and operational data.

Store-scoped data includes:

- Product listings.
- Listing status.
- Publication status.
- Prices.
- Promotions.
- Store presentation.
- Category display ordering.
- Inventory.
- Store-specific operational settings.

A user operating within one store must not access or modify another store's private records without an explicitly authorised cross-store role.

### 3.3 Public storefront boundary

Public storefront visitors may access information intended for public display.

Public access must not expose:

- Administrative product information.
- Internal catalogue notes.
- Ownership and permission records.
- Unpublished listings.
- Private pricing information.
- Another store's commercial information.
- Detailed inventory movements.
- Administrative audit records.
- Internal supplier information unless explicitly approved for publication.

## 4. Authentication

Authentication establishes the identity of an actor or service.

Protected catalogue and administrative operations must require an authenticated identity.

The authentication mechanism must be consistent with the platform identity and access architecture.

The backend must validate the authentication context for every protected operation.

The system must not trust:

- User identifiers supplied without verification.
- Store identifiers supplied without authorisation checks.
- Frontend role labels.
- Client-side permission state.
- Unverified claims in request payloads.

Public storefront operations may allow unauthenticated access where explicitly intended.

## 5. Authorisation

Authorisation determines whether an authenticated actor may perform a specific operation on a specific resource.

The system must evaluate:

- Actor identity.
- Assigned role or permission.
- Store scope.
- Target resource.
- Requested operation.
- Resource lifecycle state.
- Applicable ownership or eligibility rules.

Authorisation must be enforced by the backend.

### 5.1 Permission separation

The following permissions must be treated as separate capabilities:

- View shared catalogue.
- Search shared catalogue.
- Submit source product.
- Approve catalogue submission.
- Edit source product.
- Manage source-product variants.
- Manage source-product media.
- Change product ownership.
- Change product eligibility.
- Suspend source product.
- Retire source product.
- Permanently delete source product.
- Create store listing.
- Edit store listing.
- Manage store pricing.
- Manage store promotions.
- Publish store listing.
- Unpublish store listing.
- Archive store listing.
- Manage store inventory.
- View inventory history.

A role may contain several permissions, but the underlying operations must remain distinguishable.

### 5.2 Permission verification

The backend must verify permission at the point of operation.

A user being able to access an administrative screen does not establish that every action available on that screen is authorised.

Permission checks must also apply to:

- Direct API requests.
- Background jobs.
- Imported records.
- Internal service operations.
- External integrations.
- Automated workflows.

## 6. Source-product ownership and authority

Source-product ownership is distinct from product creation and store listing access.

The system must distinguish:

- Who submitted the product.
- Who created the source record.
- Who owns or controls the source product.
- Who approved its catalogue admission.
- Who may edit its source data.
- Who may change its eligibility.
- Who may suspend or retire it.
- Who may permanently delete it.

These concepts must not be represented by one generic creator or store identifier.

### 6.1 Current arrangement

Yotaabo and Porschs use a shared catalogue.

An authorised administrator of either store may add a valid product to that catalogue, subject to the verified backend permissions and validation rules.

Once accepted, the product becomes available to both stores' listing workflows.

This shared availability does not establish unrestricted source-product editing or deletion authority for either store.

### 6.2 Unresolved authority

The precise source-product ownership and editing rules remain unresolved unless confirmed by an approved decision and verified implementation.

This document does not assign exclusive ownership to the originating store, either store, or a central platform authority.

It also does not grant either store unrestricted source-product deletion rights.

### 6.3 Future ownership models

The broader platform may eventually support:

- Platform-owned products.
- Store-owned products.
- Products shared with selected stores.
- Products available across the platform.
- Central catalogue administration.
- Controlled ownership transfers.

These are future architectural possibilities, not confirmed current capabilities.

## 7. Store listing authority

A store controls its own listing records.

An authorised store administrator may perform the listing operations granted by the store's permission model.

These may include:

- Creating a listing.
- Editing permitted listing fields.
- Setting the store's price.
- Managing promotions.
- Configuring presentation.
- Publishing a listing.
- Unpublishing a listing.
- Archiving a listing.

The backend must prevent a store administrator from using listing operations to modify:

- Another store's listing.
- Another store's price.
- Another store's promotions.
- Another store's publication status.
- Another store's inventory.

A listing reference must not become a route to unrestricted source-product modification.

## 8. Store inventory isolation

Inventory must remain independently controlled by each store.

The security model must ensure:

- Store administrators can access only authorised inventory records.
- Stock adjustments affect only the intended store.
- Reservations are associated with the correct store.
- Inventory movements are attributable to an authorised actor or service.
- Inventory reports respect store scope.
- Cross-store stock operations require explicit authority.

A shared source product does not imply shared stock.

Future stock transfers or central inventory arrangements must have separate business rules and permissions.

## 9. Product eligibility and sharing controls

Product eligibility determines which stores may use a source product.

In the current two-store arrangement, accepted shared catalogue products are available to both Yotaabo and Porschs listing workflows.

The broader future platform may require more detailed eligibility controls.

Potential future scopes include:

- Originating-store only.
- Selected stores.
- Platform-wide availability.

Eligibility controls must be enforced by the backend.

A store must not be able to grant itself access to a restricted source product by changing a frontend field or submitting an unauthorised API request.

Changing eligibility must require explicit authority and an audit record.

## 10. Administrative operation controls

Sensitive catalogue operations require additional safeguards.

### 10.1 High-impact operations

Operations requiring particular attention include:

- Source-product deletion.
- Ownership changes.
- Sharing withdrawal.
- Catalogue suspension.
- Bulk product updates.
- Mass listing publication.
- Bulk price changes.
- Inventory corrections.
- Permission changes.

The exact approval requirements must be defined by governance policy.

Potential safeguards include:

- Explicit confirmation.
- Reason capture.
- Additional permission checks.
- Dual approval.
- Transactional execution.
- Impact assessment.
- Reversibility where practical.

These safeguards should be selected according to the risk and business impact of each operation.

### 10.2 Bulk operations

Bulk operations must not bypass individual record permissions.

The backend must validate:

- The actor's bulk-operation permission.
- The scope of affected records.
- Store ownership.
- Source-product authority.
- Eligibility.
- Valid state transitions.
- The maximum permitted operation size.

Bulk operations must provide a clear result for successful, failed, and skipped records.

## 11. Data isolation and access protection

Store isolation must be enforced at the backend and database levels where appropriate.

The system must prevent:

- Cross-store listing access.
- Cross-store pricing changes.
- Cross-store publication changes.
- Cross-store inventory access.
- Unauthorised source-product modification.
- Unauthorised ownership changes.
- Insecure direct object reference access.
- Mass assignment of protected fields.

Queries must apply store scope in the database query rather than retrieving unrestricted records and filtering them in application memory.

The system should use database constraints, service-level authorisation, and carefully scoped query patterns together.

No single frontend check should be treated as sufficient isolation.

## 12. Audit and accountability

Material catalogue and store operations must be traceable.

Audit records should identify:

- Actor.
- Action.
- Target entity.
- Entity identifier.
- Store context, where applicable.
- Timestamp.
- Outcome.
- Relevant change context.
- Approval reference, where applicable.

Audit coverage should include:

- Product creation.
- Product admission.
- Source-product changes.
- Variant changes.
- Media changes.
- Listing creation.
- Listing updates.
- Pricing changes.
- Promotion changes.
- Publication changes.
- Inventory adjustments.
- Suspension.
- Retirement.
- Deletion attempts.
- Ownership and eligibility changes.
- Permission changes.

Audit records must be protected against unauthorised modification.

The audit system must not expose sensitive information through ordinary store administration screens.

## 13. Data protection

The system must protect sensitive operational and administrative information.

Requirements include:

- Secure authentication credentials.
- Restricted administrative endpoints.
- Secure secret storage.
- Appropriate transport encryption.
- Safe error messages.
- Input validation.
- Protection against injection attacks.
- Restricted database privileges.
- Controlled media access.
- Appropriate retention policies.
- Minimal logging of personal or sensitive data.

Secrets must not be committed to source control or exposed through public storefront responses.

Public and private credentials must remain separated according to the platform security architecture.

## 14. Service and integration permissions

Internal services and external integrations must have explicit access boundaries.

A service must receive only the permissions necessary for its responsibility.

Examples include:

- Storefront read access.
- Catalogue import access.
- Inventory update access.
- Product media management.
- Reporting access.

A public storefront credential must not grant administrative catalogue access.

Background jobs must not automatically receive unrestricted access simply because they execute on the server.

Integration credentials must be revocable and managed through the approved secret-management process.

## 15. Security testing

Security testing must verify both allowed and denied operations.

Required scenarios include:

### 15.1 Catalogue access

- An authorised administrator can search the shared catalogue.
- An unauthorised actor cannot access protected catalogue operations.
- An administrator cannot edit source fields without the required permission.
- A user cannot change ownership or eligibility without explicit authority.

### 15.2 Store isolation

- Yotaabo administrators can manage authorised Yotaabo listings.
- Porschs administrators can manage authorised Porschs listings.
- Yotaabo administrators cannot change Porschs prices through ordinary store permissions.
- Porschs administrators cannot change Yotaabo publication status.
- A store cannot access another store's private inventory.

### 15.3 Publication and pricing

- Publishing one store's listing does not publish another store's listing.
- Changing one store's price does not change the other store's price.
- Unpublishing a listing does not retire the source product.
- Invalid publication transitions are rejected.

### 15.4 Direct API access

- Changing a store identifier does not bypass authorisation.
- Guessing a record identifier does not expose another store's data.
- Protected fields cannot be modified through mass assignment.
- Unauthorised bulk operations are rejected.
- Repeated or concurrent requests do not bypass state validation.

### 15.5 Audit

- Material actions create appropriate audit records.
- Audit records identify the responsible actor.
- Unauthorised users cannot modify or delete audit history.

## 16. Governance responsibilities

Governance must define who is responsible for:

- Catalogue policy.
- Product admission.
- Source-product ownership.
- Source-product modification.
- Store listing administration.
- Store pricing.
- Inventory administration.
- Product eligibility.
- Security review.
- Permission approval.
- Audit review.
- Dispute resolution.

The current two-store arrangement does not by itself establish a complete parent-company governance hierarchy.

Any future platform authority structure must be documented and approved separately.

## 17. Decision management

Material changes to catalogue authority or store isolation must be recorded as explicit decisions.

Relevant decisions should cover:

- Product ownership.
- Product sharing.
- Source editing authority.
- Source deletion authority.
- Catalogue admission.
- Store listing permissions.
- Inventory isolation.
- Eligibility management.
- High-impact approval requirements.
- Audit retention.

Decision records should identify:

- Decision identifier.
- Status.
- Date.
- Context.
- Decision.
- Rationale.
- Consequences.
- Responsible authority.
- Related documents.
- Implementation status.

A proposed rule must not be described as approved merely because it appears in an architecture document.

## 18. Current and future governance distinction

| Area | Current requirement | Future consideration |
|---|---|---|
| Shared catalogue | Yotaabo and Porschs | Additional stores |
| Catalogue availability | Accepted products available to both stores | Configurable eligibility |
| Store listing control | Independent | More detailed delegated authority |
| Store pricing | Independent | Central commercial policy |
| Store publication | Independent | Configurable approval |
| Inventory | Independent | Controlled transfers or central inventory |
| Source-product authority | Explicit permissions required | Expanded ownership model |
| Product ownership types | Not fully settled | Platform-owned and store-owned |
| Selected-store sharing | Not established | Future capability |
| Ownership transfers | Not established | Future capability |
| Central governance hierarchy | Not established as a complete model | Parent-company governance |
| Dual approval | Subject to risk and approved policy | Expanded high-impact controls |

## 19. Open security and governance decisions

The following matters remain subject to confirmation:

1. Who owns or controls shared source-product records?
2. Who may edit source-product information?
3. Who may permanently delete a source product?
4. Who may approve catalogue admission?
5. Who may suspend or retire a source product?
6. Who controls product eligibility?
7. Which source fields may be overridden by stores?
8. Which administrative actions require dual approval?
9. What are the exact store administrator permissions?
10. What cross-store permissions, if any, exist?
11. What is the audit retention policy?
12. Which services may perform catalogue administration?
13. What are the rules for ownership transfer?
14. What are the rules for withdrawing product sharing?
15. What governance structure will apply to additional stores?

These decisions must be recorded in the relevant governance and decision documents.

## 20. Related documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`
- `PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md`
- `../IDENTITY_AND_ACCESS_ARCHITECTURE.md`, if present
- `../UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `../UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `../API_ARCHITECTURE.md`
- `../STORE_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../governance/PLATFORM_GOVERNANCE.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`

## 21. Document maintenance

Update this document when approved security policies, permissions, ownership rules, or governance decisions change.

Before classifying a control as implemented:

1. Verify the backend permission check.
2. Verify the database access boundary.
3. Verify the affected API operation.
4. Verify both authorised and unauthorised cases.
5. Verify audit behaviour.
6. Verify relevant automated tests.
7. Record any difference between the intended policy and the live implementation.

This document defines security and governance requirements. It does not prove that the controls described here are already implemented.
