import { AddressResponse } from "@gintaa/core/models";
import { Category } from "@gintaa/core/models/Category";
import { UploadResponse } from "@gintaa/shared/models/media";


export interface DealStateCategories {
    accepted: any[];
    incoming: any[];
    outgoing: any[];
    closed: any[];
    rejected: any[];
    violated: any[];
    revised: any[];
    partial_closed: any[];
    abandoned: any[];
    reported: any[]
    all: any[]
}

export interface DealConfigOptions {
    lastFetchedOn: number;
    dirty: boolean;
    forceUpdate: boolean;
}

export interface DealConfig {
    accepted: DealConfigOptions;
    incoming: DealConfigOptions;
    outgoing: DealConfigOptions;
    closed: DealConfigOptions;
    rejected: DealConfigOptions;
    violated: DealConfigOptions;
    revised: DealConfigOptions;
    partial_closed: DealConfigOptions;
    abandoned: DealConfigOptions;
    reported: DealConfigOptions;
    all: DealConfigOptions;
    
}

export enum DealAvailableTabs {
    DEAL_ACCEPTED = 'accepted',
    DEAL_INCOMING = 'incoming',
    DEAL_OUTGOING = 'outgoing',
    DEAL_CLOSED = 'closed',
    DEAL_REJECTED = 'rejected',
    DEAL_VIOLATED = 'violated',
    DEAL_REVISED = 'revised',
    PARTIAL_CLOSED = 'partial_closed',
    DEAL_ABANDONED = 'abandoned',
    DEAL_REPORTED = 'reported',
    DEAL_ALL = 'all'
}

export interface DealState {
    loading: boolean;
    dealAddStatus: string,
    successMessage: string;
    errorMessage: string;
    dealDetailsAuthError: string;
    defaultOption: DealAvailableTabs;
    currentOption: any;
    maxWaitUntil: number;
    config: DealConfig;
    myDeals: DealStateCategories;
    initiateDeal:any;
    lastFetchedDealDetails: DealDetailsFormat;
    lastFetchedDealSnapshot: DealSnapshot[];
    lastFetchedDealHistory: DealHistory;
    lastFetchedDealThirdParty: any;
    closeDealModelType:string;
    navigateTodealList: boolean;
    closeStep:string;
    ratingQuestions:[];
    isRated: boolean;
    lastFetchedDealRating: any;
    otpPayload: any;
}

export interface FetchDealRequestObject {
    status: string;
    page: number;
    size: number;
    type: string;
    startDate?: string;
    endDate?: string;
    sortBy?:string;
}

export interface DealStateData {
    sourcePage: string;
    status: string;
    dealId?: string;
}

export interface DealDialogState {
    dealInitiated: boolean;
}

export interface DealInjectOffer {
    offerId: string;
    offerType: string;
    quantity: number;
    name: string;
    image: string;
    description: string;
    selected?: boolean;
    selectedCount?: number;
}

export interface DealCurrentUserInfo {
    name: string;
    image: string;
    id: string;
    isOnline: boolean;
}

export interface InjectDialogData {
    user: {
      name: string,
      image: string,
      id: string,
      isOnline: boolean
    };
    myOffers: DealInjectOffer[];
    currentOffer: DealInjectOffer;
    dealId?: string;
}

export interface InitiateDealRequestObject {
    amountCurrency?: string;
    deliveryMethodId?: string;
    comments?: string;
    dealRefNo?: string;
    destinationOfferDetails?: Array<any>;
    dropToGintaaJunction?: boolean;
    expiryDate?: string;
    gintaaJunctionId?: string;
    meetingDate?: string;
    meetingStartTime?: string;
    meetingEndTime?: string;
    includeInsurance?: boolean;
    includeShipping?: boolean;
    requestedAmount?: number;
    updateCounter?:number;
    sourceOfferDetails: Array<any>;
    requestedAmountPaidByInitiatingUser?: boolean;
    doorStepDeliveryInfo?: any
}

export interface DealResponseErrorObj {
    showError: boolean;
    code: number;
    message: string;
    success: boolean;
    payload?: Array<any> | any;
}

export interface DealUpdateReqFormat {
    comments?: string;
    dealRefId: string;
}

export interface DealDetailsOfferImage {
    displayIndex: string;
    id: string;
    name: string;
    orgName: string;
    url: string;
}

export interface DealDetailsOffer {
    images: DealDetailsOfferImage[];
    offerCount: number;
    offerId: string;
    offerName: string;
    offerType: string;
}

interface GintaaJunctionContactInfo {
    phoneNumbers: string[];
}

interface JunctionDetailsView {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    openTime: string;
    closeTime: string;
    contactInformation?: GintaaJunctionContactInfo;
    currentState?: string;
    imageURLs?: string[];
    [key: string]: any;
}

