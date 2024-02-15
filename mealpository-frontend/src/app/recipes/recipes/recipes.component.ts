import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  
  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({ // Add more validators
      search: new FormControl('', Validators.required),
    });
  }

}
