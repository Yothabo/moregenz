# Application Security Headers and Browser Security Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

---

## 1. Purpose

This document defines browser-facing security requirements for the multi-store retail platform.

It establishes standards for HTTP security headers, browser execution restrictions, cross-origin communication, content loading, cookies, transport security, and protection against common browser-based attacks.

The objective is to reduce the risk of cross-site scripting, clickjacking, content injection, data leakage, insecure resource loading, and unauthorised browser interactions.

## 2. Scope

These standards apply to:

- Public storefronts.
- Store administration interfaces.
- Platform administration interfaces.
- Authentication and account interfaces.
- API endpoints accessed by browsers.
- Netlify-hosted frontend applications.
- Netlify Functions and other browser-facing services.
- Future NestJS-hosted frontend and API deployments.

Security configuration must be appropriate to the environment and application role.

## 3. Core Principles

### 3.1 Defence in Depth

Browser security headers supplement, but do not replace:

- Server-side authorisation.
- Input validation.
- Output encoding.
- Secure authentication.
- Database access controls.
- API security controls.
- Dependency security.
- Secure application development.

### 3.2 Explicit Configuration

Security headers and browser permissions must be explicitly configured.

The platform must not rely on hosting-provider defaults as its complete security policy.

### 3.3 Least Privilege

Browser applications should receive only the capabilities and external resource access they require.

External scripts, frames, connections, and resource origins must be restricted to approved destinations.

### 3.4 Environment Separation

Development, staging, and production may require different security configurations.

Production policies must not be weakened to accommodate development convenience.

## 4. HTTPS and Transport Security

All production storefronts, administrative interfaces, and browser-facing APIs must use HTTPS.

HTTP requests must redirect to the approved HTTPS origin where supported.

Sensitive data must never be transmitted through unencrypted HTTP.

### 4.1 TLS Requirements

Production endpoints must use currently supported TLS configurations.

Deprecated protocol versions and weak cipher configurations must not be enabled.

Certificate issuance, renewal, expiry monitoring, and revocation must be handled through the approved hosting or certificate-management process.

### 4.2 HTTP Strict Transport Security

Production HTTPS responses should include the HTTP Strict Transport Security header.

The policy must use an approved `max-age` value appropriate to the platform's operational maturity.

The `includeSubDomains` directive may be enabled only after confirming that every affected subdomain supports HTTPS.

The `preload` directive must not be enabled without an explicit operational decision and confirmation that all preload requirements are satisfied.

HSTS must not be enabled indiscriminately in local development environments.

## 5. Content Security Policy

A Content Security Policy (CSP) must be defined for browser-facing applications.

CSP must restrict the sources from which the browser may load scripts, stylesheets, images, fonts, frames, connections, and other executable resources.

### 5.1 Policy Design

The policy should define explicit directives for:

- `default-src`
- `script-src`
- `style-src`
- `img-src`
- `font-src`
- `connect-src`
- `frame-src`
- `frame-ancestors`
- `object-src`
- `base-uri`
- `form-action`

The policy must be based on actual application dependencies and approved external services.

Broad wildcard sources should be avoided.

### 5.2 Script Restrictions

Production policies must avoid unrestricted inline script execution.

Use nonces or hashes where inline scripts are necessary and supported by the deployment architecture.

Do not introduce `unsafe-eval` in production unless a documented technical requirement has been reviewed and approved.

Third-party scripts must be limited to explicitly approved providers.

### 5.3 Style Restrictions

Inline styles should be reduced where practical.

If the application framework or component library requires inline styles, the policy must accommodate the requirement without unnecessarily weakening other directives.

### 5.4 Image and Media Sources

Image and media origins must be restricted to approved sources.

For the platform's Supabase Storage usage, the required storage origin must be explicitly included where applicable.

User-supplied media must not be treated as trusted executable content.

### 5.5 API Connections

The `connect-src` directive must permit only the origins required by the application.

This may include:

- The platform API.
- Approved Supabase endpoints.
- Approved payment providers.
- Approved analytics services.
- Approved real-time communication services.

The list must be reviewed whenever integrations change.

### 5.6 Reporting and Enforcement

CSP should initially be tested in report-only mode where necessary to identify legitimate application dependencies.

Report-only mode must not become a permanent substitute for enforcement.

Before enforcing a policy, test:

- Storefront browsing.
- Product images.
- Authentication.
- Administration.
- API requests.
- Payment flows.
- Realtime features.
- Third-party integrations.

CSP violations must be monitored without logging sensitive request data.

## 6. Clickjacking Protection

Browser-facing applications must prevent unauthorised framing.

Use the CSP `frame-ancestors` directive to define permitted framing origins.

Where compatibility requires it, configure the `X-Frame-Options` header as an additional legacy protection.

The platform must not allow arbitrary external websites to embed administrative interfaces.

Any legitimate embedding requirement must be documented and explicitly approved.

## 7. MIME-Type Protection

Responses must use accurate `Content-Type` headers.

The platform should include:

`X-Content-Type-Options: nosniff`

