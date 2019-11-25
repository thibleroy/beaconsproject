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
