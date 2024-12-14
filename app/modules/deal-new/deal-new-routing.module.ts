import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealComponent } from './components/deal/deal.component';
import { NewSuggestDealsComponent } from './components/deal/new-suggest-deals/new-suggest-deals.component';
import { DealDetailsComponent } from './components/deal/deal-details/deal-details.component';
import { DealCheckoutComponent } from './components/deal/deal-checkout/deal-checkout.component';
import { PaymentSuccessComponent } from './components/deal/payment-success/payment-success.component';
import { OrderDetailsComponent } from './components/deal/order-details/order-details.component';

const routes: Routes = [
  { path: '', component: DealComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent },  
  { path: 'order-success/:id', component: PaymentSuccessComponent },  
  { path: 'buy-now/:id', component: DealCheckoutComponent },  
  { path: 'suggest/:id', component: NewSuggestDealsComponent, data : {page_type : 'suggest'} }, 
  { path: 'update/:id', component: NewSuggestDealsComponent, data : {page_type : 'update'} }, 
  { path: 'details/:id', component: DealDetailsComponent, data : {page_type : 'details'} },  
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DealNewRoutingModule { }
