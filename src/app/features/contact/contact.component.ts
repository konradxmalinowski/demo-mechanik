import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { DemoModeService } from '../../core/services/demo-mode.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#0A0A0B] text-white pt-24 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-8" aria-label="Nawigacja okruszkowa">
          <ol class="flex items-center gap-2">
            <li><a routerLink="/" class="hover:text-white transition-colors">Start</a></li>
            <li><span aria-hidden="true">/</span></li>
            <li class="text-[#EF4444]" aria-current="page">Kontakt</li>
          </ol>
        </nav>

        <h1 class="text-4xl font-black mb-4">Kontakt</h1>
        <p class="text-gray-400 mb-12">Skontaktuj się z nami lub odwiedź nasz warsztat.</p>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact info -->
          <div class="space-y-6">
            <div class="bg-[#111113] border border-white/5 rounded-xl p-6">
              <h2 class="font-bold mb-4 text-[#EF4444]">Dane kontaktowe</h2>
              <dl class="space-y-3 text-sm">
                <div class="flex gap-3"><dt class="text-gray-500 w-20">Adres</dt><dd>ul. Mechaniczna 12, 00-001 Warszawa</dd></div>
                <div class="flex gap-3"><dt class="text-gray-500 w-20">Telefon</dt><dd>+48 500 100 200</dd></div>
                <div class="flex gap-3"><dt class="text-gray-500 w-20">E-mail</dt><dd>kontakt&#64;apex-mechanik.pl</dd></div>
                <div class="flex gap-3"><dt class="text-gray-500 w-20">Pon–Pt</dt><dd>08:00 – 18:00</dd></div>
                <div class="flex gap-3"><dt class="text-gray-500 w-20">Sobota</dt><dd>09:00 – 14:00</dd></div>
              </dl>
            </div>
          </div>

          <!-- Contact form -->
          <div class="bg-[#111113] border border-white/5 rounded-xl p-6">
            <h2 class="font-bold mb-6">Wyślij wiadomość</h2>
            <form (submit)="onSubmit($event)" class="space-y-4" novalidate>
              <div>
                <label for="name" class="block text-sm text-gray-400 mb-1">Imię i nazwisko</label>
                <input id="name" type="text" placeholder="Jan Kowalski"
                  class="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#EF4444] transition-colors" />
              </div>
              <div>
                <label for="email" class="block text-sm text-gray-400 mb-1">Adres e-mail</label>
                <input id="email" type="email" placeholder="jan&#64;example.com"
                  class="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#EF4444] transition-colors" />
              </div>
              <div>
                <label for="subject" class="block text-sm text-gray-400 mb-1">Temat</label>
                <input id="subject" type="text" placeholder="Zapytanie o usługę"
                  class="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#EF4444] transition-colors" />
              </div>
              <div>
                <label for="message" class="block text-sm text-gray-400 mb-1">Wiadomość</label>
                <textarea id="message" rows="5" placeholder="Opisz swoje pytanie lub potrzebę serwisową..."
                  class="w-full bg-[#0A0A0B] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#EF4444] transition-colors resize-none"></textarea>
              </div>
              <button
                type="submit"
                class="w-full px-6 py-3 bg-[#EF4444] text-white font-semibold rounded-lg hover:bg-[#DC2626] transition-colors"
              >
                Wyślij wiadomość
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly demoModeService = inject(DemoModeService);

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Kontakt',
      description: 'Skontaktuj się z APEX Mechanik — tel. +48 500 100 200, ul. Mechaniczna 12, Warszawa. Pon–Pt 8–18, Sob 9–14.',
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.demoModeService.open();
  }
}
