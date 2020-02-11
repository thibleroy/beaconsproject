import { Component, OnInit } from '@angular/core';
import {ClientResponse} from '../../../../../beaconer/src/models/responses';
import {HttpServiceService} from "../../../services/http-service.service";
import {MenuController} from "@ionic/angular";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string;
  password: string;
  mail: string;
  clientId: string;

  constructor(
      private http: HttpServiceService,
  ) {}

  ngOnInit() {
  }


  sendRegister() {
    this.http.createUser(this.username, this.password, this.clientId)
        .subscribe((cr: ClientResponse) => {
          this.clientId = cr.value.id_client;
          localStorage.setItem('clientId', this.clientId);
        });
  }

}
