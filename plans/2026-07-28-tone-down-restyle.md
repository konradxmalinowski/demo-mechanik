# Stonowanie stylu całej aplikacji + poprawki skalowania mobilnego - demo-mechanik

## Problem

Zgłoszenie użytkownika: cała aplikacja jest w stylu "rajdowym", bardzo ostrym, i ma być bardziej
stonowana. Punkt wyjścia: nagłówki sekcji w Strefie Klienta zaczynają się od `//` (styl komentarza
w kodzie), np. `// diagnostic_dashboard_v2.0` - to ma zniknąć. Użytkownik poprosił o propozycję,
co jeszcze warto zmienić w tym kierunku, oraz zgłosił dwie osobne usterki skalowania na telefonie
(karuzela opinii, pasek postępu rezerwacji).

Pełny audyt (Explore agent, 2026-07-28) zidentyfikował źródła "rajdowego, ostrego" charakteru w
całej aplikacji - nie chodzi o kanciaste kształty (rogi są już zaokrąglone), tylko o: dominację
czerwieni jako jedynego akcentu wszędzie, ciężką typografię (font-black + uppercase + tracking na
niemal każdym nagłówku), oraz Strefę Klienta udającą terminal (monospace na całym tekście, nie
tylko liczbach, plus pseudo-kod `// ...`).

## Decyzje użytkownika (potwierdzone)

1. **Nazwa marki "APEX" zostaje bez zmian** - mimo że to termin wyścigowy, zmiana nazwy wykracza
   poza zakres "stonowania stylu". Nie ruszamy wordmarku, tytułu strony ani nazwy w meta description.
2. **Czerwony zostaje jedynym akcentem w całej aplikacji, ale w przyciemnionym/mniej nasyconym
   odcieniu** - nie wprowadzamy drugiego neutralnego koloru do focus ringów/obramowań/breadcrumbów,
   tylko zmieniamy sam odcień czerwieni na spokojniejszy.
3. **Strefa Klienta traci cały charakter terminala** - zwykła czcionka dla tekstu i nagłówków,
   monospace zostaje wyłącznie dla VIN i liczb technicznych, `// ...` znika całkowicie, plakietka
   "DEMO MODE" zostaje ale bez pulsującej czerwonej kropki.
4. **Pulsujące czerwone kropki (hero + Strefa Klienta) tracą animację pulsowania** - kropka zostaje
   jako statyczny wskaźnik, bez efektu "alarmu".

## Kryteria akceptacji

### A. Kolor - jeden token, przyciemniony odcień

- `mechanik-red` w `tailwind.config.js` zamieniony z płaskiej wartości `#EF4444` na parę
  jasny/ciemny: `DEFAULT`/`light-text`: `#B91C1C` (już precedens w kodzie - użyty wcześniej w
  breadcrumbie Strefy Klienta jako "bezpieczny na jasnym tle wariant czerwieni marki", kontrast
  6.47:1 na bieli), `dark-text`: `#EF4444` (obecna wartość, już zweryfikowana - 5.26:1 na
  `mechanik-noir`). Analogiczny wzorzec do już istniejącego `salon-gold`/`hydraulik-navy/steel` w
  siostrzanych projektach tego samego dewelopera.
- **Konsolidacja**: wszystkie 26 twardo zakodowanych hex-ów czerwieni (`#EF4444`, `#DC2626`,
  `#B91C1C`, `#f87171`) i 22 surowe klasy Tailwind (`bg-red-*`/`text-red-*`/`border-red-*`) w 9
  plikach komponentów zamienione na jeden token `mechanik-red`/`mechanik-red-dark-text` - efekt
  uboczny: jedno miejsce do zmiany koloru w przyszłości zamiast 67 rozrzuconych odwołań.
  Zmienna CSS `--apex-accent`/`--apex-accent-rgb` (`styles.scss`) zaktualizowana do tej samej nowej
  wartości - używana w stylach komponentowych (booking, estimator, customer-zone, services).
- Kontrast WCAG AA zweryfikowany dla nowego odcienia we wszystkich miejscach, gdzie tekst leży
  bezpośrednio na kolorowym tle (nie tylko jako akcent na neutralnym tle).

### B. Typografia - mniej agresywna, ale nie wszędzie jednakowo

