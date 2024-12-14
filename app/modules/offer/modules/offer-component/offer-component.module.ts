import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './offer.component';
import { RouterModule } from '@angular/router';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
import { ItemOfferDetailsModule } from '../item-offer-details/item-offer-details.module';
import { OfferResolver } from '../../services/offer-resolver.service';

@NgModule({
  declarations: [OfferComponent],
  imports: [
    CommonModule,
    FloatingMenuModule,
    ItemOfferDetailsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: OfferComponent,
        resolve: {
          offer: OfferResolver
        }
       }
    ])
  ],
  exports: [
    OfferComponent
  ]
})
export class OfferComponentModule { }
