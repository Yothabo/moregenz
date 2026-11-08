# Data Retention, Archiving and Secure Disposal Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-6E5BEF9741 |
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
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines how platform data is retained, archived, reviewed, and securely disposed of throughout its lifecycle.

The objective is to preserve records needed for business operations, legal obligations, financial accountability, security investigations, and historical reporting while avoiding unnecessary storage of information.

## 2. Scope

This standard applies to:

- Platform and store records.
- User and access-control records.
- Customer information.
- Product and catalogue records.
- Orders and transaction records.
- Inventory and stock movement records.
- Financial and settlement records.
- Audit logs and security events.
- Support and incident records.
- Integration and webhook records.
- Application logs and operational telemetry.
- Backups, exports, archives, and analytical datasets.

It applies to production, staging, development, and other environments containing platform data.

## 3. Governance Principles

### 3.1 Purpose limitation

Data must be retained only for an identified operational, legal, security, contractual, or approved analytical purpose.

### 3.2 Minimum necessary retention

Retention periods must be justified. Data must not be kept indefinitely merely because storage is available.

### 3.3 Record integrity

Records required for financial accountability, legal review, or audit must remain protected against unauthorised alteration or deletion.

### 3.4 Store separation

Store-specific records must retain their store attribution throughout retention, archival, export, and disposal processes.

### 3.5 Controlled disposal

Deletion must follow an authorised and verifiable process.

### 3.6 Legal holds

Records subject to a legal hold, investigation, dispute, or other preservation requirement must not be disposed of until the hold is formally released.

### 3.7 Recoverability

Retention and disposal processes must account for backups, replicas, exports, and other copies of the data.

## 4. Data Ownership and Responsibilities

### 4.1 Platform Owner

The Platform Owner is responsible for:

- Approving platform retention standards.
- Assigning data owners.
- Reviewing retention schedules.
- Approving material changes to disposal rules.
- Ensuring that legal and professional advice is obtained where necessary.

### 4.2 Data owners

Data owners must:

- Identify the purpose of each data category.
- Propose and maintain retention periods.
- Identify applicable legal or contractual requirements.
- Approve authorised archival and disposal processes.
- Review exceptions and preservation requirements.

### 4.3 Platform administrators

Platform administrators may execute approved retention and disposal procedures within their authorised responsibilities.

Administrative access does not grant unrestricted authority to delete protected records.

### 4.4 Store administrators

Store administrators may manage records within their permitted store scope.

They may not independently delete platform-wide records, financial records, audit evidence, or records outside their authority.

## 5. Data Classification

Data must be classified before retention and disposal rules are assigned.

The following categories provide a baseline:

| Category | Examples | Handling |
|---|---|---|
| Operational | Application configuration, job state | Retain according to operational need |
| Customer | Contact and order-related information | Apply privacy and purpose controls |
| Commercial | Product listings, pricing, promotions | Preserve relevant business history |
| Inventory | Stock balances and movements | Preserve traceability |
| Financial | Payments, refunds, settlements, ledger entries | Apply financial retention controls |
| Security | Authentication and access events | Protect against tampering |
| Audit | Administrative actions and approvals | Preserve evidential integrity |
| Temporary | Cache entries, temporary files | Expire when no longer needed |
| Analytical | Aggregated reporting datasets | Retain according to approved purpose |

Classification must account for sensitivity, business value, access restrictions, and applicable preservation requirements.

## 6. Retention Schedule

Each retained data category must have a documented retention schedule.

The schedule must identify:

- Data category.
- Data owner.
- Business purpose.
- Applicable legal or contractual requirement.
- Retention start event.
- Retention period.
- Archive requirement.
- Disposal method.
- Legal-hold behaviour.
- Backup and replica handling.
- Review date.

Retention periods must not be invented or assumed from technical defaults.

Where South African legislation, tax rules, accounting requirements, contractual terms, or regulatory obligations apply, the relevant requirements must be confirmed with qualified legal, tax, or accounting professionals.

