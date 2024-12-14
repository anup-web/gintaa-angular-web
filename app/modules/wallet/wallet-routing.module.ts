import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyWalletComponent } from './components/wallet/my-wallet/my-wallet.component';
import { RedeemComponent } from './components/wallet/redeem/redeem.component';
import { ShareRewardsComponent } from './components/wallet/share-rewards/share-rewards.component';
import { WalletDeliveryComponent } from './components/wallet/wallet-delivery/wallet-delivery.component';
import { WalletComponent } from './components/wallet/wallet.component';


const routes: Routes = [
 { path: '', component: WalletComponent },
 { path: 'redeem', component: RedeemComponent },
 { path: 'share', component: ShareRewardsComponent },
 { path: 'mywallet', component: MyWalletComponent },
 { path: 'delivery', component: WalletDeliveryComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WalletRoutingModule { }
