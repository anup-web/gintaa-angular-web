import { AddressResponse } from "@gintaa/core/models";
import { Category } from "@gintaa/core/models/Category";
import { AvailableDay } from "@gintaa/modules/create-offer/store/models/user-offer-info";
import { UploadResponse } from "@gintaa/shared/models/media";
import { CURRENT_AUCTION_MODAL } from "../store/offer-comments/offer-comment.action-types";

export interface Offer {
  offerId?: string;
  draftOfferId?: string;
  seOId?: string;
  name?: string;
  description?: string;
  desire?: OfferDesire;
  businessOffer?: boolean;
  business?: any;
  auctioned?: boolean;
  auctionResponseInfo?: any;
  exchangeMode?: string;
  ratePerHour?: string;
  fixedRate?: string;
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
  selectedOffer?:boolean;
  selectedQuantity?: number;
  serviceTimingInfos?: AvailableDay[];
  publishedDate: any;
  showAddToOrder?: any;
  favourite?: boolean;
  hidden?: boolean;
  offerStage?: string;
  createdDate?: string;
  myLocation?: boolean;
  yourLocation?: boolean;
  remote?: boolean;
  image?: UploadResponse;
  serviceTimeSameForAllDays?: boolean;
  oid?:string;
  negotiable?:boolean;
  dimension?:any;
  dimensions?:any;
  price?:any;
  auctionInfo?:any;
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
    imageUrl?: any;
}

export interface OfferAuction {
  currentAuctionModal: CURRENT_AUCTION_MODAL;
  successMessage: string;
  errorMessage: any;
  loading: boolean;
}

export interface ServiceDays {
  prefix: string;
  dayOfWeek: string;
}
