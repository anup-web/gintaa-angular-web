import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmptyWishlistAnimationComponent } from '@gintaa/shared/components/animations/empty-wishlist-animation/empty-wishlist-animation.component';
import { NoOfferInWishlistAnimationComponent } from '@gintaa/shared/components/animations/no-offer-in-wishlist-animation/no-offer-in-wishlist-animation.component';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { FloatingListingModule } from '@gintaa/shared/components/floating-listing/floating-listing.module';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AddEditWishlistComponent } from './components/wishlist/add-edit-wishlist/add-edit-wishlist.component';
import { SearchTagListComponent } from './components/wishlist/search-tag-list/search-tag-list.component';
import { WishlistEditComponent } from './components/wishlist/wishlist-edit/wishlist-edit.component';
import { WishlistItemsComponent } from './components/wishlist/wishlist-items/wishlist-items.component';
import { WishlistOffersComponent } from './components/wishlist/wishlist-offers/wishlist-offers.component';
import { WishlistSearchComponent } from './components/wishlist/wishlist-search/wishlist-search.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlistEntityDataService } from './services/wishlist-entity-data-service';
import { WishlistEffects } from './store/wishlist.effects';
import { WishlistRoutingModule } from './wishlist-routing.module';

@NgModule({
  declarations: [    
  WishlistComponent, 
  WishlistOffersComponent, 
  WishlistEditComponent,
  AddEditWishlistComponent,
  SearchTagListComponent,
  WishlistItemsComponent,
  WishlistSearchComponent,
  NoOfferInWishlistAnimationComponent,
  EmptyWishlistAnimationComponent
],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    EffectsModule.forFeature([WishlistEffects]),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    CarouselModule,
    FloatingListingModule,
    FloatingMenuModule,
    PipesModule,
    BreadCrumbModule
  ]
})
export class WishlistModule { 
  constructor(
    entityDataService: EntityDataService,
    wishlistDataService: WishlistEntityDataService,
  ) {
    entityDataService.registerService('wishlist', wishlistDataService); // <-- register it
  }
}
