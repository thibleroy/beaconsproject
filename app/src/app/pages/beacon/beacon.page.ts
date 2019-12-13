import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../../services/http-service.service";
import {DataService} from "../../../services/data.service";
import {addBeaconResponse, BeaconResponse} from "../../../models/responses";
import {Router} from "@angular/router";
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import {BeaconAddModaleComponent} from '../../components/beacon-add-modale/beacon-add-modale.component';
import {wording} from "../../../models/wording";
@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.page.html',
  styleUrls: ['./beacon.page.scss'],
})
export class BeaconPage implements OnInit {

  constructor(private httpService: HttpServiceService,
              private dataService: DataService,
              private router: Router,
              public modal: ModalController,
              public alert: AlertController,
              public toast: ToastController
              ) { }

  ngOnInit() {
    this.dataService.loading = true;
    this.httpService.getBeacon(this.router.url.split('/beacon/')[1]).subscribe((res: BeaconResponse) => {
      this.dataService.currentBeacon = res.beacon;
      this.dataService.loading = false;
    })
  }
  async presentAddModal() {
    const modal = await this.modal.create({
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
  async presentToast(val: string) {

    const toast = await this.toast.create({
      message: val,
      duration: 3000
    });
    toast.present();
  }
  async deleteBeacon() {
    const currendId = this.router.url.split('/beacon/')[1]
      const alert = await this.alert.create({
        header: 'Confirmation',
        message: wording.beacon.deleteAskConfirm,
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary'
          }, {
            text: 'Supprimer',
            handler: () => {
              this.httpService.deleteBeacon(currendId).subscribe((res: addBeaconResponse) => {
                if (res.status) {
                  this.presentToast(wording.beacon.deleteAck);
                  this.dataService.beacons =  this.dataService.beacons.filter(function( obj ) {
                    return (obj.id !== currendId);
                  });
                  this.dataService.currentBeacon = null;
                  this.router.navigateByUrl('/beacons');
                } else {
                  this.presentToast(res.reason);
                }
              })
            }
          }
        ]
      });
      await alert.present();
  }

}
