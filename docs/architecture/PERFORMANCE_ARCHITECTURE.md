# Performance Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-9262D6A0DB |
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

This document defines the performance architecture for the centrally operated multi-store retail platform.

It establishes how platform and participating store performance is measured, recorded, analysed, reviewed and reported.

The architecture provides a consistent foundation for understanding store performance while recognising that stores may differ in operating history, size, product categories, resources, market conditions and commercial arrangements.

Performance information may support business planning, operational improvements, marketing decisions, resource allocation and management reviews.

Performance assessments must remain explainable, evidence-based and subject to appropriate human judgement.

A performance score or metric must not independently authorise financial assistance, penalties, suspension, changes to store access or other material business interventions.

This document defines architectural requirements. It does not establish final business targets, commission terms, accounting policies or performance thresholds.

## 2. Performance Architecture Objectives

The performance architecture must:

- Provide reliable visibility into platform and individual store performance.
- Establish consistent definitions for performance metrics.
- Distinguish platform-wide results from individual store results.
- Support store-level and platform-level reporting.
- Preserve the context and source of performance information.
- Support comparisons that account for relevant differences between stores.
- Distinguish actual results from targets, estimates and forecasts.
- Support regular performance reviews and documented improvement plans.
- Identify operational strengths, weaknesses, risks and opportunities.
- Support evidence-based business planning and management decisions.
- Protect commercially sensitive and personal information.
- Preserve historical performance records and changes to metric definitions.
- Integrate with relevant commerce, inventory, finance, marketing and customer domains.
- Avoid unnecessary reporting complexity and duplicated sources of truth.

The architecture must make performance information useful for decision-making without presenting incomplete or misleading data as definitive evidence of business performance.

## 3. Performance Architecture Principles

### 3.1 Evidence-Based Measurement

Performance assessments must be based on identifiable data sources and documented calculation rules.

Metrics must not be presented as verified results when their underlying data is incomplete, estimated or unavailable.

### 3.2 Clear Metric Definitions

Every formal performance metric must have a documented definition, calculation method, reporting period, data source and responsible owner.

### 3.3 Contextual Interpretation

Performance must be interpreted in the context of relevant store circumstances.

Comparisons must consider factors such as:

- Store operating history.
- Store size and operating capacity.
- Product categories and product availability.
- Inventory constraints.
- Marketing participation and campaign exposure.
- Agreed operating targets.
- Seasonal and market conditions.
- Store-specific commercial arrangements.

Not every factor will apply to every metric. The relevance of each factor must be documented.

### 3.4 Separation of Measurement and Decision-Making

Performance measurement must remain distinct from business decisions.

A metric, ranking, score or automated report may inform a decision but must not independently exercise business authority.

### 3.5 Consistent Definitions and Fair Comparisons

Shared metrics must use consistent definitions across participating stores.

Where different circumstances make direct comparison misleading, reports must disclose the limitation or use an appropriate comparison group.

### 3.6 Traceability

Performance results must be traceable to their source records, reporting period, calculation method and applicable metric definition.

### 3.7 Store-Level Transparency

Store Admins must be able to understand the performance information made available to them, including the meaning and limitations of relevant metrics.

### 3.8 Data Ownership and Domain Boundaries

The performance domain consumes and analyses information from authoritative business domains.

It must not replace the authority of commerce, inventory, finance, marketing or customer systems over their own records.

### 3.9 Human Oversight

Material business decisions informed by performance assessments must have an identifiable authorised decision-maker.

### 3.10 Historical Consistency

Changes to metric definitions, calculation methods or reporting rules must not silently rewrite historical results.

Where historical results are recalculated, the reason, affected periods and methodology must be recorded.

## 4. Performance Domain Boundaries

### 4.1 Included Responsibilities

The performance domain is responsible for:

- Defining and managing performance metric specifications.
- Collecting authorised performance data from relevant domains.
- Calculating and maintaining performance indicators.
- Organising reporting periods and comparison groups.
- Producing platform and store performance reports.
- Supporting performance reviews.
- Recording performance observations and findings.
- Supporting documented improvement plans.
- Tracking agreed improvement actions.
- Maintaining performance history and calculation versions.
- Providing authorised reporting and analytical access.

### 4.2 Excluded Responsibilities

The performance domain does not independently own or control:

- Order creation, payment processing or fulfilment.
- Product ownership, product identity or catalogue authority.
- Inventory balances and stock movement records.
- Financial transaction creation, posting or settlement.
- Commission calculations and commercial agreements.
- Customer identity, consent or personal information.
- Campaign approval, marketing execution or advertising expenditure.
- Store onboarding, suspension or deactivation authority.
- Employee identity, role assignment or access permissions.
- Legal, tax or accounting policy decisions.

These responsibilities remain within their respective authoritative domains.

### 4.3 Decision Support Boundary

Performance reports may identify concerns, opportunities, unusual activity or potential operational risks.

The performance domain may support recommendations and record management decisions.

It must not automatically:

- Approve or reject financial assistance.
- Advance or deny capital or stock assistance.
- Change commission rates or commercial terms.
- Suspend or deactivate a store.
- Restrict a store's ordinary operational permissions.
- Impose financial penalties.
- Override an authorised Store Admin decision.

Any such action must follow the relevant business authority, approval and governance requirements.

## 5. Performance Operating Model

### 5.1 Platform-Level Performance

The platform must support assessment of overall platform performance.

Platform-level reporting may include:

- Aggregate participating store activity.
- Overall commerce activity.
- Platform revenue and expenses from authoritative financial records.
- Marketing performance.
- Store participation and operating status.
- Inventory-related performance indicators.
- Customer activity and retention indicators.
- Operational support and service performance.
- Growth and participation trends.

Platform reports must distinguish platform-owned financial results from the combined commercial activity of participating stores.

Aggregate store revenue must not be presented as platform revenue.

### 5.2 Store-Level Performance

Each participating store must have an identifiable performance record and reporting context.

Store-level reporting may include:

- Sales and order activity.
- Revenue and financial indicators from authorised financial records.
- Product and category performance.
- Inventory availability and stock movement indicators.
- Fulfilment and order completion performance.
- Customer activity and retention indicators.
- Marketing participation and campaign results.
- Operational activity and agreed targets.
- Improvement actions and review outcomes.

Store reports must preserve the relevant store boundary.

### 5.3 Performance Review Cycle

