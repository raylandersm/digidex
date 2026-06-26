export type DigimonStage =
  | 'Fresh'
  | 'In-Training'
  | 'Rookie'
  | 'Champion'
  | 'Ultimate'
  | 'Mega'
  | 'Armor'
  | 'Hybrid';

export type DigimonAttribute = 'Vaccine' | 'Data' | 'Virus' | 'Free' | 'Variable';

export interface DigiSkill {
  id: number;
  name: string;
  type: string;
  power: number;
  memoryCost: number;
  description: string;
}

export interface Digimon {
  id: number;
  name: string;
  stage: DigimonStage;
  attribute: DigimonAttribute;
  family: string;
  description: string;
  skillIds: number[];
}

export interface EvolutionStep {
  order: number;
  digimonId: number;
  note: string;
}

export interface EvolutionLine {
  id: number;
  name: string;
  description: string;
  steps: EvolutionStep[];
}

export const DIGIMON_STAGES: DigimonStage[] = [
  'Fresh',
  'In-Training',
  'Rookie',
  'Champion',
  'Ultimate',
  'Mega',
  'Armor',
  'Hybrid'
];

export const DIGIMON_ATTRIBUTES: DigimonAttribute[] = [
  'Vaccine',
  'Data',
  'Virus',
  'Free',
  'Variable'
];
