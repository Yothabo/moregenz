# API Security, Authentication and Authorisation Testing Procedure

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define a consistent procedure for testing API authentication, authorisation, access boundaries and security controls.

The objective is to verify that users, services and independently developed storefronts can access only the operations and data they are authorised to access.

## Scope

This procedure applies to:

- Platform APIs.
- Store APIs.
- Platform Super Admin operations.
- Store Admin operations.
- Employee operations.
- Customer-facing endpoints.
- Service-to-service integrations.
- Webhooks.
- File and media endpoints.
- Administrative and financial operations.
- Background processing interfaces.

## Testing Principles

Security testing must verify both permitted and denied operations.

A successful response does not prove that access control is correct.

Tests must verify the identity, role, active membership, store context and permission required for each protected operation.

The backend is the authoritative enforcement point.

Frontend visibility and client-supplied identifiers must never be treated as security controls.

## Test Planning

Before testing a protected API operation, identify:

- The operation and business purpose.
- The required identity.
- The required role or permission.
- The relevant store scope.
- The expected data ownership.
- The expected allowed outcome.
- The expected denied outcome.
- Any financial, privacy or operational impact.

Prioritise high-risk operations.

## Test Identities

Maintain controlled test identities representing relevant access levels.

Test identities should include, where applicable:

- Platform Super Admin.
- Store Admin.
- Store employee with limited permissions.
- Store employee without the required permission.
- Customer.
- Unauthenticated visitor.
- Integration service identity.
- Revoked or suspended identity.

Test identities must not use production credentials.

## Authentication Testing

Verify that protected endpoints reject requests without valid authentication.

Test:

- Missing credentials.
- Invalid credentials.
- Expired tokens.
- Malformed tokens.
- Incorrect token signatures.
- Revoked sessions where supported.
- Disabled accounts.
- Suspended accounts.
- Inactive store memberships.
- Invalid service credentials.

Authentication failures must not disclose secrets or unnecessary account information.

## Token and Session Freshness

Verify that changes to account status, membership or permissions take effect according to the approved revocation and freshness mechanism.

A previously issued token must not indefinitely preserve access after:

- Account suspension.
- Membership removal.
- Permission revocation.
- Credential compromise.
- Session invalidation.

Test the actual backend behaviour rather than assuming token claims are always current.

## Role-Based Authorisation

For every protected operation, verify that the required role and permission are enforced.

Test both authorised and unauthorised users.

Verify that users cannot gain additional authority by:

- Changing request parameters.
- Modifying browser state.
- Editing local storage.
- Altering client-side role values.
- Calling endpoints directly.
- Replaying requests from another account.

## Platform Authority

Verify that Platform Super Admin operations require the appropriate platform-level authority.

Test that Store Admins and employees cannot:

- Create platform administrators.
- Change platform-wide security controls.
- Access unrestricted platform administration.
- Modify another store's administrative membership.
- Perform platform financial operations without the required authority.

## Store Authority

Verify that Store Admins can perform permitted operations within their own store.

Test that Store Admins cannot:

- Administer another store.
- Change another store's employees.
- Read another store's private records.
- Modify platform-owned configuration.
- Grant permissions beyond their delegated authority.
- Bypass platform-level restrictions.

## Store Isolation Testing

Store isolation must be tested as a critical security requirement.

Create test records for at least two independent stores.

Verify that one store cannot access or modify another store's:

- Products and listings.
- Inventory.
- Orders.
- Customers.
- Employees.
- Financial records.
- Store configuration.
- Reports.
- Private integration settings.
- Uploaded files.

Test read, create, update, delete, export and search operations where applicable.

## Client-Supplied Store Context

Test requests that contain:

- A valid store identifier belonging to the user.
- A valid store identifier belonging to another store.
- A nonexistent store identifier.
- A missing store identifier.
- A modified store identifier.
- Conflicting store identifiers in different request locations.

The backend must resolve and validate store context using trusted identity and membership information.

A client-supplied store identifier must not independently establish authority.

## Object-Level Authorisation

Test whether users can access records by changing identifiers in request paths, query parameters or request bodies.

Examples include:

- Order identifiers.
- Product identifiers.
- Customer identifiers.
- Employee identifiers.
- Inventory identifiers.
- Financial record identifiers.
- Uploaded file identifiers.

A valid record identifier must not grant access to the record.

## Function-Level Authorisation

Verify that protected operations enforce permissions independently of interface navigation.

Test direct requests to administrative endpoints, including operations that are hidden from ordinary users.

Verify that the backend rejects operations outside the caller's authority.

## Product and Catalogue Permissions

Test product ownership and store listing boundaries.

Verify that:

- Source product information is editable only by its authorised owner.
- Store-specific commercial information is editable only by authorised store users.
- Store listing availability is controlled by the correct authority.
- A store cannot alter another store's listing.
- Shared catalogue access does not grant unrestricted source-product editing rights.

## Inventory Permissions

Verify that inventory operations are restricted to the relevant store and permission.

Test:

- Stock adjustments.
- Reservations.
- Transfers.
- Stock counts.
- Inventory corrections.
- Variant-level stock.
- Inventory exports.

A store must not modify another store's stock.

## Commerce and Payment Permissions

Test access controls for:

- Cart operations.
- Order creation.
- Order retrieval.
- Order modification.
- Cancellation.
- Refund initiation.
- Payment status.
- Payment reconciliation.
- Dispute and chargeback records.

Verify that users cannot change authoritative payment outcomes through client-supplied values.

Financial operations must enforce the required approval and separation-of-duties controls.

## Customer Data Permissions

