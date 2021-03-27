import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/User';

const API_URL = 'http://localhost:8080/api/test/';
const USERS_URL = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(USERS_URL + id, {responseType: 'text'});
  }

  getUsers(): Observable<any> {
    return this.http.get(USERS_URL , {responseType: 'text'});
  }

}
