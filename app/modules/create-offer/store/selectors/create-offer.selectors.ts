import { OfferAddress } from '@gintaa/core/models';
import { MediaTypes, UploadResponse } from '@gintaa/shared/models/media';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CREATE_OFFER_IMAGE_TYPE, CREATE_OFFER_TYPE } from '../../configs/create-offer.config';
import { CreateOfferInfoState } from '../models/create-offer';

const getCoverImageLogos = (images: UploadResponse[]) => {
    let imageLogos = [];
    let coverImage = null;
    if (images && images.length) {
        coverImage = images.find(image => image.viewType === CREATE_OFFER_IMAGE_TYPE.COVER.toLowerCase())
        imageLogos = coverImage ? coverImage.imageLogos : [];
    }
}

export const selectCreateOfferState =
    createFeatureSelector<CreateOfferInfoState>("createOfferState");

export const selectOfferInfo = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.offer || null
);

export const selectOfferSectionoggles = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.sectionToggles || null
);

export const selectOfferOtherTabs = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.showOtherTabs || null
);

export const selectCurrentActiveSection = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.currentActiveSection || null
);

export const selectSelectedTags = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => {
        return {
            selectedTags: userOffer.offer.selectedTags || null,
            selectedFacets: userOffer.offer.facets || null
        }
    }
);

export const selectedFacets = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.offer.facets || []
);

export const selectAllTags = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.offer.tags || []
);

export const selectOfferError = createSelector(
    selectCreateOfferState,
    (userOffer: CreateOfferInfoState) => userOffer.errorMessage || null
);

export const selectOfferType = createSelector(
    selectOfferInfo,
    offer => offer.offerType || CREATE_OFFER_TYPE.ITEM
);

export const isDraftOffer = createSelector(
    selectOfferInfo,
    offer => offer.draftOfferId || null
);

// export const isPublishedOffer = createSelector(
//     selectOfferInfo,
//     offer => offer.offerId || null
// );

// export const selectOfferAddtionalPageInfo = createSelector(
//     selectOfferInfo,
//     offer => {
//         return {
//             exchangeMode: offer.exchangeMode,
//             desire: {
//                 ...offer.desire,
//                 amount: offer.desire ? offer.desire.amount : null,
//                 categoryId: offer.desireCategory ? offer.desireCategory.categoryId : null,
//                 description: offer.desire ? offer.desire.description : null,
//                 desireType: offer.desire ? offer.desire.desireType : null,
//                 tags: offer.desire ? offer.desire.tags : [],
//                 verticalId: offer.desireCategory ? offer.desireCategory.vertical.id : null
//             }
//         }
//     }
// );

// export const currentOfferScreen = createSelector(
//     selectCreateOfferState,
//     offer => offer.currentOfferScreen
// );

export const selectOfferImages = createSelector(
    selectOfferInfo,
    (offer: any) => offer ? offer.images : []
);

export const selectOfferVideos = createSelector(
    selectOfferInfo,
    (offer: any) => offer ? offer.videos : []
);

export const selectOfferDocuments = createSelector(
    selectOfferInfo,
    offer => offer ? offer.documents : []
);

export const selectCoverImage = createSelector(
    selectOfferImages,
    (images: UploadResponse[]) => images && images.length ? images.filter(image => image.cover) : []
);

export const selectOfferMedias = createSelector(
    selectOfferImages,
    selectOfferVideos,
    (images: UploadResponse[] = [], videos: UploadResponse[] = []) => {
        images = images.length ? images.map(image => ({ ...image, mediaType: MediaTypes.IMAGE })) : [];
        videos = videos.length ? videos.map(video => ({ ...video, mediaType: MediaTypes.VIDEO })) : [];
        return [...images, ...videos];
        // let sortImages = [];
        // const sortImages = images;
        //if (!!images.length) {
            //images = images.map(image => ({ ...image, mediaType: MediaTypes.IMAGE }));
            //sortImages = images.filter(image => image.cover === true);
        //}
        // if (!sortImages.length && !!images.length) {
        //     let newImages = [...images];
        //     newImages[0] = { ...newImages[0], cover: true };
        //     sortImages = [newImages[0]];
        //     images = [...newImages];
        // }
        // if (!!sortImages.length) {
        //     sortImages = [...sortImages, ...images.filter(image => image.cover === false)];
        // }
        // console.log('Images after sort:::', sortImages);
        // if (images && videos && videos.length) {
        //     videos = videos.map(video => ({ ...video, mediaType: MediaTypes.VIDEO }));
        //     return [...images, ...videos]
        // } else if (images) {
        //     return [...images]
        // } else if (videos && videos.length) {
        //     videos = videos.map(video => ({ ...video, mediaType: MediaTypes.VIDEO }));
        //     return [...videos]
        // } else {
        //     return []
        // }
    }
);

