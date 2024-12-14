import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@gintaa/core/core.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { FloatingListingModule } from '@gintaa/shared/components/floating-listing/floating-listing.module';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
import { OfferCardDefaultModule } from '@gintaa/shared/components/offer-card-default/offer-card-default.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryOffersComponent } from './components/category/category-offers/category-offers.component';
import { CategoryComponent } from './components/category/category.component';
import { LoadingSpinnerModule } from '@gintaa/shared/components/loader/loader.module';
@NgModule({
  declarations: [
    CategoryComponent,
    CategoryOffersComponent,
    CategoryListComponent
  ],
  imports: [
    RouterModule.forChild([
      { 
          path: '', 
          component: CategoryComponent
      }
    ]),
    CommonModule,
    BreadCrumbModule,
    FloatingListingModule,
    FloatingMenuModule,
    CoreModule,
    OfferCardDefaultModule,
    MatCheckboxModule,
    NgxSliderModule,
    InfiniteScrollModule,
    LoadingSpinnerModule
  ]
})
export class CategoryModule { }
