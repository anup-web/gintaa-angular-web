import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { CreateOfferActions } from './store/action-types';
import { ShowOtherOfferTabs } from './store/models/create-offer';
import { selectOfferOtherTabs } from './store/selectors/create-offer.selectors';

export interface IMenu {
  path: string;
  name: string;
  displayName?: string;
  index: number;
}

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  activeLinkIndex = -1;
  _menus: IMenu[];
  showOtherTabs: ShowOtherOfferTabs;

    breadcrumb: any = [{
      name: 'Create listing',
      show: true,
      click: false,
  }];

  constructor(
    private router: Router,
    private store: Store<gintaaApp.AppState>,
    private firebseStaticService: FirebaseStaticContentService
  ) {
    this._menus = [
      { name: 'Item', displayName: 'Product', path: '/listing/item', index: 0 } as IMenu,
      { name: 'Service', displayName: 'Service', path: '/listing/service', index: 1 } as IMenu,
      // { name: 'Auction', displayName: 'Auction', path: '/listing/auction', index: 2 } as IMenu,
    ];
    this.isAuctionEnable()
  }

  ngOnInit(): void {

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this._menus.indexOf(this._menus.find
        (tab => tab.path === '.' + this.router.url));
    });
    this.fetchCategories();

    this.store.select(selectOfferOtherTabs).subscribe(showOtherTabs => {
      this.showOtherTabs = { ...showOtherTabs };
    })
  }

  //fetching category list and storing it in store for dropdown
  fetchCategories() {
    this.store.dispatch(CreateOfferActions.fetchOfferInitialData({ offerType: "item" }));
  }

  async isAuctionEnable() {
    const isEnableAuction: boolean = await this.firebseStaticService.isEnableAuction();
    if(isEnableAuction) {
      this._menus.push(
        { name: 'Auction', displayName: 'Auction', path: '/listing/auction', index: 2 } as IMenu
      )
    }
  }
}
