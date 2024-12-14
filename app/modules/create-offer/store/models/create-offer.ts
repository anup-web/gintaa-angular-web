import { CurrentLocation } from "@gintaa/shared/models/shared.model";
import { AddressResponse, OfferAddress } from '@gintaa/core/models';
import { UserOfferInfo } from "./user-offer-info";
import { Country, Offer } from "@gintaa/shared/models/offer";

export interface CreateOfferState {
    loading: boolean;
    mediaLoading: boolean;
    currentOfferScreen: string;
    offer: UserOfferInfo;
    currentLocation: CurrentLocation;
    currentAdress: AddressResponse;
    allAddress: OfferAddress[];
    allVerticalCategories: any[];
    closeOpenedModel: boolean;
    successMessage: string;
    errorMessage: string;
    addAddressStatus: string;
    selectedCategoryTags: any[];
}

export interface CreateOfferInfoState {
    offer: Offer;
    createOfferDirty: boolean;
    loading: boolean;
    mediaUpload: boolean;
    offerSubmitProgress?: boolean;
    imageUploadFailed: boolean;
    imageDeleteFailed: boolean;
    successMessage: string;
    errorMessage: string;
    offerPostFailure: boolean;
    allVerticalCategories: any[];
    currentAdress: any;
    currentBusinessDetails: any;
    allAddress: any[];
    allCountryLists: Country[];
    selectedCategoryTags: any[];
    currentLocation: any;
    closeOpenedModel: boolean;
    sectionToggles: CreateOfferSectionToggles;
    showOtherTabs: ShowOtherOfferTabs;
    currentActiveSection: string;
}

export interface ShowOtherOfferTabs {
    ITEM: boolean;
    SERVICE: boolean;
    AUCTION: boolean;
}

export interface CreateOfferSectionToggles {
    sectionUploadImages: boolean,
    sectionAccordionOne: boolean,
    sectionAccordionOneButtonNext: boolean,
    sectionAccordionTwo: boolean,
    sectionAccordionTwoButtonPrev: boolean,
    sectionAccordionTwoButtonNext: boolean,
    sectionAccordionThree: boolean,
    sectionAccordionThreeButtonPrev: boolean,
    sectionAccordionThreeButtonNext: boolean,
    sectionUploadDocuments: boolean,
    sectionPostOfferButton: boolean
}
