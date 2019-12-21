import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Beacon} from '../../../back/src/entities/interfaces';
import {environment} from '../environments/environment';
import {addBeaconResponse, BeaconResponse, BeaconsResponse} from '../models/responses';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  constructor(private http: HttpClient, private dataService: DataService) {
  }
  getBeacons(): void {
       this.http.get<BeaconsResponse>(environment.ip + '/beacons').subscribe((res) => {
           this.dataService.loadedBeaconsSubject.next(res.beacons);
       });
  }
  getBeacon(id: string): void {
     this.http.get<BeaconResponse>(`${environment.ip}/beacon/${id}`).subscribe((res) => {
         this.dataService.currentBeaconSubject.next(res.beacon);
     });
  }
  addBeacon(beacon: Beacon): Observable<addBeaconResponse> {
      return this.http.post<addBeaconResponse>(`${environment.ip}/beacons`, beacon);
  }
  updateBeacon(beacon: Beacon): Observable<addBeaconResponse> {
      return this.http.put<addBeaconResponse>(`${environment.ip}/beacon/${beacon.id}`, beacon);
  }
  deleteBeacon(id: string): Observable<addBeaconResponse> {
      return this.http.delete<addBeaconResponse>(`${environment.ip}/beacon/${id}`);
  }
}
