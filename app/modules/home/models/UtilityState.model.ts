import { BusinessProfiles } from "@gintaa/shared/models/Business.model";
import { MemberBusinessProfile } from "@gintaa/core/models/firebase-claims";

export interface UtilityState {
    loading: boolean;
    loadingMessage: string;
    successMessage: string;
    errorMessage: any;
    action: string;
    businessFormData: any;
    businessCreated: boolean;
    businessCreationError: any[] | string;
    lastBusinessCreatedId: string;
    refetchBusinessPofiles: boolean;
    businessProfiles: MemberBusinessProfile[];
    businessFetchSuccess: boolean;
    currentOfferFavouriteCount: number;
    offerAddedToFavoriteId: string;
    offerRemovedId: string;
    matchBoxLoaded: boolean,
    offersMatchBox: any [],
    currentBusinessActiveMembers?: any[],
    offerDelegateStatus?: boolean,
    latestDraftOffer?: any[];    
    businessInvitations: BusinessInvitations[];
    refreshBusinessInvitations: boolean;
    invitationAction: string;
    currentOfferActivityCounts?: OfferActivityCount;
    closeOpenedPopup: boolean;
    receivedAccountDetailsList: receivedAccountDetails[];
    receivedAccountDetailsListBusiness: receivedAccountDetails[];
    businessMigrateData?: businessMigrateData;
    
}

export interface businessMigrateData {
    businessName: string
    businessType: string
    id: string
    registered: boolean
    uid: string
}


export interface receivedAccountDetails {
    id                 ?: string;
    businessId         ?: string;
    uid                 : string;
    paymentType         : string;
    bankAccountDetails  : string;
    upiId               : string;
    number              : string;
    nickName            : string;
    active              : boolean;
    razorpayFundId      : string,
    valid               : boolean;
    default             : boolean;
}


export interface BusinessInvitations {
    businessId: string;
    businessName: string;
    logoUrl: string;
    businessRole: string;
    status: string;
}

export interface OfferActivityCount {
    activeDealCount: number;
    chatCount: number;
    commentCount: number;
    dealCount: number;
    favouriteCount: number;
    offerId: string;
    viewCount: number;
}
