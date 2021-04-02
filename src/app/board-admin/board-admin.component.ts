import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../_services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AdminEditDialogComponent} from '../dialogs/admin-edit/admin-edit.dialog.component';
import {User} from '../models/User';
import {AdminDeleteDialogComponent} from '../dialogs/admin-delete/admin-delete.dialog.component';

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
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();

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
    this.refreshTable();
  }

  startEdit(i: number, id: number, username: string, name: string, surname: string, email: string, role: string) {
    const dialogRef = this.dialog.open(AdminEditDialogComponent, {
      data: {id: id, username: username, name: name, surname: surname, email: email, role: role}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('The dialog was closed');
        console.log(result);
        this.refreshTable();
      }
    });
  }

  deleteItem(id: number, username: string, name: string, surname: string) {
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent, {
      data: {id: id, username: username, name: name, surname: surname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = JSON.parse(data);
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        this.users = JSON.parse(err.error).message;
        console.log(this.users);
      }
    );
  }
}


