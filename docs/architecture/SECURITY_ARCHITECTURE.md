# Security Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-2780DF8D2B |
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

This document defines the security architecture and security requirements for the multi-store retail platform.

It establishes how the platform must protect identities, applications, business data, financial records, infrastructure and operational processes.

The architecture must support multiple participating stores while preserving the separation of platform responsibilities and store-level authority.

This document describes the required security outcomes and architectural controls. It does not assume that every proposed control has already been implemented.

## 2. Security Objectives

The security architecture must:

- Protect the confidentiality, integrity and availability of platform and store information.
- Prevent unauthorised access to platform and store resources.
- Enforce isolation between participating stores.
- Protect privileged platform and store administration.
- Secure authentication, sessions, APIs and business transactions.
- Protect customer, employee, product, inventory, order and financial information.
- Maintain reliable records of security-relevant and privileged activity.
- Support detection, investigation and response to security incidents.
- Protect existing Yotaabo production operations during migration.
- Provide a security foundation that can evolve as the platform grows.

Security must be considered throughout application design, development, deployment and operation.

## 3. Security Principles

The platform must follow these principles.

### 3.1 Least privilege

Users and system components must receive only the access necessary to perform their authorised responsibilities.

Access must not be granted merely because a user belongs to the platform or a participating store.

### 3.2 Explicit authorisation

Every protected operation must require an explicit authorisation decision.

Authentication alone does not grant permission to access a resource.

### 3.3 Default deny

Access must be denied unless an applicable permission or approved public-access rule allows it.

Missing, invalid or ambiguous authorisation context must not result in broader access.

### 3.4 Store isolation

Store data and operations must remain within their authorised store context.

A user authorised for one store must not automatically gain access to another store.

### 3.5 Defence in depth

Security must not depend on one control.

Application authorisation, database constraints, infrastructure controls, monitoring and operational procedures must complement one another.

### 3.6 Secure by design

Security requirements must be considered before implementing new features, integrations, data structures and administrative workflows.

### 3.7 Accountability

Privileged and security-relevant actions must be attributable to an authenticated actor or identified system process.

### 3.8 Fail securely

Failures in authentication, authorisation, validation or security dependencies must not silently grant access or complete unauthorised operations.

### 3.9 Data minimisation

The platform must collect, process, expose and retain only the information necessary for its approved business purposes and applicable obligations.

### 3.10 Controlled change

Security-sensitive configuration and permissions must be changed through authorised and traceable processes.

## 4. Security Scope and Trust Boundaries

Security controls apply across the following areas:

- Public storefronts.
- Customer-facing application features.
- Platform administration.
- Store administration.
- Employee access.
- Backend APIs and business services.
- Database and storage services.
- Authentication and session services.
- Payment and other external integrations.
- Hosting, deployment and operational environments.
- Development and maintenance workflows.

### 4.1 Trust boundaries

The architecture must distinguish between:

- Unauthenticated public users.
- Authenticated customers.
- Authenticated store employees.
- Store Administrators.
- Platform Super Administrators.
- Internal application services.
- External service providers.
- Development and deployment environments.

Information received across a trust boundary must be validated and authorised before it is used to access or modify protected resources.

### 4.2 Client and server trust

The frontend is not a trusted security enforcement boundary.

The backend must independently validate identity, permissions, resource ownership, store context and business rules.

Client-side restrictions may improve the user experience but must never replace backend enforcement.

### 4.3 External trust

External services must be treated as independent trust domains.

Their responses, callbacks, credentials and data must be validated before they influence internal operations.

## 5. Threat Model

The architecture must account for threats including:

- Unauthorised account access.
- Credential theft and account takeover.
- Privilege escalation.
- Cross-store data exposure.
- Insecure direct object references.
- Forged or manipulated requests.
- Session theft or misuse.
- Injection attacks.
- Cross-site scripting.
- Cross-site request forgery where applicable.
- Abuse of public endpoints.
- Automated credential attacks.
- Malicious or compromised integrations.
- Exposure of application secrets.
- Unauthorised database or storage access.
- Accidental disclosure through logs or error responses.
- Malicious insiders or misuse of legitimate privileges.
- Data loss, corruption or unauthorised modification.
- Compromised development or deployment credentials.
- Denial-of-service and resource exhaustion.

