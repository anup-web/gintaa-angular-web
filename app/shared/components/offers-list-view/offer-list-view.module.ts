import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { OffersListViewComponent } from './offers-list-view.component';

@NgModule({
  declarations: [
    OffersListViewComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    OffersListViewComponent,
  ]
})
export class OffersListViewModule { }
