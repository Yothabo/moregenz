# Deployment Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-A234253DC8 |
| Category | Architecture |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

This document defines the deployment architecture and operational requirements for the multi-store retail platform.

It establishes how application components are built, configured, deployed, operated, monitored and recovered across development, testing and production environments.

The architecture must support the transition from the current Yotaabo application to the target multi-store platform without unnecessarily disrupting existing storefront, administration, customer or business operations.

This document defines deployment requirements and architectural direction. It does not imply that proposed deployment capabilities have already been implemented.

## 2. Deployment Objectives

The deployment architecture must:

- Provide reliable and controlled application releases.
- Separate development, testing and production environments.
- Protect production data, credentials and infrastructure.
- Support the existing Yotaabo application during migration.
- Allow the frontend and backend to evolve independently where appropriate.
- Support the target React/Vite frontend and NestJS modular monolith.
- Provide a controlled approach to database and storage changes.
- Support deployment verification and rollback.
- Maintain visibility into application health and operational failures.
- Protect participating stores from deployment-related data exposure or disruption.
- Keep deployment processes maintainable as the number of stores and platform capabilities grows.

## 3. Deployment Principles

### 3.1 Environment separation

Development, testing and production environments must have clearly defined responsibilities and appropriately separated configuration, credentials and data.

### 3.2 Controlled releases

Production changes must follow a traceable and controlled release process.

### 3.3 Reproducible builds

Application builds should be reproducible using documented dependencies, build commands and configuration.

### 3.4 Least privilege

Deployment identities and infrastructure credentials must receive only the permissions necessary for their responsibilities.

### 3.5 Production protection

Deployment procedures must protect existing production data, customer access, orders, authentication and business operations.

### 3.6 Incremental migration

The target deployment architecture must be introduced incrementally where necessary to preserve operational continuity.

### 3.7 Recoverability

The platform must have documented procedures for responding to failed releases, infrastructure problems and data recovery requirements.

### 3.8 Explicit configuration

Environment-specific behaviour must be controlled through approved configuration rather than undocumented assumptions or hard-coded production values.

## 4. Current Deployment Architecture

The existing Yotaabo application provides the production baseline.

Its current architecture includes:

- React and TypeScript frontend.
- Vite build tooling.
- Netlify hosting and deployment.
- Netlify Functions for backend API operations.
- Supabase PostgreSQL database services.
- Supabase Authentication.
- Supabase Storage.
- Netlify routing and redirect configuration.
- Environment-specific configuration and service credentials.

The current frontend and backend functions are deployed through the existing Netlify arrangement, while Supabase provides the associated managed backend services.

The exact production configuration, deployment permissions, environment variables, database access and service dependencies must be verified against the live environment before migration.

### 4.1 Existing production protection

The existing production deployment must remain operational while the target architecture is developed.

Changes to hosting, backend routing, authentication, database access or storage must be assessed for their impact on the existing application.

The current deployment configuration must not be replaced solely because the target architecture introduces different services.

### 4.2 Existing deployment baseline

The following must be treated as part of the existing operational baseline until individually reviewed:

- Current frontend build and deployment process.
- Existing production domain and routing behaviour.
- Netlify Function routes.
- Supabase database and authentication configuration.
- Storage buckets and access policies.
- Existing production environment variables.
- Existing redirects and security headers.
- Current frontend dependencies on deployed backend functions.

## 5. Target Deployment Architecture

The target deployment architecture is expected to support:

- React and Vite frontend.
- NestJS modular monolith backend.
- PostgreSQL database.
- Authentication services.
- File and media storage.
- Background processing where required.
- Monitoring, logging and operational services.
- External integrations.

The frontend and backend may be deployed independently where this improves release control, reliability or operational maintainability.

The database and other managed services may have separate deployment and configuration lifecycles.

### 5.1 Deployment boundaries

The deployment architecture must distinguish:

- Frontend hosting.
- Backend API hosting.
- Database hosting.
- Authentication services.
- Storage services.
- Background processing.
- External integrations.
- Monitoring and operational tooling.

The final hosting provider and service allocation remain open decisions.

### 5.2 Modular monolith deployment

