# Product Catalogue Documentation

## Purpose

This directory contains the architecture and technical documentation governing the platform's Product Catalogue domain.

The documents are separated by responsibility to make the architecture easier to understand, maintain and extend.

## Document Directory

| Document | Description |
|---|---|
| PRODUCT_CATALOGUE_ARCHITECTURE.md | Overall catalogue architecture, principles, scope and domain boundaries |
| PRODUCT_OWNERSHIP_AND_SHARING.md | Product ownership, shared catalogue rules, store eligibility and independent listings |
| PRODUCT_DATA_MODEL.md | Product records, categories, attributes, variants, identifiers and media |
| PRODUCT_LIFECYCLE_AND_ADMINISTRATION.md | Product creation, validation, publication, modification and administration |
| PRODUCT_CATALOGUE_APIS_AND_INTEGRATION.md | API contracts, storefront integration and cross-domain communication |
| PRODUCT_CATALOGUE_SECURITY_AND_GOVERNANCE.md | Permissions, ownership protection, auditing and architectural governance |
| PRODUCT_CATALOGUE_PERFORMANCE_AND_RELIABILITY.md | Search, filtering, pagination, caching, scalability and reliability |
| PRODUCT_CATALOGUE_MIGRATION_AND_TESTING.md | Migration, testing, cutover, rollback and production validation |

## Recommended Reading Order

1. Product Catalogue Architecture
2. Product Ownership and Sharing
3. Product Data Model
4. Product Lifecycle and Administration
5. Product Catalogue APIs and Integration
6. Product Catalogue Security and Governance
7. Product Catalogue Performance and Reliability
8. Product Catalogue Migration and Testing

## Current Operating Context

The initial participating stores are Yotaabo and Poshies.

They use one shared product catalogue through the platform backend.

An authorised administrator of either store may add a product to the shared catalogue. Once accepted, that product is available to both stores' listing workflows without requiring a duplicate product upload.

Shared catalogue availability does not automatically publish a product on either storefront.

Each store independently controls its product listings, publication status, prices, promotions, presentation and inventory relationship.

Inventory remains store-specific.

Access to a shared product does not automatically grant permission to modify or delete its authoritative source record.

## Broader Platform Direction

The platform is intended to support additional stores and more flexible product ownership and sharing arrangements.

Future capabilities may include platform-owned products, store-owned products, selected-store sharing and platform-wide eligibility.

These future arrangements must not silently change the current Yotaabo and Poshies operating rules.

Proposed capabilities must be distinguished from approved decisions and implemented functionality.

## Documentation Authority

This directory must be read alongside the wider platform documentation, particularly:

- Store Architecture
- Multi-Store Product Catalogue and Inventory Isolation Architecture
- Inventory Architecture
- API Architecture
- Data Architecture
- Identity and Access Architecture
- Unified Platform Organisation, RBAC and Authority Specification
- Platform Business Model
- Platform Decisions
- Decision Register

Each domain remains authoritative for its own responsibilities.

The Product Catalogue domain owns product identity, source information and catalogue eligibility relationships.

The Store domain owns store identity and lifecycle.

The Commerce domain owns commercial transactions and pricing responsibilities.

The Inventory domain owns stock quantities and movements.

Identity and Access owns authentication and permission assignment.

## Status and Change Control

A document describing a capability does not prove that the capability has been implemented.

Implementation must be verified against source code, database constraints, API behaviour, automated tests and operational configuration.

Conflicting, alternative, historical and future proposals must be retained with their respective status and context.

Material changes must be reflected in the relevant architecture documents and decision records.
