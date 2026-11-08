# Marketing Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-D5CCFAD17A |
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

This document defines the marketing architecture for the central retail platform and its participating stores.

It establishes how marketing activities, campaigns, promotional initiatives, customer acquisition, marketing expenditure and performance information are represented, coordinated and governed.

The architecture supports both platform-coordinated marketing and store-specific marketing while preserving store autonomy, customer privacy, financial separation and operational accountability.

## 2. Architectural Objectives

The marketing architecture must:

- Support platform-wide and store-specific marketing activities.
- Allow participating stores to propose, participate in and manage authorised campaigns.
- Support promotion of stores, products and approved retail opportunities.
- Coordinate customer acquisition and retention initiatives.
- Record campaign objectives, scope, participation, responsibilities and funding.
- Attribute marketing expenditure and results to the appropriate platform or store.
- Support campaign measurement and performance analysis.
- Protect customer information and communication preferences.
- Integrate with commerce, catalogue, customer, finance and reporting capabilities.
- Allow marketing capabilities to develop without unnecessary coupling to the commerce application.

## 3. Marketing Architecture Principles

### 3.1 Shared platform capability

Marketing is a shared platform capability that supports participating stores and the wider platform.

Shared infrastructure and coordination must not remove the distinction between platform-level and store-level responsibilities.

### 3.2 Store autonomy

Store Admins retain responsibility for their store's commercial decisions and authorised marketing participation.

The platform may coordinate, support, recommend and oversee agreed activities without assuming unrestricted authority over every store campaign.

### 3.3 Explicit campaign scope

Every campaign must have a defined scope.

Its scope must identify whether it applies to:

- The platform.
- One participating store.
- Multiple specifically identified stores.
- Selected products or product categories.
- Another explicitly approved marketing objective.

A campaign must not automatically include stores that have not agreed to participate where participation requires their agreement.

### 3.4 Recorded responsibilities and funding

Campaign participation, costs, funding arrangements and responsibilities must be agreed and recorded.

The system must distinguish standard platform marketing services from optional or separately funded activities.

### 3.5 Measurable outcomes

Campaigns should have defined objectives and measurable outcomes where practical.

Performance information must be sufficiently attributable to support meaningful evaluation without presenting incomplete attribution as certainty.

### 3.6 Customer privacy and consent

Marketing activity must respect applicable privacy requirements, customer consent and communication preferences.

Access to customer information must be limited to authorised purposes.

### 3.7 Separation of commercial and marketing rules

Marketing campaigns may support commercial promotions, but marketing coordination must not silently change product ownership, store pricing, inventory or order records.

Commercial changes must use the appropriate catalogue, pricing, inventory and commerce capabilities.

## 4. Marketing Domain Boundaries

### 4.1 Included marketing capabilities

The marketing domain includes:

- Marketing campaign planning and coordination.
- Platform-wide and store-specific campaigns.
- Store and product promotion.
- Customer acquisition initiatives.
- Customer retention programmes.
- Social media and digital marketing coordination.
- Cross-store marketing opportunities.
- Campaign participation and approval records.
- Marketing budgets, costs and funding attribution.
- Campaign performance measurement.
- Marketing recommendations and reporting.
- Marketing provider and channel integrations.

### 4.2 Related domains

Marketing interacts with other platform domains but does not replace their responsibilities.

- Catalogue manages product identity, descriptive information and store listings.
- Commerce manages carts, orders, pricing application and transactions.
- Inventory manages stock availability and movements.
- Customer manages customer identity, personal information and communication preferences.
- Finance records financial transactions, expenses and settlements.
- Identity and Access controls user identity and permissions.
- Activity and Audit records accountable actions and relevant changes.
- Reporting supports broader operational and business analysis.

### 4.3 Exclusions and boundaries

The marketing domain does not independently:

- Change product ownership or source product information.
- Set or override store selling prices.
- Create stock or modify inventory balances.
- Confirm orders or payment outcomes.
- Establish customer consent merely because contact details are available.
- Guarantee campaign results or customer acquisition.
- Authorise expenditure beyond approved funding and delegated authority.

## 5. Marketing Operating Model

### 5.1 Platform marketing

The platform may coordinate marketing that promotes the platform, participating stores, selected products or shared retail opportunities.

Platform marketing responsibilities may include:

- Planning coordinated campaigns.
- Identifying participating stores.
- Coordinating shared promotional activities.
- Supporting customer acquisition.
- Providing marketing resources and assistance.
- Monitoring campaign performance.
- Identifying opportunities for store growth.

### 5.2 Store marketing

