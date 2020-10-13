import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  title: string;
  location: any;
  color: string;
  time = {
    hour: this.today.getHours(),
    minute: this.today.getMinutes()
  };
  reminder;
  constructor(
    public activeModal: NgbActiveModal,
    private locationService: LocationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(30)]
      ],
      time: ['', [
        Validators.required]
      ],
      location: ['', [
        Validators.required
      ]],
      color: ['', [
        Validators.required
      ]]
    });
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
    const controls = this.form.controls;
    const timeValue = controls.time.value;
    if (this.form.valid) {
      const time = `${timeValue.hour}:${timeValue.minute}`;
      this.reminder = {
        title: controls.title.value,
        time,
        location: controls.location.value.label,
        color: controls.color.value
      };
      this.activeModal.close(this.reminder);
    }
  }

}
