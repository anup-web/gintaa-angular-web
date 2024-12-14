import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { defaultConfigMyOffer } from '../../configs/my-offer.constant';
import { OfferTypes } from '../../configs/my-offer.enum';
import { MyOfferState } from '../../models/my-offers.model';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
  
  offerType: string = defaultConfigMyOffer.defaultOfferType;
  offerTypes: string[] = defaultConfigMyOffer.offerTypes;
  page: number = defaultConfigMyOffer.page;
  offset: number = defaultConfigMyOffer.offset;
  loggedInUserOfferState: MyOfferState;
  selected: number = 0;
  fragment: string;
  bredCrumbInput = [
    {
      name:'Listing',
      link: null,
      fragment: null,
      show: true,
      click: false,
    },
    {
      name: OfferTypes.All,
      link: null,
      show: true,
      click: false,
    }
  ];

  constructor (    
    private store: Store<gintaaApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.hideLoader();
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  setOfferStatus(data) {
    this.bredCrumbInput[1].name = data.name || OfferTypes.All;
  }  

  onScrollDown() {
    this.page++;
    // comment api call for pagination.
  }

  onScrollUp(){
    // console.log('up');
  }


}
