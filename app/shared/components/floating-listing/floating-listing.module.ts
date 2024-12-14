import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FloatingListingComponent } from './floating-listing.component';

@NgModule({
  declarations: [FloatingListingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FloatingListingComponent
  ]
})
export class FloatingListingModule { }
