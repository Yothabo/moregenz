# Parent Company Executive and Departmental Roles

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-D3B13938BF |
| Category | Architecture |
| Version | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** Authoritative role specification
**Applies to:** Parent company organisation
**Related documents:**
- `UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`
- `UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`

## 1. Purpose

This document defines the standard executive and general departmental roles used by the parent company.

It establishes role responsibilities, reporting relationships, access boundaries and restrictions. It does not replace the unified platform RBAC architecture or the specialised role definitions in the other catalogue documents.

## 2. Role assignment principles

1. A position describes where a person sits in the organisation.
2. A role defines the authority and responsibilities assigned to that person.
3. A permission defines an action the person may perform.
4. A scope defines the organisational resources on which that permission applies.
5. Holding an executive or departmental title MUST NOT automatically grant unrestricted platform access.
6. Every role assignment MUST have an identified holder, scope, assigning authority and effective status.
7. A person MAY hold multiple roles where responsibilities are compatible and separation-of-duties requirements are satisfied.
8. Access MUST be enforced by backend authorisation and database policies, not merely by dashboard visibility.

## 3. Executive roles

### 3.1 Chief Executive Officer / Managing Director

**Purpose:** Provide overall leadership and accountability for the parent company.

**Responsibilities:**
- Set company strategy and approve organisational objectives.
- Appoint and supervise executive leadership.
- Approve company-wide policies and delegated authority.
- Review organisational performance, risk and financial reporting.
- Resolve escalated matters within the CEO's authorised remit.

**Authority:**
- Company-wide governance and executive decision permissions.
- Approval authority only where explicitly assigned.
- Access to company-level reports and records authorised by policy.

**Restrictions:**
- MUST NOT bypass financial controls or approval workflows.
- MUST NOT access confidential employee, customer, legal or financial records solely because of executive title.
- MUST NOT receive unrestricted access to every store's private operational data by default.

### 3.2 Executive Operations

**Purpose:** Coordinate execution of approved company strategy across departments.

**Responsibilities:**
- Coordinate departmental delivery and operational priorities.
- Monitor cross-department dependencies.
- Escalate operational risks and unresolved disputes.
- Track approved company-wide initiatives.

**Authority:**
- Access to assigned operational reports and coordination workflows.
- Cross-department access only where explicitly granted.

**Restrictions:**
- MUST NOT assume departmental ownership or approval authority without a separate assignment.
- MUST NOT override department controls or store-level authority.

## 4. General departmental roles

### 4.1 Department Head

**Purpose:** Lead an assigned department and remain accountable for its performance.

**Responsibilities:**
- Manage departmental objectives, resources and delivery.
- Assign work to authorised team members.
- Review departmental performance and risks.
- Approve departmental actions within delegated limits.
- Maintain departmental procedures and records.

**Authority:**
- Department-scoped permissions.
- Approval permissions explicitly delegated to the role.
- Access to departmental staff and operational information within scope.

**Restrictions:**
- MUST NOT access another department's restricted records by default.
- MUST NOT grant permissions beyond delegated authority.
- MUST NOT approve transactions or changes prohibited by separation-of-duties rules.

### 4.2 Team Lead

**Purpose:** Coordinate a team within an assigned department or functional unit.

**Responsibilities:**
- Allocate and monitor assigned work.
- Review task completion and quality.
- Support team members and escalate issues.
- Report progress to the Department Head.

**Authority:**
- Team-scoped operational permissions.
- Limited review and approval permissions where explicitly delegated.

**Restrictions:**
- MUST NOT exercise Department Head authority unless separately assigned.
- MUST NOT access unrelated departmental or store records.

### 4.3 Department Contributor

**Purpose:** Perform assigned departmental duties.

**Responsibilities:**
- Execute authorised tasks.
- Maintain accurate work records.
- Follow departmental procedures and security requirements.
- Escalate exceptions and incidents.

**Authority:**
- Task-specific permissions.
- Read or write access required for assigned duties.

**Restrictions:**
- MUST NOT approve their own restricted submissions where independent approval is required.
- MUST NOT manage departmental membership or permissions without separate authority.

## 5. Department and store boundaries

1. Department Head, Team Lead and Contributor access MUST be limited to their assigned organisational scope.
2. Membership in the parent company MUST NOT automatically grant membership in any store.
3. Store Owners are not parent-company department members by default.
4. Parent-company shared-service personnel may access a store only through an authorised role assignment with an explicit store scope.
5. Temporary store access MUST have an expiry or review date.
6. A person serving both the parent company and a store MUST have separate role assignments for each capacity.
7. Store-level authority MUST remain governed by the unified RBAC architecture and the dedicated store role specifications.

## 6. Reporting relationships

The default reporting structure is:

- CEO / Managing Director
  - Executive Operations, where appointed
  - Department Heads
    - Team Leads
      - Department Contributors

The company MAY define additional executive or specialist positions. Any additional position MUST have an approved reporting line and role assignment.

A reporting relationship does not automatically grant access to all records held by the person being supervised.

## 7. Dashboard and access behaviour

1. Dashboards MUST resolve available features from the user's active role assignments, permissions and scopes.
2. Hiding a dashboard feature MUST NOT be treated as access enforcement.
3. Users MUST receive only the records and actions authorised for their current scope.
4. Access changes MUST take effect when the underlying assignment changes or is revoked.
5. Restricted actions MUST be checked again by the backend when submitted.

## 8. Acceptance criteria

This specification is satisfied only when:

- Executive and departmental roles can be assigned independently of job titles.
- Each assignment has an explicit organisational scope.
- Departmental access does not automatically extend to other departments or stores.
- Store access requires a separate authorised assignment.
- Executive titles do not bypass confidential-data restrictions or approval controls.
- Dashboard visibility and backend authorisation enforce the same permission model.
- Role changes and revocations are recorded in the platform audit history.
