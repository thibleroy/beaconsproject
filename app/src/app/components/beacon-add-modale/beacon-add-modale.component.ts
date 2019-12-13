import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../../services/http-service.service";
import {addBeaconResponse} from "../../../models/responses";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {DataService} from "../../../services/data.service";
import {wording} from "../../../models/wording";
import {Beacon} from "../../../../../back/src/entities/interfaces";

@Component({
  selector: 'app-beacon-add-modale',
  templateUrl: './beacon-add-modale.component.html',
  styleUrls: ['./beacon-add-modale.component.scss'],
})
export class BeaconAddModaleComponent implements OnInit {
  uuid: string;
  major: number;
  minor: number;
  name: string;
  action: string;
  constructor(private httpService: HttpServiceService,
              public toast: ToastController,
              private router: Router,
              private modalController: ModalController,
              private dataService: DataService) {
  }

  async presentToast(val: string) {

      const toast = await this.toast.create({
        message: val,
        duration: 3000
      });
      toast.present();
    }


  addOrUpdateBeacon() {
    const cb = {
      id: this.router.url.split('/beacon/')[1],
      uuid: this.uuid,
      major: this.major,
      minor: this.minor,
      name: this.name
    };
    if (this.action === 'Ajouter') {
      this.addBeacon(cb)
    } else this.updateBeacon(cb)

  }

  addBeacon(beacon: Beacon) {
    this.httpService.addBeacon({
      uuid: this.uuid,
      major: this.major,
      minor: this.minor,
      name: this.name
    }).subscribe((res: addBeaconResponse) => {
      if (res.status) {
        this.dataService.beacons.push(beacon);
        this.modalController.dismiss();
        this.router.navigateByUrl('/beacon/' + res.id);
        this.presentToast(wording.beacon.addAck);
      } else {
        this.presentToast(res.reason);
      }
    });
  }
  updateBeacon(beacon: Beacon) {

    this.httpService.updateBeacon(beacon).subscribe((res: addBeaconResponse) => {
      if (res.status) {
        this.modalController.dismiss();
        this.dataService.currentBeacon = beacon;
        this.presentToast(wording.beacon.editAck);
      } else {
        this.presentToast(res.reason);
      }
    });
  }
  ngOnInit() {
  }

}
