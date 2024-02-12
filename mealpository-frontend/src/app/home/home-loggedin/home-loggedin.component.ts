import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-loggedin',
  standalone: false,
  templateUrl: './home-loggedin.component.html',
  styleUrl: './home-loggedin.component.css'
})
export class HomeLoggedinComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {}

  onLogoutClick(): void {
    this.authenticationService.logout(this.authenticationService.getToken()).subscribe(
      response => {
        console.log("API Response: ", response);
        this.authenticationService.deleteToken();
        this.authenticationService.setLoggedIn(false);
        this.router.navigateByUrl('');
        window.scrollTo(0,0);
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }
}
