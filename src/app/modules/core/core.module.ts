import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent],
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
