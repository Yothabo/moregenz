# Product Quality, Safety and Recall Management Policy

## 1. Purpose

This policy establishes how the parent company and participating Store Owners manage product quality, safety concerns, product complaints, supplier warnings and product recalls.

It defines the responsibilities and procedures required to identify unsafe or non-compliant products, prevent further sales, protect customers, coordinate corrective action and maintain accurate records.

The policy applies to products offered through every participating storefront, regardless of whether the product was sourced independently by a Store Owner or through a shared supplier.

## 2. Core Principles

1. Customer safety takes priority over sales and commercial performance.
2. Products must meet applicable legal, regulatory and safety requirements.
3. A product must not remain available for sale when there is a credible unresolved safety risk.
4. Product quality problems must be investigated and documented.
5. Store Owners remain responsible for the products they choose to offer, subject to their legal obligations and contractual arrangements.
6. The parent company coordinates platform-wide controls and shared risk management.
7. A problem affecting one store must be assessed for possible impact on other stores.
8. Product recalls must be traceable to affected products, variants, suppliers and customers where records permit.
9. Customers must receive accurate and timely safety information.
10. No commercial or reputational consideration may justify concealing a material product safety concern.

## 3. Scope

This policy covers:

- Product quality complaints.
- Defective products.
- Unsafe products.
- Counterfeit or suspected counterfeit products.
- Incorrect product specifications.
- Misleading product descriptions.
- Product contamination.
- Labelling and packaging concerns.
- Missing safety information.
- Supplier safety warnings.
- Manufacturer recalls.
- Regulatory recalls.
- Voluntary product withdrawals.
- Customer safety incidents.
- Corrective and preventive actions.

## 4. Roles and Responsibilities

### 4.1 Store Owner

The Store Owner must:

- Offer products that are lawful and suitable for sale.
- Maintain reasonable knowledge of products offered.
- Provide accurate product information.
- Report credible safety concerns immediately.
- Stop promoting or selling affected products when instructed or legally required.
- Cooperate with investigations and recalls.
- Preserve relevant stock, order and supplier records.
- Communicate with affected customers through approved procedures.
- Maintain records of corrective action.

### 4.2 Parent Company

The parent company must:

- Maintain platform-wide product safety controls.
- Coordinate investigations involving multiple stores.
- Issue product restrictions where authorised.
- Coordinate central catalogue restrictions.
- Support customer notifications.
- Maintain incident and recall records.
- Monitor supplier and manufacturer warnings.
- Escalate regulatory or legal matters where necessary.

### 4.3 Product and Catalogue Administration

The responsible team must:

- Identify affected catalogue products and variants.
- Identify store listings linked to affected products.
- Apply appropriate catalogue restrictions.
- Preserve product and listing history.
- Prevent unauthorised reactivation.
- Record the reason and authority for restrictions.

### 4.4 Support and Operations

Support and operations must:

- Receive and classify reports.
- Escalate urgent safety concerns.
- Coordinate customer communication.
- Track affected orders.
- Record customer responses.
- Monitor unresolved cases.

### 4.5 Legal and Compliance Advisers

Where required, qualified advisers should determine applicable legal duties, reporting obligations, recall requirements and customer remedies.

The platform must not substitute internal assumptions for professional legal or regulatory advice.

## 5. Product Risk Classification

The platform should support a risk classification system.

### 5.1 Critical Risk

A credible risk of serious injury, death, significant health consequences or major legal exposure.

Examples may include:

- Products presenting an immediate physical safety hazard.
- Contaminated products.
- Dangerous electrical faults.
- Serious chemical or substance risks.
- Products subject to an urgent regulatory recall.

Required response:

- Immediately restrict affected products from sale.
- Escalate to the parent company.
- Identify affected stores and customers.
- Preserve relevant evidence.
- Follow applicable recall and notification requirements.
- Do not reactivate without documented clearance.

### 5.2 High Risk

A significant product defect or compliance issue that may harm customers or materially mislead them.

Examples may include:

- Material product specification failures.
- Suspected counterfeit products.
- Missing mandatory safety information.
- Repeated serious product defects.

Required response:

- Restrict affected products where appropriate.
- Investigate promptly.
- Notify relevant Store Owners.
- Assess affected orders and customers.
- Document the resolution.

### 5.3 Medium Risk

A quality or accuracy issue that requires correction but does not currently indicate an immediate serious safety threat.

