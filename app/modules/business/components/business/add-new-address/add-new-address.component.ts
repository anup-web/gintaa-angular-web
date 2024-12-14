import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { AddressRequest } from '@gintaa/shared/models/address.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { addEditAddressStatusSelector, selectBusinessState } from '@gintaa/modules/business/store/business.selector';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { BusinessState } from '@gintaa/modules/business/models/BusinessState.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@gintaa/core/services/auth.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit, AfterViewInit {

  showAddressMap: boolean = true;
  actionMode: string;
  public address: any;
  errorStatus: boolean = false;
  nextButtonText: string = 'Save Location';
  addressTitle: { name: string, value: string } = null;
  modalTitle: string = null;
  addressAnnotations: string[] = [];
  allowOtherAddress: boolean = true;
  isInvalidTitle: boolean = false;
  userData:any = null;

  currentBusinessId: string;

  errorMessage: string = null;
  currentLocation: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store<gintaaApp.AppState>,
    private dialogRef: MatDialogRef<AddNewAddressComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    if (data && data.actionMode === 'edit') {
      this.actionMode = data.actionMode;
      this.address = JSON.parse(JSON.stringify(data.address));
      this.address.addressLine = this.address.addressLine1;
      this.address.lat = this.address.latitude;
      this.address.lng = this.address.longitude;
      // console.log('edit address:', this.address, data);
    }

    
    if (data && data.nextButtonText) {
      this.nextButtonText = data.nextButtonText;
    }

    if (data && data.addressTitle) {
      this.addressTitle = data.addressTitle;
    }

    if (data && data.modalTitle) {
      this.modalTitle = data.modalTitle;
    }

    if (data && data.addressAnnotations) {
      this.addressAnnotations = data.addressAnnotations;
      this.allowOtherAddress = data.allowOtherAddress;
    }
  }


  ngOnInit(): void {
    this.store.pipe(
      select(addEditAddressStatusSelector),
      tap(addEditAddressStatus => {
        if(addEditAddressStatus === 'failed') {
          this.errorStatus = false;
        }
      })
    ).subscribe(
      noop
    );

    this.store.select(selectBusinessState).subscribe((businessState: BusinessState) => {
      if (businessState.currentBusinessDetails) {
        this.currentBusinessId = businessState.currentBusinessDetails.id;
      }

      if(businessState.currentLocation){
        this.currentLocation = businessState.currentLocation;
      }

      if (businessState.closeOpenedModel) {
        this.dialogRef.close();
        this.resetDefault();
      }
    })
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detectChanges();
  }

  resetDefault() {
    this.showAddressMap = true;
    this.address = null;
    this.errorStatus = null;
    this.actionMode = null;
  }

  setLocation() {
    // console.log('setLocation - address:', this.currentLocation);
 
    this.isInvalidTitle = false;

    // Start Validation for select address in map
    this.showAddressMap = true; //this.address?.lat || 
    if(this.currentLocation?._lat){
      this.errorMessage = null;
      // this.showAddressMap = false;
    } else{
      this.errorMessage = 'Please choose address from map';
      // this.showAddressMap = true;
      return;
    }
    // End Validation for select address in map


    if (this.addressTitle.value) {
      this.store.dispatch(
        BusinessActions.updateCurrentLocationTitle({ addressTitle: this.addressTitle.value })
      )      
      this.showAddressMap = false;
    } else {
      this.isInvalidTitle = true;
      return;
    }
  }

  backToLocationMap() {
    this.showAddressMap = true;
    this.currentLocation = null;
    // console.log('setLocation - address:', this.address);
  }

  submitAddressForm(data: any) {

    // console.log("===================Submit Address")
    let address = data.address;
    address.addressTitle = this.addressTitle.value;
    address.addressLine1 = data.address.addressLine;
    address.addressLine2 = data.address.addressLine;
    address.latitude = data.address.lat;
    address.longitude = data.address.lng;
    address.phoneNumber = this.add91ToPhoneNumber(data.address.phoneNumber+'');

    // console.log('address:', address);

    if (data.actionMode === 'edit') {
      let currentAddressId = this.address.id;
      this.store.dispatch(
        BusinessActions.editAddress({ address: address, addressId: currentAddressId, businessId: this.currentBusinessId })
      );
    } else {
      this.store.dispatch(
        BusinessActions.addAddress({ address: address, businessId: this.currentBusinessId })
      );
    }

  }

  add91ToPhoneNumber(phone: string) {
    // console.log('phone:', phone);
    let replaceString = '+91';
    if(phone && !phone.includes(replaceString)) {
      phone = replaceString+phone;
    }
    return phone;
  }

  remove91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && phone.includes(replaceString)) {
      phone = phone.replace(replaceString, '')
    }
    return phone;
  }

  closePopup(){
    // console.log("Close Popup");
    this.dialogRef.close();
  }

  setMapAddress(data:any){
    this.currentLocation = data?.location;

    // console.log('currentLocation:', this.currentLocation);
  }


}
