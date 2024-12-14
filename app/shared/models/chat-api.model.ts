export class ChatConnectModal {
    senderId: string;
    senderName: string;
    recipientId: string;
    roomId: string;
    offerId: string;
    dealId: string;
    offerOwnerId: string;
    isOfferOwner: boolean;
    isDealReceiver: boolean;
    receipentName: string;
    receipentImage: string;
}

export interface ChatInitialConfigModal {
    roomId: string;
    roomDisplayName: string;
    ownerId: string;
    ownerDisplayName: string;
    ownerDisplayImage: string;
    offerId: string;
    initiatorId: string;
    initiatorDisplayName: string;
}

// export class Chat {
//     connect: ChatConnectModal;
//     messages: ChatMessageHistoryModal;
// }

export class ChatMessageHistoryModal {
    senderId : string;
    offerId : string;
    recipientId : string;
    roomId : string;
    messageId : string;
    messageType: string;
    messageSubject: string;
    messageAttr: string;
    messageBody: string;
    readFlag: boolean;
    delivered: boolean;
    deleted: boolean;
    edited: boolean;
    replyMessageId: string;
    forwardedId: string;
    originForwardedMessageId: string;
    anyDealInitiated: false;
    dealReference: string;
    creationTime: string;
}