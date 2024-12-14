import { Component, OnInit, Input, Inject, PLATFORM_ID,  ElementRef, ViewChild,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectMatchBoxState } from '@gintaa/modules/match-box/store/matchbox.selectors';
import { MatchBoxActions } from '@gintaa/modules/match-box/store/action-types';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-match-potential-offers',
  templateUrl: './match-potential-offers.component.html',
  styleUrls: ['./match-potential-offers.component.scss']
})
export class MatchPotentialOffersComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  myMatchBox:any = [];
  apiLoaded: boolean = false;
  isPageLoading: boolean = true;
  errorMessage: string = null;
  successMessage: string = null;
  offerNoImage: string = 'assets/images/no-image.png';
  selectedCategory: string = '';
  matchBoxSubscription: any;
  searchVal: string = '';
  categoryList: any = [{
    id:1,
    name:'Category 1'
  },
  {
    id:2,
    name:'Category 2'
  },
  {
    id:3,
    name:'Category 3'
  }];
  @Input('isLoggedIn') isLoggedIn: boolean = true;
  
  constructor(
    private router: Router,
    private store: Store<gintaaApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
   }

  ngOnInit(): void {
    this.matchBoxSubscription = this.store.select(selectMatchBoxState).subscribe((matchboxState: any) => {
      if(matchboxState.myMatchBox.potential && matchboxState.myMatchBox.potential && matchboxState.myMatchBox.potential?.hits){
        this.myMatchBox = matchboxState.myMatchBox.potential?.hits;
      } else {
        this.myMatchBox = [];
      }
      this.errorMessage = matchboxState.errorMessage;
      this.successMessage = matchboxState.successMessage;
      if(!this.isLoggedIn){
        this.isPageLoading = false;
      } else{
        this.isPageLoading = matchboxState.loading;
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

  changeCategory(selectedCategory){
    this.selectedCategory = selectedCategory;
    this.searchMatchBox();
  }

  onChangeEvent(e){
    const searchVal: string = e?.value;
    this.searchVal = searchVal;
    if(this.searchVal== '' || this.searchVal.length > 3){
      this.searchMatchBox();
    } else {
      this.myMatchBox = [];
      this.apiLoaded = false;
    }

  }

  searchMatchBox(){
    this.apiLoaded = true;
    const searchMatchBox = {
      reload: true,
      text : this.searchVal,
      category : this.selectedCategory
    }
    this.store.dispatch(
      MatchBoxActions.changeSearchMatchBox({ searchMatchBox })
    );
    
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
