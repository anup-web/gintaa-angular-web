import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { Offer } from '@gintaa/shared/models/offer';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultConfig } from '../../configs/home.constant';
import { HomeDataService } from '../../services/home-data.service';
@Component({
  selector: 'app-webhome-recommended-offers',
  templateUrl: './webhome-recommended-offers.component.html',
  styleUrls: ['./webhome-recommended-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebhomeRecommendedOffersComponent implements OnInit {

  recommendedOffers$: Observable<Offer[]>;
  totalLength$: Observable<number>;
  customOptions: OwlOptions = defaultOwlOptions;
  defaultProductsLength: number = defaultConfig.defaultProductsCount;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;

  constructor(
    private homeDataService: HomeDataService
  ) { }

  ngOnInit() {
    this.recommendedOffers$ = this.homeDataService.getRecommendedOffer().pipe(map(res => Object.values(res['payload'])))
    this.totalLength$ = this.recommendedOffers$.pipe(map(res => res.length));
    this.isShowNext = true;
  }
  
  getPassedData(data: SlidesOutputData, totalLength: number) {

    
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
   // console.log("==============",currentPosition,totalActiveSildes,this.isShowPrev,this.isShowNext);
  }

}
