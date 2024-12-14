import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfferShareService } from '@gintaa/shared/services';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import * as MyOffersActions from '@gintaa/modules/my-offers/store/my-offer.actions';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-hide-offer-popup',
  templateUrl: './hide-offer-popup.component.html',
  styleUrls: ['./hide-offer-popup.component.scss']
})
export class HideOfferPopupComponent implements OnInit {

  offer: Offer;

  constructor(
    private dialogRef: MatDialogRef<HideOfferPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private offerShareService: OfferShareService,
    private router: Router,
    private store: Store<gintaaApp.AppState>,
  ) { 
    this.offer = data.offer;
  }

  ngOnInit(): void {}

  dialogClose() {
    this.dialogRef.close();
  }

  hideUnhideOffer() {
    if(this.offer.hidden) {
      this.offerShareService.unhideOfferDetailsByOfferId(this.offer.offerId).subscribe((result) => {
        this.dialogClose();        
        this.router.navigate(['/my-listings'], { fragment: OfferTypes.Published });
      }); 
    } else {
      this.offerShareService.hideOfferDetailsByOfferId(this.offer.offerId).subscribe((result) => {
        this.store.dispatch(MyOffersActions.removeOfferByOfferId({ offerId: this.offer.offerId, offerType: "Published" }))
        this.dialogClose();
        this.router.navigate(['/my-listings'], { fragment: OfferTypes.Hidden });
      });
    } 
  }

}
