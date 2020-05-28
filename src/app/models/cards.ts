import { DataService, GenericService } from 'projects/jade-integration-utils/src/public-api';

export class Cards extends DataService<Cards> {
  constructor(_genericService:GenericService) {
    super(_genericService,"https://api.magicthegathering.io","v1/cards");
  }
  public cards : {
    name: string;
    manaCost: string;
    cmc: number;
    colors: any;
    colorIdentity: any;
    type: string;
    supertypes: string[];
    types: string[];
    subtypes: string[];
    set: string;
    setName: string;
    artist: string;
    flavor?: string;
    multiverseid: number;
    imageUrl: string;
    variations: number[];
    printings: string[];
    originalText: string;
    originalType: string;
    id: string;
  };
}
