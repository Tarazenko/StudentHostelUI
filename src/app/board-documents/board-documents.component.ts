import {Component, Inject, OnInit} from '@angular/core';
import {DocumentService} from '../_services/document.service';
import {Category} from '../models/Category';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddCategoryComponent} from '../dialogs/add-category/add-category.component';
import {AddDocumentComponent} from '../dialogs/add-document/add-document.component';
import {Document} from '../models/Document';
import {ApproveComponent} from '../dialogs/approve/approve.component';
import {TokenStorageService} from '../_services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const DELETE_CATEGORY_MESSAGE = 'Вы уверены что хотите удалить категорию ';
const DELETE_DOCUMENT_MESSAGE = 'Вы уверены что хотите удалить документ ';

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

  editedCategory: Category;

  show = false;

  isUser = false;

  clickButton = false;
  documentMessage: string;
  categoryMessage: string;

  constructor(public documentService: DocumentService, public dialog: MatDialog,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {

    const user = this.tokenStorageService.getUser();
    if (user) {
      this.show = user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MODERATOR');
      this.isUser = user.roles.includes('ROLE_ADMIN') || user.roles.includes('ROLE_MODERATOR')
        || user.roles.includes('ROLE_USER');

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
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {data: {}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('The dialog was closed');
        window.location.reload();
      }
    });
  }

  addDocument() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      data: this.categories,
      height: '55%',
      width: '20%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Add document dialog was closed with adding.');
        window.location.reload();
      }
    });
  }

  deleteCategory(id: number, name: string) {
    this.categoryMessage = DELETE_CATEGORY_MESSAGE + '"' + name + '"' + '?' + ' Все документы в категории будут удалены!';
    this.clickButton = true;
    const dialogRef = this.dialog.open(ApproveComponent, {data: this.categoryMessage});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Delete category with id - ', id);
        this.documentService.deleteCategory(id);
        window.location.reload();
      }
    });
  }

  updateCategory(category: Category) {
    this.clickButton = true;
    this.editedCategory = {
      id: category.id,
      name: category.name
    };
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {data: this.editedCategory});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Update category with id - ', category.id);
        window.location.reload();
      }
    });
  }

  deleteDocument(id: number, name: string) {
    this.documentMessage = DELETE_DOCUMENT_MESSAGE + '"' + name + '"' + '?';
    const dialogRef = this.dialog.open(ApproveComponent, {data: this.documentMessage});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Delete document with id - ', id);
        this.documentService.deleteDocument(id);
        window.location.reload();
      }
    });
  }
}


@Component({
  selector: 'update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  category: Category = {
    id: this.categoryData.id,
    name: this.categoryData.name
  };

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public categoryData: Category,
              public categoryService: DocumentService,
              private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      categoryCtrl: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.category);
  }
}
