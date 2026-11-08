# Store Onboarding Guide

## Document Control

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-USR-9C50EF5B5F |
| Category | User guidance |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide defines the practical process for onboarding a participating store onto the shared retail platform.

It describes the information, approvals, configuration, technical provisioning, verification and operational preparation required before a store becomes active.

The guide applies to Yotaabo and all other participating stores.

Yotaabo is the first participating store. It does not receive a different set of store-level privileges or operating rules merely because it is the platform owner's own business.

## 2. Onboarding Objectives

Store onboarding must:

- Establish a clear and verified store identity.
- Confirm the authority of the person requesting onboarding.
- Record the store's ownership and operating arrangements.
- Establish an authorised Store Admin.
- Configure the store within the shared platform.
- Generate the required frontend integration package.
- Protect store data and operational independence.
- Prepare products, inventory, customers and commerce workflows.
- Establish financial and operational responsibilities.
- Verify readiness before activation.

## 3. Onboarding Principles

### 3.1 Authorised Creation

Only an authorised Platform Super Admin may create a store.

A store request or developer configuration must not independently create an active store.

### 3.2 Consistent Treatment

Every participating store follows the same platform-level onboarding controls.

Store-specific requirements may differ where justified by the store's operations, integrations or approved arrangements.

### 3.3 Explicit Ownership

Record the store's ownership and operating arrangements.

Do not assume that participation in the platform transfers ownership of products, inventory, customer relationships or business assets.

### 3.4 Store Independence

Each store maintains its own operational identity, storefront, commercial terms, inventory, orders and financial records within the shared platform.

### 3.5 Secure Provisioning

Store integration configuration must be generated through the authorised provisioning workflow.

Private credentials must never be included in public frontend configuration.

### 3.6 Readiness Before Activation

Creating a store record does not mean the store is ready to trade.

Activation requires completion of the applicable onboarding checks.

## 4. Store Eligibility and Approval

### 4.1 Eligibility Assessment

Assess whether the proposed store is suitable for participation.

Consider:

- Proposed products and business activities.
- Store ownership and operating arrangements.
- Ability to meet platform operating requirements.
- Required technical and integration capabilities.
- Support and communication arrangements.
- Financial and commercial arrangements.
- Relevant legal or regulatory considerations.

### 4.2 Approval Authority

Store participation must be approved by the authorised platform authority.

Approval must be recorded before the store is created for operational use.

### 4.3 Commercial Arrangements

Document applicable commercial terms before activation.

These may include platform services, commissions, fees, stock assistance, capital assistance, settlement arrangements and other agreed obligations.

No default commission rate or financial arrangement is assumed.

### 4.4 Due Diligence

Collect information reasonably necessary to assess the store and establish its operating relationship with the platform.

Sensitive personal or business information must be handled through appropriate secure procedures.

### 4.5 Rejection or Deferral

A store may be rejected or deferred where required information, approval, readiness or acceptable operating arrangements are missing.

Record the reason and any conditions that must be satisfied before reconsideration.

## 5. Store Information Requirements

### 5.1 Store Identity

Record the approved store name, unique platform identifier and relevant business description.

The unique identifier must be generated or assigned through the platform's controlled creation process.

### 5.2 Ownership and Operating Information

Record the relevant ownership, operating and authorised representative information.

Distinguish the person who owns or operates the business from the person authorised to administer its platform account.

### 5.3 Contact Information

Record appropriate operational contact details for the store and its authorised representatives.

### 5.4 Storefront Information

Collect the information needed to establish the store's public identity and storefront configuration.

This may include:

- Public store name.
- Logo and approved brand assets.
- Store description.
- Contact and customer support details.
- Intended storefront domain.
- Relevant public policies and customer information.

### 5.5 Operational Information

Identify the store's expected product categories, inventory arrangements, fulfilment methods, operating locations and customer support responsibilities.

### 5.6 Integration Requirements

Identify the frontend development owner, intended technology, domain requirements and any external services required by the store.

### 5.7 Information Verification

Verify submitted information before using it to configure the store.

