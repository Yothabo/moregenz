# Product Catalogue Architecture

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-ARCH-89A6E3171E |
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

This document defines the product catalogue architecture for the multi-store retail platform.

It establishes how products are identified, described, owned, organised, shared, published and maintained across the platform and its participating stores.

The architecture distinguishes central product catalogue information from store-specific commercial information, including pricing, availability and inventory.

It also defines the boundaries between product catalogue capabilities and related domains such as Store, Inventory, Commerce, Customer, Marketing and Finance.

The objective is to support multiple independently operated storefronts using a consistent platform catalogue model without forcing every store to sell identical products or use identical storefront designs.

### 1.1 Intended outcomes

The product catalogue architecture must support:

- A centrally managed platform catalogue.
- Products owned by the platform or by individual stores.
- Controlled sharing of products between participating stores.
- Store-specific product listings and commercial information.
- Product categories, brands, attributes, variants and identifiers.
- Product images, media and descriptive information.
- Independent product availability and inventory per store.
- Product publication and lifecycle management.
- Storefront access through documented backend APIs.
- Future expansion to different retail categories and product types.

### 1.2 Architectural scope

This document describes the logical architecture and responsibilities of the product catalogue domain.

It does not prescribe every database table, API endpoint, user interface or implementation detail. Those will be defined through detailed technical design and implementation decisions.

## 2. Architectural Objectives

The product catalogue must provide a consistent foundation for product information across the platform while preserving each store's commercial and operational independence.

### 2.1 Central catalogue consistency

The platform must maintain a reliable representation of product identity and descriptive information.

Where a product is shared between stores, the platform must avoid unnecessary duplication of its authoritative product identity.

### 2.2 Store independence

Each store must decide which eligible products it offers.

A product's existence in the central catalogue must not automatically make it available for sale in every store.

Stores must retain control over their own listings, pricing, publication status and other permitted commercial settings.

### 2.3 Ownership enforcement

Product ownership must be explicit.

The architecture must distinguish platform-owned products from store-owned products and enforce the relevant ownership permissions.

A store must not gain editing rights over another store's source product information merely because it uses or lists that product.

### 2.4 Extensibility

The catalogue must accommodate different product types, attributes and variant structures without requiring a separate catalogue implementation for every store.

### 2.5 Reliable storefront integration

Each store's independently developed frontend must consume catalogue information through supported platform interfaces.

The frontend must not require direct database access or privileged database credentials.

## 3. Product Catalogue Principles

### 3.1 Product identity is separate from store availability

A product record represents the identity and descriptive information of a product.

A store listing represents that store's decision to offer the product under its own commercial conditions.

The two concepts must not be treated as interchangeable.

### 3.2 Ownership must be explicit

Every product must have an identifiable owner.

The owner is responsible for the authoritative source product information and the permissions associated with that information.

### 3.3 Sharing does not transfer ownership

Making a product available to another store does not transfer ownership.

The receiving store must receive only the permissions required to use the product within its own listing and sales operations.

### 3.4 Commercial independence

Each store must manage its own permitted commercial information.

This includes store-specific prices, publication status, availability settings and other approved listing attributes.

### 3.5 Inventory independence

Product catalogue records must not be used as inventory balances.

Inventory quantities, reservations, stock movements, locations and adjustments belong to the Inventory domain.

### 3.6 Backend authority

The backend is authoritative for catalogue access, ownership validation, store eligibility and permitted changes.

Frontend restrictions improve usability but must never replace backend authorisation.

### 3.7 Historical accuracy

Changes to product information must not silently rewrite historical transaction information.

Commerce transactions must retain the product descriptions, identifiers, prices and other relevant information captured at the time of the transaction.

### 3.8 Controlled configuration

Storefronts may present catalogue information using their own independently developed interfaces.

They must consume supported catalogue data and APIs rather than directly modifying backend catalogue structures.

## 4. Product Catalogue Domain Boundaries

The Product Catalogue domain is responsible for authoritative product identity, descriptive information, catalogue organisation and the relationships needed to make products available to stores.

### 4.1 Responsibilities within the domain

The domain is responsible for:

- Product identity and source records.
- Product ownership.
- Product names and descriptions.
- Product brands and manufacturers where applicable.
- Product categories and catalogue organisation.
- Product attributes and classification.
- Product variants and catalogue-level identifiers.
- Product media references and descriptive metadata.
- Product lifecycle and catalogue publication state.
- Product sharing and store eligibility relationships.
- Product catalogue search and retrieval.
- Validation of catalogue information.
- Product catalogue administration and audit history.

### 4.2 Responsibilities outside the domain

The following responsibilities belong to other domains:

| Responsibility | Owning domain |
|---|---|
| Store identity and lifecycle | Store |
| User identity and permissions | Identity and Access |
| Store-specific product prices | Commerce |
| Inventory quantities and movements | Inventory |
| Cart and checkout processing | Commerce |
| Orders and transaction snapshots | Commerce |
| Customer profiles and preferences | Customer |
| Product promotions and campaigns | Marketing |
| Financial transactions and settlements | Finance |
| Performance calculations and assessments | Performance |
| Frontend hosting and deployment | Deployment |

### 4.3 Boundary enforcement

Other domains may consume catalogue information through approved interfaces.

They must not independently create competing authoritative product identity records.

Where another domain needs a historical or transaction-specific copy of product information, it must retain an appropriate snapshot or reference without taking ownership of the source catalogue record.

## 5. Product Ownership Model

Product ownership determines who controls the authoritative source product information and who may approve changes to it.

### 5.1 Platform-owned products

A platform-owned product is created and maintained under platform ownership.

The Platform Super Admin or another explicitly authorised platform-level actor may manage its authoritative information.

A platform-owned product may be made available to multiple participating stores, subject to the platform's sharing and eligibility rules.

Platform ownership does not automatically grant every store permission to modify the source product record.

### 5.2 Store-owned products

A store-owned product is created and maintained by the store that owns it.

The owning Store Admin and appropriately delegated employees may manage its source information within their authorised permissions.

Store ownership does not automatically make the product available to other stores.

Sharing a store-owned product requires an explicit permission or sharing arrangement.

### 5.3 Ownership changes

Changing product ownership is a controlled operation.

It must not be treated as an ordinary edit to a product record.

An ownership change must preserve relevant history, identify the previous and new owners, record the authorised actor and capture the effective change.

Any required approval or acceptance process remains subject to an explicit business rule.

### 5.4 Ownership and editing permissions

Ownership and editing permissions must be enforced independently of frontend visibility.

A user may be allowed to view or use a product without being allowed to edit its authoritative information.

Store-specific listing permissions must not be interpreted as source product editing permissions.

### 5.5 Ownership history

The platform must retain an auditable history of material ownership changes.

The history must identify the affected product, previous owner, new owner, effective time and authorised actor.

## 6. Core Product Catalogue Model

The catalogue must represent product identity separately from its store-specific commercial representation.

### 6.1 Product

A Product represents the authoritative catalogue identity of an item.

Depending on its type, a product may contain:

