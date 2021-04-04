import { Component, OnInit } from '@angular/core';

export interface DragDropListItem {
  id: string;
  title: string;
  description: string[];
}

@Component({
  selector: 'app-board-documents',
  templateUrl: './board-documents.component.html',
  styleUrls: ['./board-documents.component.css']
})
export class BoardDocumentsComponent implements OnInit {

  panelOpenState = false;

  unassignedTasks: DragDropListItem[] = [
    {
      id: '1',
      title: 'Task 1',
      description: [ 'Ford', 'BMW', 'Fiat' ]
    },
    {
      id: '2',
      title: 'Task 2',
      description: [ `Ford`, 'BMW', 'Fiat' ]
    },
    {
      id: '3',
      title: 'Task 3',
      description: [ `Ford`, 'BMW', 'Fiat' ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