Examples may include:

- Incorrect product descriptions.
- Packaging inconsistencies.
- Repeated minor defects.
- Incorrect product images that could mislead customers.

Required response:

- Record the issue.
- Assess customer impact.
- Correct affected information.
- Consider temporary restrictions where necessary.
- Monitor recurrence.

### 5.4 Low Risk

A minor issue with limited customer or operational impact.

Examples may include:

- Minor cosmetic inconsistencies.
- Non-material presentation errors.
- Isolated low-impact complaints.

Required response:

- Record and correct the issue.
- Monitor for patterns.
- Escalate if the issue becomes recurring or more serious.

Risk classifications are operational guidance. They do not replace statutory definitions or regulatory instructions.

## 6. Product Quality Reporting

A product quality or safety report may originate from:

- A customer.
- A Store Owner.
- A supplier.
- A manufacturer.
- A delivery or fulfilment partner.
- The parent company.
- A regulator.
- A payment or marketplace partner.
- An independent product inspection.

The report must capture:

- Incident reference.
- Product and variant.
- Global catalogue product ID where applicable.
- Store listing ID.
- Store ID.
- Supplier or manufacturer.
- Customer order reference where applicable.
- Description of the issue.
- Date reported.
- Date of occurrence where known.
- Photographs or supporting evidence.
- Injury or damage information where voluntarily and lawfully provided.
- Initial risk classification.
- Assigned investigator.
- Current status.

Urgent safety reports must not wait for routine administrative review.

## 7. Immediate Product Restriction

Where a credible safety or legal concern exists, authorised personnel must be able to restrict affected products.

Possible actions include:

- Disable purchasing.
- Hide the product from storefront discovery.
- Disable affected variants.
- Block new orders through direct product URLs.
- Prevent promotional campaigns.
- Suspend catalogue assignment.
- Notify affected Store Owners.

Restrictions must be enforced server-side.

Hiding a product visually is insufficient if customers can still purchase it through an API or direct checkout request.

The platform must record:

- Product affected.
- Stores affected.
- Restriction reason.
- Risk classification.
- Authorising person.
- Restriction timestamp.
- Supporting evidence.
- Review requirements.

A restriction must not automatically delete the product, order history or customer records.

## 8. Central Catalogue and Cross-Store Impact

Where a product is shared through the central catalogue, a safety concern must trigger an impact assessment across all stores using that catalogue product.

The assessment must identify:

- All active store listings.
- All affected variants.
- Stock held by each store.
- Outstanding purchase orders.
- Orders awaiting fulfilment.
- Completed orders where customer notification may be necessary.
- Relevant supplier relationships.
- Shared campaigns and advertisements.

A restriction may apply to:

- One store listing.
- Selected variants.
- A specific supplier batch or production lot.
- All listings of a catalogue product.
- A supplier or product category where justified.

The scope must be based on the evidence and risk.

An issue affecting one supplier batch must not automatically be treated as proof that every product from every supplier is affected.

## 9. Stock Quarantine

Affected stock must be prevented from being sold while an investigation or recall is active.

The inventory system should support:

- Quarantined stock.
- Restricted stock.
- Returned stock awaiting inspection.
- Recalled stock.
- Rejected stock.
- Stock approved for release.

Quarantined inventory must not count as available-to-sell stock.

The system must preserve:

- Store ID.
- Product and variant.
- Batch or serial reference where available.
- Quantity.
- Storage location.
- Quarantine reason.
- Date restricted.
- Responsible person.
- Final disposition.

Stock must not be released merely because a Store Owner wants to resume sales.

Release requires the appropriate documented authorisation.

## 10. Investigation Procedure

The investigation must establish:

1. What happened?
2. Which product or variants are affected?
3. Which supplier or manufacturer supplied them?
4. Are other batches affected?
5. Which stores hold affected stock?
6. Which customers may have purchased affected products?
7. Is there a safety, legal or consumer protection issue?
8. Is a recall or external notification required?
9. What immediate controls are necessary?
10. What corrective action will prevent recurrence?

Evidence may include:

- Product photographs.
- Customer complaints.
- Supplier correspondence.
- Manufacturer notices.
- Batch and serial information.
- Inspection reports.
- Purchase orders.
- Goods-received records.
- Sales and order records.
- Regulatory correspondence.

Evidence must be preserved and access restricted.

