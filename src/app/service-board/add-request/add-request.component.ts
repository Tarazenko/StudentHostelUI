import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Request} from '../../models/Request';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  request: Request = {
    content: '',
    comment: '',
    state: ''
  };

  constructor(private _formBuilder: FormBuilder) {
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
      // @ts-ignore
    console.log('error', this.firstFormGroup.get('firstCtrl').errors);
  }
}
