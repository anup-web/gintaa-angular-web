import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotentialMatchesComponent } from './potential-matches.component';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PotentialMatchesComponent],
  imports: [
    CommonModule,
    PipesModule,
    CarouselModule,
    RouterModule
  ],
  exports: [
    PotentialMatchesComponent
  ]
})
export class PotentialMatchesModule { }
