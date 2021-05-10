import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/Category';
import {DocumentService} from '../../_services/document.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category,
              public categoryService: DocumentService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      categoryCtrl: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    this.categoryService.addCategory(this.data);
  }

}


