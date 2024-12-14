import { AddressResponse, UserInfo } from '@gintaa/core/models';
import { CURRENT_AUTH_MODAL } from '../configs/auth.config';
import firebase from 'firebase/app';

export interface AuthState {
    currentAuthModal: CURRENT_AUTH_MODAL;
    loading: boolean;
    authLoader?: boolean;
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
    authType: string;
    picture: string;
    changeCurrentAuthModal: boolean;
    closeCurrentAuthModal: boolean;
    userType: string;
    verificationTransactionId: string;
    closeOtpModel: boolean;
    isVerified: boolean;
    payloadValidation: any;
    isProfileComplete: boolean;
    profileError: string;
    logOutTriggered: boolean;
}
export interface AddressRequest {
    name: string;
    phoneNumber: string,
    email: string;
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
    default: boolean;
}

export interface ImageModificationRequest {
    add: string[];
    removed: string[];
}

export interface UserProfileUpdateRequest {
    userId?: string;
    name?: string;
    email?: string;
    mblNo?: string;
    mobile?: string;
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
