# Naprawa regresji - komponenty wspolne demo-mechanik

## Problem

Po wdrozeniu commita `fa331df` (naprawa dark mode w home/booking/customer-zone/estimator)
uzytkownik zglosil: "sa pomieszanie tryby jasny z ciemnym, zle dziala toggle". Diagnoza
(orchestrator, bezposrednia weryfikacja w przegladarce, 2026-07-20):

Mechanizm przelaczania dziala poprawnie (potwierdzone: `document.documentElement.className`
zmienia sie na "dark"/"", `localStorage['mechanik-dark-mode']` persystuje poprawnie, zero bledow w
konsoli). Problem jest wylacznie wizualny: 3 komponenty WSPOLNE (uzywane na kazdej stronie, nie
byly w owned files pierwotnego zadania, bo pierwotna diagnoza Explore-agenta objela tylko
home/booking/customer-zone/estimator.component.ts) nadal maja zahardkodowane kolory bez wariantow
dark:/light:

1. `src/app/shared/components/navbar/navbar.component.ts` - `.nav-header.scrolled { background-color:
   #0A0A0B; }` w bloku `styles:` (bez warunku), plus liczne klasy `text-gray-300`, `text-white`,
   `bg-gray-950` (mobile drawer), `bg-black/60` (backdrop) bez wariantow. Navbar zawsze wyglada
   ciemno po przescrollowaniu, niezaleznie od wybranego motywu.
2. `src/app/shared/components/brands-marquee/brands-marquee.component.ts` - `bg-[#111113]` (sekcja),
   gradient fade `from-[#111113]`, `text-white` (nazwy marek) - zawsze ciemne.
3. `src/app/shared/components/footer/footer.component.ts` - `bg-[var(--color-noir)]
   text-[var(--color-light)]` - `--color-noir`/`--color-light` to STALE tokeny (nieredefiniowane w
   `.dark` w styles.scss, w przeciwienstwie do `--color-bg`/`--color-text` ktore SA redefiniowane) -
   wiec stopka zawsze ciemna.

Efekt: w trybie jasnym uzytkownik widzi jasna tresc (naprawiona wczesniej) otoczona ciemnym
navbarem/paskiem marek/stopka - stad wrazenie "pomieszanych trybow".

## Kryteria akceptacji

- Navbar (desktop + mobile drawer + hamburger) poprawnie zmienia tlo/tekst miedzy trybem jasnym i
  ciemnym, spojnie z reszta strony.
- Pasek "Obslugiwane marki" (brands-marquee) - tlo i tekst marek reagujace na motyw.
- Stopka - tlo i tekst reagujace na motyw (uzyc `--color-bg`/`--color-text` LUB dodac jawne
  `dark:`/light warianty zamiast stalych `--color-noir`/`--color-light`).
- Marka (logo "APEX" czerwony akcent, przycisk CTA czerwony) MOZE pozostac stala w obu trybach -
  to swiadoma decyzja brandingowa z poprzedniej iteracji, nie zmieniac.
- Zero regresji w komponentach juz naprawionych (home, booking, customer-zone, estimator).
- Sprawdzic w przegladarce oba tryby na wszystkich stronach (navbar/footer/brands-marquee widoczne
  wszedzie, wiec jeden przeglad na stronie glownej + jednej podstronie wystarczy).

## Zakres i skala

Jedna aplikacja, jeden agent (frontend-agent), 3 pliki komponentow wspolnych. Rownolegle z fixem w
demo-fryzjer (inne repo, brak konfliktu).

## Pliki (owned by frontend-agent)

- `src/app/shared/components/navbar/navbar.component.ts`
- `src/app/shared/components/brands-marquee/brands-marquee.component.ts`
- `src/app/shared/components/footer/footer.component.ts`

## Delegacja

frontend-agent - pelny zakres 3 plikow wyzej, rownolegle z frontend-agent naprawiajacym
demo-fryzjer (SPA routing fix, niepowiazany bug).
