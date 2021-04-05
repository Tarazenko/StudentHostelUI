import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../_services/document.service';
import {Category} from '../models/Category';
import {UserService} from '../_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ProfileEditComponent} from '../dialogs/profile-edit/profile-edit.component';
import {AddCategoryComponent} from '../dialogs/add-category/add-category.component';

export interface DragDropListItem {
  id: string;
  title: string;
  description: string[];
}

@Component({
  selector: 'app-board-documents',
  templateUrl: './board-documents.component.html',
  styleUrls: ['./board-documents.component.css']
})
export class BoardDocumentsComponent implements OnInit {

  categories: Category[];

  constructor(public documentService: DocumentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.documentService.getCategories().subscribe(
      data => {
        this.categories = JSON.parse(data);
      },
      err => {
        this.categories = JSON.parse(err.error).message;
      }
    );
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {data: {}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('The dialog was closed');
        this.ngOnInit();
      }
    });
  }

  addDocument() {

  }
}
