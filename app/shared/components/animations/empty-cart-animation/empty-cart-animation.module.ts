import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmptyCartAnimationComponent } from './empty-cart-animation.component';

@NgModule({
  declarations: [
    EmptyCartAnimationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    EmptyCartAnimationComponent
  ]
})
export class EmptyCartAnimationModule { }
