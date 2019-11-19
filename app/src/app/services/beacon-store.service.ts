import { Injectable } from '@angular/core';
import {Beacon} from "@ionic-native/ibeacon";

@Injectable({
  providedIn: 'root'
})
export class BeaconStoreService {

  beaconsInRegion: Beacon[];
  beaconsForRegion: Beacon[];
  beaconsEnterRegion: Beacon[];
  constructor() {
  }
}