This prevents browsers from interpreting content as a different MIME type when MIME sniffing is disabled.

Uploaded files must be served with appropriate content types and safe download behaviour.

## 8. Referrer Policy

Browser-facing applications must define a Referrer Policy.

The default production policy should minimise unnecessary disclosure of full URLs to external destinations.

A policy such as `strict-origin-when-cross-origin` may be used where compatible with application requirements.

Sensitive information must never be placed in URL query parameters merely because a referrer policy is configured.

## 9. Browser Permissions Policy

The platform must restrict browser capabilities that the application does not require.

The Permissions Policy should explicitly control features such as:

- Camera.
- Microphone.
- Geolocation.
- Payment.
- USB.
- Bluetooth.
- Clipboard access.
- Fullscreen.

Only required features should be enabled.

If a feature is not used by the application, its browser permission should be disabled where practical.

Any feature required by a future integration must be reviewed before enabling it.

## 10. Cross-Origin Resource Sharing

CORS must be configured on the server.

The platform must maintain explicit allowlists of approved origins for each environment.

### 10.1 Origin Validation

The server must validate the complete origin, including scheme, host, and port where relevant.

Wildcard origins must not be used for authenticated administrative APIs.

The server must not reflect arbitrary request origins in `Access-Control-Allow-Origin`.

### 10.2 Credentialed Requests

Credentialed cross-origin requests must use explicit allowed origins.

The server must not combine credentialed requests with a wildcard allowed origin.

Cookie-based cross-origin authentication must be reviewed together with CSRF protection and cookie attributes.

### 10.3 Preflight Requests

CORS preflight handling must allow only the required:

- Methods.
- Request headers.
- Origins.

CORS is not an authorisation mechanism. Every protected API operation must still enforce server-side authentication and permissions.

## 11. Cookies and Browser Storage

Cookies containing authentication or session information must use appropriate security attributes.

Where cookies are used, apply:

- `Secure` in production.
- `HttpOnly` for secrets that do not need JavaScript access.
- An appropriate `SameSite` policy.
- Restricted domain and path scope.
- Appropriate expiry and rotation.

Do not store long-lived authentication secrets in browser local storage unless a reviewed architecture explicitly accepts the associated risks.

Browser storage must not be treated as trusted.

The server must validate session state and permissions independently of client-side storage.

## 12. Cross-Site Request Forgery

Cookie-authenticated state-changing operations must implement appropriate CSRF protection.

Controls may include:

- CSRF tokens.
- SameSite cookie attributes.
- Origin validation.
- Referer validation where appropriate.
- Reauthentication for sensitive operations.

CORS alone does not prevent CSRF.

State-changing operations must not rely on GET requests.

Administrative actions affecting users, products, inventory, finances, permissions, or store status require appropriate protection.

## 13. External Resources and Third-Party Scripts

External browser resources introduce supply-chain and data-disclosure risks.

The platform must maintain an approved list of external script, style, font, image, and connection providers.

Before adding an external script, review:

- Business necessity.
- Provider reputation.
- Data collected.
- Permissions required.
- Security implications.
- Performance impact.
- Failure behaviour.
- Whether a self-hosted alternative is practical.

Use Subresource Integrity (SRI) for externally hosted static resources where supported and operationally appropriate.

Third-party scripts must not receive unnecessary access to customer, administrator, or session information.

## 14. Secure File and Content Handling

User-uploaded content must be treated as untrusted.

The platform must:

- Validate permitted file types.
- Validate file size limits.
- Avoid trusting file extensions alone.
- Use appropriate storage access controls.
- Prevent uploaded executable content from being served as application code.
- Apply safe content disposition where appropriate.
- Avoid rendering untrusted HTML directly.
- Use sanitisation when rich text is intentionally supported.

Administrative interfaces must not render untrusted product descriptions, customer content, or imported data as executable HTML.

## 15. Browser-Based Application Security

Frontend applications must follow secure rendering practices.

### 15.1 Output Encoding

User-controlled content must be encoded for its output context.

Avoid direct HTML injection.

Framework escape mechanisms should remain enabled.

Any intentional use of raw HTML rendering must have a documented sanitisation strategy.

### 15.2 Navigation and Redirects

Redirect destinations must be validated.

Do not accept arbitrary external redirect URLs from untrusted input.

External navigation should use safe link handling.

When opening a new browsing context, prevent unintended access to the originating window through appropriate browser protections.

### 15.3 Error Disclosure

Browser responses must not expose:

- Stack traces.
- Internal filesystem paths.
- Database details.
- Secret values.
- Internal service topology.
- Sensitive request headers.
- Authentication tokens.

Detailed diagnostic information must remain in appropriately protected server-side logs.

### 15.4 Administrative Interfaces

Platform and store administration interfaces must use the same or stronger browser security controls as public storefronts.

Administrative routes must not depend on hidden navigation links or frontend role checks for security.

All administrative API operations require server-side authorisation.

## 16. Security Headers Baseline

