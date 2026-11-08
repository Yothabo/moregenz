# Store Owner Community Module and Data Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-AE98B0F7FE |
| Category | Architecture |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


## 1. Purpose

This specification defines how the Store Owner Community programme is represented and operated inside the platform.

The community module MUST use the existing organisational identity, membership, RBAC, notification and audit infrastructure.

It MUST NOT create a separate identity or permission system for Store Owners.

## 2. Module Boundaries

The community module MUST support these functional areas:

- Community events and registrations.
- Attendance records.
- Discussions and peer interactions.
- Knowledge resources.
- Business showcases and case studies.
- Challenges and competitions.
- Collaboration opportunities.
- Community announcements and moderation.

The module MUST remain separate from store commerce operations.

It MUST NOT directly modify products, prices, orders, payments, inventory or financial settlements.

## 3. Core Data Entities

### 3.1 Community Programme

Represents the parent company's organised Store Owner development programme.

Required attributes:
- `id`
- `name`
- `description`
- `status`
- `created_at`
- `updated_at`

A programme MAY contain multiple events, resources and challenges.

### 3.2 Community Event

Represents a scheduled meetup, workshop, networking session or annual gathering.

Required attributes:
- `id`
- `programme_id`
- `title`
- `description`
- `event_type`
- `format`
- `location`
- `meeting_url`
- `start_at`
- `end_at`
- `registration_deadline`
- `capacity`
- `status`
- `created_by`
- `created_at`
- `updated_at`

`format` MUST distinguish in-person, virtual and hybrid events.

`status` MUST support draft, published, registration_open, registration_closed, completed, cancelled and archived.

An event MUST belong to one programme.

### 3.3 Event Registration

Records a Store Owner's registration for an event.

Required attributes:
- `id`
- `event_id`
- `organisational_membership_id`
- `registration_status`
- `registered_at`
- `cancelled_at`

The database MUST prevent duplicate active registrations for the same membership and event.

### 3.4 Event Attendance

Records actual participation.

Required attributes:
- `id`
- `event_id`
- `organisational_membership_id`
- `attendance_status`
- `check_in_at`
- `check_out_at`
- `recorded_by`

Registration MUST NOT automatically imply attendance.

### 3.5 Community Discussion

Represents a discussion topic or peer question.

Required attributes:
- `id`
- `title`
- `body`
- `author_membership_id`
- `visibility_scope`
- `status`
- `created_at`
- `updated_at`

Discussions MAY have replies and moderation records.

### 3.6 Knowledge Resource

Represents approved learning material.

Required attributes:
- `id`
- `title`
- `description`
- `content_type`
- `content_location`
- `author_membership_id`
- `programme_id`
- `event_id`
- `visibility_scope`
- `publication_status`
- `published_at`
- `created_at`
- `updated_at`

Resources MUST support draft, under_review, published, rejected, archived and withdrawn states.

### 3.7 Business Showcase

Represents an approved Store Owner business presentation or case study.

Required attributes:
- `id`
- `store_id`
- `author_membership_id`
- `title`
- `summary`
- `content`
- `consent_status`
- `visibility_scope`
- `publication_status`
- `created_at`
- `updated_at`

A showcase MUST NOT become publicly accessible without the required contributor approval.

### 3.8 Community Challenge

Represents a structured business-development activity or competition.

Required attributes:
- `id`
- `programme_id`
- `title`
- `description`
- `rules`
- `eligibility_rules`
- `judging_criteria`
- `submission_deadline`
- `status`
- `created_by`

### 3.9 Challenge Submission

Records a participant's entry.

Required attributes:
- `id`
- `challenge_id`
- `author_membership_id`
- `store_id`
- `submission_content`
- `submitted_at`
- `status`

Judging results MUST be stored separately from the original submission.

## 4. Entity Relationships

The system MUST enforce these relationships:

- One programme has many events.
- One programme has many knowledge resources.
- One programme has many challenges.
- One event has many registrations.
- One event has many attendance records.
- One discussion has many replies.
- One challenge has many submissions.
- One Store Owner membership can participate in many events and challenges.
- One store can have many approved business showcases over time.

All organisational references MUST use the canonical identifiers defined by the unified organisational data model.

The module MUST NOT create duplicate Store Owner, store or organisational membership records.

## 5. Visibility Scopes

Every community resource MUST have an explicit visibility scope.

Supported scopes MUST include:

- `programme_admin_only`
- `registered_participants`
- `active_store_owners`
- `specific_organisational_units`
- `public`

Public visibility MUST require explicit approval.

A resource MUST NOT become visible to a broader audience merely because its author changes roles or leaves the organisation.

The system MUST validate visibility on every read and download request.

## 6. Application Workflows

### Event workflow

1. Administrator creates an event.
2. Event remains in draft.
3. Authorised administrator reviews and publishes it.
4. Eligible Store Owners receive an announcement.
5. Owners register or cancel registration.
6. Attendance is recorded separately.
7. Event is completed or cancelled.
8. Approved notes and resources are published.
9. Participants and eligible non-attendees can access authorised materials.

### Knowledge resource workflow

1. Contributor or administrator submits a resource.
2. Resource enters review.
3. Reviewer checks accuracy, consent, privacy and scope.
4. Approved resource is published.
5. Resource becomes searchable within its visibility scope.
6. Updates and withdrawals are recorded in the audit trail.

### Challenge workflow

1. Administrator creates challenge rules and criteria.
2. Challenge is reviewed and published.
3. Eligible owners submit entries.
4. Entries close at the published deadline.
5. Authorised judges assess submissions.
6. Results are approved and published.
7. Recognition and related learning resources are recorded.

## 7. API and Backend Responsibilities

The backend MUST enforce:
- Membership-based access.
- Event eligibility and registration rules.
- Capacity and registration deadlines.
- Duplicate registration prevention.
- Attendance record integrity.
- Resource publication and visibility.
- Contributor consent.
- Challenge eligibility and submission deadlines.
- Moderation and audit requirements.

The frontend MUST NOT be treated as the security boundary.

All protected reads and writes MUST be authorised server-side.

## 8. File and Media Storage

Community attachments MUST use controlled storage.

The system MUST:
- Validate file type and size.
- Scan uploads where supported.
- Store metadata and ownership references.
- Enforce resource visibility on downloads.
- Prevent unauthorised public object access.
- Record replacement, withdrawal and deletion events.

Private recordings MUST NOT be placed in unrestricted public storage.

## 9. Audit and History

The system MUST record material changes to:
- Event details and status.
- Registrations and attendance corrections.
- Discussion moderation.
- Resource review and publication.
- Visibility changes.
- Showcase consent.
- Challenge rules, submissions and results.

Audit records MUST identify the actor, action, affected entity and timestamp.

## 10. Acceptance Criteria

The architecture is acceptable when:

1. Community entities use canonical organisational identities.
2. Event registration and attendance are separate.
3. Knowledge resources have controlled publication and visibility.
4. Owners can access authorised resources without attending events.
5. Business showcases require appropriate consent.
6. Challenges preserve submissions and judging history.
7. All protected operations enforce permissions server-side.
8. Community data cannot expose private commerce records.
9. Material changes are auditable.
10. Community functionality integrates with existing platform services rather than creating parallel systems.