The initial NestJS backend should be deployed as a modular monolith.

Its internal business modules must maintain clear boundaries without requiring separate infrastructure deployments for every module.

Independent services may be considered later where a documented operational or technical requirement justifies the additional complexity.

### 5.3 Deployment independence

Frontend, backend and database changes should be independently manageable where their dependencies permit.

A frontend release must not automatically imply that database migrations or backend changes are safe to execute.

Compatibility between deployed components must be considered before release.

## 6. Environment Architecture

The platform must define separate environments for development, testing and production.

### 6.1 Development environment

The development environment supports:

- Local application development.
- Feature implementation.
- Developer testing.
- Integration with non-production services.
- Database schema development.
- Debugging and diagnostics.

Development configuration must not expose production credentials unnecessarily.

Developers should use synthetic or appropriately de-identified data where realistic test data is needed.

### 6.2 Testing environment

The testing environment supports:

- Integration testing.
- Authentication and authorisation verification.
- Store isolation testing.
- Database migration testing.
- API contract testing.
- Deployment verification.
- Release candidate assessment.
- Regression testing.

Testing must use appropriately separated services, credentials and data.

Production customer and financial data must not be copied into testing without an approved need and suitable protection.

### 6.3 Staging environment

A staging environment may be introduced where it provides meaningful value.

It should resemble production sufficiently to validate deployment configuration, routing, integration behaviour and release readiness.

Staging must not be assumed to exist until its hosting, configuration, data and operational responsibilities are defined.

### 6.4 Production environment

Production supports live platform and store operations.

It must receive only authorised releases that have completed the required validation.

Production services must use production-specific credentials, access policies, domains and configuration.

### 6.5 Environment separation requirements

Each environment must have:

- Clearly identified purpose.
- Appropriate access permissions.
- Separate credentials and secrets.
- Explicit service endpoints.
- Controlled data access.
- Appropriate logging and monitoring.
- Documented deployment procedures.

A development or testing process must not accidentally target production services through inherited or incorrectly configured environment variables.

## 7. Application Hosting Architecture

### 7.1 Frontend hosting

The frontend must be hosted through a deployment service capable of serving the React/Vite production build.

The hosting arrangement must support:

- Secure public delivery.
- HTTPS.
- Domain and DNS configuration.
- Static asset delivery.
- SPA routing and fallback behaviour.
- Appropriate caching.
- Environment-specific configuration.
- Deployment history.
- Release verification.
- Rollback or redeployment.

The existing Netlify deployment remains the current production baseline.

The long-term frontend hosting provider remains an open decision.

### 7.2 Backend hosting

The target NestJS backend must run in an environment capable of supporting the application's runtime and operational requirements.

The hosting arrangement must support:

- Secure API exposure.
- Environment-specific configuration.
- Secret injection.
- Database connectivity.
- Appropriate resource allocation.
- Application logging.
- Health checks.
- Controlled deployment and restart.
- Runtime monitoring.
- Secure access to required external services.

The final backend hosting provider, runtime configuration and scaling model remain open decisions.

### 7.3 Database hosting

PostgreSQL hosting must support:

- Secure database connections.
- Controlled credentials and roles.
- Backup and recovery.
- Database monitoring.
- Schema migration procedures.
- Appropriate resource management.
- Data integrity and availability.

The current Supabase PostgreSQL database remains part of the existing production architecture.

Whether Supabase PostgreSQL remains the long-term database hosting service requires an explicit decision.

### 7.4 Authentication hosting

Authentication services must be deployed and configured independently from assumptions about frontend hosting.

The authentication provider must support the approved identity and access requirements.

Any provider migration must account for existing users, credentials, sessions, account recovery and access permissions.

### 7.5 Storage hosting

Storage services must support the approved public and private asset access model.

The deployment architecture must preserve file ownership, access policies, upload restrictions and retention requirements.

A hosting or storage migration must verify existing asset references and application dependencies before cutover.

## 8. Source Control and Release Management

### 8.1 Source control

Application source code and deployment configuration must be maintained in the approved source control repository.

Production releases must be traceable to a specific source revision.

### 8.2 Branch management

