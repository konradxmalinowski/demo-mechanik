# Demo: Warsztat Samochodowy

Działające demo strony dla warsztatu samochodowego / mechanika - zbudowane w Angular + TypeScript z Angular Signals i Tailwind CSS.

Część portfolio [Konrad Malinowski](http://konrad.malinowski.ct8.pl) - pokazuje, jak może wyglądać strona Twojej firmy.

**Live demo:** https://konradxmalinowski.github.io/demo-mechanik/

---

## Co pokazuje to demo

- Strefa klienta z pełną historią napraw pojazdu
- Kalkulator kosztów serwisu krok po kroku
- Wieloetapowa rezerwacja wizyty (wybór usługi → data → potwierdzenie)
- Diagnostyka - szczegółowe opisy usterek z kodem błędu
- Następny przegląd automatycznie w kalendarzu klienta
- Pełna responsywność - mobile-first
- PWA - aplikację można zainstalować na telefonie, działa też offline

## Stack

- **Angular 19** + TypeScript
- **Angular Signals** - reaktywny stan bez BehaviorSubject
- **Tailwind CSS** - stylowanie utility-first
- **Angular CLI** - build i serwowanie

## Uruchomienie lokalne

```bash
npm install
ng serve
```

Aplikacja będzie dostępna pod http://localhost:4200

## Budowanie produkcyjne

```bash
ng build
```

Pliki wyjściowe znajdą się w katalogu `dist/`.

## Struktura

```
src/
├── app/
│   ├── components/     # Komponenty UI
│   ├── pages/          # Widoki (Home, Client Zone, Booking, Diagnostics)
│   └── services/       # Logika kalkulatora, historii pojazdu
└── assets/
```

## Zainteresowany podobną stroną?

Napisz: [malinowski.konrad45@gmail.com](mailto:malinowski.konrad45@gmail.com)  
Portfolio: [konrad.malinowski.ct8.pl](http://konrad.malinowski.ct8.pl)
