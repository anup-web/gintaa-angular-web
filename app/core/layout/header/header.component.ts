import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services/auth.service';
import { GooglePlaceResult } from '@gintaa/core/models/google-place-result.model';
import { LocationService } from '@gintaa/core/services/location.service';
import { FcmService } from '@gintaa/core/services/fcm.service';
import { GeocodingService } from '@gintaa/core/services/geocode.service';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { CreateBusinessAccountComponent } from '@gintaa/shared/components/create-business-account/create-business-account.component';
import { CURRENT_AUTH_MODAL } from '@gintaa/modules/auth/configs/auth.config';
import { AuthActions } from '@gintaa/modules/auth/store/action-types';
import { PlacePredictionService } from '@gintaa/core/services/place-prediction.service';
import { Store } from '@ngrx/store';
import { PlaceService } from '@gintaa/core/services/place.service';
import { LOCATION_CITIES } from '@gintaa/config/constant.config';
import { StorageService } from '@gintaa/core/services/storage.service';

import { CreateBusinessBankComponent } from '@gintaa/shared/components/create-business-bank/create-business-bank.component';

import * as gintaaApp from '../../../store/app.reducer';
import {
  slideInOut,
  slideUpDown, flash, headShake, slideInUp, pulse,
  fadeInUp, fadeIn, slideInRight, btnInsertRemove
} from 'projects/gintaa/src/app/animation';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { SwitchProfilesComponent } from '@gintaa/shared/components/business-switch-profiles/switch-profiles.component';
import { BusinessSwitchListComponent } from '@gintaa/shared/components/business-switch-list/business-switch-list.component';

import { MemberBusinessProfile } from "@gintaa/core/models/firebase-claims";
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { InactiveBusinessAccountComponent } from '@gintaa/shared/components/inactive-business-account/inactive-business-account.component';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FeatureListEnum, FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { selectAuthState } from '@gintaa/modules/auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight, btnInsertRemove
  ]
})
export class HeaderComponent implements OnInit {

  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  @ViewChild('profileToggler') profileToggler: ElementRef;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  private componentDestroyed$: Subject<void> = new Subject<void>();
  allPossibleAuthModals = CURRENT_AUTH_MODAL;
  username: string;
  userInitialName: string;
  profileUrl: string;
  @Output() emitModeType: EventEmitter<string> = new EventEmitter<string>();
  fcmNotificationMessages: any;
  isBusinessMode: boolean = false;
  isSwitchToBusinessProfile: boolean = false;
  businessProfiles: MemberBusinessProfile[] = [];
  selectedBusinessProfile: any = {};
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  businessNoImageHeader: string = 'assets/images/business/company-logo.svg';
  googlePlacesResults: GooglePlaceResult[];
  isLoggedIn: boolean = false;
  addressList: any = [];
  cityList: any = LOCATION_CITIES;
  currentLocation: any = null;
  addressSubscriber: Subscription;
  locationSubscriber: Subscription;
  placePredictionSubscriber: Subscription;
  loadingLocation: boolean = false;
  maxBusinessCountOnHeader: number = 10;
  showBusinessMenu: boolean = false;
  businessHeaderDropdownExpanded: boolean = false;
  subscriptionLogin: Subscription;
  loggedInNow: boolean = false;
  subscriptionAddress: Subscription;
  authActionSubscriber: Subscription;
  showAfterDelete: boolean = false;

