import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './components/page/page.component';
import { AboutGintaaComponent } from './components/page/about-gintaa/about-gintaa.component';
import { TermsAndConditionsComponent } from './components/page/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/page/privacy-policy/privacy-policy.component';
import { HelpAndGuideComponent } from './components/page/help-and-guide/help-and-guide.component';
import { ListingPolicyComponent } from './components/page/listing-policy/listing-policy.component';
import { FaqComponent } from './components/page/faq/faq.component';
import {CookiePolicyComponent} from './components/page/cookie-policy/cookie-policy.component'
import {PersonalDataProtectionPolicyComponent} from './components/page/personal-data-protection-policy/personal-data-protection-policy.component'
import {RefundPolicyComponent} from './components/page/refund-policy/refund-policy.component'
import { HowGintaaWorkComponent } from './components/page/how-gintaa-work/how-gintaa-work.component';
import { PaymentsComponent } from './components/page/payments/payments.component';
import { ShippingInfoComponent } from './components/page/shipping-info/shipping-info.component';
import { BusinessTermsConditionComponent } from './components/page/business-terms-condition/business-terms-condition.component';
import { BusinessPrivacyPolicyComponent } from './components/page/business-privacy-policy/business-privacy-policy.component';
import { PressReleaseComponent } from './components/page/press-release/press-release.component';

const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'about', component: AboutGintaaComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'listing', component: ListingPolicyComponent },
  { path: 'help', component: HelpAndGuideComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'cookie', component: CookiePolicyComponent },
  { path: 'protection', component: PersonalDataProtectionPolicyComponent},
  { path: 'refund', component: RefundPolicyComponent},
  { path: 'shipping-info', component: ShippingInfoComponent},
  { path: 'payments', component: PaymentsComponent},
  { path: 'how-gintaa-work', component: HowGintaaWorkComponent},
  { path: 'business-terms-condition', component: BusinessTermsConditionComponent},
  { path: 'business-privacy-policy', component: BusinessPrivacyPolicyComponent},
  { path: 'press-release', component: PressReleaseComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PageRoutingModule { }