## 11. Product Recall Workflow

A recall may be initiated following:

- A manufacturer recall.
- A supplier recall.
- A regulatory instruction.
- A verified safety investigation.
- A voluntary decision by the responsible business where justified.

The workflow must include:

### Step 1: Confirm Recall Scope

Identify the affected product, variants, batches, serial numbers and relevant dates.

### Step 2: Restrict Sales

Prevent new purchases through every affected storefront and supported sales channel.

### Step 3: Quarantine Inventory

Identify and isolate affected stock across participating stores.

### Step 4: Identify Customers

Use order records to identify customers who purchased affected products.

Only necessary customer information may be accessed for recall purposes.

### Step 5: Notify Customers

Communicate:

- The affected product.
- The nature of the concern.
- Relevant identifying information.
- What the customer should do.
- Whether the product should stop being used.
- Available return, repair, replacement or refund arrangements.
- Contact information for assistance.

Safety instructions must be clear and must follow authoritative manufacturer or regulatory guidance where applicable.

### Step 6: Coordinate Returns or Other Remedies

Record returned products, replacements, refunds and other corrective actions.

### Step 7: Reconcile Recall Results

Record:

- Customers identified.
- Customers successfully contacted.
- Customer responses.
- Products returned.
- Products repaired or replaced.
- Refunds completed.
- Stock quarantined.
- Stock destroyed or otherwise disposed of.
- Outstanding cases.

### Step 8: Close the Recall

A recall may only be closed when the responsible authority determines that required actions have been completed or that remaining actions are appropriately transferred and tracked.

## 12. Customer Communication

Recall and safety communication must be:

- Accurate.
- Direct.
- Timely.
- Understandable.
- Specific to the affected product.
- Clear about required customer action.

The platform should support communication through available lawful channels, including:

- Email.
- Customer account notifications.
- SMS where supported.
- WhatsApp where appropriate and consent permits.
- Direct support contact.

The system must record communication attempts and delivery status where available.

Failure to reach a customer must trigger an appropriate follow-up process.

The parent company and Store Owner must not minimise or conceal a safety concern.

## 13. Customer Remedies

Depending on the circumstances and applicable law, customers may be entitled to:

- Repair.
- Replacement.
- Refund.
- Other statutory remedies.
- Additional support or compensation where legally required or agreed.

The appropriate remedy must be determined according to the product, defect, transaction and applicable legal requirements.

Store policy must not remove mandatory consumer rights.

The platform must link each remedy to the original order and preserve the financial and inventory records.

## 14. Supplier and Manufacturer Coordination

The responsible party must notify the supplier or manufacturer where appropriate.

The communication should request:

- Confirmation of the affected product or batch.
- Description of the issue.
- Relevant safety instructions.
- Required customer action.
- Return or replacement arrangements.
- Credit or reimbursement arrangements.
- Corrective action.
- Written confirmation of resolution.

Supplier responses must be preserved.

Where a supplier refuses to cooperate, the issue must be escalated according to its risk and legal significance.

## 15. Regulatory and Legal Reporting

The parent company and relevant Store Owner must assess whether an incident or recall requires notification to a regulator, industry body or other authority.

The applicable authority depends on the product and circumstances.

Examples may include consumer protection, health, food safety, product standards or sector-specific regulators.

The platform must not assume that one generic regulator handles every product category.

Required reporting deadlines and instructions must be confirmed using authoritative guidance or qualified legal advice.

All external reports and responses must be recorded.

## 16. Marketing and Public Communication

Where a product is subject to a safety restriction or recall:

- Promotional content must be suspended.
- Scheduled advertisements must be reviewed.
- Product claims must be corrected.
- Affected campaign material must be withdrawn or amended.
- Customer-facing safety notices must take priority over promotional messaging.

Public statements must be coordinated with the responsible Store Owner and parent company representatives.

No employee or Store Owner may make unsupported claims about an investigation or recall.

## 17. Product Reinstatement

A restricted product may only be reinstated after:

- The concern has been investigated.
- The affected scope is understood.
- Required corrective action is completed.
- Relevant legal or regulatory requirements are satisfied.
- Supplier or manufacturer clearance is obtained where appropriate.
- Stock is inspected or replaced where necessary.
- The responsible authority approves reinstatement.

The platform must record the reinstatement decision, evidence, authorising person and date.

