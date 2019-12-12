import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Beacon} from '../../../back/src/entities/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  loading: boolean;
  beacons: Beacon[];
  currentBeacon: Beacon;
  oBeacons: Observable<Beacon[]>;
  constructor() {
    this.currentBeacon = null;
    this.beacons = [];
    this.oBeacons = new Observable<Beacon[]>();
    this.loading = true;
  }
}

