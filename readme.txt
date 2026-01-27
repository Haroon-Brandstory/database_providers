DATABASE PROVIDERS PROJECT DOCUMENTATION
=======================================

1. PROJECT OVERVIEW
-------------------
This project is a Next.js web application designed for "Database Providers". It serves as a platform likely for listing, searching, and pricing database services or datasets. It features comprehensive pages for blogs, pricing plans, and a database search interface. 

The content for blogs, landing pages, and the database search functionality is dynamically powered by a **Strapi CMS** backend.

The application is built using Next.js 16 and React 19, leveraging modern web technologies for performance and SEO.

2. TECHNOLOGY STACK
-------------------
- **Framework**: Next.js 16.0.10
- **Library**: React 19.2.3
- **CMS (Backend)**: Strapi (Headless CMS)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Animations**: GSAP, Lottie React
- **Internationalization**: next-intl
- **Forms & Validation**: Nodemailer (for emails)
- **Utilities**: date-fns, qs, winston (logging)
- **UI Components**: Embla Carousel / Swiper (inferred from components), HeroUI Accordion

3. FOLDER STRUCTURE
-------------------
The project follows a standard Next.js App Router structure within the `src` directory.

/src
  /app              -> App Router pages and layouts
    /[locale]       -> Localized routes (Internationalization root)
    /blogs          -> Blog listing and post pages (fetched from Strapi)
    /pricing-plans  -> Pricing strategy and plan display
    /searchDatabase -> Functionality to search and filter database providers (data from Strapi)
    /tools          -> Utility tools section
      /email-permutator -> Tool for generating email variations
      /remove-duplicate -> Tool for cleaning lists
      /roi              -> ROI Calculator
      /size-checker     -> Tool for checking sizes (file/data)
    /thank-you      -> Post-action confirmation page
    /not-found      -> Custom 404 handling
  
  /components       -> Reusable UI components
    /animations     -> Animation related components
    /pricingPlans   -> Components specific to the pricing section
    /searchDatabase -> Components for the search interface (filters, tables)
    /testimonials   -> Customer testimonials and sliders
    /tools          -> Components specific to the utility tools
    ...and various shared components like Header, Footer, Forms.

  /contexts        -> React Context providers
  /hooks           -> Custom React hooks
  /lib             -> Library configurations, service calls (e.g., Strapi API services)
  /utils           -> Utility functions
  /i18n            -> Internationalization configuration
  /messages        -> Localization JSON strings

4. INSTALLATION & SETUP
-----------------------
Prerequisites: Node.js installed on your machine.

Steps:
1.  **Clone the repository** (if not already done).
2.  **Install dependencies**:
    Run one of the following commands in the root directory:
    - `npm install`
    - `yarn install`
    - `pnpm install`
    - `bun install`

3.  **Run Development Server**:
    Start the local development server:
    `npm run dev`

    Access the app at: http://localhost:3000

4.  **Build for Production**:
    Create an optimized production build:
    `npm run build`

    Start the production server:
    `npm start`

5. KEY FEATURES
---------------
- **Strapi Integration**: A headless CMS (Strapi) manages the content availability, including:
    - Dynamic Blog Posts
    - Landing Pages content
    - Database Search records
- **Database Search**: Dedicated section for finding providers with filtering, powered by CMS data.
- **Utility Tools**: A suite of built-in tools for users:
    - Email Permutator
    - Duplicate Remover
    - ROI Calculator
    - Size Checker
- **Internationalization (i18n)**: Native support for multiple languages via `[locale]` routing.
- **Pricing Plans**: Detailed pricing pages with likely comparison features.
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.

6. IMPORTANT NOTES
------------------
- **Update Notice**: The project was recently updated from Next.js 15.5.7 to 16.0.10.
- **File Rename**: As part of usage updates, `middleware.js` may have been renamed or refactored to `src/proxy.js`. Please check `src/proxy.js` for middleware-like logic.

=======================================
Generated on: 2026-01-14
