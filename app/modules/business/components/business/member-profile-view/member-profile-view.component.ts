import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '@gintaa/core/services/storage.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { BusinessDetails, BusinessState, BusinessTeam } from '@gintaa/modules/business/models/BusinessState.model';

@Component({
  selector: 'app-member-profile-view',
  templateUrl: './member-profile-view.component.html',
  styleUrls: ['./member-profile-view.component.scss']
})
export class MemberProfileViewComponent implements OnInit {

  businessId: string;
  businessMemberId: string;
  member: BusinessTeam;
  selectedView: string = 'GRID'; // LIST

  currentBusinessDetails: BusinessDetails;
  currentBusinessOfers: any[] = [];
  breadcrumb: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    public matDialog: MatDialog,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {


    // fetch current business id
    this.businessId = this.route.snapshot.params.id;
    this.businessMemberId = this.route.snapshot.params.memberId;

    // fetch all roles
    this.getAllBusinessRoles(this.businessMemberId);

    // fetch member details
    this.fetchBusinessUserDetails();

    // Fetch business details
    this.fetchBusinessDetails(this.businessId);

    // subscibe from store
    this.subscribeBusinessMember();


  }

  fetchBusinessDetails(businessId: string) {
    this.store.dispatch(
      BusinessActions.fetchBusinessDetails({ businessId })
    )
  }

  getAllBusinessRoles(businessId: string) {
    if (businessId) {
      this.store.dispatch(
        BusinessActions.getAllBusinessRoles({ businessId })
      )
    }
  }

  fetchBusinessUserDetails() {
    if (this.businessId && this.businessMemberId) {
      this.store.dispatch(
        BusinessActions.fetchBusinessMemberDetails({
          businessId: this.businessId,
          memberId: this.businessMemberId
        })
      );
    }
  }

  fetchAllOffersByMember() {
    if (this.businessId && this.member && this.member?.memberDetails) {
      this.store.dispatch(
        BusinessActions.fetchBusinessOffersByIdentityId({
          identityId: this.member.memberDetails?.identityId,
          showCompletedOffers: false,
          states: 'ALL'
        })
      )
    }
  }

  subscribeBusinessMember() {
    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {

      if (businessState.selectedBusinessMember?.offers?.length) {
        this.currentBusinessOfers = [...businessState.selectedBusinessMember.offers];
      } else {
        this.currentBusinessOfers = [];
      }
      this.member = businessState.selectedBusinessMember;

      if (businessState.selectedBusinessMember?.refetchOffers) {
        this.fetchAllOffersByMember();
      }

      if (businessState.closeOpenedModel) {
        // Close all popups
        this.matDialog.closeAll();
      }

      if (businessState.removeMemberFromBusiness) {
        // Redirect to member list page
        let currentBusinessId = this.member.businessProfileId;
        let redirectPath = '/business/view/' + currentBusinessId + '/teams/';
        this.router.navigate([redirectPath]);
      }

      if (businessState.refreshBusinessMembers) {
        // Redirect to member list page
        this.fetchBusinessUserDetails();
      }

      if (businessState.currentBusinessDetails) {
        this.currentBusinessDetails = businessState.currentBusinessDetails;
        this.getBreadcrumbObj();
      }



    })
  }


  getBreadcrumbObj() {
    this.breadcrumb = [{
      name: this.currentBusinessDetails.name,
      show: true,
      link: '/business/view/'+this.businessId+'',
      click: false,
    }, {
      name: 'Teams',
      show: true,
      link: '/business/view/'+this.businessId+'/teams',
      click: false,
    }, {
      name: this.currentBusinessDetails.businessOwner.name,
      show: true,
      click: false,
    }];



  }



}
