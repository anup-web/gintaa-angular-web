import { Address } from "@gintaa/core/models/Address";
import { CurrentLocation } from "@gintaa/shared/models/shared.model";
import { AddressResponse } from '@gintaa/core/models';
import { BusinessProfiles } from "@gintaa/shared/models/Business.model";
// import { BusinessProfiles } from "@gintaa/shared/models";

export interface BusinessState {
    loading: boolean;
    loadingMessage: string;
    successMessage: string;
    errorMessage: string;
    businessProfiles: BusinessProfiles;
    businessInvitations: BusinessInvitations[];
    addEditAddressStatus: string;
    currentBusinessDetails: BusinessDetails;
    currentLocation: CurrentLocation;
    currentAdress: AddressResponse;
    closeOpenedModel: boolean;
    currentBusinessMembers: any;
    refreshBusinessMembers: boolean;
    refreshBusinessInvitations: boolean;
    invitationAction: string;
    selectedBusinessMember: BusinessTeam;
    currentBusinessOfers: any[];
    dealRatings: any[];
    allBusinessRoles: BusinessRole[];
    removeMemberFromBusiness: boolean;
    currentBusinessSuggestedUrls: string[]
}

export interface BusinessDetails {
    id                  : string;
    businessOwner       : businessOwner;
    name                : string;
    phone               : string;
    mobile              : string;
    email               : string;
    purpose             : string;
    description         : string;
    estdDate            : string;
    profileUrl          : string;
    strength            : string;
    netWorth            : string;
    avgRating           : number;
    memberCount         : number;
    totalVotes          : number;
    totalReviews        : number;
    logoUrl             : string;
    coverPhotoUrl       : string;
    brandColour         : string;
    status              : string;
    businessKycs        : businessKyc[];
    businessAddresses   : any[];
    hoursOfOperations   : BusinessOperation[];
    hrsOfOpSameAllDays  : boolean;
    profileSince        : string;
}

export interface BusinessInvitations {
    businessId: string;
    businessName: string;
    logoUrl: string;
    businessRole: string;
    status: string;
}

export interface BusinessConatctInfo {
    phone: string;
    mobile: string;
    email: string;
}

export interface BusinessTeamMock {
    name: string;
    userId?: string;
    status?: boolean;
    image?: string;
    role?: string;
    email?: string;
    phone?: string;
    invitedOn?: string;
    invitationSatus?: string;
    invitationMessage?: string;
    offers?: any[];
}

export interface BusinessTeam {
    accepted?: boolean;
    active?: boolean;
    businessProfileId: string;
    businessRole: string;
    comments: string;
    id: string;
    memberDetails: MemberDetails;
    memberId: string;
    reason: string;
    requestedOn: string;
    respondDate: string;
    offers?: any[];
    memberStatus?: string;
    refetchOffers?: boolean;
}

export interface MemberDetails {
    active: boolean;
    email: string;
    identityId: string;
    imageUrl: string;
    mobile: string;
    name: string;
}

export interface BusinessOperation {
    day: string;
    hours: TimingHours[];
}

export interface TimingHours {
    startTime   : string;
    endTime     : string;
}


export interface BusinessOperationMock {
    days: string[];
    from: string;
    to: string;
}

export enum BUSINESS_COLOR_CODE_CLASSES {
    BUSINESS_COLOR_BLUE = 'color-name-1',
    BUSINESS_COLOR_PINK = 'color-name-2',
    BUSINESS_COLOR_GREEN = 'color-name-3',
    BUSINESS_COLOR_BISMARK = 'color-name-4',
    BUSINESS_COLOR_TUNDORA = 'color-name-5',
    BUSINESS_COLOR_LIGHT_BLUE = 'color-name-6',
    BUSINESS_COLOR_LOGAN = 'color-name-7',
    BUSINESS_COLOR_SALMON = 'color-name-8',
    BUSINESS_COLOR_MAROON = 'color-name-9',
    BUSINESS_COLOR_CYAN = 'color-name-10',
}

export enum BUSINESS_COLOR_HEX {
    BUSINESS_COLOR_BLUE = '#48cef3',
    BUSINESS_COLOR_PINK = '#ee2a7b',
    BUSINESS_COLOR_GREEN = '#8bc63e',
    BUSINESS_COLOR_BISMARK = '#4b6e82',
    BUSINESS_COLOR_TUNDORA = '#494949',
    BUSINESS_COLOR_LIGHT_BLUE = '#8caec5',
    BUSINESS_COLOR_LOGAN = '#a8a6cc',
    BUSINESS_COLOR_SALMON = '#fa787a',
    BUSINESS_COLOR_MAROON = '#a61f57',
    BUSINESS_COLOR_CYAN = '#216b7c',
}

export const BUSINESS_COLOR_CLASS_TO_HEX = {
    'color-name-1': '#48cef3',
    'color-name-2': '#ee2a7b',
    'color-name-3': '#8bc63e',
    'color-name-4': '#4b6e82',
    'color-name-5': '#494949',
    'color-name-6': '#8caec5',
    'color-name-7': '#a8a6cc',
    'color-name-8': '#fa787a',
    'color-name-9': '#a61f57',
    'color-name-10': '#216b7c',
}

export const BUSINESS_COLOR_HEX_TO_CLASS = {
    '#48cef3': 'color-name-1',
    '#ee2a7b': 'color-name-2',
    '#8bc63e': 'color-name-3',
    '#4b6e82': 'color-name-4',
    '#494949': 'color-name-5',
    '#8caec5': 'color-name-6',
    '#a8a6cc': 'color-name-7',
    '#fa787a': 'color-name-8',
    '#a61f57': 'color-name-9',
    '#216b7c': 'color-name-10',
}

export interface businessOwner {
    userIdentityId  : string;
    name            : string;
    mobile          : string;
    email           : string;
    imageUrl        : string;
}

export interface businessKyc {
    kycType     : string;
    kycNo       : string;
    isVerified  : boolean;
    reason      : string;
}

export interface BusinessRole {
    id      : string;
    name    : string;
    code    : string;
}

export enum BusinessMemberTypes {
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Removed = 'Removed',
    Pending = 'Pending',
}

export interface BusinessMemberFilterType {
    memberTypes: BusinessMemberFilterChildType[];
    businessMemberRole: BusinessMemberFilterChildType[];
    publicationDates: BusinessMemberFilterChildType[];
}

export interface BusinessMemberFilterChildType {
    name: BusinessMemberTypes | string;
    selected: boolean;
    contentType?: string;
}
