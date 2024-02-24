import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: false,
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  addForm: FormGroup

  constructor() {

    this.addForm = new FormGroup({ // Add more validators
      search: new FormControl('', Validators.required),
    });

  }

  onSubmit(): void {
    
  }

}
