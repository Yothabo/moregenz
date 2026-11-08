# Development Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-EA07E3A07C |
| Category | Implementation |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


| Document Control | Details |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines the development standards, coding practices, repository conventions and engineering workflows for the multi-store platform.

It establishes a consistent approach to writing, modifying, testing, reviewing and maintaining application code across the platform.

The standards apply to the shared backend, independently developed store frontends, platform administration interfaces, integrations, database changes, automated processes and supporting development tools.

The existing Yotaabo application remains an operational baseline. Development standards must support its controlled evolution without introducing unnecessary disruption to existing storefront and administrative functionality.

## 2. Development Objectives

Development practices must:

- Produce maintainable, readable and testable code.
- Protect existing application behaviour during incremental changes.
- Enforce store isolation and server-side authorisation.
- Maintain clear boundaries between application modules.
- Preserve data integrity and transactional consistency.
- Support independently developed store frontends using shared platform services.
- Make development, testing and deployment processes repeatable.
- Minimise unnecessary dependencies and architectural complexity.
- Support the development environment used by the Platform Owner.
- Provide sufficient documentation for future developers and maintainers.

## 3. Scope and Applicability

These standards apply to:

- Backend application development.
- Frontend and storefront development.
- Platform administration interfaces.
- API endpoints and service contracts.
- Database schemas, migrations and queries.
- Authentication and authorisation implementation.
- Background jobs and event processing.
- External integrations and provider connections.
- Automated tests and development tooling.
- Build, deployment and configuration files.
- Technical documentation and repository maintenance.

External developers and contributors must follow the applicable standards when working on platform-owned repositories or integrations.

Store-specific frontend development may use different implementation choices where approved, provided that the frontend complies with the shared API contracts, security requirements, store-context rules and integration standards.

## 4. Development Principles

### 4.1 Maintainability

Code must be structured so that another competent developer can understand, test and maintain it without relying on undocumented knowledge from its original author.

Prefer clear names, focused functions, explicit dependencies and understandable control flow.

### 4.2 Consistency

Existing project conventions should be followed unless there is a documented reason to change them.

New conventions must be introduced deliberately rather than allowing inconsistent approaches to accumulate.

### 4.3 Simplicity

Implement the simplest design that satisfies the actual requirements.

Avoid unnecessary abstractions, duplicated infrastructure, premature microservices, excessive dependencies and speculative features.

### 4.4 Security by Design

Security requirements must be considered during implementation rather than added after functionality is complete.

Authentication, authorisation, store context, input validation, secret handling and audit requirements must be enforced at the appropriate application boundaries.

### 4.5 Data Integrity

Business rules and data relationships must be enforced through appropriate application logic and database constraints.

Critical operations must not depend exclusively on frontend validation or assumptions about the data supplied by clients.

### 4.6 Incremental Change

Changes must be sufficiently scoped to understand their impact and verify their behaviour.

Existing production functionality must not be replaced or bypassed without an approved migration approach.

### 4.7 Explicit Behaviour

Avoid hidden defaults, implicit permissions and undocumented business rules.

Where behaviour depends on configuration or a business decision, the relevant source of authority must be identifiable.

## 5. Development Environment and Termux Standards

### 5.1 Primary Development Environment

The Platform Owner conducts development using Termux on an Android device.

Development instructions, commands and scripts must account for this environment.

The development workflow must not assume that a conventional desktop Linux environment, Windows workstation or macOS installation is available.

### 5.2 Termux Compatibility

Development tooling and scripts should support the available Termux environment wherever practical.

Commands must account for:

- Android filesystem permissions and paths.
- Termux package availability.
- ARM64-compatible dependencies where applicable.
- Available shell utilities and command versions.
- Differences between Android and conventional Linux environments.
- Memory, storage and processing constraints.

Instructions must not assume that sudo, systemd, Docker Desktop or desktop-only applications are available.

Where a tool requires functionality that Termux cannot provide directly, document the requirement and provide an appropriate alternative environment or execution method.

### 5.3 Command Instructions

Commands provided for repository operations must identify the expected working directory where it matters.

Commands must be complete and executable rather than relying on omitted setup steps or unexplained shell state.

