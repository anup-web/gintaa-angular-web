import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddAddressPopUpModule } from '../add-address-popup/add-address-popup.module';
import { ItemOfferInfoModule } from '../item-offer-info/item-offer-info.module';
import { NewOfferTagsModule } from '../new-offer-tags/new-offer-tags.module';
import { NewWantReturnModule } from '../new-want-return';
import { ServiceOfferInfoModule } from '../service-offer-info';
import {
  CreateOfferPrimaryInfoComponent
} from './';

@NgModule({
  declarations: [
    CreateOfferPrimaryInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AddAddressPopUpModule,
    ItemOfferInfoModule,
    ServiceOfferInfoModule,
    NewOfferTagsModule,
    NewWantReturnModule,
    MatExpansionModule
  ],
  exports: [
    CreateOfferPrimaryInfoComponent
  ]
})
export class CreateOfferPrimaryInfoModule { }
