import { Injectable } from '@angular/core';
import {Beacon as b} from '../../../back/src/entities/interfaces';
import {Beacon} from '@ionic-native/ibeacon/ngx';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadedBeaconsSubject: BehaviorSubject<b[]>;
  detectedBeaconsSubject: BehaviorSubject<Beacon[]>;
  currentBeaconSubject: BehaviorSubject<b>;
  constructor() {
    this.loadedBeaconsSubject = new BehaviorSubject<b[]>([]);
    this.detectedBeaconsSubject = new BehaviorSubject<Beacon[]>([]);
    this.currentBeaconSubject = new BehaviorSubject<b>({});
  }
}

