import { Component, OnInit } from '@angular/core';
import {BeaconScannerService} from "../../services/beacon-scanner.service";
import {HttpServiceService} from "../../services/http-service.service";
import {DataService} from "../../services/data.service";
import {BeaconsResponse} from "../../models/responses";
import {Router} from "@angular/router";

@Component({
  selector: 'app-beacon-list',
  templateUrl: './beacon-list.component.html',
  styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit {

      constructor(private beaconScanner: BeaconScannerService,
                  private httpService: HttpServiceService,
                  private dataService: DataService,
                  private router: Router
                  ) {
        
      }

      getBeacons(){
          this.httpService.getBeacons().subscribe((res: BeaconsResponse) => {
              this.dataService.beacons = res.beacons;
          });
      }

      setCurrentBeacon(id: string, name: string) {
this.dataService.currentBeacon = {id: id, name: name}
      }

      ngOnInit() {
    this.getBeacons();
      }

}
