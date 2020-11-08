import { countryByContinent } from '../constants/country-by-continent.constant';
import { Country } from './country.model';

export enum WorldMapOperationType {
  Importation = 'Import',
  Exportation = 'Export',
}

export class WorldMapOperation {
  countryId: string;
  operationType?: WorldMapOperationType;
  note?: string;

  country: Country;

  constructor(
    countryId: string,
    operationType?: WorldMapOperationType,
    note?: string,
    country?: Country
  ) {
    this.countryId = countryId;
    this.operationType = operationType;
    this.note = note;
    this.country = country;
  }
}
