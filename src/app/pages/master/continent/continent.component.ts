import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/shared/models/country.model';
import {
  WorldMapOperation,
  WorldMapOperationType,
} from 'src/app/shared/models/world-map-operation.model';
import { WorldMapOperationsService } from 'src/app/shared/services/world-map-operations.service';

type CountryWithWorldMapOperation = Country & WorldMapOperation;

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss'],
})
export class ContinentComponent implements OnInit, OnDestroy {
  routingSubs: Subscription;
  worldMapOperationsSubs: Subscription;

  continent: string;
  worldMapOperations: WorldMapOperation[];

  countires: Country[];

  categorizedOperations: {
    exports: WorldMapOperation[];
    imports: WorldMapOperation[];
    noteOnly: WorldMapOperation[];
    others: WorldMapOperation[];
  };

  constructor(
    private route: ActivatedRoute,
    private worldMapOperationsService: WorldMapOperationsService
  ) {}

  ngOnInit(): void {
    this.routingSubs = this.route.params.subscribe((params: any) => {
      this.continent = params?.id;
      // this.continent = params?.id ? params.id.replace('-', ' ') : null;
      this.countires = this.worldMapOperationsService
        .getCountries()
        .filter(
          (x) => x.continent.toLowerCase() === this.continent.toLowerCase()
        );

      this.filterWorldMapOperationList();
    });

    this.worldMapOperationsSubs = this.worldMapOperationsService
      .getWorldMapOperationsAsObservable()
      .subscribe((worldMapOperationList: WorldMapOperation[]) => {
        this.worldMapOperations = [...worldMapOperationList] || [];
        this.filterWorldMapOperationList();
      });
  }

  filterWorldMapOperationList(): void {
    this.clearCategorizedOperations();

    if (this.continent && this.worldMapOperations) {
      // get continent related operations
      const filteredWorldMapOperations = this.worldMapOperations.filter(
        (x) =>
          x.country.continent.toLowerCase() === this.continent.toLowerCase()
      );

      // check countries if it exist in operations, not add as null
      this.countires.forEach((country) => {
        if (
          filteredWorldMapOperations.findIndex(
            (x) => x.countryId === country.id
          ) === -1
        ) {
          filteredWorldMapOperations.push(
            new WorldMapOperation(country.id, null, null, country)
          );
        }
      });

      // think: pipe ile de çözülebilir
      this.categorizedOperations.exports = filteredWorldMapOperations.filter(
        (x) => x.operationType === WorldMapOperationType.Exportation
      );
      this.categorizedOperations.imports = filteredWorldMapOperations.filter(
        (x) => x.operationType === WorldMapOperationType.Importation
      );
      this.categorizedOperations.noteOnly = filteredWorldMapOperations.filter(
        (x) => !x.operationType && x.note
      );
      this.categorizedOperations.others = filteredWorldMapOperations.filter(
        (x) => !x.operationType && !x.note
      );
    }
  }

  clearCategorizedOperations(): void {
    this.categorizedOperations = {
      exports: [],
      imports: [],
      noteOnly: [],
      others: [],
    };
  }

  ngOnDestroy(): void {
    if (this.routingSubs) {
      this.routingSubs.unsubscribe();
    }

    if (this.worldMapOperationsSubs) {
      this.worldMapOperationsSubs.unsubscribe();
    }
  }
}
