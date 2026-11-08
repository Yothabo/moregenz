# Database Schema and Data Modelling Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-1FE76A1956 |
| Category | Implementation |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Establish consistent standards for designing, implementing, reviewing and maintaining the platform's PostgreSQL database schema and data models.

The objective is to protect data integrity, enforce store isolation, support reliable business transactions and prevent inconsistent database design across modules.

## Scope

These standards apply to:

- PostgreSQL schemas and tables.
- Columns and data types.
- Primary and foreign keys.
- Unique and check constraints.
- Indexes.
- Relationships.
- Store ownership and attribution.
- Financial and transactional records.
- Database migrations.
- Views and database functions.
- Row-level security.
- Data lifecycle and retention.

## Modelling Principles

Database design must reflect actual business concepts and relationships.

Prefer explicit ownership and relationships over assumptions embedded in application code.

Use database constraints to enforce important integrity rules wherever practical.

Avoid duplicated authoritative data.

Separate source information from store-specific commercial and operational information.

Preserve historical transaction facts when current business information changes.

## Naming Conventions

Use consistent, descriptive and unambiguous names.

Database object naming must be consistent across modules.

Recommended conventions:

- Use `snake_case` for tables and columns.
- Use descriptive table names.
- Use explicit foreign-key column names.
- Use consistent primary-key naming.
- Avoid unexplained abbreviations.
- Avoid reserved SQL keywords.
- Keep names stable once used by production consumers.

Final naming conventions must be applied consistently across the existing database.

## Table Design

Each table must represent a clearly defined entity, relationship or business record.

A table should have:

- A documented purpose.
- A defined ownership boundary.
- A primary key.
- Appropriate constraints.
- Appropriate indexes.
- A clear lifecycle.
- Defined relationships.
- Appropriate audit or timestamp fields.

Avoid tables that combine unrelated business concepts.

Avoid creating separate tables solely to duplicate existing information without a defined requirement.

## Primary Keys

Every entity table must have a stable primary key.

Primary keys must not depend on editable business attributes such as product names, email addresses or store display names.

Use a consistent identifier strategy across related modules.

Identifier format and generation strategy remain subject to the platform's database decisions.

## Foreign Keys

Use foreign keys to enforce valid relationships.

Foreign keys must reference the correct authoritative entity.

Where store ownership is relevant, relationships must prevent records from referencing entities belonging to another store.

Application-level checks must not be the only protection for critical relational integrity.

## Store-Scoped Referential Integrity

Store-owned records must maintain valid store relationships.

Where a record references another store-owned record, the database design should enforce matching store ownership through appropriate composite constraints or equivalent mechanisms.

A valid identifier alone does not prove that a related record belongs to the same store.

Platform-owned records and global shared records must be modelled explicitly rather than treated as belonging to an arbitrary store.

## Unique Constraints

Use database uniqueness constraints for rules that must remain true under concurrent operations.

Examples include:

- Store-specific product listing identifiers.
- Store-specific SKU values where applicable.
- Store-specific configuration keys.
- Membership relationships.
- Other business identifiers whose uniqueness scope is defined.

Uniqueness scope must be documented.

Do not assume that a value must be globally unique when the business rule is store-specific.

## Data Types

Choose PostgreSQL data types according to the meaning and expected range of the data.

Avoid storing structured or numeric information as arbitrary text when a suitable type exists.

Use appropriate types for:

- Identifiers.
- Dates and timestamps.
- Boolean values.
- Monetary amounts.
- Quantities.
- Status values.
- Structured metadata.

Avoid ambiguous representations that require repeated application-level interpretation.

## Monetary Values and Currency

Financial values must use exact numeric representations suitable for monetary calculations.

Do not use floating-point types for authoritative monetary amounts.

Currency must be represented explicitly where a transaction or financial record requires it.

The system must not assume that all stores, providers or future transactions use one currency.

Historical financial records must preserve the relevant currency and transaction amounts.

Rounding rules must be defined consistently with the applicable financial operation.

## Quantity and Measurement

