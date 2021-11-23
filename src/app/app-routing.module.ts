import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { paths } from './constants/constants';
import { NotFoundComponent } from './modules/core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: paths.main
  },
  {
    path: paths.main,
    loadChildren: () => import('./modules/main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: paths.time,
    loadChildren: () => import('./modules/time/time.module')
      .then(m => m.TimeModule)
  },
  {
    path: paths.city,
    loadChildren: () => import('./modules/city/city.module')
      .then(m => m.CityModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
