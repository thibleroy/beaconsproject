import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import {DataService} from '../../../services/data.service';
import {Beacon} from '../../../../../back/src/entities/interfaces';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-beacon-list',
    templateUrl: './beacon-list.component.html',
    styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit, OnDestroy {
    beacons: Beacon[];
    sub: Subscription;
    constructor(private httpService: HttpServiceService,
                private dataService: DataService,
    ) {
    }
    ngOnInit() {
        this.beacons = this.dataService.loadedBeaconsSubject.getValue();
        this.sub = this.dataService.loadedBeaconsSubject.subscribe((b: Beacon[]) => {
            this.beacons = b;
        });
        this.httpService.getBeacons();
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
