import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { catchError, EMPTY, map, Observable } from 'rxjs';

import { Coordinate } from 'src/app/models/coordinate.type';
import { ipInfoKey, ipInfoUrl } from 'src/app/constants/api-keys';

@Injectable({
  providedIn: 'root'
})
export class IpInfoService {
  protected apiKey = ipInfoKey;
  private url = ipInfoUrl;

  private httpOptions = { responseType: 'json' as const };

  constructor(private http: HttpClient) { }

  public getCoordinates(): Observable<Coordinate | undefined> {
    const params = new HttpParams().set('token', this.apiKey);

    return this.http
      .get<any>(this.url, {
        ...this.httpOptions,
        params
      })
      .pipe(
        map(({ loc }) => {
          const [lat, lng] = loc.split(',').map((el: string): number => +el);
          return { lat, lng };
        }),
        catchError((err: HttpErrorResponse) => {
          console.error(err.status, err.message);
          return EMPTY;
        })
      );
  }
}
