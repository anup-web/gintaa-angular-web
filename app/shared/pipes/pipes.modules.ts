import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatCoverImagePipe } from './cover-image.pipe';
import { OfferCategoryPipe } from './offer-category.pipe';
import { OfferDesirePipe } from './offer-desire.pipe';
import { OfferLocationPipe } from './offer-location.pipe';
import { TrimTextToCertainNumberCharectorPipe } from './trim-text-to-certain-number-charector.pipe';
import { FormatCoverMatchImagePipe } from './cover-match-image.pipe';
import { MultiItemItemsPipe } from './multi-item-items.pipe';

@NgModule({
  declarations: [
    FormatCoverImagePipe,
    FormatCoverMatchImagePipe,
    OfferCategoryPipe,
    OfferDesirePipe,
    OfferLocationPipe,
    TrimTextToCertainNumberCharectorPipe,
    MultiItemItemsPipe
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    FormatCoverImagePipe,
    FormatCoverMatchImagePipe,
    OfferCategoryPipe,
    OfferDesirePipe,
    OfferLocationPipe,
    TrimTextToCertainNumberCharectorPipe,
    MultiItemItemsPipe
  ]
})
export class PipesModule { }
