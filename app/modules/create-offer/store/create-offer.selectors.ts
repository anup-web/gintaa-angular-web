import { AddressResponse, OfferAddress } from '@gintaa/core/models';
import { UploadResponse } from '@gintaa/shared/models/media';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CREATE_OFFER_TYPE } from '../configs/create-offer.config';
import { CreateOfferState } from './models/create-offer';
import { UserOfferInfo } from './models/user-offer-info';

export const selectCreateOfferState =
    createFeatureSelector<CreateOfferState>("createOffer");

export const selectOfferInfo = createSelector(
    selectCreateOfferState,
    userOffer => userOffer.offer || null
);

export const selectOfferError = createSelector(
    selectCreateOfferState,
    userOffer => userOffer.errorMessage || null
);

export const selectOfferType = createSelector(
    selectOfferInfo,
    offer => offer.offerType || CREATE_OFFER_TYPE.ITEM
);

export const isDraftOffer = createSelector(
    selectOfferInfo,
    offer => offer.draftOfferId || null
);

export const isPublishedOffer = createSelector(
    selectOfferInfo,
    offer => offer.offerId || null
);

export const selectOfferAddtionalPageInfo = createSelector(
    selectOfferInfo,
    offer => {
        return {
            exchangeMode: offer.exchangeMode,
            desire: {
                ...offer.desire,
                amount: offer.desire ? offer.desire.amount : null,
                categoryId: offer.desireCategory ? offer.desireCategory.categoryId : null,
                description: offer.desire ? offer.desire.description : null,
                desireType: offer.desire ? offer.desire.desireType : null,
                tags: offer.desire ? offer.desire.tags : [],
                verticalId: offer.desireCategory ? offer.desireCategory.vertical.id : null
            }
        }
    }
);

export const currentOfferScreen = createSelector(
    selectCreateOfferState,
    offer => offer.currentOfferScreen
);

export const selectOfferImages = createSelector(
    selectOfferInfo,
    offer => offer ? offer.images : []
);

export const selectOfferVideos = createSelector(
    selectOfferInfo,
    offer => offer ? offer.videos : []
);

export const selectOfferDocuments = createSelector(
    selectOfferInfo,
    offer => offer ? offer.documents : []
);

export const selectOfferMedias = createSelector(
    selectOfferImages,
    selectOfferVideos,
    (images: UploadResponse[], videos: UploadResponse[]) => {
        // console.log('Images:::', images);
        // console.log('Videos:::', videos);
        let sortImages = [];
        // const sortImages = images;
        if (!!images.length) {
            sortImages = images.filter(image => image.cover === true);
        }
        if (!sortImages.length && !!images.length) {
            let newImages = [...images];
            newImages[0] = { ...newImages[0], cover: true };
            sortImages = [newImages[0]];
            images = [...newImages];
        }
        if (!!sortImages.length) {
            sortImages = [...sortImages, ...images.filter(image => image.cover === false)];
        }
        // console.log('Images after sort:::', sortImages);
        if (sortImages && videos && videos.length) {
            return [...sortImages, ...videos]
        } else if (sortImages) {
            return [...sortImages]
        } else if (videos && videos.length) {
            return [...videos]
        } else {
            return []
        }
    }
)

export const selectOfferState = createSelector(
    selectCreateOfferState,
    offerState => {
        return {
            loading: offerState.loading,
            successMessage: offerState.successMessage,
            errorMessage: offerState.errorMessage
        }
    }

);

export const addAddressModalSelector = createSelector(
    selectCreateOfferState,
    offer => offer.closeOpenedModel
);

export const currentAddressSelector = createSelector(
    selectCreateOfferState,
    offer => offer.currentAdress
);

export const allAddressSelector = createSelector(
    selectCreateOfferState,
    offer => offer.allAddress || []
);

export const allVerticalCategorySelector = createSelector(
    selectCreateOfferState,
    offer => offer.allVerticalCategories || []
);

export const allSelectedCategoryTagsSelector = createSelector(
    selectCreateOfferState,
    offer => offer.selectedCategoryTags || []
);

export const selectInitiateOfferData = createSelector(
    allAddressSelector,
    allVerticalCategorySelector,
    (allAddress: OfferAddress[], categories: any[]) => {
        // return (!!allAddress && !!allAddress.length) || (!!categories && !!categories.length);
        return !!categories && !!categories.length;
    }
);

export const submitOfferInfo = createSelector(
    selectOfferInfo,
    allAddressSelector,
    (offer: UserOfferInfo, addresses: OfferAddress[]) => {
        // console.log('offer:::', offer);
        // console.log('addresses:::', addresses);
        if (addresses.length && offer.location) {
            const address: AddressResponse = offer.location.addressLine ?
                addresses.find(address => address.id === offer.location.addressLine).value
                : addresses.find(address => address.id === offer.location).value;
            // console.log('address:::', address);
            return {
                ...offer,
                location: address,
                desire: {
                    ...offer.desire,
                    categoryId: offer.desireCategory && offer.desireCategory.categoryId || null,
                    verticalId: offer.desireCategory && offer.desireCategory.vertical.id || null
                }
            }
        } else {
            return {
                ...offer
            }
        }

    }
);
