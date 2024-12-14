import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { receivedAccountDetails } from '@gintaa/modules/home/models/UtilityState.model';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { Subscription } from 'rxjs';
import { AddBankAccountComponent } from '@gintaa/shared/features/receive-account/add-bank-account/add-bank-account.component';
import { ConfirmDeleteAccountComponent } from '@gintaa/shared/features/receive-account/confirm-delete-account/confirm-delete-account.component';

@Component({
  selector: 'app-show-account-list',
  templateUrl: './show-account-list.component.html',
  styleUrls: ['./show-account-list.component.scss']
})
export class ShowAccountListComponent implements OnInit {

  @Input() businessId?: string = null;

  utilityStoreSubscriber: Subscription;  
  allReceiveAccountList: receivedAccountDetails[] = [];

  constructor(        
    private store: Store<gintaaApp.AppState>,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    
    // console.log('::::::::::::: businessId :::::::::::::', this.businessId);

    this.fetchAllReceivePaymentDetails();
    this.subscribeToUtilityStore();
  }  

  fetchAllReceivePaymentDetails() {
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

  subscribeToUtilityStore() {
    this.utilityStoreSubscriber = this.store.select(selectUtilityState).subscribe(utilityState => {
      this.allReceiveAccountList = (!this.businessId) ? utilityState.receivedAccountDetailsList : utilityState.receivedAccountDetailsListBusiness;
    })    
  }
  
  addBankDialog() {
    this.openBankDialog();
  }
  
  openBankDialog(item: any = null) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '20px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = { item: item, businessId: this.businessId };

    const modalDialog = this.matDialog.open(AddBankAccountComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  editAccount(item: any) {
    // console.log("edit account:", item);
    this.openBankDialog(item);
  }

  deleteAccount(item: any) {
    // console.log("Delete account:", item);
    this.openConfirmDeleteDilog(item);

  }

  openConfirmDeleteDilog(item: any) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '20px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '450px';
    dialogConfig.data = item;

    const modalDialog = this.matDialog.open(ConfirmDeleteAccountComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  

  ngOnDestroy() {
    // this.utilityStoreSubscriber.unsubscribe();
  }

}
