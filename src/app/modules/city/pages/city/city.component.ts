import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { shareReplay, switchMap, tap } from 'rxjs';

import { GLOBALS } from 'src/app/constants/constants';
import { IpInfoService } from '../../services/ip-info.service';
import { OpenCageService } from '../../services/open-cage.service';

// https://material.angular.io/components/input/examples
class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  public city = '';

  public cityUrl = '';

  public cityFormControl = new FormControl('', [Validators.required, Validators.minLength(GLOBALS.MIN_LENGHT_OF_CITY_QUERY)]);

  public matcher = new MyErrorStateMatcher();

  constructor(private openCageService: OpenCageService, private ipInfo: IpInfoService) {}

  public ngOnInit(): void {
    const coordinates$ = this.ipInfo.getCoordinates().pipe(shareReplay(1));

    coordinates$.pipe(
      switchMap((coordinates) => coordinates
        ? this.openCageService.getCity(coordinates)
        : this.openCageService.getCity({lat: 0, lng: 0})
      ),
      tap((city) => {
        city && this.showCity(city);
      }),
      shareReplay(1),
    ).subscribe();
  }

  public showCityOnSubmit(): void {
    this.showCity(this.cityFormControl.value);
  }

  public clearCity(): void {
    this.cityFormControl.setValue('');
  }

  private showCity(city: string): void {
    this.city = city;
    this.cityUrl = `https://ru.wikipedia.org/wiki/${city}`;
  }

  public onSubmit(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.cityFormControl.valid) {
      event.preventDefault();
      this.showCityOnSubmit();
    }
  }
}
