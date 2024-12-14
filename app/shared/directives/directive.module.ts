import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ControlErrorContainerDirective, 
  ControlErrorsDirective,
  NumberDirective,
  AlphabetOnlyDirective,
  IntersectionObserverDirective,
  TwoDigitDecimaNumberDirective,
  LazyImgDirective,
 } from './';

@NgModule({
  declarations: [
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    NumberDirective,
    AlphabetOnlyDirective,
    IntersectionObserverDirective,
    TwoDigitDecimaNumberDirective,
    LazyImgDirective,
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    NumberDirective,
    AlphabetOnlyDirective,
    IntersectionObserverDirective,
    TwoDigitDecimaNumberDirective,
    LazyImgDirective,
  ]
})
export class DirectiveModule { }