Inventory quantities must use appropriate numeric precision for the products and units supported.

The system must not assume every product is measured in whole units.

Unit of measure must be explicit where relevant.

Conversions must be controlled and documented.

## Date and Time

Store timestamps using a consistent timezone-aware strategy.

Use UTC for authoritative system timestamps where appropriate.

Present timestamps to users in the relevant local timezone.

Business dates must be distinguished from timestamps when they represent different concepts.

Do not infer a business date solely from a server's local timezone.

## Nullability and Defaults

Every column must have an intentional nullability rule.

Use `NOT NULL` when a value is required for a valid record.

Use nullable fields only when the business meaning permits the absence of a value.

Defaults must represent genuine business or technical defaults.

Do not introduce arbitrary defaults that conceal missing information or create unintended business behaviour.

## Status Fields and Lifecycle

Status values must represent defined business states.

Avoid inconsistent free-text status values.

Use controlled values or an appropriate relational model.

Define valid state transitions in the relevant business module.

A database status change must not bypass required business validation or authorisation.

## Timestamps and Audit Fields

Use consistent creation and modification timestamps where appropriate.

Historical business records may require additional event or approval timestamps.

Do not treat `updated_at` as a complete audit history.

Material changes to sensitive or financial records must have appropriate audit records.

## Soft Deletion and Archiving

Soft deletion must not be used automatically for every table.

Choose lifecycle handling according to the business meaning, legal requirements and retention obligations.

Where records must remain available for historical or financial purposes, use an appropriate archival, deactivation or retention approach.

Deletion and anonymisation must follow the applicable data governance requirements.

## Product and Catalogue Modelling

Product source information must remain distinct from store-specific listings.

The model must distinguish:

- Product ownership.
- Product identity.
- Descriptive source information.
- Product variants.
- Store availability.
- Store-specific pricing.
- Store-specific SKU values where applicable.
- Store-specific inventory.
- Store listing status.

A store listing must not become the authoritative owner of another party's source product information.

## Inventory Modelling

Inventory must be independently attributable to a store.

Inventory records must identify the relevant product or variant and, where applicable, stock location.

Stock movements must be represented as traceable business events.

Reservations, transfers, adjustments and counts must preserve their history.

Do not represent inventory solely as an editable number without the required movement and reconciliation records.

## Commerce and Historical Snapshots

Orders and related transaction records must preserve the relevant facts from the time of the transaction.

Changes to current product names, descriptions, prices or store configuration must not silently rewrite historical order details.

Use transaction snapshots where required by the commerce architecture.

Financial and payment records must maintain their own appropriate lifecycle and audit requirements.

## Customer Data

Customer records must follow the approved customer ownership and privacy model.

Store-scoped customer relationships must be enforced.

Cross-store customer identity must not be assumed.

Personal information must be minimised and protected according to its classification.

## Financial Data

Platform and store financial records must remain separately attributable.

Financial modelling must distinguish transactions, balances, adjustments, obligations, settlements and supporting evidence where applicable.

Avoid treating a mutable balance field as the only authoritative financial record.

Financial corrections must preserve the original record and appropriate adjustment history.

## Indexes

Indexes must support actual query patterns and relationship constraints.

Consider indexes for:

- Foreign keys.
- Store-scoped lookups.
- Frequently queried business identifiers.
- Common filtering and sorting operations.
- Time-based operational queries.

Avoid unnecessary indexes that increase write cost and storage usage.

Review query plans and production performance before adding or removing significant indexes.

## Check Constraints

Use database check constraints for stable rules that can be reliably expressed at database level.

Examples include valid numeric ranges and required relationships between simple column values.

Complex business workflows should remain in the appropriate application service while critical integrity rules are enforced at the database boundary where practical.

## Transactions and Concurrency

Related database changes must use transactions where partial completion would create inconsistent state.

Concurrent operations must be considered for:

- Inventory reservations.
- Stock adjustments.
- Order placement.
- Payment processing.
- Financial adjustments.
- Unique identifier allocation.

Use appropriate locking, constraints or concurrency controls.