The development workflow must define how changes move from development branches into the production release branch.

Branch names, protection rules and merge requirements must be documented and applied consistently.

The current repository branch and deployment configuration must be verified before changing production release behaviour.

### 8.3 Release identification

Each production release should be identifiable through:

- Source commit or revision.
- Build output.
- Release timestamp.
- Deployment environment.
- Relevant migration identifiers.
- Release notes or change summary.

### 8.4 Release approval

Production deployment must follow an explicitly authorised release process.

The approval requirements may differ according to the sensitivity and impact of a change.

Security-sensitive, data-sensitive and financially significant changes require appropriate review before production release.

### 8.5 Release history

Deployment history must be available to support investigation, rollback and comparison between releases.

## 9. Continuous Integration and Continuous Deployment

CI/CD automation should reduce manual errors and make release validation repeatable.

### 9.1 Continuous integration

The CI process should perform applicable checks such as:

- Dependency installation using the approved lockfile.
- Type checking.
- Linting where configured.
- Unit tests.
- Integration tests.
- Build verification.
- Security checks.
- Database migration validation where practical.

The required checks must be defined according to the application and release risk.

### 9.2 Continuous deployment

Deployment automation may publish approved changes to the appropriate environment.

Production deployment must not occur merely because arbitrary code was pushed to a development branch.

The source branch, deployment target and approval conditions must be explicit.

### 9.3 Build consistency

The build process must use documented runtime and dependency versions.

Lockfiles must be maintained so that deployment environments install the intended dependency versions.

### 9.4 Pipeline permissions

CI/CD identities must have only the permissions required to build, test and deploy the relevant components.

A build process must not receive unrestricted database or platform administration access unless explicitly required and approved.

### 9.5 Pipeline secrets

Secrets used by CI/CD must be supplied through an approved secure mechanism.

They must not be printed in pipeline logs or included in build artifacts.

### 9.6 Failed pipeline behaviour

A failed required validation step must prevent the affected release from being treated as production-ready.

Exceptions must be explicitly reviewed and documented rather than silently bypassing required checks.

## 10. Build and Artifact Management

### 10.1 Build outputs

Production build outputs must be generated from reviewed source code and approved configuration.

Generated artifacts must not contain:

- Server-side credentials.
- Service-role keys.
- Database passwords.
- Private signing keys.
- Unintended internal configuration.
- Sensitive development data.

### 10.2 Artifact traceability

Where practical, release artifacts should be associated with the source revision and build process that produced them.

### 10.3 Dependency consistency

Production builds must use the approved dependency lockfile and documented runtime versions.

Unreviewed dependency changes must not be introduced into production releases.

### 10.4 Artifact integrity

The deployment process must protect release artifacts against unauthorised modification or replacement.

## 11. Environment Configuration and Secrets

### 11.1 Configuration management

Environment-specific configuration must be provided through approved configuration mechanisms.

Configuration must distinguish between public frontend values and server-side secrets.

### 11.2 Public configuration

Values intentionally exposed to the frontend must be treated as public.

A frontend environment variable must never be assumed secret merely because it is supplied through a build environment.

### 11.3 Server-side secrets

Database credentials, service-role keys, authentication secrets, signing keys and privileged integration credentials must remain server-side.

### 11.4 Secret storage

Secrets must be maintained using an approved environment configuration or secret-management mechanism.

Production secrets must not be committed to source control, included in documentation or exposed through build output.

### 11.5 Configuration validation

Applications must validate required configuration during startup or deployment.

Missing or invalid critical configuration must produce a clear operational failure rather than silently falling back to unsafe defaults.

### 11.6 Configuration changes

Changes to production configuration must be controlled and traceable.

Security-sensitive configuration changes must receive appropriate review.

### 11.7 Secret rotation

The deployment architecture must support credential rotation without unnecessary service disruption.

Rotation procedures must identify dependent services and verify that obsolete credentials are no longer accepted.

## 12. Database Deployment and Migration Management

Database changes require a controlled deployment process.

### 12.1 Migration management

Database schema changes must be maintained through version-controlled migration files or an explicitly approved migration mechanism.

Changes must not depend on undocumented manual modifications to production databases.