A store may propose and participate in campaigns that promote its own brand, products and commercial activities.

Store marketing may include:

- Store-specific campaigns.
- Product promotion.
- Store announcements.
- Customer acquisition and retention initiatives.
- Store-specific social media activity.
- Promotions coordinated with the platform.

Store-level commercial decisions remain subject to the store's authority and applicable platform rules.

### 5.3 Joint marketing

Joint campaigns may involve the platform and multiple stores.

The participating parties, campaign scope, responsibilities, funding, cost allocation and expected contributions must be agreed before execution.

Participation by one store does not imply participation by another.

### 5.4 Marketing service arrangements

The platform must distinguish between:

- Marketing support included in the standard platform arrangement.
- Optional marketing services.
- Campaigns requiring separate funding.
- Third-party marketing services.
- Jointly funded marketing activities.

The exact commercial offering and applicable charges remain subject to agreement.

## 6. Marketing Actors and Responsibilities

### 6.1 Platform Owner

The Platform Owner is responsible for platform-level marketing direction, coordination and oversight.

Responsibilities may include:

- Establishing platform marketing priorities.
- Approving platform-wide campaigns within delegated authority.
- Coordinating participating stores.
- Approving platform-funded marketing expenditure within applicable authority.
- Reviewing marketing performance.
- Authorising agreed marketing service arrangements.

### 6.2 Store Admin

The Store Admin is responsible for store-level marketing decisions and participation.

Responsibilities may include:

- Proposing store-specific campaigns.
- Providing accurate store and product information.
- Confirming store participation.
- Agreeing store-level campaign responsibilities and funding.
- Reviewing store campaign results.
- Managing authorised store marketing activities.

### 6.3 Marketing personnel

Marketing personnel may receive delegated permissions to prepare, coordinate, execute or report on marketing activities.

Their access must be limited to assigned responsibilities and applicable platform or store scope.

Marketing personnel must not receive financial, customer-data or administrative authority merely because they perform marketing work.

### 6.4 External marketing providers

External agencies, contractors and service providers may support approved marketing activities.

Their access must be purpose-limited, contractually governed where appropriate and subject to security, privacy and confidentiality requirements.

External providers must not receive unrestricted platform or store access.

## 7. Marketing Scope and Store Participation

### 7.1 Campaign scope

A campaign must identify its applicable platform and store scope.

The system must distinguish platform-wide campaigns from campaigns that apply only to selected stores.

### 7.2 Store participation

Where store participation is required, the system must record the relevant store's agreement and participation status.

Participation must not be inferred from the store's existence on the platform or its availability of a promoted product.

### 7.3 Participation changes

A store's participation may change during a campaign where permitted by the agreed campaign terms.

Changes must be recorded with their effective time and responsible actor.

The effect of withdrawal or suspension on existing commitments, expenditure and customer-facing material must be handled explicitly.

### 7.4 Store eligibility

Campaign eligibility may depend on defined conditions such as:

- Store status.
- Product availability.
- Geographic coverage.
- Campaign-specific requirements.
- Agreed participation terms.

Eligibility rules must be explicit and consistently enforced.

## 8. Campaign Architecture

### 8.1 Campaign as a managed entity

A campaign must be represented as a managed business entity with a unique identifier and an auditable lifecycle.

A campaign record should support:

- Campaign name and description.
- Campaign type and objective.
- Campaign owner and responsible parties.
- Platform or store scope.
- Target audience.
- Participating stores.
- Campaign channels.
- Planned start and end dates.
- Campaign status.
- Budget and funding arrangements.
- Agreed responsibilities.
- Associated products or categories.
- Performance measures.
- Relevant approval and participation records.

### 8.2 Campaign lifecycle

The campaign lifecycle should support distinct states such as:

- Draft.
- Under review.
- Awaiting participation.
- Approved.
- Scheduled.
- Active.
- Paused.
- Completed.
- Cancelled.
- Archived.

The permitted transitions, required approvals and effective dates must be defined by campaign type and authority.

Campaign approval and store participation must be tracked independently. Approval of a platform campaign does not automatically approve or enrol every eligible store.

Each participating store must have its own participation status, agreement record and relevant effective dates.

### 8.3 Campaign ownership

Each campaign must have an accountable owner.

The campaign owner is responsible for coordinating its approved scope, activities, records and reporting.

Campaign ownership does not automatically grant authority over participating stores' pricing, inventory, customer records or finances.

### 8.4 Campaign history

Material campaign changes must be recorded.

The history should preserve relevant changes to campaign scope, dates, participating stores, budgets, responsibilities, approvals and status.

Previous campaign information must remain available for audit and performance review.


