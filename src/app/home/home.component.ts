import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {News} from '../models/News';
import {AddDocumentComponent} from '../dialogs/add-document/add-document.component';
import {MatDialog} from '@angular/material/dialog';
import {AddNewsComponent} from '../dialogs/add-news/add-news.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content?: string;

  news: News[] = [
    {
      id: 1,
      title: 'News 1',
      preview: 'Preview 1',
      text: 'Simple text'
    },
    {
      id: 2,
      title: 'News 2',
      preview: 'Preview 2',
      text: 'Simple text'
    },
    {
      id: 1,
      title: 'News 1',
      preview: 'Preview 1',
      text: 'Simple text'
    },
    {
      id: 2,
      title: 'News 2',
      preview: 'Preview 2',
      text: 'Simple text'
    },
    {
      id: 1,
      title: 'News 1',
      preview: 'Preview 1',
      text: 'Simple text'
    },
    {
      id: 2,
      title: 'News 2',
      preview: 'Preview 2',
      text: 'Simple text'
    }
  ];


  constructor(private userService: UserService, public dialog: MatDialog) { }


  public ngOnInit(): void {

  }

  public addNews(): void {
    const dialogRef = this.dialog.open(AddNewsComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Add news dialog was closed with adding.');
        this.ngOnInit();
      }
    });
  }
}
