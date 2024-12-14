import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { configUrls } from '@gintaa/config/api-urls.config';
import { environment } from '@gintaa/env';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProfileActions } from './action-types';
import { OtherUserProfileResponse, UserProfileResponse } from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { ProfileService } from '../services/profile.service';
import localization from '@gintaa/config/localization';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FeatureListEnum, FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';

@Injectable()
export class ProfileEffects {

  constructor(
    private profileService: ProfileService,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private analyticsService : FirebaseAnalyticsService,
    public firebaseAuthService: FirebaseAuthService
) { }

  fetchProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.fetchProfileData),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.profileUrl}`).pipe(
          map((response: any) => {
            if (response && response.success === false) {
              return ProfileActions.profileDataFailure({
                error: {
                  message: response.message,
                  status: 403
                }
              })
            }
            const userInfo = new UserProfileResponse;
            if (response.payload) {
              userInfo.displayName = response.payload.displayName;
              userInfo.chatUUID = response.payload.chatUUID;
              userInfo.averageRating = response.payload.averageRating;
              userInfo.dob = response.payload.dob;
              userInfo.email = response.payload.email;
              userInfo.gender = response.payload.gender;
              userInfo.mobile = response.payload.mobile;
              userInfo.noOfComments = response.payload.noOfComments;
              userInfo.totalRatings = response.payload.totalRatings;
              userInfo.images = response.payload.images;
              userInfo.userVerified = response.payload.userVerified;
              userInfo.emailVerified = response.payload.emailVerified;
              userInfo.mobileVerified = response.payload.mobileVerified;
              userInfo.profileSince = response.payload.profileSince;
              userInfo.photoUrl = response.payload?.photoUrl ? response.payload?.photoUrl : '';

              
              this.firebaseAuthService.updateDisplayName(userInfo.displayName, null);
            }
            return ProfileActions.profileDataSuccess({ userInfo });
          }),
          catchError(error => of(
            ProfileActions.profileDataFailure({ error })
          )),
        );
      })
    )
  );

  fetchOtherProfile$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProfileActions.fetchOtherProfileData),
    switchMap((action) => {
      return this.http.get<Response>(`${environment.serverUrl}${configUrls.otherProfileUrl}${action.userId}`).pipe(
        map((response: any) => {
          if (response && response.success === false) {
            return ProfileActions.profileDataFailure({
              error: {
                message: response.message,
                status: 403
              }
            })
          }
          const otherUserInfo = new OtherUserProfileResponse;
          if (response.payload) {
            otherUserInfo.userId=action.userId;
            otherUserInfo.displayName = response.payload.displayName;
            otherUserInfo.chatUUID = response.payload.chatUUID;
            otherUserInfo.averageRating = response.payload.averageRating;
            otherUserInfo.dob = response.payload.dob;
            otherUserInfo.email = response.payload.email;
            otherUserInfo.gender = response.payload.gender;
            otherUserInfo.mobile = response.payload.mobile;
            otherUserInfo.closedDealsCount = response.payload.closedDealsCount;
            otherUserInfo.totalRatings = response.payload.totalRatings;
            otherUserInfo.images = response.payload.images;
            // userInfo.userVerified = response.payload.userVerified;
            // userInfo.emailVerified = response.payload.emailVerified;
            // userInfo.mobileVerified = response.payload.mobileVerified;
            otherUserInfo.profileSince = response.payload.profileSince;
            otherUserInfo.photoUrl = response.payload?.photoUrl ? response.payload?.photoUrl : '';
          }
          return ProfileActions.otherProfileDataSuccess({ otherUserInfo });
        }),
        catchError(error => of(
          ProfileActions.profileDataFailure({ error })
        )),
      );
    })
  )
);

fetchOtherProfileAddress$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProfileActions.fetchOtherAddressData),
    switchMap((action) => {
      return this.http.get<Response>(`${environment.serverUrl}${configUrls.allAddressUrl}/${action.userId}`).pipe(
        map((response: any) => {
          if (response && response.success === false) {
            return ProfileActions.addressOtherDataFailure({
              error: {
                message: response.message,
                status: 403
              }
            })
          }
          return ProfileActions.addressOtherDataSuccess({ responseData: response.payload });
        }),
        catchError(error => of(
          ProfileActions.addressOtherDataFailure({ error })
        )),
      );
    })
  )
);

  fetchAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.fetchAddressData),
      switchMap((action) => {
        return this.http.get<Response>(`${environment.serverUrl}${configUrls.allAddressUrl}`).pipe(
          map((response: any) => {
            if (response && response.success === false) {
              return ProfileActions.addressDataFailure({
                error: {
                  message: response.message,
                  status: 403
                }
              })
            }
            return ProfileActions.addressDataSuccess({ responseData: response.payload });
          }),
          catchError(error => of(
            ProfileActions.addressDataFailure({ error })
          )),
        );
      })
    )
  );

  uploadProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.profileImageUploadStart),
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
            return ProfileActions.profileImgaeUploadComplete({
              responseData: resData.body.payload
            });
          }),
          catchError(error => of(
            ProfileActions.profileDataFailure({ error : error?.error?.message ? error.error.message : localization.user.FAILED_TRY_AGAIN })
          )),
        );
      })
    )
  );

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateUserProfile),
      switchMap((action) => {
        return this.http.put<Response>(`${environment.serverUrl}${configUrls.profileUpdateUrl}`, action.user).pipe(
          map((resData: any) => {
            if(resData.success === true){
             this.editProfileCount();
            }

            return ProfileActions.fetchProfileData();
            // return ProfileActions.updateUserProfileSuccess({
            //   user: resData.payload,
            //   message: localization.user.USER_PROFILE_UPDATED
            // });
          }),
          catchError(error => {
            return of(
              ProfileActions.profileDataSaveFailure({ error: error?.error?.message, payload: error?.error?.payload, user: action.user  })
            )
          }),
        );
      })
    )
  );

  addUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.addUserAddress),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}`, action.address).pipe(
          map((resData: any) => {
            return ProfileActions.addUserAddressSuccess({
              address: resData.payload,
              message: localization.user.USER_ADDRESS_ADD_SUCCESS
            });
          }),
          catchError(error => {
            return of(
              ProfileActions.addUserAddressFailure({ error: error.error.message, payload: error.error?.payload ? error.error.payload : [] })
            )
          }),
        );
      })
    )
  );

  editUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.editUserAddress),
      switchMap((action) => {
        return this.http.put<Response>(`${environment.serverUrl}${configUrls.addAddressUrl}/${action.addressId}`, action.address).pipe(
          map((resData: any) => {
            return ProfileActions.editUserAddressSuccess({
              address: resData.payload,
              message: localization.user.USER_ADDRESS_EDIT_SUCCESS
            });
          }),
          catchError(error => {
            return of(
              ProfileActions.editUserAddressFailure({ error: error.error.message, payload: error.error?.payload ? error.error.payload : [] })
            )
          }),
        );
      })
    )
  );

  deleteUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.deleteAddressData),
      switchMap((action) => {
        let url = `${environment.serverUrl}${configUrls.deleteAddressUrl}`;
        url = url.replace('{addressId}', action.addressId);
        return this.http.delete<Response>(`${url}`).pipe(
          map((resData: any) => {
            return ProfileActions.fetchAddressData();
          }),
          catchError(error => {
            return of(
              ProfileActions.deleteUserAddressFailure({ error })
            )
          }),
        );
      })
    )
  );

  setDefaultAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.setDefaultAddress),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.changeDefaultAddress}`, {addressId:action.addressId}).pipe(
          map((resData: any) => {
            return ProfileActions.fetchAddressData();
           
          }),
          catchError(error => {

            // console.log("=============================resData",'error');
            return of(
              ProfileActions.setDefaultAddressFailure({ error })
            )
          }),
        );
      })
    )
  );

  sendVerificationEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.sendVerificationEmail),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationEmailUrl}/${action.reqBody.identifier}`, {}).pipe(
          map((resData: any) => {
            return ProfileActions.sendVerificationEmailSuccess({
              verificationTransactionId: resData.payload.transactionId,
              message: `${localization.user.OTP_SENT_ON} ${action.reqBody.identifier}`
            });
          }),
          catchError(error => {
            return of(
              ProfileActions.profileDataFailure({ error: error.error.message })
            )
          }),
        );
      })
    )
  );

  verifyOtpFromEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.verifyOtpFromEmail),
      switchMap((action) => {
        const reqBody = {
          verificationTransactionId: action.transactionId, 
          verifyOtp: action.otp
        };
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.verifyEmailUpdate}`, reqBody).pipe(
          map((resData: any) => {
            this.firebaseAuthService.updateToken();
            return ProfileActions.verifyOtpFromEmailSuccess();
          }),
          catchError(error => {
            return of(
              ProfileActions.verifyOtpFromEmailFailure({ message: error.error?.message ? error.error.message : localization.user.VERIFICATION_FAILED_INVALID_OTP})
            )
          }),
        );
      })
    )
  );

  sendVerificationMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.sendVerificationMobile),
      switchMap((action) => {
        return this.http.post<Response>(`${environment.serverUrl}${configUrls.sendNotificationMobileUrl}/${action.reqBody.identifier}`, {}).pipe(
          map((resData: any) => {
            return ProfileActions.sendVerificationMobileSuccess({
              verificationTransactionId: resData.payload.transactionId,
              message: `${localization.user.OTP_SENT_ON} ${action.reqBody.identifier}`
            });
          }),
          catchError(error => {
            return of(
              ProfileActions.profileDataFailure({ error: error.error?.message ? error.error?.message : error.message})
            )
          }),
        );
      })
    )
  );

  verifyOtpFromMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.verifyOtpFromMobile),
      switchMap((action) => {
        const reqBody = {
          verificationTransactionId: action.transactionId, 
          verifyOtp: action.otp
        };

        return this.http.post<Response>(`${environment.serverUrl}${configUrls.verifyMobileUpdate}`, reqBody).pipe(
          map((resData: any) => {
            this.firebaseAuthService.updateToken();
            return ProfileActions.verifyOtpFromMobileSuccess();
          }),
          catchError(error => {
            return of(
              ProfileActions.verifyOtpFromMobileFailure({ message: error.error?.message ? error.error.message : localization.user.VERIFICATION_FAILED_INVALID_OTP})
            )
          }),
        );
      })
    )
  );

  fetchUserOffer$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ProfileActions.fetchUserOffer),
        switchMap((action) => {
            return this.profileService.getUserOffer(action.userId).pipe(
                map((response: any) => {
                    return ProfileActions.fetchUserOfferSuccess({ responseData: response });
                }),
                catchError(error => of(
                  ProfileActions.fetchUserOfferFailure({ error })
                )),
            );
        })
    )
  );

  fetchUserFeedBack$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ProfileActions.fetchUserFeedBack),
        switchMap((action) => {
            return this.profileService.getUserFeedback(action.queryString, action.userId).pipe(
                map((response: any) => {
                    return ProfileActions.fetchUserFeedBackSuccess({ responseData: response });
                }),
                catchError(error => of(
                  ProfileActions.fetchUserFeedBackFailure({ error })
                )),
            );
        })
    )
  );

  editProfileCount() {
    let eventName = FirebaseAnalyticsEnum.editProfileCount
    this.analyticsService.logEvents(eventName);
  }
}