## 9. Campaign Execution Architecture

### 9.1 Campaign planning

Campaign planning must define the intended outcome, target audience, scope, channels, timeline, responsibilities and required resources.

Planning information must be sufficiently complete for the relevant parties to assess feasibility and approve participation.

### 9.2 Campaign approval

Campaign approval must follow the authority applicable to its scope and funding.

Platform-wide campaigns require appropriate platform approval.

Store-specific campaigns require approval by the authorised store representative where applicable.

Joint campaigns require agreement from the relevant participating parties.

### 9.3 Campaign scheduling

Campaigns may be scheduled for future execution.

Scheduling must account for campaign start and end dates, applicable time zones, channel availability and dependencies.

A scheduled campaign must not become active before its required approvals and participation conditions are satisfied.

### 9.4 Campaign execution

Campaign execution may involve publishing content, distributing approved communications, coordinating promotional activity and monitoring delivery.

Execution must remain within the approved campaign scope, budget, audience and duration.

Material deviations require appropriate review and approval.

### 9.5 Campaign suspension and cancellation

Authorised actors may pause or cancel campaigns within their delegated authority.

Suspension and cancellation must record the responsible actor, reason, effective time and relevant consequences.

Where a campaign involves multiple stores, the effect on each participating store must be handled explicitly.

### 9.6 Campaign completion

Campaign completion must preserve the final campaign status, actual execution period, participation records, expenditure and available performance results.

Campaign completion does not automatically settle outstanding financial obligations.

## 10. Marketing Channels and Distribution

### 10.1 Channel architecture

The marketing domain should support multiple distribution channels without making campaign management dependent on one provider.

Potential channels include:

- Storefront content and promotional placements.
- Email marketing.
- Social media.
- Search and digital advertising.
- Messaging platforms where permitted.
- Other approved digital or physical marketing channels.

Channel availability depends on the relevant provider, integration and approved business arrangements.

### 10.2 Channel configuration

Channel configuration must identify the relevant platform or store, provider account, authorised users and applicable permissions.

Shared provider accounts must support reliable attribution of activity and expenditure to the correct platform or participating stores.

### 10.3 Channel execution

The system should record relevant delivery information, including:

- Campaign and channel identifiers.
- Intended audience or targeting scope.
- Scheduled and actual execution times.
- Provider references.
- Delivery or publication status.
- Available engagement and performance information.
- Relevant errors and execution failures.

Provider responses must not be treated as proof of customer conversion or commercial outcomes without appropriate transaction attribution.

### 10.4 Channel failure

Channel failures must be recorded and made visible to authorised operators.

Retry behaviour must account for provider capabilities, duplicate publication risks and idempotency.

The system must distinguish a failed delivery from an uncertain delivery outcome.

### 10.5 Provider independence

Marketing campaign records must remain available independently of the continued availability of an external marketing provider.

Provider-specific functionality should be isolated behind appropriate integration boundaries.

## 11. Marketing Content Architecture

### 11.1 Content management

Marketing content may include:

- Campaign descriptions and copy.
- Images and creative assets.
- Promotional banners.
- Product and store marketing material.
- Email and notification templates.
- Social media content.
- Landing page content.
- Other approved campaign materials.

Content must be associated with the relevant campaign, store or platform context.

### 11.2 Content ownership

Content ownership and usage rights must be established separately from campaign participation.

The system should record relevant ownership, licensing, attribution and usage restrictions where applicable.

Participation in a campaign does not automatically transfer ownership of a store's brand assets or creative material.

### 11.3 Content approval

Content approval must follow the authority applicable to the material and its intended use.

Store-specific branding and commercial claims must receive appropriate store review.

Platform-wide material must receive appropriate platform review.

### 11.4 Content versioning

Material content changes should be versioned or otherwise recorded.

The system should preserve the content used in completed campaigns where necessary for audit, dispute resolution and performance analysis.

### 11.5 Content security

Uploaded content must be treated as untrusted input.

File type, size, access and processing must be controlled.

Content must not introduce executable or unsafe material into storefronts, communications or administrative interfaces.

## 12. Promotions and Commercial Offers

### 12.1 Marketing and promotion separation

Marketing campaigns may advertise commercial offers, but the marketing domain does not become the authority for product prices, inventory or order calculations.

Promotional rules must be implemented and enforced through the appropriate commerce and pricing capabilities.

### 12.2 Store-specific promotions

A store may define authorised promotional prices and offers for its own products and listings.

Store-specific promotions must not automatically change the commercial terms of another store selling the same shared product.

### 12.3 Platform-coordinated promotions