- Product identifier.
- Product owner.
- Product name.
- Description.
- Brand or manufacturer reference.
- Product category.
- Product type.
- Product attributes.
- Product media references.
- Product lifecycle status.
- Creation and modification information.

The final required fields and validation rules will be established during detailed data modelling.

### 6.2 Store product listing

A Store Product Listing represents a store's decision to offer a product.

It connects an eligible product to a specific store.

The listing may contain:

- Store identifier.
- Product identifier.
- Store-specific publication status.
- Store-specific product title or presentation overrides where permitted.
- Store-specific description overrides where permitted.
- Store-specific commercial settings.
- Storefront visibility information.
- Listing creation and modification history.

A listing must not replace or duplicate ownership of the source product record.

### 6.3 Product category

A Product Category organises products into a controlled catalogue classification structure.

The architecture must support category relationships and controlled category management.

Whether categories are global, store-specific or a combination of both must be explicitly defined.

### 6.4 Product brand and manufacturer

Brand and manufacturer information must be represented separately from the store selling the product.

The architecture must not assume that the product owner, manufacturer, brand owner and selling store are always the same entity.

### 6.5 Product attributes

Product attributes describe characteristics relevant to identification, classification, filtering and presentation.

Examples may include:

- Size.
- Colour.
- Material.
- Fragrance concentration.
- Volume.
- Dimensions.
- Weight.
- Model.
- Compatibility.

The platform must support appropriate attribute definitions without assuming that every product type uses the same attributes.

### 6.6 Product variants

A product may have independently selectable variants.

Examples include different sizes, colours, volumes or other meaningful product configurations.

Variants must remain associated with their parent product.

Where a variant is independently stocked or sold, the relevant Commerce and Inventory records must identify the correct variant.

The detailed variant and SKU model must remain consistent with the approved Inventory Architecture.

### 6.7 Product identifiers

Products and variants may have identifiers such as internal product codes, SKUs, barcodes or manufacturer references.

The architecture must distinguish platform identifiers from identifiers supplied by owners, manufacturers or stores.

Identifier uniqueness and scope must be established through explicit data rules.

### 6.8 Product media

Product media includes images and other supported assets used to describe and present products.

The catalogue must maintain references and relevant metadata for approved media.

Media storage, access control, upload validation, processing and delivery must follow the platform's file and media security architecture.

A store's frontend must retrieve media through supported URLs or approved media interfaces.

## 7. Shared Product Catalogue and Store Eligibility

The initial participating stores, Yotaabo and Poshies, use one shared product catalogue.

An authorised administrator of either participating store may add a product to the shared catalogue. Once created and accepted under the applicable product validation rules, that product must be available for both stores to create or maintain their own listings. A second upload of the same product must not be required merely to make it available on the other storefront.

Shared catalogue availability does not mean that a product is automatically published for sale. Each store retains control over its own listing status and storefront publication.

This initial shared-catalogue rule applies to Yotaabo and Poshies. Any future store-specific restriction or exception must be explicitly authorised and documented rather than inferred from product ownership.

### 7.1 Shared catalogue eligibility

Products created by either authorised store administrator enter the shared catalogue for the participating stores, subject to validation, lawful use of product information and applicable platform restrictions.

The platform must not treat a product as private to the store through which it was first uploaded merely because that administrator created it.

A product may be restricted from further use only through an authorised platform process. Any restriction must account for existing listings, active orders, inventory references and historical records.

### 7.2 Store participation

Yotaabo and Poshies may each create and maintain a listing for a product in the shared catalogue.

The backend must verify the requesting user's authority, the target store's identity and active status, and the product's eligibility before allowing listing creation or modification.

The shared catalogue must not require duplicate source product records for the two stores.

### 7.3 Ownership and editing permissions

The platform must retain the source product record and its creator and modification history.

An administrator's authority to add a product to the shared catalogue must be distinguished from permissions to modify or delete source product information. Source-record editing and deletion must be governed by explicit permissions and auditable controls.

Each store may manage its own permitted listing information without changing the other store's listing.

Permission to use a shared product does not by itself grant permission to alter another store's commercial records.

### 7.4 Store-specific listing independence

Each store must maintain its own listing lifecycle and publication status.

A product may be published on Yotaabo and unpublished on Poshies, or the reverse, without changing the other store's listing.

Each store's selling price, promotional terms, availability, presentation overrides and inventory relationship must remain independently managed.

### 7.5 Restrictions and withdrawal

A product may be restricted from future use through an authorised platform process.

The platform must assess the effect on existing store listings and active commercial operations before applying a restriction.

A restriction or withdrawal must not silently erase historical orders, transaction snapshots or inventory movement records.

Any effect on existing listings, future sales and outstanding orders must follow explicit business rules.

### 7.6 Eligibility enforcement

Product eligibility and listing permissions must be checked by the backend for relevant catalogue and commerce operations.

A frontend must not be able to bypass eligibility restrictions by submitting a product identifier directly.

## 8. Product Catalogue Lifecycle

The catalogue must support controlled creation, review, publication, modification, restriction and retirement of product records.

### 8.1 Product creation

A product may be created by an authorised platform actor or an authorised store actor, depending on the intended ownership model.

Creation must establish the product owner and validate the required product information.

The platform must prevent unauthorised users from creating products under another owner's identity.

### 8.2 Product review

The platform may introduce product review or approval processes where required.

Approval requirements, responsible actors and review criteria must be explicitly defined.

The architecture must not assume that every product requires platform approval unless that rule is formally adopted.

### 8.3 Product publication

Product publication determines whether a product is eligible for the relevant catalogue discovery or listing workflow.

Product publication and store listing publication are separate states.

Publishing a source product makes it available for eligible store listing workflows. It does not automatically publish the product on every storefront. Yotaabo and Poshies must each control their own listing publication status.

### 8.4 Product modification

Changes to source product information must be authorised by the product owner or another actor with explicitly delegated authority.

Material changes must be auditable.

Where changes affect existing listings, variants or active transactions, the platform must assess and manage those effects.

### 8.5 Product restriction

A product may be restricted when it is inaccurate, duplicated, unsafe, unauthorised or otherwise unsuitable for continued catalogue use.

Restrictions must have an identifiable reason, authorised actor and effective time.

The impact on existing listings and transactions must be handled according to approved business rules.

### 8.6 Product retirement

Retiring a product must be distinguished from deleting its historical record.

Retirement may prevent new listings or future sales while preserving existing orders, inventory history, financial records and audit references.

Permanent deletion or anonymisation must follow applicable retention, privacy and legal requirements.

## 9. Product Categories and Classification

Product categories provide a structured way to organise products for catalogue administration, discovery, navigation and reporting.

The category architecture must support different retail businesses without forcing every store into one rigid category structure.

### 9.1 Category model

A category represents a classification used to organise products.

Categories may contain:

- Category identifier.
- Category name.
- Description.
- Parent category reference.
- Category status.
- Display ordering.
- Applicable product types.
- Creation and modification history.

