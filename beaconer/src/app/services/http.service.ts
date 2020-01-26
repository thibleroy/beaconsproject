import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { ClientResponse,ClientsResponse,BeaconResponse, BeaconsResponse} from '../../models/responses';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

getBeacons(): Observable<BeaconsResponse> {
    return this.http.get<BeaconsResponse>(environment.ip + '/beacons');
}
getBeacon(id: string): Observable<BeaconResponse> {
  return this.http.get<BeaconResponse>(`${environment.ip}/beacon/${id}`);
}
getClients(): Observable<ClientsResponse> {
  return this.http.get<ClientsResponse>(environment.ip + '/clients');
}
getClient(id: string): Observable<ClientResponse> {
return this.http.get<ClientResponse>(`${environment.ip}/client/${id}`);
}
}
