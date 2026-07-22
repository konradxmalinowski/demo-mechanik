import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService, SITE_URL } from '../../core/services/seo.service';
import { DemoModeService } from '../../core/services/demo-mode.service';
import { EstimatorSignals } from './estimator.signals';

@Component({
  selector: 'app-estimator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EstimatorSignals],
  styles: [`
    .cat-btn { border-radius: .75rem; border: 1px solid; padding: 1rem; text-align: left; transition: all .2s; cursor: pointer; }
    .cat-btn.active { border-color: #EF4444; background: rgba(239,68,68,.1); color: #B91C1C; }
    :host-context(.dark) .cat-btn.active { color: #f87171; }
    .cat-btn.inactive { border-color: rgba(0,0,0,.1); background: #F9FAFB; color: #374151; }
    :host-context(.dark) .cat-btn.inactive { border-color: rgba(255,255,255,.1); background: #111113; color: #d1d5db; }
    .opt-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-radius: .75rem; border: 1px solid; text-align: left; transition: all .2s; cursor: pointer; }
    .opt-btn.active { border-color: #EF4444; background: rgba(239,68,68,.1); }
    .opt-btn.inactive { border-color: rgba(0,0,0,.1); background: #F9FAFB; }
    :host-context(.dark) .opt-btn.inactive { border-color: rgba(255,255,255,.1); background: #111113; }
    .opt-price.active { color: #B91C1C; }
    :host-context(.dark) .opt-price.active { color: #f87171; }
    .opt-price.inactive { color: #4B5563; }
    :host-context(.dark) .opt-price.inactive { color: #9ca3af; }
  `],
  template: `
    <div class="min-h-screen pt-24 pb-16 bg-white text-mechanik-noir dark:bg-mechanik-noir dark:text-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="text-sm mb-8 text-gray-600 dark:text-gray-500" aria-label="Nawigacja okruszkowa">
          <ol class="flex items-center gap-2">
            <li><a routerLink="/" class="hover:text-mechanik-noir dark:hover:text-white transition-colors">Start</a></li>
            <li>/</li>
            <li class="text-red-600 dark:text-red-400" aria-current="page">Kalkulator</li>
          </ol>
        </nav>

        <h1 class="text-4xl font-black mb-2">Kalkulator napraw</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-10">Wybierz kategorię i opcję, aby otrzymać orientacyjną wycenę.</p>

        <div class="space-y-8">
          <!-- Category selection -->
          <section aria-labelledby="cat-heading">
            <h2 id="cat-heading" class="text-lg font-bold mb-4">Kategoria usługi</h2>
            <div class="grid grid-cols-2 gap-3">
              @for (cat of est.categories; track cat.id) {
                <button type="button" (click)="est.selectCategory(cat.id)"
                  class="cat-btn"
                  [class.active]="est.selectedCategory() === cat.id"
                  [class.inactive]="est.selectedCategory() !== cat.id"
                  [attr.aria-pressed]="est.selectedCategory() === cat.id">
                  <p class="font-semibold text-sm">{{ cat.label }}</p>
                  <p class="text-xs mt-0.5 opacity-70">{{ cat.description }}</p>
                </button>
              }
            </div>
          </section>

          <!-- Options -->
          @if (est.selectedCategory() && est.currentOptions().length > 0) {
            <section aria-labelledby="opt-heading">
              <h2 id="opt-heading" class="text-lg font-bold mb-4">Opcja</h2>
              <div class="space-y-2">
                @for (opt of est.currentOptions(); track opt.id) {
                  <button type="button" (click)="est.selectOption(opt.id)"
                    class="opt-btn"
                    [class.active]="est.selectedOption() === opt.id"
                    [class.inactive]="est.selectedOption() !== opt.id"
                    [attr.aria-pressed]="est.selectedOption() === opt.id">
                    <span class="font-medium text-sm text-mechanik-noir dark:text-white">{{ opt.label }}</span>
                    <span class="font-bold text-sm opt-price"
                      [class.active]="est.selectedOption() === opt.id"
                      [class.inactive]="est.selectedOption() !== opt.id">{{ opt.price | number:'1.0-0' }} zł</span>
                  </button>
                }
              </div>
            </section>
          }

          <!-- Price card -->
          @if (est.estimate() !== null) {
            <div class="rounded-2xl p-8 text-center bg-gray-50 dark:bg-mechanik-surface border border-mechanik-red/30">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Szacunkowy koszt</p>
              <p class="font-black mb-1 text-red-600 dark:text-red-400" style="font-size:3rem">
                {{ est.estimate() | number:'1.0-0' }}
                <span class="text-2xl font-semibold text-gray-600 dark:text-gray-400">zł</span>
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-500 mt-4 max-w-sm mx-auto">
                Cena ma charakter orientacyjny. Ostateczna cena zostanie potwierdzona po przeprowadzeniu diagnostyki pojazdu.
              </p>
              <button type="button" (click)="onUmowWizyteClick()"
                class="mt-6 inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-lg transition-colors bg-mechanik-red text-white">
                Umów wizytę
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class EstimatorComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly demoModeService = inject(DemoModeService);

  protected readonly est = inject(EstimatorSignals);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Kalkulator napraw',
      description: 'Sprawdź orientacyjny koszt naprawy samochodu w APEX Mechanik - olej, hamulce, klimatyzacja, akumulator.',
    });
    this.seoService.setCanonical(`${SITE_URL}/kalkulator`);
  }

  protected onUmowWizyteClick(): void {
    this.demoModeService.open();
  }
}
