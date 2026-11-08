# AI-First SEO, Search and Agent-Ready Commerce Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-DES-01BC3F8C44 |
| Category | Design |
| Version | Not recorded |
| Approving Authority | Not recorded |
| Creation Date | Not recorded |
| Last Revision Date | Not recorded |
| Effective Date | Not recorded |
| Review Date | Not recorded |


**Document type:** Search, discoverability and technical architecture standard
**Applies to:** Parent company, developers, SEO specialists, content team, creative team and participating stores
**Status:** Proposed technical and design standard
**Owner:** Parent company
**Review cycle:** Every six months, or when search and AI discovery capabilities materially change

---

## 1. Purpose

The parent company must build its platform for a future in which customers increasingly discover, research, compare and interact with businesses through AI assistants and automated agents rather than visiting websites directly.

Customers may ask systems such as ChatGPT and other AI assistants to:

- Find products that meet specific requirements.
- Discover businesses and stores.
- Compare prices and product features.
- Check product availability.
- Understand delivery and returns policies.
- Find suitable alternatives.
- Research a brand before purchasing.
- Navigate to a store or product.
- Complete supported shopping and service workflows.

The platform must therefore be designed for both traditional search engines and AI-assisted discovery.

This approach is called AI-first discoverability or agent-ready commerce.

It does not mean abandoning conventional SEO, website usability or browser-based shopping. It means ensuring that the platform's information is structured, accessible, accurate and understandable to both people and machines.

## 2. Core principle

The platform must not depend exclusively on a human visitor navigating a sequence of web pages to understand a store or its products.

Important business and product information should be available in clear, machine-readable and consistently maintained forms.

The objective is to make participating stores easier to:

- Discover.
- Understand.
- Verify.
- Compare.
- Reference.
- Access through supported integrations.
- Transact with through supported commerce capabilities.

The parent company must maintain a distinction between information that is publicly discoverable and information that requires authentication or explicit permission.

## 3. Dual discoverability strategy

The platform must support two complementary discovery environments.

### 3.1 Traditional search

Traditional SEO remains important.

The platform should support:

- Search-engine crawlability.
- Descriptive page titles.
- Useful meta descriptions.
- Semantic HTML.
- Search-friendly URLs.
- XML sitemaps.
- Canonical URLs.
- Structured data.
- Internal linking.
- Image optimisation.
- Mobile usability.
- Fast page delivery.
- Relevant and useful content.

### 3.2 AI-assisted discovery

AI assistants and other machine-driven discovery systems may use different combinations of:

- Search-engine indexes.
- Direct website crawling.
- Structured data.
- Public feeds.
- APIs.
- Merchant or product data sources.
- Third-party integrations.
- User-provided links and documents.
- Other permitted information retrieval mechanisms.

The platform should provide accurate, accessible information through the appropriate supported mechanisms.

Do not assume that every AI assistant uses the same crawler, index, data source or technical requirements.

## 4. AI-readable business and store identity

Each store must have a clear and consistent public identity.

Where applicable, publicly accessible store pages should communicate:

- Store name.
- Parent-company relationship where relevant.
- Store description.
- Product categories.
- Brand identity.
- Business contact channels.
- Geographic service area.
- Delivery coverage.
- Operating information where relevant.
- Customer service policies.
- Relevant legal and business information.

The parent company's identity must not be confused with the identity of an individual Store Owner's brand.

Each store should have its own canonical public identity and page structure.

The platform should maintain consistent business information across storefront pages, metadata and supported structured-data representations.

## 5. Product information architecture

Product information must be structured consistently so that search systems and AI assistants can understand what is being sold.

Each product should have appropriate fields, including:

- Product name.
- Product description.
- Brand.
- Product category.
- Product type.
- Product identifier or SKU where applicable.
- Images.
- Available variants.
- Size, colour or other relevant attributes.
- Price.
- Currency.
- Availability.
- Stock status where appropriate.
- Product condition where relevant.
- Delivery information where applicable.
- Return and refund information.
- Relevant product specifications.

Product descriptions must explain the actual product clearly.

Avoid vague descriptions that depend on visual interpretation alone.

Important product details should not exist only inside images, promotional banners or inaccessible scripts.

## 6. Structured data

The platform should implement relevant Schema.org structured data using JSON-LD where appropriate.

Potential structured-data types include:

| Type | Purpose |
|---|---|
| Organization | Parent-company identity |
| OnlineStore or Store | Store identity and relevant business information |
| Product | Product identity and attributes |
| Offer | Price, currency and availability |
| AggregateRating | Genuine aggregate ratings where eligible |
| Review | Genuine and permitted customer reviews |
| BreadcrumbList | Page hierarchy |
| WebSite | Website identity |
| WebPage | Individual page information |
| Article | Relevant editorial content |
| VideoObject | Video information where applicable |

The exact schema type must be selected according to the actual entity and supported vocabulary.

Structured data must:

- Describe content visible or meaningfully represented on the page.
- Reflect accurate current information.
- Avoid fabricated ratings, reviews and claims.
- Avoid misleading availability or pricing.
- Be validated during implementation.
- Be updated when relevant underlying information changes.

