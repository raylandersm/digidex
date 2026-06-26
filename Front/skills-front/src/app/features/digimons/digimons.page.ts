import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  DIGIMON_ATTRIBUTES,
  DIGIMON_STAGES,
  DigimonAttribute,
  DigimonStage
} from '../../domain/digimon.models';
import { DigimonStoreService } from '../../domain/digimon-store.service';

@Component({
  selector: 'app-digimons-page',
  imports: [ReactiveFormsModule],
  templateUrl: './digimons.page.html',
  styleUrl: './digimons.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigimonsPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(DigimonStoreService);

  readonly digimons = this.store.digimons;
  readonly skills = this.store.skills;
  readonly editingId = signal<number | null>(null);
  readonly stages = DIGIMON_STAGES;
  readonly attributes = DIGIMON_ATTRIBUTES;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    stage: ['Rookie' as DigimonStage, [Validators.required]],
    attribute: ['Vaccine' as DigimonAttribute, [Validators.required]],
    family: ['', [Validators.required, Validators.maxLength(40)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    skillIds: [[] as number[]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload = {
      name: value.name ?? '',
      stage: (value.stage ?? 'Rookie') as DigimonStage,
      attribute: (value.attribute ?? 'Vaccine') as DigimonAttribute,
      family: value.family ?? '',
      description: value.description ?? '',
      skillIds: [...(value.skillIds ?? [])]
    };

    const currentEdit = this.editingId();
    if (currentEdit !== null) {
      this.store.updateDigimon(currentEdit, payload);
    } else {
      this.store.addDigimon(payload);
    }

    this.resetForm();
  }

  edit(digimonId: number): void {
    const digimon = this.digimons().find((item) => item.id === digimonId);
    if (!digimon) {
      return;
    }

    this.editingId.set(digimon.id);
    this.form.patchValue({
      name: digimon.name,
      stage: digimon.stage,
      attribute: digimon.attribute,
      family: digimon.family,
      description: digimon.description,
      skillIds: [...digimon.skillIds]
    });
  }

  remove(digimonId: number): void {
    this.store.deleteDigimon(digimonId);
    if (this.editingId() === digimonId) {
      this.resetForm();
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  onSkillToggle(skillId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement | null)?.checked ?? false;
    const selectedSkills = [...(this.form.value.skillIds ?? [])];

    if (checked && !selectedSkills.includes(skillId)) {
      this.form.patchValue({ skillIds: [...selectedSkills, skillId] });
      return;
    }

    if (!checked) {
      this.form.patchValue({
        skillIds: selectedSkills.filter((item) => item !== skillId)
      });
    }
  }

  isSkillSelected(skillId: number): boolean {
    return (this.form.value.skillIds ?? []).includes(skillId);
  }

  resolveSkillNames(skillIds: number[]): string {
    const names = this.skills()
      .filter((skill) => skillIds.includes(skill.id))
      .map((skill) => skill.name);

    return names.length > 0 ? names.join(', ') : 'Sem skills';
  }

  private resetForm(): void {
    this.editingId.set(null);
    this.form.reset({
      name: '',
      stage: 'Rookie',
      attribute: 'Vaccine',
      family: '',
      description: '',
      skillIds: []
    });
  }
}
