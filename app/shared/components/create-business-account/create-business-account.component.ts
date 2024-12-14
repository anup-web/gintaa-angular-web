import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FeatureListEnum, FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import {
  slideInOut,
  slideUpDown,
  flash,
  headShake,
  slideInUp,
  pulse,
  fadeInUp,
  fadeIn,
  slideInRight
} from 'projects/gintaa/src/app/animation';
import { CreateBusinessProfileRequest } from '@gintaa/shared/models';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { createBusinessError } from '@gintaa/shared/configs/create-business-error.config';
import { businessMigrateData } from '@gintaa/modules/home/models/UtilityState.model';

@Component({
  selector: 'app-create-business-account',
  templateUrl: './create-business-account.component.html',
  styleUrls: ['./create-business-account.component.scss'],
  animations: [
    slideInOut,
    slideUpDown,
    flash,
    headShake,
    slideInUp,
    pulse,
    fadeInUp,
    fadeIn,
    slideInRight
  ]
})
export class CreateBusinessAccountComponent implements OnInit {

  businessForm: FormGroup;
  logConsole: boolean = true;
  businessFormData = null;
  successMessage: string = null;
  errorMessage: any = null;
  businessCreated: boolean = null;
  mappedErrorMessages = {
    CIN: null,
    PAN: null,
    GST: null,
  };
  
  businessError = createBusinessError;
  
  businessName: string = null;
  
  businessMigrateData?: businessMigrateData;

  businessNameRejex = "";

