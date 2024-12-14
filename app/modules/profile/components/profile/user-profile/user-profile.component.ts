import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { AuthService } from '@gintaa/core/services';
import { AddressResponse, UserProfileResponse, UserProfileUpdateRequest } from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { ProfileActions } from '@gintaa/modules/profile/store/action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { addEditAddressModalSelector, loader, selectfprofileUpdated, selectProfileState } from '@gintaa/modules/profile/store/profile.selectors';
import { UserProfileState } from '@gintaa/modules/profile/models/UserProfileState.model';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@gintaa/modules/profile/services/profile.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { noop, Subject, Subscription } from 'rxjs';
import { ConfirmBoxComponent } from '../confirm-box/confirm-box.component';
import { takeUntil, tap } from 'rxjs/operators';
import { VerifyEmailOtpComponent } from '@gintaa/shared/components/verify-email-otp/verify-email-otp.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import localization from '@gintaa/config/localization';
import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { AddNewAddressComponent } from "../add-new-address/add-new-address.component";
import { NotificationVerification } from '@gintaa/shared/models';
import Moment from 'moment';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight } from 'projects/gintaa/src/app/animation';
import { profileError } from '@gintaa/modules/profile/configs/profile.config';

export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  }
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter }
  ]
})
export class UserProfileComponent implements OnInit, OnDestroy {

  @Output("navigateProfileScreen") navigateProfileScreen: EventEmitter<any> = new EventEmitter();

  userInfo: UserProfileResponse;
  profileImageUrl: string;
  profileName: string;
  stars = [1, 2, 3, 4, 5];
  firstLoad: boolean = true;
  mobilefirstLoad: boolean = true;
  isPageLoading: boolean = true;
  breadcrumb: any = [{
    name: 'My profile',
    show: true,
    click: false,
    // name: 'My profile',
    // link: '/profile',
  }];
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  profileSubscription: any;
  lastActive = 0;
  activeInterval: any;
  userStatus = {
    last_changed: {
      nanoseconds: 1,
      seconds: 0
    },
    state: "offline"
  }
  profileLoader: boolean = false;


  ////////////////////// Start edit profile /////////////////////////////////
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  // @Output("navigateProfileScreen") navigateProfileScreen: EventEmitter<any> = new EventEmitter();

  private componentDestroyed$: Subject<void> = new Subject<void>();
  profileStateSubscriber: Subscription;
  profileUpdatedSubscriber: Subscription;
  loaderSubscriber: Subscription;
  // userInfo: UserProfileResponse;
  // firstLoad: boolean = true;
  // profileImageUrl: string;
  // profileName: string;
  profileForm: any;
  newMobileNo: string = null;
  displayName: string;
  maxMatDate = new FormControl(new Date());
  userDob: string;
  userGender: string;
  invalidDob = false;
  defaultRestrictedAge: number = 18;
  invalidGender = false;
  today = new Date();
  maxDatePicker: any;
  minDatePicker: any;
  active = false;
  requestBody: UserProfileUpdateRequest;
  // isPageLoading: boolean = true;
  addressList: any = [];
  profileUpdated: boolean = false;
  // image upload
  previewUrl: any = null;
  imageError: string = '';
  actionMode: string;
  address: any;
  loader: boolean;
  // profileLoader: boolean = false;
  isProfileFormValid = true;
  isProfileUpdated = false;

  // email & phone verification properties
  showVerifyEmailSection = false;
  showVerifyMobileSection = false;
  isUserEmailDisabled = false;
  isUserMobileDisabled = false;
  isEmailVerifyButtonDisabled = true;
  isMobileVerifyButtonDisabled = true;
  verificationTransactionId: string;
  isImgLoading: boolean = true;
  addresscount: number = 0;
  updateType: string = '';
  // userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  profileFormSubscription: any;
  // breadcrumb: any = [{
  //   name: 'My Profile',
  //   link: '/profile',
  // }, {
  //   name: 'Edit Profile',
  //   link: '/profile/edit',
  // }];

  userProfileValidator = {
    displayName: {
      required: true,
      invalid: false,
      error: 'You must provide Name',
    },
    dob: {
      required: false,
      invalid: false,
      error: 'You must provide Date of birth',
    },
    gender: {
      required: false,
      invalid: false,
      error: 'Gender is required',
    }
  };
  message: string = '';
  mobileErrorMsg: string = '';
  errorMessage: string = '';
  profilePicUpdated: boolean = false;
  modalDialogContact: any = '';
  changeMobilePopupOpened: boolean = false;
  changeEmailPopupOpened: boolean = false;

  personalInfoEditMode: boolean = false;
  // contactInfoEditMode: boolean  = false;
  contactInfoEditMode: any  = {
    mobile: false,
    email: false
  };
  ////////////////////// End edit profile /////////////////////////////////

