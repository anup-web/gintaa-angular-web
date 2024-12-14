import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { OfferCardDefaultComponent } from './offer-card-default.component';

@NgModule({
  declarations: [
    OfferCardDefaultComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    LazyLoadImageModule,
  ],
  exports: [
    OfferCardDefaultComponent,
  ]
})
export class OfferCardDefaultModule { }
