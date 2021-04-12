import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../_services/user.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: 'admin-delete.dialog.html',
  styleUrls: ['admin-delete.dialog.css']
})
export class AdminDeleteDialogComponent {

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<AdminDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: number): void {
    console.log('Approve delete user id - ' + this.data.id);
    this.userService.deleteUser(id);
  }
}
