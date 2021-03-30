import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../_services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AdminEditDialogComponent} from '../dialogs/admin-edit/admin-edit.dialog.component';
import {User} from '../models/User';

export interface UserData {
  id: number;
  username: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  role: string;
}


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements AfterViewInit, OnInit {
  users: UserData[];
  dialogUser: User;

  displayedColumns: string[] = ['id', 'username', 'name', 'surname', 'patronymic', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = JSON.parse(data);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        this.users = JSON.parse(err.error).message;
        console.log(this.users);
      }
    );
  }

  startEdit(i: number, id: number, username: string, name: string, surname: string, email: string, role: string) {
    const dialogRef = this.dialog.open(AdminEditDialogComponent, {
      data: {id: id, username: username, name: name, surname: surname, email: email, role: role}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogUser = result;
      console.log(Object.keys(result));
    });
  }

  deleteItem() {

  }
}