Threat assessment must evolve as the platform introduces new capabilities, integrations, user categories and data types.

### 5.1 Risk assessment

Security risks must be assessed according to:

- The information or business operation exposed.
- The likelihood of exploitation.
- The potential business and customer impact.
- The number of stores and users affected.
- The effectiveness of existing controls.
- The ability to detect and recover from an incident.

High-impact risks must be addressed before the affected capability is released.

## 6. Identity and Authentication Security

Identity and authentication requirements are defined in the Identity and Access Management document.

This section establishes the security controls that apply to that model.

### 6.1 Identity verification

Authentication credentials must be verified through a trusted authentication mechanism.

The backend must not accept an identity solely because a client supplies a user identifier, email address, role or other identity claim.

### 6.2 Credential protection

Authentication credentials must be protected against unauthorised disclosure, modification and reuse.

Where passwords are managed by the platform, they must be stored using an appropriately configured password-hashing mechanism.

Plaintext passwords must never be stored or written to application logs.

### 6.3 Account security

The platform must support controls for:

- Account activation and suspension.
- Password recovery.
- Credential changes.
- Session invalidation where supported.
- Detection and handling of suspicious authentication activity.
- Controlled recovery of privileged accounts.

Privileged account recovery must not create an unauthorised path to platform administration.

### 6.4 Multi-factor authentication

Multi-factor authentication must be evaluated for privileged accounts and other access categories based on risk.

The initial implementation decision, supported methods and enforcement scope remain subject to approval.

### 6.5 Authentication failure handling

Authentication failures must not disclose whether sensitive account information exists.

Repeated authentication failures must be subject to appropriate abuse protection.

## 7. Session and Token Security

Sessions and authentication tokens must be managed according to the approved identity architecture.

Security controls must address:

- Token authenticity and signature verification.
- Issuer and audience validation where applicable.
- Expiration.
- Session validity and revocation.
- Secure token storage and transmission.
- Protection against token replay and theft.
- Session invalidation after relevant account or security changes.

Tokens must not be trusted solely because they can be decoded.

The backend must apply the approved permission freshness and revocation requirements. Changes to account status, store membership and permissions must not leave access valid indefinitely.

Where browser cookies are used for authentication, their security attributes and cross-site behaviour must be configured according to the application's deployment and authentication model.

The final token format, storage mechanism, lifetime and refresh strategy remain open implementation decisions.

## 8. Authorisation and Privileged Access

Authorisation must follow the approved Identity and Access Management and API Architecture documents.

### 8.1 Platform privileges

Platform Super Administrator permissions must be restricted to explicitly approved platform-level responsibilities.

Privileged access must not be granted through public registration, client-side configuration or unauthorised role modification.

### 8.2 Store privileges

Store Administrators must operate within their own store context and approved responsibilities.

They must not gain access to another store merely by changing a request parameter, URL, identifier or client-side selection.

### 8.3 Employee permissions

Employee access must remain limited to permissions delegated through the approved store administration model.

A Store Administrator must not grant permissions beyond their own authority.

### 8.4 Resource-level authorisation

Backend services must check access to the specific resource and requested operation.

A valid role does not automatically grant access to every record within a store.

### 8.5 Privileged operations

Sensitive actions must receive stronger protection where appropriate.

Examples include:

- Changing platform-level permissions.
- Assigning or removing privileged roles.
- Changing store ownership or administrative authority.
- Modifying security configuration.
- Accessing sensitive financial information.
- Initiating or changing financial obligations.
- Performing sensitive data exports.
- Deactivating a store.
- Changing integration credentials.

The platform must record relevant privileged actions and their outcomes.

## 9. Multi-Store Isolation Security

Store isolation is a fundamental security requirement.

### 9.1 Store context

Every store-scoped operation must establish an authorised store context on the backend.

The backend must determine whether the authenticated actor has permission to act within that context.

A store identifier supplied by the client is a resource selector, not proof of authority.

### 9.2 Data isolation

Store-scoped records must be protected against cross-store access.

This applies to:

- Products and store listings.
- Inventory and stock movements.
- Orders and order items.
- Customers and customer records.
- Employees and memberships.
- Store financial records.
- Store reports and performance data.
- Store-specific files and media.
- Store configuration.

