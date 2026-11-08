# User Interface and Motion Standards

## Document Control

| Field | Value |
|---|---|
| Document ID | DOC-IMP-C63B3BBCD9 |
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

This document defines the visual design, typography, layout, interaction and motion standards for the platform and its participating storefronts.

It establishes a consistent interface quality baseline across independently developed frontends while allowing each store to maintain its approved brand identity.

## Scope

These standards apply to:

- Platform administration interfaces.
- Store administration interfaces.
- Store employee interfaces.
- Public storefronts.
- Shared interface components.
- Interactive controls and navigation.
- Responsive layouts.
- Transitions, animations and motion feedback.

They apply to new development, redesigns, component changes and frontend migrations.

## Design Principles

Interfaces must be clear, restrained, consistent and functional.

Visual decoration must not compete with the content or the user's primary task.

The interface should communicate hierarchy through typography, spacing, alignment and composition rather than excessive visual effects.

Store branding may differ, but usability, accessibility, interaction behaviour and implementation quality must remain consistent.

Avoid introducing visual complexity without a clear functional reason.

## Visual Restrictions

The following are design restrictions unless an explicit design decision approves an exception.

### Tags and pills

Do not use tags, pills or badge-like elements excessively.

Use them only when they communicate meaningful information such as a status, category or compact classification.

Do not turn ordinary labels, navigation items or headings into decorative pills.

### Italics

Avoid excessive italic text.

Use italics sparingly when emphasis or a specific content convention requires it.

Do not use italics as a substitute for visual hierarchy.

### Typography

Instrument Serif is not an approved default typeface.

Use the typography defined by the applicable design system. Existing approved typography decisions remain authoritative.

For the Yotaabo design system, Anton is the approved heading and title font. This does not automatically apply to body text.

Typography must remain readable across screen sizes and supported devices.

### Letter spacing and kerning

Avoid negative kerning and aggressively compressed letter spacing.

Text must remain readable at normal viewing sizes. Typography adjustments must not cause letters to collide or reduce legibility.

### Interface detail

Avoid over-the-top detailed UI.

Do not add controls, labels, icons, decorative elements or secondary information that do not help users complete a task.

Prefer the simplest interface that communicates the necessary information.

### Colour and opacity

Do not introduce arbitrary colour shades or opacity variations.

Use only colours and states approved by the applicable design system.

Opacity may be used where appropriate without creating new colour identities or disguising unapproved shades.

For Yotaabo, retain the explicitly approved His, Hers and Spaces category colours, charcoal action colours, and approved amber, green and red status colours. Do not introduce additional palette groups without approval.

### Borders and containers

Avoid unnecessary bordered containers.

Do not place every section, statistic, form field or content group inside a separate bordered box.

Use spacing, alignment and restrained background treatment to establish grouping.

Borders should communicate a real boundary or interaction state.

### Diagrams and illustrations

Avoid overly detailed diagrams when a simpler representation communicates the same information.

Do not use ASCII images or decorative text-based artwork in interfaces or documentation visuals.

Diagrams must serve a clear explanatory or operational purpose.

### Dividers

Avoid excessive horizontal and vertical dividers.

Use spacing and layout hierarchy before adding separator lines.

Add dividers only where they improve scanning or distinguish meaningful content groups.

### Layout and shape

Avoid excessive use of squircles and heavily rounded containers.

Use consistent corner radii according to the design system.

Do not introduce decorative gradients as background treatments.

Use solid approved surfaces and colours unless a specific design decision authorises a gradient.

### Monospaced typography

Do not use monospaced fonts for ordinary interface content.

Reserve monospaced typography for code, technical identifiers, terminal output and content where fixed-width alignment is useful.

### Headings and titles

Avoid all-caps subtitles.

Use natural title case or sentence case according to the content.

Do not place full stops at the end of titles or headings.

Avoid decorative eyebrow labels above headings unless they provide meaningful context.

Do not use section numbering as a default visual design pattern. Numbering may remain appropriate in technical documentation, procedures and ordered instructions.

