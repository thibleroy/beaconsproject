import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../../services/http-service.service";
import {DataService} from "../../../services/data.service";
import {BeaconResponse} from "../../../models/responses";
import {Router} from "@angular/router";

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.page.html',
  styleUrls: ['./beacon.page.scss'],
})
export class BeaconPage implements OnInit {

  constructor(private httpService: HttpServiceService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.dataService.loading = true;
    this.httpService.getBeacon(this.router.url.split('/beacon/')[1]).subscribe((res: BeaconResponse) => {
      this.dataService.currentBeacon = res.beacon;
      this.dataService.loading = false;
    })
  }

}
