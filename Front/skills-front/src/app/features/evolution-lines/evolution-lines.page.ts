import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EvolutionStep } from '../../domain/digimon.models';
import { DigimonStoreService } from '../../domain/digimon-store.service';

@Component({
  selector: 'app-evolution-lines-page',
  imports: [ReactiveFormsModule],
  templateUrl: './evolution-lines.page.html',
  styleUrl: './evolution-lines.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvolutionLinesPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(DigimonStoreService);

  readonly evolutionLines = this.store.evolutionLines;
  readonly digimonOptions = this.store.digimons;
  readonly editingId = signal<number | null>(null);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    steps: this.fb.array([this.createStep(), this.createStep()])
  });

  readonly stepControls = computed(() => this.steps.controls);

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(this.createStep());
  }

  removeStep(index: number): void {
    if (this.steps.length <= 2) {
      return;
    }

    this.steps.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const rawSteps = value.steps ?? [];
    const mappedSteps: EvolutionStep[] = rawSteps
      .filter((step) => Number(step.digimonId) > 0)
      .map((step, index) => ({
        order: index + 1,
        digimonId: Number(step.digimonId),
        note: step.note ?? ''
      }));

    if (mappedSteps.length < 2) {
      return;
    }

    const payload = {
      name: value.name ?? '',
      description: value.description ?? '',
      steps: mappedSteps
    };

    const currentEdit = this.editingId();
    if (currentEdit !== null) {
      this.store.updateEvolutionLine(currentEdit, payload);
    } else {
      this.store.addEvolutionLine(payload);
    }

    this.resetForm();
  }

  edit(lineId: number): void {
    const line = this.evolutionLines().find((item) => item.id === lineId);
    if (!line) {
      return;
    }

    this.editingId.set(line.id);
    this.form.patchValue({
      name: line.name,
      description: line.description
    });

    while (this.steps.length > 0) {
      this.steps.removeAt(0);
    }

    for (const step of line.steps) {
      this.steps.push(this.createStep(step.digimonId, step.note));
    }
  }

  remove(lineId: number): void {
    this.store.deleteEvolutionLine(lineId);
    if (this.editingId() === lineId) {
      this.resetForm();
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resolveDigimonName(id: number): string {
    return this.store.resolveDigimonName(id);
  }

  private createStep(digimonId = 0, note = '') {
    return this.fb.group({
      digimonId: [digimonId, [Validators.required, Validators.min(1)]],
      note: [note, [Validators.maxLength(100)]]
    });
  }

  private resetForm(): void {
    this.editingId.set(null);
    this.form.reset({
      name: '',
      description: ''
    });

    while (this.steps.length > 0) {
      this.steps.removeAt(0);
    }

    this.steps.push(this.createStep());
    this.steps.push(this.createStep());
  }
}