The platform should support scheduled and ad hoc performance reviews.

A review may include:

1. Selection of the applicable reporting period.
2. Verification of relevant source data.
3. Review of actual results against applicable targets.
4. Interpretation of relevant store circumstances.
5. Identification of strengths, concerns and opportunities.
6. Discussion with the responsible Store Admin where appropriate.
7. Recording of findings and agreed actions.
8. Follow-up on outstanding improvement actions.

Review frequency and required participants remain subject to the operating model and business approval.

### 5.4 Improvement-Oriented Management

Performance management should support sustainable improvement rather than rely solely on rankings or comparisons.

Where concerns are identified, the platform should support documented findings, agreed actions, responsible parties and review dates.

Improvement plans must reflect the circumstances and reasonable operating capacity of the relevant store.

## 6. Performance Actors and Responsibilities

### 6.1 Platform Owner

The Platform Owner is responsible for the overall performance management model.

Responsibilities may include:

- Approving platform-wide performance principles.
- Approving formal metric definitions and reporting standards.
- Reviewing platform-level and store-level performance.
- Authorising performance-related business decisions within delegated authority.
- Reviewing significant performance concerns.
- Approving or overseeing improvement initiatives.
- Ensuring that performance practices remain consistent with approved business arrangements.

### 6.2 Platform Super Admin

The Platform Super Admin may administer authorised performance functionality within the platform.

Responsibilities may include:

- Managing approved performance configuration.
- Accessing authorised platform-wide reports.
- Supporting performance reporting and reviews.
- Maintaining metric configuration where delegated.
- Recording authorised administrative actions.

Technical administrative access does not automatically grant authority to make commercial, financial or disciplinary decisions.

### 6.3 Store Admin

Each Store Admin is responsible for the ordinary management of their store's performance.

Responsibilities may include:

- Reviewing store performance reports.
- Verifying relevant operational information.
- Managing store-level improvement activities.
- Providing context for unusual results.
- Reviewing agreed targets and outcomes.
- Coordinating appropriate operational changes.
- Participating in platform performance reviews where required.

Store Admins must not modify authoritative platform-wide metric definitions or other stores' performance records without explicit authority.

### 6.4 Store Employees

Employees may contribute to performance-related operational activities according to their assigned responsibilities.

Their access to performance information must be limited to the information necessary for their authorised duties.

### 6.5 Performance Review Participants

The platform may involve authorised participants in formal performance reviews.

Their responsibilities, access and decision-making authority must be established before participation.

Attendance at a review does not automatically grant authority to approve financial, commercial or access-control changes.

## 7. Performance Ownership and Scope

### 7.1 Platform Performance Ownership

Platform performance records must identify the platform as their reporting context.

They must not combine store-owned financial records with platform financial records in a way that obscures ownership.

### 7.2 Store Performance Ownership

Store performance records must identify the relevant store.

Store-level metrics must remain associated with the correct store, reporting period and source context.

### 7.3 Shared Platform Services

Where a platform service supports multiple stores, its performance may be measured at both platform and store levels where meaningful.

Shared service costs and commercial results must follow the ownership and allocation rules defined by the Finance Architecture.

### 7.4 Source Data Ownership

The performance domain must reference authoritative source data rather than create competing business records.

For example:

- Commerce remains authoritative for orders and order events.
- Inventory remains authoritative for stock balances and movements.
- Finance remains authoritative for financial records and settlements.
- Marketing remains authoritative for campaign configuration and participation.
- Customer remains authoritative for customer records and privacy preferences.

Performance calculations must preserve references to their source data.

### 7.5 Historical Ownership

Performance records must retain their original store or platform context.

A store ownership change, administrative change or store lifecycle event must not silently transfer or rewrite historical performance results.

## 8. Performance Dimensions and Measurement Categories

### 8.1 Commercial Performance

Commercial performance describes business activity and outcomes associated with products, orders and sales.

Possible indicators include:

- Order volume.
- Completed orders.
- Cancelled orders.
- Sales value.
- Average order value.
- Product and category sales.
- Sales trends over time.
- Conversion indicators where reliable data is available.

Sales activity must be distinguished from recognised revenue and settled funds.

### 8.2 Financial Performance

Financial performance uses authorised financial records to assess relevant financial outcomes.

Possible indicators include:

- Revenue.
- Expenses.
- Gross margin where the required cost data exists.
- Outstanding receivables and payables.
- Settlement completion.
- Financial obligations.
- Cash-flow indicators where supported by reliable records.

Financial metrics must follow the Finance Architecture and must not be independently reconstructed using incomplete order or payment data.

### 8.3 Inventory Performance

Inventory performance describes stock availability, movement and management.

Possible indicators include:

- Stock availability.
- Stock-out frequency.
- Stock movement.
- Inventory turnover where reliable valuation and movement data exist.
- Damaged or quarantined stock.
- Stock adjustment frequency.
- Fulfilment impact associated with inventory availability.

Inventory indicators must respect store-level stock ownership and product variant boundaries.

### 8.4 Fulfilment and Operational Performance

Operational performance describes the execution of store activities.

Possible indicators include:

- Order processing time.
- Fulfilment completion.
- Dispatch performance.
- Delayed orders.
- Cancellation reasons.
- Operational exceptions.
- Resolution times for relevant operational issues.

Operational metrics must use documented event definitions and consistent measurement periods.

### 8.5 Customer Performance

Customer-related indicators may include:

- New customer activity.
- Returning customer activity.
- Repeat purchase rate.
- Customer retention.
- Customer complaints and service issues.
- Customer satisfaction information where collected through an approved method.

Customer metrics must respect customer privacy, consent and access restrictions.

### 8.6 Marketing Performance

Marketing indicators may include:

- Campaign participation.
- Campaign reach and engagement.
- Attributed traffic.
- Attributed orders.
- Campaign conversion indicators.
- Campaign expenditure and return measures where reliable financial attribution exists.

Marketing attribution must not be presented as proof of financial revenue without reconciliation against authoritative financial records.

### 8.7 Growth and Development Performance

Growth indicators may describe changes in store activity and operating capacity.

Possible measures include:

- Sales growth.
- Customer growth.
- Product range development.
- Store participation in platform initiatives.
- Operational improvement progress.
- Achievement of agreed development targets.

Growth must be interpreted against the store's operating history, available resources and relevant market conditions.

### 8.8 Data Quality and Reporting Completeness

