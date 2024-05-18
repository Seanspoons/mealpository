import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { IDGenerator } from '../../models/id_generator';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { RecipesService } from '../services/recipes.service';
import { Ingredient } from '../../models/ingredient';
import { AddRecipeService } from '../services/add-recipe.service';

@Component({
  selector: 'app-add-recipe',
  standalone: false,
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  addForm: FormGroup

  constructor(
    private authenticationService: AuthenticationService,
    private recipeService: RecipesService,
    private addRecipeService: AddRecipeService
  ) {

    this.addForm = new FormGroup({ // Add more validators
      title: new FormControl(),
      prepTime: new FormControl(),
      cookTime: new FormControl(),
      totalTime: new FormControl(),
      servings: new FormControl(),
      ingrQuantity: new FormControl(),
      ingredient: new FormControl(),
      ingrUnit: new FormControl(),
      description: new FormControl(),
      instructions: new FormControl(),
      imageURL: new FormControl()
    });

  }

  onFileProcessed(processedData: string[]): void { // update form with processed OCR data
    this.addForm.patchValue({
      title: processedData[0] || '',
      description: processedData[1] || ''
    });
  }

  onSubmit(): void {
    // Get recipe info from form
    const title = this.addForm.get('title')!.value;
    const prepTime = this.addForm.get('prepTime')!.value;
    const cookTime = this.addForm.get('cookTime')!.value;
    const totalTime = this.addForm.get('totalTime')!.value;
    const servings = this.addForm.get('servings')!.value;
    const ingrQuantity = this.addForm.get('ingrQuantity')!.value;
    const ingredient = this.addForm.get('ingredient')!.value;
    const ingrUnit = this.addForm.get('ingrUnit')!.value;
    const description = this.addForm.get('description')!.value;
    const instructions = this.addForm.get('instructions')!.value;
    const imageURL = this.addForm.get('imageURL')!.value;

    const idGenerator = new IDGenerator(); // create id generator for use on recipe, ingredients and recipe_ingredients
    const userID = this.authenticationService.getUserID();
    const newRecipeID = idGenerator.generateId();
    const ingredientID = idGenerator.generateId();

    //const ingredientList = [];
    //const newIngredient = new Ingredient(ingredientID, ingredient, 'placeholder');
    
    // Empty Placeholders
    const ingredientsList: Ingredient[] = [];
    
    //const newRecipe = new Recipe(newRecipeID, title, description, servings, prepTime, cookTime, totalTime, imageURL, userID, instructions, ingredientsList, recipeIngredientsList);

    //this.addRecipeService.uploadRecipe(newRecipe);
  }

}
