# Simple NG Calendar

Simple Calendar to Navigate between months and set reminders.

Reminders are saved on localstorage.

APIs used:

- GEOCoder Autocomplete: to get address suggestion.
- OpenWeather: To get weather forecast for reminder date, forecast is only for 5 days si if not on those dates weather won't be provided.

Calendar will display first 3 reminders, and show and indicator of how much more appointments are in the day.

[DEMO Site](https://nifty-mestorf-ad51e0.netlify.app/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
