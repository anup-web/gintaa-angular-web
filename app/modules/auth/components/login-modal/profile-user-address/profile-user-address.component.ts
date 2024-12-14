import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { UserProfileUpdateRequest } from '@gintaa/modules/auth/models/auth.model';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight, btnFadeInOut } from 'projects/gintaa/src/app/animation';
import { APP_CONFIGS } from '@gintaa/config/enum.config';

@Component({
  selector: 'app-profile-user-address',
  templateUrl: './profile-user-address.component.html',
  styleUrls: ['./profile-user-address.component.scss'],
  animations: [slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight, btnFadeInOut]
})
export class ProfileUserAddressComponent implements OnInit {

  requestBody: UserProfileUpdateRequest;
  showOtherAnnotationText = false;
  isAddressFormValid = true;
  profileUpdateErrorMessage: string = null;
  userAddressValidator = {
    name: {
      required: true,
      invalid: false,
      error: 'Name is required',
      //  length: Validators.minLength(4),
    },
    phoneNumber: {
      required: true,
      invalid: false,
      error: 'Phone number is required',
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
    },
    flatNo: {
      required: false,
      invalid: false,
      error: '',
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
      name: null,
      email: null,
      mobile: '0000000000',
      gender: null,
      address: [{
        name: '',
        phoneNumber: null,
        email: '',
        //pname:null,
        addressLine: null,
        annotation: 'Home',
        area: null,
        city: null,
        country: 'India',
        flatNo: null,
        landmark: '',
        lat: null,
        lng: null,
        state: 'West Bengal',
        zip: null,
        default: true,
      }]
    }
  }

  ngOnInit(): void {
    this.store.select(selectAuthState).subscribe(authState => {
      this.profileUpdateErrorMessage = authState.errorMessage?.message || null;
      this.requestBody = {
        name: authState.name ? authState.name : null,
        email: authState.email ? authState.email : null,
        mblNo: this.remove91ToPhoneNumber(authState.phone ? authState.phone : null),
        mobile: authState.phone ? authState.phone : null,
        dob: authState.dob ? authState.dob : null,
        gender: authState.gender ? authState.gender : null,
        address: [{
          name: authState.name ? authState.name : null,
          phoneNumber: this.remove91ToPhoneNumber(authState.phone ? authState.phone : null),
          email: authState.email ? authState.email : null,
          addressLine: authState.currentAdress?.addressLine,
          lat: authState.currentAdress?.lat,
          lng: authState.currentAdress?.lng,
          flatNo: this.replaceNaValue(authState.currentAdress?.flatNo),
          landmark: this.replaceNaValue(authState.currentAdress?.landmark),
          area: this.replaceNaValue(authState.currentAdress?.area),
          annotation: authState.currentAdress?.annotation ? authState.currentAdress.annotation : 'Home',
          zip: authState.currentAdress?.zip,
          city: this.replaceNaValue(authState.currentAdress?.city),
          state: authState.currentAdress?.state,
          country: authState.currentAdress?.country,
          default: true
        }]
      }
      if (Array.isArray(authState.payloadValidation)) {
        for (let index = 0; index < authState.payloadValidation.length; index++) {
          let currentField = authState.payloadValidation[index];
          switch (currentField['param']) {
            case 'annotation':
              this.userAddressValidator.annotation.invalid = true;
              this.userAddressValidator.annotation.error = currentField['reason'];
              break;
            case 'state':
              this.userAddressValidator.state.invalid = true;
              this.userAddressValidator.state.error = currentField['reason'];
              break;
            // case 'landmark':
            //   this.userAddressValidator.landmark.invalid = true;
            //   this.userAddressValidator.landmark.error = currentField['reason'];
            //   break;
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
            // case 'flatNo':
            //   this.userAddressValidator.flatNo.invalid = true;
            //   this.userAddressValidator.flatNo.error = currentField['reason'];
            //   break;
            default:
            // code block
          }
        }
      }
    })
  }

  updateUserPofile() {
    // user address validation
    this.isAddressFormValid = true;

    // console.log("=====================", this.userAddressValidator);
    // console.log("===========this.requestBody.address[0]",this.requestBody.address[0]);

    for (const [key, value] of Object.entries(this.userAddressValidator)) {
      if (value.required) {
        if (!this.requestBody.address[0][key]) {
          this.userAddressValidator[key].invalid = true;
          this.isAddressFormValid = false;
        } else {
          this.userAddressValidator[key].invalid = false;
        }
      }
    }

    if (this.isAddressFormValid) {
      // console.log("==========", this.requestBody);
      this.store.dispatch(
        AuthActions.addUserAddress({ user: this.requestBody })
      );
    }
  }

