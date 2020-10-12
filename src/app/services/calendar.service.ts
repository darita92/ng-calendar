import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  private selectedDateSource = new BehaviorSubject(new Date());
  selectedDate = this.selectedDateSource.asObservable();
  month = this.selectedDateSource.value.getMonth();
  year = this.selectedDateSource.value.getFullYear();
  changeDate(date: Date) {
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.selectedDateSource.next(date);
  }
}