## 7. Retention Start Events

Retention periods must use clearly defined start events.

Possible start events include:

- Record creation.
- Transaction completion.
- Contract termination.
- Store deactivation.
- Customer relationship termination.
- Account closure.
- Resolution of a support case.
- Closure of a security incident.
- End of a financial reporting period.

The applicable event must be documented for each data category.

A retention period must not be calculated from an ambiguous or inconsistent timestamp.

## 8. Record-Specific Requirements

### 8.1 Orders

Order records must preserve the information required to understand the order lifecycle.

This may include:

- Order reference.
- Store attribution.
- Relevant product and variant details.
- Quantities.
- Prices and discounts at the time of purchase.
- Order status history.
- Fulfilment information.
- Refund and cancellation references.
- Relevant timestamps.

Historical orders must not be deleted merely because a store is suspended, deactivated, or exits the platform.

### 8.2 Financial records

Financial records must remain available for applicable accounting, reconciliation, audit, and dispute requirements.

Original transaction records must not be silently overwritten or removed.

Corrections must preserve the original record and use authorised adjustment procedures.

Financial retention periods must be confirmed through the financial governance process and applicable professional advice.

### 8.3 Inventory records

Inventory history must preserve material stock movements and adjustments.

Where a product or store listing is removed, relevant historical inventory movements must remain traceable.

A current stock balance must not replace the historical movement record.

### 8.4 Customer records

Customer information must be retained only for documented purposes.

Where personal information is no longer required, it must be deleted, anonymised, or otherwise handled according to the applicable privacy and legal requirements.

Anonymisation must be assessed to ensure that individuals cannot reasonably be re-identified using retained information.

### 8.5 Product records

Product deletion must not remove historical order information or other records needed to explain past transactions.

Where a product is no longer available, the platform should preserve the historical product details needed for operational and financial traceability.

### 8.6 Audit and security records

Audit and security records must be protected from unauthorised alteration and premature disposal.

Their retention periods must account for investigation, incident response, access review, and applicable legal requirements.

### 8.7 Logs and telemetry

Operational logs must have defined retention periods based on diagnostic, security, and monitoring requirements.

Logs must not unnecessarily contain passwords, access tokens, payment credentials, or excessive personal information.

## 9. Archiving Standards

Archiving moves records out of active operational use while preserving their required availability and integrity.

### 9.1 Archive eligibility

A record may be archived when:

- It is no longer required for routine operational processing.
- Its retention obligation remains active.
- Its archive destination is approved.
- Required access and retrieval controls are available.
- Legal holds and dependencies have been checked.

### 9.2 Archive integrity

Archived records must preserve:

- Original identifiers.
- Store attribution.
- Relevant timestamps.
- Relationships and references.
- Record provenance.
- Required status and history information.

Where records are transformed for archival, the transformation must be documented and validated.

### 9.3 Archive access

Archive access must be restricted according to the sensitivity of the data.

Retrieval of sensitive or financial archives must be authorised and auditable.

### 9.4 Archive testing

Archive processes must be tested to verify:

- Record completeness.
- Relationship preservation.
- Integrity checks.
- Retrieval capability.
- Access restrictions.
- Recovery procedures.

An archive that cannot be retrieved or verified does not satisfy the archival requirement.

## 10. Store Lifecycle and Historical Data

Store suspension, deactivation, and exit must not be treated as immediate data deletion.

### 10.1 Suspension

Suspension must preserve records needed for investigation, outstanding obligations, and possible reactivation.

### 10.2 Deactivation

Deactivation must prevent unauthorised new activity while preserving historical records according to their retention schedules.

### 10.3 Store exit

Store exit must follow the approved exit and data handover procedure.

The process must distinguish:

- Records transferred to the departing store.
- Records retained by the platform.
- Shared platform records.
- Financial and settlement records.
- Records subject to legal or contractual preservation.
- Records eligible for eventual disposal.

