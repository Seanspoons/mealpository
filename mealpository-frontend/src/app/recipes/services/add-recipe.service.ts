import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddRecipeService {

  newRecipe!: Recipe;
  hasNewRecipe!: boolean;
  fileSelected: boolean = false;

  constructor(
    private http: HttpClient
  ) { 
    this.hasNewRecipe = false;
  }

  performOCR(file: File): string[] { // Adjust the return type as needed -- probably observable
    // Call backend API to perform OCR
    // You can use Angular's HttpClient to make the HTTP request
    // Adjust the API endpoint and request parameters as needed

    //return this.http.post<any>('your-backend-api-url', formData);
    console.log("here");
    return ['test', 'testdesc'];
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
