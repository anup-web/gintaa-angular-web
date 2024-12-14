import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';

import { UserInfo } from '@gintaa/core/models';
import { CURRENT_AUTH_MODAL } from '@gintaa/modules/auth/configs/auth.config';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
import { btnFadeInOut } from 'projects/gintaa/src/app/animation';
import { NotificationVerification } from '@gintaa/shared/models/shared.model';

@Component({
  selector: 'app-new-user-otp-verify-second',
  templateUrl: './new-user-otp-verify-second.component.html',
  styleUrls: ['./new-user-otp-verify-second.component.scss'],
  animations: [btnFadeInOut]
})
export class NewUserOtpVerifySecondComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  allPossibleAuthModals = CURRENT_AUTH_MODAL;

  confirmationResult: any;
  userInfo: UserInfo;
  isValidOtp: boolean;
  otp: string = null;
  isProcessVerify: boolean;
  countDown;
  counter = 60;
  tick = 1000;
  showTimer: boolean;
  userType: string;
  isOpen: boolean;
  serverError: string = null;

  errorMessage: string = '';
  actionType: string = '';
  dataAction: string = '';
  transactionId: string = '';
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  countDuration = 60;
  

  constructor(
    private store: Store<gintaaApp.AppState>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data){
      this.actionType = data.actionType;
      this.dataAction = data.dataAction;
    }
    this.userInfo = new UserInfo();
    this.isValidOtp = true;
    this.store.select(selectAuthState).subscribe(authState => {
      this.transactionId = authState.verificationTransactionId;
      this.errorMessage = authState.errorMessage;
    });
  }

  ngOnInit(): void {
    this.setTimer();
  }

  closeDialog() {
    this.store.dispatch(
      AuthActions.clearEmailVerificationInfo()
    );
  }

  onOtpChange(otp: string) {
    if (!this.isValidOtp) {
      this.isValidOtp = true;
    }
    this.otp = otp;
  }

  onPasteOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.ngOtpInput.setValue(pastedText);
  }

  onKeyupEvent(event: any) {
    if (event.keyCode === 13 && !this.isVerifyOtp()) {

    }
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  isVerifyOtp() {
    if (this.otp === null || this.otp.length < 6) {
      return true;
    }
    return false;
  }


  setTimer() {
    this.showTimer = true;
    this.counter = this.countDuration
    this.countDown = timer(0, this.tick)
      .pipe(
        take(this.counter),
        map(() => --this.counter)
      );
  }

  resetOtpEmail() {
    this.ngOtpInput.setValue('');
    this.otp;
    this.serverError = null;
    this.showTimer = false;
    this.counter = 60;
  }

  verifyOtp() {
    this.serverError = null;
    if(!this.otp) {
      this.serverError = 'Please enter a valid otp';
      return false;
    }

    if (this.actionType === 'userEmail') {
      this.store.dispatch(
        AuthActions.verifyOtpFromMobile({
          transactionId: this.transactionId,
          otp: this.otp
        })
      );
    } else{
      this.store.dispatch(
        AuthActions.verifyOtpFromEmail({
          transactionId: this.transactionId,
          otp: this.otp
        })
      );
    }
  }

  resendOtp() {
    const reqBody: NotificationVerification = new NotificationVerification();
    if (this.actionType === 'userEmail') {
      reqBody.verificationIdentifierType = 'mobile';
      reqBody.identifier =  this.dataAction;
    } else {
      reqBody.verificationIdentifierType = 'email';
      reqBody.identifier =  this.dataAction;
    }
    this.resetOtpEmail();
    this.setTimer();
    this.dispatchResendotp(reqBody);

  }

  dispatchResendotp(reqBody: NotificationVerification) {
    if (this.actionType === 'userEmail') {
      this.store.dispatch(
        AuthActions.sendVerificationMobile({
          identifier: 'mobile',
          reqBody
        })
      );
    } else{
      this.store.dispatch(
        AuthActions.sendVerificationEmail({
          identifier: 'email',
          reqBody
        })
      );
    }
  }

}
