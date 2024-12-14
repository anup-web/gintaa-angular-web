import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { configUrls } from '@gintaa/config/api-urls.config';
import { AuthService } from '@gintaa/core/services/auth.service';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { environment } from '@gintaa/env';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { SettingsActions } from './settings-types';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface SocialLoginResponseData {
  email: string;
  family_name: string;
  given_name: string;
  granted_scopes: string;
  hd: string;
  id: string;
  locale: string;
  name: string;
  picture: any;
  verified_email: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  // const user = new User(email, userId, token, expirationDate);
  // localStorage.setItem('userData', JSON.stringify(user));
  // return SettingsActions.authenticateSuccess({ email, userId, token, expirationDate, redirect: true });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    // return of(SettingsActions.authenticateFail({errorMessage}));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
};


@Injectable()
export class SettingsEffects {

  fetchProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.fetchProfileData),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`).pipe(
          map((response: any) => {
            // console.log('response :: ', response);
            // checking for 403 error
            if (response && response.success === false) {
              return SettingsActions.updateUserProfileFailure({
                error: {
                  message: response.message,
                  status: 403
                }
              })
            }

          }),
          catchError(error => of(
            SettingsActions.updateUserProfileFailure({ error })
          )),
        );
      })
    )
  );
 
  resetPasswordMailSent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.resetPasswordMailSend),
      mergeMap(action => {
        const email = action.email;
        return from(this.firebaseAuthService.passwordResetEmailSend(email)).pipe(
          map((resData) => {
            // console.log(resData)
            return SettingsActions.redirectToResetPasswordMailSend();
          }),
          catchError(error => of(
            SettingsActions.firebaseAuthFailure({ error })
          )),
        );

      })
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.confirmResetPassword),
      mergeMap(action => {
        const oobCode   = action.oobCode;
        const password  = action.password;
        // console.log('effect-oobCode', oobCode);
        // console.log('effect-password', password);
        return from(this.firebaseAuthService.confirmUpdatePassword(password)).pipe(
          map((resData) => {
            // console.log(resData)
            // return SettingsActions.logout();
            return SettingsActions.resetPasswordResponseMessage({
              message: 'Password successfully reset'
            });
          }),
          catchError(error => of(
            SettingsActions.firebaseAuthFailure({ error })
          )),
        );

      })
    )
  );

  updateEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.confirmUpdateEmail),
      mergeMap(action => {
        const newEmail    = action.newEmail;
        const phone       = action.phone;
        const displayName = action.displayName;
        return from(this.firebaseAuthService.confirmUpdateEmail(newEmail)).pipe(
          switchMap(async resData => {
            // console.log('update email resData:', resData)

            // const profileData = await SettingsActions.fetchProfileData();

            // console.log('profileData:', profileData);
            const userData = {
              email:newEmail,
              name: displayName,
              mobile: phone
            }

            // console.log('userData:', userData);

            return SettingsActions.updateUserProfile({user:userData});
            // return SettingsActions.redirectTOChangeEmailVerifySuccess();
            // return SettingsActions.logout();
          }),
          catchError(error => of(

            // console.log(error)
            SettingsActions.firebaseAuthFailure({ error })
          )),
        );

      })
    )
  );



  
  checkEmailPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.checkEmailPassword),
      mergeMap(action => {
        const requestFor = action.requestFor;
        return from(this.firebaseAuthService.reauthenticateWithEmailPassword(action.email, action.password)).pipe(
          map((resData) => {

            // console.log(resData)

            

            // console.log('Effect requestFor:', requestFor);

            switch(requestFor) {
              case 'change_pass':
                // code block
                // return SettingsActions.redirectToResetPassword();
                return SettingsActions.redirectToResetPasswordConfirm();
                break;
              case 'change_email':
                // code block
                return SettingsActions.redirectToEmailChangeEmailNewEmail();
                break;
              default:
                // code block
                // return SettingsActions.redirectToResetPassword();
                return SettingsActions.redirectToResetPasswordConfirm();
            }

            // if(action.requestFor === 'change_pass') {
            //   return SettingsActions.redirectToResetPassword();
            // } else {
            //   return SettingsActions.redirectToEmailChangeEmailNewEmail();
            // }
            
          }),
          catchError(error => of(
            SettingsActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  
  sendVerificationOtpInEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.sendEmailOtpForChangeEmail),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationEmailUrl}/${action.email}`, action.email).pipe(
          map((resData: any) => {
            // console.log('resData:', resData);
            if(resData.success) {                
              return SettingsActions.redirectToChangeEmailOtpVerification({
                newEmail: action.email,
                verificationTransactionId: resData.payload.transactionId
              })
            } else {
              SettingsActions.changeEmailError({errorMessage:resData.message})
            }
            // return ProfileActions.sendVerificationEmailSuccess({
            //   verificationTransactionId: resData.payload.verificationTransactionId,
            //   message: `OTP has been send on ${action.reqBody.identifier}`
            // });

          }),
          catchError(error => {
            return of(
              SettingsActions.firebaseAuthFailure({ error })
            )
          }),
        );
      })
    )
  );


  verifyOtpFromEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.verifyOtpFromEmail),
      switchMap((action) => {
        const reqBody = {
          verificationTransactionId: action.verificationTransactionId, 
          verifyOtp: action.otp
        };
        // console.log('verifyEmail reqBody:', reqBody);

        return this.http.post<Response>(`${environment.serverUrl}${configUrls.verifyEmailUpdate}`, reqBody).pipe(
          map((resData: any) => {
            
            // console.log('resData:', resData);
            // 
            if(resData.success) {                
              return SettingsActions.updateEmailResponseMessage({
                email: action.email,
                message: 'Email successfully changed'
              });
            } else {
              SettingsActions.changeEmailError({errorMessage:resData.message})
            }

            
            // return SettingsActions.redirectTOChangeEmailVerifySuccess();
          }),
          catchError(error => {
            // console.log('error', error);
            return of(
              SettingsActions.firebaseAuthFailure({ error })
            )
          }),
        );
      })
    )
  );


  
  
  sendVerificationOtpMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.sendMobileOtpForChangeMobile),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationMobileUrl}/${action.mobile}`, action.mobile).pipe(
          map((resData: any) => {
            // console.log('Password send to mobile resData:', resData);

            return SettingsActions.redirectToChangeMobileOtpVerificationScreen({
              newMobile: action.mobile,
              verificationTransactionId: resData.payload.transactionId
            });

            // return SettingsActions.resetPasswordResponseMessage({
            //   message: 'Password successfully reset'
            // });

          }),
          catchError(error => {
            // console.log('error', error);
            return of(
              SettingsActions.firebaseAuthFailure({ error })
            )
          }),
        );
      })
    )
  );

  


  verifyOtpFromPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.verifyOtpFromPhone),
      switchMap((action) => {
        const reqBody = {
          verificationTransactionId: action.verificationTransactionId, 
          verifyOtp: action.otp
        };
        // console.log('verifyMobile reqBody:', reqBody);
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.verifyMobileUpdate}`, reqBody).pipe(
          map((resData: any) => {
            
            // console.log('resData:', resData);
            
            // return SettingsActions.resetPasswordResponseMessage({
            //   message: 'Password successfully reset'
            // });
            return SettingsActions.redirectTOChangeMobileVerifySuccess();
          }),
          catchError(error => {
            // console.log('error:', error);
            return of(
              SettingsActions.settingFalior({ error })
            )
          }),
        );
      })
    )
  );



  

  getProfileData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.getProfileData),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`).pipe(
          map((response: any) => {
            // console.log('response profile :: ', response);
            // checking for 403 error
            if (response && response.success !== false) {
              return SettingsActions.getProfileDataSuccess({
                userPhone: response.payload.mobile,
                userEmail: response.payload.email
              })
            }

          }),
          catchError(error => of(
            SettingsActions.getProfileDataSuccess({
              userPhone: '',
              userEmail: ''
            })
          )),
        );
      })
    )
  );



  

  getNotificationSettingsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.geAllNotificationSettings),
      switchMap((action) => {
        //${environment.serverUrl}${configUrls.profileUrl}
        return this.http.get<Response>(`/assets/mock/notifiation/trade-notification.json`).pipe(
          map((response: any) => {
            // console.log('response profile :: ', response);
            // checking for 403 error
            if (response && response.success !== false) {
              return SettingsActions.geAllNotificationSettingsSuccess({
                tradeNotificationTabs: response.payload
              })
            }

          }),
          catchError(error => {
            return of(
              SettingsActions.firebaseAuthFailure({ error })
            )
          }),
        );
      })
    )
  );



  getBlockListCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.fetchBlockUserCount),
      switchMap((action) => {
        //${environment.serverUrl}${configUrls.profileUrl}
        return this.http.get<Response>(`/assets/mock/notifiation/block-list.json`).pipe(
          map((response: any) => {
            // console.log('response profile :: ', response);
            // checking for 403 error
            if (response && response.success !== false) {
              return SettingsActions.fetchBlockUserCountSuccess({
                blockUserCount: response.payload.length
              })
            }

          }),
          catchError(error => {
            return of(
              SettingsActions.firebaseAuthFailure({ error })
            )
          }),
        );
      })
    )
  );



  getBlockList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.fetchBlockUserList),
      switchMap((action) => {
        //${environment.serverUrl}${configUrls.profileUrl}
        return this.http.get<Response>(`/assets/mock/notifiation/block-list.json`).pipe(
          map((response: any) => {
            // console.log('response profile :: ', response);
            // checking for 403 error
            if (response && response.success !== false) {
              return SettingsActions.fetchBlockUserListSuccess({
                blockUserList: response.payload
              })
            }

          }),
          catchError(error => {
            return of(
              SettingsActions.firebaseAuthFailure({ error })
            )
          }),
        );
      })
    )
  );
  
  
    
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    public afAuth: AngularFireAuth,
    public firebaseAuthService: FirebaseAuthService,
    public authService: AuthService,
  ) { }
}