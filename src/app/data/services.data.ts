export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  details: string[];
  approxTime: string;
  approxCost: string;
  category: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'diagnostyka',
    name: 'Diagnostyka komputerowa',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    description: 'Profesjonalna diagnostyka komputerowa - odczyt błędów OBD, analiza parametrów pracy silnika, kontrola układów elektronicznych.',
    details: ['Odczyt kodów błędów OBD-II', 'Analiza parametrów pracy silnika', 'Diagnoza ABS i ESP', 'Kontrola układu klimatyzacji', 'Test instalacji elektrycznej'],
    approxTime: '30–60 min',
    approxCost: '100–200 zł',
    category: 'Diagnostyka',
  },
  {
    id: 'serwis-olejowy',
    name: 'Serwis olejowy',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    description: 'Kompleksowy serwis olejowy - wymiana oleju silnikowego z filtrem, kontrola pozostałych płynów eksploatacyjnych.',
    details: ['Wymiana oleju silnikowego', 'Wymiana filtra oleju', 'Kontrola płynu chłodniczego', 'Kontrola płynu hamulcowego', 'Kontrola płynu wspomagania'],
    approxTime: '30–45 min',
    approxCost: '180–350 zł',
    category: 'Oleje',
  },
  {
    id: 'klimatyzacja',
    name: 'Klimatyzacja',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    description: 'Pełen serwis klimatyzacji - odgrzybianie, uzupełnianie czynnika chłodniczego, kontrola szczelności układu.',
    details: ['Odgrzybianie układu', 'Uzupełnianie czynnika R134a/R1234yf', 'Kontrola szczelności', 'Wymiana filtra kabinowego', 'Sprawdzenie kompresora'],
    approxTime: '60–90 min',
    approxCost: '250–500 zł',
    category: 'Klimatyzacja',
  },
  {
    id: 'hamulce',
    name: 'Układ hamulcowy',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Naprawa i konserwacja układu hamulcowego - wymiana tarcz, klocków, szczęk, kalibracja EPB.',
    details: ['Wymiana tarcz hamulcowych', 'Wymiana klocków hamulcowych', 'Wymiana szczęk bębnowych', 'Kalibracja elektrycznego hamulca postojowego', 'Odpowietrzanie układu'],
    approxTime: '60–120 min',
    approxCost: '300–800 zł',
    category: 'Hamulce',
  },
  {
    id: 'zawieszenie',
    name: 'Zawieszenie',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    description: 'Diagnoza i naprawa zawieszenia - amortyzatory, sprężyny, sworznie, tuleje, geometria kół.',
    details: ['Wymiana amortyzatorów', 'Wymiana sprężyn', 'Wymiana sworzni i tulei', 'Ustawienie geometrii kół', 'Kontrola układu kierowniczego'],
    approxTime: '90–180 min',
    approxCost: '400–1200 zł',
    category: 'Zawieszenie',
  },
  {
    id: 'elektryka',
    name: 'Elektryka samochodowa',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    description: 'Diagnostyka i naprawa instalacji elektrycznej - alternatory, rozruszniki, akumulatory, czujniki.',
    details: ['Wymiana akumulatora', 'Naprawa alternatora', 'Wymiana rozrusznika', 'Naprawa instalacji elektrycznej', 'Diagnostyka czujników'],
    approxTime: '60–240 min',
    approxCost: '200–1500 zł',
    category: 'Elektryka',
  },
];
