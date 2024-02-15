import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';



@NgModule({
  declarations: [
    ShoppingListComponent,
  ],
  imports: [
    CommonModule,
    ShoppingListComponent,
  ]
})
export class ShoppingListModule { }
