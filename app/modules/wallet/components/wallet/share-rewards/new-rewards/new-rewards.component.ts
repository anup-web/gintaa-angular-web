import { Component, OnInit } from '@angular/core';
import { WalletService } from '@gintaa/modules/wallet/services/wallet.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-new-rewards',
  templateUrl: './new-rewards.component.html',
  styleUrls: ['./new-rewards.component.scss']
})
export class NewRewardsComponent implements OnInit {

  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  constructor(
    public walletService: WalletService
    ) { }

  ngOnInit() {
  }
  getPassedData(event) {

  }

}