Structured data is a machine-readable description of the page. It does not guarantee search ranking, rich results or AI recommendations.

## 7. Public information and authenticated information

The platform must clearly separate public discovery information from private customer and operational information.

### 7.1 Public information

Where authorised, publicly accessible information may include:

- Store descriptions.
- Product information.
- Published prices.
- Public stock availability.
- Public policies.
- Public contact information.
- Public promotional content.
- Public product categories.

### 7.2 Restricted information

The following must not be exposed through public pages, search indexes, AI-readable feeds or unauthenticated APIs:

- Customer personal information.
- Private customer accounts.
- Private order histories.
- Internal store sales records.
- Private inventory or supplier information.
- Payment details.
- Authentication credentials.
- Internal administration functions.
- Private Store Owner communications.
- Unpublished products or campaigns.
- Internal financial and performance reports.

AI discoverability must never become a reason to weaken authentication or data protection.

## 8. Crawlability and rendering

Important public content must be accessible to supported crawlers without requiring unnecessary client-side interaction.

The development team should evaluate:

- Server-side rendering or static generation where appropriate.
- Reliable HTML delivery.
- Semantic page structure.
- Internal link accessibility.
- JavaScript-dependent content.
- Crawl directives.
- Canonical URL behaviour.
- Redirect behaviour.
- Sitemap generation.
- Robots.txt configuration.

A product page should communicate its important information in the delivered page content, rather than relying entirely on interactions that a crawler may not execute.

The architecture should be evaluated against actual crawler behaviour and the technical requirements of relevant search and AI services.

Do not assume that all crawlers execute JavaScript in the same way.

## 9. Search and AI crawler access policy

The parent company must maintain a documented crawler-access policy.

The policy should identify:

- Which public content may be crawled.
- Which directories and endpoints must remain restricted.
- Which crawler categories are permitted.
- Whether specific AI crawlers are allowed or disallowed.
- How crawler access is monitored.
- How changes are reviewed.

Robots.txt may be used to communicate crawl preferences and restrictions, but it is not an authentication or security mechanism.

Sensitive endpoints must remain protected through actual access controls.

The team must distinguish between:

- Search-engine crawlers.
- AI training crawlers.
- AI search and retrieval crawlers.
- Other automated agents.
- Unidentified or malicious bots.

Where a service publishes crawler documentation and user-agent information, the team should consult its current official documentation before changing access rules.

Crawler access must be reviewed periodically because service behaviour and user-agent policies can change.

## 10. Product feeds and machine-readable commerce data

As the platform matures, the parent company should provide structured product data through suitable public feeds or authorised integrations.

Potential future capabilities include:

- Product catalogues.
- Product feeds.
- Availability feeds.
- Price feeds.
- Product variant data.
- Store identity feeds.
- Delivery and returns information.
- Product update timestamps.

Any feed must have clear ownership, update frequency, access policy and data-quality requirements.

Product data exposed through a feed must remain consistent with the authoritative product records in the platform.

A feed must not expose private store information or private customer data.

## 11. Agent-ready commerce architecture

The platform should be designed so that future AI agents and commerce integrations can interact with supported commerce functions through controlled interfaces.

Potential future capabilities include:

- Product discovery.
- Product search and filtering.
- Product comparison.
- Variant and stock availability checks.
- Store policy retrieval.
- Cart creation.
- Checkout initiation.
- Order status retrieval.
- Customer support workflows.

These capabilities must only be introduced when the relevant backend workflows, security controls and business processes are implemented.

The platform must not expose administrative operations or unrestricted database access to external agents.

### 11.1 Controlled interfaces

Future integrations should use documented APIs or approved protocols with:

- Authentication where required.
- Authorisation and scope restrictions.
- Rate limits.
- Input validation.
- Audit logging.
- Data minimisation.
- Error handling.
- Explicit transaction confirmation.
- Idempotency where appropriate.
- Protection against duplicate orders and payments.

### 11.2 Human confirmation and transaction authority

An AI agent must not be assumed to have authority to purchase, cancel, refund or change an order merely because it can read product information.

Any future transaction workflow must define:

- Who authorises the action.
- What the customer has agreed to.
- How price and availability are confirmed.
- How payment is authorised.
- How the order is created.
- How the customer receives confirmation.
- How errors and disputes are handled.

The platform must preserve clear customer consent and transaction records.

## 12. Content strategy for AI-assisted discovery

Content should be written to answer genuine customer questions clearly.

The content team should prioritise:

- Accurate product descriptions.
- Specific product attributes.
- Clear category descriptions.
- Useful buying guides.
- Product comparisons based on real specifications.
- Clear delivery and returns information.
- Genuine frequently asked questions.
- Store and brand information.
- Clear contact and customer support information.

Content should use natural language and explain concepts directly.

Avoid:

- Keyword stuffing.
- Repetitive generic content.
- Fabricated expertise.
- Fake reviews.
- Unsupported product claims.
- Automatically generated pages with little useful information.
- Duplicate pages created only to target search terms.
- Misleading AI-generated product descriptions.

