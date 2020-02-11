import { Injectable } from '@angular/core';
import {IBeacon as b, IUser} from '../../../back/lib';
import {Beacon} from '@ionic-native/ibeacon/ngx';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  loadedBeaconsSubject: BehaviorSubject<b[]>;
  detectedBeaconsSubject: BehaviorSubject<Beacon[]>;
  currentBeaconSubject: BehaviorSubject<b>;
  currentUserSubject: BehaviorSubject<IUser>;
  constructor() {
    this.loadedBeaconsSubject = new BehaviorSubject<b[]>([]);
    this.detectedBeaconsSubject = new BehaviorSubject<Beacon[]>([]);
    // this.currentBeaconSubject = new BehaviorSubject<b>({});
    // this.currentUserSubject = new BehaviorSubject<IUser>({});
  }
}

