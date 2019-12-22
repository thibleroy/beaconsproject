import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {BeaconScannerService} from '../../../services/beacon-scanner.service';
import {Events, Platform} from '@ionic/angular';
import {ToastService} from '../../../services/toast.service';
import {wording} from '../../../models/wording';
import {Beacon} from '@ionic-native/ibeacon/ngx';


@Component({
    selector: 'app-detect',
    templateUrl: './detect.page.html',
    styleUrls: ['./detect.page.scss'],
})
export class DetectPage implements OnInit, OnDestroy {
    beacons: Beacon[];
    zone: NgZone;
    constructor(private dataService: DataService,
                public platform: Platform,
                private toast: ToastService,
                private beaconScanner: BeaconScannerService,
                private events: Events) {
    }
    ngOnInit() {
        this.beacons = [];
        if (this.platform.is('cordova')) {
            this.zone = new NgZone({ enableLongStackTrace: false });
            this.beaconScanner.initialise().then(() => {
                this.events.subscribe('didRangeBeaconsInRegion', (data) => {
                    this.zone.run(() => {
                        this.beacons = [];
                        data.beacons.forEach((beacon) => {
                            this.beacons.push(beacon);
                        });
                    });
                });
            });
        } else {
            this.toast.presentToast(wording.beacon.onlyApp);
        }
    }
    ngOnDestroy() {
        if (this.platform.is('cordova')) {
            this.beaconScanner.stopRanging();
        }
    }
}
