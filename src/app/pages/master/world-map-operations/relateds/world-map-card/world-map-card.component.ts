import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import L, { tileLayer, latLng } from 'leaflet';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AddNoteDialogComponent } from 'src/app/shared/components/add-note-dialog/add-note-dialog.component';
import { countriesGeo } from 'src/app/shared/constants/countries.geo';
import { Country } from 'src/app/shared/models/country.model';
import {
  WorldMapOperation,
  WorldMapOperationType,
} from 'src/app/shared/models/world-map-operation.model';
import { WorldMapOperationsService } from 'src/app/shared/services/world-map-operations.service';

@Component({
  selector: 'app-world-map-card',
  templateUrl: './world-map-card.component.html',
  styleUrls: ['./world-map-card.component.scss'],
})
export class WorldMapCardComponent implements OnDestroy {
  worldMapOperationsSubs: Subscription;

  map: L.Map;
  geoJson: L.GeoJSON<any>;

  options: any;

  selectedContextMenuCountry: Country;
  selectedCountryTarget: any;

  redHex = '#f44336';
  greenHex = '#4CAF50';

  isInsideOperation: boolean;

  constructor(
    private worldMapOperationsService: WorldMapOperationsService,
    private ngZone: NgZone
  ) {
    this.worldMapOperationsSubs = this.worldMapOperationsService
      .getWorldMapOperationsAsObservable()
      .subscribe((_: WorldMapOperation[]) => {
        if (this.map) {
          if (!this.isInsideOperation) {
            this.geoJson.resetStyle();
          } else {
            this.isInsideOperation = false;
          }
        }
      });

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 12,
          attribution: 'World Map Operations',
          noWrap: true,
        }),
      ],
      zoom: 1,
      center: latLng(46.879966, -121.726909),
      contextmenu: true,
      contextmenuWidth: 140,
      contextmenuItems: [
        {
          text: 'Export',
          callback: () => {
            this.ngZone.run(() => {
              this.isInsideOperation = true;

              this.worldMapOperationsService.makeOperation(
                this.selectedContextMenuCountry.id,
                WorldMapOperationType.Exportation
              );

              this.changeColorOfTarget(
                this.greenHex,
                this.selectedCountryTarget
              );
            });
          },
        },
        {
          text: 'Import',
          callback: () => {
            this.ngZone.run(() => {
              this.isInsideOperation = true;

              this.worldMapOperationsService.makeOperation(
                this.selectedContextMenuCountry.id,
                WorldMapOperationType.Importation
              );
              this.changeColorOfTarget(this.redHex, this.selectedCountryTarget);
            });
          },
        },
        '-',
        {
          text: 'Add Note',
          callback: () => {
            this.ngZone.run(() => {
              this.worldMapOperationsService.showAddNoteDialog(
                this.selectedContextMenuCountry
              );
            });
          },
        },
        '-',
        {
          text: 'Clear',
          callback: () => {
            this.ngZone.run(() => {
              this.isInsideOperation = true;

              this.worldMapOperationsService.clearEverything(
                this.selectedContextMenuCountry.id
              );
              this.changeColorOfTarget(null, this.selectedCountryTarget);
            });
          },
        },
      ],
    };
  }

  changeColorOfTarget(colorHex: string, target: any): void {
    if (target) {
      target.setStyle(this.getDefaultMapStyle(colorHex));
    }
  }

  getDefaultMapStyle(colorHex?: string): any {
    return {
      weight: 3,
      opacity: 1,
      color: colorHex || 'lightgrey',
      dashArray: '3',
      fillOpacity: 0.5,
      fillColor: colorHex || 'transparent',
    };
  }

  checkCountryOperaionExistThenGetStyle(countryId: string): any {
    const found = this.worldMapOperationsService.getWorldMapOperation(
      countryId
    );
    let colorHex: string;

    if (found && found.operationType) {
      colorHex =
        found.operationType === WorldMapOperationType.Exportation
          ? this.greenHex
          : this.redHex;
    }

    return this.getDefaultMapStyle(colorHex);
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.geoJson = this.createMapBounds(this.map);
  }

  createMapBounds(map: L.Map): L.GeoJSON<any> {
    const geoJson = this.getGeoJson().addTo(map);
    map.fitBounds(geoJson.getBounds());
    return geoJson;
  }

  getGeoJson(): L.GeoJSON {
    const style = (feature) => {
      return this.checkCountryOperaionExistThenGetStyle(feature.id);
    };

    const onEachFeature = (feature, layer: L.Layer) => {
      layer.on({
        mouseover: (e: L.LeafletMouseEvent) => {
          const target: any = e.target;
          const isExist = this.worldMapOperationsService.isExistInWorldMapOperations(
            e.target.feature.id
          );

          if (!isExist) {
            this.changeColorOfTarget('#FFEB3B', target);
          }

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            target.bringToFront();
          }

          if (isExist) {
            const note = this.worldMapOperationsService.getNote(
              e.target.feature.id
            );
            if (note) {
              layer.bindPopup('Note: ' + note);
              layer.openPopup(e.latlng);
            }
          }
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          const isExist = this.worldMapOperationsService.isExistInWorldMapOperations(
            e.target.feature.id
          );
          if (!isExist) {
            geojson.resetStyle(e.target);
          }

          layer.closePopup();
        },
        contextmenu: (e) => {
          this.selectedContextMenuCountry = new Country(
            e.target.feature.id,
            e.target.feature.properties.name
          );
          this.selectedCountryTarget = e.target;
        },
      });
    };

    const geojson = L.geoJSON(countriesGeo as any, {
      style,
      onEachFeature,
    });

    return geojson;
  }

  ngOnDestroy(): void {
    if (this.worldMapOperationsSubs) {
      this.worldMapOperationsSubs.unsubscribe();
    }
  }
}