### 10.4 Store-specific data

Store-specific data must remain attributable to the originating store even after that store is no longer active.

## 11. Secure Disposal

Data must be disposed of when its approved retention period has expired and no preservation requirement remains.

### 11.1 Disposal authorisation

Disposal must follow an approved process.

The process must verify:

- Data ownership.
- Retention expiry.
- Legal-hold status.
- Outstanding disputes or investigations.
- Dependencies and references.
- Backup and replica implications.
- Required approval.

### 11.2 Disposal methods

The disposal method must match the storage medium and sensitivity.

Possible methods include:

- Application-level deletion.
- Database deletion under controlled procedures.
- Removal of archived objects.
- Cryptographic erasure where appropriately implemented.
- Provider-supported secure deletion.
- Expiry of temporary data under verified lifecycle rules.

Simply hiding a record or removing it from a user interface is not secure disposal.

### 11.3 Referential integrity

Disposal must not leave invalid references or corrupt related records.

Where a record must be preserved because other records depend on it, the data owner must determine an appropriate archival, anonymisation, or retention approach.

### 11.4 Disposal evidence

Material disposal activities should record:

- Authorised request or policy basis.
- Data category.
- Relevant scope.
- Approval.
- Execution date.
- Disposal method.
- Execution result.
- Exceptions or failures.

Evidence must not unnecessarily reproduce the data that was disposed of.

## 12. Backups, Replicas, and Copies

Retention and disposal rules must account for all known copies.

These may include:

- Production databases.
- Read replicas.
- Database snapshots.
- Object storage.
- Backup archives.
- Export files.
- Analytical datasets.
- Temporary processing locations.
- Third-party provider systems.

Deletion from the primary database does not automatically mean that every backup or provider copy has been deleted.

Backup expiry and recovery procedures must be documented.

Where a disposed record reappears through restoration of an older backup, the platform must apply the relevant disposal or suppression controls before restored data returns to normal use.

## 13. Third-Party Data Retention

Third-party providers must be assessed for their handling of platform data.

The assessment should consider:

- Provider retention policies.
- Backup retention.
- Data location.
- Deletion capabilities.
- Subprocessors.
- Contractual obligations.
- Incident notification.
- Data export and portability.
- Evidence of deletion where required.

Provider termination must include a review of outstanding data copies and deletion obligations.

## 14. Legal Holds and Preservation

A legal hold or formal preservation requirement suspends ordinary disposal for the records within its scope.

The hold process must identify:

- Authorising person or authority.
- Reason for preservation.
- Affected data categories.
- Relevant stores and systems.
- Date the hold begins.
- Review date.
- Release authority.

Access to preserved records must remain restricted.

A hold must not be removed merely because the ordinary retention period has expired.

Disposal may resume only after the hold is formally released and other retention obligations have been checked.

## 15. Privacy and Data Minimisation

Retention must be consistent with applicable privacy requirements, including the Protection of Personal Information Act (POPIA) where applicable.

The platform must:

- Avoid collecting unnecessary information.
- Define retention purposes.
- Restrict access to personal information.
- Remove information when retention is no longer justified.
- Use anonymisation or de-identification where appropriate.
- Maintain appropriate security safeguards.
- Handle data-subject requests through an authorised process.

Deletion or anonymisation must not unlawfully destroy records that must still be preserved.

Conflicts between deletion requests and preservation obligations require appropriate review.

## 16. Automated Retention Jobs

Automated retention and disposal jobs must be designed with safeguards.

They must:

- Use approved retention schedules.
- Apply explicit eligibility criteria.
- Respect legal holds.
- Enforce store and data-category boundaries.
- Support dry-run or preview operation where practical.
- Process records in controlled batches.
- Record execution outcomes.
- Handle retries safely.
- Avoid deleting records with unresolved dependencies.
- Alert on repeated failures.

