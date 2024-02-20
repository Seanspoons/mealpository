import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    ShoppingListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
  ]
})
export class ShoppingListModule { }
