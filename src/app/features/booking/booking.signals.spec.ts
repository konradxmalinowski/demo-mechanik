import { TestBed } from '@angular/core/testing';
import { BookingSignals } from './booking.signals';

describe('BookingSignals', () => {
  let service: BookingSignals;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BookingSignals] });
    service = TestBed.inject(BookingSignals);
  });

  it('should start at step 1', () => {
    expect(service.step()).toBe(1);
  });

  it('should not advance past step 6', () => {
    // Force step to 6
    service['_step'].set(6);
    service.nextStep();
    expect(service.step()).toBe(6);
  });

  it('should not go below step 1', () => {
    service.prevStep();
    expect(service.step()).toBe(1);
  });

  it('should advance step when form is valid', () => {
    // Mark step 1 form as valid for test
    service.vehicleForm.patchValue({ marka: 'BMW', model: '320d', rocznik: '2021', przebieg: '67000' });
    service.nextStep();
    expect(service.step()).toBe(2);
  });

  it('should not advance when form is invalid (empty required fields)', () => {
    // Step 1 form is invalid by default (empty required fields)
    expect(service.step()).toBe(1);
    service.vehicleForm.patchValue({ marka: '', model: '', rocznik: '', przebieg: '' });
    service.nextStep();
    expect(service.step()).toBe(1);
  });

  it('should have a canProceed computed signal', () => {
    expect(service.canProceed).toBeTruthy();
    expect(typeof service.canProceed()).toBe('boolean');
  });
});