- `font-black` zamieniony na `font-bold` na nagłówkach sekcji (`&lt;h2&gt;` na każdej stronie: "Nasze
  usługi", "Jak pracujemy", "Dlaczego my?", "Opinie klientów", "FAQ", "Gotowy na serwis premium?"
  itd.) - **poza hero `&lt;h1&gt;`** na stronie głównej (`home.component.ts:86`), które może zostać
  `font-black` jako jedno, celowe mocne uderzenie na starcie strony, żeby nie spłaszczyć całej
  hierarchii wizualnej do jednego poziomu.
- `uppercase` + szeroki `tracking-*` zostaje jako motyw (to nie jest per se "rajdowe", to częsty
  wzorzec w web designie dla etykiet/badge'y), ale **bez towarzyszącego `font-black`** tam, gdzie
  oba występowały razem - sama zmiana z A wystarczy w większości miejsc.
- Rozmiar nagłówków (`text-4xl` na h1 podstron, hero `clamp(2.5rem,8vw,5rem)`) pozostaje bez zmian -
  to kwestia hierarchii/czytelności, nie "ostrości", i użytkownik nie zgłaszał tego jako problem.

### C. Strefa Klienta - koniec charakteru terminala

- Usunąć wszystkie 10 wystąpień prefiksu `// ` w `customer-zone.component.ts` (linie 68, 80, 133,
  136, 170, 173, 199, 227, 232, 234) - zwykły tekst nagłówków/opisów bez prefiksu.
- Usunąć klasę `mono`/`font-mono` z nagłówków (`&lt;h1&gt;` "STREFA KLIENTA" linia 67, sekcyjne `&lt;h2&gt;`),
  opisów (linia 82: rok/paliwo/kolor pojazdu), treści tabeli wizyt (linia 141), notatek z napraw
  (linia 190), dat zaleceń (linie 215/218) - te wracają do domyślnej czcionki aplikacji.
- **Zachować** monospace wyłącznie dla samego numeru VIN (linia 86) i wartości liczbowych/kwot,
  gdzie ma to realne uzasadnienie typograficzne (wyrównanie cyfr w tabeli).
- Usunąć zduplikowaną lokalną deklarację `.mono` w `styles:[]` tego komponentu (linia 36) - zbędna
  po ograniczeniu zakresu użycia, globalna klasa w `styles.scss` wystarczy dla VIN/liczb.
- Plakietka "DEMO MODE" (linie 70-73) zostaje jako element, ale bez pulsującej kropki (patrz D).

### D. Animacje i zbędny badge

- Cały badge "Premium Auto Service" w hero (`home.component.ts:81-84` - pigułka z pulsującą
  kropką i tym tekstem) **usunięty całkowicie**, nie tylko odpulsowany - użytkownik zdecydował, że
  ten element ma zniknąć, nie zostać złagodzony. Sprawdzić czy usunięcie nie zostawia nienaturalnej
  pustej przestrzeni nad `&lt;h1&gt;` (linia 86) - jeśli tak, dostosować `mb-6`/spacing na kontenerze.
- `animate-pulse` usunięty z kropki w badge'u "DEMO MODE" (`customer-zone.component.ts:71`, ten
  badge zostaje, tylko traci puls) - kropka zostaje jako statyczny wskaźnik.
- `animate-pulse` na tekście "Ładowanie..." (`loading-screen.component.ts:59`) - **nie jest częścią
  tego zgłoszenia** (to nie czerwona kropka, to neutralny szary tekst ładowania) - zostaje bez
  zmian, chyba że przy realizacji okaże się, że i to razi w tym samym duchu - do potwierdzenia
  wtedy, nie zgadywać teraz.

### E. Dwie usterki skalowania mobilnego (znalezione, niezależne od stylu)

- **Karuzela "Opinie klientów"** (`home.component.ts:314-315`): `visibleTestimonials = 3` jest
  stałą, niezależną od szerokości ekranu - każda karta ma szerokość `100/3 = 33%` niezależnie od
  viewportu, więc na telefonie karty są nieczytelnie wąskie. Naprawa: `visibleTestimonials`
  responsywne (np. 1 na mobile, 2 na tablet, 3 na desktop) - przez `HostListener`/resize observer
  lub CSS-owe podejście (media query zamiast JS-owej stałej), do wyboru przez frontend-agenta w
  zależności co lepiej pasuje do istniejącego wzorca (sygnały Angular już są w tym komponencie).