The final category fields must be established during detailed data modelling.

### 9.2 Hierarchical categories

The catalogue should support hierarchical categories where useful.

For example, a category may contain subcategories that provide more specific classification.

The architecture must prevent invalid parent relationships, including circular category hierarchies.

The maximum supported hierarchy depth, if one is required, remains an implementation decision.

### 9.3 Platform and store categories

The platform may maintain common categories for consistent classification across participating stores.

Stores may also require additional categories for their own storefront organisation.

The architecture must distinguish:

- Platform-level classification.
- Store-specific navigation and organisation.
- Product classification.
- Storefront presentation.

A store-specific navigation category must not automatically become a new authoritative product category.

Whether stores may create their own classification structures, and how those structures relate to platform categories, requires an explicit business decision.

### 9.4 Category assignment

Products may be assigned to one or more permitted categories.

The architecture must define whether a primary category is required and whether multiple category assignments are supported.

Category assignment must respect product ownership and delegated catalogue permissions.

### 9.5 Category lifecycle

Categories must support controlled creation, modification, activation, deactivation and retirement.

Deactivating a category must not silently delete products assigned to it.

The platform must define how affected products are handled when a category is retired or reorganised.

### 9.6 Category integrity

Category references must point to valid categories within the permitted classification scope.

The backend must validate category assignments rather than trusting identifiers submitted by a frontend.

## 10. Product Attributes and Specifications

Product attributes describe characteristics used for product identification, classification, comparison, filtering and presentation.

### 10.1 Attribute definitions

An attribute definition describes a characteristic that may be recorded against products or variants.

An attribute definition may include:

- Attribute identifier.
- Attribute name.
- Description.
- Data type.
- Applicable product types or categories.
- Validation rules.
- Permitted values, where applicable.
- Unit of measurement, where applicable.
- Whether the attribute is required.
- Whether the attribute is filterable or searchable.

The platform must maintain controlled attribute definitions where consistency is required.

### 10.2 Attribute values

Attribute values contain the actual information recorded against a product or variant.

The system must validate values against their attribute definitions.

For example:

- A volume attribute may use an approved numeric value and unit.
- A colour attribute may use a controlled value or permitted free-text value.
- A material attribute may contain an appropriate descriptive value.
- A compatibility attribute may reference supported models or product families.

The platform must not treat all attributes as unrestricted text fields.

### 10.3 Attribute data types

The attribute model should support appropriate data types, including:

- Text.
- Numeric values.
- Boolean values.
- Dates where relevant.
- Controlled selections.
- Multi-value selections.
- Measurements with units.

The final supported types and validation behaviour must be established during implementation design.

### 10.4 Attribute scope

Attributes may be defined at platform level or within an explicitly permitted product or store context.

Store-specific descriptive information must remain distinguishable from authoritative source product attributes.

A store must not overwrite a source attribute merely to achieve a different storefront presentation.

### 10.5 Attribute validation

The backend must validate:

- Required attributes.
- Accepted data types.
- Allowed values.
- Numeric ranges where configured.
- Units of measurement.
- Applicability to the relevant product type or category.

Invalid or incompatible attribute values must not be silently accepted.

### 10.6 Attribute changes

Changes to attribute definitions may affect existing products, variants, filters and integrations.

The platform must assess the impact of changes before applying them.

Where an attribute is retired or its data type changes, existing values must be migrated, retained or explicitly invalidated through a controlled process.

### 10.7 Product specifications

Product specifications may be presented as structured information on storefronts.

The frontend must receive specifications through supported catalogue interfaces.

Presentation choices must not change the authoritative meaning or value of the underlying attributes.

## 11. Product Variants and SKU Architecture

Variants represent distinct selectable configurations of a parent product.

The architecture must support products that have no variants as well as products with multiple independently selectable variants.

### 11.1 Parent product and variant relationship

A variant must belong to a valid parent product.

The parent product represents the broader product identity, while each variant represents a specific selectable configuration.

A variant must not be treated as an unrelated product merely because it has its own stock or identifier.

### 11.2 Variant attributes

Variant-defining attributes may include:

- Size.
- Colour.
- Volume.
- Capacity.
- Material.
- Model.
- Other product-specific configuration options.

The platform must distinguish variant-defining attributes from descriptive attributes that apply to the parent product.

### 11.3 Variant identity

Where variants are independently selected, sold, stocked or fulfilled, each must have a stable identifier.

Variant identity must be preserved across catalogue, inventory, commerce and reporting operations.

### 11.4 SKU model

A Stock Keeping Unit identifies a product or variant within a defined operational scope.

The platform must distinguish:

- Platform-level product identifiers.
- Platform-level variant identifiers.
- Owner-supplied SKUs.
- Store-specific SKUs.
- Manufacturer identifiers.
- Barcodes or other external identifiers.

The uniqueness scope of each identifier must be explicitly defined.

A store-specific SKU must not unintentionally overwrite another store's identifier or the authoritative platform identifier.

### 11.5 Variant-level inventory relationship

Inventory records must reference the correct product and variant where variant-level stock is applicable.

Stock movements, reservations, transfers, stock counts and order allocations must preserve variant identity.

Stock belonging to one variant must not be presented or allocated as stock belonging to another variant.

These requirements must remain consistent with the approved Inventory Architecture.

### 11.6 Variant-level commercial information

Where variants are sold independently, the Commerce domain must support the relevant variant-specific commercial information.

This may include different prices, availability conditions or fulfilment characteristics where the business model requires them.

The catalogue must provide the variant identity and descriptive information without taking ownership of pricing or inventory balances.

### 11.7 Variant creation and modification

Variant creation and modification must respect product ownership and authorised catalogue permissions.

Changes to variant identity or defining attributes must be controlled because they may affect existing listings, inventory, orders and integrations.

A variant must not be silently replaced with a different variant while preserving misleading historical references.

### 11.8 Variant retirement

Retiring a variant must preserve relevant historical references.

The platform must assess outstanding orders, inventory balances, reservations and existing listings before allowing a variant to become unavailable for new operations.

### 11.9 Products without variants

The architecture must support products sold directly at product level.

It must not require artificial variants for products that do not need selectable configurations.

The implementation must define consistent references for both variant-based and non-variant products.

## 12. Product Media and Digital Assets

Product media provides visual and supporting information used by catalogue administration and store storefronts.

### 12.1 Media types

The platform may support:

- Product photographs.
- Variant-specific images.
- Additional product gallery images.
- Product diagrams.
- Documents and specification files.
- Other approved product-related media.

Supported file types and size limits must be defined through implementation and security policies.

### 12.2 Media ownership

Media ownership must be associated with the relevant product owner or an explicitly authorised platform-managed asset.

A store must not gain unrestricted rights to modify or delete media owned by another party merely because it lists the associated product.

### 12.3 Media relationships

Media records must maintain valid relationships to the relevant product or variant.

The architecture should support multiple images per product and, where required, images associated with individual variants.

The ordering and intended use of media must be recorded where the storefront requires it.

### 12.4 Media storage

