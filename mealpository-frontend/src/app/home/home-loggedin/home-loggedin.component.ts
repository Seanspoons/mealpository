import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-loggedin',
  standalone: false,
  templateUrl: './home-loggedin.component.html',
  styleUrl: './home-loggedin.component.css'
})
export class HomeLoggedinComponent implements OnInit {

  firstName!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    const userSubscription = this.userService.getUserInfo().subscribe({
      next: (response) => { // Handle successful token verification
        //console.log("API Response: ", response);
        this.firstName = response.data.first_name;
      },
      error: (error) => { // Handle error in token verification
        this.firstName = '';
      },
      complete: () => { // Unsubscribe in completion of token verification
        userSubscription.unsubscribe();
      }
    });
  }

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
