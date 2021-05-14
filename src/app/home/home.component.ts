import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {News} from '../models/News';
import {AddDocumentComponent} from '../dialogs/add-document/add-document.component';
import {MatDialog} from '@angular/material/dialog';
import {AddNewsComponent} from '../dialogs/add-news/add-news.component';
import {NewsService} from '../_services/news.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ApproveComponent} from '../dialogs/approve/approve.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content?: string;
  baseNewsUrl = 'http://localhost:4200/news/';

  news: News[];
  error: string;

  show: false;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              public newsService: NewsService,
              private tokenStorageService: TokenStorageService) {
  }


  public ngOnInit(): void {
    const user = this.tokenStorageService.getUser();

    if (user != null) {
      this.show = user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MODERATOR');
    }

    this.newsService.getAllNews().subscribe(
      data => {
        this.news = JSON.parse(data);
        return this.news;
      },
      err => {
        this.error = JSON.parse(err.error).message;
      }
    );
  }

  public addNews(): void {
    const dialogRef = this.dialog.open(AddNewsComponent, {
      height: '90%',
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Add news dialog was closed with adding.');
        window.location.reload();
      }
    });
  }

  public deleteNews(id: number, title: string) {
    const message = 'Вы уверены что хотите удалить новость - ' + title;
    const dialogRef = this.dialog.open(ApproveComponent, {data: message});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Delete news with id - ', id);
        this.newsService.deleteNews(id);
        window.location.reload();
      }
    });

  }
}