Media files must be stored using approved platform storage services.

The database should maintain metadata and storage references rather than treating large binary files as ordinary catalogue fields.

Storage paths and access permissions must respect the relevant ownership and publication rules.

### 12.5 Upload security

Uploaded files must be treated as untrusted input.

The platform must apply appropriate:

- File type validation.
- File size restrictions.
- Content validation.
- Malware scanning where appropriate.
- Safe image processing.
- Storage access controls.
- Protection against executable or unsafe content.

A filename or browser-provided MIME type alone is insufficient to establish that a file is safe.

### 12.6 Media processing

The platform may generate optimised image formats, thumbnails and delivery variants.

Processing must preserve the original asset where retention is required.

Failed processing must be visible and recoverable without corrupting the associated product record.

### 12.7 Media delivery

Storefronts must receive media through approved delivery URLs or interfaces.

Publicly accessible product media may use controlled public delivery where publication permits it.

Private or restricted assets must not become publicly accessible merely because a product record is visible.

### 12.8 Media replacement and deletion

Replacing or removing media must be authorised by the relevant owner or delegated actor.

The platform must avoid broken references and unintended deletion of assets still used by other products or listings.

Historical transaction evidence must be retained where required by the applicable retention rules.

### 12.9 Media migration

Existing Yotaabo product images and other media must be inventoried and mapped before migration.

Migration must preserve relevant product and variant relationships, verify file integrity and identify missing or duplicated assets.

## 13. Catalogue Search, Filtering and Discovery

The catalogue must provide consistent search and retrieval capabilities for platform administration and participating storefronts.

### 13.1 Search responsibilities

Catalogue search is responsible for finding products and variants using permitted catalogue information.

It does not determine whether a product is commercially available, in stock or purchasable by a particular customer.

Those decisions require the relevant Store, Commerce and Inventory services.

### 13.2 Searchable information

Search may use appropriate fields, including:

- Product names.
- Descriptions.
- Product identifiers.
- SKUs.
- Brands.
- Categories.
- Product attributes.
- Variant identifiers.
- Approved keywords.

Searchable fields and ranking behaviour must be configurable through explicit implementation decisions.

### 13.3 Store-scoped search

Storefront catalogue search must return only products that the requesting store is authorised to expose.

The backend must enforce store context and listing visibility.

A frontend must not be able to retrieve another store's restricted listings by changing a request parameter or submitting a different store identifier.

### 13.4 Platform catalogue search

Authorised platform users may search across the broader platform catalogue according to their permissions.

Platform-wide search must not expose restricted store information or sensitive commercial data to unauthorised actors.

### 13.5 Filtering

The catalogue may support filters based on:

- Product category.
- Brand.
- Product type.
- Attributes.
- Variant characteristics.
- Product publication state.
- Other approved catalogue properties.

Storefront filters must operate within the permitted store catalogue scope.

Inventory availability and price filters must use authoritative information from their respective domains.

### 13.6 Sorting

The API may support approved sorting options such as:

- Product name.
- Creation date.
- Modification date.
- Category.
- Other permitted catalogue fields.

Sorting by commercial or inventory information must use the relevant authoritative domain.

### 13.7 Pagination

Catalogue search and listing APIs must support controlled pagination.

The backend must enforce reasonable limits to prevent excessive data retrieval.

Pagination behaviour must remain consistent across supported storefront integrations.

Catalogue search and browsing must execute as selective, bounded database queries. Store context, listing publication state, product eligibility and supported filters must be applied by the backend query before records are returned. The application must not retrieve the complete catalogue and then filter it in application memory or in the browser.

Queries must return only the fields and related data required for the requested result. Search and listing endpoints must enforce a maximum page size and must not provide unbounded result sets. Cursor-based pagination should be used where offset pagination would become inefficient for deep result pages or frequently changing datasets.

### 13.8 Search result accuracy

Search results must reflect current publication and eligibility rules to the extent required by the platform.

Where search indexes or cached results are used, the architecture must define acceptable freshness and invalidation behaviour.

Restricted or unpublished products must not remain discoverable indefinitely through stale search results.

### 13.9 Search privacy and security

Search endpoints must enforce authentication requirements, store context and permissions.

They must avoid revealing restricted product records, private store information or internal administrative data.

Rate limiting and abuse protection must follow the API and Security Architectures.

## 14. Product Catalogue Administration

Catalogue administration provides authorised users with the capabilities required to create, maintain, review and organise product information.

### 14.1 Platform administration

Platform-level catalogue administration may include:

- Creating platform-owned products.
- Managing platform-owned product information.
- Managing global categories and attribute definitions.
- Managing product sharing and eligibility.
- Reviewing catalogue quality.
- Managing authorised catalogue restrictions.
- Reviewing catalogue activity and ownership history.

These capabilities must be restricted to explicitly authorised platform roles.

### 14.2 Store administration

Store Admins may manage products owned by their store and store listings for which they have permission.

Store-level capabilities may include:

- Creating store-owned products.
- Editing permitted source product information.
- Creating and managing eligible store listings.
- Managing store-specific presentation information.
- Publishing or unpublishing permitted listings.
- Managing permitted product media.
- Maintaining store-specific product identifiers.

A Store Admin must not modify platform-owned or other-store-owned source product information without explicit authority.

### 14.3 Employee delegation

Store Admins may delegate appropriate catalogue responsibilities to employees.

Delegated permissions must remain within the authority of the Store Admin and the store's permitted capabilities.

Employees must not gain platform-level ownership or administration rights through store-level delegation.

### 14.4 Permission enforcement

Every catalogue write operation must be authorised by the backend.

Authorisation must consider:

- Authenticated user identity.
- Account status.
- Platform role where applicable.
- Active store membership.
- Store context.
- Product ownership.
- Listing ownership.
- Delegated permissions.
- Requested operation.

### 14.5 Bulk operations

The platform may support bulk product creation, updates, imports and exports.

Bulk operations must apply the same ownership, validation and permission rules as individual operations.

The platform must identify failed records and report partial success clearly.

Bulk processing must not silently skip invalid records or bypass required approvals.

### 14.6 Import and export

Catalogue import and export capabilities must use documented formats and validation rules.

Imports must identify ownership and store scope explicitly.

Exports must enforce access permissions and avoid exposing restricted catalogue or commercial information.

### 14.7 Duplicate detection

The catalogue should support identifying possible duplicate products using relevant identifiers and descriptive information.

Duplicate detection must not automatically merge records solely because names or descriptions appear similar.

Any merge operation must preserve ownership, relationships, historical references and auditability.

### 14.8 Administrative activity

Material catalogue administration actions must be auditable.

Records should identify the actor, affected product or listing, operation, relevant changes, timestamp and outcome.

Sensitive information must not be unnecessarily included in audit payloads.

## 15. Product Catalogue APIs and Storefront Integration

The Product Catalogue domain exposes approved interfaces for platform applications, store administration and independently developed store storefronts.

### 15.1 API ownership

Catalogue APIs are owned and implemented by the backend.

Frontend applications consume the supported contracts.

