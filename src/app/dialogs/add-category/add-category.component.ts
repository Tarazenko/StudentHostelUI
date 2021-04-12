import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {Category} from '../../models/Category';
import {DocumentService} from '../../_services/document.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category: Category;

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category,
              public categoryService: DocumentService) { }

  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Обязательное поле' : '';
  }

  submit() {
    // emppty stuff
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    this.categoryService.addCategory(this.data);
  }

}


