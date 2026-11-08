# Data Import, Export and Portability Standards

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define consistent technical and operational standards for importing, exporting, transferring and migrating platform data.

Data movement must preserve ownership, accuracy, store isolation, financial integrity and applicable privacy requirements.

## Scope

These standards apply to:

- Product catalogue data.
- Product variants and SKUs.
- Store product listings.
- Inventory and stock movements.
- Orders and fulfilment records.
- Customer records.
- Financial transactions and accounting records.
- Store configuration.
- Employee and access records.
- Marketing data and consent preferences.
- Operational and audit records.
- Historical data migrated from existing systems.

## Core Principles

Data imports and exports are controlled operations.

Every operation must have an identified purpose, authorised initiator and defined scope.

Data ownership and store attribution must be preserved.

Validation must occur before imported data becomes authoritative.

Exports must not bypass normal access controls.

Sensitive information must be protected throughout processing, transfer and storage.

## Data Ownership and Scope

Before moving data, identify its authoritative owner.

Distinguish between:

- Platform-owned records.
- Store-owned records.
- Shared product source information.
- Store-specific product listings.
- Store-specific inventory.
- Store-specific customer information.
- Platform financial records.
- Store financial records.
- Historical and audit records.

A store export must not include another store's confidential data unless an explicitly authorised process permits it.

## Authorisation

Import and export permissions must be role-based and purpose-specific.

Platform-level operations require appropriate Platform Super Admin authority.

Store-level operations require the relevant Store Admin authority or specifically delegated permission.

Employees may only perform data operations within their assigned permissions.

High-risk financial, personal-information and cross-store operations require additional approval where applicable.

## Import Planning

Before an import:

- Identify the source.
- Identify the destination.
- Confirm the data owner.
- Define the records and fields included.
- Confirm the target store.
- Identify required transformations.
- Identify sensitive information.
- Establish validation rules.
- Assess duplicate and conflict risks.
- Define rollback or recovery options.

Imports must not begin until the scope and authority are clear.

## Supported Formats

Supported formats must be explicitly defined for each import type.

Common formats may include:

- CSV.
- JSON.
- Approved structured spreadsheet formats.
- Documented API payloads.

File formats must be validated before processing.

Do not assume that a file is safe or correctly structured because it has an expected extension.

## File Validation

Validate:

- File type and content.
- File size.
- Encoding.
- Required headers.
- Field types.
- Required values.
- Record counts.
- Duplicate records.
- Invalid references.
- Unexpected columns.
- Malformed or malicious content.

Reject files that cannot be processed safely.

Do not execute uploaded files, formulas or embedded scripts as part of data import.

Spreadsheet formula injection must be considered when importing or exporting CSV and spreadsheet data.

## Data Mapping and Transformation

Every import must use an explicit mapping between source and destination fields.

Transformations must be documented and repeatable.

Do not silently discard important source information.

Where a transformation changes meaning, units, currency, identifiers or ownership, record the rule and its consequences.

Preserve original source references where required for traceability.

## Store Attribution

Store-owned records must be associated with the correct authoritative store.

Store attribution must be derived from the authorised import context, not blindly accepted from an uploaded file.

Imports must not allow a Store Admin to create or modify records belonging to another store.

Cross-store imports require explicit platform authority and documented scope.

## Import Preview

Where practical, provide a preview before committing imported data.

The preview should show:

- Total records.
- Valid records.
- Rejected records.
- Duplicate records.
- Proposed changes.
- Warnings.
- Target store.
- Relevant ownership information.

The initiating user must be able to review the result before final submission.

## Import Execution

Imports must be controlled and recoverable.

For larger operations, use background processing where appropriate.

Track progress and processing status.

Avoid partial imports that leave business records inconsistent.

Use transactions or controlled batches according to the data domain and operational risk.

Do not expose partially processed records as fully active when the import has not completed successfully.

## Duplicate Handling

Define duplicate detection rules for each data type.

Do not assume that names, email addresses or product descriptions are unique identifiers.

Use authoritative identifiers and documented matching rules where available.

Potential matches that cannot be resolved safely should be flagged for review rather than automatically merged.

## Conflict Handling

Imports must define what happens when imported data conflicts with existing records.

Possible outcomes include:

- Reject the record.
- Skip the record.
- Update an authorised field.
- Create a new record.
- Require human review.

Do not overwrite authoritative records without an approved rule.

## Import Audit Records

Record relevant information for each import:

- Operation identifier.
- Initiating actor.
- Timestamp.
- Source.
- Target store or platform scope.
- Data category.
- Record counts.
- Validation results.
- Processing outcome.
- Rejected records or error references.
- Approval references where applicable.

Do not store unnecessary sensitive source data in diagnostic logs.

## Export Planning

