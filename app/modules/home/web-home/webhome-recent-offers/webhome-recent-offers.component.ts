import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { Offer } from '@gintaa/shared/models/offer';
import { Store } from '@ngrx/store';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultConfig } from '../../configs/home.constant';
import { HomeEntityService } from '../../services/home-entity.service';
import { UtilityActions } from '../../store/action-types';

@Component({
  selector: 'app-webhome-recent-offers',
  templateUrl: './webhome-recent-offers.component.html',
  styleUrls: ['./webhome-recent-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebhomeRecentOffersComponent implements OnInit {

  allRecentOffers$: Observable<Offer[]>;
  totalOffersLength$: Observable<number>;
  customOptions: OwlOptions = defaultOwlOptions;
  defaultProductsLength: number = defaultConfig.defaultProductsCount;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;
  public maxUnSlideItemNumber: number = 5;
  public staticBanners: any = [];
  public lastViewedStaticBanners: any= {
    title: "",
    dataList: []
  }
  constructor(
    private homeEntityService: HomeEntityService,
    private router: Router,
    private store: Store,
    private firebseStaticService: FirebaseStaticContentService,
  ) { }

  ngOnInit(): void {
    this.homeEntityService.clearCache();
    this.store.dispatch(
      UtilityActions.pageLoaded()
    );
    this.allRecentOffers$ = this.homeEntityService.getAll();  
    this.totalOffersLength$ = this.allRecentOffers$.pipe(map(offers => offers.length));
    const getOffLength =  this.allRecentOffers$.subscribe(offers => {if(offers.length && offers.length < 5 )
      { this.setSaticBanners(offers.length)}else{
        this.gettoalLength(offers.length);
      }
    });
    this.isShowNext = true;
  }  

  naviagteToOfferDetail(id: string) {
    this.router.navigate(['/offer', id]);
  }
  
  showAll(){
    this.router.navigate(['/show-all-offer/'],{queryParams:{'type':'recentOffers'}});
  }

  getPassedData(data: SlidesOutputData, totalLength: number) {
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
  }

  async getLastViewedOfferBannersData() {
    this.lastViewedStaticBanners = await this.firebseStaticService.getLastViewedOfferBanners();
  }

  setSaticBanners(totalItem:number){
    //console.log("totalItem",totalItem)
    if(totalItem && totalItem < this.maxUnSlideItemNumber){
      let restBannerToShow: number = this.maxUnSlideItemNumber - totalItem;
      this.staticBanners = this.lastViewedStaticBanners.dataList.slice(0, restBannerToShow);
      // console.log('staticBanners:', this.staticBanners);
    }

  }

  gettoalLength(totalItem:number){
    //console.log("totalItem Of Recent Listings",totalItem)
  }
}
