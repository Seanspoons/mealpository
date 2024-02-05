import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService
  ) {
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

      //this.authenticationService.signup(firstName, email, password);
    }

  }

}
