import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '../models/Category';
import {User} from '../models/User';
import {Document} from '../models/Document';

const DOCUMENTS_URL = 'http://localhost:8080/api/documents';
const CATEGORIES_URL = DOCUMENTS_URL + '/categories';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<any> {
    return this.http.get(CATEGORIES_URL + id, {responseType: 'text'});
  }

  getCategories(): Observable<any> {
    return this.http.get(CATEGORIES_URL , {responseType: 'text'});
  }

  deleteCategory(id: number): void {
    this.http.delete(CATEGORIES_URL + '/' + id)
      .subscribe({
        next: data => {
          console.log('Delete successful category with id - ' + id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }
  deleteDocument(id: number): void {
    this.http.delete(DOCUMENTS_URL + '/' + id)
      .subscribe({
        next: data => {
          console.log('Successful delete document with id - ' + id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  updateCategory(category: Category): void {
    this.http.put(CATEGORIES_URL + '/' + category.id, category)
      .subscribe({
        next: data => {
          console.log('Update user with id - ' + category.id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  addCategory(category: Category): void {
    this.http.post(CATEGORIES_URL, category)
      .subscribe({
        next: data => {
          console.log('Success add category - ' + JSON.stringify(data));
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  getDocuments(): Observable<any> {
    return this.http.get(DOCUMENTS_URL , {responseType: 'text'});
  }

  addDocument(document: Document): Observable<any> {
    return this.http.post(DOCUMENTS_URL, document);
  }
}