### 12.2 Migration review

Migrations must be reviewed for:

- Data loss.
- Data transformation correctness.
- Constraint changes.
- Referential integrity.
- Store isolation.
- Query and index impact.
- Locking and downtime risk.
- Rollback or recovery requirements.

Before a destructive or high-risk production migration, a recent backup or equivalent verified recovery point must be available. The recovery point must cover the affected data, and its restoration procedure must be understood. The existence of a scheduled backup alone is insufficient; restoration capability must be verified according to the approved recovery process.

Where migration performance, locking or resource consumption could affect production, the migration must be tested against representative data volumes and access patterns before production execution.

### 12.3 Migration execution

Production migrations must be executed through an authorised and documented process.

The migration process must identify the target database and environment before execution.

### 12.4 Backward compatibility

Where practical, database changes should support the currently deployed application and the new application during a transition period.

Breaking schema changes must be coordinated with dependent application releases.

### 12.5 Data preservation

Existing Yotaabo production records must be protected during schema changes and migration.

Destructive changes require explicit review, suitable backups and a verified recovery plan.

### 12.6 Migration verification

After migration, the relevant schema, constraints, record counts and critical business relationships must be verified.

Verification must include store ownership and data isolation where applicable.

### 12.7 Failed migrations

A failed migration must be assessed before further deployment activity.

The recovery process must account for partially applied changes and possible data modifications.

Automatic rollback must not be assumed safe for migrations that modify or remove production data.

## 13. Application Deployment Strategy

### 13.1 Deployment sequence

Deployment order must account for dependencies between:

- Database schema.
- Backend services.
- Frontend application.
- Authentication configuration.
- Storage configuration.
- Background processing.
- External integrations.

The exact sequence must be determined for each release.

### 13.2 Compatibility

The frontend and backend must remain compatible throughout deployment transitions.

An API change must not unintentionally break an existing deployed frontend.

Where necessary, backward-compatible endpoints or temporary compatibility layers should be maintained.

### 13.3 Health checks

Deployable services should expose appropriate health information.

Health checks should distinguish between:

- Process availability.
- Application readiness.
- Critical dependency availability.

A service must not be considered fully operational merely because its process has started.

### 13.4 Deployment verification

After release, verification must cover:

- Application availability.
- Authentication.
- Storefront access.
- Store administration.
- API connectivity.
- Database connectivity.
- Critical business workflows.
- Store isolation.
- External integrations where applicable.

Changes to shared platform services must also be assessed for their effect on participating stores. Deployment verification must confirm that store-specific configuration, data boundaries, permissions and critical operations remain correctly isolated.

A deployment must not unintentionally change another store's configuration, data or operational state.

### 13.5 Deployment completion

A release must be considered complete only after required verification has succeeded.

Unresolved release-blocking failures must be addressed before normal production operation resumes.

### 13.6 Production readiness assessment

Before a new production service or materially changed deployment architecture is accepted for live operation, a production readiness assessment must confirm:

- Named operational ownership and escalation responsibilities.
- Monitoring and alerting are configured and tested.
- Backups and relevant restoration procedures have been verified.
- Recovery and rollback procedures are documented and understood.
- Required security checks have passed.
- Deployment and operational documentation is available.
- Critical dependencies and provider access are accounted for.

Outstanding risks must be documented and accepted by the appropriate authority before release.

## 14. Deployment Strategies and Availability

### 14.1 Deployment approach

The deployment approach must match the hosting capabilities and operational requirements.

Possible strategies include:

- Standard replacement deployment.
- Rolling deployment.
- Blue-green deployment.
- Canary release.

These are options for evaluation, not requirements to implement every strategy.

### 14.2 Zero-downtime considerations

Where practical, releases should minimise disruption to customers and store operations.

Zero-downtime deployment must not be promised unless the infrastructure, database changes and application compatibility support it.

### 14.3 Background processing

Background jobs must be deployed and managed so that releases do not unintentionally execute duplicate or incompatible work.

Job ownership, retry behaviour and scheduling must be considered during deployment.

### 14.4 Deployment windows

High-risk changes may require planned deployment windows.

