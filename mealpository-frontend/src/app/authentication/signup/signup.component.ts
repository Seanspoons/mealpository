import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;
  signupError: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.signupError = false;
    let loginFormControls = { /* Add more validators */
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
    this.signupForm = new FormGroup(loginFormControls)
  }

  onSubmit(): void {
    
    if(this.signupForm.valid) {
      const firstName = this.signupForm.get('firstName')!.value;
      const email = this.signupForm.get('email')!.value;
      const password = this.signupForm.get('password')!.value;

      this.authenticationService.signup(firstName, email, password).subscribe(
        response => {
          var authToken = response.token;
          console.log('Signed up:', response);
          this.signupError = false;
          this.authenticationService.setLoggedIn(true);
          this.authenticationService.setToken(authToken);
          this.router.navigateByUrl('home-loggedin');
        },
        error => {
          console.error('Login error:', error);
          this.signupError = true;
        }
      );
    }
  }

  onLoginClick(): void {
    this.router.navigateByUrl('login');
  }

}