export const selectedTagRequestInfo = createSelector(
    selectOfferInfo,
    offer => {
        if (offer && offer.images) {
            let coverImage = offer.images && offer.images.find(image => image.cover)
            let imageLogos = coverImage ? coverImage.imageLogos : [];
            return {
                categoryId: offer.category && offer.category.categoryId,
                text: offer.description,
                logo: [...imageLogos]
            }
        }
    }
);

export const selectOfferState = createSelector(
    selectCreateOfferState,
    offerState => {
        return {
            loading: offerState.loading,
            successMessage: offerState.successMessage,
            errorMessage: offerState.errorMessage,
            imageUploadFailed: offerState.imageUploadFailed,
            imageDeleteFailed: offerState.imageDeleteFailed,
        }
    }
);

export const allAddressSelector = createSelector(
    selectCreateOfferState,
    offer => offer.allAddress || []
);

export const allBusinessAddressSelector = createSelector(
    selectCreateOfferState,
    offer => offer.currentBusinessDetails?.businessAddresses || []
);

export const allCountrySelector = createSelector(
    selectCreateOfferState,
    offer => offer.allCountryLists || []
);

export const allVerticalCategorySelector = createSelector(
    selectCreateOfferState,
    offer => offer.allVerticalCategories || []
);

export const selectInitiateOfferData = createSelector(
    allAddressSelector,
    allVerticalCategorySelector,
    (allAddress: OfferAddress[], categories: any[]) => {
        // return (!!allAddress && !!allAddress.length) || (!!categories && !!categories.length);
        return !!categories && !!categories.length;
    }
);

export const currentAddressSelector = createSelector(
    selectCreateOfferState,
    offer => offer.currentAdress
);

export const addAddressModalSelector = createSelector(
    selectCreateOfferState,
    offer => offer.closeOpenedModel
);

export const selectMediaUploadLoader = createSelector(
    selectCreateOfferState,
    offer => offer.mediaUpload
);

export const selectOfferUploadLoader = createSelector(
    selectCreateOfferState,
    offer => offer.offerSubmitProgress
);

export const selectOfferPostFailure = createSelector(
    selectCreateOfferState,
    offer => offer.offerPostFailure
);

// export const addAddressModalSelector = createSelector(
//     selectCreateOfferState,
//     offer => offer.closeOpenedModel
// );

// export const currentAddressSelector = createSelector(
//     selectCreateOfferState,
//     offer => offer.currentAdress
// );

// export const allAddressSelector = createSelector(
//     selectCreateOfferState,
//     offer => offer.allAddress || []
// );

// export const allVerticalCategorySelector = createSelector(
//     selectCreateOfferState,
//     offer => offer.allVerticalCategories || []
// );

// export const selectInitiateOfferData = createSelector(
//     allAddressSelector,
//     allVerticalCategorySelector,
//     (allAddress: OfferAddress[], categories: any[]) => {
//        // return (!!allAddress && !!allAddress.length) || (!!categories && !!categories.length);
//        return !!categories && !!categories.length;
//     }
// );

// export const submitOfferInfo = createSelector(
//     selectOfferInfo,
//     allAddressSelector,
//     (offer: Offer, addresses: OfferAddress[]) => {
//         console.log('offer:::', offer);
//         console.log('addresses:::', addresses); 
//         if(addresses.length && offer.location) {
//             const address: AddressResponse = offer.location.addressLine ? 
//               addresses.find(address => address.id === offer.location.addressLine).value 
//             : addresses.find(address => address.id === offer.location).value;
//             console.log('address:::', address); 
//             return {
//                 ...offer,
//                 location: address,
//                 desire: {
//                     ...offer.desire,
//                     categoryId: offer.desireCategory && offer.desireCategory.categoryId || null,
//                     verticalId: offer.desireCategory && offer.desireCategory.vertical.id || null
//                 }
//             }
//         }  else {
//             return {
//                 ...offer
//             }
//         }    

//     }
// );
