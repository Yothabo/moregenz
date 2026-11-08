# Frontend Development Guide

## Document Control

| Field | Value |
|---|---|
| Document Type | Frontend Development Guide |
| Version | 0.1 |
| Status | DRAFT |
| Last Updated | 2026-11-07 |
| Document Owner | Platform Owner |
| Review Status | Pending |
| Classification | Internal |
| Document ID | DOC-IMP-8CDCA2863E |
| Category | Implementation |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |

## 1. Purpose

This guide defines practical standards for building, maintaining, testing and deploying the platform's frontend applications.

The platform will support independently developed storefronts connected to a shared backend and product catalogue.

Yotaabo is the first storefront and must remain operational throughout the transition to the multi-store architecture.

## 2. Scope

This guide covers:

- Frontend architecture.
- Independent store storefronts.
- Platform administration interfaces.
- Store administration interfaces.
- Shared backend integration.
- Store-specific configuration.
- Product catalogue consumption.
- Authentication and permissions.
- User interface standards.
- Frontend security.
- Testing.
- Deployment.
- Maintenance.

## 3. Frontend Architecture Principles

Frontend applications must:

- Remain separate from backend business logic.
- Consume documented API contracts.
- Treat backend responses as authoritative.
- Keep private credentials out of browser code.
- Respect store context.
- Support accessible and responsive interfaces.
- Handle loading, empty, success and error states.
- Avoid unnecessary dependencies.
- Remain independently deployable where required.

## 4. Independent Storefronts

Each participating store must be able to have its own independently developed frontend.

Storefronts may have different:

- Brand identities.
- Logos.
- Colour systems.
- Typography.
- Product presentation.
- Marketing content.
- Supported page content.
- Visual design.

They connect to the shared backend and catalogue through their store-specific integration configuration.

A separate frontend does not mean a separate database or unrestricted access to other stores.

## 5. Shared Backend Integration

Frontend applications must consume the shared backend through documented APIs.

The backend remains responsible for:

- Authentication.
- Authorisation.
- Store context.
- Product ownership.
- Catalogue availability.
- Pricing rules.
- Inventory.
- Orders.
- Payments.
- Customer data.
- Financial operations.

Do not duplicate authoritative business rules in frontend code.

Frontend validation improves usability but does not replace backend validation.

## 6. Store Configuration

Each storefront must use its assigned store configuration.

Configuration may include:

- Store public identifier.
- API base URL.
- Public publishable keys.
- Storefront branding.
- Allowed domain information.
- Public integration settings.
- Media and catalogue configuration.

The backend must independently verify store context and permissions.

A browser-visible store identifier is not proof of authority.

## 7. Automatic Integration Package

An authorised Platform Super Admin store-creation workflow must automatically provision the store's integration package.

The package is the starting point for frontend development.

It should provide:

- Store-specific public configuration.
- API base URL and version.
- API documentation.
- Catalogue integration instructions.
- Authentication integration guidance.
- Domain and CORS requirements.
- Example environment configuration.
- SDK or starter tooling where supported.
- Development and deployment instructions.

The frontend developer must receive sufficient information to connect the storefront without receiving privileged database or backend credentials.

Provisioning failures must be visible and recoverable.

## 8. Frontend Technology

The existing Yotaabo storefront uses React, TypeScript and Vite.

The future platform should favour technologies that are maintainable, compatible with the existing development environment and appropriate to the application.

Technology changes must be justified and reviewed.

Do not introduce a new frontend framework solely for architectural appearance.

## 9. Application Structure

Frontend code should be organised around clear responsibilities.

Typical areas include:

- Application entry points.
- Routing.
- Layouts.
- Components.
- Pages.
- API clients.
- Authentication.
- Store configuration.
- State management.
- Validation.
- Styling.
- Assets.
- Tests.

Keep reusable components separate from store-specific presentation where this improves maintainability.

Avoid building a single highly coupled frontend that prevents independent store deployments.

## 10. Component Design

Components should have clear responsibilities.

Requirements:

- Prefer reusable components for genuinely shared behaviour.
- Keep complex business logic out of presentation components.
- Use explicit properties and types.
- Handle loading and error states.
- Avoid unnecessary component abstraction.
- Keep accessibility in mind.
- Avoid duplicating components without a reason.

