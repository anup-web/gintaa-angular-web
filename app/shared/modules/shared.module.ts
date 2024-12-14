import { AgmCoreModule } from '@agm/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@gintaa/core/material.module';
import { GeocodingService } from '@gintaa/core/services/geocode.service';
import { PlacePredictionService } from '@gintaa/core/services/place-prediction.service';
import { PlaceService } from '@gintaa/core/services/place.service';
import { environment } from '@gintaa/env';
import { BusinessBannerComponent } from '@gintaa/shared/components/animations/business-banner/business-banner.component';
import { EmptyCartAnimationModule } from '@gintaa/shared/components/animations/empty-cart-animation/empty-cart-animation.module';
import { EmptyChatAnimationComponent } from '@gintaa/shared/components/animations/empty-chat-animation/empty-chat-animation.component';
import { EmptyFavouriteAnimationComponent } from '@gintaa/shared/components/animations/empty-favourite-animation/empty-favourite-animation.component';


import { ExchangeOtpLeftHandAnimationComponent } from '@gintaa/shared/components/animations/exchange-otp-left-hand-animation/exchange-otp-left-hand-animation.component';
import { ExchangeOtpRightHandAnimationComponent } from '@gintaa/shared/components/animations/exchange-otp-right-hand-animation/exchange-otp-right-hand-animation.component';
import { FinishADealAnimationComponent } from '@gintaa/shared/components/animations/finish-a-deal-animation/finish-a-deal-animation.component';
import { GintaaJunctionComponent } from '@gintaa/shared/components/animations/gintaa-junction/gintaa-junction.component';
import { InsuranceCheckComponent } from '@gintaa/shared/components/animations/insurance-check/insurance-check.component';
import { InsuranceComponent } from '@gintaa/shared/components/animations/insurance/insurance.component';

import { MakeExchangeAnimationComponent } from '@gintaa/shared/components/animations/make-exchange-animation/make-exchange-animation.component';
import { MeetPersonallyAnimationComponent } from '@gintaa/shared/components/animations/meet-personally-animation/meet-personally-animation.component';
import { MembershipComponent } from '@gintaa/shared/components/animations/membership/membership.component';

import { OfferPostingAnimationComponent } from '@gintaa/shared/components/animations/offer-posting-animation/offer-posting-animation.component';
import { PushOnButtonAnimationComponent } from '@gintaa/shared/components/animations/push-on-button-animation/push-on-button-animation.component';

import { ReferRewardComponent } from '@gintaa/shared/components/animations/refer-reward/refer-reward.component';
import { RefferalComponent } from '@gintaa/shared/components/animations/refferal/refferal.component';
import { TradeComponent } from '@gintaa/shared/components/animations/trade/trade.component';
import { WaitingForPartnerAnimationComponent } from '@gintaa/shared/components/animations/waiting-for-partner-animation/waiting-for-partner-animation.component';

import { ConfirmationBoxComponent } from '@gintaa/shared/components/confirmation-box/confirmation-box.component';
import { CreateBusinessAccountComponent } from '@gintaa/shared/components/create-business-account/create-business-account.component';

import { GintaaRatingComponent } from '@gintaa/shared/components/gintaa-rating/gintaa-rating.component';
import { GintaaReportComponent } from '@gintaa/shared/components/gintaa-report/gintaa-report.component';

import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { LoadMoreComponent } from "@gintaa/shared/components/loader/load-more/load-more.component";

import { SpinnerComponent } from "@gintaa/shared/components/loader/spinner/spinner.component";
import { TypingComponent } from "@gintaa/shared/components/loader/typing/typing.component";
import { LocationMapComponent } from '@gintaa/shared/components/location-map/location-map.component';
import { OfferCardComponent } from '@gintaa/shared/components/offer-card/offer-card.component';
import { PasswordStrengthBarComponent } from '@gintaa/shared/components/password-strength-bar/password-strength-bar.component';
import { PopupComponent } from '@gintaa/shared/components/popup/popup.component';
import { ShowRatingComponent } from '@gintaa/shared/components/show-rating/show-rating.component';
import { UserAddressComponent } from '@gintaa/shared/components/user-address/user-address.component';
import { UserFeedbackProfileComponent } from '@gintaa/shared/components/user-feedback-profile/user-feedback-profile.component';
import { VerifyEmailOtpComponent } from '@gintaa/shared/components/verify-email-otp/verify-email-otp.component';
import { FormatTimerPipe } from '@gintaa/shared/pipes/format-timer.pipe';
import { NgAudioRecorderModule } from 'ng-audio-recorder';
import { NgOtpInputModule } from 'ng-otp-input';
import { RatingModule } from 'ng-starrating';
import { AvatarModule } from 'ngx-avatar';
import { EllipsisModule } from 'ngx-ellipsis';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { BreadCrumbModule } from '../components/bread-crumb/bread-crumb.module';
import { BusinessOfferDelegateComponent } from '../components/business-offer-delegate/business-offer-delegate.component';
import { SwitchProfilesComponent } from '../components/business-switch-profiles/switch-profiles.component';
import { BusinessSwitchListComponent } from '../components/business-switch-list/business-switch-list.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { FloatingMenuModule } from '../components/floating-menu/floating-menu.module';
import { InactiveBusinessAccountComponent } from '../components/inactive-business-account/inactive-business-account.component';
import { ListViewModule } from '../components/list-view/list-view.module';
import { OfferCategoryListComponent } from '../components/offer-category-list/offer-category-list.component';
import { OfferCategoryComponent } from '../components/offer-category/offer-category.component';
import { ProfileAvatarModule } from '../components/profile-avatar/profile-avatar.module';
import { ServiceTimingsComponent } from '../components/service-timings/service-timings.component';
import { SuccessMessageComponent } from '../components/success-message/success-message.component';

