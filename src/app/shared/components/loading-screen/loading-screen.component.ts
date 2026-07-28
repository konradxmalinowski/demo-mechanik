import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  inject,
  PLATFORM_ID,
  DestroyRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('screenLeave', [
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(1.02)' })),
      ]),
    ]),
  ],
  template: `
    @if (visible()) {
      <div
        [@screenLeave]
        class="fixed inset-0 bg-[#0A0A0B] z-[9999] flex flex-col items-center justify-center"
        aria-live="polite"
        aria-label="Ładowanie strony"
      >
        <!-- Logo / Brand -->
        <div class="flex flex-col items-center gap-6">
          <div class="relative">
            <div class="w-16 h-16 border-2 border-mechanik-red-dark-text rounded-full animate-spin border-t-transparent"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-8 h-8 text-mechanik-red-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div class="text-center">
            <p class="text-mechanik-red-dark-text font-black text-3xl tracking-tight uppercase">APEX</p>
            <p class="text-white font-light text-3xl tracking-widest uppercase">Mechanik</p>
          </div>

          <p class="text-gray-500 text-sm tracking-widest uppercase animate-pulse">
            Ładowanie...
          </p>
        </div>
      </div>
    }
  `,
})
export class LoadingScreenComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  // Content is already prerendered/hydrated on first paint, so the overlay
  // starts hidden - it is only shown for later client-side route transitions
  // whose lazy chunk hasn't loaded yet, never for the initial (already-painted) load.
  protected readonly visible = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let isInitialNavigation = true;

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (isInitialNavigation) {
          isInitialNavigation = false;
          return;
        }
        this.visible.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.visible.set(false);
      }
    });
  }
}