### 9.3 Database enforcement

Database relationships and constraints must preserve store ownership where applicable.

Composite foreign keys, uniqueness constraints and other appropriate database controls must prevent invalid cross-store relationships.

Where PostgreSQL Row Level Security is adopted, policies must be designed and tested as an additional enforcement layer.

Database security must not replace backend authorisation.

### 9.4 Platform-level access

Platform-level access must be limited to explicitly authorised responsibilities.

The existence of a platform administration role must not imply unrestricted access to every sensitive record without a legitimate operational purpose.

### 9.5 Cross-store operations

Any approved cross-store operation must have an explicit business purpose, defined permissions and appropriate audit records.

Cross-store product sharing must not transfer product ownership or grant unrestricted access to another store's commercial information.

## 10. Application and API Security

API security requirements are defined in the API Architecture document.

The following controls apply across all backend endpoints.

### 10.1 Input validation

All externally supplied input must be validated on the backend.

Validation must cover:

- Data types and formats.
- Required fields.
- Allowed values.
- Length and size limits.
- Identifiers and relationships.
- Business-rule constraints.
- File type and upload restrictions where applicable.

### 10.2 Injection prevention

Database queries and external commands must use safe parameterisation or equivalent protections.

Untrusted input must not be directly interpreted as executable SQL, shell commands or other instructions.

### 10.3 Object-level access

Endpoints that retrieve, modify or delete resources must verify the actor's permission to access the specific resource.

Knowledge of a record identifier must not be sufficient to gain access.

### 10.4 Response security

API responses must expose only information required by the requesting actor and operation.

Sensitive internal details, credentials, database errors and stack traces must not be returned to public clients.

### 10.5 Browser security

The frontend and backend must use appropriate browser security controls.

These may include:

- Content Security Policy.
- Appropriate CORS configuration.
- Secure transport.
- Security-related response headers.
- Safe handling and rendering of user-supplied content.
- Appropriate cookie protections where cookies are used.

The exact configuration must reflect the deployed application and its trusted origins.

### 10.6 Rate limiting and abuse protection

Public and authenticated endpoints must have appropriate protections against excessive requests and automated abuse.

Limits should account for the endpoint's purpose, user category and operational requirements.

Rate limiting must not be treated as a replacement for authentication or authorisation.

### 10.7 Error handling

Errors must be handled consistently without exposing sensitive implementation details.

Security failures must be recorded appropriately while avoiding disclosure of secrets or unnecessary personal information.

### 10.8 Payment security

Payment processing must minimise the platform's exposure to payment card data and sensitive payment credentials.

Where supported, payment collection should use provider-hosted payment interfaces or tokenised payment methods so that sensitive card details are handled directly by the payment provider.

The platform must not store full payment card numbers, card verification values (CVV/CVC) or raw payment credentials unless a separately approved architecture and applicable compliance assessment explicitly establish the necessity and permitted handling.

Payment tokens and provider references must be protected as sensitive information.

Payment status must be established through verified provider responses or callbacks and trusted internal transaction records. A client-side success message or unverified request must not establish that a payment has succeeded.

## 11. Database and Data Security

The Data Architecture document defines the platform's data domains, ownership and relationships.

This section defines their security requirements.

### 11.1 Database access

Database access must be restricted to authorised application services and approved operational users.

Database credentials must not be exposed through public frontend code or client-accessible configuration.

### 11.2 Privileged database credentials

Privileged database credentials must be kept server-side.

Service-level credentials must not be distributed to ordinary users or embedded in browser applications.

Where a service credential bypasses database-level access policies, the application must enforce the required authorisation and store isolation before executing the operation.

### 11.3 Data integrity

The database must enforce appropriate constraints to protect record integrity.

Business transactions that require multiple related changes must use appropriate transactional boundaries.

Unauthorised or partial updates must not silently leave inconsistent business records.

### 11.4 Sensitive information

Sensitive information must be classified and protected according to its risk and business purpose.

Access to financial, customer, employee, authentication and security information must be limited to authorised responsibilities.

### 11.5 Data exports

Exports containing sensitive or store-scoped information must be authorised and restricted to the relevant scope.

