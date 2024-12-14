import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';

import { AddNewMemberComponent } from '@gintaa/modules/business/components/business/team-member-popup/add-new-member/add-new-member.component';

import { isPlatformBrowser } from '@angular/common';
import {
  BusinessDetails, BusinessMemberFilterType, BusinessMemberTypes, BusinessRole, BusinessState, BusinessTeam
} from '@gintaa/modules/business/models/BusinessState.model';
import { MatRadioChange } from '@angular/material/radio';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InvitedMemberComponent } from '../team-member-popup/invited-member/invited-member.component';
import { DeleteMemberComponent } from '../team-member-popup/delete-member/delete-member.component';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { StorageService } from '@gintaa/core/services/storage.service';

@Component({
  selector: 'app-my-business',
  templateUrl: './my-business.component.html',
  styleUrls: ['./my-business.component.scss']
})
export class MyBusinessComponent implements OnInit, OnDestroy {

  @ViewChild('searchInputValue', { static: false }) public searchInputValue: ElementRef;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  totalOfferCount$: Observable<number>;
  currentBusinessId: string;
  pageLoading: boolean = false;
  allBusinessRoles: BusinessRole[];
  currentBusinessDetails: BusinessDetails;
  businessMembers: BusinessTeam[] = [];
  filteredbusinessMembers: any[] = [];
  breadcrumb: any[] = [];
  radioButtonValue: string = null;
  memberStatus: string = null;
  myBusinessFilterParams: any = {
    currentMemberType : null,
    businessMemberRoleArr: [],
    publicationDate: null,
    searchText: null
  };
  businessMemberFilter: BusinessMemberFilterType = {
    memberTypes: [
      {name: BusinessMemberTypes.Accepted, selected: false, contentType: 'primary'},
      {name: BusinessMemberTypes.Rejected, selected: false, contentType: 'warn'},
      {name: BusinessMemberTypes.Removed, selected: false, contentType: 'warn'},
      {name: BusinessMemberTypes.Pending, selected: false, contentType: 'accent'},
    ],
    businessMemberRole: [
      {name: 'OWNER', selected: false},
      {name: 'ADMIN', selected: false},
      {name: 'MEMBER', selected: false},
    ],
    publicationDates: [
      {name: 'Last week', selected: false, contentType: 'primary'},
      {name: '1 month', selected: false, contentType: 'accent'},
      {name: '2 months', selected: false, contentType: 'warn'}
    ],
  };

  allowBusinessMemberAdd: boolean = true;
  allowBusinessMemberView: boolean = true;

