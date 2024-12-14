import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectUserAllOffers } from '@gintaa/modules/profile/store/profile.selectors';
import { isPlatformBrowser } from '@angular/common';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-offer-other-user',
  templateUrl: './offer-other-user.component.html',
  styleUrls: ['./offer-other-user.component.scss']
})
export class OfferOtherUserComponent implements OnInit, OnDestroy {

  userAllOffer: Offer[] = [];
  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';
  @Output("navigateToOfferList") navigateToOfferList: EventEmitter<any> = new EventEmitter();
  @Input() userId: string;
  userAllOffersSubscriber: Subscription;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this.getUserOffers();
  }

  ngOnInit(): void {
    this.getUserOffers();
    this.userAllOffersSubscriber = this.store.select(selectUserAllOffers).subscribe((offerState: any) => {
      this.userAllOffer = offerState;
    });
  }
  getUserOffers() {
    this.store.dispatch(
      ProfileActions.fetchUserOffer({ userId: this.userId })
    );
  }
  getOfferImage(img: any) {
    if (Array.isArray(img) && img[0] && img[0].hasOwnProperty('url')) {
      return img[0]['url'];
    }
    return this.offerNoImage;
  }
  errorImageHandler(event) {
    event.target.src = this.offerNoImage;
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  viewAll() {
    this.navigateToOfferList.emit();
  }

  ngOnDestroy() {
    this.userAllOffersSubscriber.unsubscribe();
  }

}
