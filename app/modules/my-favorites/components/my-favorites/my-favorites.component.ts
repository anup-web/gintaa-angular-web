import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { FavouriteActions } from '@gintaa/modules/my-favorites/store/action-types';
import { CategoryService } from '@gintaa/shared/services/category.service';
import { CategoryConstants } from '@gintaa/shared/constants/category.constant';
import { selectFavouriteState } from '../../store/favourite.selector';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {

  currentPage: number = 0;
  pageSize: number = 10;
  myFavoriteOffers: Offer[] = [];
  bredCrumbInput = [
    {
      name:'My favourites',
      show: true,
      click: false,
    }
  ];

  constructor(
    private store: Store<gintaaApp.AppState>,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.showSkeletonLoader();
    this.emptyAllFavouriteOffers();
    this.getAllFavouriteOffers();
    this.callMockCategories();

    this.store.select(selectFavouriteState).subscribe(offers => {
      if (offers && offers.myFavoriteOffers.length > 0) {
        this.myFavoriteOffers = [...offers.myFavoriteOffers];
      }
    });
  }

  emptyAllFavouriteOffers() {
    this.store.dispatch(
      FavouriteActions.getAllFavouriteOffersEmpty()
    );
  }

  getAllFavouriteOffers(page: number = 0, size: number = this.pageSize) {
    this.store.dispatch(
      FavouriteActions.getAllFavouriteOffers({
        page
      })
    );
  }

  showSkeletonLoader() {
    this.store.dispatch(
      FavouriteActions.pageLoading()
    )
  }

  callMockCategories() {
    this.categoryService.categoryDetails('', null, this.categoryService.getCurrentIndex(), CategoryConstants.PAGE_SIZE);
  }

  onScrollDown() {
    // check the previous count before requesting again
    if (this.myFavoriteOffers.length < (this.currentPage * this.pageSize)) {
      this.currentPage = this.currentPage + 1;
      this.getAllFavouriteOffers(this.currentPage);
    } else {
      // no need to fetch
    }
  }

  currentFetchedFavouriteOfferLength() {
    return this.myFavoriteOffers.length;
  }

}
