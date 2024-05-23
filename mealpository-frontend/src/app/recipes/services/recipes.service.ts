import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Recipe } from '../../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  isAllActive!: boolean;
  isCategoriesActive!: boolean;
  isFavouritesActive!: boolean;
  isRecentsActive!: boolean;
  isPageNumberButtonActive!: boolean;
  activePageNumber!: number;
  viewRecipe!: Recipe;

  buttonOneValue!: number;
  buttonTwoValue!: number;
  buttonThreeValue!: number;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.isAllActive = true;
    this.isCategoriesActive = false;
    this.isFavouritesActive = false;
    this.isRecentsActive = false;
    this.activePageNumber = 1;
    this.buttonOneValue = 1;
    this.buttonTwoValue = 2;
    this.buttonThreeValue = 3;
   }

   getIsAllActive(): boolean {
    return this.isAllActive;
   }

   getIsCategoriesActive(): boolean {
    return this.isCategoriesActive;
   }

   getIsFavouritesActive(): boolean {
    return this.isFavouritesActive;
   }

   getIsRecentsActive(): boolean {
    return this.isRecentsActive;
   }

   getActivePageNumber(): number {
    return this.activePageNumber
   }

   getButtonOneValue(): number {
    return this.buttonOneValue;
   }

   getButtonTwoValue(): number {
    return this.buttonTwoValue;
   }

   getButtonThreeValue(): number {
    return this.buttonThreeValue;
   }

   getViewRecipe(): Recipe {
      if (!this.viewRecipe) {
        const storedRecipe = localStorage.getItem('viewRecipe');
        if (storedRecipe) {
          this.viewRecipe = JSON.parse(storedRecipe);
        }
      }
      return this.viewRecipe;
    }

   setViewRecipe(recipe: Recipe): void {
    this.viewRecipe = recipe;
    localStorage.setItem('viewRecipe', JSON.stringify(recipe));
   }

   setButtonValues(newButtonOneValue: number, newButtonTwoValue: number, newButtonThreeValue: number) {
    this.buttonOneValue = newButtonOneValue;
    this.buttonTwoValue = newButtonTwoValue;
    this.buttonThreeValue = newButtonThreeValue;
   }

   setActivePageNumber(newActivePageNumber: number): void {
    this.activePageNumber = newActivePageNumber;
   }

   setButtonFlags(isAllActiveBool: boolean, isCategoriesActiveBool: boolean, isFavouritesActiveBool: boolean, isRecentsActiveBool: boolean): void {
    this.isAllActive = isAllActiveBool;
    this.isCategoriesActive = isCategoriesActiveBool;
    this.isFavouritesActive = isFavouritesActiveBool;
    this.isRecentsActive = isRecentsActiveBool;
   }

   getRecipes(user_id: string): Observable<any> {
    const verifyURL = 'http://192.168.1.67:8000/database/get_recipes';
    const urlWithParams = `${verifyURL}?user_id=${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.authenticationService.getToken()
    });
    return this.http.get(urlWithParams, { headers });
   }

   deleteRecipes(recipe_ids: string[], user_id: string): Observable<any> {
    const deleteURL = 'http://192.168.1.67:8000/database/delete_recipes';
    const urlWithParams = `${deleteURL}?user_id=${user_id}`;
    const requestBody = JSON.stringify(recipe_ids);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.authenticationService.getToken()
    });
    return this.http.post(urlWithParams, requestBody, { headers });
   }

}
