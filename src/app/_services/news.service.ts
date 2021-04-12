import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {News} from '../models/News';

const NEWS_URL = 'http://localhost:8080/api/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  errorMessage: any;

  constructor(private http: HttpClient) { }

  getNews(id: number): Observable<any> {
    return this.http.get(NEWS_URL + id, {responseType: 'text'});
  }

  getAllNews(): Observable<any> {
    return this.http.get(NEWS_URL , {responseType: 'text'});
  }

  deleteNews(id: number): void {
    this.http.delete(NEWS_URL + '/' + id)
      .subscribe({
        next: data => {
          console.log('Delete successful news with id - ' + id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  updateNews(news: News): void {
    this.http.put(NEWS_URL + '/' + news.id, news)
      .subscribe({
        next: data => {
          console.log('Update news with id - ' + news.id);
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  addNews(news: News): Observable<any> {
    return this.http.post(NEWS_URL, news);
  }
}
