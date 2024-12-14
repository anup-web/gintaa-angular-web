import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { closeStep } from '@gintaa/modules/deal-new/store/deal.selectors';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-deal-close-popup',
  templateUrl: './deal-close-popup.component.html',
  styleUrls: ['./deal-close-popup.component.scss']
})
export class DealClosePopupComponent implements OnInit, OnDestroy {

  closeStepSubscriber: Subscription;
  dealRefNo: string = null;
  closeStep: string = '';
  closeDeal: boolean = false;
  identityId: string;
  showOtp: boolean = true;
  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    public matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    if(data){
      this.dealRefNo = data.dealRefNo;
      this.closeStep = data.closeStep;
      this.closeDeal = data.closeDeal;
      this.identityId = data.identityId;
      this.showOtp = data.showOtp;
    }
  }
  
  ngOnInit(): void {
    this.closeStepSubscriber = this.store.select(closeStep).subscribe(closeStep => {
      this.closeStep = closeStep != '' ? closeStep : this.closeStep;
    });
  }

  closeModel(close:string = ''){
    let closeStep = '';
    if(this.closeStep == 'PARTIAL_CLOSED'){
      closeStep = 'partial_closed';
    } else if(this.closeStep == 'ABANDON'){
      closeStep = 'abandoned';
    } else if(this.closeStep == 'REPORT'){
      closeStep = 'reported';
    } else if(this.closeStep != ''){
      closeStep = 'closed';
    }
    if(close=='' && closeStep !=''){
      setTimeout(() => {
        this.reloadDeal()
        //this.navigateList(closeStep);
      }, 100);
    } else{
      this.store.dispatch(
        DealActions.closeDealStatus()
      );
      this.matDialog.closeAll();
    }
  }
  rateDeal() {
    this.store.dispatch(
      DealActions.rateDeal()
    );
  }

  reloadDeal(){
    this.matDialog.closeAll();
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`deals/details/${this.dealRefNo}`])
    );
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_parent');
    }
  }

  navigateList(closeStep:any) {
    this.store.dispatch(
      DealActions.updateCurrentFetch({
        dealType:closeStep
      })
    );

    this.router.navigate(['/deals']);
    this.store.dispatch(
      DealActions.closeDealStatus()
    );
    this.matDialog.closeAll();
  }

  ngOnDestroy() {
    this.closeStepSubscriber.unsubscribe();
  }

}
