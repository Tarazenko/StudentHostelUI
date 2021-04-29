import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Request} from '../../models/Request';
import {RequestService} from '../../_services/request.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-request-handling',
  templateUrl: './request-handling.component.html',
  styleUrls: ['./request-handling.component.css']
})
export class RequestHandlingComponent implements OnInit {

  labelPosition: string;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<RequestHandlingComponent>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Request,
              private requestService: RequestService) {
    if (data.status === 'WAITING') {
      this.labelPosition = 'waiting';
    } else if (data.status === 'IN_PROGRESS') {
      this.labelPosition = 'progress';
    } else if (data.status === 'DONE') {
      this.labelPosition = 'done';
    } else {
      this.labelPosition = 'error';
    }
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      commentCtrl: ['', [Validators.required]]
    });
  }

  updateRequest(): void {
    if (this.labelPosition === 'waiting') {
      this.data.status = 'WAITING';
    } else if (this.labelPosition === 'progress') {
      this.data.status = 'IN_PROGRESS';
    } else if (this.labelPosition === 'done') {
      this.data.status = 'DONE';
    } else {
      this.data.status = 'ERROR';
    }
    this.requestService.updateRequest(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