The timing and communication requirements must reflect operational impact and the needs of participating stores.

## 15. Rollback and Release Recovery

### 15.1 Rollback objectives

The platform must have a documented approach for restoring a previously working application release when a deployment causes unacceptable failures.

### 15.2 Application rollback

Application rollback should restore a known working release where the hosting platform supports it.

Rollback must account for frontend and backend compatibility.

### 15.3 Database rollback

Database rollback requires separate assessment.

Reverting application code does not automatically reverse database changes.

Where a migration cannot be safely reversed, a corrective forward migration or verified backup restoration may be required.

### 15.4 Configuration rollback

Changes to environment configuration, secrets, routing and integration settings must be traceable so that an incorrect change can be corrected.

### 15.5 Rollback verification

After recovery, critical application functions and data integrity must be verified.

The incident and corrective action must be documented.

### 15.6 Rollback authority

The authority to initiate production rollback must be defined as part of the release and incident management process.

## 16. Backup and Disaster Recovery

Backup and recovery requirements are also defined in the Security Architecture and Data Architecture documents.

### 16.1 Backup scope

Backup planning must consider:

- Database records.
- Uploaded files and media.
- Application configuration.
- Deployment configuration.
- Required operational records.
- Other critical service data.

### 16.2 Backup frequency

Backup frequency must reflect the business impact of data loss and the operational requirements of the platform.

Specific schedules remain open decisions.

### 16.3 Backup protection

Backups must be protected against unauthorised access, modification and deletion.

Access must be restricted to authorised operational responsibilities.

### 16.4 Recovery testing

Recovery procedures must be tested periodically.

A successful backup job alone does not establish that the platform can be recovered.

### 16.5 Recovery objectives

Recovery Time Objectives and Recovery Point Objectives must be defined according to business impact and available operational capacity.

### 16.6 Disaster recovery

The platform must document how critical services will be restored following a significant infrastructure or provider failure.

The recovery approach must account for database, application, storage, authentication and external service dependencies.

## 17. Monitoring and Operational Observability

### 17.1 Application monitoring

Production services must provide sufficient operational visibility to identify application failures and degraded behaviour.

### 17.2 Infrastructure monitoring

Monitoring should cover relevant infrastructure resources and service dependencies.

Examples include:

- CPU and memory utilisation.
- Storage capacity.
- Database availability.
- Database connection health.
- API response failures.
- Application process health.
- Background job failures.
- External provider availability.

### 17.3 Logging

Application and infrastructure logs must support troubleshooting, security investigation and operational review.

Logs must follow the confidentiality and retention requirements defined in the Security Architecture.

### 17.4 Alerting

Operational alerts should identify significant failures and conditions requiring intervention.

Alert thresholds, recipients and escalation responsibilities must be defined.

### 17.5 Health reporting

The platform should provide a way to distinguish normal service operation from partial or complete service failure.

Monitoring must not expose sensitive internal infrastructure details to unauthorised public users.

### 17.6 Operational review

Material deployment failures, recurring incidents and service degradation must be reviewed to identify corrective actions.

## 18. Domain, DNS and Network Configuration

### 18.1 Domain management

Production domains and subdomains must be managed through authorised accounts and documented configuration.

Domain ownership and renewal responsibilities must be defined.

### 18.2 DNS changes

DNS changes must be controlled and verified.

Changes affecting production routing must be assessed for propagation delays, service availability and rollback requirements.

### 18.3 TLS certificates

Production application endpoints must use valid TLS certificates.

Certificate issuance, renewal and expiry monitoring must be managed through the approved hosting or certificate process.

### 18.4 Routing

Routing configuration must clearly identify frontend and backend destinations.

Existing Netlify Function routes must remain compatible until their capabilities are migrated and verified.

### 18.5 Network exposure

Only required services should be publicly accessible.

Database administration and other sensitive infrastructure interfaces must not be unnecessarily exposed to the public internet.

### 18.6 Cross-origin configuration

CORS and other cross-origin controls must permit only the intended application origins and required communication patterns.

## 19. Background Jobs and Scheduled Processing

### 19.1 Job execution

Background processing must run through an explicitly managed runtime or scheduling mechanism.

