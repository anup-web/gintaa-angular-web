import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { selectSettingsState, currentUserDetails, currentAuthSuccessMessage } from '@gintaa/modules/settings/store/settings.selectors';
import { map, take, tap } from 'rxjs/operators';
import { noop, timer } from 'rxjs';
import { AuthService } from '@gintaa/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-otp-verify',
  templateUrl: './email-otp-verify.component.html',
  styleUrls: ['./email-otp-verify.component.scss']
})
export class EmailOtpVerifyComponent implements OnInit {

  public currentUserProfile: any;
  public newEmail: string;
  public phoneNo: string;
  public displayName: string;
  public userEmail: string;

  public errorMessage: string;
  public successMessage: string;

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
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  };

  constructor(
    private store: Store<gintaaApp.AppState>,
    private authService: AuthService,
    private fireAuth: AngularFireAuth,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    ) { }

  ngOnInit(): void {
    this.setTimer();
    this.store.select(selectSettingsState).subscribe(authState => {
      this.phoneNo    = authState.currentPhone;
      this.userEmail  = authState.currentEmail;
      // console.log('errorMessage-----:', this.phoneNo, this.userEmail);
    });
    
    this.store.pipe(
      select(currentAuthSuccessMessage),
      tap(successMessage => {
        // console.log(successMessage);
        return this.successMessage = successMessage || null;
      }),
    ).subscribe(
      noop
    );
    this.fetchEmailFromStore();
  }
  

  onOtpChange($event) {
    // console.log('onOtpChange:', $event);
    this.otp = $event;
  }

  onKeyupEvent($event) {
    // console.log('onKeyupEvent:', $event);
  }

  fetchEmailFromStore() {
    this.store.select(selectSettingsState).subscribe(settingsState => {
      this.newEmail                     = settingsState.newEmail;
      this.verificationTransactionId    = settingsState.verificationTransactionId;

      if(settingsState.errorMessage != null && settingsState.errorMessage.error) {
        this.errorMessage    = settingsState.errorMessage.error.message;
      } else{
        this.errorMessage    = settingsState.errorMessage;
      }
      // this.errorMessage = authState.errorMessage;
    });
  }


  verifyOtp() {
    // console.log('verifyOtp trigger', this.currentUserProfile);

    // console.log('otp:', this.otp, this.verificationTransactionId);
    
    this.store.dispatch( 
      SettingsActions.verifyOtpFromEmail({ email: this.newEmail, verificationTransactionId: this.verificationTransactionId, otp: this.otp})
    )
    // this.store.dispatch( 
    //   SettingsActions.confirmUpdateEmail({ newEmail: this.newEmail, phone: this.phone, displayName: this.displayName})
    // )
  }

  resendOtp() {
    this.setTimer();
    this.store.dispatch( 
      SettingsActions.sendEmailOtpForChangeEmail({ email: this.newEmail})
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
