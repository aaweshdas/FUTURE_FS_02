# LeadFlow CRM

A modern, responsive Customer Relationship Management (CRM) dashboard built with React, Vite, and Supabase. LeadFlow CRM is designed to help teams track leads, manage notes, and schedule follow-ups efficiently with a beautiful, dark-mode ready interface.

![LeadFlow CRM Screenshot](public/placeholder.svg) *(Replace with actual screenshot)*

## Features

- **Lead Management:** Create, view, update, and manage the statuses of prospective clients.
- **Notes & Activity Tracking:** Keep detailed logs of interactions with each lead.
- **Follow-up Scheduling:** Set reminders for future touchpoints.
- **Analytics Dashboard:** Visualize your sales pipeline and conversion rates.
- **Authentication & RLS:** Secure user login and data ownership using Supabase Auth and Row Level Security.
- **Modern UI:** Built with Tailwind CSS and Radix UI primitives for a sleek, accessible, and responsive design.

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + `shadcn/ui` components
- **Routing:** React Router v6
- **Data Fetching:** TanStack Query (React Query)
- **Backend/Database:** Supabase (PostgreSQL + Auth)
- **Icons:** Lucide React

## Local Development Setup

To get this project running locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `bun`

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/leadflow-crm.git
cd leadflow-crm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

### 4. Database Setup (Supabase)

This project requires a Supabase PostgreSQL database. You can find the database schema inside the `supabase/migrations/` folder. 

If you want to quickly seed your database with 70 realistic sample leads, copy the contents of `supabase/seed.sql` and run it in your Supabase project's SQL Editor.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080` (or whichever port Vite assigns).

## Project Structure

```text
├── src/
│   ├── components/      # Reusable UI components (shadcn ui, custom components)
│   ├── contexts/        # React Context providers (e.g., AuthContext)
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service configurations (Supabase client)
│   ├── lib/             # Utility functions
│   ├── pages/           # Route-level components (Dashboard, Leads, Login)
│   ├── App.tsx          # Main application component and routing
│   └── main.tsx         # Entry point
├── supabase/
│   ├── migrations/      # Database schema and RLS policies
│   └── seed.sql         # Sample data generation script
└── .env                 # Environment variables
```

## Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized assets ready to be deployed to platforms like Vercel, Netlify, or AWS.

## License

This project is open-source and available under the [MIT License](LICENSE).
