import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@gintaa/core/services/auth.service';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { Store } from '@ngrx/store';
import { StorageService } from '@gintaa/core/services/storage.service';
import * as gintaaApp from '@gintaa/store/app.reducer';

import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserInfo } from '@gintaa/core/models';
import { CURRENT_SETTINGS_MODAL } from '@gintaa/modules/settings/configs/settings.config';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  username: string;
  profileUrl: string;
  phoneNo: string;
  userEmail: string;

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  allPossibleAuthModals = CURRENT_SETTINGS_MODAL;

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
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private store: Store<gintaaApp.AppState>,
    private storageService: StorageService,
  ) { 
    this.isValidOtp = true;
  }

  ngOnInit(): void {
    const currentUser = this.storageService.store;
    if (currentUser) {
      this.phoneNo    = currentUser.providerData[0].phoneNumber;
      this.userEmail  = currentUser.providerData[0].email;
      this.username  = currentUser.providerData[0].displayName;
    }

    this.setTimer();
  }

  redirectToResetPasswordMailSend() {
    this.store.dispatch(
      SettingsActions.resetPasswordMailSend({ email: this.userEmail })
    );
  }

  checkForValidphone() {
    if (!this.phoneNo) {
      this.store.dispatch(
        SettingsActions.changeCurrentAuthModal({ page: this.allPossibleAuthModals.CHANGE_PASSWORD })
      );
    }
  }

  setTimer() {
    this.showTimer = true;
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
      return true;
    }
    return false;
  }

  verfyOtpAndLogin() {}

  resendOtp() {
    if (this.phoneNo) {
      const mobileNotification = {
        verificationIdentifierType: 'mobile',
        identifier: this.removePlusFromStart(this.phoneNo)
      };

      this.resetOtp();
      this.setTimer();
    }
  }

  resetOtp() {
    this.ngOtpInput.setValue('');
    this.isValidOtp = true;
  }

  movetoEnterPhoneScreen() {}

  removePlusFromStart(phone: string) {
    if (phone.charAt(0) === '+') {
      return phone.substr(1);
    } else {
      return phone;
    }
  }

  redirectToResetPassword() {
    this.store.dispatch(
      SettingsActions.redirectToResetPasswordConfirm()
    );
  }

}
