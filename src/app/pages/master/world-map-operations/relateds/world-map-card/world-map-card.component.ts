import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import L, { tileLayer, latLng } from 'leaflet';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddNoteDialogComponent } from 'src/app/shared/components/add-note-dialog/add-note-dialog.component';
import { countriesGeo } from 'src/app/shared/constants/countries.geo';
import { Country } from 'src/app/shared/models/country.model';
import { WorldMapOperationType } from 'src/app/shared/models/world-map-operation.model';
import { WorldMapOperationsService } from 'src/app/shared/services/world-map-operations.service';

@Component({
  selector: 'app-world-map-card',
  templateUrl: './world-map-card.component.html',
  styleUrls: ['./world-map-card.component.scss'],
})
export class WorldMapCardComponent {
  options: any;

  selectedContextMenuCountry: Country;
  selectedCountryTarget: any;

  constructor(
    private worldMapOperationsService: WorldMapOperationsService,
    private ngZone: NgZone
  ) {
    // to-do: hali hazırda yapılmışları tekrar çizmek lazım

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'World Map Operations',
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
              this.worldMapOperationsService.makeOperation(
                this.selectedContextMenuCountry.id,
                WorldMapOperationType.Exportation
              );

              this.changeColorOfTarget('#4CAF50', this.selectedCountryTarget);
            });
          },
        },
        {
          text: 'Import',
          callback: () => {
            this.ngZone.run(() => {
              this.worldMapOperationsService.makeOperation(
                this.selectedContextMenuCountry.id,
                WorldMapOperationType.Importation
              );
              this.changeColorOfTarget('#f44336', this.selectedCountryTarget);
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
              this.worldMapOperationsService.clearEverything(
                this.selectedContextMenuCountry.id
              );
              this.changeColorOfTarget(null, this.selectedCountryTarget, true);
            });
          },
        },
      ],
    };
  }

  changeColorOfTarget(
    colorHex: string,
    target: any,
    setToDefault?: boolean
  ): void {
    if (target) {
      const style = setToDefault
        ? this.getDefaultMapStyle()
        : {
            weight: 5,
            color: colorHex,
            dashArray: '',
            fillOpacity: 0.5,
            fillColor: colorHex,
          };

      target.setStyle(style);
    }
  }

  getDefaultMapStyle(): any {
    return {
      weight: 2,
      opacity: 1,
      color: 'lightgrey',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: 'transparent',
    };
  }

  onMapReady(map: L.Map): void {
    const style = (feature) => {
      return this.getDefaultMapStyle();
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
    }).addTo(map);

    map.fitBounds(geojson.getBounds());
  }
}
