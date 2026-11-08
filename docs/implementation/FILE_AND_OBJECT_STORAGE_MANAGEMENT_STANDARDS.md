# File and Object Storage Management Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-37BABC9AD6 |
| Category | Implementation |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


| Metadata | Value |
|---|---|
| Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## 1. Purpose

This document defines standards for storing, uploading, retrieving, processing and deleting files across the multi-store retail platform.

Its objectives are to:

- Protect uploaded files from unauthorized access.
- Establish consistent storage ownership and isolation.
- Prevent malicious or invalid file uploads.
- Separate public storefront assets from private business records.
- Define file validation and processing requirements.
- Control storage costs and resource consumption.
- Support reliable file deletion, retention and recovery.
- Preserve compatibility with the current platform and future architecture.

Object storage is a supporting infrastructure service. It must not become an uncontrolled source of business data or an alternative to the platform's authoritative database records.

## 2. Scope

This standard applies to:

- Product images.
- Category and storefront media.
- Store logos and branding assets.
- Customer-uploaded files.
- Product documentation.
- Import files.
- Export files.
- Generated reports.
- Financial documents.
- Administrative attachments.
- Temporary processing files.
- Platform-generated assets.

It covers storage design, access control, upload validation, file processing, metadata, delivery, retention, deletion, monitoring and recovery.

## 3. Core Principles

### 3.1 Controlled ownership

Every stored file must have an identifiable owner or responsible platform scope.

A file must not become an untracked object with no business purpose or lifecycle.

### 3.2 Database metadata and object content

The database should hold authoritative metadata and references to stored objects.

The file content itself should be stored in an approved object-storage service where appropriate.

### 3.3 Public and private separation

Public storefront media and private business documents must use separate access policies.

A file must not become publicly accessible merely because it is stored in the same bucket or provider used for public assets.

### 3.4 Least privilege

Users and services must receive only the storage permissions required for their responsibilities.

### 3.5 Controlled lifecycle

Every file category must have documented retention, replacement and deletion behaviour.

## 4. Storage Categories

Files must be classified before storage.

| Category | Examples | Default access |
|---|---|---|
| Public storefront assets | Published product images, public logos | Public read |
| Store-private files | Internal documents, private attachments | Authorized store access |
| Customer-private files | Customer uploads and personal documents | Authorized user access |
| Financial records | Invoices, statements, reconciliation evidence | Restricted access |
| Platform administration files | Internal reports and operational documents | Platform-authorized access |
| Temporary files | Processing intermediates and short-lived exports | Restricted, time-limited |

The classification must determine the storage location, access policy, retention period and delivery method.

## 5. Ownership and Store Isolation

Every store-owned file must be associated with its owning store in authoritative metadata.

The platform must distinguish:

- Platform-owned files.
- Store-owned files.
- Customer-owned files.
- Shared platform resources.
- Temporary processing objects.

A store must not access another store's private files by changing an object identifier or URL.

Store ownership must be validated server-side.

Shared assets must have explicit ownership and access rules. They must not be treated as store-owned simply because a store uses them.

## 6. Storage Architecture

The platform should use object storage for file content and the relational database for file metadata and business relationships.

The metadata record should contain, where applicable:

- File identifier.
- Original filename.
- Generated storage key.
- MIME type.
- File size.
- Checksum or content hash.
- Storage provider and bucket reference.
- Owner type.
- Owner identifier.
- Store scope.
- Visibility classification.
- Uploading user or service.
- Upload timestamp.
- Processing status.
- Retention classification.
- Deletion status.
- Related business resource.

Sensitive metadata must not be exposed through public APIs.

The application must not rely on a user-supplied filename as the storage object key.

## 7. Storage Key Design

Storage keys must be generated by the application or a trusted storage service.

Keys should:

- Be unique.
- Avoid exposing unnecessary personal information.
- Include an appropriate ownership or resource scope.
- Avoid path traversal sequences.
- Use normalized, predictable structures.
- Support controlled replacement and deletion.
- Avoid collisions between stores.

Example logical structures:

- `public/stores/{storeId}/products/{productId}/{fileId}.webp`
- `private/stores/{storeId}/documents/{fileId}`
- `private/platform/reports/{fileId}`
- `temporary/imports/{jobId}/{fileId}`

These are examples only. Actual paths must follow the selected provider's capabilities and approved storage design.

Original filenames must be retained only as metadata where needed.