  constructor(
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedService: SharedService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0,0);
    }
    this.currentBusinessId = this.route.snapshot.params.id;

    const selectedBusiness = this.storageService.getSelectedBusiness();
    if (selectedBusiness) {
      const { businessId, businessRole} = selectedBusiness;
      if (businessId === this.currentBusinessId) {
        this.allowBusinessMemberAdd = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_ADD_TEAM', businessRole);
        this.allowBusinessMemberView = this.sharedService.allowBusinessAction('BUSINESS_PROFILE_VIEW_TEAM', businessRole);
      }
    }

    this.clearSuccessMessgae();
    this.utilitySubscriber();
    this.fetchBusinessMembers(this.currentBusinessId);
    this.getAllBusinessRoles(this.currentBusinessId);
    this.fetchBusinessDetails(this.currentBusinessId);
    this.businessMemberSubscriber();
  }

  fetchBusinessDetails(businessId: string) {
    this.store.dispatch(
      BusinessActions.fetchBusinessDetails({ businessId })
    )
  }

  clearSuccessMessgae() {
    this.store.dispatch(
      BusinessActions.clearSuccessMessgae()
    );
  }

  fetchBusinessMembers(businessId: string) {
    this.showLoader();
    if (businessId) {
      this.store.dispatch(
        BusinessActions.fetchBusinessMembers({ businessId })
      )
    }
  }

  getAllBusinessRoles(businessId: string) {
    if (businessId) {
      this.store.dispatch(
        BusinessActions.getAllBusinessRoles({ businessId })
      )
    }
  }

  businessMemberSubscriber() {
    this.store.select(selectBusinessState)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((businessState: BusinessState) => {
      if (businessState.successMessage) {
        this.hideLoader();
      }

      if (businessState.allBusinessRoles){
        this.allBusinessRoles = businessState.allBusinessRoles;
      }

      if (businessState.refreshBusinessMembers) {
        this.fetchBusinessMembers(this.currentBusinessId);
      }

      if(businessState.currentBusinessDetails) {
        this.currentBusinessDetails = businessState.currentBusinessDetails;
        this.getBreadcrumbObj();
      }

      if (businessState.currentBusinessMembers) {
        this.businessMembers = [];
        if (businessState.currentBusinessMembers.Accepted) {
          businessState.currentBusinessMembers.Accepted.forEach(memberAccepted => {
            this.businessMembers.push({...memberAccepted, memberStatus: BusinessMemberTypes.Accepted });
          });
        }

        if (businessState.currentBusinessMembers.Rejected) {
          businessState.currentBusinessMembers.Rejected.forEach(memberRejected => {
            this.businessMembers.push({ ...memberRejected, memberStatus: BusinessMemberTypes.Rejected });
          });
        }

        if (businessState.currentBusinessMembers.Removed) {
          businessState.currentBusinessMembers.Removed.forEach(memberRemoved => {
            this.businessMembers.push({ ...memberRemoved, memberStatus: BusinessMemberTypes.Removed });
          });
        }

        if (businessState.currentBusinessMembers.Pending) {
          businessState.currentBusinessMembers.Pending.forEach(memberPending => {
            this.businessMembers.push({ ...memberPending, memberStatus: BusinessMemberTypes.Pending });
          });
        }

        this.filteredbusinessMembers = [ ...this.businessMembers ];
      }

      if (businessState.closeOpenedModel) {
        // reset the values before closing
        this.matDialog.closeAll();
        
      }

    })
  }
  
  businessTeamDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-business-members-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = {businessId: this.currentBusinessId, allBusinessRoles: this.allBusinessRoles};

    const modalDialog = this.matDialog.open(AddNewMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
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

  clearFilter(type: string) {
    switch (type) {

      case 'all':
        this.memberStatus = null;
        this.radioButtonValue = null;
        this.myBusinessFilterParams.currentMemberType = null;
        this.myBusinessFilterParams.businessMemberRoleArr = [];
        this.myBusinessFilterParams.publicationDate = null;
        this.myBusinessFilterParams.searchText = null;
        this.businessMemberFilter.businessMemberRole = this.businessMemberFilter.businessMemberRole.map(obj => ({
          ...obj,
          completed: false
        }));
        this.filterBusinessMemberData();
        break;

      case 'memberStatus':
        this.memberStatus = null;
        this.radioButtonValue = null;
        this.filterBusinessMemberData();
        break;

      case 'businessRole':
        this.myBusinessFilterParams.businessMemberRoleArr = [];
        this.businessMemberFilter.businessMemberRole = this.businessMemberFilter.businessMemberRole.map(obj => ({
          ...obj,
          completed: false
        }));
        this.filterBusinessMemberData();
        break;
    }
  }

  setSearchText(event: any) {
    this.myBusinessFilterParams.searchText = event.target.value;
    this.filterBusinessMemberData();
  }

  setBusinessMemberType(event: MatRadioChange) {
    this.myBusinessFilterParams.currentMemberType = event.value;
    this.memberStatus = event.value.name;
    this.filterBusinessMemberData();
  }

  filterWithBusinessRole(selected: boolean, name: string) {
    let businessMemberRoleArr = [...this.myBusinessFilterParams.businessMemberRoleArr];
    if (selected) {
      businessMemberRoleArr = businessMemberRoleArr ? [...businessMemberRoleArr, name] : [name];
    } else {
      businessMemberRoleArr = businessMemberRoleArr.filter(item => item !== name);
    }

    this.myBusinessFilterParams.businessMemberRoleArr = businessMemberRoleArr;
    this.filterBusinessMemberData();
  }

  filterBusinessMemberData() {
    if (this.businessMembers.length > 0) {
      let filteredDataFinal = [ ...this.businessMembers ];

      if (this.myBusinessFilterParams.businessMemberRoleArr.length > 0) {
        filteredDataFinal = this.businessMembers.filter(member => {
          return this.myBusinessFilterParams.businessMemberRoleArr.includes(member.businessRole.toUpperCase())
        });
      }

      if (this.memberStatus !== null) {
        filteredDataFinal = filteredDataFinal.filter(member => {
          return member.memberStatus === this.memberStatus
        });
      }

      if (this.myBusinessFilterParams.searchText) {
        filteredDataFinal = filteredDataFinal.filter(member => {
          return member.memberDetails.name.toLowerCase().includes(this.myBusinessFilterParams.searchText.toLowerCase())
        });
      }

      this.filteredbusinessMembers = [ ...filteredDataFinal ];
    }
  }

  // NOT USED ANYMORE
  filterBusinessMemberStatus() {
    if (this.memberStatus === null) {
      this.filteredbusinessMembers = [ ...this.businessMembers ];
    } else {
      this.filteredbusinessMembers = this.businessMembers.filter(member => {
        return member.memberStatus === this.memberStatus
      });
    }
  }

  exists(condition) {
    return condition.selected;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }


  memberCartClick(member: any) {

    if (!this.allowBusinessMemberView) { return; }

    switch (member.memberStatus) {
      case 'Accepted':
        //  Redirect to member edit page
        this.redirectToMemberDetailsPage(member);

        break;
      case 'Pending':
        // Open resend invitation popup
        this.openResendInvitationPopup(member);
        break;
      case 'Rejected':
        // Open Remove popup
        // this.openRemovePopup(member);
        // console.log("Nothing to do");
        break;
      default:
        // Do nothing
    }
  }

  redirectToMemberDetailsPage(member: any) {
    let businessId = member.businessProfileId;
    let memberId = member.memberId;
    let redirectUrl = '/business/view/'+businessId+'/teams/'+memberId;
    this.router.navigate([redirectUrl]);
  }

  openResendInvitationPopup(member: any) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-business-member-update';
    dialogConfig.position = {
      top: '10px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = {
      member: member,
      allBusinessRoles: this.allBusinessRoles
    };

    const modalDialog = this.matDialog.open(InvitedMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  openRemovePopup(member: any) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-business-member-update';
    dialogConfig.position = {
      top: '10px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = {
      member: member,
      invitationType: 'rejected'
    };

    const modalDialog = this.matDialog.open(DeleteMemberComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }


  getBreadcrumbObj() {
    this.breadcrumb = [{
      name: this.currentBusinessDetails.name,
      show: true,
      link: '/business/view/'+this.currentBusinessId+'',
      click: false,
    }, {
      name: 'Teams',
      show: true,
      click: false,
    }];

}

}
