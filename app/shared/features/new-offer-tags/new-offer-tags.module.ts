import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOfferTagsComponent } from './new-offer-tags.component';

@NgModule({
  declarations: [
    NewOfferTagsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NewOfferTagsComponent
  ]
})
export class NewOfferTagsModule { }
