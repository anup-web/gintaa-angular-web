import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class SubscriptionDisposer implements OnDestroy {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor() {
  }
   ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}