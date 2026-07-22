import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  inject,
} from '@angular/core';

import { animate, style, transition, trigger } from '@angular/animations';
import { DemoModeService } from '../../../core/services/demo-mode.service';

const DEMO_TEXT =
  'To jest wersja demonstracyjna przygotowana w celu prezentacji możliwości wykonania strony internetowej dla klienta.';

@Component({
  selector: 'app-demo-modal',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  template: `
    @if (demoModeService.modalOpen()) {
      <!--
        Backdrop click-to-close and the inner stopPropagation guard are mouse-only
        conveniences; full keyboard equivalents already exist via the Escape key
        (see @HostListener below) and the visible "Zamknij" button, so the
        a11y click/keyboard-pairing rules don't apply to these two divs.
      -->
      <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
      <div
        class="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
        [@backdrop]
        (click)="demoModeService.close()"
      >
        <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
          class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col gap-4"
          [@fadeIn]
          (click)="$event.stopPropagation()"
        >
          <h2
            id="demo-modal-title"
            class="text-xl font-semibold text-gray-900 dark:text-white"
          >
            Wersja demonstracyjna
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ demoText }}
          </p>
          <button
            (click)="demoModeService.close()"
            class="mt-2 px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity self-end"
          >
            Zamknij
          </button>
        </div>
      </div>
    }
  `,
})
export class DemoModalComponent {
  protected readonly demoModeService = inject(DemoModeService);
  protected readonly demoText = DEMO_TEXT;

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.demoModeService.close();
  }
}
