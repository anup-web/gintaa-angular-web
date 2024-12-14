import { Component, OnDestroy, OnInit, Inject,PLATFORM_ID} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { CURRENT_AUTH_MODAL } from '@gintaa/modules/auth/configs/auth.config';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthActions } from '../../store/action-types';
import { currentAuthModal, selectAuthState } from '../../store/auth.selectors';
import { Observable, of, Subscription } from 'rxjs';
import { ApiLoaderService } from '@gintaa/shared/services';
import { AuthService } from '@gintaa/core/services/auth.service';
import { StorageService } from '@gintaa/core/services/storage.service';
import { Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {

  allPossibleAuthModals = CURRENT_AUTH_MODAL;
  currentAuthModal$: Observable<string>;
  currentAuthModal: string = '';
  isLoading: boolean = false;
  authLoader: boolean = false;
  loaderSubscriber: Subscription;
  isLoggedIn: boolean = true;
  errorMessage: any = null;
  // spinnerConfig: any = {loader: false};
  screenNotContainingLoader: string[] = [
    this.allPossibleAuthModals.EMAIL_LOGIN_LINK_VERIFY
  ];

  screenNotContainingPopupCloseButton: string[] = [
    this.allPossibleAuthModals.UPDATE_PROFILE_NAME,
    this.allPossibleAuthModals.EMAIL_LOGIN_LINK_VERIFY,
  ];

  screensNotContainingWithBackButton: string[] = [
    this.allPossibleAuthModals.SIGN_IN_WITH_MOBILE,
    this.allPossibleAuthModals.UPDATE_PROFILE_NAME,
    this.allPossibleAuthModals.VERIFY_OTP_WITH_MOBILE,
    this.allPossibleAuthModals.UPDATE_PROFILE_PASSWORD,
    this.allPossibleAuthModals.EMAIL_LOGIN_LINK_VERIFY,
    this.allPossibleAuthModals.EMAIL_LOGIN_LINK_SEND_SUCCESS,
  ];

  screensNotContainingWithSkipButton: string[] = [
    this.allPossibleAuthModals.SIGN_IN_WITH_MOBILE,
    this.allPossibleAuthModals.UPDATE_PROFILE_PASSWORD,
    this.allPossibleAuthModals.VERIFY_OTP_WITH_MOBILE,
    this.allPossibleAuthModals.UPDATE_PROFILE_NAME,
    this.allPossibleAuthModals.EMAIL_LOGIN_LINK_VERIFY,
    this.allPossibleAuthModals.EMAIL_LOGIN_LINK_SEND_SUCCESS
  ];

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private store: Store<gintaaApp.AppState>,
    private apiLoaderService: ApiLoaderService,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // loader
    this.loaderSubscriber = this.apiLoaderService.isLoading.subscribe((v: boolean) => {
      this.isLoading = v;
    });

    this.currentAuthModal$ = this.store.pipe(
      select(currentAuthModal)
    );

    // TODO - Move to more serialized approach
    // detect & change current auth modal
    this.store.select(selectAuthState).subscribe(authState => {
      this.errorMessage = authState.errorMessage;

      this.authLoader = authState.authLoader;
      // this.spinnerConfig.loader= authState.authLoader;
      this.currentAuthModal = authState.currentAuthModal;
      if (authState.changeCurrentAuthModal) {
        switch (authState.currentAuthModal) {
          case this.allPossibleAuthModals.UPDATE_PROFILE_NAME:
            this.store.dispatch(
              AuthActions.redirectToProfileEmailOrPhone()
            );
            break;
          case this.allPossibleAuthModals.UPDATE_PROFILE_EMAIL_OR_PHONE:
            this.store.dispatch(
              AuthActions.redirectToUpdateProfileDobGender()
            );
            break;
          case this.allPossibleAuthModals.UPDATE_PROFILE_EMAIL_OR_PHONE:
            this.store.dispatch(
              AuthActions.redirectToUpdateProfileImage()
            );
            break;
          default:
            this.onDialogClose();
            break;
        }
      }

      if (authState.closeCurrentAuthModal) {
        this.onDialogClose();
      }
    });

    this.authService.refreshHomePageWatcher$.subscribe(data => {
      if (!data) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  onDialogClose() {
    if (this.currentAuthModal == this.allPossibleAuthModals.UPDATE_PROFILE_NAME || this.currentAuthModal == this.allPossibleAuthModals.UPDATE_PROFILE_EMAIL_OR_PHONE || this.currentAuthModal == this.allPossibleAuthModals.UPDATE_PROFILE_IMAGE || this.currentAuthModal == this.allPossibleAuthModals.UPDATE_PROFILE_DOB_GENDER || this.currentAuthModal == this.allPossibleAuthModals.UPDATE_PROFILE_LOCATION || this.currentAuthModal == this.allPossibleAuthModals.UPDATE_PROFILE_ADDRESS) {
      if (isPlatformBrowser(this.platformId)) {
        let signInEmail = window.localStorage.getItem('fromCreateListingBtn');
        if(signInEmail == "clicked"){
          this.dialogRef.close();
          this.router.navigate(['/listing/item']);
          return
        }else{
            window.location.reload();
        }
      }
    } else {
      this.authService.setModalCloseLogin();
      if (this.storageService.getData('reportOfferButton')) {
        this.storageService.removeData('reportOfferButton');
        const reportbutton = document.getElementById('reportOfferButton');
        if (reportbutton) {
          reportbutton.click();
        }
      }
      this.dialogRef.close();
      if (isPlatformBrowser(this.platformId)) {
        let signInEmail = window.localStorage.getItem('fromCreateListingBtn');
        if(signInEmail == "clicked"){
          this.router.navigate(['/listing/item']);
        }
      }
    }
  }

  showBackButton(currentModal: string): Observable<boolean> {
    return of(!this.screensNotContainingWithBackButton.includes(currentModal));
  }

  showSkipButton(currentModal: string): Observable<boolean> {
    return of(!this.screensNotContainingWithSkipButton.includes(currentModal)); // return true/false
  }

  showPopupCloseButton(currentModal: string): Observable<boolean> {
    if (currentModal === this.allPossibleAuthModals.EMAIL_LOGIN_LINK_VERIFY) {
      return of(this.errorMessage ? true : false);
    } else {
      return of(!this.screenNotContainingPopupCloseButton.includes(currentModal)); // return true/false
    }
  }

  showLoader(currentModal: string): Observable<boolean> {
    return of(!this.screenNotContainingLoader.includes(currentModal)); // return true/false
  }

  backToPreviousScreen(currentModal: string) {
    switch (currentModal) {
      case this.allPossibleAuthModals.UPDATE_PROFILE_EMAIL_OR_PHONE:
        this.store.dispatch(
          AuthActions.redirectToPrifileName()
        );
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_DOB_GENDER:
        this.store.dispatch(
          AuthActions.redirectToUpdateProfileImage()
        );
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_IMAGE:
        this.store.dispatch(
          AuthActions.redirectToProfileEmailOrPhone()
        );
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_LOCATION:
        this.store.dispatch(
          AuthActions.redirectToUpdateProfileDobGender()
        );
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_ADDRESS:
        this.store.dispatch(
          AuthActions.redirectToUpdateProfileLocation()
        );
        break;

      default:
        this.store.dispatch(
          AuthActions.redirectToSignIn()
        );
    }
  }

  skipToNextScreen(currentModal: string) {
    switch (currentModal) {
      case this.allPossibleAuthModals.UPDATE_PROFILE_EMAIL_OR_PHONE:
        this.store.dispatch(
          AuthActions.redirectToUpdateProfileImage()
        );
        break;
      case this.allPossibleAuthModals.UPDATE_PROFILE_DOB_GENDER:
        this.store.dispatch(
          AuthActions.redirectToUpdateProfileLocation()
        );
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_IMAGE:
        this.store.dispatch(
          AuthActions.redirectToUpdateProfileDobGender()
        );
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_LOCATION:
        this.onDialogClose();
        break;

      case this.allPossibleAuthModals.UPDATE_PROFILE_ADDRESS:
        this.onDialogClose();
        break;

      default:
        this.store.dispatch(
          AuthActions.redirectToSignIn()
        );

    }
  }

  ngOnDestroy() {
    this.loaderSubscriber.unsubscribe();
  }

}
