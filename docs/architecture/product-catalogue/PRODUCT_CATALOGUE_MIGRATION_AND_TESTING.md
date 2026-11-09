# Product Catalogue Migration and Testing

**Document status:** Architecture and implementation specification
**Scope:** Existing Yotaabo catalogue, Porschs integration, and future multi-store expansion
**Implementation status:** Migration and testing requirements. Actual migration status must be established from database migrations, application code, deployment records, and test results.

## 1. Purpose

This document defines the requirements for migrating, validating, testing, and deploying the shared product catalogue architecture.

It covers:

- Existing catalogue assessment.
- Data migration planning.
- Source product identification.
- Duplicate detection.
- Store listing separation.
- Inventory isolation.
- Data integrity validation.
- API and integration testing.
- Security testing.
- Deployment.
- Post-deployment verification.
- Rollback and recovery.

The objective is to establish a reliable shared catalogue for Yotaabo and Porschs while preserving existing product information and independent store operations.

## 2. Migration principles

Migration activities must follow these principles:

1. Preserve existing valid product information.
2. Avoid unnecessary duplicate source products.
3. Do not silently discard existing data.
4. Separate source-product information from store-specific commercial data.
5. Preserve independent store listings.
6. Preserve store-specific pricing and publication state.
7. Preserve inventory ownership and history.
8. Verify permissions before enabling new administrative operations.
9. Make migration operations traceable.
10. Test migration and rollback procedures before production execution.
11. Avoid destructive changes without verified backups.
12. Distinguish planned migration work from completed migration work.

## 3. Migration scope

### 3.1 Initial scope

The initial migration concerns the shared catalogue arrangement between Yotaabo and Porschs.

The target behaviour is:

- Both stores use the same source product identity.
- An accepted product added by an authorised administrator of either store becomes available to both stores' listing workflows.
- The second store does not need to upload a duplicate product.
- Each store manages its own listing.
- Each store controls its own price and promotions.
- Each store controls its own publication status.
- Each store maintains its own inventory.

### 3.2 Exclusions

The initial migration does not automatically include:

- A complete parent-company platform rebuild.
- A new identity provider.
- A new inventory management platform.
- Centralised inventory pooling.
- Ownership transfer functionality.
- Advanced selected-store sharing.
- Dedicated search infrastructure.
- A microservices conversion.
- A separate backend for each storefront.

These remain separate future proposals unless an approved implementation decision changes the scope.

## 4. Existing system assessment

Before migration, inspect the existing application and database.

The assessment should establish:

- Existing product tables and relationships.
- Current product identifiers.
- Product creation and update behaviour.
- Existing store identifiers.
- Existing store-specific product records.
- Current pricing fields.
- Current publication fields.
- Existing inventory records.
- Variant and SKU relationships.
- Product media storage and references.
- Current API endpoints.
- Existing administrative permissions.
- Existing database constraints.
- Existing migration history.
- Existing tests and deployment configuration.

The assessment must identify the actual schema rather than assuming the conceptual model in `PRODUCT_DATA_MODEL.md` already exists.

### 4.1 Baseline capture

Capture a baseline before changing the database.

Useful baseline information includes:

- Total product count.
- Product counts by category.
- Product counts by store, where applicable.
- Duplicate candidates.
- Missing or invalid product references.
- Listing counts.
- Published listing counts.
- Inventory record counts.
- Variant and SKU counts.
- Media reference counts.
- Existing database constraint violations.

Record the date and source of the baseline.

## 5. Data mapping

Create an explicit mapping between existing records and the target conceptual model.

The mapping should identify:

| Existing information | Target conceptual responsibility |
|---|---|
| Existing product identity | Source Product |
| Product descriptive fields | Source Product or approved store override |
| Existing store reference | Store |
| Store-specific product presentation | Store Product Listing |
| Store-specific price | Store Product Listing |
| Store-specific publication state | Store Product Listing |
| Store stock quantities | Store Inventory |
| Product variations | Product Variant |
| Product identifiers | SKU or approved product reference |
| Product categories | Product Category |
| Product images | Product Media |

This mapping is conceptual.

The actual source and destination fields must be established from the existing database.

### 5.1 Field ownership assessment

Every migrated field must be assigned to an appropriate responsibility.

In particular, identify whether an existing field represents:

- Shared source data.
- Store-specific commercial data.
- Store-specific presentation.
- Inventory.
- Historical information.
- Administrative metadata.

Do not move a field into shared source-product data merely because it currently appears on a product record.

## 6. Source product identification

Migration must establish stable source-product identity.

Where multiple existing records appear to represent the same product, assess whether they are genuinely identical.

Potential matching information includes:

- Brand.
- Product name.
- Manufacturer reference.
- Barcode.
- SKU.
- Product attributes.
- Variant details.
- Product media.

