# Customer Data Capture and Consent Standards

## Document Control

| Field | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-631BAA89EA |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This document defines how the platform and participating stores collect, use, access, share and retain customer information.

It establishes consistent controls for customer data capture across independent storefronts, WhatsApp-based commerce, order processing, customer support and future platform capabilities.

The objective is to collect only information necessary for legitimate business purposes, protect customer privacy and maintain clear accountability for data handling.

## 2. Scope

This standard applies to:

- The platform owner and authorised platform personnel.
- Participating stores.
- Store Admins and employees.
- Frontend and backend developers.
- Third-party service providers processing customer information.
- Customer information collected through storefronts, WhatsApp and other approved channels.

It applies to personal information processed by the platform or a participating store, whether collected electronically or through an approved manual process.

## 3. Governing Principles

Customer data handling must follow these principles:

1. Collect only information needed for a defined purpose.
2. Explain the purpose of collection before or when information is collected.
3. Use information only for authorised purposes.
4. Keep customer information accurate and reasonably up to date.
5. Restrict access according to business responsibility.
6. Protect information against unauthorised access, disclosure, alteration and loss.
7. Retain information only for an approved and justified period.
8. Respect customer rights and valid objections.
9. Maintain evidence of consent where consent is the applicable legal basis.
10. Do not assume that information supplied for an order can automatically be used for marketing.

## 4. Applicable Legal and Regulatory Requirements

The platform and participating stores must obtain appropriate South African legal advice on applicable privacy and data protection obligations, including the Protection of Personal Information Act (POPIA).

Where a store serves customers in other jurisdictions, additional privacy and consumer protection requirements may apply.

This document establishes internal operating standards. It does not replace legal advice or determine the legal status of each party in every processing arrangement.

The platform owner must maintain an appropriate assessment of the responsibilities of the platform and participating stores, including whether each party acts as a responsible party, operator or another legally recognised role for a particular processing activity.

## 5. Data Classification

Customer information must be classified according to sensitivity and business impact.

| Classification | Examples | Handling |
|---|---|---|
| Public | Public product and store information | May be displayed publicly when approved. |
| Internal | Non-public operational customer references | Restricted to authorised personnel. |
| Confidential | Customer names, contact details, order history and addresses | Access-controlled and protected. |
| Highly Restricted | Identity documents, sensitive payment evidence and other high-risk personal information | Strictly limited access and additional safeguards. |

Classification must reflect the actual information and applicable legal requirements.

## 6. Data Collection Requirements

Before collecting customer information, the responsible store or platform function must identify:

- What information is required.
- Why it is required.
- Which party is collecting it.
- Which party will use it.
- Whether another service provider will process it.
- How long it needs to be retained.
- How customers can exercise applicable rights.

Collection interfaces and manual processes must not request unnecessary personal information.

Optional information must be clearly distinguished from information required to complete a transaction or provide a requested service.

## 7. Customer Data Categories

Depending on the transaction and service, the platform may process:

### 7.1 Contact Information

- Customer name.
- Telephone number.
- Email address.

### 7.2 Order Information

- Order reference.
- Products and variants purchased.
- Quantities.
- Order dates.
- Order status.
- Payment and fulfilment status.

### 7.3 Delivery and Collection Information

- Delivery address, where required.
- Collection arrangements.
- Delivery instructions.
- Relevant communication history.

### 7.4 Customer Support Information

- Support enquiries.
- Complaints.
- Order-related correspondence.
- Resolution history.

### 7.5 Marketing Preferences

- Marketing consent status.
- Communication channel preferences.
- Subscription and withdrawal history.
- Relevant consent timestamps and records.

The platform must not assume that every category is required for every customer or transaction.

## 8. Purpose Limitation

Customer information must be linked to a defined business purpose.

Permitted purposes may include:

- Processing customer orders.
- Communicating about an order.
- Verifying payment or resolving payment discrepancies.
- Coordinating delivery or collection.
- Providing customer support.
- Managing returns, refunds and complaints.
- Maintaining required business and financial records.
- Sending marketing communications where an appropriate legal basis exists.
- Meeting applicable legal obligations.

A new use that is materially different from the original purpose must undergo privacy and legal review before implementation.

## 9. Customer Notice and Transparency

Customers must receive clear information about relevant data processing.

The privacy notice should explain, as applicable:

