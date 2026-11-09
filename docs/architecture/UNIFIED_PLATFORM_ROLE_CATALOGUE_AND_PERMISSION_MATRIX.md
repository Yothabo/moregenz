# Unified Platform Role Catalogue and Permission Matrix

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-A63FD3DC8D |
| Category | Architecture |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose and Scope

<escape>FUTURE-STATE ARCHITECTURE: This catalogue is not the current application's assignable role list.</escape>

The current application supports one Platform Super Admin and one Store Admin for each store. The parent-company departments, specialist roles, delegated store roles and workforce structures referenced in this catalogue are proposed future capabilities. They are not available for assignment unless separately approved and implemented.

This document is the index and authority register for the proposed future platform role and permission specifications.

Its proposed future scope includes the parent company, its departments, stores, Store Owners, store personnel, contractors and platform administrators.

All specifications listed here MUST follow:

`docs/architecture/UNIFIED_PLATFORM_ORGANISATION_RBAC_AND_AUTHORITY_SPECIFICATION.md`

## 2. Authoritative Role Specifications

The role catalogue is divided into the following documents:

| Document | Subject |
|---|---|
| PARENT_COMPANY_EXECUTIVE_AND_DEPARTMENTAL_ROLES.md | Executive management and departmental roles |
| FINANCE_LEGAL_AND_COMPLIANCE_ROLES.md | Finance, legal, risk and compliance |
| TECHNOLOGY_SECURITY_AND_ADMINISTRATION_ROLES.md | Technology, security and platform administration |
| MARKETING_CREATIVE_AND_GROWTH_ROLES.md | Marketing, creative production and growth |
| STORE_OWNER_AND_STORE_ADMINISTRATION_ROLES.md | Store Owner authority and store administration |
| STORE_OPERATIONAL_AND_SUPPORT_ROLES.md | Store operations, fulfilment and customer support |
| UNIFIED_PERMISSION_AND_SCOPE_DEFINITIONS.md | Permission catalogue and organisational scopes |
| APPROVAL_AUTHORITY_AND_SEPARATION_OF_DUTIES.md | Approval rules and conflicting responsibilities |
| ROLE_ASSIGNMENT_DELEGATION_AND_ACCESS_REVIEW.md | Role lifecycle, delegation and access reviews |

## 3. Mandatory Rules

1. Parent-company and store roles MUST use one unified RBAC architecture.
2. Every role MUST have explicitly defined permissions.
3. Every permission MUST have an organisational scope.
4. Positions, roles and permissions MUST remain separate.
5. Store Owners MUST NOT receive automatic parent-company authority.
6. Parent-company employees MUST NOT receive automatic access to every store.
7. Shared-service access MUST be explicitly assigned and scoped.
8. Backend and database controls MUST enforce permissions.
9. All privileged changes MUST be auditable.
10. Domain-specific specifications MUST NOT introduce competing authorisation systems.

## 4. Document Authority

Each listed specification defines a proposed future-state subject. Its inclusion in this catalogue does not mean that the role, permission or workflow currently exists in the application.

Where specifications conflict, implementation MUST stop until the conflict is resolved.

The unified organisational and RBAC architecture remains the common foundation.

No role or permission may be implemented solely because it appears in application code.

## 5. Implementation Rule

Implementation MUST follow the approved specifications.

New roles, permissions, scopes and approval rules MUST be documented before implementation.
