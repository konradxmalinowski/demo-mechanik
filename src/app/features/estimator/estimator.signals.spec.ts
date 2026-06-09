import { TestBed } from '@angular/core/testing';
import { EstimatorSignals } from './estimator.signals';
import { ESTIMATOR_CATEGORIES } from '../../data/estimator.data';

describe('EstimatorSignals', () => {
  let service: EstimatorSignals;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [EstimatorSignals] });
    service = TestBed.inject(EstimatorSignals);
  });

  it('should start with null selected category', () => {
    expect(service.selectedCategory()).toBeNull();
  });

  it('should start with null selected option', () => {
    expect(service.selectedOption()).toBeNull();
  });

  it('should have null estimate when nothing selected', () => {
    expect(service.estimate()).toBeNull();
  });

  it('should compute estimate when category and option selected', () => {
    const catId = 'wymiana-oleju';
    const optId = 'olej-osobowy-syntetyczny';
    service.selectCategory(catId);
    service.selectOption(optId);

    const cat = ESTIMATOR_CATEGORIES.find((c) => c.id === catId)!;
    const opt = cat.options.find((o) => o.id === optId)!;
    expect(service.estimate()).toBe(opt.price);
  });

  it('should recompute estimate reactively when category changes', () => {
    service.selectCategory('wymiana-oleju');
    service.selectOption('olej-osobowy-syntetyczny');
    const first = service.estimate();

    service.selectCategory('hamulce');
    // option is reset when category changes
    expect(service.estimate()).toBeNull();
    expect(service.estimate()).not.toBe(first);
  });

  it('should expose the categories list', () => {
    expect(service.categories.length).toBeGreaterThanOrEqual(4);
  });

  it('should return options for selected category', () => {
    service.selectCategory('klimatyzacja');
    const opts = service.currentOptions();
    expect(opts.length).toBeGreaterThan(0);
  });
});
