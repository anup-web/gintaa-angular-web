import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerModule } from '@gintaa/shared/components/loader/loader.module';
import { PostOfferComponent } from './post-offer.component';

@NgModule({
  declarations: [
    PostOfferComponent,
  ],
  imports: [
    CommonModule,
    LoadingSpinnerModule
  ],
  exports: [
    PostOfferComponent
  ]
})
export class PostOfferModule { }
