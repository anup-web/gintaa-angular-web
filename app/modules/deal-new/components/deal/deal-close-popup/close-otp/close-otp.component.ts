import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { dealErrorSelector, dealSuccessSelector, selectlotpPayload } from '@gintaa/modules/deal-new/store/deal.selectors';
import localization from '@gintaa/config/localization';
@Component({
  selector: 'app-close-otp',
  templateUrl: './close-otp.component.html',
  styleUrls: ['./close-otp.component.scss']
})
export class CloseOtpComponent implements OnInit, OnDestroy {

  @Input() dealRefNo: string;
  @Input() closeStep: string;
  @Input() showOtp: boolean = true;
  @Output("closeModel") closeModel: EventEmitter<any> = new EventEmitter();
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  dealErrorSubscriber: Subscription;
  dealSuccessSubscriber: Subscription;
  dealOTPSubscriber: Subscription;
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
  isValidOtp: boolean;
  otp: string = null;
  errorMessage: string = null;
  successMessage: string = null;
  otpPayload: any = null;

  constructor(
    private store: Store<gintaaApp.AppState>
  ) {
    this.isValidOtp = true;
  }

  ngOnInit(): void {
    this.dealErrorSubscriber = this.store.select(dealErrorSelector).subscribe(message => {
      const result = /^OTP transaction of deal/.test(message);
      if (result) {
        this.errorMessage = localization.deal.VERIFICATION_FAILED_INVALID_OTP;
      } else {
        this.errorMessage = message;
      }
    });
    this.dealSuccessSubscriber = this.store.select(dealSuccessSelector).subscribe(message => {
      this.successMessage = message;
    });
    this.dealOTPSubscriber = this.store.select(selectlotpPayload).subscribe(otpPayload => {
      this.otpPayload = otpPayload;
    });

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

  resetOtp() {
    this.ngOtpInput.setValue('');
    this.isValidOtp = true;
  }

  onOtpChange(otp: string) {
    if (!this.isValidOtp) {
      this.isValidOtp = true;
    }
    this.otp = otp;
  }

  onKeyupEvent(event: any) {
    if (event.keyCode === 13 && !this.isVerifyOtp()) {
      this.closeDeal();
    }
  }

  closeDeal() {
    if (this.otp) {
      this.store.dispatch(
        DealActions.closeDeal({ otp: this.otp, dealRefId: this.dealRefNo })
      );
    } else {
      this.errorMessage = 'PLease provide a valid otp';
    }
  }

  onPasteOtp(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    this.setVal(pastedText);
  }

  resendOtp() {
    this.store.dispatch(DealActions.pageLoading());
    this.store.dispatch(DealActions.resendOtpStart({ dealRefId: this.dealRefNo }));
  }

  close() {
    this.errorMessage = null;
    this.closeModel.emit('close');
  }

  ngOnDestroy() {
    this.dealErrorSubscriber.unsubscribe();
    this.dealSuccessSubscriber.unsubscribe();
    this.dealOTPSubscriber.unsubscribe();
  }

}
