import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HomeLoggedinComponent } from './home/home-loggedin/home-loggedin.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/auth.guard';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeLoggedinComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard] },
    { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] }
    
];

export default routes;