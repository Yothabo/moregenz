# Unified Platform Organisation, Role-Based Access Control and Authority Specification

## 1. Document Authority

This document is the authoritative specification for organisational identity, organisational relationships, role-based access control (RBAC), permission assignment, authority boundaries and access governance across the entire platform.

It applies to:

- The parent company.
- All parent-company departments and teams.
- All individual stores.
- Store Owners.
- Store employees and operational personnel.
- Parent-company employees and contractors.
- Platform administrators.
- Temporary and delegated personnel.
- Future organisational units introduced as the platform grows.

This document establishes one consistent access-control architecture. Parent-company and store-level access MUST NOT be implemented as unrelated permission systems.

All authentication, authorisation, database design, dashboard visibility, API enforcement, administrative workflows and access-management functionality MUST conform to this specification.

Developers MUST NOT invent organisational rules, reporting relationships, permissions or authority boundaries during implementation.

Where a required rule is missing or contradictory, implementation of the affected functionality MUST stop until the documentation is amended and approved.

Normative terminology:

- MUST: mandatory requirement.
- MUST NOT: prohibited behaviour.
- SHOULD: expected behaviour unless an approved exception exists.
- MAY: optional functionality.

## 2. Core Architectural Principle

The platform MUST use one unified organisational and access-control model.

The system MUST distinguish between:

1. Identity: who a person is.
2. Organisational membership: which organisational units the person belongs to.
3. Position: the person's organisational responsibility.
4. Role: the functional authority assigned to the person.
5. Permission: the specific action the person may perform.
6. Scope: the organisational and data boundaries within which the permission applies.
7. Reporting relationship: who supervises, reviews or receives accountability from the person.
8. Delegation: authority temporarily assigned to another authorised person.
9. Approval authority: which decisions a person may approve and within what limits.

These concepts MUST remain separate in the data model.

A person's job title MUST NOT automatically grant unrestricted permissions.

A department MUST NOT automatically grant every member access to every record owned by that department.

A Store Owner MUST NOT automatically receive parent-company administrative permissions.

A parent-company employee MUST NOT automatically receive access to every store.

The system MUST evaluate identity, active membership, role, permission, scope, organisational status and applicable approval rules before allowing a protected action.

## 3. Unified Organisational Model

The platform MUST support a hierarchy of organisational units.

The hierarchy MUST be configurable and MUST NOT depend on hard-coded assumptions that only the parent company or stores can exist.

The initial organisational model consists of:

### 3.1 Parent Company

The parent company is the central organisation responsible for platform ownership, governance, infrastructure, central operations and shared services.

It contains departments, teams, positions and personnel.

### 3.2 Store Organisation

Each store is an independent operational unit within the wider platform ecosystem.

Each store has its own:

- Store identity.
- Store Owner assignment.
- Operational personnel.
- Store-level positions.
- Store-level responsibilities.
- Store-level roles and permissions.
- Customer and order access boundaries.
- Product and inventory responsibilities.
- Financial and operational records.
- Reporting structure.
- Dashboard and workflows.

A store MUST NOT be represented merely as a collection of products or as a label attached to a parent-company department.

It is an organisational unit with its own authority boundaries and operational responsibilities.

### 3.3 Future Organisational Units

The architecture MUST support future units such as:

- Regional operations.
- Business divisions.
- Subsidiaries.
- Service teams.
- Shared-service teams.
- Temporary project teams.
- Other approved business units.

Adding an organisational unit MUST NOT require redesigning the entire authorisation system.

## 4. Organisational Relationships

The system MUST support relationships between organisational units.

Supported relationship types MUST include:

- Parent-child organisational relationship.
- Direct reporting relationship.
- Functional oversight relationship.
- Service-provider relationship.
- Approval relationship.
- Delegated authority relationship.
- Project collaboration relationship.

These relationships MUST be stored explicitly.

A reporting relationship MUST NOT be inferred merely because two people belong to the same department.

A functional oversight relationship MUST NOT automatically grant unrestricted access to the supervised unit's records.

A project collaboration relationship MUST NOT automatically grant permanent access to every record held by participating departments or stores.

Each relationship MUST define its purpose, effective date, status and applicable scope.

## 5. Unified Identity and Membership

### 5.1 Person Identity

Each human user MUST have one platform identity associated with their authentication account.

Where the same person works across multiple organisational units, the system MUST NOT create unrelated identities merely to represent those different responsibilities.