A frontend must not connect directly to PostgreSQL or bypass backend catalogue authorisation.

### 15.2 Storefront catalogue access

Each store must be able to retrieve its own permitted catalogue through the platform API.

The backend must resolve and validate the relevant store context for each request.

The store identifier supplied by a browser must not independently establish authority to access that store's data.

### 15.3 Store-specific storefronts

Each participating store may have its own independently developed frontend.

The architecture must support different visual designs, navigation, layouts and customer experiences while using the same shared catalogue services.

A store's frontend may control how authorised catalogue information is presented.

It must not redefine product ownership, bypass listing eligibility or alter authoritative source product records.

### 15.4 Automatic store provisioning integration package

Creating a store through the authorised Platform Super Admin workflow must automatically initiate provisioning of its storefront integration package.

This is a required platform capability, not an optional manual setup step.

The provisioning process must use the newly created store's authoritative platform record and generate the store-specific configuration and developer tooling required to build an independently developed frontend connected to the shared platform backend.

The generated package must provide, as applicable:

- Store identifier and public store reference.
- Store-specific API configuration.
- API base URL and supported storefront endpoints.
- Store-scoped public integration identifiers or publishable keys where required.
- Store domain and CORS configuration information.
- Catalogue retrieval, search and product media integration instructions.
- API documentation and request/response examples.
- Environment configuration examples.
- SDK or frontend starter template where supported.
- Development, testing and deployment instructions.

The package must be associated with the correct store and must not create a separate backend, database or independent catalogue for that store.

The platform must make the generated package available to authorised platform administrators and through an approved secure handover process for the frontend development team.

The provisioning process must have a traceable status and outcome. Failures must be visible and recoverable without creating duplicate store records or inconsistent integration configurations.

The package must remain aligned with the store's current configuration. Changes to domains, integration settings or supported API contracts must be reflected through a controlled update process.

### 15.5 Public and private credentials

Values embedded in browser-delivered frontend code must be treated as public.

The platform may generate store-scoped public identifiers or publishable keys where required. These must not grant privileged access or bypass backend store isolation.

The platform must never provide database passwords, service-role keys, private signing secrets or privileged backend credentials for embedding in a public storefront.

Private integration credentials, where required, must remain in trusted server-side environments.

They must be scoped to their intended purpose, protected from disclosure, revocable and subject to rotation.

### 15.6 Storefront authorisation

Storefront APIs must enforce store context and permitted access on the backend.

Public catalogue retrieval may be permitted for published listings.

Administrative catalogue changes must require authenticated users with the appropriate permissions.

Public frontend configuration must not be treated as proof of administrative authority.

### 15.7 API contracts

Catalogue API contracts must define:

- Request and response structures.
- Required and optional fields.
- Validation rules.
- Authentication requirements.
- Store context behaviour.
- Permission requirements.
- Pagination and filtering.
- Error responses.
- Version compatibility.

Breaking changes must follow the approved API versioning and migration strategy.

### 15.8 API response boundaries

Storefront responses must expose only information intended for the requesting store and audience.

Internal ownership details, administrative metadata, restricted product information and private commercial data must not be exposed by default.

### 15.9 API reliability

Catalogue interfaces must support appropriate error handling, request validation, rate limiting, observability and performance controls.

The API must distinguish unavailable products, invalid identifiers, unauthorised operations and temporary service failures.

## 16. Product Catalogue Data Integrity and Consistency

Catalogue integrity ensures that products, variants, categories, attributes, media and store listings maintain valid relationships and consistent ownership boundaries.

### 16.1 Product identity integrity

Product identifiers must be stable and unique within their defined scope.

The platform must prevent accidental creation of conflicting authoritative product identities.

### 16.2 Ownership integrity

Every product must have a valid owner according to the approved ownership model.

Product ownership must not be inferred from the user making a request or the store currently displaying the product.

### 16.3 Listing integrity

Every store listing must reference a valid product and store.

The backend and database must prevent listings from referencing invalid or unrelated store contexts.

### 16.4 Variant integrity

Every variant must reference a valid parent product.

Where variant-specific records are used, the database must enforce relationships that prevent a variant from being associated with an unrelated product.

### 16.5 Store-scoped referential integrity

Where catalogue records are store-scoped, database relationships must preserve the relevant store boundary.

Where applicable, composite unique constraints and foreign keys must include the store identifier to prevent cross-store references.

Backend authorisation remains mandatory and must not be replaced by database constraints alone.

### 16.6 Category and attribute integrity

Product category assignments and attribute values must reference valid definitions within their permitted scope.

The platform must prevent invalid category hierarchies and incompatible attribute assignments.

### 16.7 Media integrity

Media references must point to valid assets and permitted product or variant relationships.

The platform must avoid deleting shared assets while valid references remain.

### 16.8 Concurrent modification

The platform must account for concurrent updates to products, variants, listings and media relationships.

Where conflicting changes occur, the system must use an explicit concurrency strategy rather than silently overwriting newer information.

### 16.9 Consistency across domains

Catalogue changes that affect Inventory, Commerce, Marketing or Store operations must be communicated through approved application interfaces or integration mechanisms.

A catalogue update must not directly modify another domain's authoritative records without an approved transaction or integration contract.

### 16.10 Data correction

Incorrect catalogue information must be corrected through authorised operations.

Corrections must preserve appropriate audit history and must not silently alter historical commercial transactions.

### 16.11 Data quality

The platform should support catalogue quality checks for missing descriptions, invalid identifiers, incomplete attributes, duplicate records, broken media references and inconsistent variant information.

Quality findings must be distinguishable from automatic restrictions or deletion.

### 16.12 Integrity monitoring

The platform must be able to identify invalid catalogue relationships, orphaned media references, inconsistent listings and other integrity failures.

Material failures must be visible to authorised operators and handled through controlled correction procedures.

## 17. Cross-Domain Integrations

The Product Catalogue domain provides authoritative product identity and descriptive information to other platform domains.

Integrations must preserve domain ownership and must not create competing sources of truth.

### 17.1 Store integration

The Store domain provides store identity, ownership, lifecycle and operational context.

The Product Catalogue domain uses this information to validate product ownership, store eligibility and listing relationships.

Store creation must not automatically create product records or grant unrestricted catalogue access.

### 17.2 Inventory integration

The Inventory domain consumes product and variant identifiers to maintain stock records.

The Product Catalogue domain provides the identity and descriptive information required to identify stock items.

Inventory remains authoritative for stock quantities, locations, movements, reservations, adjustments and availability calculations.

Catalogue changes must not silently alter inventory balances or movement history.

### 17.3 Commerce integration

The Commerce domain consumes product and variant information when creating carts, validating purchases and recording orders.

Commerce remains responsible for transaction-specific pricing, purchase eligibility, order processing and historical transaction snapshots.

The catalogue must provide sufficient product identity information for Commerce to preserve accurate transaction references.

### 17.4 Marketing integration

The Marketing domain may consume product information for campaigns, product promotions and catalogue-based content.

