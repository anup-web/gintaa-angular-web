import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaSwiperComponent } from './media-swiper.component';
import { SwiperModule } from 'swiper/angular';
import { MatVideoModule } from 'mat-video';


@NgModule({
  declarations: [
    MediaSwiperComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    MatVideoModule
  ],
  exports: [
    MediaSwiperComponent
  ]
})
export class MediaSwiperModule { }
