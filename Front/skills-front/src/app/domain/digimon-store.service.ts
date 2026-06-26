import { Injectable, computed, signal } from '@angular/core';

import {
  DigiSkill,
  Digimon,
  EvolutionLine,
  EvolutionStep
} from './digimon.models';

@Injectable({
  providedIn: 'root'
})
export class DigimonStoreService {
  private readonly skillsState = signal<DigiSkill[]>([
    {
      id: 1,
      name: 'Pepper Breath',
      type: 'Fire',
      power: 120,
      memoryCost: 12,
      description: 'Dispara uma rajada de fogo concentrada.'
    },
    {
      id: 2,
      name: 'Petit Thunder',
      type: 'Electric',
      power: 100,
      memoryCost: 10,
      description: 'Invoca um trovão curto com alta precisão.'
    }
  ]);

  private readonly digimonsState = signal<Digimon[]>([
    {
      id: 1,
      name: 'Agumon',
      stage: 'Rookie',
      attribute: 'Vaccine',
      family: 'Reptile',
      description: 'Digimon réptil equilibrado e confiável.',
      skillIds: [1]
    },
    {
      id: 2,
      name: 'Greymon',
      stage: 'Champion',
      attribute: 'Vaccine',
      family: 'Dinosaur',
      description: 'Forma evoluída do Agumon, focada em poder bruto.',
      skillIds: [1]
    },
    {
      id: 3,
      name: 'Patamon',
      stage: 'Rookie',
      attribute: 'Data',
      family: 'Mammal',
      description: 'Digimon aéreo de suporte e mobilidade.',
      skillIds: [2]
    }
  ]);

  private readonly evolutionLinesState = signal<EvolutionLine[]>([
    {
      id: 1,
      name: 'Linha principal de Agumon',
      description: 'Exemplo clássico de evolução de combate.',
      steps: [
        { order: 1, digimonId: 1, note: 'Base' },
        { order: 2, digimonId: 2, note: 'Primeira evolução' }
      ]
    }
  ]);

  readonly skills = computed(() => this.skillsState());
  readonly digimons = computed(() => this.digimonsState());
  readonly evolutionLines = computed(() => this.evolutionLinesState());

  readonly totalEntities = computed(() => ({
    digimons: this.digimonsState().length,
    skills: this.skillsState().length,
    lines: this.evolutionLinesState().length
  }));

  addSkill(payload: Omit<DigiSkill, 'id'>): void {
    const nextId = this.generateNextId(this.skillsState().map((item) => item.id));
    this.skillsState.update((state) => [...state, { id: nextId, ...payload }]);
  }

  updateSkill(id: number, payload: Omit<DigiSkill, 'id'>): void {
    this.skillsState.update((state) =>
      state.map((item) => (item.id === id ? { id, ...payload } : item))
    );
  }

  deleteSkill(id: number): void {
    this.skillsState.update((state) => state.filter((item) => item.id !== id));
    this.digimonsState.update((state) =>
      state.map((digimon) => ({
        ...digimon,
        skillIds: digimon.skillIds.filter((skillId) => skillId !== id)
      }))
    );
  }

  addDigimon(payload: Omit<Digimon, 'id'>): void {
    const nextId = this.generateNextId(this.digimonsState().map((item) => item.id));
    this.digimonsState.update((state) => [...state, { id: nextId, ...payload }]);
  }

  updateDigimon(id: number, payload: Omit<Digimon, 'id'>): void {
    this.digimonsState.update((state) =>
      state.map((item) => (item.id === id ? { id, ...payload } : item))
    );
  }

  deleteDigimon(id: number): void {
    this.digimonsState.update((state) => state.filter((item) => item.id !== id));
    this.evolutionLinesState.update((state) =>
      state
        .map((line) => ({
          ...line,
          steps: line.steps.filter((step) => step.digimonId !== id)
        }))
        .filter((line) => line.steps.length > 0)
        .map((line) => ({
          ...line,
          steps: this.reorderSteps(line.steps)
        }))
    );
  }

  addEvolutionLine(payload: Omit<EvolutionLine, 'id' | 'steps'> & { steps: EvolutionStep[] }): void {
    const nextId = this.generateNextId(this.evolutionLinesState().map((item) => item.id));
    this.evolutionLinesState.update((state) => [
      ...state,
      {
        id: nextId,
        ...payload,
        steps: this.reorderSteps(payload.steps)
      }
    ]);
  }

  updateEvolutionLine(
    id: number,
    payload: Omit<EvolutionLine, 'id' | 'steps'> & { steps: EvolutionStep[] }
  ): void {
    this.evolutionLinesState.update((state) =>
      state.map((item) =>
        item.id === id
          ? {
              id,
              ...payload,
              steps: this.reorderSteps(payload.steps)
            }
          : item
      )
    );
  }

  deleteEvolutionLine(id: number): void {
    this.evolutionLinesState.update((state) => state.filter((item) => item.id !== id));
  }

  resolveDigimonName(id: number): string {
    return this.digimonsState().find((item) => item.id === id)?.name ?? 'Desconhecido';
  }

  private reorderSteps(steps: EvolutionStep[]): EvolutionStep[] {
    return steps.map((step, index) => ({ ...step, order: index + 1 }));
  }

  private generateNextId(ids: number[]): number {
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
}