Marketing must verify that referenced products and associated store listings are eligible for the intended campaign.

A product appearing in the catalogue does not automatically make it eligible for every campaign.

### 17.5 Customer integration

Customer-facing applications may display catalogue information to customers.

The Customer domain remains responsible for customer identity, personal information, preferences and customer-related records.

Catalogue access must not expose customer information or unrelated store data.

### 17.6 Finance integration

The Finance domain may reference products, variants and related commercial transactions for reporting and reconciliation.

The Product Catalogue domain does not calculate revenue, recognise income, maintain financial ledgers or determine settlement obligations.

Financial records must preserve the relevant transaction references and historical information independently of subsequent catalogue changes.

### 17.7 Performance integration

The Performance domain may consume catalogue information for product classification, product category analysis and performance reporting.

Product classification changes must not silently rewrite historical performance periods where the original classification is needed for accurate comparison.

### 17.8 Identity and Access integration

The catalogue relies on Identity and Access services to establish authenticated users, platform roles, store memberships and delegated permissions.

The catalogue must enforce ownership and operation-specific authorisation using authoritative backend state.

### 17.9 Notification integration

Catalogue-related events may trigger notifications where an approved business process requires them.

Examples may include product approval outcomes, sharing changes or material catalogue restrictions.

Notification delivery must not become part of the authoritative product update transaction unless an explicitly designed transaction mechanism requires it.

### 17.10 Integration contracts

Cross-domain integrations must use documented application interfaces or approved event contracts.

Each integration must define:

- Owning domain.
- Authoritative source.
- Data or event contract.
- Required identifiers.
- Store context where applicable.
- Permission boundaries.
- Failure handling.
- Retry behaviour.
- Version compatibility.

## 18. Catalogue Events and Background Processing

The Product Catalogue domain may use background processing for operations that do not need to complete within the immediate user request.

### 18.1 Catalogue events

The platform may publish events for material catalogue changes.

Examples include:

- Product created.
- Product updated.
- Product published.
- Product restricted.
- Product retired.
- Product ownership changed.
- Product sharing changed.
- Store listing created.
- Store listing updated.
- Store listing published or unpublished.
- Product variant created or retired.
- Product media processing completed.

Event names and payload structures must be defined through implementation contracts.

### 18.2 Event ownership

The Product Catalogue domain owns catalogue events describing changes to its authoritative records.

Other domains may consume those events for their own purposes.

Consumers must not interpret an event as permission to modify catalogue records.

### 18.3 Reliable event delivery

Where an event must not be lost after a successful catalogue transaction, the implementation should use a durable publication mechanism such as a transactional outbox.

The catalogue update and the durable recording of the event must be coordinated to prevent an accepted change from becoming invisible to downstream consumers.

### 18.4 Event processing

Background consumers must support:

- Retry of recoverable failures.
- Idempotent processing.
- Duplicate event handling.
- Failure visibility.
- Controlled replay where appropriate.
- Monitoring of delayed or failed processing.

### 18.5 Event ordering

Where the order of catalogue changes matters, consumers must be able to identify stale or out-of-order events.

The implementation must define the relevant versioning or ordering mechanism.

A delayed event must not overwrite newer catalogue information.

### 18.6 Media processing jobs

Image optimisation, thumbnail generation and other supported media processing may run asynchronously.

Jobs must record their status and support controlled retries.

A processing failure must not silently mark an unavailable asset as successfully processed.

### 18.7 Search indexing

Search indexing may be asynchronous.

The platform must define acceptable indexing delays and ensure that restricted or unpublished products do not remain discoverable beyond the permitted period.

Where necessary, authoritative backend checks must take precedence over potentially stale search results.

### 18.8 Background job security

Background jobs must execute with explicitly assigned service permissions.

They must not inherit unrestricted administrative privileges merely because they operate outside a user request.

## 19. Reliability, Performance and Scalability

The catalogue must remain reliable as the number of stores, products, variants, listings and storefront requests increases.

### 19.1 Availability

Catalogue retrieval must be available according to the platform's approved service availability objectives.

A temporary catalogue failure must be distinguishable from an empty catalogue or an unpublished product.

### 19.2 Performance

Catalogue APIs must use selective database queries, appropriate indexes, pagination and response limits.

Indexes must support measured and expected access patterns, including common search fields, store/listing scope, publication state, frequently used filters, sorting and relationship lookups. Where queries combine store scope with other frequently filtered fields, suitable composite indexes should be evaluated.

The platform must avoid full-catalogue retrieval for ordinary storefront search, unnecessary column and relationship loading, N+1 query patterns, repeated per-result lookups and loading media assets before they are needed. Related data should be fetched through appropriate joins, projections or bounded batch queries.

Query plans and database performance must be inspected against representative catalogue sizes and search patterns. Full scans may be appropriate for controlled maintenance, migrations or explicitly authorised bulk operations, but must not be the default strategy for interactive customer search.

A separate search engine or distributed search service must not be introduced solely by assumption. The platform should first use the capabilities of its selected database and add specialised search infrastructure only when measured relevance, scale or latency requirements justify the additional operational cost.

### 19.3 Storefront isolation under load

Traffic from one store must not cause uncontrolled resource consumption that materially degrades other stores.

The platform may apply rate limits, query limits and resource controls according to store and endpoint requirements.

### 19.4 Caching

Catalogue responses and product media may be cached where appropriate.

Cache keys and invalidation rules must account for:

- Store context.
- Product identity.
- Listing visibility.
- Publication status.
- Relevant permissions.
- Product and listing changes.

Private administrative responses must not be exposed through shared public caches.

### 19.5 Cache invalidation

Material catalogue changes must trigger appropriate cache invalidation or expiry.

The system must prevent unpublished, restricted or withdrawn products from remaining publicly visible through stale cached responses beyond the approved consistency window.

### 19.6 Concurrency

Concurrent product and listing updates must be handled using an explicit concurrency strategy.

The system must prevent silent lost updates and preserve the integrity of product ownership and store relationships.

### 19.7 Failure isolation

Failures in search indexing, media processing or downstream integrations must not automatically corrupt authoritative catalogue records.

The platform must make partial failures visible and provide controlled recovery mechanisms.

### 19.8 Observability

The platform must monitor catalogue API performance, failed operations, background processing, search indexing, media processing and data integrity.

Logs and metrics must support diagnosis without unnecessarily exposing sensitive product ownership or administrative information.

### 19.9 Capacity management

Catalogue capacity must be assessed using realistic product counts, variant counts, listing counts, search patterns and media usage.

Performance requirements and scaling decisions must be validated against observed workloads rather than assumed growth figures.

## 20. Product Catalogue Security and Governance

Catalogue security ensures that product information, ownership relationships and store listings remain protected against unauthorised access and modification.

### 20.1 Authentication

Administrative catalogue operations must require authenticated users.

Public catalogue retrieval may be permitted according to publication and storefront access rules.

### 20.2 Authorisation

The backend must enforce permissions for every catalogue operation.

Frontend visibility, hidden buttons and client-side store identifiers must not be treated as security controls.

