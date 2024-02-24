import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class AddRecipeService {

  newRecipe!: Recipe;
  hasNewRecipe!: boolean;
  fileSelected: boolean = false;

  constructor() { 
    this.hasNewRecipe = false;
  }

  preformOCR(file: File): [] { // Not sure what data type is going to be returned yet
    return [];
  }

  setNewRecipe(recipe: Recipe): void {
    this.newRecipe = recipe;
  }

  setHasNewRecipe(bool: boolean): void {
    this.hasNewRecipe = bool;
  }

  getNewRecipe(): Recipe {
    return this.newRecipe;
  }

  getHasNewRecipe(): boolean {
    return this.hasNewRecipe;
  }
}