Use standard shell syntax supported by the project's Termux environment.

Avoid unnecessarily large command batches that make failures difficult to isolate.

### 5.4 File Creation and Complete Replacements

All complete file creation or full-file replacement instructions must use a quoted heredoc with cat.

Required format:

    cat <<'EOF' > path/to/file
    Complete file contents go here.
    EOF

The quoted EOF prevents shell expansion of variables, command substitutions and other special characters inside the file.

Do not provide unwrapped file contents with instructions to paste them manually into an editor when a complete file replacement is intended.

### 5.5 Targeted File Patches

Targeted changes to existing files must use Python.

Patches must identify the intended file and exact replacement target, verify that the expected original content exists, and stop rather than silently modifying an unexpected file.

Required pattern:

    python - <<'PY'
    from pathlib import Path

    path = Path("path/to/file")
    content = path.read_text()

    old = """Original content"""
    new = """Replacement content"""

    if old not in content:
        raise SystemExit("Expected content was not found. No changes made.")

    if content.count(old) != 1:
        raise SystemExit("Expected content is not unique. No changes made.")

    path.write_text(content.replace(old, new, 1))
    print(f"Updated {path}")
    PY

The patch must not overwrite unrelated content or silently succeed when its target does not match.

For multiple intentional replacements, each target must be checked before the file is written.

### 5.6 Editing Standard

The editing method must match the scope of the change:

- New file: use cat with a quoted EOF heredoc.
- Complete file replacement: use cat with a quoted EOF heredoc.
- Targeted modification: use Python.
- Automated generation: use a documented script appropriate to the task.

These conventions apply to development instructions and repository editing workflows unless a specific tool or generated artifact requires another documented method.

## 6. Repository and File Organisation

### 6.1 Repository Structure

Repositories must use a clear and predictable structure.

Application code, tests, configuration, documentation, database migrations and deployment resources should have identifiable locations.

Avoid placing unrelated functionality in shared directories simply because they are convenient.

### 6.2 Separation of Concerns

Frontend, backend, database and infrastructure responsibilities must remain distinguishable.

A frontend must not become the authoritative location for business rules that require server-side enforcement.

Backend modules must not take on unrelated responsibilities without a clear architectural reason.

### 6.3 Naming Conventions

Names for files, directories, modules, classes, functions, variables, database objects and API resources must follow the conventions of their respective technologies.

Use descriptive names that communicate purpose.

Avoid ambiguous abbreviations, inconsistent terminology and names that imply permissions or ownership the implementation does not actually enforce.

### 6.4 Configuration Files

Configuration must be separated from application logic.

Environment-specific values must not be embedded in source code.

Configuration names and expected values must be documented, especially where they are required for local development, testing or deployment.

### 6.5 Generated and Temporary Files

Generated build output, local caches, temporary files, dependency directories and machine-specific configuration must not be committed unless the repository explicitly requires them.

Repository ignore rules must protect local secrets, credentials and environment files.

## 7. Technology and Dependency Management

### 7.1 Approved Technology

Implementation must follow the technology choices established in the approved architecture documents and current repository configuration.

A technology change that affects architectural boundaries, deployment, security, data access or long-term maintenance requires an appropriate decision before adoption.

### 7.2 Dependency Selection

New dependencies must have a clear technical purpose.

Before adding a dependency, consider:

- Whether existing project functionality already provides the required capability.
- Whether the dependency is actively maintained.
- Whether it supports the target runtime and Termux development environment where relevant.
- Its security and licensing implications.
- Its effect on bundle size, performance and maintenance.
- Whether the project can reasonably implement the requirement without it.

Avoid introducing multiple libraries that solve substantially the same problem without a documented reason.

### 7.3 Dependency Versions

Dependency versions must be controlled through the repository's package manifests and lockfiles.

Lockfiles must be maintained where supported by the package manager.

Unnecessary version changes and unreviewed major upgrades must be avoided.

### 7.4 Dependency Security

Dependencies must be monitored for known vulnerabilities and material maintenance risks.

Security updates must be assessed for compatibility and regression risk before being applied to production-bound code.

### 7.5 Removal of Dependencies

