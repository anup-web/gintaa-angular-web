import { UserProfileResponse } from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { CurrentLocation } from '@gintaa/shared/models/shared.model';
import { AddressResponse } from '@gintaa/core/models';

export interface UserProfileState {
    loading: boolean;
    profileLoader: boolean;
    feedbackLoading: boolean;
    addressLoading: boolean;
    currentProfileScreen: string;
    userInfo: UserProfileResponse;
    otherUserInfo: UserProfileResponse;
    currentLocation: CurrentLocation;
    currentAdress: AddressResponse;
    closeOpenedModel: boolean;
    addEditAddressStatus: string;
    message: string;
    verificationEmailSent: boolean;
    verificationTransactionId: string;
    emailVerificationFailed: boolean;
    verificationMobileSent: boolean;
    mobileVerificationFailed: boolean;
    userAllOffers: any;
    userAllFeedback: any
    profileUpdated: string;
    payloadValidation: any;
}
