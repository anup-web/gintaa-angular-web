import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { SharedService } from '@gintaa/shared/services/shared.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectDealState } from '@gintaa/modules/deal-new/store/deal.selectors';
import * as Constants from '@gintaa/config/constant.config';
import {
    DealAvailableTabs,
    DealConfig,
    DealState,
    FetchDealRequestObject
} from '@gintaa/modules/deal-new/models/deal.model';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import localization from '@gintaa/config/localization';
import { FormBuilder } from '@angular/forms';
import Moment from 'moment';
import { MyDealSearchComponent} from '@gintaa/modules/deal-new/components/deal/my-deals/my-deal-search/my-deal-search.component'
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-my-deals',
    templateUrl: './my-deals.component.html',
    styleUrls: ['./my-deals.component.scss']
})
export class MyDealsComponent implements OnInit {
    allPossibleDealTabs = DealAvailableTabs;
    defaultFetch: '';
    currentFetch: any =  {
        type: [Constants.DEAL_FILTER_TYPE_ALL],
        status: [Constants.DEAL_STATUS_ALL]
    };
    config: DealConfig;
    deals: any = [];
    dealsTemp: any = [];
    maxWaitUntil: number = null;
    currentPage = 0;
    dealPerPage = 10;
    pageSize = 99;
    offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';
    loading: boolean = true;
    firstLoad: boolean = true;
    onlyFavourite: boolean = false;
    breadcrumb: any = [{
        name: 'My offers',
        link: '/deals',
        click: 'refreshLink',
    }];
    favDealRefId: any = {
        favAdded: [],
        favRemoved: []
    }
    searchForm: any;
    search = {
        dealTypes: [
            { name: 'Accepted', selected: false, id: this.allPossibleDealTabs.DEAL_ACCEPTED },
            { name: 'Incoming', selected: false, id: this.allPossibleDealTabs.DEAL_INCOMING },
            { name: 'Outgoing', selected: false, id: this.allPossibleDealTabs.DEAL_OUTGOING },
            { name: 'Closed', selected: false, id: this.allPossibleDealTabs.DEAL_CLOSED },
            { name: 'Rejected', selected: false, id: this.allPossibleDealTabs.DEAL_REJECTED },
            { name: 'Violated', selected: false, id: this.allPossibleDealTabs.DEAL_VIOLATED },
            { name: 'Revised', selected: false, id: this.allPossibleDealTabs.DEAL_REVISED },
            { name: 'Partial Closed', selected: false, id: this.allPossibleDealTabs.PARTIAL_CLOSED },
            { name: 'Abandoned', selected: false, id: this.allPossibleDealTabs.DEAL_ABANDONED },
            { name: 'Reported', selected: false, id: this.allPossibleDealTabs.DEAL_REPORTED }
        ]
    };
    screenWidth:number = (isPlatformBrowser(this.platformId)) ? window.innerWidth : 0;
    modalOpend:boolean = false;
    sortBy:string = '';
    dealStateSubscription: Subscription;
    favouriteSubscriber: Subscription;
    fetchDealSubscriber: Subscription;
    isPageLoading: boolean = true;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private store: Store<gintaaApp.AppState>,
        private dealService: DealService,
        public sharedService: SharedService,
        public matDialog: MatDialog,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.searchForm = this.fb.group({
            dealTypes: this.buildDealTypes(),
            publishedDate:''
        });
    }

    get dealTypes() {
        return this.searchForm?.get('dealTypes');
    };

    get publishedDate() {
        return this.searchForm?.get('publishedDate');
    };

    buildDealTypes() {
        const arr = this.search.dealTypes.map(dealType => {
          return this.fb.control(dealType.selected);
        });
        return this.fb.array(arr);
    }

    ngOnInit(): void {
        this.dealStateSubscription = this.store.select(selectDealState).subscribe((dealState: DealState) => {
            if(dealState.currentOption && dealState.currentOption?.type){
                this.currentFetch = dealState.currentOption;
                this.updateSelectedForm()
            }
        });
        this.checkAndFetchDeal();
    }

    ngOnDestroy(){
        try{
            this.dealStateSubscription.unsubscribe();
            this.favouriteSubscriber.unsubscribe();
        } catch(e){
        }
    }

    checkAndFetchDeal(append: boolean = false) {
        if (!append) {
            this.currentPage = 0;
            this.favDealRefId = {
                favAdded: [],
                favRemoved: []
            };
            this.firstLoad = true;
        } else {
            this.firstLoad = false;
        }
        const requestInput = this.fetchDealTypeRequestInput(false);
        this.fetchDeal(requestInput, append);
    }

    updateSelectedForm(){
        const dealType = [false, false, false, false, false, false, false, false, false, false];
        const statusList = this.currentFetch.status;
        statusList.map((status)=> {
            if(status !== 'INITIATED'){
                let index = this.search.dealTypes.findIndex((val:any) => val.id == status.toLowerCase());
                if(index !== -1){
                    dealType[index] = true;
                    this.searchForm.get("dealTypes").setValue(dealType);
                    this.breadcrumb = [{
                        name: 'My offers',
                        link: '/deals',
                        click: 'refreshLink',
                    },{
                        name: this.search.dealTypes[index]['name'],
                        link: '',
                    }];
                } else {
                    this.breadcrumb = [{
                        name: 'My offers',
                        link: '/deals',
                        click: 'refreshLink',
                      },{
                        name: 'All',
                        link: '',
                    }];
                }
                
            } else{
                let name = [];
                const index = this.currentFetch.type.findIndex((val)=>  val === 'RECEIVED' )
                if(index !== -1 ) {
                    name.push('Incoming');
                } 
                const index2 = this.currentFetch.type.findIndex((val)=>  val === 'SENT' )
                if(index2 !== -1 ) {
                    name.push('Outgoing');
                }
                this.breadcrumb = [{
                    name: 'My offers',
                    link: '/deals',
                    click: 'refreshLink',
                  },{
                    name: name[0],
                    link: '',
                }];
                name.forEach(element => {
                    let index = this.search.dealTypes.findIndex((val:any) => val.id == element.toLowerCase());
                    if(index !== -1){
                        dealType[index] = true;
                        this.searchForm.get("dealTypes").setValue(dealType);
                    }
                });
            }
        });
        
        this.searchForm.get("dealTypes").setValue(dealType);
    }

    fetchDeal(input: FetchDealRequestObject, append: boolean) {
        this.fetchDealSubscriber = this.dealService.getAllDeal(input)
            .subscribe(result => {
                this.updateSelectedForm();
                if (result['code'] == 200 && result['payload'] && Array.isArray(result['payload'])) {
                    if (this.firstLoad && this.currentPage == 0) {
                        this.scrollToTop();
                    }
                    if (append) {
                        this.deals = [...this.deals, ...result['payload']];
                    } else {
                        this.deals = [...result['payload']];
                    }
                    this.dealsTemp = [...this.deals];
                }
                this.isPageLoading = false;
            },
            err => {
                this.isPageLoading = false;
            });
    }

    fetchDealTypeRequestInput(refreshDeals: boolean) {
        let input: FetchDealRequestObject = {
            status: Constants.DEAL_STATUS_ALL,
            page: this.currentPage,
            size: this.pageSize,
            type: Constants.DEAL_FILTER_TYPE_ALL
        };

        if (refreshDeals) {
            const loadCount = (this.currentPage + 1) * this.pageSize;
            input = { ...input, page: 0, size: loadCount };
        }
        if (this.currentFetch != '') {
            let type:any = ['ALL']
            const all = this.currentFetch.type.findIndex(val => val === 'ALL');
            if(all !== -1){
                type = ['ALL'];
            } else{
                if(this.currentFetch.type.length === 1){
                    type = this.currentFetch.type;
                } else{
                    type = ['ALL'];
                }
            }
            input = {
                ...input, 
                status: this.currentFetch.status,
                type: type,
            }
        }
        if(this.publishedDate && this.publishedDate.value) {
            let endDate:any = Moment(new Date()).format('YYYYMMDD');
            let startDate:any = '';
            if(this.publishedDate.value == '7'){
                startDate = Moment(new Date()).subtract(7, 'd').format('YYYYMMDD');
            } else if(this.publishedDate.value == '15'){
                startDate = Moment(new Date()).subtract(15, 'd').format('YYYYMMDD');
            } else if(this.publishedDate.value == '30'){
                startDate = Moment(new Date()).subtract(1, 'M').format('YYYYMMDD');
            }  else if(this.publishedDate.value == '90'){
                startDate = Moment(new Date()).subtract(3, 'M').format('YYYYMMDD');
            } else if(this.publishedDate.value == '180'){
                startDate = Moment(new Date()).subtract(6, 'M').format('YYYYMMDD');
            }  else{
                endDate = '';
                startDate = '';
            }
            input = {
                ...input,
                startDate: startDate,
                endDate: endDate
            }
        }
        if(this.sortBy && this.sortBy !=''){
            input = {
                ...input,
                sortBy:this.sortBy
            }
        }
        return input;
    }

    onScrollDown() {
        if (this.deals.length % this.dealPerPage === 0) {
            this.currentPage = Math.floor((this.deals.length / this.dealPerPage));
            this.checkAndFetchDeal(true);
        }
    }

    navigateToDealDetails(data: any) {
        if(data?.directBuy){
            this.router.navigate([`/deals/order-details/${data.dealId}`]);
        } else {
            const dealType = data.dealType?.toLowerCase()
            //if (dealType === 'initiated' || dealType === 'accepted' || dealType === 'closed' || dealType === 'partial_closed' || dealType === 'rejected' || dealType === 'revised' || dealType === 'abandoned' || dealType === 'reported') {
                this.router.navigate([`/deals/details/${data.dealId}`]);
            //}
        }
    }

    navigateToOffer(offerId) {
        const url = this.router.serializeUrl(
            this.router.createUrlTree([`/offer/${offerId}`])
        );
        window.open(url, '_blank');
    }

    addToFavourite(data) {
        const dealRefId = data['dealId'];
        const actionType = data['actionType'];
        this.favouriteSubscriber = this.dealService.addFavouriteDeal(dealRefId, actionType)
            .subscribe(result => {
                if (actionType === 'add') {
                    if (result['body']['code'] == 200) {
                        const index = this.favDealRefId['favRemoved'].indexOf(dealRefId);
                        if (index != -1) {
                            let favRemoved = this.favDealRefId['favRemoved'];
                            favRemoved.splice(index, 1);
                            this.favDealRefId['favRemoved'] = favRemoved;
                        }
                        this.favDealRefId['favAdded'].push(dealRefId);
                        this.sharedService.showToaster(localization.deal.ADD_DEAL_FAVOURITE_SUCCESS, 'success');
                    } else {
                        this.sharedService.showToaster(localization.deal.ADD_DEAL_FAVOURITE_FAILED, 'warning');
                    }
                } else {
                    if (result['code'] == 200) {
                        const index = this.favDealRefId['favAdded'].indexOf(dealRefId);
                        if (index != -1) {
                            let favAdded = this.favDealRefId['favAdded'];
                            favAdded.splice(index, 1);
                            this.favDealRefId['favAdded'] = favAdded;
                        }
                        this.favDealRefId['favRemoved'].push(dealRefId);
                        this.sharedService.showToaster(localization.deal.REMOVE_DEAL_FAVOURITE_SUCCESS, 'success');
                    } else {
                        this.sharedService.showToaster(localization.deal.REMOVE_DEAL_FAVOURITE_FAILED, 'warning');
                    }
                }
            },
                err => {
                    if (actionType === 'add') {
                        const message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.deal.ADD_DEAL_FAVOURITE_FAILED) : localization.deal.ADD_DEAL_FAVOURITE_FAILED)) : localization.deal.ADD_DEAL_FAVOURITE_FAILED;
                        this.sharedService.showToaster(message, 'warning')
                    } else {
                        const message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.deal.REMOVE_DEAL_FAVOURITE_FAILED) : localization.deal.REMOVE_DEAL_FAVOURITE_FAILED)) : localization.deal.REMOVE_DEAL_FAVOURITE_FAILED;
                        this.sharedService.showToaster(message, 'warning')
                    }
                });
    }
    updateTypeQuery(selectedType, currentType){
        if(selectedType.length == 0){
            return [currentType];
        } else{
            const all = selectedType.findIndex(val => val === currentType);
            if(all !== -1){
                return selectedType;
            } else{
                return [...selectedType, currentType];
            }
        }
    }
    updateStatusQuery(selectedStatus, currentStatus){
        if(selectedStatus.length == 0){
            return [currentStatus];
        } else{
            const all = selectedStatus.findIndex(val => val === 'ALL');
            if(all !== -1){
                return ['ALL'];
            } else{
                const index = selectedStatus.findIndex(val => val === currentStatus);
                if(index !== -1){
                    return selectedStatus;
                } else{
                    return [...selectedStatus, currentStatus];
                }
            }
        }
    }

    updateFilter() {
        const selectedDealType = this.search.dealTypes.filter((dealType, index) => {
            return this.dealTypes.value[index]
        });
        let selectedType = [];
        let selectedStatus = [];
        if(selectedDealType && selectedDealType.length){
            selectedDealType.map((dealtype)=>{
                switch (dealtype.id) {
                    case DealAvailableTabs.DEAL_ACCEPTED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_ACCEPTED);
                    break;
                    case DealAvailableTabs.DEAL_INCOMING:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_INCOMING);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_INITIATED);
                      break;
                    case DealAvailableTabs.DEAL_OUTGOING:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_SENT);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_INITIATED);
                      break;
                    case DealAvailableTabs.DEAL_CLOSED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_CLOSED);
                      break;
                    case DealAvailableTabs.DEAL_REJECTED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_REJECTED);
                      break;
                    case DealAvailableTabs.DEAL_VIOLATED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_VIOLATED);
                      break;
                    case DealAvailableTabs.DEAL_REVISED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_REVISED);
                      break;
                    case DealAvailableTabs.PARTIAL_CLOSED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_P_CLOSED);
                      break;
                    case DealAvailableTabs.DEAL_ABANDONED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_ABANDONED);
                      break;
                    case DealAvailableTabs.DEAL_REPORTED:
                        selectedType = this.updateTypeQuery(selectedType, Constants.DEAL_FILTER_TYPE_ALL);
                        selectedStatus = this.updateStatusQuery(selectedStatus, Constants.DEAL_STATUS_REPORTED);
                      break;
                  }
            });
        } else{
            selectedType = [Constants.DEAL_FILTER_TYPE_ALL];
            selectedStatus = [Constants.DEAL_STATUS_ALL];
        }
        this.currentFetch =  {
            type: selectedType,
            status: selectedStatus
        };

        this.checkAndFetchDeal();
    }

    scrollToTop() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    }

    openFilterModal(){
        this.modalOpend = true;
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'gintaa-filter-offer-component';
        dialogConfig.height = '100%';
        dialogConfig.width = '100vw';
        dialogConfig.maxWidth = '100vw';
        dialogConfig.hasBackdrop = false;
        dialogConfig.panelClass = 'full-screen-modal';
        dialogConfig.data = {
         
        };
    
        const modalDialog = this.matDialog.open(MyDealSearchComponent, dialogConfig);
        modalDialog.componentInstance.searchForm = this.searchForm;
        modalDialog.componentInstance.search = this.search;
        modalDialog.componentInstance.onlyFavourite = this.onlyFavourite;
        modalDialog.componentInstance.updateFavourite.subscribe(($e) => {
            this.onlyFavourite = $e;
            this.matDialog.closeAll();
            this.sortOffers();
        });
        modalDialog.componentInstance.updateFilter.subscribe(($e) => {
            this.matDialog.closeAll();
            this.updateFilter();
        });
        modalDialog.afterClosed().subscribe((results) => {
            this.modalOpend = false;
        });
    }

    closeModal(){
        this.matDialog.closeAll();
    }

    updateSortBy(val){
        this.sortBy = val;
        this.sortOffers();
    }

    refreshLink(){
        const dealType = [false, false, false, false, false, false, false, false, false, false];
        this.searchForm.get("dealTypes").setValue(dealType);
        this.searchForm.get("publishedDate").setValue('');
        this.updateFilter();
    }
    updateFavourite(value=false){
        this.onlyFavourite = value;
        this.sortOffers();
    }
    sortOffers(){
        let dealsTemp = [];
        if(this.deals && Array.isArray(this.deals)){
            dealsTemp = [...this.deals];
            if(this.sortBy == 'dealSentTimeStamp'){
                dealsTemp = this.deals.sort((val, val2) => {
                    if(Moment(val?.dealSentTimeStamp).format('YYYYMMDD') > Moment(val2.dealSentTimeStamp).format('YYYYMMDD')){
                        return -1
                    } else {
                        return 1;
                    }
                })
            } else if(this.sortBy == 'favourite'){
                dealsTemp = this.deals.sort((val, val2) => {
                    return val2?.favouriteDeal ? 1 : -1;
                })
            } else if(this.sortBy == 'rating'){
                dealsTemp = this.deals.sort((val, val2) => {
                    if(val2?.callerIsReceiver){
                        if(val2?.dealRatedByReceiver){
                            return val?.dealReceiverRating > val2?.dealReceiverRating ? -1 : 1;
                        } else {
                            return -1;
                        }
                    } else {
                        if(val2?.dealRatedBySender){
                            return val?.dealSenderRating > val2?.dealSenderRating ? -1 : 1;
                        } else {
                            return -1;
                        }
                    }
                })
            } else {
                dealsTemp = this.dealsTemp
            }
            if(this.onlyFavourite){
                dealsTemp = dealsTemp.filter((val2) => {
                    return val2?.favouriteDeal;
                })
            }
            this.deals = [...dealsTemp];
        }
    }
}
