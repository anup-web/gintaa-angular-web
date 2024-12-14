import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UserInfo } from '@gintaa/core/models';
import * as gintaaApp from '../../../../../store/app.reducer';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { APP_CONSTANTS } from '@gintaa/config/constant.config';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [btnFadeInOut, fadeIn]
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('userForm', { static: false }) public userFrm: NgForm;
  userInfo: UserInfo;
  loggedInErrorMsg: string = null;
  authSubscriber: Subscription;
  isOpen: boolean;
  logConsole: boolean = false;
  isDisabled: boolean = true;
  constructor(
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.userInfo = new UserInfo();
    this.authSubscriber = this.store.select(selectAuthState).subscribe(authState => {

      // fetch error message
      this.loggedInErrorMsg = authState.errorMessage ? authState.errorMessage : null;

      if (authState && authState.phone) {
        setTimeout(() => {
          this.userFrm.setValue({
            userInfo: this.removeCountryPrefixFromStart(authState.phone)
          });
          this.isOpen = true;
          this.userFrm.controls.userInfo.markAsTouched();
          this.validateInput(this.userFrm.value.userInfo, true);
        }, 100);
      } else if (authState && authState.email) {
        setTimeout(() => {
          this.userFrm.setValue({
            userInfo: authState.email
          });
          this.isOpen = true;
          this.userFrm.controls.userInfo.markAsTouched();
          this.validateInput(this.userFrm.value.userInfo, true);
        }, 100);
      } else {
        setTimeout(() => {
          this.userFrm.controls.userInfo.markAsUntouched();
        }, 100);
      }

    })
  }

  sendUserInfo(form: NgForm) {
    this.loggedInErrorMsg = null;
    if (!form.valid) {
      this.loggedInErrorMsg = APP_CONSTANTS.INVAILD_USER_INFO;
      return;
    }
    const userInfo = form.value.userInfo;
    const regexEmail: RegExp = new RegExp(APP_CONFIGS.VALID_EMAIL_REGEX);
    const extendedEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
    if (extendedEmailRegex.test(String(userInfo).toLowerCase())) {
      this.store.dispatch(
        AuthActions.signInWithEmailLinkMailSend({ email: userInfo })
      )
    } else if (regexPhone.test(userInfo)) {
      this.showLoader();
      this.store.dispatch(
        AuthActions.checkUserStart({ userInfo, loginType: 'phone' })
      )
      this.userFrm.controls.userInfo.markAsTouched();
    } else {
      this.userFrm.controls.userInfo.markAsUntouched();
      this.loggedInErrorMsg = APP_CONSTANTS.INVAILD_USER_INFO;
      this.store.dispatch(
        AuthActions.updateErrorMessage({ message: APP_CONSTANTS.INVAILD_USER_INFO })
      );
    }
  }

  showLoader() {
    this.store.dispatch(AuthActions.showAuthLoader());
  }

  hideLoader() {
    this.store.dispatch(AuthActions.hideAuthLoader());
  }

  validateInput(event: any, isValue: boolean = false) {
    const inputData = isValue ? event.trim() : event.target.value.trim();
    if (inputData) {
      const regexEmail: RegExp = new RegExp(APP_CONFIGS.VALID_EMAIL_REGEX);
      const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
      const extendedEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (extendedEmailRegex.test(String(inputData).toLowerCase()) || regexPhone.test(inputData)) {
        this.userFrm.controls.userInfo.markAsTouched();
        this.isDisabled = false;
        this.isOpen = true;
      } else {
        this.isDisabled = true;
        this.userFrm.controls.userInfo.markAsUntouched();
        setTimeout(() => this.userFrm.control.setErrors({ 'nomatch': true }));
      }
    } else {
      this.isDisabled = true;
    }
  }

  extendedEmailRegexCheck(inputData: any) {
    // going one step further
    // TODO: serialize it later as common email regex
    const extendedEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (extendedEmailRegex.test(String(inputData).toLowerCase())) {
      this.userFrm.controls.userInfo.markAsTouched();
    } else {
      this.userFrm.controls.userInfo.markAsUntouched();
      setTimeout(() => this.userFrm.control.setErrors({ 'nomatch': true }));
    }
  }

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let pastedText = clipboardData.getData('text');
    this.validateInput(pastedText, true);
  }

  removeCountryPrefixFromStart(phone: string) {
    if (phone.charAt(0) === '+') {
      const phoneWithoutPlus = phone.substr(1);
      if (phoneWithoutPlus.length > 10) {
        // we might have 91 added with the number
        if (phoneWithoutPlus.substr(0, 2) === '91') {
          return phoneWithoutPlus.substr(2).trimLeft();
        }
      }
      return phoneWithoutPlus;
    } else {
      return phone;
    }
  }

  ngOnDestroy() {
    this.authSubscriber.unsubscribe();
  }

}
