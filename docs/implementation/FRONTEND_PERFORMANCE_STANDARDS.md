# Frontend Performance Standards

| Field | Value |
|---|---|
| Document Status | DRAFT |
| Version | 0.1 |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |

## Purpose

Define frontend performance requirements for the platform and independently developed store applications.

Performance must be considered throughout architecture, implementation, testing and production operations.

The objective is to deliver responsive, stable and efficient interfaces across supported mobile and desktop devices without introducing unnecessary complexity.

## Scope

These standards apply to:

- Public storefronts.
- Platform administration.
- Store administration.
- Employee interfaces.
- Shared frontend components.
- API communication.
- Images, fonts and other media.
- Client-side routing.
- Application state and caching.
- Build and deployment outputs.

## Performance Principles

Performance is a product quality requirement.

Optimisation must be based on measurement rather than assumptions.

Avoid unnecessary dependencies, oversized assets, excessive rendering and redundant network requests.

Prefer simple implementations that achieve the required performance.

Do not sacrifice accessibility, security or data correctness for performance gains.

## Core Web Vitals

Public storefronts should target the following Core Web Vitals at the 75th percentile of real user visits:

| Metric | Target |
|---|---:|
| Largest Contentful Paint (LCP) | 2.5 seconds or less |
| Interaction to Next Paint (INP) | 200 milliseconds or less |
| Cumulative Layout Shift (CLS) | 0.1 or less |

These are performance targets, not guarantees for every device or network.

Measure mobile and desktop performance separately where sufficient data is available.

Use field measurements and representative laboratory testing.

## Loading Performance

Prioritise the content required for the first meaningful view.

Avoid loading every application module and asset before displaying the page.

Use code splitting and lazy loading for routes and features where appropriate.

Load non-essential functionality after the primary content.

Do not delay essential content behind decorative animations or unnecessary scripts.

## JavaScript and Dependencies

Keep the production JavaScript bundle appropriately sized.

Review dependency additions for bundle size, maintenance, security and actual functionality.

Avoid installing multiple packages that solve the same problem.

Remove unused dependencies and dead code through controlled changes.

Use dynamic imports for large features that are not required immediately.

Do not introduce premature abstraction or complex optimisation systems without evidence that they are needed.

## Rendering and Component Performance

Avoid unnecessary component re-renders.

Use memoisation only where it provides measurable value or prevents a known performance problem.

Keep state close to the components that require it.

Avoid unnecessarily large global state structures.

Use stable keys when rendering collections.

Virtualise very large lists when rendering every item would materially affect performance.

Do not use virtualisation for small lists without a reason.

## API and Network Performance

Avoid duplicate API requests.

Use appropriate caching for data that can safely be reused.

Do not cache sensitive or user-specific information in shared public caches.

Paginate large datasets.

Avoid returning unnecessary fields or large nested responses.

Use server-side filtering and sorting for datasets that should not be loaded entirely into the browser.

Handle slow and unreliable connections without freezing the interface.

## Image and Media Performance

Use modern image formats where supported.

Provide appropriately sized images rather than downloading full-resolution assets for small display areas.

Define image dimensions or aspect ratios to reduce layout shifts.

Lazy-load below-the-fold images where appropriate.

Prioritise the main visible image when it is important to the initial page experience.

Do not lazy-load the primary image if doing so delays the main content unnecessarily.

Use responsive image delivery where supported.

Avoid unnecessarily large background images.

Preserve approved asset backgrounds and visual treatments when optimising assets. Compression must not introduce unapproved visual changes.

## Font Performance

Load only required font families and weights.

Prefer efficient font formats and appropriate loading strategies.

Avoid loading multiple font families without a clear design requirement.

Use suitable fallback fonts while approved fonts load.

Prevent typography changes from causing avoidable layout shifts.

## CSS and Layout Performance

Keep styles organised and avoid unnecessary duplication.

Remove unused styles through controlled changes.

Avoid excessive DOM nesting and deeply coupled selectors.

Prefer efficient layout and animation properties.