- The identity and contact details of the responsible party.
- The categories of personal information collected.
- The purposes of processing.
- Whether information is shared with other parties.
- Relevant third-party service providers.
- Retention principles.
- Applicable customer rights.
- How customers can submit privacy-related requests.
- How to raise a complaint with the appropriate authority.

Notices must be accessible through relevant storefronts and other collection channels.

Manual collection through WhatsApp must not be treated as an exemption from transparency requirements.

## 10. Consent Management

Consent must be requested only where it is the appropriate legal basis for the relevant processing activity.

Where consent is required, it must be:

- Freely given.
- Specific to the relevant purpose.
- Informed.
- Unambiguous.
- Capable of being demonstrated.
- Withdrawable through an appropriate process.

A customer placing an order must not automatically be treated as consenting to unrelated marketing.

Consent for different purposes must not be bundled into one unclear acceptance.

The platform must not rely on preselected marketing options or misleading interface design.

## 11. Marketing Communications

Marketing communications must be managed separately from transactional communications.

Transactional communications include messages needed to process an order, confirm an operational status or resolve a customer request.

Marketing communications promote products, services, offers or commercial campaigns.

Stores must:

- Use an appropriate legal basis for marketing.
- Record relevant consent or other applicable legal justification.
- Identify the sending business where required.
- Provide a practical method to withdraw consent or opt out.
- Respect withdrawal and suppression requests.
- Avoid re-adding customers to marketing lists without an appropriate basis.

A customer who opts out of marketing must still receive necessary transactional communications where legally permitted and operationally required.

WhatsApp marketing must follow applicable privacy, electronic communications and platform rules.

## 12. Store-Level Data Separation

Customer data access must respect the platform's multi-store architecture.

A store must only access customer information necessary for its legitimate business activities.

Where a customer places an order with one store, another participating store must not automatically gain access to that customer's order history or private contact details.

Shared product catalogues do not create shared customer data permissions.

Platform-level access must be limited to defined operational, security, support, legal or governance purposes and must be auditable.

## 13. Customer Accounts and Guest Transactions

The platform must not require customer accounts unless an approved business requirement justifies them.

Where guest checkout or manual WhatsApp ordering is supported, customer information should be associated with the relevant order without automatically creating a permanent customer account.

Where customer profiles are introduced, their purpose, data fields, access permissions and retention rules must be separately defined and approved.

Duplicate customer records should be handled through controlled matching and review. The platform must not merge records based solely on similar names.

## 14. WhatsApp and Manual Communication

The current commerce model uses WhatsApp and manual store processes for customer communication, payment coordination and fulfilment.

Stores must:

- Use approved business communication channels.
- Limit access to customer conversations.
- Avoid sharing customer information with unrelated employees or stores.
- Avoid requesting unnecessary sensitive information.
- Transfer relevant order information into approved platform records where required.
- Protect screenshots, documents and other customer-submitted evidence.
- Avoid using personal devices or unmanaged storage for sensitive information where an approved alternative exists.

Customer conversations must not be assumed to be securely or permanently available as the platform's only business record.

The platform's recordkeeping process must identify which information must be retained independently of the messaging service.

## 15. Third-Party Data Sharing

Customer information may only be shared with third parties where the sharing is authorised, necessary and appropriately governed.

Potential recipients include:

- Hosting and infrastructure providers.
- Database and storage providers.
- Email service providers.
- Communication service providers.
- Delivery providers selected by a store.
- Professional advisers.
- Other authorised service providers.

Before introducing a third-party service, the responsible party must assess:

- The information being shared.
- The purpose of sharing.
- The provider's security controls.
- Applicable contractual requirements.
- Data location and cross-border processing considerations.
- Retention and deletion arrangements.
- Incident notification obligations.
- Access and subcontracting arrangements.

A provider must not receive unrestricted customer data merely because it offers a useful integration.

## 16. Data Access and Correction Requests

Customers must have an appropriate channel to submit requests concerning their personal information.

Requests may include:

- Access to personal information.
- Correction of inaccurate information.
- Deletion where legally permissible.
- Objection to certain processing activities.
- Withdrawal of consent.
- Marketing suppression.
- Other rights available under applicable law.

Requests must be authenticated sufficiently to prevent disclosure or alteration of another person's information.

The responsible party must assess each request against applicable legal obligations, including any requirement to retain transaction, financial or audit records.

A deletion request must not result in the unauthorised removal of records that must lawfully be retained.

## 17. Data Accuracy

