import { Injectable, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface BookingState {
  step: number;
  vehicleData: Record<string, string>;
  selectedServices: string[];
  selectedDate: string | null;
  selectedTime: string | null;
  contactData: Record<string, string>;
}

@Injectable()
export class BookingSignals {
  private readonly fb = new FormBuilder();

  /** Current wizard step 1–6 */
  readonly _step = signal<number>(1);
  readonly step = this._step.asReadonly();

  // Per-step Reactive Form groups
  readonly vehicleForm: FormGroup = this.fb.group({
    marka: ['', [Validators.required]],
    model: ['', [Validators.required]],
    rocznik: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    przebieg: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  readonly servicesForm: FormGroup = this.fb.group({
    services: [[], [Validators.required]],
  });

  readonly calendarForm: FormGroup = this.fb.group({
    date: ['', [Validators.required]],
  });

  readonly timeForm: FormGroup = this.fb.group({
    time: ['', [Validators.required]],
  });

  readonly contactForm: FormGroup = this.fb.group({
    imie: ['', [Validators.required]],
    nazwisko: ['', [Validators.required]],
    telefon: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{9,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Bridge reactive-form state into signals so `canProceed` re-evaluates on
  // user input. Without this, computed() memoizes on the `step` signal alone
  // and caches stale form validity, deadlocking the wizard at step 1.
  private readonly vehicleStatus = toSignal(this.vehicleForm.statusChanges, { initialValue: this.vehicleForm.status });
  private readonly servicesValue = toSignal(this.servicesForm.valueChanges, { initialValue: this.servicesForm.value });
  private readonly calendarStatus = toSignal(this.calendarForm.statusChanges, { initialValue: this.calendarForm.status });
  private readonly timeStatus = toSignal(this.timeForm.statusChanges, { initialValue: this.timeForm.status });
  private readonly contactStatus = toSignal(this.contactForm.statusChanges, { initialValue: this.contactForm.status });

  /** Computed: whether the current step's form allows advancing */
  readonly canProceed = computed<boolean>(() => {
    const s = this.step();
    switch (s) {
      case 1: return this.vehicleStatus() === 'VALID';
      case 2: {
        const v = this.servicesValue()?.services as string[];
        return Array.isArray(v) && v.length > 0;
      }
      case 3: return this.calendarStatus() === 'VALID';
      case 4: return this.timeStatus() === 'VALID';
      case 5: return this.contactStatus() === 'VALID';
      default: return true;
    }
  });

  /** Advance to next step if allowed (max step 6) */
  nextStep(): void {
    if (this._step() >= 6) return;
    if (!this.canProceed()) return;
    this._step.update((s) => s + 1);
  }

  /** Go back one step (min step 1) */
  prevStep(): void {
    if (this._step() <= 1) return;
    this._step.update((s) => s - 1);
  }

  /** Go to specific step (for debugging / pre-fill) */
  goToStep(step: number): void {
    if (step >= 1 && step <= 6) {
      this._step.set(step);
    }
  }

  /** Toggle service selection */
  toggleService(serviceId: string): void {
    const current: string[] = this.servicesForm.get('services')?.value ?? [];
    const idx = current.indexOf(serviceId);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(serviceId);
    }
    this.servicesForm.patchValue({ services: [...current] });
  }

  /** Check if a service is selected */
  isServiceSelected(serviceId: string): boolean {
    const current: string[] = this.servicesForm.get('services')?.value ?? [];
    return current.includes(serviceId);
  }

  reset(): void {
    this._step.set(1);
    this.vehicleForm.reset();
    this.servicesForm.reset({ services: [] });
    this.calendarForm.reset();
    this.timeForm.reset();
    this.contactForm.reset();
  }
}
