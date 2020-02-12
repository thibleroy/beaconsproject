import { Component } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  id_client : string = "5e43a7273e30463d16e9ce20"
  id_beacon : string = "5e43ae063105463b4d619ef6"
  //id_beacon : string = "5e43be1a592e6620d25c26c5"
  markdown : string = ""

  constructor(
    private httpService : HttpServiceService
  ) {
  }

  addContent(){
    this.httpService.addContent(this.id_client,this.id_beacon,{
      id_content :'',
      id_beacon : this.id_beacon,
      timestamp : new Date().getTime(),
      content : this.markdown
    })
    .subscribe(cc =>{
      console.log(cc)
    })
  }

}
