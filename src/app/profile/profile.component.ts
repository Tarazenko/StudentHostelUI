import {Component, OnInit} from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../_services/user.service';
import {ProfileEditComponent} from '../dialogs/profile-edit/profile-edit.component';
import {MatDialog} from '@angular/material/dialog';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User = new User(0, '-', '-', '-', '-', '-', '-');
  authUserId: number = JSON.parse(sessionStorage.getItem(USER_KEY) as string).id;
  userExist = false;

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.authUserId).subscribe(
      data => {
        this.user = JSON.parse(data);
        console.log(this.user);
        this.userExist = true;
        },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );
  }

  edit(): void {

  }

  startEdit(id: number, username: string, name: string, surname: string, patronymic: string, email: string) {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: {id: id, username: username, name: name, surname: surname, patronymic: patronymic, email: email},
      height: '60%',
      width: '20%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('The dialog was closed');
        console.log(result);
        this.ngOnInit();
      }
    });
  }
}