The platform should measure the quality and completeness of the information used in performance reporting.

Indicators may include:

- Missing source records.
- Delayed data updates.
- Unreconciled information.
- Incomplete reporting periods.
- Data validation failures.
- Unavailable metric inputs.

Data quality indicators must be visible where they materially affect the interpretation of performance results.

### 8.9 Targets and Benchmarks

Targets and benchmarks may be established for selected metrics.

Each approved target should identify:

- The responsible store or platform context.
- The metric being measured.
- The target value or range.
- The applicable reporting period.
- The effective date.
- The approval basis.
- The responsible owner.

Targets must not be assumed to apply equally to every store.

Benchmark definitions, comparison groups and approval requirements will be specified in the subsequent sections of this architecture.


## 9. Metric Definition and Governance

### 9.1 Metric Specifications

Every formal performance metric must have an identifiable specification.

A metric specification should define:

- Metric name and unique identifier.
- Business purpose and intended interpretation.
- Metric category.
- Calculation method.
- Required source data.
- Reporting frequency.
- Applicable reporting period.
- Measurement unit and currency where relevant.
- Applicable platform or store scope.
- Inclusion and exclusion rules.
- Known limitations and dependencies.
- Responsible metric owner.
- Approval status and effective date.

Metric specifications must be sufficiently precise for independent implementation and verification.

### 9.2 Metric Ownership

Every formal metric must have an identifiable owner responsible for its definition and continued suitability.

The Platform Owner approves platform-wide metric standards and material changes to the performance model.

Metric administration may be delegated to authorised personnel without transferring overall business approval authority.

Store Admins may provide feedback on store-specific metric suitability and interpretation.

### 9.3 Metric Categories

Metrics should distinguish:

- Activity metrics, which measure events or business activity.
- Outcome metrics, which measure achieved results.
- Efficiency metrics, which relate results to resources or time.
- Quality metrics, which assess service or operational standards.
- Financial metrics, which describe authorised financial outcomes.
- Development metrics, which measure progress against agreed objectives.
- Data quality metrics, which describe the reliability and completeness of measurement.

A metric must not be interpreted outside the purpose for which it was defined.

### 9.4 Metric Approval and Changes

Formal metrics must be approved before being used for official performance assessment.

Changes to metric definitions, calculations, source data or inclusion rules must be documented and approved by the appropriate authority.

A material change must identify:

- The previous definition.
- The proposed definition.
- The reason for the change.
- The affected reporting periods.
- The expected effect on historical and future results.
- The approval and effective dates.

Changes must not silently alter published historical results.

### 9.5 Metric Deprecation

A metric may be retired when it becomes unreliable, irrelevant, duplicated or unsuitable for its original purpose.

Retirement must preserve historical results and the metric specification used to produce them.

Replacement metrics must have their own definitions and effective dates.

## 10. Performance Data and Calculation Architecture

### 10.1 Authoritative Data Sources

Performance calculations must obtain information from the relevant authoritative business domains.

Examples include:

- Commerce for orders, order items and transaction events.
- Finance for revenue, expenses, settlements and financial obligations.
- Inventory for stock balances, movements and availability.
- Marketing for campaigns, participation and campaign activity.
- Customer for authorised customer activity and retention information.
- Store operations for store status, operating dates and relevant operational events.

The performance domain must not create competing authoritative records for these business activities.

### 10.2 Data Collection and Synchronisation

The architecture should support controlled collection of performance information from internal modules and approved external services.

Data collection may use:

- Defined application interfaces.
- Scheduled data extraction.
- Approved event-driven processing.
- Aggregated reporting datasets.
- Other approved integration mechanisms.

Collection frequency must reflect the operational importance and update characteristics of the source information.

The architecture must identify the last successful data update and expose relevant processing failures.

### 10.3 Data Validation

Performance data must be validated before it is used in formal reporting.

Validation may include:

- Required field checks.
- Store and platform ownership checks.
- Reporting period validation.
- Duplicate event detection.
- Currency and measurement unit consistency.
- Source record existence.
- Data completeness checks.
- Calculation input validation.

Invalid or incomplete records must not silently produce misleading performance results.

### 10.4 Calculation Consistency

A metric must use the approved calculation method for its applicable effective period.

Calculations must handle:

- Missing values.
- Zero denominators.
- Duplicate source events.
- Cancelled or reversed transactions.
- Partial reporting periods.
- Currency differences.
- Time zone boundaries.
- Rounding rules.
- Late-arriving source records.

Where a calculation cannot produce a reliable result, the system must identify the result as unavailable, incomplete or otherwise appropriately qualified.

### 10.5 Reporting Periods

Performance reporting must support defined reporting periods.

Possible periods include:

- Daily.
- Weekly.
- Monthly.
- Quarterly.
- Annually.
- Custom business-defined periods.

Reporting period definitions must be consistent within the applicable reporting context.

The architecture must distinguish calendar periods from financial accounting periods where their boundaries or purposes differ.

### 10.6 Late and Corrected Data

Source records may arrive late or be corrected after a performance report has been generated.

The architecture must support controlled recalculation where required.

Recalculation must preserve the original report version, affected source records, calculation version, reason for recalculation and publication history.

Previously published reports must not be silently replaced.

### 10.7 Performance Data Freshness

Performance reports must communicate the freshness of their underlying data where it affects interpretation.

Users must be able to distinguish current results from delayed or stale reporting information.

A report must not imply real-time accuracy when its source data is updated periodically.

### 10.8 Currency and Measurement Consistency

Financial metrics must preserve their original currency and use approved conversion rules where consolidated reporting requires conversion.

Exchange rates, conversion dates, rounding and reporting currency must be identifiable.

Non-financial metrics must use consistent measurement units and definitions.

The architecture must not introduce undocumented currency conversion or measurement assumptions.

## 11. Store Benchmarking and Comparative Analysis

### 11.1 Benchmarking Objectives

Benchmarking should help the platform and participating stores understand relative performance, identify opportunities and evaluate progress.

Comparisons must provide useful business context rather than create misleading rankings.

### 11.2 Comparable Store Groups

The platform should support comparison groups based on relevant characteristics.

Possible comparison factors include:

- Operating history.
- Store size and capacity.
- Product categories.
- Business model and operating arrangements.
- Product availability.
- Geographic or market context where relevant.
- Marketing participation.
- Reporting period.
- Agreed commercial objectives.

