import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Request} from '../../models/Request';
import {User} from '../../models/User';
import {RequestService} from '../../_services/request.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from '../../_services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UserData} from '../../board-admin/board-admin.component';
import {RequestHandlingComponent} from '../../dialogs/request-handling/request-handling.component';

export interface RequestData {
  id: number;
  name: string;
  surname: string;
  room: number;
  status: string;
}

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.css']
})
export class AdminRequestComponent implements AfterViewInit, OnInit {
  users: UserData[];
  dialogUser: User;

  requests: Request[];
  error: string;

  displayedColumns: string[] = ['id', 'name', 'surname', 'room', 'status', 'actions'];
  dataSource: MatTableDataSource<Request> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserService, public dialog: MatDialog,
              private requestService: RequestService,
              private tokenService: TokenStorageService) {
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

  startHandle(request: Request) {
    const dialogRef = this.dialog.open(RequestHandlingComponent, {
      data: request
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log('Update request.');
      }
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.requestService.getRequests().subscribe({
      next: data => {
        console.log('Requests from server - ' + JSON.stringify(data));
        this.requests = JSON.parse(data);
        this.dataSource.data = this.requests;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: error => {
        this.error = error.message;
        console.error('There was an error!', error);
      }
    });
  }
}

