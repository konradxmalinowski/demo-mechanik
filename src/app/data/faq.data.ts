export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: 'Jak zarezerwować wizytę w warsztacie?',
    answer: 'Wizytę możesz zarezerwować online przez nasz formularz rezerwacyjny, telefonicznie pod numerem +48 500 100 200, lub osobiście w siedzibie warsztatu. Formularz online jest dostępny 24/7 i umożliwia wybór preferowanego terminu i usługi.',
  },
  {
    id: 2,
    question: 'Jakie marki pojazdów obsługujecie?',
    answer: 'Obsługujemy wszystkie popularne marki - BMW, Audi, Mercedes, Volkswagen, Skoda, Toyota, Ford, Hyundai, Kia, Opel, Renault, Peugeot i wiele innych. Nasi mechanicy posiadają doświadczenie z samochodami zarówno europejskimi, jak i azjatyckimi.',
  },
  {
    id: 3,
    question: 'Czy mogę zostawić auto na noc?',
    answer: 'Tak, oferujemy możliwość pozostawienia pojazdu na noc na naszym strzeżonym parkingu. Ustalamy to indywidualnie przy rezerwacji wizyty. W przypadku rozległych napraw to często najwygodniejsze rozwiązanie.',
  },
  {
    id: 4,
    question: 'Jak długo trwa standardowy przegląd?',
    answer: 'Standardowy przegląd techniczny trwa od 1 do 2 godzin, w zależności od zakresu. Kompleksowy przegląd przed zakupem samochodu używanego zajmuje ok. 2–3 godziny. O dokładnym czasie poinformujemy Cię przy umawianiu wizyty.',
  },
  {
    id: 5,
    question: 'Czy wystawiacie faktury VAT?',
    answer: 'Tak, na życzenie klienta wystawiamy faktury VAT. Możemy wystawić fakturę na osobę fizyczną lub firmę. Prosimy o podanie danych do faktury przy rezerwacji wizyty lub najpóźniej przy odbiorze auta.',
  },
  {
    id: 6,
    question: 'Jaką gwarancję dajecie na wykonane usługi?',
    answer: 'Na wszystkie wykonane naprawy udzielamy gwarancji - 12 miesięcy na robociznę i 24 miesiące na oryginalne części zamienne. Warunki gwarancji są jasno określone na fakturze lub protokole naprawy.',
  },
  {
    id: 7,
    question: 'Czy używacie oryginalnych części?',
    answer: 'Stosujemy wyłącznie oryginalne części OEM lub ich wysokiej jakości zamienniki od certyfikowanych dostawców (np. Bosch, Gates, Valeo, SKF). Używamy tylko sprawdzonych komponentów, których jakość potwierdzamy gwarancją.',
  },
  {
    id: 8,
    question: 'Co to jest kalkulator napraw?',
    answer: 'Kalkulator napraw to narzędzie, które umożliwia oszacowanie kosztów popularnych usług serwisowych. Wpisz dane pojazdu i wybierz kategorię usługi, aby otrzymać orientacyjną wycenę. Ostateczna cena może się różnić po przeprowadzeniu diagnozy.',
  },
  {
    id: 9,
    question: 'Czy można umówić się na wizytę w tym samym dniu?',
    answer: 'W miarę dostępności terminów przyjmujemy samochody w trybie pilnym tego samego dnia. Zadzwoń do nas jak najwcześniej - postaramy się wygospodarować czas na pilne naprawy, szczególnie jeśli dotyczy to bezpieczeństwa jazdy.',
  },
  {
    id: 10,
    question: 'Jak mogę śledzić postęp naprawy?',
    answer: 'Po pozostawieniu auta wysyłamy SMS i e-mail z potwierdzeniem przyjęcia. W trakcie naprawy informujemy o odkrytych usterkach i koniecznych pracach. Po zakończeniu naprawy otrzymasz wiadomość o gotowości do odbioru pojazdu.',
  },
  {
    id: 11,
    question: 'Czy diagnoza komputerowa jest płatna?',
    answer: 'Diagnostyka komputerowa kosztuje od 100 do 200 zł w zależności od zakresu. W przypadku, gdy zlecasz nam naprawę wykrytą podczas diagnozy, koszt diagnostyki wliczamy w koszt naprawy - diagnostyka jest wtedy bezpłatna.',
  },
  {
    id: 12,
    question: 'Jakie są godziny pracy warsztatu?',
    answer: 'Pracujemy od poniedziałku do piątku w godzinach 8:00–18:00 oraz w soboty 9:00–14:00. Rezerwacje online przyjmujemy całą dobę. W nagłych przypadkach, szczególnie związanych z bezpieczeństwem, proszę dzwonić na nasz numer alarmowy.',
  },
];
