# Simatu Cooperative

Simatu is a multi-store commerce and administration platform developed for Simatu Cooperative.

The platform provides shared infrastructure for operating multiple independent storefronts through one application. Each storefront maintains its own identity, catalogue, customer-facing experience and store-scoped administration while using shared backend services.

## Storefronts

The platform currently supports:

- **Yotaabo**: An independent storefront.
- **Poshies**: An independent storefront.

Both storefronts operate within the same platform and share the underlying product and commerce infrastructure. Store-specific data and administrative access are scoped to the appropriate storefront.

Simatu Cooperative is the organisation behind the platform. It is not a storefront.

## Platform Capabilities

The platform provides:

- Multiple storefronts within one application.
- Shared product and commerce infrastructure.
- Store-scoped product and order management.
- Separate storefront experiences.
- Centralised platform administration.
- Store-specific administrator access.
- Shared authentication and backend services.
- Administrative activity tracking.

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Material UI
- Supabase
- PostgreSQL
- Netlify Functions

## Getting Started

### Requirements

- Node.js
- npm

### Installation

Install dependencies:

    npm ci

Create your local environment file:

    cp .env.example .env

Configure the required environment variables in `.env`.

### Development

Start the development server:

    npm run dev

Start Vite and local Netlify Functions:

    npm run dev:local

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run dev:local` | Start Vite and local Netlify Functions |
| `npm run build` | TypeScript checks, production build and file-size checks |
| `npm run build:analyze` | Build and analyse file sizes |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## Administration and Access Control

The platform uses a centralised administrative model:

- **Platform Super Admin:** Oversees the platform and manages Store Administrator assignments.
- **Yotaabo Store Admin:** Manages the Yotaabo storefront only.
- **Poshies Store Admin:** Manages the Poshies storefront only.

Store Administrators cannot manage other storefronts or appoint additional administrators.

Platform-level administration controls access assignments.

Employee accounts, delegated administrators and expanded workforce permissions are future capabilities and are not part of the current administrative baseline.

## Platform Architecture

The application uses shared backend infrastructure with storefront-specific access and presentation.

Storefronts share the underlying product and commerce services while maintaining their own storefront identity and administrative boundaries.

Access restrictions are enforced by the backend and are not dependent solely on frontend navigation or visibility.

## Branch and Deployment Workflow

The project follows a beta-to-production release workflow.

| Branch | Purpose | Deployment |
|---|---|---|
| `beta` | Development, feature work and beta testing | Netlify |
| `main` | Approved production releases | Vercel |

### Release Process

1. Develop changes on `beta`.
2. Push changes to the beta branch.
3. Deploy and test the beta version through Netlify.
4. Resolve defects and verify functionality.
5. Merge into `main` only after the release is fully tested and approved.
6. Deploy the production release through Vercel.

Unfinished or unapproved beta work must never be merged into `main`.

The beta and production deployment pipelines remain separate.

## Documentation

The documentation status and development handover checkpoint is maintained at:

[Documentation Status and Development Handover](docs/DOCUMENTATION_STATUS.md)

Additional architecture, implementation, identity, operations and storefront documentation is maintained under `docs/`.

## Environment and Security

- Keep credentials and private environment values in local environment files.
- Never commit `.env` or files containing secrets.
- Use `.env.example` as the reference for required environment variables.
- Keep beta and production deployment configurations separate.
