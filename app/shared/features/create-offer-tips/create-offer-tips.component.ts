import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentActiveSection } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { OfferTipsArray } from '@gintaa/shared/models/OfferTips.model';

@Component({
  selector: 'app-create-offer-tips',
  templateUrl: './create-offer-tips.component.html',
  styleUrls: ['./create-offer-tips.component.scss']
})
export class CreateOfferTipsComponent implements OnInit {

  tipsArray = [];

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.select(selectCurrentActiveSection).subscribe(currentActiveSection => {
      if (currentActiveSection) {
        this.tipsArray = OfferTipsArray[currentActiveSection];
      }
    })
  }

}
