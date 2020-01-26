import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  id_client:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  this.id_client = this.route.snapshot.queryParams["id_client"];
  }

}
