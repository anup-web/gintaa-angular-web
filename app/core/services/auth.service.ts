import { isPlatformBrowser } from '@angular/common';
import { EventEmitter, Inject, Injectable, Output, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserProfileResponse } from '../models/UserProfileResponse';
import { GintaaUser } from '../models/auth.user';
import { environment } from '@gintaa/env';
import { configUrls } from '@gintaa/config/api-urls.config';
import { SupportedFireBaseClaims } from '../models/firebase-claims';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() signInEvent: EventEmitter<any> = new EventEmitter();
  isLoggedInWatcher = new BehaviorSubject(false);
  isLoggedIn: boolean;
  updateUsedAddressWatcher = new Subject<any>();
  loginUserWather = new Subject<any>();
  unAuthorisedAction = new Subject<any>();
  refreshHomePageWatcher: BehaviorSubject<boolean> = new BehaviorSubject(true);
  refreshHomePageWatcher$: Observable<any> = this.refreshHomePageWatcher.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private storageService: StorageService,
    private http: HttpClient
  ) {
    this.isLoggedIn = false;
  }

  setUsername(username: string): void {
    const user: GintaaUser = this.storageService.store;
    user.username = username;
    this.storageService.setStore(user);
    this.signInEvent.emit(this.getSignInInput());
  }

  setFirebaseUserToken(token: string = '', refreshToken: string = '') {
    const userObject = this.storageService.store;
    const gintaaUser = userObject ? userObject : new GintaaUser();
    if (token && refreshToken) {
      gintaaUser.refreshtoken = refreshToken;
      gintaaUser.accessToken = token;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
  }

  updateFirebaseUserToken(token: string = '') {
    const userObject = this.storageService.store;
    const gintaaUser = userObject ? userObject : new GintaaUser();
    if (token) {
      gintaaUser.accessToken = token;
    }
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
  }

  setUserVerified(isVerified: boolean) {
    const user: GintaaUser = this.storageService.store;
    user.isVerified = isVerified || false;
    this.storageService.setStore(user);
    this.signInEvent.emit(this.getSignInInput());
  }

  setProfileImage(url: string) {
    const user: GintaaUser = this.storageService.store;
    user.profileUrl = url;
    this.storageService.setStore(user);
    this.signInEvent.emit(this.getSignInInput());
  }

  clearAuthInfo(): void {
    this.storageService.clearStore();
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.location.replace('/home');
      }
    }, 1000);
  }

  public getAuthInfo(): any {
    return isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('user')) : null;
  }

  get currentUserId(): string | null {
    return this.getAuthInfo().userId || null;
  }

  get currentUserName(): string | null {
    return this.getAuthInfo().username || null;
  }

  get currentUserImage(): string | null {
    return this.getAuthInfo().profileUrl || null;
  }

  isAuthenticated(): boolean {
    let isAuth = false;
    const user = isPlatformBrowser(this.platformId) ? this.storageService.store : null;
    if (user && user.userId) {
      isAuth = true;
    }
    return isAuth;
  }

  getSignInInput(): GintaaUser {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getProfileUrl(): string {
    return this.storageService.store ? this.storageService.store.profileUrl : null;
  }

  public getProfileClaim(): string {
    return this.storageService.store ? this.storageService.store.claim : null;
  }

  public getIsBusinessMode(): boolean {
    // console.log('storageService business:', this.storageService.store.business);
    return this.storageService.store ? !!this.storageService.store?.business?.length : false;
  }

  public isSwitchedToBusinessProfile(): boolean {
    return this.storageService.getSelectedBusiness() ? true : false;
  }
  public getSelectedBusinessId(): any {
    return this.storageService.getSelectedBusiness();
  }
  public getActivatedBusiness(): any {
    return this.storageService.store ? this.storageService.store.business : null;
  }

  setFirebaseUser(user: any, token: string = '', expirationTime: string = '') {
    const userObject = this.storageService.store;
    const gintaaUser = userObject ? userObject : new GintaaUser();
    gintaaUser.userId = user.uid;
    gintaaUser.phoneNo = user.phoneNumber;
    gintaaUser.username = user.displayName;
    // gintaaUser.username = user.displayName || user.phoneNumber || user.email;
    gintaaUser.providerData = user.providerData || {};
    gintaaUser.refreshtoken = user.refreshToken;
    gintaaUser.accessToken = token;
    gintaaUser.expirationTime = expirationTime;
    gintaaUser.profileUrl = user.photoURL;

    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  setFirebaseClaimForUser(claim: string, businessModeActive: boolean = false, business: any = null) {
    const userObject = this.storageService.store;
    const gintaaUser = userObject ? userObject : new GintaaUser();
    gintaaUser.claim = claim;
    if (businessModeActive && business) {
      gintaaUser.business = [
        ...business
      ]
    }

    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  deactivateBusinessMode() {
    const userObject = this.storageService.store;
    const gintaaUser = userObject ? userObject : new GintaaUser();
    gintaaUser.business = null;
    gintaaUser.claim = null;

    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  updateFirebaseUser(user: UserProfileResponse) {
    const gintaaUser = new GintaaUser();
    gintaaUser.userId = this.getSignInInput().userId;
    gintaaUser.phoneNo = user.mobile;
    gintaaUser.username = user.name || user.mobile;
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  updateUserContactInfo(contact: string) {
    const gintaaUser: GintaaUser = this.getSignInInput();
    const oldPhoneNo = gintaaUser.phoneNo;
    const userName = gintaaUser.username.includes(oldPhoneNo) ? contact : gintaaUser.username;
    gintaaUser.phoneNo = contact;
    gintaaUser.username = userName || contact;
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStore(gintaaUser);
    }
    this.signInEvent.emit(this.getSignInInput());
  }

  setFirebaseLogin(login: boolean) {
    this.isLoggedIn = login;
    this.isLoggedInWatcher.next(login);
  }

  setModalCloseLogin() {
    this.loginUserWather.next(this.isLoggedIn);
  }

  getFirebaseLogin(): boolean {
    return this.isLoggedIn;
  }

  getFirebaseLoginStatus(): Observable<any> {
    return this.isLoggedInWatcher.asObservable();
  }

  setRefreshHomePageWatcher(action: boolean) {
    this.refreshHomePageWatcher.next(action);
  }

  getRefreshHomePageWatcher(): Observable<any> {
    return this.refreshHomePageWatcher.asObservable();
  }

  checkEXistingUser(userInfo: string, loginType: string) {
    if (loginType === 'email') {
      return this.http.get<Response>(`${environment.serverUrl}${configUrls.checkForExistingUserEmail}${userInfo}`)
    } else {
      return this.http.get<Response>(`${environment.serverUrl}${configUrls.checkForExistingUserMobile}${userInfo}`)
    }
  }
  
  addAddress(address:any) {
    const url: string = `${environment.serverUrl}${configUrls.addAddressUrl}`;
    return this.http.post(url, address)
  }

  getUserAddress(businessId: string = '') {
    let requestURL: string = `${environment.serverUrl}`;
    if(businessId == '' || businessId == null){
      requestURL = `${requestURL}${configUrls.allAddressUrl}`;
    } else {
      requestURL = `${requestURL}${configUrls.getBusinessDetails}`;
      requestURL = requestURL.replace('{businessId}', businessId);
    }
    return this.http.get(requestURL);
  }

  isCsr() {
    return isPlatformBrowser(this.platformId) ? isPlatformBrowser(this.platformId) : false
  }

  checkCurrentLocation() {
    if (isPlatformBrowser(this.platformId)) {
      return this.storageService.checkCurrentLocation();
    } else {
      return false;
    }
  }
  setDefaultAddress() {
    if (isPlatformBrowser(this.platformId)) {
      return this.storageService.setDefaultUserAddress()
    } else {
      return false;
    }
  }
  storeCurrentLocation(currentAddress) {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.storeLocation(currentAddress)
    }
  }
  userAddress() {
    if (isPlatformBrowser(this.platformId)) {
      return this.storageService.getUserAddress()
    } else {
      return false;
    }
  }

  storeUserAddress(address, emitEvent=false) {
    if (isPlatformBrowser(this.platformId)) {
      if(emitEvent){
        this.updateUsedAddressWatcher.next(address);
      }
      this.storageService.setUserAddress(address)
    }
  }
}
