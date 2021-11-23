import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from 'src/app/constants/constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router: Router) {};

  public goToMain(): void {
    this.router.navigate([paths.main]);
  }
}