Record missing, unverified or disputed information and resolve material issues before activation.


## 6. Store Creation

### 6.1 Creation Authority

The Platform Super Admin initiates store creation after the required onboarding approval has been recorded.

### 6.2 Store Record

Create the authoritative store record using the approved platform workflow.

The record must establish the store's identity, unique identifier, status and required ownership and configuration relationships.

### 6.3 Initial Configuration

Apply the approved initial configuration, including:

- Store identity and public name.
- Store status.
- Store Admin membership.
- Storefront configuration.
- Relevant operational settings.
- Approved integration settings.
- Applicable commercial arrangements.

Do not populate business-critical settings with undocumented assumptions or arbitrary defaults.

### 6.4 Creation Verification

Confirm that the store record was created successfully and that its relationships and initial configuration are correct.

Record creation failures and resolve them before proceeding.

## 7. Store Admin Setup

### 7.1 Administrator Identification

Identify the person authorised to act as the Store Admin.

Verify their identity and authority through the approved onboarding process.

### 7.2 Account Provisioning

Create or invite the Store Admin through the platform's identity and access management process.

Do not create shared administrator accounts.

### 7.3 Store Membership

Associate the administrator with the correct store.

Verify that the membership is active and that the administrator cannot access another store's restricted information through ordinary store-level permissions.

### 7.4 Permission Verification

Confirm that the Store Admin has the permissions required to manage the store.

Verify that platform-level privileges have not been granted unintentionally.

### 7.5 Initial Access

Provide account activation and access instructions through an approved secure channel.

The administrator must establish their own credentials and authentication controls.

### 7.6 Additional Employees

The Store Admin may invite employees and delegate permissions within the authorised store scope.

Platform approval is not required for every ordinary employee permission assignment unless the action crosses a defined platform-level authority boundary.

## 8. Automatic Integration Package Provisioning

### 8.1 Provisioning Requirement

Creating a store through the authorised Platform Super Admin workflow must automatically initiate generation of its store-specific integration package.

This is a required platform capability, not an optional manual setup task.

### 8.2 Provisioning Trigger

The provisioning process must use the authoritative store record created by the platform.

It must not rely on a frontend developer manually supplying or inventing a store identifier.

### 8.3 Package Contents

The generated package must provide the information required to develop an independent frontend connected to the shared backend and the correct store catalogue.

It should include:

- Store identifier and public store reference.
- Relevant API base URL and environment configuration.
- Store-scoped public identifiers or publishable keys, where required.
- API endpoint and contract documentation.
- Store catalogue access instructions.
- Product and media retrieval guidance.
- Domain and CORS configuration requirements.
- Example environment configuration.
- SDK or starter tooling, where provided.
- Development and test instructions.
- Deployment and integration verification instructions.

### 8.4 Frontend Developer Handover

The platform must make the generated package available to authorised platform personnel for secure handover to the designated frontend developer.

The developer must receive sufficient information to build and test the store frontend without requiring privileged database or backend credentials.

### 8.5 Public Configuration

Configuration intended for browser use must contain only public, store-scoped values.

A public store identifier or publishable key must not be treated as proof of user identity, permission or unrestricted store access.

### 8.6 Private Credentials

The package must never expose:

- Database passwords.
- Supabase service-role keys.
- Private signing secrets.
- Privileged backend credentials.
- Private provider credentials.
- Other secrets that grant administrative or unrestricted access.

Private integration credentials must remain server-side, protected, appropriately scoped and revocable.

### 8.7 Provisioning Status

The platform must record the provisioning status.

Possible states should distinguish successful completion, pending work, failure and required recovery.

A store must not be considered integration-ready merely because provisioning was initiated.

### 8.8 Provisioning Failure

If provisioning fails:

- Preserve the store record.
- Record the failure and relevant diagnostic information.
- Identify the affected provisioning stage.
- Provide an authorised recovery or retry process.
- Prevent duplicate or conflicting integration packages.
- Verify the generated package before marking provisioning complete.

### 8.9 Package Updates

When relevant store configuration, API contracts, domains or integration requirements change, assess whether the package must be regenerated or updated.

