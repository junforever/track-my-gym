# TRACK MY GYM

## Description

Track My Gym is a web application designed to help gym owners and managers streamline their daily operations. It simplifies management tasks such as handling memberships, staff scheduling, and inventory tracking, among other features—excluding tax-related tasks.

## Features

- User Registration and Authentication
- Client Management
- Staff Management
- Supplier Management
- Inventory Management
- Services Management
- Events Management
- Expenses Management
- Surveys Management
- Settings

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Sonner
- React Hook Form
- Zod
- Date Fns
- CmdK
- React Day Picker
- Lucide React
- Next Themes
- Prisma
- Argon2
- Faker
- Husky
- Commitlint
- NextAuth
- Auth
- NextIntl

## Shadcn Components

- AlertDialog
- Avatar
- Form
- Label
- Button
- Popover
- Calendar
- Input
- Select
- Switch
- Textarea
- RadioGroup
- Command
- Sonner
- Table
- Skeleton
- Sidebar
- Separator
- Sheet
- Tooltip
- DropdownMenu
- Collapsible
- Breadcrumb
- Card

## Todo List

- Basic Packages Installation

  - [x] Install Next.js
  - [x] Install Tailwind CSS
  - [x] Install Shadcn UI
  - [x] Install Sonner
  - [x] Install React Hook Form
  - [x] Install Zod
  - [x] Install Date Fns
  - [x] Install CmdK
  - [x] Install React Day Picker
  - [x] Install Lucide React
  - [x] Install Next Themes
  - [x] Install Argon2
  - [x] Install Husky
  - [x] Install Commitlint
  - [x] Install NextAuth

- Docker

  - [x] Create Dockerfile
  - [x] Create Docker Compose

- Database

  - [x] Create Database Script
  - [x] Install Prisma
  - [x] Create Prisma Client
  - [x] Test Database Connection
  - [x] Create Initial Migration
  - [x] Create Prisma Schema
  - [x] Install Faker
  - [x] Create Seeders

- Internationalization

  - [x] Install NextIntl
  - [x] Create NextIntl Config
  - [x] Create NextIntl Language Files
  - [x] Create Language Switcher

- Theme Change

  - [x] Install NextThemes
  - [x] Create Theme Switcher

- Authentication

  - [x] Create Login Form
  - [x] Create Login Page
  - [ ] Manage Login with NextAuth

- Dashboard

  - [ ] Create Main Layout
  - [ ] Create Sidebar
  - [ ] Create Header
  - [ ] Create Footer
  - [ ] Create Temporarily Dashboard Page

## Folder Structure

```
├── .env-template
├── .gitignore
├── .husky
    ├── commit-msg
    └── pre-commit
├── Dockerfile
├── Dockerfile.db
├── README.md
├── commitlint.config.mjs
├── components.json
├── docker-compose.yml
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
    ├── migrations
    │   ├── 20250319163635_init
    │   │   └── migration.sql
    │   └── migration_lock.toml
    ├── schema.prisma
    ├── seed.ts
    └── seeders
    │   ├── seedProd.ts
    │   └── seedUsers.ts
├── src
    ├── app
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   └── ui
    │   │   ├── alert-dialog.tsx
    │   │   ├── avatar.tsx
    │   │   ├── button.tsx
    │   │   ├── calendar.tsx
    │   │   ├── command.tsx
    │   │   ├── dialog.tsx
    │   │   ├── form.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── popover.tsx
    │   │   ├── radio-group.tsx
    │   │   ├── select.tsx
    │   │   ├── separator.tsx
    │   │   ├── sheet.tsx
    │   │   ├── sidebar.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── sonner.tsx
    │   │   ├── switch.tsx
    │   │   ├── table.tsx
    │   │   ├── textarea.tsx
    │   │   ├── theme-provider.tsx
    │   │   └── tooltip.tsx
    ├── hooks
    │   └── use-mobile.ts
    └── lib
    │   └── utils.ts
├── track_my_gym.sql
└── tsconfig.json
```