The production baseline should include the following headers, subject to compatibility testing.

| Header | Purpose |
|---|---|
| Strict-Transport-Security | Enforces HTTPS for supported clients |
| Content-Security-Policy | Restricts browser resource loading and execution |
| X-Content-Type-Options | Prevents MIME-type sniffing |
| Referrer-Policy | Controls referrer information disclosure |
| Permissions-Policy | Restricts browser capabilities |
| X-Frame-Options | Legacy framing protection where required |

The platform must avoid unnecessary or obsolete security headers.

Headers must be applied consistently to relevant HTML and API responses.

## 17. Environment-Specific Configuration

### 17.1 Development

Development environments may permit approved local origins and development tooling.

Any relaxed policy must be limited to the development environment.

Development settings must not be copied into production without review.

### 17.2 Staging

Staging should closely match production security configuration.

It must be used to validate CSP enforcement, CORS, cookies, HTTPS, and external integrations before production deployment.

### 17.3 Production

Production must use approved origins, enforced transport security, restrictive resource policies, and secure cookie settings.

Temporary exceptions must have:

- A documented reason.
- An owner.
- An expiry or review date.
- An approval record.
- A removal plan.

## 18. Deployment and Hosting Configuration

Security headers must be configured at the appropriate hosting or application layer.

For the current Netlify deployment, review the deployed header configuration and verify that the rules apply to:

- Storefront HTML.
- Administration HTML.
- Static assets where relevant.
- Netlify Function responses.
- API responses hosted elsewhere.

If the platform moves to NestJS or another hosting environment, security headers must be reimplemented and tested rather than assumed to carry over.

Conflicting headers from hosting and application layers must be identified and resolved.

## 19. Testing and Verification

Security configuration must be tested before production release.

### 19.1 Header Verification

Verify that production responses contain the expected headers and values.

Test representative routes and response types, not only the homepage.

### 19.2 CSP Testing

Test all supported application flows under the enforced CSP.

Investigate unexpected violations and remove unnecessary external dependencies.

### 19.3 CORS Testing

Verify:

- Approved origins are accepted.
- Unapproved origins are rejected.
- Credentialed requests use explicit origins.
- Preflight responses expose only approved methods and headers.
- API authorisation remains effective independently of CORS.

### 19.4 Cookie Testing

Verify cookie attributes, expiry, rotation, and behaviour across supported browsers.

### 19.5 Browser Security Testing

Test:

- Clickjacking resistance.
- MIME-type handling.
- CSRF protection.
- Unsafe HTML rendering.
- External redirect validation.
- Sensitive information exposure.
- Administrative interface restrictions.

Automated checks may be integrated into CI/CD, with manual review for policy changes that require application compatibility assessment.

## 20. Monitoring and Incident Response

Security-related browser violations and configuration failures must be monitored.

Events may include:

- CSP violations.
- Unexpected CORS requests.
- Missing or altered security headers.
- Insecure transport attempts.
- Authentication cookie misconfiguration.
- Unexpected external resource loading.

Monitoring must avoid collecting authentication tokens, passwords, or unnecessary personal information.

Suspected browser security incidents must follow the platform incident response procedure.

## 21. Change Management

Changes to browser security policies must be reviewed before deployment.

Changes requiring review include:

- New CSP sources.
- New external scripts.
- New CORS origins.
- New browser permissions.
- Cookie policy changes.
- Framing exceptions.
- Changes to HTTPS enforcement.

Security policy changes must be tested in staging and recorded through the approved change process.

Emergency exceptions must be time-bound and reviewed after the incident.

## 22. Acceptance Criteria

A production deployment is acceptable when:

1. HTTPS is enforced on supported production endpoints.
2. TLS configuration meets current security requirements.
3. CSP is configured and tested.
4. Framing restrictions are active.
5. MIME-type protection is enabled.
6. Referrer policy is configured.
7. Browser permissions are restricted to required features.
8. CORS uses explicit origin allowlists.
9. Authentication cookies use appropriate security attributes.
10. Cookie-authenticated state-changing operations have CSRF protection.
11. External scripts and resources are approved.
12. Untrusted content is safely rendered.
13. Administrative interfaces receive appropriate browser protections.
14. Security headers are verified across relevant response types.
15. Security configuration is monitored and documented.

## 23. Open Decisions

The following decisions require explicit approval:

- Final production CSP directives and allowed origins.
- CSP nonce or hash strategy.
- HSTS duration and subdomain policy.
- Whether any application requires cross-origin framing.
- Approved CORS origins for each environment.
- Cookie-based versus token-based authentication architecture.
- Final Permissions Policy values.
- Approved third-party browser scripts and integrations.
- Automated security-header verification tooling.
- CSP reporting destination and retention policy.

Until approved, use restrictive defaults and avoid introducing exceptions without a documented requirement.

---

## 24. Review and Approval

This document remains a draft until reviewed and approved by the Platform Owner.

Approval must confirm alignment with the platform security architecture, identity and access controls, deployment architecture, API security standards, and third-party integration requirements.
