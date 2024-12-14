import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OthersOffersComponent } from './others-offers.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';

@NgModule({
  declarations: [
    OthersOffersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    PipesModule
  ],
  exports: [
    OthersOffersComponent
  ]
})
export class OthersOffersModule { }
