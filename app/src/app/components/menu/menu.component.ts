import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Registered beacons',
      url: '/beacons',
      icon: 'list'
    },
    {
      title: 'Discover beacons',
      url: '/detect',
      icon: 'list'
    }
  ];
  constructor() { }

  ngOnInit() {}

}
