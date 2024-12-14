import { Component, OnInit } from '@angular/core';
import { WalletService } from '@gintaa/modules/wallet/services/wallet.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-wallet-refer-rewards',
  templateUrl: './wallet-refer-rewards.component.html',
  styleUrls: ['./wallet-refer-rewards.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight]
})
export class WalletReferRewardsComponent implements OnInit {

  walletDetailsObs$: Observable<any>;
  limit: number = 3;

  constructor(
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.walletDetailsObs$ = this.walletService.getWalletDetails()
    .pipe(
      map(res => res.payload || null)
    )
  }

  showMore(total: number) {
    this.limit = total;
  }
  
}
