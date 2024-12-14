export interface CreateBusinessProfileRequest {
    name: string;
    email?: string;
    phone?: string;
    mobile?: string;
    kycs: BusinessProfileKYC;
}

export interface BusinessProfileKYC {
    CIN?: string;
    GST: string;
    PAN: string;
}

export interface BusinessProfiles {
    UNVERIFIED: BusinessProfile[];
    VERIFIED: BusinessProfile[];
}

export interface BusinessProfile {
    id: string;
    name: string;
    logoUrl: string;
    color?: string;
}