import { DirectiveModule } from '../directives/directive.module';

import { chatMessagePipe } from '../pipes/chat-message.pipe';
import { FormatDayPrefixPipe } from '../pipes/format-day-prefix.pipe';
import { FormatMeetTimePipe } from '../pipes/format-meet-time.pipe';
import { FormatMobilePipe } from '../pipes/format-mobile.pipe';
import { FormatPricePipe } from '../pipes/format-price.pipe';
import { FormatServiceTimePipe } from '../pipes/format-service-time.pipe';
import { FormatTimePipe } from '../pipes/format-time.pipe';
import { FormatUTCTimePipe } from '../pipes/format-utc-time.pipe';
import { PipesModule } from '../pipes/pipes.modules';
// import { TrimTextToCertainNumberCharectorPipe } from '../pipes/trim-text-to-certain-number-charector.pipe';
import { OfferService, OfferShareService, TitleTagService } from '../services';
import { GintaaPaymentModule } from './gintaa-payment/gintaa-payment.module';
import { NewAddressComponent } from '../components/new-address/new-address.component';
import { AddressFormComponent } from '../components/address-form/address-form.component';
import { ConfirmDeleteAccountComponent } from '../features/receive-account/confirm-delete-account/confirm-delete-account.component';
import { ShowAccountListComponent } from '../features/receive-account/show-account-list/show-account-list.component';
import { FormatPriceDecemalPipe } from '../pipes/format-price-decemal.pipe';
import { DeleteDraftOfferPopupComponent } from '../components/delete-draft-offer-popup/delete-draft-offer-popup.component';

import { EmptyOfferCartAnimationModule } from '../components/animations/empty-offer-cart-animation/empty-offer-cart-animation.module';
import { OfferCardDefaultModule } from '../components/offer-card-default/offer-card-default.module';
import { OffersListViewModule } from '../components/offers-list-view/offer-list-view.module';
import { FloatingListingModule } from '../components/floating-listing/floating-listing.module';
import { LoadingSpinnerModule } from '../components/loader/loader.module';
import { GridViewModule } from '../components/grid-view/grid-view.module';
import { OfferCardAuctionModule } from '../components/offer-card-auction/offer-card-auction.module';

