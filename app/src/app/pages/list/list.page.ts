import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {BeaconAddModaleComponent} from '../../components/beacon-add-modale/beacon-add-modale.component';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
constructor(public modalController: ModalController){}
  async presentModal() {
    const modal = await this.modalController.create({
      component: BeaconAddModaleComponent
    });
    return await modal.present();
  }
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