For example, one person may:

- Work in the parent company's Marketing department.
- Hold an approved operational position in one store.
- Be temporarily delegated authority in another organisational unit.

The person's identity remains the same. Their memberships, positions, roles and scopes are evaluated independently.

### 5.2 Membership

A person MUST have an explicit membership record for every organisational unit in which they are authorised to operate.

Membership MUST identify:

- Person or authentication identity.
- Organisational unit.
- Membership type.
- Assigned position.
- Membership status.
- Effective start date.
- Effective end date, where applicable.
- Direct reporting person or designated supervisor.
- Membership creator.
- Approval record, where required.
- Creation and modification history.

Membership status MUST support at least:

- Pending.
- Active.
- Suspended.
- Expired.
- Revoked.

Inactive membership MUST NOT provide operational access.

### 5.3 Multiple Memberships

The system MUST support multiple active memberships for one identity.

Permissions MUST be evaluated in the context of the membership and scope through which the user is acting.

The interface MUST make the current organisational context clear when a person can act in multiple units.

The system MUST NOT silently combine permissions from unrelated memberships into unrestricted global access.

## 6. Positions, Roles and Permissions

These are separate concepts and MUST be modelled independently.

### 6.1 Position

A position describes a person's organisational responsibility.

Examples:

Parent company:
- Chief Executive Officer.
- Head of Finance.
- Finance Officer.
- Head of Marketing.
- Marketing Specialist.
- Head of Technology.
- Software Engineer.
- Legal and Compliance Officer.
- Store Operations Manager.
- Customer Support Specialist.

Store:
- Store Owner.
- Store Operations Lead.
- Store Administrator.
- Product Manager.
- Inventory Controller.
- Order Fulfilment Officer.
- Customer Service Representative.
- Marketing Representative.

Positions MUST be configurable.

A position MUST have a defined organisational unit, purpose, reporting relationship and documented responsibilities.

### 6.2 Role

A role represents a reusable set of functional responsibilities and permissions.

Roles MUST be assignable to memberships.

Examples include:

- Parent Company Executive.
- Finance Approver.
- Finance Officer.
- Marketing Manager.
- Marketing Contributor.
- Legal Reviewer.
- Platform Administrator.
- Store Owner.
- Store Administrator.
- Store Operations Contributor.
- Inventory Controller.
- Order Fulfilment Contributor.
- Store Customer Support Contributor.

The examples above are initial role categories, not permission grants by themselves.

Every role MUST have an explicit permission assignment.

### 6.3 Permission

A permission represents an individual action that may be performed.

Permissions MUST be granular and action-specific.

Examples:

- View store profile.
- Update store profile.
- View store products.
- Create store product.
- Edit store product.
- Archive store product.
- Delete store product.
- View store inventory.
- Adjust store inventory.
- View store orders.
- Update order status.
- Process an authorised refund.
- View store financial reports.
- View parent-company financial reports.
- Approve marketing campaigns.
- Approve creative production.
- Manage store memberships.
- Assign store roles.
- Suspend store membership.
- View platform audit records.
- Manage platform configuration.

A permission MUST define:

- Unique identifier.
- Human-readable description.
- Functional resource.
- Permitted action.
- Applicable organisational scope.
- Whether approval is required.
- Whether the action is sensitive.
- Whether the action requires an audit event.

The system MUST NOT use vague permissions such as `admin_access` to bypass granular authorisation.

## 7. Organisational Scope

Every permission assignment MUST be evaluated against an explicit scope.

Supported scope types MUST include:

- Platform-wide.
- Parent-company-wide.
- Department-specific.
- Team-specific.
- Store-specific.
- Region-specific.
- Project-specific.
- Record-specific, where required.

Scope MUST be stored and evaluated independently from the permission itself.

Examples:

A Store Owner with permission to update store products MUST be restricted to products belonging to their authorised store.

A Finance Officer assigned to a specific store MUST only access financial records within that assigned scope.

A parent-company Marketing Specialist assigned to a campaign MUST only access the campaign resources and store information authorised for that assignment.

A Platform Administrator with technical infrastructure responsibilities MUST NOT automatically receive access to confidential customer, financial, legal or employee records.

A user with platform-wide technical access MUST still be subject to explicit data-access controls and audited privileged access.

## 8. Parent Company Authority

The parent company controls:

