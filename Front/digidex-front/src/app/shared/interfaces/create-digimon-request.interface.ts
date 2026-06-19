import { CreateDigimonMoveRequest } from "./create-digimon-move-request.interface";

export interface CreateDigimonRequest {

  name: string;

  description: string;

  level: string;

  digimonAttribute: string;

  type: string;

  previousEvolutionIds: string[];

  evolutionCondition: string;

  moves: CreateDigimonMoveRequest[];
}