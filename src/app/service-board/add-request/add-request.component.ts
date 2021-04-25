import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Request} from '../../models/Request';
import {RequestService} from '../../_services/request.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  error: string;

  isReset = false;

  request: Request = {
    content: '',
    comment: '',
    status: 'WAITING'
  };

  constructor(private _formBuilder: FormBuilder,
              private requestService: RequestService,
              private tokenService: TokenStorageService) {
    this.request.user =  <User> tokenService.getUser();
    console.log(JSON.stringify(this.request));
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.maxLength(4),
        Validators.min(0), Validators.max(9999)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onClick() {
  }

  sendRequest(): void {
    this.requestService.addRequest(this.request).subscribe({
      next: data => {
        console.log('Request from server - ' + JSON.stringify(data));
        this.isReset = true;
        window.location.reload();
      },
      error: error => {
        this.error = error.message;
        console.error('There was an error!', error);
      }
    });
  }
}
