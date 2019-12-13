import { Component, OnInit } from '@angular/core';
import {BeaconScannerService} from "../../../services/beacon-scanner.service";
import {HttpServiceService} from "../../../services/http-service.service";
import {DataService} from "../../../services/data.service";
import {BeaconsResponse} from "../../../models/responses";

@Component({
  selector: 'app-beacon-list',
  templateUrl: './beacon-list.component.html',
  styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit {

      constructor(private beaconScanner: BeaconScannerService,
                  private httpService: HttpServiceService,
                  private dataService: DataService,
                  ) {
        
      }

      getBeacons(){
          this.httpService.getBeacons().subscribe((res: BeaconsResponse) => {
              this.dataService.beacons = res.beacons;
          });
      }

      ngOnInit() {
    this.getBeacons();
      }

}
