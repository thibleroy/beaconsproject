import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {DataService} from "../../services/data.service";
import {BeaconResponse} from "../../models/responses";

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.page.html',
  styleUrls: ['./beacon.page.scss'],
})
export class BeaconPage implements OnInit {

  constructor(private httpService: HttpServiceService,
              private dataService: DataService) { }

  ngOnInit() {
    this.httpService.getBeacon(this.dataService.currentBeacon.id).subscribe((res: BeaconResponse) => {

      this.dataService.currentBeacon = res.beacon;

    })
  }

}
