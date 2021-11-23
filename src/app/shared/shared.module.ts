import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { SafePipe } from './pipes/safe-pipe.pipe';

const material = [
  MatTabsModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
];

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  HttpClientJsonpModule,
  material,
];

@NgModule({
  declarations: [
    SafePipe,
  ],
  imports: modules,
  exports: [
    modules,
    SafePipe,
  ],
})
export class SharedModule {}
