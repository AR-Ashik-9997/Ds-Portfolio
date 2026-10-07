# Ashikur Rahman | AI & Full-Stack Engineer Portfolio

A modern personal portfolio website for Ashikur Rahman, built with Next.js 16, React 19, Tailwind CSS, and Framer Motion. The site highlights machine learning experience, software engineering work, featured projects, and a live-style AI demo playground.

## Overview

This portfolio is designed as a premium one-page developer brand site with:

- a strong hero section and personal introduction
- a filtered project showcase for AI, full-stack, and backend work
- technical skill categories with visual proficiency bars
- a professional experience timeline
- an interactive AI inference playground
- a contact form and social/contact CTA block
- smooth scrolling and animated navigation

## Features

- Responsive single-page portfolio experience
- Dark futuristic UI with glassmorphism and neon accents
- Project filtering by category
- Animated navigation and smooth scroll behavior
- AI model simulation UI with Gemini API integration fallback
- Contact form interface with simulated submission flow
- SEO-friendly metadata and optimized fonts

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis smooth scrolling
- Lucide icons and Remix/Font Awesome icon libraries
- TanStack React Query

## Project Structure

```bash
my-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── About/
│   │   ├── AIPlayground/
│   │   ├── Contacts/
│   │   ├── Experience/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── Projects/
│   │   └── Skills/
│   ├── Shared/
│   │   ├── SmoothScroll.tsx
│   │   └── types/
│   └── lib/
├── public/
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
├── yarn.lock
└── README.md
```

## Main Sections

### About
Introduces Ashikur Rahman as a Machine Learning and Full-Stack Software Engineer with 4+ years of experience across deep learning, backend APIs, and modern web platforms.

### Projects
Showcases representative work such as:

- AI image synthesis microservice
- Next.js AI product search platform
- MRI medical vision classifier
- Enterprise FastAPI gateway

### Skills
Highlights core expertise in:

- AI / Deep Learning
- Backend & APIs
- Frontend Systems
- DevOps / MLOps

### Experience
Displays professional milestones and impact across ML, API architecture, and full-stack product engineering.

### AI Playground
Includes a UI for selecting simulated ML models and triggering an inference request. It uses a Gemini API call when `NEXT_PUBLIC_GEMINI_API_KEY` is configured, and otherwise falls back to a realistic mock response.

## Prerequisites

- Node.js 18+ or later
- Yarn 4
- A modern browser

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
yarn dev
```

3. Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
yarn dev     # run local development server
yarn build   # create production build
yarn start   # run production server
yarn lint    # run ESLint checks
```

## Environment Variables

Create a `.env.local` file in the project root if you want live AI playground responses:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

If the value is not set, the playground will still run using a simulated inference payload so the UI remains functional.

## Deployment

This project is ready to deploy on Vercel or any platform that supports Next.js applications.

For Vercel deployment:

```bash
yarn build
```

Then import the project into Vercel and deploy using the default Next.js settings.

## Notes

- The contact form is a frontend mock and can be connected to Formspree, EmailJS, or a backend API later.
- The project is focused on personal branding and portfolio presentation rather than a full SaaS backend.
- This repository is tailored to Ashikur Rahman’s portfolio and public-facing profile.

## Contact

- Email: ashikur.rahman9997@gmail.com
- LinkedIn: https://www.linkedin.com/in/md-ashikur-rahman-080483390/
- GitHub: https://github.com/AR-Ashik-9997
