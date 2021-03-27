import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {UserService} from '../_services/user.service';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user?: User;
  authUserId: number = JSON.parse(sessionStorage.getItem(USER_KEY) as string).id;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.authUserId).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
        },
      err => {
        this.user = JSON.parse(err.error).message;
      }
    );
    console.log(this.user);
  }
}