Superseded packages must be identifiable so developers do not unknowingly use obsolete configuration.

### 8.10 Developer Access

Restrict access to generated packages to authorised personnel.

Review access when the frontend development assignment changes or ends.

## 9. Frontend Development Handover

### 9.1 Development Responsibility

Each store may have its own frontend development team or developer.

The developer is responsible for implementing the store's independently developed frontend using the approved integration package and platform contracts.

### 9.2 Backend Dependency

All participating storefronts connect to the shared backend and authorised platform services.

A separate frontend does not imply a separate or independently privileged backend.

### 9.3 Store Context

The frontend must use its assigned store configuration.

The backend remains responsible for resolving and enforcing store context, identity and permissions.

### 9.4 Catalogue Integration

Verify that the frontend can retrieve the correct store catalogue and display only products authorised for that store.

### 9.5 Media Integration

Verify that product and storefront media load through approved storage and delivery mechanisms.

### 9.6 Development and Testing

The developer must test against an appropriate non-production environment before production integration.

Production credentials and real customer data must not be used in local development unless specifically authorised and protected.

### 9.7 Developer Access Revocation

Revoke temporary development access when it is no longer required.

Do not revoke public storefront configuration merely because a developer's access ends; review the relevant access and credential scopes separately.


## 10. Storefront Configuration

### 10.1 Store Identity

Verify that the storefront displays the approved store name, branding and public identity.

### 10.2 Storefront Independence

Each store may have an independently developed frontend and distinct visual identity.

Storefronts must use supported platform configuration and APIs.

They must not bypass platform security or introduce unauthorised business logic that conflicts with shared platform rules.

### 10.3 Supported Customisation

Store-specific branding, approved content, supported settings and other configurable presentation options may be applied.

Arbitrary component placement, page composition, navigation structures and unsupported layout overrides are outside the standard onboarding configuration.

### 10.4 Domain Configuration

Configure the approved storefront domain and verify DNS, TLS certificates, CORS settings and relevant application configuration.

### 10.5 Customer-Facing Information

Verify that the storefront displays accurate contact information, support details, applicable policies and other required customer-facing information.

### 10.6 Storefront Verification

Test the storefront on supported devices and browsers.

Confirm that navigation, product discovery, product details, media and customer interactions work correctly.

## 11. Product Catalogue Setup

### 11.1 Product Ownership

Determine whether each product's source information is owned by the platform or by the participating store.

Record ownership accurately.

### 11.2 Product Availability

Confirm that products intended for the store are authorised and available for listing.

A product existing in the shared catalogue does not automatically mean every store may sell it.

### 11.3 Store Listings

Configure the store's product listings, including relevant pricing, availability, descriptions where permitted, and commercial terms.

### 11.4 Product Variants

Where products have variants, verify variant identity, attributes and SKU information.

Ensure that store listings and inventory reference the correct variants.

### 11.5 Product Media

Verify that product images and other media are associated with the correct products and are accessible through approved mechanisms.

### 11.6 Catalogue Verification

Confirm that the storefront displays the intended products, variants, descriptions, prices and availability.

Check that one store cannot modify another store's listing through ordinary store-level access.

## 12. Inventory Setup

### 12.1 Inventory Ownership

Establish which inventory belongs to the store and how it is sourced.

Platform-supplied stock and store-owned stock must remain distinguishable where required by their agreements.

### 12.2 Stock Locations

Configure relevant inventory locations and operational arrangements.

### 12.3 Opening Stock

Record opening stock quantities through an authorised and traceable process.

Where physical stock counts are available, use them as the basis for initial quantities.

### 12.4 Variant-Level Inventory

Where products have variants, configure stock against the correct variant.

Do not combine quantities belonging to different variants.

### 12.5 Stock Movements

Verify that receipts, adjustments, transfers and other movements can be recorded correctly.

### 12.6 Inventory Verification

Compare initial inventory records with available physical stock evidence.

Investigate material differences before the store begins trading.

## 13. Customer and Order Preparation

