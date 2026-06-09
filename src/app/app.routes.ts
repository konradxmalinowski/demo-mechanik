import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'uslugi',
    loadComponent: () =>
      import('./features/services/services.component').then((m) => m.ServicesComponent),
  },
  {
    path: 'rezerwacja',
    loadComponent: () =>
      import('./features/booking/booking.component').then((m) => m.BookingComponent),
  },
  {
    path: 'strefa-klienta',
    loadComponent: () =>
      import('./features/customer-zone/customer-zone.component').then((m) => m.CustomerZoneComponent),
  },
  {
    path: 'kalkulator',
    loadComponent: () =>
      import('./features/estimator/estimator.component').then((m) => m.EstimatorComponent),
  },
  {
    path: 'kontakt',
    loadComponent: () =>
      import('./features/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