Customer information must be reasonably accurate for its intended purpose.

Stores must provide a process for correcting incorrect contact, delivery and order information.

Changes to customer details must not silently rewrite historical transaction records where the original value is necessary for audit or legal purposes.

Where historical values must be preserved, corrections should be recorded with appropriate timestamps and audit history.

## 18. Data Retention

Customer information must be retained according to an approved retention schedule.

Retention periods must consider:

- The purpose for which information was collected.
- Applicable legal and financial obligations.
- Customer support and dispute requirements.
- Contractual obligations.
- Security and investigation requirements.
- The platform's approved data retention policy.

The platform must not retain all customer information indefinitely by default.

When information is no longer required, it must be securely deleted, anonymised or otherwise disposed of through an approved process, subject to applicable retention obligations.

## 19. Security Requirements

Customer information must be protected through appropriate technical and organisational safeguards.

Requirements include:

- Server-side authorisation.
- Store-level data isolation.
- Least-privilege access.
- Secure transmission.
- Protected storage.
- Appropriate secret management.
- Audit logging for sensitive administrative actions.
- Controlled access to customer evidence and attachments.
- Secure backup and recovery.
- Vulnerability management.
- Incident detection and response.

Public storefront APIs must expose only explicitly approved customer-related fields.

Customer contact details, private order information and internal support notes must never be exposed through public catalogue or product endpoints.

## 20. Privacy Incidents

Suspected or confirmed unauthorised access, disclosure, alteration, loss or destruction of customer information must be handled under the platform's incident response procedures.

Personnel must:

1. Report the incident promptly.
2. Preserve relevant evidence.
3. Avoid unauthorised investigation or disclosure.
4. Escalate through the approved incident process.
5. Support containment and impact assessment.
6. Cooperate with legally required notifications and remediation.

The responsible party must determine applicable notification obligations with appropriate legal guidance.

## 21. Development and Testing Requirements

Developers must avoid using real customer personal information in development and test environments unless specifically authorised and protected.

Test data should be synthetic or appropriately anonymised.

Implementation must include tests for:

- Store-level customer data isolation.
- Unauthorised customer record access.
- Public API data exposure.
- Consent recording and withdrawal.
- Marketing suppression.
- Customer data correction.
- Retention and deletion workflows.
- Audit logging.
- Access to customer attachments and evidence.

Frontend visibility controls must not replace backend access enforcement.

## 22. Data Breach and Third-Party Coordination

Contracts and operating procedures with service providers must define responsibilities for handling customer information incidents.

The platform and stores must maintain sufficient information to determine:

- Which provider processed the affected information.
- Which stores and customers may be affected.
- What information was involved.
- When the incident occurred or was discovered.
- Which containment measures were taken.
- Which party is responsible for required notifications.

Third-party involvement does not remove the responsible party's accountability under applicable law.

## 23. Prohibited Practices

The following practices are prohibited:

- Collecting personal information without a defined purpose.
- Sharing customer records between stores without authorisation.
- Using order contact details for unrelated marketing without an appropriate legal basis.
- Exposing private customer information through public APIs.
- Storing sensitive customer evidence in public storage.
- Using customer data for unauthorised profiling.
- Circumventing access controls.
- Keeping customer information indefinitely without justification.
- Deleting or altering records to conceal a complaint, transaction or incident.
- Using real customer information in test environments without approval and safeguards.

## 24. Responsibilities and Accountability

The Platform Owner must maintain platform-wide privacy governance and ensure that platform services support appropriate data protection controls.

Each participating store must ensure that its employees and operating procedures comply with applicable requirements.

Store Admins must manage store-level access, customer requests and operational handling of customer information.

Developers must implement privacy and security requirements in the platform architecture and application code.

Third-party providers must operate within their approved contractual and processing responsibilities.

## 25. Review and Maintenance

This standard must be reviewed when:

- New customer data categories are introduced.
- New storefront collection methods are implemented.
- Customer accounts or profiles are introduced.
- Marketing workflows change.
- New third-party processors are connected.
- Cross-border processing is introduced.
- Applicable privacy law or regulatory guidance changes.
- A privacy incident exposes a control weakness.

Changes must follow the platform's document and change-management procedures.

## 26. Approval

This document remains a draft until formally reviewed and approved by the appropriate platform governance authority.

Approval must confirm consistency with the platform's customer architecture, data governance, security architecture, store operating model and applicable legal advice.