Destructive jobs must not rely on unreviewed assumptions or broad date-based deletion queries.

Material policy changes must be reviewed before automated execution.

## 17. Monitoring and Exception Handling

Retention and disposal operations must be monitored.

The platform should detect:

- Failed archival jobs.
- Failed deletion operations.
- Unexpected record volumes.
- Records exceeding approved retention periods.
- Legal holds that are not being respected.
- Unauthorised disposal attempts.
- Backup expiry failures.
- Provider deletion failures.

Exceptions must be assigned to an owner and tracked until resolved.

Where a disposal operation partially succeeds, the remaining copies and incomplete steps must be identified.

## 18. Testing and Verification

Retention and disposal functionality must be tested before production use.

Testing should cover:

- Retention eligibility.
- Correct retention start events.
- Legal-hold enforcement.
- Store isolation.
- Referential integrity.
- Archive completeness.
- Archive retrieval.
- Backup restoration.
- Deletion verification.
- Retry and partial-failure handling.
- Audit evidence.
- Access restrictions.

Tests must use controlled data and must not cause unintended deletion of production records.

## 19. Risks and Controls

| Risk | Required control |
|---|---|
| Premature deletion | Approved schedules and eligibility checks |
| Excessive retention | Periodic retention reviews |
| Loss of financial evidence | Protected financial records and controlled disposal |
| Cross-store deletion | Server-side scope enforcement |
| Legal-hold violation | Preservation checks before disposal |
| Data restored from old backups | Post-restoration retention controls |
| Incomplete provider deletion | Third-party deletion verification |
| Broken historical references | Referential integrity checks |
| Unrecoverable archives | Retrieval and integrity testing |
| Destructive job failure | Batching, audit records, and exception handling |

## 20. Review and Maintenance

This document must be reviewed:

- When legal or regulatory requirements change.
- When new data categories are introduced.
- When storage or backup architecture changes.
- When a new third-party provider is introduced.
- When store exit or deletion procedures change.
- After a material retention or disposal incident.
- During scheduled governance reviews.

The Platform Owner is responsible for coordinating the review.

## 21. Open Decisions

The following matters require explicit decisions:

1. Approved retention periods for each data category.
2. Retention start events for financial and operational records.
3. Archive storage architecture and ownership.
4. Backup retention and expiry schedules.
5. Provider-specific deletion and verification requirements.
6. Legal-hold approval and release authority.
7. Retention requirements for customer and marketing data.
8. Disposal approval thresholds.
9. Whether archive retrieval requires additional approval.
10. How restored backups will be reconciled against completed disposal requests.

No specific retention duration should be implemented until the relevant legal, financial, operational, and contractual requirements have been confirmed.

## 22. Related Documents

- `docs/governance/DATA_GOVERNANCE.md`
- `docs/governance/DATA_QUALITY_MANAGEMENT_AND_VALIDATION_STANDARDS.md`
- `docs/governance/THIRD_PARTY_VENDOR_AND_SERVICE_PROVIDER_MANAGEMENT_POLICY.md`
- `docs/architecture/DATA_ARCHITECTURE.md`
- `docs/architecture/FINANCE_ARCHITECTURE.md`
- `docs/implementation/DATABASE_OPERATIONS_GUIDE.md`
- `docs/implementation/DATA_IMPORT_EXPORT_AND_PORTABILITY_STANDARDS.md`
- `docs/implementation/BUSINESS_CONTINUITY_AND_AVAILABILITY_STANDARDS.md`
- `docs/operations/BACKUP_AND_DISASTER_RECOVERY.md`
- `docs/operations/FINANCIAL_RECORDS_AND_RETENTION_POLICY.md`
- `docs/operations/STORE_EXIT_AND_DATA_HANDOVER_PROCEDURE.md`
- `docs/operations/STORE_SUSPENSION_AND_REACTIVATION_PROCEDURE.md`