Avoid animating expensive layout properties when transforms or opacity can achieve the same result.

Preserve the approved design system and browser normalisation strategy.

Do not introduce arbitrary visual effects as performance workarounds.

## Caching

Caching must reflect the data's ownership, sensitivity and expected freshness.

Public static assets may use long-lived caching when filenames or URLs change when content changes.

Product catalogue and availability data must use appropriate freshness rules.

Authenticated customer, order and financial data must not be exposed through shared public caches.

Cache invalidation must be considered when products, prices, availability or store configuration change.

## Mobile Performance

Mobile performance is a primary requirement.

Test on representative lower-powered devices and constrained network conditions.

Avoid unnecessary background processing.

Reduce large asset downloads.

Ensure that primary actions remain responsive while secondary content loads.

Do not assume that desktop performance results represent mobile performance.

## Build Optimisation

Production builds must use the appropriate production configuration.

Review:

- JavaScript bundle sizes.
- CSS output.
- Duplicate dependencies.
- Source map exposure.
- Unused assets.
- Image sizes.
- Font loading.
- Route chunking.
- Build warnings.

Build warnings must be assessed rather than automatically ignored.

Large bundles must be investigated and justified or improved.

Source maps and debugging output must follow the approved deployment and security policy.

## Performance Testing

Performance testing must include:

- Representative public pages.
- Product listing and detail pages.
- Search and filtering.
- Cart and checkout.
- Administration dashboards.
- Large product and order lists.
- Image-heavy pages.
- Slow network conditions.
- Mobile devices.
- Realistic API response times.

Use both laboratory measurements and production observations where possible.

## Performance Budgets

Define performance budgets for major frontend assets and routes.

Budgets should account for:

- JavaScript transfer size.
- CSS transfer size.
- Image payloads.
- Font payloads.
- Initial request count.
- Main-thread work.
- Page loading performance.

Final numeric budgets must be established from measured application requirements and representative devices.

Do not invent arbitrary limits that conflict with actual product needs.

Budget violations must be reviewed before release.

## Monitoring

Monitor real-user performance where appropriate.

Track changes in Core Web Vitals, frontend errors, API latency and asset delivery.

Identify regressions after deployments.

Performance monitoring must not collect unnecessary personal information.

Store-level performance reporting must distinguish storefront performance from shared backend or provider failures.

## Multi-Store Considerations

Independent storefronts may have different content volumes, imagery and traffic patterns.

Shared platform services must support this variation without allowing one store to create uncontrolled resource consumption for others.

Store-specific performance issues must be distinguishable from shared platform issues.

Performance comparisons must consider traffic, product volume, media usage and other relevant differences.

## Implementation Constraints

The implementation must not:

- Optimise without measuring the problem.
- Load all routes and features unnecessarily.
- Cache sensitive data in public shared caches.
- Download oversized images unnecessarily.
- Block primary interactions behind secondary content.
- Introduce unnecessary dependencies.
- Hide performance regressions by removing monitoring.
- Sacrifice accessibility or security for speed.

## Open Decisions

The following require further technical agreement:

- Per-route asset budgets.
- Approved field-performance monitoring.
- Performance regression thresholds.
- Cache durations by data category.
- Image processing and delivery strategy.
- Supported device and network test profiles.
- Performance ownership and reporting frequency.

## Relationship to Other Documents

This document should be read with:

- `FRONTEND_DEVELOPMENT_GUIDE.md`
- `DEVELOPMENT_STANDARDS.md`
- `TESTING_STRATEGY.md`
- `USER_INTERFACE_AND_MOTION_STANDARDS.md`
- `ACCESSIBILITY_STANDARDS.md`
- `SEO_AND_CRAWLABILITY_STANDARDS.md`
- `ENVIRONMENT_AND_CONFIGURATION_GUIDE.md`
- `docs/architecture/APPLICATION_ARCHITECTURE.md`
- `docs/architecture/DEPLOYMENT_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to shared frontend architecture and performance requirements must be assessed for their effect on all participating storefronts.
