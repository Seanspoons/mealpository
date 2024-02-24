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
      title: new FormControl(),
      prepTime: new FormControl(),
      cookTime: new FormControl(),
      totalTime: new FormControl(),
      servings: new FormControl(),
      description: new FormControl(),
      instructions: new FormControl()
    });

  }

  onFileProcessed(processedData: string[]): void {
    // Update your form with the processed data
    // For demonstration purposes, we'll assume processedData contains title and description
    console.log("here2");
    this.addForm.patchValue({
      title: processedData[0] || '',
      description: processedData[1] || ''
    });
  }

  onSubmit(): void {

  }

}
