import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { selectUserAllOffers } from '@gintaa/modules/profile/store/profile.selectors';
import { ListViewConfig } from '@gintaa/shared/components/model/list-view';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-other-user-all-offer',
  templateUrl: './other-user-all-offer.component.html',
})
export class OtherUserAllOfferComponent implements OnInit, OnDestroy {

  userAllOffersSubscriber: Subscription;
  currentSectionConfig: ListViewConfig;
  pageStartIndex: number = 0;
  currentPage: number = 1;
  itemsPerpage: number = 4;
  totalItems: number = 36;
  paginationId: string = 'id';
  items:any;
  userId: string;
  userAllOffer:any;
  currentOfferId:any;
  userName:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<gintaaApp.AppState>,
    private profileService: ProfileService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
    this.route.paramMap.subscribe(params => {
      this.userId = params.get("userId");
    });

    this.route.queryParams.subscribe((params) => {
      this.currentOfferId = params.oid;
      this.userName=params.userName;
    });

    this.getOtherUserAllOffers();

    this.currentSectionConfig = {
      title: 'User listings',
      iconUrlConfig: {
        url: 'assets/images/recom-offer-icon.png',
        height: 35,
        width: 25,
        class: 'recom-image'
      },
      items: [],
      isActionButton: true,
      actionButton: {
        label: 'back',
      },
      isBreadCrumbRequired: true,
      breadCrumbText: 'User listings',
      isPaginationRequired: false,
      paginationConfig: {
        itemsPerPage: this.itemsPerpage, 
        currentPage: this.currentPage, 
        id: this.paginationId ,
        totalItems: this.totalItems
      }
    }

    this.userAllOffersSubscriber = this.store.select(selectUserAllOffers).subscribe((offerState: any) => {
      this.currentSectionConfig.items = offerState;
      if(this.currentSectionConfig.items && this.currentSectionConfig.items.length>1) {
        this.profileService.sendOtherUserAllOffer(this.currentSectionConfig);
      }
    });
  }

  getBackButtonMsg($event) {
    this.router.navigate([`profile/${this.userId}/view`]);
  }

  getBreadcrumbMsg($event) {
    this.router.navigate([`profile/${this.userId}/view`],{queryParams:{oid: this.currentOfferId,userName:this.userName}})
  }

  getOtherUserAllOffers() {
    this.store.dispatch(
      ProfileActions.fetchUserOffer({userId:this.userId})
    );
  }

  getNextPageDataMsg(pageNumber: number) {
    this.currentPage = pageNumber;
    this.currentSectionConfig.paginationConfig.currentPage = this.currentPage;
  }

  navigateToOfferPage(data:any) {
    this.router.navigate([`/offer/${data}`])
  }

  ngOnDestroy() {
    this.userAllOffersSubscriber.unsubscribe();
  }

}
