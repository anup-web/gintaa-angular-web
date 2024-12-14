import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceOfferInfoComponent } from './service-offer-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceTimingsModule } from '../service-timings';
import { MatRadioModule } from '@angular/material/radio';
import { OfferAllCategoriesModule } from '../offer-all-categories';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DirectiveModule } from '@gintaa/shared/directives/directive.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
@NgModule({
  declarations: [
    ServiceOfferInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceTimingsModule,
    OfferAllCategoriesModule,
    MatRadioModule,
    MatSlideToggleModule,
    DirectiveModule,
    PipesModule,
  ],
  exports: [
    ServiceOfferInfoComponent
  ]
})
export class ServiceOfferInfoModule { }
