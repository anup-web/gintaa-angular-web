import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { currentUserEmail, currentAuthErrorMessage, currentUserType } from '@gintaa/modules/auth/store/auth.selectors';
import { Observable, noop } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-user-email-verify',
  templateUrl: './new-user-email-verify.component.html',
  styleUrls: ['./new-user-email-verify.component.scss']
})
export class NewUserEmailVerifyComponent implements OnInit {

  userEmail: string;
  passwordStrength: string;
  passwordStrengthClass: string;
  hidePassword = true;
  passwordStrengthLabel = 'Password strength :';
  @ViewChild('userPassword', {static: false}) public userPassword: ElementRef;
  currentPassword: string;
  authErrorMessage: string = null;
  invalidPasswordErrorMessage: string = null;
  userType: string;

  constructor(private store: Store<gintaaApp.AppState>) { }

  ngOnInit(): void {
    this.passwordStrength = 'poor';
    this.passwordStrengthClass = 'text-danger';

    this.store.pipe(
      select(currentUserEmail),
      tap(email => this.userEmail = email)
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(currentAuthErrorMessage),
      tap(errorMessage => this.authErrorMessage = errorMessage?.message || null)
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(currentUserType),
      tap(userType => this.userType = userType)
    ).subscribe(
      noop
    );
  }

  verifyEmailPassword() {
    const password = this.userPassword.nativeElement.value;
    this.invalidPasswordErrorMessage = null;

    // pass word validation
    // empty check
    // minimum 6 characters check
    if (!password || password.length < 6) {
      this.invalidPasswordErrorMessage = 'Password must be 6 characters long';
      return;
    }
    
    // Pass contains only space chars check
    if (!password.trim()) {
      this.invalidPasswordErrorMessage = 'Password cannot contain only spaces';
      return;
    }

    this.store.dispatch(
      AuthActions.verifyEmailPassword({ email: this.userEmail, password })
    );
  }

  movetoEnterPhoneScreen() {
    this.store.dispatch(
      AuthActions.redirectToSignIn()
    );
  }

  loginEmail(){
    const password = this.userPassword.nativeElement.value;
    this.invalidPasswordErrorMessage = null;
    if (!password || password.length < 6) {
      this.invalidPasswordErrorMessage = 'Password must be 6 characters long';
      return;
    }
    this.store.dispatch(
      AuthActions.loginEmail({ email: this.userEmail, password })
    );
  }

  /*
    SDH - This is not being used anymore
    TODO - remove or move to a utility service
  */
  checkPasswordStrength(password: string) {
    const regexHasNumber: RegExp = new RegExp(APP_CONFIGS.HAS_NUMBER);
    const regexHasUppercaseChar: RegExp = new RegExp(APP_CONFIGS.HAS_UPPERCASE_CHAR);
    const regexHasLowercaseChar: RegExp = new RegExp(APP_CONFIGS.HAS_LOWERCASE_CHAR);
    const regexHasSpecialChar: RegExp = new RegExp(APP_CONFIGS.HAS_SPECIAL_CHAR);

    if (password) {
      const hasNumber = regexHasNumber.test(password);
      const hasUpper = regexHasUppercaseChar.test(password);
      const hasLower = regexHasLowercaseChar.test(password);
      const hasSpecialChar = regexHasSpecialChar.test(password);
      const passLength = password.length;

      // console.log('regex - 1/A/a/! ', hasNumber, hasUpper, hasLower, hasSpecialChar);

      if ( passLength <= 5) {
        this.passwordStrength = 'poor';
        this.passwordStrengthClass = 'text-danger';
      } else if (hasNumber && (hasLower || hasUpper) && (passLength > 5) && (passLength < 7)) {
        this.passwordStrength = 'medium';
        this.passwordStrengthClass = 'text-warning';
      } else if (hasNumber && hasUpper && hasLower && hasSpecialChar && (passLength > 9)) {
        this.passwordStrength = 'very strong';
        this.passwordStrengthClass = 'text-success';
      } else if (hasNumber && hasUpper && hasLower && (passLength > 7)) {
        this.passwordStrength = 'strong';
        this.passwordStrengthClass = 'text-success';
      } else {
        this.passwordStrength = 'medium';
        this.passwordStrengthClass = 'text-warning';
      }
    } else {
      // invalid pass
      this.passwordStrength = 'poor';
      this.passwordStrengthClass = 'text-danger';
    }
  }

}
