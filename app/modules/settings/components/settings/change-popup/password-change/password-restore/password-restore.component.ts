import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { SettingsActions } from '@gintaa/modules/settings/store/settings-types';
import { currentUserEmail, currentAuthErrorMessage, currentUserType, currentAuthSuccessMessage } from '@gintaa/modules/settings/store/settings.selectors';
import { Observable, noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.scss']
})
export class PasswordRestoreComponent implements OnInit {

  
  userEmail: string;
  passwordStrength: string;
  passwordStrengthClass: string;
  hidePassword = true;
  passwordStrengthLabel = 'Password strength :';
  @ViewChild('userPassword', {static: false}) public userPassword: ElementRef;
  currentPassword: string;
  authErrorMessage: string = null;
  successMessage:  string = null;
  invalidPasswordErrorMessage: string = null;
  userType: string;

  public oobCode: string;

  constructor(
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<PasswordRestoreComponent>,
    private store: Store<gintaaApp.AppState>,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.passwordStrength = 'poor';
    this.passwordStrengthClass = 'text-danger';


    this.route.queryParams.subscribe(params => {
      this.oobCode = params.oobCode;
    });

    this.store.pipe(
      select(currentUserEmail),
      tap(email => this.userEmail = email)
    ).subscribe(
      noop
    );

    // 

    this.store.pipe(
      select(currentAuthErrorMessage),
      tap(errorMessage => this.authErrorMessage = errorMessage?.message || null)
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(currentAuthSuccessMessage),
      tap(successMessage => {
        // console.log(successMessage);

        /////////// Start Log-out //////////////
        // if(successMessage) {
        //   this.dialogRef.close();

        //   this.store.dispatch(
        //     SettingsActions.logout()
        //   );
        // }
        /////////// Start Log-out //////////////

        return this.successMessage = successMessage || null;
      }),
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


  confirmResetPassword() {
    const password = this.userPassword.nativeElement.value;
    this.invalidPasswordErrorMessage = null;

    // pass word validation
    // empty check
    // minimum 6 characters check
    if (!password || password.length < 6) {
      this.invalidPasswordErrorMessage = 'Password must be 6 characters long';
      return;
    }

    // console.log('password:', password);
    // console.log('oobCode:', this.oobCode);

    this.store.dispatch(
      SettingsActions.confirmResetPassword({ oobCode: this.oobCode, password })
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
