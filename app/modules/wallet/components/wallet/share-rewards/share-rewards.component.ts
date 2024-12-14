import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '@gintaa/modules/wallet/services/wallet.service';
import { noop, Subscription } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-share-rewards',
  templateUrl: './share-rewards.component.html',
  styleUrls: ['./share-rewards.component.scss']
})
export class ShareRewardsComponent implements OnInit {

  referalLink$: Subscription;
  rewards$: Subscription;
  @ViewChild('referrelLink',  { static: true }) link: ElementRef<HTMLInputElement>;

  constructor(
    private walletService: WalletService
    ) { }

  ngOnInit(): void {
    this.referalLink$ = this.walletService.getReferalLink()
    .pipe(
      map(res => res.payload || null),
      tap(res => this.link.nativeElement.value = res.referalLink),
      first()
    ).subscribe(noop);
    
    this.rewards$ = this.walletService.getRewards()
    .pipe(
      map(res => res.payload || null),
      tap(res => this.walletService.rewards.next(res))
    ).subscribe(noop);
  }

}
