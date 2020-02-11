import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {HttpService} from '../../services/http.service';
import {IContent} from '../../../models/interfaces';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  contents : IContent[]
  id_client:string;
  id_beacon:string;
  markdown : string



  constructor(
    private httpService : HttpService,
    private route: ActivatedRoute,
  ) { 
    this.id_client = this.route.snapshot.queryParams["id_client"];
    this.id_beacon = this.route.snapshot.queryParams["id_beacon"];
  }

  ngOnInit() {
    this.httpService.getContents(this.id_client,this.id_beacon)
    .subscribe(cc =>{
      this.contents = cc.value.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
      this.markdown = this.contents[0].content
    })
  }

}
