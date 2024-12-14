import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridViewModule } from '@gintaa/shared/components/grid-view/grid-view.module';
import { BreadCrumbsAllModule } from '../bread-crumbs-all/bread-crumbs-all.module';
import { FavoritOffersComponent } from './favorit-offers.component';
@NgModule({
  declarations: [FavoritOffersComponent],
  imports: [
    CommonModule,
    BreadCrumbsAllModule,
    GridViewModule,
    RouterModule.forChild([
      { 
          path: '', 
          component: FavoritOffersComponent
      }
    ]),
  ],
  exports: [
    FavoritOffersComponent
  ]
})
export class FavoritOffersModule { }
