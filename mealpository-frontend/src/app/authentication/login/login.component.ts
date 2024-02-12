import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

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
    let loginFormControls = { /* Add more validators */
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
    this.loginForm = new FormGroup(loginFormControls)
  }

  onSubmit(): void {
    
    if(this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authenticationService.login(email, password).subscribe(
        response => {
          var authToken = response.token;
          
          this.authenticationService.verifyToken(authToken).subscribe(
            response => {
              console.log("API Response: ", response);
              this.loginError = false;
              this.parsingError = false;
              this.authenticationService.setLoggedIn(true);
              this.authenticationService.setToken(authToken);
              this.router.navigateByUrl('home-loggedin');
            },
            error => {
              this.loginError = false;
              this.parsingError = true;
            }
          );
        },
        error => {
          console.error('Login error:', error);
            this.parsingError = false;
            this.loginError = true;
        }
      );
    }
  }

  onSignupClick(): void {
    this.router.navigateByUrl('signup');
  }

}