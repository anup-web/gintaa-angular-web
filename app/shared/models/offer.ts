import { UploadResponse } from "@gintaa/shared/models/media";
import { CURRENT_AUCTION_MODAL } from "../../modules/offer/store/offer-comments/offer-comment.action-types";

export class Offer {
  auctionInfo?: OfferAuctionObject;
  auctioned?: boolean;
  business?: any;
  businessOffer?: boolean;
  category?: any;
  categoryId?: string;
  createdBy?: string;
  createdDate?: string;
  deliveryMethod?: any;
  description?: string;
  desire?: OfferDesire;
  dimensions?: OfferDimensionType[]; // This is a business flag
  documents?: UploadResponse[];
  draftId?: string;
  draftOfferId?: string;
  exchangeMode?: string;
  facets?: any[];
  hsnCode?: string;
  images?: UploadResponse[];
  itemCondition?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  location?: any;
  offerType: string;
  offerId?: string;
  seOId?: string;
  name?: string;
  totalOfferValuation?: string;
  unitOfferValuation?: string;
  rate?: string;
  duration?: string;
  fixedRate?: string;
  quantity?: number;
  unit?: string;
  originCountry?: string;
  condition?: string;
  videos?: UploadResponse[];
  suggestedCategories? : any[];
  offervalue?: string;
  tags?: AvailableTags[];
  selectedTags?: any;
  serviceTimingInfos?: AvailableDay[];
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  end?: string;
  remote?: boolean;
  yourLocation?: boolean;
  myLocation?: boolean;
  offerStage?: string;
  serviceTimeSameForAllDays?: boolean;
  desireCategory?: any;
  price?: string; // selling price
  negotiable?: boolean; // Negotiable toggle 
  user?: OfferUser;
  favourite?: boolean;
  hidden?: boolean;  
  publishedDate?: any;  
  chatCount?: boolean;
  dealCount?: boolean;
  currentUserOfferOwner?: boolean;
  oid?: string;  
  selectedQuantity?: number;
  showAddToOrder?: any;  
  image?: UploadResponse;
  taxClass?: string; // This is a business flag
  sku?: string; // This is a business flag
  moq?: string; // This is a business flag
  productType?: string; // This is a business flag
  ecommerceFlow?:any;
}

export interface OfferDimensionType {
  breadth?: string;
  length?: string;
  height?: string;
  weight?: string;
  quantity?: number;
}
export interface OfferAuctionObject {
  basePrice?: any;
  buyOutPrice?: any;
  stepPrice?: any;
  endDate?: string;
  end?: string;
}
export interface OfferDesire {
  description?: string;
  desireType?: string;
  categoryId?: string;
  tags?: string[];
  vertical?: string;
  category?: any;
  amount?: number;
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

export interface AvailableDay {
  dayOfWeek: string;
  state: boolean;
  prefix: string;
  timingInfoList: AvailableTime[];
}

export class AvailableTime {
  startTime: string;
  endTime: string;  
  constructor(startTime: string, endTime: string) {
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export interface AvailableTags {
  name?: string;
  description?: string;  
  label?: string;
  mandatory?: boolean; 
  values?: string[];
  allowCompletionSearch?: boolean; 
  allowFullTextSearch?: boolean;
  tagId?: string; 
  selected?: boolean;
}

export interface Country {
  name: string;
  code: string;
}