### Text quality

Avoid verbose and redundant interface text.

Use concise labels, clear instructions and meaningful feedback.

Do not repeat information already visible elsewhere in the same interface.

### Code breadcrumbs

Do not expose internal code breadcrumbs, component paths or implementation references in ordinary user-facing interfaces.

Developer tools and technical documentation may display these details when necessary.

### Visual effects

Avoid dithering and other decorative rendering effects unless a specific design requires them.

Do not use visual effects merely to make an interface appear more complex or futuristic.

## Background and Surface Consistency

Avoid decorative AI-style visual treatments, including:

- Artificially glowing or highlighted card corners.
- Decorative corner gradients and colour flares.
- Glass-like surfaces used without a functional reason.
- Unrequested background effects behind cards or sections.
- Dramatic or gloomy backgrounds introduced only for visual impact.
- Arbitrary contrasting backgrounds that make components appear disconnected from the established design.

Cards, panels, sections and other surfaces must use the backgrounds defined by the applicable design system.

Once a background has been approved for a component, asset or surface, preserve it consistently across the application. Do not introduce alternative backgrounds during implementation, component reuse or redesign without an approved design change.

Do not give a card a different visual identity from its surrounding interface through unnecessary background treatments.

Background changes must be intentional, documented and consistent with the approved design tokens.

## Browser Defaults and Styling Control

Browser defaults must not determine the platform's visual identity.

The frontend must establish a controlled and consistent styling baseline rather than relying on user-agent defaults for presentation.

This includes explicit control over:

- Font families, font sizes and font weights.
- Line height and text spacing.
- Heading and paragraph margins.
- Element spacing and sizing.
- Button and form-control appearance.
- Input borders, backgrounds and focus states.
- Lists, tables and other common HTML elements.
- Default control dimensions and alignment.
- Responsive behaviour and layout rules.

Use an intentional CSS reset or normalisation strategy as part of the shared frontend foundation.

Do not allow inconsistent browser defaults to create different typography, spacing, form appearance or component dimensions across pages.

## Centralised Styling and Customisation

Visual properties must remain configurable through the approved design system.

Do not hard-code presentation decisions throughout individual components when they should be controlled centrally.

Use shared design tokens, theme configuration, CSS variables and reusable component styles where appropriate.

The implementation must allow approved changes to typography, spacing, line height, colours, backgrounds, borders, radii and interaction states without requiring unrelated component rewrites.

TypeScript types and component interfaces must not unnecessarily lock presentation values into fixed, unchangeable defaults.

Components should expose intentional configuration points while retaining sensible shared defaults.

A component's default appearance must not prevent the design system from overriding it.

Preserve semantic HTML, native functionality, keyboard interaction and accessibility when customising browser controls. Custom styling must not remove essential browser behaviour or accessibility feedback.

The objective is a predictable visual baseline that remains centrally governable and consistently customisable across independently developed storefronts.

## Layout and Composition

Use consistent spacing, alignment and content widths.

Maintain a clear hierarchy between page titles, section headings, primary actions, supporting information and secondary actions.

Keep related information together without wrapping every group in a container.

Use responsive layouts that preserve content hierarchy on mobile and desktop.

Do not create separate layout systems for components that serve the same purpose.

When a component changes state, preserve its established layout wherever practical.

Use the same layout structure when transitioning between related states. Avoid unnecessary layout replacement, movement or resizing.

## Interaction Standards

Interactions must be predictable and provide clear feedback.

Controls must communicate their purpose and current state.

Primary actions must remain visually distinguishable from secondary actions.

Disabled, loading, success, warning and error states must be understandable without relying on colour alone.

Do not use animation as a substitute for meaningful status text or accessible feedback.

## Motion Principles

Motion must support comprehension, continuity and feedback.

Use motion sparingly. It must not delay task completion or distract from the content.

Animations must respect reduced-motion preferences and must not be essential to understanding or operating the interface.

