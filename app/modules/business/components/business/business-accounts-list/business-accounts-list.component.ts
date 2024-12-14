import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CreateBusinessAccountComponent } from '@gintaa/shared/components/create-business-account/create-business-account.component';

import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { BusinessAccountPopupComponent } from '../business-account-popup/business-account-popup.component';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { InactiveBusinessAccountComponent } from '@gintaa/shared/components/inactive-business-account/inactive-business-account.component';
import { SharedService } from '@gintaa/shared/services/shared.service';
import localization from '@gintaa/config/localization';


@Component({
  selector: 'app-business-accounts-list',
  templateUrl: './business-accounts-list.component.html',
  styleUrls: ['./business-accounts-list.component.scss']
})
export class BusinessAccountsListComponent implements OnInit {

  allBusinessProfiles: any[] = [];
  allBusinessInvitations: any[] = [];
  defaultBusinessProfileImage: string = 'assets/images/business/company-logo.svg';
  usingMockAPI: boolean = true;
  successMessage: string = null;
  pageLoading: boolean = false;

  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    private sharedService: SharedService,
  ) { }

  breadcrumb: any = [{
    name: 'My business accounts',
    show: true,
    click: false,
    // name: 'My profile',
    // link: '/profile',
  }];

  ngOnInit(): void {
    this.clearSuccessMessgae();
    this.utilitySubscriber();
    this.fetchAllBusinessAccounts();
    this.fetchAllBusinessInvitations();
    this.subscribeToBusinessStore();
  }

  clearSuccessMessgae() {
    this.store.dispatch(
      BusinessActions.clearSuccessMessgae()
    );
  }

  fetchAllBusinessAccounts() {
    this.showLoader();
    this.store.dispatch(
      BusinessActions.fetchBusinessProfile()
    );
  }

  fetchAllBusinessInvitations() {
    this.showLoader();
    this.store.dispatch(
      BusinessActions.fetchBusinessInvitations()
    );
  }

  subscribeToBusinessStore() {
    this.store.select(selectBusinessState).subscribe((businessState) => {
      if (businessState.businessProfiles) {
        this.allBusinessProfiles = [
          ...businessState.businessProfiles.VERIFIED,
          ...businessState.businessProfiles.UNVERIFIED
        ].map((businessProfile) => {
          let definedClass = '';

          switch (businessProfile.color) {
            case '#6b9c2e':
              definedClass = 'border-lcolor';
              break;

            case '#48cef3':
              definedClass = 'deacive-blcolor';
              break;

            case '#ee2a7b':
              definedClass = 'blacive-scolor';
              break;

            default:
              definedClass = 'border-lcolor';
              break;
          }

          return {
            ...businessProfile,
            definedClass
          }
        })

        // console.log('allBusinessProfiles:', this.allBusinessProfiles);
      }

      if (businessState.businessInvitations) {
        this.allBusinessInvitations = [ ...businessState.businessInvitations ];
      }

      if (businessState.refreshBusinessInvitations) {
        if (businessState.invitationAction === 'INVITATION_ACCEPT') {
          this.sharedService.showToaster(localization.business.INVITATION_ACCEPTED, 'success');
        } else {
          this.sharedService.showToaster(localization.business.INVITATION_REJECTED, 'success');
        }
        this.fetchAllBusinessInvitations();
      }

      if (businessState.successMessage || businessState.errorMessage ) {
        this.successMessage = businessState.successMessage;
        this.hideLoader();
      }
    })
  }

  utilitySubscriber() {
    this.store.select(selectUtilityState).subscribe(utililyState => {
      this.pageLoading = utililyState.loading;
    });
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  businessAccountDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(CreateBusinessAccountComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  inactiveBusinessProfileModal(businessId: string, businessName: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-business-switch-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = {
      name: businessName
    };

    const modalDialog = this.matDialog.open(InactiveBusinessAccountComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // this.switchBusinessProfile(businessId);
    });
  }

  openBusinessProfilePage(businessId: string, verifyStatus: boolean, businessName: string) {
    if(verifyStatus) {
      // this.router.navigate([`/business/view/${businessId}`]);
    } else {
      this.inactiveBusinessProfileModal(businessId, businessName);
    }
    
  }

  changeActivationState(businessId: string) {
    if (businessId) {
      const currentBusiness = this.allBusinessProfiles.filter((business) => {
        return business.businessId === businessId;
      });

      if (currentBusiness[0].activated) {
        // call API to deactivate
        // MOCK NOW
        this.store.dispatch(
          BusinessActions.deActivateBusinessProfile()
        );

        if (this.usingMockAPI) {
          this.allBusinessProfiles.forEach((business, index) => {
            if (business.businessId === businessId) {
              this.allBusinessProfiles[index].activated = false;
            }
          })
        }
      } else {
        // call API to activate
        // MOCK NOW
        this.store.dispatch(
          BusinessActions.activateBusinessProfile()
        );

        // update the activated flag for selected businessId
        if (this.usingMockAPI) {
          this.allBusinessProfiles.forEach((business, index) => {
            this.allBusinessProfiles[index].activated = false;
            if (business.businessId === businessId) {
              this.allBusinessProfiles[index].activated = true;
            }
          })
        }
      }
    }
  }

  businessSuccessDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(BusinessAccountPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  acceptInvitation(businessId: string) {
    this.store.dispatch(BusinessActions.acceptInvitation({
      businessId
    }))
  }

  rejectInvitation(businessId: string) {
    this.store.dispatch(BusinessActions.rejectInvitation({
      businessId,
      reason: 'May be later'
    }))
  }

}
