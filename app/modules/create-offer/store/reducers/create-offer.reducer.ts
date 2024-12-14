import { MediaActions, MediaTypes } from '@gintaa/shared/models/media';
import { Offer } from '@gintaa/shared/models/offer';
import { Action, createReducer, on } from '@ngrx/store';
import { CreateOfferActions } from '../action-types';
import { CreateOfferInfoState } from '../models/create-offer';

const INITIAL_SECTION_TOGGLE = {
  sectionUploadImages: true,
  sectionAccordionOne: false,
  sectionAccordionOneButtonNext: false,
  sectionAccordionTwo: false,
  sectionAccordionTwoButtonPrev: false,
  sectionAccordionTwoButtonNext: false,
  sectionAccordionThree: false,
  sectionAccordionThreeButtonPrev: false,
  sectionAccordionThreeButtonNext: false,
  sectionUploadDocuments: false,
  sectionPostOfferButton: false
}

const INITIAL_OFFER_TABS = {
  ITEM: true,
  SERVICE: true,
  AUCTION: true,
}

const INITIAL_STATE: CreateOfferInfoState = {
  offer: new Offer(),
  createOfferDirty: false,
  loading: false,
  mediaUpload: false,
  offerSubmitProgress: false,
  successMessage: null,
  errorMessage: null,
  offerPostFailure: false,
  imageUploadFailed: false,
  imageDeleteFailed: false,
  allVerticalCategories: [],
  currentAdress: null,
  currentBusinessDetails: null,
  allAddress: [],
  allCountryLists: [],
  selectedCategoryTags: [],
  currentLocation: null,
  closeOpenedModel: false,
  sectionToggles: INITIAL_SECTION_TOGGLE,
  showOtherTabs: INITIAL_OFFER_TABS,
  currentActiveSection: 'itemProductDetails'
};

const populateDescription = (mediaType: string, response: Offer): string => {  
  let description = response.description;
  if(mediaType === MediaTypes.IMAGE) {
    const coverImage = response.images.filter(image => image.cover)[0]
    if(coverImage) {
      const suggestedDesc = coverImage.imageObjects.join(",");
      description = description || suggestedDesc;
    }    
  }
  return description;
}

