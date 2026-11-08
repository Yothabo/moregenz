# Change Management Policy

## Document Control

| Field | Value |
|---|---|
| Document Type | Change Management Policy |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This policy establishes how changes to the platform are proposed, assessed, approved, implemented, verified and recorded.

It applies to technical, operational, security, commercial and governance changes that may affect the platform or participating stores.

The objective is to introduce changes in a controlled manner without creating unnecessary administrative overhead for routine work.

## 2. Scope

This policy applies to changes involving:

- Application code and architecture.
- Database schemas and migrations.
- API contracts and integrations.
- Identity and access controls.
- Platform and store configuration.
- Product catalogue and inventory rules.
- Commerce and financial processing.
- Infrastructure and deployment.
- Security controls.
- Operational procedures.
- Platform policies and commercial arrangements.
- Storefront configuration and provisioning.
- External providers and dependencies.

Routine actions already permitted by approved operational procedures are not automatically subject to formal change approval.

## 3. Change Management Objectives

Change management must:

- Protect production stability.
- Preserve data integrity.
- Maintain store isolation.
- Reduce security and operational risks.
- Establish clear approval authority.
- Provide traceability.
- Support controlled deployment and rollback.
- Communicate material changes to affected parties.
- Prevent conflicting or unauthorised changes.

## 4. Change Principles

All material changes must follow these principles:

- Changes must have a clear purpose.
- The affected scope must be understood.
- Risks must be assessed before implementation.
- Approval must come from the appropriate authority.
- Testing must reflect the level of risk.
- Production changes must be controlled.
- Rollback or recovery must be considered.
- Implementation outcomes must be verified.
- Records must be retained.
- Emergency changes must receive retrospective review.

## 5. Change Classification

### 5.1 Standard Change

A repeatable, low-risk change performed through an established and approved procedure.

Examples may include routine configuration updates or approved maintenance tasks.

Standard changes may use predefined approval arrangements.

### 5.2 Normal Change

A change requiring assessment and approval before implementation.

Examples include application features, database changes, integration updates and material store configuration changes.

### 5.3 High-Risk Change

A change with significant potential impact on security, financial integrity, data ownership, store isolation, production availability or critical business operations.

High-risk changes require additional review and explicit approval.

### 5.4 Emergency Change

A change required to address an urgent security threat, major incident or critical service disruption.

Emergency changes may use an accelerated approval process, but must remain authorised, documented and subject to retrospective review.

## 6. Change Request

A material change request should include:

- Change identifier.
- Requester.
- Description.
- Business or technical justification.
- Affected systems and stores.
- Proposed implementation.
- Dependencies.
- Risk assessment.
- Security and privacy impact.
- Data impact.
- Testing requirements.
- Deployment plan.
- Rollback or recovery approach.
- Required approvals.
- Proposed implementation window.

Requests must distinguish confirmed requirements from assumptions.

## 7. Impact Assessment

Before approval, assess the potential impact on:

- Platform-wide services.
- Individual stores.
- Customer experience.
- Data ownership and integrity.
- Identity and permissions.
- Security and privacy.
- Financial records and transactions.
- Inventory and order processing.
- Integrations and providers.
- Deployment and infrastructure.
- Operational support.
- Existing agreements.
- Documentation and training.

Changes to shared services must consider every participating store that may be affected.

## 8. Change Approval Authority

Approval authority depends on the scope and risk of the change.

### 8.1 Platform Owner

The Platform Owner approves platform-level changes and changes affecting shared architecture, platform governance, security boundaries or multiple stores.

### 8.2 Store Admin

A Store Admin may approve ordinary store-level operational changes within delegated authority.

### 8.3 Technical Authority

Technical reviewers may assess implementation quality, compatibility, security and operational readiness.

Technical review does not automatically replace business or governance approval.

### 8.4 Financial Authority

Financial changes must follow the applicable financial approval and separation-of-duties requirements.

### 8.5 Restricted Changes

No requester may approve a change that exceeds their assigned authority.

## 9. Change Risk Assessment

Risk assessment must consider:

- Likelihood of failure.
- Severity of potential impact.
- Number of affected stores.
- Data sensitivity.
- Financial exposure.
- Security implications.
- Reversibility.
- Recovery complexity.
- External dependencies.
- Availability of tested alternatives.

The change record must identify material residual risks and who accepts them.

## 10. Change Planning

Approved changes must have an implementation plan appropriate to their risk.

The plan should identify:

- Responsible implementers.
- Required approvals.
- Dependencies.
- Required access.
- Testing and acceptance conditions.
- Deployment sequence.
- Communication requirements.
- Monitoring.
- Rollback or recovery steps.

Changes affecting shared infrastructure should be scheduled and coordinated to avoid conflicting deployments.

## 11. Development and Review

Code changes must follow the Development Standards.

Technical changes should receive appropriate review before production deployment.

Review must consider:

- Correctness.
- Security.
- Access control.
- Store isolation.
- Data integrity.
- API compatibility.
- Performance.
- Maintainability.
- Testing.
- Documentation.

High-risk changes require deeper review and explicit acceptance evidence.

## 12. Testing and Verification

Testing must be proportionate to change risk.

Relevant checks may include:

- Unit tests.
- Integration tests.
- API contract tests.
- Database migration tests.
- Store-isolation tests.
- Security tests.
- Financial reconciliation tests.
- End-to-end tests.
- Regression tests.
- User acceptance tests.

Production verification must confirm that the change behaves as intended.

