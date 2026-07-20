import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  signal,
  PLATFORM_ID,
  ElementRef,
  afterNextRender,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { SeoService } from '../../core/services/seo.service';
import { BrandsMarqueeComponent } from '../../shared/components/brands-marquee/brands-marquee.component';
import { SERVICES_DATA } from '../../data/services.data';
import { TESTIMONIALS_DATA } from '../../data/testimonials.data';
import { FAQ_DATA, FaqItem } from '../../data/faq.data';

interface ProcessStep {
  number: number;
  icon: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  { number: 1, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Rezerwacja', description: 'Wybierz termin online lub telefonicznie.' },
  { number: 2, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Diagnostyka', description: 'Komputerowa ocena stanu pojazdu.' },
  { number: 3, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', title: 'Naprawa', description: 'Fachowe naprawy z oryginalnymi częściami.' },
  { number: 4, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Test pojazdu', description: 'Próbna jazda i weryfikacja napraw.' },
  { number: 5, icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z', title: 'Odbiór', description: 'Auto gotowe, faktura i gwarancja.' },
];

const ADVANTAGES = [
  { title: 'Doświadczeni mechanicy', description: '15+ lat doświadczenia w branży serwisowej.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
  { title: 'Nowoczesny sprzęt', description: 'Diagnostyka najnowszej generacji dla wszystkich marek.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { title: 'Gwarancja usług', description: '12 mies. na robociznę, 24 mies. na części OEM.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Szybkie terminy', description: 'Rezerwacja online 24/7, pierwsza wizyta nawet tego samego dnia.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Przejrzyste wyceny', description: 'Kosztorys przed naprawą - bez ukrytych opłat.', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { title: 'Strzeżony parking', description: 'Możliwość pozostawienia auta na noc pod opieką.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BrandsMarqueeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(32px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [animate('500ms ease-out')]),
    ]),
    trigger('accordionToggle', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('280ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: 0, opacity: 0, overflow: 'hidden' })),
      ]),
    ]),
  ],
  styles: [`
    .animate-section { opacity: 0; transform: translateY(32px); transition: opacity .5s ease, transform .5s ease; }
    .animate-section.in-view { opacity: 1; transform: none; }
    .testimonial-track { display: flex; transition: transform .4s ease; }
  `],
  template: `
    <div class="bg-white text-mechanik-noir dark:bg-mechanik-noir dark:text-white">
      <!-- Hero: photographic section, kept intentionally dark-scrim + white text in both
           themes for legibility over the background photo (see plan report) -->
      <section class="relative min-h-[100vh] lg:min-h-[110vh] flex items-center pt-16 overflow-hidden" style="background-image:url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80');background-size:cover;background-position:center" aria-label="Sekcja główna">
        <div class="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90"></div>
        <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(var(--apex-accent) 1px,transparent 1px),linear-gradient(90deg,var(--apex-accent) 1px,transparent 1px);background-size:60px 60px"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-mechanik-red/10 border border-mechanik-red/30 text-mechanik-red">
              <span class="w-1.5 h-1.5 rounded-full animate-pulse bg-mechanik-red"></span>
              Premium Auto Service
            </span>

            <h1 class="font-black leading-none tracking-tight mb-6 text-white" style="font-size:clamp(2.5rem,8vw,5rem)">
              Twoje auto<br>
              <span class="text-mechanik-red">w najlepszych</span><br>
              rękach
            </h1>

            <p class="text-lg mb-10 leading-relaxed max-w-xl text-gray-400">
              Profesjonalny serwis samochodowy z 15-letnim doświadczeniem. Diagnostyka komputerowa, naprawy mechaniczne, klimatyzacja i elektryka - wszystko pod jednym dachem.
            </p>

            <div class="flex flex-wrap gap-4">
              <a routerLink="/rezerwacja" class="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg text-lg transition-all duration-200 hover:scale-105 bg-mechanik-red text-white">
                Umów wizytę
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a routerLink="/uslugi" class="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg text-lg transition-colors hover:bg-white/5 border border-white/20 text-white">
                Zobacz usługi
              </a>
            </div>

            <div class="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
              <div><p class="text-3xl font-black text-white">15+</p><p class="text-sm mt-1 text-gray-500">lat doświadczenia</p></div>
              <div><p class="text-3xl font-black text-white">3 200+</p><p class="text-sm mt-1 text-gray-500">zadowolonych klientów</p></div>
              <div><p class="text-3xl font-black text-white">4.9/5</p><p class="text-sm mt-1 text-gray-500">średnia ocen</p></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Brands marquee -->
      <app-brands-marquee />

      <!-- Services grid -->
      <section class="py-24 animate-section" id="services-section" aria-label="Nasze usługi">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-black mb-4">Nasze usługi</h2>
            <p class="text-gray-600 dark:text-gray-400" style="max-width:36rem;margin:0 auto">Kompleksowy serwis dla wszystkich marek - z gwarancją jakości na każdą naprawę.</p>
          </div>

          <!-- Skeleton loading state -->
          @if (servicesLoaded()) {
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (service of services; track service.id) {
                <article class="rounded-xl p-6 hover:scale-105 transition-transform duration-300 bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                  <div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-mechanik-red/10">
                    <svg class="w-6 h-6 text-mechanik-noir dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="service.icon" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-bold mb-2">{{ service.name }}</h3>
                  <p class="text-sm mb-4 text-gray-600 dark:text-gray-400">{{ service.description }}</p>
                  <div class="flex items-center justify-between text-xs mb-4 text-gray-500 dark:text-gray-500">
                    <span>{{ service.approxTime }}</span>
                    <span>od {{ service.approxCost }}</span>
                  </div>
                  <a routerLink="/rezerwacja" class="inline-flex w-full items-center justify-center px-4 py-2 font-semibold text-sm rounded-lg transition-colors hover:opacity-90 bg-mechanik-red text-white">
                    Umów wizytę
                  </a>
                </article>
              }
            </div>
          } @else {
            <!-- Skeleton -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (i of skeletonItems; track i) {
                <div class="rounded-xl p-6 animate-pulse bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                  <div class="w-12 h-12 rounded-lg mb-4 bg-gray-200 dark:bg-white/10"></div>
                  <div class="h-5 rounded mb-2 w-3/4 bg-gray-200 dark:bg-white/10"></div>
                  <div class="h-3 rounded mb-1 w-full bg-gray-100 dark:bg-white/5"></div>
                  <div class="h-3 rounded mb-4 w-5/6 bg-gray-100 dark:bg-white/5"></div>
                  <div class="h-9 rounded bg-gray-200 dark:bg-white/10"></div>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- Process timeline -->
      <section class="py-24 animate-section bg-gray-50 dark:bg-mechanik-surface" id="process-section" aria-label="Jak pracujemy">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-black mb-4">Jak pracujemy</h2>
            <p class="text-gray-600 dark:text-gray-400">Prosty, przejrzysty proces - od rezerwacji do odbioru.</p>
          </div>

          <div class="relative">
            <!-- Horizontal connector (desktop) -->
            <div class="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gray-300 dark:bg-white/10" style="z-index:0;margin:0 10%"></div>

            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative">
              @for (step of processSteps; track step.number) {
                <div class="flex flex-col items-center text-center">
                  <div class="relative z-10 w-20 h-20 rounded-full border-2 flex items-center justify-center mb-4 bg-white dark:bg-mechanik-noir border-gray-300 dark:border-white/20">
                    <svg class="w-8 h-8 text-gray-600 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" [attr.d]="step.icon" />
                    </svg>
                  </div>
                  <span class="text-xs font-bold mb-2 px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/60">Krok {{ step.number }}</span>
                  <h3 class="font-bold mb-1">{{ step.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Why us / Advantages -->
      <section class="py-24 animate-section" id="advantages-section" aria-label="Dlaczego my">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-black mb-4">Dlaczego my?</h2>
            <p class="text-gray-600 dark:text-gray-400" style="max-width:36rem;margin:0 auto">Wybrało nas już ponad 3 200 kierowców - oto dlaczego nam ufają.</p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (adv of advantages; track adv.title) {
              <div class="flex items-start gap-4 p-6 rounded-xl bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-white/5">
                  <svg class="w-5 h-5 text-gray-600 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="adv.icon" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold mb-1">{{ adv.title }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ adv.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Testimonials slider -->
      <section class="py-24 animate-section bg-gray-50 dark:bg-mechanik-surface" id="testimonials-section" aria-label="Opinie klientów">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-black mb-4">Opinie klientów</h2>
            <p class="text-gray-600 dark:text-gray-400">Co mówią kierowcy, którym zaufali nam swoje auto.</p>
          </div>

          @if (testimonialsLoaded()) {
            <div class="relative overflow-hidden">
              <div class="testimonial-track" [style.transform]="'translateX(-' + (testimonialIndex() * (100 / visibleTestimonials)) + '%)'">
                @for (t of testimonials; track t.id) {
                  <div class="flex-shrink-0 px-3" [style.width]="(100 / visibleTestimonials) + '%'">
                    <div class="rounded-xl p-6 h-full bg-white dark:bg-mechanik-noir border border-gray-200 dark:border-white/10">
                      <div class="flex items-center gap-1 mb-3">
                        @for (star of starsArray(t.rating); track $index) {
                          <svg class="w-4 h-4 text-mechanik-yellow" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        }
                      </div>
                      <p class="text-sm mb-4 leading-relaxed text-gray-700 dark:text-gray-300">"{{ t.comment }}"</p>
                      <div>
                        <p class="font-semibold text-sm">{{ t.name }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-500">{{ t.vehicle }}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div class="flex justify-center gap-3 mt-6">
                <button type="button" (click)="prevTestimonial()" class="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20" aria-label="Poprzednia opinia">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button type="button" (click)="nextTestimonial()" class="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20" aria-label="Następna opinia">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          } @else {
            <!-- Skeleton testimonials -->
            <div class="grid md:grid-cols-3 gap-6">
              @for (i of skeletonItems; track i) {
                <div class="rounded-xl p-6 animate-pulse bg-white dark:bg-mechanik-noir border border-gray-200 dark:border-white/10">
                  <div class="flex gap-1 mb-3">
                    @for (s of [1,2,3,4,5]; track s) { <div class="w-4 h-4 rounded bg-gray-200 dark:bg-white/10"></div> }
                  </div>
                  <div class="h-3 rounded mb-1 w-full bg-gray-200 dark:bg-white/10"></div>
                  <div class="h-3 rounded mb-4 w-4/5 bg-gray-100 dark:bg-white/[0.08]"></div>
                  <div class="h-4 rounded w-2/5 bg-gray-200 dark:bg-white/10"></div>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- FAQ accordion -->
      <section class="py-24 animate-section" id="faq-section" aria-label="Często zadawane pytania">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-black mb-4">FAQ</h2>
            <p class="text-gray-600 dark:text-gray-400">Najczęściej zadawane pytania.</p>
          </div>

          <div class="space-y-2" role="list">
            @for (item of faq; track item.id) {
              <div class="rounded-xl overflow-hidden bg-gray-50 dark:bg-mechanik-surface border border-gray-200 dark:border-white/5" role="listitem">
                <button type="button"
                  (click)="toggleFaq(item.id)"
                  class="w-full flex items-center justify-between px-6 py-4 text-left"
                  [attr.aria-expanded]="openFaqId() === item.id"
                  [attr.aria-controls]="'faq-' + item.id">
                  <span class="font-medium">{{ item.question }}</span>
                  <svg class="w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                    [style.transform]="openFaqId() === item.id ? 'rotate(180deg)' : ''">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                @if (openFaqId() === item.id) {
                  <div [@accordionToggle] [id]="'faq-' + item.id" class="px-6 pb-5">
                    <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{{ item.answer }}</p>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-24 text-center bg-gradient-to-br from-gray-100 to-white dark:from-mechanik-surface dark:to-mechanik-noir" aria-label="Wezwanie do działania">
        <div class="max-w-2xl mx-auto px-4">
          <h2 class="text-4xl font-black mb-4">Gotowy na serwis premium?</h2>
          <p class="mb-8 text-gray-600 dark:text-gray-400">Umów wizytę online w 2 minuty - bez kolejek, bez stresu.</p>
          <a routerLink="/rezerwacja" class="inline-flex items-center gap-3 px-10 py-4 font-bold text-lg rounded-xl transition-all hover:scale-105 bg-mechanik-red text-white">
            Umów wizytę teraz
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef);

  protected readonly services = SERVICES_DATA;
  protected readonly testimonials = TESTIMONIALS_DATA;
  protected readonly faq: FaqItem[] = FAQ_DATA;
  protected readonly processSteps = PROCESS_STEPS;
  protected readonly advantages = ADVANTAGES;
  protected readonly skeletonItems = [1, 2, 3];

  protected readonly servicesLoaded = signal(false);
  protected readonly testimonialsLoaded = signal(false);
  protected readonly openFaqId = signal<number | null>(null);
  protected readonly testimonialIndex = signal(0);
  protected readonly visibleTestimonials = 3;

  private observers: IntersectionObserver[] = [];

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        // Trigger skeleton resolve
        setTimeout(() => this.servicesLoaded.set(true), 600);
        setTimeout(() => this.testimonialsLoaded.set(true), 900);

        // IntersectionObserver for scroll animations
        const sections = this.el.nativeElement.querySelectorAll('.animate-section');
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).classList.add('in-view');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        sections.forEach((s: Element) => obs.observe(s));
        this.observers.push(obs);
      }
    });
  }

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Serwis Samochodowy Premium',
      description: 'APEX Mechanik - profesjonalny serwis samochodowy w Warszawie. Diagnostyka, naprawy, klimatyzacja, hamulce. Umów wizytę online.',
    });
  }

  ngOnDestroy(): void {
    this.observers.forEach((o) => o.disconnect());
  }

  protected toggleFaq(id: number): void {
    this.openFaqId.update((v) => (v === id ? null : id));
  }

  protected prevTestimonial(): void {
    const max = Math.max(0, this.testimonials.length - this.visibleTestimonials);
    this.testimonialIndex.update((i) => (i <= 0 ? max : i - 1));
  }

  protected nextTestimonial(): void {
    const max = Math.max(0, this.testimonials.length - this.visibleTestimonials);
    this.testimonialIndex.update((i) => (i >= max ? 0 : i + 1));
  }

  protected starsArray(rating: number): number[] {
    return Array.from({ length: rating });
  }
}
