import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APP_CONSTANTS } from '@gintaa/config/constant.config';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState, currentAuthErrorMessage } from '@gintaa/modules/auth/store/auth.selectors';
import { NewUserOtpVerifySecondComponent } from '@gintaa/modules/auth/components/login-modal/new-user-otp-verify-second/new-user-otp-verify-second.component';
import { NotificationVerification } from '@gintaa/shared/models/shared.model';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';
@Component({
  selector: 'app-profile-phone-email',
  templateUrl: './profile-phone-email.component.html',
  styleUrls: ['./profile-phone-email.component.scss'],
  animations: [ fadeIn, btnFadeInOut]
})
export class ProfilePhoneEmailComponent implements OnInit {

  error: string = null;
  submitted: boolean = false;
  profileContactInfo: FormGroup;
  name: string;
  loginMode: string = '';
  modalDialogSelected: any;
  messageShow: boolean = false;
  sendVerification: boolean = false;
  isVerified: boolean = false;
  dealOpen: boolean = false;
  closeModal: boolean = false;
  message: string = '';
  verificationTransactionId: string;
  disabledButton: boolean = true;
  
  constructor(private store: Store<gintaaApp.AppState>, 
    public matDialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data ) {
    this.profileContactInfo = this.fb.group({
      userPhone: new FormControl(null, { validators: [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(10),
        Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
      ], updateOn: "blur" }),
      userEmail: new FormControl(null, { validators: [
        Validators.required,
        Validators.pattern(APP_CONFIGS.VALID_EMAIL_REGEX)
      ], updateOn: "blur" })
    });
  }
  
  ngOnInit(): void {
    this.fetchPhoneOrEmailFromStore();
    this.store.select(currentAuthErrorMessage).subscribe((error:any) => {
      this.message = error;
    });
  }

  get f() {
    return this.profileContactInfo.controls;
  }

  fetchPhoneOrEmailFromStore() {
    this.store.select(selectAuthState).subscribe(authState => {
      this.name = authState.name;
      this.isVerified = authState.isVerified;
      this.verificationTransactionId = authState.verificationTransactionId;
      this.loginMode = '';
      this.profileContactInfo.patchValue({
        userPhone: this.remove91ToPhoneNumber(authState.phone),
        userEmail: authState.email,
      });
      this.profileContactInfo.updateValueAndValidity();

      if((authState.phone && authState.isPhoneDisabled) || authState.authType === 'mobile') {
        this.loginMode = 'userPhone';
        this.profileContactInfo.get('userPhone').disable();
        if(authState.email){
          if (this.validateEmail(authState.email)) {
            this.disabledButton = false;
          } else{
            this.disabledButton = true;
          }
         // this.messageShow = true;
        }
      }
      if(authState.email && authState.isEmailDisabled) {
        this.loginMode = 'userEmail';
        this.profileContactInfo.get('userEmail').disable();
        if(authState.phone){
          if (this.validateMobile(authState.phone)) {
            this.disabledButton = false;
          } else{
            this.disabledButton = true;
          }
          this.messageShow = true;
        }
      }
      // open email/phone verify modal if OTP sent successfully
      if (authState.verificationTransactionId && !authState.closeOtpModel && !this.dealOpen) {
        this.openOtpDialog(this.loginMode);
      }
      this.error = authState.profileError || null;

      if(authState.verificationTransactionId === '' && authState.closeOtpModel){
        this.closeModal = true;
        this.dealOpen = false;
        this.modalDialogSelected.close();
      }
    });
  }

  saveEmailOrPhone() {
    this.submitted = true;
    if (!this.profileContactInfo.valid) {
      return;
    }
    const phone: string = this.profileContactInfo.get('userPhone').value
    const email: string = this.profileContactInfo.get('userEmail').value;
    if(!this.isVerified){
      if (this.loginMode == 'userEmail'){
        if (email) {
          this.sendVerificationMobile();
        } else {
          this.store.dispatch(
            AuthActions.updateContactErrorMessage({ message: APP_CONSTANTS.INVAILD_USER_INFO, phone, email })
          );
        }
      } else if (this.loginMode == 'userPhone'){
        if (phone) {
          this.sendVerificationEmail();
        } else {
          this.store.dispatch(
            AuthActions.updateContactErrorMessage({ message: APP_CONSTANTS.INVAILD_USER_INFO, phone, email })
          );
        }
      } else {
        this.store.dispatch(
          AuthActions.updateContactErrorMessage({ message: APP_CONSTANTS.INVAILD_USER_INFO, phone, email })
        );
      }
    } else {
      const user = {
        name: this.name,
        email,
        mobile: phone,
        mblNo: phone
      }
      this.store.dispatch(
        AuthActions.updateUserProfile({ user, from: 'phone-email' })
      );
    }
  }