Unused or superseded dependencies should be removed when their removal is understood and verified.

Dependency removal must not leave broken imports, scripts, build configuration or runtime behaviour.


## 8. General Coding Standards

### 8.1 Readability

Code must prioritise clarity and maintainability.

Use descriptive identifiers, consistent formatting and straightforward control flow.

Avoid unnecessarily compressed expressions, deeply nested logic and unexplained abbreviations.

### 8.2 Function and Method Design

Functions and methods should have a clear responsibility.

Large functions should be divided when doing so improves readability, testing or reuse.

Avoid creating excessive helper functions that make simple operations harder to follow.

### 8.3 Error Handling

Errors must be handled deliberately and consistently.

Do not silently suppress failures or return success when an operation has failed.

Errors exposed to users must not disclose internal implementation details, credentials, database information or sensitive operational data.

Technical logs should contain sufficient diagnostic context without unnecessarily recording sensitive information.

### 8.4 Input Validation

Validate untrusted input at application boundaries.

Validation must cover required fields, data types, formats, length limits, permitted values and relevant business constraints.

Frontend validation may improve usability but does not replace backend validation.

### 8.5 Avoiding Duplication

Shared logic should be placed in an appropriate reusable location when multiple consumers genuinely need it.

Do not create abstractions solely to eliminate small amounts of duplication where doing so would make the code harder to understand.

### 8.6 Comments and Documentation

Comments should explain intent, important constraints and non-obvious decisions.

Do not use comments to repeat what the code already clearly expresses.

Complex business rules, security assumptions and integration requirements must be documented where maintainers can find them.

## 9. Frontend Development Standards

### 9.1 Component Responsibilities

Frontend components should have clear responsibilities.

Reusable components should be separated from page-specific behaviour where that separation improves maintainability.

Avoid oversized components that combine unrelated interface elements, data access and business logic.

### 9.2 State Management

State must have a clear owner and lifecycle.

Use local component state for local interface behaviour and shared state mechanisms where multiple components genuinely require shared access.

Avoid unnecessary global state and duplicated sources of truth.

### 9.3 API Communication

Frontend applications must communicate with backend services through documented API contracts.

Direct database access must not be used to bypass backend business rules or security controls where those responsibilities belong to the platform backend.

API errors, loading states, empty results and unsuccessful operations must be handled explicitly.

### 9.4 Store Context

Each independently developed storefront must use its assigned store configuration and store-scoped public identifiers.

The frontend must not be trusted to establish its own authorisation context.

The backend must independently resolve and validate store context for every protected operation.

A client-supplied store identifier must not grant access to another store's data.

### 9.5 Public Configuration

Frontend configuration may contain public values required to connect to the shared platform.

It must never contain database passwords, service-role keys, private signing secrets or privileged backend credentials.

### 9.6 Accessibility and Usability

Interfaces should support accessible navigation, readable content, clear labels and meaningful feedback.

Important actions must communicate their outcome.

Destructive or financially significant actions should require appropriate confirmation.

### 9.7 Responsive Behaviour

Storefronts and administration interfaces should support their intended device sizes and usage contexts.

Responsive behaviour must be tested rather than assumed from desktop rendering.

## 10. Backend Development Standards

### 10.1 Module Boundaries

Backend functionality must follow the modular boundaries defined in the approved architecture.

Modules should own their business responsibilities and expose clearly defined interfaces to other modules.

Cross-module dependencies must be intentional and must not create unnecessary circular relationships.

### 10.2 Business Logic

Business rules must be implemented in appropriate backend application services or domain components.

Controllers and route handlers should focus on request handling, validation coordination and response construction.

Do not place critical business rules exclusively in frontend code or database triggers without an explicit architectural justification.

### 10.3 Transaction Management

Operations that modify related business records must use appropriate database transactions.

Transaction boundaries must reflect the business operation being performed.

Failures must not leave partially committed business operations where atomicity is required.

### 10.4 Concurrency

Code must account for concurrent requests that could affect stock, payments, orders, financial balances or other shared resources.

Use appropriate database constraints, locking, optimistic concurrency or other established controls.

Do not rely exclusively on frontend checks to prevent concurrent updates.

### 10.5 Idempotency

