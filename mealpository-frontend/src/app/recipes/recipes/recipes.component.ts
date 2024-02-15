import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  
  searchForm: FormGroup;
  isAllActive!: boolean;
  isCategoriesActive!: boolean;
  isFavouritesActive!: boolean;
  isRecentsActive!: boolean;

  constructor() {
    this.searchForm = new FormGroup({ // Add more validators
      search: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.isAllActive = true;
    this.isCategoriesActive = false;
    this.isFavouritesActive = false;
    this.isRecentsActive = false;
  }

  onSubmit(): void {
  
  }

  toggleFilter(type: string): void {
    if(type === 'all') {
      this.isAllActive = true;
      this.isCategoriesActive = false;
      this.isFavouritesActive = false;
      this.isRecentsActive = false;
    } else if(type === 'categories') {
      this.isAllActive = false;
      this.isCategoriesActive = true;
      this.isFavouritesActive = false;
      this.isRecentsActive = false;
    } else if(type === 'favourites') {
      this.isAllActive = false;
      this.isCategoriesActive = false;
      this.isFavouritesActive = true;
      this.isRecentsActive = false;
    } else if(type === 'recents') {
      this.isAllActive = false;
      this.isCategoriesActive = false;
      this.isFavouritesActive = false;
      this.isRecentsActive = true;
    }
  }

}
