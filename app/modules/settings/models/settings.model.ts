import { AddressResponse, UserInfo } from '@gintaa/core/models';
import { CURRENT_SETTINGS_MODAL } from '../configs/settings.config';
import firebase from 'firebase/app';

export interface SettingsState {
    currentAuthModal: CURRENT_SETTINGS_MODAL;
    userInfo: UserInfo;
    userId: string;
    loggedIn: boolean;
    isGuest: boolean;
    token: string;
    email: string;
    isEmailDisabled?: boolean;
    phone: string;
    isPhoneDisabled?: boolean;
    name: string;
    dob: string;
    gender: string;
    currentLocation: CurrentLocation;
    currentAdress: AddressResponse;
    firebaseUser: any;
    firebaseResponse: firebase.auth.ConfirmationResult;
    otp: string;
    otpSent: boolean;
    otpReceived: boolean;
    otpVerified: boolean;
    otpInvalidCount: number;
    tokenExpiration: string;
    loginExpired: boolean;
    refreshByTime: string;
    successMessage: string;
    errorMessage: any;
    loading: boolean;
    authType: string;
    picture: string;
    changeCurrentAuthModal: boolean;
    userType: string;
    newEmail: string;
    newPhone: string;
    verificationTransactionId: string;
    currentEmail: string;
    currentPhone: string;
    tradeNotificationTabs: NotificationTab[];
    blockUserCount: number;
    blockUserList: blockUser[];
}
export interface AddressRequest {
    addressLine: string;
    lat: number;
    lng: number;
    flatNo: string;
    landmark: string;
    area: string;
    annotation: string;
    zip: string;
    city: string;
    state: string;
    country: string;
}

export  interface ImageModificationRequest {
    add: string[];
    removed: string[];
}

export interface UserProfileUpdateRequest {
    userId?: string;
    name: string;
    email: string;
    mblNo?: string;
    mobile: string;
    dob?: string;
    age?: string;
    gender?: string;
    images?: ImageModificationRequest[];
    address?: AddressRequest[];
    lastUpdatedEmail?: string;
    lastUpdatedMobile?: string;
}

export interface CurrentLocation {
    available?: boolean;
    _lat: string;
    _lng: string;
}

export interface AGMMapMarker {
    id?: string;
    lat: string;
    lng: string;
    label: string;
    draggable?: boolean;
    name?: string;
}

export class NotificationVerification {
    identifier: string;
    identifierType?: string;
    verificationIdentifierType?: string;
}


/////////// Start Trade Notification /////////////
export interface NotificationOptions {
    optionId        : string;
    optionName      : string;
    activeStatus    : boolean;
}

export interface NotificationEvent {
    eventId         : string;
    eventName       : string;
    activeStatus    : boolean;
    options         : NotificationOptions[];
}


export interface NotificationTab {
    tabId         : string;
    tabName       : string;
    eventList     : NotificationEvent[];
}

/////////// End Trade Notification /////////////

//////////////// Start Block List //////////////////
export interface blockUser {
    userId         : string;
    userName       : string;
    profileImage   : string;
}
//////////////// End Block List ///////////////////
