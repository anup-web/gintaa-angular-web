import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { HomeDataService } from '@gintaa/modules/home/services/home-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { OfferCategoryComponent } from '@gintaa/shared/components/offer-category/offer-category.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
@Component({
  selector: 'app-unauth-match-offers',
  templateUrl: './unauth-match-offers.component.html',
  styleUrls: ['./unauth-match-offers.component.scss']
})
export class UnauthMatchOffersComponent implements OnInit {

  private componentDestroyed$: Subject<void> = new Subject<void>();
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLElement>;
  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  searchPlaceholder: string = 'Type what you have';
  searchedOfferList: any[] = [];
  selectedCategory: string = '';
  searchVal: string = '';
  categoryList: any[] = [];
  offerNoImage: string = 'assets/images/no-image.png';
  arrow_left_nav:string = 'arrow_left_nav'+ Math.random();
  arrow_right_nav:string = 'arrow_right_nav'+ Math.random();
  matchBoxSubscription: any;

  constructor(
    private homeDataService: HomeDataService, 
    public dialog: MatDialog,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
    ) { }

  ngOnInit() {
  }

  getPassedData(event) {
    if(event.startPosition === 0){
      let element = document.getElementById(this.arrow_left_nav);
      let element2 = document.getElementById(this.arrow_right_nav);
      if(element && element2){
        element.classList.add("disabled");
        element2.classList.remove("disabled");
      }
    } else {
      let element = document.getElementById(this.arrow_left_nav);
      if(element){
        element.classList.remove("disabled");      
      }
      if((this.searchedOfferList.length + 1 ) == (event.startPosition + 6)){
        let element2 = document.getElementById(this.arrow_right_nav);
        if(element2){
          element2.classList.add("disabled");
        }
      } else{
        let element2 = document.getElementById(this.arrow_right_nav);
        if(element2){
          element2.classList.remove("disabled");
        }
      }
    }
  }
  
  search(event) {
    const searchVal: string = event.value;
    this.searchVal = searchVal;
    this.callMatchBoxApi()
  }

  changeCategory(selectedCategory) {
    this.selectedCategory = selectedCategory;
    this.callMatchBoxApi()
  }

  callMatchBoxApi() {
    this.matchBoxSubscription = this.homeDataService.getSearchOffers({ value: this.searchVal, category: this.selectedCategory, matchCountMax: '5' }).subscribe((res:any) => {
      if( res && res?.hits && res?.hits){
        this.searchedOfferList = res?.hits;
      } else {
        this.searchedOfferList = [];
      }
    }, (error) => {
      this.searchedOfferList = [];
    });
  }

  openCategoryModal() {
    const dialogConfig: MatDialogConfig = defaultDialogConfig();

    dialogConfig.id = 'create-offer-category-component';
    dialogConfig.data = {
      isDraftOffer: false,
      offerId: null,
      verticals: []
    };
    
    const dialogRef = this.dialog.open(OfferCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log()
    );

  }

  ngOnDestroy() {
    this.matchBoxSubscription.unsubscribe()
  }
  getOfferImage(img: any) {
    if (img && img.hasOwnProperty('url')) {
      return img['url'];
    }
    return this.offerNoImage;
  }
  errorImageHandler(event) {
    event.target.src = this.offerNoImage;
  }

  navigateToOffer(offerId){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );
    
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

}
