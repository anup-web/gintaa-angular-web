import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CoreModule } from '@gintaa/core/core.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';

import { ProfileComponent } from './components/profile/profile.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/profile/edit-user-profile/edit-user-profile.component';
import { OtherUserProfileComponent } from './components/profile/other-user-profile/other-user-profile.component';
import { AllUserCommentsComponent } from './components/profile/all-user-comments/all-user-comments.component';
import { UserReportBlockComponent } from './components/profile/user-report-block/user-report-block.component';

import { OfferOtherUserComponent } from './components/profile/other-user-profile/offer-other-user/offer-other-user.component';
import { OthersUserProfileDetailsComponent } from './components/profile/other-user-profile/others-user-profile-details/others-user-profile-details.component';
import { UserProfilePhotoComponent } from './components/profile/user-profile-photo/user-profile-photo.component';
import { AddNewAddressComponent } from './components/profile/add-new-address/add-new-address.component';
import { ProfileSkeletonComponent } from './components/profile/profile-skeleton/profile-skeleton.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/profile.reducer';
import { ProfileEffects } from './store/profile.effects';
import { OtherUserAllOfferComponent } from './components/profile/other-user-profile/other-user-all-offer/other-user-all-offer.component';
import { BusinessInvitationsComponent } from './components/business-invitations/business-invitations.component';
import { AddBankAccountComponent } from '../../shared/features/receive-account/add-bank-account/add-bank-account.component';

@NgModule({
    declarations: [
        ProfileComponent,
        UserProfileComponent,
        EditUserProfileComponent,
        OtherUserProfileComponent,
        AllUserCommentsComponent,
        UserReportBlockComponent,
        OfferOtherUserComponent,
        OthersUserProfileDetailsComponent,  
        UserProfilePhotoComponent,
        AddNewAddressComponent,
        ProfileSkeletonComponent,
        OtherUserAllOfferComponent,
        BusinessInvitationsComponent,
        AddBankAccountComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        CoreModule,
        StoreModule.forFeature('profile', profileReducer),
        EffectsModule.forFeature([ProfileEffects])
    ],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
