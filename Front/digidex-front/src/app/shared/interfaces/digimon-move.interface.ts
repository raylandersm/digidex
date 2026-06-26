interface DigimonMove {
  id: string;

  name: string;

  description: string;

  accuracy: number;

  power: number;

  spCost: number;

  variants: MoveVariant[];

  type: string;
}