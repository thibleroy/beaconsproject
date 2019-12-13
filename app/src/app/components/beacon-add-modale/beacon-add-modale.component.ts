import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../../services/http-service.service";
import {addBeaconResponse} from "../../../models/responses";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {DataService} from "../../../services/data.service";

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
    if (this.action === 'Ajouter') {
      this.addBeacon()
    } else this.updateBeacon()

  }

  addBeacon() {
    this.httpService.addBeacon({
      uuid: this.uuid,
      major: this.major,
      minor: this.minor,
      name: this.name
    }).subscribe((res: addBeaconResponse) => {
      if (res.status) {
        this.modalController.dismiss();
        this.router.navigateByUrl('/beacon/' + res.id);
        this.presentToast(`Le beacon ${this.name} a bien été ajouté`);
      } else {
        this.presentToast(res.reason);
      }
    });
  }
  updateBeacon() {
    const cb = {
      id: this.router.url.split('/beacon/')[1],
      uuid: this.uuid,
      major: this.major,
      minor: this.minor,
      name: this.name
    }
    this.httpService.updateBeacon(cb).subscribe((res: addBeaconResponse) => {
      if (res.status) {
        this.modalController.dismiss();
        this.dataService.currentBeacon = cb;
        this.presentToast(`Le beacon a bien été modifié`);
      } else {
        this.presentToast(res.reason);
      }
    });
  }
  ngOnInit() {
  }

}
