import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Request} from '../models/Request';

const REQUESTS_URL = 'http://localhost:8080/api/requests';
const USER_REQUESTS_URL = 'http://localhost:8080/api/users/';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getRequest(id: number): Observable<any> {
    return this.http.get(REQUESTS_URL + '/' + id, {responseType: 'text'});
  }

  getRequests(): Observable<any> {
    return this.http.get(REQUESTS_URL , {responseType: 'text'});
  }

  getUserRequests(userId: number): Observable<any> {
    return this.http.get(USER_REQUESTS_URL + userId + '/requests', {responseType: 'text'});
  }

  deleteRequest(id: number): void {
    this.http.delete(REQUESTS_URL + '/' + id)
      .subscribe({
        next: data => {
          console.log('Delete successful request with id - ' + id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  updateRequest(request: Request): void {
    this.http.put(REQUESTS_URL + '/' + request.id, request)
      .subscribe({
        next: data => {
          console.log('Update request with id - ' + request.id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  addRequest(request: Request): Observable<any> {
    return this.http.post(REQUESTS_URL, request);
  }
}
