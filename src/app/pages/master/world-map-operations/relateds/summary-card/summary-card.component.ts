import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  WorldMapOperation,
  WorldMapOperationType,
} from 'src/app/shared/models/world-map-operation.model';
import { WorldMapOperationsService } from 'src/app/shared/services/world-map-operations.service';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
})
export class SummaryCardComponent implements OnInit, OnDestroy {
  worldMapOperationsSubs: Subscription;

  importationCount = 0;
  exportationCount = 0;

  constructor(private worldMapOperationsService: WorldMapOperationsService) {}
  ngOnInit(): void {
    this.worldMapOperationsSubs = this.worldMapOperationsService
      .getWorldMapOperationsAsObservable()
      .subscribe((worldMapOperationList: WorldMapOperation[]) => {
        this.importationCount = worldMapOperationList.filter(
          (x) => x.operationType === WorldMapOperationType.Importation
        ).length;
        this.exportationCount = worldMapOperationList.filter(
          (x) => x.operationType === WorldMapOperationType.Exportation
        ).length;
      });
  }

  ngOnDestroy(): void {
    if (this.worldMapOperationsSubs) {
      this.worldMapOperationsSubs.unsubscribe();
    }
  }
}