Jobs must not depend on an undocumented assumption that a web application process will remain active indefinitely.

### 19.2 Job configuration

Schedules, execution settings and required credentials must be environment-specific.

Production jobs must not accidentally execute against development or testing data.

### 19.3 Duplicate execution

The architecture must account for duplicate execution, retries and concurrent workers where those conditions could affect business records.

### 19.4 Failure handling

Failed jobs must be observable and recoverable.

Retries must not create duplicate financial, inventory or order effects.

### 19.5 Deployment coordination

Changes to job logic and scheduling must be coordinated with application and database releases.

Production deployments and database migrations must be coordinated so conflicting releases cannot run concurrently against the same production resources.

The release process must provide appropriate concurrency controls or deployment locks and ensure migration execution is serialised where required.

Independent deployments may proceed concurrently only when their resources and changes are demonstrably isolated and compatible.

### 19.6 Open implementation decisions

The background processing technology, scheduling model and hosting arrangement remain open decisions until explicitly approved.

## 20. External Service and Provider Dependencies

### 20.1 Provider inventory

Production dependencies must be documented, including hosting, database, authentication, storage, payment, communication and other external providers.

### 20.2 Credential ownership

Provider accounts and credentials must be controlled by authorised business or platform owners.

Critical services must not depend indefinitely on undocumented personal accounts or inaccessible credentials.

### 20.3 Provider availability

The platform must account for provider outages, degraded service and operational limitations.

### 20.4 Provider changes

Changing a provider must include an assessment of:

- Data portability.
- Authentication continuity.
- API compatibility.
- Storage and file migration.
- Cost and operational impact.
- Security and privacy.
- Recovery and rollback.
- Service interruption.

### 20.5 Provider independence

Where practical, application modules should avoid unnecessary dependence on provider-specific implementation details.

Provider abstraction must not introduce complexity without a meaningful operational benefit.

## 21. Security and Deployment Governance

Deployment operations must comply with the Security Architecture.

### 21.1 Deployment access

Access to source control, hosting, database, storage and deployment systems must be restricted to authorised identities.

### 21.2 Privileged deployment actions

Production configuration changes, deployment permissions and infrastructure administration must be attributable and traceable.

### 21.3 Secret protection

Deployment processes must not expose secrets through source control, logs, build output or public application configuration.

### 21.4 Security verification

Security-sensitive changes must complete the required security verification before production release.

### 21.5 Emergency changes

Emergency production changes must be documented, reviewed and reconciled with the normal release process as soon as practical.

### 21.6 Separation of responsibilities

Where operational capacity permits, production release approval and deployment execution should have appropriate oversight.

The platform must not introduce unnecessary approval steps for routine development work.

## 22. Migration from Existing Deployment Architecture

Migration must preserve existing Yotaabo production operations while introducing the target deployment architecture.

### 22.1 Migration assessment

Before changing deployment infrastructure, assess:

- Existing hosting and deployment configuration.
- Frontend build and runtime requirements.
- Netlify Function dependencies.
- Supabase database and authentication dependencies.
- Storage buckets and access policies.
- Environment variables and secrets.
- Domains, DNS and redirects.
- External integrations.
- Existing monitoring and backup arrangements.

### 22.2 Incremental migration

Migration should proceed by capability or infrastructure component rather than replacing the entire production environment at once.

Existing services may continue operating while target services are introduced and verified.

### 22.3 Frontend and backend coexistence

The existing frontend may continue using Netlify Functions while NestJS capabilities are introduced.

Routing must clearly identify which service owns each endpoint.

Competing or ambiguous write paths must be avoided.

### 22.4 Database continuity

The existing production database must remain protected during backend migration.

Any change in database access, schema management or hosting must include a verified migration and recovery plan.

### 22.5 Authentication continuity

Authentication migration must preserve the approved account and permission model.

Existing sessions, recovery flows and user access must be assessed before cutover.

### 22.6 Storage continuity

Existing image and file references must continue working until replacement storage arrangements have been verified.

### 22.7 Cutover readiness

A production cutover must require:

