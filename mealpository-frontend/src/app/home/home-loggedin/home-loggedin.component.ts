import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-home-loggedin',
  standalone: false,
  templateUrl: './home-loggedin.component.html',
  styleUrl: './home-loggedin.component.css'
})
export class HomeLoggedinComponent implements OnInit {

  firstName!: string;
  currentMonth!: string;
  currentYear!: string;
  currentMonthAndYear!: string;
  datesOfWeek!: string[];
  weeksFromCurrent!: number;
  monthAndYearDifferent!: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private dateService: DateService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    // Get user's first name
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

    // Get days of the week
    this.dateService.updateDatesOfWeek();
    this.datesOfWeek = this.dateService.getCurrentDatesOfWeek();

    // Get current month and year
    this.monthAndYearDifferent = this.dateService.getMonthAndYearDifferent();
    this.currentMonth = this.dateService.getCurrentMonth();
    this.currentYear = this.dateService.getCurrentYear();
    this.currentMonthAndYear = this.dateService.getCurrentMonthAndYear();
    
    // Update weeks from current
    this.weeksFromCurrent = this.dateService.getWeeksFromCurrent();
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

  isCurrentDate(date: string): boolean {
    const currentDateObject = new Date();
    if(this.weeksFromCurrent === 0 && parseInt(date, 10) === currentDateObject.getDate()) {
      return true;
    } else {
      return false;
    }
  }

  onCalendarLeftClick() {
    this.weeksFromCurrent--;
    this.dateService.updateWeeksFromCurrent(this.weeksFromCurrent);
    this.dateService.goBackWeek(this.weeksFromCurrent);
    this.datesOfWeek = this.dateService.getCurrentDatesOfWeek();
    this.currentMonth = this.dateService.getCurrentMonth();
    this.currentYear = this.dateService.getCurrentYear();
    this.monthAndYearDifferent = this.dateService.getMonthAndYearDifferent();
    this.currentMonthAndYear = this.dateService.getCurrentMonthAndYear();
  }

  onCalendarRightClick() {
    this.weeksFromCurrent++;
    this.dateService.updateWeeksFromCurrent(this.weeksFromCurrent);
    this.dateService.goForwardWeek(this.weeksFromCurrent);
    this.datesOfWeek = this.dateService.getCurrentDatesOfWeek();
    this.currentMonth = this.dateService.getCurrentMonth();
    this.currentYear = this.dateService.getCurrentYear();
    this.monthAndYearDifferent = this.dateService.getMonthAndYearDifferent();
    this.currentMonthAndYear = this.dateService.getCurrentMonthAndYear();
  }

  returnToCurrentWeek(): void {
    if(this.weeksFromCurrent < 0) {
      this.weeksFromCurrent = 0;
      this.dateService.updateWeeksFromCurrent(this.weeksFromCurrent);
      this.dateService.goForwardWeek(0);
    } else if(this.weeksFromCurrent > 0) {
      this.weeksFromCurrent = 0;
      this.dateService.updateWeeksFromCurrent(this.weeksFromCurrent);
      this.dateService.goBackWeek(0);
    } else {
      
    }
    this.currentMonth = this.dateService.getCurrentMonth();
    this.currentYear = this.dateService.getCurrentYear();
  }
}
