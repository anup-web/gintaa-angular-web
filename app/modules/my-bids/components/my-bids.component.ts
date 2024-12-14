import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent implements OnInit {

  selected: number = 0;
  fragment: string;
  bredCrumbInput = [
    {
      name: 'My bids',
      link: null,
      fragment: null,
      show: true,
      click: false,
    }
  ];

  constructor(
    private store: Store<gintaaApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // console.log("In my bids component");
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.hideLoader();
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  setOfferStatus(data) {
    this.bredCrumbInput[1].name = data.name;
  }

  onScrollDown() {
    // this.page++;
    // comment api call for pagination.
  }

  onScrollUp() {
    // console.log('up');
  }

}