- Successful deployment validation.
- Verified database connectivity and integrity.
- Verified authentication and authorisation.
- Verified store isolation.
- Verified critical business workflows.
- Verified storage access.
- A documented rollback or recovery plan.
- An authorised release decision.

### 22.8 Retirement of existing services

Existing deployment components must be retired only after their responsibilities, dependencies, data and credentials have been accounted for.

## 23. Deployment Documentation and Operational Procedures

The platform must maintain operational documentation for critical deployment activities.

Documentation should cover:

- Environment setup.
- Build and deployment commands.
- Configuration and secret requirements.
- Database migration procedures.
- Release verification.
- Rollback and recovery.
- Backup and restoration.
- Domain and DNS management.
- Incident escalation.
- Provider access and ownership.

Documentation must be maintained when material deployment processes change.

Operational procedures must not depend solely on undocumented knowledge held by one individual.

## 24. Non-Functional Deployment Requirements

The deployment architecture must support:

- Reliable and repeatable releases.
- Appropriate production availability.
- Secure environment separation.
- Controlled configuration changes.
- Traceable deployment history.
- Recoverability after failed releases.
- Database and file recovery.
- Maintainable infrastructure.
- Secure handling of credentials.
- Operational monitoring and diagnostics.
- Compatibility during incremental migration.
- Growth in stores, users and transaction volume.

Specific availability, performance, scaling and recovery targets remain subject to business and operational decisions.

## 25. Open Deployment Architecture Decisions

The following decisions require further assessment and approval.

### 25.1 Hosting

- Long-term frontend hosting provider.
- NestJS backend hosting provider.
- PostgreSQL hosting strategy.
- Authentication provider.
- Storage provider.
- Background processing hosting.

### 25.2 Environments

- Whether a dedicated staging environment is required.
- Environment provisioning approach.
- Development and testing service allocation.
- Production access responsibilities.

### 25.3 CI/CD

- CI/CD provider and workflow.
- Branch protection and release rules.
- Required automated quality and security checks.
- Production approval requirements.
- Artifact retention and traceability.

### 25.4 Database deployment

- Migration execution mechanism.
- Production migration approval requirements.
- Backup and restoration procedures.
- Schema compatibility strategy.

### 25.5 Availability and recovery

- Deployment strategy.
- Recovery Time Objectives.
- Recovery Point Objectives.
- Backup frequency and retention.
- Disaster recovery arrangements.

### 25.6 Monitoring

- Application monitoring provider.
- Infrastructure monitoring.
- Log aggregation and retention.
- Alerting and escalation.

### 25.7 Domains and networking

- Final domain and subdomain structure.
- DNS management.
- TLS certificate management.
- API routing and cross-origin configuration.

Unresolved decisions must remain explicitly open. They must not be implemented as assumed infrastructure or operational requirements.

## 26. Relationship to Other Documents

This document must be read together with:

- `docs/product/PRODUCT_VISION.md`
- `docs/product/PLATFORM_BUSINESS_MODEL.md`
- `docs/product/STORE_OPERATING_MODEL.md`
- `docs/product/SCOPE_AND_EXCLUSIONS.md`
- `docs/architecture/SYSTEM_ARCHITECTURE.md`
- `docs/architecture/DATA_ARCHITECTURE.md`
- `docs/architecture/STORE_ARCHITECTURE.md`
- `docs/architecture/API_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`
- `docs/identity-access/IDENTITY_AND_ACCESS.md`

The System Architecture document defines the overall application and service structure.

The Data Architecture document defines database, data ownership and recovery considerations.

The API Architecture document defines backend API boundaries and migration requirements.

The Security Architecture document defines security controls applicable to environments, credentials, deployment and operations.

This document defines how the application and its supporting services are deployed and operated.

Conflicts between documents must be resolved through documented architectural decisions.

## 27. Architecture Governance

This document is the deployment architecture baseline once approved.

Changes affecting hosting, deployment, environment separation, database migration, production routing, recovery or operational responsibilities must be reviewed against the approved architecture.

Material changes must be documented and reviewed for their impact on security, data integrity, store operations and existing production services.

Approval of this document does not mean every deployment capability has already been implemented. Implementation and operational readiness must be verified separately.