Store-specific visual differences should be handled through supported configuration and frontend implementation.

## 11. Storefront Customisation Boundaries

Stores may have distinct frontend designs.

However, the platform must not assume unrestricted runtime configuration of arbitrary:

- Component positions.
- Page composition.
- Navigation structure.
- Carousel behaviour.
- Application logic.
- Custom executable code.

Any future configuration system must define supported options and validation rules.

Storefront developers remain responsible for their frontend implementation within the platform's API and security boundaries.

## 12. Design System

Frontend applications should use a documented design system appropriate to their brand.

The design system may define:

- Colour tokens.
- Typography.
- Spacing.
- Layout conventions.
- Components.
- Interaction states.
- Responsive breakpoints.
- Accessibility requirements.

For Yotaabo, preserve its explicitly approved brand and design decisions.

Do not silently replace approved design values during unrelated development work.

## 13. Routing and Navigation

Frontend routing must:

- Use clear route structures.
- Protect administrative routes.
- Handle unauthorised access.
- Handle missing routes.
- Preserve appropriate navigation state.
- Avoid exposing restricted data through route parameters.
- Support the storefront's deployment configuration.

Route protection is a user-interface measure, not a substitute for backend authorisation.

## 14. API Client Development

Use a centralised API client where appropriate.

The API client should handle:

- Base URL configuration.
- Authentication headers.
- Request serialization.
- Response parsing.
- Error handling.
- Timeouts.
- Safe retries.
- Request cancellation where appropriate.

Do not scatter hard-coded API URLs or credentials throughout components.

Use the API contracts and generated integration package as authoritative references.

## 15. Authentication and Session Handling

Frontend applications must integrate with the approved authentication mechanism.

They should:

- Handle sign-in and sign-out.
- Manage session state.
- Handle expired sessions.
- Respond to revoked access.
- Avoid storing privileged credentials.
- Protect sensitive information from unnecessary browser exposure.

The backend must verify the current account, membership and permission state.

Do not treat cached frontend roles as authoritative.

## 16. Authorisation and User Interfaces

The frontend may show or hide actions according to the user's permissions.

However:

- The backend must enforce every protected operation.
- Users must not gain access by modifying browser state.
- Administrative interfaces must respect store boundaries.
- Platform administration must remain separate from store administration.
- Employee interfaces must reflect delegated permissions.

Test direct API access independently of the user interface.

## 17. Product Catalogue Integration

Storefronts consume catalogue data through the shared backend.

They must respect:

- Product ownership.
- Store availability.
- Product publication status.
- Store-specific pricing.
- Product variants.
- Media references.
- Descriptive information.
- Catalogue visibility rules.

A storefront must not assume every product in the shared catalogue is available to its store.

## 18. Inventory and Availability

Storefronts should display availability based on authoritative backend responses.

The frontend must not independently maintain authoritative stock quantities.

Availability may change between product display and checkout.

The backend must revalidate stock during consequential commerce operations.

## 19. Cart and Checkout

Cart and checkout interfaces must use authoritative backend pricing and validation.

The frontend must not be trusted to determine:

- Final order totals.
- Discount eligibility.
- Payment success.
- Stock reservation.
- Order completion.
- Refund eligibility.

Handle expired prices, unavailable items, payment failures and interrupted sessions clearly.

## 20. Customer Data and Privacy

Frontend applications must collect and display only the customer information needed for their purpose.

Requirements:

- Avoid unnecessary personal information.
- Protect authenticated customer views.
- Do not expose another customer's records.
- Respect communication preferences.
- Avoid storing sensitive information unnecessarily.
- Handle logout and session expiry correctly.
- Support applicable privacy and data-rights workflows.

## 21. File and Media Handling

Frontend uploads must use approved backend or storage workflows.

The frontend should enforce reasonable file-size and type restrictions for usability, while the backend performs authoritative validation.

Do not assume that a file is safe because the browser accepts its extension or MIME type.

Private media must not be exposed through unrestricted public URLs.

## 22. Error and Loading States

Every data-dependent interface should account for:

- Initial loading.
- Empty results.
- Successful operations.
- Validation errors.
- Permission failures.
- Network failures.
- Backend errors.
- Expired sessions.
- Unavailable integrations.

