import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Day } from 'src/app/interfaces/day';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { NewReminderComponent } from '../new-reminder/new-reminder.component';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.sass']
})
export class RemindersComponent implements OnInit {
  @Input() day: Day;
  month: number;
  year: number;
  constructor(
    public activeModal: NgbActiveModal,
    private calendarService: CalendarService,
    private modalService: NgbModal,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.month = this.calendarService.month;
    this.year = this.calendarService.year;
    this.sortReminders();
  }

  sortReminders() {
    this.day.reminders.sort((a, b) => {
      let dateA = `${this.year}-${this.month}-${this.day.value}`;
      dateA = `${dateA} ${a.time}`;
      const timeA = new Date(dateA);
      let dateB = `${this.year}-${this.month}-${this.day.value}`;
      dateB = `${dateB} ${b.time}`;
      const timeB = new Date(dateB);
      return timeA.getTime() - timeB.getTime();
    });
  }

  createReminder() {
    const modalRef = this.modalService.open(NewReminderComponent, {size: 'lg'});
    modalRef.result.then(response => {
      if (response) {
        const reminder = response.reminder;
        this.day.reminders.push(reminder);
        this.sortReminders();
        reminder.month = this.day.month;
        reminder.year = this.day.year;
        reminder.day = this.day.value;
        this.weatherService.getCityWeather(response.location.address.city)
        .subscribe((forecast: any) => {
          const weather = forecast.list.filter(item => {
            const itemDate = new Date(item.dt_txt);
            return itemDate.getMonth() === this.month
              && itemDate.getFullYear() === this.year
              && itemDate.getDay() === this.day.value;
          });
          if (weather.length > 0) {
            reminder.weather = weather[0].weather[0].description;
          }
          let remindersString = localStorage.getItem('reminders');
          const reminders = JSON.parse(remindersString) || [];
          reminders.push(reminder);
          remindersString = JSON.stringify(reminders);
          localStorage.setItem('reminders', remindersString);
        });
      }
    });
  }

}
