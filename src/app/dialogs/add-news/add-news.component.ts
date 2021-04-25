import {Component, Inject, OnInit} from '@angular/core';
import {IFile} from '../../models/IFile';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UploadFilesService} from '../../_services/upload-files.service';
import {News} from '../../models/News';
import {NewsService} from '../../_services/news.service';
import {FormControl, Validators} from '@angular/forms';
import {MaxSizeValidator} from '@angular-material-components/file-input';
import {async} from 'rxjs';

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

  constructor(public dialogRef: MatDialogRef<AddNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News,
              public uploadService: UploadFilesService,
              public newsService: NewsService
  ) {
    this.fileControl = new FormControl(this.file, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024 * 1024)
    ]);
  }

  ngOnInit(): void {
     this.fileControl.valueChanges.subscribe((file: any) => {
      this.file = file;
      if (!this.fileControl.errors) {
        this.shouldDisable = false;
      }
    });
  }

  addNews(): void {
    if (!this.fileControl.errors) {
      this.upload();
      console.log('File after subscribe - ', JSON.stringify(this.ifile));
      if (this.ifile) {
        this.news.file = this.ifile;
        console.log('File from server - ', JSON.stringify(this.ifile));
        this.newsService.addNews(this.news).subscribe({
          next: data => {
            console.log('News from server - ' + JSON.stringify(data));
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async upload() {
    console.log('File errors ', this.fileControl.errors);
    console.log('File to upload - ', this.file.name);
    if (this.file) {
      await this.uploadService.uploadFile(this.file).subscribe({
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
      console.log('File after subscribe - ', JSON.stringify(this.ifile));
    }
  }
}