Verify that customer information is accessible only within the approved ownership and privacy boundaries.

Test:

- Customer profile retrieval.
- Contact information.
- Order history.
- Customer search.
- Customer exports.
- Data correction.
- Deletion and anonymisation requests.

Cross-store customer access must not be assumed.

## File and Media Access

Test access to private uploads and protected files.

Verify that:

- Unauthorised users cannot retrieve private files.
- Store-specific files cannot be accessed across stores.
- File identifiers cannot bypass ownership checks.
- Upload operations enforce the required permissions.
- Private storage credentials are never exposed.
- Public media is intentionally public.

## API Input and Mass Assignment

Test attempts to modify protected fields through request payloads.

Examples include:

- Role.
- Permission.
- Store ownership.
- Account status.
- Product ownership.
- Payment status.
- Financial approval state.
- Audit fields.
- Privileged configuration.

The backend must accept only fields explicitly permitted for the operation.

## Webhook Security

Verify that webhook processing validates the provider and event authenticity using the approved mechanism.

Test:

- Invalid signatures.
- Missing signatures.
- Replayed events.
- Duplicate event identifiers.
- Unknown provider accounts.
- Incorrect store attribution.
- Malformed payloads.
- Out-of-order events.
- Failed persistence.
- Retry behaviour.

Store context must be resolved through trusted provider information and internal mappings.

A store identifier supplied only in an untrusted payload must not establish authority.

## Service Identity Testing

Verify that service accounts and integration credentials are:

- Scoped to their intended purpose.
- Restricted to required operations.
- Store-scoped where appropriate.
- Revocable.
- Protected from browser exposure.
- Prevented from accessing unrelated platform functions.

Test expired and revoked credentials.

## Rate Limiting and Abuse Protection

Test relevant limits for:

- Authentication attempts.
- Password recovery.
- Public endpoints.
- Search operations.
- Sensitive exports.
- Expensive queries.
- Integration endpoints.
- Webhook processing.

Verify that limits cannot easily be bypassed through simple identifier or request changes.

## Error and Information Disclosure

Verify that denied requests do not disclose:

- Other stores' records.
- Internal database details.
- Secrets.
- Private configuration.
- Stack traces.
- Authentication tokens.
- Unnecessary personal information.

Error responses should follow `ERROR_HANDLING_AND_RESPONSE_STANDARDS.md`.

## Concurrency and Replay Testing

Test sensitive operations under repeated and concurrent requests.

Verify that duplicate requests cannot cause unintended:

- Charges.
- Refunds.
- Stock adjustments.
- Order creation.
- Financial postings.
- Permission changes.

Where idempotency is required, verify the complete idempotency behaviour.

## Security Test Data

Use controlled, synthetic test data.

Do not use real customer personal information or production credentials in ordinary development and test environments.

Test data must clearly distinguish stores and ownership boundaries.

## Automated Security Tests

Automate repeatable tests for critical access controls.

Prioritise:

- Authentication.
- Store isolation.
- Object-level authorisation.
- Function-level authorisation.
- Privileged field protection.
- Permission revocation.
- Financial operation restrictions.
- Webhook validation.

Security tests must run as part of the relevant development and release checks.

## Manual Security Testing

Manual testing is required where automated tests cannot adequately assess the workflow or risk.

Manual testing may include:

- Direct API requests.
- Browser developer tools.
- Session manipulation.
- Identifier substitution.
- Permission boundary checks.
- Workflow abuse scenarios.
- Integration callback inspection.

Testing must be authorised and limited to approved environments.

## Defect Classification

Security findings must be classified according to severity and potential impact.

Critical findings include unauthorised platform administration, cross-store data exposure, privileged credential exposure and unauthorised financial operations.

High-risk findings must be resolved or formally accepted by the authorised decision-maker before production release.

## Evidence and Reporting

Record material security test results.

Evidence should include:

- Test date.
- Environment.
- Endpoint or workflow.
- Test identity and permission level.
- Store context.
- Test scenario.
- Expected result.
- Actual result.
- Pass or failure.
- Defect reference.
- Retest outcome.

Do not include live secrets or unnecessary personal information in evidence.

## Release Gate

A release affecting authentication, permissions, store isolation or sensitive data access must not proceed without the required security testing.

Critical security failures must block release.

Any accepted exception must identify the risk, owner, approval, compensating controls and review condition.

## Retesting

After a security defect is corrected:

- Repeat the original failing test.
- Test related permissions and data boundaries.
- Confirm no regression in legitimate access.
- Verify relevant automated tests.
- Record the result.

## Open Decisions

The following require further technical agreement:

- Security testing tools.
- Automated API security test framework.
- Penetration testing scope and frequency.
- Security test ownership.
- Release approval authority.
- Security evidence retention.
- External security assessment requirements.

## Relationship to Other Documents

This procedure should be read with:

- `TESTING_STRATEGY.md`
- `SECURITY_IMPLEMENTATION_GUIDE.md`
- `API_DEVELOPMENT_GUIDE.md`
- `IDENTITY_AND_ACCESS.md`
- `API_ARCHITECTURE.md`
- `SECURITY_ARCHITECTURE.md`
- `STORE_ARCHITECTURE.md`
- `ERROR_HANDLING_AND_RESPONSE_STANDARDS.md`
- `DATA_GOVERNANCE.md`
- `CHANGE_MANAGEMENT_POLICY.md`
- `PRODUCTION_READINESS_CHECKLIST.md`

## Document Management

This procedure is maintained by the Platform Owner.

Changes must be assessed when authentication, permissions, store isolation, API contracts, integrations or sensitive business operations change.
