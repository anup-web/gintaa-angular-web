import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@gintaa/core/services/auth.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import {
  MatchBoxAvailableTabs,
  MatchBoxConfigOptions,
  MatchBoxState,
  SearchTextCategory
} from '@gintaa/modules/match-box/models/matchbox.model';
import * as Constants from '@gintaa/config/constant.config';
import { MatchBoxActions } from '@gintaa/modules/match-box/store/action-types';
import { Subscription } from 'rxjs';
import { selectMatchBoxState, searchMatchBoxSelector } from '@gintaa/modules/match-box/store/matchbox.selectors';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FeatureListEnum, FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
@Component({
  selector: 'app-match-box',
  templateUrl: './match-box.component.html',
  styleUrls: ['./match-box.component.scss']
})
export class MatchBoxComponent implements OnInit {

  defaultFetch: MatchBoxAvailableTabs;
  currentFetch: string;
  fetchConfig: MatchBoxConfigOptions;
  selectedDealStatus = Constants.MATCH_BOX_FILTER_TYPE_EXISTING;
  currentPage = 0;
  matchCountMax: string = '4';
  allPossibleMatchTabs = MatchBoxAvailableTabs;
  matchBoxSubscription: any;
  matchBoxSearchSubscription: any;
  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';
  isLoggedIn: boolean = false;
  breadcrumb: any = [{
    name: 'Match box',
    show: true,
    click: false,
  }];
  subscription: Subscription;
  firstLoad: boolean = true;

  constructor(
    private authService: AuthService,
    private analyticsService: FirebaseAnalyticsService,
    private store: Store<gintaaApp.AppState>
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.defaultFetch = MatchBoxAvailableTabs['EXISTING_OFFER'];
      this.checkAndFetchMatchBox(this.currentFetch);
    } else {
      this.defaultFetch = MatchBoxAvailableTabs['POTENTIAL_OFFER'];
    }
  }

  ngOnInit(): void {
    this.matchBoxSubscription = this.store.select(selectMatchBoxState).subscribe((matchboxState: MatchBoxState) => {
      this.currentFetch = matchboxState.currentOption;
    });
    this.matchBoxSearchSubscription = this.store.select(searchMatchBoxSelector).subscribe((searchMatchBox: SearchTextCategory) => {
      if (searchMatchBox.reload) {
        this.checkAndFetchMatchBox(MatchBoxAvailableTabs.POTENTIAL_OFFER, searchMatchBox);
        if(this.firstLoad ){
          this.firstLoad = false;
          this.scrollToTop();
        }
      }
    });
    this.subscription = this.authService.getFirebaseLoginStatus().subscribe(data => {
      if (!data) {
        this.clearMatchBox();
      }
    });
    this.visitMatchBox();
  }
  ngOnDestroy() {
    this.matchBoxSubscription.unsubscribe();
    this.matchBoxSearchSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
  clearMatchBox() {
    this.store.dispatch(
      MatchBoxActions.clearMatchboxData()
    );
  }

  checkAndFetchMatchBox(type: any = MatchBoxAvailableTabs.EXISTING_OFFER, searchMatchBox: SearchTextCategory = null) {
    if (type) {
      this.currentFetch = type;
    }
    if (type === MatchBoxAvailableTabs.POTENTIAL_OFFER && searchMatchBox?.reload) {
      this.callMatchBoxData(searchMatchBox?.text, type, '999');
    } else if (type === MatchBoxAvailableTabs.EXISTING_OFFER) {
      this.callMatchBoxData('', type, this.matchCountMax);
    }

  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  callMatchBoxData(requestInput, type, matchCountMax = '') {
    this.fetchMatchBOx(requestInput, type, matchCountMax);
  }

  fetchMatchBOx(input: string, type: MatchBoxAvailableTabs, matchCountMax) {
    this.store.dispatch(
      MatchBoxActions.fetchMatchboxData({ input, matchBoxType: type, matchCountMax })
    );
  }

  visitMatchBox() {
    let eventName = FirebaseAnalyticsEnum.visitMatchBox;
    this.analyticsService.logEvents(eventName);
  }


}