Operations that may be retried must be designed to avoid unintended duplicate effects.

This is particularly important for payment processing, order creation, webhook handling, stock movements and financial postings.

Idempotency keys and processing records must be scoped and persisted appropriately.

### 10.6 Background Processing

Long-running or asynchronous work should use the approved background-processing architecture.

Background jobs must support controlled retries, failure visibility and safe recovery.

A job retry must not duplicate an operation that has already completed successfully.

## 11. API Implementation Standards

### 11.1 API Contracts

API endpoints must follow the approved API architecture and versioning conventions.

Request and response structures must be documented and consistent.

Changes to public contracts must be assessed for compatibility with existing storefronts and integrations.

### 11.2 Authentication and Authorisation

Protected endpoints must authenticate the caller and enforce current server-side permissions.

Authentication alone does not establish permission to perform an operation.

Authorisation must consider the requested action, resource ownership, active membership, role and applicable store context.

### 11.3 Store Isolation

Every store-scoped operation must enforce the relevant store boundary.

Queries, updates, deletions, exports and background operations must not expose or modify another store's records through manipulated identifiers or request parameters.

### 11.4 HTTP Behaviour

Use appropriate HTTP methods and status codes.

Responses must distinguish validation errors, authentication failures, authorisation failures, missing resources, conflicts and unexpected server errors.

Do not expose stack traces or internal database errors through public API responses.

### 11.5 Pagination and Filtering

Collection endpoints should support controlled pagination where result volumes may grow.

Filtering and sorting must use explicitly supported fields and validated values.

Unbounded data retrieval must be avoided for large or sensitive collections.

### 11.6 API Documentation

API documentation must describe endpoint purpose, authentication requirements, permissions, store context, request fields, response structures and relevant failure conditions.

Examples must not contain real credentials or sensitive production data.

## 12. Database Development Standards
## 12.1 Database Access and Administration

Direct database access and administration use the PostgreSQL command-line client (`psql`).

Database connection settings must be loaded from the appropriate environment configuration, normally the project's `.env` file during local development.

The standard workflow is:

- Use `psql` for direct PostgreSQL queries, schema inspection, database administration and controlled SQL execution.
- Load connection details from `.env` rather than hard-coding database credentials in commands or scripts.
- Keep `.env` files out of version control.
- Never expose database passwords or connection strings in logs, screenshots, documentation examples or committed files.
- Use the correct database environment and verify the target before executing changes.
- Use migration files and the approved migration process for schema changes.
- Do not use ad hoc production SQL changes as a substitute for version-controlled migrations.
- Apply appropriate transactions, backups and verification for high-risk operations.
- Use least-privilege database credentials wherever supported.
- Do not place privileged database credentials in browser-side frontend configuration.

The exact connection variable names and loading commands must follow the repository's actual environment configuration. They must not be invented or assumed.


### 12.1 Schema Changes

Database schema changes must be made through version-controlled migrations.

Direct, undocumented production schema changes are not acceptable.

Migration files must be ordered, identifiable and maintained with the application source.

### 12.2 Data Types and Constraints

Choose data types appropriate to the business meaning and expected range of values.

Use database constraints to enforce important integrity rules, including required values, uniqueness and valid relationships.

Application validation and database constraints should complement each other.

### 12.3 Store-Scoped Relationships

Store-owned records must use explicit ownership relationships.

Where necessary, composite foreign keys and unique constraints must enforce that related records belong to the same store.

Do not assume that matching identifiers alone establish a valid cross-record relationship.

### 12.4 Migration Safety

Migrations must be assessed for:

- Existing data compatibility.
- Data loss or irreversible changes.
- Table size and execution time.
- Locking and availability impact.
- Application compatibility during deployment.
- Rollback or recovery requirements.

High-risk migrations require a verified recovery plan and an appropriate backup before execution.

### 12.5 Seed and Test Data

Seed data must be distinguishable from production business data.

Development and test environments must not depend on uncontrolled production data copies.

Test fixtures must not contain real customer credentials, payment details or other sensitive information.

### 12.6 Query Efficiency

Queries must retrieve only the data required for the operation.

Indexes should support actual query patterns and be introduced based on measured or reasonably established needs.

