import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { AddressRequest } from '@gintaa/shared/models/address.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
import { selectProfileState, addressErrorSelector, addressPayloadErrorSelector } from '@gintaa/modules/profile/store/profile.selectors';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { selectCreateOfferState, selectOfferState } from '@gintaa/modules/create-offer/store/create-offer.selectors';
import { selectBusinessState } from '@gintaa/modules/business/store/business.selector';


@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss'],
  animations: [slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class UserAddressComponent implements OnInit {

  @Input() stateModule: string;
  @Input() isNewAddress: boolean = false;
  @Input() actionMode: string;
  @Input() address: any;
  @Input() errorStatus: boolean;
  @Input() modalTitle: string = null;
  @Input() addressAnnotations: string[] = [];
  @Input() allowOtherAddress: boolean = true;
  @Input() payloaderror: any = [];


  @Output("submitAddressForm") submitAddressForm: EventEmitter<any> = new EventEmitter();

  requestBody: AddressRequest;
  showOtherAnnotationText = false;
  isAddressFormValid = true;
  userUpdateErrorMessage: string = null;
  addressId: string = '';
  showlengthmsg = false;
  showEmailValmsg = false;
  showPhnErrormsg = false;
  //btnValidation : boolean = true;

  userAddressValidator = {
    name: {
      required: true,
      invalid: false,
      error: 'Name is required',
    },
    phoneNumber: {
      required: true,
      invalid: false,
      error: 'Mobile number is required',
    },
    email: {
      required: true,
      invalid: false,
      error: 'Email is required',
    },
    addressLine: {
      required: true,
      invalid: false,
      error: 'You must provide address line 1',
    },
    annotation: {
      required: true,
      invalid: false,
      error: 'You must provide an address type',
    },
    country: {
      required: true,
      invalid: false,
      error: 'Country is required',
    },
    state: {
      required: true,
      invalid: false,
      error: 'State is required',
    },
    city: {
      required: true,
      invalid: false,
      error: 'City is required',
    },
    zip: {
      required: true,
      invalid: false,
      error: 'Zip code is required',
    },
    landmark: {
      required: false,
      invalid: false,
      error: '',
      // error: 'Landmark is required',
    },
    flatNo: {
      required: false,
      invalid: false,
      error: '',
      // error: 'Flat No is required',
    },
    area: {
      required: false,
      invalid: false,
      error: '',
    },
  };

  constructor(private store: Store<gintaaApp.AppState>) {
    this.setInitialDefaultAddress();
  }

  setInitialDefaultAddress() {
    this.requestBody = {
      name: '',
      phoneNumber: null,
      email: '',
      addressLine: null,
      annotation: '',
      area: null,
      city: null,
      country: 'India',
      flatNo: null,
      landmark: '',
      lat: null,
      lng: null,
      state: 'West Bengal',
      zip: null,
      default: false,
    }
  }

  ngOnInit(): void {
    // console.log("aaaaaaaaaaaaaaaddress:", this.address);
    if (!this.stateModule) {
      this.stateModule = 'auth';
    }
    if (this.stateModule === 'profile') {

      if (this.actionMode === 'edit') {

        this.addressId = this.address.id;

        this.store.select(selectProfileState).subscribe(resState => {
          this.updateAddressRequest(resState)
        });
        // this.btnValidation = false;
      }
      this.store.select(selectProfileState).subscribe(resState => {
        this.updateAddressRequest(resState)
      });
      this.store.select(addressErrorSelector).subscribe(errorMessage => {
        this.userUpdateErrorMessage = errorMessage
      });

      this.store.select(addressPayloadErrorSelector).subscribe(erroerPayload => {
        if (Array.isArray(erroerPayload)) {
          for (let index = 0; index < erroerPayload.length; index++) {
            let currentField = erroerPayload[index];
            switch (currentField['param']) {
              case 'annotation':
                this.userAddressValidator.annotation.invalid = true;
                this.userAddressValidator.annotation.error = currentField['reason'];
                break;
              case 'state':
                this.userAddressValidator.state.invalid = true;
                this.userAddressValidator.state.error = currentField['reason'];
                break;
              case 'landmark':
                this.userAddressValidator.landmark.invalid = true;
                this.userAddressValidator.landmark.error = currentField['reason'];
                break;
              case 'zip':
                this.userAddressValidator.zip.invalid = true;
                this.userAddressValidator.zip.error = currentField['reason'];
                break;
              case 'addressLine':
                this.userAddressValidator.addressLine.invalid = true;
                this.userAddressValidator.addressLine.error = currentField['reason'];
                break;
              case 'city':
                this.userAddressValidator.city.invalid = true;
                this.userAddressValidator.city.error = currentField['reason'];
                break;
              case 'country':
                this.userAddressValidator.country.invalid = true;
                this.userAddressValidator.country.error = currentField['reason'];
                break;
              case 'flatNo':
                this.userAddressValidator.flatNo.invalid = true;
                this.userAddressValidator.flatNo.error = currentField['reason'];
                break;
              default:
              // code block
            }
          }
        }
      });

    } else if (this.stateModule === 'create-offer') {
      // if(this.actionMode === 'edit'){
      //   this.addressId = this.address.addressId
      // }
      this.store.select(selectCreateOfferState).subscribe(resState => {
        this.updateAddressRequest(resState)
      });
      this.store.select(selectOfferState).subscribe(state => {
        this.userUpdateErrorMessage = state.errorMessage
      });
    } else if (this.stateModule === 'business') {
      if (this.actionMode === 'edit') {
        this.addressId = this.address.id
      }
      this.store.select(selectBusinessState).subscribe(resState => {
        this.updateAddressRequest(resState);
        this.userUpdateErrorMessage = resState.errorMessage
      });
    } else {
      this.store.select(selectAuthState).subscribe(resState => {
        this.updateAddressRequest(resState)
      })
    }
  }

  updateAddressRequest(resState) {
    // console.log("====================resState", resState);
    this.requestBody = {
      name: resState.currentAdress?.name ? resState.currentAdress?.name : null,
      phoneNumber: +this.remove91ToPhoneNumber(resState.currentAdress?.phoneNumber + ''),
      email: resState.currentAdress?.email ? resState.currentAdress?.email : null,
      addressLine: resState.currentAdress?.addressLine || resState.currentAdress?.addressLine1,
      lat: resState.currentAdress?.lat,
      lng: resState.currentAdress?.lng,
      flatNo: this.replaceNAValue(resState.currentAdress?.flatNo),
      landmark: this.replaceNAValue(resState.currentAdress?.landmark),
      area: this.replaceNAValue(resState.currentAdress?.area),
      annotation: resState.currentAdress?.annotation ? resState.currentAdress.annotation : '',
      zip: resState.currentAdress?.zip,
      city: this.replaceNAValue(resState.currentAdress?.city),
      state: resState.currentAdress?.state,
      country: resState.currentAdress?.country,
      default: resState.currentAdress?.default
    }

    if (!this.addressAnnotations.length && this.requestBody.annotation !== 'Home' && this.requestBody.annotation !== 'Work') {
      // this.requestBody.annotation = resState.currentAdress?.annotation ? resState.currentAdress.annotation : '',
      this.showOtherAnnotationText = true;
    }

    if (this.addressAnnotations.length) {
      // hide the other annotation by default
      this.showOtherAnnotationText = false;

      // set the first one selected for new address
      if (!this.requestBody.annotation) {
        this.requestBody.annotation = this.addressAnnotations[0];
      }

      // console.log('selected annotation: ', this.requestBody.annotation, 'checking in ', this.addressAnnotations);
      if (this.allowOtherAddress && !this.addressAnnotations.includes(this.requestBody.annotation)) {
        this.showOtherAnnotationText = true;
      }
    }
  }

  checkIfOtherAddressSelected() {
    return !this.addressAnnotations.includes(this.requestBody.annotation);
  }

  updateUserAddress() {
    // console.log("=================",this.requestBody);
    if (this.userAddressValidator.name.invalid == true || this.userAddressValidator.phoneNumber.invalid == true || this.userAddressValidator.email.invalid == true
      || this.userAddressValidator.zip.invalid == true || this.userAddressValidator.city.invalid == true ||this.userAddressValidator.addressLine.invalid == true) {
      return;
    }
    this.isAddressFormValid = true;
    for (const [key, value] of Object.entries(this.userAddressValidator)) {
      if (value.required) {
        if (key === 'zip') {
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
            this.userAddressValidator[key].error = 'Zip code is required'
          } else {
            const validZip = parseInt(this.requestBody[key]);
            if (/^\d{6}?$/.test(this.requestBody[key]) && !isNaN(validZip) && validZip > 100000) {
              this.userAddressValidator[key].invalid = false;
            } else {
              this.userAddressValidator[key].invalid = true;
              this.isAddressFormValid = false;
              this.userAddressValidator[key].error = 'Please provide valid Zipcode'
            }
          }
        } else {

          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
          } else {
            this.userAddressValidator[key].invalid = false;
          }
        }
      }
    }



    if (this.isAddressFormValid) {
      if (this.stateModule === 'profile') {
        setTimeout(() => {
          this.submitAddressForm.emit({
            address: this.requestBody,
            actionMode: this.actionMode,
            addressId: this.addressId
          });
        }, 0);
        this.store.dispatch(
          ProfileActions.updateUserAddress({ address: this.requestBody })
        );
      } else if (this.stateModule === 'create-offer') {
        this.submitAddressForm.emit({ address: this.requestBody });
      } else if (this.stateModule === 'business') {
        this.submitAddressForm.emit({
          address: this.requestBody,
          actionMode: this.actionMode,
          addressId: this.addressId
        });
      } else {
        this.submitAddressForm.emit(this.requestBody);
      }
    }
  }

  updateUserAddressField(fieldName: string, fieldValue: string) {


    if (fieldName) {
      // console.log('fieldValue:', fieldValue, fieldValue.length);
      if (fieldValue.length === 0) {

        this.userAddressValidator[fieldName].invalid = true;

        switch (fieldName) {
          case "name":
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Name is required';
            break;
          case "phoneNumber":
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Mobile number is required';
            break;
          case "email":
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Email is required';
            break;
          case "flatNo":
            this.userAddressValidator[fieldName].invalid = false;
            this.userAddressValidator[fieldName].error = '';
            this.requestBody.flatNo = null;


            break;
          case "landmark":
            this.userAddressValidator[fieldName].invalid = false;
            this.userAddressValidator[fieldName].error = '';
            this.requestBody.landmark = null;
            break;

          case "city":

            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'City is required';
            this.requestBody.city = null;
            break;

          case "zip":

            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Zip code is required';
            break;

          case "addressLine":
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'You must provide address line 1';
            this.requestBody.addressLine = null;
            break;


          default:

        }
      } else {

        // console.log('==== fieldValue:', fieldValue, fieldName);

        this.userAddressValidator[fieldName].invalid = false;

        switch (fieldName) {
          case "name":
            if (fieldValue.length === 1) {
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Name must be minimum 2 characters long';
            } else {
              this.userAddressValidator[fieldName].invalid = false;
              this.requestBody.name = fieldValue;

            }
            break;
          case "phoneNumber":

            const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
            const regexStartDigitOfPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_STARTING_REGEX);
            
            //console.log("regexPhone===============",regexPhone.test(fieldValue));
            if (regexPhone.test(fieldValue) == false) {
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Mobile Number must be minimum 10 digit long';
            } else {
             // console.log("regexPhone Strart Of No===============",regexStartDigitOfPhone.test(fieldValue));
            //Start Of chceking If the Phone No Start With 6,7,8,9 or Not
             if(regexStartDigitOfPhone.test(fieldValue) == false){
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Mobile Number  should start with 9,8,7,6';
              }else{
                this.userAddressValidator[fieldName].invalid = false;
                this.requestBody.phoneNumber = +fieldValue;
              }
              
            }

            break;
          case "email":

            const regexEmail: RegExp = new RegExp(APP_CONFIGS.VALID_EMAIL_REGEX);
            if (regexEmail.test(fieldValue) == false) {
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Email is invalid';
            } else {
              this.userAddressValidator[fieldName].invalid = false;
              this.requestBody.email = fieldValue;
            }

            break;
          case "zip":

            if (fieldValue.length < 6 || fieldValue.length > 6) {
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Pin must be 6 characters long';
            } else {
              this.userAddressValidator[fieldName].invalid = false;
              this.requestBody.zip = fieldValue;
            }

            break;

          case "flatNo":
            this.userAddressValidator[fieldName].invalid = false;
            this.requestBody.flatNo = fieldValue;
            break;

          case "landmark":
            this.userAddressValidator[fieldName].invalid = false;
            this.requestBody.landmark = fieldValue;
            break;

          case "city":
            this.userAddressValidator[fieldName].invalid = false;
            this.requestBody.city = fieldValue;
            break;

          case "addressLine":
            this.userAddressValidator[fieldName].invalid = false;
            this.requestBody.addressLine = fieldValue;
            break;

          default:
          // this.userAddressValidator[fieldName].invalid = true;
        }
      }

    } else {
      this.userAddressValidator[fieldName].invalid = true;
    }
  }

  toggleOtherAnnotation(event: MatRadioChange) {
    if (event.value === 'Other') {
      this.showOtherAnnotationText = true;
      this.requestBody.annotation = '';
    } else {
      this.showOtherAnnotationText = false;
      this.requestBody.annotation = event.value;
      this.userAddressValidator['annotation'].invalid = false;
    }
  }

  updateAnnotation(e: any) {
    if (e.target.value) {
      this.requestBody.annotation = e.target.value;
      this.userAddressValidator['annotation'].invalid = false;
    }
  }

  add91ToPhoneNumber(phone: string) {
    // console.log('phone:', phone);
    let replaceString = '+91';
    if (phone && !phone.includes(replaceString)) {
      phone = replaceString + phone;
    }
    return phone;
  }

  remove91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if (phone && phone.includes(replaceString)) {
      phone = phone.replace(replaceString, '')
    }
    return phone;
  }

  replaceNAValue(replaceNAValue: string) {
    // console.log("replaceNAValue", replaceNAValue);
    if (replaceNAValue && replaceNAValue === 'NA') {
      return null;
    } else {
      return replaceNAValue;
    }

  }
}
