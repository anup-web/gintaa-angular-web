import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HomeDataService } from '@gintaa/modules/home/services/home-data.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-auth-match-offers',
  templateUrl: './auth-match-offers.component.html',
  styleUrls: ['./auth-match-offers.component.scss']
})
export class AuthMatchOffersComponent implements OnInit {

  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  loadAllOffers: any[] ;
  apiCalled:boolean = false;
  loading: boolean = true;
  offerNoImage: string = 'assets/images/no-image.png';
  matchBoxSubscription: any;
  arrow_left_nav:string = 'arrow_left_nav'+ Math.random();
  arrow_right_nav:string = 'arrow_right_nav'+ Math.random();

  constructor(
    private router: Router,
    private homeService: HomeDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (!this.apiCalled) {
      this.apiCalled = true;
      this.callMatchBoxData();
    }
  }

  ngOnInit() {
    if (!this.apiCalled) {
      this.apiCalled = true;
      this.callMatchBoxData();
    }
  }

  ngOnDestroy() {
    this.matchBoxSubscription.unsubscribe()
  }

  callMatchBoxData(): void {
    this.matchBoxSubscription = this.homeService.getmatchData('2').subscribe(
        offers => {
          this.loading = false;
          this.loadAllOffers = offers;
        }, err => {
          this.loading = false;
        }
    );
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
      if((this.loadAllOffers.length + 1 ) == (event.startPosition + 6)){
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

  navigateToMatches(offerId) {
    this.router.navigate([`show-all/${offerId}/matches`]);
  }

  getOfferImage(img:any) {
    if(img && img.hasOwnProperty('url') ){
      return img['url'];
    }
    return this.offerNoImage;
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/offer/${offerId}`]));
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  errorImageHandler(event) {
    event.target.src = this.offerNoImage;
  }

  addOfferItem() {
    const button = document.getElementById("openAddOfferMenu"); 
    if(button) {
      button.click();
    }
  }

  goToMatches(){
    this.router.navigate([`/matches`]);
  }

}