Avoid unnecessary repeated queries and unbounded relationship loading.

### 12.7 Database Access

Database access must follow the approved backend data-access architecture.

Privileged database credentials must remain in trusted server-side environments.

Public frontend applications must never receive credentials that permit unrestricted database access.


## 13. Security Development Standards

### 13.1 Secret Management

Secrets must never be committed to source control.

This includes:

- Database passwords.
- Supabase service-role keys.
- Private API credentials.
- Signing keys and private certificates.
- Payment provider secrets.
- Email and messaging provider credentials.
- Privileged integration tokens.

Use approved environment configuration or secret-management services.

If a secret is accidentally exposed, treat it as compromised and follow the applicable rotation and incident-response procedures.

### 13.2 Authentication

Authentication must use the approved identity architecture.

Do not implement independent authentication mechanisms that bypass the platform's identity and session controls.

Account status, session validity and relevant authentication state must be checked according to the approved security design.

### 13.3 Authorisation

Permission checks must be enforced on the server.

Never rely on hidden frontend buttons, disabled controls, route guards or client-side role values as the sole security boundary.

Store Admins must not be able to grant permissions beyond their own delegated authority.

Platform-level privileges must remain separate from ordinary store administration.

### 13.4 Data Protection

Collect, process and expose only information necessary for the intended operation.

Sensitive information must not appear unnecessarily in application logs, URLs, error messages, analytics events or client-side storage.

Exports and administrative access to customer information must follow the approved access and audit requirements.

### 13.5 File Uploads

Treat uploaded files as untrusted input.

Validate file types, sizes and permitted usage.

Where appropriate, scan files before making them available to other users or systems.

Prevent uploaded content from being executed or interpreted as trusted application code.

### 13.6 Secure Coding

Protect against common application vulnerabilities, including:

- SQL injection.
- Cross-site scripting.
- Cross-site request forgery where applicable.
- Broken access control.
- Insecure direct object references.
- Unrestricted resource consumption.
- Unsafe file handling.
- Improper authentication and session management.
- Exposure of sensitive information.

Use established framework and library protections where available.

### 13.7 Security-Sensitive Changes

Changes affecting authentication, authorisation, store isolation, payments, financial records, customer data or privileged administration require additional review and testing.

The review must consider both permitted and denied operations.

## 14. Logging, Monitoring and Audit Standards

### 14.1 Application Logging

Logs must provide useful operational and diagnostic information.

Log levels should distinguish routine activity, warnings, errors and critical failures.

Avoid logging entire request bodies or sensitive records when a smaller diagnostic context is sufficient.

### 14.2 Audit Records

Business and administrative actions requiring accountability must generate appropriate audit records.

Audit records should identify the actor, action, affected resource, relevant store context, timestamp and outcome where applicable.

Audit history must not be silently overwritten to conceal previous activity.

### 14.3 Error Visibility

Failures in important operations must be visible to the appropriate operational personnel.

Do not allow background jobs, integrations or financial processes to fail silently.

### 14.4 Monitoring

Application and infrastructure monitoring must follow the approved operations and deployment architecture.

Monitoring should cover availability, error rates, critical processing failures, resource usage and relevant business-operation failures.

## 15. Testing Standards

### 15.1 Testing Requirements

Code changes must receive testing appropriate to their risk and impact.

Testing must not be limited to confirming that the application builds successfully.

### 15.2 Unit Tests

Unit tests should cover isolated business logic, validation rules, calculations and important conditional behaviour.

Tests should be deterministic and independent of external services unless explicitly designed otherwise.

### 15.3 Integration Tests

Integration tests should verify interactions between application modules, databases, APIs and external service boundaries.

Important transaction and failure scenarios must be covered.

### 15.4 API Tests

API tests must verify authentication, authorisation, input validation, response behaviour and store isolation.

Tests must include attempts to access resources outside the caller's permitted scope.

### 15.5 Frontend Tests

Frontend testing should cover important user workflows, form validation, loading states, error handling and responsive behaviour.

### 15.6 Regression Tests

Changes must be checked against existing functionality that could be affected.

