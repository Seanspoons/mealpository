import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: boolean;
  parsingError: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginError = false;
    this.parsingError = false;
    this.loginForm = new FormGroup({ // Add more validators
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
  
      const loginSubscription = this.authenticationService.login(email, password).subscribe({
        next: (response) => { // Handle successful login
          var authToken = response.token;
          var user_id = response.user.id;
  
          const tokenSubscription = this.authenticationService.verifyToken(authToken).subscribe({
            next: (response) => { // Handle successful token verification
              console.log("API Response: ", response);
              this.handleLoginSuccess(authToken, user_id);
            },
            error: (error) => { // Handle error in token verification
              this.handleTokenVerificationError();
            },
            complete: () => { // Unsubscribe in completion of token verification
              tokenSubscription.unsubscribe();
            }
          });
        },
        error: (error) => { // Handle error in login
          this.handleLoginError(error);
        },
        complete: () => { // Unsubscribe in completion of login
          loginSubscription.unsubscribe();
        }
      });
    }
  }

  handleLoginSuccess(authToken: string, user_id: string): void {
    this.loginError = false;
    this.parsingError = false;
    this.authenticationService.setLoggedIn(true);
    this.authenticationService.setToken(authToken);
    this.authenticationService.setUserID(user_id);
    this.router.navigateByUrl('home');
  }

  handleLoginError(error: any): void {
    console.error('Login error:', error);
    this.parsingError = false;
    this.loginError = true;
  }

  handleTokenVerificationError(): void {
    this.loginError = false;
    this.parsingError = true;
  }

  onSignupClick(): void {
    this.router.navigateByUrl('signup');
  }

}