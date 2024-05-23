import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { DecimalToFractionPipe } from './decimal-to-fraction.pipe';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    RecipesComponent,
    AddRecipeComponent,
    ViewRecipeComponent,
    DecimalToFractionPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadComponent,
    MatMenuModule
  ]
})
export class RecipesModule { }
