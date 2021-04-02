import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {User} from '../../models/User';


@Component({
  selector: 'admin-edit.dialog',
  templateUrl: 'admin-edit.dialog.html',
  styleUrls: ['admin-edit.dialog.css']
})
export class AdminEditDialogComponent {
  labelPosition: string;

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<AdminEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    if (data.role === 'ROLE_USER') {
      this.labelPosition = 'userRole';
    } else if (data.role === 'ROLE_MODERATOR') {
      this.labelPosition = 'moder';
    } else {
      this.labelPosition = 'admin';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void {
    if (this.labelPosition === 'userRole') {
      this.data.role = 'ROLE_USER';
    } else if (this.labelPosition === 'moder') {
      this.data.role = 'ROLE_MODERATOR';
    } else {
      this.data.role = 'ROLE_ADMIN';
    }
    this.userService.updateUser(this.data);
    console.log(this.data);
  }
}
