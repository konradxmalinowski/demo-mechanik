import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface NavLink {
  label: string;
  route: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Start', route: '/' },
  { label: 'Usługi', route: '/uslugi' },
  { label: 'Rezerwacja', route: '/rezerwacja' },
  { label: 'Strefa Klienta', route: '/strefa-klienta' },
  { label: 'Kalkulator', route: '/kalkulator' },
  { label: 'Kontakt', route: '/kontakt' },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('drawerSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('280ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('240ms cubic-bezier(0.4,0,0.2,1)', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  styles: [`
    :host { display: contents; }
    .nav-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      transition: all 300ms;
    }
    .nav-header.scrolled {
      background-color: #ffffff;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,.1);
      border-bottom: 1px solid rgba(0,0,0,.08);
    }
    :host-context(.dark) .nav-header.scrolled {
      background-color: #0A0A0B;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,.3);
      border-bottom: 1px solid rgba(255,255,255,.1);
    }
    .nav-header:not(.scrolled) {
      background: transparent;
    }
  `],
  template: `
    <header
      class="nav-header"
      [class.scrolled]="scrolled()"
      role="banner"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2" aria-label="APEX Mechanik - strona główna">
            <span class="text-mechanik-red-light-text dark:text-mechanik-red-dark-text font-black text-xl tracking-tight uppercase">APEX</span>
            <span class="text-mechanik-noir dark:text-white font-light text-xl tracking-widest uppercase">Mechanik</span>
          </a>

          <!-- Desktop nav -->
          <nav class="hidden lg:flex items-center gap-1" aria-label="Nawigacja główna">
            @for (link of navLinks; track link.route) {
              <a
                [routerLink]="link.route"
                routerLinkActive="text-mechanik-red-light-text dark:text-mechanik-red-dark-text border-b border-mechanik-red-light-text dark:border-mechanik-red-dark-text"
                [routerLinkActiveOptions]="{ exact: link.route === '/' }"
                class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-mechanik-noir dark:hover:text-white transition-colors duration-200 rounded-sm"
              >{{ link.label }}</a>
            }
          </nav>

          <!-- Right controls -->
          <div class="flex items-center gap-3">
            <!-- Dark mode toggle -->
            <button
              (click)="toggleDarkMode()"
              [attr.aria-label]="darkMode() ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'"
              class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-mechanik-noir dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              @if (darkMode()) {
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              } @else {
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
            </button>

            <!-- Book CTA button -->
            <a
              routerLink="/rezerwacja"
              class="hidden sm:inline-flex items-center px-4 py-2 bg-mechanik-red text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-mechanik-red focus:ring-offset-2"
            >Umów wizytę</a>

            <!-- Mobile hamburger -->
            <button
              (click)="toggleMenu()"
              class="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-mechanik-noir dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              [attr.aria-expanded]="menuOpen()"
              aria-controls="mobile-menu"
              aria-label="Otwórz menu nawigacji"
            >
              @if (menuOpen()) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile drawer backdrop -->
    @if (menuOpen()) {
      <div
        class="lg:hidden fixed inset-0 bg-black/60 z-40"
        [@backdropFade]
        (click)="closeMenu()"
        aria-hidden="true"
      ></div>
    }

    <!-- Mobile drawer -->
    @if (menuOpen()) {
      <nav
        id="mobile-menu"
        [@drawerSlide]
        class="lg:hidden fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-950 z-50 flex flex-col shadow-2xl border-l border-black/10 dark:border-white/10"
        aria-label="Menu mobilne"
      >
        <div class="flex items-center justify-between px-6 h-16 border-b border-black/10 dark:border-white/10">
          <span class="text-mechanik-noir dark:text-white font-semibold">Menu</span>
          <button
            (click)="closeMenu()"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-mechanik-noir dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Zamknij menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto py-6 px-4">
          @for (link of navLinks; track link.route) {
            <a
              [routerLink]="link.route"
              routerLinkActive="text-mechanik-red-light-text dark:text-mechanik-red-dark-text bg-mechanik-red-light-text/10 dark:bg-mechanik-red-dark-text/10"
              [routerLinkActiveOptions]="{ exact: link.route === '/' }"
              (click)="closeMenu()"
              class="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-mechanik-noir dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors mb-1 text-base font-medium"
            >{{ link.label }}</a>
          }
        </div>

        <div class="px-4 py-6 border-t border-black/10 dark:border-white/10">
          <a
            routerLink="/rezerwacja"
            (click)="closeMenu()"
            class="flex items-center justify-center w-full px-4 py-3 bg-mechanik-red text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >Umów wizytę</a>
        </div>
      </nav>
    }
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly navLinks = NAV_LINKS;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly darkMode = signal(false);

  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem('mechanik-dark-mode');
    const isDark = stored === 'true';
    this.darkMode.set(isDark);
    this.applyDarkMode(isDark);

    this.scrollListener = () => {
      this.scrolled.set(window.scrollY > 40);
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (isPlatformBrowser(this.platformId) && this.menuOpen()) {
      document.body.style.overflow = '';
    }
  }

  protected toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = next ? 'hidden' : '';
    }
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  protected toggleDarkMode(): void {
    const next = !this.darkMode();
    this.darkMode.set(next);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('mechanik-dark-mode', String(next));
      this.applyDarkMode(next);
    }
  }

  private applyDarkMode(dark: boolean): void {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
