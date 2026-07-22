import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { SeoService, SITE_URL } from '../../core/services/seo.service';
import {
  VEHICLE_OVERVIEW,
  LAST_VISITS,
  REPAIR_HISTORY,
  SERVICE_RECOMMENDATIONS,
  RepairHistoryItem,
  ServiceRecommendation,
} from '../../data/customer-zone.data';

@Component({
  selector: 'app-customer-zone',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('timelineItems', [
      transition(':enter', [
        query('.timeline-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(80, [animate('350ms ease-out', style({ opacity: 1, transform: 'none' }))]),
        ], { optional: true }),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('320ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
  styles: [`
    :host { display: block; }
    .mono { font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', 'Courier New', monospace; }
    .badge-pilne { background: rgba(239,68,68,.1); color: #B91C1C; border: 1px solid rgba(239,68,68,.3); }
    :host-context(.dark) .badge-pilne { background: rgb(var(--apex-accent-rgb) / .2); color: #f87171; border: 1px solid rgb(var(--apex-accent-rgb) / .3); }
    .badge-zalecane { background: rgba(250,204,21,.15); color: #92400E; border: 1px solid rgba(250,204,21,.4); }
    :host-context(.dark) .badge-zalecane { background: rgba(250,204,21,.1); color: #FACC15; border: 1px solid rgba(250,204,21,.3); }
    .badge-informacyjne { background: rgba(59,130,246,.1); color: #1D4ED8; border: 1px solid rgba(59,130,246,.3); }
    :host-context(.dark) .badge-informacyjne { background: rgba(59,130,246,.1); color: #60a5fa; border: 1px solid rgba(59,130,246,.3); }
    .tab-btn { padding: .625rem 1rem; border-radius: .5rem; font-size: .875rem; font-weight: 600; transition: all .2s; cursor: pointer; border: none; }
    .tab-btn.active { background: var(--apex-accent); color: #fff; }
    .tab-btn.inactive { background: transparent; color: #4B5563; }
    :host-context(.dark) .tab-btn.inactive { color: #9ca3af; }
    .tab-btn.inactive:hover { color: #111827; background: rgba(0,0,0,.05); }
    :host-context(.dark) .tab-btn.inactive:hover { color: #fff; background: rgba(255,255,255,.05); }
    .timeline-item { display: flex; gap: 1rem; position: relative; }
    .timeline-item:not(:last-child)::after { content: ''; position: absolute; left: 1.25rem; top: 2.5rem; bottom: -1rem; width: 1px; background: rgba(0,0,0,.1); }
    :host-context(.dark) .timeline-item:not(:last-child)::after { background: rgba(255,255,255,.1); }
  `],
  template: `
    <div class="min-h-screen pt-24 pb-16 bg-white text-mechanik-noir dark:bg-mechanik-noir dark:text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="text-sm mb-8 text-gray-600 dark:text-gray-500" aria-label="Nawigacja okruszkowa">
          <ol class="flex items-center gap-2">
            <li><a routerLink="/" class="hover:text-mechanik-noir dark:hover:text-white transition-colors">Start</a></li>
            <li>/</li>
            <li class="text-red-600 dark:text-red-400" aria-current="page">Strefa Klienta</li>
          </ol>
        </nav>

        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 class="text-4xl font-black mb-1 mono">STREFA KLIENTA</h1>
            <p class="mono text-sm text-gray-600 dark:text-gray-500">// diagnostic_dashboard_v2.0</p>
          </div>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mono bg-mechanik-red/10 border border-mechanik-red/30 text-mechanik-red">
            <span class="w-1.5 h-1.5 rounded-full animate-pulse bg-mechanik-red"></span>
            DEMO MODE
          </span>
        </div>

        <!-- Vehicle overview card -->
        <div [@slideIn] class="rounded-2xl p-6 mb-8 bg-gray-50 dark:bg-mechanik-surface border border-mechanik-red/20">
          <div class="flex items-start justify-between mb-4">
            <div>
              <p class="mono text-xs mb-1 text-gray-600 dark:text-gray-500">// POJAZD</p>
              <h2 class="text-2xl font-black mono">{{ vehicle.brand }} {{ vehicle.model }}</h2>
              <p class="mono text-sm mt-1 text-gray-600 dark:text-gray-400">{{ vehicle.year }} · {{ vehicle.fuelType }} · {{ vehicle.color }}</p>
            </div>
            <div class="text-right">
              <p class="mono text-xs text-gray-600 dark:text-gray-500">VIN</p>
              <p class="mono text-sm font-bold text-amber-700 dark:text-mechanik-yellow">{{ vehicle.vin }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="rounded-lg p-4 bg-gray-100 dark:bg-black/30">
              <p class="mono text-xs mb-1 text-gray-600 dark:text-gray-500">PRZEBIEG</p>
              <p class="mono font-bold text-lg">{{ vehicle.mileage | number }} km</p>
            </div>
            <div class="rounded-lg p-4 bg-gray-100 dark:bg-black/30">
              <p class="mono text-xs mb-1 text-gray-600 dark:text-gray-500">SILNIK</p>
              <p class="mono font-bold text-lg">{{ vehicle.engineCapacity }}</p>
            </div>
            <div class="rounded-lg p-4 bg-gray-100 dark:bg-black/30">
              <p class="mono text-xs mb-1 text-gray-600 dark:text-gray-500">OSTATNIA WIZYTA</p>
              <p class="mono font-bold text-sm">{{ vehicle.lastVisit }}</p>
            </div>
            <div class="rounded-lg p-4 bg-gray-100 dark:bg-black/30">
              <p class="mono text-xs mb-1 text-gray-600 dark:text-gray-500">NASTĘPNY SERWIS</p>
              <p class="mono font-bold text-sm text-amber-700 dark:text-mechanik-yellow">{{ vehicle.nextService }}</p>
            </div>
          </div>
        </div>

        <!-- Tab navigation -->
        <div class="flex items-center gap-2 mb-6 overflow-x-auto" role="tablist" aria-label="Sekcje strefy klienta">
          @for (tab of tabs; track tab.id) {
            <button type="button"
              class="tab-btn flex-shrink-0"
              [class.active]="activeTab() === tab.id"
              [class.inactive]="activeTab() !== tab.id"
              (click)="activeTab.set(tab.id)"
              role="tab"
              [attr.aria-selected]="activeTab() === tab.id"
              [attr.aria-controls]="'panel-' + tab.id">{{ tab.label }}</button>
          }
        </div>

        <!-- Tab content -->

        @if (activeTab() === 'visits') {
          <div [@slideIn] role="tabpanel" id="panel-visits">
            <h2 class="mono text-lg font-bold mb-4">// OSTATNIE WIZYTY</h2>
            @if (lastVisits.length === 0) {
              <div class="text-center py-16 rounded-xl bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                <p class="mono text-lg text-gray-600 dark:text-gray-600">// brak_danych</p>
                <p class="text-sm text-gray-600 dark:text-gray-600 mt-2">Brak historii wizyt</p>
              </div>
            } @else {
              <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-white/5">
                <table class="w-full mono text-sm" role="grid" aria-label="Ostatnie wizyty">
                  <thead class="bg-gray-50 dark:bg-mechanik-surface">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600 dark:text-gray-500">Data</th>
                      <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600 dark:text-gray-500">Usługa</th>
                      <th class="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-600 dark:text-gray-500">Status</th>
                      <th class="px-6 py-3 text-right text-xs uppercase tracking-wider text-gray-600 dark:text-gray-500">Koszt</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (visit of lastVisits; track visit.id; let even = $even) {
                      <tr [ngClass]="even ? 'bg-gray-100 dark:bg-black/20' : 'bg-gray-50 dark:bg-mechanik-surface'" class="border-t border-gray-200 dark:border-white/5">
                        <td class="px-6 py-4 text-sm">{{ visit.date }}</td>
                        <td class="px-6 py-4">{{ visit.service }}</td>
                        <td class="px-6 py-4">
                          <span class="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/30">
                            {{ visit.status }}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-right font-bold text-amber-700 dark:text-mechanik-yellow">{{ visit.cost | number }} zł</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        }

        @if (activeTab() === 'history') {
          <div [@timelineItems] role="tabpanel" id="panel-history">
            <h2 class="mono text-lg font-bold mb-6">// HISTORIA NAPRAW</h2>
            @if (repairHistory.length === 0) {
              <div class="text-center py-16 rounded-xl bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                <p class="mono text-lg text-gray-600 dark:text-gray-600">// brak_danych</p>
              </div>
            } @else {
              <div class="space-y-6">
                @for (item of repairHistory; track item.id) {
                  <div class="timeline-item">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/15">
                      <svg class="w-5 h-5 text-gray-600 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                    </div>
                    <div class="flex-1 rounded-xl p-4 bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                      <div class="flex items-start justify-between mb-2">
                        <p class="mono text-xs text-gray-600 dark:text-gray-500">{{ item.date }}</p>
                        <span class="mono font-bold text-sm text-amber-700 dark:text-mechanik-yellow">{{ item.cost | number }} zł</span>
                      </div>
                      <p class="text-sm mb-2">{{ item.scope }}</p>
                      <p class="mono text-xs text-gray-600 dark:text-gray-400">Mechanik: {{ item.mechanic }}</p>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        }

        @if (activeTab() === 'recommendations') {
          <div [@slideIn] role="tabpanel" id="panel-recommendations">
            <h2 class="mono text-lg font-bold mb-6">// ZALECENIA SERWISOWE</h2>
            <div class="space-y-4">
              @for (rec of recommendations; track rec.id) {
                <div class="rounded-xl p-5 flex items-start gap-4 bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                  <div class="flex-shrink-0 mt-0.5">
                    <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold mono"
                      [class.badge-pilne]="rec.urgency === 'pilne'"
                      [class.badge-zalecane]="rec.urgency === 'zalecane'"
                      [class.badge-informacyjne]="rec.urgency === 'informacyjne'">
                      {{ rec.urgency.toUpperCase() }}
                    </span>
                  </div>
                  <div>
                    <h3 class="font-bold mb-1">{{ rec.title }}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ rec.description }}</p>
                    @if (rec.dueKm) {
                      <p class="mono text-xs mt-2 text-gray-600 dark:text-gray-500">Termin: {{ rec.dueKm | number }} km</p>
                    }
                    @if (rec.dueDate) {
                      <p class="mono text-xs mt-1 text-gray-600 dark:text-gray-500">Data: {{ rec.dueDate }}</p>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }

        @if (activeTab() === 'documents') {
          <div [@slideIn] role="tabpanel" id="panel-documents">
            <h2 class="mono text-lg font-bold mb-6">// DOKUMENTACJA</h2>
            <div class="text-center py-16 rounded-xl bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
              <svg class="w-12 h-12 mx-auto mb-4 text-gray-600 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="mono font-bold mb-2 text-gray-600 dark:text-gray-500">// brak_dokumentow</p>
              <p class="text-sm text-gray-600 dark:text-gray-600">Faktury i protokoły pojawią się tutaj po realizacji usługi.</p>
              <p class="mono text-xs mt-2 text-gray-600 dark:text-gray-500">// wersja demonstracyjna</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class CustomerZoneComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  protected readonly vehicle = VEHICLE_OVERVIEW;
  protected readonly lastVisits = LAST_VISITS;
  protected readonly repairHistory: RepairHistoryItem[] = REPAIR_HISTORY;
  protected readonly recommendations: ServiceRecommendation[] = SERVICE_RECOMMENDATIONS;

  protected readonly activeTab = signal<'visits' | 'history' | 'recommendations' | 'documents'>('visits');

  protected readonly tabs = [
    { id: 'visits' as const, label: 'Ostatnie wizyty' },
    { id: 'history' as const, label: 'Historia napraw' },
    { id: 'recommendations' as const, label: 'Zalecenia' },
    { id: 'documents' as const, label: 'Dokumenty' },
  ];

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Strefa Klienta',
      description: 'Twój panel diagnostyczny APEX Mechanik - przegląd pojazdu, historia napraw, zalecenia serwisowe.',
    });
    this.seoService.setCanonical(`${SITE_URL}/strefa-klienta`);
  }
}