  updateUserAddressField(fieldName: string, fieldValue: string) {
    // console.log("=======fieldName", fieldName);
    // console.log("=======fieldValue", fieldValue);
    this.isAddressFormValid = true;

    switch (fieldName) {
      case 'name':
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'Name is required';
          this.isAddressFormValid = false;
        } else {
          if (fieldValue.length < 2) {
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Name must be minimum 2 characters long';
            this.isAddressFormValid = false;
          } else {
            if (fieldValue.length > 30) {
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Name must be less than 30 characters long';
              this.isAddressFormValid = false;
            } else {
              this.userAddressValidator[fieldName].invalid = false;
              this.userAddressValidator[fieldName].error = '';
              this.requestBody.address[0].name = fieldValue
              this.isAddressFormValid = true;
            }

          }

        }
        break;
      case 'phoneNumber':
        
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'Mobile number is required';
          this.isAddressFormValid = false;
        } else {
          const regexStartDigitOfPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_STARTING_REGEX);
          const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
          if (regexPhone.test(fieldValue) == false) {
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Mobile Number must be minimum 10 digit long';
            this.isAddressFormValid = false;
          } else {
            if(regexStartDigitOfPhone.test(fieldValue) == false){
              this.userAddressValidator[fieldName].invalid = true;
              this.userAddressValidator[fieldName].error = 'Mobile Number  should start with 9,8,7,6';
              this.isAddressFormValid = false;
            }else{
              this.userAddressValidator[fieldName].invalid = false;
              this.userAddressValidator[fieldName].error = '';
              this.requestBody.address[0].phoneNumber = fieldValue
              this.isAddressFormValid = true;
            }
            
          }
        }

        break;
      case "email":
       
        const regexEmail: RegExp = new RegExp(APP_CONFIGS.VALID_EMAIL_REGEX);
        if (regexEmail.test(fieldValue) == false) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'Email is invalid';
          this.isAddressFormValid = false;
        } else {
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].email = fieldValue
          this.isAddressFormValid = true;
        }

        break;
      case "addressLine":
        
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'You must provide address line 1';
          this.isAddressFormValid = false;
        } else {
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].addressLine = fieldValue
          this.isAddressFormValid = true;
        }
        break;
      case "country":
        
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'Country is required';
          this.isAddressFormValid = false;
        } else {
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].country = fieldValue;
          this.isAddressFormValid = true;
        }
        break;
      case "state":
        
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'State is required';
          this.isAddressFormValid = false;
        } else {
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].state = fieldValue
          this.isAddressFormValid = true;
        }
        break;
      case "city":
        
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'City is required';
          this.isAddressFormValid = false;
        } else {
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].city = fieldValue
          this.isAddressFormValid = true;
        }
        break;

      case "zip":
        if (fieldValue.length === 0) {
          this.userAddressValidator[fieldName].invalid = true;
          this.userAddressValidator[fieldName].error = 'Pin is required';
          this.isAddressFormValid = false;
        } else {
          if (fieldValue.length !== 6) {
            this.userAddressValidator[fieldName].invalid = true;
            this.userAddressValidator[fieldName].error = 'Pin must be 6 digit long';
            this.isAddressFormValid = false;
          } else {
            this.userAddressValidator[fieldName].invalid = false;
            this.userAddressValidator[fieldName].error = '';
            this.requestBody.address[0].zip = fieldValue;
            this.isAddressFormValid = true;
          }

        }

        break;

        case "flatNo":
          if (fieldValue.length === 0) {
            this.userAddressValidator[fieldName].invalid = false;
            this.userAddressValidator[fieldName].error = '';
            this.requestBody.address[0].flatNo = null;
            this.isAddressFormValid = true;
          }else{
            this.userAddressValidator[fieldName].invalid = false;
            this.userAddressValidator[fieldName].error = '';
            this.requestBody.address[0].flatNo = fieldValue;
            this.isAddressFormValid = true;
          }
         
        break;

        case "landmark":

        if(fieldValue.length === 0){
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].landmark = null;
          this.isAddressFormValid = true;
        }else{
          this.userAddressValidator[fieldName].invalid = false;
          this.userAddressValidator[fieldName].error = '';
          this.requestBody.address[0].landmark = fieldValue;
          this.isAddressFormValid = true;
        }
          
        break;
      
        default:
      // code block
    }

    // if (fieldName) {
    //   this.requestBody.address[0][fieldName] = fieldValue;
    //   this.userAddressValidator[fieldName].invalid = false;
    // } else {
    //   this.userAddressValidator[fieldName].invalid = true;
    // }

    //this.validateAddressForm();
  }

  toggleOtherAnnotation(event: MatRadioChange) {
    if (event.value === 'Other') {
      this.showOtherAnnotationText = true;
    } else {
      this.showOtherAnnotationText = false;
    }
  }

  updateAnnotation(e: any) {
    if (e.target.value) {
      this.requestBody.address[0].annotation = e.target.value;
    }
  }


  validateAddressForm() {
    let formValidate = true;
    for (const [key, value] of Object.entries(this.userAddressValidator)) {
      if (value.required) {
        if (!this.requestBody.address[0][key]) {
          this.userAddressValidator[key].invalid = true;
          formValidate = false;
        } else {
          this.userAddressValidator[key].invalid = false;
        }
      }
    }


    this.isAddressFormValid = formValidate;
  }

  replaceNaValue(replaceNaValue: string) {
    // console.log("replaceNaValue", replaceNaValue);
    if (replaceNaValue === 'NA') {
      return null;
    } else {
      return replaceNaValue;
    }
  }

  remove91ToPhoneNumber(phone: string) {
    if(phone){
      phone = phone.replace(/\s/g,'');
      const regexStartDigitOfPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_STARTING_REGEX);
      const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
      let replaceString = '+91';
      if(phone && phone.includes(replaceString)) {
        phone = phone.replace(replaceString, '')
        if(phone && regexPhone.test(phone) && regexStartDigitOfPhone.test(phone) ){
          return phone
        }else{
          return null
        }
      }else{
        //this.updateUserAddressField('phoneNumber',phone) 
        if(phone && regexPhone.test(phone) && regexStartDigitOfPhone.test(phone) ){
          return phone;
        }else{
          return null
        }
      }
    }else{
      return null
    }
       // return phone;
  }


}