Comparison groups must use documented eligibility and inclusion rules.

### 11.3 Operating History

Newly activated stores must not be treated as equivalent to established stores without considering the difference in operating history.

Reports should distinguish:

- Newly activated stores.
- Stores in an initial operating period.
- Established stores.
- Stores with interrupted operations.
- Stores with incomplete reporting history.

The platform must not interpret limited historical data as evidence of poor performance.

### 11.4 Store Size and Operating Capacity

Where store size or operating capacity materially affects a metric, comparisons should account for the relevant difference.

Absolute sales values may be useful for understanding commercial scale but may be unsuitable as the sole measure of operational effectiveness.

Where appropriate, reports may include normalised measures such as activity per operating day, per available product or per relevant unit of capacity.

The chosen normalisation method must be documented and appropriate to the metric.

### 11.5 Product Category Differences

Different product categories may have different pricing structures, purchase patterns, margins, demand and stock requirements.

Comparisons must not assume that all stores operate under equivalent product conditions.

Category-specific reporting or appropriately defined comparison groups should be used where necessary.

### 11.6 Inventory and Availability Context

Performance analysis must account for relevant inventory constraints.

Examples include:

- Stock-outs.
- Delayed stock replenishment.
- Product unavailability.
- Damaged or quarantined inventory.
- Supplier-related delays.
- Store-specific inventory limitations.

A store must not automatically be assessed as commercially underperforming when relevant product availability constraints materially affected its ability to trade.

### 11.7 Marketing Exposure

Marketing exposure must be considered when interpreting customer acquisition, traffic, engagement and attributed sales.

Reports should distinguish stores that participated in campaigns from stores that did not participate.

Campaign reach, duration, audience, expenditure and participation conditions may affect the suitability of comparisons.

### 11.8 Benchmark Limitations

Where reliable comparison data is insufficient, the platform must disclose the limitation.

It must not create artificial benchmark values or present an unsuitable comparison group as equivalent.

Benchmarking must not expose another store's commercially sensitive information beyond the access permitted by the platform's governance rules.

## 12. Performance Targets and Objectives

### 12.1 Target Definition

A performance target represents an approved expected result or development objective for a defined metric and period.

Targets must be distinguishable from historical results, forecasts, estimates and benchmarks.

### 12.2 Target Scope

Targets may be established at:

- Platform level.
- Individual store level.
- Store group level where justified.
- Operational or functional level.
- Campaign or business initiative level.

The applicable scope must be explicit.

### 12.3 Target Specification

An approved target should record:

- Target identifier.
- Metric reference.
- Responsible platform or store.
- Target value or range.
- Measurement unit.
- Reporting period.
- Effective start and end dates.
- Approval authority.
- Supporting business rationale.
- Applicable conditions and assumptions.
- Review status.

### 12.4 Target Approval

Targets must be approved by the authority responsible for the relevant business objective.

Store-specific targets must account for the relevant store's circumstances and agreed operating arrangements.

A platform-wide target must not automatically become a binding individual store obligation.

### 12.5 Target Changes

Targets may be revised when material business circumstances change.

A revision must preserve the original target, approval details, effective dates and reason for the change.

A target must not be retrospectively changed merely to make an existing performance result appear successful or unsuccessful.

### 12.6 Target Achievement

Target reporting should distinguish:

- Achieved.
- Partially achieved.
- Not achieved.
- In progress.
- Not applicable.
- Unable to assess.

The system must not classify a target as achieved when the required measurement data is incomplete or unreliable.

### 12.7 Target Interpretation

Target achievement must be interpreted alongside relevant operating conditions.

Failure to achieve a target does not independently establish negligence, misconduct or a breach of a commercial agreement.

Any formal consequence must follow the applicable agreement and authorised business process.

## 13. Performance Scoring and Evaluation

### 13.1 Scoring Objectives

Performance scoring may be used to summarise selected performance indicators.

A score must provide additional analytical value without concealing the underlying measurements or their limitations.

### 13.2 Metric Selection

Only approved and relevant metrics may contribute to a formal performance score.

The metric selection process must document:

- Why each metric is included.
- Its business relevance.
- Its calculation method.
- Its reporting period.
- Its contribution to the overall assessment.
- Any known limitations.

Metrics must not be included merely because their data is readily available.

### 13.3 Weighting and Normalisation

Where a combined score uses weighted metrics, the weighting method must be documented and approved.

Normalisation must account for relevant differences in scale, operating conditions and metric ranges.

The system must not apply arbitrary weights or undisclosed adjustments.

### 13.4 Score Transparency

Users must be able to understand:

- Which metrics contribute to a score.
- How each metric is calculated.
- Applicable weighting.
- The reporting period.
- Missing or excluded data.
- Relevant limitations.
- The metric and scoring definition version.

A score must not be presented as an objective measure of overall business quality without appropriate qualification.

### 13.5 Missing and Unreliable Data

Missing, delayed or unreliable data must not automatically be interpreted as zero performance.

The architecture must support incomplete or unavailable score states where the required inputs cannot be established reliably.

The system must disclose material missing inputs and their effect on the score.

### 13.6 Performance Categories

Where the platform uses performance categories or bands, their definitions and thresholds must be formally approved.

Categories must have a documented interpretation and must not imply consequences that have not been authorised.

### 13.7 No Automatic Business Decisions

Performance scores and categories are decision-support information only.

They must not automatically approve or reject financial assistance, alter commercial terms, impose penalties, restrict access or suspend stores.

Material decisions must follow the applicable authority and approval requirements.

### 13.8 Historical Scoring

Historical scores must retain the metric definitions, weighting rules, source data references and calculation versions applicable when they were generated.

Where a revised scoring model is applied to historical data, the recalculated result must be clearly distinguished from the original published result.

## 14. Performance Reviews and Assessment

### 14.1 Review Objectives

Performance reviews provide a structured process for interpreting performance information and agreeing appropriate business actions.

They should identify:

- Positive performance and progress.
- Areas requiring improvement.
- Operational constraints.
- Risks and unresolved issues.
- Opportunities for development.
- Progress against previous commitments.
- Support requirements.

### 14.2 Review Types

The platform should support:

- Scheduled store performance reviews.
- Platform-wide performance reviews.
- Operational reviews.
- Financial performance reviews.
- Marketing performance reviews.
- Improvement plan reviews.
- Ad hoc reviews following significant business events.

