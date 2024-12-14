import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewWantReturnComponent } from './new-want-return.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferAllCategoriesModule } from '../offer-all-categories';

@NgModule({
  declarations: [
    NewWantReturnComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    OfferAllCategoriesModule
  ],
  exports: [
    NewWantReturnComponent
  ]
})
export class NewWantReturnModule { }
