import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { IDGenerator } from '../../models/id_generator';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { RecipesService } from '../services/recipes.service';
import { Ingredient } from '../../models/ingredient';
import { AddRecipeService } from '../services/add-recipe.service';
import { Instruction } from '../../models/instruction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: false,
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  addForm: FormGroup
  ingredientCounter: string[];
  instructionCounter: string[];

  constructor(
    private authenticationService: AuthenticationService,
    private recipeService: RecipesService,
    private addRecipeService: AddRecipeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ingredientCounter = ['ing00000']; // use ing and a random length 8 id for each ingredient to be used for the form control name
    this.instructionCounter = ['ins00000']; // use ins and a random length 8 id for each ingredient to be used for the form control name

    this.addForm = new FormGroup({ // Add more validators
      title: new FormControl(),
      prepTime: new FormControl(),
      cookTime: new FormControl(),
      totalTime: new FormControl(),
      servings: new FormControl(),
      //ingrQuantity: new FormControl(),
      //ingredient: new FormControl(),
      //ingrUnit: new FormControl(),
      description: new FormControl(),
      instructions: new FormControl(),
      imageURL: new FormControl()
    });

    // Dynamically add controls based on ingredientCounter
    this.ingredientCounter.forEach(ingr => {
      this.addForm.addControl(ingr + 'Quantity', this.fb.control('', Validators.required));
      this.addForm.addControl(ingr + 'Unit', this.fb.control('', Validators.required));
      this.addForm.addControl(ingr + 'Ingredient', this.fb.control('', Validators.required));
    });

    // Dynamically add controls based on instructionCounter
    this.instructionCounter.forEach(inst => {
      this.addForm.addControl(inst + 'Instruction', this.fb.control('', Validators.required));
    });

  }

  onFileProcessed(processedData: string[]): void { // update form with processed OCR data
    this.addForm.patchValue({
      title: processedData[0] || '',
      description: processedData[1] || ''
    });
  }

  generateInputID(prefix: string) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let id = '';
  
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
  
    return prefix + id;
  }

  onAddIngredient(): void {
    console.log("Add Ingredient");
    const prefix = 'ing';
    const ingID = this.generateInputID(prefix);
    this.ingredientCounter.push(ingID);

    this.addForm.addControl(ingID + 'Quantity', this.fb.control('', Validators.required));
    this.addForm.addControl(ingID + 'Unit', this.fb.control('', Validators.required));
    this.addForm.addControl(ingID + 'Ingredient', this.fb.control('', Validators.required));
  }

  onAddInstruction(): void {
    console.log("Add Instruction");
    const prefix = 'ins';
    const insID = this.generateInputID(prefix);
    this.instructionCounter.push(insID);

    this.addForm.addControl(insID + 'Instruction', this.fb.control('', Validators.required));
  }

  onRemoveIngredient(ingr: string): void {
    const ingrIndex = this.ingredientCounter.indexOf(ingr);
    if (ingrIndex >= 0 && ingrIndex < this.ingredientCounter.length) {
      this.ingredientCounter.splice(ingrIndex, 1);

      // Remove the corresponding form controls
      this.addForm.removeControl(ingr + 'Quantity');
      this.addForm.removeControl(ingr + 'Unit');
      this.addForm.removeControl(ingr + 'Ingredient');
    } else {
      // index out of bounds
    }
  }

  onRemoveInstruction(inst: string): void {
    const instIndex = this.instructionCounter.indexOf(inst);
    if (instIndex >= 0 && instIndex < this.instructionCounter.length) {
      this.instructionCounter.splice(instIndex, 1);

      this.addForm.removeControl(inst + 'Instruction');
    } else {
      // index out of bounds
    }
  }

  onSubmit(): void {
    if(this.addForm.valid) {
      console.log("Form is valid. Submitting");
      const idGenerator = new IDGenerator(); // create id generator for use on recipe, ingredients and instructions
      const recipeID = idGenerator.generateId();
      const userID = this.authenticationService.getUserID();

      const title = this.addForm.get('title')!.value;
      const description = this.addForm.get('description')!.value;
      const servings = this.addForm.get('servings')!.value;
      const prepTime = this.addForm.get('prepTime')!.value;
      const cookTime = this.addForm.get('cookTime')!.value;
      const totalTime = this.addForm.get('totalTime')!.value;
      const imageURL = this.addForm.get('imageURL')!.value;

      const ingredientsList: Ingredient[] = [];
      this.ingredientCounter.forEach(ingr => {
        const ingredientID = idGenerator.generateId();

        const quantityID = ingr + 'Quantity';
        const unitID = ingr + 'Unit';
        const ingrID = ingr + 'Ingredient';

        const ingrQuantity = this.addForm.get(quantityID)!.value;
        const ingrUnit = this.addForm.get(unitID)!.value;
        const ingrIngredient = this.addForm.get(ingrID)!.value;
        const category = 'none';

        const newIngredient = new Ingredient(ingredientID, ingrIngredient, ingrQuantity, ingrUnit, category, recipeID);
        ingredientsList.push(newIngredient);
      });

      const instructionsList: Instruction[] = [];
      this.instructionCounter.forEach(inst => {
        const instructionID = idGenerator.generateId();

        const instID = inst + 'Instruction';
        const instNumber = this.instructionCounter.indexOf(inst) + 1;
        const instNumberString = instNumber.toString();
        const instruction = this.addForm.get(instID)!.value;
        const newInstruction = new Instruction(instructionID, instNumberString, instruction, recipeID);
        instructionsList.push(newInstruction);
      });

      const newRecipe = new Recipe(recipeID, title, description, servings, prepTime, cookTime, totalTime, imageURL, userID, ingredientsList, instructionsList);

      const addRecipeSubscription = this.addRecipeService.uploadRecipe(newRecipe).subscribe({
        next: (response) => {
          console.log("API Response: ", response);
        },
        error: (error) => {
        },
        complete: () => {
          addRecipeSubscription.unsubscribe();
        }
      });

      this.router.navigateByUrl('recipes');
    }
    
  }

}
