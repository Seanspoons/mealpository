import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  loggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      this.loggedIn = this.authenticationService.isLoggedIn();
    }

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  onSignUpClick(): void {
    this.router.navigate(['/signup']);
  }

  onHomeClick(): void {
    this.router.navigate(['/home-loggedin']);
  }

}
