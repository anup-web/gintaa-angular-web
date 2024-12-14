import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { APP_CONFIGS } from '@gintaa/config/enum.config';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { currentUserEmail, currentAuthErrorMessage, currentUserType, currentUserDetails } from '@gintaa/modules/auth/store/auth.selectors';
import { Observable, noop } from 'rxjs';
import { tap } from 'rxjs/operators';


import { NgForm } from '@angular/forms';
import { UserInfo } from '@gintaa/core/models';
import { APP_CONSTANTS } from '@gintaa/config/constant.config';
import { Subscription } from 'rxjs';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';
import { btnFadeInOut } from 'projects/gintaa/src/app/animation';
import { Router } from '@angular/router';
import { CURRENT_AUTH_MODAL } from '@gintaa/modules/auth/configs/auth.config';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-email-login-link-verify',
  templateUrl: './email-login-link-verify.component.html',
  styleUrls: ['./email-login-link-verify.component.scss']
})
export class EmailLoginLinkVerifyComponent implements OnInit {
  
  userEmail: string;
  authErrorMessage: string = null;
  userType: string = null;

  
  allPossibleAuthModals = CURRENT_AUTH_MODAL;
  fullNameInvalid: boolean = true;
  currentUserProfile: any;


  @ViewChild('userForm', {static: false}) public userFrm: NgForm;
  userInfo: UserInfo;
  loggedInErrorMsg: string = null;
  authSubscriber: Subscription;
  disableSubmit: boolean = true;
  isOpen: boolean;


  constructor(
    private store: Store<gintaaApp.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    
    this.store.pipe(
      select(currentUserEmail),
      tap((email)=> {
        this.userEmail = email;
        if(this.userEmail) {              
          setTimeout(()=>{
            if(this.userType === null) {                
              this.startVerifyingSignInLink(this.userEmail);
            }
          }, 200);
        }
      })
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
      tap((userType) => {
        this.userType = userType || null
        if(this.userType === 'registered_user') {
          // this.fetchProfileData();
        }
      })
    ).subscribe(
      noop
    );

    // setTimeout(()=>{
    //   console.log('trigger')      
    //   this.startVerifyingSignInLink(this.userEmail);
    // }, 2000);


    this.store.select(currentUserDetails).subscribe((currentState) => {
      // set current user details
      this.currentUserProfile = currentState || null;
      this.fullNameInvalid = this.currentUserProfile && this.currentUserProfile.name ? false : true;

      // show parsed error message
      const errObj = currentState.errorMessage;
      if (errObj && errObj.error && errObj.error.payload && errObj.error.payload.length) {
        this.loggedInErrorMsg = errObj.error.payload[errObj.error.payload.length - 1].reason;
      }

    });

  }


  ngAfterViewInit(): void {
    this.userInfo = new UserInfo();
    this.authSubscriber = this.store.select(selectAuthState).subscribe(authState => {

      // fetch error message
      this.loggedInErrorMsg = authState.errorMessage ? authState.errorMessage : null;

      
        // setTimeout(() => {
        //   this.userFrm.setValue({
        //     userInfo: authState.email
        //   });
        // }, 100);

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
    const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
    if (regexEmail.test(String(userInfo).toLowerCase())) {
      // this.store.dispatch(
      //   AuthActions.checkUserStart({ userInfo, loginType:'email' })
      // )

      // let currentUrl = this.router.url;
      // console.log('currentUrl:', this.router);

      this.startVerifyingSignInLink(userInfo);

    } else {
      this.disableSubmit = true;
      this.loggedInErrorMsg = 'Invalid Email'; // APP_CONSTANTS.INVAILD_USER_INFO;
      this.store.dispatch(
        AuthActions.updateErrorMessage({ message: this.loggedInErrorMsg })
      );
    }
  }

  validateInput(event: any, isValue: boolean = false) {
    const inputData = isValue ? event : event.target.value;
    if (inputData) {
      const regexEmail: RegExp = new RegExp(APP_CONFIGS.VALID_EMAIL_REGEX);
      const regexPhone: RegExp = new RegExp(APP_CONFIGS.VALID_PHONE_REGEX);
      if (regexEmail.test(inputData) || regexPhone.test(inputData)) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (<any>window).clipboardData;
    let pastedText = clipboardData.getData('text');
    this.validateInput(pastedText, true);
  }


  startVerifyingSignInLink(email: string) {
    if (isPlatformBrowser(this.platformId)) {
      let link = window.location.href;
      this.store.dispatch(
        AuthActions.signInWithEmailLinkVerifyStart({ email: email, link: link })
      );
    }
  }

  redirectToNameScreen() {
    this.store.dispatch(
      AuthActions.changeCurrentAuthModal({ page: this.allPossibleAuthModals.UPDATE_PROFILE_NAME })
    );
  }

  fetchProfileData() {
    this.store.dispatch(
      AuthActions.fetchProfileData()
    );
  }

}
