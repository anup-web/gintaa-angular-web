export interface Offer {
    activeSince: string;
    auctionResponseInfo: any;
    auctioned: boolean;
    category: any;
    chatCount: number;
    condition: null;
    conditionType: string;
    currentUserOfferOwner: boolean;
    dealCount: number;
    description: string;
    desire: any;
    documents: Array<any>;
    exchangeMode: string;
    facets: any[];
    hiddenPeriod: null
    images: any[];
    itemCondition: string;
    location: any;
    name: string;
    offerId: string;
    offerType: string;
    offerStage: string;
    quantity: number;
    seOId: string;
    totalOfferValuation: number;
    unitOfferValuation: number;
    user: any;
    videos: any[];
    favourite?: boolean;
    draftOfferId?: string;
}
export interface MyOfferState {
    publishedOffers: Offer[],
}
export interface OfferInput {
    offerTypes?: string[],
    page?: number,
    offset?: number,
}