import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {IClient} from '../../../../../back/src/entities/interfaces';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {

  @Input() id_client:string;
  client: IClient = {};

  constructor(
    private http : HttpService,
  ) {
   }

  ngOnInit() {
    this.http.getClient(this.id_client)
    .subscribe(cr =>{
      if(cr.status){
       this.client = cr.client
      }
    })
  }

}
