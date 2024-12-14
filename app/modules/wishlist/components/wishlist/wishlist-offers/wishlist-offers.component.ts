import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '@gintaa/modules/wishlist/services/wishlist.service';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-offers',
  templateUrl: './wishlist-offers.component.html',
  styleUrls: ['./wishlist-offers.component.scss']
})
export class WishlistOffersComponent implements OnInit {

  
  @Input('search_key') searchKeyword: string;

  noImageUrl = defaultNoImage;
  public allRelativeOffers: any[] = [];

  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  constructor(
    private wishListService: WishlistService, 
    ) { }

  ngOnInit() {
  }
  getPassedData(event) {

  }

  ngOnChanges(changes: any) {
    // console.log('aaaaaaaa');
    this.getRelativeOffersBySearchKeyWord(changes.searchKeyword.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
  }

  getRelativeOffersBySearchKeyWord(keyword: string) {
    // console.log('keyword:', keyword);
    let relativeOffers$: Observable<any>;
    relativeOffers$ = this.wishListService.getRelativeOffers(keyword);
    // const cat: any = this.wishListService.findAllCategoriesBySearchKeyWord(keyword);

    relativeOffers$.subscribe((result) => {
      // console.log('allRelativeOffers result:', result);
      this.allRelativeOffers = result;

    });
  }

}
