import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@gintaa/core/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit, OnDestroy {

  profileStateSubscriber: Subscription;
  showAddressMap: Boolean = true;
  address:any;
  currentAddress: any;
  errorStatus: Boolean = false;
  payloaderror: any = [];
  errorMessage: any = null;
  userData:any = null;
  businessId: string = '';
  modalTitle: string = null;
  addressTitle: any = null;
  constructor(
    private authService: AuthService, 
    private dialogRef: MatDialogRef<NewAddressComponent>, 
    @Inject(MAT_DIALOG_DATA) data) {
      if(data){
        this.businessId = data.businessId;
        if(data.businessId){
          this.addressTitle = {name: 'Address Title', value: ''};
          this.modalTitle = 'Add business address';
        }
      }
    }

  ngOnInit(): void {
    const userInfo = this.authService.getSignInInput();
    if(userInfo['providerData'] && userInfo['providerData'][0]){
      this.userData = userInfo['providerData'][0];
    }
  }

  setMapAddress(data:any){
    this.address = data?.address;
    this.currentAddress = data?.location;
  }

  backToLocationMap() {
    this.showAddressMap = true;
  }

  setLocation() {
    if(this.address?.lat){
      this.errorMessage = null;
      this.showAddressMap = false;
    } else{
      this.errorMessage = 'Please choose address from map';
    }
  }

  submitAddressForm(data: any) {
    const addressReq = data.address;
    this.address = data.address;
    addressReq.default =  this.address?.default ? 'true' : 'false';
    this.authService.addAddress(addressReq).subscribe((res:any)=> {
      if(res && res['payload']){
        this.closeAddressModal(res['payload']);
        this.payloaderror = [];
        this.errorMessage = null;
      } else {
        this.errorMessage = res?.message ? res?.message : 'Unable to save address Please try again!';
      }
    }, err => {
      if(err && err.error && err.error['payload']){
        this.payloaderror = err.error['payload'];
        this.errorMessage = err.error?.message ? err.error?.message : 'Unable to save address Please try again!';
      } else {
        this.errorMessage = err?.error?.message ? err.error?.message : 'Unable to save address Please try again!';
      }
    })
}

  closeAddressModal(data='') {
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
  }

}
