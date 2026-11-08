# Platform Access Review Procedure

## Document Control

| Field | Value |
|---|---|
| Document Type | Access Review Procedure |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This procedure defines how platform and store access is reviewed to ensure that user accounts, memberships, roles and permissions remain appropriate.

It supports the platform's identity and access architecture by establishing a repeatable process for identifying unnecessary access, excessive privileges, inactive accounts and unauthorised access arrangements.

## 2. Scope

This procedure covers:

- Platform Super Admin accounts.
- Platform personnel and delegated administrators.
- Store Admin accounts.
- Store employee accounts.
- Technical and support personnel.
- Service accounts.
- API credentials and integration access.
- External provider access.
- Temporary and emergency access.
- Privileged database and infrastructure access.

## 3. Review Principles

Access reviews must follow these principles:

- Access must have a legitimate business or operational purpose.
- Permissions must be limited to required responsibilities.
- Store boundaries must be preserved.
- Privileged access must receive additional scrutiny.
- Access must be reviewed against current server-side authority.
- Review decisions must be recorded.
- Unnecessary access must be revoked promptly.
- Reviewers must not approve their own access without independent review.
- Emergency access must remain temporary and traceable.

## 4. Responsibilities

### 4.1 Platform Owner

The Platform Owner is responsible for:

- Ensuring platform access reviews take place.
- Reviewing platform-level privileged access.
- Confirming ownership of critical service accounts.
- Resolving escalated access concerns.
- Ensuring review outcomes are recorded.

### 4.2 Store Admin

Each Store Admin is responsible for reviewing access within their store, including employee accounts and delegated permissions.

A Store Admin must not grant permissions outside their authority.

### 4.3 Technical and Security Personnel

Authorised technical or security personnel may provide access inventories, review technical permissions and investigate anomalies.

Their access must itself be subject to appropriate review.

### 4.4 Independent Reviewer

Where practical, privileged access and sensitive financial permissions should receive review by someone other than the person whose access is being reviewed.

## 5. Access Inventory

The review must use an authoritative inventory of:

- User identity.
- Account status.
- Platform or store membership.
- Assigned roles.
- Individual permissions.
- Privileged access.
- Service accounts.
- API keys and credentials.
- External provider access.
- Temporary access grants.
- Last activity information where available.

The inventory must distinguish platform-level authority from store-level authority.

## 6. Review Triggers

An access review should be initiated:

- At scheduled review intervals.
- When an employee leaves a store.
- When a user's responsibilities change.
- When a Store Admin changes.
- When a privileged account is created.
- When a service account is introduced.
- After a security incident.
- After suspected credential compromise.
- When a store is suspended or deactivated.
- When an external provider or developer no longer requires access.
- When unusual or unexplained access is detected.

Urgent access concerns must not wait for the next scheduled review.

## 7. Review Frequency

The platform must establish formal review intervals based on risk and operational maturity.

Until those intervals are formally approved:

- Privileged platform access should be reviewed regularly.
- Store Admin access should be reviewed regularly.
- Employee access should be reviewed when responsibilities change and during store access reviews.
- Temporary access should be reviewed at expiry or when its purpose ends.
- Service and integration credentials should be reviewed when ownership, scope or provider arrangements change.

The absence of a fixed schedule does not remove the obligation to review access when a relevant change occurs.

## 8. Identity Verification

Before confirming access, the reviewer should establish that:

- The account belongs to the intended person or service.
- The account is active.
- The associated organisation or store is correct.
- The account owner still requires access.
- The assigned role reflects current responsibilities.
- The account is not duplicated or obsolete.

Unverified identities must not retain privileged access by default.

## 9. Role and Permission Review

For each account, verify:

- Whether the role is still required.
- Whether individual permissions remain necessary.
- Whether permissions exceed assigned responsibilities.
- Whether conflicting duties exist.
- Whether access is limited to the correct store.
- Whether platform-level access is justified.
- Whether temporary permissions have expired.

Do not assume that an account requires all permissions previously assigned to it.

## 10. Platform Super Admin Review

Platform Super Admin access requires heightened scrutiny.

Review:

- Identity and account ownership.
- Continued business necessity.
- Authentication controls.
- Recovery arrangements.
- Privileged action history.
- Additional administrative accounts.
- Potential conflicts of interest.
- Emergency access arrangements.

Super Admin access must not be granted merely for convenience.

The platform must maintain a controlled recovery process if its sole active Super Admin account is lost or compromised.

## 11. Store Admin Review

Each Store Admin's access must be reviewed against their current store responsibilities.

Verify:

- Correct store membership.
- Active appointment or authority.
- Required administrative permissions.
- Employee management permissions.
- Financial access.
- Product and inventory permissions.
- Customer data access.
- Integration and storefront access.

