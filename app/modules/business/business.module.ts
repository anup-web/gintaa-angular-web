import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@gintaa/core/core.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { BusinessRoutingModule } from './business-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { businessReducer } from './store/business.reducer';
import { BusinessEffects } from './store/business.effects';
import { BusinessComponent } from './components/business/business.component';
import { MyBusinessComponent } from './components/business/my-business/my-business.component';
import { ActiveMembersComponent } from './components/business/my-business/active-members/active-members.component';
import { InvitedMembersComponent } from './components/business/my-business/invited-members/invited-members.component';
import { RejectedMembersComponent } from './components/business/my-business/rejected-members/rejected-members.component';
import { BusinessAccountsListComponent } from './components/business/business-accounts-list/business-accounts-list.component';
import { BusinessProfileComponent } from './components/business/business-profile/business-profile.component';
import { BusinessOffersComponent } from './components/business/business-offers/business-offers.component';
import { CompanyProfileDetailsComponent } from './components/business/business-offers/company-profile-details/company-profile-details.component';
import { CompanyOffersComponent } from './components/business/business-offers/company-offers/company-offers.component';
import { CompanyDealCommentsComponent } from './components/business/business-offers/company-deal-comments/company-deal-comments.component';
import { TeamMemberPopupComponent } from './components/business/team-member-popup/team-member-popup.component';
import { UpdateMemberComponent } from './components/business/team-member-popup/update-member/update-member.component';
import { InvitedMemberComponent } from './components/business/team-member-popup/invited-member/invited-member.component';
import { AddNewMemberComponent } from './components/business/team-member-popup/add-new-member/add-new-member.component';
import { DeleteMemberComponent } from './components/business/team-member-popup/delete-member/delete-member.component';
import { AddNewAddressComponent } from './components/business/add-new-address/add-new-address.component';
import { BusinessAccountPopupComponent } from './components/business/business-account-popup/business-account-popup.component';
import { AccountSuccessComponent } from './components/business/business-account-popup/account-success/account-success.component';
import { SwitchProfilesComponent } from './components/business/business-account-popup/switch-profiles/switch-profiles.component';
import { BusinessNewAccountComponent } from './components/business/business-new-account/business-new-account.component';
import { ListViewOffersComponent } from './components/business/business-offers/list-view-offers/list-view-offers.component';
import { MemberProfileViewComponent } from './components/business/member-profile-view/member-profile-view.component';
import { OffersbyMemberComponent } from './components/business/member-profile-view/offersby-member/offersby-member.component';
import { AssignOfferPopupComponent } from './components/business/assign-offer-popup/assign-offer-popup.component';
import { MemberBasicInfoComponent } from './components/business/member-profile-view/member-basic-info/member-basic-info.component';
import { ListViewOffersbyComponent } from './components/business/member-profile-view/list-view-offersby/list-view-offersby.component';
import { RemovedMembersComponent } from './components/business/my-business/removed-members/removed-members.component';


@NgModule({
  declarations: [
    BusinessComponent,
    MyBusinessComponent,
    ActiveMembersComponent,
    InvitedMembersComponent,
    RejectedMembersComponent,       
    BusinessAccountsListComponent,    
    BusinessProfileComponent,
    BusinessOffersComponent,
    CompanyProfileDetailsComponent,
    CompanyOffersComponent,
    CompanyDealCommentsComponent,     
    TeamMemberPopupComponent,
    UpdateMemberComponent,
    InvitedMemberComponent,
    AddNewMemberComponent,    
    DeleteMemberComponent,
    AddNewAddressComponent,
    BusinessAccountPopupComponent,
    AccountSuccessComponent,
    SwitchProfilesComponent,
    BusinessNewAccountComponent,
    ListViewOffersComponent,        
    MemberProfileViewComponent,
    OffersbyMemberComponent, 
    AssignOfferPopupComponent,
    MemberBasicInfoComponent, 
    ListViewOffersbyComponent, 
    RemovedMembersComponent,    
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature('business', businessReducer),
    EffectsModule.forFeature([BusinessEffects]),
  ],
  exports: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class BusinessModule { }
