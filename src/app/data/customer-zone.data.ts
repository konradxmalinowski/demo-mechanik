export interface VehicleOverview {
  brand: string;
  model: string;
  year: number;
  vin: string;
  mileage: number;
  lastVisit: string;
  nextService: string;
  engineCapacity: string;
  fuelType: string;
  color: string;
}

export interface RepairHistoryItem {
  id: number;
  date: string;
  scope: string;
  mechanic: string;
  cost: number;
  status: 'completed' | 'in-progress';
}

export interface ServiceRecommendation {
  id: number;
  title: string;
  description: string;
  urgency: 'pilne' | 'zalecane' | 'informacyjne';
  dueKm?: number;
  dueDate?: string;
}

export interface LastVisit {
  id: number;
  date: string;
  service: string;
  status: 'Zakończona' | 'W trakcie';
  cost: number;
}

export const VEHICLE_OVERVIEW: VehicleOverview = {
  brand: 'BMW',
  model: '3 Series (G20) 320d',
  year: 2021,
  vin: 'WBA5R11090A000001',
  mileage: 67_420,
  lastVisit: '2026-04-15',
  nextService: '2026-10-01',
  engineCapacity: '2.0 TDI',
  fuelType: 'Diesel',
  color: 'Mineral White',
};

export const LAST_VISITS: LastVisit[] = [
  { id: 1, date: '2026-04-15', service: 'Wymiana oleju + filtry', status: 'Zakończona', cost: 420 },
  { id: 2, date: '2026-01-10', service: 'Naprawa zawieszenia - wahacze', status: 'Zakończona', cost: 1_280 },
  { id: 3, date: '2025-10-22', service: 'Serwis klimatyzacji', status: 'Zakończona', cost: 320 },
  { id: 4, date: '2025-07-08', service: 'Wymiana klocków hamulcowych (przód)', status: 'Zakończona', cost: 550 },
  { id: 5, date: '2025-03-15', service: 'Diagnostyka + naprawa elektryki', status: 'Zakończona', cost: 890 },
];

export const REPAIR_HISTORY: RepairHistoryItem[] = [
  {
    id: 1,
    date: '2026-04-15',
    scope: 'Wymiana oleju 5W-30 Longlife (6L) + filtr oleju + filtr powietrza + filtr kabinowy',
    mechanic: 'Marek Wiśniewski',
    cost: 420,
    status: 'completed',
  },
  {
    id: 2,
    date: '2026-01-10',
    scope: 'Wymiana wahacza przedniego prawego i lewego + geometria kół 4D',
    mechanic: 'Piotr Kamiński',
    cost: 1_280,
    status: 'completed',
  },
  {
    id: 3,
    date: '2025-10-22',
    scope: 'Odgrzybianie + uzupełnienie czynnika R134a (500g) + wymiana filtra kabinowego',
    mechanic: 'Marek Wiśniewski',
    cost: 320,
    status: 'completed',
  },
  {
    id: 4,
    date: '2025-07-08',
    scope: 'Wymiana klocków hamulcowych przednich Bosch + odpowietrzenie układu',
    mechanic: 'Adam Nowicki',
    cost: 550,
    status: 'completed',
  },
  {
    id: 5,
    date: '2025-03-15',
    scope: 'Diagnostyka OBD - kod P0170 (mieszanka paliwowa), wymiana czujnika MAF, kasowanie błędów',
    mechanic: 'Piotr Kamiński',
    cost: 890,
    status: 'completed',
  },
  {
    id: 6,
    date: '2024-11-20',
    scope: 'Wymiana akumulatora 80Ah AGM, rejestracja akumulatora w systemie IBS',
    mechanic: 'Adam Nowicki',
    cost: 680,
    status: 'completed',
  },
  {
    id: 7,
    date: '2024-06-05',
    scope: 'Serwis DSG - wymiana oleju i filtra skrzyni automatycznej',
    mechanic: 'Marek Wiśniewski',
    cost: 750,
    status: 'completed',
  },
];

export const SERVICE_RECOMMENDATIONS: ServiceRecommendation[] = [
  {
    id: 1,
    title: 'Wymiana tarcz hamulcowych (tył)',
    description: 'Grubość tarcz poniżej minimalnej wartości - 7.8 mm (minimum 8 mm). Wymiana wymagana ze względów bezpieczeństwa.',
    urgency: 'pilne',
    dueDate: '2026-07-01',
  },
  {
    id: 2,
    title: 'Wymiana płynu hamulcowego',
    description: 'Płyn hamulcowy powinien być wymieniany co 2 lata. Ostatnia wymiana - 2 lata temu. Zalecamy wymianę podczas najbliższej wizyty.',
    urgency: 'zalecane',
    dueDate: '2026-09-01',
  },
  {
    id: 3,
    title: 'Kontrola rozrządu',
    description: 'Przy aktualnym przebiegu (67 420 km) warto sprawdzić stan rozrządu. Producent zaleca wymianę co 80 000 km lub 4 lata.',
    urgency: 'zalecane',
    dueKm: 80_000,
  },
  {
    id: 4,
    title: 'Następna wymiana oleju',
    description: 'Planowana wymiana oleju przy 80 000 km lub do 2026-10-01. Aktualny przebieg: 67 420 km.',
    urgency: 'informacyjne',
    dueKm: 80_000,
    dueDate: '2026-10-01',
  },
  {
    id: 5,
    title: 'Sprawdzenie opon zimowych',
    description: 'Sezon zimowy zbliża się - zalecamy sprawdzenie głębokości bieżnika i ciśnienia opon zimowych przed montażem.',
    urgency: 'informacyjne',
    dueDate: '2026-11-01',
  },
];