## 8. Upload Authorization

Every upload must be authorized before a storage write is permitted.

The server must verify:

1. The caller's identity.
2. The caller's current permissions.
3. The permitted platform or store scope.
4. The target resource.
5. The allowed file category.
6. The file-size limit.
7. The upload method.
8. Any required approval.

A Store Admin must not upload files into another store's namespace.

A public storefront visitor must not receive administrative storage permissions.

Upload authorization must not depend solely on a client-provided store identifier.

## 9. Upload Validation

Every uploaded file must be validated.

Validation must include:

- File size.
- Actual file format.
- MIME type consistency.
- File signature or magic bytes where supported.
- Allowed extension.
- Filename normalization.
- Content-specific constraints.
- Malware or threat scanning where appropriate.
- Resource limits for image and document processing.

The application must not trust the browser-provided MIME type.

Files with mismatched extensions, MIME types and actual content must be rejected or quarantined for review.

## 10. Allowed File Types

Each upload endpoint must define an explicit allowlist.

Examples:

| Use case | Potential formats |
|---|---|
| Product images | JPEG, PNG, WebP, AVIF |
| Store logos | SVG only where securely sanitized, or approved raster formats |
| Import data | CSV, XLSX |
| Documents | PDF and approved office formats |
| Generated reports | Approved PDF, CSV or XLSX formats |

The allowlist must be based on actual business requirements.

Executable files, scripts and unnecessary archive formats must not be accepted through general-purpose upload endpoints.

SVG files require special treatment because they may contain active content. They must be sanitized or converted to a safe approved format before public delivery.

## 11. File Size and Resource Limits

Every upload category must define:

- Maximum individual file size.
- Maximum request size.
- Maximum number of files per request.
- Maximum image dimensions.
- Maximum document page count where relevant.
- Maximum archive expansion size where archives are explicitly supported.
- Processing timeout.
- Storage quota where applicable.

Limits must be enforced server-side.

Client-side restrictions may improve user experience but must not be treated as security controls.

## 12. Image Processing

Product and storefront images must be processed consistently.

Processing may include:

- Format validation.
- Metadata removal where appropriate.
- Orientation correction.
- Resizing.
- Compression.
- Thumbnail generation.
- Responsive variants.
- Safe format conversion.

The original upload may be retained only where required by an approved business or operational policy.

Public image variants must not expose embedded sensitive metadata such as location coordinates.

Image processing must be bounded to prevent excessive memory and CPU consumption.

The system must not trust image dimensions reported by the client.

## 13. Malware and Content Inspection

Private document uploads and other untrusted files must be subject to an appropriate inspection process.

Where malware scanning is required:

1. Upload the file into a restricted quarantine location.
2. Validate the file format and size.
3. Perform the required inspection.
4. Record the inspection result.
5. Promote approved files to their permitted storage location.
6. Reject or isolate unsafe files.

A file must not be made publicly accessible before required inspection and processing have completed.

The platform must define safe behaviour when the inspection service is unavailable.

## 14. Public File Delivery

Only files explicitly classified as public may be delivered through public URLs or public CDN paths.

Public delivery must ensure:

- The file has been approved for publication.
- Its store and resource association is valid.
- It contains no prohibited private information.
- Its content type is appropriate.
- Its URL does not expose private storage credentials.
- Its cache policy is documented.

Public URLs must not be used as proof of ownership or authorization.

Unpublishing a product or removing a public asset must trigger the required visibility and cache invalidation process.

## 15. Private File Delivery

Private files must be delivered through an authorized access path.

Possible methods include:

- Authenticated application download endpoints.
- Short-lived signed URLs.
- Controlled server-side streaming.

The application must verify authorization before issuing access.

Signed URLs must:

- Have a short, documented validity period.
- Be scoped to the specific object and permitted operation.
- Avoid unnecessary permissions.
- Not expose storage credentials.
- Be treated as temporary bearer credentials.

A signed URL must not remain valid indefinitely after a user's permissions have been revoked.

Where immediate revocation is required, use an application-controlled delivery path or another mechanism that supports the required revocation behaviour.

## 16. Upload and Processing Lifecycle

The platform should use an explicit lifecycle for uploaded files.

A typical lifecycle is:

