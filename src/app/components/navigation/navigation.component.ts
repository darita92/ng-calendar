import { FormStyle, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  constructor(
    private calendarService: CalendarService
  ) { }

  selectedMonth: number;
  months: string[];
  selectedYear: number;
  years = this.getYears();

  ngOnInit() {
    this.months = getLocaleMonthNames('en-us', FormStyle.Format, TranslationWidth.Abbreviated);
    this.calendarService.selectedDate.subscribe(date => {
      this.selectedMonth = this.calendarService.month;
      this.selectedYear = this.calendarService.year;
    });
  }

  getYears(): number[] {
    const start = 1990;
    const end = 2030;
    return Array(end - start + 1).fill(1).map((_, idx) => start + idx);
  }

  changeDate() {
    const newDate = new Date(this.selectedYear, this.selectedMonth);
    this.calendarService.changeDate(newDate);
  }

}