  constructor(
    public dialogRef: MatDialogRef<CreateBusinessAccountComponent>,
    private router: Router,
    private analyticsService: FirebaseAnalyticsService,
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit(): void {
    
    this.store.dispatch(
      UtilityActions.getMigrationDataForBusiness()
    )
    

    this.businessForm = new FormGroup({
      businessNameLegal: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.pattern(APP_CONFIGS.VALID_BUSINESS_LEGAL_NAME)
      ]),
      businessNameDisplayed: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      businessPhone: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX),
      ]),
      businessMobile: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      businessEmail: new FormControl('', [
        Validators.minLength(4),
        Validators.email,
        // Validators.maxLength(30),
        Validators.pattern(APP_CONFIGS.VALID_EMAIL_REGEX),
      ]),
      businessCINNumber: new FormControl('', [
        // Validators.required,
        Validators.minLength(21),
        Validators.maxLength(21),
        Validators.pattern(APP_CONFIGS.VALID_CIN_REGEX),
      ]),
      businessGSTNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern(APP_CONFIGS.VALID_GST_REGEX_NEW),
      ]),
      businessPANNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(APP_CONFIGS.VALID_PAN_REGEX),
      ]),
    });

    this.subscribeToUtilityStore();

    this.businessForm.get("businessPANNumber").valueChanges.subscribe(data=> {
      this.onInputChange('PAN')
    });
    this.businessForm.get("businessGSTNumber").valueChanges.subscribe(data=> {
      this.onInputChange('GST')
    });
    this.businessForm.get("businessCINNumber").valueChanges.subscribe(data=> {
      this.onInputChange('CIN')
    });
    
  }

  resetErrorMessage(){
    this.errorMessage = null;
    this.mappedErrorMessages.PAN = null;
    this.mappedErrorMessages.GST = null;
    this.mappedErrorMessages.CIN = null;
  }

  subscribeToUtilityStore() {
    this.store.select(selectUtilityState).subscribe(utilityState => {
      this.businessFormData = utilityState.businessFormData;
      this.successMessage   = utilityState.successMessage;
      this.businessCreated  = utilityState.businessCreated;

      this.businessMigrateData = utilityState.businessMigrateData;

      if(this.businessMigrateData && this.businessMigrateData.businessName) {
        const businessName = this.businessMigrateData.businessName;
        this.patchBusinessNameToFrom(businessName);
      }

      if (typeof utilityState.businessCreationError === 'string') {
        this.errorMessage = utilityState.businessCreationError;
      } else {
        this.mappedErrorMessages = {
          ...this.mappedErrorMessages,
          ...utilityState.businessCreationError
        }
      }

      // close popup
      if (this.businessCreated) {
        this.onDialogClose();
      }
    })
    
    // Reset error message on first time open popup
    this.resetErrorMessage();
  }

  // reactive form getters
  get businessNameLegal() { return this.businessForm.get('businessNameLegal'); }
  get businessNameDisplayed() { return this.businessForm.get('businessNameDisplayed'); }
  get businessPhone() { return this.businessForm.get('businessPhone'); }
  get businessMobile() { return this.businessForm.get('businessMobile'); }
  get businessEmail() { return this.businessForm.get('businessEmail'); }
  get businessCINNumber() { return this.businessForm.get('businessCINNumber'); }
  get businessGSTNumber() { return this.businessForm.get('businessGSTNumber'); }
  get businessPANNumber() { return this.businessForm.get('businessPANNumber'); }

  onCreateBusiness() {

    // console.log("------------------------------------------");
    
    if (this.logConsole) { 
      // console.log(this.businessForm.value) 
    }

    this.store.dispatch(UtilityActions.unsetBusinessErrorMessage());
    
    let requestBody: CreateBusinessProfileRequest = {
      name: this.businessForm.value.businessNameLegal,
      kycs: {
        // CIN: this.businessForm.value.businessCINNumber,
        GST: this.businessForm.value.businessGSTNumber,
        PAN: this.businessForm.value.businessPANNumber,
      }
    }

    if(this.businessForm.value.businessCINNumber !== '') {
      requestBody.kycs.CIN = this.businessForm.value.businessCINNumber;
    }



    if (this.businessForm.value.businessEmail) {
      requestBody.email = this.businessForm.value.businessEmail;
    }
    if (this.businessForm.value.businessPhone) {
      requestBody.phone = this.businessForm.value.businessPhone;
    }
    if (this.businessForm.value.businessMobile) {
      requestBody.mobile = this.businessForm.value.businessMobile;
    }

    if (this.businessForm && !this.businessForm.invalid) {
      // ADDITIONAL VALIDATION ON PAN NUMBER
      if (this.businessForm.value.businessGSTNumber.substr(2, 10) !== this.businessForm.value.businessPANNumber) {
        // this.store.dispatch(UtilityActions.setBusinessErrorMessage({
        //   message: 'GST Number must contain your PAN'
        // }))
        this.mappedErrorMessages.GST = 'GST Number must contain your PAN';
      } else {
        this.store.dispatch(
          UtilityActions.createBusinessProfile({
            requestBody
          })
        )
      }
    }
  }

  convertToUppercase( inputFor: string = '') {
    this.errorMessage = null;
    switch (inputFor) {
      case 'PAN':
        this.mappedErrorMessages.PAN = null;
        this.businessPANNumber.setValue(this.businessPANNumber.value.toUpperCase())        
        break;
      case "GST":        
        this.mappedErrorMessages.GST = null;
        this.businessGSTNumber.setValue(this.businessGSTNumber.value.toUpperCase())
        break;
      case "CIN":        
        this.mappedErrorMessages.CIN = null;
        this.businessCINNumber.setValue(this.businessCINNumber.value.toUpperCase())
        break;
      default:        
        this.mappedErrorMessages.PAN = null;
        this.mappedErrorMessages.GST = null;
        this.mappedErrorMessages.CIN = null;
        this.businessCINNumber.setValue(this.businessCINNumber.value.toUpperCase())
        this.businessGSTNumber.setValue(this.businessGSTNumber.value.toUpperCase())
        this.businessPANNumber.setValue(this.businessPANNumber.value.toUpperCase())
    }

  }

  onDialogClose(redirect: boolean = true) {
    this.dialogRef.close();
   
    this.store.dispatch(
      UtilityActions.resetMigreatDataFromStore()
    )

    if (redirect) {
      this.store.dispatch(
        UtilityActions.creatBusinessProfileReset()
      )
      this.router.navigate(['/business']);
    }
  }

  
  onInputChange(fieldName: string){
    // console.log('fieldName:', fieldName);
    if(fieldName) {      
      switch(fieldName) {
        case 'PAN':
          this.mappedErrorMessages.PAN = null;
          break;
        case 'GST':        
          this.mappedErrorMessages.GST = null;

          break;
        case 'CIN':        
          this.mappedErrorMessages.CIN = null;
          break;
        default:
          this.mappedErrorMessages.PAN = null;
          this.mappedErrorMessages.GST = null;
          this.mappedErrorMessages.CIN = null;

      }
    }
    
  }

  patchBusinessNameToFrom(businessName: string) {
    console.log('businessName:', businessName);
    this.businessForm.patchValue({
      businessNameLegal: businessName
    });
  }

 
}