### 6.1 Duplicate resolution

Duplicate candidates must be classified before consolidation.

Possible outcomes include:

- Confirmed duplicate.
- Similar but distinct product.
- Different variant of the same product.
- Insufficient information.
- Requires manual review.

Do not merge records solely because their names are similar.

When records are confirmed as duplicates, define which record becomes the canonical source product and how dependent references are migrated.

### 6.2 Reference preservation

Migration must preserve or explicitly map:

- Product identifiers.
- Listing references.
- Variant references.
- SKU references.
- Inventory references.
- Media references.
- Historical transaction references.

A migration must not leave orphaned records or silently change product identity.

## 7. Store listing migration

Existing store-specific commercial information must remain associated with the correct store.

The migration must preserve:

- Store-specific product price.
- Promotional information.
- Listing status.
- Publication status.
- Store-specific descriptions and presentation where applicable.
- Display ordering.
- Existing listing relationships.

### 7.1 Listing separation

Where the existing application stores shared product information and store-specific listing information together, migration planning must identify how those responsibilities will be separated.

The migration must not overwrite one store's commercial information with another store's values.

### 7.2 Duplicate listing protection

The migration must identify duplicate listing records.

Where the target model permits only one active listing for a source product in a store, the migration must resolve duplicates before enforcing that uniqueness rule.

Do not introduce a uniqueness constraint before confirming that existing data satisfies it.

## 8. Inventory migration

Inventory must remain associated with the correct store.

The migration must preserve:

- Store identity.
- Product or variant reference.
- Quantity on hand.
- Reserved quantity, where supported.
- Available quantity, where supported.
- Stock movement history.
- Inventory adjustment history.
- Relevant timestamps.
- Existing inventory locations, where supported.

### 8.1 Inventory reconciliation

Compare the source and migrated inventory records.

For each store, verify:

- Record counts.
- Product references.
- Variant references.
- Stock quantities.
- Reserved quantities.
- Available quantities.
- Movement history.
- Reconciliation totals.

Do not combine Yotaabo and Porschs stock quantities merely because both stores use the same source product.

## 9. Media migration

Product media migration must preserve valid references and presentation behaviour.

Assess:

- Existing storage locations.
- Public and private access rules.
- Image formats.
- File sizes.
- Missing files.
- Duplicate media.
- Product-to-media relationships.
- Variant-specific media.
- Store-specific presentation media.

If media is moved or transformed, verify that:

- Every migrated reference points to a valid object.
- Required public images remain accessible.
- Private media remains protected.
- Store-specific overrides remain associated with the correct listing.
- Failed transfers are recoverable.

Media migration must not be considered complete solely because database references were updated.

## 10. Migration execution strategy

Migration should be divided into controlled stages.

### Stage 1: Preparation

- Review the existing schema.
- Confirm migration scope.
- Capture baseline data.
- Identify duplicate candidates.
- Complete field mapping.
- Review permissions.
- Confirm backup and recovery procedures.
- Prepare migration scripts.
- Prepare validation queries.
- Review rollback procedures.

### Stage 2: Non-production migration

- Use a representative database copy.
- Execute migration scripts.
- Validate relationships.
- Review duplicate resolution.
- Compare source and destination counts.
- Test both storefronts.
- Test administrative operations.
- Test inventory isolation.
- Record migration defects.

### Stage 3: Migration approval

Before production execution, confirm:

- Migration scripts have been reviewed.
- Backups are available.
- Data mapping is approved.
- Known exceptions are documented.
- Test results are acceptable.
- Rollback is understood.
- Deployment responsibilities are assigned.

### Stage 4: Production migration

- Use the approved migration procedure.
- Control concurrent writes where required.
- Execute migration steps in the documented order.
- Record execution results.
- Stop on critical integrity failures.
- Avoid manually bypassing failed constraints.

### Stage 5: Post-migration verification

- Compare baseline and migrated data.
- Verify both stores.
- Verify listing separation.
- Verify pricing separation.
- Verify publication separation.
- Verify inventory isolation.
- Verify media delivery.
- Verify administrative permissions.
- Verify audit records.
- Monitor production behaviour.

## 11. Database migration requirements

Database migrations must be:

- Version-controlled.
- Ordered.
- Reviewable.
- Repeatable where practical.
- Tested against representative data.
- Consistent with the application's migration framework.

Migration scripts must not depend on undocumented manual database changes.

### 11.1 Constraints and indexes

Before adding constraints or indexes:

1. Identify the intended business rule.
2. Inspect existing data.
3. Resolve conflicting records.
4. Test the migration.
5. Review write and query impact.
6. Confirm rollback implications.

Examples include:

- Foreign keys.
- Required-field constraints.
- Store listing uniqueness.
- SKU uniqueness.
- Valid product status.
- Valid store references.
- Inventory relationship integrity.

