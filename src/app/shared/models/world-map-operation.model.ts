export enum WorldMapOperationType {
  Importation = 1,
  Exportation = 2,
}

export class WorldMapOperation {
  countryId: string;
  operationType?: WorldMapOperationType;
  note?: string;

  constructor(
    countryId: string,
    operationType?: WorldMapOperationType,
    note?: string
  ) {
    this.countryId = countryId;
    this.operationType = operationType;
    this.note = note;
  }
}
