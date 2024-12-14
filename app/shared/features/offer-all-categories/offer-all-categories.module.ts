import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OfferAllCategoriesComponent } from './offer-all-categories.component';

@NgModule({
  declarations: [
    OfferAllCategoriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  exports: [
    OfferAllCategoriesComponent
  ]
})
export class OfferAllCategoriesModule { }
