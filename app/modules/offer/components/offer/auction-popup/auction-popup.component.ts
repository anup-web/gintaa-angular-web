import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs-compat/Observable';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { CURRENT_AUCTION_MODAL } from '@gintaa/modules/offer/store/offer-comments/offer-comment.action-types';
import { currentAuctionModal } from '@gintaa/modules/offer/store/offer-comments/offer-comment.selector';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-popup',
  templateUrl: './auction-popup.component.html',
  styleUrls: ['./auction-popup.component.scss']
})
export class AuctionPopupComponent implements OnInit {

  offerId: string;
  buyoutPrice:any;

  allAuctionModals = CURRENT_AUCTION_MODAL;
  currentAuctionModal$: Observable<string>;
  
  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    public dialogRef: MatDialogRef<AuctionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 

    this.offerId = data.offerId;
    this.buyoutPrice=data.buyoutPrice
  }

  ngOnInit(): void {
    // console.log("in auction offer parent",this.offerId, this.buyoutPrice)
    this.currentAuctionModal$ = this.store.pipe(
      select(currentAuctionModal)
    );
  }

  onDialogClose() {
    this.dialogRef.close();
    // this.router.navigate([`/offer/${this.offerId}`]);
  }

}