- Platform infrastructure.
- Platform-wide technical standards.
- Platform governance.
- Organisational policy.
- Shared platform services.
- Central security and access governance.
- Platform-wide compliance requirements.
- Central commercial and contractual arrangements.
- Shared-service operations.
- Approved platform-wide administrative functions.

The parent company MUST NOT treat this authority as unrestricted permission to interfere with every store operation.

Its authority MUST be represented through explicit roles, permissions, scopes and approval rules.

### 8.1 Parent Company Departments

The initial organisational model MUST support:

1. Executive Management.
2. Technology and Product.
3. Finance and Accounting.
4. Legal, Risk and Compliance.
5. People and Culture.
6. Marketing and Growth.
7. Store Operations and Partner Success.
8. Customer Experience and Support.
9. Procurement and Supplier Management.
10. Creative and Brand Production.
11. Data and Business Intelligence.

Each department MUST have its own organisational identity, leadership assignment, membership, responsibility definitions and access boundaries.

A department MUST NOT be granted unrestricted access merely because it exists in the organisational hierarchy.

### 8.2 Executive Authority

Executive positions provide strategic oversight and organisational accountability.

Executive membership MUST NOT automatically grant unrestricted access to every confidential record.

Executive access MUST be defined through explicit permissions and scopes.

Sensitive records MUST remain protected by applicable legal, financial, personnel and confidentiality controls.

## 9. Store Authority

Each store MUST have an independent operational authority model.

The Store Owner is the primary accountable person for the store's approved business operations and brand direction.

The Store Owner MUST be able to exercise authorised control over:

- Store identity.
- Store name and approved branding.
- Store profile.
- Product merchandising.
- Store pricing and promotions.
- Store inventory responsibilities.
- Store orders and fulfilment.
- Store customer-service operations.
- Store marketing direction.
- Store creative approvals.
- Store personnel assignments, where the commercial agreement permits.
- Store operational reports.

These permissions MUST be explicitly represented in the role and permission catalogue.

The Store Owner MUST NOT receive authority over:

- Parent-company ownership.
- Parent-company financial accounts.
- Other stores' private records.
- Platform infrastructure administration.
- Platform-wide legal and governance decisions.
- Other Store Owners' memberships.
- Other stores' customer and order histories.

Where a Store Owner has an approved cross-store responsibility, the system MUST grant that access through a separate membership, delegation or explicit scoped permission.

### 9.1 Store Personnel

A Store Owner MAY appoint or request store personnel according to the applicable agreement and platform policy.

Store personnel MUST have individual identities and memberships.

Store personnel MUST receive only the permissions required for their assigned duties.

The Store Owner MUST NOT be required to share their own authentication credentials with employees or contractors.

A Store Owner MUST NOT be able to grant platform-wide or parent-company permissions.

Store personnel access MUST be restricted to the relevant store unless an additional approved membership or scope exists.

### 9.2 Store Operational Independence

The parent company may establish platform-wide requirements for security, data protection, legal compliance and technical operation.

Within those boundaries, the Store Owner retains the approved authority to manage the store's business and brand.

The system MUST distinguish:

- Platform governance.
- Store business authority.
- Shared-service delivery.
- Technical administration.
- Regulatory and contractual oversight.

A central employee performing a service for a store MUST NOT automatically become the Store Owner or assume the Store Owner's operational authority.

## 10. Shared Services Across the Organisation

The platform MUST support central departments delivering services to multiple stores.

Examples include:

- Central marketing.
- Creative production.
- Customer support.
- Finance and reconciliation.
- Technology support.
- Procurement.
- Legal and compliance.

Shared-service access MUST be granted through explicit assignments and scopes.

A shared-service employee MUST only access the store information necessary to deliver the assigned service.

Each service assignment MUST record:

- Responsible department.
- Assigned employee or team.
- Receiving organisational unit.
- Service type.
- Permitted resources.
- Applicable permissions.
- Start and end dates.
- Approval requirements.
- Completion status.
- Audit history.

A shared-service assignment MUST NOT permanently transfer store ownership or operational authority.

## 11. Unified Authorisation Evaluation

Every protected action MUST pass a central authorisation evaluation.

The evaluation MUST consider:

1. Authenticated identity.
2. Active organisational membership.
3. Active organisational unit.
4. Current position, where relevant.
5. Assigned role.
6. Required permission.
7. Applicable scope.
8. Resource ownership.
9. Organisational status.
10. Approval requirements.
11. Delegation validity.
12. Applicable separation-of-duties rules.