The platform may coordinate promotions involving multiple stores.

Each participating store's offer, pricing, funding responsibility and participation period must be explicit.

A shared campaign does not require identical pricing or promotional terms across participating stores.

### 12.4 Promotion eligibility

Promotional eligibility must be evaluated against the applicable store, product listing, dates, customer conditions and commerce rules.

Marketing material must not advertise an offer as available where the relevant commercial system cannot honour it.

Before publication and during campaign execution, advertised prices, eligibility conditions and validity periods must be checked against the authoritative commercial records.

Where participating stores have different offers, marketing content and destination links must clearly represent the applicable store-specific terms.

### 12.5 Promotion lifecycle

Promotional records should preserve their effective dates, approval status, applicable scope and relevant changes.

Campaign completion must not silently extend or reactivate an expired promotion.

## 13. Customer Audiences and Segmentation

### 13.1 Audience definition

Marketing audiences may be defined using approved customer attributes, store relationships, campaign interactions and other permitted information.

Audience definitions must have a clear purpose and applicable store or platform scope.

### 13.2 Store-scoped audiences

Store-level marketing audiences must respect the store-scoped customer model.

A store must not automatically gain access to another store's customer records because both participate in the platform.

### 13.3 Cross-store audiences

Cross-store audience creation requires an explicitly approved purpose, lawful basis, appropriate permissions and applicable customer transparency or consent.

Shared platform infrastructure does not itself authorise unrestricted sharing of customer information.

### 13.4 Audience snapshots

Where practical, campaign execution should preserve a record of the audience definition and selection time.

The system should distinguish an audience definition from the actual recipients selected for a particular campaign execution.

Sensitive customer information should not be unnecessarily duplicated in campaign records.

### 13.5 Segmentation restrictions

Audience segmentation must not use prohibited or inappropriate criteria.

Segmentation rules must be reviewed for privacy, fairness and applicable legal requirements.

Automated targeting must remain within approved business and legal boundaries.

## 14. Customer Consent and Marketing Preferences

### 14.1 Consent authority

Marketing consent and communication preferences are governed by the Customer Architecture.

The marketing domain must consume and respect the authoritative consent and preference information.

Campaign participation or possession of customer contact information must not be treated as marketing consent.

### 14.2 Purpose-specific consent

Consent must be appropriate to the intended communication purpose and channel.

Where consent is required, the system must not treat consent for one purpose as unrestricted permission for unrelated marketing.

### 14.3 Preference enforcement

Marketing execution must evaluate applicable communication preferences and suppression rules before sending or distributing direct customer communications.

Opt-outs and withdrawals must be respected through the relevant execution and provider integrations.

### 14.4 Consent history

Relevant consent and preference changes must retain the evidence and history required by the Customer Architecture.

Marketing systems must not overwrite authoritative consent records with campaign-level assumptions.

### 14.5 Transactional communications

Transactional customer communications must remain distinct from promotional marketing.

A transactional message must not be used as an unrestricted channel for unrelated promotional content.

### 14.6 Suppression management

The architecture should support suppression records for customers or destinations that must not receive particular marketing communications.

Suppression checks must apply at execution time, including where campaigns have been scheduled in advance.

The system must use the latest available authoritative consent and preference state immediately before dispatch.

A customer withdrawal or opt-out recorded after audience selection must be respected by subsequent campaign executions.

Where provider-side contact lists or suppression records are used, synchronisation failures must be visible and must not silently result in unauthorised marketing communication.

## 15. Marketing Integrations

### 15.1 Integration boundaries

Marketing integrations may connect to external providers for advertising, email distribution, social media publishing, analytics and other approved services.

Integrations must use controlled interfaces and must not bypass platform authorisation or store isolation.

### 15.2 Provider credentials

Provider credentials and access tokens must be protected as sensitive secrets.

Credentials must not be exposed in frontend code, public campaign material, logs or ordinary user-facing responses.

### 15.3 Provider account ownership

Each provider account must have a defined owner and authorised administrative responsibility.

Where an account serves multiple stores, campaign activity, expenditure and results must be attributable through reliable provider references or internal mappings.

### 15.4 Webhooks and callbacks

Incoming provider events must be authenticated and validated.

The platform must resolve campaign, store and provider context using trusted internal mappings and verified provider information.

An untrusted payload must not establish store authority merely by including a store identifier.

### 15.5 Integration reliability

Integration operations must support controlled retries, idempotency where appropriate, error handling and operational visibility.

Uncertain provider outcomes must be checked before retrying operations that could create duplicate publications, communications or charges.

### 15.6 Provider replacement