### 20.3 Ownership protection

Users must not be able to modify products owned by another party unless they possess explicit authority.

Store listing permissions must not grant unrestricted access to source product records.

### 20.4 Store isolation

Catalogue APIs must prevent one store from accessing restricted listings, administrative data or other store-specific information.

The platform must test isolation through direct API requests, not only through frontend navigation.

### 20.5 Privileged catalogue operations

Operations such as ownership transfer, global product restriction, product deletion and changes to global catalogue definitions must have explicit permission requirements.

Where additional approval is required, it must be enforced through a defined business process.

### 20.6 Audit requirements

The platform must maintain appropriate audit records for material catalogue operations.

Audit records must be protected from unauthorised modification and deletion.

### 20.7 Data protection

Product and media information must be handled according to the platform's security, privacy and retention requirements.

Private supplier information, confidential commercial information and restricted product data must not be exposed through public catalogue interfaces.

### 20.8 Catalogue abuse protection

The platform must protect catalogue creation, search, bulk import, media upload and update operations against abuse.

Appropriate validation, rate limiting, file controls and operational monitoring must be applied.

### 20.9 Governance

Catalogue policies must define who can create, approve, share, restrict, modify and retire products.

Changes to those policies must follow the platform's documented governance and approval processes.

## 21. Product Catalogue Testing Architecture

Catalogue testing must verify product correctness, ownership enforcement, store isolation, variant relationships and integration behaviour.

### 21.1 Unit testing

Unit tests must cover catalogue business rules, validation, ownership decisions, category relationships, attribute handling and lifecycle operations.

### 21.2 Integration testing

Integration tests must verify catalogue interactions with:

- Store.
- Identity and Access.
- Inventory.
- Commerce.
- Marketing.
- Customer.
- Finance.
- Performance.
- Media storage.
- Search and indexing services.

### 21.3 API contract testing

API tests must verify request validation, response structures, authentication, permissions, pagination, filtering and error behaviour.

Frontend integration contracts must remain compatible with their documented API versions.

### 21.4 Ownership testing

Tests must verify that:

- Platform actors can perform authorised platform catalogue operations.
- Store owners can manage their own products within their permissions.
- Store Admins cannot modify another store's source products.
- Shared products retain their original ownership.
- Ownership changes require appropriate authority.
- Product use does not automatically grant source-editing rights.

### 21.5 Store isolation testing

Tests must verify that one store cannot retrieve or modify another store's restricted listings.

Testing must include direct API requests with altered store identifiers and product references.

### 21.6 Variant testing

Tests must verify parent product relationships, variant identifiers, SKU scope, variant-level listing behaviour and Inventory integration.

They must prevent stock or transaction references from being associated with an unrelated variant.

### 21.7 Media testing

Tests must cover upload validation, unsafe file rejection, storage permissions, processing failures, media replacement and deletion behaviour.

### 21.8 Search testing

Search tests must verify store-scoped visibility, filters, pagination, indexing delays and the handling of unpublished or restricted products.

### 21.9 Concurrency testing

Tests must verify concurrent updates to products, variants, listings and media relationships.

The implementation must demonstrate that conflicting changes do not silently overwrite newer authoritative information.

### 21.10 Security testing

Security tests must include:

- Unauthorised product creation.
- Cross-store product access.
- Ownership escalation.
- Listing permission escalation.
- Privileged catalogue operations.
- Insecure media access.
- Bulk import abuse.
- Search information leakage.
- Cache isolation failures.

### 21.11 Migration testing

Migration tests must verify product identity, ownership, category relationships, variant references, listing relationships, media integrity and historical transaction references.

### 21.12 Storefront integration testing

Each store frontend must be tested against the supported catalogue API contract.

Testing must verify that a store receives its own permitted catalogue information without relying on private database credentials or privileged backend secrets.

### 21.13 Production readiness

Before production release, critical catalogue workflows must be tested with both permitted and denied operations.

A successful build alone is insufficient to establish catalogue security or operational readiness.

## 22. Migration from the Existing Yotaabo Catalogue

The existing Yotaabo catalogue is the initial production catalogue that must be incorporated into the broader platform architecture without disrupting current storefront operations.

### 22.1 Migration principles

Migration must be incremental, controlled and reversible where practical.

Existing product records and storefront functionality must remain protected until their replacement has been verified.

### 22.2 Existing catalogue assessment

Before migration, the implementation team must identify:

- Existing product records.
- Existing product identifiers.
- Existing categories.
- Product descriptions and attributes.
- Existing product images and media references.
- Product variants, if present.
- Store-specific commercial information.
- Product publication and visibility states.
- Relationships with orders and historical transactions.
- Existing administrative workflows.

The assessment must identify incomplete, duplicated or inconsistent information.

### 22.3 Ownership assignment

Existing Yotaabo products must be assigned an explicit ownership classification under the new model.

The ownership of each record must be established from verified business information.

The migration must not automatically classify every existing product as platform-owned merely because it currently exists in the Yotaabo database.

### 22.4 Store listing migration

Existing Yotaabo product availability and store-specific information must be mapped into the new listing model.

The migration must preserve the distinction between source product information and Yotaabo-specific commercial information.

### 22.5 Product identifier preservation

Existing product identifiers must be mapped to the new catalogue identifiers.

Where identifiers must change, the migration must preserve a reliable mapping for existing references and integrations.

### 22.6 Variant migration

Existing variant structures and identifiers must be assessed before migration.

Where variant-level records are introduced or changed, the migration must preserve their relationships with inventory and historical orders.

### 22.7 Media migration

Existing product media must be inventoried, mapped and validated.

The migration must verify file integrity, relationships and delivery paths before replacing existing storefront references.

### 22.8 Historical transaction protection

Existing orders and transaction snapshots must retain their historical product information.

Migrating catalogue records must not rewrite historical order descriptions, prices or product references in a way that changes the original transaction meaning.

### 22.9 API coexistence

Existing Netlify Function routes and frontend consumers must remain operational until their replacements have been implemented and verified.

The new catalogue interfaces must not introduce competing write paths that can create inconsistent product or listing records.

### 22.10 Migration validation

Validation must include:

- Product counts and identifier mappings.
- Ownership assignments.
- Category and attribute relationships.
- Variant relationships.
- Store listing visibility.
- Product media integrity.
- Inventory references.
- Historical order references.
- Administrative permissions.
- Storefront catalogue retrieval.

### 22.11 Cutover

Catalogue cutover must identify the authoritative write path and the point at which the new implementation becomes responsible for catalogue changes.

Any in-flight operations and pending background jobs must be accounted for.

### 22.12 Rollback

The migration plan must define how catalogue operations return to the previous implementation if the new implementation fails.

Rollback must account for changes made after cutover and must not discard valid product, listing or media updates.

### 22.13 Existing storefront protection

The existing Yotaabo storefront must continue operating throughout the migration.

Frontend changes must be introduced and verified independently from backend catalogue changes wherever practical.

## 23. Non-Functional Requirements

