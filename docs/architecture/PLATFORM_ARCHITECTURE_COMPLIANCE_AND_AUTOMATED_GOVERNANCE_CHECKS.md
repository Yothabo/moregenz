# Platform Architecture Compliance and Automated Governance Checks

## 1. Purpose

This specification defines automated and manual controls for verifying that platform implementation remains consistent with approved architecture, security requirements and organisational governance.

Compliance MUST be checked throughout development, testing and release.

A successful build MUST NOT be treated as proof of architectural compliance.

## 2. Compliance Scope

Checks MUST cover:

- Application architecture.
- Database schema and migrations.
- API contracts.
- Authentication and authorisation.
- Organisational roles and permissions.
- Store and customer data isolation.
- Financial and operational workflows.
- Audit and event generation.
- Notifications and announcements.
- Integrations.
- Deployment configuration.
- Documentation and requirement traceability.

## 3. Compliance Rule Registry

Each automated compliance rule MUST have:

- Unique rule identifier.
- Description.
- Governing specification.
- Affected component.
- Validation method.
- Severity.
- Failure behaviour.
- Responsible owner.

Rules MUST be version-controlled.

A rule MUST NOT claim to enforce a requirement that it does not actually test.

## 4. Validation Stages

### 4.1 Development

Developers SHOULD run relevant checks before submitting changes.

Checks MAY include:
- Formatting and static analysis.
- Type checking.
- Unit tests.
- Architecture boundary tests.
- Database migration validation.
- Permission tests.

### 4.2 Pull Request

Every pull request MUST trigger applicable automated checks.

The pipeline MUST identify the affected components and governing requirements where traceability is required.

### 4.3 Staging

Staging MUST validate integration behaviour, security boundaries and critical user workflows.

### 4.4 Production Release

Production deployment MUST require all mandatory release and compliance checks to pass or have an explicitly authorised exception.

## 5. Organisational Access Controls

Automated tests MUST verify:

- Roles cannot grant permissions outside their definitions.
- Scope restrictions are enforced by backend services.
- Store Owners cannot access unrelated store records.
- Parent-company personnel cannot exceed assigned authority.
- Delegations respect their permitted actions and expiry.
- Suspended memberships cannot retain active access.
- Revoked roles and permissions cease to authorise requests.
- Direct API requests cannot bypass interface restrictions.

## 6. Data and Store Isolation

Tests MUST verify:

- Store-owned records retain correct ownership.
- Shared catalogue records remain distinct from store inventory.
- Cross-store customer access follows approved rules.
- Cloned stores receive independent operational records.
- Historical records retain their original attribution.
- Unauthorised cross-store queries are rejected.

Isolation tests MUST include negative cases, not only successful authorised requests.

## 7. Database and API Compliance

Automated checks SHOULD verify:

- Migration ordering and repeatability.
- Required constraints and indexes.
- Referential integrity.
- API contract compatibility.
- Required validation.
- Tenant and organisational scope enforcement.
- Audit event creation for protected changes.
- Absence of unintended destructive migrations.

Database tests MUST use controlled test data.

## 8. Documentation Traceability

Where a change requires documented approval, its implementation MUST reference:

- Requirement identifier.
- Governing specification.
- Applicable ADR.
- Relevant acceptance criteria.
- Test evidence.

Automated checks SHOULD detect missing or invalid references.

A documentation reference MUST resolve to an existing file or registered requirement.

## 9. Compliance Findings

Each finding MUST be classified as:

- Critical.
- High.
- Medium.
- Low.
- Informational.

Findings MUST identify:
- Rule identifier.
- Affected component.
- Evidence.
- Governing requirement.
- Required corrective action.

Critical and high findings MUST block production release unless a permitted, formally approved exception applies.

Mandatory security and data-isolation failures MUST NOT be waived through ordinary release approval.

## 10. Exceptions

An exception MUST reference an approved architecture deviation record.

The pipeline MUST validate:
- Exception identifier.
- Approval status.
- Scope.
- Expiry date.
- Compensating controls.

Expired or unrelated exceptions MUST NOT suppress compliance failures.

## 11. Compliance Evidence

The system MUST retain:
- Pipeline execution identifier.
- Source revision.
- Environment.
- Rules executed.
- Test results.
- Findings.
- Approved exceptions.
- Final compliance decision.

Evidence MUST be linked to the relevant pull request and release record.

## 12. Ownership

Engineering owns implementation of technical compliance checks.

Information Security owns security-specific validation requirements.

Architecture owners maintain architectural rules.

Product and business owners validate business acceptance criteria.

Release authorities enforce the required release gates.

## 13. Relationship With Other Specifications

This specification MUST operate with:

- PLATFORM_RELEASE_AND_DEPLOYMENT_GOVERNANCE_STANDARDS.md
- PLATFORM_TECHNICAL_DEBT_AND_ARCHITECTURE_DEVIATION_MANAGEMENT_STANDARD.md
- ARCHITECTURE_DECISION_RECORD_GOVERNANCE_STANDARD.md
- PLATFORM_DOCUMENTATION_GOVERNANCE_AND_SPECIFICATION_LIFECYCLE_POLICY.md
- UNIFIED_ORGANISATIONAL_RBAC_TESTING_AND_VALIDATION_STANDARDS.md
- UNIFIED_PERMISSION_EVALUATION_AND_EFFECTIVE_ACCESS_ENGINE.md
- PLATFORM_ENTERPRISE_RISK_MANAGEMENT_AND_RISK_REGISTER_POLICY.md

## 14. Acceptance Criteria

Implementation is compliant only when:

- Compliance rules are version-controlled.
- Mandatory checks run at the appropriate pipeline stages.
- Backend permission enforcement is tested.
- Store isolation includes negative tests.
- Database and API changes receive relevant validation.
- Documentation traceability is checked where required.
- Critical compliance failures block production.
- Exceptions are validated and time-limited.
- Compliance evidence is retained.
- A successful build is never treated as sufficient proof of compliance.
