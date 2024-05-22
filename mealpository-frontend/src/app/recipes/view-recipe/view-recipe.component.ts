import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../services/recipes.service';

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
  ) {}

  ngOnInit(): void {
    this.recipe = this.recipesService.getViewRecipe();
    console.log(this.recipe.title);
  }

}
