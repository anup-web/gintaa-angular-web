import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { selectSettingsState } from '@gintaa/modules/settings/store/settings.selectors';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';

@Component({
  selector: 'app-change-phone-number-one',
  templateUrl: './change-phone-number-one.component.html',
  styleUrls: ['./change-phone-number-one.component.scss'],
  animations: [ fadeIn, btnFadeInOut]
})
export class ChangePhoneNumberOneComponent implements OnInit {

  public newMobile: string;
  profileContactInfo: FormGroup;

  public phoneNo: string;
  
  submitted: boolean = false;
  error: string = null;
  errorMsg: string = null;

  constructor( 
    private fb: FormBuilder,
    private store: Store<gintaaApp.AppState>,
  ) { 
    this.profileContactInfo = this.fb.group({
      newMobile: new FormControl(null, { validators: [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(10),
        Validators.pattern(APP_CONFIGS.VALID_PHONE_REGEX)
      ], updateOn: "blur" })
    });
  }

  ngOnInit(): void {

   

    this.store.select(selectSettingsState).subscribe(settingsState => {
      // console.log('settingsState:', settingsState);

      this.phoneNo    = settingsState.currentPhone;

      if(settingsState.errorMessage != null && settingsState.errorMessage.error) {
        this.errorMsg    = settingsState.errorMessage.error.message;
      } else{
        this.errorMsg    = settingsState.errorMessage;
      }
      
    });
  }

  

  get f() {
    return this.profileContactInfo.controls;
  }

  sendMobileOtp() {
    this.submitted = true;
    if (!this.profileContactInfo.valid) {
      return;
    }
    this.newMobile = this.profileContactInfo.get('newMobile').value

    // console.log(this.newMobile);
    // const email: string = this.profileContactInfo.get('userEmail').value;
    if (this.newMobile) {
      this.store.dispatch(
        SettingsActions.sendMobileOtpForChangeMobile({ mobile: this.newMobile})
      );
    }  
  }

}
