import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { BusinessAdminPopupComponent } from '@gintaa/modules/offer/components/offer/business-admin-popup/business-admin-popup.component';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-view-offers',
  templateUrl: './list-view-offers.component.html',
  styleUrls: ['./list-view-offers.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class ListViewOffersComponent implements OnInit {

  @Input() offers: any[];

  constructor(
    public matDialog: MatDialog,
    private store: Store,
  ) { }

  ngOnInit(): void { }

  openAssignModal(offerId: string, businessId: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-assign-offer-component';
    dialogConfig.position = {
      top: '20px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      businessId: businessId,
      offerId: offerId
    };

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

}
