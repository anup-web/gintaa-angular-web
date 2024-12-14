import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSimilarOffersComponent } from './user-similar-offers.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserSimilarOffersComponent],
  imports: [
    CommonModule,
    CarouselModule,
    PipesModule,
    RouterModule
  ],
  exports: [
    UserSimilarOffersComponent
  ]
})
export class UserSimilarOffersModule { }