Every animation must have a clear purpose.

## Entrance and Exit Behaviour

Use ease-out timing for entrance animations.

Use ease-in-out timing for movements between established states.

Exit animations should generally be approximately 20 percent shorter than their corresponding entrance animations.

Where practical, overlap outgoing and incoming states to avoid abrupt visual gaps.

Preserve continuity between the old and new states rather than unnecessarily removing one interface before showing the next.

## Dropdowns and Popovers

Dropdown opening and closing transitions should generally fall within 150–250 milliseconds.

Popovers should begin at approximately 0.95 scale and settle into their normal scale.

A popover should appear to originate from its triggering control.

When closing, it should visually return towards that trigger.

The positioning, origin and exit direction must remain consistent with the trigger's location.

Avoid bounce effects on ordinary dropdowns and popovers.

## List and Content Transitions

When list rows enter together, use a stagger interval of approximately 30 milliseconds.

Staggering must remain subtle and should not make large lists noticeably slower to display.

As content details settle, stagger related elements only where this improves visual comprehension.

Do not animate every item independently without a clear reason.

## Press and Drag Behaviour

Interactive controls may scale to approximately 0.97 during a press interaction.

The pressed state must remain responsive and must not interfere with touch accuracy.

Do not run an automatic tween while a user is actively holding or dragging a control.

Moving knobs and handles may stretch by approximately 12 percent during movement when the control benefits from elastic visual feedback.

The movement must remain controlled and must not distort the control's function.

## Object Movement

Use curved motion paths or arcs when an object is visibly moving between positions and a direct path would feel unnatural.

Use ease-in-out timing for established movement between positions.

Do not introduce unnecessary movement into ordinary controls.

## Success and Confirmation Feedback

A subtle pulse may be used to confirm a successful action.

Success feedback must not rely on animation alone.

The interface must also communicate the result through an appropriate status, message or state change.

Avoid continuous pulsing or repeated attention-grabbing effects after the action has completed.

## Reveals and Colour Transitions

Use masks where they provide a clear and useful reveal effect or controlled colour transition.

Icon transitions may use crossfading and subtle blur to avoid abrupt changes.

Do not apply blur to text or essential information in a way that reduces readability.

Transitions must preserve the meaning and identity of the control.

## Bounds and Elastic Motion

Rubber-band movement beyond normal bounds may be used for deliberate gesture-based interactions where it communicates a boundary.

It must remain controlled and return predictably to the valid range.

Do not use elastic overshoot or bounce for everyday buttons, dropdowns, navigation or routine state changes.

## Reuse and Consistency

Reuse the same layout for related interface states wherever practical.

Use consistent animation behaviour for components that perform the same interaction.

Shared components should not implement different motion patterns without a documented reason.

Do not introduce multiple competing transition systems for the same type of control.

## Timing and Performance

The timing values in this document are design guidelines, not mandatory durations for every interaction.

Adjust timing according to the distance travelled, complexity of the transition, device performance and user interaction.

Animations must remain smooth on supported mobile devices.

Avoid unnecessary JavaScript-driven animation when a simpler implementation is sufficient.

Avoid animating expensive layout properties when transforms or opacity can achieve the intended result.

## Accessibility

Respect operating-system and browser reduced-motion preferences.

Provide a reduced-motion alternative for non-essential movement.

Do not communicate success, failure, selection or other essential states through motion alone.

Maintain keyboard accessibility, visible focus states and screen-reader-compatible state changes.

Ensure that animations do not prevent users from interacting with controls or reading important content.

## Storefront Branding

Each store may use its approved brand colours, typography and visual identity.

Store-specific styling must not undermine the shared usability and accessibility standards.

A store's frontend may differ visually from another store's frontend while using the same shared backend and business capabilities.

Do not allow unrestricted visual configuration to create inconsistent or inaccessible interfaces.

## Standard Interface States

Every page and reusable component must account for its relevant interface states. A page must not be designed only for its successful, populated state.

### Empty states

