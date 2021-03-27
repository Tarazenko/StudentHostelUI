import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from '../models/User';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  users?: User[];
  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      },
      err => {
        this.users = JSON.parse(err.error).message;
      }
    );
    /*console.log(this.user);*/
  }
}
