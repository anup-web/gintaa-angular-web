import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import {
  MatchBoxState
} from '@gintaa/modules/match-box/models/matchbox.model';
import { selectMatchBoxState } from '@gintaa/modules/match-box/store/matchbox.selectors';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-match-existing-offers',
  templateUrl: './match-existing-offers.component.html',
  styleUrls: ['./match-existing-offers.component.scss']
})
export class MatchExistingOffersComponent implements OnInit {

  myMatchBox:any = [];
  isPageLoading: boolean = false;
  errorMessage: string = null;
  successMessage: string = null;
  matchBoxSubscription: any;
  offerNoImage: string = 'assets/images/no-image.png';
  constructor(
    private router: Router,
    private store: Store<gintaaApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.matchBoxSubscription = this.store.select(selectMatchBoxState).subscribe((matchboxState: MatchBoxState) => {
      this.errorMessage = matchboxState.errorMessage;
      this.successMessage = matchboxState.successMessage;
      if(this.myMatchBox == null){
        this.isPageLoading = true;
      } else {
        this.isPageLoading = matchboxState.loading;
      }
      if(matchboxState.myMatchBox){
        this.myMatchBox = matchboxState.myMatchBox.existing;
      }
    });
  }
  ngOnDestroy() {
    this.matchBoxSubscription.unsubscribe();
  }


  getOfferImage(img:any){
    if(img && img.hasOwnProperty('url') ){
      return img['url'];
    }
    return this.offerNoImage;
  }

  errorImageHandler(event){
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

  navigateToMatches(offerId){
    this.router.navigate([`show-all/${offerId}/matches`]);
  }

  addOfferItem() {
    this.router.navigate(['/create', 'item']);
  }

}
