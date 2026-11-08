# Repository Structure and Module Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Repository Structure and Module Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-92FBDEC9DA |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide defines repository organisation and module boundaries for the Yotaabo application and the future multi-store platform.

It establishes where source code, configuration, tests, migrations, scripts and documentation should be maintained.

## 2. Scope

This guide covers:

- Repository organisation.
- Application boundaries.
- Frontend structure.
- Backend structure.
- Business modules.
- Database files.
- API implementation.
- Shared code.
- Tests.
- Scripts.
- Documentation.
- Configuration.
- Generated files.
- Repository maintenance.

## 3. Repository Principles

Repository organisation must:

- Make responsibilities easy to identify.
- Separate frontend and backend concerns.
- Keep business modules understandable.
- Avoid unnecessary nesting.
- Avoid duplicate implementations.
- Keep configuration separate from source code.
- Make tests discoverable.
- Preserve migration history.
- Keep documentation close to the relevant project area.
- Support independent storefront development.
- Avoid premature microservice separation.

## 4. Existing and Target Structure

The existing Yotaabo repository is the starting point for the migration.

Its actual directory structure must be inspected before structural changes are made.

The target platform structure described in this guide is a logical organisation standard, not a claim that all proposed directories already exist.

Existing working files must not be moved or renamed solely to match an example structure.

## 5. Repository Root

The repository root should contain the main project configuration and entry points.

Typical responsibilities include:

- Application package configuration.
- Dependency lockfiles.
- Build configuration.
- TypeScript configuration.
- Linting configuration.
- Git configuration.
- Environment examples.
- README documentation.
- Main source directories.
- Test directories.
- Database resources.
- Development scripts.

Avoid placing unrelated application source files directly in the repository root.

## 6. Frontend Organisation

Frontend source code should be organised by application responsibility.

Typical areas include:

- Application entry points.
- Pages and routes.
- Components.
- Layouts.
- API clients.
- Authentication.
- Store configuration.
- State management.
- Hooks.
- Validation.
- Styling.
- Static assets.
- Tests.

A possible logical structure is:

    src/
      app/
      components/
      pages/
      layouts/
      api/
      auth/
      stores/
      hooks/
      state/
      validation/
      styles/
      assets/

This is a reference structure. Adopt only the directories required by the actual application.

## 7. Backend Organisation

The target backend should be organised around business modules.

Each module should contain the implementation required for its responsibility.

A possible logical structure is:

    backend/
      src/
        modules/
          identity-access/
          platform-administration/
          stores/
          products/
          catalogue/
          inventory/
          commerce/
          customers/
          finance/
          activity-audit/
          performance/
          marketing/
          notifications/
          integrations/
        common/
        configuration/
        database/
        main.ts

The actual framework conventions and approved architecture take precedence over this example.

## 8. Business Module Boundaries

Each module must have a clearly defined responsibility.

### 8.1 Identity and Access

Responsible for:

- Authentication integration.
- Account status.
- Roles.
- Permissions.
- Store memberships.
- Access revocation.
- Session-related operations.

### 8.2 Platform Administration

Responsible for:

- Platform-level administration.
- Store creation.
- Platform configuration.
- Platform-wide controls.
- Store provisioning workflows.

### 8.3 Stores

Responsible for:

- Store identity.
- Store profile.
- Store lifecycle.
- Store configuration.
- Store relationships.
- Store operational status.

### 8.4 Products and Catalogue

Responsible for:

- Product source records.
- Product ownership.
- Product variants.
- Store product listings.
- Catalogue availability.
- Product media references.

Source product information and store-specific commercial listings must remain distinct.

### 8.5 Inventory

Responsible for:

- Stock balances.
- Stock movements.
- Reservations.
- Adjustments.
- Transfers.
- Stock counts.
- Inventory locations.

Inventory must remain independently attributed to each store.

### 8.6 Commerce

Responsible for:

- Carts.
- Checkout.
- Pricing validation.
- Orders.
- Payments.
- Fulfilment.
- Returns.
- Refund workflows.
- Order-related business events.

### 8.7 Customers

Responsible for:

- Customer profiles.
- Customer relationships.
- Customer preferences.
- Customer data access.
- Privacy-related workflows.

Cross-store customer identity must follow an explicitly approved model.

### 8.8 Finance

