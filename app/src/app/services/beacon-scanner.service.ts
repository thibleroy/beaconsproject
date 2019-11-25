import { Injectable } from '@angular/core';
import {IBeacon} from '@ionic-native/ibeacon/ngx';
import  {BeaconStoreService} from "./beacon-store.service";
import {Toast} from "@ionic-native/toast/ngx";

@Injectable({
  providedIn: 'root'
})
export class BeaconScannerService {

  constructor(private ibeacon: IBeacon, private beaconStore: BeaconStoreService, private toast: Toast) {


  }
   startExploring (){

      // Request permission to use location on iOS
      this.ibeacon.requestAlwaysAuthorization();
// create a new delegate and register it with the native layer
      let delegate = this.ibeacon.Delegate();

// Subscribe to some of the delegate's event handlers
      delegate.didRangeBeaconsInRegion()
          .subscribe(
              data => {
                  this.toast.show('detected', '5', '');
                  console.log('didRangeBeaconsInRegion: ', data);
                  this.beaconStore.beaconsInRegion = data.beacons;
              },

              error => console.error()
          );
      delegate.didStartMonitoringForRegion()
          .subscribe(
              data => {
                  this.toast.show('detected', '5', '');
                  console.log('didStartMonitoringForRegion: ', data);
                  this.beaconStore.beaconsForRegion = data.beacons;
              },
              error => console.error()
          );
      delegate.didEnterRegion()
          .subscribe(
              data => {
                  this.toast.show('detected', '5', '');
                  console.log('didEnterRegion: ', data);
                  this.beaconStore.beaconsEnterRegion = data.beacons;
              }
          );
    }
}
