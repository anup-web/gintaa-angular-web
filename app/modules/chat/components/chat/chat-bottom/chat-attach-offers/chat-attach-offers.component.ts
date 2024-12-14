import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyOfferService } from '@gintaa/modules/my-offers/services/my-offer.service';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-attach-offers',
  templateUrl: './chat-attach-offers.component.html',
  styleUrls: ['./chat-attach-offers.component.scss']
})
export class ChatAttachOffersComponent implements OnInit {

  loggedInUserOffers$: Observable<any[]>;
  selectedOffers = [];
  loggedInOffers = [];
  @ViewChild('offerMsg',{ static: false}) offerMsg: ElementRef;
  notSelectedOne: boolean = false;
  noImage = defaultNoImage;
  fixedLoggedInOffers: any;
  constructor(
    private dialogRef: MatDialogRef<ChatAttachOffersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myOfferService: MyOfferService) { }

  ngOnInit() {
   this.loggedInUserOffers$ = this.myOfferService.getUserActiveOffers()
    .pipe(
      map((offers: any) => { 
        let loggedInOffers = [];
        offers.map(offer => {
          let {name, description, quantity, offerId, offerType, images, itemCondition, unitOfferValuation, activeSince} = offer;
          loggedInOffers.push({
            name, 
            description, 
            quantity, 
            offerId, 
            offerType, 
            images: images[0], 
            itemCondition, 
            unitOfferValuation, 
            activeSince, 
            checked: false});
        });
        this.fixedLoggedInOffers = this.loggedInOffers = loggedInOffers;
        return loggedInOffers;
      })
      ); 
         
  }

  closeDialog(): void {
    this.dialogRef.close({closeOfferPopUp: true});
  }

  get selectedOffersLength() {
    const offers = this.loggedInOffers ? [...this.loggedInOffers.filter(offer => offer.checked === true)] : [];
    return offers.length;
  }

  sendSelectedOffers() {
    if(this.selectedOffers.length === 0){
      this.notSelectedOne = true;
      return;
    }
    const offers = this.loggedInOffers ? [...this.loggedInOffers.filter(offer => offer.checked === true)] : [];
    const res = { status: true, offers};
    this.dialogRef.close(res);
  }

  changeCheck(event,offer){
      offer.checked = event.checked;
      this.selectedOffers = this.loggedInOffers.filter((offer)=> offer.checked);
      if(this.selectedOffers.length>0){
        this.notSelectedOne = false;
      }
  }

  filterOffer(event){
    if(event.value){
      this.loggedInOffers = this.fixedLoggedInOffers.filter((item: any)=>{
         return item.name.toLowerCase().indexOf(event.value.toLowerCase())>-1;   
      })
    } else {
      this.loggedInOffers = this.fixedLoggedInOffers;
    }
  }

}
