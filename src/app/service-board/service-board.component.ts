import {Component, OnInit} from '@angular/core';
import {Request} from '../models/Request';
import {RequestService} from '../_services/request.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {User} from '../models/User';

@Component({
  selector: 'app-service-board',
  templateUrl: './service-board.component.html',
  styleUrls: ['./service-board.component.css']
})
export class ServiceBoardComponent implements OnInit {

  requests: Request[] = [];
  user: User;
  error: string;
  statuses = new Map();

  constructor(private requestService: RequestService,
              private tokenService: TokenStorageService) {
    this.user =  <User> tokenService.getUser();
    this.statuses.set('WAITING', ['query_builder', 'color_blue', 'В ожидании']);
    this.statuses.set('IN_PROGRESS', ['notifications', 'color_blue', 'В процессе']);
    this.statuses.set('ERROR', ['cancel', 'color_red', 'Отклонена']);
    this.statuses.set('DONE', ['check_circle_outline', 'color_green', 'Завершено']);
  }

  ngOnInit(): void {
    this.requestService.getUserRequests(this.user.id).subscribe({
      next: data => {
        console.log('Requests from server - ' + JSON.stringify(data));
        this.requests = JSON.parse(data);
      },
      error: error => {
        this.error = error.message;
        console.error('There was an error!', error);
      }
    });
  }

}
