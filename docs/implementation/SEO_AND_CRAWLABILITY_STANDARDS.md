# SEO and Crawlability Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-CAF576F558 |
| Category | Implementation |
| Version | Not recorded |
| Status | Not recorded |
| Document Owner | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define search-engine optimisation, crawlability and public-page indexing standards for the platform and its independent store frontends.

Each storefront must be discoverable through appropriate public search-engine mechanisms without exposing private application areas or store data.

## Scope

These standards apply to:

- Public storefront pages.
- Product and category pages.
- Public brand and information pages.
- Public campaign and landing pages.
- Store-specific domains.
- Search-engine metadata.
- Robots directives.
- XML sitemaps.
- Canonical URLs.
- Structured data.
- Redirects and not-found responses.

Private administration interfaces and authenticated application areas are covered by the security architecture and must not be treated as public SEO content.

## SEO Principles

Search-engine optimisation must support useful public content and accurate representation of each store.

SEO must not compromise privacy, security, store isolation or application performance.

Every independently developed storefront must have its own correct public identity, domain configuration and indexing policy.

Search-engine requirements must be incorporated into frontend development and deployment.

## Page Metadata

Every indexable public page must provide appropriate metadata.

This includes:

- A unique and descriptive page title.
- A concise meta description where appropriate.
- A canonical URL.
- Correct language information.
- Appropriate social sharing metadata where relevant.
- Accurate page content and headings.

Metadata must describe the actual page.

Do not duplicate identical titles and descriptions across unrelated pages without a valid reason.

Metadata must not contain private customer information, internal identifiers or unpublished commercial details.

## robots.txt

Every production storefront must provide an appropriate `robots.txt` file at its domain root.

The file must define the intended crawler access policy.

It may identify the location of the public XML sitemap.

It must not be treated as an access-control mechanism.

Disallowing a route in `robots.txt` does not protect its content from direct access.

Private pages and APIs must be protected through authentication, authorisation and appropriate server-side controls.

Development and staging environments must use an indexing policy that prevents unintended public discovery.

Production policies must be reviewed before release to ensure that public product and category pages are not accidentally blocked.

## XML Sitemaps

Every production storefront with indexable public pages must provide a valid XML sitemap.

The sitemap must contain only canonical, publicly accessible and indexable URLs.

It must exclude:

- Authenticated administration routes.
- Private account pages.
- Internal API routes.
- Search result URLs where indexing is not intended.
- Duplicate or non-canonical URLs.
- Redirect destinations that should not be listed as separate entries.
- Deleted or permanently unavailable pages.
- Unpublished products and content.
- URLs belonging to another store.

Sitemaps must be generated or updated when relevant public content changes.

Product publication, unpublication, deletion and URL changes must be reflected appropriately.

Sitemap generation must not expose internal identifiers or private information.

## Sitemap Validation

XML sitemaps must:

- Use valid XML syntax.
- Follow the supported sitemap protocol.
- Contain absolute canonical URLs.
- Use the correct production domain.
- Return an appropriate successful HTTP response.
- Avoid duplicate entries.
- Avoid URLs that redirect or return errors.
- Respect sitemap size and URL-count limits.

For large storefronts, use sitemap indexes and multiple sitemap files where required.

The implementation must not assume every store will remain small.

## Canonical URLs

Every indexable page must resolve to a preferred canonical URL.

Canonical URLs must use the correct store domain and URL structure.

Avoid duplicate indexing caused by:

- Query parameters.
- Tracking parameters.
- Multiple URL variants.
- Trailing-slash inconsistencies.
- Duplicate product routes.
- Alternative hostnames.
- HTTP and HTTPS variants.

Canonical tags must reference valid public URLs.

Do not canonicalise one store's pages to another store's domain unless an explicitly approved content relationship requires it.

## Product Pages

Public product pages should provide accurate and useful information.

Where applicable, include:

- Product name.
- Description.
- Product imagery.
- Availability.
- Price and currency.
- Brand or manufacturer information where accurate.
- Variant information where relevant.
- Canonical product URL.

Structured data must reflect the actual visible page content and current commercial information.

Do not publish false availability, prices, ratings, reviews or promotional claims.

Product availability and pricing must remain store-specific where the platform allows different stores to offer the same product under different commercial terms.

## Structured Data

Use supported structured data formats where they accurately describe the page.

Potential types include:

- Organization.
- LocalBusiness where appropriate.
- WebSite.
- BreadcrumbList.
- Product.
- Offer.
- Article where applicable.

Structured data must match visible page content.

Do not invent reviews, ratings, prices, stock status, business addresses or other facts.

Validate structured data before production release.

## Social Sharing Metadata

Public pages should provide suitable social sharing metadata where relevant.

This may include:

- Open Graph title.
- Open Graph description.
- Open Graph image.
- Canonical page URL.
- Social card metadata for supported platforms.

Images must be publicly accessible and suitable for the intended page.

Do not expose private media or unpublished assets through social metadata.

## Store Domain Isolation

Each store frontend must use its own approved public domain or subdomain.

SEO metadata, canonical URLs, robots policies and sitemap entries must be generated using the correct store configuration.

A shared backend must not cause one store's sitemap or metadata to include another store's public URLs.

