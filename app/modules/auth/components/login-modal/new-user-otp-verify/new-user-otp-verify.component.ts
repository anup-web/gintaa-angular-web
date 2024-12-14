import { Component, OnInit, ViewChild } from '@angular/core';
import { noop, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';

import { UserInfo } from '@gintaa/core/models';
import { CURRENT_AUTH_MODAL } from '@gintaa/modules/auth/configs/auth.config';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState, currentUserType } from '@gintaa/modules/auth/store/auth.selectors';
import { btnFadeInOut } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-new-user-otp-verify',
  templateUrl: './new-user-otp-verify.component.html',
  styleUrls: ['./new-user-otp-verify.component.scss'],
  animations: [btnFadeInOut]
})
export class NewUserOtpVerifyComponent implements OnInit {

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  allPossibleAuthModals = CURRENT_AUTH_MODAL;

  confirmationResult: any;
  userInfo: UserInfo;
  errorMessage: any = null;
  isValidOtp: boolean;
  otp: string = null;
  isProcessVerify: boolean;
  countDown;
  countDuration = 60;
  counter;
  tick = 1000;
  showTimer: boolean;
  userType: string;
  isOpen: boolean;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  };

  constructor(
    private store: Store<gintaaApp.AppState>
  ) {
    this.userInfo = new UserInfo();
    this.isValidOtp = true;
    this.store.select(selectAuthState).subscribe(authState => {
      this.userInfo.mblNo = authState.phone;
      this.confirmationResult = authState.firebaseResponse;
      this.errorMessage = authState.errorMessage;
    });
  }

  ngOnInit(): void {
    this.setTimer();
    // this.checkForValidphone();
    this.store.pipe(
      select(currentUserType),
      tap(userType => this.userType = userType)
    ).subscribe(
      noop
    );
  }

  checkForValidphone() {
    if (!this.userInfo.mblNo) {
      this.store.dispatch(
        AuthActions.changeCurrentAuthModal({ page: this.allPossibleAuthModals.SIGN_IN_WITH_MOBILE })
      );
    }
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

  onOtpChange(otp: string) {
    if (!this.isValidOtp) {
      this.isValidOtp = true;
    }
    this.otp = otp;
  }

  onKeyupEvent(event: any) {
    if (event.keyCode === 13 && !this.isVerifyOtp()) {
      this.verfyOtpAndLogin();
    }
  }

  onPasteOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.setVal(pastedText);
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

  isVerifyOtp() {
    if (this.otp === null || this.otp.length < 6) {
      this.isOpen = false;
      return true;
    }
    this.isOpen = true;
    return false;
  }

  verfyOtpAndLogin() {
    this.errorMessage = null;
    if (this.otp) {
      this.store.dispatch(AuthActions.showAuthLoader());
      this.store.dispatch(
        AuthActions.verifyOtpStart({ otp: this.otp, confirmationResult: this.confirmationResult, userType: this.userType })
      );
    }
  }

  resendOtp() {
    // this.errorMessage = null;
    if (this.userInfo.mblNo) {
      // const mobileNotification = {
      //   verificationIdentifierType: 'mobile',
      //   identifier: this.removePlusFromStart(this.userInfo.mblNo)
      // };

      // this.store.dispatch(
      //   AuthActions.resendOtpStart({ mobileNotification })
      // );
      const phone = this.removePlusFromStart(this.userInfo.mblNo);
      this.store.dispatch(
        AuthActions.phoneLoginStart({ userType: this.userType, phone: phone })
      )
      this.resetOtp();
      this.setTimer();
    }
  }

  resetOtp() {
    this.ngOtpInput.setValue('');
    this.isValidOtp = true;
    this.errorMessage = null;
  }

  movetoEnterPhoneScreen() {
    this.store.dispatch(
      AuthActions.redirectToSignIn()
    );
  }

  removePlusFromStart(phone: string) {
    // if (phone.charAt(0) === '+') {
    //   return phone.substr(1);
    // } else {
    //   return phone;
    // }
    try {
      return phone.replace('+91', '').trim();
    } catch (e) {
      return '';
    }
    // if (phone.charAt(0) === '+') {
    //   return phone.substr(1);
    // } else {
    //   return phone;
    // }
  }

}