### 13.1 Customer Data

Determine whether existing customer information must be migrated or whether the store will begin with new customer records.

Use approved data migration and privacy procedures.

### 13.2 Customer Ownership and Access

Confirm that customer records follow the approved store-scoping and access model.

Cross-store customer identity or sharing must not be assumed.

### 13.3 Customer Communication

Configure approved customer communication channels and relevant consent and preference handling.

### 13.4 Order Configuration

Verify that the store can receive and manage its own orders.

Orders must retain correct store attribution and transaction history.

### 13.5 Payment Configuration

Configure authorised payment provider arrangements.

Verify provider account attribution, callback handling, transaction references and reconciliation requirements.

### 13.6 Fulfilment Preparation

Confirm the store's fulfilment methods, operating responsibilities, customer communication and exception-handling procedures.

### 13.7 Order Testing

Run controlled test scenarios covering successful orders, failed payments, uncertain payment outcomes, cancellations, returns and relevant fulfilment events.

Use non-production or otherwise approved test arrangements.

## 14. Financial and Commercial Setup

### 14.1 Commercial Agreement

Record the approved commercial relationship between the store and platform.

### 14.2 Financial Separation

Establish the store's financial records separately from platform-level financial records.

### 14.3 Commission and Fees

Configure only approved commission, fee and settlement terms.

Do not assume default rates or schedules.

### 14.4 Payment and Settlement

Verify payment processing, provider attribution, settlement information and reconciliation responsibilities.

### 14.5 Stock and Capital Arrangements

Where the platform provides stock or capital assistance, record the arrangement, ownership, value, obligations and approval evidence.

### 14.6 Financial Responsibilities

Identify who is responsible for recording store income and expenses, reviewing transactions, performing reconciliation and approving adjustments.

### 14.7 Opening Financial Position

Where applicable, establish the store's opening financial position using verified records.

Do not invent opening balances or treat unverified estimates as confirmed financial data.

### 14.8 Financial Verification

Confirm that test transactions are correctly attributed to the store and that platform and store reporting remain distinguishable.

## 15. Integration and Notification Setup

### 15.1 External Services

Identify the external services required by the store.

Configure them through approved integration procedures.

### 15.2 Provider Ownership

Record whether an integration uses a shared platform provider account or a store-specific provider account.

Confirm that transactions, events, fees and settlements can be reliably attributed to the correct store.

### 15.3 Webhooks

Verify callback URLs, authenticity checks, event persistence, duplicate handling and retry behaviour.

### 15.4 Email and Communication

Configure approved sender identities, templates and delivery settings.

Verify domain authentication where required.

### 15.5 Notification Preferences

Confirm that transactional, operational and marketing notifications follow their separate rules.

### 15.6 Delivery Verification

Test relevant notification channels and confirm that failures are visible to authorised personnel.

### 15.7 Integration Failure Handling

Document the responsible person, escalation path and recovery process for each critical integration.

## 16. Operational Readiness

### 16.1 Store Administration

Confirm that the Store Admin can access the store and perform required administrative tasks.

### 16.2 Employee Access

Where employees are involved, verify their accounts and delegated permissions.

### 16.3 Support Arrangements

Identify store support contacts and platform escalation channels.

### 16.4 Inventory Procedures

Ensure that store personnel understand stock receipts, movements, counts, adjustments and transfers.

### 16.5 Order Procedures

Ensure that personnel understand order processing, payment verification, fulfilment, cancellations, returns and customer support.

### 16.6 Financial Procedures

Confirm that the store understands its financial recordkeeping, reconciliation and approval responsibilities.

### 16.7 Incident Reporting

Provide instructions for reporting service interruptions, security concerns, suspected fraud and operational failures.

### 16.8 Operational Documentation

Provide the store with relevant procedures, responsibilities and contact information before activation.


## 17. Onboarding Testing and Verification

### 17.1 Identity and Access Testing

Verify that the Store Admin can access the correct store and that unauthorised users cannot access restricted store functions.

Test permission boundaries and account recovery where applicable.

### 17.2 Store Isolation Testing

