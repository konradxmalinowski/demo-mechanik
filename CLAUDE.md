# CLAUDE.md — demo-mechanik

Context for AI agents working in this repository.

## What this is

A portfolio demo website for a car workshop / mechanic, part of Konrad Malinowski's
freelance portfolio (http://konrad.malinowski.ct8.pl). Mock data only — there is
**no real backend**; the client zone, repair history, and cost calculator run
client-side.

- **Live demo:** https://konradxmalinowski.github.io/demo-mechanik/
- Site copy is in **Polish** (target audience: Polish local businesses).

## Stack

- Angular 19 + TypeScript (standalone components)
- Angular Signals for reactive state (no BehaviorSubject)
- Angular SSR (`@angular/ssr` + Express) available via the serve:ssr script
- Tailwind CSS 3 for styling (utility-first)
- Karma + Jasmine for tests

## Commands

```bash
npm install
npm start                         # ng serve → http://localhost:4200
npm run build                     # ng build → dist/
npm test                          # ng test (Karma + Jasmine)
npm run serve:ssr:demo-mechanik   # node dist/demo-mechanik/server/server.mjs
```

## Structure

```
src/app/
├── core/       # Singleton services, app-wide logic
├── features/   # Feature views (Home, Client Zone, Booking, Diagnostics)
├── shared/     # Reusable components, pipes, directives
└── data/       # Mock data (services, repair history, diagnostics)
```

## Conventions & constraints

- Use Signals for state — do not introduce BehaviorSubject-based patterns.
- Mock data only — do not add real API calls or backends; this is a showcase.
- Deployed to GitHub Pages under the `/demo-mechanik/` base path — keep asset URLs base-aware.
- Conventional Commits, English, imperative mood.
