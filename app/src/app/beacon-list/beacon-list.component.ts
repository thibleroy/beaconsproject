import { Component, OnInit } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { IBeacon } from "@ionic-native/ibeacon/ngx";

@Component({
  selector: 'app-beacon-list',
  templateUrl: './beacon-list.component.html',
  styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit {

  delegate: any;
      region: any;
      constructor(
        public platform: Platform,
        public events: Events,
        private iBeacon: IBeacon
      ) {
         this.initialise(); 
      }

  ngOnInit() {
    //this.startExploring()
  }

  startExploring (){
  
    // Request permission to use location on iOS
this.iBeacon.requestAlwaysAuthorization();
// create a new delegate and register it with the native layer
let delegate = this.iBeacon.Delegate();

// Subscribe to some of the delegate's event handlers
delegate.didRangeBeaconsInRegion()
.subscribe(
data => console.log('didRangeBeaconsInRegion: ', data),
error => console.error()
);
delegate.didStartMonitoringForRegion()
.subscribe(
data => console.log('didStartMonitoringForRegion: ', data),
error => console.error()
);
delegate.didEnterRegion()
.subscribe(
data => {
  console.log('didEnterRegion: ', data);
}
);

let beaconRegion = this.iBeacon.BeaconRegion('deskBeacon','F7826DA6-ASDF-ASDF-8024-BC5B71E0893E');

this.iBeacon.startMonitoringForRegion(beaconRegion)
.then(
() => console.log('Native layer received the request to monitoring'),
error => console.error('Native layer failed to begin monitoring: ', error)
);
  }

  initialise(): any {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        this.iBeacon.requestAlwaysAuthorization(); 
       // ALSO try this one too this.iBeacon.requestWhenInUseAuthorization();
        this.delegate = this.iBeacon.Delegate();
        this.delegate.didRangeBeaconsInRegion().subscribe(
          data => {
            this.events.publish("didRangeBeaconsInRegion", data);
           //console.log("didRangebeacons__" + JSON.stringify(data)); // empty beacons array
          },
          error => console.error()
        );
        this.region = this.iBeacon.BeaconRegion("thib", "12345678-9101-1121-3141-516171819203");
        this.iBeacon
          .startRangingBeaconsInRegion(this.region)
          .then(
            () => {
              resolve(true);
            },
            error => {
              console.error("Failed to begin monitoring: ", error);
              resolve(false);
            }
          );
      } else {
        resolve(false);
      }
    });

    return promise;
  }

}
