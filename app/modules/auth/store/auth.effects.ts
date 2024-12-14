import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, map, mergeMap, switchMap, tap, finalize } from 'rxjs/operators';

import { configUrls } from '@gintaa/config/api-urls.config';
import { AuthService } from '@gintaa/core/services/auth.service';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { environment } from '@gintaa/env';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, observable, of } from 'rxjs';
import { AuthActions } from './action-types';
import localization from '@gintaa/config/localization';
import { isPlatformBrowser } from '@angular/common';
import { delay } from 'rxjs/internal/operators';

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
  // return AuthActions.authenticateSuccess({ email, userId, token, expirationDate, redirect: true });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    // return of(AuthActions.authenticateFail({errorMessage}));
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
export class AuthEffects {

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.phoneLoginStart),
      mergeMap(action => {
        const phone = `+91 ${action.phone}`;
        return from(this.firebaseAuthService.signInWithPhoneNumber(phone)).pipe(
          map((resData) => {
            return AuthActions.firebaseAuthSuccess({
              response: resData,
              phone: phone,
            });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  // authverifyOtp$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.verifyOtpStart),
  //     mergeMap((action) => {
  //       return from(action.confirmationResult.confirm(action.otp)).pipe(
  //         map((resData: any) => {            
  //           return AuthActions.checkProfileCompleteMobile({userType:action.userType});
  //         }),
  //         catchError(error => of(
  //           AuthActions.firebaseAuthFailure({ error })
  //         )),
  //       );
  //     })
  //   )
  // );

  authverifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOtpStart),
      mergeMap((action) => {
        return from(action.confirmationResult.confirm(action.otp)).pipe(
          delay(1000),
          switchMap((resData) => {
            return from(this.firebaseAuthService.updateToken()).pipe(
              map((result)=>{
                return AuthActions.checkProfileCompleteMobile({userType:action.userType});
              }), catchError(error => of(
                AuthActions.firebaseAuthFailure({ error })
              ))
            )
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );




  authUpdateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUserProfile),
      mergeMap(action => {
        return from(this.http.put<Response>(`${environment.serverUrl}${configUrls.profileUpdateUrl}`, action.user)).pipe(
          map((resData: any) => {

            if (resData && resData.success === false) {
              return AuthActions.updateUserProfileFailure({
                error: {
                  message: resData.message,
                  status: 403
                }
              })
            }

            if (action.from === 'name') {
              // since the name is saved in the gintaa backend successfully
              // here we can also update firebase name
              this.firebaseAuthService.updateDisplayName(action.user.name, null);

              return AuthActions.updateUserProfileNameSuccess({
                message: resData.message,
                user: resData.payload
              })
            } else if (action.from === 'phone-email') {
              return AuthActions.updateUserProfilePhoneEmailSuccess({
                message: resData.message,
                user: resData.payload
              })
            } else if (action.from === 'dob-gender') {
              return AuthActions.updateUserProfileDOBGenderSuccess({
                message: resData.message,
                user: resData.payload
              })
            }

            return AuthActions.updateUserProfileSuccess({
              user: resData.payload,
              message: 'User profile updated successfully'
            });

          }),
          catchError(error => {
            return of(
              AuthActions.updateUserProfileFailure({ error })
            )
          }),
        );
      })
    )
  );

  authLoginEmailPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyEmailPassword),
      mergeMap(action => {
        return from(this.firebaseAuthService.createUserWithEmailAndPassword(action.email, action.password)).pipe(
          map((resData) => {
            return AuthActions.firebaseAuthSuccessEmailPassword({
              message: 'User successfully registered',
              isEmailDisabled: true,
              actionType: 'registration'
            });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  authLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.firebaseAuthService.signOut()
          .subscribe(() => {
            this.authService.clearAuthInfo();            
            AuthActions.logoutSuccess();
            
            
          }, err => console.log('Logout Failed', err));
      })
    ),
    { dispatch: false }
  );

  authResendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resendOtpStart),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationMobileUrl}/${action.mobileNotification.identifier}`, action.mobileNotification).pipe(
          map((resData: any) => {
            return AuthActions.firebaseAuthSuccess({
              response: resData,
              phone: action.mobileNotification.identifier
            });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  authUploadProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.profileImageUploadStart),
      switchMap((action) => {
        return this.http.post<Response>(
          `${environment.serverUrl}${configUrls.uploadProfileImgUrl}`,
          action.formData,
          {
            reportProgress: true,
            observe: 'events'
          }
        ).pipe(
          map((resData: any) => {            
            return AuthActions.profileImgaeUploadComplete({
              responseData: resData['body']
            });
          }),
          catchError(error => of(
            //AuthActions.firebaseAuthFailure({ error: error?.error?.message ? error.error.message : localization.user.USER_IMAGE_UPLOAD_ERROR })
            AuthActions.profileImageError({ error: error?.error?.message ? error.error.message : localization.user.USER_IMAGE_UPLOAD_ERROR })
          )),
        );
      })
    )
  );

  authGmailLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.gmailLoginStart),
      mergeMap(action => {
        return from(this.firebaseAuthService.signInWithGoogle()).pipe(
          delay(7000),
          switchMap((resData) => {
            const profileInfo: SocialLoginResponseData = resData.additionalUserInfo.profile as SocialLoginResponseData;
            return from(this.firebaseAuthService.updateToken()).pipe(
              map((result)=>{
                 return AuthActions.gmailLoginSuccess({
                  name: profileInfo.name,
                  email: profileInfo.email,
                  picture: profileInfo.picture,
                  isNewUser: resData.additionalUserInfo.isNewUser,
                  isEmailDisabled: true
                });
              }), catchError(error => of(
                AuthActions.firebaseAuthFailure({ error })
              ))
            )
          }),
          
        );
      })
    )
  );

  authFacebookLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.facebookLoginStart),
      mergeMap(action => {
        return from(this.firebaseAuthService.signInWithFacebook()).pipe(
          map((resData) => {
            const profileInfo: SocialLoginResponseData = resData.additionalUserInfo.profile as SocialLoginResponseData;
            return AuthActions.facebookLoginSuccess({
              name: profileInfo.name,
              email: profileInfo.email,
              picture: profileInfo.picture.data.url,
              isNewUser: resData.additionalUserInfo.isNewUser
            });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  checkUserStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkUserStart),
      mergeMap(action => {
        return from(this.authService.checkEXistingUser(action.userInfo, action.loginType)).pipe(
          map((resData: any) => {
            if (resData && resData.success === false) {
              return action.loginType == 'email' ?
                AuthActions.emailLoginStart({ email: action.userInfo, userType: 'new_user' })
                : AuthActions.phoneLoginStart({ phone: action.userInfo, userType: 'new_user' });
            } else {
              return action.loginType == 'email' ?
                AuthActions.emailLoginStart({ email: action.userInfo, userType: 'registered_user' })
                : AuthActions.phoneLoginStart({ phone: action.userInfo, userType: 'registered_user' });
            }
          }),
          catchError(error => {
            if (error && error.hasOwnProperty("error")) {
              if (error.error && error.error.success === false) {
                return of(action.loginType == 'email' ?
                  AuthActions.emailLoginStart({ email: action.userInfo, userType: 'new_user' })
                  : AuthActions.phoneLoginStart({ phone: action.userInfo, userType: 'new_user' }));
              } else {
                return of(action.loginType == 'email' ?
                  AuthActions.emailLoginStart({ email: action.userInfo, userType: 'registered_user' })
                  : AuthActions.phoneLoginStart({ phone: action.userInfo, userType: 'registered_user' }));
              }
            } else {
              return of(AuthActions.firebaseAuthFailure({ error }));
            }
          }),
        );
      })
    )
  );

  loginEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginEmail),
      mergeMap(action => {
        return from(this.firebaseAuthService.signInWithEmailAndPassword(action.email, action.password)).pipe(
          map((resData) => {
            return AuthActions.closeCurrentAuthModal();
            // return AuthActions.firebaseAuthSuccessEmailPassword({
            //   message: 'User Logged in successfully',
            //   isEmailDisabled: true,
            //   actionType: 'login'
            // });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  fetchProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchProfileData),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`).pipe(
          map((response: any) => {
            // checking for 403 error
            if (response && response.success === false) {
              return AuthActions.updateUserProfileFailure({
                error: {
                  message: response.message,
                  status: 403
                }
              })
            }

            // here we need to check the reaponse we are getting
            // if we already have all the user related info then we can just close the auth modal as user is already logged-in
            // otherwise go with the registration flow
            if (response && response.payload && response.payload.displayName) {
              return AuthActions.closeCurrentAuthModal();
            } else {
              return AuthActions.profileDataSuccess({ message: '' });
            }

          }),
          catchError(error => of(
            AuthActions.updateUserProfileFailure({ error })
          )),
        );
      })
    )
  );

  sendVerificationMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendVerificationMobile),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationMobileUrl}/${action.reqBody.identifier}`, action.reqBody).pipe(
          map((resData: any) => {
            if (resData && resData.success === false) {
              return AuthActions.verificationDataFailure({
                error: resData.message
              })
            }
            return AuthActions.sendVerificationMobileSuccess({
              verificationTransactionId: resData.payload.transactionId,
              message: `OTP has been send on ${action.reqBody.identifier}`
            });
          }),
          catchError(error => {
            return of(
              AuthActions.verificationDataFailure({ error: error?.error?.message ? error.error.message : (error?.message ? error?.message : 'Failed to send otp') })
            )
          }),
        );
      })
    )
  );

  sendVerificationEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendVerificationEmail),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationEmailUrl}/${action.reqBody.identifier}`, action.reqBody).pipe(
          map((resData: any) => {
            if (resData && resData.success === false) {
              return AuthActions.verificationDataFailure({
                error: resData.message
              })
            }
            return AuthActions.sendVerificationEmailSuccess({
              verificationTransactionId: resData.payload.transactionId,
              message: `OTP has been send on ${action.reqBody.identifier}`
            });
          }),
          catchError(error => {
            return of(
              AuthActions.verificationDataFailure({ error: error?.error?.message ? error.error.message : (error?.message ? error?.message : 'Failed to send otp') })
            )
          }),
        );
      })
    )
  );

  addUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addUserAddress),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}`, action.user.address[0]).pipe(
          map((resData: any) => {
            //return AuthActions.updateUserProfile({ user: action.user, from: 'generic' })
            console.log("resData.payload",resData.payload);
            return AuthActions.addUserAddressSuccess({
              address: resData.payload,
              message: 'User address added successfully'
            });
          }),
          catchError(error => {
            return of(
              AuthActions.addUserAddressFailure({ error: error.error, payload: error.error?.payload ? error.error.payload : [] })
            )
          }),
        );
      })
    )
  );

  verifyOtpFromEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOtpFromEmail),
      switchMap((action) => {
        const reqBody = {
          verificationTransactionId: action.transactionId,
          verifyOtp: action.otp
        };
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.verifyEmailUpdate}`, reqBody).pipe(
          map((resData: any) => {
            return AuthActions.verifyOtpFromEmailSuccess();
          }),
          catchError(error => {
            return of(
              AuthActions.verifyOtpFromEmailFailure({ message: error.error?.message ? error.error.message : 'Verification failed! Invalid OTP' })
            )
          }),
        );
      })
    )
  );


  verifyOtpFromMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.verifyOtpFromMobile),
      switchMap((action) => {
        const reqBody = {
          verificationTransactionId: action.transactionId,
          verifyOtp: action.otp
        };

        return this.http.post<Response>(`${environment.serverUrl}${configUrls.verifyMobileUpdate}`, reqBody).pipe(
          map((resData: any) => {
            return AuthActions.verifyOtpFromMobileSuccess();
          }),
          catchError(error => {
            return of(
              AuthActions.verifyOtpFromMobileFailure({ message: error.error?.message ? error.error.message : 'Verification failed! Invalid OTP' })
            )
          }),
        );
      })
    )
  );


  ///////////// Start Auth sign in with email link ////////////
  signInWithEmailLinkMailSend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInWithEmailLinkMailSend),
      mergeMap(action => {
        return from(this.firebaseAuthService.firebaseSignInEmailSend(action.email)).pipe(
          map((resData: any) => {
            if (resData.success) {
              return AuthActions.signInWithEmailLinkMailSendSuccess({ email: action.email })
            } else {
              let error = resData.payload;
              return AuthActions.firebaseAuthFailure({ error })
            }

          }),
          catchError(error => {
            return of(AuthActions.firebaseAuthFailure({ error }));
            // if (error && error.hasOwnProperty("error")) {
            //   if (error.error && error.error.success === false) {
            //     return of(action.loginType == 'email' ?
            //     AuthActions.emailLoginStart({ email: action.userInfo, userType: 'new_user' })
            //     : AuthActions.phoneLoginStart({ phone: action.userInfo, userType: 'new_user' }));
            //   } else {
            //     return of(action.loginType == 'email' ?
            //     AuthActions.emailLoginStart({ email: action.userInfo, userType:'registered_user'})
            //     : AuthActions.phoneLoginStart({ phone: action.userInfo, userType: 'registered_user' }));
            //   }
            // } else {
            //   return of(AuthActions.firebaseAuthFailure({ error }));
            // }
          }),
        );
      })
    )
  );

  signInWithEmailLinkVerificationStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInWithEmailLinkVerifyStart),
      mergeMap(action => {
        return from(this.firebaseAuthService.firebaseSignInWithEmailLink(action.email, action.link)).pipe(
          map((resData: any) => {
            if (resData.success) {

              const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
              if (redirectTo) {
                if (isPlatformBrowser(this.platformId)) {
                  const relativeUrl = redirectTo.replace(window.location.origin, '');
                  this.router.navigate([relativeUrl]);
                }
              } else {
                this.router.navigate(['/home']);
              }
              let userType = (resData.isNewUser) ? 'new_user' : 'registered_user';
              if(userType === 'new_user'){
                return AuthActions.updateTokenAfterRegistration({
                  message: 'User Logged in successfully',
                  isEmailDisabled: true,
                  userType: userType,
                  email: action.email
                });
              } else {
                return AuthActions.checkProfileComplete({
                  message: 'User Logged in successfully',
                  isEmailDisabled: true,
                  userType: userType,
                  email: action.email
                });
              }
            } else {
              let error = resData.payload;
              return AuthActions.firebaseAuthFailure({ error })
            }

          }),
          catchError(error => {
            return of(AuthActions.firebaseAuthFailure({ error }));
          }),
        );
      })
    )
  );

  updateTokenAfterRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateTokenAfterRegistration),
      delay(5000),
      switchMap((action) => {
        return from(this.firebaseAuthService.updateToken()).pipe(
          map((resData) => {
            return AuthActions.checkProfileComplete({
              message: action.message,
              isEmailDisabled: action.isEmailDisabled,
              userType: action.userType,
              email: action.email
            });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  updateTokenAfterRegistrationMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateTokenAfterRegistrationMobile),
      delay(5000),
      switchMap((action) => {
        return from(this.firebaseAuthService.updateToken()).pipe(
          map((resData) => {
            return AuthActions.checkProfileCompleteMobile({
              userType: action.userType
            });
          }),
          catchError(error => of(
            AuthActions.firebaseAuthFailure({ error })
          )),
        );
      })
    )
  );

  checkProfileComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkProfileComplete),
      delay(3000),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`).pipe(
          map((response: any) => {
            if(action.userType !== 'new_user'){
              // checking for 403 error
              
            // console.log('================ response:', response);
              if (response && response.success === false) {
                return AuthActions.updateUserProfileFailure({
                  error: {
                    message: response.message,
                    status: 403
                  }
                })
              }
              if (response && response.payload && response.payload.displayName) {
                return AuthActions.closeCurrentAuthModal();
              } else {
                return AuthActions.signInWithEmailLinkVerifySuccess({
                  message: action.message,
                  isEmailDisabled: action.isEmailDisabled,
                  userType: action.userType,
                  email: action.email
                });

              }
            } else {
              return AuthActions.signInWithEmailLinkVerifySuccess({
                message: action.message,
                isEmailDisabled: action.isEmailDisabled,
                userType: action.userType,
                email: action.email
              });
            }
          }),
          catchError(error => {
            if(action.userType !== 'new_user'){
              return of(AuthActions.updateUserProfileFailure({
                error: error?.message == 'Access Denied' ? 'Access Denied' : 'Access Denied'
              }));
            } else {
              return of(AuthActions.signInWithEmailLinkVerifySuccess({
                message: action.message,
                isEmailDisabled: action.isEmailDisabled,
                userType: action.userType,
                email: action.email
              }));
            }
          }),
        );
      })
    )
  );

  checkProfileCompleteMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkProfileCompleteMobile),
      delay(1000),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`).pipe(
          map((response: any) => {
            // checking for 403 error
            // console.log('effect=========response:', response);
            if (response && response.success === false) {
              return AuthActions.updateUserProfileFailure({
                error: {
                  message: response.message,
                  status: 403
                }
              })
            }
            if (response && response.payload && response.payload.displayName) {
              return AuthActions.closeCurrentAuthModal();
            } else {
              return AuthActions.saveFirebaseAuthUser({
                message: 'OTP Verified Successfully',
                isPhoneDisabled: true
              })
            }
          }),
          catchError(error => 
            {
              // console.log('effect=========response error:', error)
              if(action.userType !== 'new_user'){
                return of(AuthActions.updateUserProfileFailure({
                  error: error?.message == 'Access Denied' ? 'Access Denied' : 'Access Denied'
                }));
              } else {
                return of(
                  // AuthActions.verifyOtpFromMobileSuccess()
                  AuthActions.updateTokenAfterRegistrationMobile({
                    userType: action.userType
                  })
                );
              }
            }
            // of(
            //   
            //   // AuthActions.updateUserProfileFailure({ error })
            //   AuthActions.updateUserProfileFailure({
            //     error: 'Access Denied'
            //   })
            // )
          ),
        );
      })
    )
  );


  ///////////// end Auth sign in with email link ////////////


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    public firebaseAuthService: FirebaseAuthService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
}
