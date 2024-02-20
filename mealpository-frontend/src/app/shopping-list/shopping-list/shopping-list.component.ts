import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  listForm: FormGroup;

  bakeryList!: string[];
  beveragesList!: string[];
  cannedGoodsList!: string[];
  dairyList!: string[];
  frozenFoodsList!: string[];
  produceList!: string[];
  condimentsSaucesList!: string[];
  otherList!: string[];

  constructor() {
    this.listForm = new FormGroup({
      list: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.bakeryList = []
    this.beveragesList = []
    this.cannedGoodsList = []
    this.dairyList = []
    this.frozenFoodsList = []
    this.produceList = []
    this.condimentsSaucesList = []
    this.otherList = []

    this.bakeryList.push('test');
    this.beveragesList.push('test');
    this.cannedGoodsList.push('test');
    this.dairyList.push('test');
    this.frozenFoodsList.push('test');
    this.produceList.push('test');
    this.condimentsSaucesList.push('test');
    this.otherList.push('test');
  }

  onEditClick(): void {

  }

  onAddClick(): void {

  }

  onSubmit(): void {

  }

  submitForm(): void {
    if (this.listForm.valid) {
      this.onSubmit();
    }
  }

}