A successful build alone is not sufficient evidence for a high-risk change.

## 13. Database and Data Changes

Database changes require particular care because they may affect historical and transactional information.

Before production execution:

- Confirm migration scope.
- Review schema and data impact.
- Verify dependencies.
- Confirm a recent usable backup or recovery point.
- Test the migration against representative data.
- Define rollback or forward-recovery procedures.
- Coordinate application and database deployment.
- Prevent conflicting migration execution.

Destructive changes require additional approval and recovery planning.

## 14. Production Deployment

Production deployment must follow the Deployment Architecture and approved release process.

Before deployment, confirm:

- Required approvals.
- Tested release artifact.
- Environment configuration.
- Secret availability.
- Migration readiness.
- Monitoring.
- Operational ownership.
- Communication.
- Recovery arrangements.

Deployment must be coordinated to avoid conflicting releases or concurrent schema migrations.

## 15. Rollback and Recovery

Every material production change must consider how the system will be recovered if the change fails.

Rollback must account for:

- Application compatibility.
- Database schema changes.
- In-flight transactions.
- Queued jobs and webhooks.
- Provider-side operations.
- Data written after deployment.
- Store-specific configuration.
- Audit history.

A database rollback must not be performed blindly if it could destroy valid transactions.

Where direct rollback is unsafe, use an approved forward-recovery or reconciliation procedure.

## 16. Emergency Changes

Emergency changes are permitted only where delay would create unacceptable risk or disruption.

The responsible authority must:

- Establish the urgent need.
- Identify the affected scope.
- Authorise proportionate action.
- Record the change and reason.
- Preserve relevant evidence.
- Verify the outcome.
- Arrange retrospective review.

Emergency authority must not become a routine method for bypassing change governance.

## 17. Store-Specific Changes

Store-specific changes must remain within the store's authorised configuration and operational boundaries.

Examples include:

- Store contact information.
- Product listing changes.
- Store pricing.
- Inventory configuration.
- Supported storefront settings.
- Store-specific integration configuration.

Changes affecting shared catalogue data, platform security or other stores require the appropriate platform authority.

## 18. Shared Platform Changes

Shared changes require broader impact assessment.

Before approval, identify:

- All potentially affected stores.
- Dependencies between services.
- Compatibility requirements.
- Migration implications.
- Required communication.
- Store-specific verification.
- Recovery and rollback implications.

A change must not assume that all stores use identical storefronts, configurations or operating procedures.

## 19. External Provider Changes

Provider changes must consider:

- API compatibility.
- Authentication and credential changes.
- Data processing implications.
- Webhook behaviour.
- Transaction integrity.
- Rate limits.
- Provider availability.
- Pricing and contractual changes.
- Exit and recovery options.

Changes to payment or other financial integrations require additional transaction and reconciliation testing.

## 20. Change Communication

Material changes must be communicated to affected stakeholders.

Communication should explain:

- What is changing.
- Why it is changing.
- Which stores or services are affected.
- Expected impact.
- Required action.
- Implementation timing.
- Available support.
- Known limitations.

Security-sensitive implementation details must not be disclosed unnecessarily.

## 21. Change Records

Each material change must have a traceable record containing:

- Request and change identifier.
- Description and justification.
- Classification.
- Impact and risk assessment.
- Approvals.
- Implementation details.
- Testing evidence.
- Deployment outcome.
- Rollback or recovery outcome, if applicable.
- Verification.
- Follow-up actions.
- Closure status.

Records must be retained according to applicable governance and retention requirements.

## 22. Change Failure and Review

Failed or partially completed changes must be documented.

Review should identify:

- What failed.
- Actual impact.
- Whether the risk assessment was adequate.
- Whether approval and testing were sufficient.
- Recovery effectiveness.
- Required corrective action.
- Whether standards or procedures need revision.

Material failures must be handled through the Incident Response Playbook where appropriate.

## 23. Change Metrics

The platform may monitor:

- Change success rate.
- Failed deployment frequency.
- Emergency change frequency.
- Rollback frequency.
- Change-related incidents.
- Time to implement changes.
- Outstanding corrective actions.
- Changes completed without required evidence.

Metrics must support improvement rather than encourage unsafe delivery shortcuts.

## 24. Exceptions

Exceptions must be justified, documented, time-limited where appropriate and approved by the relevant authority.

Exceptions must identify residual risks and any compensating controls.

No exception may override applicable legal obligations or remove mandatory security boundaries.

## 25. Open Decisions

The following matters require further definition:

- Formal change approval thresholds.
- Standard change catalogue.
- Change review roles.
- Production maintenance windows.
- Required notice periods.
- Emergency change approval arrangements.
- Change record storage location.
- Change metrics and reporting frequency.
- Required retention periods.
- Formal separation of technical and business approvals.

## 26. Relationship to Other Documents

This policy must be read alongside:

- ARCHITECTURE_GOVERNANCE.md
- PLATFORM_GOVERNANCE.md
- DECISION_REGISTER.md
- DEVELOPMENT_STANDARDS.md
- TESTING_STRATEGY.md
- IMPLEMENTATION_ROADMAP.md
- MIGRATION_PLAN.md
- DEPLOYMENT_ARCHITECTURE.md
- OPERATIONS_RUNBOOK.md
- INCIDENT_RESPONSE_PLAYBOOK.md
- BACKUP_AND_DISASTER_RECOVERY.md
- SECURITY_ARCHITECTURE.md

## 27. Document Management

This policy remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to affected stakeholders.