Bulk exports must be recorded where they create meaningful security or privacy risk.

### 11.6 Test and development data

Production customer, employee, authentication and financial data must not be copied into development or test environments without an approved need and suitable protection.

Where realistic data is needed for testing, synthetic or appropriately de-identified data should be preferred.

## 12. Encryption and Data Transmission

### 12.1 Data in transit

Sensitive communication between clients, backend services and external providers must use appropriately configured encrypted transport.

Public application traffic must use HTTPS.

Unencrypted communication must not be used to transmit authentication credentials, access tokens or sensitive business information.

### 12.2 Data at rest

Database, storage and backup encryption capabilities must be evaluated and configured according to the selected hosting and service providers.

The platform must document which services provide encryption at rest and any additional application-level encryption requirements.

### 12.3 Application-level encryption

Application-level encryption may be required for particularly sensitive information where infrastructure-level encryption alone is insufficient.

The need, scope, key management model and recovery implications must be assessed before adoption.

### 12.4 Cryptographic standards

Cryptographic operations must use established, maintained algorithms and trusted libraries.

Custom cryptographic implementations must not be introduced.

## 13. File and Storage Security

Files and media must be protected according to their sensitivity, ownership and intended visibility.

### 13.1 Public and private assets

The platform must distinguish between intentionally public storefront assets and private files.

Public product images must not imply that all files in the same storage environment are publicly accessible.

### 13.2 Upload validation

Uploaded files must be checked for:

- Permitted file types.
- File size limits.
- Content type consistency.
- File ownership and authorised upload context.
- Safe storage and retrieval behaviour.

File extensions alone must not be treated as proof of file content.

### 13.3 Malicious file protection

Uploaded files must be handled as untrusted content.

Where appropriate to the file type and risk, uploads must be quarantined or scanned for malware before being made available to other users or public storefronts.

The platform must prevent uploaded files from being executed as application code or interpreted in unsafe contexts.

File processing and preview generation must use safe handling mechanisms and must not expose the application or its users to malicious file content.

### 13.4 Access control

Private files must require appropriate authorisation before access.

File identifiers or storage paths must not be treated as access credentials.

### 13.4 File deletion and retention

Deletion must respect business records, retention requirements and legal obligations.

Removing a product or store listing must not automatically remove files that remain necessary for historical records or other authorised uses.

### 13.5 Storage credentials

Storage service credentials and privileged access keys must remain server-side.

Public access must be limited to assets intentionally designated for public use.

## 14. Secrets and Configuration Management

### 14.1 Secret handling

Secrets include:

- Database credentials.
- Authentication service secrets.
- Service-role keys.
- API keys.
- Payment provider credentials.
- Signing keys.
- Encryption keys.
- Deployment credentials.
- Other privileged integration credentials.

Secrets must not be committed to source control or exposed through public frontend bundles.

### 14.2 Environment separation

Development, test and production environments must use appropriately separated configuration and credentials.

Production credentials must not be reused casually in local development or testing.

### 14.3 Secret storage

Secrets must be stored using an approved secure configuration or secret-management mechanism appropriate to the deployment environment.

Plaintext secret files must be excluded from version control.

### 14.4 Secret rotation

The platform must support a controlled process for replacing compromised, expired or outdated credentials.

Rotation must account for dependent services and avoid leaving obsolete credentials active unnecessarily.

### 14.5 Exposure response

A suspected secret exposure must be treated as a security incident.

The response must include assessment, revocation or rotation where necessary, investigation and verification that the exposed credential is no longer usable.

## 15. Infrastructure and Deployment Security

### 15.1 Environment protection

Production infrastructure must be protected against unauthorised access and configuration changes.

Administrative access to hosting, database, storage and deployment services must be restricted to authorised operators.

### 15.2 Deployment controls

Production releases must follow a controlled deployment process.

Changes must be traceable to source control and an authorised release process.

### 15.3 Build security

Dependencies, build tools and deployment workflows must be maintained and reviewed for relevant security risks.

Build and deployment processes must not expose secrets in logs or generated frontend assets.

### 15.4 Administrative access

Infrastructure administration must use individual authorised accounts where supported.

Shared administrative credentials should be avoided.

