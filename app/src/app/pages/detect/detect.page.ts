import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataService} from '../../../services/data.service';
import {BeaconScannerService} from '../../../services/beacon-scanner.service';
import {Platform} from '@ionic/angular';
import {ToastService} from '../../../services/toast.service';
import {wording} from '../../../models/wording';
import {Beacon} from '@ionic-native/ibeacon';
import {BehaviorSubject} from 'rxjs';
import {BeaconRegion, IBeacon, IBeaconPluginResult} from '@ionic-native/ibeacon/ngx';

@Component({
    selector: 'app-detect',
    templateUrl: './detect.page.html',
    styleUrls: ['./detect.page.scss'],
})
export class DetectPage implements OnInit, OnDestroy {
    beacons: Beacon[];
    region: BeaconRegion;
    behavior: BehaviorSubject<Beacon[]>;

    constructor(private dataService: DataService, private beaconScanner: BeaconScannerService,
                public platform: Platform, private toast: ToastService, private iBeacon: IBeacon) {
        this.behavior = new BehaviorSubject([]);
    }

    ngOnInit() {
        this.beacons = [];
        this.behavior.subscribe((b: Beacon[]) => {
            this.beacons = b;
        });
        this.beaconScanner.setRegion().then(() => {
            this.startDetection();
        });
    }

    startDetection() {
        if (this.platform.is('cordova')) {

        } else {
            this.toast.presentToast(wording.beacon.onlyApp);
        }
    }

    ngOnDestroy() {
        this.beaconScanner.stopRanging(this.beaconScanner.region).then(() => this.behavior.unsubscribe());
    }
}
