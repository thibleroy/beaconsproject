import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IBeacon,IContent} from '../../../back/lib';
import {environment} from '../environments/environment';
import {AddBeaconResponse, BeaconResponse, BeaconsResponse,ContentResponse} from '../models/responses';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  constructor(private http: HttpClient) {
  }
  getBeacons(): Observable<BeaconsResponse> {
       return this.http.get<BeaconsResponse>(environment.ip + '/beacons');
  }
  getBeacon(id: string): Observable<IBeacon> {
     return this.http.get<IBeacon>(`${environment.ip}/beacon/${id}`);
  }
  addBeacon(beacon: IBeacon): Observable<AddBeaconResponse> {
      return this.http.post<AddBeaconResponse>(`${environment.ip}/beacons`, beacon);
  }
  updateBeacon(beacon: IBeacon): Observable<AddBeaconResponse> {
      return this.http.put<AddBeaconResponse>(`${environment.ip}/beacon/${beacon.id_beacon}`, beacon);
  }
  deleteBeacon(id: string): Observable<AddBeaconResponse> {
      return this.http.delete<AddBeaconResponse>(`${environment.ip}/beacon/${id}`);
  }
  userLogin(username, password): Observable<any> {
        return this.http.post<any>(`${environment.ip}/login`, {username, password});
  }

  addContent(clientId: string,beaconId:string,content: IContent): Observable<ContentResponse> {
    return this.http.post<ContentResponse>(`${environment.ip}/clients/${clientId}/beacons/${beaconId}/contents`, content);
}
}
