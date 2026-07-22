# Production readiness - demo-mechanik

## Kontekst

Statyczne demo portfolio (Angular 19 + TS + Tailwind), bez backendu, deployowane na
GitHub Pages przez `.github/workflows/deploy.yml` (bundle z `dist/demo-mechanik/browser`).
Ten sam audyt uruchamiany równolegle dla demo-fryzjer, demo-hydraulik, demo-mechanik,
demo-restauracja - z tym samym zakresem kryteriów, żeby portfolio było spójne.

## Zakres (ustalony z użytkownikiem)

"Production readiness" = polish demówki jako portfolio, BEZ dodawania prawdziwego
backendu (strefa klienta / kalkulator / rezerwacja zostają frontendowe/mockowane).
W zakresie:

- SEO: meta tagi (title, description, OG/Twitter cards), canonical, robots.txt, sitemap.xml
- Core Web Vitals / wydajność (lazy loading, rozmiar bundle, obrazy)
- PWA: manifest.json poprawny, ikony w komplecie, service worker działa offline
- Dostępność (a11y): kontrast, aria, focus states, nawigacja klawiaturą
- Błędy konsoli / warningi w runtime
- Routing SPA na GitHub Pages (404.html redirect, deep links, baseHref /demo-mechanik/)
- `npm audit` - podatności w zależnościach
- Brak sekretów / danych wrażliwych w repo
- Poprawność builda i CI/CD (deploy.yml)

Poza zakresem: prawdziwy backend, GDPR/cookie consent (brak trackingu/PII), płatności.

## Etapy

1. **Audyt** - production-readiness-auditor analizuje apkę wg powyższej listy,
   zapisuje wyniki do `reports/production-readiness-2026-07-22.md`. Read-only, brak zmian w kodzie.
2. **Plan napraw** - na podstawie znalezisk, orchestrator (główna sesja) uzupełnia ten
   plik o konkretne zadania napraw, priorytetyzowane, z podziałem na agentów.
3. **Delegacja napraw** - frontend-agent / seo-agent / security-agent-sonnet / docs-agent,
   w zależności od kategorii znaleziska.
4. **Review + start apki + testy** - zgodnie ze standardowym workflow (Step 6-8).
5. **Commit** - automatyczny po przejściu review/test/security, bez push bez zgody użytkownika.

## Wyniki audytu

Pełny raport: `reports/production-readiness-2026-07-22.md`. SEO/perf/a11y/npm audit/CI wszystkie PARTIAL, SPA routing FAIL (potwierdzony live).

## Decyzje użytkownika

- **Tożsamość marki**: zostaje **APEX Mechanik / Warszawa** (wersja z `SeoService`, faktycznie widoczna na żywej stronie). Statyczny `index.html`, `og-image.svg` i wszelkie inne miejsca z "AutoMistrzowie / Kraków" mają zostać zaktualizowane do APEX Mechanik / Warszawa - żeby cała apka (crawler czytający statyczny HTML i użytkownik widzący JS-rendered stronę) pokazywała spójną markę.
- **Angular upgrade 19→21**: TAK, zrobić teraz (to samo CVE co w hydraulik - `@angular/core@19.2.25`, CVSS 6.1 hydration DOM clobbering).
- **ESLint + CI gate**: TAK, dodać pełną konfigurację ESLint (`@angular-eslint`) + krok lint/test w `deploy.yml`.
- **Self-hosting obrazów**: nie dotyczy tej apki bezpośrednio - brak `<img>` w kodzie (cała ikonografia to inline SVG), więc to zadanie z pytania o obrazy nie ma tu zastosowania.

## Zadania do wykonania (zaakceptowane)

### High
1. Ujednolicić markę na APEX Mechanik / Warszawa wszędzie: `src/index.html` (static meta tagi), `public/og-image.svg` (treść grafiki/tekst), `seo.service.ts` (już poprawne), `robots.txt`/`sitemap.xml` jeśli odnoszą się do nazwy.
2. Wywołać `SeoService.setCanonical()` z `ngOnInit` każdego komponentu feature (obecnie zaimplementowane, ale nigdy nie wołane - wszystkie 6 stron ma identyczny canonical wskazujący homepage).
3. Naprawić `DEFAULT_OG_IMAGE` (`seo.service.ts:15`) - wskazuje na nieistniejący plik `/assets/og-mechanik.jpg` z wiodącym `/` (rozwiąże się poza `/demo-mechanik/`). Podpiąć realny, istniejący `og-image.svg` z pełnym URL uwzględniającym base path. Rozważyć eksport do PNG dla kompatybilności z crawlerami.
4. Naprawić routing SPA na GitHub Pages - potwierdzony live bug: nieznany URL cicho ładuje homepage z zagmatwanym query stringiem. Rekomendacja audytu: usunąć niedokończony skrypt `spa-github-pages` z `404.html` (prostsze, skoro prerendering + Angular wildcard route już obsługują nieznane ścieżki w apce) - zamiast dodawać brakujący dekoder.
5. Dodać widoczny wskaźnik fokusu na polach formularza rezerwacji (`booking.component.ts` linie 109,119,125,135,236,241) - potwierdzone live przez tab-through, obecnie brak jakiegokolwiek focus ringa.
6. Naprawić blokujący renderowanie import Google Fonts (`styles.scss:6`) - zamienić na `<link rel="preconnect">` + `<link rel="stylesheet">` w `index.html`, albo self-hostować font.
7. Angular upgrade 19→21 (`ng update`) - usuwa potwierdzone CVE w zainstalowanej wersji `@angular/core`.

### Medium
8. Usunąć sztuczne 200ms opóźnienie loading-screen, które przykrywa już wyrenderowaną (prerendered) treść - powiązać widoczność z faktycznym stanem ładowania zamiast sztywnego timera.
9. Dodać krok testów (`ng test --watch=false --browsers=ChromeHeadless`) + nowy ESLint do `deploy.yml` przed buildem.
10. Skrócić zduplikowany tytuł strony głównej ("Serwis Samochodowy Premium | APEX Mechanik - Serwis Samochodowy Premium").

### Low
11. Dodać pole `"engines"` w `package.json` dla spójności wersji Node.

## Status

- [x] Audyt wykonany
- [x] Plan napraw uzupełniony i zaakceptowany przez użytkownika
- [x] Naprawy zaimplementowane
- [x] Review + testy + security przeszły (lint/test/build zielone; security review nie był częścią tego przebiegu)
- [ ] Commit
