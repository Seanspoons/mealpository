import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuToggled: boolean = false;
  loggedIn: boolean;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  onMenuClick() {
    this.loggedIn = this.authenticationService.isLoggedIn();
    this.menuToggled = !this.menuToggled;
    if (this.menuToggled) {
      document.body.addEventListener('click', this.onClickOutside); // Listen for clicks when menu opens
    } else {
      document.body.removeEventListener('click', this.onClickOutside); // Remove listener when menu closes
    }
  }

  onClickOutside = (event: MouseEvent) => {
    // Check if the click target is outside of the menu
    if (!this.elementRef.nativeElement.contains(event.target)) { // Check for clicks ouside of the menu
      this.menuToggled = false;
      document.body.removeEventListener('click', this.onClickOutside); // Remove listener when menu closes
    }
  }

  ngOnDestroy() { 
    document.body.removeEventListener('click', this.onClickOutside); // Remove event listener if component is destroyed
  }

  onListClick(type: string): void {
    if(type === 'recipes')
      this.menuToggled = false;
      this.router.navigateByUrl('recipes'); // Need to make recipes component

    if(type === 'calendar')
      this.menuToggled = false;
      this.router.navigateByUrl('calendar'); // Need to make calendar component

    if(type === 'help')
      this.menuToggled = false;
      this.router.navigateByUrl('help'); // Need to make help component

    if(type === 'settings')
      this.menuToggled = false;
      this.router.navigateByUrl('settings'); // Need to make settings component

    if(type === 'logout') { // Need to add a prompt asking the user if they are sure
      this.menuToggled = false;
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

    if(type === 'login')
      this.menuToggled = false;
      this.router.navigateByUrl('login');
  }

}
