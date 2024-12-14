import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { CURRENT_PROFILE_SCREEN } from '@gintaa/modules/profile/configs/profile.config';
import { currentProfileScreen, loader } from '@gintaa/modules/profile/store/profile.selectors';
import { Observable, Subscription } from 'rxjs';
import { FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  allPossibleProfileScreen = CURRENT_PROFILE_SCREEN;
  currentProfileScreen$: Observable<string>;
  loader: boolean;
  loaderSubscriber: Subscription;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private analyticsService: FirebaseAnalyticsService
  ) {}

  ngOnInit(): void {
    this.currentProfileScreen$ = this.store.pipe(
      select(currentProfileScreen)
    );
    this.loaderSubscriber = this.store.select(loader).subscribe(loaderState => {
      this.loader = loaderState;
    })

    
    this.visitProfile();
  }

  navigateProfileScreen(currentScreen: string) {
    this.store.dispatch(
      ProfileActions.navigateProfileScreen({currentScreen})
    );
  }

  ngOnDestroy() {
    this.loaderSubscriber.unsubscribe();
  }

  visitProfile() {
    let eventName = FirebaseAnalyticsEnum.visitProfile
    this.analyticsService.logEvents(eventName);
  }

}
