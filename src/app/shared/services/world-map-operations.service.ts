import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddNoteDialogComponent } from '../components/add-note-dialog/add-note-dialog.component';
import { OperationDialogComponent } from '../components/operation-dialog/operation-dialog.component';
import { countriesGeo } from '../constants/countries.geo';
import { Country } from '../models/country.model';
import {
  WorldMapOperation,
  WorldMapOperationType,
} from '../models/world-map-operation.model';

@Injectable({
  providedIn: 'root',
})
export class WorldMapOperationsService {
  private worldMapOperations: WorldMapOperation[];
  private worldMapOperationsSubject: BehaviorSubject<
    WorldMapOperation[]
  > = new BehaviorSubject<WorldMapOperation[]>([]);

  private countries: Country[];

  private addNoteRef: DynamicDialogRef;
  private operationRef: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.worldMapOperations = [];
    this.countries = countriesGeo.features.map((x) => {
      return new Country(x.id, x.properties.name);
    });
  }

  getCountries(): Country[] {
    return [...this.countries];
  }

  getWorldMapOperations(): WorldMapOperation[] {
    return [...this.worldMapOperations];
  }

  getWorldMapOperationsAsObservable(): Observable<WorldMapOperation[]> {
    return this.worldMapOperationsSubject.asObservable();
  }

  private updateWorldMapOperationsSubject(): void {
    this.worldMapOperationsSubject.next(this.getWorldMapOperations());
  }

  isExistInWorldMapOperations(countryId: string): boolean {
    return (
      this.worldMapOperations.findIndex((x) => x.countryId === countryId) !== -1
    );
  }

  getNote(countryId: string): string | null {
    const foundOperation = this.getWorldMapOperation(countryId);
    return foundOperation ? foundOperation.note : null;
  }

  makeOperation(countryId: string, operationType: WorldMapOperationType): void {
    const operation = this.getOrCreateWorldMapOperation(countryId);
    operation.operationType = operationType;
    this.updateWorldMapOperationsSubject();
  }

  addNote(countryId: string, note: string): void {
    const operation = this.getOrCreateWorldMapOperation(countryId);
    operation.note = note;
    this.updateWorldMapOperationsSubject();
  }

  clearEverything(countryId: string): void {
    const foundIndex = this.worldMapOperations.findIndex(
      (x) => x.countryId === countryId
    );
    if (foundIndex !== -1) {
      this.worldMapOperations.splice(foundIndex, 1);
      this.updateWorldMapOperationsSubject();
    }
  }

  getWorldMapOperation(countryId: string): WorldMapOperation {
    return this.worldMapOperations.find((x) => x.countryId === countryId);
  }

  private getOrCreateWorldMapOperation(countryId: string): WorldMapOperation {
    const foundOperation = this.getWorldMapOperation(countryId);

    if (!foundOperation) {
      const newWorldMapOperations = new WorldMapOperation(
        countryId,
        null,
        null,
        { ...this.countries.find((x) => x.id === countryId) }
      );
      this.worldMapOperations.push(newWorldMapOperations);
      return newWorldMapOperations;
    } else {
      return foundOperation;
    }
  }

  showAddNoteDialog(country: Country): void {
    if (this.addNoteRef) {
      this.addNoteRef.close();
    }

    this.addNoteRef = this.dialogService.open(AddNoteDialogComponent, {
      header: 'Add Note To ' + country.name,
      contentStyle: {
        'max-height': '500px',
        overflow: 'auto',
        maxWidth: '90vw',
      },
      baseZIndex: 10000,
    });

    this.addNoteRef.onClose.subscribe((data: any) => {
      if (data) {
        this.addNote(country.id, data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfuly added note.',
        });
      }
    });
  }

  showOperationDialog(country: Country): void {
    if (this.operationRef) {
      this.operationRef.close();
    }

    this.operationRef = this.dialogService.open(OperationDialogComponent, {
      header: country.name,
      data: country,
      contentStyle: {
        'max-height': '500px',
        overflow: 'auto',
        maxWidth: '90vw',
      },
      baseZIndex: 10000,
    });
  }

  deepClear(): void {
    this.worldMapOperations = [];
    this.worldMapOperationsSubject.next([]);
  }
}
