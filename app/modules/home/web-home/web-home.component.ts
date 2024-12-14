import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@gintaa/core/services';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { FragmentShareService } from '@gintaa/shared/services/fragment-share.service';
import { Observable, Subscription } from 'rxjs';
import { HomeDataService } from '../services/home-data.service';

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.scss']
})
export class WebHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('recommendedSection', { read: ElementRef }) recommendedSection: ElementRef;
  @ViewChild('recentOffersElementRef', { read: ElementRef }) recentOffersElementRef: ElementRef;
  elementFragment: string;
  routeSubscription: Subscription;
  allHomePageDataSub$: Subscription;
  allHomePageData$: Observable<any>;
  allPopularCategories: any;
  topBrands: any;
  offerCategories: any;
  bottomBanner: any;
  totalCategoryLength: number;
  topBrandsLength: number;
  sideBannerLength: number;
  bottomBannerLength: number;
  isLoggedIn: boolean = false;

  isEnableAuction: boolean = false;
  
  homepageBanners: any = [];

  
  public buyNewProductData: any = {
    title: "",
    productList: []
  };

  public promotionalBannersData: any = {
    title: "",
    bannerList: []
  }

  public businessBannerData: any = {};
  public socialBannerData: any = {};
  public appPromotionalBannerData: any = {};

 

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private homeDataService: HomeDataService,
    private title: Title,
    private fragmentServie: FragmentShareService,
    private firebseStaticService: FirebaseStaticContentService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.title.setTitle('gintaa');
    this.routeSubscription = this.route.fragment.subscribe((fragment) => {
      this.elementFragment = fragment;
    })

    this.allHomePageData$ = this.homeDataService.getAllHomePageData();
    this.allHomePageDataSub$ = this.allHomePageData$.subscribe(res => {
      this.bottomBanner = res.offerBottomBanner.bannerLists;
      this.bottomBannerLength = this.bottomBanner.length;
    });

    this.getBannersData();
    this.getPopularCategoryData();
    this.getgetTopBrandsData();
    this.getOfferCategoryData();
    this.getBottomBannersData();
    this.getBuyNewProductsData();
    this.getBusinessBannersData();
    this.getPromotionalBannersData();
    this.getSocialBannerData();
    this.getAppPromotionalBannerData();
    this.isAuctionEnable();
  }


  async getBannersData() {
    this.homepageBanners = await this.firebseStaticService.getBanners();   
  }

  async getPopularCategoryData() {
    this.allPopularCategories = await this.firebseStaticService.getPopularCategories();       
    this.totalCategoryLength = this.allPopularCategories.categoryLists.length;
  }

  async getgetTopBrandsData() {
    this.topBrands = await this.firebseStaticService.getTopBrands();       
    this.topBrandsLength = this.topBrands.topBrandLists.length;
  }

  async getOfferCategoryData() {
    this.offerCategories = await this.firebseStaticService.getOfferCategory();        
    this.sideBannerLength = this.offerCategories.leftBannerLists.length;
  }

  async getBottomBannersData() {
    let bottomBannerData = await this.firebseStaticService.getBottomBanners();      
    this.bottomBanner = bottomBannerData.bannerLists;    
    this.bottomBannerLength = this.bottomBanner.length;
  }

  
  async getBuyNewProductsData() {
    this.buyNewProductData = await this.firebseStaticService.getBuyNewProducts();
  }
  
  async getBusinessBannersData() {
    this.businessBannerData = await this.firebseStaticService.getBusinessBanners();
  }
  
  async getPromotionalBannersData() {
    this.promotionalBannersData = await this.firebseStaticService.getPromotionalBanners();
  }
  
  async getSocialBannerData() {
    this.socialBannerData = await this.firebseStaticService.getSocialBanners();
  }
  
  async getAppPromotionalBannerData() {
    this.appPromotionalBannerData = await this.firebseStaticService.getAppPromotionalBanners();
  }
  
  async isAuctionEnable() {
    this.isEnableAuction = await this.firebseStaticService.isEnableAuction();
  }


  isAuthenticated() {
    this.isLoggedIn = this.authService.isAuthenticated();
    return this.authService.isAuthenticated();
  }

  ngAfterViewInit() {
    this.fragmentServie.registerFragments([{
      fragmentType: 'recentOffers',
      componentRefVariableName: 'recentOffersElementRef'
    },
    {
      fragmentType: 'recommendedSection',
      componentRefVariableName: 'recommendedSection'
    }
    ]);
    this.fragmentServie.goBackToSectionWithFragment.call(this);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription)
      this.routeSubscription.unsubscribe();
    if(this.allHomePageDataSub$)
      this.allHomePageDataSub$.unsubscribe();
  }
}