export interface DealDetailsFormat {
    amountCurrency?: string;
    callerIsReceiver?: boolean;
    comments?: string;
    dealRefId: string;
    dealSentTimeStamp: string;
    dealStatus: {
        dealStatus: string,
        dealStatusDesc: string
    };
    partiallyClosedBy?: string;
    dropToGintaaJunction?: boolean;
    includeInsurance?: boolean;
    includeShipping?: boolean;
    junctionDetailsView?: JunctionDetailsView;
    junctionView?: JunctionDetailsView; // DUPLICATE as backend changed the format later
    meetingDate?: string;
    meetingEndTime?: string;
    meetingStartTime?: string;
    offeredOffers?: DealDetailsOffer[];
    receiver: {
        imageUrl: string,
        name: string,
        id?: string
    };
    requestedAmount?: number;
    requestedOffers?: DealDetailsOffer[];
    sender: {
        imageUrl: string,
        name: string,
        id?: string
    };
    expiryDatetime?: string;
    requestedUpdate?: boolean;
    requestedUpdateComment?: string;
    defaultDeliveryOption?: {
        doorStepDelivery: boolean,
        gintaJunction: boolean,
        selfPickup: boolean,
    };
    offeredAmount?: number;
    dealDeliveryMethod?: {
        id: string,
        name: string,
        description: string,
    };
    performedBy?:{
        id: string,
        name: string,
        imageUrl: string,
    };
    requestedAmountPaidByInitiatingUser?: boolean;
    updateCounter?: number
    dealRatedByReceiver?: boolean;
    dealRatedBySender?: boolean;
    dealReceiverRating?: boolean;
    dealSenderRating?: boolean;
    triggeredByUserId?: string;
    initiatorBoxDimension?: string;
    initiatorPickupAddress?:any;
    initiatorDeliveryAddress?: any;
    dealValue?:any;
    initiatorShippingAmount?:any;
    insuranceAmount?:any;
    initiatorCourierId?:any;
    initiatorCourierName?:any;
    initiatorPaidAmount?:any;
    receivingBusinessInfo?:any;
    sendingBusinessInfo?:any;
    paymentInProgress?:any
}

export interface DealSnapshotTransaction {
    status: string;
    datetime: string;
    amount: number;
    comments?: string;
}

export interface DealSnapshot {
    dealRefId: string;
    sender: string;
    receiver: string;
    junctionDetails?: Array<any>;
    dealCreationTimestamp: string;
    transactionStates: DealSnapshotTransaction[];
}

export interface DealHistory {
    dealRefId: string;
    sender: any;
    receiver: any;
    performedBy: any;
    dealStatus: any;
    requestedOffers: any;
    offeredOffers: any;
    dealSentTimeStamp: string,
    callerIsReceiver: boolean,
    expiryDatetime: string,
    amountCurrency: string,
    requestedAmount: number,
    requestedAmountPaidByInitiatingUser: boolean,
    includeInsurance: boolean,
    dealDeliveryMethod: any,
    junctionView: string,
    comments: string,
    dealValue: number,
    dealRevisions:any
}

export interface GintaaJunction {
    id: string;
    name: string;
    address: string;
    imageUrl: string; // need to remove
    imageURLs?: string[];
    latitude: any;
    longitude: any;
    contactInformation?: GintaaJunctionContactInfo;
    openTime?: string;
    closeTime?: string;
    currentState?: string;
    distance?: any;
    [key: string]: any;
}

export interface DealResponseHttp {
    success?: boolean;
    code?: number;
    message?: string;
    payload?: any;
    error?: any;
    [key: string]: any;
}

export interface CurrentLocation {
    available?: boolean;
    _lat: string;
    _lng: string;
}

export interface AGMMapMarker {
    id?: string;
    lat: string;
    lng: string;
    label: string;
    draggable?: boolean;
    name?: string;
}

export interface Offer {
  offerId?: string;
  draftOfferId?: string;
  seOId?: string;
  name?: string;
  description?: string;
  desire?: OfferDesire;
  auctioned?: boolean;
  auctionResponseInfo?: string;
  exchangeMode?: string;
  location?: AddressResponse;
  offerType: string;
  category?: Category;
  totalOfferValuation?: string;
  unitOfferValuation?: string;
  images?: UploadResponse[];
  videos?: UploadResponse[];
  documents?: UploadResponse[];
  condition?: string;
  hiddenPeriod?: string;
  activeSince?: string;
  facets?: any[];
  user?: OfferUser;
  currentUserOfferOwner?: boolean;
  chatCount: boolean;
  dealCount: boolean;
  quantity?: number;
  itemCondition?: string;
  conditionType?: string;
  offervalue?: string;
  availableDays?: string[];
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}

export interface OfferDesire {
    description: string;
    desireType: string;
    tags: string;
    vertical: string;
    category: string;
    amount: number;
  }
  
  export interface OfferUser {
      profileId?: string;
      identityId?: string;
      fName?: string;
      lName?: string;
      name: string;
      averageRating?: number;
  }
