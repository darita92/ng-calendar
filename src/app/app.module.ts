import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './components/month/month.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemindersComponent } from './modals/reminders/reminders.component';
import { NgbModalModule, NgbTimepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NewReminderComponent } from './modals/new-reminder/new-reminder.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    NavigationComponent,
    RemindersComponent,
    NewReminderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbTimepickerModule,
    NgbTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RemindersComponent, NewReminderComponent]
})
export class AppModule { }