Campaign records and internal identifiers must not depend exclusively on external provider identifiers.

The platform should be able to replace or discontinue a provider without losing its internal campaign history and business records.

## 16. Marketing APIs and Application Boundaries

### 16.1 API responsibilities

Marketing APIs are responsible for managing campaign records, participation, content references, channel execution, audience definitions and marketing performance data.

They must enforce the approved business rules and authority boundaries.

### 16.2 Campaign operations

The API should support authorised operations for:

- Creating and updating campaign drafts.
- Submitting campaigns for review.
- Approving or rejecting campaigns.
- Recording store participation.
- Scheduling, pausing and cancelling campaigns.
- Managing campaign content references.
- Recording execution results.
- Retrieving campaign history and performance.

### 16.3 Store context

Every store-scoped marketing operation must resolve and validate the relevant store context on the backend.

A client-supplied store identifier is not sufficient evidence of authority.

### 16.4 Permission enforcement

Campaign permissions must distinguish platform-level authority from store-level authority.

Store Admins must not manage another store's campaigns or participation unless explicitly authorised.

Marketing personnel must be limited to their delegated campaign and operational responsibilities.

### 16.5 Validation and audit

The backend must validate campaign scope, dates, status transitions, participation, funding constraints and actor permissions.

Material operations must create appropriate activity and audit records.

### 16.6 API consistency

Marketing APIs must follow the approved API Architecture and Application Architecture.

Existing production routes and contracts must remain supported until their migration is completed and verified.


## 17. Marketing Financial Architecture

### 17.1 Financial Separation

Marketing expenditure must preserve the financial separation between the platform and participating stores.

The architecture must distinguish:

- Platform-funded campaign expenditure.
- Store-funded campaign expenditure.
- Jointly funded campaign expenditure.
- Third-party or externally funded campaign expenditure.
- Non-cash contributions and in-kind support where these are relevant.

A campaign's marketing budget or funding source must not be treated as proof that an expense has been incurred or paid.

Marketing records provide campaign context and attribution. The financial domain remains authoritative for financial transactions, expense recognition, approvals, settlement and reconciliation.

### 17.2 Campaign Budgets

Campaigns may record planned budgets, approved budgets, committed expenditure and actual expenditure.

These amounts must remain distinguishable.

The system should support recording:

- Planned campaign expenditure.
- Approved spending limits.
- Provider or supplier commitments.
- Actual expenditure.
- Outstanding amounts.
- Budget changes and approval history.

A planned budget must not automatically create a financial liability or transaction.

### 17.3 Shared Campaign Cost Allocation

Where campaign expenditure benefits multiple stores or includes both platform and store participation, the allocation method must be explicitly recorded.

Allocation may be based on agreed fixed amounts, percentages, actual usage or another approved method.

The system must not assume that shared expenditure is divided equally or apply an undocumented allocation formula.

Allocation records should identify:

- The funding parties.
- The agreed allocation method.
- The applicable amounts or percentages.
- The agreement and approval record.
- The effective period.
- Any subsequent changes.

Changes to an agreed allocation must remain traceable.

### 17.4 Financial Approval and Control

Campaign spending must follow the applicable financial approval authority.

The system should support approval limits, budget warnings and escalation where expenditure approaches or exceeds an approved amount.

A budget warning must not itself authorise additional expenditure.

Material changes to campaign funding, commitments or allocations require the appropriate human approval before they are treated as authorised.

### 17.5 Financial Records and Reconciliation

Marketing expenditure must be traceable to the relevant campaign and financial records.

The architecture must support reconciliation between campaign expenditure records, provider invoices, payment records and the applicable platform or store financial records.

Corrections must preserve the original financial history and follow the financial domain's authorisation and audit requirements.

Commission arrangements, service charges, reimbursement rules and other commercial terms remain subject to separate agreement and specification.

## 18. Campaign Attribution and Performance Measurement

### 18.1 Attribution Objectives

Campaign attribution must help the platform and participating stores understand campaign activity and its measurable commercial outcomes.

The system should support measurement of relevant indicators, including:

- Campaign reach and impressions.
- Clicks and engagement.
- Storefront visits and product views.
- Leads or customer enquiries where applicable.
- Orders and completed sales where reliably attributable.
- Campaign expenditure.
- Cost per acquisition where the underlying data supports the calculation.
- Return on advertising spend where the attribution method and financial data are sufficiently reliable.

Not every channel or campaign will provide every metric.

### 18.2 Attribution Data

Attribution records should identify the campaign, relevant channel, participating store where applicable, reporting period and available source references.

