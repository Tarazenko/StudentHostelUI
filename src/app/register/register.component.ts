import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {User} from '../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {
    username: null,
    email: null,
    password: null,
    name: null,
    surname: null,
    patronymic: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  formGroup: FormGroup;

  constructor(private authService: AuthService,
              private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      usernameControl: ['', [
        Validators.required
      ]],
      nameControl: ['', [
        Validators.required]],
      surnameControl: ['', [
        Validators.required
      ]],
      passwordControl: ['', [
        Validators.required
      ]],
      patronymicControl: ['', []],
      emailControl: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  ngOnInit(): void {
  }

  stopEdit(): void {
    const {username, email, password, name, surname, patronymic} = this.user;

    this.authService.register(username, email, password, name, surname, patronymic).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.error('There was an error - ', this.errorMessage);
        if (this.errorMessage.includes('Email is already in use')) {
          this.errorMessage = 'Данный email уже используется';
          this.formGroup.get('emailControl').setErrors({'exist': true});
        } else if (this.errorMessage.includes('Username is already taken')) {
          this.errorMessage = 'Данный логин уже используется';
          this.formGroup.get('usernameControl').setErrors({'exist': true});
        } else {
          this.errorMessage = 'Ошибка. Сервер временно не доступен';
        }
      });
  }
}
