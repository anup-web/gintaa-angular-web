import { UploadResponse } from "@gintaa/shared/models/media";


export class UserOfferInfo {
  offerType: string;
  draftOfferId?: string;
  draftId?: string = null;
  offerId?: string;
  name?: string;
  totalOfferValuation?: string;
  unitOfferValuation?: string;
  description?: string;
  itemCondition?: string;
  desire?: OfferDesire;
  exchangeMode?: string;
  ratePerHour?: string;
  auctioned?: boolean;
  auctionResponseInfo?: any;
  fixedRate?: string;
  quantity?: number;
  condition?: string;
  images?: UploadResponse[];
  videos?: UploadResponse[];
  documents?: UploadResponse[];
  location?: any;
  offervalue?: string;
  category?: any;
  facets?: any[];
  serviceTimingInfos?: AvailableDay[];
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  seOId?: string;
  remote?: boolean;
  yourLocation?: boolean;
  myLocation?: boolean;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  offerStage?: string;
  serviceTimeSameForAllDays?: boolean;
  desireCategory?: any;
}

  export interface OfferDesire {
    amount: number;
    categoryId: string;
    description: string;
    desireType: string;
    tags: string[];
    verticalId: string;
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