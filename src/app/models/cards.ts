import { DataService, GenericService } from 'projects/jade-integration-utils/src/public-api';

export class Cards extends DataService<Cards> {
  constructor() {
    super("https://api.magicthegathering.io","v1/cards");
  }
  public name: string;
  public manaCost: string;
  public cmc: number;
  public colors: any;
  public colorIdentity: any;
  public type: string;
  public supertypes: string[];
  public types: string[];
  public subtypes: string[];
  public set: string;
  public setName: string;
  public artist: string;
  public flavor?: string;
  public multiverseid: number;
  public imageUrl: string;
  public variations: number[];
  public printings: string[];
  public originalText: string;
  public originalType: string;
  public id: string;
}
