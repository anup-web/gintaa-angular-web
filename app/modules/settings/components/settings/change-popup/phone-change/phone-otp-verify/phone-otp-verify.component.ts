import { Component, OnInit } from '@angular/core';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-phone-otp-verify',
  templateUrl: './phone-otp-verify.component.html',
  styleUrls: ['./phone-otp-verify.component.scss']
})
export class PhoneOtpVerifyComponent implements OnInit {

  public currentUserProfile: any;
  public newPhone: string;
  public phoneNo: string;
  public displayName: string;

  public errorMessage: string;

  public otp: string;
  public verificationTransactionId: string;


  countDown;
  countDuration = 30;
  counter;
  tick = 1000;
  showTimer: boolean;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };


  constructor(
    private store: Store<gintaaApp.AppState>
    ) { }

  ngOnInit(): void {
    
    this.setTimer();
    
    this.store.select(selectSettingsState).subscribe(authState => {
      this.phoneNo    = authState.currentPhone;
      // console.log('errorMessage-----:', authState.loading);
    });
    this.fetchPhoneFromStore();
  } 

  onOtpChange($event) {
    // console.log('onOtpChange:', $event);
    this.otp = $event;
  }

  onKeyupEvent($event) {
    // console.log('onKeyupEvent:', $event);
  }

  fetchPhoneFromStore() {
    this.store.select(selectSettingsState).subscribe(settingsState => {
      this.newPhone                   = settingsState.newPhone;
      this.verificationTransactionId  = settingsState.verificationTransactionId;
      this.errorMessage               = settingsState.errorMessage;
    });
  }


  verifyOtp() {
    // console.log('verifyOtp trigger', this.currentUserProfile);

    // console.log('otp:', this.otp, this.verificationTransactionId);
    
    this.store.dispatch( 
      SettingsActions.verifyOtpFromPhone({ verificationTransactionId: this.verificationTransactionId, otp: this.otp})
    )
    // this.store.dispatch( 
    //   SettingsActions.confirmUpdateEmail({ newPhone: this.newPhone, phone: this.phone, displayName: this.displayName})
    // )
  }

  resendOtp() {
    this.setTimer();
    this.store.dispatch( 
      SettingsActions.sendMobileOtpForChangeMobile({ mobile: this.newPhone})
    )
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

}
