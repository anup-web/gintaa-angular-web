import { DealDetailsOffer } from "@gintaa/modules/deal-new/models/deal.model";

export enum ChatTypeEnums {
    offer = 'offer',
    deal = 'deal'
}

export const chatFileSaveFolderName = 'chats/'

export enum ChatMessageTypeEnums {
    HTML = 'HTML',
    AUDIO = 'AUDIO',
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    OFFER = 'OFFER',
    FILE = 'FILE',
    BLOCK_UNBLOCK = 'BLOCK_UNBLOCK',
    AUDIO_RECORDING = 'AUDIO_RECORDING'
}

export enum ChatCurrentTabEnums {
   OFFER = 'offer',
   DEAL = 'deal'
}

export enum FirebaseFunctions {
    setUserOnlineStatus = 'setStatus'
}

export enum UserOnlineStatus {
    offline = 'offline',
    online = 'online'
}

export const chatCollectionObj = {
    offer: {
       collectionName: 'tradingChatOffers',
       roomCollectionName: 'rooms',
       meesageCollectionName: 'messages'
    },
    deal: {
        collectionName: 'tradingChatDeals',
        roomCollectionName: 'rooms',
        meesageCollectionName: 'messages'
    },
    userOnlineStatus: {
        collectionName: 'status'
    }
}

interface dealOffer {
    images: [
        {
            displayIndex: string
            id: number,
            name: string,
            orgName: string,
            url: string
        }
    ]
    offerCount: number,
    offerId: string,
    offerName: string,
    offerType: string,
}


export interface chatOngoingOfferCommunication {
    id?:string,
    offerDetails: {
        offerId: string,
        offerName: string,
        offerImage: any,
    },
    offerOwnerDetails:{
        identityId: string,
        name: string,
        imageUrl: string
    },
    participants: Array<string>,
    participantBusinessIds: Array<string>,
    createdAt: string,
    totalUnReadMsgCount?: number,
    lastMessage?: string;
    lastMessageTime?: string
    fromName?: string,
    status?: UserOnlineStatus,
    lastMessageSenderIsLoginUser?: boolean,
    lastMessageIsSent?: boolean,
    lastMessageIsDelivered?: boolean,
    lastMessageIsRead?: boolean,
}

export interface chatOfferRoom {
    id?: string;
    offerId: string,
    offerOwnerDetails: {
        identityId: string,
        name: string,
        imageUrl: string
    },
    chatInitiatorDetails: {
        identityId: string,
        name: string,
        imageUrl: string
    },
    isMuted: boolean,
    isBlocked: boolean,
    blockedUserId?: string,
    createdAt: string,
    totalUnReadMsgCount?: number,
    fromName?: string,
    lastMessage?: string;
    lastMessageTime?: string,
    status?: UserOnlineStatus
    lastMessageSenderIsLoginUser?: boolean,
    lastMessageIsSent?: boolean,
    lastMessageIsDelivered?: boolean,
    lastMessageIsRead?: boolean,
}

export interface chatMsgReplyObj {
    orgMsgId: string,
    senderId: string,
    senderName: string,
    messageBody: string,
    messageType: string,
    messageAttr: {
        [key: string]: any
    },
}
export interface chatOfferMessage {
    id?: string,
    roomId: string,
    offerId: string,
    senderId: string,
    recipientId: string,
    messageBody: string,
    messageType: string,
    messageAttr: {
        [key: string]: any
    },
    messageTime: string,
    isSent: boolean,
    isDelivered: boolean,
    isRead: boolean,
    isReply?: boolean,
    replyObj?: chatMsgReplyObj,
    clearedBy: [],
    deletedForMe: []
}

export interface chatDealMessage {
    id?: string,
    roomId: string,
    dealId: string,
    senderId: string,
    recipientId: string,
    messageBody: string,
    messageType: string,
    messageAttr: {
        [key: string]: any
    },
    messageTime: string,
    isSent: boolean,
    isDelivered: boolean,
    isRead: boolean,
    isReply?: boolean,
    replyObj?: chatMsgReplyObj,
    clearedBy: [],
    deletedForMe: []
}



export interface chatOngoingDealCommunication {
    id?:string,
    sender: {
        identityId: string,
        name: string,
        imageUrl: string,
        id?: string
    },
    receiver: {
        identityId: string,
        name: string,
        imageUrl: string,
        id?: string
    },
    participants: Array<string>,
    participantBusinessIds: Array<string>,
    offeredOffers: Array<DealDetailsOffer>,
    offeredAmount: number,
    requestedOffers:  Array<DealDetailsOffer>,
    requestedAmount: number,
    createdAt: string,
    totalUnReadMsgCount?: number,
    lastMessage?: string;
    lastMessageTime?: string
    fromName?: string,
    status?: UserOnlineStatus,
    lastMessageSenderIsLoginUser?: boolean,
    lastMessageIsSent?: boolean,
    lastMessageIsDelivered?: boolean,
    lastMessageIsRead?: boolean,
}

export interface chatDealRoom {
    id?: string;
    dealId: string,
    chatInitiatorDetails: {
        identityId: string,
        name: string,
        imageUrl: string
    },
    chatReceiverDetails: {
        identityId: string,
        name: string,
        imageUrl: string
    },
    dealReceiverDetails: {
        identityId: string,
        name: string,
        imageUrl: string
    },
    isMuted: boolean,
    isBlocked: boolean,
    blockedUserId?: string,
    createdAt: string,
    totalUnReadMsgCount?: number,
    fromName?: string,
    lastMessage?: string,
    lastMessageTime?: string,
    status?: UserOnlineStatus;
    lastMessageSenderIsLoginUser?: boolean,
    lastMessageIsSent?: boolean,
    lastMessageIsDelivered?: boolean,
    lastMessageIsRead?: boolean,
}

