export interface CreateDigimonMoveRequest {

  moveId: string | null;

  moveName: string;

  description: string;

  accuracy: number;

  power: number;

  spCost: number;

  attribute: string;

  type: string;

  level: number;
}