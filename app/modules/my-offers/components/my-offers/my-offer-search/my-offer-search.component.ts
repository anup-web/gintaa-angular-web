import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { defaultConfigMyOffer } from '@gintaa/modules/my-offers/configs/my-offer.constant';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import { MyOfferService } from '@gintaa/modules/my-offers/services/my-offer.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';

export interface MyOfferUserInfoState {
  name: string;
  value: string;
  completed: boolean;
  contentType: string; 
}
export interface MyOfferTasks {  
  offerTypes?: MyOfferUserInfoState[];
  offerConditions?: any[];
  publicationDates?: MyOfferUserInfoState[];
}
@Component({
  selector: 'app-my-offer-search',
  templateUrl: './my-offer-search.component.html',
  styleUrls: ['./my-offer-search.component.scss']
})
export class MyOfferSearchComponent implements OnInit {  
  
  defaultCondition = [
    {name: 'Used', completed: false},
    {name: 'Refurbished', completed: false},
    {name: 'Antique', completed: false},
    {name: 'New', completed: false}
  ]

  myOfferTasks: MyOfferTasks = {
    offerTypes: [
      {
        name: OfferTypes.Published, value: OfferTypes.Published,  completed: false, contentType: 'primary'
      },
      {
        name: OfferTypes.UnderReview, value: OfferTypes.Review, completed: false, contentType: 'accent'
      },
      {
        name: OfferTypes.Draft, value: OfferTypes.Draft, completed: false, contentType: 'warn'
      },
      {
        name: OfferTypes.Rejected, value: OfferTypes.Rejected, completed: false, contentType: 'primary'
      },
      {
        name: OfferTypes.Hidden, value: OfferTypes.Hidden, completed: false, contentType: 'accent'
      }
    ],
    offerConditions: this.defaultCondition,
    publicationDates: [      
      {name: 'Last week', value: 'Last week', completed: false, contentType: 'primary'},
      {name: '1 month', value: '1 month', completed: false, contentType: 'accent'},
      {name: '2 months', value: '2 months', completed: false, contentType: 'warn'}
    ]
  }

  

  allOfferTypeComplete: boolean = false;
  page: number = defaultConfigMyOffer.page;
  offset: number = defaultConfigMyOffer.offset;
  myOfferFilterParams: any = {
    offerTypeArr : [],
    itemConditionArr: [],
    publicationDate: null,
    searchText: null
  }
  filterDraftOffer: boolean;
  selectedDate: string = null;
  @ViewChild('searchInputValue', { static: false }) public searchInputValue: ElementRef;
  @Output("offerStatus") offerStatus: EventEmitter<any> = new EventEmitter();

  constructor(
    private store: Store<gintaaApp.AppState>,
    private myOfferService: MyOfferService) { }

  ngOnInit(): void {
    this.myOfferService.removeOfferType$
    .subscribe(res => {
      if(res) {
        let key = Object.keys(res)[0];
        switch (key) {
          case 'OfferType':
            this.myOfferFilterParams.offerTypeArr = this.myOfferFilterParams.offerTypeArr.filter(item => item !== res[key])
            this.myOfferTasks.offerTypes = this.myOfferTasks.offerTypes.map(obj => ({
              ...obj,
              completed: obj.value == res[key] ? false : obj.completed
            }));
            break;
          case 'OfferCondition':
            this.myOfferFilterParams.itemConditionArr = this.myOfferFilterParams.itemConditionArr.filter(item => item !== res[key])
            this.myOfferTasks.offerConditions = this.myOfferTasks.offerConditions.map(obj => ({
              ...obj,
              completed: obj.name == res[key] ? false : obj.completed
            }));
            break;
          default:
            break;
        }
      }
    })
  }  

  updateAllComplete() {
    this.allOfferTypeComplete = this.myOfferTasks.offerTypes != null && this.myOfferTasks.offerTypes.every(t => t.completed);
  }

  setOfferType(completed: boolean, value: string) {
    this.offerStatus.emit(value);
    let offerTypeArr = [...this.myOfferFilterParams.offerTypeArr];
    if(completed) {
      offerTypeArr = offerTypeArr ? [...offerTypeArr, value] : [value]      
    } else {
      offerTypeArr = offerTypeArr.filter(item => item !== value);
    }
    this.myOfferTasks.offerTypes = this.myOfferTasks.offerTypes.map(obj => ({
      ...obj,
      completed: obj.value == value ? completed : obj.completed
    }));
    this.myOfferFilterParams.offerTypeArr = offerTypeArr;    
    this.sendData();
  }

  setOfferCondition(completed: boolean, name: string) {
    let itemConditionArr = [...this.myOfferFilterParams.itemConditionArr];
    if(completed) {
      itemConditionArr = itemConditionArr ? [...itemConditionArr, name] : [name]      
    } else {
      itemConditionArr = itemConditionArr.filter(item => item !== name);
    }
    this.myOfferFilterParams.itemConditionArr = itemConditionArr;  
    this.myOfferTasks.offerConditions = this.myOfferTasks.offerConditions.map(obj => ({
      ...obj,
      completed: obj.name == name ? completed : obj.completed
    }));  
    this.sendData();
  }

  setPublicationDate(data: string) {
    // this.myOfferFilterParams.publicationDate = event.target.value;
    this.myOfferFilterParams.publicationDate = data;
    this.sendData();
  }  
    
  // setSearchText(event: any) {
  //   this.myOfferFilterParams.searchText = event.target.value;
  //   this.sendData();
  // }

  sendData() {
    this.myOfferService.filterValue.next({
      'offerStage' : this.myOfferFilterParams.offerTypeArr,
      'itemCondition' : this.myOfferFilterParams.itemConditionArr,
      'publicationDate': this.myOfferFilterParams.publicationDate,
      // 'searchText': this.myOfferFilterParams.searchText
    });
  }

  clearFilter(type: string) {
    switch (type) {
      case 'all':
        this.myOfferFilterParams.offerTypeArr = [];
        this.myOfferFilterParams.itemConditionArr = [];
        this.myOfferFilterParams.publicationDate = null;
        // this.myOfferFilterParams.searchText = null;
        //this.searchInputValue.nativeElement.value = null;
        this.selectedDate = '';
        this.myOfferTasks.offerTypes = this.myOfferTasks.offerTypes.map(obj => ({
          ...obj,
          completed: false
        }));
        this.myOfferTasks.offerConditions = this.myOfferTasks.offerConditions.map(obj => ({
          ...obj,
          completed: false
        }));
        this.offerStatus.emit({name: OfferTypes.All});
        this.filterDraftOffer = false;
        break;
      case 'status':
        this.myOfferFilterParams.offerTypeArr = [];
        this.myOfferTasks.offerTypes = this.myOfferTasks.offerTypes.map(obj => ({
          ...obj,
          completed: false
        }));
        this.filterDraftOffer = false;
        this.offerStatus.emit({name: OfferTypes.All});
        break;
      case 'itemCondition':
        this.myOfferFilterParams.itemConditionArr = [];
        this.myOfferTasks.offerConditions = this.myOfferTasks.offerConditions.map(obj => ({
          ...obj,
          completed: false
        }));
        break;
      case 'publicationDate':
        this.myOfferFilterParams.publicationDate = null;
        this.selectedDate = '';
        break;
      default:
        break;
    }
    this.sendData();
  }

  exists(condition) {
    return condition.completed;
  }
}
