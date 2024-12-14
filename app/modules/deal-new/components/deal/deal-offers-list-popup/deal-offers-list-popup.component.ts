import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectReceiverAllOffers, selecSenderAllOffers, closeDealModel, selectReceiverSelectedOffers, selectSenderSelectedOffers } from '@gintaa/modules/deal-new/store/deal.selectors';
import { Offer } from '@gintaa/modules/offer/model/offer';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import Moment from 'moment';
import { Subscription } from 'rxjs';

import { OfferFilterPopupComponent } from '@gintaa/modules/deal-new/components/deal/offer-filter-popup/offer-filter-popup.component';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { SelectedOfferDealComponentComponent } from '../selected-offer-deal-component/selected-offer-deal-component.component';
import { Options } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-deal-offers-list-popup',
  templateUrl: './deal-offers-list-popup.component.html',
  styleUrls: ['./deal-offers-list-popup.component.scss']
})
export class DealOffersListPopupComponent implements OnInit {
  offerId: string = null;
  userAllOffer: Offer[] = [];
  userAllOfferList: Offer[] = [];
  userSelectedOffers: any = [];
  selectedOffer: Offer[] = [];
  actionType: string = '';
  actionText: string = '';
  modalDialogSelected: any
  modalDialogFilter: any
  currentPage: number = 0;
  offerPerPage: number = 8;
  firstLoadCheck: boolean = true;
  userId: string = '';
  selector: string = '.list-offer';
  pageType: string = 'suggest';
  clickedfrom: string = 'left';
  categoryList: any = [];
  publicationList: any = [];
  receiverName: string;
  offerNoImage: string = 'assets/images/no-image.png';
  callerIsReceiver:boolean = false;
  filterObject = {
    categoryId: '',
    publishedDate: '',
    itemCondition: ''
  }
  priceRange: any = {
    minPrice: 0,
    maxPrice: 0,
    minValue: 0,
    maxValue: 0
  }
  options: Options = {
    floor: this.priceRange.minPrice,
    ceil: this.priceRange.maxPrice
  };
  offerMatches: any = [];
  matchesSubscriber: Subscription;
  isBuniness: boolean = false;
  constructor(
    private store: Store<gintaaApp.AppState>,
    public matDialog: MatDialog,
    private dealService: DealService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.offerMatches = []
    if (data) {
      this.offerPerPage = data.offerPerPage;
      this.actionType = data.actionType;
      this.offerId = data.offerId;
      this.userId = data.userId;
      this.pageType = data.pageType;
      this.receiverName = data.receiverName;
      this.callerIsReceiver = data.callerIsReceiver;
      this.clickedfrom = data.clickedfrom;
      this.isBuniness = data?.isBuniness ? data?.isBuniness : false;
    }
  }

  ngOnInit(): void {
    if(this.clickedfrom == 'left'){
      this.actionText = 'your’s';
    } else {
      this.actionText = 'the partner’s';
    }
    if (this.actionType === 'receiver') {
      this.store.select(selectReceiverAllOffers).subscribe((offerState: any) => {
        if (offerState.length === 1 && this.firstLoadCheck) {
          if (this.pageType == 'suggest') {
            this.onScrollDown();
          }
          this.firstLoadCheck = false;
        } else {
          this.firstLoadCheck = false;
        }
        this.userAllOffer = offerState;
        this.userAllOfferList = offerState;
        this.setCategoryList(offerState);
        this.setPublishedList(offerState);
        this.setPriceRange(offerState);
      });

      this.store.select(selectReceiverSelectedOffers).subscribe((offerState: any) => {
        this.userSelectedOffers = offerState;
        this.selectedOffer = offerState.filter((offer) => offer.selectedOffer);
      });

    } else {
      this.store.select(selecSenderAllOffers).subscribe((offerState: any) => {
        this.userAllOffer = offerState;
        this.userAllOfferList = offerState;
        this.setCategoryList(offerState);
        this.setPublishedList(offerState);
        this.setPriceRange(offerState);
        this.selectedOffer = offerState.filter((offer) => offer.selectedOffer);
      });
      this.store.select(selectSenderSelectedOffers).subscribe((offerState: any) => {
        this.userSelectedOffers = offerState;
        this.selectedOffer = offerState.filter((offer) => offer.selectedOffer);
      });
    }
    this.store.select(closeDealModel).subscribe((type: any) => {
      if (type === 'filter') {
        this.updateFilter();
        this.modalDialogFilter.close();
      } else if (type === 'selected') {
        this.modalDialogSelected.close();
      }
      this.store.dispatch(
        DealActions.closeModel({ modelType: '' })
      );
    });
  }

  setPriceRange(offerState) {
    this.priceRange = {
      minPrice: 0,
      maxPrice: 0,
      minValue: 0,
      maxValue: 0
    };
    if (offerState && offerState.length > 0) {
      offerState.forEach(val => {
        if (this.priceRange.maxPrice < val?.unitOfferValuation) {
          this.priceRange.maxPrice = val?.unitOfferValuation;
          this.priceRange.maxValue = val?.unitOfferValuation;
        }
      });
      this.options.floor = this.priceRange.minPrice;
      this.options.ceil = this.priceRange.maxPrice;
    }

  }

