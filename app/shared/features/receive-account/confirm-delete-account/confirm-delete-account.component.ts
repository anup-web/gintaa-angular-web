import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { receivedAccountDetails } from '@gintaa/modules/home/models/UtilityState.model';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.scss']
})
export class ConfirmDeleteAccountComponent implements OnInit {
  accountDetails: receivedAccountDetails;
  closeOpenedPopup: boolean = false;
  errorMessage: string = null;
  successMessage: string = null;
  businessId: string = null;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData,
    private store: Store<gintaaApp.AppState>
  ) {
    if (dialogData) {
      this.accountDetails = dialogData;
      this.businessId = (dialogData.businessId != undefined) ? dialogData.businessId : null;
     // console.log('accountDetails:', this.accountDetails);
    }
  }

  showLoader: boolean = false; 

  ngOnInit(): void {
    this.subscribeToUtilityStore();
    this.errorMessage = null; 
  }

  subscribeToUtilityStore() {
    this.store.select(selectUtilityState).subscribe(utilityState => {
      this.closeOpenedPopup = utilityState.closeOpenedPopup;
      this.errorMessage     = utilityState.errorMessage;
      this.successMessage   = utilityState.successMessage;

      if(this.successMessage) {
        this.showLoader = false;
      }

      // close popup
      if (this.closeOpenedPopup) {
        this.onDialogClose();
      }
    })
    
  }

  onDialogClose() {
    this.dialogRef.close();
    this.errorMessage = null; 
    if (this.closeOpenedPopup) {
      this.store.dispatch(
        UtilityActions.closeOpenedPopupReset()
      )
      

      if(!this.businessId) { 
        // List for personal profile       
        this.store.dispatch(
          UtilityActions.getAllReceivePaymentList()
        )
      } else {
        // List for business
        this.store.dispatch(
          UtilityActions.getAllReceivePaymentListForBusiness({businessId: this.businessId})
        )      
      }
    }
  }

  confirmDeleteAccount(){ 

    //console.log('businessId:', this.businessId);
    this.showLoader = true;
    if(!this.businessId) { 
      // delete for personal profile
      this.store.dispatch(
        UtilityActions.deleteReceivePaymentAccount({paymentDetailId: this.accountDetails.id})
      )
    } else {
      // delete for business profile      
      this.store.dispatch(
        UtilityActions.deleteReceivePaymentAccountForBusiness({
          paymentDetailId: this.accountDetails.id, 
          businessId: this.businessId
        })
      )
    }
  } 

}
