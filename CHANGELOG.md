# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-24

### Added
- Explicit `robots.txt` rules for named AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, ChatGPT-User, OAI-SearchBot and others), distinguishing
  training-data crawlers from live-retrieval crawlers instead of relying on an
  implicit wildcard rule.
- `llms.txt`: a "Pages" section listing all six routes with one-line descriptions,
  an explicit note that the business/contact data is fictional demo content, and
  a last-updated date.
- `disambiguatingDescription` and `creator` fields on the `AutoRepair` JSON-LD
  schema, so structured-data consumers can tell this is portfolio demo content
  for a fictional business rather than a real, operating workshop.
- `aria-labelledby`/`id` pairing between the client-zone tabs and their tabpanels.

### Fixed
- **SSR/prerender content gap**: the client-zone tabs (visit history, repair
  history, service recommendations, documents) were only added to the DOM for
  whichever tab was currently active (`@if`), so the prerendered/server-rendered
  HTML only ever contained the default "Ostatnie wizyty" tab - the repair
  history and diagnostic fault-code content (the site's flagship feature) was
  invisible to AI crawlers and any other non-JS-executing fetcher. All four
  tabpanels are now always rendered and toggled with `[hidden]` instead of
  being structurally added/removed.
- **SSR/prerender content gap**: the home page's "Nasze usługi" and "Opinie
  klientów" sections were gated behind an artificial `setTimeout`-driven
  loading-skeleton signal that only resolved to `true` in the browser
  (`afterNextRender` + `isPlatformBrowser`), so the prerendered HTML for the
  home page only ever contained skeleton placeholder divs, not the actual
  service list or testimonials. The data was already static and available
  synchronously, so the artificial delay served no real purpose - it has been
  removed and the real content now renders immediately in both SSR and CSR.
- JSON-LD `AutoRepair.url` incorrectly pointed at the developer's separate
  portfolio site instead of the demo site itself; it now self-references the
  demo's own URL, with the portfolio link moved to the new `creator` field
  where it belongs semantically.

### Changed
- Bumped version from placeholder `0.0.0` to `0.1.0` to reflect the first
  tracked release of this demo.
