# Dependency and Software Supply-Chain Security Standards

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define how application dependencies, development tools, build processes and third-party software are selected, maintained and secured.

The objective is to reduce vulnerabilities, supply-chain compromise, dependency confusion, malicious package installation and avoidable maintenance risk.

## Scope

These standards apply to:

- Frontend dependencies.
- Backend dependencies.
- Development dependencies.
- Build tools and plugins.
- Runtime packages.
- Database drivers and extensions.
- Container images where used.
- CI/CD actions and build tooling.
- External SDKs.
- Code generators and downloaded binaries.
- Package registries and distribution sources.

## Core Principles

Every dependency introduces maintenance, security and operational responsibility.

Dependencies must have a clear purpose and an identified source.

Prefer actively maintained packages with established security practices.

Avoid unnecessary dependencies and overlapping functionality.

Security updates must be assessed and applied through controlled changes.

A successful installation or build does not establish that a package is trustworthy.

## Dependency Selection

Before introducing a dependency, assess:

- Its purpose and necessity.
- Maintenance activity.
- Release history.
- Known security vulnerabilities.
- Licence and usage conditions.
- Transitive dependency count.
- Compatibility with the existing stack.
- Long-term support expectations.
- Availability of alternatives.
- Impact if the package becomes unavailable.

Prefer established packages that solve a real requirement.

Do not introduce a dependency solely for a trivial operation that can be implemented safely with existing platform capabilities.

## Approved Sources

Install packages from recognised and approved package registries.

Verify package names and publishers before installation.

Avoid installing packages from unverified links, unknown repositories or unofficial mirrors.

Be alert to similarly named packages and dependency-confusion attempts.

Downloaded binaries and scripts must have a trusted source and integrity verification where available.

## Dependency Lockfiles

Commit the applicable dependency lockfiles.

Use reproducible installation commands in development and CI environments.

Avoid changing dependency versions unintentionally during routine installation.

Review lockfile changes alongside the corresponding dependency change.

Do not manually edit lockfiles unless the package manager's documented process requires it.

## Version Management

Use explicit and intentional dependency versioning.

Avoid uncontrolled automatic updates.

Assess major version changes for breaking changes, migration requirements and compatibility.

Keep production and development dependency classifications accurate.

Do not upgrade unrelated packages in the same change without a clear reason.

## Vulnerability Management

Scan dependencies for known vulnerabilities using suitable tooling.

Assess findings based on:

- Severity.
- Exploitability.
- Whether the affected package is used.
- Whether the vulnerable functionality is reachable.
- Exposure of the affected component.
- Availability of a fixed version or mitigation.
- Potential effect on stores and shared platform services.

Critical and high-risk vulnerabilities require prompt investigation and remediation.

Document accepted residual risks, their rationale and review conditions.

Do not suppress vulnerability findings without an approved reason.

## Dependency Updates

Updates must follow the normal development and change-management process.

For each material update:

1. Identify the reason for the update.
2. Review release notes and breaking changes.
3. Review security advisories.
4. Update the dependency and lockfile.
5. Run relevant automated tests.
6. Build affected applications.
7. Verify affected integrations and workflows.
8. Record any required migration or rollback steps.

Emergency security updates may follow the emergency change process.

## Transitive Dependencies

Review significant transitive dependency changes.

A direct dependency may introduce packages that have their own vulnerabilities, licences and maintenance risks.

Do not assume that an indirect package is safe merely because the application did not explicitly install it.

Investigate unexpected or unexplained dependency-tree changes.

## Package Scripts and Installation Hooks

Treat package installation scripts as executable code.

Review dependencies that execute installation or post-install scripts, especially when they access the filesystem, network or environment variables.

Do not expose production secrets to untrusted installation or build processes.

Run package installation and build processes with the minimum permissions required.

## Licence Management

Assess dependency licences before adoption.

Identify licence obligations that may affect distribution, modification or commercial use.

Do not assume that publicly available source code is automatically unrestricted for commercial use.

Record dependencies requiring legal or commercial review.

## Build and CI/CD Security

Build processes must use trusted tools and controlled configuration.

CI/CD credentials must be scoped to the required repository and operations.

Avoid exposing secrets in build logs, artifacts or generated frontend bundles.

Pin or otherwise control third-party CI/CD actions and build dependencies according to the platform's security requirements.

Restrict privileged deployment operations.

Review changes to build scripts and deployment configuration as security-relevant changes.

## Secrets and Environment Variables

Dependency installation, builds and tests must not expose private credentials unnecessarily.

Local `.env` files must not be committed.

Public frontend configuration must contain only values intended for public exposure.

Database passwords, service-role credentials, signing secrets and privileged provider credentials must remain server-side.

Review generated bundles and build artifacts for accidental secret exposure.

## Software Integrity

Use integrity checks and package-manager verification features where available.

Investigate unexpected package changes, registry redirects or suspicious publisher changes.

Preserve the ability to identify the exact dependency versions used to produce a release.

Production builds should be reproducible from the reviewed source and dependency state.

## Third-Party Tools

Development tools, code generators and command-line utilities must be evaluated like application dependencies.

Do not run unknown scripts with elevated permissions.

Review commands before executing destructive or privileged operations.

Keep tooling requirements documented so that developers can reproduce the environment.

## Termux Development Environment

Development standards must support the Platform Owner's Android Termux environment.

Commands and tools must be compatible with the actual environment where practical.

Do not assume that desktop-only tooling, Docker Desktop, systemd or sudo is available.

Where a tool is unavailable on Termux, document a suitable alternative without weakening production security requirements.

## Dependency Removal

Remove unused dependencies through controlled changes.

Confirm that the dependency is not required by build scripts, runtime code, tests or deployment tooling.

Review lockfile changes and run relevant tests after removal.

Avoid leaving abandoned or vulnerable packages in the project without a documented reason.

## Incident Response

Suspected dependency compromise must be treated as a security incident.

Potential actions include:

- Stop using the affected package or release.
- Identify affected application versions and builds.
- Review package and build integrity.
- Rotate exposed credentials.
- Rebuild from a trusted dependency state.
- Review production deployments.
- Assess whether customer or store data was exposed.
- Preserve evidence.
- Record remediation and recovery decisions.

Follow the incident response playbook.

## Testing and Release Requirements

Before production release:

- Review material dependency changes.
- Check known vulnerabilities.
- Verify lockfiles are committed.
- Confirm builds use approved sources.
- Run relevant automated tests.
- Inspect unexpected build or package changes.
- Confirm secrets are not included in artifacts.
- Record unresolved security risks.

Critical unresolved supply-chain risks must be addressed or formally accepted by the authorised decision-maker before release.

## Exceptions

Exceptions must identify the dependency, reason, risk, compensating controls, responsible owner and review date.

Temporary exceptions must not become permanent through inactivity.

## Open Decisions

The following require further technical agreement:

- Approved dependency scanning tools.
- Vulnerability severity response targets.
- Dependency update cadence.
- Licence review responsibility.
- CI/CD action pinning policy.
- Software bill of materials requirements.
- Build artifact signing and provenance.
- Approved package registries and mirrors.

## Relationship to Other Documents

This document should be read with:

- `DEVELOPMENT_STANDARDS.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`
- `TESTING_STRATEGY.md`
- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `CHANGE_MANAGEMENT_POLICY.md`
- `PRODUCTION_READINESS_CHECKLIST.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`
- `docs/architecture/DEPLOYMENT_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to dependency and build security standards must be assessed across the shared platform and independently developed storefronts.
