import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Offer } from '@gintaa/shared/models/offer';
import moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { AuthService } from '@gintaa/core/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';



@Component({
  selector: 'app-offer-auction-card',
  templateUrl: './offer-card-auction.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardAuctionComponent implements OnInit {

  @Input() auction: any;
  @Input() offerId: string;
  @Input() actionType: string;
  @Input() showCheckbox: boolean = true;
  @Input() disabled: boolean = false;
  @Input() cardName: string = '';
  @Input() showUpdateQty: boolean = false;
  @Input() showDesire: boolean = true;
  @Input() selectedOffer: any;
  subscription: Subscription;
  timeDifference: any;
  bids: any = [];
  cdHours: any;
  cdMins: any;
  cdSecs: any;
  cdDays: any;
  userNoImg = "assets/images/user-default-img/chatu-noimg.svg";
  defaultCoverImage = 'assets/images/create-offer/uplaod-default-img.png'

  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();
  public openMenu: boolean = false;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getOfferImage(img: any) {
    if (Array.isArray(img) && img[0] && img[0].hasOwnProperty('url')) {
      return img[0]['url'];
    }
    return this.offerNoImage;
  }
  errorImageHandler(event) {
    event.target.src = this.offerNoImage;
  }
  ngOnInit(): void {

    this.fetchUserData(this.auction)
    // this.firestore.collection('auctions').doc(this.offer.offerId).collection('bids').snapshotChanges().subscribe(data=>{
    //             if(data){
    //             this.bids = data.map(e => {
    //               const b= e.payload.doc.data() as any;
    //             const bidtime={bidTime:moment(e.payload.doc.data().bidTime.toDate()).format()};
    //               return {...b,...bidtime};
    //           });
    //         }

    //           this.bids=this.bids.sort(function(a, b) {
    //             return  b.bidPrice - a.bidPrice;
    //         })
    //         console.log("bids in home page",this.bids,this.offer);

    //       });

  }


  fetchUserData(auction) {
    this.timeDifference = moment.duration(moment(auction.end).endOf('day').diff(moment()));
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(auction); });
    // this.getUserDetails(auction.offerId, auction)

    ;
    // this.finalResult = [...auctions];
    // this.homeDataService.auctionsOfTheDay = this.finalResult;
    // console.log("Final Result is", this.finalResult);
    // this._changeDetectorRef.detectChanges();
  }

  private getTimeDifference(auction) {
    this.timeDifference = moment.duration(moment(auction.end).endOf('day').diff(moment()));
    // if (this.timeDifference < 0) {
    //   console.log("here in home auctions");
    //   auctions.splice(index);
    // }
    // if (this.timeDifference < 0) {
    //   this.auctionClosed = true;
    // }
    this.allocateTimeUnits(this.timeDifference, auction);
  }

  private allocateTimeUnits(timeDifference, auction) {

    auction.cdHours = timeDifference.hours();
    auction.cdMins = timeDifference.minutes();
    auction.cdSecs = timeDifference.seconds()
    auction.cdDays = timeDifference.days()
    // this._changeDetectorRef.detectChanges();
  }

  selectOffer(event: any, offer: Offer) {
    let offerTemp = { ...this.selectedOffer };
    if (event.checked) {
      offerTemp.selectedOffer = true;
      offerTemp.selectedQuantity = 1;
    } else {
      offerTemp.selectedOffer = false;
      offerTemp.selectedQuantity = 0;
    }
    this.onChange.emit({ offer: offerTemp, offerId: offer.offerId, actionType: this.actionType });
  }

  clickUpdate(event: any, offer: Offer, action: string) {
    let offerTemp = { ...this.selectedOffer };
    let update = false;
    if (action === 'add' && (offerTemp.selectedQuantity < offer.quantity)) {
      offerTemp.selectedQuantity = offerTemp.selectedQuantity + 1;
      update = true;
    } else if (action === 'minus' && offerTemp.selectedQuantity > 1) {
      offerTemp.selectedQuantity = offerTemp.selectedQuantity - 1;
      update = true;
    }
    if (update) {
      this.onChange.emit({ offer: offerTemp, offerId: offer.offerId, actionType: this.actionType });
    }
  }

  navigateToOffer(auction) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/offer/${auction.offerId}`])
    } else {
      this.clickMenu()
      this.openLoginDialog(auction);
      // need to open login modal
    }
    //this.router.navigate([`/offer/${auction.offerId}`])
  }


  clickMenu() {
    this.openMenu = !this.openMenu;
  }

  openLoginDialog(auction: any) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
    .afterClosed().subscribe((results) => {
      // do something with results
      if(this.authService.isAuthenticated()) {
        this.router.navigate([`/offer/${auction.offerId}`])    
      }
    });
  }

  checkAuthentication(){
    if(this.authService.isAuthenticated() === true){
      return true;
    }else{
      return false;
    }
  }

  //   private getTimeDifference () {
  //     this.timeDifference=moment.duration(moment(this.offer?.auctionResponseInfo.end).diff(moment()));
  //     // if(this.timeDifference<0){
  //     //   this.auctionClosed=true;
  //     // }
  //     this.allocateTimeUnits(this.timeDifference);
  // }  
}
