import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './pages/city/city.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CityComponent,
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule,
  ]
})
export class CityModule { }
