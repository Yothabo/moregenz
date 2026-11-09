# Documentation Status and Development Handover

**Organisation:** Simatu Cooperative
**Platform:** Simatu
**Repository:** `Yothabo/simatu`
**Local directory:** `~/simatu`
**Branch:** `beta`
**Last reviewed:** 10 November 2026
**Status:** Documentation review and identity remediation in progress
**Document authority:** Central record of documentation review progress, established decisions and development handover status.

---

## 1. Purpose

This document records the current state of the project's documentation and development handover.

It provides a central reference for:

- What has been reviewed.
- What has been corrected.
- What decisions have been established.
- What remains outstanding.
- Which documents are authoritative.
- Where the next documentation or development session should resume.

Documentation work must not be restarted from the beginning without a specific reason.

## 2. Current Documentation Status

The documentation review has identified inconsistencies involving:

- Organisation, platform and storefront identity.
- Current application functionality versus future platform architecture.
- Access control and administrative responsibilities.
- Store-specific product categories and catalogue ownership.
- Product lifecycle, publication and cross-store visibility.
- API, database and implementation responsibilities.

The immediate access-model corrections were previously applied.

The current working changes include identity corrections across the product catalogue, store architecture, identity and access, and product operating-model documentation.

The documentation review remains in progress. This checkpoint does not represent complete technical or business approval of every document.

The root `README.md` is the authoritative summary of the organisation, platform identity, application structure and deployment workflow.

## 3. Established Current Application Baseline

The current application operates with:

- One shared application.
- Two independent storefronts: Yotaabo and Poshies.
- One Platform Super Admin.
- One Store Admin assigned to Yotaabo.
- One Store Admin assigned to Poshies.
- Store-scoped administration.
- Backend-enforced authorisation and store boundaries.

The current application does not support:

- Employee accounts.
- Employee invitations.
- Delegated administrators.
- Employee-level permission assignment.
- Nested organisational roles or departments.
- General workforce membership management.

The Platform Super Admin controls Store Admin appointments and removals.

Each Store Admin manages operations within their assigned store.

### Catalogue architecture clarification

The intended business model and the current implementation must be reconciled before the catalogue architecture is treated as final.

The business requirement previously established is that products uploaded by either administrator should appear on both storefronts, while Yotaabo and Poshies retain separate storefront identities.

The current database migration introduces store-specific categories and product-to-store relationships.

The implications for shared products, pricing, inventory, publication and administration remain subject to explicit architectural confirmation.

Do not treat independent per-store product listings or independent commercial controls as approved requirements without confirmation.

## 4. Future Platform Architecture

The future business and platform vision remains intact.

Potential future capabilities include:

- Store employee accounts and workforce management.
- Delegated permissions and additional administrative roles.
- Parent-company leadership and departments.
- Organisational hierarchy and governance.
- Advanced permission catalogues and approval workflows.
- Multi-store expansion and onboarding.
- Centralised marketing, procurement and financial governance.
- Community, mentorship, events and business-development capabilities.

These capabilities must not be presented as implemented functionality until approved, specified and developed.

## 5. Documents Updated During the Current Review

The current working tree contains changes to the following documentation:

| Document | Review area |
|---|---|
| `docs/architecture/PRODUCT_CATALOGUE_ARCHITECTURE.md` | Catalogue architecture and identity |
| `docs/architecture/STORE_ARCHITECTURE.md` | Store architecture and identity |
| `docs/architecture/product-catalogue/PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md` | API and integration documentation |
| `docs/architecture/product-catalogue/PRODUCT_CATALOGUE_ARCHITECTURE.md` | Catalogue architecture |
| `docs/architecture/product-catalogue/PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md` | Migration and testing documentation |
| `docs/architecture/product-catalogue/PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md` | Performance and reliability |
| `docs/architecture/product-catalogue/PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md` | Security and governance |
| `docs/architecture/product-catalogue/PRODUCT_DATA_MODEL.md` | Product data model |
| `docs/architecture/product-catalogue/PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md` | Product lifecycle and administration |
| `docs/architecture/product-catalogue/PRODUCT_OWNERSHIP_AND_SHARING.md` | Product ownership and sharing |
| `docs/architecture/product-catalogue/README.md` | Catalogue documentation index |
| `docs/identity-access/IDENTITY_AND_ACCESS.md` | Identity and access |
| `docs/product/SCOPE_AND_EXCLUSIONS.md` | Product scope |
| `docs/product/STORE_OPERATING_MODEL.md` | Store operating model |

The original access-model review also covered:

- `docs/architecture/STORE_OWNER_AND_STORE_ADMINISTRATION_ROLES.md`
- `docs/architecture/UNIFIED_PLATFORM_ROLE_CATALOGUE_AND_PERMISSION_MATRIX.md`
- `docs/implementation/EMAIL_DELIVERY_AND_TEMPLATE_MANAGEMENT_STANDARDS.md`
- `docs/operations/PLATFORM_ACCESS_REVIEW_PROCEDURE.md`
- `docs/stores/STORE_ADMIN_GUIDE.md`
- `docs/stores/STORE_EMPLOYEE_GUIDE.md`
- `docs/stores/STORE_ONBOARDING_GUIDE.md`

These earlier changes are historical review records, not proof that the documents have been revalidated against the latest implementation.

## 6. Validation Status

Previously recorded automated validation:

- Unit tests: 208 passed.
- Direct PostgreSQL integration tests: 29 passed.
- Combined automated test baseline: 237 passed.
- TypeScript validation: passed.
- Production build: passed, with existing bundle-size warnings.
- `git diff --check`: passed at the earlier checkpoint.

The PostgreSQL integration tests use an isolated local test database.

Outstanding validation includes:

1. Real API-handler-to-PostgreSQL integration.
2. Authentication and administrator permission enforcement.
3. Cross-store isolation.
4. Product and category CRUD, including failure and rollback paths.
5. API latency and database query performance.
6. Concurrency and load testing.
7. Yotaabo and Poshies storefront regression testing.
8. Documentation-to-implementation reconciliation.

The recorded test results are historical baselines and must be rerun before claiming current validation.

Production database changes and production deployment require separate approval. Integration tests must use the isolated test database.

## 7. Outstanding Items

The following work remains:

1. Complete the documentation review and identify missing documents.
2. Reconcile shared-product requirements with the current store-specific catalogue implementation.
3. Verify database schema, constraints and migrations against the architecture documentation.
4. Verify API authentication, authorisation and store-scoping behaviour.
5. Review product ownership, category assignment, publication and storefront visibility.
6. Review documentation references, terminology and outdated project identity.
7. Revalidate the application and automated tests after relevant implementation changes.
8. Record unresolved decisions rather than assuming intended behaviour.

The legacy `/porschs` routes in `src/App.tsx` are temporary compatibility redirects to `/poshies`. Preserve them until legacy URL retirement is explicitly approved.

## 8. Git and Repository Handover

Current repository:

- Repository: `Yothabo/simatu`.
- Local directory: `~/simatu`.
- Active branch: `beta`.
- Production branch: `main`.
- Latest confirmed pushed commit: `8d41743d`.
- Current documentation and routing changes: under review and not yet committed.

The working tree must be inspected before staging or committing.

Do not stage or commit unrelated files. Review every changed file and run the applicable validation before requesting approval to commit.

## 9. Rules for Resuming Documentation Work

When returning to documentation:

1. Read this document first.
2. Check the current Git branch and working-tree status.
3. Compare the actual repository state against this checkpoint.
4. Review the root README and relevant architecture documents.
5. Inspect implementation and database evidence before declaring functionality complete.
6. Correct material contradictions, missing requirements, broken references and implementation mismatches.
7. Record new decisions and outstanding work in this document.
8. Avoid reopening previously settled matters without new evidence.

Architecture documents describe requirements. They do not prove implementation.

## 10. Next Development Direction

Complete the documentation and identity review before moving into further catalogue refactoring.

The immediate priorities are:

1. Finalise organisation, platform and storefront identity across the repository.
2. Restore and complete the documentation handover.
3. Resolve the shared-product catalogue requirements.
4. Reconcile architecture documents with database migrations and application code.
5. Complete the remaining integration and regression tests.

Documentation should support development without becoming a continuous blocker.

Update this document whenever a significant documentation review, business decision, architectural change or implementation milestone changes the project's documented state.

---

## Branch and Deployment Workflow

The project follows a beta-to-production release workflow.

| Branch | Purpose | Deployment |
|---|---|---|
| `beta` | Development, feature work and beta testing | Netlify |
| `main` | Approved production releases | Vercel |

### Release Process

1. Develop changes on `beta`.
2. Push changes to the beta branch.
3. Deploy and test the beta version through Netlify.
4. Resolve defects and verify functionality.
5. Merge into `main` only when the release is fully tested and approved.
6. Deploy the production release through Vercel.

The beta and production deployment pipelines remain separate.

No unfinished or unapproved beta work may be merged into `main`.

The root README describes this workflow and is the authoritative reference for the deployment arrangement.

---

**End of documentation checkpoint.**