This is particularly important when modifying shared backend services, catalogue behaviour, inventory, checkout, payments or existing Yotaabo functionality.

### 15.7 Security Tests

Security testing must include both authorised and unauthorised scenarios.

A successful test suite must demonstrate that prohibited actions are rejected, not merely that intended actions work.

### 15.8 Termux Test Execution

Development and test instructions should be executable in Termux where the required tooling supports Android.

Where tests require external infrastructure or an unsupported runtime, document the dependency and provide a suitable execution environment.

## 16. Code Review Standards

### 16.1 Review Objectives

Code reviews must assess correctness, maintainability, security, compatibility and compliance with approved architecture.

A review should identify material risks rather than focus only on formatting preferences.

### 16.2 Review Scope

Reviewers should consider:

- Whether the change satisfies the stated requirement.
- Whether existing behaviour remains intact.
- Whether business rules are enforced in the correct layer.
- Whether store isolation is preserved.
- Whether permissions are correctly enforced.
- Whether data integrity is protected.
- Whether errors and failure cases are handled.
- Whether tests adequately cover the change.
- Whether documentation or configuration needs updating.

### 16.3 Review Independence

Where practical, changes affecting security, financial operations, privileged access or critical data integrity should receive review by someone other than the original author.

Where independent review is not immediately available, the limitation and any additional verification must be recorded.

### 16.4 Review Findings

Material findings must be addressed before release or explicitly accepted by an authorised decision-maker.

Unresolved security or data-integrity defects must not be treated as ordinary cosmetic issues.

## 17. Git and Version Control Standards

### 17.1 Source Control

Application source code, migrations, tests, configuration templates and required documentation must be maintained in version control.

Secrets, local credentials and unnecessary generated files must be excluded.

### 17.2 Branching

Branches should have clear purposes and identifiable names.

Development, maintenance and release work must not be mixed without a deliberate reason.

### 17.3 Commits

Commits should represent understandable units of change.

Commit messages must describe the purpose of the change.

Avoid combining unrelated modifications into a single commit when they can reasonably be separated.

### 17.4 Change Inspection

Before committing, inspect the staged changes.

Confirm that:

- Only intended files are staged.
- No secrets or local environment files are included.
- No unrelated changes are present.
- Generated files are included only where required.
- The changes are consistent with the intended task.

### 17.5 Repository Synchronisation

Before pushing, understand the relationship between the local branch and its remote counterpart.

Avoid force-pushing shared branches unless the operation is explicitly authorised and its impact is understood.

### 17.6 Release History

Meaningful changes must remain traceable through commits, pull requests or equivalent review records.

Do not rewrite history in a way that removes required accountability or obscures production changes.

## 18. Configuration and Environment Standards

### 18.1 Environment Separation

Development, testing, staging and production environments must remain appropriately separated.

Production credentials and data must not be casually reused in local development.

### 18.2 Environment Variables

Environment variables must have documented names, purposes and expected formats.

Provide example configuration files containing placeholders rather than real secrets.

### 18.3 Configuration Validation

Applications should validate required configuration during startup or before the relevant functionality is used.

Missing or invalid critical configuration must produce a clear operational failure rather than silently falling back to unsafe values.

### 18.4 Store-Specific Configuration

Store-specific frontend configuration must be generated or managed through the approved provisioning process.

Configuration must identify the intended store and supported integration endpoints.

The backend remains responsible for verifying the caller's authority and store context.

### 18.5 Configuration Changes

Changes to shared configuration must be assessed for their effect on all participating stores.

Store-specific configuration changes must not unintentionally alter another store's integration or storefront behaviour.

## 19. Documentation Standards

### 19.1 Technical Documentation

Documentation must explain important architectural boundaries, business rules, integration contracts, configuration requirements and operational procedures.

Documentation must be updated when implementation changes make existing instructions inaccurate.

### 19.2 API and Integration Documentation

API and integration documentation must describe supported behaviour, authentication, permissions, request and response structures, failure handling and relevant operational requirements.

### 19.3 Development Instructions

Development instructions must be compatible with the intended development environment.

For the Platform Owner's Termux workflow:

