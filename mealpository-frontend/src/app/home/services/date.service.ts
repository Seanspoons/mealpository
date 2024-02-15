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

  constructor() { }

  updateDatesOfWeek(): void {
    const startOfWeek = moment().startOf('week');

    const currentMonthIndex = startOfWeek.clone().month();
    this.currentMonth = this.months[currentMonthIndex];
    this.currentYear = startOfWeek.clone().format('YYYY');

    for(let i = 0; i < 7; i++) {
      this.currentDatesOfWeek.push(startOfWeek.clone().add(i, 'days').format('D'));
    }
  }

  goBackWeek(weeks: number): void {
    this.currentDatesOfWeek = [];
    const startOfPreviousWeek = moment().add(weeks, 'weeks').startOf('week');
    const endOfPreviousWeek = moment().add(weeks, 'weeks').endOf('week');

    const currentMonthIndexEnd = endOfPreviousWeek.clone().month();
    const currentMonthIndexStart = startOfPreviousWeek.clone().month();
    if(currentMonthIndexEnd === currentMonthIndexStart) {
      this.currentMonth = this.months[currentMonthIndexStart];
    } else {
      this.currentMonth = this.months[currentMonthIndexStart] + ' / ' + this.months[currentMonthIndexEnd];
    }

    this.currentYear = startOfPreviousWeek.clone().format('YYYY');

    for(let i = 0; i < 7; i++) {
      this.currentDatesOfWeek.push(startOfPreviousWeek.clone().add(i, 'days').format('D'));
    }
  }

  goForwardWeek(weeks: number): void {
    this.currentDatesOfWeek = [];
    const startOfNextWeek = moment().add(weeks, 'weeks').startOf('week');
    const endOfNextWeek = moment().add(weeks, 'weeks').endOf('week');

    const currentMonthIndexEnd = endOfNextWeek.clone().month();
    const currentMonthIndexStart = startOfNextWeek.clone().month();
    if(currentMonthIndexEnd === currentMonthIndexStart) {
      this.currentMonth = this.months[currentMonthIndexStart];
    } else {
      this.currentMonth = this.months[currentMonthIndexStart] + ' / ' + this.months[currentMonthIndexEnd];
    }

    this.currentYear = startOfNextWeek.clone().format('YYYY');

    for(let i = 0; i < 7; i++) {
      this.currentDatesOfWeek.push(startOfNextWeek.clone().add(i, 'days').format('D'));
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


  /*
  minusFiveDays = this.getLastDayOfPreviousMonth() - 5;
  minusFourDays = this.getLastDayOfPreviousMonth() - 4;
  minusThreeDays = this.getLastDayOfPreviousMonth() - 3;
  minusTwoDays = this.getLastDayOfPreviousMonth() - 2;
  minusOneDays = this.getLastDayOfPreviousMonth() - 1;
  zeroDays = this.getLastDayOfPreviousMonth();
  previousMonthDates = [this.minusFiveDays, this.minusFourDays, this.minusThreeDays, this.minusTwoDays, this.minusOneDays, this.zeroDays];

  currentDatesOfWeek!: number[];
  currentWeekNumber = 0;
  currentDate = this.getDate();
  displayWeekNumber = 0;

  constructor() { }

  getMonthString(): string {
    const currentDateObject = new Date();
    const currentMonthIndex = currentDateObject.getMonth();
    const currentMonth = this.months[currentMonthIndex];

    return currentMonth;
  }

  getMonth(): number {
    const currentDateObject = new Date();
    return currentDateObject.getMonth();
  }

  getDate(): number {
    const currentDateObject = new Date();
    return currentDateObject.getDate();
  }

  setDatesOfWeek(currentDate: number): void {
    const currentDateObject = new Date();
    const currentDay = currentDateObject.getDay();

    var firstDayOfWeek = currentDate - currentDay;

    const datesOfWeek: number[] = [];

    if(firstDayOfWeek <= 0) {

      let i = firstDayOfWeek;
      while(i <= 0) {
        datesOfWeek.push(this.previousMonthDates[i+5]);
        i++;
      }

      const remainingDays = 7 + firstDayOfWeek;

      for(let i = 0; i < remainingDays; i++) {
        datesOfWeek.push(1 + i);
      }

    } else {

      for(let i = 0; i < 7; i++) {
        datesOfWeek.push(firstDayOfWeek + i);
      }

    }

    for(let i = 0; i < 7; i++) {
      console.log(datesOfWeek[i]);
    }

    this.currentDatesOfWeek = datesOfWeek;
  }

  setPreviousDatesOfWeek(): void {
    this.displayWeekNumber--;
    const currentDateObject = new Date();
    var subtractDays = this.displayWeekNumber*7;

    this.setDatesOfWeek(currentDateObject.getDate() + subtractDays);
    this.displayWeekNumber--;
  }

  setNextDatesOfWeek(): void {
    this.displayWeekNumber++;
    const currentDateObject = new Date();
    var addDays = this.displayWeekNumber*7;

    this.setDatesOfWeek(currentDateObject.getDate() + addDays);
    
  }

  getCurrentDatesOfWeek(): number[] {
    return this.currentDatesOfWeek;
  }

  getLastDayOfPreviousMonth(): number {
    const currentDateObject = new Date();
    let year = currentDateObject.getFullYear();
    let month = currentDateObject.getMonth() - 1;

    if (month < 0) { // Handle January (0)
      month = 11;
      year--;
    }

    const lastDayOfPreviousMonth = new Date(year, month + 1, 0);

    return lastDayOfPreviousMonth.getDate();
  }

  isCurrentDate(date: number): boolean {
    if(this.displayWeekNumber === 0 && this.getDate() === date) {
      return true;
    } else {
      return false;
    }
  }
  */
}
