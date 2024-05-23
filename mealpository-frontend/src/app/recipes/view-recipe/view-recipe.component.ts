import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../services/recipes.service';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  standalone: false,
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit {

  recipe!: Recipe;

  constructor (
    private recipesService: RecipesService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipe = this.recipesService.getViewRecipe();
  }

  onEditClick(recipe_id: string): void {

  }

  onDeleteClick(recipe_ids: string[]): void {
    const recipeDeleteSubscription = this.recipesService.deleteRecipes(recipe_ids, this.authenticationService.getUserID()).subscribe({
      next: (response) => {
        console.log("API Response: ", response);
      },
      error: (error) => {
      },
      complete: () => {
        recipeDeleteSubscription.unsubscribe();
        this.router.navigateByUrl('recipes');
      }
    });
  }

}