  profileError = profileError;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private chatService: ChatService,
    private authService: AuthService,
    public firebaseAuthService: FirebaseAuthService,


    ////////// Start edit profile///////////////
    public matDialog: MatDialog,
    // private store: Store<gintaaApp.AppState>,
    // private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private sharedService: SharedService,
    // public firebaseAuthService: FirebaseAuthService,
  ) {
    this.userInfo = new UserProfileResponse;
    this.clearData();
    this.getProfileData();
    this.getAllUserAddress();
    setTimeout(() => {
      //this.firebaseAuthService.updateToken()
    }, 900);


    ///////////////// Start Edit Profile ///////////////////////////
    // this.userInfo = new UserProfileResponse;
    // this.clearData();
    // this.getProfileData();
    // this.getAllUserAddress();

    this.profileForm = this.fb.group({
      displayName: new FormControl(
        {
          value: this.userInfo.displayName,
          disabled: false
        },
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]
      ),
      gender: new FormControl({ value: this.userInfo.gender, disabled: false }, []),
      dob: new FormControl(),
      mobile: new FormControl({
        value: this.userInfo.mobile,
        disabled: this.isUserMobileDisabled
      }, []),
      email: new FormControl({
        value: this.userInfo.email,
        disabled: this.isUserEmailDisabled
      }, [])
    });
    ///////////////// End Edit Profile ///////////////////////////

  }

  getOnlineStatus() {
    const userId = this.authService.currentUserId;
    if (userId) {
      this.chatService.getOfflineOnlineStatus(userId).subscribe((res) => {
        if (res?.last_changed) {
          this.userStatus = res;
        }
      }, (err) => {
      });
    }

  }

  clearData() {
    this.store.dispatch(
      ProfileActions.clearData()
    );
  }

  updateDisplayName(userName: string, photoUrl: string) {
    if (userName || photoUrl) {
      this.firebaseAuthService.updateDisplayName(userName, photoUrl);
    }
  }

  getProfileData() {
    this.store.dispatch(ProfileActions.showProfileLoader());

    this.store.dispatch(
      ProfileActions.fetchProfileData()
    );
  }

  getAllUserAddress() {
    this.store.dispatch(
      ProfileActions.fetchAddressData()
    );
  }

  getColor(rating) {
   // console.log("=======Rating",rating);
    return (rating === 0) ? '#4B6E82' : (rating < 3.5 ? '#FF9500' : '#FF9500');
  }

  ngOnInit(): void {
    this.getOnlineStatus();
    // this.profileSubscription = this.store.select(selectProfileState).subscribe((profileState: UserProfileState) => {
    //   this.isPageLoading = profileState.loading;
    //   this.profileLoader = profileState.profileLoader;
    //   this.profileName = this.getDisplayName();
    //   this.userInfo = profileState.userInfo;
    //   if (this.userInfo && this.userInfo.photoUrl) {
    //     this.profileImageUrl = this.userInfo.photoUrl;
    //   }
    //   if (this.userInfo && this.userInfo.address && Array.isArray(this.userInfo.address)) {
    //     this.authService.storeUserAddress(this.userInfo.address, true);
    //   }
    //   if (this.userInfo?.displayName && this.firstLoad) {
    //     this.firstLoad = false;
    //     this.updateDisplayName(this.userInfo.displayName, this.profileImageUrl);
    //   }
    // });
    this.activeInterval = setInterval(() => {
      this.lastActive = this.lastActive + 30;
    }, 30000)


    ///////////////////////// Start edit profile ////////////////////////////////
    this.profileStateSubscriber = this.store.select(selectProfileState).subscribe((profileState: any) => {

      /////////////////////////////////////////////////////////
      this.isPageLoading = profileState.loading;
      this.profileLoader = profileState.profileLoader;
      this.profileName = this.getDisplayName();
      this.userInfo = profileState.userInfo;
      if (this.userInfo && this.userInfo.photoUrl) {
        this.profileImageUrl = this.userInfo.photoUrl;
      }
      if (this.userInfo && this.userInfo.address && Array.isArray(this.userInfo.address)) {
        this.authService.storeUserAddress(this.userInfo.address, true);
      }
      if (this.userInfo?.displayName && this.firstLoad) {
        this.firstLoad = false;
        this.updateDisplayName(this.userInfo.displayName, this.profileImageUrl);
      }
      /////////////////////////////////////////////////////////



      // this.isPageLoading = profileState.loading;
      // this.profileLoader = profileState.profileLoader;
      this.verificationTransactionId = profileState.verificationTransactionId;
      this.isImgLoading   = false;
      this.profileUpdated = false;
      if (profileState.profileUpdated !== 'failed' && !this.isPageLoading) {
        // this.userInfo = profileState.userInfo;
        if (this.userInfo) {
          this.profileName = this.userInfo?.displayName;
          if (this.userInfo.displayName && this.userInfo.displayName !== this.profileForm.get("displayName").value) {
            this.profileForm.get("displayName").setValue(this.userInfo.displayName);
            this.profileForm.get("displayName").updateValueAndValidity();
          }
          
          if (this.userInfo.dob && this.userInfo.dob !== this.profileForm.get("dob").value) {
            // this.profileForm.get("dob").setValue(Moment(this.userInfo.dob, 'YYYY-MM-DD'));
            this.profileForm.get("dob").setValue(Moment(this.userInfo.dob).format('YYYY-MM-DD'));
            this.profileForm.get("dob").updateValueAndValidity();
          }

          // if (this.userInfo.email && this.userInfo.email !== this.profileForm.get("email").value) {
          //   this.profileForm.get("email").setValue(this.userInfo.email);
          //   this.profileForm.get("email").updateValueAndValidity();
          // }
          // if (this.userInfo.mobile && this.userInfo.mobile !== this.profileForm.get("mobile").value) {
          //   this.profileForm.get("mobile").setValue(this.userInfo.mobile);
          //   this.profileForm.get("mobile").updateValueAndValidity();
          // }

          if (this.userInfo.gender && this.userInfo.gender !== this.profileForm.get("gender").value) {
            this.profileForm.get("gender").setValue(this.userInfo.gender);
            this.profileForm.get("gender").updateValueAndValidity();
          }

          if (this.userInfo.emailVerified && this.userInfo.email) {
            // this.isUserEmailDisabled = true;
            // this.isEmailVerifyButtonDisabled = true;
          }
          if (this.userInfo && this.userInfo.photoUrl) {
            this.profileImageUrl = this.userInfo.photoUrl;
            const re = new RegExp('deleted.jpeg');
            if (re.test(this.profileImageUrl)) {
              this.profileImageUrl = null;
            }
          } else {
            this.profileImageUrl = null;
          }
          if (profileState?.isImgLoading) {
            this.isImgLoading = profileState?.isImgLoading;
          }

          if (!this.profilePicUpdated && this.userInfo.imageUpload) {
            this.profilePicUpdated = true;
            this.updateDisplayName(this.profileName, this.profileImageUrl);
          }
          if (this.userInfo.mobile && this.mobilefirstLoad) {
            this.mobilefirstLoad = false;
            // this.isUserMobileDisabled = true;
            this.isMobileVerifyButtonDisabled = true;
          }
        }

        this.cancleEditPersonalInfo();

      } else if (profileState.profileUpdated === 'failed') {
        const validation = profileState.payloadValidation;
        if (Array.isArray(validation)) {
          validation.map((x: any) => {
            if (x.param === 'dob') {
              this.userProfileValidator.dob.invalid = true;
              this.userProfileValidator.dob.error = x.reason;
            }
            if (x.param === 'name') {
              this.userProfileValidator.displayName.invalid = true;
              this.userProfileValidator.displayName.error = x.reason;
            }
          });

        }
        this.userProfileValidator;
        this.profileUpdated = true;
      }
      if (this.userInfo && this.userInfo.address && Array.isArray(this.userInfo.address)) {
        this.authService.storeUserAddress(this.userInfo.address, true);
      }
      if (profileState && profileState.userInfo && profileState.userInfo.address && profileState.userInfo.address.length > 0) {
        this.addressList = profileState.userInfo.address.map((data: any) => {
          let fullAddress = `${data.area}, ${data.city},${data.state}, ${data.country}, ${data.zip}`;
          return { ...data, isEditMode: false, fullAddress };
        });
      }
      // open email verify modal if OTP sent successfully
      if (profileState.verificationEmailSent && profileState.verificationTransactionId) {
        this.showVerifyEmailSection = true;
      } else if (profileState.emailVerificationFailed) {
        this.showVerifyEmailSection = true;
      } else {
        this.showVerifyEmailSection = false;
      }
      if (this.showVerifyEmailSection) {
        if (this.modalDialogContact == '') {
          this.changeContactModal('email');
        }
      } else if (this.modalDialogContact) {
        if (!this.verificationTransactionId) {
          this.modalDialogContact.close();
          this.modalDialogContact = '';
        }
      }

      // open mobile verify modal if OTP sent successfully
      if (profileState.verificationMobileSent && profileState.verificationTransactionId) {
        this.showVerifyMobileSection = true;
      } else if (profileState.mobileVerificationFailed) {
        this.showVerifyMobileSection = true;
      } else {
        this.showVerifyMobileSection = false;
      }
      if (this.showVerifyMobileSection) {
        if (this.modalDialogContact == '') {
          this.changeContactModal('phone');
        }
      } else if (this.modalDialogContact) {
        if (!this.verificationTransactionId) {
          this.modalDialogContact.close();
          this.modalDialogContact = '';
        }
      }

      this.message = profileState.message
      // this.errorMessage = profileState.errorMessage
    });
    const newDate = this.today.setFullYear(this.today.getFullYear() - 19);
    const newDate2 = this.today.setFullYear(this.today.getFullYear() - 80);
    this.maxDatePicker = new Date(newDate);
    this.minDatePicker = new Date(newDate2);
    this.profileFormSubscription = this.profileForm.valueChanges.subscribe((value: any) => {
      if (this.profileForm.dirty && this.profileForm.status === 'VALID') {
        this.active = true;
      } else {
        this.active = false;
      }
    });

    this.store.pipe(
      select(addEditAddressModalSelector),
      tap(closeOpenedModel => {
        if (closeOpenedModel) {
          this.matDialog.closeAll();
        }
      })
    ).subscribe(
      noop
    );

    this.loaderSubscriber = this.store.select(loader).subscribe(loaderState => {
      this.loader = loaderState;
    });

    this.profileUpdatedSubscriber = this.store.select(selectfprofileUpdated).subscribe(isprofileUpdated => {
      if (isprofileUpdated === 'success') {
        this.router.navigate(['/profile']);
      }
    })
    ///////////////////////// End edit profile /////////////////////////////////
    
    
  }


  
  // ngOnDestroy() {
  //   this.profileSubscription.unsubscribe();
  //   try {
  //     clearInterval(this.activeInterval);
  //   } catch (e) {

  //   }
  // }

  clickEdit(currentScreen: string) {
    this.navigateProfileScreen.emit(currentScreen);
  }

  getDisplayName() {
    if (this.userInfo) {
      return this.userInfo.displayName ? this.userInfo.displayName : '';
    }
  }

  getLastActiveTime() {
    try {
      let result = this.lastActive;
      if (this.userStatus?.last_changed && this.userStatus.last_changed?.nanoseconds) {
        let sec = this.userStatus.last_changed.nanoseconds / 1000000000;
        result = result + sec;
      }
      let time = 'sec';
      if (result > 60 && result < 3600) {
        time = 'min';
        result = result / 60;
      } else if (result > 3600) {
        time = 'hour';
        result = result / 3600;
      }
      result = parseInt(`${result}`)
      if (result > 1) {
        return `${result} ${time}s`;
      } else {
        return `${result} ${time}`;
      }
    } catch (e) {
      this.lastActive = 0;
      return '';
    }
  }

  //////////////////////////////// Start Edit profile ////////////////////////////////////////////////
  

  // clearData() {
  //   this.store.dispatch(
  //     ProfileActions.clearData()
  //   );
  // }

  // getProfileData() {
  //   this.store.dispatch(ProfileActions.showProfileLoader());
  //   this.store.dispatch(
  //     ProfileActions.fetchProfileData()
  //   );
  // }

  // getAllUserAddress() {
  //   this.store.dispatch(
  //     ProfileActions.fetchAddressData()
  //   );
  // }

  deleteAddress(addressId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'user-address-delete-component';
    dialogConfig.height = 'auto';
    dialogConfig.data = {};
    const modalDialog = this.matDialog.open(ConfirmBoxComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      
      if (results) {
        this.store.dispatch(ProfileActions.showProfileLoader());
        this.store.dispatch(
          ProfileActions.deleteAddressData({ addressId })
        );
      }
    });
  }

  setDefaultAddress(addressId: string, address: AddressResponse) {

    this.store.dispatch(ProfileActions.showProfileLoader());
    this.store.dispatch(
      ProfileActions.setDefaultAddress({ addressId, address })
    );
  }

  // ngOnInit(): void {
  //   this.profileStateSubscriber = this.store.select(selectProfileState).subscribe((profileState: any) => {
  //     this.isPageLoading = profileState.loading;
  //     this.profileLoader = profileState.profileLoader;
  //     this.verificationTransactionId = profileState.verificationTransactionId;
  //     this.isImgLoading = false;
  //     this.profileUpdated = false;
  //     if (profileState.profileUpdated !== 'failed' && !this.isPageLoading) {
  //       this.userInfo = profileState.userInfo;
  //       if (this.userInfo) {
  //         this.profileName = this.userInfo?.displayName;
  //         if (this.userInfo.displayName && this.userInfo.displayName !== this.profileForm.get("displayName").value) {
  //           this.profileForm.get("displayName").setValue(this.userInfo.displayName);
  //           this.profileForm.get("displayName").updateValueAndValidity();
  //         }
  //         if (this.userInfo.dob && this.userInfo.dob !== this.profileForm.get("dob").value) {
  //           this.profileForm.get("dob").setValue(Moment(this.userInfo.dob, 'YYYY-MM-DD'));
  //           this.profileForm.get("dob").updateValueAndValidity();
  //         }

  //         if (this.userInfo.email && this.userInfo.email !== this.profileForm.get("email").value) {
  //           this.profileForm.get("email").setValue(this.userInfo.email);
  //           this.profileForm.get("email").updateValueAndValidity();
  //         }
  //         if (this.userInfo.mobile && this.userInfo.mobile !== this.profileForm.get("mobile").value) {
  //           this.profileForm.get("mobile").setValue(this.userInfo.mobile);
  //           this.profileForm.get("mobile").updateValueAndValidity();
  //         }

  //         if (this.userInfo.gender && this.userInfo.gender !== this.profileForm.get("gender").value) {
  //           this.profileForm.get("gender").setValue(this.userInfo.gender);
  //           this.profileForm.get("gender").updateValueAndValidity();
  //         }

  //         if (this.userInfo.emailVerified && this.userInfo.email) {
  //           this.isUserEmailDisabled = true;
  //           this.isEmailVerifyButtonDisabled = true;
  //         }
  //         if (this.userInfo && this.userInfo.photoUrl) {
  //           this.profileImageUrl = this.userInfo.photoUrl;
  //           const re = new RegExp('deleted.jpeg');
  //           if (re.test(this.profileImageUrl)) {
  //             this.profileImageUrl = null;
  //           }
  //         } else {
  //           this.profileImageUrl = null;
  //         }
  //         if (profileState?.isImgLoading) {
  //           this.isImgLoading = profileState?.isImgLoading;
  //         }

  //         if (!this.profilePicUpdated && this.userInfo.imageUpload) {
  //           this.profilePicUpdated = true;
  //           this.updateDisplayName(this.profileName, this.profileImageUrl);
  //         }
  //         if (this.userInfo.mobile && this.firstLoad) {
  //           this.firstLoad = false;
  //           this.isUserMobileDisabled = true;
  //           this.isMobileVerifyButtonDisabled = true;
  //         }
  //       }


  //     } else if (profileState.profileUpdated === 'failed') {
  //       const validation = profileState.payloadValidation;
  //       if (Array.isArray(validation)) {
  //         validation.map((x: any) => {
  //           if (x.param === 'dob') {
  //             this.userProfileValidator.dob.invalid = true;
  //             this.userProfileValidator.dob.error = x.reason;
  //           }
  //           if (x.param === 'name') {
  //             this.userProfileValidator.displayName.invalid = true;
  //             this.userProfileValidator.displayName.error = x.reason;
  //           }
  //         });

  //       }
  //       this.userProfileValidator;
  //       this.profileUpdated = true;
  //     }
  //     if (this.userInfo && this.userInfo.address && Array.isArray(this.userInfo.address)) {
  //       this.authService.storeUserAddress(this.userInfo.address, true);
  //     }
  //     if (profileState && profileState.userInfo && profileState.userInfo.address && profileState.userInfo.address.length > 0) {
  //       this.addressList = profileState.userInfo.address.map((data: any) => {
  //         let fullAddress = `${data.area}, ${data.city},${data.state}, ${data.country}, ${data.zip}`;
  //         return { ...data, isEditMode: false, fullAddress };
  //       });
  //     }
  //     // open email verify modal if OTP sent successfully
  //     if (profileState.verificationEmailSent && profileState.verificationTransactionId) {
  //       this.showVerifyEmailSection = true;
  //     } else if (profileState.emailVerificationFailed) {
  //       this.showVerifyEmailSection = true;
  //     } else {
  //       this.showVerifyEmailSection = false;
  //     }
  //     if (this.showVerifyEmailSection) {
  //       if (this.modalDialogContact == '') {
  //         this.changeContactModal('email');
  //       }
  //     } else if (this.modalDialogContact) {
  //       if (!this.verificationTransactionId) {
  //         this.modalDialogContact.close();
  //         this.modalDialogContact = '';
  //       }
  //     }

  //     // open mobile verify modal if OTP sent successfully
  //     if (profileState.verificationMobileSent && profileState.verificationTransactionId) {
  //       this.showVerifyMobileSection = true;
  //     } else if (profileState.mobileVerificationFailed) {
  //       this.showVerifyMobileSection = true;
  //     } else {
  //       this.showVerifyMobileSection = false;
  //     }
  //     if (this.showVerifyMobileSection) {
  //       if (this.modalDialogContact == '') {
  //         this.changeContactModal('phone');
  //       }
  //     } else if (this.modalDialogContact) {
  //       if (!this.verificationTransactionId) {
  //         this.modalDialogContact.close();
  //         this.modalDialogContact = '';
  //       }
  //     }

  //     this.message = profileState.message
  //     this.errorMessage = profileState.errorMessage
  //   });
  //   const newDate = this.today.setFullYear(this.today.getFullYear() - 19);
  //   const newDate2 = this.today.setFullYear(this.today.getFullYear() - 80);
  //   this.maxDatePicker = new Date(newDate);
  //   this.minDatePicker = new Date(newDate2);
  //   this.profileFormSubscription = this.profileForm.valueChanges.subscribe((value: any) => {
  //     if (this.profileForm.dirty && this.profileForm.status === 'VALID') {
  //       this.active = true;
  //     } else {
  //       this.active = false;
  //     }
  //   });

  //   this.store.pipe(
  //     select(addEditAddressModalSelector),
  //     tap(closeOpenedModel => {
  //       if (closeOpenedModel) {
  //         this.matDialog.closeAll();
  //       }
  //     })
  //   ).subscribe(
  //     noop
  //   );

  //   this.loaderSubscriber = this.store.select(loader).subscribe(loaderState => {
  //     this.loader = loaderState;
  //   });

  //   this.profileUpdatedSubscriber = this.store.select(selectfprofileUpdated).subscribe(isprofileUpdated => {
  //     if (isprofileUpdated === 'success') {
  //       this.router.navigate(['/profile']);
  //     }
  //   })
  // }

  changeContactModal(changeType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'user-profile-update-contact-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      module: 'profile',
      transactionId: this.verificationTransactionId,
    }
    dialogConfig.position = {
      top: '150px',
    };
    if (changeType == 'email') {
      // console.log('change Email:', this.profileForm.value.email)
      dialogConfig.data.email = this.profileForm.value.email      
      this.changeEmailPopupOpened = true;
    } else {
      dialogConfig.data.phone = this.profileForm.value.mobile
      this.changeMobilePopupOpened = true;
    }

    this.modalDialogContact = this.matDialog.open(VerifyEmailOtpComponent, dialogConfig);
    //this.modalDialogContact.close()
    this.modalDialogContact.afterClosed().subscribe((results) => {

      // console.log("results:", results);

      this.changeMobilePopupOpened      = false;
      this.changeEmailPopupOpened = false;

      this.store.dispatch(
        ProfileActions.fetchProfileData()
      );
      // do something with results
      this.cancleeditContactInfo('email');
      this.cancleeditContactInfo('mobile');
      
    });

  }

  // updateDisplayName(userName: string, photoUrl: string) {
  //   if (userName || photoUrl) {
  //     this.firebaseAuthService.updateDisplayName(userName, photoUrl);
  //   }
  // }

  setUserDOB(event: MatDatepickerInputEvent<Date>) {
    if (!event.value) {
      this.userDob = '';
      this.userProfileValidator['dob'].invalid = false;
      this.invalidDob = false;
      this.userProfileValidator['dob'].error = 'Please enter a valid date of birth';
    } else {
      this.userDob = Moment(event.value).format('YYYY-MM-DD');
      if (this.calculateAge(event.value) > this.defaultRestrictedAge) {
        this.userDob = Moment(event.value).format('YYYY-MM-DD');
        this.invalidDob = false;
        this.userProfileValidator['dob'].invalid = false;
      } else {
        this.userProfileValidator['dob'].invalid = true;
        this.invalidDob = true;
        this.userProfileValidator['dob'].error = 'Sorry! You must be above 18 years to continue'
      }
    }
    this.profileUpdated = true;
  }

  calculateAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  setUserGender(gender: string) {
    this.userGender = gender;
    this.invalidGender = false;
    this.profileUpdated = true;
  }

  removeProfileImage() {
    console.log("Removed Profile pic")
    this.store.dispatch(ProfileActions.showProfileLoader());
    this.profileService.removeProfileImage()
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(result => {
        this.store.dispatch(ProfileActions.hideProfileLoader());
        if (result['code'] == 200) {
          this.profileImageUrl = null;
          this.store.dispatch(ProfileActions.removePhotoUrl());
          this.updateDisplayName(this.profileName, 'remove');
          this.sharedService.showToaster(localization.user.REMOVE_PROFILE_IMAGE_SUCCESS, 'success')
        } else {
          this.sharedService.showToaster(localization.user.REMOVE_PROFILE_IMAGE_FAILED, 'warning')
        }
      }, err => {
        this.store.dispatch(ProfileActions.hideProfileLoader());
        const message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.user.REMOVE_PROFILE_IMAGE_FAILED) : localization.user.REMOVE_PROFILE_IMAGE_FAILED)) : localization.user.REMOVE_PROFILE_IMAGE_FAILED;
        this.sharedService.showToaster(message, 'warning')
      });
  }

  avatarImageInitials() {
    const isAuth = this.authService.isAuthenticated();
    if (this.userInfo?.displayName) {
      return this.userInfo.displayName.split('')[0];
    } else if (isAuth) {
      return this.authService.getAuthInfo().username;
    } else {
      return '';
    }
  }

  openUploadImageDialog() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = ($event: any) => {
      var mimeType = fileUpload.files[0]?.type;
      if (mimeType.match(/image\/*/) == null) {
        this.imageError = "Invalid image!";
        return;
      }
      this.imageError = '';
      this.openImageCropModal(fileUpload.files, $event);
    };
    fileUpload.click();
  }

  openImageCropModal(files: any, $event: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'user-profile-image-component';
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    dialogConfig.data = { files, event: $event, loadFrom: 'profile', imageAspectRatioY: 1, imageAspectRatioX: 1 };

    const modalDialog = this.matDialog.open(ImageComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      this.fileUpload.nativeElement.value = '';
      if (results.files) {
        results.files.forEach((file: any) => {
          this.isImgLoading = true;
          this.uploadProfilePic(file);
        });
      }
    });
  }

  private uploadProfilePic(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.isProfileUpdated = true;
    this.store.dispatch(
      ProfileActions.profileImageUploadStart({ formData })
    );
  }

  onSubmitProfileForm() {
    this.isProfileFormValid = true;
    for (const [key, value] of Object.entries(this.userProfileValidator)) {
      if (value.required) {
        if (!this.profileForm.value[key]) {
          this.userProfileValidator[key].invalid = true;
          this.isProfileFormValid = false;
        } else {
          if (key === 'displayName') {
            const name = this.profileForm.value[key].trim();
            if (/^[a-zA-Z\s]+$/.test(name) && this.profileForm.value[key].length < 31) {
              this.userProfileValidator[key].invalid = false;
            } else {
              this.userProfileValidator[key].invalid = true;
              this.userProfileValidator[key].error = this.profileForm.value[key].length > 30 ? 'User name must be less than 30 characters' : 'User name contains invalid characters';
              this.isProfileFormValid = false;
            }
          } else {
            this.userProfileValidator[key].invalid = false;
          }
        }
      }
    }
    if (this.isProfileFormValid) {
      if (this.profileForm) {
        this.requestBody = {
          name: this.profileForm.value.displayName
        }
        if (this.userInfo.gender !== this.profileForm.value.gender) {
          this.requestBody.gender = this.profileForm.value.gender;
        }
        if (this.userDob) {
          this.requestBody.dob = Moment(this.userDob).format('YYYY-MM-DD');
        }
        // else {
        //   this.requestBody.dob = Moment(this.userInfo.dob).format('YYYY-MM-DD');
        // }
        this.isProfileUpdated = true;
        this.store.dispatch(
          ProfileActions.updateUserProfile({ user: this.requestBody })
        );
      }
    }
  }

  // editAddress(id: string, i: number, type: string = 'edit') {
  //   this.addressList[i]['isEditMode'] = type === 'edit' ? true : false;
  // }

  editAddress(address: any, i: number, type: string = 'edit') {
    // this.addressList[i]['isEditMode'] = type === 'edit' ? true : false;
    this.openAddressModal(address, 'edit');
    // console.log()
  }

  openAddressModal(address: any = '', mode: string = 'add') {

    this.store.dispatch(ProfileActions.showProfileLoader());
    if (mode === 'edit') {
      this.actionMode = 'edit';
      this.address = address;
    } else {
      this.actionMode = 'add';
      this.address = '';
      this.addresscount = this.addressList ? this.addressList.length : 0;
    }
    this.store.dispatch(
      ProfileActions.opendAddressModal()
    );
    //this.store.dispatch(ProfileActions.hideProfileLoader());
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'user-profile-map-component';
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    panelClass: 'my-dialog';
    dialogConfig.data = {
      actionMode: this.actionMode,
      address: this.address,
      addresscount: this.addresscount
    };
    const modalDialog = this.matDialog.open(AddNewAddressComponent, dialogConfig);

    
    setTimeout(() => {  
      this.store.dispatch(ProfileActions.hideProfileLoader());
    }, 2000);
    modalDialog.afterClosed().subscribe(results => {
      // save the address
    });
  }

  sendVerificationEmail() {
    const email = this.profileForm.value.email;
    // console.log('change Email:', email);
    this.isEmailVerifyButtonDisabled = false;
    this.isProfileUpdated = false;

    if (this.userInfo && (this.userInfo.email || this.validateEmail(email))) {
      const reqBody: NotificationVerification = new NotificationVerification();
      reqBody.verificationIdentifierType = 'email';
      reqBody.identifier = email;

      this.store.dispatch(
        ProfileActions.sendVerificationEmail({
          identifier: 'email',
          reqBody
        })
      );
    } else {
      // allow the user to insert an email
      this.isUserEmailDisabled = false;
      this.isEmailVerifyButtonDisabled = true;
    }
  }

  sendVerificationMobile() {
    const mobile = this.profileForm.value.mobile;
    this.isMobileVerifyButtonDisabled = false;
    this.isProfileUpdated = false;
    if (this.userInfo && (this.userInfo.mobile || this.validateMobile(mobile))) {
      const reqBody: NotificationVerification = new NotificationVerification();
      reqBody.verificationIdentifierType = 'mobile';
      reqBody.identifier = mobile;

      this.store.dispatch(
        ProfileActions.sendVerificationMobile({
          identifier: 'mobile',
          reqBody
        })
      );
    } else {
      // allow the user to insert mobile number
      this.isUserMobileDisabled = false;
      this.isMobileVerifyButtonDisabled = true;
    }
  }

  private validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private validateMobile(mobile: string) {
    return mobile ? mobile.length == 10 : false;
  }

  onValidateEmail() {
    const email = this.profileForm.value.email;
    this.updateType = 'email';
    if (this.validateEmail(email)) {
      this.isEmailVerifyButtonDisabled = false;
      this.message = '';
    } else {
      this.message = 'Email is invalid';
      this.isEmailVerifyButtonDisabled = true;
    }
  }

  onValidateMobile(e: { which: any; keyCode: any; target: { value: any; }; }) {
    // 
    const charCode = (e.which) ? e.which : e.keyCode;
    const mobile = e.target.value;
    
    this.updateType = 'phone';
    if (charCode > 31 && charCode != 44 && charCode != 46  && (charCode < 48 || charCode > 57 || mobile.length > 10)) {
      this.isMobileVerifyButtonDisabled = true;
      this.mobileErrorMsg = 'Phone number is invalid';
    } else {
      if (this.validateMobile(mobile)) {
        this.mobileErrorMsg = '';
        // this.isMobileVerifyButtonDisabled = false;
        this.isChangePhone(mobile);
      } else {
        this.mobileErrorMsg = 'Phone number is invalid';
        this.isMobileVerifyButtonDisabled = true;
      }
    }
  }

  isChangePhone(inputMobile: string) {
    let inputNumber = this.remove91ToPhoneNumber(inputMobile);
    let savedNumber = this.remove91ToPhoneNumber(this.userInfo.mobile);
    if(inputNumber == savedNumber) {
      this.isMobileVerifyButtonDisabled = true;
    } else {
      this.isMobileVerifyButtonDisabled = false;
    }
    // console.log("Phone:", savedNumber, inputNumber);
  }

  onChangeEvent(e: any) {
    if (e.target.id === 'displayNameId') {
      if (/^[a-zA-Z\s]+$/.test(this.profileForm.value['displayName']) && this.profileForm.value['displayName'].length < 31 && this.profileForm.value['displayName'].length >= 2  ) {

        this.userProfileValidator['displayName'].invalid = false;
      } else {
        this.userProfileValidator['displayName'].invalid = true;
        if (this.profileForm.value['displayName']) {
          this.userProfileValidator['displayName'].error = this.profileForm.value['displayName'].length > 30 ? 'User name must be less than 30 characters' : 'User name contains invalid characters';
        } else {
          this.userProfileValidator['displayName'].error = 'User name is required';
        }
      }
      if (this.userInfo.displayName !== this.profileForm.value['displayName']) {
        this.profileUpdated = true;
      }
    }
    this.profileUpdated = true;
  }

  cancelUpdate() {
    this.profileForm.get("displayName").setValue(this.userInfo.displayName);
    // this.profileForm.get("dob").setValue(Moment(this.userInfo.dob, 'YYYY-MM-DD'));
    this.profileForm.get("dob").setValue(Moment(this.userInfo.dob).format('YYYY-MM-DD'));
    this.profileForm.get("gender").setValue(this.userInfo.gender);
    for (const [key, value] of Object.entries(this.userProfileValidator)) {
      if (value.required) {
        this.userProfileValidator[key].invalid = false;
      }
    }
    this.profileUpdated = false;
    this.cancleEditPersonalInfo();
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  enableScroll(value: any = null) {
    document.body.style.overflow = 'auto';
  }

  
  editPersonalInfo(){
    this.personalInfoEditMode = true;
  }
  cancleEditPersonalInfo(){
    this.personalInfoEditMode = false;
  }

  editContactInfo(field:string){
    this.contactInfoEditMode[field] = true;
    if (field === 'email' && this.userInfo.email) {
      this.profileForm.get("email").setValue(this.userInfo.email);
      this.profileForm.get("email").updateValueAndValidity();
    }

    if (field === 'mobile' && this.userInfo.mobile) {
      const mobileNumber = this.remove91ToPhoneNumber(this.userInfo.mobile);
      this.profileForm.get("mobile").setValue(mobileNumber);
      this.profileForm.get("mobile").updateValueAndValidity();
      this.mobileErrorMsg = '';
      this.isMobileVerifyButtonDisabled = true;
    }    
  }

  cancleeditContactInfo(field:string){
    this.contactInfoEditMode[field] = false;
    this.message = ""
  }

  ngOnDestroy() {
    this.profileStateSubscriber.unsubscribe();
    this.profileUpdatedSubscriber.unsubscribe();
    this.loaderSubscriber.unsubscribe();
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
    this.profileFormSubscription.unsubscribe();
  }


  
  remove91ToPhoneNumber(phone: string) {
    let replaceString = '+91';
    if(phone && phone.includes(replaceString)) {
      phone = phone.replace(replaceString, '')
    }
    return phone;
  }

}

// function Moment(dob: string, arg1: string): any {
//   throw new Error('Function not implemented.');
// }



