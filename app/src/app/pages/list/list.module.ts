import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import {BeaconListComponent} from '../../components/beacon-list/beacon-list.component'
import {BeaconAddModaleComponent} from "../../components/beacon-add-modale/beacon-add-modale.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [ListPage,BeaconListComponent, BeaconAddModaleComponent],
  entryComponents: [BeaconAddModaleComponent]
})
export class ListPageModule {}
