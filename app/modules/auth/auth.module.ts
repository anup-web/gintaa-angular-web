import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
// tslint:disable: max-line-length
import { CoreModule } from '@gintaa/core/core.module';
import { ExistingUserPasswordVerifyComponent } from '@gintaa/modules/auth/components/login-modal/existing-user-password-verify/existing-user-password-verify.component';
import { ForgotPasswordUserComponent } from '@gintaa/modules/auth/components/login-modal/forgot-password-user/forgot-password-user.component';
import { HeadsUpSocialLoginComponent } from '@gintaa/modules/auth/components/login-modal/heads-up-social-login/heads-up-social-login.component';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { LoginSliderComponent } from '@gintaa/modules/auth/components/login-modal/login-slider/login-slider.component';
import { LoginComponent } from '@gintaa/modules/auth/components/login-modal/login/login.component';
import { NewUserEmailVerifyComponent } from '@gintaa/modules/auth/components/login-modal/new-user-email-verify/new-user-email-verify.component';
import { NewUserOtpVerifyComponent } from '@gintaa/modules/auth/components/login-modal/new-user-otp-verify/new-user-otp-verify.component';
import { NewUserOtpVerifySecondComponent } from '@gintaa/modules/auth/components/login-modal/new-user-otp-verify-second/new-user-otp-verify-second.component';
import { PasswordResetUserComponent } from '@gintaa/modules/auth/components/login-modal/password-reset-user/password-reset-user.component';
import { ProfileDobGenderComponent } from '@gintaa/modules/auth/components/login-modal/profile-dob-gender/profile-dob-gender.component';
import { ProfileLocationComponent } from '@gintaa/modules/auth/components/login-modal/profile-location/profile-location.component';
import { ProfileNameComponent } from '@gintaa/modules/auth/components/login-modal/profile-name/profile-name.component';
import { ProfilePhoneEmailComponent } from '@gintaa/modules/auth/components/login-modal/profile-phone-email/profile-phone-email.component';
import { ProfileUserAddressComponent } from '@gintaa/modules/auth/components/login-modal/profile-user-address/profile-user-address.component';
import { UserProfileLocationComponent } from '@gintaa/modules/auth/components/login-modal/user-profile-location/user-profile-location.component';
import { UserProfilePhotoComponent } from '@gintaa/modules/auth/components/login-modal/user-profile-photo/user-profile-photo.component';
import { UserSocialLoginComponent } from '@gintaa/modules/auth/components/login-modal/user-social-login/user-social-login.component';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { AuthService } from '@gintaa/core/services/auth.service';

import { AuthGuard } from '../../core/guards/auth.guard';
import { BusinessAuthGuard } from '../../core/guards/business-auth.guard';
import { EmailLoginLinkSendSuccessComponent } from './components/login-modal/email-login-link-send-success/email-login-link-send-success.component';
import { EmailLoginLinkVerifyComponent } from './components/login-modal/email-login-link-verify/email-login-link-verify.component';

@NgModule({
  declarations: [
    LoginModalComponent,
    LoginComponent,
    LoginSliderComponent,
    NewUserEmailVerifyComponent,
    NewUserOtpVerifyComponent,
    NewUserOtpVerifySecondComponent,
    ExistingUserPasswordVerifyComponent,
    HeadsUpSocialLoginComponent,
    ForgotPasswordUserComponent,
    PasswordResetUserComponent,
    ProfileNameComponent,
    ProfilePhoneEmailComponent,
    ProfileLocationComponent,
    ProfileUserAddressComponent,
    ProfileDobGenderComponent,
    UserSocialLoginComponent,
    UserProfilePhotoComponent,
    UserProfileLocationComponent,
    EmailLoginLinkSendSuccessComponent,
    EmailLoginLinkVerifyComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [],
  entryComponents: [
    LoginModalComponent
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard,
        BusinessAuthGuard,
      ]
    }
  }
}