import { CreateBusinessBankComponent } from '../components/create-business-bank/create-business-bank.component';
import { RegisterBusinessAccountComponent } from '../components/create-business-bank/register-business-account/register-business-account.component';
import { RegisterBankAccountComponent } from '../components/create-business-bank/register-bank-account/register-bank-account.component';
import { RegisterUnderReviewComponent } from '../components/create-business-bank/register-under-review/register-under-review.component';
import { GrowBusinessComponent } from '../components/create-business-bank/grow-business/grow-business.component';
import { RegisterStepperComponent } from '../components/create-business-bank/register-stepper/register-stepper.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    LoadMoreComponent,
    TypingComponent,
    PopupComponent,
    FormatTimerPipe,
    FormatTimePipe,
    FormatMeetTimePipe,
    FormatUTCTimePipe,
    ImageComponent,
    ConfirmationBoxComponent,
    LocationMapComponent,
    UserAddressComponent,
    PasswordStrengthBarComponent,
    VerifyEmailOtpComponent,
    FormatDayPrefixPipe,
    FormatPricePipe,
    OfferCardComponent,
    MeetPersonallyAnimationComponent,
    MakeExchangeAnimationComponent,
    PushOnButtonAnimationComponent,
    ExchangeOtpLeftHandAnimationComponent,
    ExchangeOtpRightHandAnimationComponent,
    FinishADealAnimationComponent,
    WaitingForPartnerAnimationComponent,
    CreateBusinessAccountComponent,
    OfferCategoryComponent,
    ServiceTimingsComponent,
    UserFeedbackProfileComponent,
    GintaaRatingComponent,
    GintaaReportComponent,
    ShowRatingComponent,
    TradeComponent,
    GintaaJunctionComponent,
    InsuranceComponent,
    MembershipComponent,
    BusinessBannerComponent,
    RefferalComponent,
    ReferRewardComponent,
    InsuranceCheckComponent,
    EmptyFavouriteAnimationComponent,
    FormatServiceTimePipe,
    ErrorMessageComponent,
    SuccessMessageComponent,
    EmptyChatAnimationComponent,
    OfferPostingAnimationComponent,
    OfferCategoryListComponent,
    FormatMobilePipe,
    chatMessagePipe,
    SwitchProfilesComponent,
    InactiveBusinessAccountComponent,
    BusinessOfferDelegateComponent,
    DeleteDraftOfferPopupComponent,
    // TrimTextToCertainNumberCharectorPipe,
    NewAddressComponent,
    AddressFormComponent,
    ConfirmDeleteAccountComponent,
    ShowAccountListComponent,
    FormatPriceDecemalPipe,
    BusinessSwitchListComponent,
    CreateBusinessBankComponent,
    RegisterBusinessAccountComponent,
    RegisterBankAccountComponent,
    RegisterUnderReviewComponent,
    GrowBusinessComponent,
    RegisterStepperComponent
  ],
  imports: [
    CommonModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    DirectiveModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ['places']
    }),
    CarouselModule,
    AvatarModule,
    ImageCropperModule,
    EllipsisModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    NgxMaterialTimepickerModule,
    RatingModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    NgxScrollTopModule,
    AngularFireStorageModule,
    NgxSliderModule,
    NgxSpinnerModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
    }),
    ClipboardModule,
    NgAudioRecorderModule,
    GintaaPaymentModule,
    ListViewModule,
    GridViewModule,
    BreadCrumbModule,
    FloatingMenuModule,
    FloatingListingModule,
    OfferCardDefaultModule,
    OffersListViewModule,
    OfferCardAuctionModule,
    EmptyOfferCartAnimationModule,
    ProfileAvatarModule,
    PipesModule,
    LoadingSpinnerModule,
    EmptyCartAnimationModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    PipesModule,
    NgOtpInputModule,
    CommonModule,
    ListViewModule,
    OfferCardAuctionModule,
    BreadCrumbModule,
    FloatingMenuModule,
    FloatingListingModule,
    OfferCardDefaultModule,
    OffersListViewModule,
    GridViewModule,
    EmptyOfferCartAnimationModule,
    FormatTimerPipe,
    FormatTimePipe,
    FormatMeetTimePipe,
    FormatUTCTimePipe,
    AgmCoreModule,
    CarouselModule,
    AvatarModule,
    ProfileAvatarModule,
    ImageCropperModule,
    EllipsisModule,
    NgxSkeletonLoaderModule,
    LoadingSpinnerModule,
    ImageComponent,
    ConfirmationBoxComponent,
    LocationMapComponent,
    SpinnerComponent,
    LoadMoreComponent,
    TypingComponent,
    UserAddressComponent,
    PasswordStrengthBarComponent,
    EllipsisModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    VerifyEmailOtpComponent,
    FormatDayPrefixPipe,
    FormatServiceTimePipe,
    FormatPricePipe,
    OfferCardComponent,
    RatingModule,    
    EmptyCartAnimationModule,
    MeetPersonallyAnimationComponent,
    MakeExchangeAnimationComponent,
    PushOnButtonAnimationComponent,
    ExchangeOtpLeftHandAnimationComponent,
    ExchangeOtpRightHandAnimationComponent,
    FinishADealAnimationComponent,
    WaitingForPartnerAnimationComponent,
    CreateBusinessAccountComponent,
    OfferCategoryComponent,
    ServiceTimingsComponent,
    UserFeedbackProfileComponent,
    GintaaRatingComponent,
    GintaaReportComponent,
    ShowRatingComponent,
    NgxScrollTopModule,
    TradeComponent,
    GintaaJunctionComponent,
    InsuranceComponent,
    MembershipComponent,
    BusinessBannerComponent,
    RefferalComponent,
    ReferRewardComponent,
    InsuranceCheckComponent,
    EmptyFavouriteAnimationComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    EmptyChatAnimationComponent,
    OfferPostingAnimationComponent,
    NgxSliderModule,
    MatSidenavModule,
    ToastrModule,
    chatMessagePipe,
    OfferCategoryListComponent,
    FormatMobilePipe,
    SwitchProfilesComponent,
    InactiveBusinessAccountComponent,
    BusinessOfferDelegateComponent,
    GintaaPaymentModule,
    // TrimTextToCertainNumberCharectorPipe,
    ConfirmDeleteAccountComponent,
    ShowAccountListComponent,
    FormatPriceDecemalPipe,
    DeleteDraftOfferPopupComponent,
    BusinessSwitchListComponent,
    CreateBusinessBankComponent,
    RegisterBusinessAccountComponent,
    RegisterBankAccountComponent,
    RegisterUnderReviewComponent,
    GrowBusinessComponent,
    RegisterStepperComponent
  ],
  providers: [
    PlacePredictionService,
    PlaceService,
    GeocodingService,
    OfferShareService,
    TitleTagService,
    OfferService,
  ],
  //entryComponents: [ChatMaximizePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