The default result MUST be denial when the system cannot establish that the action is authorised.

### 11.1 No Implicit Trust

The following MUST NOT be treated as sufficient authorisation:

- Being logged in.
- Having a valid Supabase Auth account.
- Knowing a record identifier.
- Being able to access a frontend route.
- Being a member of a department.
- Being a Store Owner in another store.
- Being an employee of the parent company.
- Being a platform administrator without the required data permission.

### 11.2 Consistent Enforcement

Authorisation MUST be enforced at the backend and database layers.

Frontend permission checks MUST only control presentation and interaction.

They MUST NOT be treated as security enforcement.

Every API endpoint MUST independently validate the relevant permissions and scope.

Database access MUST enforce the appropriate Row Level Security policies.

Privileged service-role credentials MUST never be exposed to browsers or mobile clients.

## 12. Dashboard and User Experience

The platform MUST provide a unified dashboard architecture.

Dashboards MUST be resolved using the user's active membership, role, permissions and organisational context.

A dashboard is a presentation of authorised functionality. It is not an independent security boundary.

### 12.1 Parent Company Dashboards

Parent-company users MUST see dashboards appropriate to their assigned department and responsibilities.

Examples:

- Executive dashboard.
- Finance dashboard.
- Marketing dashboard.
- Legal and compliance dashboard.
- People and Culture dashboard.
- Technology dashboard.
- Store Operations dashboard.
- Customer Support dashboard.
- Procurement dashboard.
- Creative Production dashboard.
- Data and Reporting dashboard.

### 12.2 Store Dashboards

Each store MUST have its own operational dashboard context.

The dashboard MUST present only the information and actions authorised for the current user.

Examples:

- Store Owner dashboard.
- Store Administrator dashboard.
- Product and Merchandising dashboard.
- Inventory dashboard.
- Orders and Fulfilment dashboard.
- Store Customer Support dashboard.
- Store Marketing dashboard.

### 12.3 Multiple Memberships

Where a user belongs to multiple organisational units, the interface MUST provide an explicit context selector.

The selected context MUST be visible.

Changing context MUST trigger fresh permission evaluation.

The system MUST NOT retain permissions from the previous context after switching.

### 12.4 Dashboard Composition

Dashboard widgets MUST be permission-aware.

A user MUST NOT receive sensitive information through:

- Dashboard statistics.
- Notifications.
- Search results.
- Export functions.
- Activity feeds.
- Report summaries.
- API responses.
- Background data requests.

Hiding a widget in the frontend is not sufficient to protect its underlying data.

## 13. Reporting and Management Relationships

The platform MUST support formal reporting relationships.

Every active position assignment MUST have a defined reporting arrangement.

Supported reporting relationships include:

- Direct line manager.
- Department head.
- Store Owner.
- Functional supervisor.
- Designated executive.
- Approved acting manager.

A person may have a direct line manager and a separate functional supervisor.

The system MUST distinguish these relationships.

A reporting relationship MUST NOT automatically grant full access to the subordinate's records.

Managers MUST receive only the records and actions required for their management responsibilities.

The system MUST support:

- Direct reports.
- Team structures.
- Department structures.
- Store personnel structures.
- Escalation paths.
- Acting assignments.
- Historical reporting relationships.

## 14. Communication and Escalation

The platform MUST provide communication routes aligned with organisational responsibilities.

Communication channels MUST be associated with organisational units or approved workflows.

Examples:

- Department communication channels.
- Store communication channels.
- Parent-company announcements.
- Store Owner support channels.
- Department-to-department communication.
- Management escalation channels.
- Project-specific channels.

Users MUST be able to identify the responsible person or department for a workflow.

Communication access MUST be governed by membership and scope.

A person MUST NOT gain access to confidential records simply because they are included in a general communication channel.

Direct communication to a manager or responsible employee MUST be supported where the applicable workflow permits it.

Formal approvals and decisions MUST be recorded in the relevant workflow rather than relying solely on informal messages.

## 15. Approval Authority and Separation of Duties

The system MUST support approval rules independently from general role permissions.

Approval rules MUST define:

