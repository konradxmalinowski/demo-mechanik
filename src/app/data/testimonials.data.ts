export interface Testimonial {
  id: number;
  name: string;
  vehicle: string;
  rating: number;
  comment: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: 'Tomasz Kowalski',
    vehicle: 'BMW 3 Series (2019)',
    rating: 5,
    comment: 'Profesjonalna obsługa i szybka diagnoza. Mechanicy wiedzą co robią, a ceny są transparentne. Polecam każdemu!',
  },
  {
    id: 2,
    name: 'Anna Wiśniewska',
    vehicle: 'Audi A4 (2021)',
    rating: 5,
    comment: 'Byłam tu kilkakrotnie — zawsze terminowo, zawsze solidnie. Klimatyzacja działa jak nowa po serwisie. Bardzo dobry kontakt z klientem.',
  },
  {
    id: 3,
    name: 'Marcin Nowak',
    vehicle: 'Mercedes C-Class (2018)',
    rating: 5,
    comment: 'Naprawili problem z elektroniką, z którym dwa inne warsztaty sobie nie poradziły. Diagnostyka na najwyższym poziomie.',
  },
  {
    id: 4,
    name: 'Katarzyna Zielińska',
    vehicle: 'Toyota Corolla (2020)',
    rating: 4,
    comment: 'Szybka wymiana klocków hamulcowych. Ceny w porządku, obsługa miła. Na pewno wrócę przy następnym przeglądzie.',
  },
  {
    id: 5,
    name: 'Piotr Wojciechowski',
    vehicle: 'Skoda Octavia (2017)',
    rating: 5,
    comment: 'Świetny warsztat! Zepsute zawieszenie naprawione w jeden dzień. Auto jedzie jak nowe. Zdecydowanie polecam.',
  },
  {
    id: 6,
    name: 'Monika Kowalczyk',
    vehicle: 'Ford Focus (2019)',
    rating: 5,
    comment: 'Profesjonalizm na każdym kroku — od przyjęcia auta, przez diagnostykę, aż po oddanie pojazdu. Cudowny personel.',
  },
  {
    id: 7,
    name: 'Krzysztof Lewandowski',
    vehicle: 'Hyundai Tucson (2022)',
    rating: 4,
    comment: 'Szybki serwis olejowy i wymiana filtrów. Dostałem szczegółowy raport o stanie auta. Warto skorzystać.',
  },
  {
    id: 8,
    name: 'Magdalena Wróbel',
    vehicle: 'Kia Sportage (2021)',
    rating: 5,
    comment: 'Znaleźli i usunęli awarię układu hamulcowego, której nie wykrył dealer. Profesjonalizm i rzetelność na najwyższym poziomie!',
  },
  {
    id: 9,
    name: 'Andrzej Szymański',
    vehicle: 'Porsche Cayenne (2020)',
    rating: 5,
    comment: 'Rzadko spotyka się warsztat, który obsługuje Porsche z taką znajomością marki. Doskonały serwis, polecam z pełnym przekonaniem.',
  },
  {
    id: 10,
    name: 'Joanna Dąbrowska',
    vehicle: 'BMW X5 (2018)',
    rating: 5,
    comment: 'Kompleksowa obsługa — od diagnostyki po naprawę. Mechanicy wyjaśnili mi co i dlaczego naprawiali. Bardzo dobra komunikacja.',
  },
  {
    id: 11,
    name: 'Rafał Kamiński',
    vehicle: 'Audi Q5 (2019)',
    rating: 4,
    comment: 'Solidna robota przy zawieszeniu. Termin dotrzymany, cena zgodna z kosztorysem. Bez niespodzianek — to się ceni.',
  },
  {
    id: 12,
    name: 'Ewelina Kubiak',
    vehicle: 'Mercedes GLC (2021)',
    rating: 5,
    comment: 'Najlepszy warsztat w mieście. Polecają mi go wszyscy znajomi i teraz rozumiem dlaczego. Doskonała jakość i świetna obsługa.',
  },
];
