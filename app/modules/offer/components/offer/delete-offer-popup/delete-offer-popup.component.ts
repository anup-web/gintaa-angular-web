import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import * as MyOffersActions from '@gintaa/modules/my-offers/store/my-offer.actions';
import { OfferShareService } from '@gintaa/shared/services';
import { Router } from '@angular/router';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-delete-offer-popup',
  templateUrl: './delete-offer-popup.component.html',
  styleUrls: ['./delete-offer-popup.component.scss']
})
export class DeleteOfferPopupComponent implements OnInit {

  offer: Offer;
  constructor(
    private dialogRef: MatDialogRef<DeleteOfferPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private offerShareService: OfferShareService,
    private router: Router,
    private store: Store<gintaaApp.AppState>,
    ) { 
      this.offer = data.offer;
    }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

  deleteOffer() {
    if (this.offer.offerId) {
      this.offerShareService.removeOfferByOfferId(this.offer.offerId).subscribe((result) => {
        // BEFORE
        this.store.dispatch(MyOffersActions.removeOfferByOfferId({ 
          offerId: this.offer.offerId, 
          offerType: "Published" 
        }))
        this.dialogClose();
        this.router.navigateByUrl(`/my-listings`);
      });
    }
  }

}
