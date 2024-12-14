import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { AddressRequest } from '@gintaa/shared/models/address.model';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class AddressFormComponent implements OnInit {
  
  @Input() stateModule: string;
  @Input() isNewAddress: boolean = true;
  @Input() actionMode: string;
  @Input() address: any;
  @Input() errorStatus: boolean;
  @Input() modalTitle: string = null;
  @Input() addressAnnotations: string[] = [];
  @Input() allowOtherAddress: boolean = true;
  @Input() payloaderror: any = [];
  @Input() userData: any;
  
  @Output("submitAddressForm") submitAddressForm: EventEmitter<any> = new EventEmitter();

  requestBody: AddressRequest;
  showOtherAnnotationText = false;
  isAddressFormValid = true;
  userUpdateErrorMessage: string = null;
  addressId: string = '';
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
      //error: 'Landmark is required',
      error: '',
    },
    flatNo: {
      required: false,
      invalid: false,
      //error: 'Flat No is required',
      error: '',
    },
    area: {
      required: false,
      invalid: false,
      error: '',
    },
  };

  constructor() {
    this.setInitialDefaultAddress();
  }

  setInitialDefaultAddress() {

    //console.log("userData",this.userData);
    
    this.requestBody = {
      name: this.userData?.displayName,
      phoneNumber: +this.remove91ToPhoneNumber(this.userData?.phoneNumber),
      email: this.userData?.email,
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
    if (!this.stateModule) {
      this.stateModule = 'auth';
    }
    if (this.stateModule === 'new-address') {
     this.updateAddressRequest(this.address);
    }
  }

  ngOnChanges(){
    if(Array.isArray(this.payloaderror) && this.payloaderror.length){
      for (let index = 0; index < this.payloaderror.length; index++) {
        let currentField = this.payloaderror[index];
       switch(currentField['param']) {
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
        case 'phoneNumber':
           this.userAddressValidator.phoneNumber.invalid = true;
           this.userAddressValidator.phoneNumber.error = currentField['reason'];
           break;
        case 'email':
          this.userAddressValidator.email.invalid = true;
          this.userAddressValidator.email.error = currentField['reason'];
          break;
        case 'name':
          this.userAddressValidator.name.invalid = true;
          this.userAddressValidator.name.error = currentField['reason'];
          break;
         default:
           // code block
       }
      }
    }
  }

  updateAddressRequest(resState) {

   // console.log("------resState",resState,this.userData);
    this.requestBody = {
      name: this.userData?.displayName,
      phoneNumber: +this.remove91ToPhoneNumber(this.userData?.phoneNumber),
      email: this.userData?.email,
      addressLine: resState?.addressLine,
      lat: resState?.lat,
      lng: resState?.lng,
      flatNo: this.replaceNaValue(resState?.flatNo),
      landmark: this.replaceNaValue(resState?.landmark),
      area: this.setAreaValue(resState?.area) ,
      annotation: resState?.annotation ? resState.annotation : '',
      zip: resState?.zip,
      city: this.replaceNaValue(resState?.city),
      state: resState?.state,
      country: resState?.country,
      default: resState?.default
    }

    if (!this.addressAnnotations.length && this.requestBody.annotation !== 'Home' && this.requestBody.annotation !== 'Work') {
      this.showOtherAnnotationText = true;
    }

    if (this.addressAnnotations.length) {
      this.showOtherAnnotationText = false;
      if (!this.requestBody.annotation) {
        this.requestBody.annotation = this.addressAnnotations[0];
      }
      if (this.allowOtherAddress && !this.addressAnnotations.includes(this.requestBody.annotation)) {
        this.showOtherAnnotationText = true;
      }
    }
  }

  checkIfOtherAddressSelected() {
    return !this.addressAnnotations.includes(this.requestBody.annotation);
  }

  updateUserAddress() {
    // user address validation

    // console.log("==============this.requestBody",this.requestBody);

    // return;
    this.isAddressFormValid = true;
    for (const [key, value] of Object.entries(this.userAddressValidator)) {
      if (value.required) {
        if(key === 'zip'){
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
            this.userAddressValidator[key].error = 'Zip code is required'
          } else {
            const validZip = parseInt(this.requestBody[key]);
            if(/^\d{6}?$/.test(this.requestBody[key]) && !isNaN(validZip) && validZip > 100000){
              this.userAddressValidator[key].invalid = false;
            } else {
              this.userAddressValidator[key].invalid = true;
              this.isAddressFormValid = false;
              this.userAddressValidator[key].error = 'Please provide valid Zipcode'
            }
          }
        } else if(key === 'phoneNumber'){
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
            this.userAddressValidator[key].error = 'Mobile number is required'
          } else {

            const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
            const regexStartDigitOfPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_STARTING_REGEX);

            if (regexPhone.test(this.requestBody[key].toString()) == false) {

             // console.log("Else Part Not Length 10")
              this.userAddressValidator[key].invalid = true;
              this.isAddressFormValid = false;
              this.userAddressValidator[key].error = 'Mobile Number must be minimum 10 digit long'
            }else{
              if(regexStartDigitOfPhone.test(this.requestBody[key].toString()) == false){
               // console.log("Else Part  Length 10 but start not 7,8,9,6")
              this.userAddressValidator[key].invalid = true;
              this.isAddressFormValid = false;
              this.userAddressValidator[key].error = 'Mobile Number  should start with 9,8,7,6'
            }else{
              //console.log("Else Part  Length 10 and Startn is Ok")
              this.userAddressValidator[key].invalid = false;
            }

            // console.log("This.is Else Part Of Phone No")
            // const validZip = this.requestBody[key];
            // if(/^\d{10}?$/.test(validZip.toString()) && !isNaN(validZip)){
            //   this.userAddressValidator[key].invalid = false;
            // } else {
            //   this.userAddressValidator[key].invalid = true;
            //   this.isAddressFormValid = false;
            //   this.userAddressValidator[key].error = 'Mobile Number must be minimum 10 digit long'
            // }
          }
          }
        } else if(key === 'email'){
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
            this.userAddressValidator[key].error = 'Email is required'
          } else {
            if(this.validateEmail(this.requestBody[key])){
              this.userAddressValidator[key].invalid = false;
            } else {
              this.userAddressValidator[key].invalid = true;
              this.isAddressFormValid = false;
              this.userAddressValidator[key].error = 'Email is invalid'
            }
          }
        }
        else if(key === 'name'){
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
            this.userAddressValidator[key].error = 'Name is required'
          } else {
            if(this.requestBody[key].length < 2){
              this.userAddressValidator[key].invalid = true;
              this.isAddressFormValid = false;
              this.userAddressValidator[key].error = 'Name must be minimum 2 characters long'
            }else{
              if(this.requestBody[key].length > 30){
                this.userAddressValidator[key].invalid = true;
                this.isAddressFormValid = false;
                this.userAddressValidator[key].error = 'Name must be less than 30 characters long'
              }else{
                this.userAddressValidator[key].invalid = false;
              }
            }
          }
        }else {

        if(key === 'city'){
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
            this.userAddressValidator[key].error = 'City is required'
          }else{
            this.userAddressValidator[key].invalid = false;
          }
        }else{
          if (!this.requestBody[key]) {
            this.userAddressValidator[key].invalid = true;
            this.isAddressFormValid = false;
          } else {
            this.userAddressValidator[key].invalid = false;
          }
        }

          ///////////////////////////
         
          //////////////////////////////
        }
      }
    }

    if (this.isAddressFormValid) {
      this.submitAddressForm.emit({ address: this.requestBody });
    }
  }

  updateUserAddressField(fieldName: string, fieldValue: string) {
    if (fieldName) {
      this.requestBody[fieldName] = fieldValue;
      this.userAddressValidator[fieldName].invalid = false;
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

  private validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  updateAnnotation(e: any) {
    if (e.target.value) {
      this.requestBody.annotation = e.target.value;
      this.userAddressValidator['annotation'].invalid = false;
    }
  }

  setAreaValue(area:string){
    //("Area",area);
    if(area === 'NA'){
      return null;
    }else{
      return area;
    }
  
  }

  remove91ToPhoneNumber(phone: string) {
    if(phone === null){
      return null;
    }else{
      let replaceString = '+91';
      if(phone && phone.includes(replaceString)) {
        phone = phone.replace(replaceString, '')
      }
      return phone;
    }
  }


  replaceNaValue(replaceNaValue: string) {
    //console.log("replaceNaValue", replaceNaValue);
    if (replaceNaValue === 'NA') {
      return null;
    } else {
      return replaceNaValue;
    }
  }




}