### 15.5 Network and service exposure

Only required application services and endpoints should be publicly accessible.

Database administration and other sensitive infrastructure interfaces must not be unnecessarily exposed to the public internet.

### 15.6 Environment-specific configuration

Security settings must be appropriate to each environment.

Development conveniences must not unintentionally weaken production security.

## 16. External Integrations and Webhooks

External integrations must follow the API Architecture and relevant integration-specific requirements.

### 16.1 Provider verification

Incoming callbacks must be verified using the provider's supported authentication or signature-verification mechanism.

A publicly reachable endpoint must not assume that an incoming request is genuine.

### 16.2 Transaction association

Provider events must be associated with internal transactions and trusted integration configuration.

A store identifier supplied only by an external request must not establish store authority.

### 16.3 Duplicate and replay handling

The backend must account for duplicate callback delivery and relevant replay risks.

Repeated delivery must not create unintended duplicate financial or operational effects.

### 16.4 Outbound requests

Requests to external providers must use approved endpoints and validated configuration.

Sensitive information must not be sent to untrusted destinations.

### 16.5 Integration permissions

Each integration must receive only the permissions and data access necessary for its purpose.

Provider credentials and access must be restricted according to the integration's operational scope.

### 16.6 Provider failure

External service failures must not silently bypass security checks or mark incomplete transactions as successful.

## 17. Logging, Monitoring and Audit Security

### 17.1 Security event logging

The platform must record relevant security events, including:

- Authentication successes and failures where appropriate.
- Account suspension and recovery.
- Privilege and permission changes.
- Store membership changes.
- Privileged administrative actions.
- Access to particularly sensitive operations.
- Security configuration changes.
- Failed authorisation attempts.
- Relevant integration verification failures.
- Suspected abuse and security incidents.

### 17.2 Audit integrity

Audit records must be protected against unauthorised modification and deletion.

Access to audit information must itself be controlled.

### 17.3 Log confidentiality

Logs must not contain plaintext passwords, authentication tokens, secret keys or unnecessary sensitive personal information.

Sensitive values must be redacted or excluded.

### 17.4 Monitoring

Security-relevant events must be available for operational review and incident investigation.

Monitoring capabilities should support detection of unusual authentication activity, repeated access violations, suspicious administrative actions and abnormal service behaviour.

### 17.5 Time consistency

Systems producing security and audit records should use consistent time handling so that events can be correlated reliably.

### 17.6 Alerting

Alerting requirements and thresholds must be defined according to operational risk and available monitoring capabilities.

Not every logged event requires an immediate alert.

## 18. Vulnerability and Secure Development Management

### 18.1 Dependency management

Application dependencies must be maintained and reviewed for known vulnerabilities.

Unmaintained or unnecessary dependencies should be replaced or removed where practical.

### 18.2 Code review

Changes affecting authentication, authorisation, store isolation, financial operations, data access or secrets require appropriate review before production deployment.

### 18.3 Security testing

Security testing must cover relevant application and infrastructure risks.

Testing should include:

- Authentication and session handling.
- Role and permission enforcement.
- Cross-store isolation.
- Object-level authorisation.
- Input validation.
- Injection resistance.
- File upload and access controls.
- API abuse protection.
- Secret exposure.
- Integration verification.
- Database access boundaries.

### 18.4 Automated checks

Automated security checks should be incorporated into development and deployment workflows where practical.

These may include dependency scanning, static analysis, secret detection and application security tests.

### 18.5 Security regression testing

Previously identified security vulnerabilities must have regression tests where practical.

Changes to access-control logic must be tested against both authorised and unauthorised scenarios.

### 18.6 Production security verification

Critical security workflows must be tested before the affected capability is released to production.

Verification must include, where applicable:

- Platform Super Admin authentication, privileged access and account recovery.
- Store isolation, including attempts to access or modify another store's records.
- Store Administrator permission delegation and privilege-escalation attempts.
- Order integrity and payment verification.
- Authorisation of sensitive data exports.
- Account recovery, session invalidation and permission revocation.

Tests must cover both permitted and denied operations. Results and unresolved security findings must be reviewed before production release.

A successful build or ordinary integration test suite does not, by itself, demonstrate that security boundaries are effective.

