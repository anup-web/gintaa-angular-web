import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '@gintaa/core/services/storage.service';
import { BusinessDetails } from '@gintaa/modules/business/models/BusinessState.model';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { Store } from '@ngrx/store';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FeatureListEnum, FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';

@Component({
  selector: 'app-business-offers',
  templateUrl: './business-offers.component.html',
  styleUrls: ['./business-offers.component.scss']
})
export class BusinessOffersComponent implements OnInit {

  currentBusinessId: string = null;
  currentBusinessRole: string = null;
  currentBusinessDetails: BusinessDetails;
  currentBusinessOfers: any[] = [];
  filteredBusinessOfers: any[] = [];
  dealRatings: any[] = [];
  selectedView: string = 'GRID'; // LIST'
  businessUrlSlug: string;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private analyticsService: FirebaseAnalyticsService
  ) { }

  ngOnInit(): void {
    
    const businessSlug: string = this.activatedRoute.snapshot.params.businessSlug;
    // console.log('businessUrlSlug:', businessUrlSlug);
    if (businessSlug != undefined) {
      this.businessUrlSlug = businessSlug;
      this.fetchBusinessDetailsBySlug(businessSlug);
      this.businessDetailsSubscriber();

    } else if (this.storageService.getSelectedBusiness()) {

      this.currentBusinessId = this.storageService.getSelectedBusiness().businessId || null;
      this.currentBusinessRole = this.storageService.getSelectedBusiness().businessRole || null;

      if (this.currentBusinessId) {
        this.fetchBusinessDetails(this.currentBusinessId);
        this.businessDetailsSubscriber();
      }
    }


    this.visitBusinessPreview();
  }

  fetchBusinessDetailsBySlug(businessSlug: string){
    if(businessSlug && businessSlug !== undefined){
      this.store.dispatch(
        BusinessActions.fetchBusinessDetailsBySlug({ businessSlug })
      );
    }
  }

  fetchBusinessDetails(businessId: string) {
    this.store.dispatch(
      BusinessActions.fetchBusinessDetails({ businessId })
    );

    this.store.dispatch(
      BusinessActions.fetchBusinessAllPublishedOffers({
        businessId,
        showCompletedOffers: false,
      })
    );

    this.store.dispatch(
      BusinessActions.fetchDealComments({ businessId })
    );
  }

  businessDetailsSubscriber() {
    this.store.select(selectBusinessState).subscribe((business) => {
      this.currentBusinessDetails = { ...business.currentBusinessDetails };
      this.currentBusinessOfers = [ ...business.currentBusinessOfers ];
      this.filteredBusinessOfers = [ ...this.currentBusinessOfers ];
      // this.dealRatings = [ ...business.dealRatings ];
    });
  }

  navigateToFeedbackList(){
    this.router.navigate([`profile/${this.currentBusinessId}/feedback`]);
  }

  filterWithOfferName(searchText: string) {
    this.filteredBusinessOfers = this.currentBusinessOfers.filter((business) => {
      return business.name.toLowerCase().includes(searchText.toLowerCase())
    })
  }

  visitBusinessPreview() {
    let eventName = FirebaseAnalyticsEnum.visitBusinessPreview
    this.analyticsService.logEvents(eventName);
  }

  

  
}
