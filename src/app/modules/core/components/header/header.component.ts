import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { take, tap } from 'rxjs';

import { paths, tabs } from 'src/app/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public readonly tabs = tabs;

  public selectedIndex = 0;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.events
      .pipe(
        take(1),
        tap((event) => {
          const { url } = <{ url: string }>event;
          this.setSelectedIndex(url);
        }),
      ).subscribe();
  }

  public change({ tab: { textLabel } }: MatTabChangeEvent): void {
    const path = tabs.find(({ label }) => label === textLabel)?.path
    this.router.navigate([path]);
  }

  private cropUrlFragment(urlFragment: string): string {
    return urlFragment.replace('/', '');
  }

  private getSelectedIndex(url: string): number {
    return tabs.findIndex(({ path }) => path === <paths>url);
  }

  private setSelectedIndex(urlFragment: string): void {
    this.selectedIndex = this.getSelectedIndex(this.cropUrlFragment(urlFragment));
  }
}
