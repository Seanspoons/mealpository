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

      const loginErrorDiv = document.getElementById('login-error');
      const parsingErrorDiv = document.getElementById('parsing-error');

      this.authenticationService.login(email, password).subscribe(
        response => {
          var authToken = response.token;
          
          this.authenticationService.verifyToken(authToken).subscribe(
            response => {
              console.log("API Response: ", response);
              if(this.loginError === true) {
                loginErrorDiv!.style.display = 'none';
                this.loginError = false;
              }
              if(this.parsingError === true) {
                parsingErrorDiv!.style.display = 'none';
                this.parsingError = false;
              }
              this.router.navigateByUrl('home-loggedin');
            },
            error => {
              console.error('Token authentication error:', error);
              if(this.loginError === true) {
                loginErrorDiv!.style.display = 'none';
                this.loginError = false;
              }
              parsingErrorDiv!.style.display = 'block';
              this.parsingError = true;
            }
          );
        },
        error => {
          console.error('Login error:', error);
          if(this.parsingError === true) {
            parsingErrorDiv!.style.display = 'none';
            this.parsingError = false;
          }
          if(this.loginError === false) {
            loginErrorDiv!.style.display = 'block';
            this.loginError = true;
          }
        }
      );
    }

  }

}
