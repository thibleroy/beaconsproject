import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';
import {AddBeaconResponse} from '../../../models/responses';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';
import {wording} from '../../../models/wording';
import {IBeacon} from '../../../../../back/lib';
import {ToastService} from '../../../services/toast.service';

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
              private router: Router,
              private modalController: ModalController,
              private dataService: DataService,
              private toastService: ToastService) {
  }

  addOrUpdateBeacon() {
    if (this.action === 'Ajouter') {
      this.addBeacon();
    } else {
      this.updateBeacon({uuid: this.uuid, major: this.major,
          minor: this.minor, name: this.name, id_beacon: this.router.url.split('/beacon/')[1]});
    }
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  addBeacon() {
    /*this.httpService.addBeacon({
      uuid: this.uuid,
      major: this.major,
      minor: this.minor,
      name: this.name
    }).subscribe(async (res: AddBeaconResponse) => {
      if (res.status) {
        this.dataService.loadedBeaconsSubject.next([...this.dataService.loadedBeaconsSubject.getValue(), res.beacon]);
        await this.modalController.dismiss();
        await this.router.navigateByUrl('/beacon/' + res.beacon.id_beacon);
        this.toastService.presentToast(wording.beacon.addAck);
      } else {
        this.toastService.presentToast(res.reason);
      }
    });*/
  }
  updateBeacon(beacon: any) {
    this.httpService.updateBeacon(beacon).subscribe(async (res: AddBeaconResponse) => {
      if (res.status) {
        await this.modalController.dismiss();
        this.dataService.currentBeaconSubject.next(beacon);
        this.toastService.presentToast(wording.beacon.editAck);
      } else {
        this.toastService.presentToast(res.reason);
      }
    });
  }
  ngOnInit() {
  }

}