Responsible for:

- Financial records.
- Revenue and expenses.
- Receivables and payables.
- Settlements.
- Commissions.
- Financial adjustments.
- Stock and capital assistance records.
- Reconciliation.

Platform and store financial records must remain distinguishable.

### 8.9 Activity and Audit

Responsible for:

- Business activity records.
- Administrative audit events.
- Security-relevant events.
- Actor attribution.
- Change history.
- Audit retrieval.

### 8.10 Performance

Responsible for:

- Performance metrics.
- Measurement definitions.
- Store performance assessments.
- Targets.
- Comparisons.
- Review records.

Performance calculations must remain explainable.

### 8.11 Marketing

Responsible for:

- Campaigns.
- Campaign participation.
- Marketing content.
- Audience rules.
- Marketing performance.
- Consent-aware campaign execution.

### 8.12 Notifications

Responsible for:

- Notification requests.
- Templates.
- Preferences.
- Delivery processing.
- Provider integration.
- Retry and failure handling.

### 8.13 Integrations

Responsible for:

- External provider connections.
- Provider configuration.
- Webhooks.
- Credential references.
- Integration event processing.
- Provider reconciliation.

## 9. Module Independence

Modules should expose defined interfaces for other modules to use.

Avoid:

- Importing another module's private implementation.
- Duplicating business rules.
- Creating circular dependencies.
- Sharing database access without an explicit boundary.
- Allowing unrelated modules to modify owned records directly.

Cross-module operations must use approved application interfaces or business workflows.

## 10. Shared Code

Shared code should contain genuinely reusable functionality.

Examples include:

- Common types.
- Shared validation utilities.
- Standard error structures.
- Logging utilities.
- Date and currency helpers.
- Common API infrastructure.
- Reusable security utilities.

Do not place business-specific logic in a shared utility merely to make it accessible everywhere.

Shared code must not become an unrestricted dependency between modules.

## 11. Database Organisation

Database resources should be organised separately from application presentation code.

Relevant resources may include:

- Migration files.
- Database functions.
- Views.
- Constraints.
- Index definitions.
- Seed data.
- Database verification scripts.
- Database documentation.

The actual database directory structure must follow the repository's established conventions.

Database access and administration use `psql` with connection settings loaded from `.env`.

Schema changes must use version-controlled migrations.

## 12. Migration File Organisation

Migration files must:

- Follow a consistent naming convention.
- Be ordered deterministically.
- Describe their purpose.
- Be version-controlled.
- Avoid unrelated schema changes.
- Account for existing data.
- Preserve referential integrity.
- Include appropriate verification.

Do not rename or rewrite applied migrations without following the approved migration policy.

## 13. API Organisation

API implementation should be organised according to the backend framework and business module boundaries.

Keep separate responsibilities for:

- Controllers or route handlers.
- Request validation.
- Application services.
- Domain logic.
- Data access.
- Response mapping.
- Authentication and authorisation.

API contracts and documentation must be maintained alongside the relevant implementation or in the approved documentation location.

## 14. Storefront Repository Organisation

Each independently developed storefront may have its own repository or approved independent application structure.

A storefront must receive its integration configuration through the automatic store provisioning process.

Its frontend must consume the shared backend and catalogue through documented APIs.

Storefront source code must not contain privileged platform or database credentials.

The platform must not require every store to share the same frontend implementation.

## 15. Configuration Files

Configuration files should be kept in appropriate application or environment locations.

Requirements:

- Separate environment configuration from source code.
- Keep populated `.env` files out of version control.
- Provide safe examples where useful.
- Avoid duplicated configuration definitions.
- Document required variables.
- Keep private credentials server-side.
- Avoid hard-coded environment-specific URLs.

## 16. Scripts and Tooling

Scripts should be grouped by their purpose.

Possible categories include:

- Development scripts.
- Build and deployment scripts.
- Database verification.
- Migration support.
- Data migration.
- Image and asset processing.
- Repository maintenance.
- Testing and quality checks.

Scripts must have clear names and documented effects.

Destructive scripts must require deliberate execution and verify their targets.

Do not create multiple scripts that perform the same operation without a clear reason.

## 17. Test Organisation

Tests should be discoverable and associated with the code or business module they verify.

Use the appropriate testing structure for:

