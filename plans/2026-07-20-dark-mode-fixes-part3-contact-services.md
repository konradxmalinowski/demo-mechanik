# Naprawa dark mode - contact.component.ts i services.component.ts

## Problem

Trzecia i ostatnia czesc naprawy dark mode. `contact.component.ts` i `services.component.ts`
nigdy nie byly objete zadna z poprzednich napraw (home/booking/customer-zone/estimator, ani
nastepnie navbar/brands-marquee/footer) - maja ten sam wzorzec zahardkodowanych ciemnych
kolorow (`bg-[#0A0A0B] text-white`, `bg-[#111113]`, `border-white/N`, `placeholder-gray-600`
bez wariantu jasnego) co reszta aplikacji miala przed naprawa.

Skutek: po naprawie navbara (`text-mechanik-noir dark:text-white`), w trybie jasnym na
stronach /kontakt i /uslugi navbar renderuje ciemny tekst na wciaz-ciemnym tle strony -
tekst navbara staje sie niewidoczny.

## Zakres

- `src/app/features/contact/contact.component.ts`
- `src/app/features/services/services.component.ts`

## Metodologia

Zastosowano dokladnie ten sam wzorzec co w home/booking/customer-zone/estimator (zweryfikowany
w kodzie, nie tylko w opisie zadania):

- root wrapper: `bg-[#0A0A0B] text-white` -> `bg-white text-mechanik-noir dark:bg-mechanik-noir dark:text-white`
- karty/sekcje: `bg-[#111113]` -> `bg-gray-50 dark:bg-mechanik-surface`
- obramowania: `border-white/5` -> `border-black/5 dark:border-white/5` (analogicznie /10)
- tekst pomocniczy: `text-gray-400`/`text-gray-500` -> `text-gray-600 dark:text-gray-400` / `text-gray-600 dark:text-gray-500`
- linki breadcrumb hover: `hover:text-white` -> `hover:text-mechanik-noir dark:hover:text-white`
- breadcrumb "current page" (byl `text-[#EF4444]`) -> `text-red-600 dark:text-red-400`,
  zgodnie z ustalonym wzorcem z booking/customer-zone/estimator (identyczny element,
  identyczne miejsce w markupie) - lepszy kontrast w trybie jasnym niz surowy hex akcentu
- pola formularza (input/textarea): bg byl `bg-[#0A0A0B]` (czyli kolor ROOT, nie karty -
  inputy w oryginalnym designie celowo kontrastowaly z karta `#111113`) ->
  `bg-white dark:bg-mechanik-noir` (zachowuje ta sama hierarchie wizualna); border
  `border-black/10 dark:border-white/10`; tekst `text-mechanik-noir dark:text-white`;
  placeholder `placeholder-gray-400 dark:placeholder-gray-600` (wzorzec z booking.component.ts)
- ikona uslugi na tinted-accent-bg (`bg-[rgb(var(--apex-accent-rgb)/0.1)]`, `text-white`) ->
  `text-mechanik-noir dark:text-white`, zgodnie z identycznym wzorcem juz zaimplementowanym
  w `home.component.ts` (linia 133-134, ikony na `bg-mechanik-red/10`) - bialy stroke na
  jasnoróżowym tle (10% opacity akcentu w trybie jasnym) byl niewidoczny

## Bez zmian (marka/akcent, celowo)

- `bg-[#EF4444] text-white` / `hover:bg-[#DC2626]` - przycisk CTA formularza kontaktowego
- `style="background:var(--apex-accent)"` text-white - przycisk CTA na karcie uslugi
  (kolor stały #EF4444 w obu trybach, tlo jednolite - kontrast text-white pozostaje wysoki
  w obu trybach, zweryfikowano wizualnie)

## Forbidden

Nie dotykac navbar/brands-marquee/footer (naprawione wczesniej, nie scommitowane) ani
home/booking/customer-zone/estimator (naprawione i scommitowane).

## Kryteria akceptacji

- /kontakt i /uslugi poprawnie reaguja na motyw - tlo, karty, tekst, pola formularza
- navbar czytelny na obu stronach w trybie jasnym (glowny zglaszany problem)
- marka (czerwony akcent, CTA) bez zmian
- zero regresji w trybie ciemnym
