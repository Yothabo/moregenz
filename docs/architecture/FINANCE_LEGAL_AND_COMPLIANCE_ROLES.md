# Finance, Legal and Compliance Roles

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-809ADF703F |
| Category | Architecture |
| Version | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** Authoritative role specification
**Applies to:** Parent company and authorised shared-service functions
**Related documents:**
- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `PARENT_COMPANY_EXECUTIVE_AND_DEPARTMENTAL_ROLES.md`

## 1. Purpose

This document defines roles responsible for financial administration, accounting, legal matters, regulatory compliance and internal control.

These roles apply across the parent company and its authorised services. Store-level financial access requires a separate store-scoped assignment.

## 2. Finance roles

### 2.1 Finance Head

**Purpose:** Lead financial management and financial control.

**Responsibilities:**
- Manage budgets, financial planning and reporting.
- Supervise finance personnel.
- Monitor company financial performance and obligations.
- Maintain financial control procedures.
- Review financial exceptions and escalations.

**Authority:**
- Department-scoped finance access.
- Approval authority within documented financial limits.
- Access to company financial reports within assigned scope.

**Restrictions:**
- MUST NOT approve transactions beyond delegated limits.
- MUST NOT independently prepare and finally approve the same controlled transaction.
- MUST NOT access store financial records without explicit store scope.

### 2.2 Accountant

**Purpose:** Maintain accurate accounting records and financial reporting.

**Responsibilities:**
- Record and reconcile financial transactions.
- Maintain journals, ledgers and supporting evidence.
- Prepare financial statements and reconciliations.
- Identify discrepancies and report exceptions.

**Authority:**
- Create and update accounting records within assigned scope.
- View supporting financial evidence required for assigned duties.

**Restrictions:**
- MUST NOT alter source transaction history to conceal discrepancies.
- MUST NOT approve their own restricted adjustments.
- MUST NOT release payments unless separately authorised.

### 2.3 Payments and Settlements Officer

**Purpose:** Administer payment processing and store-owner settlement operations.

**Responsibilities:**
- Review payment records and provider confirmations.
- Process authorised settlement instructions.
- Maintain settlement and reconciliation records.
- Investigate payment discrepancies.
- Escalate failed, disputed or suspicious transactions.

**Authority:**
- Payment and settlement workflow permissions within assigned scope.
- Access to the minimum customer and store financial information required.

**Restrictions:**
- MUST NOT independently verify and approve the same manual payment where independent verification is required.
- MUST NOT change settlement bank details without the required verification and approval.
- MUST NOT create unauthorised settlement beneficiaries or release unauthorised payments.

### 2.4 Finance Reviewer / Approver

**Purpose:** Independently review financial actions before approval.

**Responsibilities:**
- Review supporting evidence.
- Verify amounts, beneficiaries and authorisation.
- Approve, reject or return submissions.
- Record reasons for decisions.

**Authority:**
- Approval permissions limited by transaction type, amount and organisational scope.

**Restrictions:**
- MUST NOT approve an action where they are the prohibited preparer or beneficiary.
- MUST NOT exceed assigned approval limits.
- MUST NOT modify source evidence to justify approval.

## 3. Legal roles

### 3.1 Legal Head / Legal Counsel

**Purpose:** Manage legal risk and provide authorised legal oversight.

**Responsibilities:**
- Review contracts and agreements.
- Advise on legal obligations and disputes.
- Manage legal matters and external counsel.
- Review proposed policies for legal implications.

**Authority:**
- Access to legal matters assigned to the legal function.
- Draft, review and approval permissions explicitly delegated for legal documents.

**Restrictions:**
- MUST NOT make operational or financial commitments without the relevant delegated authority.
- MUST NOT expose privileged legal material to unauthorised personnel.
- MUST NOT treat access to a store's records as automatic authority to represent that Store Owner.

### 3.2 Contracts Administrator

**Purpose:** Maintain the company's contract lifecycle records.

**Responsibilities:**
- Register contracts and amendments.
- Track parties, dates, renewals and obligations.
- Maintain signed-document references.
- Notify authorised personnel of upcoming deadlines.

**Authority:**
- Create and maintain contract records within assigned scope.
- View documents authorised for administration.

**Restrictions:**
- MUST NOT execute or amend agreements without delegated signing authority.
- MUST NOT alter signed contract content.

## 4. Compliance and risk roles

### 4.1 Compliance Officer

**Purpose:** Monitor adherence to applicable laws, policies and contractual obligations.

**Responsibilities:**
- Maintain compliance registers.
- Monitor required checks and evidence.
- Record incidents and potential breaches.
- Coordinate corrective actions.
- Escalate unresolved compliance risks.

**Authority:**
- Read access to records required for assigned compliance checks.
- Create findings, cases and corrective-action requests.

**Restrictions:**
- MUST NOT erase or suppress adverse findings.
- MUST NOT grant themselves unrestricted access to unrelated confidential records.
- MUST NOT independently certify controls they are responsible for operating where independent review is required.

### 4.2 Risk Officer

**Purpose:** Coordinate enterprise and operational risk management.

**Responsibilities:**
- Maintain the risk register.
- Assess and document risk exposure.
- Track mitigation owners and deadlines.
- Escalate material risks.
- Prepare risk reports for authorised leadership.

**Authority:**
- Risk-record access within assigned organisational scope.
- Create and update assessments and mitigation records.

**Restrictions:**
- MUST NOT assume ownership of a mitigation merely by recording it.
- MUST NOT close material risks without required evidence and approval.

### 4.3 Internal Auditor

**Purpose:** Independently examine controls, records and compliance.

**Responsibilities:**
- Conduct authorised audits.
- Review evidence and control execution.
- Record findings and recommendations.
- Track remediation.
- Report independently to the designated oversight authority.

**Authority:**
- Read-only access to records within an approved audit scope.
- Create audit findings and request supporting evidence.

**Restrictions:**
- MUST NOT modify audited transactions or source records.
- MUST NOT approve the controls or transactions being independently audited.
- Audit access MUST be time-bounded and recorded.

## 5. Financial and confidential-data boundaries

1. Financial permissions MUST be separated by action, not granted as one unrestricted finance permission.
2. Viewing, preparing, verifying, approving and releasing funds are distinct capabilities.
3. Payment approval limits MUST be stored as explicit policy configuration, not inferred from job titles.
4. Store settlement records MUST remain isolated by store scope.
5. Parent-company finance personnel MUST NOT automatically gain access to every store's customer or order history.
6. Legal and compliance access MUST be limited to assigned cases, obligations and authorised organisational scopes.
7. Sensitive records MUST be audited when accessed, exported, changed or approved.
8. A user's executive position MUST NOT override these restrictions.

## 6. Acceptance criteria

This specification is satisfied only when:

- Finance, legal, compliance, risk and audit roles are separately assignable.
- Financial preparation, verification, approval and release can be controlled independently.
- Approval limits and transaction scopes are explicit.
- Store financial access requires a separate store-scoped assignment.
- Legal and compliance records have restricted access.
- Auditors cannot modify the source records they audit.
- Sensitive access and financial decisions are recorded in the audit history.
