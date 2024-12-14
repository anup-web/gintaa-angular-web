import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import localization from '@gintaa/config/localization';

@Component({
  selector: 'app-business-invitations',
  templateUrl: './business-invitations.component.html',
  styleUrls: ['./business-invitations.component.scss']
})
export class BusinessInvitationsComponent implements OnInit {
  
  allBusinessInvitations: any[] = [];
  defaultBusinessProfileImage: string = 'assets/images/business/company-logo.svg';
  // usingMockAPI: boolean = true;
  successMessage: string = null;
  pageLoading: boolean = false;

  bredCrumbInput = [
    {
      name:'My business invitations',
      show: true,
      click: false,
    }
  ];


  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    // this.clearSuccessMessgae();
    this.fetchAllBusinessInvitations();
    // this.subscribeToBusinessStore();
    this.utilitySubscriber();
  }  

  clearSuccessMessgae() {
    // this.store.dispatch(
    //   UtilityActions.clearSuccessMessgae()
    // );
  }

  fetchAllBusinessInvitations() {
    this.showLoader();
    this.store.dispatch(
      UtilityActions.fetchBusinessInvitations()
    );
  }
  
  // subscribeToBusinessStore() {
  //   this.store.select(selectBusinessState).subscribe((businessState) => {
     
  //     if (businessState.businessInvitations) {
  //       this.allBusinessInvitations = [ ...businessState.businessInvitations ];
  //     }

  //     if (businessState.refreshBusinessInvitations) {
  //       if (businessState.invitationAction === 'INVITATION_ACCEPT') {
  //         this.sharedService.showToaster(localization.business.INVITATION_ACCEPTED, 'success');
  //       } else {
  //         this.sharedService.showToaster(localization.business.INVITATION_REJECTED, 'success');
  //       }
  //       this.fetchAllBusinessInvitations();
  //     }

  //     if (businessState.successMessage || businessState.errorMessage ) {
  //       this.successMessage = businessState.successMessage;
  //       this.hideLoader();
  //     }
  //   })
  // }
  

  utilitySubscriber() {
    this.store.select(selectUtilityState).subscribe(utililyState => {
      // this.pageLoading = utililyState.loading;

      if (utililyState.businessInvitations) {
        this.allBusinessInvitations = [ ...utililyState.businessInvitations ];
      }

      if (utililyState.refreshBusinessInvitations) {
        if (utililyState.invitationAction === 'INVITATION_ACCEPT') {
          this.sharedService.showToaster(localization.business.INVITATION_ACCEPTED, 'success');
        } else {
          this.sharedService.showToaster(localization.business.INVITATION_REJECTED, 'success');
        }
        
        setTimeout(()=>{ 
          this.fetchAllBusinessInvitations(); 
        }, 1000);
        
      }

      if (utililyState.successMessage || utililyState.errorMessage ) {
        this.successMessage = utililyState.successMessage;
        // this.hideLoader();
      }

    });
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  acceptInvitation(businessId: string) {
    this.store.dispatch(UtilityActions.acceptInvitation({
      businessId
    }))
  }

  rejectInvitation(businessId: string) {
    this.store.dispatch(UtilityActions.rejectInvitation({
      businessId,
      reason: 'May be later'
    }))
  }

}