The review type must identify its purpose and applicable authority.

### 14.3 Review Participants

Each formal review must identify the relevant participants and their roles.

Participation must respect platform and store access boundaries.

Sensitive information must only be shared with authorised participants.

### 14.4 Review Records

A formal performance review should retain:

- Review identifier.
- Relevant store or platform.
- Review type.
- Reporting period.
- Participants.
- Source reports and metric versions.
- Findings and observations.
- Store-provided context.
- Agreed decisions.
- Assigned actions.
- Responsible parties.
- Review date and follow-up date.
- Approval or acknowledgement status where applicable.

### 14.5 Store Context and Response

Store Admins must have an appropriate opportunity to provide context for material performance findings.

Relevant explanations, operational constraints and disputed information should be recorded alongside the review.

A review must distinguish verified facts from observations, opinions and proposed explanations.

### 14.6 Review Outcomes

Review outcomes may include:

- No further action required.
- Continue monitoring.
- Agreed operational improvement.
- Additional training or support.
- Marketing or commercial review.
- Inventory or supply review.
- Further investigation.
- Escalation to an authorised decision-maker.

Review outcomes must not exceed the authority of the participants.

### 14.7 Disputed Findings

The architecture should support a process for challenging or correcting inaccurate performance information.

Disputed findings must be recorded with their supporting context and resolution status.

Corrections to source records must be made through the relevant authoritative domain.

### 14.8 Review Closure

A review may be closed when its required findings, decisions and actions have been recorded.

Outstanding actions must remain traceable after the review is closed.

Closing a review must not imply that every assigned action has been completed.

## 15. Performance Improvement Plans

### 15.1 Improvement Plan Objectives

An improvement plan records agreed activities intended to address identified performance concerns or support business development.

Plans should focus on practical, measurable and appropriately scoped improvements.

### 15.2 Plan Specification

An improvement plan should identify:

- Plan identifier.
- Responsible store or platform.
- Originating review or assessment.
- Identified improvement areas.
- Agreed objectives.
- Actions and expected outcomes.
- Responsible individuals or roles.
- Required resources or support.
- Start date and target completion dates.
- Review milestones.
- Approval status.
- Completion evidence.

### 15.3 Action Ownership

Every improvement action must have an identifiable responsible party.

Responsibilities must remain within the authority and operational control of the assigned person or organisation.

Actions requiring platform approval must not be treated as approved merely because they appear in a plan.

### 15.4 Support and Dependencies

An improvement plan may depend on platform support, supplier activity, inventory availability, marketing participation or other external factors.

Dependencies must be recorded where they materially affect completion.

The architecture must distinguish store-controlled actions from actions requiring platform or third-party support.

### 15.5 Progress Tracking

Improvement plans should support progress states such as:

- Proposed.
- Awaiting approval.
- Approved.
- In progress.
- Blocked.
- Completed.
- Cancelled.
- Closed.

Status changes must be traceable to the responsible actor and recorded reason.

### 15.6 Plan Review and Revision

Plans may be revised when circumstances or agreed objectives change.

Changes must preserve the original objectives, previous actions, approvals and reasons for revision.

A plan must not silently replace earlier commitments.

### 15.7 Plan Completion

Completion must be supported by appropriate evidence or review.

The system should distinguish completed actions from actions that were cancelled, deferred or made unnecessary.

Completion of a plan does not automatically establish that the expected business outcome was achieved.

### 15.8 Financial and Operational Boundaries

Improvement plans may identify funding, stock assistance, additional resources or operational changes as potential requirements.

The plan itself does not authorise expenditure, capital advances, stock transfers, commission changes or other financial commitments.

Such activities must follow the relevant architecture and approval process.

## 16. Performance Reporting and Dashboards

### 16.1 Reporting Objectives

Performance reporting must present relevant information clearly and accurately for authorised users.

Reports should support operational understanding, business reviews, planning and decision-making.

### 16.2 Platform Dashboard

The platform dashboard may present:

- Aggregate store activity.
- Store participation and lifecycle status.
- Platform performance trends.
- Relevant financial indicators.
- Marketing performance.
- Operational performance.
- Outstanding reviews and improvement actions.
- Data freshness and reporting completeness.

Platform reporting must distinguish aggregate store activity from platform-owned financial results.

### 16.3 Store Dashboard

Each store dashboard should present the relevant store's authorised performance information.

It may include:

- Sales and order trends.
- Financial performance indicators.
- Product and category performance.
- Inventory availability.
- Fulfilment performance.
- Customer activity.
- Marketing participation.
- Target progress.
- Review outcomes.
- Improvement plan progress.

Store dashboards must not expose another store's restricted information.

### 16.4 Reporting Filters

Authorised users should be able to filter reports by relevant dimensions, including:

- Reporting period.
- Store.
- Product category.
- Metric category.
- Campaign.
- Target.
- Review status.
- Improvement plan status.

Filters must not bypass backend authorisation or data ownership boundaries.

### 16.5 Historical Reporting

Reports should support historical trend analysis using the definitions applicable to each reporting period.

Where metric definitions or calculation methods have changed, the report must identify the relevant version or disclose the limitation.

### 16.6 Export and Distribution

The architecture should support authorised export and distribution of performance reports.

Exports must preserve relevant store context, reporting periods, metric definitions and data freshness information.

Sensitive commercial and personal information must remain subject to the applicable access and privacy controls.

### 16.7 Report Accuracy and Limitations

Reports must distinguish verified results, estimates, forecasts and incomplete information.

Where a metric cannot be reliably calculated, the report must disclose the limitation rather than display an invented or misleading value.

### 16.8 Reporting Access

Access to reports must be determined by the user's effective platform or store permissions.

Platform-wide reporting access must be restricted to appropriately authorised personnel.

Store Admins must receive access to their own store's reports and any additional information explicitly authorised by the platform governance model.

### 16.9 Report Reproducibility

Formal reports should retain sufficient references to reproduce their calculations.

This includes the reporting period, metric definitions, calculation versions, relevant source references and generation timestamp.

Reproducing a report must not silently change the original published result.


## 17. Performance Data Security and Access Control

### 17.1 Security Objectives

Performance information may contain commercially sensitive business information and data derived from customer, employee, financial and operational records.

The architecture must protect performance information against unauthorised access, modification, disclosure and extraction.