Do not assume that application-level checks alone prevent race conditions.

## JSON and Flexible Metadata

Use JSONB only where flexible structured data provides a genuine benefit.

Do not use JSONB to avoid modelling stable relational business concepts.

Validate JSON structures and define ownership of their contents.

Sensitive credentials and privileged secrets must not be stored as ordinary frontend-readable metadata.

## Row-Level Security

Where PostgreSQL Row-Level Security is used, policies must enforce the approved access model.

Policies must be tested for both permitted and denied access.

A missing store context must not result in unrestricted access.

Administrative and service-level database access must use appropriately controlled roles.

RLS must complement, not replace, application-level authorisation and business validation.

## Database Migrations

Every schema change must be introduced through a version-controlled migration.

Migrations must be:

- Reviewable.
- Ordered.
- Repeatable where the migration framework requires it.
- Tested against representative data.
- Assessed for locking and performance impact.
- Safe for the deployment sequence.
- Documented where operational risk is material.

Do not rely on undocumented manual production schema changes.

## Destructive Changes

Destructive migrations require additional review.

Before removing or transforming production data:

- Confirm the intended outcome.
- Identify dependent application versions.
- Confirm a recent recoverable backup.
- Assess the rollback strategy.
- Verify the migration against representative data.
- Plan the deployment sequence.
- Preserve required historical records.

Use staged changes when application and database versions must coexist during deployment.

## Database Access

Direct database administration must follow `DATABASE_OPERATIONS_GUIDE.md`.

Local development connection settings should be loaded from the repository's `.env` configuration.

Use `psql` for direct PostgreSQL access and administration.

Do not hard-code credentials or commit `.env` files.

Production database access must be restricted and use approved credentials.

## Data Integrity Testing

Tests must cover:

- Primary-key uniqueness.
- Foreign-key validity.
- Store-scoped relationships.
- Unique constraints.
- Required fields.
- Valid status values.
- Monetary precision.
- Transaction consistency.
- Concurrent writes.
- Migration correctness.
- Deletion and retention behaviour.
- RLS access boundaries where implemented.

## Schema Documentation

Document material entities and relationships.

Schema documentation should explain:

- Business purpose.
- Ownership.
- Store scope.
- Important relationships.
- Constraints.
- Lifecycle.
- Sensitive data classification.
- Relevant migration history.

Keep documentation consistent with the actual database implementation.

## Prohibited Practices

The following practices are prohibited:

- Removing integrity constraints to make invalid writes succeed.
- Using another store's identifier to bypass isolation.
- Storing monetary values as floating-point numbers.
- Relying only on frontend validation.
- Performing undocumented production schema changes.
- Rewriting historical transaction facts without an authorised correction process.
- Storing privileged secrets in public configuration.
- Introducing unexplained nullable fields or arbitrary defaults.
- Creating duplicate authoritative records without a defined ownership model.

## Open Decisions

The following require further technical agreement:

- Primary-key generation strategy.
- Database naming conventions where existing conventions differ.
- PostgreSQL schema and module organisation.
- Migration framework and deployment ownership.
- RLS implementation boundaries.
- Audit-field conventions.
- Standard handling of soft deletion and archival.
- Database role and privilege structure.
- Data partitioning requirements as platform scale increases.

## Relationship to Other Documents

This document should be read with:

- `DATA_ARCHITECTURE.md`
- `DATABASE_OPERATIONS_GUIDE.md`
- `BACKEND_DEVELOPMENT_GUIDE.md`
- `MIGRATION_PLAN.md`
- `DATA_IMPORT_EXPORT_AND_PORTABILITY_STANDARDS.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`
- `DATA_GOVERNANCE.md`
- `docs/architecture/PRODUCT_CATALOGUE_ARCHITECTURE.md`
- `docs/architecture/INVENTORY_ARCHITECTURE.md`
- `docs/architecture/COMMERCE_ARCHITECTURE.md`
- `docs/architecture/FINANCE_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to database modelling standards must be assessed for their effect on data integrity, store isolation, financial accuracy, historical records and operational reliability.