  setCategoryList(offerState) {
    this.categoryList = [];
    if (offerState && offerState.length > 0) {
      offerState.forEach(val => {
        const indexc = this.categoryList.findIndex((val2) => val2?.categoryId == val?.category?.categoryId);
        if (indexc == -1) {
          this.categoryList.push(val.category);
        }
      });
    }
  }

  setPublishedList(offerState) {
    this.publicationList = [];
    if (offerState && offerState.length > 0) {
      offerState.forEach(val => {
        const indexc = this.publicationList.findIndex((val2) => {
          return Moment(val2).format('YYYYMMDD') == Moment(val?.createdDate).format('YYYYMMDD');
        });
        if (indexc == -1) {
          this.publicationList.push(val.createdDate);
        }
      });
    }
  }

  openFilterDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-filter-component';
    dialogConfig.position = { top: '10px' };
    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {
      categoryList: this.categoryList,
      publicationList: this.publicationList,
      filterObject: this.filterObject,
      priceRange: this.priceRange,
      options: this.options,
      offerCount: this.userAllOffer.length
    };
    this.modalDialogFilter = this.matDialog.open(OfferFilterPopupComponent, dialogConfig);
  }

  closeModel() {
    this.matDialog.closeAll();
  }

  onChange(data: any) {
    let userAllOffer_temp = [...this.userSelectedOffers];
    const offerTempIndex = userAllOffer_temp.findIndex(offer => (offer.offerId == data.offerId));
    userAllOffer_temp.splice(offerTempIndex, 1, data.offer);
    this.selectedOffer = userAllOffer_temp.filter((offer) => offer.selectedOffer);
    this.userSelectedOffers = userAllOffer_temp;
    if (data.offer.selectedOffer) {
      this.matchesSubscriber = this.dealService.getmatchData(data.offerId, '5')
        .subscribe(result => {
          if (result['code'] == 200 && result['payload'] && result['payload']['offerResponseInfos']) {
            this.offerMatches = result['payload']['offerResponseInfos'];
          } else {
            this.offerMatches = [];
          }
        },
          err => {
            this.offerMatches = [];
          });
    }
  }

  getCurrectOffer(offerId, userSelectedOffers) {
    return userSelectedOffers.find(val => val.offerId == offerId);
  }

  saveSelectedOffer() {
    if (this.actionType === 'receiver') {
      this.store.dispatch(
        DealActions.updateReceiverAllOffer({ userData: this.userSelectedOffers })
      );
    } else {
      this.store.dispatch(
        DealActions.updateSenderAllOffer({ userData: this.userSelectedOffers })
      );
    }
    this.matDialog.closeAll();
  }

  openOfferDialog(actionType: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-selected-deal-component';
    dialogConfig.position = { top: '10px' };
    dialogConfig.height = 'auto';
    dialogConfig.width = '760px';
    const selectedOffer = [];
    if(this.selectedOffer && Array.isArray(this.selectedOffer)){
      this.selectedOffer.forEach((val)=>{
        const offer = this.userAllOffer.find((val2)=>val2.offerId == val.offerId);
        if(offer){
          selectedOffer.push(offer)
        }
      })
    }
    dialogConfig.data = {
      actionType: actionType,
      selectedOffer: selectedOffer,
    };
    this.modalDialogSelected = this.matDialog.open(SelectedOfferDealComponentComponent, dialogConfig);
  }
  onScrollDown() {
    if (this.actionType === 'receiver' && this.firstLoadCheck) {
      this.store.dispatch(
        DealActions.fetchUserAllOffer({ userId: this.userId, isBusiness: this.isBuniness, offerId: this.offerId})
      );
    }
  }

  changeCategoryOption(event: any) {
    this.filterObject.categoryId = event.target.value;
    if (this.filterObject.categoryId == '') {
      this.userAllOffer = this.userAllOfferList;
    } else {
      const userallOfferTemp = this.userAllOfferList.filter((val) => val.category?.categoryId == this.filterObject.categoryId)
      this.userAllOffer = userallOfferTemp;
    }
  }

  updateFilter() {
    let userTempList = this.userAllOfferList;
    if (this.filterObject.categoryId != '') {
      userTempList = userTempList.filter((val) => val.category?.categoryId == this.filterObject.categoryId)
    }
    if (this.filterObject.publishedDate != '') {
      userTempList = userTempList.filter((val) => {
        return Moment(val?.createdDate).format('YYYYMMDD') == Moment(this.filterObject.publishedDate).format('YYYYMMDD');
      })
    }
    if (this.filterObject.itemCondition != '') {
      userTempList = userTempList.filter((val) => val.itemCondition == this.filterObject.itemCondition)
    }
    if (this.priceRange) {
      userTempList = userTempList.filter(val => {
        if (val?.unitOfferValuation) {
          if (val?.unitOfferValuation <= this.priceRange.maxValue && val?.unitOfferValuation >= this.priceRange.minValue) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
    }

    this.userAllOffer = userTempList;
  }

  errorImageHandler(event){
    event.target.src = this.offerNoImage;
  }
  getOfferImage(img:any){
    if(img && img.hasOwnProperty('url') ){
      return img['url'];
    }
    return this.offerNoImage;
  }
}