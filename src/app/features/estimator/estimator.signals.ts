import { Injectable, signal, computed } from '@angular/core';
import {
  ESTIMATOR_CATEGORIES,
  EstimatorCategory,
  EstimatorOption,
} from '../../data/estimator.data';

@Injectable()
export class EstimatorSignals {
  readonly categories: EstimatorCategory[] = ESTIMATOR_CATEGORIES;

  readonly selectedCategory = signal<string | null>(null);
  readonly selectedOption = signal<string | null>(null);

  /** Options for the currently selected category */
  readonly currentOptions = computed<EstimatorOption[]>(() => {
    const catId = this.selectedCategory();
    if (!catId) return [];
    return this.categories.find((c) => c.id === catId)?.options ?? [];
  });

  /** Estimated price - null if not fully selected */
  readonly estimate = computed<number | null>(() => {
    const catId = this.selectedCategory();
    const optId = this.selectedOption();
    if (!catId || !optId) return null;
    const cat = this.categories.find((c) => c.id === catId);
    if (!cat) return null;
    const opt = cat.options.find((o) => o.id === optId);
    return opt ? opt.price : null;
  });

  /** Currently selected category object */
  readonly currentCategory = computed<EstimatorCategory | null>(() => {
    const catId = this.selectedCategory();
    return catId ? (this.categories.find((c) => c.id === catId) ?? null) : null;
  });

  /** Currently selected option object */
  readonly currentOptionObj = computed<EstimatorOption | null>(() => {
    const catId = this.selectedCategory();
    const optId = this.selectedOption();
    if (!catId || !optId) return null;
    const cat = this.categories.find((c) => c.id === catId);
    return cat?.options.find((o) => o.id === optId) ?? null;
  });

  selectCategory(catId: string): void {
    this.selectedCategory.set(catId);
    this.selectedOption.set(null); // Reset option on category change
  }

  selectOption(optId: string): void {
    this.selectedOption.set(optId);
  }

  reset(): void {
    this.selectedCategory.set(null);
    this.selectedOption.set(null);
  }
}