## 19. Privacy and Information Handling

The platform must handle personal information responsibly and according to applicable South African legal requirements, including the Protection of Personal Information Act (POPIA) where applicable.

### 19.1 Purpose limitation

Personal information must be processed for defined and legitimate business purposes.

### 19.2 Data minimisation

The platform must avoid collecting information that is not necessary for the relevant business function.

### 19.3 Access and disclosure

Personal information must only be accessible to authorised users and services with a legitimate purpose.

Disclosure to external providers must be assessed according to the service and applicable obligations.

### 19.4 Retention

Retention periods must be defined according to business requirements and applicable legal obligations.

Deactivation of a store or account must not automatically result in deletion of records that must be retained.

### 19.5 Data subject requests

The platform's operational processes must account for applicable requests relating to personal information, including access, correction and deletion where legally appropriate.

### 19.6 Legal review

Privacy notices, consent requirements, retention periods, operator arrangements, cross-border processing and other legal obligations must receive appropriate professional review.

This document does not replace legal advice or determine the legal status of participating stores.

## 20. Backup, Recovery and Availability Security

### 20.1 Backup protection

Backups must be protected against unauthorised access, modification and deletion.

Backup access must be restricted to authorised operational responsibilities.

### 20.2 Recovery capability

The platform must maintain a documented recovery process for relevant application, database and storage services.

Recovery procedures must be tested periodically.

### 20.3 Recovery integrity

Restored data must be checked for integrity and consistency before affected services return to normal operation.

### 20.4 Availability protection

The platform must consider service availability risks, including resource exhaustion, infrastructure failure and malicious denial-of-service activity.

### 20.5 Recovery objectives

Recovery Time Objectives and Recovery Point Objectives must be defined according to business impact and operational capacity.

Specific targets remain open decisions.

## 21. Security Incident Response

The platform must maintain a process for identifying, assessing, containing, investigating and resolving security incidents.

### 21.1 Incident categories

Potential incidents include:

- Compromised user accounts.
- Unauthorised privileged access.
- Cross-store data exposure.
- Database or storage compromise.
- Secret or credential exposure.
- Malicious file uploads.
- Integration compromise.
- Data loss or unauthorised modification.
- Service disruption caused by an attack.
- Suspected personal information breaches.

### 21.2 Incident handling

The incident response process must cover:

1. Detection and reporting.
2. Initial assessment and severity classification.
3. Containment of affected accounts, services or credentials.
4. Investigation and preservation of relevant evidence.
5. Recovery and restoration.
6. Verification of security controls.
7. Communication with affected stakeholders where appropriate.
8. Documentation and lessons learned.

### 21.3 Incident authority

Responsibilities for declaring, managing and closing incidents must be defined.

Material incidents affecting stores, customers, financial information or platform security must be escalated to the appropriate responsible authority.

### 21.4 Breach notification

Where a personal information breach or other incident triggers a legal notification obligation, the platform must follow applicable legal requirements and obtain appropriate professional guidance.

### 21.5 Post-incident review

Material incidents must be reviewed to identify root causes, control failures and corrective actions.

## 22. Security During Migration

Migration from the current Yotaabo architecture must preserve existing security protections and production operations.

### 22.1 Existing security baseline

The current React/Vite frontend, Netlify Functions, Supabase services and their existing authentication and access-control behaviour must be assessed before migration.

Existing security behaviour must not be assumed to be complete or correct without verification.

### 22.2 Incremental migration

Security controls must be reviewed for each capability as it moves to the target NestJS backend.

The migration must not create a period where a capability is accessible through a less secure alternative path.

### 22.3 Credential protection

Existing secrets must remain protected during migration.

Credentials must not be copied into frontend code, source control, public build artifacts or unprotected documentation.

### 22.4 Identity continuity

Existing user accounts, authentication flows, sessions and access permissions must be assessed before any identity migration or replacement.

Migration must not silently grant additional privileges or invalidate required access without a controlled transition.

### 22.5 Data protection

Existing customer, product, order, inventory and financial data must be preserved and validated during migration.

Migration processes must maintain data ownership and store boundaries.

### 22.6 Cutover security

Before a migrated capability becomes authoritative in production, its authentication, authorisation, data isolation, logging and failure behaviour must be verified.

