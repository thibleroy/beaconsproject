import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {IBeacon, IBeaconDelegate, IBeaconPluginResult, BeaconRegion} from '@ionic-native/ibeacon/ngx';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  region: BeaconRegion;
  delegate: IBeaconDelegate;

  private myObservable = new Subject<IBeaconPluginResult>();
  currentBeacons = this.myObservable.asObservable()

  constructor(
      public platform: Platform,
      private iBeacon: IBeacon,
  ) { 
    if (this.platform.is('cordova')) {
      this.iBeacon.requestAlwaysAuthorization();
      this.delegate = this.iBeacon.Delegate();
    }
  }

initialise(uuid:string): Promise<boolean> {
    return new Promise((resolve => {
      if (this.platform.is('cordova') && uuid) {
          /* Request permission to use location on iOS */
          this.iBeacon.requestAlwaysAuthorization();

          /* create a new delegate and register it with the native layer */
          this.delegate = this.iBeacon.Delegate();

          /* Subscribe to some of the delegate's event handlers */
          this.delegate.didRangeBeaconsInRegion().subscribe(data => {
                  this.myObservable.next(data)
              }
          );
          this.iBeacon.startRangingBeaconsInRegion(
              this.iBeacon.BeaconRegion('activiot', uuid))
              .then(() => {
              resolve(true);
          });
      }
    }));
}

stopRanging(): Promise<void> {
  return this.iBeacon.stopRangingBeaconsInRegion(this.iBeacon.BeaconRegion('thib', '12345678-9101-1121-3141-516171819203'));
}

}
