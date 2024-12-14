export enum SupportedFireBaseClaims {
    // USER = 'USER',
    BUSINESS_USER = 'USER',
    BUSINESS_ADMIN = 'ADMIN',
    BUSINESS_OWNER = 'OWNER'
}

export const PermissionMatrix = {
    DELEGATE_OFFER: {
        USER: true,
        BUSINESS_USER: true,
        BUSINESS_ADMIN: true,
        BUSINESS_OWNER: true
    },
    BULK_OFFER_UPLOAD: {
        USER: true,
        BUSINESS_USER: true,
        BUSINESS_ADMIN: true,
        BUSINESS_OWNER: true
    }
}

export interface FirebaseBusinessClaims {
    businessId: string;
    businessRole: string;
    active: boolean;
    logo?: string;
    name?: string;
    color?: string;
    activated: boolean;
}

export interface MemberBusinessProfile {
    businessId: string;
    businessName: string;
    logoUrl: string;
    businessRole: SupportedFireBaseClaims;
    verified?: boolean;
}