Where practical, the architecture should support campaign identifiers, referral parameters and provider reporting references.

Attribution data must not override authoritative order, payment or financial records.

### 18.3 Attribution Limitations

A customer interaction followed by a purchase does not necessarily prove that the campaign caused the purchase.

Reports must distinguish directly observed activity from attributed outcomes and estimated influence.

The attribution model, attribution window and treatment of repeat interactions remain open decisions.

The system must not present estimated campaign contribution as verified revenue or guaranteed incremental sales.

### 18.4 Event Deduplication and Data Quality

Repeated provider callbacks, duplicate tracking events and delayed reporting must not silently inflate campaign performance.

Where the source provides stable event identifiers, the system should use them to detect duplicates.

Reports must identify relevant missing, delayed, estimated or incomplete data.

### 18.5 Store and Platform Attribution

Campaign results must preserve the distinction between store-specific outcomes and platform-level outcomes.

Platform-wide reporting may aggregate participating store results where authorised, but must not expose another store's confidential commercial information to an unauthorised Store Admin.

Cross-store comparisons must account for differences in campaign participation, duration, expenditure, product category and available measurement data.

## 19. Marketing Analytics and Reporting

### 19.1 Reporting Objectives

Marketing reporting should support campaign evaluation, store growth decisions, budget management and platform oversight.

Reports should help users understand what happened, which stores and channels participated, what was spent and which outcomes were measurable.

### 19.2 Campaign Reports

Campaign reports may include:

- Campaign objectives and status.
- Participating stores.
- Channels and execution periods.
- Planned and actual expenditure.
- Reach, engagement and conversion metrics.
- Attributed orders or sales where supported.
- Provider delivery and execution results.
- Data quality and attribution limitations.

Reports must identify the reporting period and the source of relevant metrics.

### 19.3 Store-Level Reporting

Store Admins may access marketing reports for their own store and campaigns in which they are authorised to participate.

A Store Admin must not gain access to another store's confidential campaign budgets, customer audiences, detailed results or commercial information merely because the stores participated in a platform-coordinated campaign.

### 19.4 Platform-Level Reporting

Authorised platform personnel may access platform-wide campaign information and aggregated store performance according to their permissions.

Access to detailed store-level financial or customer information must remain subject to the applicable access rules and legitimate operational purpose.

### 19.5 Reporting Accuracy

Reports must distinguish actual values, estimates, calculated metrics and unavailable information.

Currency, time zone, reporting period, attribution method and applicable store context must be clear.

Exported reports must retain the same access restrictions and privacy protections as the underlying data.

## 20. Security, Privacy and Compliance

### 20.1 Access Control

Marketing functionality must use the platform identity and access architecture.

Users may access campaign information, content, audiences, provider configurations and reports only within their assigned platform or store authority.

Marketing permissions must not grant authority over unrelated commerce, inventory, customer account or financial operations.

### 20.2 Customer Data Protection

Marketing data must be limited to information necessary for the approved campaign purpose.

The architecture must protect customer contact details, audience membership, consent records, preferences and campaign interaction data.

Cross-store audience access must not be inferred from platform ownership or campaign coordination.

### 20.3 Consent and Legal Compliance

Marketing processing and communication must follow the applicable customer consent, preference and suppression requirements defined by the Customer Architecture.

Relevant legal and regulatory requirements, including applicable South African privacy and electronic communications requirements, must receive professional review before production use.

This architecture does not replace legal advice or establish that a particular campaign is lawful merely because the system permits it.

### 20.4 Provider Security

External marketing provider credentials must be stored and managed securely.

Credentials must not be exposed in frontend code, public APIs, logs or campaign content.

Provider access should be limited to the permissions and resources required for the integration.

### 20.5 Auditability

Material marketing actions must be attributable to the responsible user or system process.

Auditable actions should include campaign creation and approval, store participation changes, content publication, audience changes, consent-related suppression, budget approvals, provider configuration and campaign execution.

Sensitive customer data must not be unnecessarily copied into audit records.

### 20.6 Retention and Deletion

Marketing data must follow approved retention and deletion rules.

The architecture must distinguish campaign history, financial evidence, provider delivery records, customer audience data and consent records because they may have different retention requirements.

Deletion or anonymisation must not undermine legally required records or cause withdrawn marketing permissions to be lost.

## 21. Background Processing and Reliability

### 21.1 Scheduled Campaign Execution

Scheduled campaign execution should use controlled background processing rather than relying on a user's browser remaining open.

Scheduled jobs must preserve campaign, store, channel and execution context.

The architecture must account for time zones, daylight-saving changes where relevant, scheduling conflicts and campaign status changes.

