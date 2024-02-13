import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @ViewChild('howItWorks') howItWorks!: ElementRef;
  loggedIn: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {
      this.loggedIn = this.authenticationService.isLoggedIn();
    }

  ngOnInit(): void {
    this.loggedIn = this.authenticationService.isLoggedIn();
  }

  onScrollClick(): void {
    console.log("Scroll click");
    const yOffset = -60;
    const targetElement = this.howItWorks.nativeElement;
    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  onLoginClick(): void {
    this.router.navigateByUrl('login');
  }

  onSignupClick(): void {
    this.router.navigateByUrl('signup');
  }

  onHomeClick(): void {
    this.router.navigateByUrl('home');
  }

}