An empty state appears when a valid request returns no records or when a feature has no content yet.

Empty states must distinguish between:

- No records have been created.
- No results match the current search.
- No results match the selected filters.
- No activity has occurred yet.
- A feature is available but has not been configured.
- The user has no records within their authorised scope.

Each empty state should explain what is absent and provide an appropriate next action when one exists.

Do not display fabricated statistics, sample records or misleading zero values to make an empty page look populated.

### Loading states

Loading states must communicate that an operation is in progress.

Use consistent loading indicators and skeleton treatments where they improve the experience.

Skeletons should reflect the approximate structure of the content being loaded. Avoid decorative skeletons that introduce unnecessary visual complexity.

Prevent duplicate submissions while an operation is processing.

### Error states

Error states must distinguish temporary failures from permanent restrictions and unavailable resources.

Provide a retry action only when retrying is safe.

Do not present an error as an empty state or show stale information as current without making its status clear.

### Success states

Successful operations must provide clear confirmation.

Use inline feedback, status messages or appropriately designed notifications according to the importance of the operation.

Do not rely only on colour, animation or disappearing messages to communicate success.

### Not-found states

Provide a consistent not-found experience for invalid routes and unavailable resources.

The page should explain that the requested resource could not be found and provide a useful route back to the relevant page or storefront.

Do not expose internal route structures, database identifiers or technical exceptions.

A not-found page must remain visually consistent with the relevant platform or store identity.

### Confirmation states

Require confirmation before destructive or materially consequential actions.

Examples include permanent deletion, irreversible changes, store suspension, access revocation and financial operations where confirmation is required by the applicable approval policy.

Confirmation content must clearly identify the action and its consequence.

Do not use confirmation dialogs for ordinary reversible navigation or low-risk actions.

Where an operation requires additional authority, confirmation must not substitute for backend authorisation or approval.

### Modal and dialog standards

Modals and dialogs must have a clear purpose and a consistent layout.

They must provide:

- A descriptive title.
- A concise explanation where needed.
- A clearly identifiable primary action.
- An appropriate secondary or cancellation action.
- A visible close mechanism where applicable.
- Keyboard and screen-reader accessibility.
- Correct focus management and focus restoration.

Destructive actions must be visually distinguishable without relying on colour alone.

Prevent accidental repeated submissions while an action is processing.

Do not close a dialog in a way that falsely implies an operation succeeded. If the operation is asynchronous, communicate its actual state.

Use dialogs sparingly. Do not turn ordinary page content or every small interaction into a modal.

### Statistics and dashboard states

Statistics must have consistent presentation, formatting and meaning across the platform.

Every statistic must have a defined source, period, calculation and relevant scope.

Distinguish between:

- A genuine zero value.
- Data that has not yet been collected.
- Data that is unavailable.
- Data that is still loading.
- Data that the current user is not authorised to view.
- Data that is incomplete or delayed.

Do not display unavailable data as zero.

Do not invent performance figures or substitute sample values in production.

Where a statistic depends on a date range, currency, store or comparison period, make that context clear.

Dashboard cards must retain consistent dimensions, typography, spacing and background treatment across equivalent states.

Empty statistics must not introduce unrelated colours, decorative gradients or alternative card backgrounds.

### State consistency

Shared components must use consistent state behaviour throughout the platform.

A loading, empty, error, success, confirmation or not-found state must not receive a completely different visual treatment on each page without an approved reason.

State transitions must preserve layout stability wherever practical.

## Design Review Checklist

Before accepting a new or changed interface, review the following:

