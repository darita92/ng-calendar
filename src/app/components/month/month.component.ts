import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Day } from 'src/app/interfaces/day';
import { RemindersComponent } from 'src/app/modals/reminders/reminders.component';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass']
})
export class MonthComponent implements OnInit {

  constructor(
    private calendarService: CalendarService,
    private modalService: NgbModal
  ) { }

  month: number;
  year: number;
  monthName: string;
  firstDay: number;
  monthDates = [];
  today = new Date();
  reminders = [];

  ngOnInit() {
    this.calendarService.selectedDate.subscribe(date => {
      this.month = this.calendarService.month;
      this.monthName = date.toLocaleString('default', { month: 'long' });
      this.year = this.calendarService.year;
      this.firstDay = (new Date(this.year, this.month)).getDay();
      const remindersString = localStorage.getItem('reminders');
      const reminders = JSON.parse(remindersString) || [];
      this.reminders = reminders.filter(reminder => {
        return reminder.month === this.month
          && reminder.year === this.year;
      });
      this.getMonthDays();
    });
  }

  daysInMonth() {
    return 32 - new Date(this.year, this.month, 32).getDate();
  }

  getDayReminders(day) {
    const dayReminders = this.reminders.filter(reminder => {
      return reminder.month === this.month
        && reminder.year === this.year
        && reminder.day === day;
    });

    dayReminders.sort((a, b) => {
      let dateA = `${this.year}-${this.month}-${day}`;
      dateA = `${dateA} ${a.time}`;
      const timeA = new Date(dateA);
      let dateB = `${this.year}-${this.month}-${day}`;
      dateB = `${dateB} ${b.time}`;
      const timeB = new Date(dateB);
      return timeA.getTime() - timeB.getTime();
    });

    return dayReminders;
  }

  getMonthDays() {
    this.monthDates = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < this.firstDay) {
          week.push({});
        } else if (day > this.daysInMonth()) {
          break;
        } else {
          const reminders = this.getDayReminders(day);
          week.push({
            value: day,
            reminders,
            month: this.month,
            year: this.year
          });
          day++;
        }
      }
      this.monthDates.push(week);
    }
  }

  openReminders(day: Day) {
    if (day.value) {
      const modalRef = this.modalService.open(RemindersComponent, {size: 'lg'});
      modalRef.componentInstance.day = day;
    }
  }

}
