# App Starter

Web application starter template with Next.js, Prisma, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Available Commands](#available-commands)
  - [Development Commands](#development-commands)
  - [Build Commands](#build-commands)
  - [Code Quality Commands](#code-quality-commands)
  - [Testing Commands](#testing-commands)
  - [Database Commands](#database-commands)
  - [Storybook Commands](#storybook-commands)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js (v18 or later recommended)
- Yarn package manager
- Docker and Docker Compose (for local database)
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Paselan91/app-starter.git
   cd app-starter
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up your environment variables (see [Environment Setup](#environment-setup))

4. Set up the database:
   ```bash
   yarn db:reset
   ```

5. Start the development server:
   ```bash
   yarn dev
   ```

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the variables in `.env.local` with your configuration

## Available Commands

### Development Commands

- `yarn dev`: Start the development server with Turbopack
- `yarn start`: Start the production server
- `yarn local`: Run commands with local environment variables

### Build Commands

- `yarn build`: Build the application for production

### Code Quality Commands

- `yarn lint`: Run ESLint to check for code issues
- `yarn biome:validate`: Validate code formatting and check for issues with Biome
- `yarn biome:write`: Automatically fix formatting and issues with Biome
- `yarn type-check`: Run TypeScript type checking
- `yarn ts-check`: Run all code quality checks (Biome validation, type checking, and tests)
- `yarn ts-check:write`: Run all code quality checks with automatic fixes

### Testing Commands

- `yarn test`: Run all tests (frontend and backend)
- `yarn test:frontend`: Run frontend tests only
- `yarn test:backend`: Run backend tests only

### Database Commands

- `yarn prisma:generate:local`: Generate Prisma client based on your schema
- `yarn migrate:local`: Run Prisma migrations in development mode
- `yarn db:seed`: Seed the database with initial data
- `yarn db:clear`: Clear all data from the database
- `yarn db:reset`: Reset the database (clear and seed)

### Storybook Commands

- `yarn storybook`: Start Storybook development server
- `yarn build-storybook`: Build Storybook for production

## Project Structure

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
