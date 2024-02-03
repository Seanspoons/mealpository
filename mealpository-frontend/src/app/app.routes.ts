import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeLoggedinComponent } from './components/home-loggedin/home-loggedin.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home-loggedin', component: HomeLoggedinComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    
];
