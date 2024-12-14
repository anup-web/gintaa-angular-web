import { Component, OnInit } from '@angular/core';
import { WalletService } from '@gintaa/modules/wallet/services/wallet.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-my-rewards',
  templateUrl: './my-rewards.component.html',
  styleUrls: ['./my-rewards.component.scss']
})
export class MyRewardsComponent implements OnInit {

  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  constructor(
    public walletService: WalletService
    ) { }

  ngOnInit() {
    this.walletService.rewards$.subscribe(res => console.log('Rewards:::', res));
  }
  getPassedData(event) {

  }

}
