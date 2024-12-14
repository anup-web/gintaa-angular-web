import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { WishlistEditComponent } from '@gintaa/modules/wishlist/components/wishlist/wishlist-edit/wishlist-edit.component';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectWishlistState } from '../../store/wishlist.selectors';
import * as wishlistAntion from '../../store/wishlist.actions';
import { Observable } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public wishlist: any = []

  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private wishListService: WishlistService,
  ) {}

  ngOnInit(): void {
    this.initializeData();
    this.getWishlist();
    this.store.select(selectWishlistState).subscribe(WishlistState => {
      // console.log('==== wishlist:', WishlistState);
      this.wishlist = WishlistState? WishlistState : [];
    });
  }

  initializeData(){
    this.store.dispatch(wishlistAntion.getInitialWishlistAction());
    this.wishlist= [];
  }

  getWishlist() {
    // this.store.dispatch(wishlistAntion.getWishlistAction());
    let wishlist$: Observable<any>;
    wishlist$ = this.wishListService.getWishlist();
    // const cat: any = this.wishListService.findAllCategoriesBySearchKeyWord(keyword);

    wishlist$.subscribe((result) => {
      // console.log('wishlist result:', result);
      this.wishlist = result;
    });
  }

  
  wishOfferDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '760px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(WishlistEditComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  addNewWishlist(offerItem: any) {
    this.wishlist.push(offerItem);
  }

}
