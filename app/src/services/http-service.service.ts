import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import {retry} from 'rxjs/operators';
import {IBeacon} from '../../../back/lib';
import {environment} from '../environments/environment';
import {AddBeaconResponse, BeaconResponse, BeaconsResponse} from '../models/responses';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  constructor(private http: HttpClient) {
  }


  getBeacons(clientId: string): Observable<BeaconsResponse> {
       return this.http.get<BeaconsResponse>(`${environment.ip}/clients/${clientId}/beacons`, httpOptions).pipe(
           retry(1),
           catchError(this.handleError)
       );
  }
  getBeacon(clientId: string, id: string): Observable<IBeacon> {
     return this.http.get<IBeacon>(`${environment.ip}/clients/${clientId}/beacons/${id}`, httpOptions).pipe(
         retry(1),
         catchError(this.handleError)
     );
  }
  addBeacon(clientId: string, beacon: IBeacon): Observable<AddBeaconResponse> {
      return this.http.post<AddBeaconResponse>(`${environment.ip}/clients/${clientId}/beacons`, beacon).pipe(
          retry(1),
          catchError(this.handleError)
      );
  }
  updateBeacon(clientId: string, beacon: IBeacon): Observable<AddBeaconResponse> {
      return this.http.put<AddBeaconResponse>(`${environment.ip}//clients/${clientId}beacons/${beacon.id_beacon}`, beacon).pipe(
          retry(1),
          catchError(this.handleError)
      );
  }
  deleteBeacon(clientId: string, id: string): Observable<AddBeaconResponse> {
      return this.http.delete<AddBeaconResponse>(`${environment.ip}/clients/${clientId}/beacons/${id}`).pipe(
          retry(1),
          catchError(this.handleError)
      );
  }
  userLogin(username, password): Observable<any> {
        return this.http.post<any>(`${environment.ip}/users/login`, {username, password}).pipe(
            retry(1),
            catchError(this.handleError)
        );
  }





    /**
     * Function to handle error when the server return an error
     *
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError(error);
    }
}
