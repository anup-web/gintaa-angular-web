import { Component, Input, OnInit } from '@angular/core';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WishlistEditComponent } from '@gintaa/modules/wishlist/components/wishlist/wishlist-edit/wishlist-edit.component';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight, simpleFadeAnimation } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-wishlist-items',
  templateUrl: './wishlist-items.component.html',
  styleUrls: ['./wishlist-items.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight, simpleFadeAnimation]
})
export class WishlistItemsComponent implements OnInit {

  @Input('wishlist') allWishlist: any[];

  noImageUrl = defaultNoImage;

  constructor(
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: any) {
    // console.log('allWishlist:', changes.allWishlist.currentValue)
    // this.getTagsBySearchKeyWord(changes.allWishlist.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values
    
  }

  ishOfferDialog(){
    // console.log('open popup');
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

  removeOfferFromWishlist(wishlistIndex: number, offerIndex: number) {
    // console.log(wishlistIndex, offerIndex);
    this.allWishlist[wishlistIndex].offers.splice(offerIndex, 1);
  }

  removeWishlist(wishlistIndex: number){
    this.allWishlist.splice(wishlistIndex, 1);
  }

}
