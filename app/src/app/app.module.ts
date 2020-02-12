import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IBeacon} from '@ionic-native/ibeacon/ngx';
import {HttpClientModule} from '@angular/common/http';
import {HttpServiceService} from '../services/http-service.service';
import {FormsModule} from '@angular/forms';
import {BeaconAddModaleComponent} from './components/beacon-add-modale/beacon-add-modale.component';
import {ToastService} from '../services/toast.service';
import {BeaconScannerService} from '../services/beacon-scanner.service';
import {IonicStorageModule} from '@ionic/storage';
import {SplitPaneService} from '../services/split-pane.service';

import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [AppComponent, BeaconAddModaleComponent],
  entryComponents: [BeaconAddModaleComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      HttpClientModule,
      FormsModule,
    IonicStorageModule,
    MarkdownModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    IBeacon,
      HttpServiceService,
      BeaconScannerService,
      ToastService,
      SplitPaneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
