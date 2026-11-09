# Store Operating Model

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-PRD-2BE6C2038B |
| Category | Product requirements |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-09
**Approval:** Approved by business owner

## 1. Purpose

This document defines how participating stores operate within the platform.

It translates the approved Platform Business Model into practical operating responsibilities, authority boundaries, workflows and accountability requirements.

It does not define database tables, API contracts or detailed technical implementation. Those belong in the relevant architecture and operational specifications.

## 2. Operating principles

The store operating model is based on the following principles:

1. The platform provides the shared infrastructure and central oversight.
2. Yotaabo and Poshies operate as two distinct stores on the same application.
3. One Super Admin has platform-wide authority over both stores.
4. Each store has exactly one Store Admin responsible for that store's day-to-day operation.
5. Each Store Admin is restricted to their own store; the Super Admin can administer both.
6. Invitations are limited to the two Store Admin positions.
7. The current application does not include employee accounts, delegated administrators or organisational hierarchies.
8. All important actions must be attributable and auditable.
9. Store-level data must remain separated where the business model requires it.
10. Support, intervention and commercial arrangements must be transparent.

The employee, team, department and delegated-authority structures described in future-platform documents are not part of this current operating arrangement.

## 3. Operating structure

The current application has two administrator levels: one Super Admin and one Store Admin for each participating store. It does not implement the broader organisational hierarchy described in future-platform specifications.

### 3.1 Platform level

One Super Admin is responsible for:

- Overall platform direction and administration.
- Platform policies and operating standards.
- Managing the Yotaabo and Poshies store records.
- Appointing, inviting, suspending and removing the two Store Admin accounts.
- Managing platform-wide access and security.
- Viewing and administering both stores within the Super Admin's authority.
- Monitoring store performance.
- Coordinating platform marketing and growth initiatives.
- Managing platform-level operational communication with each store.
- Recording important administrative decisions and actions.

The current application does not provide additional Super Admin accounts, delegated platform administrators or nested platform leadership positions.

### 3.2 Store level

Each store has a Store Admin responsible for its day-to-day operation.

The Store Admin is responsible for:

- Managing store information and approved branding.
- Managing the store's product listings.
- Managing store-specific prices and promotions.
- Maintaining inventory records.
- Processing and monitoring orders.
- Managing customer-facing store operations.
- Reviewing the store's performance.
- Maintaining operational accuracy.
- Communicating with platform administration through the store's authorised channel.
- Raising support requests with the platform.
- Meeting agreed platform obligations.

Each store has one Store Admin account in the current application. Store Admins cannot invite employees, create additional administrators or delegate access to other accounts.

### 3.3 Future organisational and employee model

Employee accounts, staff invitations, delegated duties, team structures and employee permission assignments belong to the broader future platform.

They are not part of the current Yotaabo and Poshies application. The current application has only the Super Admin and the two Store Admin accounts described above.

The existing Role and Permission Model and organisational specifications preserve the future direction. They must not be interpreted as approval to build employee management, departments, nested leadership or delegated administration into the current release.

## 4. Store independence and platform oversight

Stores must have operational independence within the boundaries of platform policies.

The platform must not need to approve every ordinary store action.

The Platform Owner may exercise oversight where there is a legitimate business, financial, security, compliance or operational reason.

Examples include:

- Investigating suspicious activity.
- Reviewing inaccurate inventory records.
- Investigating customer complaints or unresolved orders.
- Assessing financial or contractual obligations.
- Reviewing poor performance.
- Investigating policy violations.
- Evaluating requests for platform assistance.

Oversight actions must be proportionate, documented and attributable to an authorised person.

## 5. Store onboarding

A store must pass through an authorised onboarding process before becoming operational.

The onboarding process should cover:

1. Store proposal and initial assessment.
2. Platform approval.
3. Appointment of the Store Admin.
4. Store identity and branding configuration.
5. Creation or invitation of the single Store Admin account for that store.
6. Product and inventory setup.
7. Pricing and operational configuration.
8. Store Admin orientation and operating procedures.
9. Final readiness review.
10. Activation.

The store must not be considered active merely because its record exists in the system.

Activation must be an explicit, recorded decision by an authorised platform user.

Detailed registration fields, approval requirements and technical workflows will be defined in the Store Registration specification.

## 6. Product operations

Each store is responsible for the products it introduces and manages, subject to the product ownership and sharing rules in the approved Platform Business Model.

Store-level responsibilities include:

- Creating store-owned product records.
- Maintaining accurate product information within granted permissions.
- Managing store-specific product availability.
- Setting store-specific selling prices.
- Managing promotions.
- Maintaining product status.
- Ensuring product information is suitable for customers.

Where a store sells a product owned by another store or the platform, it must respect the applicable sharing permissions.

