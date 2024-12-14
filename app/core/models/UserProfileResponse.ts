import { ImageResponse } from './ImageResponse';

export class AddressResponse {
    id?: string;
    addressLine?: string;
    lat?: number;
    latitude?: number;
    lng?: number;
    longitude?: number;
    flatNo?: string;
    landmark?: string;
    area?: string;
    annotation?: string;
    addressTtile?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
    cityId?: string;
    stateId?: string;
    countryId?: string;
    default?: boolean;
    email?: string;
    phoneNumber?: string;
}

export class OfferAddress {
    id: string;
    value: AddressResponse;
    defaultAddress?: boolean;
    addressLine1?: any;
    latitude?: number;
    longitude?: number;
}

export class ProfileIncomplete {
    openModalVal?: string;
    source?: string;
    fields?: string[];
    emailTransactionId?: string;
    mobileTransactionId?: string;
    email?: string;
    phone?: string;
    chatOwner?: boolean;
}

export class UserProfileResponse {
    chatUUID: string;
    profileId: string;
    userId: string;
    name: string;
    email: string;
    lastUpdatedEmail: string;
    mblNo: string;
    mobile: string;
    lastUpdatedMobile: string;
    dob: string;
    age: string;
    gender: string;
    emailVerified: boolean;
    mobileVerified: boolean;
    userVerified?: boolean;
    images: ImageResponse[];
    address: AddressResponse[];
    profileComplete: string;
    displayName: string;
    profileCompletionScore?: number;
    averageRating?:number;
    closedDealsCount?:number;
    photoUrl?:string;
    profileSince?:string;
    totalRatings?:number;

    constructor() {
        this.emailVerified = false;
        this.mobileVerified = false;
    }
}

export class ReportRequest{
    questionAndAnswers: [];
    comment: string;
    reportToGintaa: boolean;
    blockUser: boolean;
}
