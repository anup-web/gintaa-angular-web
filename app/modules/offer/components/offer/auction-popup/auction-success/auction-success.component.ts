import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-success',
  templateUrl: './auction-success.component.html',
  styleUrls: ['./auction-success.component.scss']
})
export class AuctionSuccessComponent implements OnInit {
  @Input() offerId:any;
  @Output() dialogClose: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToDeals() {
    this.dialogClose.emit();
    this.router.navigateByUrl('/deals');
  }
  navigateToOffer() {
    this.dialogClose.emit();    
  }

  suggestDeal(id: string) {
    this.dialogClose.emit();
    this.router.navigateByUrl(`/deals/suggest/${id}`);
  }

}
