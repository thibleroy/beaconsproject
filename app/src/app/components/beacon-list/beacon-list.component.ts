import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import {DataService} from '../../../services/data.service';
import {IBeacon} from '../../../../../back/lib';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-beacon-list',
    templateUrl: './beacon-list.component.html',
    styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit, OnDestroy {
    beacons: IBeacon[];
    sub: Subscription;
    constructor(private httpService: HttpServiceService,
                private dataService: DataService,
    ) {
    }
    ngOnInit() {
        this.sub = this.dataService.loadedBeaconsSubject.subscribe((b: IBeacon[]) => {
            this.beacons = b;
        });
        this.httpService.getBeacons(localStorage.getItem('clientId')).subscribe((resp) => {
            this.dataService.loadedBeaconsSubject.next(resp.beacons);
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