- Action requiring approval.
- Required approval role.
- Required organisational scope.
- Financial or operational limits, where applicable.
- Number of required approvers.
- Whether the requester may approve their own request.
- Escalation path.
- Approval validity period.
- Rejection and resubmission behaviour.

The system MUST support separation of duties.

Where policy requires independent approval, the requester MUST NOT approve their own action.

Examples include:

- Financial payments.
- Refunds above approved thresholds.
- Sensitive access grants.
- Legal approvals.
- Supplier onboarding.
- High-impact platform configuration changes.

Exact monetary thresholds and department-specific approval matrices MUST be defined in their dedicated authoritative specifications.

## 16. Delegation and Acting Assignments

The platform MUST support temporary delegation without permanently changing a person's primary position or membership.

A delegation MUST specify:

- Delegating person.
- Receiving person.
- Delegated permission or role.
- Organisational scope.
- Start date and time.
- End date and time.
- Reason.
- Approval record.
- Revocation status.

Delegation MUST NOT allow the recipient to grant further authority unless explicitly permitted.

Expired or revoked delegations MUST immediately cease to authorise actions.

Acting appointments MUST be separately recorded and MUST retain the original position holder's history.

## 17. Membership and Access Lifecycle

The system MUST support the full lifecycle of organisational access.

### 17.1 Onboarding

Onboarding MUST establish:

- Person identity.
- Organisational membership.
- Position.
- Reporting relationship.
- Role assignment.
- Permission scope.
- Required training or policy acknowledgements.
- Dashboard access.
- Communication access.
- Approval authority, where applicable.

A person MUST NOT receive operational access before required approvals are completed.

### 17.2 Role Changes

When a person's role changes, the system MUST recalculate their effective permissions.

Previous permissions MUST NOT remain active merely because they were previously assigned.

The change MUST be audited.

### 17.3 Suspension

Suspending a membership MUST immediately prevent new actions under that membership.

The system MUST preserve historical records and attribution.

### 17.4 Termination and Revocation

When employment, a contract, a Store Owner appointment or another membership ends:

- The affected membership MUST be deactivated or revoked.
- Its permissions MUST cease.
- Active delegations MUST be reviewed and revoked where necessary.
- Sessions and relevant access tokens MUST be invalidated according to the security policy.
- Historical records MUST remain available to authorised personnel.
- The person's historical actions MUST retain their original attribution.

Removing a person's access MUST NOT delete the person's business history or erase accountability.

## 18. Data Model Requirements

The database MUST implement a unified organisational and authorisation model.

The following entities are required. Exact physical table names may follow the approved database naming convention, but the conceptual entities and relationships MUST be preserved.

### 18.1 Identity

Represents a human platform user.

Required attributes:

- Identity ID.
- Authentication user ID.
- Display name.
- Contact details as permitted.
- Account status.
- Created timestamp.
- Updated timestamp.

Authentication credentials MUST remain managed by the authentication provider.

### 18.2 Organisational Unit

Represents a parent company, department, team, store or future organisational unit.

Required attributes:

- Organisational unit ID.
- Unit type.
- Unit name.
- Parent organisational unit ID, nullable.
- Unit status.
- Effective start date.
- Effective end date, nullable.
- Created timestamp.
- Updated timestamp.

### 18.3 Organisational Relationship

Represents a formal relationship between organisational units or people.

Required attributes:

- Relationship ID.
- Source entity.
- Target entity.
- Relationship type.
- Scope.
- Effective start date.
- Effective end date, nullable.
- Status.
- Created by.
- Approval reference, where required.

### 18.4 Membership

Represents an identity's membership in an organisational unit.

Required attributes:

- Membership ID.
- Identity ID.
- Organisational unit ID.
- Membership type.
- Position ID.
- Membership status.
- Effective start date.
- Effective end date, nullable.
- Direct manager membership ID, nullable.
- Created by.
- Approved by, where required.
- Created timestamp.
- Updated timestamp.

### 18.5 Position

Represents a defined organisational position.

Required attributes:

- Position ID.
- Organisational unit type or applicable unit.
- Position name.
- Position description.
- Responsibility definition.
- Reporting position, where applicable.
- Position status.
- Effective dates.
- Created timestamp.
- Updated timestamp.

### 18.6 Role

Represents a reusable functional permission grouping.

Required attributes:

- Role ID.
- Role name.
- Role description.
- Role category.
- Role status.
- Applicable organisational unit types.
- Created timestamp.
- Updated timestamp.

