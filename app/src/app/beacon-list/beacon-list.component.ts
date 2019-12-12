import { Component, OnInit } from '@angular/core';
import {BeaconScannerService} from "../../services/beacon-scanner.service";
import {HttpServiceService} from "../../services/http-service.service";
import {Beacon} from '../../../../back/src/entities/interfaces';
import {DataService} from "../../services/data.service";
import {BeaconResponse, BeaconsResponse} from "../../models/responses";
@Component({
  selector: 'app-beacon-list',
  templateUrl: './beacon-list.component.html',
  styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit {

      constructor(private beaconScanner: BeaconScannerService, private httpService: HttpServiceService, private dataService: DataService) {
        
      }

      getBeacons(){
          this.httpService.getBeacons().subscribe((res: BeaconsResponse) => {
              res.beacons.forEach((beacon: Beacon) => {
                  this.httpService.getBeacon(beacon.id).subscribe((resb: BeaconResponse) => {
                      console.log(resb)
                      this.dataService.beacons.push(resb.beacon);
                  })
              })
          });
      }

      ngOnInit() {
    this.getBeacons();
      }

}
