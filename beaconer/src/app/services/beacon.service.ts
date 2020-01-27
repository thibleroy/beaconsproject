import { Injectable } from '@angular/core';
import {Events, Platform} from '@ionic/angular';
import {IBeacon, IBeaconDelegate, IBeaconPluginResult, BeaconRegion} from '@ionic-native/ibeacon/ngx';
import {Observable} from 'rxjs';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class BeaconService {
  region: BeaconRegion;
  delegate: IBeaconDelegate;

  constructor(
      public platform: Platform,
      private iBeacon: IBeacon,
      public events: Events,
      public toastController: ToastController
  ) { 
    if (this.platform.is('cordova')) {
      this.iBeacon.requestAlwaysAuthorization();
      this.delegate = this.iBeacon.Delegate();
      // this.iBeacon.disableDebugLogs();
    }
  }

startRanging(): Promise<void> {
    return this.iBeacon.startRangingBeaconsInRegion(this.iBeacon.BeaconRegion('thib', '12345678-9101-1121-3141-516171819203'));
}

stopRanging(): Promise<void> {
    return this.iBeacon.stopRangingBeaconsInRegion(this.iBeacon.BeaconRegion('thib', '12345678-9101-1121-3141-516171819203'));
}

getBeacons(): Observable<IBeaconPluginResult> {
    return this.delegate.didRangeBeaconsInRegion();
}

initialise(): Promise<boolean> {
  return new Promise((resolve => {
      if (this.platform.is('cordova')) {
          /* Request permission to use location on iOS */
          this.iBeacon.requestAlwaysAuthorization();

          /* create a new delegate and register it with the native layer */
          this.delegate = this.iBeacon.Delegate();

          /* Subscribe to some of the delegate's event handlers */
          this.delegate.didRangeBeaconsInRegion().subscribe(data => {
                  this.events.publish('didRangeBeaconsInRegion', data);
              }
          );
          this.iBeacon.startRangingBeaconsInRegion(
              this.iBeacon.BeaconRegion('thib', '12345678-9101-1121-3141-516171819203'))
              .then(() => {
              resolve(true);
          });
      }
  }));
}

async presentToastWithOptions() {
  const toast = await this.toastController.create({
    header: 'Toast header',
    message: 'Click to Close',
    position: 'top',
    buttons: [
      {
        side: 'start',
        icon: 'star',
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  toast.present();
}

}
