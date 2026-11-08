# Platform Business Model

**Status:** APPROVED
**Version:** 1.0
**Last updated:** 2026-11-05
**Approval:** Approved by business owner

## 1. Purpose

The platform is a centrally owned and governed retail ecosystem that enables individuals and operators to establish, manage and grow independent retail stores using shared technology, product infrastructure, marketing capabilities and business support.

The platform is not simply a website hosting multiple independent shops. It is a business ecosystem in which the platform owner provides infrastructure and services while store operators retain responsibility for their individual store operations.

This document defines the business model and the principles that the technical architecture must support.

## 2. Ownership model

### 2.1 Platform ownership

The platform is owned and governed by the Platform Owner.

The Platform Owner is responsible for:

- Ownership and strategic direction of the platform.
- Platform infrastructure, technology and security.
- Establishing and governing stores.
- Appointing Store Admins.
- Platform-wide oversight and accountability.
- Marketing and promoting participating stores.
- Monitoring store performance.
- Conducting operational and financial reviews.
- Evaluating requests for business assistance and capital.
- Establishing commercial agreements and platform policies.

Platform ownership is distinct from ownership of any individual store.

### 2.2 Store ownership and operation

Each store is an independently identified retail operation within the platform.

A store has its own:

- Public identity and brand.
- Storefront and customer-facing content.
- Store Admin and staff structure.
- Product catalogue ownership or product associations.
- Inventory and stock movements.
- Pricing and promotions.
- Customers and orders.
- Operational and financial records.
- Performance history.

A Store Admin is responsible for operating and growing their assigned store within platform policies and security boundaries.

A store does not own the underlying platform or shared infrastructure.

### 2.3 Yotaabo as a participating store

Yotaabo is both:

- A store owned and operated by the Platform Owner.
- A participant in the platform's retail ecosystem.

Yotaabo must use the same store-level operational architecture and controls as other stores.

It must have its own store identity, catalogue ownership or associations, inventory, pricing, orders, financial records and performance reporting.

The platform must not create hidden operational privileges for Yotaabo merely because its owner also owns the platform.

The Platform Owner may access Yotaabo through a separate store-level role, in addition to their platform-level role.

Platform ownership and Yotaabo store ownership must remain logically and operationally separate.

## 3. Platform and store relationship

The platform provides common services to participating stores.

These may include:

- Storefront and administrative technology.
- Central product data infrastructure.
- Inventory and order management capabilities.
- Marketing and promotional support.
- Performance reporting and business analytics.
- Operational guidance and business reviews.
- Potential stock assistance and business capital.
- Security, audit and governance services.

Stores use these services while retaining control over their own daily operations.

The platform can monitor and support stores without becoming the day-to-day operator of every store.

## 4. Product catalogue model

### 4.1 Central product data infrastructure

The platform maintains a central product data infrastructure as the authoritative system for product records.

Products are stored and managed within this common infrastructure rather than requiring a separate, disconnected product database for every store.

Each product must have a clearly defined ownership or originating-store relationship.

### 4.2 Store-created products

Each store may introduce products for its own business.

A Store Admin must be able to create and manage products belonging to their store, subject to platform policies.

Creating a product for one store does not automatically make that product available to every other store.

### 4.3 Product sharing

Product ownership and product availability are separate concepts.

The store that originates a product retains its ownership unless an explicit ownership transfer is recorded.

Making a product available to another store does not automatically transfer ownership or grant the receiving store permission to modify the original product record.

A store authorised to sell a shared product must be able to manage its own commercial and operational settings, including selling price, promotional price, stock quantity and availability, without requiring permission to modify the original product identity or descriptive information.

The platform must distinguish between:

- Product owner.
- Originating store.
- Stores authorised to sell the product.
- Stores authorised to modify shared product information.
- Store-specific product records and commercial settings.


The platform must support controlled product sharing between stores.

A product may be:

- Private to its originating store.
- Shared with selected stores.
- Made available across the platform under an approved sharing arrangement.

The system must preserve the product's identity and traceability when it is shared.

The rules for editing shared product information, ownership, and withdrawal from sharing require further specification.

### 4.4 Product data and store operations

Product identity and descriptive information must be separated from store-specific commercial and operational data.

The central product record describes what the product is.

Store-level records describe how an individual store sells and manages that product.

These may include:

- Store-specific availability.
- Selling price.
- Promotional price.
- Stock quantity.
- Reorder thresholds.
- Inventory movements.
- Store-specific product status.
- Store-specific sales performance.

## 5. Inventory model


Each store is responsible for managing its own inventory.

Inventory must be tracked independently per store, even when multiple stores sell the same product.

The platform must support:

- Current stock balances.
- Stock received.
- Stock sold.
- Returns.
- Damaged or written-off stock.
- Manual adjustments with reasons and accountability.
- Stock transfers where permitted.
- Stock reservations where required.
- Low-stock alerts.
- Stock valuation and movement history.

