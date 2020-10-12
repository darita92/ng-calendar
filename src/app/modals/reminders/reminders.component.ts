import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Day } from 'src/app/interfaces/day';
import { CalendarService } from 'src/app/services/calendar.service';
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
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.month = this.calendarService.month;
    this.year = this.calendarService.year;
  }

  createReminder() {
    const modalRef = this.modalService.open(NewReminderComponent, {size: 'lg'});
    modalRef.result.then(response => {
      if (response) {
        const reminder = response;
        this.day.reminders.push(reminder);
        reminder.month = this.day.month;
        reminder.year = this.day.year;
        reminder.day = this.day.value;
        let remindersString = localStorage.getItem('reminders');
        const reminders = JSON.parse(remindersString) || [];
        reminders.push(reminder);
        remindersString = JSON.stringify(reminders);
        localStorage.setItem('reminders', remindersString);
      }
    });
  }

}
