import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../_services/document.service';
import {Category} from '../models/Category';
import {UserService} from '../_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ProfileEditComponent} from '../dialogs/profile-edit/profile-edit.component';
import {AddCategoryComponent} from '../dialogs/add-category/add-category.component';
import {AddDocumentComponent} from '../dialogs/add-document/add-document.component';
import {Document} from '../models/Document';

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
  documents: Document[];

  constructor(public documentService: DocumentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.documentService.getCategories().subscribe(
      data => {
        this.categories = JSON.parse(data);
        return this.categories;
      },
      err => {
        this.categories = JSON.parse(err.error).message;
      }
    );

    this.documentService.getDocuments().subscribe(
      data => {
        this.documents = JSON.parse(data);
        console.log('Documents in sub - ', JSON.stringify(this.documents));
        return this.documents;
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
    const dialogRef = this.dialog.open(AddDocumentComponent, {data: this.categories});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Add document dialog was closed with adding.');
        this.ngOnInit();
      }
    });
  }

  getDocuments() {
    this.documentService.getDocuments().subscribe(
      data => {
        console.log(JSON.stringify(data));
      },
      err => {
        this.categories = JSON.parse(err.error).message;
      }
    );
  }

}