### 21.2 Dispatch Reliability

Campaign dispatch must prevent unintended duplicate communication.

Where supported, stable execution identifiers and idempotency controls should be used across retries and provider requests.

A timeout or uncertain provider response must not automatically trigger a duplicate send. The system should determine the existing delivery outcome where possible before retrying.

### 21.3 Retry and Failure Handling

Transient provider failures may be retried according to controlled retry policies.

Permanent failures, exhausted retries and uncertain outcomes must be recorded for investigation.

The system should support controlled manual recovery without creating duplicate campaign executions or losing the original failure history.

### 21.4 Campaign Cancellation and Suspension

Suspending or cancelling a campaign must prevent new executions that have not already been authorised for dispatch.

The system must distinguish work that is queued, in progress, accepted by a provider and confirmed as delivered.

Already accepted provider messages may not be retractable. Their status and any remaining execution risk must be visible.

### 21.5 Monitoring and Operational Visibility

The platform should monitor campaign scheduling, job execution, provider availability, dispatch failures, retries, delivery outcomes and processing delays.

Operational alerts should identify the affected campaign and store context without unnecessarily exposing customer information.

## 22. Marketing Testing Architecture

### 22.1 Unit Testing

Unit tests should cover campaign rules, lifecycle transitions, participation rules, audience eligibility, budget calculations, allocation calculations and attribution logic.

### 22.2 Integration Testing

Integration tests should cover campaign APIs, database persistence, provider adapters, scheduled jobs, webhook handling and reporting data.

### 22.3 Authorisation and Isolation Testing

Tests must verify that:

- Store Admins cannot access another store's restricted campaign records.
- Store participation does not grant unrestricted access to platform campaigns.
- Marketing permissions cannot modify unrelated commercial or financial records.
- Platform-level access follows the assigned platform role.
- Cross-store audience and reporting boundaries are enforced.

Both permitted and denied operations must be tested.

### 22.4 Consent and Dispatch Testing

Tests must cover consent withdrawal after audience selection, suppression immediately before dispatch, scheduled campaign execution and provider-side suppression synchronisation failures.

A customer who has opted out must not receive a subsequent marketing communication merely because they were included in an earlier audience selection.

### 22.5 Promotion and Content Testing

Tests must verify that campaign material accurately reflects the applicable store offer, price, eligibility and validity period.

Store-specific offers must not be incorrectly represented as universal platform offers.

### 22.6 Financial and Attribution Testing

Tests must cover budget changes, approval boundaries, shared expenditure allocation, platform/store financial separation, duplicate tracking events and attribution limitations.

### 22.7 Reliability and Security Testing

Tests must cover duplicate dispatch prevention, provider timeouts, retries, webhook authentication, campaign cancellation, permission revocation, secret protection and recovery from failed background jobs.

Performance and load testing should cover realistic campaign sizes and dispatch volumes before materially increasing production usage.

## 23. Migration from the Existing Yotaabo Application

### 23.1 Migration Objectives

Marketing capabilities must be introduced without disrupting the existing Yotaabo storefront, administration functions or production operations.

Migration must be incremental and preserve existing production behaviour until replacement functionality has been implemented and verified.

### 23.2 Existing Application Protection

Existing production routes, frontend consumers, product data, customer records, orders, payments and operational workflows must remain protected.

No migration step may assume that an existing marketing capability or data structure can be removed without verification.

### 23.3 Incremental Marketing Introduction

Marketing capabilities should be introduced in controlled stages.

Possible stages include:

- Establishing campaign and participation data structures.
- Introducing platform and store campaign permissions.
- Adding campaign content and channel integrations.
- Introducing scheduling and execution.
- Adding attribution and reporting.
- Expanding coordinated marketing services.

Each stage must have defined verification and rollback requirements.

### 23.4 Existing Data Assessment

Before migrating existing marketing-related data, the implementation must identify its source, structure, ownership, quality and dependencies.

No existing campaign, customer consent or communication preference record may be silently discarded or reinterpreted.

Where no existing equivalent data exists, the target model must be introduced without inventing historical records.

### 23.5 Production Cutover and Rollback

The migration plan must identify the authoritative processing path for campaign creation, scheduling, dispatch, provider callbacks and background jobs.

Competing write or dispatch paths must not create duplicate campaigns or communications.

Rollback planning must account for scheduled campaigns, queued jobs, provider-accepted messages, consent changes and execution history.

## 24. Non-Functional Requirements

### 24.1 Security

Marketing functionality must enforce server-side authorisation, store isolation, secure provider integration and protection of customer data.

