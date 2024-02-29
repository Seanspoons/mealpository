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
    this.signupForm = new FormGroup({ // Add more validators
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    
    if(this.signupForm.valid) {
      const firstName = this.signupForm.get('firstName')!.value;
      const email = this.signupForm.get('email')!.value;
      const password = this.signupForm.get('password')!.value;

      this.authenticationService.signup(firstName, email, password).subscribe(
        response => {
          console.log('Signed up:', response);
          var authToken = response.token;
          var user_id = response.user.id
          this.handleSignupSuccess(authToken, user_id);
        },
        error => {
          console.error('Signup error:', error);
          this.handleSignupError();
        }
      );
    }
  }

  handleSignupSuccess(authToken: string, user_id: string): void {
    this.signupError = false;
    this.authenticationService.setLoggedIn(true);
    this.authenticationService.setToken(authToken);
    this.authenticationService.setUserID(user_id);
    this.router.navigateByUrl('home');
  }

  handleSignupError(): void {
    this.signupError = true;
  }

  onLoginClick(): void {
    this.router.navigateByUrl('login');
  }

}
