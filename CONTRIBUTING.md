# Contributing

Thanks for helping improve Dotlist FVP as an open source webapp.

## Local Setup

```bash
npm install
npm run dev
```

Run these checks before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project Scope

Dotlist FVP is intentionally local-first and self-contained. Please avoid adding account systems, databases, paid-service requirements, or hidden network calls unless the project explicitly changes direction in public.

Good contributions include:

- improving the FVP selection flow
- accessibility and keyboard navigation improvements
- local data export/import improvements
- test coverage for core state transitions
- clearer open source documentation
