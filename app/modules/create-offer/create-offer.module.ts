import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@gintaa/core/core.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CreateOfferComponent, CREATE_OFFER_ROUTE } from './';
import { CreateOfferEffects } from './store/effects/create-offer.effects';
import { createOfferReducer } from './store/reducers/create-offer.reducer';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    BreadCrumbModule,
    RouterModule.forChild([CREATE_OFFER_ROUTE]),
    StoreModule.forFeature('createOfferState', createOfferReducer),
    EffectsModule.forFeature([CreateOfferEffects])
  ],
  declarations: [CreateOfferComponent]
})
export class CreateOfferModule { }