  releaseOffer: boolean = true; // offer = deal
  isEnableAuction: boolean = false;
  showLoader: boolean = false;
  subscription: Subscription;
  // logOutTriggered: boolean = false;
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private store: Store<gintaaApp.AppState>,
    private fcmService: FcmService,
    public firebaseAuthService: FirebaseAuthService,
    private placePredictionService: PlacePredictionService,
    private locationService: LocationService,
    private geoCodeService: GeocodingService,
    private placeService: PlaceService,
    private storageService: StorageService,
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private chatService: ChatService,
    private analyticsService: FirebaseAnalyticsService,
    private staticContent: FirebaseStaticContentService
  ) { }


  ngOnInit(): void {
    this.subscription = this.storageService.getCurrentBusinessId().subscribe(businessId => {
      if (businessId) {
        console.log("=================businessId",businessId);
        this.getCurrentBusinessDetails(businessId.currentBusinessId);
      } else {
      }
    });

    this.getUpdatedUserName();
    const isAuth = this.authService.isAuthenticated();
    this.initiateNotification();

    if (isAuth) {
      this.isLoggedIn = true;
      this.showLoader = true;

      const userName = this.authService.getAuthInfo().username;
      this.profileUrl = this.authService.getAuthInfo().profileUrl;
      if (!userName && this.authService.getAuthInfo()) {
        this.username = this.authService.getAuthInfo()?.providerData && this.authService.getAuthInfo()?.providerData[0] && this.authService.getAuthInfo()?.providerData[0]['uid'];
      } else {
        if (userName) {
          this.username = userName.split(' ')[0] + (userName.split(' ')[1] ? (' ' + userName.split(' ')[1]) : '');
        }
      }
      this.isBusinessMode = this.authService.getIsBusinessMode();

      this.isSwitchToBusinessProfile = this.authService.isSwitchedToBusinessProfile()
      if (this.isSwitchToBusinessProfile) {
        this.showBusinessMenu = true;
      }

      setTimeout(() => {
        this.showLoader = false;
      }, 3000);


      // this.subscribeToUtilityStore();
      this.getCurrentLocation();
    } else {
      this.loggedInNow = false;
      this.openLoginPage();
      setTimeout(() => {
        this.getCurrentLocation();
        this.verifySignInEmailLink();
      }, 200);

      setTimeout(() => {
        this.showLoader = false;
      }, 3000);

    }

    this.subscribeToUtilityStore();
    this.visitSite();
    this.isReleaseFeature();

  }

  async isReleaseFeature() {
    this.releaseOffer = await this.staticContent.isFeatureRelease(FeatureListEnum.offer);
  }

  async isAuctionDisable() {    
    this.isEnableAuction = await this.staticContent.isEnableAuction();
  }

  subscribeToUtilityStore() {
    this.store.select(selectUtilityState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(utilityState => {
      if (utilityState.businessProfiles) {
        // this.businessProfiles = [...utilityState.businessProfiles];
        this.businessProfiles = utilityState.businessProfiles;
        // this.setSelectedBusinessProfile();
      }

      this.isBusinessMode = (utilityState.businessProfiles.length) ? true : false;
    });

    ///////// Start auth store //////////
    this.store.select(selectAuthState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(authState => {
      if (authState.logOutTriggered) {
        // this.store.dispatch(
        //   AuthActions.logoutTriggeredEnd()
        // )        

        // console.log("================ Trigger Logout ==================");

        // setTimeout(() => {
        //   if (isPlatformBrowser(this.platformId)) {
        //     window.location.reload();
        //   }
        //   // this.router.navigate(['/home']); 
        // }, 3000);
      }
    });
    ///////// End auth store //////////



    this.subscriptionLogin = this.authService.loginUserWather.subscribe(data => {
      if (data) {
        this.loggedInNow = data;
        this.getUserAddress('loggedin');
      }
    });
    this.subscriptionAddress = this.authService.updateUsedAddressWatcher.subscribe(data => {
      if (data && Array.isArray(data)) {
        this.addressList = data;
        if (this.currentLocation?.id) {
          const selectedLocation = this.addressList.find(val => val.id == this.currentLocation?.id);
          if (selectedLocation) {
            this.currentLocation = selectedLocation;
          } else {
            const defaultAddress = this.addressList.find(val => val.default);
            if (defaultAddress) {
              this.currentLocation = defaultAddress;
            }
          }
          this.authService.storeCurrentLocation(this.currentLocation)
        }
      }
    });
  }

  setSelectedBusinessProfile(businessId: string = '') {
    if (businessId) {
      const currentBusiness = this.businessProfiles.filter(business => business.businessId === businessId);
      if (currentBusiness.length) {
        // setting up selected business
        this.selectedBusinessProfile.name = currentBusiness[0]?.businessName;
        this.selectedBusinessProfile.logo = currentBusiness[0]?.logoUrl;
        this.selectedBusinessProfile.id = currentBusiness[0]?.businessId;
        this.selectedBusinessProfile.role = currentBusiness[0]?.businessRole;
        this.storageService.setSelectedBusiness({
          businessId: this.selectedBusinessProfile.id,
          businessRole: this.selectedBusinessProfile.role,
          businessName: this.selectedBusinessProfile.name,
          businessLogo: this.selectedBusinessProfile.logo
        });
      }
    } else {
      // SET THE FIRST ONE AS SELECTED
      // let selectedBusinessId = this.storageService.getSelectedBusiness() ? this.storageService.getSelectedBusiness().businessId : null;
      // if (selectedBusinessId) {
      //   this.selectedBusinessProfile.id = selectedBusinessId;
      // } else {
      //   this.selectedBusinessProfile.name = this.businessProfiles[0]?.businessName;
      //   this.selectedBusinessProfile.logo = this.businessProfiles[0]?.logoUrl;
      //   this.selectedBusinessProfile.id = this.businessProfiles[0]?.businessId;
      //   this.selectedBusinessProfile.role = this.businessProfiles[0]?.businessRole;
      //   if (this.selectedBusinessProfile.id && this.selectedBusinessProfile.role) {
      //     this.storageService.setSelectedBusiness({
      //       businessId: this.businessProfiles[0]?.businessId,
      //       businessRole: this.businessProfiles[0]?.businessRole,
      //     });
      //   }
      // }
    }
  }

  fetchSelectedBusinessName() {
    if (this.selectedBusinessProfile?.name) {
      // console.log("this.selectedBusinessProfile?.name",this.selectedBusinessProfile?.name)
      return this.selectedBusinessProfile.name;
    } else {
      const selectedBusinessId = this.storageService.getSelectedBusiness() ? this.storageService.getSelectedBusiness().businessId : null;
      if (selectedBusinessId) {
        const currentBusiness = this.businessProfiles.filter(business => business.businessId === selectedBusinessId);
        this.setSelectedBusinessProfile(selectedBusinessId);
        return currentBusiness[0]?.businessName;
      }
      return null;
    }
  }

  fetchSelectedBusinessLogo() {
  // console.log("this.selectedBusinessProfile",this.selectedBusinessProfile)
    if (this.selectedBusinessProfile?.logo) {
      return this.selectedBusinessProfile.logo;
    } else {
      const selectedBusinessId = this.storageService.getSelectedBusiness() ? this.storageService.getSelectedBusiness().businessId : null;
      if (selectedBusinessId) {
        const currentBusiness = this.businessProfiles.filter(business => business.businessId === selectedBusinessId);
        this.setSelectedBusinessProfile(selectedBusinessId);
        return currentBusiness[0]?.logoUrl;
      }
      return null;
    }
  }


  switchBusinessProfile(businessId: string) {
    this.setSelectedBusinessProfile(businessId);
  }

  switchToPersonalProfile() {
    this.selectedBusinessProfile = {};
    this.storageService.removeSelectedBusinessFromStorage();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  switchBusinessProfileModal(businessId: string, businessName: string, verified: boolean) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-business-switch-component';
    dialogConfig.position = {
      top: '10px',
    };

    let unVerifiedBusiness: boolean = false;

    dialogConfig.height = 'auto';
    dialogConfig.width = '400px';

    if (businessId === '' && businessName === '') {
      dialogConfig.data = {
        name: 'SWITCH_TO_PERSONAL',
        businessId: null
      };
    } else {
      if (verified) {
        dialogConfig.data = {
          name: businessName,
          businessId: businessId
        };
      } else {
        unVerifiedBusiness = true;
        dialogConfig.data = {
          name: businessName,
          businessId: businessId
        };
      }
    }

    let modalDialog: any;
    if (!unVerifiedBusiness) {
      modalDialog = this.matDialog.open(SwitchProfilesComponent, dialogConfig);
    } else {
      modalDialog = this.matDialog.open(InactiveBusinessAccountComponent, dialogConfig);
    }


    modalDialog.afterClosed().subscribe((results) => {
      if (results && results !== undefined) {
        // this.showLoader = true;
        if (results.name === 'SWITCH_TO_PERSONAL') {
          this.showBusinessMenu = false;
          this.switchToPersonalProfile();
        } else {
          let businessId = results.businessId;
          this.switchBusinessProfile(businessId);
          this.showBusinessMenu = true;
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      }

    });
  }

  removeSelectedBusinesListFromSwitching() { }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  getCurrentLocation() {
    const crLocation = this.authService.checkCurrentLocation();
    if (crLocation && !this.loggedInNow) {
      this.currentLocation = crLocation;
      if (this.isLoggedIn) {
        const userAddress = this.authService.userAddress();
        if (userAddress) {
          try {
            this.addressList = userAddress;
          } catch (err) {
            this.addressList = [];
          }
        }
      }
    } else if (this.authService.isCsr()) {
      if (this.isLoggedIn) {
        const userAddress = this.authService.userAddress();
        if (userAddress) {
          try {
            this.addressList = userAddress;
          } catch (err) {
            this.addressList = [];
          }
        }
        // const setDefaultAddress = this.authService.setDefaultAddress();
        // if (!setDefaultAddress) {
        //   setTimeout(() => {
        //     this.fetchCurrentLocation();
        //   }, 5000);
        // } else {
        //   this.currentLocation = setDefaultAddress;
        // }
      } else {
        setTimeout(() => {
          this.fetchCurrentLocation();
        }, 4000);
      }
    }
  }

  getUserAddress(action = 'loggedin') {
    const userAddress = this.authService.userAddress();
    if (userAddress) {
      try {
        this.addressList = userAddress;
      } catch (err) {
        this.addressList = [];
      }
    } else {
      this.addressSubscriber = this.authService.getUserAddress().subscribe(res => {
        if (res['payload'] && Array.isArray(res['payload'])) {
          this.addressList = res['payload'];
          this.authService.storeUserAddress(this.addressList);
          const defaultLocation = this.authService.setDefaultAddress();
          if (defaultLocation) {
            this.currentLocation = defaultLocation;
          }
        }
      }, err => {
        this.addressList = [];
      })
    }
  }

  collapseNav() {

    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
    this.closeSideBar();
  }

  collapseNavProfile() {
    this.profileToggler.nativeElement.click();
  }

  openLoginDialog() {
    this.collapseNav();
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '20px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(LoginModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      this.showLoginScreen();
    });
  }

  navigateTo(route: string): void {
    switch (route) {
      case 'home':
        //this.onDialogClose();
        this.router.navigate(['/home']);
        break;

      default:
        break;
    }
  }

  openLoginPage() {
    this.authActionSubscriber = this.authService.unAuthorisedAction.subscribe((data) => {
      if (data == 'openLogin') {
        this.openLoginDialog();
        this.authService.unAuthorisedAction.next('');
      }
    })
  }

  onDialogClose() {
    // this.dialogRef.close();
  }

  getUpdatedUserName() {
    this.firebaseAuthService.loggedInUserInfo.subscribe((data: any) => {
      if (data?.displayName && data.displayName !== null) {
        const userName = data.displayName;
        if (userName) {
          this.isLoggedIn = true;
          this.username = userName.split(' ')[0] + (userName.split(' ')[1] ? (' ' + userName.split(' ')[1]) : '');
        } else {
          this.isLoggedIn = false;
          this.loggedInNow = false;
          this.getCurrentLocation()
        }
      }
      this.profileUrl = data?.photoURL;
      if (!this.username) {
        if (!this.username && this.authService.getAuthInfo()) {
          this.username = this.authService.getAuthInfo()?.providerData && this.authService.getAuthInfo()?.providerData[0] && this.authService.getAuthInfo()?.providerData[0]['uid'];
        }
      }
    });
  }

  signOut() {
    // this.collapseNav();
    this.collapseNavProfile();
    setTimeout(() => {
      // console.log("Sign Out ---")      
      this.store.dispatch(
        AuthActions.logout()
      )


    if (isPlatformBrowser(this.platformId)) {
        let listingBtn = window.localStorage.getItem('fromCreateListingBtn');

        if(listingBtn != null || listingBtn != undefined){
          window.localStorage.removeItem('fromCreateListingBtn');
        }
    }

      // console.log("Trigger Logout");
    }, 500);
    this.matDialog.closeAll();
    // this.router.navigate(['/home']); 

  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  fetchShortUserName() {
    const isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      const userName = this.authService.getAuthInfo().username;
      if (userName) {
        this.username = userName.split(' ')[0] + (userName.split(' ')[1] ? (' ' + userName.split(' ')[1]) : '');
      }
    }
    if (this.username) {
      return this.username.split(' ')[0];
    } else {
      return ' Guest';
    }
  }

  getProfileUrl() {
    const isAuth = this.authService.isAuthenticated();
    if (isAuth) {
      this.fetchShortUserName();
      const tempProfileUrl = this.authService.getAuthInfo().profileUrl;;
      return tempProfileUrl ? tempProfileUrl : this.userNoImage;
    } else {
      return this.userNoImage;
    }
  }

  openCreateBusinessAccountPopup() {
    const dialogConfigBusiness: MatDialogConfig = new MatDialogConfig();
    dialogConfigBusiness.disableClose = false;
    dialogConfigBusiness.id = 'gintaa-business-register-component';
    dialogConfigBusiness.position = {
      top: '10px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfigBusiness.height = 'auto';
    dialogConfigBusiness.width = '400px';
    dialogConfigBusiness.data = {};

    const modalDialogBusiness = this.matDialog.open(CreateBusinessAccountComponent, dialogConfigBusiness);
    modalDialogBusiness.afterClosed().subscribe((results) => {
      // [BUSINESS ACCOUNT] create modal closed
    });
  }

  dropdownMenuClicked(e: any) {
    if (e.target.nodeName && (e.target.nodeName.toUpperCase() === 'A')) {
      this.businessHeaderDropdownExpanded = false;
      return;
    } else if (e.target && e.target.innerText.trim() == 'create business account') {
      this.businessHeaderDropdownExpanded = false;
      return;
    } else {
      e.stopPropagation();
      return false;
    }
  }

  drakLightModetoggle(type: string) {
    this.emitModeType.emit(type);
  }

  initiateNotification() {
    if (this.authService.isLoggedIn) {
      this.callFcmApis();
      this.chatService.getCurrentUserOfflineOnlineStatus();
    } else {
      this.firebaseAuthService.loggedInUserInfo
        .subscribe((res) => {
          this.chatService.getCurrentUserOfflineOnlineStatus();
          this.callFcmApis();
        })
    }
  }

  callFcmApis() {
    this.fcmService.requestPermission()
    this.fcmService.onTokenChange();
    this.fcmService.receiveMessage()
    //this.fcmService.receiveBackgroundMessage();
    this.fcmNotificationMessages = this.fcmService.currentMessage;
  }

  verifySignInEmailLink() {
    if (isPlatformBrowser(this.platformId)) {
      this.showLoader = false;
      const verifyPath = 'signin-email-link-verify';
      // const currentUrl = this.router.url;    
      const currentUrl = window.location.href;

      if (currentUrl.includes(verifyPath)) {

        let signInEmail = window.localStorage.getItem('emailForSignInGintaa');


        this.store.dispatch(
          AuthActions.signInWithEmailLinkVerify({ email: signInEmail })
        )

        this.openLoginDialog();

      }
    }

  }


  showLoginScreen() {
    this.store.dispatch(
      AuthActions.changeCurrentAuthModal({ page: this.allPossibleAuthModals.SIGN_IN_WITH_MOBILE })
    );
  }

  ngOnDestroy() {
    this.fcmService.realTimeMessages.unsubscribe();
    this.firebaseAuthService.loggedInUserInfo.unsubscribe();
    try {
      this.addressSubscriber.unsubscribe();
      this.locationSubscriber.unsubscribe();
      this.placePredictionSubscriber.unsubscribe();
      this.subscriptionLogin.unsubscribe();
      this.subscriptionAddress.unsubscribe();
      this.authActionSubscriber.unsubscribe();
      this.subscription.unsubscribe();
    } catch (err) {

    }
  }

  close(reason: string) {
    this.sidenav.close();
  }

  onSearch(search: string) {
    if (search.length >= 3) {
      setTimeout(() => {
        this.placePredictionSubscriber = this.placePredictionService.getPlacePredictions(search)
          .subscribe(
            (response: GooglePlaceResult[]) => this.googlePlacesResults = response
          );
      }, 100);
    } else {
      this.googlePlacesResults = [];
    }
  }

  suggestionSelected(prediction: any, addressType = 'gmap') {
    let currentAddress = '';
    if (addressType === 'gmap') {
      this.searchElementRef.nativeElement.value = prediction.description;
      this.placeService.getPlaceDetails(prediction.place_id)
        .subscribe(
          (placeDetails: google.maps.places.PlaceResult) => {
            this.extractPlaceDetails(placeDetails);
          }
        );
    } else if (addressType === 'address') {
      this.searchElementRef.nativeElement.value = prediction.addressLine;
      currentAddress = prediction;
    } else {
      this.searchElementRef.nativeElement.value = prediction.addressLine;
      currentAddress = prediction;
    }
    this.loadingLocation = false;
    if (currentAddress) {
      this.currentLocation = currentAddress;
      this.authService.storeCurrentLocation(this.currentLocation)
      const modal = document.getElementById('left_modal');
      if (modal) {
        this.searchElementRef.nativeElement.value = '';
        modal.click();
      }
    }
    this.googlePlacesResults = []
  }

  fetchCurrentLocation(select = '') {
    const crLocation = this.authService.checkCurrentLocation();
    if (crLocation && select === '') {
      this.currentLocation = crLocation;
    } else {
      this.locationService.getPosition().then(res => {
        this.loadingLocation = true;
        if (res.lat && res.lng) {
          this.fetchAndUpdateFormattedAddress(res.lat, res.lng);
        }
      });
    }

  }

  fetchAndUpdateFormattedAddress(lat: string, lng: string) {
    try {
      const latLng = new google.maps.LatLng(+lat, +lng);
      this.locationSubscriber = this.geoCodeService.geocode(latLng).subscribe((currentAddressResults: google.maps.GeocoderResult[]) => {
        const currentAddressResult = currentAddressResults[0];
        this.searchElementRef.nativeElement.value = currentAddressResult.formatted_address;
        this.currentLocation = currentAddressResult;
        this.extractPlaceDetails(currentAddressResult);
        this.googlePlacesResults = [];
      });
    } catch (err) {

    }
  }

  extractPlaceDetails(place: any) {
    let currentAddress: any = this.placeService.extractPlaceDetailsNew(place);
    this.loadingLocation = false;
    if (currentAddress) {
      this.currentLocation = currentAddress;
      this.authService.storeCurrentLocation(currentAddress);
      const modal = document.getElementById('left_modal');
      if (modal) {
        modal.click();
        this.searchElementRef.nativeElement.value = '';
      }
    }
  }
  activeAddress(address: any) {
    if (this.currentLocation) {
      if (this.currentLocation?.id && address?.id) {
        return this.currentLocation?.id == address?.id;
      } else {
        return this.currentLocation?.lat == address?.lat;
      }
    } else {
      return false
    }
  }
  showCurrentLocation() {
    if (this.currentLocation) {
      return this.currentLocation?.area ? this.currentLocation?.area : (this.currentLocation?.city ? this.currentLocation?.city : (this.currentLocation?.state ? this.currentLocation?.state : ''));
    } else {
      return '';
    }
  }

  getBusinessListForswitch(businessProfiles) {
    if (businessProfiles.length && this.selectedBusinessProfile) {
      return businessProfiles.filter(business => business.businessId !== this.selectedBusinessProfile.id)
    } else {
      return businessProfiles;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (isPlatformBrowser(this.platformId)) {
      if (window.pageYOffset > 120) {
        let element = document.getElementById('navbar');
        element.classList.add('sticky-gnav');
      } else {
        let element = document.getElementById('navbar');
        element.classList.remove('sticky-gnav');
      }
    }
  }


  isShowDivIf = true;

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }


  visitSite() {
    let eventName = FirebaseAnalyticsEnum.visitWebSite
    this.analyticsService.logEvents(eventName);
  }

  closeSideBar() {
    document.getElementById('close-modal').click();
  }


  listSwitchDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '400px';
    dialogConfig.data = {};

    const modalDialog = this.matDialog.open(BusinessSwitchListComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }


  getCurrentBusinessDetails(businessId) {
    this.subscribeToUtilityStore();
    const currentBusiness = this.businessProfiles.filter(business => business.businessId === businessId);
  
   // console.log("currentBusiness",currentBusiness);
    if (currentBusiness.length) {
      // setting up selected business
      this.selectedBusinessProfile.name = currentBusiness[0]?.businessName;
      this.selectedBusinessProfile.logo = null;
      this.selectedBusinessProfile.id = currentBusiness[0]?.businessId;
      this.selectedBusinessProfile.role = currentBusiness[0]?.businessRole;
      this.storageService.setSelectedBusiness({
        businessId: this.selectedBusinessProfile.id,
        businessRole: this.selectedBusinessProfile.role,
        businessName: this.selectedBusinessProfile.name,
        businessLogo: this.selectedBusinessProfile.logo
      });
    }
   
  if(this.selectedBusinessProfile.logo === null){
    //console.log("Set Profile pic")
    this.fetchSelectedBusinessLogo();
    this.showAfterDelete = true;
   // this.ngOnInit();
  }
  

}

businessBankDialog() {
  const dialogConfig: MatDialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.id = 'gintaa-login-component';
  dialogConfig.position = {
    top: '10px',
  };

  dialogConfig.height = 'auto';
  dialogConfig.width = '800px';
  dialogConfig.data = {};

  const modalDialog = this.matDialog.open(CreateBusinessBankComponent, dialogConfig);
  modalDialog.afterClosed().subscribe((results) => {
    // do something with results
  });
}


}