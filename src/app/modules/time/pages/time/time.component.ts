import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, interval, Subscription, tap } from 'rxjs';

import { GLOBALS } from 'src/app/constants/constants';
import { UTILS } from 'src/app/utils';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  public time = new BehaviorSubject<Date>(UTILS.getActualDate());

  constructor() { }

  public ngOnInit(): void {
    const source = interval(GLOBALS.ONE_SECOND_IN_MS).pipe(
      tap(() => this.time.next(UTILS.getActualDate())),
    );

    this.subscription.add(source.subscribe());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.time.unsubscribe();
  }
}