Do not add constraints that silently encode unresolved business decisions.

### 11.2 Destructive changes

Destructive migrations require additional review.

Examples include:

- Dropping columns.
- Dropping tables.
- Removing product records.
- Changing identifiers.
- Rewriting historical references.
- Removing inventory records.
- Replacing media references.

Where possible, use an incremental migration approach.

Retain historical data when required by business, audit, or transaction records.

## 12. Application migration

Database changes and application changes must remain compatible throughout deployment.

Where necessary, use a staged approach:

1. Introduce compatible backend support.
2. Deploy the required database changes.
3. Migrate existing records.
4. Update administrative workflows.
5. Update storefront integrations.
6. Remove obsolete code only after verification.

The deployment order must be based on actual application dependencies.

Avoid deploying frontend changes that depend on database fields or endpoints that are not yet available.

## 13. Testing strategy

Testing must cover the conceptual model, backend implementation, store isolation, and storefront behaviour.

### 13.1 Unit tests

Unit tests should cover:

- Product validation.
- Product status transitions.
- Duplicate detection rules.
- Listing validation.
- Pricing validation.
- Eligibility checks.
- Permission evaluation.
- Variant relationships.
- Inventory calculations.
- Error handling.

### 13.2 Integration tests

Integration tests should cover:

- Database relationships.
- Catalogue search.
- Product creation.
- Product admission.
- Listing creation.
- Listing updates.
- Store-specific pricing.
- Publication changes.
- Inventory updates.
- Media references.
- Audit records.
- Transaction behaviour.

### 13.3 Cross-store isolation tests

Cross-store isolation is a critical requirement.

Tests must verify:

1. A product accepted into the shared catalogue is available to both stores' listing workflows.
2. Yotaabo can create its own listing.
3. Porschs can create its own listing.
4. Both listings reference the same source product.
5. Yotaabo pricing changes do not affect Porschs pricing.
6. Porschs pricing changes do not affect Yotaabo pricing.
7. Publishing one listing does not publish the other.
8. Unpublishing one listing does not unpublish the other.
9. Yotaabo inventory changes do not affect Porschs inventory.
10. Porschs inventory changes do not affect Yotaabo inventory.
11. Store administrators cannot access another store's restricted records.
12. Listing permissions do not bypass source-product permissions.

### 13.4 API security tests

Test:

- Missing authentication.
- Invalid authentication.
- Insufficient permissions.
- Invalid store context.
- Cross-store record access.
- Direct object reference manipulation.
- Mass assignment attempts.
- Invalid lifecycle transitions.
- Unauthorised bulk operations.
- Invalid product eligibility.
- Sensitive data exposure.

### 13.5 End-to-end tests

End-to-end tests should exercise realistic administrator and customer workflows.

Examples:

- Administrator submits a product.
- Product passes validation.
- Product is accepted into the shared catalogue.
- Both stores can find the product.
- Each store creates its own listing.
- Each store configures its own price.
- Each store publishes independently.
- Customers see only the appropriate storefront listing.
- Inventory changes remain store-specific.

Tests should cover the Yotaabo root storefront and the Porschs `/porschs` route.

## 14. Data integrity validation

After migration, perform explicit validation.

### 14.1 Record counts

Compare:

- Source product counts.
- Listing counts by store.
- Variant counts.
- SKU counts.
- Inventory record counts.
- Media reference counts.
- Historical record counts.

Any difference must be explained.

### 14.2 Relationship integrity

Check for:

- Orphaned listings.
- Orphaned variants.
- Orphaned SKUs.
- Orphaned inventory records.
- Missing media references.
- Invalid store references.
- Invalid source-product references.

### 14.3 Business rule integrity

Verify:

- Shared catalogue availability.
- Independent listings.
- Independent pricing.
- Independent publication.
- Independent inventory.
- Correct source-product authority.
- Valid lifecycle states.
- Correct store category ordering.

### 14.4 Reconciliation evidence

Retain the validation results.

Evidence should include:

- Execution date.
- Database or environment identifier.
- Validation procedure.
- Counts and totals.
- Failed checks.
- Exceptions.
- Responsible reviewer.
- Approval outcome.

## 15. Deployment and release management

Catalogue changes must follow the established application deployment process.

Before release:

- Review code changes.
- Review database migrations.
- Run relevant automated tests.
- Verify environment configuration.
- Verify API compatibility.
- Confirm backup availability.
- Confirm rollback procedures.
- Confirm deployment dependencies.

After release:

- Verify API health.
- Verify both storefronts.
- Verify administrative access.
- Verify catalogue search.
- Verify listing creation.
- Verify pricing and publication.
- Verify inventory isolation.
- Review logs and errors.
- Monitor performance.

Do not classify a release as successful solely because the build completed.

