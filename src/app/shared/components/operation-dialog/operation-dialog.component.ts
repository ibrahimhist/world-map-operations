import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Country } from '../../models/country.model';
import { WorldMapOperationType } from '../../models/world-map-operation.model';
import { WorldMapOperationsService } from '../../services/world-map-operations.service';

@Component({
  selector: 'app-operation-dialog',
  templateUrl: './operation-dialog.component.html',
  styleUrls: ['./operation-dialog.component.scss'],
})
export class OperationDialogComponent implements OnInit {
  country: Country;

  constructor(
    public ref: DynamicDialogRef,
    private worldMapOperationsService: WorldMapOperationsService,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.country = this.config.data;
  }

  onClickClose(): void {
    this.ref.close();
  }

  onClickExport(): void {
    this.worldMapOperationsService.makeOperation(
      this.country.id,
      WorldMapOperationType.Exportation
    );

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfuly marked as export.',
    });
  }

  onClickImport(): void {
    this.worldMapOperationsService.makeOperation(
      this.country.id,
      WorldMapOperationType.Importation
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfuly marked as import.',
    });
  }

  onClickAddNote(): void {
    this.worldMapOperationsService.showAddNoteDialog(this.country);
  }

  onClickClear(): void {
    this.worldMapOperationsService.clearEverything(this.country.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfuly cleared.',
    });
  }
}
