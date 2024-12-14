import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '@gintaa/modules/offer/services/offer.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';

@Component({
  selector: 'app-potential-matches',
  templateUrl: './potential-matches.component.html',
  styleUrls: ['./potential-matches.component.scss']
})
export class PotentialMatchesComponent implements OnInit {

  @Input('offerId') offerId: string;
  title = 'angularowlslider';
  potentialMatchOffers$: Observable<any[]>;
  totalPotentialOfferLength$: Observable<number>;
  customOptions: OwlOptions;
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
    private offerService: OfferService,
    private route: ActivatedRoute,
    private firebseStaticService: FirebaseStaticContentService,
    ) { }

  ngOnInit() {
    this.getLastViewedOfferBannersData(); 
    this.customOptions = defaultOwlOptions;
    this.getPotentialMathches();
  }
  getPassedData(data: SlidesOutputData, totalLength: number) {
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
  }

  getPotentialMathches() {
    this.potentialMatchOffers$ = this.offerService.getOfferMatchesById(this.offerId)
    .pipe(
      map(offers => offers && offers['matchedOfferCount'] ? offers['hits'] : [])
      // map(offers => offers && offers['matchedOfferCount'] ? offers['offerResponseInfos'] : [])
    );
    this.totalPotentialOfferLength$ = this.potentialMatchOffers$.pipe(map(offers => offers.length));
    const getOffLength =  this.potentialMatchOffers$.subscribe(offers => {if(offers.length && offers.length < 5 ){ this.setSaticBanners(offers.length)}});
    //console.log("=========================================",getOffLength)
    this.isShowNext = true;
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

}