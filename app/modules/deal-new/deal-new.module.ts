import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { environment } from '@gintaa/env';
import { AgmDirectionModule } from 'agm-direction';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgStepperModule} from 'angular-ng-stepper';
import { CoreModule } from '@gintaa/core/core.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { DealNewRoutingModule } from './deal-new-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { dealReducer } from './store/deal.reducer';
import { DealEffects } from './store/deal.effects';

import { DealComponent } from './components/deal/deal.component';
import { MyDealsComponent } from './components/deal/my-deals/my-deals.component';
import { MyDealSearchComponent } from './components/deal/my-deals/my-deal-search/my-deal-search.component';
import { MyDealListComponent } from './components/deal/my-deals/my-deal-list/my-deal-list.component';
import { NewSuggestDealsComponent } from './components/deal/new-suggest-deals/new-suggest-deals.component';
import { DealUserViewComponent } from './components/deal/deal-user-view/deal-user-view.component'
import { DealOfferSliderComponent } from './components/deal/deal-offer-slider/deal-offer-slider.component';
import { DealOffersListPopupComponent } from './components/deal/deal-offers-list-popup/deal-offers-list-popup.component';
import { SelectedOfferDealComponentComponent } from './components/deal/selected-offer-deal-component/selected-offer-deal-component.component';
import { DealTipsComponent } from './components/deal/deal-tips/deal-tips.component';
import { DealDetailsComponent } from './components/deal/deal-details/deal-details.component';
import { DealStepperComponent } from './components/deal/deal-stepper/deal-stepper.component';
import { IncomingOfferSliderComponent } from './components/deal/incoming-offer-slider/incoming-offer-slider.component';
import { NewDeliveryPreferenceComponent } from './components/deal/new-delivery-preference/new-delivery-preference.component';
import { NewDealHistoryComponent } from './components/deal/new-deal-history/new-deal-history.component';
import { DealStatusViewComponent } from './components/deal/deal-status-view/deal-status-view.component';
import { DealCheckoutComponent } from './components/deal/deal-checkout/deal-checkout.component';
import { DeliveryAddressComponent } from './components/deal/deal-checkout/delivery-address/delivery-address.component';
import { PriceDetailsComponent } from './components/deal/deal-checkout/price-details/price-details.component';
import { PaymentSuccessComponent } from './components/deal/payment-success/payment-success.component';
import { SafeSecureComponent } from './components/deal/deal-checkout/safe-secure/safe-secure.component';
import { ReviewOrderPaymentComponent } from './components/deal/deal-checkout/review-order-payment/review-order-payment.component';
import { DoorStepDeliveryComponent } from './components/deal/door-step-delivery/door-step-delivery.component';
import { ProductCardComponent } from './components/deal/product-card/product-card.component';
import { AddressCardComponent } from './components/deal/address-card/address-card.component';
import { OrderDetailsComponent } from './components/deal/order-details/order-details.component';
import { DealDeliveryComponent } from './components/deal/deal-delivery/deal-delivery.component';
import { OfferFilterPopupComponent } from './components/deal/offer-filter-popup/offer-filter-popup.component';
import { dealAcceptShippingComponent} from './components/deal/deal-accept-shipping/deal-accept-shipping.component';
import { DealClosePopupComponent} from './components/deal/deal-close-popup/deal-close-popup.component';
import {UserFeedbackComponent} from './components/deal/deal-close-popup/user-feedback/user-feedback.component';
import {GintaaFeedbackComponent} from './components/deal/deal-close-popup/gintaa-feedback/gintaa-feedback.component';
import {CloseSuccesfullComponent} from './components/deal/deal-close-popup/close-succesfull/close-succesfull.component';
import {CloseOtpComponent} from './components/deal/deal-close-popup/close-otp/close-otp.component';
import { GintaaJunctionComponent } from './components/deal/gintaa-junction/gintaa-junction.component';
import { StoreSliderComponent } from './components/deal/gintaa-junction/store-slider/store-slider.component';
import { StoreCardComponent } from './components/deal/gintaa-junction/store-card/store-card.component';
import { CloseCancelComponent } from './components/deal/deal-close-popup/close-cancel/close-cancel.component';
import { DealRatingComponent } from './components/deal/deal-rating/deal-rating.component';
@NgModule({
  declarations: [
    DealComponent,
    MyDealsComponent,
    MyDealSearchComponent,
    MyDealListComponent,
    NewSuggestDealsComponent,
    DealUserViewComponent,
    DealOfferSliderComponent,
    DealOffersListPopupComponent,
    SelectedOfferDealComponentComponent,
    DealTipsComponent,
    DealDetailsComponent,
    DealStepperComponent,
    IncomingOfferSliderComponent,
    NewDeliveryPreferenceComponent,
    NewDealHistoryComponent,
    DealStatusViewComponent,
    DealCheckoutComponent,
    DeliveryAddressComponent,
    PriceDetailsComponent,
    PaymentSuccessComponent,
    SafeSecureComponent,
    ReviewOrderPaymentComponent,
    DoorStepDeliveryComponent,
    ProductCardComponent,
    AddressCardComponent,
    OrderDetailsComponent,
    DealDeliveryComponent,
    OfferFilterPopupComponent,
    dealAcceptShippingComponent,
    DealClosePopupComponent,
    UserFeedbackComponent,
    GintaaFeedbackComponent,
    CloseSuccesfullComponent,
    CloseOtpComponent,
    GintaaJunctionComponent,
    StoreSliderComponent,
    StoreCardComponent,
    CloseCancelComponent,
    DealRatingComponent,
  ],
  imports: [
    CommonModule,
    DealNewRoutingModule,
    SharedModule,
    CoreModule,        
    StoreModule.forFeature('deal', dealReducer),
    EffectsModule.forFeature([DealEffects]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    AgmDirectionModule,
    InfiniteScrollModule,
    CdkStepperModule,
    NgStepperModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DealNewModule { }
