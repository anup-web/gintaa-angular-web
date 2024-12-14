import { isPlatformBrowser } from "@angular/common";
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GridViewConfig } from "@gintaa/shared/models";
import { Offer } from "@gintaa/shared/models/offer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs-compat/Observable";
import { tap } from "rxjs/operators";
import { HomeDataService } from "../../services/home-data.service";
import { HomeEntityService } from "../../services/home-entity.service";
import { UtilityActions } from "../../store/action-types";

@Component({
  selector: "app-show-all",
  templateUrl: "./show-all.component.html",
  //styleUrls: ['./deal-skeleton.component.scss']
})
export class ShowAllComponent implements OnInit {
  data: any = null;
  type: any = null;
  isAuction: boolean = false;
  allRecentOffers$: Observable<Offer[]>;
  lastViewedSectionConfig: GridViewConfig = {
    title: "Last viewed listings",
    iconUrlConfig: {
      url: "assets/images/recent-offers-icon.png",
      height: 35,
      width: 32,
      class: "recent-image",
      flag: false,
    },
    materialIconConfig: {
      class: "material-icons title-icon-color gt-fs-35 gt-mr-5",
      flag: true,
      iconType: "schedule",
    },
    items: [],
    actionButton: {
      label: "Back",
      flag: true,
    },
  };
  recentSectionConfig: GridViewConfig = {
    title: "Recent listings",
    iconUrlConfig: {
      url: "assets/images/recent-offers-icon.png",
      height: 35,
      width: 32,
      class: "recent-image",
      flag: true,
    },
    items: [],
    actionButton: {
      label: "Back",
      flag: true,
    },
  };
  popularCategoriesConfig: GridViewConfig = {
    title: "Essential Services for you",
    iconUrlConfig: {
      url: "assets/images/recent-offers-icon.png",
      height: 35,
      width: 32,
      class: "recent-image",
      flag: true,
    },
    items: [],
    actionButton: {
      label: "Back",
      flag: true,
    },
  };

  auctionsOfTheDayConfig: GridViewConfig = {
    title: "Auctions Of The Day",
    iconUrlConfig: {
      url: "assets/images/recent-offers-icon.png",
      height: 35,
      width: 32,
      class: "recent-image",
      flag: true,
    },
    items: [],
    actionButton: {
      label: "Back",
      flag: true,
    },
  };

  breadcrumb: any = [
    {
      name: "Recent listings",
      link: "",
    },
  ];
  isPageLoading: boolean = true;

  allLastViewedOffers: Offer[];
  allPopularcategories: any[] = [];
  allAuctionsOfTheDay: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeEntityService,
    private store: Store,
    private homeDataService: HomeDataService,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ left: 0, top: 0 });
    }

    this.store.dispatch(UtilityActions.pageLoaded());
    this.activatedRoute.queryParams.subscribe((params) => {
      this.type = params.type;
    });
    if (this.type === "recentOffers") {
      // this.allRecentOffers$ = this.homeService.entities$.pipe(
      //   tap((offers) => {
      //     this.recentSectionConfig.items.push(...offers);
      //     this.breadcrumb[0] = {
      //       name: this.recentSectionConfig.title,
      //       link: "",
      //     };
      //   })
      // );
      this.breadcrumb[0] = {
        name: this.recentSectionConfig.title,
        link: "",
      };
      this._changeDetectorRef.detectChanges();
      this.allRecentOffers$ = this.homeDataService.getAllRecentOffers(32)
      .pipe(
        tap((offers) => {
          this.recentSectionConfig.items.push(...offers);
        })
      );
    } else if (this.type === "lastViewedOffers") {
      this.breadcrumb[0] = {
        name: "Last viewed listings",
        link: "",
      };
      this._changeDetectorRef.detectChanges();
      this.homeDataService.getLastViewedOffers({}).subscribe((res) => {
        this.allLastViewedOffers = res;
        this.lastViewedSectionConfig.items.push(...this.allLastViewedOffers);
      });
    } else if (this.type === "popularCategories") {
      this.homeDataService.getAllHomePageData().subscribe((res) => {
        this.allPopularcategories = [...res.popularCategory.categoryLists];
        this.popularCategoriesConfig.items.push(...this.allPopularcategories);
        this.breadcrumb[0].name = this.popularCategoriesConfig.title;
      });
    } else if (this.type === "auctionsOfTheDay") {
      if (this.homeDataService.auctionsOfTheDay.length > 0) {
        localStorage.setItem('auctionsOfTheDay', JSON.stringify(this.homeDataService.auctionsOfTheDay));
      }
      if (localStorage.getItem('auctionsOfTheDay')) {
        this.allAuctionsOfTheDay = JSON.parse(localStorage.getItem('auctionsOfTheDay'))
      }
      this.auctionsOfTheDayConfig.items.push(...this.allAuctionsOfTheDay);
      this.breadcrumb[0].name = "Auctions of the day";
      this.isAuction = true;

    }
  }

  backToHome(data: any) {
    this.router.navigate(["/home"], {
      fragment: this.type
    });
  }

  onScrollDown() {
    //   if (this.type === "lastViewedOffers") {
    //     this.homeDataService
    //       .getLastViewedOffers({ page: "1", size: "10" })
    //       .subscribe((res) => {
    //         this.allLastViewedOffers = res;
    //         this.lastViewedSectionConfig.items.push(...this.allLastViewedOffers);
    //       });
    //   }
  }
}
