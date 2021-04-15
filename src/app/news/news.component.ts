import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../_services/news.service';
import {News} from '../models/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  id: number;
  private routeSubscription: Subscription;
  news: News;
  error: string;

  constructor(private route: ActivatedRoute,
              private newsService: NewsService) {

    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.newsService.getNews(this.id).subscribe(
      data => {
        this.news = JSON.parse(data);
        return this.news;
      },
      err => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

}
