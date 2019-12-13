import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../../services/http-service.service";
import {addBeaconResponse} from "../../../models/responses";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-beacon-add-modale',
  templateUrl: './beacon-add-modale.component.html',
  styleUrls: ['./beacon-add-modale.component.scss'],
})
export class BeaconAddModaleComponent implements OnInit {

  constructor(private httpService: HttpServiceService,
              public toast: ToastController,
              private router: Router,
              private modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams

  }

  async presentToast(val: string) {

      const toast = await this.toast.create({
        message: val,
        duration: 3000
      });
      toast.present();
    }


  addBeacon(form) {
    this.httpService.addBeacon(form.value).subscribe((res: addBeaconResponse) => {
      if (res.status) {
        this.modalController.dismiss();
        this.router.navigateByUrl('/beacon/'+res.id);
        this.presentToast(`Le beacon ${form.value.name} a bien été ajouté`);
      } else {
        this.presentToast(res.reason);
      }
    });
  }
  ngOnInit() {}

}
