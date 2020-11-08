import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { countriesGeo } from '../../../shared/constants/countries.geo';
import 'leaflet-contextmenu';
import { WorldMapOperationsService } from 'src/app/shared/services/world-map-operations.service';
import { Country } from 'src/app/shared/models/country.model';
import { WorldMapOperationType } from 'src/app/shared/models/world-map-operation.model';

@Component({
  selector: 'app-world-map-operations',
  templateUrl: './world-map-operations.component.html',
  styleUrls: ['./world-map-operations.component.scss'],
})
export class WorldMapOperationsComponent {
  constructor() {}
}
