import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-my-offers-matches',
  templateUrl: './my-offers-matches.component.html',
  styleUrls: ['./my-offers-matches.component.scss']
})
export class MyOffersMatchesComponent implements OnInit {

  offerNoImage: string = 'assets/images/no-image.png';
  @Input('allMatchesOffer') allMatchesOffer: any = [];
  @Input('matchboxLoaded') matchboxLoaded: boolean = false;
  @Input('isLoggedIn') isLoggedIn: boolean = false;
  currentDealId: string = '';

  customOptions: OwlOptions = {
    animateOut: 'slideOutDown',
    items: 1,
    margin: 15,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
  }

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getOfferImage(img: any) {
    if (img && img.hasOwnProperty('url')) {
      return img['url'];
    }
    return this.offerNoImage;
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(this.router.createUrlTree([`/offer/${offerId}`]));
    window.open(url, '_blank');
  }

  navigateToMatches(offerId) {
    this.router.navigate([`show-all/${offerId}/matches`]);
  }

  errorImageHandler(event) {
    event.target.src = this.offerNoImage;
  }
  goToMatches() {
    this.router.navigate([`/matches`]);
  }

  suggestDeal() {
    try {
      if (this.currentDealId == '' && this.allMatchesOffer && this.allMatchesOffer.length && this.allMatchesOffer[0]['response']['matchCount']) {
        this.currentDealId = this.allMatchesOffer[0]['response']['hits'][0]['sourceAsMap']['oid'];
      }
    } catch (e) { }

    if (this.currentDealId) {
      this.router.navigate([`/deals/suggest/${this.currentDealId}`]);
    }
  }

  getPassedData(event) { }

  getOfferLocation(offer: any, lType = 'area') {
    if (lType == 'area') {
      if (offer && offer['location'] && offer['location']['area']) {
        return offer['location']['area'];
      } else {
        return ''
      }
    } else {
      if (offer && offer['location'] && offer['location']['zip']) {
        return offer['location']['zip'];
      } else {
        return ''
      }
    }
  }

}
