# Bible Games Online

A modern, responsive Bible gaming website built with React + Vite + TypeScript.

## Architecture

### Monorepo Structure (pnpm workspaces)
- **`bible-games/`** — Frontend React app (main game site)
- **`api-server/`** — Express.js backend API (with TypeScript + Drizzle ORM)
- **`lib/api-zod/`** — Shared Zod schemas and types
- **`lib/api-client-react/`** — Generated React hooks for API
- **`lib/db/`** — Drizzle ORM schema definitions

### Frontend Stack
- React 19 + TypeScript
- Vite 6 (build tool)
- Tailwind CSS v4
- Framer Motion (animations)
- Wouter (routing)
- Radix UI primitives (via Shadcn/UI patterns)
- React Helmet Async (SEO)

### Backend Stack
- Express.js v5
- Drizzle ORM + PostgreSQL
- Pino (logging)
- Zod (validation)

## Pages / Games
- `/` — Home (quick trivia, game categories, SEO content)
- `/bible-trivia/` — Full trivia quiz (easy/medium/hard)
- `/bible-word-games/` — Word search puzzle
- `/kids-bible-games/` — Memory matching game for kids
- `/bible-wordle/` — 5-letter Bible word guessing game
- `/bible-millionaire/` — Who Wants to Be a Millionaire style quiz
- `/bible-wheel-of-fortune/` — Guess the Bible phrase
- `/bible-jeopardy/` — Jeopardy-style Bible quiz
- `/bible-memory-games/` — Book/theme memory matching
- `/bible-verse-generator/` — Random inspirational verse generator
- `/bible-crossword/` — Bible crossword puzzle
- `/bible-who-am-i/` — Guess the Bible character from clues
- `/bible-true-false/` — True/False Bible facts quiz
- `/privacy-policy/` — Privacy policy
- `/terms-of-service/` — Terms of service
- `/contact/` — Contact form

## Key Files
- `bible-games/src/App.tsx` — Main routing
- `bible-games/src/index.css` — Global styles + CSS variables
- `bible-games/vite.config.ts` — Vite config (port 5000, host 0.0.0.0, allowedHosts: true)
- `tsconfig.base.json` — Root TypeScript base config
- `pnpm-workspace.yaml` — Workspace + catalog definitions

## Development
```bash
# Start the frontend dev server
cd bible-games && PORT=5000 pnpm dev

# Install all dependencies
pnpm install
```

## Deployment
- Type: Static site
- Build: `pnpm --filter @workspace/bible-games run build`
- Output: `bible-games/dist/public`

## Notes
- The `@replit/vite-plugin-cartographer` shows `TypeError: traverse is not a function` — this is a non-critical dev-only plugin issue that doesn't affect functionality
- Database (PostgreSQL) is provisioned via Replit's built-in DB; credentials set via environment variables (DATABASE_URL, PGHOST, etc.)
- The `tsconfig.base.json` needed to be at workspace root for all packages
