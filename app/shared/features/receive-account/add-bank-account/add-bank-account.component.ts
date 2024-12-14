import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { addReceiveAccountError } from '@gintaa/shared/configs/add-receive-account-error.config';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.scss']
})
export class AddBankAccountComponent implements OnInit {
  
  accountDetailsForm: FormGroup;
  closeOpenedPopup: boolean = false;
  accountDetails: any;
  isSaveButtonDisable: boolean = false;
  
  errorMessage: string    = null;
  successMessage: string  = null;

  businessId: string = null;

  addReceiveAccountError = addReceiveAccountError;

  showLoader: boolean = false;
  

  constructor(    
    public dialogRef: MatDialogRef<AddBankAccountComponent>,
    private store: Store<gintaaApp.AppState>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {

    if (dialogData && dialogData.item != undefined && dialogData.item ) {
      this.accountDetails = dialogData.item;
    }

    if (dialogData && dialogData.businessId) {
      this.businessId = dialogData.businessId;
    }

    // console.log('::::::::::::: businessId add-account :::::::::::::', this.businessId);
    
    this.setFormGroup();

  }

  ngOnInit(): void {
    this.errorMessage = null;
    this.isSaveButtonDisable = false;
    
    
    this.subscribeToUtilityStore();
  }

  subscribeToUtilityStore() {
    this.store.select(selectUtilityState).subscribe(utilityState => {
      this.closeOpenedPopup = utilityState.closeOpenedPopup;      
      this.errorMessage     = utilityState.errorMessage;
      this.successMessage   = utilityState.successMessage;

      if(this.errorMessage){
        this.isSaveButtonDisable = true;        
        this.showLoader = false;
      }

      // close popup
      if (this.closeOpenedPopup) {
        this.showLoader = false;
        this.onDialogClose();
      }
    })
    
  }

  setFormGroup() {
    
    // bankAccountDetails: new FormArray([
    //   this.formBuilder.group({          
    //     name: new FormControl(''),
    //     accountNumber: new FormControl(''),
    //     ifsc: new FormControl(''),
    //     branch: new FormControl('')
    //   })
    // ]),


    this.accountDetailsForm = this.formBuilder.group({
      id: new FormControl(''),
      paymentType: new FormControl('BANK', [
        Validators.required
      ]),
      name: new FormControl(''),
      accountNumber: new FormControl(''),
      ifsc: new FormControl(''),
      branch: new FormControl(''),
      upiId: new FormControl(''),
      number: new FormControl(''),
      nickName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      default: new FormControl(true)
    });


    this.setFormGroupValueForEdit();
    // this.changeValidators();

    setTimeout(()=>{ 
      this.changeValidators();
      // this.addValidationForBank();
     }, 1000);
    
     this.inputFieldValueChange();

  }


  setFormGroupValueForEdit() {
    if(this.accountDetails) {
      this.isSaveButtonDisable = true;
      // console.log('isSaveButtonDisable:', this.isSaveButtonDisable);

      const paymentType = this.accountDetails.paymentType;
      this.accountDetailsForm.patchValue({
        id: this.accountDetails.id,
        paymentType: paymentType,
        nickName: this.accountDetails.nickName
      });

      switch(paymentType) {
        case 'BANK':
          const bankAccountDetails = this.accountDetails.bankAccountDetails || null;
          if(bankAccountDetails) {
            this.accountDetailsForm.patchValue({
              name: bankAccountDetails.name,
              accountNumber: bankAccountDetails.accountNumber,
              ifsc: bankAccountDetails.ifsc,
              branch: bankAccountDetails.branch
            });
          }
          break;
        case 'UPI':        
          this.accountDetailsForm.patchValue({
            upiId: this.accountDetails.upiId
          });
  
          break;
        case 'PAYTM':        
          this.accountDetailsForm.patchValue({
            number: this.accountDetails.number
          });
  
          break;
        default:
  
      }

      // Disable account type
      // this.accountDetailsForm.get('paymentType')['disable']();
      
    }
  }

  inputFieldValueChange() {
    this.accountDetailsForm.get("paymentType").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
      this.changeValidators();
    });
    this.accountDetailsForm.get("nickName").valueChanges.subscribe(data=> {      

      this.isSaveButtonDisable = false;
      this.errorMessage = null;      
      this.changeValidators();
      // this.addValidationForBank();
    });
    this.accountDetailsForm.get("name").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
    });
    this.accountDetailsForm.get("accountNumber").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
    });
    this.accountDetailsForm.get("ifsc").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
    });
    this.accountDetailsForm.get("branch").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
    });
    this.accountDetailsForm.get("upiId").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
    });
    this.accountDetailsForm.get("number").valueChanges.subscribe(data=> {
      this.isSaveButtonDisable = false;
      this.errorMessage = null;
    });

  }

  
  changeValidators() {
    
    const paymentType = this.accountDetailsForm.get("paymentType").value;

    // console.log('paymentType:', paymentType);
  

    switch(paymentType) {
      case 'BANK':
        this.addValidationForBank();

        break;
      case 'UPI':        
        this.addValidationForUpi();

        break;
      case 'PAYTM':        
        this.addValidationForPaytm();

        break;
      default:
        // this.addValidationForBank();

    }
  }

  addValidationForBank() {   
    // console.log('validation for BANK');
    this.accountDetailsForm.controls["upiId"].clearValidators();            
    this.accountDetailsForm.controls["number"].clearValidators();

    this.accountDetailsForm.controls["name"].setValidators([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(120),
    ]);
    this.accountDetailsForm.controls["accountNumber"].setValidators([
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(18)
    ]);
    this.accountDetailsForm.controls["ifsc"].setValidators([
      Validators.required,
      Validators.minLength(11),
      Validators.pattern(APP_CONFIGS.IFSC_CODE_REGEX)
    ]);
    this.accountDetailsForm.controls["branch"].setValidators([
      Validators.required,
      Validators.minLength(4),
    ]);    
    this.updateValidity();
  }

  addValidationForUpi() {    
    // console.log('validation for UPI')
    this.accountDetailsForm.controls["number"].clearValidators(); 

    this.accountDetailsForm.controls["name"].clearValidators();
    this.accountDetailsForm.controls["accountNumber"].clearValidators();
    this.accountDetailsForm.controls["ifsc"].clearValidators();
    this.accountDetailsForm.controls["branch"].clearValidators();

    this.accountDetailsForm.controls["upiId"].setValidators([
      Validators.required
    ]);   
    
    this.updateValidity(); 
  }

  addValidationForPaytm() {    
    // console.log('validation for PAYTM')
    this.accountDetailsForm.controls["upiId"].clearValidators();

    this.accountDetailsForm.controls["name"].clearValidators();
    this.accountDetailsForm.controls["accountNumber"].clearValidators();
    this.accountDetailsForm.controls["ifsc"].clearValidators();
    this.accountDetailsForm.controls["branch"].clearValidators();

    this.accountDetailsForm.controls["number"].setValidators([
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(14),
      Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
    ]);
    
    this.updateValidity();
  }

  updateValidity() {
    // console.log('update validity');
    this.accountDetailsForm.controls["upiId"].updateValueAndValidity();    
    this.accountDetailsForm.controls["number"].updateValueAndValidity();

    this.accountDetailsForm.controls["name"].updateValueAndValidity();
    this.accountDetailsForm.controls["accountNumber"].updateValueAndValidity();
    this.accountDetailsForm.controls["ifsc"].updateValueAndValidity();
    this.accountDetailsForm.controls["branch"].updateValueAndValidity();
  }


  onDialogClose() {
    this.dialogRef.close();
    if (this.closeOpenedPopup) {
      this.store.dispatch(
        UtilityActions.closeOpenedPopupReset()
      )
      
      if(!this.businessId) {
        this.store.dispatch(
          UtilityActions.getAllReceivePaymentList()
        )
      } else {
        this.store.dispatch(
          UtilityActions.getAllReceivePaymentListForBusiness({businessId: this.businessId})
        )
      }
    }
  }

  saveAccountCredential() {

    // console.log('accountDetailsForm:', this.accountDetailsForm.value);
    const submitData = this.accountDetailsForm.value;
    let paymentPostObject: any;
    if(submitData.paymentType) {
      switch(submitData.paymentType) {
        case 'BANK':
          paymentPostObject = {
            "paymentType" : submitData.paymentType,
            "bankAccountDetails": {
              "accountNumber" : submitData.accountNumber,
              "ifsc"          : submitData.ifsc,
              "branch"        : submitData.branch,
              "name"          : submitData.name
            },
            "nickName"  : submitData.nickName,
            "default"   : submitData.default
          }

          break;
        case 'UPI':        
          paymentPostObject = {
            "paymentType" : submitData.paymentType,
            "upiId"       : submitData.upiId,
            "nickName"    : submitData.nickName,
            "default"     : submitData.default
          }

          break;
        case 'PAYTM':        
          paymentPostObject = {
            "paymentType" : submitData.paymentType,
            "number"      : submitData.number,
            "nickName"    : submitData.nickName,
            "default"     : submitData.default
          }

          break;
        default:

      }
    }

    // console.log('paymentPostObject:', paymentPostObject);
    if(paymentPostObject) {
      this.showLoader = true;

      if(this.businessId) {
        paymentPostObject.businessId = this.businessId;
      }

      // console.log('paymentPostObject:', paymentPostObject);

      if(!submitData.id) {
        // Add account
        this.store.dispatch(
          UtilityActions.addReceivePaymentDetails({
            paymentPostObject
          })
        )
      } else {
        // Update account
        paymentPostObject.id = submitData.id;
        this.store.dispatch(
          UtilityActions.updateReceivePaymentDetails({
            paymentPostObject
          })
        )
      }
    }

  }

}
