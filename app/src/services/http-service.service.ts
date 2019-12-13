import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Beacon} from '../../../back/src/entities/interfaces';
import {environment} from "../environments/environment";
import {addBeaconResponse, BeaconResponse, BeaconsResponse} from "../models/responses";

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  constructor(private http: HttpClient) {
  }
  getBeacons(): Observable<BeaconsResponse> {
      return this.http.get<BeaconsResponse>(environment.ip + '/beacons');
  }
  getBeacon(id: string): Observable<BeaconResponse> {
      return this.http.get<BeaconResponse>(`${environment.ip}/beacon/${id}`);
  }
  addBeacon(beacon: Beacon): Observable<addBeaconResponse> {
      return this.http.post<addBeaconResponse>(`${environment.ip}/beacons`, beacon);
  }
  updateBeacon(beacon: Beacon): Observable<addBeaconResponse> {
      return this.http.post<addBeaconResponse>(`${environment.ip}/beacon/${beacon.id}`, beacon);
  }
  deleteBeacon(id: string): Observable<addBeaconResponse> {
      return this.http.delete<addBeaconResponse>(`${environment.ip}/beacon/${id}`);
  }
}
