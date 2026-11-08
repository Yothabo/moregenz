# Domain, DNS and TLS Certificate Management Standards

**Status:** DRAFT
**Version:** 0.1
**Last Updated:** 2026-11-07
**Document Owner:** Platform Owner
**Review Status:** Pending
**Classification:** Internal

## 1. Purpose

This document defines standards for registering, configuring, securing, monitoring and maintaining domains, DNS records and TLS certificates used by the platform and participating stores.

It establishes controls for domain ownership, DNS changes, certificate renewal, environment separation and recovery from domain or certificate-related incidents.

## 2. Scope

These standards apply to:

- The platform's primary domains and subdomains.
- Participating store domains and subdomains.
- Application and API domains.
- Administrative interfaces.
- Email-related DNS records.
- Domain verification records.
- DNS hosting and management services.
- TLS certificates and certificate authorities.
- Domain transfers, renewals and expiration management.

## 3. Domain ownership and registration

- Every production domain must have a clearly documented legal or organisational owner.
- Domain registration must use an authorised organisational account wherever possible.
- Domain ownership must not depend solely on an individual employee or contractor.
- Registrar accounts must use strong authentication.
- Domain renewal settings and payment responsibility must be documented.
- Domain transfer and recovery procedures must be available to authorised platform administrators.
- Registration details must be accurate and maintained.
- Domain ownership disputes must be escalated through the platform governance process.

The platform must retain administrative control over domains required for shared platform services.

Store-specific domains must have documented ownership and authorised management arrangements.

## 4. Domain inventory

Maintain an authoritative inventory of managed domains.

The inventory should include:

- Domain name.
- Purpose.
- Owner.
- Registrar.
- DNS hosting provider.
- Environment.
- Related application or service.
- Responsible administrator.
- Renewal date.
- Certificate issuer.
- Certificate expiration date.
- DNS change history.
- Relevant recovery instructions.

Access to the inventory must be restricted according to operational responsibilities.

Sensitive account credentials and private keys must not be stored in the inventory.

## 5. DNS management

DNS configuration must be managed through authorised accounts and documented procedures.

Common record types include:

- A and AAAA records.
- CNAME records.
- MX records.
- TXT records.
- CAA records.
- SRV records where required.

Every production DNS record must have a documented purpose.

### 5.1 Change controls

Before changing production DNS:

- Identify the affected domain and services.
- Confirm the intended record values.
- Assess the impact on storefronts, APIs, email and integrations.
- Identify dependencies and existing records.
- Record the proposed change.
- Obtain required approval.
- Define a verification and rollback approach.

After a change:

- Verify DNS resolution.
- Confirm affected services remain reachable.
- Check TLS certificate validity.
- Verify email records where relevant.
- Record the result and any follow-up actions.

Avoid deleting records simply because their purpose is not immediately obvious.

### 5.2 DNS propagation

- Account for DNS caching and configured TTL values.
- Do not assume every resolver will reflect a change immediately.
- Plan critical DNS changes with sufficient lead time.
- Verify from more than one appropriate resolver where necessary.
- Communicate expected service impact before making disruptive changes.

## 6. Environment separation

Production, staging and development environments must use clearly identifiable domain names or subdomains.

- Production records must not accidentally point to development services.
- Development configuration must not overwrite production DNS.
- Staging environments must not expose production administrative functions without explicit authorisation.
- Environment-specific credentials and certificate configuration must remain separate.
- Temporary testing records must be removed through an authorised cleanup process.

## 7. TLS certificate standards

Production web applications and APIs must use valid TLS certificates.

- Use certificates issued by trusted certificate authorities.
- Protect private keys from unauthorised access.
- Renew certificates before expiration.
- Use automated renewal where supported and operationally reliable.
- Monitor certificate validity and renewal failures.
- Ensure certificate names cover the intended hostnames.
- Avoid disabling certificate validation to work around deployment problems.
- Do not expose private keys in repositories, logs or client-side configuration.

Certificate deployment must be verified after issuance or renewal.

## 8. Certificate renewal and lifecycle

Certificate management must account for:

- Certificate issuance.
- Domain validation.
- Installation or platform configuration.
- Renewal scheduling.
- Expiration monitoring.
- Revocation.
- Replacement.
- Emergency recovery.

Automated renewal must be monitored rather than assumed to be successful.

A renewal failure must generate an actionable alert with an assigned operational owner.

Expired or invalid certificates must be treated as service-impacting incidents where they affect production availability.

## 9. Certificate authority authorisation

Where supported, use DNS-based certificate authority authorisation records to restrict which certificate authorities may issue certificates for managed domains.

- Review authorised certificate authorities.
- Remove obsolete authorisations.
- Document exceptions.
- Test proposed changes before applying them to critical domains.
- Ensure CAA records do not prevent legitimate automated renewal.

