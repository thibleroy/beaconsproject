import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {BeaconScannerService} from '../../../services/beacon-scanner.service';
import { IonicModule } from '@ionic/angular';

import { DetectPage } from './detect.page';

const routes: Routes = [
  {
    path: '',
    component: DetectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetectPage]
})
export class DetectPageModule {}
