# Muhammad Taha — Portfolio

Premium interactive personal developer portfolio with lightweight admin CMS.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [Turso](https://turso.tech/) (libSQL/SQLite)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [NextAuth.js](https://next-auth.js.org/)
- **3D:** [Three.js](https://threejs.org/) + React Three Fiber
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Environment Variables

```env
# Database
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=
CONTACT_EMAIL=

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=

# GitHub
GITHUB_TOKEN=
GITHUB_USERNAME=

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
```

## Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run typecheck    # TypeScript check
```

## Testing

```bash
npm run test         # Run tests (watch mode)
npm run test:run     # Run tests (single)
npm run test:coverage # Run with coverage
```

## Database

```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio
```

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/              # Utilities and configurations
├── hooks/            # Custom React hooks
├── types/            # TypeScript types
└── styles/           # Global styles
```

## Architecture

This project follows a locked architecture. See `docs/ARCHITECTURE_STATUS.md` for details.

**Key decisions:**
- Monolithic Next.js application
- Turso for serverless SQLite
- Cloudflare R2 for image storage
- Single admin user
- No public registration

## License

Private — Muhammad Taha
