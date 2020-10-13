import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getCityWeather(city: string) {
    return this.http.get(`api.openweathermap.org/data/2.5/weather`, {
      params: {
        appid: environment.weatherAPIKey,
        q: city
      }
    });

  }
}