Before an export:

- Confirm the requester.
- Verify authority.
- Identify the data owner.
- Define the purpose.
- Define the requested records.
- Confirm store scope.
- Assess personal and confidential information.
- Determine the permitted format.
- Establish secure delivery.
- Apply any required approval.

Exports must be limited to the minimum information necessary for the authorised purpose.

## Export Content

Export formats must be documented and consistent.

Where appropriate, include:

- Field names and definitions.
- Data types.
- Record identifiers.
- Store attribution.
- Currency and unit definitions.
- Date and time conventions.
- Export generation timestamp.
- Relevant relationship information.

Do not omit context that is necessary to interpret the exported records accurately.

## Customer and Personal Information

Customer data exports require appropriate identity and authority checks.

Do not expose customer records to unauthorised employees, other stores or external recipients.

Apply approved privacy, retention and data-subject procedures.

Where a request concerns personal information, follow the applicable data governance and legal review requirements.

## Financial Data Exports

Financial exports must preserve transaction references, currency, amounts, timestamps, statuses and relevant relationships.

Distinguish between:

- Original transactions.
- Refunds.
- Chargebacks.
- Adjustments.
- Fees.
- Settlements.
- Reconciliation records.
- Accounting entries.

Do not present a derived summary as a replacement for authoritative financial records.

Financial exports must not permit unauthorised alteration of historical records.

## Inventory and Catalogue Exports

Product source information, store listings and inventory must remain distinguishable.

Inventory exports must preserve store, variant, location, quantity and relevant movement references.

Product availability must not be confused with ownership.

An export must not grant another store the right to edit source product information.

## Secure Delivery

Exports containing confidential or personal information must use approved secure delivery methods.

Use access controls and expiry where supported.

Avoid sending sensitive exports through public links or unsecured channels.

Do not place confidential exports in public frontend assets or source repositories.

## Data Portability

Portability processes must preserve usable and interpretable data.

Where a store exits the platform, follow the Store Exit and Data Handover Procedure.

Portability does not automatically transfer platform-owned intellectual property, shared infrastructure credentials or another store's data.

The scope of each handover must be documented.

## Failure and Recovery

Failed imports and exports must produce a visible operational outcome.

Identify whether the operation:

- Failed before processing.
- Failed during validation.
- Partially processed.
- Completed with rejected records.
- Completed successfully.
- Requires manual reconciliation.

Retry operations must not create duplicate records or financial transactions.

Use idempotency and operation references where appropriate.

Preserve the original source and relevant evidence according to approved retention requirements.

## Data Migration

Historical migration must follow the approved Migration Plan.

Migration must preserve identifiers, relationships, ownership, store attribution and transaction history where required.

Validate source and destination record counts and material business totals.

Do not retire the source system until migration and recovery requirements have been satisfied.

## Security Requirements

Imported content must be treated as untrusted input.

Protect import and export endpoints against unauthorised access, injection, resource exhaustion and data leakage.

Apply rate limits and file-size limits appropriate to the operation.

Temporary files must be protected and removed according to approved retention rules.

Privileged database credentials must never be exposed to browser-based import or export tools.

## Testing Requirements

Test:

- Valid imports.
- Invalid file formats.
- Missing required fields.
- Duplicate records.
- Conflicting records.
- Incorrect store attribution.
- Cross-store access attempts.
- Large imports.
- Partial failures.
- Retry behaviour.
- Export permissions.
- Sensitive-data redaction.
- Financial data integrity.
- Export completeness.
- Recovery and audit records.

## Operational Monitoring

Monitor import and export volume, duration, failure rates, rejected records and processing delays.

Alert on unusual activity or repeated failures where appropriate.

Monitoring must distinguish platform-wide operations from store-specific activity.

## Open Decisions

The following require further technical agreement:

- Supported formats by data category.
- Maximum file sizes and record counts.
- Import approval thresholds.
- Export delivery mechanisms.
- Export expiry periods.
- Large-operation processing strategy.
- Standard data schemas.
- Automated duplicate detection rules.
- Store exit export package format.

## Relationship to Other Documents

This document should be read with:

- `DATABASE_OPERATIONS_GUIDE.md`
- `BACKEND_DEVELOPMENT_GUIDE.md`
- `API_DEVELOPMENT_GUIDE.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`
- `TESTING_STRATEGY.md`
- `MIGRATION_PLAN.md`
- `DATA_GOVERNANCE.md`
- `STORE_EXIT_AND_DATA_HANDOVER_PROCEDURE.md`
- `FINANCIAL_RECORDS_AND_RETENTION_POLICY.md`
- `docs/architecture/DATA_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to data import, export or portability mechanisms must be assessed for their effect on data ownership, store isolation, privacy and financial integrity.
