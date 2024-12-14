import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoreModule } from '@gintaa/core/core.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgOtpInputModule } from 'ng-otp-input';
import { BlockListComponent } from './components/settings/block-list/block-list.component';
import { UnblockPopupComponent } from './components/settings/block-list/unblock-popup/unblock-popup.component';
import { ChangePopupComponent } from './components/settings/change-popup/change-popup.component';
import { ChangeEmailComponent } from './components/settings/change-popup/email-change/change-email/change-email.component';
import { EmailOtpVerifyComponent } from './components/settings/change-popup/email-change/email-otp-verify/email-otp-verify.component';
import { EmailVerifySuccessComponent } from './components/settings/change-popup/email-change/email-verify-success/email-verify-success.component';
import { ChangePasswordSuccessComponent } from './components/settings/change-popup/password-change/change-password-success/change-password-success.component';
import { ChangePasswordComponent } from './components/settings/change-popup/password-change/change-password/change-password.component';
import { PasswordRestoreComponent } from './components/settings/change-popup/password-change/password-restore/password-restore.component';
import { ResetPasswordEmailSendComponent } from './components/settings/change-popup/password-change/reset-password-email-send/reset-password-email-send.component';
import { ResetPasswordComponent } from './components/settings/change-popup/password-change/reset-password/reset-password.component';
import { ChangePhoneNumberOneComponent } from './components/settings/change-popup/phone-change/change-phone-number-one/change-phone-number-one.component';
import { ChangePhoneNumberTwoComponent } from './components/settings/change-popup/phone-change/change-phone-number-two/change-phone-number-two.component';
import { PhoneOtpVerifyComponent } from './components/settings/change-popup/phone-change/phone-otp-verify/phone-otp-verify.component';
import { CredentialsComponent } from './components/settings/credentials/credentials.component';
import { SettingsListComponent } from './components/settings/settings-list/settings-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CommentsNotificationsComponent } from './components/settings/trade-notifications/comments-notifications/comments-notifications.component';
import { CommonNotificationComponent } from './components/settings/trade-notifications/common-notification/common-notification.component';
import { DealsNotificationsComponent } from './components/settings/trade-notifications/deals-notifications/deals-notifications.component';
import { MatchingNotificationsComponent } from './components/settings/trade-notifications/matching-notifications/matching-notifications.component';
import { MessagesNotificationsComponent } from './components/settings/trade-notifications/messages-notifications/messages-notifications.component';
import { OffersNotificationsComponent } from './components/settings/trade-notifications/offers-notifications/offers-notifications.component';
import { TradeNotificationsComponent } from './components/settings/trade-notifications/trade-notifications.component';
import { SettingsService } from './services/settings.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsEffects } from './store/settings.effects';
import { settingsReducer } from './store/settings.reducer';
@NgModule({
  declarations: [    
  SettingsComponent, 
  SettingsListComponent, 
  CredentialsComponent, 
  ChangePopupComponent, 
  ChangePhoneNumberOneComponent,
  ChangePhoneNumberTwoComponent, 
  ChangePasswordComponent, 
  ResetPasswordComponent, 
  PasswordRestoreComponent, 
  ChangeEmailComponent, 
  EmailOtpVerifyComponent, 
  EmailVerifySuccessComponent, 
  BlockListComponent, 
  UnblockPopupComponent, 
  TradeNotificationsComponent, 
  DealsNotificationsComponent, 
  OffersNotificationsComponent, 
  MessagesNotificationsComponent, 
  MatchingNotificationsComponent, 
  CommentsNotificationsComponent,
  PhoneOtpVerifyComponent,
  ResetPasswordEmailSendComponent,
  ChangePasswordSuccessComponent,
  CommonNotificationComponent
],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    CoreModule,
    NgOtpInputModule,
    StoreModule.forFeature('auth', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ]
})
export class SettingsModule {
  static forRoot(): ModuleWithProviders<SettingsModule> {
    return {
        ngModule: SettingsModule,
        providers: [
          SettingsService
        ]
    }
  }
}
