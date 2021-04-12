import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../models/Category';
import {DocumentService} from '../../_services/document.service';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {UploadFilesService} from '../../_services/upload-files.service';
import {HttpResponse} from '@angular/common/http';
import {Document} from '../../models/Document';
import {IFile} from '../../models/IFile';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent {
  selectedFiles?: File;
  currentFile?: File;
  message = '';
  selectedCategory: Category;

  ifile: IFile;
  errorMessage: any;

  file: FormData = new FormData();

  categories: Category[];
  fileInfos?: Observable<any>;
  documentName: string;
  document: Document;
  categoryIndex: number;

  constructor(public dialogRef: MatDialogRef<AddDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category[],
              public documentService: DocumentService,
              public uploadService: UploadFilesService
  ) {
    console.log('Categories - ' + JSON.stringify(data));
  }

  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Обязательное поле' : '';
  }

  submit() {
    // emppty stuff
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  addDocument(): void {
    if (this.selectedFiles) {
      this.file.append(this.selectedFiles.name, this.selectedFiles);
      console.log('File from server - ', JSON.stringify(this.ifile));
      console.log('Category index - ', this.categoryIndex);
      console.log('Category - ', JSON.stringify(this.data[this.categoryIndex]));
      this.document = {
        id: 0,
        name: this.documentName,
        file: this.ifile,
        category: this.data[this.categoryIndex]
      };
      this.documentService.addDocument(this.document).subscribe({
        next: data => {
          console.log('Document from server - ' + JSON.stringify(data));
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
  }

  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles;

      if (file) {
        this.currentFile = file;
        this.uploadService.uploadFile(this.currentFile).subscribe({
          next: data => {
            this.ifile = data;
            console.log('Success upload file -' + JSON.stringify(this.ifile));
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        }
      );
        /*this.uploadService.upload(this.currentFile, 's').subscribe(
          (event: any) => {
            if (event instanceof HttpResponse) {
              this.message = event.body.message;
              console.log(this.message);
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
*/
      }
    }
  }
}
