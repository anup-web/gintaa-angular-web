import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '@gintaa/modules/offer/services/offer.service';
@Component({
  selector: 'app-user-matches-offer',
  templateUrl: './user-matches-offer.component.html',
  styleUrls: ['./user-matches-offer.component.scss']
})
export class UserMatchesOfferComponent implements OnInit {

  currentPageItems: any = [];
  offerId: string;
  isPageLoading: boolean = true;
  errorMessage: string = '';
  breadcrumb: any = [
    {
      name: 'Matches',
      link: '/matches',
    },
    {
      name: 'All Offer',
      link: '',
    }
  ];
  offerDetails: any
  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';

  constructor(
    private router: Router,
    private offerService: OfferService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.route.paramMap.subscribe(params => {
      this.offerId = params.get("offerId");
      this.getUserMatchOffer();
    });
  }

  getUserMatchOffer() {
    this.offerService.getOfferById(this.offerId).subscribe(
      offer => {
        this.offerDetails = offer
      },
      err => {
        this.offerDetails = null;
      });
    this.offerService.getOfferMatchesById(this.offerId).subscribe(
      offers => {
        this.isPageLoading = false;
        if (offers && offers['matchedOfferCount']) {
          this.currentPageItems = offers['offerResponseInfos'];
        } else {
          this.currentPageItems = [];
        }
      },
      err => {
        this.isPageLoading = false;
        this.currentPageItems = [];
    });
    
  }

  getBackButtonMsg($event) {
    this.router.navigate([`match`]);
  }

  onClickBreadCrumb(data: any) {
    this.router.navigate([data.link]);
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );
    
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
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

}
