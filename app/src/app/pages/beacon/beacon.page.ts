import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../../services/http-service.service";
import {DataService} from "../../../services/data.service";
import {BeaconResponse} from "../../../models/responses";
import {Router} from "@angular/router";
import { ModalController } from '@ionic/angular';
import {BeaconAddModaleComponent} from '../../components/beacon-add-modale/beacon-add-modale.component';
@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.page.html',
  styleUrls: ['./beacon.page.scss'],
})
export class BeaconPage implements OnInit {

  constructor(private httpService: HttpServiceService,
              private dataService: DataService,
              private router: Router,
              public modalController: ModalController
              ) { }

  ngOnInit() {
    this.dataService.loading = true;
    this.httpService.getBeacon(this.router.url.split('/beacon/')[1]).subscribe((res: BeaconResponse) => {
      this.dataService.currentBeacon = res.beacon;
      this.dataService.loading = false;
    })
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: BeaconAddModaleComponent,
      componentProps: {
        uuid: this.dataService.currentBeacon.uuid,
        name: this.dataService.currentBeacon.name,
        major: this.dataService.currentBeacon.major,
        minor: this.dataService.currentBeacon.minor,
        action: 'Modifier'
      }
    });
    return await modal.present();
  }

}
