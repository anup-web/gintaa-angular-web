import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { MyWalletComponent } from './components/wallet/my-wallet/my-wallet.component';
import { WalletAcceptComponent } from './components/wallet/my-wallet/wallet-accept/wallet-accept.component';
import { WalletCloseComponent } from './components/wallet/my-wallet/wallet-close/wallet-close.component';
import { OrderPaymentComponent } from './components/wallet/order-payment/order-payment.component';
import { RedeemComponent } from './components/wallet/redeem/redeem.component';
import { MyRewardsComponent } from './components/wallet/share-rewards/my-rewards/my-rewards.component';
import { NewRewardsComponent } from './components/wallet/share-rewards/new-rewards/new-rewards.component';
import { ShareRewardsComponent } from './components/wallet/share-rewards/share-rewards.component';
import { WalletDeliveryTrackComponent } from './components/wallet/wallet-delivery-track/wallet-delivery-track.component';
import { WalletDeliveryComponent } from './components/wallet/wallet-delivery/wallet-delivery.component';
import { WalletReferRewardsComponent } from './components/wallet/wallet-refer-rewards/wallet-refer-rewards.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
@NgModule({
  declarations: [    
    WalletComponent, 
    ShareRewardsComponent, 
    RedeemComponent, 
    OrderPaymentComponent, 
    WalletReferRewardsComponent, 
    NewRewardsComponent, 
    MyRewardsComponent,
    MyWalletComponent, 
    WalletAcceptComponent, 
    WalletCloseComponent, 
    WalletDeliveryComponent, 
    WalletDeliveryTrackComponent
],
  imports: [
    CommonModule,
    WalletRoutingModule, 
    MatRadioModule,
    MatMenuModule,
    CarouselModule,
    MatIconModule,
    BreadCrumbModule
  ]
})
export class WalletModule { }
