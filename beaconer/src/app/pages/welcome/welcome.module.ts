import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { ClientListComponent } from '../../components/client-list/client-list.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule
  ],
  declarations: [
    WelcomePage,
    ClientListComponent
  ]
})
export class WelcomePageModule {}