Old endpoints and credentials must be retired only after their dependencies and replacement controls have been confirmed.

## 23. Security Governance and Responsibilities

Security is a shared responsibility across platform ownership, store administration, development and operations.

### 23.1 Platform Owner

The Platform Owner is responsible for platform-level security governance, including:

- Approval of platform security policies.
- Oversight of privileged access.
- Review of material security risks.
- Approval of security-sensitive architectural decisions.
- Oversight of material incidents.
- Ensuring appropriate professional review where required.

### 23.2 Store Administrators

Store Administrators are responsible for security within their delegated store responsibilities, including:

- Managing authorised store access.
- Delegating employee permissions within their authority.
- Protecting store credentials and devices.
- Reporting suspected security incidents.
- Following approved platform security requirements.

### 23.3 Employees

Employees must use platform access only for authorised responsibilities and protect their credentials.

### 23.4 Development and operations

People responsible for development and operations must implement, maintain and verify the security controls applicable to their responsibilities.

### 23.5 Security exceptions

Exceptions to approved security requirements must have a documented business justification, risk assessment, approval authority and review period.

An exception must not silently weaken store isolation or grant unauthorised privileges.

## 24. Non-Functional Security Requirements

The platform's security controls must satisfy the following requirements:

- Security enforcement must be consistent across frontend and backend entry points.
- Authorisation decisions must be based on verified identity and current permissions.
- Store isolation must be enforced across all store-scoped operations.
- Sensitive information must not be exposed through public responses or application logs.
- Security-relevant actions must be traceable.
- Security controls must remain effective during partial service failures.
- Security mechanisms must support testing and verification.
- Security controls must scale with the number of participating stores and users.
- Security configuration must be maintainable and auditable.
- Security must not depend on undocumented manual intervention for routine enforcement.

Specific performance, monitoring and recovery targets remain subject to operational decisions.

## 25. Open Security Architecture Decisions

The following decisions require further assessment and approval.

### 25.1 Authentication and identity

- Whether the existing Supabase Auth service will remain the long-term identity provider.
- Whether and how multi-factor authentication will be enforced.
- Session lifetime, refresh and revocation policies.
- Privileged account recovery procedures.

### 25.2 Database security

- Whether PostgreSQL Row Level Security will be adopted across all store-scoped tables.
- The database role and credential model for NestJS.
- The approach to privileged service access and database administration.

### 25.3 Encryption and secrets

- Hosting-level encryption capabilities and any additional application-level encryption requirements.
- Secret-management service and credential rotation process.
- Key management and recovery requirements.

### 25.4 Infrastructure and monitoring

- Target hosting security configuration.
- Network access restrictions.
- Security monitoring and alerting capabilities.
- Dependency and vulnerability scanning tools.
- Backup protection and recovery arrangements.

### 25.5 Privacy and compliance

- Applicable data retention periods.
- Personal information handling and disclosure procedures.
- Cross-border processing considerations.
- Required legal and professional reviews.

### 25.6 Incident response

- Incident severity classifications.
- Escalation responsibilities.
- Communication procedures.
- Recovery targets and testing frequency.

Unresolved decisions must remain explicitly open. They must not be implemented as assumed business or security rules.

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
- `docs/identity-access/IDENTITY_AND_ACCESS.md`

The Identity and Access Management document defines identity, roles, permissions and account lifecycle.

The API Architecture document defines API-level authentication, authorisation and request security requirements.

The Data Architecture document defines data ownership, relationships, integrity and database security considerations.

This document consolidates the wider security architecture across those areas.

Where requirements overlap, the documents must be interpreted consistently. Conflicts must be resolved through documented architectural decisions.

## 27. Architecture Governance

This document is the security architecture baseline for the multi-store platform once approved.

Changes to security requirements must be reviewed when they affect:

- Authentication or authorisation.
- Privileged access.
- Store isolation.
- Sensitive data handling.
- Financial operations.
- External integrations.
- Infrastructure security.
- Incident response.
- Legal or privacy obligations.

Material changes must be documented and reviewed against the other approved architecture and product documents.

Security architecture approval does not mean that every control has already been implemented. Implementation status must be verified separately through development, testing and operational review.