const _createOfferReducer = createReducer(
  INITIAL_STATE,
  on(
    CreateOfferActions.updateOfferMediaSuccess,
    (state, action) => {
      switch (action.actionType) {
        case MediaActions.DELETE:
          return {
            ...state,
            loading: false,
            successMessage: 'Offer Image Deleted Successfully',
            errorMessage: null,
            offer: {
              ...state.offer,
              images: action.mediaType === MediaTypes.IMAGE ?
                action.response.images.length && action.response.images.filter(image => image.id !== action.id)
                : state.offer.images,
              videos: action.mediaType === MediaTypes.VIDEO ?
                action.response.videos.length && action.response.videos.filter(video => video.id !== action.id) : state.offer.videos,
              documents: action.mediaType === MediaTypes.DOCUMENT ?
                action.response.documents.length && action.response.documents.filter(doc => doc.id !== action.id) : state.offer.documents,
            }
          }
        case MediaActions.UPDATE:
          return {
            ...state,
            loading: false,
            successMessage: 'Offer Updated Successfully',
            errorMessage: null,
            offer: {
              ...state.offer,
              // ...action.response,
              // description: populateDescription(action.mediaType, action.response),
              images: action.mediaType === MediaTypes.IMAGE ?
                action.response.images.map((file) => ({ ...file, mediaType: MediaTypes.IMAGE }))
                : state.offer.images,
              videos: action.mediaType === MediaTypes.VIDEO ? action.response.videos : state.offer.videos,
              documents: action.mediaType === MediaTypes.DOCUMENT ? action.response.documents : state.offer.documents,
            }
          }
        default: {
          return state;
        }
      }
    }
  ),

  on(
    CreateOfferActions.uploadOfferMediaProgress,
    (state, action) => ({
      ...state,
      loading: true
    })
  ),

  on(
    CreateOfferActions.uploadOfferProgress,
    (state) => ({
      ...state,
      loading: true,
      offerSubmitProgress: true
    })
  ),

  on(
    CreateOfferActions.uploadOfferMediaFailure,
    (state, action) => ({
      ...state,
      errorMessage: action.error,
      successMessage: null,
      imageUploadFailed: true,
      loading: false,
      mediaUpload: false,
    })
  ),

  on(
    CreateOfferActions.removeOfferMediaFailure,
    (state, action) => ({
      ...state,
      errorMessage: action.error,
      successMessage: null,
      imageDeleteFailed: true,
      loading: false,
      mediaUpload: false,
    })
  ),

  on(
    CreateOfferActions.unsetImageUploadFailed,
    (state) => ({
      ...state,
      errorMessage: null,
      imageUploadFailed: false,
      imageDeleteFailed: false
    })
  ),

  on(
    CreateOfferActions.updateTagsByCategoryIdSuccess,
    (state, { response }) => ({
      ...state,
      loading: false,
      successMessage: 'add category successfully',
      errorMessage: null,
      offer: {
        ...state.offer,
        tags: [...response]
      }
    })
  ),

  on(
    CreateOfferActions.selectedTagsByUserInfoSuccess,
    (state, { response }) => ({
      ...state,
      loading: false,
      successMessage: 'add selected tag successfully',
      errorMessage: null,
      offer: {
        ...state.offer,
        selectedTags: response,
        // commented as mandatory flag not coming in api response
        // facets: response.length ? [...state.offer.facets, ...response] : [...state.offer.facets]
        facets: [...state.offer.facets]
      }
    })
  ),

  on(
    CreateOfferActions.suggestedTagsByUpdateMediaSuccess,
    (state, { response }) => ({
      ...state,
      loading: false,
      successMessage: 'add category successfully',
      errorMessage: null,
      offer: {
        ...state.offer,
        suggestedCategories: response
      }
    })
  ),

  on(
    CreateOfferActions.clearOfferData,
    (state, action) => ({
      ...state,
      loading: false,
      //currentOfferScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE,
      offer: new Offer(),
      currentAdress: null,
      successMessage: null,
      errorMessage: null
    })
  ),

  on(
    CreateOfferActions.offerDraftDataSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        successMessage: 'Offer Data Draft successfully',
        errorMessage: null,
        offer: {
          ...state.offer,
          // category: action.response.category
          ...action.response
        }
      }
    }
  ),

  on(
    CreateOfferActions.offerCategoryDataSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        successMessage: 'Offer Data Draft successfully',
        errorMessage: null,
        offer: {
          ...state.offer,
          category: action.response.category
        }
      }
    }
  ),

  on(
    CreateOfferActions.offerFacetDataSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        successMessage: 'Offer Data Draft successfully',
        errorMessage: null,
        offer: {
          ...state.offer,
          facets: action.response.facets
        }
      }
    }
  ),

  on(
    CreateOfferActions.offerDesireDataSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        successMessage: 'Offer Data Draft successfully',
        errorMessage: null,
        offer: {
          ...state.offer,
          desire: {
            ...state.offer.desire,
            ...action.response.desire
          }
        }
      }
    }
  ),

  on(
    CreateOfferActions.offerDraftDataLocalUpdate,
    (state, action) => {
      let offerData = {};
      if (action.formGroupName) {
          offerData = {
            ...state.offer,
            [action.formGroupName]: {
              ...state.offer[action.formGroupName],
              [action.key]: action.value
            }
          }
      } else {
        offerData = {
          ...state.offer,
          [action.key]: action.value
        }
      }
      if (action.key === 'endDate') {
        offerData = {
          ...state.offer,
          [action.formGroupName]: {
            ...state.offer[action.formGroupName],
            endDate: action.value,
            end: action.value
          }
        }
      }
      return {
        ...state,
        createOfferDirty: false,
        offer: offerData
      }
    }
  ),

  on(
    CreateOfferActions.offerDraftServiceLocationLocalUpdate,
    (state, action) => {
      return {
        ...state,
        createOfferDirty: false,
        offer: {
          ...state.offer,
          myLocation: action.myLocation,
          yourLocation: action.yourLocation,
        },
      }
    }
  ),

  on(
    CreateOfferActions.offerDraftDataLocalUpdateServiceTiming,
    (state, action) => {
      return {
        ...state,
        createOfferDirty: false,
        offer: {
          ...state.offer,
          serviceTimingInfos: action.serviceTimingInfos,
          serviceTimeSameForAllDays: action.serviceTimeSameForAllDays,
        },
      }
    }
  ),

  on(
    CreateOfferActions.offerDraftDataFailure,
    (state, action) => ({
      ...state,
      errorMessage: action.error,
      successMessage: null,
      loading: false
    })
  ),

  on(
    CreateOfferActions.addUserAddressSuccess,
    (state, action) => ({
      ...state,
      allAddress: state.allAddress.concat({
        id: action.address && action.address.addressLine,
        value: action.address
      }),
      offer: {
        ...state.offer,
        location: action.address
      },
      successMessage: 'Offer Address Added Successfully',
      closeOpenedModel: true,
      errorMessage: null,
    })
  ),

  on(
    CreateOfferActions.addUserAddressFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      closeOpenedModel: false,
      errorMessage: action.error,
      // addEditAddressStatus: 'failed'
    })
  ),

  on(
    CreateOfferActions.resetAddressModelOpenState,
    (state, action) => ({
      ...state,
      successMessage: null,
      closeOpenedModel: false,
      errorMessage: null,
      currentAdress: null
      // addEditAddressStatus: 'failed'
    })
  ),

  on(
    CreateOfferActions.setAllTags,
    (state, {tags}) => ({
      ...state,
      tags
    })
  ),

  on(
    CreateOfferActions.setSelectedFacets,
    (state, {facets, selectedTags }) => ({
      ...state,
      offer: {
        ...state.offer,
        facets,
        selectedTags
      }
      // addEditAddressStatus: 'failed'
    })
  ),

  on(
    CreateOfferActions.clearFacets,
    (state, action) => ({
      ...state,
      offer: {
        ...state.offer,
        facets: [],
        tags: []
      }
      // addEditAddressStatus: 'failed'
    })
  ),

  on(
    CreateOfferActions.fetchOfferInitialDataSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      addressLoading: false,
      successMessage: 'Offer Initial data fetched successfully',
      errorMessage: null,
      allAddress: action.userAllAddress.map(address => ({ id: address.addressLine, value: address })),
      allVerticalCategories: [...state.allVerticalCategories, ...action.allVerticalCategories],
      allCountryLists: action.allCountryLists
    })
  ),

  on(
    CreateOfferActions.removeDraftOfferSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      offer: new Offer(),
      currentAdress: null,
      allAddress: [],
      successMessage: null,
      errorMessage: null
    })
  ),

  on(
    CreateOfferActions.updateUserAddress,
    (state, action) => ({
      ...state,
      currentAdress: action.address,
      errorMessage: null,
    })
  ),

  on(
    CreateOfferActions.updateUserCurrentLocation,
    (state, action) => ({
      ...state,
      currentLocation: action.location,
      errorMessage: null,
    })
  ),

  on(
    CreateOfferActions.offerPostsuccess,
    (state, action) => ({
        ...state,
        loading: false,
        offerSubmitProgress: false,
        offer: new Offer(),
        currentAdress: null,
        allAddress: [],
        successMessage: null,
        errorMessage: null
    })
  ),

  on(
    CreateOfferActions.offerPostFailure,
    (state, action) => ({
        ...state,
        loading: false,
        offerSubmitProgress: false,
        successMessage: null,
        errorMessage: action.error,
        offerPostFailure: true,
    })
  ),

  on(
    CreateOfferActions.enableAccordionOne,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: true,
          sectionAccordionOneButtonNext: false,
          sectionUploadDocuments: false,
          sectionPostOfferButton: false
        }
    })
  ),

  on(
    CreateOfferActions.disableAccordionOne,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: false,
          sectionAccordionOneButtonNext: false,
          sectionAccordionTwo: false,
          sectionAccordionThree: false,
        }
    })
  ),

  on(
    CreateOfferActions.enableAccordionTwo,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: true,
          sectionAccordionOneButtonNext: true,
          sectionAccordionTwo: true,
          sectionAccordionTwoButtonPrev: true,
          sectionAccordionThree: false,
        }
    })
  ),

  on(
    CreateOfferActions.disableAccordionTwo,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: true,
          sectionAccordionOneButtonNext: false,
          sectionAccordionTwo: false,
          sectionAccordionTwoButtonPrev: false,
          sectionAccordionThree: false,
        }
    })
  ),

  on(
    CreateOfferActions.enableAccordionThree,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: true,
          sectionAccordionOneButtonNext: true,
          sectionAccordionTwo: true,
          sectionAccordionTwoButtonPrev: true,
          sectionAccordionTwoButtonNext: true,
          sectionAccordionThree: true,
          sectionAccordionThreeButtonPrev: true,
          sectionAccordionThreeButtonNext: false,
        }
    })
  ),

  on(
    CreateOfferActions.disableAccordionThree,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: true,
          sectionAccordionOneButtonNext: true,
          sectionAccordionTwo: true,
          sectionAccordionTwoButtonPrev: true,
          sectionAccordionTwoButtonNext: false,
          sectionAccordionThree: false,
          sectionAccordionThreeButtonPrev: false,
          sectionAccordionThreeButtonNext: false,
        }
    })
  ),

  on(
    CreateOfferActions.enablePostOfferSection,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionAccordionOne: true,
          sectionAccordionOneButtonNext: true,
          sectionAccordionTwo: true,
          sectionAccordionTwoButtonPrev: true,
          sectionAccordionTwoButtonNext: true,
          sectionAccordionThree: true,
          sectionAccordionThreeButtonPrev: true,
          sectionAccordionThreeButtonNext: true,
          sectionUploadDocuments: true,
          sectionPostOfferButton: true
        }
    })
  ),

  on(
    CreateOfferActions.disablePostOfferSection,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionUploadDocuments: false,
          sectionPostOfferButton: false
        }
    })
  ),

  on(
    CreateOfferActions.disableDocumentsSection,
    (state) => ({
        ...state,
        sectionToggles: {
          ...state.sectionToggles,
          sectionUploadDocuments: false
        }
    })
  ),

  on(
    CreateOfferActions.resetSectionToggles,
    (state) => ({
        ...state,
        sectionToggles: {
          ...INITIAL_SECTION_TOGGLE
        }
    })
  ),

  on(
    CreateOfferActions.disableOfferTab,
    (state, action) => ({
      ...state,
      showOtherTabs: {
        ...state.showOtherTabs,
        [action.name]: false
      }
    })
  ),

  on(
    CreateOfferActions.enableOfferTab,
    (state, action) => ({
      ...state,
      showOtherTabs: {
        AUCTION: false,
        ITEM: false,
        SERVICE: false,
        [action.name]: true
      }
    })
  ),

  on(
    CreateOfferActions.resetOfferTabs,
    (state) => ({
      ...state,
      showOtherTabs: {
        ...INITIAL_OFFER_TABS
      }
    })
  ),

  on(
    CreateOfferActions.updateCurrentActiveSection,
    (state, action) => ({
      ...state,
      currentActiveSection: action.name
    })
  ),

  on(
    CreateOfferActions.mediaUploadStart,
    (state) => ({
      ...state,
      mediaUpload: true,
    })
  ),

  on(
    CreateOfferActions.mediaUploadComplete,
    (state) => ({
      ...state,
      mediaUpload: false,
    })
  ),

  on(
    CreateOfferActions.unsetOfferPostFailure,
    (state) => ({
      ...state,
      offerPostFailure: false,
    })
  ),

  on(
    CreateOfferActions.fetchBusinessDetailsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: 'Business Details Fetched Successfully',
      errorMessage: null,
      currentBusinessDetails: {
        ...action.businessDetails,
      }
    })
  ),

  on(
    CreateOfferActions.updateCurrentLocationTitle,
    (state, action) => ({
      ...state,
      currentLocation: {
        ...state.currentLocation,
        title: action.addressTitle
      },
      errorMessage: null,
    })
  ),

  on(
    CreateOfferActions.addBusinessUserSuccess,
    (state, action) => ({
      ...state,
      currentBusinessDetails: {
        ...state.currentBusinessDetails,
        businessAddresses: [
          ...state.currentBusinessDetails.businessAddresses,
          { ...action.address },
        ],
      },
      offer: {
        ...state.offer,
        location: action.address
      },
      successMessage: 'Address Added Successfully',
      closeOpenedModel: true,
      errorMessage: null
    })
  ),

  on(
    CreateOfferActions.addBusinessUserFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      closeOpenedModel:false,
      errorMessage: action.error
    })
  ),

);

export function createOfferReducer(state: CreateOfferInfoState = INITIAL_STATE, action: Action) {
  return _createOfferReducer(state, action);
};
