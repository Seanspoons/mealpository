import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import routes from './app.routes';
import { HomeModule } from './home/home.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HeaderComponent,
    FooterComponent,
    RouterModule.forRoot(routes),
    HomeModule,
    AuthenticationModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync('noop')
  ]
})
export class AppModule { }