Verify that the store cannot retrieve or modify another store's restricted products, inventory, customers, orders or financial records.

Test both permitted and denied operations.

### 17.3 Frontend Integration Testing

Verify that the independently developed frontend connects to the correct environment and store context.

Confirm that public configuration contains no privileged credentials.

### 17.4 Catalogue Testing

Test product discovery, product details, variants, pricing, availability and media retrieval.

### 17.5 Inventory Testing

Test stock availability, reservations, movements, adjustments and relevant variant-level operations.

### 17.6 Commerce Testing

Test the complete customer purchasing journey, including checkout, payment outcomes, order creation and fulfilment.

### 17.7 Financial Testing

Verify transaction attribution, financial separation, provider references and reconciliation behaviour.

### 17.8 Integration Testing

Test successful events, failed requests, retries, duplicate callbacks and uncertain provider outcomes.

### 17.9 Notification Testing

Verify transactional and operational notifications, delivery status, templates and customer preferences.

### 17.10 Operational Acceptance

Confirm that store personnel can perform their assigned responsibilities and know how to escalate problems.

### 17.11 Defect Resolution

Record defects with their severity, impact, owner and resolution status.

Critical security, data-integrity and financial defects must be resolved before activation.

## 18. Store Activation

### 18.1 Activation Preconditions

Before activation, confirm that:

- Store creation and identity verification are complete.
- Required onboarding approvals are recorded.
- The Store Admin has verified access.
- Store integration provisioning has completed successfully.
- The frontend has passed required integration tests.
- Domain and storefront configuration are verified.
- Product listings and opening inventory are ready.
- Customer and order workflows have been tested.
- Payment and other critical integrations are verified.
- Financial arrangements and responsibilities are documented.
- Operational support arrangements are available.
- Critical defects have been resolved.
- Required acceptance evidence is recorded.

### 18.2 Activation Authority

Only the authorised platform authority may approve activation.

The Store Admin may confirm store readiness but cannot independently grant platform activation authority unless explicitly delegated.

### 18.3 Activation Execution

Activate the store through the approved platform workflow.

Verify that its status changes correctly and that the relevant services recognise the active store state.

### 18.4 Production Verification

After activation, perform controlled production checks.

Verify storefront availability, store context, authentication, catalogue access, critical APIs and relevant operational workflows.

### 18.5 Activation Record

Record the activation date, responsible authority, verification evidence and any approved limitations.

## 19. Post-Onboarding Support

### 19.1 Initial Monitoring

Monitor the newly activated store more closely during its initial operating period.

Review storefront availability, API errors, catalogue behaviour, order processing, payment events and integration health.

### 19.2 Store Admin Support

Provide reasonable support while the Store Admin becomes familiar with platform workflows.

Support must respect store authority and data-access boundaries.

### 19.3 Early Issue Review

Review issues reported after activation.

Distinguish onboarding defects from ordinary operational questions and new requirements.

### 19.4 Corrective Actions

Assign owners and target outcomes to material issues.

Track unresolved issues until they are corrected or formally accepted.

### 19.5 Stabilisation

Consider onboarding stabilised when critical workflows operate reliably, material defects are resolved and operational responsibilities are functioning as intended.

## 20. Store Onboarding Changes

### 20.1 Changes During Onboarding

Changes to ownership, authorised representatives, commercial terms, integrations or other material information must be reassessed before activation.

### 20.2 Configuration Changes After Activation

Store configuration changes must follow the relevant operational and change-control procedures.

### 20.3 Developer or Provider Changes

When a frontend developer or external provider changes, review access, credentials, configuration and integration dependencies.

### 20.4 Material Business Changes

Changes affecting store ownership, legal status, operating arrangements or financial obligations must be referred to the appropriate platform authority for review.

### 20.5 Change Records

Maintain a record of material changes, approvals, effective dates and affected responsibilities.

## 21. Store Suspension and Reactivation

### 21.1 Suspension Assessment

Suspension may be considered where there are serious security, financial, legal, operational or governance concerns.

The authority and grounds must follow the platform governance model.

