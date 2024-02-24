import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';


@NgModule({
  declarations: [
    RecipesComponent,
    AddRecipeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadComponent,
  ]
})
export class RecipesModule { }
