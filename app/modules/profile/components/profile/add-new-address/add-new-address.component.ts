import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { noop, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addEditAddressStatusSelector, selectProfileState} from '@gintaa/modules/profile/store/profile.selectors';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit, OnDestroy {

  profileStateSubscriber: Subscription;
  showAddressMap: Boolean = true;
  actionMode:string;
  address:any;
  errorStatus: Boolean = false;
  addresscount: any = 0;
  payloaderror: any = [];
  currentAddress: any = null;
  errorMessage: any = null;
  userData  = {'name':'','email':'','phoneNumber':''};

  constructor(
    private store: Store<gintaaApp.AppState>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data && data.actionMode === 'edit') {
      this.actionMode = data.actionMode;
      this.address = data.address;
      // console.log("=======",this.address);
      this.userData.name = this.address.name;
      this.userData.email = this.address.email;
      this.userData.phoneNumber = this.address.phoneNumber;
      // console.log("======",this.userData);
    } else if(data) {
      this.addresscount = data.addresscount;
    }
  }

  ngOnInit(): void {
    this.store.pipe(
      select(addEditAddressStatusSelector),
      tap(addEditAddressStatus => {
        if(addEditAddressStatus === 'failed'){
          this.errorStatus = false;
        }
      })
    ).subscribe(
      noop
    );

    this.profileStateSubscriber = this.store.select(selectProfileState).subscribe((profileState:any) => {
      this.currentAddress = profileState.currentAdress;
      if(this.currentAddress?.lat) {
        this.errorMessage = null;
      } 
    });
  }

  setLocation() {

    // console.log("=================================N Page")
    if(this.currentAddress?.lat){
      this.errorMessage = null;
      this.showAddressMap = false;
    } else{
      this.errorMessage = 'Please choose address from map';
    }
  }

  backToLocationMap() {
    this.showAddressMap = true;
  }

  submitAddressForm(data: any) {
    if(data.actionMode === 'edit'){
      let addressTemp = {...data.address};
      addressTemp.default = this.address?.default ? this.address?.default : false;
      this.store.dispatch(
        ProfileActions.editUserAddress({ address: addressTemp, addressId:data.addressId})
      );
    } else {
      const addressReq = data.address;
      if(this.addresscount === 0){
        addressReq.default = 'true';
      } else{
        this.address = data.address;
        addressReq.default =  this.address?.default ? 'true' : 'false';
      }
      this.store.dispatch(
        ProfileActions.addUserAddress({ address: data.address})
      );
    }
  }

  closeAddressModal() {
    this.store.dispatch(
      ProfileActions.closedAddressModal()
    );
  }

  ngOnDestroy() {
    this.profileStateSubscriber.unsubscribe();
  }

}