Security controls must apply to dashboards, reports, exports, APIs, background processing and stored performance datasets.

### 17.2 Platform-Level Access

Platform-wide performance information must be restricted to appropriately authorised platform personnel.

Access must reflect the user's effective permissions and business responsibilities.

Technical access to platform administration must not automatically grant unrestricted authority over commercial or financial decisions.

### 17.3 Store-Level Access

Store Admins must be restricted to performance information belonging to their authorised store context.

Store employees may receive access to selected performance information where required for their assigned responsibilities.

A client-supplied store identifier must not independently establish access.

### 17.4 Cross-Store Reporting

Cross-store reporting must follow explicitly authorised platform reporting rules.

Aggregate reporting should disclose only the information necessary for its intended purpose.

The architecture must prevent unauthorised access to another store's confidential sales, margins, expenses, customer information, operational records or commercial arrangements.

Where aggregate reporting could reveal an individual store's sensitive information, appropriate restrictions or aggregation controls must apply.

### 17.5 Customer-Derived Performance Information

Customer-related performance metrics must respect customer privacy and consent requirements.

Reports should use aggregated or appropriately minimised information wherever individual customer identification is unnecessary.

Customer contact information and detailed customer records must not be exposed through general performance dashboards.

### 17.6 Employee-Related Information

Employee performance-related information must be handled according to its purpose, sensitivity and applicable access rules.

Store-level operational metrics must not automatically become individual employee assessments.

Where employee-related assessments are introduced, their purpose, authority, access, data sources and applicable governance requirements must be separately established.

### 17.7 API and Backend Enforcement

Performance access must be enforced by the backend.

The backend must verify:

- Authenticated user identity.
- Account status.
- Effective platform permissions.
- Active store membership where applicable.
- Requested reporting scope.
- Authorised access to source information.
- Applicable export and administrative permissions.

Frontend visibility restrictions must not replace backend authorisation.

### 17.8 Export Protection

Performance exports must be subject to the same ownership and access restrictions as the reports from which they originate.

The architecture should support:

- Authorised export permissions.
- Restricted export scopes.
- Export activity logging.
- Appropriate handling of sensitive files.
- Expiration or controlled availability where required.
- Protection against unauthorised bulk extraction.

### 17.9 Access Revocation

Changes to account status, store membership or effective permissions must be reflected in performance access.

Revoked permissions must prevent continued access through previously issued sessions or stale authorisation data in accordance with the approved identity and access architecture.

## 18. Performance Audit and Accountability

### 18.1 Audit Objectives

The performance domain must maintain sufficient records to establish how performance information was generated, changed, reviewed and used.

Auditability must support accountability, investigation, historical verification and authorised business reviews.

### 18.2 Auditable Activities

The architecture should record material actions, including:

- Metric creation and modification.
- Metric approval and retirement.
- Changes to calculation rules.
- Target creation and revision.
- Benchmark configuration changes.
- Performance score generation and recalculation.
- Report generation and publication.
- Authorised report exports.
- Performance review creation and modification.
- Review findings and decisions.
- Improvement plan creation and revision.
- Changes to assigned actions and responsibilities.
- Administrative access to sensitive performance information.

### 18.3 Audit Record Contents

Audit records should contain, where applicable:

- Unique audit event identifier.
- Actor identity.
- Actor's relevant authority or role.
- Action performed.
- Affected record and record identifier.
- Relevant platform or store context.
- Event timestamp.
- Previous and resulting values where appropriate.
- Reason or supporting explanation.
- Approval reference where applicable.
- Related request or transaction reference.

Audit timestamps must use a consistent and documented time standard.

### 18.4 Historical Preservation

Published performance reports, approved metric definitions, targets, review records and improvement plan histories must remain traceable.

Material changes must preserve their previous state or sufficient historical information to establish what changed.

Audit history must not be silently overwritten through ordinary application operations.

### 18.5 Recalculation Accountability

Performance recalculation must record:

- The reason for recalculation.
- The affected reporting periods.
- Source data changes.
- Metric definition and calculation versions.
- The initiating actor or process.
- The resulting report version.
- Publication or approval status.

Recalculation must not erase the history of previously published results.

### 18.6 Audit Access

Access to audit records must be restricted to appropriately authorised users.

Audit information may contain sensitive business and personal data and must follow applicable access and retention controls.

### 18.7 Decision Accountability

Material business decisions informed by performance reports should retain their decision basis, responsible authority and relevant supporting information.

A performance score alone must not be treated as sufficient evidence of an authorised business decision.

## 19. Performance Integrations and External Services

### 19.1 Internal Domain Integrations

The performance domain must integrate with authoritative internal business domains through defined application interfaces.

Relevant integrations include:

- Commerce.
- Finance.
- Inventory.
- Marketing.
- Customer.
- Store management.
- Identity and access.
- Activity and audit.

Integration contracts must define the required data, ownership context, update behaviour and error handling.

### 19.2 External Analytics Services

The platform may use approved external analytics or reporting services where they provide a justified business benefit.

External services must not become competing authorities for platform or store business records.

Information shared externally must comply with approved security, privacy and data governance requirements.

### 19.3 Data Attribution

Imported performance information must retain sufficient source references to establish its origin.

External analytics results must be distinguishable from internally verified business transactions.

Attribution information must not be interpreted as authoritative financial evidence without the required verification.

### 19.4 Integration Failures

Failed integrations must be identifiable and recoverable.

The architecture should record:

- Source system.
- Affected data or reporting period.
- Failure details.
- Last successful processing point.
- Retry or recovery status.
- Resulting data completeness limitations.

Integration failures must not silently produce complete-looking performance reports from incomplete information.

### 19.5 External Data Governance

External data providers and analytics services must be assessed for data ownership, security, privacy, reliability and contractual requirements.

External processing must follow approved data-sharing and retention arrangements.

## 20. Performance Reliability and Background Processing

### 20.1 Reliability Objectives

Performance calculations and reporting must operate consistently without compromising authoritative business transactions.

Performance processing should not introduce unnecessary load or operational risk into commerce, inventory, finance or other critical domains.

### 20.2 Background Processing

The architecture should support background processing for:

- Scheduled metric calculations.
- Reporting aggregation.
- Data synchronisation.
- Benchmark generation.
- Target progress evaluation.
- Performance score generation.
- Report preparation.
- Historical recalculation.
- Data quality checks.

Processing schedules must be configurable according to business and operational requirements.