Stock balances must be supported by traceable inventory movements.

The platform must distinguish between stock physically held by a store, stock owned by the platform, and stock supplied under a financing or credit arrangement.

The exact ownership and accounting treatment of platform-funded stock remains an unresolved commercial decision.

## 6. Store independence

Each store must have an independent public-facing identity.

Customers should interact with the store's own brand and storefront. The underlying platform relationship does not need to be disclosed publicly unless the relevant store or platform arrangement requires it.

Store independence includes control over:

- Branding and storefront presentation.
- Customer-facing business information.
- Store products and availability.
- Store pricing and promotions.
- Store employees and delegated responsibilities.
- Daily operational decisions.

Store independence does not grant access to other stores, platform infrastructure, or platform-wide administration.

## 7. Platform services model

The platform must maintain a clearly defined catalogue of services available to participating stores.

Potential platform services include:

- Storefront and administrative infrastructure.
- Central product data services.
- Inventory and order management infrastructure.
- Marketing and promotional campaigns.
- Business performance reporting.
- Business development and operational guidance.
- Stock procurement and supply assistance.
- Capital-support programmes.

Each service must have defined responsibilities, eligibility conditions and commercial treatment.

Services included in a store's standard platform arrangement must be distinguished from optional or separately funded services.

The platform must maintain records of services provided, relevant costs and the stores benefiting from those services.

The exact service catalogue and commercial entitlements remain subject to approval.

## 7.1 Platform marketing and growth responsibilities


The platform has an active responsibility to help participating stores succeed.

This is not limited to providing software.

The platform's growth responsibilities include:

- Promoting stores and their products.
- Coordinating marketing campaigns.
- Supporting customer acquisition.
- Monitoring campaign performance.
- Identifying growth opportunities.
- Reviewing store performance with operators.
- Recommending operational improvements.
- Evaluating opportunities for expansion.

The system should support marketing campaigns and allow their performance and costs to be attributed appropriately.

The exact marketing services included in the platform's commercial offering remain subject to agreement.

## 8. Store performance management


The platform must provide a structured way to assess the performance and health of every store.

Performance assessment should consider multiple dimensions rather than revenue alone.

Expected dimensions include:

- Revenue and sales trends.
- Gross margin and operating contribution.
- Order volume and fulfilment.
- Inventory turnover and stock availability.
- Returns, cancellations and refunds.
- Customer activity and retention.
- Operational efficiency.
- Marketing effectiveness.
- Outstanding financial obligations.
- Growth potential and business risks.

The platform should provide understandable performance indicators, supporting metrics and historical trends.

Any composite performance score must be explainable. It must not conceal the underlying factors or replace human review where business or financial decisions are involved.

Performance reviews may inform marketing support, operational guidance, store development and capital-support decisions.

## 9. Business support and capital assistance


The platform may establish a programme through which stores request assistance.

Potential support categories include:

### 9.1 Stock assistance

A store may request assistance obtaining inventory when it lacks sufficient stock or working capital.

Possible arrangements include platform-owned stock supplied to the store, stock supplied on credit, or another agreed commercial arrangement.

### 9.2 Business capital

A store may request funding for an approved business purpose.

Requests must identify the amount, purpose, intended use and expected business outcome.

### 9.3 Growth and operational assistance

The platform may provide non-financial assistance such as marketing, training, business guidance and operational support.

### 9.4 Assessment and approval

Requests must be recorded and assessed against relevant store performance, financial information, risks and the proposed use of assistance.

The system must record:

- Request details.
- Supporting information.
- Assessment and recommendation.
- Approval or rejection.
- Approved terms.
- Disbursements or stock supplied.
- Repayment obligations, where applicable.
- Repayment history and outstanding balances.
- Decisions and changes made by authorised personnel.

Automated performance indicators may support assessment but must not independently approve financial assistance.

The legal, regulatory, accounting and contractual requirements for lending, credit and other financial assistance must be established before these services are launched.

## 10. Platform revenue model

The platform is intended to earn revenue through agreed commercial arrangements with participating stores.

A percentage-based commission on eligible store activity is a proposed primary revenue model.

The commercial model may also account for launch incentives, promotional arrangements or other agreed services.

Commission rules must be transparent and consistently applied.

The platform must maintain a clear distinction between:

- Store sales.
- Refunds and cancellations.
- Eligible commissionable sales.
- Platform commission.
- Marketing costs.
- Store expenses.
- Financing and repayment obligations.
- Store settlements.
- Platform revenue.

Commission rates, calculation basis, settlement frequency, deductions and promotional exemptions are not yet approved.

No rate or calculation rule in this document should be treated as an implemented or approved commercial obligation.

## 11. Platform governance and accountability


The Platform Owner retains platform-wide authority and responsibility.

This includes:

