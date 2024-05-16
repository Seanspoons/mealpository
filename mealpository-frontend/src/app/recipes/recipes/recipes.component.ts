import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Recipe } from '../../models/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  /*
  - Display 6 items per page on mb
  - Display 9 items per page on md
  - Display 12 items per page on lg and above 
  */
  
  recipes: Recipe[] = [];
  searchForm: FormGroup;
  isAllActive!: boolean;
  isCategoriesActive!: boolean;
  isFavouritesActive!: boolean;
  isRecentsActive!: boolean;
  activePageNumber!: number;

  buttonOneValue!: number;
  buttonTwoValue!: number;
  buttonThreeValue!: number;

  constructor(
    private recipesService: RecipesService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    const recipeSubscription = this.recipesService.getRecipes(this.authenticationService.getUserID()).subscribe({
      next: (response) => {
        console.log("API Response: ", response);
        this.recipes = JSON.parse(response.data);
        if(this.recipes.length > 0) {
          console.log("populated recipes");
        }
      },
      error: (error) => {
      },
      complete: () => {
        recipeSubscription.unsubscribe();
      }
    });

    this.searchForm = new FormGroup({ // Add more validators
      search: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.isAllActive = this.recipesService.getIsAllActive();
    this.isCategoriesActive = this.recipesService.getIsCategoriesActive();
    this.isFavouritesActive = this.recipesService.getIsFavouritesActive();
    this.isRecentsActive = this.recipesService.getIsRecentsActive();
    this.activePageNumber = this.recipesService.getActivePageNumber();
    this.buttonOneValue = this.recipesService.getButtonOneValue();
    this.buttonTwoValue = this.recipesService.getButtonTwoValue();
    this.buttonThreeValue = this.recipesService.getButtonThreeValue();
  }

  onSubmit(): void {
  
  }

  onAddClick(): void {
    this.router.navigateByUrl('add-recipe');
  }

  onRecipeClick(recipe: Recipe): void {
    this.recipesService.setViewRecipe(recipe);
    this.router.navigateByUrl('view-recipe');
  }

  getIsPageNumberButtonActive(inputPageNumber: number): boolean {
    if(inputPageNumber === this.activePageNumber) {
      return true;
    } else {
      return false;
    }
  }

  toggleFilter(type: string): void {
    if(type === 'all') {
      this.isAllActive = true;
      this.isCategoriesActive = false;
      this.isFavouritesActive = false;
      this.isRecentsActive = false;
      this.recipesService.setButtonFlags(this.isAllActive, this.isCategoriesActive, this.isFavouritesActive, this.isRecentsActive);
    } else if(type === 'categories') {
      this.isAllActive = false;
      this.isCategoriesActive = true;
      this.isFavouritesActive = false;
      this.isRecentsActive = false;
      this.recipesService.setButtonFlags(this.isAllActive, this.isCategoriesActive, this.isFavouritesActive, this.isRecentsActive);
    } else if(type === 'favourites') {
      this.isAllActive = false;
      this.isCategoriesActive = false;
      this.isFavouritesActive = true;
      this.isRecentsActive = false;
      this.recipesService.setButtonFlags(this.isAllActive, this.isCategoriesActive, this.isFavouritesActive, this.isRecentsActive);
    } else if(type === 'recents') {
      this.isAllActive = false;
      this.isCategoriesActive = false;
      this.isFavouritesActive = false;
      this.isRecentsActive = true;
      this.recipesService.setButtonFlags(this.isAllActive, this.isCategoriesActive, this.isFavouritesActive, this.isRecentsActive);
    }
  }

  goBackPage(): void {
    if(this.activePageNumber === this.buttonThreeValue-2 && this.activePageNumber != 1) {
      this.buttonOneValue--;
      this.buttonTwoValue--;
      this.buttonThreeValue--;
    }
    if(this.activePageNumber != 1) {
      this.activePageNumber--;
    }
    this.recipesService.setActivePageNumber(this.activePageNumber);
    this.recipesService.setButtonValues(this.buttonOneValue, this.buttonTwoValue, this.buttonThreeValue);
  }

  goForwardPage(): void {
    if(this.activePageNumber === this.buttonOneValue+2) {
      this.buttonOneValue++;
      this.buttonTwoValue++;
      this.buttonThreeValue++;
    }
    this.activePageNumber++;
    this.recipesService.setActivePageNumber(this.activePageNumber);
    this.recipesService.setButtonValues(this.buttonOneValue, this.buttonTwoValue, this.buttonThreeValue);
  }

  goToPage(buttonValue: number): void {
    // TODO
  }

}
