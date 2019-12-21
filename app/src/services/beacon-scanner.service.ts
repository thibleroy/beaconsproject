import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {IBeacon, IBeaconDelegate, IBeaconPluginResult, BeaconRegion} from '@ionic-native/ibeacon/ngx';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BeaconScannerService {
    region: BeaconRegion;
    delegate: IBeaconDelegate;
    constructor(
        public platform: Platform,
        private iBeacon: IBeacon
    ) {
        if (this.platform.is('cordova')) {
            this.iBeacon.requestAlwaysAuthorization().then((regions: any) => {
                console.log('region', regions);
                this.delegate = this.iBeacon.Delegate();
            });
        }
    }
    setRegion(): Promise<void> {
        return new Promise<void>((res) => {
            this.region = this.iBeacon.BeaconRegion('thib', '12345678-9101-1121-3141-516171819203');
        });
    }
    startRanging(region: BeaconRegion): Promise<void> {
        return this.iBeacon.startRangingBeaconsInRegion(region);
    }
    stopRanging(region: BeaconRegion): Promise<void> {
        return this.iBeacon.stopRangingBeaconsInRegion(region);
    }
    getBeacons(): Observable<IBeaconPluginResult> {
        return this.delegate.didRangeBeaconsInRegion();
    }
}