### 20.3 Idempotency and Duplicate Prevention

Repeated processing of the same source events must not silently duplicate performance records or inflate calculated results.

Background jobs must support safe retries and identifiable processing outcomes.

Where appropriate, source event identifiers, processing references and reporting period boundaries must be used to prevent duplicate aggregation.

### 20.4 Processing Failure Recovery

The system must identify incomplete or failed processing operations.

Recovery must resume from an appropriate verified point without silently discarding previously processed information.

The architecture should retain sufficient processing history to investigate calculation failures and reconcile affected reports.

### 20.5 Data Consistency

Performance information may be updated asynchronously after an authoritative business event.

The architecture must make relevant processing delays visible.

A performance report must distinguish the latest successfully processed information from data awaiting processing.

### 20.6 Concurrency Control

Concurrent processing must not create duplicate, conflicting or inconsistent performance results.

Where multiple jobs affect the same metric and reporting period, appropriate concurrency controls must apply.

### 20.7 Monitoring and Alerting

Operational monitoring should identify:

- Failed metric calculations.
- Delayed reporting updates.
- Stale performance datasets.
- Repeated processing failures.
- Unexpected changes in data volume.
- Incomplete reporting periods.
- Failed integrations.
- Unusual calculation discrepancies.

Alerts must be directed to the responsible operational roles.

### 20.8 Performance Domain Isolation

Performance processing should use appropriately controlled read access or reporting datasets.

Heavy analytical operations must not unnecessarily interfere with critical transactional workloads.

The architecture should allow reporting capacity to evolve independently where justified.

## 21. Performance Testing Architecture

### 21.1 Testing Objectives

Testing must establish that performance metrics, comparisons, scoring and reports are accurate, consistent, secure and reproducible.

Testing must cover normal conditions, incomplete information, exceptional cases and unauthorised operations.

### 21.2 Metric Calculation Testing

Every formal metric must have tests covering:

- Expected calculation results.
- Boundary values.
- Zero values and zero denominators.
- Missing source data.
- Duplicate source events.
- Cancelled and reversed transactions.
- Partial reporting periods.
- Currency handling.
- Time zone boundaries.
- Rounding behaviour.
- Late-arriving and corrected records.

### 21.3 Benchmarking Testing

Benchmarking tests must verify that comparison groups follow approved eligibility rules.

Tests should include differences in operating history, store size, product categories, inventory availability and marketing exposure.

The system must not silently compare stores using incompatible measurement conditions.

### 21.4 Scoring Testing

Scoring tests must verify:

- Approved metric selection.
- Weighting calculations.
- Normalisation rules.
- Missing input handling.
- Incomplete score states.
- Metric definition versioning.
- Historical score preservation.
- Score interpretation and category boundaries.

Tests must confirm that scoring does not trigger unauthorised financial or operational decisions.

### 21.5 Authorisation and Isolation Testing

Tests must verify both permitted and denied operations.

Critical scenarios include:

- Store Admin access to their own reports.
- Attempts to access another store's restricted reports.
- Platform-wide reporting permissions.
- Unauthorised report exports.
- Access after store membership revocation.
- Access after account suspension.
- Restricted access to customer-derived information.
- Restricted access to employee-related information.

Backend enforcement must be tested independently of frontend visibility.

### 21.6 Reporting and Reproducibility Testing

Reports must be tested against known source datasets and expected calculation results.

Testing must verify that historical reports can be reproduced using their original metric definitions and calculation versions.

Recalculated reports must remain distinguishable from previously published versions.

### 21.7 Background Processing Testing

Tests must cover:

- Successful scheduled execution.
- Retry behaviour.
- Duplicate event prevention.
- Partial processing failures.
- Concurrent execution.
- Recovery after interruption.
- Late source data.
- Reprocessing of affected reporting periods.

### 21.8 Integration Testing

Integration tests must verify data ownership, interface contracts, source references, failure handling and recovery across relevant business domains.

Performance processing must not modify authoritative source records without an explicitly authorised business operation.

### 21.9 Migration Testing

Migration tests must verify historical performance information, source references, metric definitions and reporting continuity.

Existing Yotaabo reporting functionality must remain operational until its replacement has been verified and authorised for cutover.

### 21.10 Production Readiness

Before performance functionality is released into production, the relevant critical calculations, reporting permissions, data isolation, recovery mechanisms and operational monitoring must be verified.

A successful build alone does not establish that performance information is accurate or safe for business decisions.

## 22. Migration from the Existing Yotaabo Application

### 22.1 Migration Objectives

Performance architecture migration must preserve the accuracy and availability of existing Yotaabo operational reporting.

Migration must be incremental and must not unnecessarily disrupt existing storefront or administrative functionality.

### 22.2 Existing Reporting Assessment

Before migration, existing reporting functionality and data sources must be identified.

The assessment should include:

- Existing dashboard metrics.
- Existing report calculations.
- Existing source tables and records.
- Existing reporting filters.
- Existing administrative permissions.
- Existing scheduled calculations.
- Existing external analytics integrations.
- Existing historical reporting requirements.

Existing behaviour must be documented before replacement.

### 22.3 Metric Mapping

Existing metrics must be mapped to the approved performance metric definitions.

Where an existing calculation differs from the target definition, the difference must be documented.

Existing metric names must not be assumed to represent equivalent calculations without verification.

### 22.4 Historical Data Migration

Historical performance information may be migrated or reconstructed from authoritative source records where practical.

Migration must preserve relevant store ownership, reporting periods, source references and historical context.

Where historical information cannot be verified, it must be identified as incomplete or unavailable rather than presented as authoritative.

### 22.5 Incremental Migration

Performance functionality should be migrated in controlled stages.

The existing reporting implementation must remain the production baseline until its replacement has been verified and authorised.

New performance processing must not introduce competing write paths into authoritative business domains.

### 22.6 Parallel Verification

Where appropriate, existing and target calculations may operate in parallel for verification.

Differences must be investigated and documented before the target implementation becomes authoritative for the relevant report.

Parallel execution must not duplicate business transactions or modify authoritative source records.

### 22.7 Migration Cutover

Each migration stage must identify:

- Functionality being replaced.
- Authoritative calculation or reporting implementation.
- Affected data and reporting periods.
- Verification requirements.
- Dependencies.
- Rollback approach.
- Approval authority.

Cutover must not occur while material calculation differences or data ownership issues remain unresolved.

