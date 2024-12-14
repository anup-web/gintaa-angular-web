import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { createOfferPostingLoader } from '@gintaa/modules/create-offer/store/create-offer.actions';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import moment from 'moment-timezone';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { interval, Subject, Subscription } from 'rxjs';
import { map, shareReplay, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-bids-list',
  templateUrl: './my-bids-list.component.html',
  styleUrls: ['./my-bids-list.component.scss']
})
export class MyBidsListComponent implements OnInit {
  public auctionStaticBanners: any = {
    title: "",
    dataList: []
  }
  public staticBanners: any = [];
  public maxUnSlideItemNumber: number = 4;

  bids: any = [];
  auctionsOfTheDay: any;
  auctions: DocumentData[];
  auctionsReLoaded: DocumentData[];
  auctionsLoaded: Promise<boolean>;
  finalResult: object[] = [];
  subscription: Subscription;
  timeDifference: any;
  userNoImg = "assets/images/user-default-img/chatu-noimg.svg";
  defaultCoverImage = 'assets/images/create-offer/uplaod-default-img.png'

  private readonly destroy$ = new Subject();

  customOptions: OwlOptions = defaultOwlOptions;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;

  mainAuctionList: Array<any> = [];
  bidSubscription: any;
  bidsUser : any;

  constructor(
    private firestore: AngularFirestore, 
    private authService: AuthService, 
    private _changeDetectorRef: ChangeDetectorRef, 
    private router: Router, 
    private firebseStaticService: FirebaseStaticContentService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      let dateDoc = moment.tz('America/Los_Angeles').format('YYYYMMDD');
      this.isShowNext = true;
      this.auctionsOfTheDay = this.firestore.collection('auctions', (ref) => {
        return ref.where('bidsCount','>',0)
      }).snapshotChanges().subscribe(
        data => {
          this.auctions = data.map((e: any) => {
            const b = e.payload.doc.data() as any;
            const end = { end: moment(e.payload.doc.data().end.toDate()).format() };
            return { ...b, ...end };
          });

          this.fetchUserData(this.auctions);
        }
      )}


    this.getAuctionBannersData();
  }
  
  async getAuctionBannersData() {
    this.auctionStaticBanners = await this.firebseStaticService.getAuctionBanners();    
    this.peocessStaticBanners();
  }

  peocessStaticBanners() {        
    if(this.finalResult && this.finalResult.length < this.maxUnSlideItemNumber){
      let restBannerToShow: number = this.maxUnSlideItemNumber - this.finalResult.length;
      this.staticBanners = this.auctionStaticBanners.dataList.slice(0, restBannerToShow);
      // console.log('staticBanners:', this.staticBanners, restBannerToShow, this.finalResult.length);
    }
  }

  fetchUserData(auctions) {
    const validAuctions = [];
    const currentUser = this.authService.getSignInInput();
    auctions.forEach((auction, index) => {
      this.timeDifference = moment.duration(moment(auction.end).endOf('day').diff(moment()));

      if(this.timeDifference > 0){
        this.getUserDetails(auction.offerId, auction);
      }else{
        return
      }
      //this.getUserDetails(auction.offerId, auction);

      // if (this.timeDifference > 0 && (auction.owner && (auction.owner?.identityId === currentUser?.userId))) {
      //   validAuctions.push(auction);
      // } else {
      //   return;
      // }

      //this.getUserDetails(auction.offerId, auction);
      this.subscription = interval(1000).subscribe(x => { this.getTimeDifference(auctions, auction, index); });
      //this.getUserDetails(auction.offerId, auction);
    });
    //this.mainAuctionList = this.finalResult = [...validAuctions];

    //console.log(this.finalResult);
    //this.homeDataService.auctionsOfTheDay = this.finalResult;
    // console.log("Final Result is", this.finalResult);
    //this._changeDetectorRef.detectChanges();

    this.peocessStaticBanners();





  }

  getUserDetails(offerId, auction) {

    // this.firestore.collection('auctions').doc(offerId).valueChanges().pipe(takeUntil(this.destroy$)).subscribe(
    //   data => {
    //     auction.offerCoverDetails = data;
    //     console.log(auction);
    //     this._changeDetectorRef.detectChanges();
    //     //this.finalResult.push(auction);
    //   }
    // )
    this.firestore.collection('auctions').doc(offerId).collection('bids', (ref) => { return ref.where("bidPrice", "!=", "0").orderBy("bidPrice", "desc").limit(1) }).valueChanges().pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        auction.addtionalInfo = data;
        //this._changeDetectorRef.detectChanges();
        //console.log(data);
        const currentUser = this.authService.getSignInInput();

        const check = auction.addtionalInfo.filter((item: any)=>{
           //console.log(item.userId);
           //console.log(currentUser?.userId);
           if(item.userId == currentUser?.userId){
             //console.log(auction);
             this.finalResult.push(auction);
              const key = 'offerId';
             const unique = [...new Map(this.finalResult.map((unique: any) => [unique[key], unique])).values()];
             //console.log(unique);

             this.finalResult = unique;

           }

         });

      });




  }

  // getCheckAuctions() {
  //   if (this.auctions.length) {

  //   }
  // }

  private getTimeDifference(auctions, auction, index) {
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
    this._changeDetectorRef.detectChanges();
  }

  getPassedData(data: SlidesOutputData, totalLength: number) {
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
  }

  navigateToOffer(auction) {
    this.router.navigate([`/offer/${auction.offerId}`])
  }

  showAll() {
    this.router.navigate(["/show-all-offer/"], {
      queryParams: { type: "auctionsOfTheDay" },
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.finalResult = [];
  }

  redirectToQueryUrl(item: any) {
    if(item && item['queryUrl'] && item['queryUrl'] != "") {
      let queryUrl = item['queryUrl'];
      if(item['searchText'] && item['searchText'] != "") {
        this.router.navigate([queryUrl], {queryParams: { searchText: item['searchText'] }} );
      } else {
        this.router.navigate([queryUrl]);
      }
      
    }
  }

  sendFilterData(input){
    this.finalResult =  this.mainAuctionList.filter((item: any)=>{
       return item?.name.toLowerCase().indexOf(input.toLowerCase())>-1
     })
  }

  setSearchText(input){
    
  }
}
