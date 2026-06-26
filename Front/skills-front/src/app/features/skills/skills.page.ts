import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DigimonStoreService } from '../../domain/digimon-store.service';

@Component({
  selector: 'app-skills-page',
  imports: [ReactiveFormsModule],
  templateUrl: './skills.page.html',
  styleUrl: './skills.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(DigimonStoreService);

  readonly skills = this.store.skills;
  readonly editingId = signal<number | null>(null);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    type: ['', [Validators.required, Validators.maxLength(30)]],
    power: [100, [Validators.required, Validators.min(1)]],
    memoryCost: [8, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(200)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload = {
      name: value.name ?? '',
      type: value.type ?? '',
      power: Number(value.power ?? 0),
      memoryCost: Number(value.memoryCost ?? 0),
      description: value.description ?? ''
    };

    const currentEdit = this.editingId();
    if (currentEdit !== null) {
      this.store.updateSkill(currentEdit, payload);
    } else {
      this.store.addSkill(payload);
    }

    this.resetForm();
  }

  edit(skillId: number): void {
    const skill = this.skills().find((item) => item.id === skillId);
    if (!skill) {
      return;
    }

    this.editingId.set(skill.id);
    this.form.patchValue({
      name: skill.name,
      type: skill.type,
      power: skill.power,
      memoryCost: skill.memoryCost,
      description: skill.description
    });
  }

  remove(skillId: number): void {
    this.store.deleteSkill(skillId);
    if (this.editingId() === skillId) {
      this.resetForm();
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.editingId.set(null);
    this.form.reset({
      name: '',
      type: '',
      power: 100,
      memoryCost: 8,
      description: ''
    });
  }
}