- Complete file creation and replacement commands must use `cat <<'EOF'` heredocs.
- Targeted file patches must use Python.
- Commands must be complete and directly executable.
- Required working directories and dependencies must be stated.
- Instructions must not assume unavailable desktop-only tooling.

### 19.4 Decision Documentation

Material architectural and technical decisions must be recorded through the approved decision-management process.

Do not rely on undocumented conversations or individual developer assumptions as the permanent source of an important decision.

## 20. Performance and Resource Management

### 20.1 Efficient Implementation

Code must avoid unnecessary processing, repeated database queries and excessive network requests.

Optimisation should be guided by actual requirements, measurements and identified bottlenecks.

### 20.2 Frontend Performance

Storefronts should minimise unnecessary JavaScript, large assets and repeated requests.

Use appropriate loading strategies and caching without exposing private or store-restricted data.

### 20.3 Backend Performance

Backend operations should use efficient queries, appropriate pagination and controlled resource consumption.

Expensive operations should not block unrelated requests unnecessarily.

### 20.4 Resource Constraints

Development and deployment decisions must account for the actual capabilities and limits of the target environment.

Do not introduce resource-intensive tooling without a clear benefit and an understanding of its operational cost.

## 21. Change and Release Readiness

### 21.1 Change Assessment

Changes must be assessed for their impact on existing functionality, data, security, integrations and participating stores.

Shared platform changes require particular attention because one implementation may affect multiple storefronts.

### 21.2 Release Verification

Before release, verify the relevant build, tests, migrations, configuration and deployment requirements.

Critical workflows must receive appropriate verification in an environment representative of production.

### 21.3 Database and Application Compatibility

Application and database changes must be coordinated.

Where deployment involves multiple application versions or independently deployed frontends, maintain compatibility during the transition where required.

### 21.4 Rollback Considerations

Changes must have a recovery or rollback approach appropriate to their risk.

Database changes, external provider operations and financial transactions may not be safely reversible through a simple code rollback.

### 21.5 Production Changes

Production changes must follow the approved release and deployment controls.

Unreviewed experimental code must not be deployed to production.


## 22. Development Workflow

### 22.1 Work Planning

Development tasks should have a clear objective, scope and expected outcome.

Tasks affecting shared services, security boundaries, data structures or existing production functionality must identify relevant dependencies and risks before implementation.

### 22.2 Before Making Changes

Developers should:

- Understand the existing implementation.
- Identify the files and modules affected.
- Check relevant architecture and development documentation.
- Identify existing behaviour that must be preserved.
- Consider security, data integrity and store-isolation implications.
- Determine how the change will be tested.

Avoid modifying code based only on assumptions about how the existing system works.

### 22.3 Implementation

Changes should be implemented in manageable units.

Follow existing project conventions unless an approved change establishes a new standard.

Avoid mixing unrelated refactoring with functional changes unless the combined scope is necessary and understood.

### 22.4 Verification

After implementation, perform appropriate checks.

These may include:

- Type checking.
- Linting.
- Unit and integration tests.
- Build verification.
- API and database checks.
- Security and permission tests.
- Regression testing.
- Manual workflow verification.

The checks required depend on the risk and scope of the change.

### 22.5 Completion

A task should not be considered complete solely because code has been written.

Completion requires the expected behaviour to be implemented, relevant verification to be performed, material defects to be addressed and necessary documentation to be updated.

## 23. Collaboration and Developer Responsibilities

### 23.1 Ownership of Changes

Developers are responsible for understanding the code they modify and the consequences of their changes.

Contributors must not introduce undocumented dependencies, hidden business rules or privileged access paths.

### 23.2 Communication

Material implementation risks, blockers, failed tests and deviations from approved requirements must be communicated clearly.

Technical disagreements should be resolved using documented requirements, architecture decisions and evidence rather than undocumented personal assumptions.

### 23.3 Handover

Work handed to another developer must include sufficient information to continue safely.

A handover should identify:

- Work completed.
- Files and modules changed.
- Relevant technical decisions.
- Outstanding work.
- Known defects and limitations.
- Required configuration.
- Tests performed and their results.
- Deployment or migration considerations.

### 23.4 Developer Access

Repository and environment access must follow the approved identity and access controls.

