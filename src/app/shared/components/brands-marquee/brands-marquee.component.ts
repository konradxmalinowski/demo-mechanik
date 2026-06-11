import {
  Component,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BRANDS_DATA } from '../../../data/brands.data';

@Component({
  selector: 'app-brands-marquee',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: block; overflow: hidden; }

    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee-scroll 28s linear infinite;
      will-change: transform;
    }

    .marquee-track:hover {
      animation-play-state: paused;
    }

    @keyframes marquee-scroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .brand-item {
      flex-shrink: 0;
      width: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: grayscale(1) brightness(0.55);
      transition: filter 200ms ease;
      cursor: default;
    }

    .brand-item:hover {
      filter: grayscale(0) brightness(1);
    }
  `],
  template: `
    <section
      class="py-12 bg-[#111113] border-y border-white/5"
      aria-label="Obsługiwane marki samochodów"
    >
      <p class="text-center text-xs text-gray-500 uppercase tracking-widest mb-8">
        Obsługiwane marki
      </p>

      <div class="relative overflow-hidden">
        <!-- Fade edges -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#111113] to-transparent"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#111113] to-transparent"></div>

        <div class="marquee-track" role="list">
          <!-- Doubled list for seamless loop -->
          @for (brand of doubledBrands; track $index) {
            <div
              class="brand-item"
              role="listitem"
              [attr.aria-label]="brand.name"
            >
              <span class="text-2xl font-black text-white tracking-tight uppercase select-none px-4 py-2">
                {{ brand.name }}
              </span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class BrandsMarqueeComponent {
  protected readonly doubledBrands = [...BRANDS_DATA, ...BRANDS_DATA];
}
