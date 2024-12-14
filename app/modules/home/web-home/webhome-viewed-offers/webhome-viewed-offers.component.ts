import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseStaticContentService } from "@gintaa/core/services/firebase-static-content.service";
import { defaultOwlOptions } from "@gintaa/shared/configs/ngx-owl-options-config";
import { Offer } from "@gintaa/shared/models/offer";
import { OwlOptions, SlidesOutputData } from "ngx-owl-carousel-o";
import { Observable } from "rxjs-compat/Observable";
import { defaultConfig } from "../../configs/home.constant";
import { HomeDataService } from "../../services/home-data.service";

@Component({
  selector: "app-webhome-viewed-offers",
  templateUrl: "./webhome-viewed-offers.component.html",
  styleUrls: ["./webhome-viewed-offers.component.scss"],
})
export class WebhomeViewedOffersComponent implements OnInit {
  
  lastViewedOffer$: Observable<Offer[]>;
  customOptions: OwlOptions = defaultOwlOptions;
  defaultProductsLength: number = defaultConfig.defaultProductsCount;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;

  @Output("checklastViewedOffer") checklastViewedOffer: EventEmitter<any> = new EventEmitter();

  public lastViewedStaticBanners: any= {
    title: "",
    dataList: []
  }
  public staticBanners: any = [];
  public maxUnSlideItemNumber: number = 5;
  public totalViewedOffer: number = 0;

  constructor(
    private router: Router,
    private homeService: HomeDataService,
    private firebseStaticService: FirebaseStaticContentService
  ) { }

  ngOnInit(): void {
    this.lastViewedOffer$ = this.homeService.getLastViewedOffers({});
    this.isShowNext = true;
    this.lastViewedOffer$.subscribe((offers)=>{
      this.totalViewedOffer = offers.length;
      this.checklastViewedOffer.emit(this.totalViewedOffer)
      this.processStaticBanners(this.totalViewedOffer);
    });
    this.getLastViewedOfferBannersData();
  }

  async getLastViewedOfferBannersData() {
    this.lastViewedStaticBanners = await this.firebseStaticService.getLastViewedOfferBanners(); 
    // console.log("===========this.lastViewedStaticBanners",this.lastViewedStaticBanners);
    this.processStaticBanners(this.totalViewedOffer);
  }

  processStaticBanners(totalItem:number) {       
    if(totalItem && totalItem < this.maxUnSlideItemNumber){
      let restBannerToShow: number = this.maxUnSlideItemNumber - totalItem;
      this.staticBanners = this.lastViewedStaticBanners.dataList.slice(0, restBannerToShow);
      // console.log('staticBanners:', this.staticBanners);
    }
  }

  navigateToOfferDetail(id: string) {
    this.router.navigate(["/offer", id]);
  }

  showAll() {
    this.router.navigate(["/show-all-offer/"], {
      queryParams: { type: "lastViewedOffers" },
    });
  }

  getPassedData(data: SlidesOutputData, totalLength: number) {
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
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
}