Error messages should be understandable without exposing internal implementation details.

## 23. Responsive Design and Accessibility

Frontend applications should work across supported mobile, tablet and desktop screen sizes.

Interfaces should consider:

- Readable typography.
- Keyboard navigation.
- Visible focus states.
- Appropriate colour contrast.
- Accessible labels.
- Meaningful error messages.
- Touch target sizes.
- Responsive layouts.

Accessibility must be considered during component development rather than added only at release time.

## 24. Frontend Security

Frontend code and configuration must be treated as publicly inspectable.

Never include:

- Database passwords.
- Supabase service-role keys.
- Private signing secrets.
- Payment provider secret keys.
- Backend administrative tokens.
- Unrestricted storage credentials.
- Private integration credentials.

Avoid unsafe rendering of untrusted content.

Do not store sensitive customer or payment information in browser storage without an approved security design.

## 25. Performance

Frontend applications should minimise unnecessary resource usage.

Consider:

- Bundle size.
- Code splitting.
- Image optimisation.
- Lazy loading.
- Caching.
- API request frequency.
- Rendering performance.
- Unnecessary dependencies.
- Mobile network conditions.

Performance optimisation must not compromise data freshness, security or business correctness.

## 26. Frontend Testing

Test:

- Page rendering.
- Component behaviour.
- Navigation.
- Form validation.
- API integration.
- Authentication.
- Permission-dependent interfaces.
- Store configuration.
- Product catalogue display.
- Cart and checkout workflows.
- Error handling.
- Responsive behaviour.
- Accessibility.

Test unauthorised and cross-store scenarios, not only successful user journeys.

## 27. Frontend Deployment

Each independently developed storefront should be deployable using its own approved hosting and domain configuration.

Deployment must use the correct:

- Environment.
- API base URL.
- Store identifier.
- Public configuration.
- Domain.
- CORS settings.
- Build configuration.

Production builds must not contain private secrets.

A frontend deployment must not require a separate backend or database unless formally approved.

## 28. Frontend Monitoring

Monitor relevant frontend behaviour, including:

- Application availability.
- JavaScript errors.
- Failed API requests.
- Authentication failures.
- Page performance.
- Checkout failures.
- Deployment regressions.

Monitoring must avoid collecting unnecessary personal or sensitive information.

## 29. Developer Handover

A frontend developer handover should include:

- Store identity and approved branding.
- Generated integration package.
- API documentation.
- Public configuration.
- Development instructions.
- Domain and deployment requirements.
- Testing expectations.
- Known limitations.
- Support and escalation contacts.

Privileged backend credentials must never be included in the handover.

## 30. Frontend Completion Criteria

A frontend is ready for release review when:

- It uses the correct store configuration.
- API contracts are followed.
- No private credentials are exposed.
- Backend authorisation is respected.
- Store isolation is verified.
- Core customer workflows are tested.
- Error and loading states are implemented.
- Responsive behaviour is checked.
- Deployment configuration is verified.
- Documentation and handover are complete.

## 31. Open Frontend Development Decisions

The following remain subject to formal definition:

- Standard frontend starter template.
- Shared component library strategy.
- Storefront configuration schema.
- Frontend hosting provider.
- Automated domain provisioning.
- Standard API client package.
- Authentication client implementation.
- Frontend monitoring provider.
- Supported browser matrix.
- Accessibility acceptance criteria.

## 32. Relationship to Other Documents

This guide must be read alongside:

- FRONTEND_DEVELOPER_GUIDE.md
- API_DEVELOPMENT_GUIDE.md
- API_ARCHITECTURE.md
- APPLICATION_ARCHITECTURE.md
- PRODUCT_CATALOGUE_ARCHITECTURE.md
- STORE_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- IDENTITY_AND_ACCESS.md
- DEVELOPMENT_STANDARDS.md
- ENVIRONMENT_AND_CONFIGURATION_GUIDE.md
- LOCAL_DEVELOPMENT_GUIDE.md
- TESTING_STRATEGY.md
- DEPLOYMENT_ARCHITECTURE.md
- IMPLEMENTATION_ROADMAP.md

## 33. Document Management

This guide remains a draft until reviewed and approved through the applicable governance process.

Changes must be version-controlled and communicated to relevant frontend developers.
