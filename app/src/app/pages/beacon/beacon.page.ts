import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import {DataService} from '../../../services/data.service';
import {AddBeaconResponse} from '../../../models/responses';
import {Router} from '@angular/router';
import { ModalController, AlertController} from '@ionic/angular';
import {BeaconAddModaleComponent} from '../../components/beacon-add-modale/beacon-add-modale.component';
import {wording} from '../../../models/wording';
import {ToastService} from '../../../services/toast.service';
import {IBeacon} from '../../../../../back/lib';
@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.page.html',
  styleUrls: ['./beacon.page.scss'],
})
export class BeaconPage implements OnInit {
  beacon: IBeacon;
  constructor(private httpService: HttpServiceService,
              private dataService: DataService,
              private router: Router,
              public modal: ModalController,
              public alert: AlertController,
              private toastController: ToastService
              ) {
  }
  ngOnInit() {
    this.dataService.currentBeaconSubject.subscribe((b: IBeacon) => {
      this.beacon = b;
    });
    this.httpService.getBeacon(localStorage.getItem('clientId'), this.router.url.split('/beacon/')[1]).subscribe((b) => {
      this.dataService.currentBeaconSubject.next(b);
    });
  }
  async presentAddModal() {
    const modal = await this.modal.create({
      component: BeaconAddModaleComponent,
      componentProps: {
        uuid: this.dataService.currentBeaconSubject.getValue().uuid,
        name: this.dataService.currentBeaconSubject.getValue().name,
        major: this.dataService.currentBeaconSubject.getValue().major,
        minor: this.dataService.currentBeaconSubject.getValue().minor,
        action: 'Modifier'
      }
    });
    return await modal.present();
  }
  async deleteBeacon() {
    const currendId = this.router.url.split('/beacon/')[1];
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
              this.httpService.deleteBeacon(localStorage.getItem('clientId'), currendId).subscribe(async (res: AddBeaconResponse) => {
                if (res.status) {
                  this.toastController.presentToast(wording.beacon.deleteAck);
                  this.dataService.loadedBeaconsSubject.next(this.dataService.loadedBeaconsSubject.getValue().filter(( obj ) => {
                    return (obj.id_beacon !== currendId);
                  }));
                  this.dataService.currentBeaconSubject.next(null);
                  await this.router.navigateByUrl('/beacons');
                } else {
                  this.toastController.presentToast(res.reason);
                }
              });
            }
          }
        ]
      });
    await alert.present();
  }

}