### 18.7 Permission

Represents a specific permitted action.

Required attributes:

- Permission ID.
- Permission key.
- Resource.
- Action.
- Description.
- Sensitivity classification.
- Approval requirement.
- Status.

### 18.8 Role-Permission Assignment

Associates permissions with roles.

Required attributes:

- Assignment ID.
- Role ID.
- Permission ID.
- Scope type.
- Conditions, where supported.
- Effective start date.
- Effective end date, nullable.
- Status.

### 18.9 Membership-Role Assignment

Associates roles with a specific membership.

Required attributes:

- Assignment ID.
- Membership ID.
- Role ID.
- Scope reference.
- Assignment reason.
- Assigned by.
- Approved by, where required.
- Effective start date.
- Effective end date, nullable.
- Status.

### 18.10 Delegation

Records temporary authority assignments.

Required attributes:

- Delegation ID.
- Delegating membership.
- Receiving membership.
- Delegated role or permission.
- Scope.
- Reason.
- Effective start date and time.
- Effective end date and time.
- Approval reference.
- Status.

### 18.11 Approval Record

Records formal approval decisions.

Required attributes:

- Approval ID.
- Requesting identity and membership.
- Approving identity and membership.
- Action being approved.
- Resource reference.
- Scope.
- Decision.
- Decision reason.
- Decision timestamp.
- Approval policy reference.

### 18.12 Audit Event

Records security and organisational changes.

Required attributes:

- Audit event ID.
- Actor identity.
- Actor membership.
- Active organisational context.
- Action.
- Target resource.
- Scope.
- Previous state reference, where applicable.
- New state reference, where applicable.
- Timestamp.
- Outcome.
- Relevant request or correlation identifier.

Audit records MUST be protected against unauthorised modification or deletion.

### 18.13 Data Relationships

The system MUST preserve these relationships:

- One identity MAY have many memberships.
- One organisational unit MAY have many memberships.
- One organisational unit MAY contain child organisational units.
- One membership MUST belong to one organisational unit.
- One membership MAY have multiple role assignments.
- One role MAY contain multiple permissions.
- One permission MAY belong to multiple roles.
- One membership MAY have multiple delegations.
- One identity MAY have multiple historical memberships.
- One organisational unit MAY have multiple historical leaders.
- One approval MUST reference the identity and membership of the decision-maker.
- One audit event MUST preserve the actor's identity and organisational context.

Historical assignments MUST be retained.

The database MUST enforce appropriate foreign keys, uniqueness, status constraints and effective-date validation.

## 19. Store-Specific Data Isolation

The unified RBAC model MUST work with store-specific data ownership.

Every store-owned operational record MUST have a reliable store or organisational-unit association.

This applies to:

- Products.
- Store catalogue assignments.
- Inventory.
- Stock movements.
- Orders.
- Order items.
- Store customer relationships.
- Store financial records.
- Refunds.
- Promotions.
- Marketing campaigns.
- Creative production requests.
- Store support records.
- Store reports.
- Store personnel assignments.

A shared product catalogue MUST NOT imply shared store inventory or unrestricted access to another store's records.

A central customer identity MUST NOT give one store access to another store's private order history.

Store data isolation MUST be enforced in backend queries and database policies.

The exact ownership and access rules for individual data domains MUST also be defined in their respective authoritative specifications.

## 20. Supabase and Application Architecture

Supabase Auth MUST be used for authentication.

The platform's own organisational membership, role, permission and scope records MUST determine authorisation.

The system MUST NOT treat Supabase Auth metadata or frontend state as the authoritative permission database.

The application MUST implement a central authorisation service or equivalent shared backend mechanism.

All protected API operations MUST call the applicable authorisation mechanism.

All database access MUST use appropriate Row Level Security policies.

Policies MUST account for:

- Active identity.
- Active membership.
- Organisational unit.
- Role assignment.
- Permission.
- Scope.
- Resource ownership.
- Delegation.
- Approval status, where applicable.

The same conceptual authorisation rules MUST be used across web interfaces, APIs, background jobs and future mobile applications.

Background jobs and service integrations MUST use explicitly defined service identities and scopes.

Service credentials MUST NOT bypass business-level authorisation without an approved, audited exception.

## 21. Administrative Access Governance

The platform MUST provide controlled management of:

