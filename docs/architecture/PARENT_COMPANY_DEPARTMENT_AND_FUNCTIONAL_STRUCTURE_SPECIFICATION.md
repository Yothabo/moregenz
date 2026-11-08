# Parent Company Department and Functional Structure

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-649B5E9027 |
| Category | Architecture |
| Version | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** Authoritative organisational specification
**Applies to:** Parent company and its shared-service functions

## 1. Purpose

This document defines the parent company's departments, functional responsibilities and reporting structure.

It establishes organisational ownership of work. Role permissions and access remain governed by:

- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md`
- `UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`

A department defines responsibility. It does not independently grant system permissions.

## 2. Executive governance

The CEO / Managing Director is accountable for overall company direction, governance and performance.

Executive Operations coordinates implementation across departments where that function is appointed.

Department Heads remain accountable for their respective departmental outcomes.

## 3. Department structure

### 3.1 Executive and Corporate Governance

**Purpose:** Direct company strategy and organisational accountability.

**Functions:**
- Corporate strategy and planning.
- Executive decision-making.
- Organisational performance oversight.
- Corporate governance.
- Strategic partnerships.

### 3.2 Finance and Accounting

**Purpose:** Maintain financial integrity and financial management.

**Functions:**
- Accounting and bookkeeping.
- Budgeting and financial planning.
- Payment administration.
- Store-owner settlements.
- Financial reporting and reconciliation.
- Financial controls.

### 3.3 Legal, Compliance and Risk

**Purpose:** Protect the company through legal oversight and risk governance.

**Functions:**
- Contract administration.
- Legal coordination.
- Regulatory compliance.
- Enterprise risk management.
- Internal control oversight.
- Audit coordination.

### 3.4 Technology and Engineering

**Purpose:** Build and maintain the shared digital platform.

**Functions:**
- Software engineering.
- System architecture.
- Database management.
- Infrastructure and DevOps.
- Quality assurance.
- Technical integrations.
- Platform maintenance.

### 3.5 Information Security

**Purpose:** Protect platform systems, identities and information.

**Functions:**
- Identity and access governance.
- Security monitoring.
- Vulnerability management.
- Incident response.
- Security assessments.
- Security policy enforcement.

Information Security MUST retain appropriate independence from the teams whose controls it reviews.

### 3.6 Marketing and Growth

**Purpose:** Develop the parent company's market presence and support store growth.

**Functions:**
- Marketing strategy.
- Digital advertising.
- Campaign management.
- Social media.
- Growth experiments.
- Marketing analytics.
- Customer acquisition initiatives.

### 3.7 Creative and Media Production

**Purpose:** Produce professional creative assets for the parent company and participating stores.

**Functions:**
- Brand design.
- Product photography.
- Video production.
- Graphic design.
- Copywriting.
- Media editing.
- Creative quality assurance.

Creative production MUST follow the central technical standards while respecting each Store Owner's approved creative direction.

### 3.8 Store Success and Business Development

**Purpose:** Recruit, onboard and support entrepreneurs operating through the platform.

**Functions:**
- Business recruitment.
- Applicant assessment.
- Store onboarding.
- Store-owner relationship management.
- Business development.
- Store performance support.
- Retention and growth coordination.

### 3.9 Platform Operations and Customer Support

**Purpose:** Coordinate platform operations and service delivery.

**Functions:**
- Technical support coordination.
- Store-owner support.
- Customer support coordination.
- Incident escalation.
- Service-level monitoring.
- Operational documentation.

## 4. Shared-service relationship with stores

The parent company provides shared infrastructure and services to participating stores.

These services MAY include:
- Technology and platform infrastructure.
- Marketing and advertising services.
- Creative production.
- Financial administration.
- Compliance guidance.
- Operational support.

Providing a service MUST NOT transfer ownership of the store's brand, customer relationships, commercial identity or business decisions to the parent company.

Store-specific services MUST have an identifiable requesting store, responsible Store Owner, authorised service scope and applicable approval record.

## 5. Department boundaries

1. Each department MUST have a defined functional owner.
2. Work crossing departments MUST identify the responsible originating department and participating departments.
3. Shared responsibilities MUST have an explicitly assigned accountable owner.
4. Departments MUST NOT independently create competing authority over the same controlled resource.
5. Legal, financial and security controls MUST remain independently enforceable.
6. Store Owners MUST NOT become parent-company department members merely because they use shared services.
7. Department membership MUST NOT automatically grant access to every store.

## 6. Organisational units and teams

A department MAY contain teams and functional units.

Each unit MUST have:
- A unique identifier.
- A parent organisational unit.
- A defined purpose.
- An accountable lead.
- An active status.
- An approved reporting relationship.

Teams MAY be created or reorganised without changing historical records or silently transferring permissions.

## 7. Platform representation

The platform MUST represent departments, teams and stores as distinct organisational units.

Organisational membership, job position, role assignment and permission scope MUST remain separate records.

A user MAY belong to multiple organisational units where approved.

Department dashboards MUST display only information authorised for the user's active assignments.

## 8. Acceptance criteria

This specification is satisfied only when:

- All departments have defined functional responsibilities.
- Each department has an accountable leadership position.
- Teams can be represented as subordinate organisational units.
- Cross-department work has identifiable accountability.
- Shared services retain clear boundaries with store operations.
- Department membership does not automatically grant store access.
- Organisational restructuring preserves historical attribution.
- Access continues to be enforced through the unified RBAC model.
