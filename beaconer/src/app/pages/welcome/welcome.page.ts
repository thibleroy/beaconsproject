import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public menuCtrl : MenuController) { 
    this.disableMenu()
  }

  ngOnInit() {
  }

  disableMenu() {
    this.menuCtrl.enable(false);
  }

  enableMenu() {
    this.menuCtrl.enable(true);
  }

}