  updateProfileAction(email, phone) {
    // save in gintaa DB in each step
    const user = {
      name: this.name,
      email,
      mobile: phone,
      mblNo: phone
    }
    this.store.dispatch(
      AuthActions.updateUserProfile({ user, from: 'phone-email' })
    );
  }

  sendVerificationMobile() {
    const phone: string = this.profileContactInfo.get('userPhone').value
    const email: string = this.profileContactInfo.get('userEmail').value;
    
    if (this.validateMobile(phone)) {
      this.store.dispatch(
        AuthActions.saveEmailAndPhone({ email, phone  })
      );
      this.sendVerification = true;
      const reqBody: NotificationVerification = new NotificationVerification();
      reqBody.verificationIdentifierType = 'mobile';
      reqBody.identifier =  phone;
      this.store.dispatch(
        AuthActions.sendVerificationMobile({
          identifier: 'mobile',
          reqBody
        })
      );
    } else {
      this.message = 'Phone number is invalid';
    }
  }

  sendVerificationEmail() {
    const phone: string = this.profileContactInfo.get('userPhone').value
    const email: string = this.profileContactInfo.get('userEmail').value;

    if (this.validateEmail(email)) {
      this.store.dispatch(
        AuthActions.saveEmailAndPhone({ email, phone  })
      );
      this.sendVerification = true;
      const reqBody: NotificationVerification = new NotificationVerification();
      reqBody.verificationIdentifierType = 'email';
      reqBody.identifier =  email;

      this.store.dispatch(
        AuthActions.sendVerificationEmail({
          identifier: 'email',
          reqBody
        })
      );
    } else {
      this.message = 'Email is invalid';
    }
  }

  private validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private validateMobile(mobile: string) {
    return mobile ? mobile.length == 10 : false;
  }

  openOtpDialog(actionType: string) {
    this.dealOpen = true;
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-otp-verified-second-model';
    dialogConfig.position = { top: '50px' };
    dialogConfig.height = 'auto';
    dialogConfig.width = '500px';
    let dataAction = '';

    if(actionType === 'userPhone'){
      dataAction = this.profileContactInfo.get('userEmail').value;
    } else {
      dataAction = this.profileContactInfo.get('userPhone').value;
    }
    dialogConfig.data = {
      actionType: actionType,
      dataAction: dataAction
    };
    this.modalDialogSelected = this.matDialog.open(NewUserOtpVerifySecondComponent, dialogConfig);
  }

  updateProfileData (type:string, value:string) {
    let phone: string = '';
    let email: string = ''
    if(type == 'email'){
      phone = this.profileContactInfo.get('userPhone').value;
      email = value;
    } else {
      email = this.profileContactInfo.get('userEmail').value;
      phone = value;
    }
    this.store.dispatch(
      AuthActions.saveEmailAndPhone({ email, phone  })
    );
  }

  remove91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && phone.includes(replaceString)) {
      phone = phone.replace(replaceString, '')
    }
    return phone;
  }

  validateInput(event:any, type:string) {
    const inputData = event.target.value.trim();
    this.message = '';
    if(inputData){
      if (type=='email') {
        if (this.validateEmail(inputData)) {
          this.disabledButton = false;
          console.log()
        } else{
          this.disabledButton = true;
        }
      } else{
        if (this.validateMobile(inputData)) {
          this.disabledButton = false;
        } else{
          this.disabledButton = true;
        }
      }
     this.messageShow = true;
    } else{
      this.messageShow = false;
      this.disabledButton = true;
    }
    this.updateProfileData(type, inputData);
  }

}