Developers must receive only the access necessary for their responsibilities.

Privileged production access must not be shared through informal messages or embedded in project documentation.

## 24. Quality Gates

Changes must satisfy applicable quality requirements before they are accepted or released.

Quality gates should consider:

- Functional correctness.
- Code readability and maintainability.
- Architecture compliance.
- Authentication and authorisation.
- Store isolation.
- Data integrity.
- Error handling and recovery.
- Automated test results.
- Security implications.
- Performance and resource usage.
- Documentation completeness.
- Deployment and rollback readiness.

A successful build does not establish that a change is secure, correct or production-ready.

Quality gates must be proportionate to the risk of the change. Critical security, financial and data-integrity requirements cannot be waived merely to accelerate delivery.

## 25. Exceptions and Standards Changes

### 25.1 Exceptions

A development standard may require an exception where a technical limitation, compatibility requirement or justified business need makes compliance impractical.

An exception must not silently weaken a security or data-integrity requirement.

### 25.2 Exception Records

Material exceptions must document:

- The standard affected.
- The reason for the exception.
- The affected application or component.
- The associated risks.
- Compensating controls, where applicable.
- The approving authority.
- Any review or expiry condition.

### 25.3 Approval

Exceptions must be approved through the applicable governance and decision-management process.

Developers must not independently authorise exceptions to platform-wide security, access-control or governance requirements.

### 25.4 Review

Exceptions should be reviewed when their original justification changes or when a permanent compliant solution becomes practical.

## 26. Development Standards Constraints

The following constraints apply:

- Existing production behaviour must be protected during incremental development.
- Shared backend changes must account for every affected store.
- Store isolation must be enforced by trusted backend controls.
- Public frontend configuration must not expose privileged credentials.
- Critical business rules must not depend exclusively on frontend enforcement.
- Database changes must be version-controlled and assessed for data integrity.
- Payment and financial operations must account for retries, concurrency and uncertain outcomes.
- Termux must remain a supported primary development environment for the Platform Owner.
- Complete file creation and replacement instructions must use quoted cat heredocs.
- Targeted file patches must use Python with explicit target verification.
- Development standards must not introduce unnecessary infrastructure or tooling.
- Architectural deviations must follow the applicable approval process.

## 27. Open Development Decisions

The following matters require decisions where they are not already established by approved architecture or governance documents:

- Final repository organisation across the shared platform and independently developed storefronts.
- Exact formatting, linting and static-analysis tool configuration.
- Required automated quality gates for each repository.
- Branching and pull-request requirements as the contributor base grows.
- Minimum independent review requirements for different risk categories.
- Supported local and remote test environments for tooling unavailable in Termux.
- Dependency update and vulnerability remediation schedules.
- Standard API client and SDK generation approach for store frontend developers.
- Long-term code ownership and maintenance responsibilities across participating stores.

These decisions must be recorded through the approved decision-management process.

## 28. Relationship to Other Documents

This document must be read alongside the following documents where relevant:

- System Architecture.
- Application Architecture.
- API Architecture.
- Data Architecture.
- Security Architecture.
- Deployment Architecture.
- Identity and Access.
- Integration Architecture.
- Testing Strategy.
- Implementation Roadmap.
- Architecture Governance.
- Platform Governance.
- Decision Register.

Where a development practice affects a domain governed by a more specific approved architecture or security document, the relevant domain-specific requirements remain authoritative.

Conflicts between documents must be handled through the established governance and decision-management process rather than resolved through undocumented implementation assumptions.

## 29. Development Standards Document Management

### 29.1 Ownership

The Platform Owner is responsible for maintaining this document and ensuring that material changes follow the applicable governance process.

### 29.2 Maintenance

This document should be updated when approved development practices, tooling requirements, repository conventions or engineering responsibilities materially change.

### 29.3 Version Control

Changes must be maintained in version control with an identifiable history.

Material changes should record their reason and relevant approval.

### 29.4 Review

This document remains a draft until it has undergone the planned consolidated documentation review and receives explicit approval.

### 29.5 Authority

This document establishes development practices for platform implementation.

It does not independently authorise changes to business policy, security boundaries, architectural decisions or governance responsibilities.