### 22.8 Rollback and Recovery

Migration rollback must preserve historical performance records and reporting continuity.

The recovery process must identify the authoritative implementation and avoid conflicting calculations or duplicate publication of reports.

Any migrated or recalculated information must remain traceable.

### 22.9 Existing Production Protection

Migration must not unintentionally change existing product management, orders, inventory, payment processing, customer records or store administration.

Performance-related changes must remain within their approved architectural boundaries.

## 23. Performance Non-Functional Requirements

### 23.1 Accuracy

Performance results must follow approved metric definitions and calculation rules.

Material calculation errors must be detectable and correctable through traceable processes.

### 23.2 Availability

Authorised users should be able to access performance reporting according to the platform's operational availability requirements.

Performance reporting interruptions must not prevent ordinary store operations.

### 23.3 Performance and Scalability

The architecture must support growth in participating stores, source records, reporting periods and metric calculations.

Analytical workloads should be managed without unnecessarily degrading critical transactional services.

### 23.4 Maintainability

Metric definitions, calculation rules, reporting logic and integration contracts must remain understandable and maintainable.

Changes must be controlled and documented.

### 23.5 Reliability

Performance processing must support recoverable execution, duplicate prevention, failure detection and historical consistency.

### 23.6 Auditability

Formal performance results, metric changes, reports, reviews and material decisions must remain traceable.

### 23.7 Security and Privacy

Performance information must remain subject to the platform's security, privacy, access and data retention requirements.

### 23.8 Usability and Interpretability

Reports must communicate metric definitions, reporting periods, data freshness and relevant limitations clearly.

Users must not be required to infer the meaning of a performance score or indicator from an unexplained number.

### 23.9 Configurability

Targets, benchmarks, reporting schedules and approved metric configurations should be manageable through controlled configuration rather than undocumented code assumptions.

### 23.10 Observability

The platform must provide sufficient operational visibility into metric calculation, reporting generation, integration processing and data quality.

## 24. Architectural Constraints

The performance architecture must comply with the following constraints:

- The platform must preserve the distinction between platform and store performance.
- Performance records must retain their applicable ownership and reporting context.
- Authoritative business domains must remain responsible for their own source records.
- Financial metrics must use authoritative Finance information.
- Inventory metrics must preserve store and variant-level inventory boundaries.
- Marketing attribution must remain distinct from verified financial outcomes.
- Customer-derived metrics must respect customer privacy and consent.
- Employee-related assessments must require separately established authority and governance.
- Metric definitions and calculation rules must be documented and versioned.
- Historical performance results must remain traceable.
- Comparisons must account for relevant store circumstances.
- Scores must remain explainable and must not independently trigger material business decisions.
- Targets must require appropriate approval.
- Improvement plans must not independently authorise financial commitments.
- Reporting and exports must enforce backend access controls.
- Performance processing must not compromise critical transactional workloads.
- Existing Yotaabo production functionality must remain protected during migration.
- Additional analytical infrastructure must have a justified operational need.
- New performance microservices must not be introduced without a justified architectural requirement.

## 25. Open Performance Architecture Decisions

The following decisions require further specification and approval before the corresponding functionality is implemented.

| Decision | Matters requiring resolution |
|---|---|
| Initial metric catalogue | Metrics required for the first production release |
| Metric ownership | Responsible owners and approval authorities |
| Reporting frequency | Update schedules for each metric category |
| Reporting periods | Standard and custom reporting period definitions |
| Store benchmarking | Approved comparison groups and eligibility criteria |
| Normalisation | Appropriate methods for comparing different store conditions |
| Performance targets | Target-setting authority, scope and approval |
| Performance scoring | Whether a combined score is required and its calculation model |
| Metric weighting | Approved weighting and normalisation rules if scoring is introduced |
| Performance categories | Category definitions, thresholds and interpretation |
| Review frequency | Scheduled and event-driven review requirements |
| Improvement plans | Approval, monitoring and completion requirements |
| Platform reporting | Permitted aggregate reporting and disclosure boundaries |
| Store reporting | Store-specific dashboard and export requirements |
| Customer metrics | Approved customer indicators and privacy boundaries |
| Employee metrics | Whether individual employee assessments are permitted and under what governance |
| Data processing | Initial aggregation, storage and calculation strategy |
| Analytics infrastructure | Reporting database or analytical infrastructure requirements |
| External analytics | Approved providers and data-sharing requirements |
| Data retention | Retention periods for performance reports and historical calculations |
| Historical migration | Existing Yotaabo metric mapping and historical data treatment |
| Recalculation policy | Conditions and approval for historical recalculation |
| Operational ownership | Monitoring, support and incident responsibilities |

Unresolved decisions must remain configurable or deferred where practical.

No performance threshold, scoring weight, target, comparison rule or material business consequence may be introduced as a permanent rule without the appropriate approval.

## 26. Relationship to Other Documents

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
- Marketing Architecture.
- Finance Architecture.

The performance architecture depends on commerce, inventory, finance, marketing, customer and store domains for authoritative source information.

It depends on identity and access architecture for authentication, authorisation and store membership boundaries.

It depends on security, audit and operations architectures for protection, accountability, monitoring and operational support.

Where responsibilities overlap, each domain must remain authoritative for its own records and processes.

The performance domain must consume and analyse authorised information through defined interfaces rather than replace the responsibilities of other domains.

## 27. Architecture Governance

### 27.1 Approval

This document remains a draft until reviewed and explicitly approved by the business owner.

Approval must not be inferred from implementation activity or the existence of related approved documents.

### 27.2 Change Management

Material changes to performance metrics, calculation methods, scoring, benchmarking, target governance, reporting access or performance review processes must be reviewed against the relevant business and architecture documents.

### 27.3 Metric Governance

Every formal metric must have an identifiable owner, approved definition, calculation method, effective date and change history.

### 27.4 Performance Decision Governance

Material decisions informed by performance assessments must follow the applicable business authority and approval processes.

Performance scores and reports must not independently create commercial, financial or operational authority.

### 27.5 Implementation Compliance

Performance implementation must follow the approved architecture and record any authorised deviation.

Unresolved decisions must be escalated rather than silently resolved through code or database defaults.

### 27.6 Review

The architecture should be reviewed when the platform's operating model, performance requirements, participating stores, data sources, reporting arrangements or applicable legal obligations materially change.
