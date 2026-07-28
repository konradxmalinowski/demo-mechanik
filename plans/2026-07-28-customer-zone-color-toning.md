# Stonowanie kolorów - STREFA KLIENTA (demo-mechanik)

## Problem

`src/app/features/customer-zone/customer-zone.component.ts` ("STREFA KLIENTA") ma ostry,
"terminalowy" charakter (mono font, uppercase, `font-black`) co jest świadomym motywem
"diagnostic_dashboard" tej sekcji - to zostaje bez zmian. Problem zgłoszony przez użytkownika
dotyczy kolorów: odznaki statusów mieszają przypadkowe, niepowiązane z marką kolory - surowy
`red-600` (zamiast `mechanik-red`), oraz zupełnie obce marce `green-500`/`green-700`/`green-400`
(linia 156, odznaka "zakończone") i niebieski `rgba(59,130,246,...)` (`badge-informacyjne` w
bloku `styles`, linie 41-42) - żaden z tych dwóch (zielony, niebieski) nie występuje nigdzie indziej
w palecie `mechanik-noir/red/yellow/light/surface`. Efekt: sekcja wygląda ostrzej i bardziej
chaotycznie kolorystycznie niż reszta aplikacji.

## Kryteria akceptacji

- Odznaka "zakończone" (linia 156, `bg-green-500/10 text-green-700 dark:text-green-400
  border-green-500/30`) zamieniona na kolor spójny z paletą marki (np. `mechanik-yellow` na
  "zalecane/ostrzeżenie" już istnieje - dla "zakończone/ok" dobrać stonowany wariant `mechanik-red`
  o niskiej intensywności albo neutralny szary, tak żeby nie dokładać czwartego, niepowiązanego
  koloru - do ustalenia przez agenta z uzasadnieniem w raporcie).
- `badge-informacyjne` (niebieski, linie 41-42 w bloku `styles`) zamieniony na kolor z palety marki
  zamiast `rgba(59,130,246,...)`.
- Surowy `text-red-600 dark:text-red-400` (breadcrumb, nagłówki sekcji) ujednolicony do istniejącego
  tokenu `mechanik-red` (#EF4444) tam, gdzie sensownie zastępuje obecne użycie, bez zmiany
  ogólnego charakteru "czerwono-żółto-czarnej" identyfikacji marki.
- Ogólne wrażenie "ostrości" sekcji złagodzone przez redukcję liczby odrębnych, przypadkowych barw
  (green/blue) do palety `mechanik-*` - bez usuwania samego stylu mono/uppercase/terminal, który jest
  zamierzonym motywem tej sekcji.
- Brak regresji kontrastu WCAG AA w obu trybach.

## Zakres i skala

Jedna aplikacja, jeden agent (frontend-agent), jeden plik. Część szerszego zadania spójności
brandingu dla 4 niezależnych demo (fryzjer, hydraulik, restauracja, mechanik) - każde osobne repo
git, agent działa równolegle względem pozostałych trzech, rozłączne zbiory plików.

## Warstwy dotknięte

Wyłącznie frontend (Angular + Tailwind + inline component styles). Brak zmian backend/DB/auth/API.

## Plik do zmiany (owned by frontend-agent)

- `src/app/features/customer-zone/customer-zone.component.ts` - blok `styles` (linie ok. 37-42:
  `badge-pilne`, `badge-zalecane`, `badge-informacyjne`) i template (linie ok. 61, 156) jak opisano
  wyżej.

## Edge case'y

- Trzy typy odznak (`pilne`/`zalecane`/`informacyjne`) muszą pozostać wizualnie i semantycznie
  rozróżnialne od siebie nawzajem nawet po ograniczeniu do palety marki (np. różne odcienie/
  intensywność `mechanik-red` i `mechanik-yellow`, plus neutralny szary dla czysto informacyjnych) -
  nie zlewać ich w jeden kolor.
- Sprawdzić tryb ciemny (`:host-context(.dark)` warianty tych samych klas) - muszą być zmienione
  spójnie z wariantem jasnym.
