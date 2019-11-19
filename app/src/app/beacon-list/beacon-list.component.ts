import { Component, OnInit } from '@angular/core';
import {BeaconScannerService} from "../services/beacon-scanner.service";
import {BeaconStoreService} from "../services/beacon-store.service";

@Component({
  selector: 'app-beacon-list',
  templateUrl: './beacon-list.component.html',
  styleUrls: ['./beacon-list.component.scss'],
})
export class BeaconListComponent implements OnInit {

  constructor(private beaconScanner: BeaconScannerService, private beaconStore: BeaconStoreService) { }

  ngOnInit() {

  }

  startRecording() {
    this.beaconScanner.startExploring();
  }

}