The backend must enforce store context independently of SEO configuration.

## Private and Restricted Pages

Private pages must not rely on `robots.txt` to remain confidential.

Administration pages, private customer records, internal reports and authenticated workflows must be protected through server-side authentication and authorisation.

Where appropriate, restricted pages should use `noindex` directives and suitable response headers.

Noindex directives are supplementary controls, not security controls.

Private APIs and data endpoints must never rely on search-engine directives for protection.

## HTTP Status and Redirects

Public pages must return accurate HTTP status codes.

Use permanent redirects for permanent URL changes and temporary redirects for temporary routing changes.

Avoid redirect chains and redirect loops.

Removed content must return an appropriate not-found or gone response depending on the actual lifecycle and intended behaviour.

Do not return a successful status code for a page that does not exist.

Custom not-found pages must return the correct HTTP status.

## Dynamic and Client-Rendered Pages

Storefronts may use client-side rendering, but public content must remain accessible to supported search crawlers.

The implementation must assess whether server-side rendering, static generation, pre-rendering or another rendering strategy is appropriate.

Search-engine discovery must not depend entirely on undocumented browser behaviour.

Product names, descriptions, canonical URLs and other important public metadata must be available to crawlers through the supported rendering strategy.

## Performance and Mobile Experience

SEO implementation must support responsive and performant public pages.

Avoid unnecessary scripts, oversized media and blocking resources.

Images must have appropriate dimensions, formats and alternative text where meaningful.

Public pages must remain usable on supported mobile devices.

Performance optimisation must not compromise product accuracy or accessibility.

## Multi-Store SEO Configuration

SEO configuration must be store-scoped.

Each store must be able to maintain its approved:

- Public domain.
- Site title and description.
- Brand identity.
- Social sharing defaults.
- Sitemap configuration.
- Robots policy.
- Canonical URL rules.

Shared platform defaults may be provided, but store-specific values must not leak between storefronts.

Configuration changes must be authorised and auditable.

## Development and Deployment Procedures

During development:

- Use non-production domains and indexing restrictions.
- Validate metadata and canonical URLs.
- Validate robots directives.
- Generate and validate XML sitemaps.
- Check public and private route behaviour.
- Verify product and category URL generation.
- Test redirects and not-found responses.

Before production deployment:

- Confirm the correct production domain.
- Confirm that public pages are not accidentally blocked.
- Confirm that private routes remain protected.
- Validate sitemap XML.
- Verify canonical URLs.
- Verify metadata and structured data.
- Check redirect behaviour.
- Check the not-found status code.
- Confirm that no staging URLs or test content are published.

After deployment:

- Verify robots and sitemap endpoints.
- Check representative public pages.
- Monitor indexing and crawl errors where appropriate.
- Correct broken links, duplicate URLs and invalid sitemap entries.
- Recheck the configuration after domain or routing changes.

## Testing Requirements

Automated and manual tests should verify:

- `robots.txt` is available at the correct domain root.
- Sitemap XML is valid.
- Sitemap entries belong to the correct store.
- Private routes are excluded from public indexing.
- Canonical URLs are correct.
- Metadata is unique where required.
- Product structured data matches actual product information.
- Deleted and unpublished content is handled correctly.
- Redirects use appropriate status codes.
- Not-found routes return the correct HTTP status.
- Staging environments cannot be indexed unintentionally.
- Store-specific SEO configuration remains isolated.

## Operational Monitoring

Monitor for:

- Missing or inaccessible robots files.
- Invalid sitemap XML.
- Unexpected indexing restrictions.
- Broken canonical URLs.
- Redirect loops.
- Large numbers of not-found responses.
- Cross-store URL leakage.
- Staging URLs appearing in production content.
- Outdated product and availability information.

SEO errors must be assigned to an operational owner and corrected through the normal change process.

## Implementation Constraints

The implementation must not:

- Use robots directives as access control.
- Publish private URLs or customer information.
- Mix store URLs in sitemaps.
- Publish inaccurate structured data.
- Generate canonical URLs from untrusted request values.
- Include staging URLs in production sitemaps.
- Return successful status codes for missing resources.
- Block all public content through an incorrect robots policy.
- Assume client-side rendering is automatically sufficient for search discovery.

## Open Decisions

The following require technical agreement:

- Sitemap generation strategy.
- Dynamic versus static sitemap generation.
- Sitemap index strategy for large stores.
- Rendering strategy for public storefront pages.
- SEO configuration ownership and permissions.
- Search-engine monitoring and reporting tools.
- Structured data coverage by page type.

## Relationship to Other Documents

This document should be read with:

- `FRONTEND_DEVELOPMENT_GUIDE.md`
- `DEVELOPMENT_STANDARDS.md`
- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `TESTING_STRATEGY.md`
- `USER_INTERFACE_AND_MOTION_STANDARDS.md`
- `STORE_INTEGRATION_PACKAGE_SPECIFICATION.md`
- `docs/architecture/STORE_ARCHITECTURE.md`
- `docs/architecture/DEPLOYMENT_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to shared SEO behaviour, domain handling, sitemap generation or public indexing policy must be reviewed before deployment across participating stores.
