import { Injectable } from '@angular/core';

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

  buttonOneValue!: number;
  buttonTwoValue!: number;
  buttonThreeValue!: number;

  constructor() { 
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

}