Selling a shared product does not grant ownership of the original product record.

Detailed product workflows belong in the Product Management specification.

## 7. Inventory operations

Each store is responsible for its own inventory accuracy.

The Store Admin must ensure that:

- Stock quantities are maintained accurately.
- Stock received is recorded.
- Stock sold or otherwise removed is recorded.
- Stock adjustments have documented reasons.
- Damaged, missing or returned stock is handled correctly.
- Reorder requirements are monitored.
- Physical stock checks are conducted when required.

Inventory must be recorded independently for each store, even where stores sell the same product.

Stock transfers between stores must be recorded as explicit transactions. They must not be treated as ordinary inventory adjustments.

The ownership and financial treatment of platform-funded or shared stock must follow the applicable agreement.

Detailed inventory controls belong in the Inventory Management specification.

## 8. Order operations

Each store is responsible for fulfilling and managing its own orders.

The Store Admin must ensure that:

- Orders are monitored.
- Order statuses are kept accurate.
- Payments and payment confirmations are handled according to approved procedures.
- Orders are fulfilled or cancelled appropriately.
- Returns and refunds are processed according to policy.
- Customer issues are addressed.
- Unresolved orders are escalated when necessary.

The platform may establish shared standards for order handling, customer experience and service levels.

An order belonging to one store must not be treated as an order belonging to another store.

Detailed workflows belong in the Order Management specification.

## 9. Employee management

Employee management is not included in the current application.

Store Admins cannot invite staff, create employee accounts, assign employee roles or delegate application access. The only invitations supported by the current operating model are invitations to the Yotaabo Store Admin and Poshies Store Admin positions, controlled by the Super Admin.

The broader platform may later support employee onboarding, role assignment, delegated responsibilities and store-level workforce administration. Those capabilities remain future scope and require a separate implementation decision.

All administrator account creation, invitation, suspension, removal and access changes must be recorded.

## 10. Marketing and growth operations

The platform coordinates marketing and growth support across participating stores.

Activities may include:

- Platform-wide campaigns.
- Store-specific promotional campaigns.
- Product promotion.
- Social media and digital marketing support.
- Customer acquisition initiatives.
- Cross-store promotional opportunities.
- Performance analysis and marketing recommendations.

Store Admins may propose campaigns and provide product or business information needed for marketing.

Campaign participation, costs, funding and responsibilities must be agreed and recorded.

The platform must distinguish marketing services included in the standard platform arrangement from optional or separately funded activities.

## 11. Performance management

The platform monitors store performance to understand operational health and growth.

Performance assessment may consider:

- Sales revenue.
- Gross margin and profitability.
- Order volume and fulfilment.
- Inventory accuracy and turnover.
- Returns, refunds and cancellations.
- Customer retention and complaints.
- Marketing performance.
- Operational discipline.
- Financial obligations.
- Growth opportunities and risks.

Performance indicators must be explainable and based on identifiable source data.

A performance score must not automatically determine suspension, funding approval or other significant business decisions.

The platform may use performance information to initiate a business review.

Formal reviews and agreed action plans must follow the historical record and amendment requirements defined in the approved Platform Business Model.

## 12. Platform support requests

A Store Admin may request assistance from the platform.

Requests may relate to:

- Technical or operational support.
- Marketing assistance.
- Product sourcing.
- Stock assistance.
- Business development.
- Financial or capital assistance.
- Other approved platform services.

Each request must be recorded with:

- Requesting store.
- Requesting person.
- Request category.
- Description and supporting information.
- Date submitted.
- Assigned reviewer.
- Decision and reason.
- Agreed actions.
- Responsible persons.
- Relevant deadlines.
- Final outcome.

Submitting a request does not guarantee approval or funding.

Capital and stock assistance must follow the separate assessment and approval process.

## 13. Audits and operational intervention

The platform may conduct an audit or intervene where justified by operational, financial, security or governance concerns.

Possible triggers include:

- Material discrepancies in inventory.
- Unusual transaction activity.
- Repeated fulfilment failures.
- Serious customer complaints.
- Suspected fraud or misuse.
- Unresolved financial obligations.
- Repeated policy violations.
- Material deterioration in store performance.

An intervention must have a recorded reason, scope, responsible person and outcome.

Where practical, the Store Admin should be informed and given an opportunity to respond.

A Store Admin must be able to submit a response or dispute an intervention. The platform must record the response and the outcome of any review. The detailed dispute and escalation procedure will be defined in the governance specifications.

Urgent security or customer-protection measures may be taken immediately where necessary.

An intervention does not automatically transfer control of the store to the platform.

## 14. Store suspension and closure

A store may be suspended or closed only through an authorised platform decision.

