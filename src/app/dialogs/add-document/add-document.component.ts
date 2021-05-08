import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../models/Category';
import {DocumentService} from '../../_services/document.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {UploadFilesService} from '../../_services/upload-files.service';
import {Document} from '../../models/Document';
import {IFile} from '../../models/IFile';
import {MaxSizeValidator} from '@angular-material-components/file-input';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  selectedFile?: File;
  currentFile?: File;
  message = '';
  selectedCategory: Category;

  ifile: IFile;
  errorMessage: any;

  categories: Category[];
  fileInfos?: Observable<any>;
  documentName: string;
  document: Document;
  categoryIndex: number;

  accept = '".png,.jpg,.jpeg,.bmp,.xls,.xlsx,.pdf,.doc,.docx,application/msword"';

  maxSize = 16; // MB
  file: any;
  fileControl: FormControl;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category[],
              public documentService: DocumentService,
              public uploadService: UploadFilesService,
              private _formBuilder: FormBuilder
  ) {
    console.log('Categories - ' + JSON.stringify(data));
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      fileControl: [this.file, [
        Validators.required,
        MaxSizeValidator(this.maxSize * 1024 * 1024)]],
      categoryControl: ['', [
        Validators.required
        ]],
      documentControl: ['', [
        Validators.required
        ]]
    });
    this.formGroup.get('fileControl').valueChanges.subscribe((file: any) => {
      this.file = file;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDocument(): void {
    console.log('File to upload - ', this.file.name);
    if (this.file) {
      this.uploadService.uploadFile(this.file).subscribe({
          next: data => {
            this.ifile = data;
            console.log('Success upload file -' + JSON.stringify(this.ifile));
            if (this.ifile) {
              console.log('File from server - ', JSON.stringify(this.ifile));
              console.log('Category - ', JSON.stringify(this.data[this.categoryIndex]));
              this.document = {
                id: 0,
                name: this.documentName,
                file: this.ifile,
                category: this.data[this.categoryIndex]
              };
              this.documentService.addDocument(this.document).subscribe({
                next: doc => {
                  console.log('Document from server - ' + JSON.stringify(doc));
                },
                error: error => {
                  this.errorMessage = error.message;
                  console.error('There was an error!', error);
                }
              });
            }
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        }
      );
    }
  }
}
