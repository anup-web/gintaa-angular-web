import { Component, Input, OnInit } from '@angular/core';
import { OfferShareService } from '@gintaa/shared/services';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs-compat/Observable';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';

@Component({
  selector: 'app-offers-bids',
  templateUrl: './offers-bids.component.html',
  styleUrls: ['./offers-bids.component.scss']
})
export class OffersBidsComponent implements OnInit {

  @Input() selectedOfferId: any;
  @Input() bids: any;
  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  auctionDetails$: Observable<any>;
  selectedIndex: number = 0;
  userNoImg: 'assets/images/user-default-img/chatu-noimg.svg';
  constructor(private offerShareService: OfferShareService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.auctionDetails$ = this.getAuctionDetails();
    //   let abc=this.firestore.collection('auctions').doc(this.selectedOfferId).collection('bids').snapshotChanges().subscribe(data=>{
    //     this.bids = data.map(e => {
    //       const b= e.payload.doc.data() as any;
    //     const bidtime={bidTime:moment(e.payload.doc.data().bidTime.toDate()).format()};
    //       return {...b,...bidtime};
    //   });
    //   this.bids=this.bids.sort(function(a, b) {
    //     return  b.bidPrice - a.bidPrice;
    // });
    // })
  }
  getPassedData(event) {

  }

  ngOnChanges(changes: any) {
    // changes.prop contains the old and the new value...
    this.bids = changes.bids.currentValue;
    // console.log("Bids are", this.bids);
  }

  getAuctionDetails(): Observable<any> {
    return this.offerShareService.getAuctionDetails().pipe(
      map(response => response.payload.auctionOffers || []),
      // tap((res) => console.log(res))
    );
  }

  onSelect(index: number) {
    this.selectedIndex = index;
    // console.log('selectedIndex:::', this.selectedIndex);
  }

  getBids() {


  }


}