- **Pasek postępu rezerwacji** (`booking.component.ts:90-99` + style `.step-bubble`/`.step-line`
  linie 48,52): stałe szerokości (`step-bubble` 2rem, `step-line` 2.5rem) dla 6 kroków bez żadnego
  responsywnego zmniejszenia/zawijania - minimalna szerokość paska to ok. 480px, więc na wąskim
  telefonie (375px) pasek wychodzi poza viewport. Naprawa: zmniejszyć `step-bubble`/`step-line` na
  małych ekranach (np. przez media query w `styles:[]` tego komponentu, analogicznie do reszty
  responsywnych wzorców w aplikacji) lub owinąć w kontener z `overflow-x-auto` jako fallback -
  preferować zmniejszenie rozmiaru, `overflow-x-auto` tylko jeśli zmniejszenie nie wystarczy przy
  najmniejszych obsługiwanych szerokościach (320-375px).

## Zakres i skala

Jedna aplikacja (demo-mechanik), ale duży zasięg w tej jednej aplikacji - dotyczy niemal każdego
pliku w `src/app/features/*` i part `src/app/shared/components/*`. Jeden agent (frontend-agent),
sekwencyjnie w ramach jednego repo (nie ma tu naturalnego podziału na rozłączne pod-zadania bez
większego ryzyka konfliktów, skoro zmiana koloru w `tailwind.config.js` wpływa na wszystkie pliki
naraz - lepiej jeden agent ogarniający całość spójnie niż kilku równoległych nadpisujących się na
tym samym tokenie).

## Warstwy dotknięte

Wyłącznie frontend (Angular + Tailwind + SCSS). Brak zmian backend/DB/auth/API.

## Pliki do zmiany (owned by frontend-agent)

- `tailwind.config.js` - token `mechanik-red` (DEFAULT/light-text/dark-text)
- `src/styles.scss` - `--apex-accent`/`--apex-accent-rgb`, globalna klasa `.mono`/`.font-mono` (bez
  zmian samej definicji, tylko ograniczenie miejsc użycia w komponentach)
- `src/app/features/home/home.component.ts` - font-black na h2, pulsująca kropka, testimonial carousel fix
- `src/app/features/services/services.component.ts` - font-black na h2, kolor
- `src/app/features/booking/booking.component.ts` - font-black na h2, kolor, step-progress mobile fix
- `src/app/features/estimator/estimator.component.ts` - font-black na h2, kolor
- `src/app/features/customer-zone/customer-zone.component.ts` - usunięcie `//`, mono, pulsująca kropka, kolor
- `src/app/features/contact/contact.component.ts` - font-black na h2, kolor
- `src/app/shared/components/navbar/navbar.component.ts` - kolor
- `src/app/shared/components/footer/footer.component.ts` - kolor (jeśli dotyczy)
- `src/app/shared/components/loading-screen/loading-screen.component.ts` - kolor spinnera (nie
  ruszać pulsującego tekstu ładowania, patrz D)
- `src/app/shared/components/demo-modal/demo-modal.component.ts` - kolor przycisku
- `src/app/shared/components/brands-marquee/brands-marquee.component.ts` - bez zmian koloru/stylu
  (nie zgłoszono problemu, marquee samo w sobie nie jest "rajdowe") - agent NIE dotyka tego pliku
  chyba że kolor czerwieni tam też występuje i wymaga konsolidacji tokenu

## Edge case'y

- Kontrast WCAG AA dla nowego, przyciemnionego czerwonego musi być zweryfikowany osobno dla każdego
  miejsca użycia jako tło-z-białym-tekstem (przyciski) vs tekst-na-jasnym-tle (breadcrumb, linki) -
  te mają różne wymagania kontrastu i różne warianty tokenu (light-text/dark-text).
  wymagania kontrastu i różne warianty tokenu (light-text/dark-text).
- Testimonial carousel: sprawdzić zachowanie przy zmianie rozmiaru okna w locie (resize), nie tylko
  przy początkowym załadowaniu - `visibleTestimonials` musi się przeliczyć bez przeładowania strony.
- Booking step-progress: sprawdzić najwęższy typowy viewport (320px, iPhone SE) osobno od 375/390px
  - to często pomijany przypadek brzegowy.
- Usunięcie `font-black`/`mono` nie może obniżyć kontrastu tekstu, który wcześniej polegał na samej
  grubości fontu dla czytelności na kolorowym tle.
- Zmiana koloru w jednym miejscu (token) nie może pominąć żadnego z 67 zidentyfikowanych odwołań -
  frontend-agent powinien na końcu zgrepować `#EF4444|#DC2626|#B91C1C|#f87171|red-[0-9]` w całym
  `src/` żeby potwierdzić zero pozostałości poza celowo zachowanymi (jeśli takie są, wypisać je w
  raporcie z uzasadnieniem).
