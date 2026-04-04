# ⚡ Newsflash
> Discover world news in 5 minutes. A minimal, fast news app built with the 2026 frontend stack.

## Overview

Newsflash is a lightweight news reader designed around speed and calm. No infinite scroll, no algorithmic noise — just headlines, instantly.

- 🌍 Floating topic pills with Framer Motion animations
- 📍 Auto-detects user country via browser Geolocation API
- 📡 Live ticker with latest headlines
- 🔄 Smooth scroll from home to results
- 🗺 8 countries supported with flag selector
- 🎨 Minimal Perplexity-inspired dark UI

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix primitives) |
| Animation | Framer Motion |
| News data | TheNewsAPI |
| Testing | Vitest + Testing Library |
| CI/CD | GitHub Actions |

---

## Project Structure

```
src/
├── components/
│   ├── news/          # NewsCard, NewsList — article rendering
│   └── search/        # SearchBar, FloatingPill, LiveTicker, TopicPill
├── hooks/
│   ├── useGeolocation.ts   # Browser Geolocation API with dependency injection
│   ├── useNews.ts          # Fetches articles from TheNewsAPI
│   └── useTrending.ts      # Returns static topic list (extendable)
├── types/
│   └── index.ts       # Article, Country, Topic, NewsApiResponse interfaces
├── data/
│   ├── countries.ts   # 8 supported countries with flags and locales
│   └── topics.ts      # 8 topic categories with display labels
├── lib/
│   └── newsApi.ts     # TheNewsAPI wrapper — fetchTopStories, fetchBySearch
└── test/
    ├── setup.ts            # Global test setup — fetch mock, geolocation stub
    ├── App.test.tsx        # Integration tests for App component
    └── components.test.tsx # Unit tests for UI components
```

---

## Architecture Decisions

**TheNewsAPI as single external dependency**
A single API covers both top stories by locale and full-text search, avoiding the complexity of aggregating multiple providers. The free tier is sufficient for development.

**Browser Geolocation API**
Country detection uses the native `navigator.geolocation` API with a lat/lng bounding-box lookup — no third-party IP geolocation service, no extra request, no privacy concerns.

**Dependency injection in `useGeolocation`**
The hook accepts an optional `geoProvider: Geolocation` parameter that defaults to `navigator.geolocation`. This makes the hook fully testable without patching globals, following the dependency injection principle.

**`vi.hoisted()` for hook mocking**
Vitest's module mock calls are hoisted to the top of the file at compile time, but variable references are not. Using `vi.hoisted()` ensures mock factory functions are evaluated before module imports, preventing the "cannot access before initialization" error that occurs when mocking hooks.

---

## Quality & Testing

- 24 tests passing across unit and integration suites
- 100% code coverage on application code
- GitHub Actions CI/CD with separate `test` and `lint` jobs
- Branch protection on `main` — all changes require a passing PR
- Pull Request template for consistent contribution hygiene

Run the full suite:

```bash
npm run test:run
```

Check coverage:

```bash
npm run test:coverage
```

---

## Git Workflow

| Branch pattern | Purpose |
|---|---|
| `main` | Stable, protected — no direct pushes |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `refactor/*` | Code improvements without behavior change |
| `docs/*` | Documentation only |

All changes go through a Pull Request. CI (tests + lint) must pass before merging.

---

## Known Issues & Tech Debt

- **Issue #5** — Refactor geolocation state sync to remove the `eslint-disable-next-line react-hooks/exhaustive-deps` workaround in `App.tsx`. The correct fix is to move the country initialisation logic into `useGeolocation` itself and return a stable value.
- **Future** — Add Dependabot for automated dependency updates.
- **Future** — Progressive Web App (PWA) support for offline reading.
- **Future** — Playwright E2E tests covering the full search and navigation flow.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/newsflash.git
cd newsflash

# Install dependencies
npm install

# Start the development server
npm run dev

# Run tests
npm run test:run

# Check coverage
npm run test:coverage

# Lint
npm run lint
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```
VITE_NEWS_API_TOKEN=your_token_here
```

Get your free API token at [thenewsapi.com](https://www.thenewsapi.com). The free tier includes 100 requests/day.

---

## License

MIT
