import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule, NgbTimepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { NewReminderComponent } from './new-reminder.component';

describe('NewReminderComponent', () => {
  let component: NewReminderComponent;
  let fixture: ComponentFixture<NewReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReminderComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbTimepickerModule,
        NgbTypeaheadModule,
        NgbModalModule,
        HttpClientModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('submitting a form creates a reminder', () => {
    expect(component.form.valid).toBeFalsy();

    component.form.controls['title'].setValue('Test');
    component.form.controls['location'].setValue({label: 'Tegucigalpa'});
    component.form.controls['time'].setValue({hour: 10, minute: 30});
    component.form.controls['color'].setValue('primary');

    expect(component.form.valid).toBeTruthy();

    component.createReminder();
    const reminder = component.reminder;
    expect(reminder.title).toEqual('Test');
    expect(reminder.time).toEqual('10:30');
    expect(reminder.location).toEqual('Tegucigalpa');
    expect(reminder.color).toEqual('primary');
  });
});
