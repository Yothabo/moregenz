# Unified Organisational Reporting and Management Dashboard Specification

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-DBF0E53AB9 |
| Category | Architecture |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This specification defines the reporting and management dashboard architecture for the parent company, departments, teams and stores.

The platform MUST use one reporting framework with scope-aware access.

Reports MUST reflect authoritative platform records. Dashboards MUST NOT become independent sources of organisational or financial truth.

## 2. Reporting Principles

The reporting system MUST:

- Use authoritative operational and organisational data.
- Enforce the unified permission and scope model.
- Preserve parent-company and store data boundaries.
- Distinguish live operational data from historical snapshots.
- Display reporting periods and data freshness.
- Identify incomplete or unavailable data.
- Preserve source references for important figures.
- Record authorised exports.

A user's job title MUST NOT automatically determine dashboard access.

## 3. Dashboard Audiences

### 3.1 Parent-Company Executives

May access approved consolidated reporting covering:
- Organisational performance.
- Department performance.
- Store portfolio performance.
- Financial summaries.
- Operational risks.
- Shared-service performance.
- Growth and marketing performance.

Detailed store records require additional permissions.

### 3.2 Department Heads

May access reporting for:
- Their department.
- Authorised teams.
- Assigned service relationships.
- Approved departmental budgets and targets.
- Department workload and performance.

Department access MUST NOT automatically expose unrelated store records.

### 3.3 Team Leads

May access authorised team workload, assignments, service performance and operational results.

### 3.4 Store Owners

May access their store's:
- Sales and order summaries.
- Revenue and settlement information.
- Product and inventory performance.
- Customer activity within authorised scope.
- Marketing performance.
- Service requests.
- Store operational history.

Store Owners MUST NOT automatically access another store's private reports.

### 3.5 Finance, Compliance and Audit Personnel

May access reports within their assigned financial, legal, compliance or audit responsibilities.

Sensitive records MUST remain restricted to explicitly authorised scopes.

## 4. Reporting Domains

The reporting framework MUST support:

- Organisation and workforce.
- Membership and position occupancy.
- Role assignments and access reviews.
- Authority and approval activity.
- Store performance.
- Orders and fulfilment.
- Products and catalogue activity.
- Inventory and stock movement.
- Payments and settlements.
- Marketing and campaign performance.
- Creative production workload.
- Shared-service delivery.
- Customer support.
- Security and audit activity.

Each domain MUST have an identified data owner.

## 5. Metric Definitions

Every published metric MUST have a documented definition containing:

- Metric ID and name.
- Business meaning.
- Calculation method.
- Source entities.
- Applicable organisational scope.
- Reporting period.
- Currency or unit, where relevant.
- Update frequency.
- Data owner.
- Known limitations.

The platform MUST NOT allow departments to publish conflicting definitions under the same metric identifier.

Financial metrics MUST distinguish gross sales, refunds, fees, net revenue and settlements.

Order counts MUST distinguish placed, paid, cancelled, refunded and completed orders.

## 6. Consolidated and Store-Level Reporting

Parent-company consolidated reports MAY combine authorised store-level aggregates.

Consolidation MUST preserve the underlying store attribution.

The reporting layer MUST distinguish:
- Company-wide totals.
- Department totals.
- Individual store totals.
- Comparisons between stores.
- Shared-service performance.

Consolidated reporting MUST NOT expose private customer records or unrestricted transaction-level data.

A store comparison MUST use consistent metric definitions and reporting periods.

## 7. Data Freshness and Reconciliation

Every dashboard MUST indicate whether information is:
- Live.
- Near real-time.
- Periodically refreshed.
- Historical snapshot.
- Awaiting reconciliation.

Financial reports MUST identify unreconciled transactions and settlement differences.

Inventory reports MUST distinguish recorded stock from verified physical stock.

The platform MUST NOT present incomplete data as final reconciled results.

## 8. Filtering and Drill-Down

Authorised users MAY filter by:
- Reporting period.
- Organisational unit.
- Store.
- Department.
- Team.
- Product category.
- Order status.
- Campaign.
- Service.
- Responsible personnel.

Drill-down MUST re-evaluate permissions for the underlying records.

Permission to view an aggregate MUST NOT automatically grant permission to view individual records.

## 9. Exports and Scheduled Reports

Exports MUST use the same permission and scope checks as dashboard access.

Each export MUST record:
- Requesting user.
- Report identifier.
- Applied filters.
- Organisational scope.
- Export timestamp.
- Output format.
- Approval reference, where required.

Scheduled reports MUST revalidate recipient permissions at delivery time.

A recipient losing access MUST NOT continue receiving protected reports.

## 10. Data Quality and Exceptions

Dashboards MUST identify relevant data-quality problems, including:

- Missing required records.
- Duplicate records.
- Unreconciled payments.
- Inconsistent inventory balances.
- Incomplete organisational assignments.
- Failed integrations.
- Stale reporting data.

The platform MUST provide a route to the responsible data owner or operational workflow.

## 11. Performance and Access Controls

Reporting queries MUST be designed to avoid unnecessary exposure of operational databases.

The platform MAY use approved reporting views, materialised views or analytical storage.

Any derived dataset MUST retain its source attribution and security classification.

Row-level security and backend authorisation MUST remain effective for reporting and exports.

## 12. Audit Requirements

The platform MUST audit:
- Sensitive report access.
- Cross-store consolidated reporting.
- Financial report exports.
- Access to workforce reports.
- Privileged dashboard configuration.
- Changes to metric definitions.
- Scheduled report recipients.

## 13. Relationship With Other Specifications

This specification MUST operate with:

- UNIFIED_ORGANISATIONAL_DATA_MODEL_AND_ENTITY_RELATIONSHIPS.md
- UNIFIED_PERMISSION_EVALUATION_AND_EFFECTIVE_ACCESS_ENGINE.md
- UNIFIED_ORGANISATIONAL_AUDIT_TRAIL_AND_CHANGE_HISTORY_SPECIFICATION.md
- UNIFIED_ORGANISATIONAL_EVENTS_AND_NOTIFICATION_ARCHITECTURE.md
- PARENT_COMPANY_PERFORMANCE_MANAGEMENT_AND_KPI_FRAMEWORK.md
- PLATFORM_DATA_GOVERNANCE_AND_INFORMATION_LIFECYCLE_POLICY.md
- STORE_OWNER_REVENUE_SETTLEMENT_AND_FINANCIAL_RECONCILIATION_POLICY.md

## 14. Acceptance Criteria

Implementation is compliant only when:

- All dashboards enforce organisational scope.
- Parent-company and store reporting use consistent metric definitions.
- Store-level data remains isolated.
- Aggregate access does not imply transaction-level access.
- Financial and inventory reconciliation states are visible.
- Data freshness is clearly identified.
- Exports are permission-checked and audited.
- Scheduled reports revalidate recipient access.
- Data-quality exceptions are traceable.
- Published metrics have documented ownership and calculation rules.