1. Upload requested.
2. Authorization validated.
3. Temporary upload location allocated.
4. File received.
5. File validated.
6. Required inspection performed.
7. Processing completed.
8. Metadata persisted.
9. File promoted to its final storage location.
10. Related business resource updated.
11. Temporary content removed.

The implementation must define how partial failures are recovered.

A file must not be reported as successfully available when required validation or processing has failed.

## 17. Database and Storage Consistency

Object storage and PostgreSQL do not normally share a single atomic transaction.

The platform must account for partial failures.

Examples include:

- Object uploaded but metadata insertion failed.
- Metadata created but object upload failed.
- Replacement completed but old object deletion failed.
- Database record deleted but storage cleanup failed.

The implementation must use explicit states or durable processing records where required.

Orphaned objects must be detectable and recoverable through controlled reconciliation.

A failed storage cleanup must not silently remove the evidence needed to investigate the failure.

## 18. File Replacement

Replacing an existing file must follow a controlled process.

The platform must:

1. Verify authorization over the existing file.
2. Validate the replacement.
3. Store and process the replacement.
4. Update the authoritative metadata reference.
5. Confirm the new file is available.
6. Retire or delete the previous object according to retention rules.

The old object must not be deleted before the replacement has been successfully stored and associated with the business resource.

Where version history is required, previous versions must remain protected and separately identifiable.

## 19. File Deletion

File deletion must be controlled and auditable.

The system must distinguish:

- Unpublishing a public asset.
- Removing a file from a business resource.
- Soft deletion of metadata.
- Physical object deletion.
- Retention expiry.
- Legal or operational preservation.

Deletion must verify ownership and authorization.

Deleting a product or store must not automatically remove historical documents or records that must be retained.

The platform must define how storage deletion failures are retried and reconciled.

## 20. Store Suspension and Exit

Store suspension must not automatically destroy store files.

The platform must preserve files required for:

- Existing orders.
- Customer obligations.
- Financial reconciliation.
- Disputes.
- Audit evidence.
- Legal or contractual retention.

Store exit must follow the approved data handover and retention process.

Any export of store files must be authorized, scoped and recorded.

Private files must not become public during suspension, reactivation or exit.

## 21. Retention and Disposal

Each file category must have a documented retention rule.

Retention must consider:

- Business purpose.
- Legal obligations.
- Contractual requirements.
- Financial record requirements.
- Privacy obligations.
- Dispute and investigation holds.
- Backup retention.
- Provider deletion behaviour.

The platform must not invent a universal retention period for all files.

Physical deletion must account for object versions, replicas, backups and provider-specific retention behaviour.

Deletion completion must be recorded where required.

## 22. Temporary Files

Temporary files must have an explicit expiration policy.

Examples include:

- Import staging files.
- Export generation intermediates.
- Image processing files.
- Quarantined uploads.
- Temporary reports.

Temporary storage must:

- Be access-restricted.
- Use generated object keys.
- Have bounded size and lifetime.
- Be cleaned up after successful processing.
- Be reconciled after interrupted jobs.
- Avoid retaining unnecessary personal data.

Temporary files must not become permanent business records by accident.

## 23. Storage Quotas and Cost Controls

The platform should monitor storage usage by:

- Platform.
- Store.
- File category.
- Storage provider.
- Public and private classification.
- Temporary processing workload.

Where quotas are introduced, they must be documented and applied consistently.

Quota enforcement must not silently delete existing business records.

Cost controls may include:

- Image optimization.
- Duplicate detection.
- Lifecycle policies.
- Expiration of temporary files.
- Removal of confirmed orphaned objects.
- Storage tier selection where appropriate.

Any automated deletion must follow approved retention and disposal rules.

## 24. Storage Credentials and Provider Security

Storage credentials must remain server-side.

Requirements:

- Never embed service-role credentials in frontend code.
- Never commit secrets to source control.
- Use least-privilege provider permissions.
- Rotate credentials according to the security policy.
- Restrict bucket-level permissions.
- Separate public and private storage policies.
- Protect provider administration access.
- Use secure transport.
- Monitor unusual access patterns.

Public browser configuration must never include private storage credentials or administrative provider keys.

## 25. Backup and Recovery

Storage recovery must be coordinated with database recovery.

The platform must understand:

- Object versioning capabilities.
- Provider backup options.
- Replication behaviour.
- Recovery point expectations.
- Recovery time expectations.
- Deletion propagation.
- Backup retention.
- Restore verification.

Restoring database metadata without the corresponding objects may create broken references.

