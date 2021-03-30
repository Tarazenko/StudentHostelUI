import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<AdminEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    if (data.role === 'ROLE_USER') {
      this.labelPosition = 'userRole';
    } else if (data.role === 'ROLE_ADMIN') {
      this.labelPosition = 'admin';
    } else {
      this.labelPosition = 'moder';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