CAA configuration must reflect the actual certificate issuance model.

## 10. Email-related DNS records

Email delivery and domain authentication require correctly maintained DNS records.

These may include:

- SPF.
- DKIM.
- DMARC.
- MX.
- Provider-specific domain verification records.

Email DNS changes must follow the email delivery and template management standards.

Avoid creating multiple conflicting SPF records.

Changes to email authentication records must be verified with the relevant email provider and monitored for delivery impact.

## 11. Domain verification and third-party services

Third-party services may require DNS records to verify domain ownership or configure integrations.

- Verify the service and request before adding records.
- Confirm the record belongs to the intended platform or store.
- Document the purpose and responsible service.
- Remove obsolete verification records when appropriate.
- Do not grant broader domain control than the service requires.
- Keep ownership verification separate from operational service configuration.

Third-party domain verification must not be treated as permission to transfer or surrender domain ownership.

## 12. Store-specific domains

Participating stores may use approved custom domains.

- Store domain ownership must be documented.
- Domain configuration must map to the correct store.
- Store domain mappings must be validated server-side.
- A customer-controlled hostname must not be trusted as proof of store ownership.
- Domain mapping changes must be authorised.
- A domain must not be reassigned to another store without an approved ownership and migration process.
- Deactivating a store must not automatically release its domain or remove historical records.

Store-specific domains must not bypass platform security, routing or tenant-isolation controls.

## 13. Domain and DNS security

- Enable registrar account protection and multi-factor authentication.
- Enable domain transfer locks where appropriate.
- Restrict DNS administration to authorised personnel.
- Use individual accounts rather than shared administrator credentials where supported.
- Review DNS provider access periodically.
- Monitor unexpected DNS changes.
- Protect DNS API tokens as secrets.
- Revoke access promptly when personnel or providers no longer require it.
- Maintain recovery access independently of a single administrator.

DNS management credentials must follow the secrets and credential management standards.

## 14. Monitoring and alerting

Monitor:

- Domain expiration dates.
- Certificate expiration dates.
- Certificate renewal failures.
- DNS resolution failures.
- Unexpected DNS record changes.
- Domain transfer or registrar changes.
- Certificate hostname mismatches.
- TLS configuration failures.
- Email authentication record failures where monitoring is available.

Alerts must identify the affected domain, service, operational owner and required response.

## 15. Incident response

Domain, DNS or certificate incidents may include:

- Domain expiration.
- Unauthorised domain transfer.
- DNS hijacking or unexpected record changes.
- Certificate expiration.
- Failed certificate renewal.
- Incorrect DNS configuration.
- Loss of registrar or DNS provider access.
- Email authentication failure.

Response must prioritise containment, restoration and preservation of evidence.

The incident process should:

1. Identify affected domains and services.
2. Confirm whether the issue is an ownership, DNS, certificate or provider problem.
3. Restrict unauthorised access where possible.
4. Restore trusted configuration.
5. Verify DNS and TLS behaviour.
6. Confirm application and email service recovery.
7. Record the incident and corrective actions.

Suspected account compromise or domain hijacking must be escalated immediately.

## 16. Backup and recovery

Maintain recoverable records of critical DNS configuration.

Recovery information should include:

- Previous approved DNS records.
- Domain registrar details.
- DNS hosting details.
- Certificate configuration and renewal approach.
- Authorised administrator contacts.
- Provider support and recovery procedures.
- Relevant change history.

Private keys must be backed up only through an approved secure mechanism where backup is necessary and permitted.

Recovery procedures must be tested periodically for critical production domains.

## 17. Domain retirement and transfer

Retiring or transferring a domain requires an approved process.

Before retirement:

- Identify applications and integrations using the domain.
- Check email and customer communication dependencies.
- Confirm outstanding contractual or operational obligations.
- Assess redirects and customer impact.
- Preserve relevant records.
- Obtain required approval.

Do not release or transfer a production domain while it remains necessary for active services, historical customer access or unresolved obligations.

## 18. Acceptance criteria

Domain and certificate management is acceptable when:

- Every production domain has documented ownership.
- Domain and DNS administration is restricted.
- DNS records have documented purposes.
- Environment separation is maintained.
- Production services use valid TLS certificates.
- Certificate renewal is monitored.
- Email authentication records are managed correctly.
- Store domain mappings preserve tenant isolation.
- Changes are authorised and auditable.
- Expiration and configuration failures generate actionable alerts.
- Recovery procedures are documented.
- Domain retirement follows an approved process.

## 19. Outstanding decisions

The following require platform approval:

- Approved domain registrar.
- Approved DNS hosting provider.
- Domain ownership model for participating stores.
- Certificate issuance and renewal provider.
- Certificate monitoring thresholds.
- DNS change approval responsibilities.
- Domain inventory ownership.
- DNS configuration backup frequency.
- Domain transfer and retirement approval process.
