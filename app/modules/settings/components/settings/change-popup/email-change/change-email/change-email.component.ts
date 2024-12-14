import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
  animations: [ fadeIn, btnFadeInOut]
})
export class ChangeEmailComponent implements OnInit {
  
  public username    : string;
  public profileUrl  : string;
  public phoneNo     : string;
  public userEmail   : string;

  public newEmail     : string;
  public errorMessage : string;

  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    private store: Store<gintaaApp.AppState>,
  ) { }

  ngOnInit(): void {

    this.store.select(selectSettingsState).subscribe(settingsState => {
      this.phoneNo    = settingsState.currentPhone;
      this.userEmail  = settingsState.currentEmail;
      // console.log('errorMessage-----:', this.phoneNo, this.userEmail);
      
      if(settingsState.errorMessage != null && settingsState.errorMessage.error) {
        this.errorMessage    = settingsState.errorMessage.error.message;
      } else{
        this.errorMessage    = settingsState.errorMessage;
      }
    });
  }

  onClickSendOtp() {
    this.errorMessage         = null;
    const nEmail              = this.newEmail;
    const phoneNumber         = this.phoneNo;

    const regexEmail: RegExp  = new RegExp(APP_CONFIGS.VALID_EMAIL_REGEX);
    if (regexEmail.test(String(nEmail).toLowerCase())) {
      // console.log('valid email', phoneNumber);
      this.store.dispatch( 
        SettingsActions.sendEmailOtpForChangeEmail({ email: nEmail})
        // SettingsActions.redirectToChangeEmailOtpVerification({ newEmail: nEmail, phoneNumber: phoneNumber })
      )
    } else {
      // console.log('invalid email');
      this.errorMessage = 'Please enter a valid email';
    }

  }

}
