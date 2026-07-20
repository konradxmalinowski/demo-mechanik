# Naprawa zmiany motywu - demo-mechanik (pelny zakres)

## Problem

Zgloszenie: "w ogole to nie dziala zmiana motywu". Diagnoza (Explore agent, 2026-07-20): to NIE
jest blad w mechanizmie przelaczania. Klik, sygnal, zapis do localStorage
(`mechanik-dark-mode`), doklejanie klasy `dark` do `document.documentElement` oraz konfiguracja
Tailwind (`darkMode: 'class'`) - wszystko dziala poprawnie
(`src/app/shared/components/navbar/navbar.component.ts` linie 105-121, 216-222, 254-270).

Realny problem: niemal cala tresc strony ma kolory wpisane na sztywno jako `style="background:#..."`
/ `color:#..."` zamiast klas reagujacych na motyw:

- `src/app/features/home/home.component.ts` - 34 wystapien inline (linie m.in. 72, 75, 131, 153,
  167, 206, 223, 235)
- `src/app/features/booking/booking.component.ts` - 13 wystapien
- `src/app/features/customer-zone/customer-zone.component.ts` - 16 wystapien
- `src/app/features/estimator/estimator.component.ts` - 3 wystapienia

Jedyne miejsca reagujace na `.dark` to `navbar.component.ts` (tylko aria-label ikony, bez
widocznych kolorow) i `demo-modal.component.ts` (rzadko widoczny). Poniewaz nieprzezroczyste tla
inline pokrywaja caly viewport w kazdej sekcji, `body { background: var(--color-bg) }` z
`styles.scss` nigdy nie jest widoczne pod spodem - stad wrazenie ze przelacznik nic nie robi.

Uzytkownik potwierdzil zakres: PELNA poprawka - zastapic zahardkodowane kolory inline klasami
reagujacymi na motyw w home, booking, customer-zone, estimator (nie tylko kosmetyczne
domkniecie istniejacego mechanizmu).

## Kryteria akceptacji

- Przelaczenie motywu widocznie zmienia wyglad KAZDEJ sekcji: home, booking, customer-zone,
  estimator (nie tylko navbar/modal).
- Wszystkie 66 zidentyfikowanych wystapien inline stylow z kolorami zastapione klasami Tailwind
  `dark:` (lub zmiennymi CSS z `styles.scss` reagujacymi na `.dark`) - bez utraty oryginalnego
  wygladu w trybie, ktory byl dotychczas jedynym widocznym (prawdopodobnie ciemny, biorac pod uwage
  `--color-noir`).
- Kontrast tekstu na tle spelnia WCAG AA w obu trybach po zmianie.
- Mechanizm przelaczania (navbar, localStorage, sygnal) pozostaje bez zmian - dziala juz poprawnie.
- Brak regresji w layoucie/funkcjonalnosci (booking flow, estimator, customer-zone dalej dzialaja
  funkcjonalnie tak samo, zmienia sie tylko warstwa kolorow).

## Zakres i skala

Jedna aplikacja, ale wieksza objetosciowo (4 pliki komponentow, ~66 miejsc do zmiany) - jeden
frontend-agent, sekwencyjnie przez pliki w ramach repo (kazdy plik to spojna jednostka, nie ma
sensu dzielic pojedynczego komponentu na wiecej agentow). Rownolegle wzgledem pozostalych 3
projektow (osobne repo git, brak konfliktu plikow).

## Warstwy dotkniete

Wylacznie frontend (Angular + Tailwind CSS). Brak zmian backend/DB/auth.

## Pliki do naprawy (owned by frontend-agent)

- `src/app/features/home/home.component.ts` (34 miejsca inline style)
- `src/app/features/booking/booking.component.ts` (13 miejsc)
- `src/app/features/customer-zone/customer-zone.component.ts` (16 miejsc)
- `src/app/features/estimator/estimator.component.ts` (3 miejsca)
- `src/styles.scss` - ewentualne rozszerzenie zmiennych CSS jesli przyda sie wiecej niz
  `--color-bg`/`--color-text`

## Strategia naprawy

Dla kazdego inline `style="background:#HEX"` / `color:#HEX` zmapowac odpowiadajacy kolor na
istniejaca palete Tailwind projektu (sprawdzic `tailwind.config.js` pod katem customowych kolorow)
i zastapic klasa `bg-...`/`text-...` z jawnym wariantem `dark:` tam gdzie kolor ma sie roznic
miedzy trybami. Tam gdzie obecny (jedyny widoczny) wyglad ma pozostac dokladnie taki sam w trybie
ciemnym, upewnic sie ze `dark:` wariant odtwarza dokladnie ten sam odcien co dotychczasowy inline
hex, a jasny wariant dostaje nowy, spojny z reszta palety (np. wzorujac sie na demo-hydraulik, ktory
ma poprawnie dzialajacy jasny motyw w tym samym stacku Angular+Tailwind).

## Edge cases

- Formularze bookingu/estimatora z wprowadzonymi danymi przy przelaczeniu motywu w trakcie
  wypelniania - stan bez zmian, tylko warstwa wizualna.
- Elementy z inline stylami laczonymi z warunkami Angular (`[style.background]`, ngClass) - sprawdzic
  czy zamiana na klasy nie psuje logiki warunkowej (np. kolor statusu w customer-zone moze zalezec
  od danych, nie tylko od motywu - rozdzielic te dwa wymiary).
- Kontrast dla elementow, ktore obecnie polegaja na zawsze-ciemnym tle (np. przyciski/CTA z jasnym
  tekstem) - w trybie jasnym upewnic sie ze tekst nadal czytelny, nie tylko tlo.

## Delegacja

frontend-agent - pelny zakres 4 plikow wyzej, rownolegle z frontend-agent dla demo-fryzjer,
demo-hydraulik, demo-restauracja. To najwiekszy z czterech pod-zadan objetosciowo.
