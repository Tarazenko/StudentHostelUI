import {Component, Inject, OnInit} from '@angular/core';
import {IFile} from '../../models/IFile';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UploadFilesService} from '../../_services/upload-files.service';
import {News} from '../../models/News';
import {NewsService} from '../../_services/news.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaxSizeValidator} from '@angular-material-components/file-input';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  selectedFile?: File;
  currentFile?: File;
  ifile: IFile;
  errorMessage: any;

  file: any;
  maxSize = 16; // MB

  shouldDisable = true;

  fileControl: FormControl;
  news: News = {preview: '', text: '', title: ''};

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News,
              public uploadService: UploadFilesService,
              public newsService: NewsService,
              private _formBuilder: FormBuilder
  ) {
/*    this.fileControl = new FormControl(this.file, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024 * 1024)
    ]);*/
  }

  ngOnInit(): void {
/*     this.fileControl.valueChanges.subscribe((file: any) => {
      this.file = file;
      if (!this.fileControl.errors) {
        this.shouldDisable = false;
      }
    });*/
    this.formGroup = this._formBuilder.group({
      fileControl: [this.file, [
        Validators.required,
        MaxSizeValidator(this.maxSize * 1024 * 1024)]],
      titleControl: ['', [
        Validators.required
      ]],
      previewControl: ['', [
        Validators.required
      ]],
      textControl: ['', [
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

  addNews(): void {
    console.log('File to upload - ', this.file.name);
    if (this.file) {
        this.uploadService.uploadFile(this.file).subscribe({
          next: data => {
            this.ifile = data;
            console.log('Success upload file -' + JSON.stringify(this.ifile));
            if (this.ifile) {
              this.news.file = this.ifile;
              console.log('File from server - ', JSON.stringify(this.ifile));
              this.newsService.addNews(this.news).subscribe({
                next: serverNews => {
                  console.log('News from server - ' + JSON.stringify(serverNews));
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