- [ ] Typography follows the approved design system.
- [ ] Colour usage follows approved palette rules.
- [ ] Tags and pills are used only when meaningful.
- [ ] Italics and all-caps subtitles are not excessive.
- [ ] Letter spacing remains readable.
- [ ] Containers and borders are used only where necessary.
- [ ] Dividers are not excessive.
- [ ] No unnecessary gradients or decorative effects are present.
- [ ] Layout hierarchy is clear.
- [ ] Text is concise and non-redundant.
- [ ] No internal code breadcrumbs appear in ordinary user-facing interfaces.
- [ ] Motion has a clear functional purpose.
- [ ] Entrance and exit behaviour is consistent.
- [ ] Dropdowns and popovers behave predictably.
- [ ] Press and drag interactions remain responsive.
- [ ] No bounce is used for everyday UI.
- [ ] Related states reuse consistent layouts.
- [ ] Reduced-motion preferences are respected.
- [ ] Mobile and desktop layouts remain usable.
- [ ] Keyboard and screen-reader interaction is supported.

## Exceptions

An exception must identify the interface, the reason for the exception and the expected user benefit.

Exceptions must not bypass accessibility, security or usability requirements.

Approved exceptions must be recorded and reviewed when the affected interface changes.

## Open Decisions

The following details may require further standardisation:

- Formal design token naming and versioning.
- Shared motion token definitions.
- Exact transition curves and duration tokens.
- Shared component library ownership.
- Visual regression testing requirements.
- Store-specific theme configuration boundaries.

Do not invent final token values or component-library decisions without approval.

## Relationship to Other Documents

This document should be read with:

- `DEVELOPMENT_STANDARDS.md`
- `FRONTEND_DEVELOPMENT_GUIDE.md`
- `USER_INTERFACE_AND_MOTION_STANDARDS.md`
- `docs/architecture/APPLICATION_ARCHITECTURE.md`
- `docs/architecture/STORE_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`

## Document Management

This document is maintained by the Platform Owner.

Changes to shared visual or motion standards must be reviewed before adoption across participating storefronts.

Store-specific exceptions must be documented and must remain consistent with the platform's accessibility and usability requirements.

## Visual Design and Interface Quality Principles

These principles apply across storefronts, administration interfaces, dashboards, forms, product displays and shared components. They guide visual hierarchy, spacing, typography, interaction feedback and presentation quality.

### 1. Remove unnecessary interface elements

- Remove filler badges that communicate no meaningful status, category or action.
- Avoid redundant labels when the surrounding context already makes the meaning clear.
- Do not italicise words randomly for decoration. Use italics only when there is a clear semantic or editorial reason.
- Reserve monospace typography for code, technical identifiers, reference numbers and other content that benefits from fixed-width alignment.
- Remove decorative embellishments that compete with the actual content or make the interface harder to scan.
- Every visible element should serve a clear informational, navigational, functional or visual-hierarchy purpose.

### 2. Follow the design system

- Use approved design tokens for colour, typography, spacing, borders, radii, shadows and interaction states.
- Reuse established components instead of introducing visually inconsistent alternatives.
- Do not introduce arbitrary colours, font families, spacing values or component treatments where an approved token or component already exists.
- New design requirements must be evaluated against the existing system before new tokens or variants are introduced.
- Keep visual consistency across all platform interfaces while allowing approved store-level branding and configuration.

### 3. Prioritise the actual product and primary content

- Product imagery, product names, prices and meaningful product details should receive appropriate visual prominence.
- Use actual product imagery wherever available. Avoid generic placeholders or decorative imagery when they do not help users understand what is being presented.
- Make the primary feature or most important content visually dominant.
- Secondary information must not compete with the main feature.
- Product cards and detail views should prioritise the information needed to understand and evaluate the product.

### 4. Establish clear visual hierarchy

- Group related content through consistent spacing and alignment.
- Use spacing to communicate relationships between sections, cards, controls and information.
- Avoid relying on unnecessary borders, background changes or decorative separators to create grouping.
- Headlines must describe the actual content or action rather than use vague promotional language.
- Headlines should wrap naturally and remain readable across supported screen sizes.
- Avoid awkward single-word lines, excessive line lengths and forced line breaks that do not improve readability.
- Align elements optically where necessary. Mathematical alignment is a starting point, not a substitute for visual balance.

### 5. Make primary actions unmistakable

