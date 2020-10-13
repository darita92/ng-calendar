import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  search(query: string) {
    if (query === '') {
      return of([]);
    }
    return this.http
      .get('https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json',
      {
        params: {
          apiKey: environment.locationAPIKey,
          query
        }
      }).pipe(
        map((response: any) => {
          return response.suggestions;
        })
      );
  }
}