The Product Catalogue domain must satisfy the platform's approved non-functional requirements.

### 23.1 Maintainability

Catalogue modules must have clear responsibilities and avoid unnecessary coupling with unrelated business domains.

### 23.2 Extensibility

The catalogue must support additional product types, attributes, categories and variants without requiring fundamental architectural redesign for ordinary expansion.

### 23.3 Performance

Catalogue retrieval, filtering and search must remain responsive under expected store and product workloads.

Specific performance targets remain subject to measured workloads and approved service objectives.

### 23.4 Reliability

Catalogue writes must preserve data integrity.

Temporary failures in downstream services must not silently corrupt authoritative catalogue records.

### 23.5 Security

All catalogue operations must enforce authentication, authorisation, ownership and store isolation requirements.

### 23.6 Availability

Catalogue services must meet the availability objectives established by the platform's wider operational architecture.

### 23.7 Interoperability

The catalogue must expose documented interfaces that can be consumed by independently developed store frontends and approved platform services.

### 23.8 Observability

Catalogue operations, failures, processing delays and integrity issues must be measurable and traceable.

### 23.9 Data portability

The platform must support authorised export of catalogue information in documented formats without exposing restricted information.

### 23.10 Recovery

Catalogue data and associated media references must be included in appropriate backup and recovery arrangements.

Restoration procedures must preserve relationships between products, variants, listings and media.

## 24. Architectural Constraints

The following constraints apply to the Product Catalogue domain.

### 24.1 Shared platform backend

Participating stores use the shared platform backend and catalogue services.

The architecture must not require a separate catalogue database for every store.

### 24.2 Independent storefronts

Each store may operate its own independently developed frontend.

The catalogue must provide documented APIs and supported integration tooling for those frontends.

### 24.3 Backend-enforced security

Catalogue ownership, permissions, eligibility and store isolation must be enforced by the backend.

### 24.4 Product ownership separation

Platform-owned and store-owned products must remain distinguishable.

Sharing must not transfer ownership or grant unrestricted editing rights.

### 24.5 Commercial separation

Store-specific prices, inventory balances and transaction processing remain responsibilities of their respective domains.

### 24.6 Historical integrity

Catalogue changes must not silently rewrite historical commerce, inventory or financial records.

### 24.7 Existing Yotaabo protection

The migration must preserve existing production functionality and data until replacement capabilities have been verified.

### 24.8 Controlled complexity

The initial implementation should favour clear catalogue modules within the platform's modular monolith.

Separate services should only be introduced where justified by operational, scaling or organisational requirements.

### 24.9 No assumed commercial rules

The architecture must not invent product sharing fees, category restrictions, catalogue approval requirements or commercial obligations.

Such rules require explicit business decisions.

## 25. Open Product Catalogue Architecture Decisions

The following decisions remain open and must be resolved through business or technical design before the relevant functionality is implemented.

| Decision | Consideration |
|---|---|
| Global and store-specific categories | Whether stores may create independent category structures and how they map to platform categories |
| Category ownership | Who controls global and store-specific category definitions |
| Product approval | Whether product creation or publication requires platform review |
| Product sharing | Whether sharing is automatic, requested, approved or governed by specific agreements |
| Store-owned product sharing | Whether and under what conditions store-owned products may be shared |
| Source information overrides | Which descriptive fields, if any, stores may override in their own listings |
| Attribute model | Supported data types, validation rules and attribute scope |
| Variant model | Final variant representation and applicable product types |
| SKU uniqueness | Whether SKU uniqueness is platform-wide, owner-scoped or store-scoped |
| External identifiers | Handling and uniqueness of barcodes and manufacturer references |
| Product media storage | Final storage provider, access model and delivery strategy |
| Media retention | Retention and deletion rules for replaced or unused assets |
| Product search | Search technology, indexing strategy and relevance rules |
| Catalogue caching | Cache strategy, freshness requirements and invalidation mechanisms |
| Product deletion | Conditions for deletion, archival or retirement |
| Storefront SDK | Whether a shared SDK, starter template or both will be provided |
| Store provisioning package | Exact generated configuration, documentation and developer tooling |
| Public configuration | Which identifiers and configuration values may be exposed to browser frontends |
| API versioning | Catalogue contract versioning and compatibility policy |
| Catalogue events | Final event contracts and publication mechanism |
| Data quality | Required catalogue completeness rules and validation thresholds |
| Historical classification | How product category and attribute changes affect historical reporting |

No unresolved decision should be treated as an approved implementation rule.

## 26. Relationship to Other Documents

This document must be read alongside the following platform architecture and product documents.

| Document | Relationship |
|---|---|
| Product Vision | Defines the platform's overall product direction |
| Platform Business Model | Defines platform and participating-store commercial relationships |
| Store Operating Model | Defines store responsibilities and operating boundaries |
| Scope and Exclusions | Defines included and excluded platform capabilities |
| System Architecture | Defines the overall system and domain architecture |
| Data Architecture | Defines shared data structures, ownership and integrity |
| Store Architecture | Defines store identity, ownership and product listing relationships |
| Identity and Access | Defines catalogue actor identities and permissions |
| API Architecture | Defines API security, versioning and request handling |
| Security Architecture | Defines catalogue security and data protection requirements |
| Application Architecture | Defines frontend and backend application responsibilities |
| Deployment Architecture | Defines catalogue service deployment and environment management |
| Operations Architecture | Defines catalogue administration and operational procedures |
| Integration Architecture | Defines cross-domain and external integration boundaries |
| Commerce Architecture | Defines product eligibility, pricing references and transaction snapshots |
| Inventory Architecture | Defines product and variant relationships with inventory |
| Customer Architecture | Defines customer-facing catalogue and privacy boundaries |
| Marketing Architecture | Defines product use in campaigns and promotions |
| Finance Architecture | Defines financial references to products and transactions |
| Performance Architecture | Defines catalogue-related performance reporting and comparisons |

Where documents overlap, the owning domain's architecture remains authoritative for its responsibilities.

## 27. Architecture Governance

The Product Catalogue Architecture is governed as part of the wider platform architecture.

### 27.1 Architectural authority

The Platform Owner retains business-level authority over the platform's product catalogue direction and approved ownership model.

Technical implementation decisions must remain consistent with approved business requirements.

### 27.2 Change control

Material changes to product ownership, sharing, catalogue structure, store isolation or integration contracts must be reviewed before implementation.

Changes must identify affected domains and supporting documentation.

### 27.3 Decision records

Material architectural decisions must be recorded in the platform's architecture decision records.

Records should identify the decision, context, alternatives considered, consequences and approval status.

### 27.4 Implementation compliance

Implementation must be assessed against the approved architecture.

Deviations must be documented, justified and approved through the relevant governance process.

### 27.5 Architecture maintenance

This document must be updated when approved business rules, technical constraints or platform capabilities materially change.

The document's version and approval status must accurately reflect its governance state.

### 27.6 Approval

This document remains a draft until reviewed and explicitly approved by the business owner.

Approval must be recorded in the document metadata.
