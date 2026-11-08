# Parent Company Organisational and Access Control Architecture

## 1. Document authority

This document defines the mandatory organisational and access-control architecture for the parent company.

It is an authoritative system specification, not a general recommendation.

All database schemas, backend services, APIs, dashboards, workflows, onboarding processes and security controls must conform to this architecture and its approved supporting specifications.

Implementation teams MUST NOT independently invent or change:

- Organisational departments.
- Reporting relationships.
- Job positions.
- Role definitions.
- Permission boundaries.
- Departmental access.
- Approval authority.
- Communication ownership.
- Onboarding requirements.
- Data access relationships.

Where a requirement is not defined, contradictory or insufficiently detailed, implementation of the affected functionality MUST stop until the relevant specification is approved.

Code implements the documented system. Code does not independently establish business policy.

## 2. Purpose

The platform must support a growing parent company with multiple departments, employees, contractors, managers and participating stores.

The parent company must not depend on one unrestricted administrator account to operate the entire business.

It must have a structured organisational and access-control system in which each person receives access according to their assigned responsibilities.

The architecture must make it possible to introduce new departments, positions, employees, responsibilities and business processes without redesigning the entire authentication and authorisation system.

## 3. Architectural boundaries

The platform consists of two connected but separately governed operational environments.

### 3.1 Parent company environment

The parent company environment manages the platform business itself.

It includes:

- Executive Management.
- Information Technology and Engineering.
- Finance and Accounting.
- Marketing and Growth.
- Legal and Compliance.
- Human Resources and People Operations.
- Store Operations and Administration.
- Customer Support.
- Procurement and Supplier Management.
- Creative Production and Brand Services.
- Risk and Internal Governance.

Additional departments may be introduced through the approved organisational governance process.

### 3.2 Store environment

Each participating store operates within its own authorised business scope.

Store-level roles may include:

- Store Owner.
- Store Administrator.
- Store Operations.
- Store Finance.
- Store Marketing.
- Store Fulfilment.
- Store Support.
- Other approved store positions.

The exact store role structure must be defined in the dedicated Store Organisational and Access Control Specification.

### 3.3 Separation requirement

Parent company and store access MUST be represented as distinct authority scopes.

A person working in the parent company does not automatically receive access to private store records.

A Store Owner does not automatically receive parent company departmental or platform administration privileges.

The system MUST support a person having more than one authorised relationship where legitimately required, without merging those permissions into unrestricted access.

## 4. Organisational structure

The parent company must maintain a formal organisational hierarchy.

The hierarchy must support:

1. Parent company.
2. Departments.
3. Department leadership.
4. Teams or functional units.
5. Positions.
6. Individual personnel assignments.

Each organisational unit must have a defined purpose and accountable leadership.

Each position must have a documented responsibility profile.

The organisational structure must be data-driven. Department names and reporting relationships must not be scattered as hard-coded assumptions throughout the application.

### 4.1 Department identity

Each department must have:

- A unique identifier.
- An official name.
- A defined purpose.
- A responsible department head or designated authority.
- An assigned reporting relationship.
- Defined operational responsibilities.
- Defined access requirements.
- Official communication channels.
- Relevant performance indicators.

### 4.2 Position identity

Each position must have:

- A unique identifier.
- Position title.
- Department assignment.
- Position purpose.
- Responsibilities.
- Reporting position.
- Assigned access role or roles.
- Required training.
- Required onboarding steps.
- Relevant performance expectations.
- Approval authority, where applicable.

A position and an access role are not the same thing.

A position describes a person's organisational responsibility.

An access role defines the permissions granted to a person.

The relationship between them must be explicitly configured.

## 5. Identity and authentication architecture

Authentication and authorisation MUST be separate concerns.

### 5.1 Authentication

The platform must use the approved identity provider to establish who is accessing the system.

For the current Supabase-based architecture:

- Supabase Auth is the authentication provider.
- Authenticated identities must have a stable identity reference.
- The authenticated identity must be linked to an internal platform personnel or participant record.
- Authentication alone must not grant access to business functions.
- Account status must be checked before protected operations are permitted.

Supabase authentication must not be confused with Supabase administrative privileges.

### 5.2 Internal identity

The platform must maintain an internal identity and membership model.

An authenticated user may have one or more separately authorised memberships, such as:

- Parent company employee.
- Parent company contractor.
- Store Owner.
- Store team member.
- Approved external service provider.

Each membership must have its own status, organisational relationship and authority scope.

A person must not receive permissions merely because their email address belongs to a company domain or because they have an authenticated Supabase account.

### 5.3 Account status

The system must support defined account states, including:

- Invited.
- Pending activation.
- Active.
- Suspended.
- Deactivated.
- Terminated.

Only authorised and active memberships may grant access.

A terminated or suspended membership must not continue granting permissions through an old session or stale application state.

## 6. Authorisation architecture

The parent company MUST use centrally governed role-based access control.

Access decisions must be enforced by the backend and database, not merely by hiding frontend controls.

The authorisation model must support:

- Users.
- Memberships.
- Departments.
- Positions.
- Roles.
- Permissions.
- Role-permission assignments.
- Membership-role assignments.
- Resource scopes.
- Approval authority.
- Access status.
- Audit history.

The exact database entities, fields, constraints and relationships will be defined in the dedicated Identity and Authorisation Database Specification.

### 6.1 Role-based access control

Roles represent approved collections of permissions.

Examples include:

- Executive Director.
- Department Head.
- Finance Officer.
- Marketing Specialist.
- Legal Officer.
- HR Officer.
- IT Administrator.
- Customer Support Agent.
- Procurement Officer.

These are illustrative position and role examples. Their final definitions and permissions must be established in the approved role catalogue.

Permissions must be granular enough to distinguish actions such as:

- View.
- Create.
- Edit.
- Delete.
- Approve.
- Reject.
- Publish.
- Export.
- Reconcile.
- Assign.
- Suspend.
- Configure.
- Manage access.

A role must not receive unrelated permissions simply because its holder is a senior employee.

### 6.2 Permission scope

Permissions must be restricted to an explicit scope.

Supported scope concepts must include:

- Parent company.
- Department.
- Team.
- Assigned business function.
- Individual assigned records.
- Specific store.
- Approved cross-store operational scope.
- Platform-wide administration.

The actual scope model must be formally defined in the permission and resource-scope specification.

A permission without a valid scope must not grant access.

### 6.3 Multiple roles

A person MAY hold multiple roles when their responsibilities require it.

Each role assignment must be separately authorised and traceable.

Permissions from multiple roles may be combined only within their valid scopes.

The system MUST NOT interpret multiple roles as permission to bypass restrictions or separation-of-duty controls.

### 6.4 Deny by default

Access MUST be denied unless an explicit permission grants the requested action within the applicable scope.

The absence of a restriction is not permission.

Unknown roles, unknown permissions, missing memberships, invalid scopes and unresolved authorisation conditions must result in denial.

## 7. Departmental access boundaries

Each department must have a defined information and functionality boundary.

Examples:

### Finance

May access authorised financial records, reconciliations, settlements, invoices and financial reporting.

Finance access does not automatically grant permission to change legal agreements, source code or marketing campaigns.

### Marketing

May access authorised campaign information, marketing requests, creative assets, performance reports and approved promotional workflows.

Marketing access does not automatically grant permission to view payroll, private legal records or unrestricted customer financial information.

### Legal and Compliance

May access authorised agreements, compliance records, legal matters, regulatory documentation and relevant evidence.

Legal access does not automatically grant permission to modify financial settlements or platform infrastructure.

### Human Resources

May access authorised personnel records, recruitment, onboarding, training and workforce administration.

HR information must be protected from general departmental access.

### Information Technology and Engineering

May access authorised technical systems, deployment processes, infrastructure and technical records.

Technical access does not automatically grant permission to view all commercial or personnel information.

### Executive Management

Executive access must be defined through explicit responsibilities and approval authority.

An executive position must not automatically bypass financial, privacy, security or separation-of-duty controls.

These examples establish boundaries. Detailed permission matrices must be provided by the respective department specifications.

## 8. Separation of duties

The system must support separation of duties for sensitive operations.

Where a process requires independent approval, the person initiating an action must not automatically be permitted to approve their own action.

This principle must apply where relevant to:

- Financial adjustments.
- Settlement approvals.
- Supplier payments.
- Procurement approvals.
- Privileged access grants.
- Security-sensitive changes.
- Legal agreement approvals.
- Sensitive personnel decisions.
- High-impact platform configuration.

The required approval combinations must be documented in the relevant workflow specifications.

Emergency access must follow a separate, auditable process.

## 9. Dashboards and application navigation

Each authenticated user must receive an application experience based on their active membership, assigned roles, permissions and organisational scope.

The system must not rely on one universal administrative dashboard.

### 9.1 Dashboard resolution

After authentication, the application must:

1. Identify the authenticated identity.
2. Retrieve active internal memberships.
3. Resolve the selected operational context.
4. Retrieve authorised roles and permissions.
5. Resolve the user's department and position.
6. Load the dashboard configuration for the authorised context.
7. Display only permitted navigation and functionality.
8. Enforce all access rules again when protected operations are requested.

