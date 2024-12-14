import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-business-offer-delegate',
  templateUrl: './business-offer-delegate.component.html',
  styleUrls: ['./business-offer-delegate.component.scss']
})
export class BusinessOfferDelegateComponent implements OnInit {

  @Input() businessId: string;
  @Input() offerId: string;

  public memberList: any[];

  public offerDelegateStatus: boolean = false;
  public errorMessage: string;

  constructor(
    public matDialog: MatDialog,
    private store: Store<any>,
    private dialogRef: MatDialogRef<BusinessOfferDelegateComponent>,
  ) { }

  ngOnInit(): void {
    this.getAllActiveMembers();
    this.utilitySubscriber();    
  }


  utilitySubscriber() {
    this.store.select(selectUtilityState).subscribe(utililyState => {
      this.memberList = utililyState.currentBusinessActiveMembers;
      // console.log('memberList:', this.memberList);
      this.errorMessage = utililyState.errorMessage;
      this.offerDelegateStatus = utililyState.offerDelegateStatus;
      if(this.offerDelegateStatus) {
        this.closePopup(this.offerDelegateStatus);
        this.changeOfferDelegationStatusFalse();
      }
    });
  }

  getAllActiveMembers() {
    this.store.dispatch(
      UtilityActions.getCurrentBusinessActiveMembers({businessId: this.businessId})
    )
  }
  
  closePopup(offerDeledateStatus: boolean = false) {
    let data: any = {offerDeledateStatus: offerDeledateStatus}
    this.dialogRef.close(data);
    
  }
  
  changeOfferDelegationStatusFalse() {
    this.store.dispatch(
      UtilityActions.changeOfferDelegationStatusFalse({status: false})
    )
  }

  delegateMember(event: any) {
    // console.log(event);
    let memberIdentityId = event.value;
    // 
    this.store.dispatch(
      UtilityActions.delegateBusinessOffer({memberIdentityId: memberIdentityId, offerId: this.offerId})
    )
  }  

}
