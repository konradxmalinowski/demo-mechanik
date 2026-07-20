import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { SeoService } from '../../core/services/seo.service';
import { DemoModeService } from '../../core/services/demo-mode.service';
import { BookingSignals } from './booking.signals';
import { SERVICES_DATA, ServiceItem } from '../../data/services.data';

const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const CAR_BRANDS = ['Alfa Romeo', 'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(CURRENT_YEAR - i));

function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookingSignals],
  animations: [
    trigger('stepFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
  styles: [`
    .step-bubble { width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .875rem; font-weight: 700; transition: all .3s; }
    .step-bubble.active { background: var(--apex-accent); color: #fff; }
    .step-bubble.inactive { background: rgba(0,0,0,.06); color: #6b7280; }
    :host-context(.dark) .step-bubble.inactive { background: rgba(255,255,255,.1); color: #6b7280; }
    .step-line { height: 2px; width: 2.5rem; border-radius: 1px; transition: background .3s; }
    .step-line.filled { background: var(--apex-accent); }
    .step-line.empty { background: rgba(0,0,0,.1); }
    :host-context(.dark) .step-line.empty { background: rgba(255,255,255,.1); }
    .service-btn { border-radius: .75rem; border-width: 1px; border-style: solid; display: flex; align-items: flex-start; gap: .75rem; padding: 1rem; text-align: left; transition: all .2s; cursor: pointer; }
    .service-btn.selected { border-color: var(--apex-accent); background: rgb(var(--apex-accent-rgb) / .1); }
    .service-btn.unselected { border-color: rgba(0,0,0,.1); background: #F9FAFB; }
    :host-context(.dark) .service-btn.unselected { border-color: rgba(255,255,255,.1); background: #111113; }
    .service-icon { width: 2rem; height: 2rem; border-radius: .5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: .125rem; }
    .service-icon.selected { background: var(--apex-accent); }
    .service-icon.unselected { background: rgba(0,0,0,.08); }
    :host-context(.dark) .service-icon.unselected { background: rgba(255,255,255,.1); }
    .cal-day { aspect-ratio: 1; border-radius: .5rem; font-size: .875rem; font-weight: 500; display: flex; align-items: center; justify-content: center; transition: all .15s; }
    .cal-day:not([disabled]):hover { background: rgb(var(--apex-accent-rgb) / .2); }
    .cal-day.selected-day { background: var(--apex-accent); color: #fff; }
    .cal-day.past-day { opacity: .3; cursor: not-allowed; }
    .cal-day.normal-day { color: #374151; }
    :host-context(.dark) .cal-day.normal-day { color: #9ca3af; }
    .time-slot { padding: .75rem; border-radius: .75rem; border-width: 1px; border-style: solid; font-size: .875rem; font-weight: 500; transition: all .2s; cursor: pointer; }
    .time-slot.selected { background: var(--apex-accent); color: #fff; border-color: transparent; }
    .time-slot.unselected { background: #F9FAFB; border-color: rgba(0,0,0,.1); color: #374151; }
    :host-context(.dark) .time-slot.unselected { background: #111113; border-color: rgba(255,255,255,.1); color: #d1d5db; }
  `],
  template: `
    <div class="min-h-screen pt-24 pb-16 bg-white text-mechanik-noir dark:bg-mechanik-noir dark:text-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm mb-8 text-gray-600 dark:text-gray-500" aria-label="Nawigacja okruszkowa">
          <ol class="flex items-center gap-2">
            <li><a routerLink="/" class="hover:text-mechanik-noir dark:hover:text-white transition-colors">Start</a></li>
            <li>/</li>
            <li class="text-red-600 dark:text-red-400" aria-current="page">Rezerwacja</li>
          </ol>
        </nav>

        <h1 class="text-4xl font-black mb-2">Rezerwacja wizyty</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">Wypełnij formularz w kilku prostych krokach.</p>

        <!-- Progress -->
        <div class="flex items-center gap-2 mb-10" role="progressbar" [attr.aria-valuenow]="signals.step()" aria-valuemin="1" aria-valuemax="6">
          @for (n of stepNumbers; track n) {
            <div class="flex items-center gap-2">
              <div class="step-bubble" [class.active]="signals.step() >= n" [class.inactive]="signals.step() < n">{{ n }}</div>
              @if (n < 6) {
                <div class="step-line" [class.filled]="signals.step() > n" [class.empty]="signals.step() <= n"></div>
              }
            </div>
          }
        </div>

        <!-- Steps -->
        @if (signals.step() === 1) {
          <div [@stepFade] class="space-y-6">
            <h2 class="text-xl font-bold">Krok 1: Dane pojazdu</h2>
            <form [formGroup]="signals.vehicleForm" class="space-y-4">
              <div>
                <label for="marka" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Marka pojazdu *</label>
                <select id="marka" formControlName="marka"
                  class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white">
                  <option value="" disabled>Wybierz markę</option>
                  @for (brand of carBrands; track brand) {
                    <option [value]="brand">{{ brand }}</option>
                  }
                </select>
              </div>
              <div>
                <label for="model" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Model *</label>
                <input id="model" type="text" formControlName="model" placeholder="np. 320d, A4, Golf"
                  class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="rocznik" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Rocznik *</label>
                  <select id="rocznik" formControlName="rocznik"
                    class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white">
                    <option value="" disabled>Rok</option>
                    @for (year of years; track year) {
                      <option [value]="year">{{ year }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label for="przebieg" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Przebieg (km) *</label>
                  <input id="przebieg" type="number" formControlName="przebieg" placeholder="np. 65000"
                    class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                </div>
              </div>
            </form>
          </div>
        }

        @if (signals.step() === 2) {
          <div [@stepFade] class="space-y-6">
            <h2 class="text-xl font-bold">Krok 2: Wybór usług</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Możesz wybrać więcej niż jedną usługę.</p>
            <div class="grid sm:grid-cols-2 gap-3">
              @for (service of services; track service.id) {
                <button type="button" (click)="signals.toggleService(service.id)"
                  class="service-btn"
                  [class.selected]="signals.isServiceSelected(service.id)"
                  [class.unselected]="!signals.isServiceSelected(service.id)"
                  [attr.aria-pressed]="signals.isServiceSelected(service.id)">
                  <div class="service-icon"
                    [class.selected]="signals.isServiceSelected(service.id)"
                    [class.unselected]="!signals.isServiceSelected(service.id)">
                    <svg class="w-4 h-4 dark:text-white" [class.text-white]="signals.isServiceSelected(service.id)" [class.text-mechanik-noir]="!signals.isServiceSelected(service.id)" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-sm">{{ service.name }}</p>
                    <p class="text-xs mt-0.5 text-gray-600 dark:text-gray-500">{{ service.approxTime }} · od {{ service.approxCost }}</p>
                  </div>
                </button>
              }
            </div>
          </div>
        }

        @if (signals.step() === 3) {
          <div [@stepFade] class="space-y-6">
            <h2 class="text-xl font-bold">Krok 3: Wybór terminu</h2>
            <div class="rounded-xl p-5 bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10">
              <div class="flex items-center justify-between mb-4">
                <button type="button" (click)="prevMonth()" class="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Poprzedni miesiąc">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="font-semibold capitalize">{{ monthLabel() }}</span>
                <button type="button" (click)="nextMonth()" class="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Następny miesiąc">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-7 mb-2">
                @for (d of weekDays; track d) {
                  <div class="text-center py-1 text-gray-600 dark:text-gray-500" style="font-size:.75rem">{{ d }}</div>
                }
              </div>
              <div class="grid grid-cols-7 gap-1" role="grid" [attr.aria-label]="'Kalendarz ' + monthLabel()">
                @for (day of calendarDays(); track $index) {
                  @if (day === null) {
                    <div role="gridcell"></div>
                  } @else {
                    <button type="button" (click)="selectDate(day)"
                      class="cal-day"
                      [class.selected-day]="selectedDay() === day"
                      [class.past-day]="isPast(day)"
                      [class.normal-day]="selectedDay() !== day && !isPast(day)"
                      [disabled]="isPast(day)"
                      role="gridcell"
                      [attr.aria-label]="day + ' ' + monthLabel()"
                      [attr.aria-selected]="selectedDay() === day">{{ day }}</button>
                  }
                }
              </div>
            </div>
          </div>
        }

        @if (signals.step() === 4) {
          <div [@stepFade] class="space-y-6">
            <h2 class="text-xl font-bold">Krok 4: Wybór godziny</h2>
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
              @for (slot of timeSlots; track slot) {
                <button type="button" (click)="selectTime(slot)"
                  class="time-slot"
                  [class.selected]="signals.timeForm.get('time')?.value === slot"
                  [class.unselected]="signals.timeForm.get('time')?.value !== slot"
                  [attr.aria-pressed]="signals.timeForm.get('time')?.value === slot">{{ slot }}</button>
              }
            </div>
          </div>
        }

        @if (signals.step() === 5) {
          <div [@stepFade] class="space-y-6">
            <h2 class="text-xl font-bold">Krok 5: Dane kontaktowe</h2>
            <form [formGroup]="signals.contactForm" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="imie" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Imię *</label>
                  <input id="imie" type="text" formControlName="imie" placeholder="Jan"
                    class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                </div>
                <div>
                  <label for="nazwisko" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Nazwisko *</label>
                  <input id="nazwisko" type="text" formControlName="nazwisko" placeholder="Kowalski"
                    class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
                </div>
              </div>
              <div>
                <label for="telefon" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Numer telefonu *</label>
                <input id="telefon" type="tel" formControlName="telefon" placeholder="+48 500 100 200"
                  class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
              <div>
                <label for="email-contact" class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Adres e-mail *</label>
                <input id="email-contact" type="email" formControlName="email" placeholder="jan@example.com"
                  class="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 text-mechanik-noir dark:text-white placeholder-gray-400 dark:placeholder-gray-600" />
              </div>
            </form>
          </div>
        }

        @if (signals.step() === 6) {
          <div [@stepFade] class="space-y-6">
            <h2 class="text-xl font-bold">Krok 6: Podsumowanie</h2>
            <div class="rounded-xl divide-y bg-gray-50 dark:bg-mechanik-surface border border-gray-300 dark:border-white/10 divide-gray-200 dark:divide-white/5">
              <div class="px-6 py-4">
                <p class="text-xs uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-500">Pojazd</p>
                <p class="font-semibold">{{ signals.vehicleForm.get('marka')?.value }} {{ signals.vehicleForm.get('model')?.value }}, {{ signals.vehicleForm.get('rocznik')?.value }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Przebieg: {{ signals.vehicleForm.get('przebieg')?.value }} km</p>
              </div>
              <div class="px-6 py-4">
                <p class="text-xs uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-500">Termin</p>
                <p class="font-semibold">{{ signals.calendarForm.get('date')?.value }}, godz. {{ signals.timeForm.get('time')?.value }}</p>
              </div>
              <div class="px-6 py-4">
                <p class="text-xs uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-500">Dane kontaktowe</p>
                <p class="font-semibold">{{ signals.contactForm.get('imie')?.value }} {{ signals.contactForm.get('nazwisko')?.value }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ signals.contactForm.get('telefon')?.value }} · {{ signals.contactForm.get('email')?.value }}</p>
              </div>
            </div>
          </div>
        }

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-10 pt-6 border-t border-gray-200 dark:border-white/10">
          @if (signals.step() > 1) {
            <button type="button" (click)="signals.prevStep()"
              class="px-6 py-3 font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-gray-300 dark:border-white/20 text-mechanik-noir dark:text-white">Wstecz</button>
          } @else {
            <span></span>
          }

          @if (signals.step() < 6) {
            <button type="button" (click)="signals.nextStep()"
              [disabled]="!signals.canProceed()"
              class="px-8 py-3 font-semibold rounded-lg transition-colors bg-mechanik-red text-white">Dalej</button>
          } @else {
            <button type="button" (click)="onSubmit()"
              class="px-8 py-3 font-semibold rounded-lg transition-colors bg-mechanik-red text-white">Zarezerwuj</button>
          }
        </div>
      </div>
    </div>
  `,
})
export class BookingComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly demoModeService = inject(DemoModeService);

  protected readonly signals = inject(BookingSignals);
  protected readonly services: ServiceItem[] = SERVICES_DATA;
  protected readonly timeSlots = TIME_SLOTS;
  protected readonly carBrands = CAR_BRANDS;
  protected readonly years = YEARS;
  protected readonly stepNumbers = [1, 2, 3, 4, 5, 6];
  protected readonly weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

  private readonly calYear = signal(new Date().getFullYear());
  private readonly calMonth = signal(new Date().getMonth());
  protected readonly selectedDay = signal<number | null>(null);

  protected readonly calendarDays = computed(() => getCalendarDays(this.calYear(), this.calMonth()));
  protected readonly monthLabel = computed(() =>
    new Date(this.calYear(), this.calMonth(), 1)
      .toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })
  );

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Rezerwacja wizyty',
      description: 'Zarezerwuj wizytę serwisową w APEX Mechanik - 6-krokowy formularz.',
    });
  }

  protected prevMonth(): void {
    if (this.calMonth() === 0) { this.calYear.update(y => y - 1); this.calMonth.set(11); }
    else { this.calMonth.update(m => m - 1); }
    this.selectedDay.set(null);
    this.signals.calendarForm.patchValue({ date: '' });
  }

  protected nextMonth(): void {
    if (this.calMonth() === 11) { this.calYear.update(y => y + 1); this.calMonth.set(0); }
    else { this.calMonth.update(m => m + 1); }
    this.selectedDay.set(null);
    this.signals.calendarForm.patchValue({ date: '' });
  }

  protected selectDate(day: number): void {
    if (this.isPast(day)) return;
    this.selectedDay.set(day);
    const d = new Date(this.calYear(), this.calMonth(), day);
    const label = d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
    this.signals.calendarForm.patchValue({ date: label });
  }

  protected selectTime(slot: string): void {
    this.signals.timeForm.patchValue({ time: slot });
  }

  protected isPast(day: number): boolean {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = new Date(this.calYear(), this.calMonth(), day);
    return d < today;
  }

  protected onSubmit(): void {
    this.demoModeService.open();
  }
}
