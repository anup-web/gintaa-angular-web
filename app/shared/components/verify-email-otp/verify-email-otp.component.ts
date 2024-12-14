import { Component, Input, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileIncomplete } from '@gintaa/shared/models/shared.model';
import { NotificationVerification } from '@gintaa/shared/models/shared.model';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import { selectProfileState } from '@gintaa/modules/profile/store/profile.selectors';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-email-otp',
  templateUrl: './verify-email-otp.component.html',
  styleUrls: ['./verify-email-otp.component.scss']
})
export class VerifyEmailOtpComponent implements OnInit {

  @Input() profileObj: ProfileIncomplete = null;
  @Input() module: string = 'profile';
  // @Input() transactionId: string = null;
  // @Input() email: string = null;
  // @Input() phone: string = null;

  emailVerificationFailed = false;
  mobileVerificationFailed = false;
  verificationEmailSent = false;
  verificationMobileSent = false;
  appLoading = false;
  transactionId: string = null;
  email: string = null;
  phone: string = null;
  closeSubscriber: Subscription;

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

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
  serverError: string = null;
  currentOtp: string = null;
  emailOtpTransactionId: any;
  countDown;
  counter = 60;
  tick = 1000;
  showTimer: boolean;

  constructor(
    private store: Store<gintaaApp.AppState>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data){
      this.email = data.email;
      this.phone = data.phone;
    }
  }

  ngOnInit(): void {
    this.setTimer();
    if (this.module === 'profile') {
      this.closeSubscriber = this.store.select(selectProfileState).subscribe((profileState: any) => {
        this.appLoading = profileState.loading;
        this.emailVerificationFailed = profileState.emailVerificationFailed;
        this.mobileVerificationFailed = profileState.mobileVerificationFailed;
        this.verificationEmailSent = profileState.verificationEmailSent;
        this.verificationMobileSent = profileState.verificationMobileSent;
        this.transactionId = profileState.verificationTransactionId;
        
        if(profileState.closeOpenedModel) {
          this.closeDialog();
        }

        if (this.email) {
          if (this.emailVerificationFailed && this.verificationEmailSent) {
            this.serverError = profileState.message
          }
        } else if (this.phone) {
          if (this.mobileVerificationFailed && this.verificationMobileSent) {
            this.serverError = profileState.message
          }
        }
      });
    }
  }

  closeDialog() {
    if (this.module === 'profile') {
      this.store.dispatch(
        ProfileActions.clearEmailVerificationInfo()
      );
    }
  }

  onOtpChange(otp: any) {
    this.currentOtp = otp;
  }

  onPasteOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.ngOtpInput.setValue(pastedText);
  }

  setTimer() {
    this.showTimer = true;
    this.counter = 60;
    this.countDown = timer(0, this.tick)
      .pipe(
        take(this.counter),
        map(() => --this.counter)
      );
  }

  resetOtpEmail() {
    this.ngOtpInput.setValue('');
    this.serverError = null;
    this.showTimer = false;
    this.counter = 60;
  }

  verifyOtp() {
    this.serverError = null;
    if(!this.currentOtp) {
      this.serverError = 'Please enter a valid otp';
      return false;
    }

    this.showLoader();

    if (this.module === 'profile' && this.email) {
      this.store.dispatch(
        ProfileActions.verifyOtpFromEmail({
          transactionId: this.transactionId,
          otp: this.currentOtp,
          email: this.email
        })
      );
    } else if (this.module === 'profile' && this.phone) {
      this.store.dispatch(
        ProfileActions.verifyOtpFromMobile({
          transactionId: this.transactionId,
          otp: this.currentOtp,
          phone: this.phone
        })
      );
    }
  }

  showLoader() {
    if (this.module === 'profile') {
      this.store.dispatch(
        ProfileActions.profileLoading()
      );
    }
  }

  resendOtp() {
    const reqBody: NotificationVerification = new NotificationVerification();
    if (this.phone) {
      reqBody.verificationIdentifierType = 'mobile';
      reqBody.identifier =  this.phone;
    } else if (this.email) {
      reqBody.verificationIdentifierType = 'email';
      reqBody.identifier =  this.email;
    }
    this.resetOtpEmail();
    this.setTimer();
    this.dispatchResendotp(reqBody);
  }

  dispatchResendotp(reqBody: NotificationVerification) {
    if (this.module === 'profile') {
      if(this.email){
        this.store.dispatch(
          ProfileActions.sendVerificationEmail({
            identifier: 'email',
            reqBody
          })
        );
      } else {
        this.store.dispatch(
          ProfileActions.sendVerificationMobile({
            identifier: 'mobile',
            reqBody
          })
        );
      }
    }
  }

  ngOnDestroy() {
    this.closeSubscriber.unsubscribe();
  }

  isVerifyOtp() {
    if (this.currentOtp === null || this.currentOtp.length < 6) {
      return true;
    }
    return false;
  }

}
