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
import { HomeDataService } from '../../services/home-data.service';
import { defaultConfig } from '../../configs/home.constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';



@Component({
  selector: 'app-home-auctions',
  templateUrl: './home-auctions.component.html',
  styleUrls: ['./home-auctions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAuctionsComponent implements OnInit {

  public auctionStaticBanners: any = {
    title: "",
    dataList: []
  }
  public staticBanners: any = [];
  public maxUnSlideItemNumber: number = 4;
  public openMenu: boolean = false;

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

  defaultProductsLength: number = defaultConfig.defaultProductsCount;
  customOptions: OwlOptions = defaultOwlOptions;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;
  isAuth :    boolean;

  constructor(
    public matDialog: MatDialog,
    private firestore: AngularFirestore, 
    private authService: AuthService, 
    private _changeDetectorRef: ChangeDetectorRef, 
    private router: Router, 
    private homeDataService: HomeDataService,    
    private firebseStaticService: FirebaseStaticContentService
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
    if (this.authService.isAuthenticated) {
      let dateDoc = moment.tz('America/Los_Angeles').format('YYYYMMDD');
      this.isShowNext = true;
      this.auctionsOfTheDay = this.firestore.collection('auctionsOfTheDay').doc(dateDoc).collection('auctions').snapshotChanges().subscribe(
        data => {
          //console.log('======= data:', data);
          this.auctions = data.map(e => {
            const b = e.payload.doc.data() as any;
            const end = { end: moment(e.payload.doc.data().end.toDate()).format() };
            return { ...b, ...end };
          });

          this.fetchUserData(this.auctions);
        }
      )
    }

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
   // console.log('======= auctions:', auctions);
    const currentUser = this.authService.getSignInInput();
    auctions.forEach((auction, index) => {
      this.timeDifference = moment.duration(moment(auction.end).endOf('day').diff(moment()));
      if (this.timeDifference < 0) {
        auctions.splice(index);
      }
      this.subscription = interval(1000)
        .subscribe(x => { this.getTimeDifference(auctions, auction, index); });
      this.getUserDetails(auction.offerId, auction)
      if (auction.owner && (auction.owner?.identityId === currentUser?.userId)) {
        auctions.splice(index);
      }
    });
    this.finalResult = [...auctions];
    this.homeDataService.auctionsOfTheDay = this.finalResult;
    // console.log("Final Result is", this.finalResult);
    this._changeDetectorRef.detectChanges();
        
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
        this._changeDetectorRef.detectChanges();
        //this.finalResult.push(auction);
      }
    )
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
    // console.log("====Auction")
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/offer/${auction.offerId}`])
    } else {
      this.clickMenu()
      this.openLoginDialog(auction);
      // need to open login modal
    }
   
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

      // console.log("-------closed");
      // do something with results
      if(this.authService.isAuthenticated()) {
        this.router.navigate([`/offer/${auction.offerId}`])    
      }
    });
  }

  showAll() {
    this.router.navigate(["/show-all-offer/"], {
      queryParams: { type: "auctionsOfTheDay" },
    });
  }

  checkAuthentication(){
    if(this.authService.isAuthenticated() === true){
      return true;
    }else{
      return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  transform(text: string, limit: number = 10): any {
    limit = (limit) ? limit : 15;
    if(text && text.length > limit) {
      return text.substring(0, limit) + '...'
    }
    return text;
  }


}
