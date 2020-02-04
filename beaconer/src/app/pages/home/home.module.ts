import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ClientDetailsComponent } from '../../components/client-details/client-details.component';
import { MapsComponent } from '../../components/maps/maps.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ClientDetailsComponent,
    MapsComponent
  ]
})
export class HomePageModule {}
