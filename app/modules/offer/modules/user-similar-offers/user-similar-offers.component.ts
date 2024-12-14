import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { OfferService } from '@gintaa/modules/offer/services/offer.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { Offer } from '@gintaa/shared/models/offer';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { AuthService } from '@gintaa/core/services/auth.service';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import localization from '@gintaa/config/localization';
@Component({
  selector: 'app-user-similar-offers',
  templateUrl: './user-similar-offers.component.html',
  styleUrls: ['./user-similar-offers.component.scss']
})
export class UserSimilarOffersComponent implements OnInit {

  title = 'angularowlslider';
  @Input('offerId') offerId: string;
  similarOffers: Offer[];
  totalSimilarOfferLength: number = 0;
  customOptions: OwlOptions;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;
  public maxUnSlideItemNumber: number = 5;
  public staticBanners: any = [];
  currentOfferFavoriteStatus: boolean = null;

  public lastViewedStaticBanners: any= {
    title: "",
    dataList: []
  }

  constructor(
    private store: Store,
    private offerService: OfferService,
    private route: ActivatedRoute,
    private firebseStaticService: FirebaseStaticContentService,
    private authService: AuthService,
    private sharedService: SharedService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getLastViewedOfferBannersData(); 
    this.customOptions = defaultOwlOptions;
    this.getSimilarOffers();
  }

  getSimilarOffers() {
    this.offerService.getSimilarOffersData(this.offerId)
    .subscribe(res => {
      this.similarOffers = res;
     // console.log("================this.similarOffers",this.similarOffers);
      this.totalSimilarOfferLength = res.length;
      // console.log(" this.totalSimilarOfferLength", this.totalSimilarOfferLength);
      if(this.totalSimilarOfferLength < 5){
        this.processStaticBanners(this.totalSimilarOfferLength);
      }
    });
    this.isShowNext = true;
  }

  isFavorite(id: string) {
    
    if (!this.isAuth) { return false; }

    this.similarOffers.filter(function(obj){
      if(obj.offerId === id && obj.favourite === true){
        // console.log("=======true con")
           return true;
      }
      // console.log("=======false con")
      return false;
   });

    // if (this.similarOffers) {
    //   return this.currentOfferFavoriteStatus ?
    //     this.currentOfferFavoriteStatus
    //     : this.similarOffers.favourite;
    // } else {
    //   return false;
    // }
  }

  processStaticBanners(totalItem:number) {   
    
    // console.log("=====totalItem",totalItem);
    if(totalItem && totalItem < this.maxUnSlideItemNumber){
      let restBannerToShow: number = this.maxUnSlideItemNumber - totalItem;
      this.staticBanners = this.lastViewedStaticBanners.dataList.slice(0, restBannerToShow);
      // console.log('staticBanners:', this.staticBanners);
    }
  }

  getPassedData(data: SlidesOutputData, totalLength?: number) {
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
  }

  async getLastViewedOfferBannersData() {
    this.lastViewedStaticBanners = await this.firebseStaticService.getLastViewedOfferBanners();
    // console.log("this.lastViewedStaticBanners",this.lastViewedStaticBanners); 
 // this.processStaticBanners(this.totalViewedOffer);
  }

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }
  
  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  addOfferToFavourite(offerId: string) {
    // check login
    if (!this.isAuth) {
     this.openLoginDialog('add-to-fav', offerId);
      return;
    }
    this.showLoader();
    this.store.dispatch(
      UtilityActions.addOfferToFavourite({
        offerId
      })
    )
  }

  removeOfferFromFavourite(offerId: string) {
    this.showLoader();
    this.store.dispatch(
      UtilityActions.removeOfferFromFavourite({
        offerId
      })
    );
  }

  openLoginDialog(type: string, offerId: string) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
      .afterClosed().subscribe((results) => {
        if (this.isAuth) {
          if (type === 'add-to-fav') {
            this.addOfferToFavourite(offerId);
          } else {
            this.sharedService.showToaster(localization.others.AUTH_FAILED, 'warning');
          }
        }
      });
  }


}