The decision must have a recorded reason and follow the applicable platform policies.

Before closure, the platform must consider:

- Outstanding customer orders.
- Refunds and returns.
- Outstanding financial obligations.
- Inventory and stock ownership.
- Employee access.
- Store-owned product records.
- Customer and operational records.
- Data retention requirements.

Suspension and closure must preserve required historical records.

The exact lifecycle states, transition permissions and reinstatement procedures belong in the Store Registration and Platform Governance specifications.

## 15. Meetings and business reviews

The platform may arrange meetings with Store Admins to review business performance and future plans.

Meetings may cover:

- Store performance.
- Operational challenges.
- Marketing results.
- Inventory and supply requirements.
- Customer experience.
- Financial position.
- Growth opportunities.
- Platform support.
- Agreed improvement actions.

Formal decisions and action plans must be recorded.

A meeting discussion must not be treated as a binding financial or commercial agreement unless the relevant parties have formally approved and recorded that agreement.

## 16. Records and accountability

The platform must maintain sufficient records to reconstruct important store activities and decisions.

Records should cover:

- Store onboarding and lifecycle changes.
- Super Admin and Store Admin account access changes.
- Product ownership and sharing changes.
- Inventory movements and adjustments.
- Orders, refunds and cancellations.
- Marketing campaigns and related expenditure.
- Support requests and assistance.
- Performance reviews and action plans.
- Audits and interventions.
- Financial obligations and settlements.

Records must identify the relevant store, actor, event and timestamp.

Access to records must follow the platform's security and permission policies.

Store Admins must be able to review the financial records and calculations relevant to their own stores, including commission calculations, settlements and outstanding obligations.

A Store Admin must be able to raise a documented dispute about a financial record or calculation. The platform must record the dispute, its review and the resulting resolution.

## 17. Operational boundaries

The following boundaries must remain clear:

| Area | Store responsibility | Platform responsibility |
|---|---|---|
| Daily operations | Manage store activities | Set standards and oversee |
| Administrator access | Use the single Store Admin account assigned to the store | Manage one Super Admin account and appoint one Store Admin per store; no employee invitations or delegated accounts in the current application |
| Products | Manage authorised product records | Maintain shared product infrastructure |
| Inventory | Maintain store stock records | Define controls and audit |
| Orders | Manage store orders | Establish shared operating standards |
| Marketing | Participate and provide store input | Coordinate platform marketing |
| Performance | Review and improve store results | Monitor, assess and support |
| Financial obligations | Meet agreed obligations | Calculate, record and oversee platform arrangements |
| Governance | Follow platform policies | Establish and enforce platform policies |

These boundaries do not remove the Platform Owner's right to intervene where justified.

## 18. Decisions still requiring approval

The following matters require further definition:

- Minimum onboarding requirements.
- Store readiness and activation criteria.
- Store operating standards and service levels.
- Future employee role templates and delegation limits, if workforce management is approved for a later platform phase.
- Order fulfilment and customer service standards.
- Inventory counting frequency and adjustment approvals.
- Store-to-store stock transfer procedures.
- Marketing approval and campaign funding.
- Performance review frequency.
- Performance thresholds and escalation rules.
- Audit triggers and procedures.
- Intervention and dispute-resolution procedures.
- Suspension, reinstatement and closure procedures.
- Store meeting frequency and reporting requirements.

## 19. Relationship to other specifications

This document establishes the operational model.

It must be read alongside:

- `PLATFORM_BUSINESS_MODEL.md`
- `../stores/STORE_REGISTRATION.md`
- `../stores/STORE_BRANDING.md`
- `../stores/STORE_CONFIGURATION.md`
- `../operations/PRODUCT_MANAGEMENT.md`
- `../operations/ORDER_MANAGEMENT.md`
- `../operations/INVENTORY_MANAGEMENT.md`
- `../operations/FINANCIAL_REPORTING.md`
- `../identity-access/ROLE_PERMISSION_MODEL.md`
- `../governance/PLATFORM_GOVERNANCE.md`

## Additional Operating Requirement: Direct Store-to-Platform Communication

The operating model requires an in-house communication channel between platform administration and each participating store.

This communication capability is intended for ordinary business operations, including:

- Operational messages and enquiries.
- Store support requests and responses.
- Administrative announcements relevant to a store.
- Marketing coordination and campaign-related communication.
- Follow-ups on operational matters.

Communication must respect store boundaries. Store-specific conversations and records must only be accessible to the relevant authorised participants and platform administrators with appropriate access.

This requirement is separate from the Store Owner Community programme. It does not introduce community spaces, peer networking, mentorship, public discussions or community participation features.

The precise technical implementation may be defined separately. This document records the operational requirement and its distinction from the future community programme.