- Give the primary call to action clear visual emphasis.
- Secondary actions must remain visually subordinate.
- Use approved action colours, contrast and component variants consistently.
- Button labels should describe the outcome of the action.
- Avoid presenting multiple competing primary actions within the same visual context.
- Destructive and irreversible actions must use the appropriate warning treatment and confirmation flow.

### 6. Use colour with purpose

- Use the approved colour palette and semantic colour roles.
- Accent colours should draw attention to meaningful actions, important information or selected states.
- Do not introduce accent colours simply to make an interface more colourful.
- Maintain sufficient contrast between text, controls, icons and their backgrounds.
- Colour must not be the only way to communicate status or meaning.
- Use consistent semantic colours for success, warning, error, information and interactive states.

### 7. Maintain icon consistency

- Use the established icon library and consistent visual treatment.
- Keep icon sizing, stroke weight, alignment and spacing consistent within comparable components.
- Icons should communicate recognisable meaning or support an adjacent label.
- Avoid mixing unrelated icon styles or introducing decorative icons without a functional purpose.
- Provide accessible labels for icon-only controls.

### 8. Apply consistent corner geometry

- Maintain a coherent relationship between outer container radii and inner element radii.
- Where an inner element follows the curvature of a padded outer container, use the relationship:

  Inner radius = Outer radius - Padding

- Apply this as a geometric guideline, not an unconditional formula. Clamp invalid values and account for borders, unequal padding and nested component geometry.
- Reuse approved radius tokens wherever possible.

### 9. Improve numerical and data presentation

- Use tabular numerals for values that need to align vertically or change dynamically, including prices, totals, quantities, dates, counters and dashboard metrics.
- Use consistent formatting for currency, percentages, quantities and measurements.
- Keep numerical precision appropriate to the business context.
- Avoid unnecessary monospace styling for ordinary numerical information. Tabular numeral support should provide alignment without changing the overall typeface.

### 10. Design loading and feedback states

- Interactive components must communicate when an operation is in progress.
- Provide appropriate loading states for actions that require network requests, background processing or delayed responses.
- Prevent duplicate submissions where repeated actions could create duplicate records or transactions.
- Loading indicators should communicate progress without unnecessarily blocking unrelated interface activity.
- Provide clear success, failure and validation feedback after meaningful user actions.
- Feedback should explain what happened and, where appropriate, what the user can do next.
- Do not display success feedback before the operation has actually succeeded.

### 11. Use animation to communicate useful feedback

- Animation should clarify state changes, confirm interactions or help users understand transitions.
- Use motion for meaningful feedback such as opening a modal, expanding a section, changing a loading state or completing an action.
- Avoid animation that exists only for decoration or distracts from the primary task.
- Keep transitions consistent in duration, easing and behaviour.
- Respect reduced-motion preferences.
- Do not use motion as the only indicator of a state change.

### 12. Responsive visual quality

- Preserve hierarchy and readability across mobile, tablet and desktop layouts.
- Ensure primary content remains prominent when layouts reflow.
- Allow headlines and body text to wrap naturally.
- Prevent buttons, labels, prices, icons and numerical values from becoming cramped or clipped.
- Re-evaluate spacing and optical alignment at each supported breakpoint rather than merely scaling desktop layouts down.
- Maintain usable touch targets and clear interaction states on mobile devices.

### 13. Review and acceptance criteria

A user interface should not be considered visually complete until reviewers can confirm that:

- Unnecessary badges, labels and decorative elements have been removed.
- Typography is consistent and semantic.
- Approved design tokens and components are being used.
- Primary content and product imagery receive appropriate prominence.
- Headline wording and wrapping are clear.
- Primary actions are easy to identify.
- Colour and icon usage are consistent.
- Spacing and alignment create clear visual grouping.
- Text and control contrast remain accessible.
- Numerical values are formatted and aligned appropriately.
- Loading, success, error and validation states are implemented where required.
- Animations communicate useful feedback and respect reduced-motion preferences.
- The interface remains coherent across supported screen sizes.
