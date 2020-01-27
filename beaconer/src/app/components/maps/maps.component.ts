import { Component, OnInit, Input } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import { ActionSheetController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  @Input() name:string;
  @Input() lat:number;
  @Input() lng:string;

  map: GoogleMap;

  constructor(
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      this.loadMap();
    }
  }

  ngOnInit() {}

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyCgREZH60qLyJJzL99JBKeZ2u3ZpVNeUEU',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyCgREZH60qLyJJzL99JBKeZ2u3ZpVNeUEU'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 12,
        tilt: 30
      }
    });
  }

}
