import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProfileEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public userService: UserService,
              private _formBuilder: FormBuilder) {
    this.formGroup = this._formBuilder.group({
      nameControl: ['', [
        Validators.required]],
      surnameControl: ['', [
        Validators.required
      ]],
      patronymicControl: ['', [
      ]],
      emailControl: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  error = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.userService.updateUserProfile(this.data).subscribe({
      next: user => {
        this.error = '';
        console.log('Update user with id - ' + user.id);
        this.dialogRef.close(1);
      },
      error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        if (this.error.includes('User with email')) {
            this.error = 'Данный email уже используется';
        } else {
          this.error = 'Ошибка. Сервер временно не доступен';
        }
      }
    });
  }
}
