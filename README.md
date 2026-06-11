# Dotlist FVP

Dotlist FVP is an open source, local-first web app for the Final Version Perfected task method. It turns one long task list into a guided selection flow so you can capture work, choose the next task, focus, and review progress without adding accounts, databases, or cloud services.

## Features

- Guided Final Version Perfected scan with valid task ranges.
- Inbox, selection, chain, focus, and review views.
- Local browser storage only; no backend and no required environment variables.
- JSON export for backing up your task state.
- Static Next.js export for simple hosting.
- Open source TypeScript implementation with unit and browser tests.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000/app`.

## Useful Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Browser tests use Playwright with the project config in `playwright.config.cjs`:

```bash
npx playwright install chromium
npm run test:browser
```

## How The FVP Flow Works

1. Add every task to Inbox.
2. Start Select and compare each candidate with the current benchmark.
3. Dot the task that feels more workable.
4. Work the newest dotted task first.
5. Mark it done, stop for now, or put it back at the end.

The core open source algorithm lives in `lib/fvp.ts`. The app shell and views live in `components/fvp/`.

## Storage

Dotlist FVP stores state in `localStorage` under `fvp.state.v1`. It also listens for storage changes from other tabs and merges task/session records by id. There is intentionally no database code in this public webapp version.

Exported JSON contains your task titles and work-session history. Treat exports as personal data and avoid attaching them to public issues unless you have removed private details.

## Documentation

- `docs/FVP_ALGORITHM.md`: method and state-machine reference.
- `docs/COMPONENT_GUIDE.md`: frontend component guide.
- `docs/architecture.md`: project layout and design notes.

## License

MIT. This open source project is provided as a self-contained local web tool.
