import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoadingAnimationComponent } from '../animations/loading-animation/loading-animation.component';
import { LoadingSpinnerComponent } from './loader.component';
import { SkeltonFedbackComponent } from './skelton-feedback/skelton-feedback.component';
import { SkeltonComponent } from './skelton/skelton.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    SkeltonComponent,
    SkeltonFedbackComponent,
    LoadingAnimationComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    LoadingSpinnerComponent,
    SkeltonComponent,
    SkeltonFedbackComponent,
    LoadingAnimationComponent
  ]
})
export class LoadingSpinnerModule { }