- Appointing and removing Store Admins.
- Approving access to the platform.
- Establishing and enforcing platform policies.
- Monitoring store performance.
- Conducting audits and business reviews.
- Reviewing financial and operational risks.
- Suspending stores or access where justified.
- Protecting platform infrastructure and shared data.

Store Admins remain responsible for their own store operations and employees within the authority delegated to them.

All sensitive administrative, financial, inventory and governance actions must be attributable to an authorised actor and recorded for audit purposes.

### 11.1 Store lifecycle governance

Every store must have a defined lifecycle managed by authorised platform personnel.

The lifecycle must support distinct states, including:

- Proposed.
- Approved.
- Onboarding.
- Active.
- Under review.
- Suspended.
- Closed.

The exact transition rules, approval requirements and permitted actions for each state must be defined in the store lifecycle specification.

Suspension or closure must not automatically destroy historical operational, audit or financial records.

Outstanding financial obligations, unresolved transactions, customer matters and legal retention requirements must be handled according to approved policies.

Every lifecycle transition must record the actor, timestamp, reason and relevant decision.

### 11.2 Separation of platform and store finances

Platform financial records and individual store financial records must remain logically separate.

In particular:

- Yotaabo revenue belongs to Yotaabo's store records.
- Other store revenue belongs to the respective store.
- Platform commissions are recorded as platform revenue.
- Marketing expenditure is recorded separately and attributed where appropriate.
- Capital supplied to stores is recorded independently from commission revenue.
- Repayments reduce the relevant outstanding financial obligation.
- Stock supplied under financing arrangements retains its appropriate ownership and accounting classification.

Financial reporting must distinguish at least the following categories:

- Store sales revenue.
- Store operating expenses.
- Platform commission income.
- Platform operating expenses.
- Stock supplied or funded by the platform.
- Cash capital advanced to a store.
- Outstanding repayments and other financial obligations.

The platform must not treat gross store sales as platform revenue.

Financial reporting must allow authorised users to distinguish store-level financial performance from platform-level financial performance.

Financial records must be traceable and must not rely solely on manually editable balance fields.

### 11.3 Store performance reviews and action plans

Performance monitoring must support structured business reviews.

A review should be capable of recording:

- Review period and participating parties.
- Performance findings.
- Identified risks and opportunities.
- Agreed improvement targets.
- Actions required.
- Responsible persons.
- Target completion dates.
- Support or resources committed by the platform.
- Follow-up review date.
- Progress and final outcome.

Performance reviews must become part of the store's business history.

Recommendations generated by performance analytics must remain distinguishable from decisions formally agreed by the platform and store operator.

Once a performance review or action plan has been formally agreed, its original contents must be preserved as a historical record. Subsequent changes to targets, actions, responsibilities or deadlines must be recorded as amendments with the actor, timestamp and reason. Previous agreements must remain auditable.

## 12. Guiding principles

The platform must be designed around these principles:

1. Central platform ownership with independent store operations.
2. Equal store-level treatment, including Yotaabo.
3. One authoritative product data infrastructure with explicit product ownership and sharing.
4. Independent inventory and financial records per store.
5. Store-level control within platform-wide security boundaries.
6. Central marketing, performance oversight and business support.
7. Transparent commercial arrangements.
8. Traceable financial and inventory movements.
9. Explainable performance assessments.
10. Security, accountability and auditability by design.
11. Architecture that supports growth without unnecessary complexity.
12. No undocumented business rules or hidden privileges.

## 13. Decisions still requiring approval

The following matters remain open and must be resolved in the relevant detailed specifications:

- Product ownership and editing rights when products are shared.
- Product-sharing approval and withdrawal procedures.
- Whether shared products require approval before becoming available to another store.
- Whether inventory may be transferred between stores and under what conditions.
- Ownership and accounting treatment of platform-funded stock.
- Commission rate and commission calculation basis.
- Commission settlement frequency and payment process.
- Free-trial duration and eligibility.
- Marketing services included in the platform offering.
- Standard and optional platform services and their commercial treatment.
- Store lifecycle transition and closure procedures.
- Capital assistance eligibility and assessment rules.
- Loan, advance and stock-credit structures.
- Repayment schedules, deductions, interest and default handling.
- Financial reporting and accounting requirements.
- Financial record retention and settlement procedures.
- Performance review frequency, targets and escalation rules.
- Applicable legal and regulatory obligations.

## 14. Relationship to other specifications

This document establishes the business model.

Detailed implementation and governance rules must be defined in the relevant documents covering:

- Product vision and scope.
- Store operating model.
- Product catalogue and inventory.
- Store registration and configuration.
- Identity, roles and permissions.
- Multi-tenancy and data architecture.
- Marketing and performance reporting.
- Financial operations and capital assistance.
- Audit and platform governance.
- Security and implementation strategy.

This document remains a draft until reviewed and approved by the Platform Owner.
