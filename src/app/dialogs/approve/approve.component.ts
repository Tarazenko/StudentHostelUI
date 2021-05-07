import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent {

  constructor(public dialogRef: MatDialogRef<ApproveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: String) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fakeClick(): void {

  }
}
