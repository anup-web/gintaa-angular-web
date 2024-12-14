import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { addAddressModalSelector, currentAddressSelector } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '@gintaa/core/services/auth.service';

@Component({
  selector: 'app-new-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class NewAddAddressComponent implements OnInit {

  showAddressMap: boolean = true;
  actionMode: string = null;
  address: any;
  offer: Offer;
  errorStatus: boolean = false;
  userData:any = null;
  nextButtonText: string = 'Save Location';
  addressTitle: { name: string, value: string } = null;
  modalTitle: string = null;
  addressAnnotations: string[] = [];
  allowOtherAddress: boolean = true;
  isInvalidTitle: boolean = false;
  currentBusinessId: string;
  isBusiness: boolean = false;
  errorMessage: string = null;
  currentLocation: any;

  constructor(
    private authService: AuthService,
    private store: Store<gintaaApp.AppState>,
    private dialogRef: MatDialogRef<NewAddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if (data) {
      this.actionMode = data.actionMode;
      this.address = data.address;
      this.offer = data.offer
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

    if (data && data.isBusiness) {
      this.isBusiness = data.isBusiness;
      this.currentBusinessId = data.businessId;
    }

    const userInfo = this.authService.getSignInInput();
    if(userInfo['providerData'] && userInfo['providerData'][0]){
      this.userData = userInfo['providerData'][0];
    }

  }

  ngOnInit(): void {
    this.store.pipe(
      select(currentAddressSelector),
      tap(currentAdress => {
        this.address = currentAdress;
      })
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(addAddressModalSelector),
      tap(closeOpenedModel => {
        if (closeOpenedModel) {
          this.onDialogClose();
        }
      })
    ).subscribe(
      noop
    );
  }

  setLocation() {
    this.isInvalidTitle = false;
    this.showAddressMap = true;

    if (this.address?.lat) {
      this.errorMessage = null;
    } else{
      this.errorMessage = 'Please choose address from map';
      return;
    }

    if (!this.isBusiness) {
      this.showAddressMap = false;
      return;
    }

    if (this.addressTitle?.value) {
      this.store.dispatch(
        CreateOfferActions.updateCurrentLocationTitle({ addressTitle: this.addressTitle?.value })
      );
      this.showAddressMap = false;
    } else {
      this.isInvalidTitle = true;
      return;
    }
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  backToLocationMap() {
    this.showAddressMap = true;
  }

  submitAddressForm(data: any) {
    if (!this.isBusiness) {
      this.store.dispatch(
        CreateOfferActions.addUserAddress({
          address: data.address,
          offer: this.offer
        })
      )
    } else {
      let address = data.address;
      address.addressTitle = this.addressTitle?.value;
      address.addressLine1 = data.address?.addressLine;
      address.addressLine2 = data.address?.addressLine;
      address.latitude = data.address?.lat;
      address.longitude = data.address?.lng;
      address.phoneNumber = this.add91ToPhoneNumber(data.address.phoneNumber+'');

      this.store.dispatch(
        CreateOfferActions.addBusinessUserAddress({ address: address, businessId: this.currentBusinessId })
      );
    }
  }

  add91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && !phone.includes(replaceString)) {
      phone = replaceString+phone;
    }
    return phone;
  }

}
