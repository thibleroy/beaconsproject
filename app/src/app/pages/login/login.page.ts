import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }
  login() {
  this.auth.login(this.username, this.password);
  }
}