A product must not be reinstated solely because the original complaint has become inactive.

## 18. Corrective and Preventive Action

After resolving a material issue, the responsible team must identify improvements.

Corrective actions may include:

- Supplier replacement.
- Product specification correction.
- Additional quality inspection.
- Updated receiving procedures.
- Improved product descriptions.
- Better batch tracking.
- Updated customer communication.
- Staff training.
- Revised supplier agreements.
- Additional platform restrictions.

Preventive actions must have an owner, target date and completion record.

## 19. Roles, Permissions and Store Isolation

Store Owners may access safety and recall records relevant to their own stores.

The parent company may access cross-store records where required for platform-wide safety and governance.

The platform must enforce permissions server-side.

Store Owners must not be able to:

- Remove a centrally imposed safety restriction.
- Alter another store's incident records.
- Access another store's private customer records.
- Delete recall history.
- Release quarantined stock without authority.

Emergency restriction permissions must be clearly defined and audited.

## 20. Audit and Record Retention

The platform must preserve:

- Product safety reports.
- Risk assessments.
- Investigation records.
- Product restrictions.
- Quarantine records.
- Recall decisions.
- Customer notifications.
- Return and refund outcomes.
- Supplier correspondence.
- Regulatory communications.
- Reinstatement decisions.
- Corrective and preventive actions.

Each record must include relevant identifiers, responsible actors, timestamps and supporting evidence.

Records must be retained according to applicable legal, regulatory, contractual and operational requirements.

They must not be deleted merely because a product has been removed from a storefront.

## 21. Reporting and Monitoring

The parent company should monitor:

- Open product safety incidents.
- Critical and high-risk cases.
- Products under restriction.
- Active recalls.
- Affected stores.
- Affected customer orders.
- Customer notification progress.
- Outstanding returns and refunds.
- Quarantined inventory.
- Supplier-related incidents.
- Repeat quality problems.
- Corrective action completion.

Store Owners should see the safety and recall information relevant to their own products and responsibilities.

## 22. Error Handling and Recovery

The platform must handle:

- Failed product restrictions.
- Incomplete cross-store impact assessments.
- Missing batch information.
- Duplicate customer notifications.
- Incorrect customer identification.
- Failed recall communications.
- Incomplete stock quarantine.
- Failed inventory adjustments.
- Unauthorised product reinstatement.
- Network interruptions during recall processing.

Critical restrictions must have reliable server-side enforcement and clear failure alerts.

Recall operations must be recoverable without losing records or creating duplicate financial and inventory transactions.

## 23. Testing Requirements

The implementation must test:

1. Critical-risk products can be restricted immediately.
2. Restricted products cannot be purchased through direct API requests.
3. Catalogue restrictions identify affected store listings.
4. Variant-specific restrictions work correctly.
5. Batch-specific restrictions do not unnecessarily affect unrelated batches.
6. Quarantined stock is excluded from available inventory.
7. Affected orders can be identified.
8. Customer notifications are recorded.
9. Failed notifications can be retried safely.
10. Refunds and replacements link to original orders.
11. Recalled stock cannot be released without authority.
12. Store Owners cannot remove central safety restrictions.
13. Cross-store restrictions preserve each store's financial and inventory records.
14. Recall history cannot be deleted by ordinary users.
15. Product reinstatement requires documented approval.
16. Audit records capture all significant actions.
17. Safety restrictions apply across storefronts, APIs and checkout.
18. Failed operations generate actionable alerts.

## 24. Implementation Guidance

Before implementation:

- Review the global catalogue architecture.
- Review store-specific product listings.
- Review inventory and stock quarantine functionality.
- Review supplier and procurement records.
- Review order history and customer communication.
- Review returns and refunds.
- Review Store Owner permissions.
- Identify product categories that require batch, serial, expiry or other traceability.

Do not introduce a duplicate product restriction system if existing catalogue or listing controls can support the required behaviour.

Product traceability requirements must be proportionate to the product category and applicable law.

Any schema changes must include migrations, integrity constraints, appropriate indexes, rollback considerations and automated tests.

## 25. Governing Rule

A product safety concern must be handled according to its actual risk, not its commercial importance.

The parent company and Store Owners must act promptly, preserve evidence, protect customers, coordinate appropriate corrective action and maintain a complete record of every decision.

No product may return to sale until the required safety and compliance conditions have been satisfied.
