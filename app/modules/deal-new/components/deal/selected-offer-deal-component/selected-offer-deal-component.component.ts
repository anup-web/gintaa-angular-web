import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { Offer } from '@gintaa/modules/offer/model/offer';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';

@Component({
  selector: 'app-selected-offer-deal-component',
  templateUrl: './selected-offer-deal-component.component.html',
  styleUrls: ['./selected-offer-deal-component.component.scss']
})
export class SelectedOfferDealComponentComponent implements OnInit {

  actionType: string = '';
  selectedOffer: Offer[] = [];
  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data){
      this.actionType = data.actionType;
      this.selectedOffer = data.selectedOffer;
    }
  }

  ngOnInit(): void {
  }

  closeModel(){
    this.store.dispatch(
      DealActions.closeModel({modelType:'selected'})
    );
  }
}
