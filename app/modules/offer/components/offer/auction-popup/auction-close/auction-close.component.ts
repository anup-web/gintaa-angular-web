import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import * as OfferAuctionAction from '@gintaa/modules/offer/store/offer-comments/offer-comment.actions';

@Component({
  selector: 'app-auction-close',
  templateUrl: './auction-close.component.html',
  styleUrls: ['./auction-close.component.scss']
})
export class AuctionCloseComponent implements OnInit {

  constructor(
    private store: Store<gintaaApp.AppState>
    ) { }

  ngOnInit(): void {
  }

  openBuyModel() {
    this.store.dispatch(
      OfferAuctionAction.redirectToAuctionBuy()
    );
  }

}
