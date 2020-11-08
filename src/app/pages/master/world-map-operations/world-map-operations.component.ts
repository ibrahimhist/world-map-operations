import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { countriesGeo } from '../../../shared/constants/countries.geo';
import 'leaflet-contextmenu';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-world-map-operations',
  templateUrl: './world-map-operations.component.html',
  styleUrls: ['./world-map-operations.component.scss'],
})
export class WorldMapOperationsComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 1,
    center: latLng(46.879966, -121.726909),
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [
      {
        text: 'İhracat Yap',
        callback: () => {},
      },
      {
        text: 'İthalat Yap',
        callback: () => {},
      },
      '-',
      {
        text: 'Not Ekle',
        callback: () => {},
      },
      {
        text: 'Bilgileri Sil',
        callback: () => {},
      },
    ],
  };

  constructor(private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {}

  showOperationsDialog(): void {
    console.log('showOperationsDialog');
  }

  onMapReady(map: L.Map): void {
    console.log('onMapReady', map);

    function style(feature): any {
      return {
        weight: 2,
        opacity: 1,
        color: 'lightgrey',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: 'transparent',
      };
    }

    const onEachFeature = (feature, layer: L.Layer) => {
      layer.on({
        mouseover: (e: L.LeafletMouseEvent) => {
          const target: any = e.target;

          target.setStyle({
            weight: 5,
            color: '#FFEB3B',
            dashArray: '',
            fillOpacity: 0.5,
            fillColor: '#FFEB3B',
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            target.bringToFront();
          }
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          geojson.resetStyle(e.target);
        },
        contextmenu: (e) => {
          console.log(e);
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