Restoring objects without corresponding metadata may create orphaned content.

Recovery procedures must address both conditions.

## 26. Access Logging and Audit

The platform should record important storage actions, including:

- Upload.
- Replacement.
- Publication.
- Unpublication.
- Private download authorization.
- Deletion.
- Retention expiry.
- Administrative access.
- Failed authorization.
- Manual recovery.

Audit records must identify the actor or service, affected resource, action, timestamp and relevant scope.

Logs must not contain signed URLs, secret credentials or unnecessary file contents.

## 27. Performance and Availability

File delivery must not unnecessarily block application APIs.

The platform should use direct object delivery or CDN delivery for approved public assets.

Private delivery must preserve authorization.

Large uploads should use an appropriate upload mechanism rather than unnecessarily buffering entire files in application memory.

Large processing tasks should use background jobs.

The system must define safe behaviour during:

- Storage provider outages.
- Upload interruptions.
- Download failures.
- Processing failures.
- CDN failures.
- Provider rate limiting.

## 28. Current and Target Architecture

The current production platform uses Supabase Storage and Netlify Functions alongside the React/Vite frontend.

Implementation must preserve the current storage ownership and access model.

The frontend may reference public asset URLs but must never receive private service credentials.

Administrative uploads must use authorized server-side operations or appropriately scoped upload mechanisms.

The target NestJS modular monolith should centralize storage access through a controlled storage abstraction.

Domain modules must retain responsibility for file ownership, publication state, retention classification and business relationships.

Storage provider changes must not require business modules to depend directly on provider-specific object paths.

## 29. Testing Requirements

Tests must cover:

### Authorization and isolation
- Unauthorized upload.
- Unauthorized download.
- Cross-store access attempts.
- Private object access.
- Expired signed URLs.
- Permission revocation.
- Public and private storage separation.

### Upload validation
- Valid file.
- Invalid file signature.
- MIME mismatch.
- Unsupported extension.
- Oversized file.
- Malformed image.
- Malicious or suspicious content.
- Excessive image dimensions.

### Lifecycle and consistency
- Successful upload.
- Failed metadata creation.
- Failed object upload.
- Failed image processing.
- Failed replacement.
- Failed deletion.
- Orphaned object detection.
- Temporary file cleanup.

### Retention and recovery
- Expired temporary files.
- Retention holds.
- Store suspension.
- Store exit.
- Backup restoration.
- Metadata and object reconciliation.

### Operational behaviour
- Storage provider outage.
- CDN failure.
- Interrupted upload.
- Interrupted background processing.
- Storage quota enforcement.

## 30. Acceptance Criteria

A storage implementation complies with this standard when:

- Every file category has a defined classification.
- Ownership and store scope are recorded.
- Public and private storage are separated.
- Uploads are authorized and validated server-side.
- Storage keys are generated safely.
- File-size and processing limits are enforced.
- Private access requires authorization.
- Public publication is explicit.
- Replacement and deletion handle partial failures.
- Retention and disposal rules are defined.
- Temporary files are cleaned up.
- Storage credentials remain server-side.
- Monitoring and audit records are available.
- Backup and recovery procedures account for both metadata and objects.
- Automated tests verify isolation and failure behaviour.

## 31. Open Decisions

The following decisions require explicit platform approval:

- Final bucket and namespace structure.
- Public and private bucket separation.
- Approved file types by business category.
- Upload limits by category.
- Image processing formats and variants.
- Malware scanning requirements and provider.
- Signed URL validity periods.
- Storage quota policy.
- Object versioning and backup strategy.
- Orphaned object reconciliation frequency.
- Storage abstraction design for the NestJS target.
- Retention periods by file category.

Until approved, teams must use restrictive access policies and avoid storing sensitive files in public storage.

## 32. Related Documents

- Data Architecture
- Database Schema and Data Modeling Standards
- Security Architecture
- Security Implementation Guide
- Identity and Access Architecture
- Store Architecture
- Store Integration Package Specification
- API Caching and Cache Invalidation Standards
- Background Jobs and Scheduled Task Processing Standards
- Data Import, Export and Portability Standards
- Data Retention, Archiving and Secure Disposal Standards
- Backup and Disaster Recovery
- Platform Audit Trail and Administrative Activity Standards
- Observability and Logging Standards
- Incident Response Playbook
- Release Management and Deployment Procedure
