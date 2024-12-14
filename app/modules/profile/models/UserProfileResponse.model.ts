export class ImageResponse {
    name?: string;
    url: string;
    id?: string;
}

export class AddressResponse {
    id?: string;
    addressLine?: string;
    lat?: number;
    lng?: number;
    flatNo?: string;
    landmark?: string;
    area?: string;
    annotation?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
    cityId?: string;
    stateId?: string;
    countryId?: string;
    default?: boolean;
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
    noOfComments: number;
    totalRatings: number;
    averageRating: number;
    profileSince?: any;
    photoUrl?: any;
    closedDealsCount:number;
    imageUpload?:boolean;
    constructor() {
        this.emailVerified = false;
        this.mobileVerified = false;
    }
}


export class OtherUserProfileResponse {
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
    noOfComments: number;
    totalRatings: number;
    averageRating: number;
    profileSince?: any;
    photoUrl?: any;
    closedDealsCount:number;
    imageUpload?: boolean
    constructor() {
        this.emailVerified = false;
        this.mobileVerified = false;
    }
}



class AddressRequest {
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
