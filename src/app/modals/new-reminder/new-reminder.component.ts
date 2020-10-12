import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-new-reminder',
  templateUrl: './new-reminder.component.html',
  styleUrls: ['./new-reminder.component.sass']
})
export class NewReminderComponent implements OnInit {
  private today = new Date();
  searching = false;
  searchFailed = false;

  title: string;
  location: any;
  color: string;
  time = {
    hour: this.today.getHours(),
    minute: this.today.getMinutes()
  };
  constructor(
    public activeModal: NgbActiveModal,
    private locationService: LocationService
  ) { }

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.locationService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      )
    )

  formatter = (x: {label: string}) => x.label;

  createReminder() {
    console.log(
      this.title,
      this.time,
      this.location,
      this.color
    )
    const time = `${this.time.hour}:${this.time.minute}`;
    const reminder = {
      title: this.title,
      time,
      location: this.location.label,
      color: this.color
    };
    this.activeModal.close(reminder);
  }

}