The purpose is to create information that is genuinely useful to customers and understandable to retrieval systems.

## 13. Accuracy and information freshness

AI-assisted discovery is only useful when the underlying information is accurate.

The platform should treat important commerce data as time-sensitive.

Examples include:

- Product price.
- Product availability.
- Stock status.
- Product variants.
- Delivery estimates.
- Promotions.
- Store policies.
- Product discontinuation.

Where possible, public product information and structured data should be generated from authoritative platform records rather than manually duplicated in multiple locations.

Important records should maintain appropriate timestamps or update information.

The platform must not present stale availability or pricing as guaranteed current information.

For transactions, the backend must verify the latest authoritative price and availability before accepting the order.

## 14. AI visibility and performance measurement

The parent company should measure traditional search performance and AI-assisted discovery separately where reliable data is available.

Potential measures include:

### Traditional search

- Indexed pages.
- Organic impressions.
- Organic clicks.
- Search queries.
- Search position.
- Organic product visits.
- Conversion rate.
- Technical SEO errors.

### AI-assisted discovery

- Verified referral traffic from AI services.
- AI-referred product visits.
- AI-referred enquiries.
- AI-referred conversions where measurable.
- Product information accuracy.
- Structured-data validity.
- Public feed availability and freshness.
- Integration usage where supported.

The team must distinguish verified referral traffic from assumptions about AI visibility.

Do not claim that a store is recommended by an AI platform without reliable evidence.

## 15. Open Graph and social-sharing compatibility

Public store, product and campaign pages should provide suitable sharing metadata.

Where appropriate, implement:

- Open Graph title.
- Open Graph description.
- Open Graph image.
- Canonical URL.
- Relevant social-sharing metadata.

The OG Image Gallery may be used as a visual reference source.

Open Graph images should follow the platform's actual image-generation and delivery requirements.

Sharing metadata must accurately represent the destination page.

## 16. Accessibility and machine readability

Accessibility and machine readability should be considered together.

The platform should use:

- Semantic HTML.
- Descriptive headings.
- Meaningful link text.
- Accessible form labels.
- Appropriate alternative text.
- Captions or transcripts for relevant video content.
- Clear status messages.
- Logical document structure.
- Keyboard-accessible interactions.

Important information must not be communicated through colour or imagery alone.

The platform should remain usable for people who rely on assistive technologies as well as systems that interpret page structure.

## 17. Relationship with design and development guidelines

AI-first discoverability is a cross-functional requirement.

### Design

Designers must ensure that important information is visible, understandable and logically organised.

### Development

Developers must ensure that public content is accessible, structured, performant and supported by reliable data sources.

### SEO and content

The SEO and content function must ensure that product, store and editorial information is accurate, useful and properly structured.

### Creative production

Photography and video must accurately represent products and include appropriate metadata and descriptive information where required.

### Platform governance

The parent company must protect private information and control which data is exposed to external systems.

## 18. Implementation priorities

The following phased approach is recommended.

### Phase 1: Foundation

- Ensure public storefront pages have descriptive metadata.
- Establish canonical URLs.
- Generate and maintain XML sitemaps.
- Configure robots.txt correctly.
- Use semantic HTML.
- Improve product descriptions and category information.
- Implement appropriate structured data.
- Ensure mobile performance and accessibility.
- Establish Open Graph metadata.

### Phase 2: Data consistency

- Generate structured product information from authoritative records.
- Validate product prices and availability.
- Establish consistent store identity information.
- Improve content freshness.
- Review crawler access.
- Implement monitoring for technical SEO errors.

### Phase 3: Machine-readable commerce

- Evaluate product feeds.
- Document public product-data endpoints.
- Establish authorised integration patterns.
- Define agent access and security policies.
- Test product discovery and information retrieval.

### Phase 4: Agent-assisted transactions

- Evaluate supported AI commerce integrations.
- Introduce controlled product and availability APIs.
- Implement secure cart and checkout workflows.
- Establish explicit transaction authorisation.
- Test order confirmation, reconciliation and support processes.

Later phases must not be treated as implemented capabilities until they have passed development, security and operational review.

## 19. Compliance and privacy

AI discoverability does not override applicable legal obligations.

The parent company must consider:

- POPIA.
- Applicable consumer-protection requirements.
- Electronic communications requirements.
- Intellectual property rights.
- Copyright and licensing.
- Advertising and product-claim requirements.
- Applicable payment and transaction obligations.

Customer data must not be disclosed to AI providers or external agents without an appropriate lawful basis, permissions and safeguards.

Public product information and private customer information must remain separate.

## 20. Final standard

The parent company will build for a world in which customers increasingly use AI assistants and automated systems to discover and interact with businesses.

The platform must therefore be understandable to search engines, AI retrieval systems and authorised commerce agents, while remaining useful and accessible to human customers.

The objective is not to optimise for a single AI provider or depend on a particular model.

The objective is to create accurate, structured, accessible and secure business information that can be discovered and used through current and future digital channels.

Traditional SEO remains part of the strategy. AI-first discoverability extends that strategy into an increasingly agent-assisted internet.
