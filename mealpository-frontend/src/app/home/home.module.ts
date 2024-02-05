import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeLoggedinComponent } from './home-loggedin/home-loggedin.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeLoggedinComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
