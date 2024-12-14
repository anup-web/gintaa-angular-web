import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@gintaa/core/core.module';
import { AboutGintaaComponent } from './components/page/about-gintaa/about-gintaa.component';
import { BusinessPrivacyPolicyComponent } from './components/page/business-privacy-policy/business-privacy-policy.component';
import { BusinessTermsConditionComponent } from './components/page/business-terms-condition/business-terms-condition.component';
import { CookiePolicyComponent } from './components/page/cookie-policy/cookie-policy.component';
import { FaqComponent } from './components/page/faq/faq.component';
import { HelpAndGuideComponent } from './components/page/help-and-guide/help-and-guide.component';
import { HowGintaaWorkComponent } from './components/page/how-gintaa-work/how-gintaa-work.component';
import { ListingPolicyComponent } from './components/page/listing-policy/listing-policy.component';
import { PageComponent } from './components/page/page.component';
import { PaymentsComponent } from './components/page/payments/payments.component';
import { PersonalDataProtectionPolicyComponent } from './components/page/personal-data-protection-policy/personal-data-protection-policy.component';
import { PressReleaseComponent } from './components/page/press-release/press-release.component';
import { PrivacyPolicyComponent } from './components/page/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './components/page/refund-policy/refund-policy.component';
import { ShippingInfoComponent } from './components/page/shipping-info/shipping-info.component';
import { TermsAndConditionsComponent } from './components/page/terms-and-conditions/terms-and-conditions.component';
import { PageRoutingModule } from './page-routing.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
@NgModule({
  declarations: [    
    PageComponent,
    AboutGintaaComponent,
    TermsAndConditionsComponent,
    HelpAndGuideComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    ListingPolicyComponent,
    CookiePolicyComponent,
    PersonalDataProtectionPolicyComponent,
    RefundPolicyComponent,
    HowGintaaWorkComponent,
    PaymentsComponent,
    ShippingInfoComponent,
    BusinessPrivacyPolicyComponent,
    BusinessTermsConditionComponent,
    PressReleaseComponent
    
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    CoreModule,
    BreadCrumbModule,
  ]
})
export class PageModule { }
