import {Component, Inject, OnInit} from '@angular/core';
import {IFile} from '../../models/IFile';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UploadFilesService} from '../../_services/upload-files.service';
import {News} from '../../models/News';
import {NewsService} from '../../_services/news.service';

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

  news: News;

  constructor(public dialogRef: MatDialogRef<AddNewsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: News,
              public uploadService: UploadFilesService,
              public newsService: NewsService
  ) {
  }

  ngOnInit(): void {
  }

  addNews(): void {
    if (this.selectedFile) {
      console.log('File from server - ', JSON.stringify(this.ifile));
      this.news = {
        id: 0,
        title: this.data.title,
        image: this.ifile,
        text: this.data.text,
        preview: this.data.preview
      }
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  upload(): void {

    if (this.selectedFile) {
      const file: File | null = this.selectedFile;

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
      }
    }
  }

}
