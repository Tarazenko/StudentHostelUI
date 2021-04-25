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

  requests: Request[];
  user: User;
  error: string;
  /*= [{
    id: 1,
    content: 'Не работает лампочка.',
    comment: '05.04 c 8-10 прийдет электрик',
    state: 'IN_PROGRESS',
    room: 217
  },
    {
      id: 1,
      content: 'Не работает лампочка.',
      comment: '05.04 c 8-10 прийдет электрик',
      state: 'DONE',
      room: 217
    }];*/

  constructor(private requestService: RequestService,
              private tokenService: TokenStorageService) {
    this.user =  <User> tokenService.getUser();
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