## 16. Rollback and recovery

Every production migration must have a documented recovery strategy.

The recovery plan must identify:

- The conditions requiring rollback.
- The responsible person.
- The affected application components.
- The database recovery procedure.
- The media recovery procedure.
- The treatment of writes made after migration.
- The expected service interruption.
- The verification procedure after recovery.

### 16.1 Database rollback

A migration may not always be safely reversible.

If data transformations are destructive or lossy, restoring from a verified backup may be required.

Rollback scripts must not be assumed safe merely because an `Up` migration has a corresponding `Down` method.

### 16.2 Application rollback

Application rollback must account for database compatibility.

An older application version must not be deployed against a schema it cannot safely use.

Where staged migrations are required, preserve compatibility until the rollback window has passed.

### 16.3 Recovery verification

After rollback or restoration, verify:

- Database integrity.
- Product records.
- Store listings.
- Prices.
- Publication states.
- Inventory.
- Media.
- Authentication.
- Administrative permissions.
- Both storefronts.

## 17. Operational handover

Migration completion should include an operational handover.

The handover should document:

- Actual schema changes.
- Migration identifiers.
- Deployment version.
- Known exceptions.
- Validation results.
- Outstanding defects.
- Recovery instructions.
- Monitoring requirements.
- Responsible maintainers.

Operational documentation must reflect the deployed system rather than the original migration plan.

## 18. Migration completion criteria

The migration may be classified as complete only when:

- The target catalogue structure is verified.
- Existing valid product information is preserved.
- Duplicate handling is resolved or documented.
- Store listing records are correctly associated.
- Pricing remains store-specific.
- Publication remains store-specific.
- Inventory remains store-specific.
- Media references are valid.
- Required permissions are enforced.
- Cross-store isolation tests pass.
- Both storefronts operate correctly.
- Data integrity checks pass.
- Backup and recovery procedures are verified.
- Outstanding exceptions are documented and accepted.

A successful database migration alone does not establish completion.

## 19. Current and future migration distinction

| Area | Initial scope | Future consideration |
|---|---|---|
| Existing catalogue assessment | Required | Repeated for additional stores |
| Shared Yotaabo and Porschs catalogue | Required | Expanded platform catalogue |
| Independent listings | Required | More detailed store configuration |
| Independent pricing | Required | Central commercial policy |
| Independent publication | Required | Configurable approval workflows |
| Independent inventory | Required | Multi-location inventory |
| Duplicate resolution | Required where applicable | Advanced catalogue matching |
| Source ownership migration | Only after rules are confirmed | Expanded ownership models |
| Selected-store eligibility | Not established as current functionality | Future capability |
| External catalogue imports | Not required by this migration | Future integration |
| Separate search infrastructure | Not assumed | Based on measured demand |

## 20. Open decisions

The following matters require confirmation before the relevant migration or testing work is considered complete:

1. Exact existing database schema.
2. Existing product identity and duplicate rules.
3. Existing listing structure.
4. Existing inventory relationships.
5. Source-product ownership and editing authority.
6. Source-product deletion policy.
7. Store listing uniqueness rules.
8. SKU uniqueness scope.
9. Product variant migration requirements.
10. Product media storage and migration requirements.
11. Required database constraints.
12. Migration execution window.
13. Backup and recovery requirements.
14. Rollback responsibilities.
15. Production validation procedures.
16. Required acceptance evidence.
17. Deployment dependencies.
18. Known migration exceptions.

## 21. Related documentation

- `README.md`
- `PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `PRODUCT_OWNERSHIP_AND_SHARING.md`
- `PRODUCT_DATA_MODEL.md`
- `PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md`
- `PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md`
- `PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md`
- `PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md`
- `../SYSTEM_ARCHITECTURE.md`
- `../DATA_ARCHITECTURE.md`
- `../API_ARCHITECTURE.md`
- `../STORE_ARCHITECTURE.md`
- `../INVENTORY_ARCHITECTURE.md`
- `../../product/PRODUCT_VISION.md`
- `../../product/PLATFORM_BUSINESS_MODEL.md`
- `../../product/STORE_OPERATING_MODEL.md`
- `../../product/SCOPE_AND_EXCLUSIONS.md`
- `../../governance/DECISION_REGISTER.md`
- `../../decisions/PLATFORM_DECISIONS.md`

## 22. Document maintenance

Update this document when migration scope, database structure, testing requirements, deployment procedures, or recovery requirements change.

Every completed migration or major release should record:

1. What changed.
2. Why it changed.
3. Which migration was executed.
4. Which tests were performed.
5. Which validation checks passed.
6. Which exceptions remain.
7. Whether rollback was tested or remains available.
8. Who reviewed and accepted the result.

Never report a migration, test, deployment, or recovery procedure as successful without supporting evidence.
