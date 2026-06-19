interface DigimonDetail {
  id: string;

  name: string;

  description: string;

  level: string;

  digimonAttribute: string;

  type: string;

  imageUrl: string;

  stats: DigimonStat;

  maxStats: DigimonStat;

  moves: DigimonMove[];

  previousEvolutions: EvolutionDigimon[];

  nextEvolutions: EvolutionDigimon[];
}