- Unit tests.
- Module tests.
- API tests.
- Database integration tests.
- Frontend component tests.
- End-to-end tests.
- Security tests.
- Migration tests.

Test data must not expose production customer or financial information.

## 18. Documentation Organisation

Documentation should be grouped by responsibility.

The current documentation categories are:

- `docs/architecture/`
- `docs/decisions/`
- `docs/governance/`
- `docs/identity-access/`
- `docs/implementation/`
- `docs/operations/`
- `docs/product/`
- `docs/stores/`

New documents should be placed in the existing category that best matches their primary purpose.

Avoid creating another document when the information belongs in an existing authoritative document.

## 19. Generated Files and Build Outputs

Generated files should be distinguishable from maintained source code.

Examples include:

- Build output.
- Compiled assets.
- Temporary files.
- Generated API clients.
- Coverage reports.
- Local caches.

Do not manually edit generated files unless the relevant generation process explicitly requires it.

Generated files should not be committed unless repository policy requires them.

## 20. Naming Conventions

Names should be:

- Descriptive.
- Consistent.
- Predictable.
- Appropriate to the language and framework.
- Clear about business responsibility.

Avoid vague names such as `misc`, `stuff`, `temp-final` or unexplained abbreviations.

Follow existing naming conventions when modifying an established area.

## 21. Dependency Direction

Dependencies should follow clear architectural boundaries.

In general:

- Frontends depend on published API contracts.
- API handlers depend on application services.
- Application services depend on domain and persistence interfaces.
- Business modules communicate through defined interfaces.
- Shared utilities must not depend on application-specific business modules.

Avoid dependency cycles.

## 22. Repository Changes

Before restructuring the repository:

1. Inspect the existing directory structure.
2. Identify all affected imports and references.
3. Check build and test configuration.
4. Identify deployment dependencies.
5. Assess migration impact.
6. Plan the change.
7. Apply it incrementally.
8. Verify affected functionality.

Do not perform broad directory reorganisations during unrelated feature work.

## 23. Repository Maintenance

Periodically review:

- Unused files.
- Duplicate implementations.
- Abandoned components.
- Unused dependencies.
- Obsolete scripts.
- Stale documentation.
- Temporary files.
- Generated output.
- Configuration duplication.

Remove files only after confirming they are no longer required.

## 24. Repository Security

The repository must not contain:

- Populated production `.env` files.
- Database passwords.
- Private signing secrets.
- Provider secret keys.
- Authentication tokens.
- Unauthorised personal data.
- Private backups.
- Unrestricted production exports.

Review staged changes before committing.

## 25. Repository Review Checklist

Before accepting a structural change, verify:

- [ ] Files are in appropriate locations.
- [ ] Module boundaries remain clear.
- [ ] No unnecessary duplicate implementation was introduced.
- [ ] Imports and references are valid.
- [ ] Configuration remains environment-specific.
- [ ] Secrets are not included.
- [ ] Tests remain discoverable.
- [ ] Migration history is preserved.
- [ ] Build and deployment configuration remain valid.
- [ ] Documentation reflects the actual structure.

## 26. Open Repository Decisions

The following require formal definition:

- Final monorepo or multi-repository strategy.
- Final backend module directory structure.
- Shared frontend component strategy.
- Shared package organisation.
- API client generation approach.
- Database resource organisation.
- Test directory conventions.
- Generated file commit policy.
- Repository ownership and permissions.
- Storefront repository provisioning approach.

## 27. Relationship to Other Documents

This guide must be read alongside:

- SYSTEM_ARCHITECTURE.md
- APPLICATION_ARCHITECTURE.md
- DATA_ARCHITECTURE.md
- API_ARCHITECTURE.md
- DEVELOPMENT_STANDARDS.md
- FRONTEND_DEVELOPMENT_GUIDE.md
- BACKEND_DEVELOPMENT_GUIDE.md
- API_DEVELOPMENT_GUIDE.md
- DATABASE_OPERATIONS_GUIDE.md
- LOCAL_DEVELOPMENT_GUIDE.md
- ENVIRONMENT_AND_CONFIGURATION_GUIDE.md
- TESTING_STRATEGY.md
- IMPLEMENTATION_ROADMAP.md
- MIGRATION_PLAN.md

## 28. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant developers.
