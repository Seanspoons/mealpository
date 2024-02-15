import { Injectable } from '@angular/core';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DateService {

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDatesOfWeek: string[] = [];
  currentMonth!: string;
  currentYear!: string;
  weeksFromCurrent = 0; // Initalize as 0 as we are on the current week

  constructor() {}

  updateDatesOfWeek(): void {

    if(this.weeksFromCurrent === 0) { // If we are on the current week
      this.currentDatesOfWeek = []; // Start out with an empty array which will have the 7 dates of the week in the end
      
      const startOfWeek = moment().startOf('week'); // Get the start of the week
      const endOfWeek = moment().endOf('week'); // and get the end of the week

      this.compareMonthIndex(endOfWeek, startOfWeek); // Compare months to see if week spans days in 1 or 2 months
      this.compareYears(endOfWeek, startOfWeek) // Compare years to see if week spans days in 1 or 2 years

      for(let i = 0; i < 7; i++) { // Push the days of the week onto array that we are using to keep current days of the week
        this.currentDatesOfWeek.push(startOfWeek.clone().add(i, 'days').format('D'));
      }

    } else if(this.weeksFromCurrent < 0) { // If we are a week/weeks behind the current week
      this.goBackWeek(this.weeksFromCurrent); // then use the go back function to populate the dates of the current week
    } else if(this.weeksFromCurrent > 0) { // If we are a week/weeks ahead of the current week
      this.goForwardWeek(this.weeksFromCurrent); // then use the go forward function to populate the dates of the current week
    }

  }

  goBackWeek(weeks: number): void {
    this.currentDatesOfWeek = []; // Start out with an empty array which will have the 7 dates of the week in the end

    const endOfPreviousWeek = moment().add(weeks, 'weeks').endOf('week'); // Get the end of the previous week
    const startOfPreviousWeek = moment().add(weeks, 'weeks').startOf('week'); // and get the start of the previous week

    this.compareMonthIndex(endOfPreviousWeek, startOfPreviousWeek); // Compare months to see if week spans days in 1 or 2 months
    this.compareYears(endOfPreviousWeek, startOfPreviousWeek); // Compare years to see if week spans days in 1 or 2 years

    for(let i = 0; i < 7; i++) { // Push the days of the week onto array that we are using to keep current days of the week
      this.currentDatesOfWeek.push(startOfPreviousWeek.clone().add(i, 'days').format('D'));
    }
  }

  goForwardWeek(weeks: number): void {
    this.currentDatesOfWeek = []; // Start out with an empty array which will have the 7 dates of the week in the end

    const endOfNextWeek = moment().add(weeks, 'weeks').endOf('week'); // Get the end of the next week
    const startOfNextWeek = moment().add(weeks, 'weeks').startOf('week'); // and get the start of the next week

    this.compareMonthIndex(endOfNextWeek, startOfNextWeek); // Compare months to see if week spans days in 1 or 2 months
    this.compareYears(endOfNextWeek, startOfNextWeek); // Compare years to see if week spans days in 1 or 2 years

    for(let i = 0; i < 7; i++) { // Push the days of the week onto array that we are using to keep current days of the week
      this.currentDatesOfWeek.push(startOfNextWeek.clone().add(i, 'days').format('D'));
    }
  }

  compareMonthIndex(endOfWeek: moment.Moment, startOfWeek: moment.Moment): void {
    const currentMonthIndexEnd = endOfWeek.clone().month(); // Get index of month from the end of the week
    const currentMonthIndexStart = startOfWeek.clone().month(); // and get index of the month from the start of the week

    if(currentMonthIndexEnd === currentMonthIndexStart) { // If the month is the same at the start and end of the week
      this.currentMonth = this.months[currentMonthIndexStart]; // then the current month is the index at the start (or the end as they are the same)
    } else { // Otherwise the week spans days in both months
      this.currentMonth = this.months[currentMonthIndexStart] + ' / ' + this.months[currentMonthIndexEnd]; // then take both months and store them to display
    }
  }

  compareYears(endOfWeek: moment.Moment, startOfWeek: moment.Moment): void {
    const currentYearStart = startOfWeek.clone().format('YYYY'); // Get year at beginning of week
    const currentYearEnd = endOfWeek.clone().format('YYYY'); // and get year at end of week
    // We do this in case a week spans days in two years which could happen at the end of December into January

    if(currentYearStart === currentYearEnd) { // If the year is the same at the start and end of the week
      this.currentYear = currentYearStart; // then the current year is the year the start (or at the end as they are the same)
    } else { // Otherwise the week spans days in both years
      this.currentYear = currentYearStart + ' / ' + currentYearEnd; // then take both years and store them to display
    }
  }

  getCurrentDatesOfWeek(): string[] {
    return this.currentDatesOfWeek;
  }

  getCurrentMonth(): string {
    return this.currentMonth;
  }

  getCurrentYear(): string {
    return this.currentYear;
  }

  updateWeeksFromCurrent(newWeeksFromCurrent: number): void {
    this.weeksFromCurrent = newWeeksFromCurrent;
  }

  getWeeksFromCurrent(): number {
    return this.weeksFromCurrent;
  }

}
