import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,retry } from "rxjs/operators";
import {environment} from '../../environments/environment';
import { ClientResponse,ClientsResponse,BeaconResponse,BeaconsResponse, ContentResponse,ContentsResponse} from '../../models/responses';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

getClients(): Observable<ClientsResponse> {
    return this.http.get<ClientsResponse>(environment.ip + '/clients',httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
}

getClient(clientId: string): Observable<ClientResponse> {
return this.http.get<ClientResponse>(`${environment.ip}/clients/${clientId}`,httpOptions).pipe(
  retry(1),
  catchError(this.handleError)
);
}

getBeacons(clientId: string): Observable<BeaconsResponse> {
  return this.http.get<BeaconsResponse>(`${environment.ip}/clients/${clientId}/beacons`,httpOptions).pipe(
    retry(1),
    catchError(this.handleError)
  );
}

getBeacon(clientId: string,beaconId:string): Observable<BeaconResponse> {
return this.http.get<BeaconResponse>(`${environment.ip}/clients/${clientId}/beacons/${beaconId}`,httpOptions).pipe(
  retry(1),
  catchError(this.handleError)
);
}

getContents(clientId: string,beaconId:string): Observable<ContentsResponse> {
  return this.http.get<ContentsResponse>(`${environment.ip}/clients/${clientId}/beacons/${beaconId}/contents`,httpOptions).pipe(
    retry(1),
    catchError(this.handleError)
  );
}

getContent(clientId: string,beaconId:string,contentId:string): Observable<ContentResponse> {
return this.http.get<ContentResponse>(`${environment.ip}/clients/${clientId}/beacons/${beaconId}/contents/${contentId}`,httpOptions).pipe(
  retry(1),
  catchError(this.handleError)
);
}

  /**
   * Function to handle error when the server return an error
   *
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
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
