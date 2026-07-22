import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { SeoService, SITE_URL } from '../../core/services/seo.service';
import { SERVICES_DATA } from '../../data/services.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-white text-mechanik-noir dark:bg-mechanik-noir dark:text-white pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-600 dark:text-gray-500 mb-8" aria-label="Nawigacja okruszkowa">
          <ol class="flex items-center gap-2">
            <li><a routerLink="/" class="hover:text-mechanik-noir dark:hover:text-white transition-colors">Start</a></li>
            <li><span aria-hidden="true">/</span></li>
            <li class="text-red-600 dark:text-red-400" aria-current="page">Usługi</li>
          </ol>
        </nav>

        <h1 class="text-4xl font-black mb-4">Nasze Usługi</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
          Kompleksowy serwis samochodowy dla wszystkich marek. Sprawdź orientacyjny czas i koszt poszczególnych usług.
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (service of services; track service.id) {
            <article class="bg-gray-50 dark:bg-mechanik-surface border border-black/5 dark:border-white/5 rounded-xl p-6 hover:border-[rgb(var(--apex-accent-rgb)/0.3)] transition-colors">
              <div class="w-12 h-12 bg-[rgb(var(--apex-accent-rgb)/0.1)] rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-mechanik-noir dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon" />
                </svg>
              </div>
              <h2 class="text-lg font-bold mb-2">{{ service.name }}</h2>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ service.description }}</p>
              <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-500 mb-4">
                <span>Czas: {{ service.approxTime }}</span>
                <span>od {{ service.approxCost }}</span>
              </div>
              <a
                routerLink="/rezerwacja"
                class="inline-flex w-full items-center justify-center px-4 py-2 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors" style="background:var(--apex-accent)"
              >
                Umów wizytę
              </a>
            </article>
          }
        </div>
      </div>
    </div>
  `,
})
export class ServicesComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  protected readonly services = SERVICES_DATA;

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Usługi serwisowe',
      description: 'Pełna oferta usług serwisowych APEX Mechanik - diagnostyka, oleje, klimatyzacja, hamulce, zawieszenie, elektryka.',
    });
    this.seoService.setCanonical(`${SITE_URL}/uslugi`);
  }
}
