import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '@gintaa/core/core.module';
import { LoadingSpinnerModule } from '@gintaa/shared/components/loader/loader.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BusinessBulkItemsComponent } from './components/business-bulk-items/business-bulk-items.component';
import { OfferBulkUploadRoutingModule } from './offer-bulk-upload-routing.module';
import { OfferBulkUploadEffects } from './store/offer-bulk-upload.effects';
import { offerBulkUploadReducer } from './store/offer-bulk-upload.reducer';



@NgModule({
  declarations: [
    BusinessBulkItemsComponent
  ],
  imports: [
    CommonModule,
    OfferBulkUploadRoutingModule,
    LoadingSpinnerModule,
    CoreModule,
    StoreModule.forFeature('offer-bulk-upload', offerBulkUploadReducer),
    EffectsModule.forFeature([OfferBulkUploadEffects]),
  ]
})
export class OfferBulkUploadModule { }
