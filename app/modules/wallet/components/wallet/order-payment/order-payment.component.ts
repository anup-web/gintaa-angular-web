import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { WalletService } from '@gintaa/modules/wallet/services/wallet.service';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {

  offers: Offer[] = [];
  @Output("offerUpdate") offerUpdate: EventEmitter<any> = new EventEmitter();
  summary = {
    coins: 0,
    cash: 0,
    gems: 0,
    money: 0
  }

  constructor(
    private dialogRef: MatDialogRef<OrderPaymentComponent>,
    private walletService: WalletService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    // console.log('Data in payment:::', data);
    this.offers = data;
  }

  ngOnInit(): void {
    this.updateSummary();
  }

  onDialogClose() {    
    this.dialogRef.close();
  }

  removeOffer(offer: Offer, index: number) {
    offer.showAddToOrder = true;
    offer.selectedQuantity = 1;
    this.summary.coins -= offer['coins'];
    this.summary.cash -= offer['cash'];
    this.summary.gems -= offer['gems'];
    this.summary.money -= offer['money'];
    
    this.offers.splice(index, 1);
  }

  clickUpdate(event:any, offer:Offer, action:string) {    
    let update = false;
    if(action === 'add') {
      offer.selectedQuantity += 1;
      this.offers.forEach(item => {
        if(item.offerId === offer.offerId)
        item.selectedQuantity = offer.selectedQuantity 
      })
      update = true;
    } else if(action === 'minus' && offer.selectedQuantity > 1){
      offer.selectedQuantity -= 1;
      this.offers.forEach(item => {
        if(item.offerId === offer.offerId)
        item.selectedQuantity = offer.selectedQuantity
      })
      update = true;
    }
    if(update) {
      // this.walletService.updateOffers.next({ offer, offerId:offer.offerId, actionType: action});
    }
  }

  updateSummary() {
    this.offers.forEach(offer => {
      this.summary.coins += offer['coins'];
      this.summary.cash += offer['cash'];
      this.summary.gems += offer['gems'];
      this.summary.money += offer['money'];      
    })
  }

  navigateToPayment() {
    this.dialogRef.close({'isPaymentClicked': true});
    //this.router.navigate(['../mywallet'], { relativeTo: this.route });
  }

}