The dashboard is a presentation of authorised functionality. It is not the authority that grants access.

### 9.2 Department dashboards

Each department must have a dedicated dashboard specification.

A dashboard should show:

- Department responsibilities.
- Assigned work.
- Relevant records.
- Pending approvals.
- Communication channels.
- Notifications.
- Performance indicators.
- Relevant policies and procedures.
- Escalation routes.

A user must not see another department's private dashboard information unless an explicit permission allows it.

### 9.3 Multiple memberships

Where a person has multiple authorised memberships, the application must provide a controlled way to select or switch operational context.

Switching context must trigger a fresh authorisation evaluation.

The application must not carry permissions from one context into another.

## 10. Communication architecture

Official internal communication must be structured and connected to organisational responsibility.

The platform must provide approved communication channels for:

- Department communication.
- Direct manager communication.
- Assigned team communication.
- Task-related discussion.
- Support requests.
- Formal escalation.
- Management announcements.
- Cross-department coordination.

Each channel must have a defined owner and membership rules.

### 10.1 Reporting communication

Every position must have a documented reporting relationship.

The platform must identify the person's:

- Direct reporting contact.
- Department leadership.
- Relevant support contact.
- Escalation authority.

The system should provide direct access to the appropriate communication route.

### 10.2 Communication restrictions

Users must only access channels they are authorised to join.

Private HR, legal, finance and management discussions must have restricted membership.

Communication access must not automatically grant access to the underlying business records discussed in a channel.

### 10.3 Communication records

Where communication forms part of a business decision, approval or instruction, the relevant decision must be captured in an appropriate auditable workflow.

A casual chat message must not silently replace a formal approval requirement.

## 11. Onboarding and access provisioning

Onboarding must be driven by the approved position and membership configuration.

A new employee or contractor must not receive a generic unrestricted account.

### 11.1 Onboarding resolution

The onboarding process must determine:

- Identity.
- Engagement type.
- Department.
- Position.
- Reporting manager.
- Assigned roles.
- Permission scopes.
- Dashboard configuration.
- Communication memberships.
- Required training.
- Required policy acknowledgements.
- Equipment and system requirements.
- Approval requirements.

### 11.2 Access provisioning

Access must only be granted after the required onboarding approvals.

The provisioning process must assign permissions from approved role and position configurations.

It must not rely on manual, undocumented permission additions as the normal onboarding method.

### 11.3 Onboarding experience

The user must receive an onboarding experience appropriate to their position.

It should explain:

- Their role and responsibilities.
- What they are authorised to do.
- What they are not authorised to do.
- Their reporting relationship.
- Their department.
- Their dashboard.
- Their communication channels.
- Their assigned training.
- Their performance expectations.
- Relevant operating procedures.

Onboarding completion must be recorded.

## 12. Backend and database enforcement

Authorisation must be enforced at every protected system boundary.

### 12.1 Frontend

The frontend must:

- Display authorised navigation.
- Hide unavailable actions.
- Prevent accidental access through normal interaction.
- Present clear access-denied states.
- Refresh context when membership or permissions change.

Frontend restrictions are not security controls by themselves.

### 12.2 Backend

The backend must independently verify:

- Authenticated identity.
- Active membership.
- Assigned role.
- Required permission.
- Resource scope.
- Account status.
- Applicable approval requirements.

Every protected endpoint must enforce its own authorisation requirements.

### 12.3 Database

Database access must be protected through appropriate PostgreSQL permissions and Row Level Security policies.

RLS policies must enforce the documented access model for directly accessible data.

Privileged database credentials and Supabase service-role keys MUST remain server-side and must never be exposed to browsers or mobile clients.

Service-role access must not be treated as a substitute for application-level authorisation.

### 12.4 Consistency

Frontend, backend and database authorisation must implement the same approved permission model.

No layer may silently grant broader access than the governing specification.

## 13. Audit and access history

The system must record material access-control events.

These include:

- Membership creation.
- Invitation and activation.
- Role assignment.
- Role removal.
- Permission configuration changes.
- Scope changes.
- Department transfers.
- Position changes.
- Account suspension.
- Account reactivation.
- Privileged access.
- Approval decisions.
- Access revocation.

Audit records must identify the actor, affected identity or resource, action, timestamp and relevant context.

Audit records must be protected from unauthorised alteration.

## 14. Changes to organisational authority

Organisational changes must follow an approved process.

Examples include:

- Creating a department.
- Renaming a department.
- Creating a position.
- Changing a reporting line.
- Assigning a department head.
- Changing a role.
- Adding permissions.
- Changing a resource scope.
- Transferring an employee.
- Removing a position.

