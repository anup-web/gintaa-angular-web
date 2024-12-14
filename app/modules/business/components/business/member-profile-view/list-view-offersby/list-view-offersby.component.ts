import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssignOfferPopupComponent } from '../../assign-offer-popup/assign-offer-popup.component';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { BusinessAdminPopupComponent } from '@gintaa/modules/offer/components/offer/business-admin-popup/business-admin-popup.component';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-view-offersby',
  templateUrl: './list-view-offersby.component.html',
  styleUrls: ['./list-view-offersby.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class ListViewOffersbyComponent implements OnInit {

  @Input() offers: any[];

  constructor(
    public matDialog: MatDialog,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  openAssignModal(offerId: string, businessId: any) {
    // console.log(businessId);
    // return false;

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-assign-offer-component';
    dialogConfig.position = {
      top: '20px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      businessId: businessId,
      offerId: offerId
    };

    // const modalDialog = this.matDialog.open(AssignOfferPopupComponent, dialogConfig);
    const modalDialog = this.matDialog.open(BusinessAdminPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      if(results) {        
        let offerDeledateStatus = results.offerDeledateStatus;
        if(offerDeledateStatus) {
          // Refresh data
          this.reFetchBusinessOffers();
        }
      }
    });
  }

  reFetchBusinessOffers() {
    this.store.dispatch(
      BusinessActions.refetchBusinessOffer()
    )
  }

  

  // openAdminDialog() {
  //   const dialogConfig: MatDialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.id = 'gintaa-login-component';
  //   dialogConfig.position = {
  //     top: '10px',
  //   };

  //   dialogConfig.height = 'auto';
  //   dialogConfig.width = '496px';
  //   dialogConfig.data = {
  //     role: 'ADMIN',
  //     businessId: this.businessInfo.businessId,
  //     offerId: this.selectedOfferDetail.offerId
  //   };

  //   const modalDialog = this.matDialog.open(BusinessAdminPopupComponent, dialogConfig);
  //   modalDialog.afterClosed().subscribe((results) => {
  //     // do something with results
  //   });
  // }

}
