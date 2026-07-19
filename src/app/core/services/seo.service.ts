import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

const DEFAULT_OG_IMAGE = '/assets/og-mechanik.jpg';
const SITE_NAME = 'APEX Mechanik - Serwis Samochodowy Premium';

const AUTO_REPAIR_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'APEX Mechanik',
  description: 'Profesjonalny serwis samochodowy - diagnostyka komputerowa, naprawy mechaniczne, klimatyzacja, hamulce, zawieszenie, elektryka.',
  url: 'http://konrad.malinowski.ct8.pl/',
  telephone: '+48500100200',
  email: 'kontakt@apex-mechanik.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Mechaniczna 12',
    addressLocality: 'Warszawa',
    postalCode: '00-001',
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '52.2297',
    longitude: '21.0122',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '312',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Usługi serwisowe',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diagnostyka komputerowa' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Serwis olejowy' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Klimatyzacja' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Układ hamulcowy' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Zawieszenie' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elektryka samochodowa' } },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  setPage(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${SITE_NAME}`;
    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle ?? config.title });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription ?? config.description });
    this.meta.updateTag({ property: 'og:image', content: config.ogImage ?? DEFAULT_OG_IMAGE });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.ogTitle ?? config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.ogDescription ?? config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.ogImage ?? DEFAULT_OG_IMAGE });

    this.setJsonLd(config.jsonLd ?? AUTO_REPAIR_SCHEMA);
  }

  setJsonLd(schema: Record<string, unknown>): void {
    const id = 'json-ld-mechanik';
    const existing = this.doc.getElementById(id);
    if (existing) {
      existing.textContent = JSON.stringify(schema);
    } else {
      const script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      this.doc.head.appendChild(script);
    }
  }

  setCanonical(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const existing = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (existing) {
      existing.href = url;
    } else {
      const link = this.doc.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      this.doc.head.appendChild(link);
    }
  }

  getAutoRepairSchema(): Record<string, unknown> {
    return AUTO_REPAIR_SCHEMA;
  }
}