### 24.2 Privacy

Marketing processing must follow data minimisation, purpose limitation, consent and retention requirements.

### 24.3 Reliability

Campaign execution, scheduling, retries and provider integrations must support recoverable operation and prevent unintended duplicate actions.

### 24.4 Performance

Campaign management, audience selection and reporting must remain responsive under expected operating volumes.

Large audience processing and campaign dispatch must not block ordinary storefront and administrative operations.

### 24.5 Scalability

The architecture should support additional stores, campaigns, channels and provider integrations without requiring a separate application deployment for each store.

### 24.6 Maintainability

Campaign rules, provider integrations, channel execution and reporting should have clear module boundaries and testable interfaces.

### 24.7 Auditability

Material campaign, participation, financial approval, consent and execution actions must be traceable.

### 24.8 Availability

Marketing service failures must not unnecessarily interrupt unrelated storefront, checkout, order or inventory functionality.

## 25. Architectural Constraints

The marketing architecture is subject to the following constraints:

- The initial target backend follows a NestJS modular monolith architecture.
- The frontend remains based on React, TypeScript and Vite.
- PostgreSQL is the target relational data platform.
- Marketing functionality must preserve explicit platform and store context.
- Store-specific campaign participation and commercial authority must remain separate.
- Customer consent and communication preferences must follow the Customer Architecture.
- Marketing must not become the authoritative source for prices, inventory, orders, payments or financial postings.
- Platform and store expenditure must remain financially distinguishable.
- Provider integrations must use controlled backend boundaries.
- Existing Yotaabo production functionality must remain protected during migration.
- New services or microservices must not be introduced without a justified architectural need.

## 26. Open Marketing Architecture Decisions

The following decisions require further specification and approval before the corresponding functionality is implemented.

| Decision | Matters requiring resolution |
|---|---|
| Marketing service offering | Standard platform services and optional or separately funded services |
| Campaign approval | Approval authority and approval requirements by campaign type |
| Store participation | Enrolment, withdrawal, suspension and participation agreement rules |
| Campaign ownership | Ownership and accountability for platform-wide, store-specific and joint campaigns |
| Marketing channels | Initial channels, providers and supported communication methods |
| Provider accounts | Shared or separate provider accounts and the required attribution capabilities |
| Campaign budgets | Budget ownership, approval limits and expenditure controls |
| Cost allocation | Allocation methods and approval of shared campaign expenditure |
| Commercial charges | Service fees, reimbursements and any relationship to commission arrangements |
| Customer audiences | Permitted audience scope, cross-store use and access rules |
| Consent implementation | Detailed consent evidence, suppression synchronisation and provider responsibilities |
| Attribution | Attribution models, windows, event sources and reporting limitations |
| Performance metrics | Agreed KPIs, definitions and store comparison methodology |
| Reporting access | Platform and store reporting permissions and aggregation rules |
| Data retention | Retention periods for campaign, provider and interaction records |
| Scheduling | Time-zone handling, execution windows and campaign volume limits |
| Integration architecture | Provider selection, webhook requirements and integration hosting |
| Migration | Existing marketing data assessment, rollout sequence and cutover requirements |

Unresolved decisions must remain configurable or deferred where practical. They must not be converted into undocumented assumptions or fixed commercial rules.

## 27. Relationship to Other Documents

This document must be read alongside:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.
- System Architecture.
- Data Architecture.
- Store Architecture.
- Identity and Access Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Operations Architecture.
- Integration Architecture.
- Application Architecture.
- Commerce Architecture.
- Inventory Architecture.
- Customer Architecture.

The marketing architecture depends on the customer domain for consent and customer data boundaries, the commerce domain for authoritative offers and transaction outcomes, and the financial domain for expenditure and settlement records.

Where a dedicated finance architecture document is established, marketing financial integration must remain consistent with it.

If requirements conflict, the relevant domain's authoritative architecture and approved business rules must govern its area of responsibility.

## 28. Architecture Governance

### 28.1 Approval

This document remains a draft until reviewed and explicitly approved by the business owner.

Approval must not be inferred from implementation activity or the existence of related approved documents.

### 28.2 Change Management

Material changes to campaign authority, store participation, customer data use, consent handling, financial allocation or provider integration must be reviewed against the relevant business and architecture documents.

### 28.3 Implementation Compliance

Marketing implementation must follow the approved architecture and record any authorised deviation.

Unresolved decisions must be escalated rather than silently resolved through implementation assumptions.

### 28.4 Review

The architecture should be reviewed when the marketing operating model, provider arrangements, legal requirements, platform structure or participating store model materially changes.
