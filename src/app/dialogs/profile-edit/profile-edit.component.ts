import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../_services/user.service';
import {FormControl, Validators} from '@angular/forms';
import {User} from '../../models/User';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {

  constructor(public dialogRef: MatDialogRef<ProfileEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User, public userService: UserService) { }

  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Обязательное поле' :
      this.formControl.hasError('email') ? 'Неверный email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.userService.updateUser(this.data);
  }
}
