import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { ChangeContext } from "@angular-slider/ngx-slider";
@Component({
  selector: 'app-offer-filter-popup',
  templateUrl: './offer-filter-popup.component.html',
  styleUrls: ['./offer-filter-popup.component.scss']
})
export class OfferFilterPopupComponent implements OnInit {

  offerCount: number = 0;
  categoryList: any = [];
  publicationList: any = [];
  options: any;
  enableApplyButton: boolean = false;
  priceRange: any = {
    minPrice: 0,
    maxPrice: 0,
    minValue: 0,
    maxValue: 0
  };
  filterObject = {
    categoryId: '',
    publishedDate:'',
    itemCondition:''
  }
  filterObject_temp = {
    categoryId: '',
    publishedDate:'',
    itemCondition:''
  }

  itemConditionArr: string[] = ['Used', 'Refurbished', 'Antique', 'New'];

   constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data){
      this.options = data.options;
      this.categoryList = data.categoryList;
      this.publicationList = data.publicationList;
      this.offerCount = data.offerCount;
      this.filterObject = data.filterObject;
      this.filterObject_temp = {...data.filterObject};
     setTimeout(() => {
      this.priceRange = data.priceRange;
     }, 120);
    }
  }

  ngOnInit(): void {
  }

  closeModel(){
    this.filterObject['categoryId'] = this.filterObject_temp['categoryId'];
    this.filterObject['publishedDate'] = this.filterObject_temp['publishedDate'];
    this.filterObject['itemCondition'] = this.filterObject_temp['itemCondition'];
    this.priceRange.minValue = this.priceRange.minPrice;
    this.priceRange.maxValue = this.priceRange.maxPrice;

    this.store.dispatch(
      DealActions.closeModel({modelType:'filter'})
    );
  }

  changeCategoryOption(event:any, type:string) {
    this.filterObject[type] = event.target.value;
    this.enableApplyButton = true;
  }

  setItemCondition(condition:string) {
    this.filterObject['itemCondition'] = condition;
    this.enableApplyButton = true;
  }

  applyFilter(){
    this.store.dispatch(
      DealActions.closeModel({modelType:'filter'})
    );
  }

  clearFilter(){
    this.filterObject['publishedDate'] = '';
    this.filterObject['categoryId'] = '';
    this.filterObject['itemCondition'] = '';
    this.priceRange.minValue = this.priceRange.minPrice;
    this.priceRange.maxValue = this.priceRange.maxPrice;
    this.enableApplyButton = true;
    // this.store.dispatch(
    //   DealActions.closeModel({modelType:'filter'})
    // );
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.enableApplyButton = true;

  }
}
