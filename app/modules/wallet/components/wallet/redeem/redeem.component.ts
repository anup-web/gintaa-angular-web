import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderPaymentComponent } from '@gintaa/modules/wallet/components/wallet/order-payment/order-payment.component';
import { WalletService } from '@gintaa/modules/wallet/services/wallet.service';
import { Offer } from '@gintaa/shared/models/offer';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';


@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  redeemOffers$: Observable<any>;
  totalQuantity: number = 0;
  offers: Offer[] = [];

  constructor(
    public matDialog: MatDialog,
    private walletService: WalletService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.redeemOffers$ = this.walletService.getOffers()
    .pipe(
      map(res => res.payload || null),
      first()
    )

    // this.walletService.updateOffers$.subscribe(data => {
    //   this.updateOffer(data);
    // })
    // .subscribe(noop)
  }

  
  redeemOfferDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-offer-redeem-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '760px';
    dialogConfig.data = this.offers;

    const modalDialog = this.matDialog.open(OrderPaymentComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      // reset values on modal close
      this.offers.forEach(item => {        
        item.selectedQuantity = 1;
        item.showAddToOrder = true;
      })
      this.totalQuantity = 0;
      this.offers = [];
      if(results && results.isPaymentClicked) {
        this.router.navigate(['../mywallet'], { relativeTo: this.route });
      }
    });
  }

  addToOrderDetails(offer: any, index: number) {
    let offerTemp = {...offer};
    offer.showAddToOrder = !offer.showAddToOrder
    this.totalQuantity +=1;
    this.offers.push(offer);
  }

  clickUpdate(event:any, offer:Offer, action:string) {
    let offerTemp = {...offer};
    let update = false;
    // if(action === 'add' && (offer.selectedQuantity < offer.quantity) ){
    if(action === 'add') {
      offer.selectedQuantity = offer.selectedQuantity + 1;
      this.totalQuantity +=1;
      this.offers.forEach(item => {
        if(item.offerId === offer.offerId)
        item.selectedQuantity = offer.selectedQuantity 
      })
      update = true;
    } else if(action === 'minus' && offerTemp.selectedQuantity > 1){
      offer.selectedQuantity = offer.selectedQuantity - 1;
      this.totalQuantity -=1;
      this.offers.forEach(item => {
        if(item.offerId === offer.offerId)
        item.selectedQuantity = offer.selectedQuantity
      })
      update = true;
    }
    if(update) {
      //this.onChange.emit({offer:offerTemp, offerId:offer.offerId, actionType:this.actionType});
    }
  }

  updateOffer(data) {
    if(data.action === 'add') {
      //offer.selectedQuantity = offer.selectedQuantity + 1;
      this.totalQuantity +=1;
      this.offers.forEach(item => {
        if(item.offerId === data.offerId)
        item.selectedQuantity = data.offer.selectedQuantity 
      })
    } 
    else if(data.action === 'minus') {
      // offer.selectedQuantity = offer.selectedQuantity - 1;
      this.totalQuantity -=1;
      this.offers.forEach(item => {
        if(item.offerId === data.offerId)
        item.selectedQuantity = data.offer.selectedQuantity
      })
    }
  }

}
