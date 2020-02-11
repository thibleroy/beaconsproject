import { Component, OnInit,OnDestroy, NgZone } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import {BeaconService} from '../../services/beacon.service';
import {HttpService} from '../../services/http.service';
import {Platform} from '@ionic/angular';
import {Beacon} from '@ionic-native/ibeacon/ngx';
import {IBeacon} from '../../../models/interfaces';
import {ToastController} from "@ionic/angular";
import {Subscription} from 'rxjs';

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

  subscription:Subscription

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private beaconService: BeaconService,
    private httpService : HttpService,
    public platform: Platform,
    public toastController: ToastController
    ) {
    this.id_client = this.route.snapshot.queryParams["id_client"];
     }

  ngOnInit() {
    this.httpService.getBeacons(this.id_client)
    .subscribe(cb =>{
      this.handleBeacon(cb.value)
    })
  }

  handleBeacon(beacons:IBeacon[]){
    this.beacons = beacons
    if (this.platform.is('cordova') && Array.isArray(this.beacons) && this.beacons.length) {
        this.zone = new NgZone({ enableLongStackTrace: false });
        let uuid = this.beacons[0].uuid
        this.beaconService.initialise(uuid).then(() => {
            this.subscription = this.beaconService.currentBeacons.subscribe(data=>{
              this.zone.run(() => {
                let beacon_id : string = this.get_beacon_id(this.get_nearest_beacon(data.beacons))
                if(beacon_id){
                  if(beacon_id !=this.nearest_beacon_id){
                    this.nearest_beacon_id = beacon_id
                    this.ShowToast(beacon_id)
                  }
                }
              });
            })
        });
      }
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

  async ShowToast(beacon_id:string) {
  const toast = await this.toastController.create({
    header: 'Notification',
    message: "Vous êtes à proximité du beacon "+beacon_id,
    position: 'top',
    duration: 20000,
    buttons: [
      {
        side: 'start',
        icon: 'star',
        text: 'Voir',
        handler: () => {
          this.router.navigate(['/content'], { queryParams: { id_client: this.id_client , id_beacon:beacon_id} });
        }
      }, {
        text: 'Retour',
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
      this.subscription.unsubscribe()
    }
  }

}
