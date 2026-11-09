# Yotaabo

Yotaabo is a fragrance commerce platform built to support multiple storefronts through one shared application.

The platform currently supports Yotaabo and Porschs. Each storefront operates within the shared platform while maintaining its own store-scoped administration.

## Project Status

Active development takes place on the `perfume-business` branch. This branch is used for feature development, beta releases and testing.

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Material UI
- Supabase
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

## Current Administration Model

The platform uses one shared application for two storefronts.

The current administrative model consists of:

- One Platform Super Admin.
- One Yotaabo Store Admin.
- One Porschs Store Admin.

Each Store Admin is restricted to their assigned store. Platform-level administration manages both stores and their Store Admin assignments.

Employee accounts, delegated administrators and expanded workforce permissions are future capabilities. They are not part of the current administrative baseline.

## Branch and Deployment Workflow

The project follows a beta-to-production release workflow.

| Branch | Purpose | Deployment |
|---|---|---|
| `perfume-business` | Development, feature work and beta testing | Netlify |
| `main` | Approved production releases | Vercel |

### Release Process

1. Develop changes on `perfume-business`.
2. Push changes to the beta branch.
3. Deploy and test the beta version through Netlify.
4. Resolve defects and verify functionality.
5. Merge into `main` only after the release is fully tested and approved.
6. Deploy the production release through Vercel.

This workflow applies to the current fragrance business and future business functionality.

Unfinished or unapproved beta work must never be merged into `main`.

The beta and production deployment pipelines remain separate.

## Documentation

The documentation status and development handover checkpoint is maintained at:

[Documentation Status and Development Handover](docs/DOCUMENTATION_STATUS.md)

Additional architecture, implementation, identity, operations and store documentation is maintained under `docs/`.

## Environment and Security

- Keep credentials and private environment values in local environment files.
- Never commit `.env` or files containing secrets.
- Use `.env.example` as the reference for required environment variables.
- Keep beta and production deployment configurations separate.
