import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { GintaaUser } from '../models/auth.user';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private subject = new Subject<any>();
  public currentBusinessId = new BehaviorSubject<string>("default message");
  currentMessage = this.currentBusinessId.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  getBusinessId(currentBusinessId: string) {
    this.subject.next({ currentBusinessId: currentBusinessId });
  }

  clearBusinessId() {
    this.subject.next();
  }

  getCurrentBusinessId(): Observable<any> {
    return this.subject.asObservable();
  }



  setStore(user: GintaaUser) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  get store(): GintaaUser {
    return isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('user')) : null;
  }

  clearStore() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('userAddress');
      localStorage.removeItem('currentAddress');
      localStorage.removeItem('selectedBusinessId');
    }
  }

  checkCurrentLocation() {
    let result = false;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('currentAddress')) {
        result = JSON.parse(localStorage.getItem('currentAddress'))
      }
    }
    return result;
  }

  storeLocation(currentAddress) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentAddress', JSON.stringify(currentAddress));
    }
  }

  getUserAddress() {
    let result = false;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userAddress')) {
        result = JSON.parse(localStorage.getItem('userAddress'))
      }
    }
    return result;
  }

  setDefaultUserAddress() {
    let result = false;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userAddress')) {
        try {
          const addressList = JSON.parse(localStorage.getItem('userAddress'));
          if (addressList && Array.isArray(addressList)) {
            const defaultAddress = addressList.find((val) => val.default);
            if (defaultAddress) {
              this.storeLocation(defaultAddress);
              result = defaultAddress;
            }
          }
        } catch (e) {

        }
      }
    }
    return result;
  }

  setUserAddress(address) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userAddress', JSON.stringify(address));
    }
  }

  setSelectedBusiness(business: { businessId: string, businessRole: string, businessName: string, businessLogo: string }) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedBusinessId', JSON.stringify(business));
    }
  }

  removeSelectedBusinessFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('selectedBusinessId');
    }
  }

  getSelectedBusiness() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('selectedBusinessId')) {
        return JSON.parse(localStorage.getItem('selectedBusinessId'));
      }
      return null;
    }
  }

  getLoggedInUserId(userId) {
    let result = false;
    if (isPlatformBrowser(this.platformId)) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.userId && userId == user.userId) {
          result = true;
        } else {
          result = false;
        }
      } catch (e) {
        result = false;
      }
    }
    return result;
  }

  storeData(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getData(key) {
    let result = '';
    if (isPlatformBrowser(this.platformId)) {
      result = localStorage.getItem(key);
    }
    return result
  }

  removeData(key) {
    localStorage.removeItem(key);
  }

  getCurrentUserAccessToken() {
    let currentUser: any = isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('user')) : null;
    return currentUser ? currentUser.accessToken : null;
  }
}
