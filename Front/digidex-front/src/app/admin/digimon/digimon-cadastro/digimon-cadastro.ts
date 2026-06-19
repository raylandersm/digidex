import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { DigimonOption } from '../../../shared/interfaces/digimon-option.interface';
import { OnInit } from '@angular/core';
import { DigimonService } from '../../../core/services/digimon.service';

type StatKey = 'hp' | 'sp' | 'atk' | 'def' | 'int' | 'spi' | 'spd';

@Component({
  selector: 'app-digimon-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './digimon-cadastro.html',
  styleUrl: './digimon-cadastro.scss',
})
export class DigimonCadastro implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly digimonService =
    inject(DigimonService);


  protected readonly levelOptions = ['Baby I', 'Baby II', 'Roockie', 'Champion', 'Ultimate', 'Mega', 'Mega+'];
  protected readonly attributeOptions = ['Flame', 'Water', 'Plant', 'Wind', 'Earth', 'Electric', 'Light', 'Dark','Steel', 'Neutral'];
  protected readonly typeOptions = ['Vaccine', 'Virus', 'Data', 'Free', 'NoData'];
  protected readonly moveCategoryOptions: Array<'Principal' | 'Aprendivel'> = ['Principal', 'Aprendivel'];
  protected previousDigimonOptions: DigimonOption[] = [];
  protected readonly previousSearch = signal('');

  protected readonly statOrder: Array<{ key: StatKey; label: string }> = [
    { key: 'hp', label: 'HP' },
    { key: 'sp', label: 'SP' },
    { key: 'atk', label: 'ATK' },
    { key: 'def', label: 'DEF' },
    { key: 'int', label: 'INT' },
    { key: 'spi', label: 'SPI' },
    { key: 'spd', label: 'SPD' }
  ];

  protected readonly successMessage =
  signal('');

  protected readonly imagePreview = signal('');
  protected selectedImageFile: File | null = null;

  protected readonly formSubmitted = signal(false);
  protected readonly submittedPayload = signal('');

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    level: ['Roockie', Validators.required],
    attribute: ['Flame', Validators.required],
    digimonType: ['Vaccine', Validators.required],
    previousEvolutions: this.fb.array<FormGroup>([]),
    evolutionCondition: [''],
    imageUrl: [''],
    stats: this.createStatsGroup(),
    maxStats: this.createStatsGroup(),
    moves: this.fb.array([this.createMoveGroup()]),
  });

  ngOnInit(): void {


  this.digimonService
    .findAll()
    .subscribe({
      next: (response) => {


        this.previousDigimonOptions =
          response;

      },

      error: (error) => {

        console.error(error);

      }
    });
}
  protected get movesArray(): FormArray<FormGroup> {
    return this.form.controls.moves as FormArray<FormGroup>;
  }

  protected get previousEvolutionsArray(): FormArray<FormGroup> {
    return this.form.controls.previousEvolutions;
  }

  protected onImageUrlChange(): void {
    const url = (this.form.controls.imageUrl.value ?? '').trim();
    this.imagePreview.set(url);
  }

  protected onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedImageFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      const result =
        typeof reader.result === 'string'
          ? reader.result
          : '';

      this.imagePreview.set(result);
    };

    reader.readAsDataURL(file);
  }

  protected addPreviousDigimon(
    digimon: DigimonOption
  ): void {

    if (!digimon.name.trim()) {
      return;
    }

    if (this.isPreviousSelected(digimon.name)) {
      return;
    }

    this.previousEvolutionsArray.push(
      this.createPreviousEvolutionGroup(
        digimon.id,
        digimon.name
      )
    );

    this.previousSearch.set('');
  }

  protected removePreviousDigimon(name: string): void {
    const index = this.previousEvolutionsArray.controls.findIndex(
      (control) => control.get('name')?.value === name
    );

    if (index === -1) {
      return;
    }

    this.previousEvolutionsArray.removeAt(index);
    this.previousEvolutionsArray.markAsTouched();
    this.previousEvolutionsArray.updateValueAndValidity();
  }

  protected onPreviousSearchChange(value: string): void {
    this.previousSearch.set(value);
  }

  protected addFirstPreviousFromSearch(): void {

    const first = this.filteredPreviousDigimonOptions[0];

    if (first) {
      this.addPreviousDigimon(first);
    }
  }

  protected get filteredPreviousDigimonOptions(): DigimonOption[] {

    const query =
      this.previousSearch().trim().toLowerCase();

    const selected = new Set(
      this.previousEvolutionsArray.controls.map(
        (control) => control.get('name')?.value
      )
    );

    return this.previousDigimonOptions.filter((option) => {

      if (selected.has(option.name)) {
        return false;
      }

      return option.name
        .toLowerCase()
        .includes(query);
    });
  }

  protected isPreviousSelected(name: string): boolean {
    return this.previousEvolutionsArray.controls.some(
      (control) => control.get('name')?.value === name
    );
  }

  protected hasPreviousDigimonSelection(): boolean {
    return this.previousEvolutionsArray.length > 0;
  }

  protected getPreviousEvolutionControl(
    index: number,
    key: 'id' | 'name'
  ): FormControl {
    return this.previousEvolutionsArray.at(index).get(key) as FormControl;
  }

  protected getStatControl(group: 'stats' | 'maxStats', key: StatKey): FormControl<number | null> {
    return this.form.get([group, key]) as FormControl<number | null>;
  }

  protected getMoveControl(index: number, key: 'category' | 'name' | 'description' | 'accuracy' | 'power' | 'spCost' | 'level'): FormControl {
    return this.movesArray.at(index).get(key) as FormControl;
  }

  protected addMove(): void {
    this.movesArray.push(this.createMoveGroup());
  }

  protected removeMove(index: number): void {
    if (this.movesArray.length <= 1) {
      return;
    }

    this.movesArray.removeAt(index);
  }

  protected getTotal(group: 'stats' | 'maxStats'): number {
    return this.statOrder.reduce((acc, stat) => acc + (this.getStatControl(group, stat.key).value ?? 0), 0);
  }

  protected hasStatMismatch(key: StatKey): boolean {
    const base = this.getStatControl('stats', key).value ?? 0;
    const max = this.getStatControl('maxStats', key).value ?? 0;
    return max < base;
  }

  

  protected resetForm(): void {
    this.selectedImageFile = null;

    this.form.reset({
      name: '',
      description: '',
      level: 'Roockie',
      attribute: 'Flame',
      digimonType: 'Vaccine',
      previousEvolutions: [],
      evolutionCondition: '',
      imageUrl: '',
      stats: this.getInitialStats(),
      maxStats: this.getInitialStats(),
      moves: [this.getInitialMove()],
    });
    this.previousEvolutionsArray.clear();
    this.movesArray.clear();
    this.movesArray.push(this.createMoveGroup());
    this.formSubmitted.set(false);
    this.submittedPayload.set('');
    this.imagePreview.set('');
  }

  private createStatsGroup(): FormGroup {
    const initial = this.getInitialStats();
    return this.fb.group({
      hp: [initial.hp, [Validators.required, Validators.min(0)]],
      sp: [initial.sp, [Validators.required, Validators.min(0)]],
      atk: [initial.atk, [Validators.required, Validators.min(0)]],
      def: [initial.def, [Validators.required, Validators.min(0)]],
      int: [initial.int, [Validators.required, Validators.min(0)]],
      spi: [initial.spi, [Validators.required, Validators.min(0)]],
      spd: [initial.spd, [Validators.required, Validators.min(0)]],
    });
  }

  private createMoveGroup(): FormGroup {
    const initial = this.getInitialMove();
    return this.fb.group({
      moveId: [initial.moveId],
      category: [initial.category, Validators.required],
      attribute: [initial.attribute, Validators.required],
      name: [initial.name, [Validators.required, Validators.minLength(2)]],
      description: [initial.description, [Validators.required, Validators.minLength(8)]],
      accuracy: [initial.accuracy, [Validators.required, Validators.min(0), Validators.max(100)]],
      power: [initial.power, []],
      spCost: [initial.spCost, [Validators.required, Validators.min(0)]],
      level: [initial.level, [Validators.required, Validators.min(1)]],
    });
  }

  protected onSubmit(): void {
    

    const hasMismatch = this.statOrder.some((stat) => this.hasStatMismatch(stat.key));
    if (hasMismatch) {
      return;
    }

    const raw = this.form.getRawValue();
    this.formSubmitted.set(true);


    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const payload = {
  name: raw.name ?? '',

  description: raw.description ?? '',

  level: this.mapLevel(raw.level),

  digimonAttribute:
    raw.attribute?.toUpperCase(),

  type:
    raw.digimonType?.toUpperCase(),

  evolutionCondition:
    raw.evolutionCondition ?? '',
  
  stats: {
    hp: raw.stats?.['hp'],
    sp: raw.stats?.['sp'],
    atk: raw.stats?.['atk'],
    def: raw.stats?.['def'],
    intel: raw.stats?.['int'],
    spi: raw.stats?.['spi'],
    spd: raw.stats?.['spd']
  },

  maxStats: {
    hp: raw.maxStats?.['hp'],
    sp: raw.maxStats?.['sp'],
    atk: raw.maxStats?.['atk'],
    def: raw.maxStats?.['def'],
    intel: raw.maxStats?.['int'],
    spi: raw.maxStats?.['spi'],
    spd: raw.maxStats?.['spd']
  },

  previousEvolutionIds:
    ((raw.previousEvolutions ?? []) as Array<{ id?: string }>)
      .map((evo) => evo.id)
      .filter(Boolean),
        

  moves:
    (raw.moves ?? []).map((move: any) => ({
      moveId: move.moveId,

      moveName: move.name,

      description: move.description,

      accuracy: move.accuracy,

      power: move.power,

      spCost: move.spCost,

      attribute:
        move.attribute?.toUpperCase(),

      type:
        move.category === 'Principal'
          ? 'PRINCIPAL'
          : 'APRENDIVEL',

      level: move.level
    }))
};

        
    const formData = new FormData();

    formData.append(
      'data',
      new Blob(
        [JSON.stringify(payload)],
        {
          type: 'application/json'
        }
      )
    );

    if (this.selectedImageFile) {

      formData.append(
        'image',
        this.selectedImageFile
      );
    }
    

    this.digimonService
  .create(formData)
  .subscribe({

    next: (id) => {

       window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      this.successMessage.set(
        'Digimon cadastrado com sucesso!'
      );

      setTimeout(() => {
        this.successMessage.set('');
      }, 3000);

      this.resetForm();

      console.log(
        'Digimon criado:',
        id
      );

    },

    error: (error) => {

      console.error(error);

      alert(
        'Erro ao cadastrar Digimon.'
      );

    }
  });
}

  private createPreviousEvolutionGroup(
    id: string,
    name: string
  ): FormGroup {

    return this.fb.group({
      id: [id],
      name: [name]
    });
  }

  private getInitialStats(): Record<StatKey, number> {
    return {
      hp: 0,
      sp: 0,
      atk: 0,
      def: 0,
      int: 0,
      spi: 0,
      spd: 0,
    };
  }

  private getInitialMove(): {
    moveId: string | null;
    category: 'Principal' | 'Aprendivel';
    attribute: string;
    name: string;
    description: string;
    accuracy: number;
    power: number;
    spCost: number;
    level: number;
  } {
    return {
      moveId: null,
      category: 'Principal',
      attribute: 'Flame',
      name: '',
      description: '',
      accuracy: 100,
      power: 0,
      spCost: 0,
      level: 1,
    };
  }

  private mapLevel(level: string | null | undefined): string {

    switch (level) {

      case 'Baby I':
        return 'BABY_I';

      case 'Baby II':
        return 'BABY_II';

      case 'Roockie':
        return 'ROOKIE';

      case 'Champion':
        return 'CHAMPION';

      case 'Ultimate':
        return 'ULTIMATE';

      case 'Mega':
        return 'MEGA';

      case 'Mega+':
        return 'MEGA_PLUS';

      default:
        return 'ROOKIE';
    }
  }
}
