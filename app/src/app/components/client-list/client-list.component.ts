import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../services/http-service.service';
import { MenuController } from '@ionic/angular';
import {ClientsResponse} from '../../../../../beaconer/src/models/responses';
import {IClient} from '../../../../../beaconer/src/models/interfaces';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  clients: IClient[];

  constructor(
    private http: HttpServiceService,
    public menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.http.getClients()
    .subscribe((cr: ClientsResponse) => {
       this.clients = cr.value;
    });
  }

  enableMenu() {
    this.menuCtrl.enable(true);
  }

}
