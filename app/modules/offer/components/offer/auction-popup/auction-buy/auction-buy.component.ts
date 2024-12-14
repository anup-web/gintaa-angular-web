import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as gintaaApp from '@gintaa/store/app.reducer';
import * as OfferAuctionAction from '@gintaa/modules/offer/store/offer-comments/offer-comment.actions';
import firebase from 'firebase/app';
@Component({
  selector: 'app-auction-buy',
  templateUrl: './auction-buy.component.html',
  styleUrls: ['./auction-buy.component.scss']
})
export class AuctionBuyComponent implements OnInit {

  @Input() offerId: string;
  @Input() buyoutPrice: any;

  errorMessage: string = null;
  constructor(
    private store: Store<gintaaApp.AppState>,
    private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.errorMessage = null;
  }

  async openSuccessModel() {
       
     
      // console.log("Arguments are", this.offerId, this.buyoutPrice);
      var functions = firebase.app().functions('asia-south1');
      const callable = functions.httpsCallable('bidAuction');
      const obs = callable({ offerId: this.offerId, bidPrice: this.buyoutPrice });
      // console.log("here in openSuccessModel", obs);
      
      obs.then(res => {
        //  const alert = await this.alertController.create({
        //    header: `Time: ${res.date}`,
        //    message: res.msg,
        //    buttons: ['OK']
        // console.log("Bid posted", res);
        if (res) {
          this.store.dispatch(
            OfferAuctionAction.redirectToAuctionSuccess()
          );
        }
      })      
      .catch((error) => {
        // Getting the Error details.
        var code          = error.code;
        this.errorMessage = error.message;
        var details       = error.details;
        // console.log('error Message:', this.errorMessage);
        // ...
      });
  }

}