### 21.2 Emergency Suspension

Where immediate protective action is necessary, an authorised person may apply emergency restrictions without waiting for every ordinary approval step.

Record the initiator, reason, scope and time, and arrange prompt review.

### 21.3 Suspension Impact

Before ordinary suspension, assess the impact on customers, active orders, payments, fulfilment, outstanding obligations and historical access.

### 21.4 Reactivation Conditions

Before reactivation, verify that the suspension grounds have been addressed and that access, configuration, integrations and operational readiness are satisfactory.

### 21.5 Historical Records

Suspension or deactivation must not automatically delete historical business records or outstanding financial obligations.

## 22. Onboarding Exceptions and Escalation

### 22.1 Exceptions

Exceptions must be documented with their justification, affected requirements, risk assessment, compensating controls, approving authority and review conditions.

### 22.2 Critical Exceptions

Do not waive essential store isolation, authentication, financial integrity or secret-protection requirements to accelerate onboarding.

### 22.3 Escalation

Escalate unresolved ownership disputes, suspicious information, material financial concerns, security weaknesses and provider limitations to the appropriate authority.

### 22.4 Deferred Requirements

A non-critical requirement may be deferred only where the responsible authority accepts the risk and records the completion condition.

## 23. Onboarding Completion Criteria

A store onboarding is complete when:

- The store has an approved and verified identity.
- Ownership and operating arrangements are recorded.
- The authoritative store record exists.
- An authorised Store Admin has active access.
- The automatic integration package has been generated and verified.
- The independent frontend has passed required integration checks.
- Store-specific configuration is correct.
- Catalogue and inventory setup is verified.
- Customer and commerce workflows are ready.
- Financial and commercial arrangements are documented.
- Critical integrations and notifications are tested.
- Operational responsibilities and support channels are established.
- Required security and store-isolation tests pass.
- Activation is approved and recorded.
- Outstanding exceptions have been accepted by the appropriate authority.

## 24. Onboarding Constraints and Open Decisions

### 24.1 Store Eligibility Criteria

Final eligibility criteria and required supporting evidence must be confirmed through platform governance.

### 24.2 Commercial Requirements

Commission rates, fees, settlement terms and assistance arrangements must be agreed individually or through approved platform policy.

### 24.3 Legal and Regulatory Review

Applicable South African legal, privacy, consumer, tax and accounting obligations require professional review.

This guide does not determine the legal status of participating stores or establish compliance by itself.

### 24.4 Technical Provisioning Details

The exact integration-package format, SDK or starter tooling, developer handover mechanism and provisioning recovery implementation remain subject to technical design and implementation decisions.

### 24.5 Operational Service Targets

Onboarding timelines, support availability and service targets must be approved rather than assumed.

## 25. Relationship to Other Documents

This guide must be read alongside:

- Product Vision.
- Platform Business Model.
- Store Operating Model.
- Scope and Exclusions.
- Platform Governance.
- Decision Register.
- Store Architecture.
- System Architecture.
- Data Architecture.
- Identity and Access Architecture.
- API Architecture.
- Security Architecture.
- Deployment Architecture.
- Integration Architecture.
- Product Catalogue Architecture.
- Inventory Architecture.
- Commerce Architecture.
- Customer Architecture.
- Finance Architecture.
- Notification Architecture.
- Operations Architecture.
- Performance Architecture.
- Implementation Roadmap.
- Migration Plan.
- Testing Strategy.
- Development Standards.
- Operations Runbook.

Detailed technical and governance requirements remain authoritative in their respective documents.

## 26. Store Onboarding Guide Document Management

### 26.1 Ownership

The Platform Owner is accountable for this document.

### 26.2 Maintenance

Update this guide when approved onboarding requirements, provisioning capabilities, responsibilities or operating procedures change.

### 26.3 Review

Review the guide after significant onboarding exercises and when material changes affect the process.

### 26.4 Version Control

Maintain this document in version control.

Material changes must be traceable through repository history.

### 26.5 Approval

This document remains a draft until formally reviewed and approved by the authorised owner.
