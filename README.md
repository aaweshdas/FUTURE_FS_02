<p align="center">
  <h1 align="center">🚀 LeadFlow CRM</h1>
  <p align="center">
    A modern, full-stack Customer Relationship Management dashboard for tracking leads, managing sales pipelines, and scheduling follow-ups — all in real-time.
  </p>
</p>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**LeadFlow CRM** is a single-page web application designed for sales professionals and small teams who want a clean, fast, and intuitive tool to manage their customer acquisition pipeline.

The application provides a complete workflow — from capturing a new lead, to tracking interactions via notes, to scheduling follow-up reminders, to visualizing lead status across a drag-and-drop pipeline board. All data is persisted securely in a PostgreSQL database via Supabase, with full Row-Level Security (RLS) ensuring that every user only sees their own data.

---

## Key Features

| Feature | Description |
|---|---|
| **📊 Analytics Dashboard** | Visualize key metrics: total leads, conversion rate, status distribution, and recent activity at a glance using interactive Recharts. |
| **👥 Lead Management** | Full CRUD operations on leads — create, edit, search, filter by status, and delete. Each lead stores name, email, phone, company, source, and status. |
| **📝 Notes & Activity Log** | Attach timestamped notes to any lead to maintain a running history of all interactions and conversations. |
| **⏰ Follow-Up Scheduler** | Schedule future follow-up tasks with reminders. Mark them as complete when done. Never miss a touchpoint. |
| **🔀 Pipeline Board** | A visual Kanban-style pipeline view showing leads organized by status columns (New → Contacted → Converted / Lost). |
| **🔐 Authentication** | Email/password registration and login powered by Supabase Auth. Protected routes ensure only authenticated users can access the dashboard. |
| **🛡️ Row-Level Security** | Every database table enforces RLS policies so users can only read, write, and delete their own records — even at the database level. |
| **🌗 Theme Support** | Built-in dark/light mode toggle for comfortable viewing in any environment. |
| **📱 Responsive Design** | Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) (SWC compiler for fast HMR) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/) primitives) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Server State** | [TanStack Query v5](https://tanstack.com/query) (React Query) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| **Charts** | [Recharts](https://recharts.org/) |
| **Drag & Drop** | [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend & Auth** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + RLS) |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev/) toast notifications |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│                                                              │
│  React App ──► React Router ──► Page Components              │
│       │                              │                       │
│       ▼                              ▼                       │
│  TanStack Query              Supabase JS Client              │
│  (Cache + Sync)              (Auth + Data Fetching)          │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    Supabase Platform                         │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │  Auth (JWT)  │  │  PostgREST   │  │  PostgreSQL (RLS)   │ │
│  │  Email/Pass  │  │  Auto API    │  │  profiles, leads,   │ │
│  │  Session Mgmt│  │  CRUD Ops    │  │  lead_notes,        │ │
│  └─────────────┘  └──────────────┘  │  follow_ups         │ │
│                                      └─────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** v18.0 or higher
- **npm** (comes with Node.js) or **[Bun](https://bun.sh/)**
- A **[Supabase](https://supabase.com/)** account (free tier works perfectly)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/leadflow-crm.git

# 2. Navigate into the project directory
cd leadflow-crm

# 3. Install all dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables. You can find these values in your Supabase project dashboard under **Settings → API**.

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

> ⚠️ **Important:** The `.env` file is included in `.gitignore` and will **never** be committed to version control. This protects your API keys from being exposed publicly.

### Database Setup

The full database schema is located in `src/Backend/migrations/`. It defines:

- **`profiles`** — Stores user profile data, auto-created on signup via a database trigger.
- **`leads`** — The core table for lead records (name, email, phone, company, source, status).
- **`lead_notes`** — Timestamped notes attached to individual leads.
- **`follow_ups`** — Scheduled follow-up tasks with completion tracking.

**To set up the database:**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) → open your project → **SQL Editor**.
2. Open the file `src/Backend/migrations/20260219115203_0cecf8f5-f2a5-4876-b926-b9f77651f0f0.sql`.
3. Copy the entire contents and paste it into the SQL Editor.
4. Click **Run** to create all tables, enums, triggers, and RLS policies.

**To seed sample data (optional):**

A seed script is provided at `src/Backend/seed.sql` that generates **70 realistic sample leads** along with notes and follow-ups. To use it:

1. Open the SQL Editor in your Supabase Dashboard.
2. Paste the contents of `src/Backend/seed.sql`.
3. Click **Run**.

This will create a test user (`admin@test.com` / `password123`) and populate the database with diverse sample data for immediate testing.

### Running Locally

```bash
# Start the Vite development server
npm run dev
```

The application will be available at **http://localhost:8080**.

---

## Project Structure

```
leadflow-crm/
├── public/                          # Static assets (favicon, robots.txt)
├── src/
│   ├── Frontend/                    # 🎨 UI Layer — Visual Components & Pages
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui component library (Button, Card, etc.)
│   │   │   ├── AppLayout.tsx        # Sidebar navigation + main content wrapper
│   │   │   ├── LeadDetailSheet.tsx  # Slide-out panel for viewing lead details
│   │   │   ├── LeadFormDialog.tsx   # Modal form for creating/editing leads
│   │   │   ├── NavLink.tsx          # Navigation link with active state
│   │   │   └── ProtectedRoute.tsx   # Auth guard for protected pages
│   │   └── pages/
│   │       ├── Home.tsx             # Public landing page
│   │       ├── Login.tsx            # Email/password login form
│   │       ├── Register.tsx         # New user registration form
│   │       ├── Dashboard.tsx        # Analytics overview with charts and KPIs
│   │       ├── Leads.tsx            # Lead list with search, filter, and CRUD
│   │       ├── Pipeline.tsx         # Kanban-style pipeline board
│   │       ├── FollowUps.tsx        # Upcoming follow-up tasks
│   │       └── NotFound.tsx         # 404 error page
│   │
│   ├── Client/                      # 🔌 Data & State Management Layer
│   │   ├── hooks/
│   │   │   ├── useLeads.ts          # TanStack Query hooks for lead CRUD
│   │   │   ├── useTheme.ts          # Dark/light mode toggle hook
│   │   │   ├── use-mobile.tsx       # Mobile breakpoint detection
│   │   │   └── use-toast.ts         # Toast notification hook
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx      # React Context for authentication state
│   │   ├── integrations/
│   │   │   └── supabase/
│   │   │       ├── client.ts        # Supabase client initialization
│   │   │       └── types.ts         # Auto-generated TypeScript DB types
│   │   └── lib/
│   │       └── utils.ts             # Utility functions (cn helper)
│   │
│   ├── Backend/                     # 🗄️ Database Schema & Seed Data
│   │   ├── migrations/              # SQL migration files (schema + RLS policies)
│   │   ├── config.toml              # Supabase CLI configuration
│   │   └── seed.sql                 # Sample data generator (70 leads)
│   │
│   ├── App.tsx                      # Root component with routing
│   ├── App.css                      # Global styles
│   ├── index.css                    # Tailwind CSS imports and base styles
│   └── main.tsx                     # Application entry point
├── .env                             # Environment variables (git-ignored)
├── .gitignore                       # Files excluded from version control
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
└── vitest.config.ts                 # Vitest test runner configuration
```

---

## Pages & Routes

| Route | Page | Auth Required | Description |
|---|---|:---:|---|
| `/home` | Home | ❌ | Public landing page introducing the CRM |
| `/login` | Login | ❌ | Email/password authentication |
| `/register` | Register | ❌ | New user registration |
| `/` | Dashboard | ✅ | Analytics overview with charts and KPIs |
| `/leads` | Leads | ✅ | Full lead management table with search & filters |
| `/pipeline` | Pipeline | ✅ | Visual Kanban board grouped by lead status |
| `/follow-ups` | Follow-Ups | ✅ | Scheduled tasks and reminders |
| `*` | Not Found | ❌ | 404 error page |

---

## Database Schema

```sql
-- Enum for lead progression tracking
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'converted', 'lost');

-- Core tables
profiles    (id, user_id, name, email, created_at, updated_at)
leads       (id, user_id, name, email, phone, company, lead_source, status, created_at, updated_at)
lead_notes  (id, lead_id, user_id, note, created_at)
follow_ups  (id, lead_id, user_id, description, reminder_at, completed, created_at)
```

**Relationships:**
- Each `lead` belongs to one `user` (via `user_id → auth.users.id`).
- Each `lead_note` belongs to one `lead` and one `user`.
- Each `follow_up` belongs to one `lead` and one `user`.
- A `profile` is automatically created for every new user via a PostgreSQL trigger.
- The `updated_at` column is automatically maintained via a `BEFORE UPDATE` trigger.

---

## Authentication & Security

LeadFlow CRM uses **Supabase Auth** with email/password authentication. Security is enforced at multiple layers:

1. **Frontend Route Guards:** The `<ProtectedRoute>` component wraps all authenticated pages. Unauthenticated users are automatically redirected to `/login`.

2. **Row-Level Security (RLS):** Every table (`profiles`, `leads`, `lead_notes`, `follow_ups`) has RLS enabled with policies ensuring users can only access their own data:
   ```sql
   CREATE POLICY "Users can view own leads"
     ON public.leads FOR SELECT
     USING (auth.uid() = user_id);
   ```

3. **JWT-Based Sessions:** Supabase issues JSON Web Tokens upon login. The `AuthContext` manages session state and token refresh in the React application.

4. **Environment Variable Protection:** All Supabase credentials are stored in `.env` (git-ignored), preventing accidental exposure in version control.

---

## Building for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The build output is generated in the `dist/` directory, ready for deployment.

---

## Deployment

LeadFlow CRM can be deployed to any static hosting platform. Recommended options:

| Platform | Command / Method |
|---|---|
| **[Vercel](https://vercel.com/)** | Connect your GitHub repo → auto-deploys on push |
| **[Netlify](https://netlify.com/)** | Drag & drop the `dist/` folder, or connect GitHub |
| **[AWS S3 + CloudFront](https://aws.amazon.com/)** | Upload `dist/` to S3 bucket with CloudFront CDN |
| **[Firebase Hosting](https://firebase.google.com/)** | `firebase deploy` after `firebase init hosting` |

> **Note:** Make sure to configure the environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) in your hosting platform's environment settings.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Build the application for production |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run ESLint to check for code quality issues |
| `npm run test` | Run the Vitest test suite |
| `npm run test:watch` | Run tests in watch mode during development |

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork** this repository.
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request.

Please follow conventional commit messages and ensure all tests pass before submitting.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React, Vite, Tailwind CSS, and Supabase.
</p>