- Organisational units.
- Departments.
- Store organisational records.
- Memberships.
- Positions.
- Roles.
- Permissions.
- Role assignments.
- Delegations.
- Reporting relationships.
- Approval policies.
- Access history.

Only authorised administrators may modify these records.

Role creation, permission assignment and platform-wide access changes MUST have stricter controls than ordinary operational actions.

The system MUST prevent users from granting themselves greater authority.

A user MUST NOT assign permissions that exceed their own authorised delegation or administrative scope.

High-risk access changes MUST require independent approval where specified by policy.

## 22. Auditability and Accountability

The system MUST record:

- Membership creation and changes.
- Position assignments.
- Role assignments.
- Permission changes.
- Scope changes.
- Approval decisions.
- Delegations.
- Suspensions.
- Revocations.
- Privileged access.
- Organisational restructuring.
- Sensitive data access where required by policy.

Every protected action MUST be attributable to the identity and active membership that performed it.

Audit history MUST preserve historical organisational context even after a person's membership or position changes.

The system MUST NOT rewrite historical actions to make them appear as though they were performed by a current role holder.

## 23. Organisational Growth and Configuration

The platform MUST be designed for growth from a small founding team to a larger organisation.

The initial company may have one person filling multiple positions.

This MUST NOT result in combining those positions into one permanent role or hard-coding a single-user structure.

A person MAY hold multiple positions or memberships where approved.

The database MUST represent the intended future organisational structure even when some positions are vacant.

Departments, positions, roles, permissions and organisational relationships MUST be configuration-driven.

Adding a department or store MUST NOT require developers to introduce a new hard-coded authorisation branch throughout the application.

New organisational units MUST use the same identity, membership, role, permission and scope model.

## 24. Relationship to Other Authoritative Specifications

This document establishes the common organisational and authorisation foundation.

It MUST be read together with dedicated specifications covering:

- Parent-company organisational structure.
- Department responsibilities and reporting hierarchy.
- Store Owner authority and governance.
- Store Owner recruitment and onboarding.
- Store personnel and store operations.
- Parent-company workforce management.
- Store Owner conduct and compliance.
- Financial approval and reconciliation.
- Customer data and privacy.
- Product catalogue and inventory isolation.
- Marketing and creative-service workflows.
- Platform security and data governance.
- Audit, monitoring and incident response.

These documents MUST define their specific business rules without creating conflicting identity, membership, role, permission or scope models.

Where a domain-specific specification defines a more restrictive permission or approval requirement, the more restrictive requirement MUST apply.

Where a contradiction exists, implementation MUST stop until the authoritative documentation is reconciled.

## 25. Mandatory Implementation Acceptance Criteria

The implementation MUST NOT be accepted unless all of the following are demonstrated:

1. One identity can hold memberships in multiple organisational units.
2. Parent-company departments and stores use the same authorisation architecture.
3. Store Owners have store-scoped authority and no implicit parent-company authority.
4. Parent-company employees have only their explicitly assigned scopes.
5. Store personnel cannot access another store's private records by default.
6. A person can hold multiple positions without creating duplicate identities.
7. Positions, roles and permissions are stored separately.
8. Role permissions can be configured without hard-coded frontend-only rules.
9. Scope restrictions are enforced by backend and database controls.
10. Dashboard visibility follows effective permissions.
11. Switching organisational context triggers permission reevaluation.
12. Membership suspension and revocation prevent further authorised actions.
13. Historical activity retains its original actor and organisational context.
14. Delegations expire and are auditable.
15. Approval and separation-of-duties rules are enforceable.
16. Shared-service access is limited to the assigned service scope.
17. Organisational restructuring does not erase historical accountability.
18. New departments and stores can be added without redesigning RBAC.
19. No frontend-only check is relied upon as a security boundary.
20. Automated tests verify allowed and denied access across parent-company and store contexts.

## 26. Final Architectural Rule

There MUST be one unified organisational and RBAC architecture across the platform.

The parent company and every store participate in that architecture as distinct organisational units with distinct responsibilities, memberships, permissions and scopes.

The system MUST provide consistent identity, role assignment, authorisation, reporting, delegation, approval, auditing and access lifecycle management across all organisational units.

The organisation determines where authority belongs.

The role and permission model determines what a person may do.

The scope determines where that authority applies.

The approval model determines which actions require additional authorisation.

The audit model preserves accountability.

No organisational unit, position, title or authentication account may bypass these controls.
