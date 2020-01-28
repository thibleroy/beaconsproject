import { Component, OnInit,OnDestroy, NgZone } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {BeaconService} from '../../services/beacon.service';
import {HttpService} from '../../services/http.service';
import {Events, Platform} from '@ionic/angular';
import {Beacon} from '@ionic-native/ibeacon/ngx';
import {IBeacon} from '../../../../../back/src/entities/interfaces';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  beacons : IBeacon[]
  id_client:string;
  zone: NgZone;
  nearest_beacon_id : string

  constructor(
    private route: ActivatedRoute,
    private beaconService: BeaconService,
    private httpService : HttpService,
    public platform: Platform,
    private events: Events,
    public toastController: ToastController
    ) {
    this.id_client = this.route.snapshot.queryParams["id_client"];
     }

  ngOnInit() {
    this.httpService.getBeacons(this.id_client)
    .subscribe(cr =>{
      this.beacons = cr.value
      this.handleBeacon()
    })
  }

  handleBeacon(){
    if (this.platform.is('cordova') && Array.isArray(this.beacons) && this.beacons.length) {
        this.zone = new NgZone({ enableLongStackTrace: false });
        let uuid = this.beacons[0].uuid
        this.beaconService.initialise(uuid).then(() => {
            this.events.subscribe('didRangeBeaconsInRegion', (data) => {
                this.zone.run(() => {

                  let beacon_id : string = this.get_beacon_id(this.get_nearest_beacon(data.beacons))

                  if(beacon_id){
                    if(beacon_id !=this.nearest_beacon_id){
                      this.ShowToast()
                    }
                  }

                });
            });
        });
      }
      
      /*else{
        this.ShowToast()
      }*/
  }

  get_beacon_id(beacon:Beacon) : string {
    for (var i = 0; i <= this.beacons.length; i ++) {
      if(i < this.beacons.length){
          if(
            beacon.uuid == this.beacons[i].uuid &&
            beacon.major == this.beacons[i].major &&
            beacon.minor == this.beacons[i].minor
            ){
              return this.beacons[i].id_beacon
          }
      }else{
          return undefined
      }
    }
  }

  get_nearest_beacon(beacons:Beacon[]) : Beacon{
    let res : Beacon
    for (var i = 0; i <= beacons.length; i ++) {
      if(i < beacons.length){
        if(res){
          if(beacons[i].rssi>res.rssi){
            res = beacons[i]
          }
        }else{
          res = beacons[i]
        }
      }else{
        return res
      }
    }
  }

  async ShowToast() {
  const toast = await this.toastController.create({
    header: 'Notification',
    message: "Vous êtes à proximité d'un beacon",
    position: 'top',
    buttons: [
      {
        side: 'start',
        icon: 'star',
        text: 'Voir',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  toast.present();
  }

  ngOnDestroy() {
    if (this.platform.is('cordova')) {
      this.beaconService.stopRanging();
    }
  }

}
