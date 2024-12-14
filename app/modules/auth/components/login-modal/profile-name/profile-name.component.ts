import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { currentUserDetails } from '@gintaa/modules/auth/store/auth.selectors';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import { btnFadeInOut, fadeIn } from 'projects/gintaa/src/app/animation';
@Component({
  selector: 'app-profile-name',
  templateUrl: './profile-name.component.html',
  styleUrls: ['./profile-name.component.scss'],
  animations: [fadeIn, btnFadeInOut]
})
export class ProfileNameComponent implements OnInit {

  @ViewChild('userName', { static: false }) name: ElementRef;
  fullName: string;
  fullNameInvalid: boolean = true;
  currentUserProfile: any;
  parsedErrorMessage: string = null;
  formSubmitted: boolean = false;
  showErrMsg: boolean = false;
  errorMessage: any;


  constructor(private store: Store<gintaaApp.AppState>,
    public firebaseAuthService: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
    // TODO Check later
    // this.fetchProfile();
    this.fetchNameFromStore();
    this.updateToken();
  }

  fetchNameFromStore() {
    this.store.select(currentUserDetails).subscribe((currentState) => {
      // set current user details
      this.currentUserProfile = currentState || null;
      this.fullNameInvalid = this.currentUserProfile.name ? false : true;

      // show parsed error message
      const errObj = currentState.errorMessage;
      if (errObj && errObj.error && errObj.error.payload && errObj.error.payload.length) {
        this.parsedErrorMessage = errObj.error.payload[errObj.error.payload.length - 1].reason;
      }

    });
  }

  updateToken() {
    setTimeout(() => {
      this.firebaseAuthService.updateToken()
    }, 900);
  }

  fetchProfile() {
    this.store.dispatch(
      AuthActions.fetchProfileData()
    );
  }

  validateFullName(fullName: string) {
    // remove error message
    this.formSubmitted = false;
    // there must be a fullName
    // fullName must be at least 2 chars long
    // fullName cannot be only space

    if (fullName.trim().length == 0) {
      this.fullNameInvalid = true;
      this.showErrMsg = true;
      this.errorMessage = "Name is required"
    } else {
      if (fullName && fullName.trim().length < 2 && fullName.trimEnd().length < 2 && fullName.trim()) {

        this.fullNameInvalid = true;
        this.showErrMsg = true;
        this.errorMessage = "Name must be minimum 2 characters long"
      } else {
        if (fullName && fullName.trim().length > 30 && fullName.trimEnd().length > 30 && fullName.trim()) {
          this.fullNameInvalid = true;
          this.showErrMsg = true;
          this.errorMessage = "Name should not be more than 30 characters long"
        } else {
          this.fullNameInvalid = false;
          this.showErrMsg = false;
        }

      }
    }



  }

  sendUserName() {
    this.fullName = this.name.nativeElement.value;

    if (this.fullName) {
      // clear success message
      this.store.dispatch(
        AuthActions.clearSuccessMessage()
      );
      this.formSubmitted = true;

      // call profile update
      this.currentUserProfile = {
        ...this.currentUserProfile,
        name: this.fullName
      }

      this.store.dispatch(
        AuthActions.saveFullName({ name: this.fullName })
      );

      this.store.dispatch(
        AuthActions.updateUserProfile({ user: this.currentUserProfile, from: 'name' })
      );

    }
  }

}
