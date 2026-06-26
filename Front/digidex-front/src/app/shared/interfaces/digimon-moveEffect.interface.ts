interface MoveEffect {
  id: string;

  effect: string;

  chance: number;

  vulnerableTo?: string;

  bonusDamagePercent?: number;

  removedBy?: string;
}