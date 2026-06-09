export interface EstimatorOption {
  id: string;
  label: string;
  price: number;
}

export interface EstimatorCategory {
  id: string;
  label: string;
  description: string;
  options: EstimatorOption[];
}

export const ESTIMATOR_CATEGORIES: EstimatorCategory[] = [
  {
    id: 'wymiana-oleju',
    label: 'Wymiana oleju',
    description: 'Wymiana oleju silnikowego z filtrem',
    options: [
      { id: 'olej-osobowy-mineralny', label: 'Osobowy — olej mineralny', price: 180 },
      { id: 'olej-osobowy-syntetyczny', label: 'Osobowy — olej syntetyczny', price: 280 },
      { id: 'olej-suv-syntetyczny', label: 'SUV/4x4 — olej syntetyczny', price: 350 },
      { id: 'olej-longlife', label: 'Longlife (BMW/Audi/VW)', price: 420 },
    ],
  },
  {
    id: 'hamulce',
    label: 'Hamulce',
    description: 'Wymiana elementów układu hamulcowego',
    options: [
      { id: 'hamulce-klocki-przod', label: 'Klocki przednie', price: 350 },
      { id: 'hamulce-klocki-tyl', label: 'Klocki tylne', price: 320 },
      { id: 'hamulce-tarcze-przod', label: 'Tarcze przednie + klocki', price: 700 },
      { id: 'hamulce-tarcze-tyl', label: 'Tarcze tylne + klocki', price: 650 },
      { id: 'hamulce-komplet', label: 'Komplet (przód + tył)', price: 1_200 },
    ],
  },
  {
    id: 'klimatyzacja',
    label: 'Klimatyzacja',
    description: 'Serwis układu klimatyzacji',
    options: [
      { id: 'klima-odgrzybianie', label: 'Odgrzybianie', price: 150 },
      { id: 'klima-uzupelnienie', label: 'Uzupełnienie czynnika (R134a)', price: 250 },
      { id: 'klima-pelny-serwis', label: 'Pełny serwis (odgrzyb + czynnik)', price: 350 },
      { id: 'klima-r1234yf', label: 'Uzupełnienie czynnika R1234yf', price: 480 },
    ],
  },
  {
    id: 'akumulator',
    label: 'Akumulator',
    description: 'Wymiana akumulatora samochodowego',
    options: [
      { id: 'aku-60ah', label: 'Akumulator 60Ah (osobowy)', price: 450 },
      { id: 'aku-72ah', label: 'Akumulator 72Ah (osobowy)', price: 520 },
      { id: 'aku-80ah-agm', label: 'Akumulator 80Ah AGM (start-stop)', price: 680 },
      { id: 'aku-95ah-agm', label: 'Akumulator 95Ah AGM (premium)', price: 850 },
    ],
  },
];