Store Admin permissions must not allow access to another store's private operations.

## 12. Employee Access Review

Employee permissions must reflect their assigned duties.

Reviewers should identify:

- Unnecessary permissions.
- Unused privileges.
- Accounts belonging to former employees.
- Shared accounts.
- Temporary access that was not removed.
- Access inconsistent with current responsibilities.

Shared individual accounts should not be used where the platform supports attributable personal accounts.

## 13. Developer and Support Access

Developer and support access must be limited to the systems and data required for authorised work.

Review:

- Current project or support assignment.
- Access scope.
- Production access.
- Data visibility.
- Duration.
- Approval.
- Audit history.
- Expiry or revocation.

Production access must not be retained indefinitely for convenience.

## 14. Service Accounts and API Credentials

Review service accounts and integration credentials for:

- Business purpose.
- Named owner.
- System or store scope.
- Permissions.
- Credential storage.
- Last use where available.
- Expiry or rotation arrangements.
- Revocation process.
- Provider dependency.

Credentials must be revoked when no longer required.

Public identifiers and publishable keys must be distinguished from private credentials.

A public storefront configuration must never be treated as a safe location for privileged secrets.

## 15. External Provider Access

Review external provider access when:

- A provider relationship changes.
- A contract ends.
- A provider's personnel change.
- A technical integration is retired.
- A security concern is identified.

Confirm that access is limited to the required service and that unused credentials or permissions are removed.

## 16. Temporary and Emergency Access

Temporary access must have:

- A documented purpose.
- An authorised approver.
- Defined scope.
- An expiry or review condition.
- Appropriate audit records.

Emergency access must be reviewed after use.

Where temporary access is no longer required, it must be revoked without waiting for the next scheduled review.

## 17. Access Review Outcomes

Each reviewed account or credential must receive one of the following outcomes:

| Outcome | Meaning |
|---|---|
| Retain | Access remains appropriate |
| Modify | Access must be adjusted |
| Revoke | Access is no longer required |
| Investigate | Ownership or necessity is unclear |
| Escalate | A higher authority must decide |

Unresolved access must not automatically be treated as approved.

## 18. Remediation

For every required change, record:

- Account or credential.
- Required action.
- Reason.
- Responsible person.
- Approval reference.
- Completion status.
- Completion date.
- Verification evidence.

Revocation must be verified through the relevant system or provider.

Where credentials may have been compromised, revocation and rotation must follow the security incident process.

## 19. Review Evidence

A completed review must retain:

- Review identifier.
- Review date.
- Reviewer.
- Scope.
- Account inventory reference.
- Decisions.
- Exceptions.
- Remediation actions.
- Approvals.
- Verification.
- Closure status.

Evidence must be protected from unauthorised alteration and retained according to applicable governance requirements.

## 20. Exceptions and Disputes

Exceptions must identify:

- The access being retained.
- Reason for the exception.
- Business justification.
- Residual risk.
- Compensating controls.
- Approving authority.
- Review or expiry condition.

A person must not approve an exception that exceeds their authority.

Disputed access decisions must be escalated through the appropriate governance process.

## 21. Access Review Reporting

Reports should identify:

- Accounts reviewed.
- Privileged accounts.
- Access retained.
- Permissions changed.
- Access revoked.
- Unresolved accounts.
- Overdue remediation.
- Exceptions.
- Significant access risks.

Reporting should distinguish completed actions from recommendations that remain outstanding.

## 22. Completion Criteria

An access review is complete when:

- The review scope is recorded.
- Relevant accounts and credentials have been assessed.
- Decisions are documented.
- Required changes are implemented.
- Revocations are verified.
- Exceptions are approved.
- Outstanding risks are assigned.
- Review evidence is retained.
- The responsible authority confirms closure.

## 23. Open Decisions

The following matters require further definition:

- Formal review intervals.
- Access inventory source.
- Review evidence storage.
- Independent reviewer requirements.
- Privileged access approval thresholds.
- Automated access certification.
- Inactive account thresholds.
- Credential rotation intervals.
- Service account ownership requirements.
- Reporting and escalation deadlines.

## 24. Relationship to Other Documents

This procedure must be read alongside:

- IDENTITY_AND_ACCESS.md
- SECURITY_ARCHITECTURE.md
- DATA_GOVERNANCE.md
- PLATFORM_GOVERNANCE.md
- STORE_ADMIN_GUIDE.md
- STORE_EMPLOYEE_GUIDE.md
- OPERATIONS_RUNBOOK.md
- INCIDENT_RESPONSE_PLAYBOOK.md
- CHANGE_MANAGEMENT_POLICY.md
- RISK_MANAGEMENT_POLICY.md
- STORE_SUPPORT_AND_ESCALATION_POLICY.md

## 25. Document Management

This procedure remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant platform and store administrators.
