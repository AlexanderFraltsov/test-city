import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map  } from 'rxjs/operators';

import { openCageKey, openCageUrl } from 'src/app/constants/api-keys';
import { Coordinate } from 'src/app/models/coordinate.type';

@Injectable({
  providedIn: 'root'
})
export class OpenCageService {
  protected apiKey = openCageKey;
  private url = openCageUrl;

  private httpOptions = {
    responseType: 'json' as const
  };

  constructor(
    private http: HttpClient
  ) {}

  public getCity(coordinates: Coordinate): Observable<string | undefined> {
    const { lat, lng } = coordinates;
    const params = new HttpParams()
      .set('q', `${lat}+${lng}`)
      .set('key', this.apiKey);

    return this.http
      .get<any>(this.url, {
        ...this.httpOptions,
        params
      })
      .pipe(
        map(data => {
          const item = data.results[0].components;
          const city = item.city || item.town || item.village || item.county || item.state;
          return city;
        }),
        catchError((err: HttpErrorResponse) => {
          console.error(err.status, err.message);
          return EMPTY;
        })
      );
  }
}