Changes must not silently rewrite historical responsibility.

The system must preserve the history of who held a position or role, the applicable period and the authority assigned during that period.

## 15. Access revocation

When a person's employment, contract or authorised participation ends, their access must be revoked promptly.

Revocation must cover:

- Active memberships.
- Role assignments.
- Permission scopes.
- Dashboard access.
- Communication channel membership.
- Sessions and refresh tokens where applicable.
- External service access.
- Privileged credentials where required.

Where only one membership ends, other independently valid memberships may remain active.

The system must not revoke unrelated memberships without an authorised reason.

## 16. Scalability requirements

The architecture must support future growth without requiring a fundamental redesign.

It must support:

- Multiple departments.
- Multiple teams per department.
- Multiple positions.
- Multiple roles per person.
- Multiple memberships per identity.
- Department transfers.
- Temporary assignments.
- Acting positions.
- Delegated authority.
- Approval hierarchies.
- New dashboards.
- New communication channels.
- New permission categories.
- Additional stores and store teams.
- Future subsidiaries or business units where approved.

New departments and roles must be configurable through governed records rather than requiring arbitrary application-wide hard-coded changes.

Configuration must remain subject to approval, validation and audit controls.

## 17. Required supporting specifications

This document establishes the foundation. The following documents MUST define the detailed implementation contract.

### Organisational architecture

- Parent Company Department and Functional Structure Specification.
- Parent Company Position Catalogue and Reporting Hierarchy Specification.
- Parent Company Delegation of Authority and Approval Matrix.

### Identity and access

- Central Identity and Membership Architecture.
- Parent Company Role Catalogue.
- Parent Company Permission Matrix.
- Role-Based Access Control and Resource Scope Specification.
- Privileged Access and Emergency Access Standard.

### Department specifications

- Executive Management Access and Operating Specification.
- Finance Department Operating and Access Specification.
- Marketing Department Operating and Access Specification.
- Legal and Compliance Department Operating and Access Specification.
- Human Resources Department Operating and Access Specification.
- IT and Engineering Department Operating and Access Specification.
- Store Operations Department Operating and Access Specification.
- Customer Support Department Operating and Access Specification.
- Procurement Department Operating and Access Specification.
- Creative Production Department Operating and Access Specification.

### User experience and communication

- Department Dashboard and Navigation Specification.
- Internal Communication and Reporting Architecture.
- Employee and Contractor Onboarding Workflow Specification.
- Task Assignment and Department Workflow Specification.

### Technical implementation

- Identity and Authorisation Database Schema Specification.
- Backend Authorisation and API Enforcement Specification.
- PostgreSQL RLS and Database Security Policy.
- Access Provisioning and Revocation Workflow Specification.
- Access Audit and Periodic Review Specification.
- Authorisation Integration and Security Test Specification.

Each supporting document must reference this architecture and define its own dependencies.

## 18. Documentation precedence

The following precedence rules apply:

1. Applicable law and binding regulatory requirements take precedence over internal documentation.
2. Approved platform-wide architecture establishes the system's structural rules.
3. Approved domain specifications define the detailed behaviour of their respective components.
4. Approved database specifications define the authoritative data model.
5. Approved security specifications define mandatory enforcement.
6. Implementation code must conform to all applicable approved specifications.

If two documents conflict, the conflict must be resolved through formal documentation change control.

Developers must not choose whichever interpretation is easier to implement.

An approved change must update all affected dependent specifications before implementation is considered complete.

## 19. Implementation acceptance criteria

The architecture is not considered implemented merely because roles or dashboards appear in the frontend.

Acceptance must verify that:

- Parent company identities are separate from store authority scopes.
- Users can hold multiple independently governed memberships.
- Department and position assignments are recorded.
- Roles resolve to explicit permissions.
- Permissions have enforceable scopes.
- Access is denied by default.
- Backend endpoints enforce authorisation.
- Database policies enforce the required data boundaries.
- Privileged credentials are not exposed to clients.
- Dashboards reflect authorised functionality.
- Communication membership follows organisational rules.
- Onboarding provisions approved access.
- Access changes are auditable.
- Terminated memberships lose access.
- Cross-department and cross-store data isolation is tested.
- Separation-of-duty rules are enforced.
- The system can accommodate new departments and roles through governed configuration.

## 20. Governing principle

The parent company must operate through defined organisational authority rather than unrestricted administrator access.

Every person must know their responsibilities, reporting relationships, communication routes and authorised system capabilities.

Every system component must enforce those boundaries.

The organisation must be designed first, its authority model formally defined, its data relationships specified and its implementation built from those approved decisions.

The platform must not depend on developers making business governance decisions while writing code.
