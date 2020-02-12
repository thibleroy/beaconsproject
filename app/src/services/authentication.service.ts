import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../../back/lib';
import {HttpServiceService} from './http-service.service';
import {DataService} from './data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser: Observable<IUser>;

  constructor(private httpService: HttpServiceService, private dataService: DataService) {
    this.dataService.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.dataService.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.dataService.currentUserSubject.value;
  }

  login(username, password) {
    this.httpService.userLogin(username, password)
        .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.dataService.currentUserSubject.next(user);
          return user;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.dataService.currentUserSubject.next(null);
  }
}
