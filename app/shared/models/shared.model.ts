
export interface CurrentLocation {
    available?: boolean;
    _lat: string;
    _lng: string;
    title?: string;
}

export interface ProfileIncomplete {
    openModalVal?: string;
    source?: string;
    fields?: string[];
    emailTransactionId?: string;
    mobileTransactionId?: string;
    email?: string;
    phone?: string;
    chatOwner?: boolean;
}

export class NotificationVerification {
    identifier: string;
    identifierType?: string;
    verificationIdentifierType?: string;
}
