import { Component, OnInit } from '@angular/core';
import { FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import { MyOfferService } from '@gintaa/modules/my-offers/services/my-offer.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import Moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '../../../models/my-offers.model';
import { selectMyOfferState } from '../../../store/my-offer.selector';

@Component({
  selector: 'app-my-offer-list',
  templateUrl: './my-offer-list.component.html',
  styleUrls: ['./my-offer-list.component.scss']
})
export class MyOfferListComponent implements OnInit { 
  loggedInUserAllOffers$: Observable<Offer[]>;
  userFiltredOffers$: Observable<Offer[]>;
  totalOfferCount$: Observable<number>;
  totalListCount: number = null;
  isListActive: boolean = false;
  currentFilterValues: any[] = [];
  searchText: string = null;
  
  constructor(
    private store: Store<gintaaApp.AppState>,
    private myOfferService: MyOfferService,
    private analyticsService: FirebaseAnalyticsService) { }

  ngOnInit(): void {
    this.loggedInUserAllOffers$ = this.store.select(selectMyOfferState).pipe(map(res => res.publishedOffers));  
    
    this.myOfferService.filterValue$
    .subscribe(res => {
      if(res) {
        let keys = Object.keys(res);
        let values = Object.values(res);
        this.currentFilterValues = res;
        let offerTypeValueArr = [];
        let itemConditionValueArr = [];
        let filterValue = null;
        if(keys.includes('offerStage') && res['offerStage']) {
          //offerTypeValueArr = res['offerStage'].name === OfferTypes.UnderReview ? 'Review' : res['offerStage'].name;
          // offerTypeValueArr = res['offerStage'].name === OfferTypes.Draft ? null : filteredValue;          
          offerTypeValueArr = res['offerStage'];
        }
        if(keys.includes('itemCondition')) {
          itemConditionValueArr = res['itemCondition'];
        }   
        if(keys.includes('publicationDate')) {
          filterValue = res['publicationDate'];
        }           
        this.userFiltredOffers$ = this.loggedInUserAllOffers$
        .pipe(
          map(offers => {
            // if(filteredValue || (res['offerStage'] && res['offerStage'].name === OfferTypes.Draft)) {
            //   offers = offers.filter(offer => offer['offerStage'] === filteredValue)
            // }
            if(offerTypeValueArr.length) {
              // offers = itemConditionValueArr.map(item => offers.filter(offer => offer[key] === item))
              let offerArr = [];
              offerTypeValueArr.forEach(item => {
                offerArr = [...offerArr, ...offers.filter(offer => offer['offerStage'] === (item === OfferTypes.Draft ? null : item))]
              })
              offers = [...offerArr];
            }
            if(itemConditionValueArr.length) {
              // offers = itemConditionValueArr.map(item => offers.filter(offer => offer[key] === item))
              let offerArr = [];
              itemConditionValueArr.forEach(item => {
                offerArr = [...offerArr, ...offers.filter(offer => offer['itemCondition'] === item)]
              })
              offers = [...offerArr];
            }
            if(filterValue) {              
              let filteredDate = null;
              let dateFilteredOffers = [];
              if(filterValue == '7_days'){
                filteredDate = Moment(new Date()).subtract(7, 'd').format("YYYY-MM-DD");
              } else if(filterValue == '15_days'){
                filteredDate = Moment(new Date()).subtract(15, 'd').format("YYYY-MM-DD");
              } else if(filterValue == '1_month'){
                filteredDate = Moment(new Date()).subtract(1, 'M').format("YYYY-MM-DD");
              }  else if(filterValue == '3_month'){
                filteredDate = Moment(new Date()).subtract(3, 'M').format("YYYY-MM-DD");
              } else if(filterValue == '6_month'){
                filteredDate = Moment(new Date()).subtract(6, 'M').format("YYYY-MM-DD");
              } else {
                filteredDate = null;
              } 
              if(filteredDate) {
                filteredDate = new Date(filteredDate)
                dateFilteredOffers = offers.filter(offer => {
                  let offerDate = null;
                  if(offer.draftOfferId && offer.offerStage === null) {
                    offerDate = offer['createdDate'] && Moment(offer['createdDate']).format("YYYY-MM-DD");
                  } else {
                    offerDate = offer['publishedDate'] && Moment(offer['publishedDate']).format("YYYY-MM-DD");
                  }
                  if(offerDate) {
                    let date = new Date(offerDate)
                    return +date >= +filteredDate
                  } 
                });
                offers = [...dateFilteredOffers]
              } else {
                offers = [...offers];
              } 
            }
            if(keys.includes('searchText') && res['searchText']) {
              let offerPublishedArr = [];
              offerPublishedArr = offers.filter(offer => offer['name'] && offer['name'].toLowerCase().includes(res['searchText'].toLowerCase()));
              offers = [...offerPublishedArr]
            } 
            if(!keys.includes('searchText') && this.searchText) {
              let offerPublishedArr = [];
              offerPublishedArr = offers.filter(offer => offer['name'] && offer['name'].toLowerCase().includes(this.searchText.toLowerCase()));
              offers = [...offerPublishedArr]
            }
            return offers;
          })          
        );
      } else {
        this.userFiltredOffers$ = this.loggedInUserAllOffers$;
      }      
      this.totalOfferCount$ = this.userFiltredOffers$.pipe(map(res => this.totalListCount = res.length))
    });

    this.visitMyOffer();
  }

  setSearchText(event: any) {
    this.searchText = event.target.value;
    if(this.searchText == '') {
      this.myOfferService.filterValue.next({
        'offerStage' : this.currentFilterValues['offerStage'] || [],
        'itemCondition' : this.currentFilterValues['itemCondition'] || [],
        'publicationDate': this.currentFilterValues['publicationDate'] || null,
        'searchText': this.searchText
      });
    }    
  }

  setSearchData($event: KeyboardEvent, searchText: string) {
    this.searchText = searchText;
    if($event.key === 'Enter') {
      this.myOfferService.filterValue.next({
        'offerStage' : this.currentFilterValues['offerStage'] || [],
        'itemCondition' : this.currentFilterValues['itemCondition'] || [],
        'publicationDate': this.currentFilterValues['publicationDate'] || null,
        'searchText': searchText
      });
    }    
  }

  sendFilterData(value) {
    this.searchText = value;
    this.myOfferService.filterValue.next({
      'offerStage' : this.currentFilterValues['offerStage'] || [],
      'itemCondition' : this.currentFilterValues['itemCondition'] || [],
      'publicationDate': this.currentFilterValues['publicationDate'] || null,
      'searchText': this.searchText
    });
  }

  removeOfferFilterValues(value: any) {
    this.myOfferService.removeOfferType.next(value);
    let key = Object.keys(value)
    this.myOfferService.filterValue.next({
      'offerStage' : (key[0] === 'OfferType') ? this.currentFilterValues['offerStage'].filter(item => item !== value[key[0]]) : this.currentFilterValues['offerStage'],
      'itemCondition' : (key[0] === 'OfferCondition') ? this.currentFilterValues['itemCondition'].filter(item => item !== value[key[0]]) : this.currentFilterValues['itemCondition'],
      'publicationDate': this.currentFilterValues['publicationDate'] || null,
      'searchText': this.searchText
    });
  }

  isFilterValuesPresent(): boolean {
    return (this.currentFilterValues['offerStage'] && this.currentFilterValues['offerStage'].length) 
    || (this.currentFilterValues['itemCondition'] && this.currentFilterValues['itemCondition'].length)
    || this.currentFilterValues['publicationDate']
  }

  visitMyOffer() {
    let eventName = FirebaseAnalyticsEnum.visitMyOfferList;
    this.analyticsService.logEvents(eventName);
  }


}
