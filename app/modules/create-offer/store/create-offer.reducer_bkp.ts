import { MediaActions, MediaTypes, UploadResponse } from '@gintaa/shared/models/media';
import { Action, createReducer, on } from '@ngrx/store';
import { CURRENT_OFFER_SCREEN } from '../configs/create-offer.config';
import { CreateOfferActions } from './action-types';
import { CreateOfferState } from './models/create-offer';
import { UserOfferInfo } from './models/user-offer-info';

export const initialCreateOfferState: CreateOfferState = {
  loading: false,
  mediaLoading: false,
  currentOfferScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE || null,
  //currentOfferScreen: CURRENT_OFFER_SCREEN.ADDITIONAL_OFFER_PAGE || null,
  offer: new UserOfferInfo(),
  currentLocation: null,
  currentAdress: null,
  allAddress: [],
  allVerticalCategories: [],
  addAddressStatus: null,
  closeOpenedModel:false,
  successMessage: null,
  errorMessage: null,
};

const updateMediaState = (medias: UploadResponse[], type: string, operation: string, id?: string) => {
  let mediaArr = [];
  if(operation === MediaActions.DELETE) {
    if(type === MediaTypes.IMAGE) {
      mediaArr = medias.filter(media => media.id !== id);
      let index: number = mediaArr.length && mediaArr.findIndex(media => media.cover === true);
      if(index === -1) {        
        let intialArrElem: UploadResponse =  {
          ...mediaArr[0],
          cover: true
        }
        mediaArr = [intialArrElem, ...mediaArr.slice(1)];
      }
    } 
    return mediaArr;   
  } else if(operation === MediaActions.UPDATE) {
      if(type === MediaTypes.IMAGE) {
        mediaArr = medias.map((media) => ({
          ...media,
          cover: media.id === id
        }))
        let coverMedia = mediaArr.filter(media => media.id === id);
        let otherMedia = mediaArr.filter(media => media.id !== id);
        mediaArr = [...coverMedia, ...otherMedia];
      } 
      return mediaArr;
  }
}

const addMediaState = (medias: UploadResponse[], type: string, operation: string, uploadedFiles: UploadResponse[]) => {
  let mediaArr = [];
      mediaArr = [...medias];
  if(operation === MediaActions.ADD) {
    switch (type) {
      case MediaTypes.IMAGE:
        mediaArr = mediaArr.length ? 
          [...mediaArr, ...uploadedFiles.map(file=> ({ ...file, mediaType: MediaTypes.IMAGE, cover: false }))]
          : [...uploadedFiles.map((file, index)=> ({ ...file, mediaType: MediaTypes.IMAGE, cover: index === 0 }))]
        break;
      case MediaTypes.VIDEO:
        mediaArr = mediaArr.length ? 
        [...mediaArr, ...uploadedFiles.map(file=> ({ ...file, mediaType: MediaTypes.VIDEO }))]
        : [...uploadedFiles.map(file=> ({ ...file, mediaType: MediaTypes.VIDEO }))]
        break;
      case MediaTypes.DOCUMENT:
        mediaArr = mediaArr.length ? 
        [...mediaArr, ...uploadedFiles.map(file=> ({ ...file, mediaType: MediaTypes.DOCUMENT }))]
        : [...uploadedFiles.map(file=> ({ ...file, mediaType: MediaTypes.DOCUMENT }))]
        break;
      default:
        break;
    }
    return mediaArr;   
  }
}

const _createOfferReducer = createReducer(

  initialCreateOfferState,

  on(
    CreateOfferActions.uploadOfferMediaSuccess,
    (state, action) => {
      const operation: string = MediaActions.ADD;
      switch(action.mediaType){
        case MediaTypes.IMAGE:
          const images: UploadResponse[] = addMediaState(state.offer.images, action.mediaType, operation, action.response)
          return {
            ...state,
            loading: false,
            successMessage: 'Offer Image Upload Successfully',
            errorMessage: null,
            offer: {
              ...state.offer,
              images                
            }
        }
      case MediaTypes.VIDEO: 
        const videos: UploadResponse[] = addMediaState(state.offer.videos, action.mediaType, operation, action.response)
        return {
          ...state,
          loading: false,
          successMessage: 'Offer Video Upload Successfully',
          errorMessage: null,
          offer: {
            ...state.offer,
            videos
          }
        }
      case MediaTypes.DOCUMENT:
        const documents: UploadResponse[] = addMediaState(state.offer.documents, action.mediaType, operation, action.response)
        return {
          ...state,
          loading: false,
          successMessage: 'Offer Document Upload Successfully',
          errorMessage: null,
          offer: {
            ...state.offer,
            documents
          }
        }
      default: {
        return state;
      }      
    }      
    }
  ),

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
                addMediaState([], MediaTypes.IMAGE, MediaActions.ADD, action.response)
                 : state.offer.images,                
                videos: action.mediaType === MediaTypes.VIDEO ? action.response : state.offer.videos,
                documents: action.mediaType === MediaTypes.DOCUMENT ? action.response : state.offer.documents,
              }
          }
        case MediaActions.UPDATE: 
          return {
            ...state,
            loading: false,
            successMessage: 'Offer Image Updated Successfully',
            errorMessage: null,
            offer: {
              ...state.offer,          
              images: action.mediaType === MediaTypes.IMAGE ? 
              addMediaState([], MediaTypes.IMAGE, MediaActions.ADD, action.response)
               : state.offer.images,
              videos: action.mediaType === MediaTypes.VIDEO ? action.response : state.offer.videos,
              documents: action.mediaType === MediaTypes.DOCUMENT ? action.response : state.offer.documents,
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
    CreateOfferActions.uploadOfferMediaFailure,
    (state, action) => ({
        ...state,
        errorMessage: action.error,
        successMessage: null,
        loading: false
    })
  ),

  on(
    CreateOfferActions.removeOfferMedia,
    (state, action) => {
        const operation: string = MediaActions.DELETE;
        switch(action.mediaType){
          case MediaTypes.IMAGE:
            const images: UploadResponse[] = updateMediaState(state.offer.images, action.mediaType, operation, action.id)
            return {
              ...state,
              loading: false,
              successMessage: 'Offer Media Remove Successfully',
              errorMessage: null,
              offer: {
                ...state.offer,
                images                
              }
          }
        case MediaTypes.VIDEO: 
          return {
            ...state,
            loading: false,
            successMessage: 'Offer Media Remove Successfully',
            errorMessage: null,
            offer: {
              ...state.offer,
              videos: state.offer.videos.filter(video => video.id !== action.id)
            }
          }
        case MediaTypes.DOCUMENT:
          return {
            ...state,
            loading: false,
            successMessage: 'Offer Media Remove Successfully',
            errorMessage: null,
            offer: {
              ...state.offer,
              documents: state.offer.documents.filter(doc => doc.id !== action.id)
            }
          }
        default: {
          return state;
        }
        
      }
    }
  ),

  on(
    CreateOfferActions.setOfferMedia,
    (state, action) => {
        const operation: string = MediaActions.UPDATE;
        switch(action.mediaType){
          case MediaTypes.IMAGE:
            const images: UploadResponse[] = updateMediaState(state.offer.images, action.mediaType, operation, action.id)
            return {
              ...state,
              loading: false,
              successMessage: 'Offer Media Cover Image Set Successfully',
              errorMessage: null,
              offer: {
                ...state.offer,
                images                
              }
          }        
        default: {
          return state;
        }
        
      }
    }
  ),

  on(
    CreateOfferActions.addCreateOfferInfo,
    (state, action) => ({
        ...state,
        loading: false,
        offer: {
          ...state.offer,
          ...action.offer
        },
        currentOfferScreen: CURRENT_OFFER_SCREEN.ADDITIONAL_OFFER_PAGE,
        successMessage: null,
        errorMessage: null
    })
  ),

  on(
    CreateOfferActions.updateOfferLocation,
    (state, action) => ({
        ...state,
        loading: false,
        offer: {
          ...state.offer,
          ...action.offer,
          location: action.address
        },
        successMessage: null,
        errorMessage: null
    })
  ),

  on(
    CreateOfferActions.navigateOfferScreen,
    (state, action) => ({
      ...state,
      offer: {
        ...state.offer,
        ...action.offer
      },
      currentOfferScreen: action.currentScreen,
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
    CreateOfferActions.updateUserAddress,
    (state, action) => ({
      ...state,
      currentAdress: action.address,
      errorMessage: null,
    })
  ),

  on(
    CreateOfferActions.addUserAddressSuccess,
    (state, action) => ({
      ...state,
      allAddress: state.allAddress.concat({
        id: state.currentAdress && state.currentAdress.addressLine, 
        value: state.currentAdress
      }),
      offer: {
        ...state.offer,
        ...action.offer,
        location: state.currentAdress.addressLine
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
      closeOpenedModel:false,
      errorMessage: action.error,
      // addEditAddressStatus: 'failed'
    })
  ),

  on(
    CreateOfferActions.resetAddressModelOpenState,
    (state, action) => ({
      ...state,
      successMessage: null,
      closeOpenedModel:false,
      errorMessage: null,
      currentAdress: null
      // addEditAddressStatus: 'failed'
    })
  ),  

  on(
    CreateOfferActions.offerPostsuccess,
    (state, action) => ({
        ...state,
        loading: false,
        currentOfferScreen: action.currentScreen,
        offer: new UserOfferInfo(),
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
        currentOfferScreen: action.currentScreen,
        successMessage: null,
        errorMessage: action.error
    })
  ),

  on(
    CreateOfferActions.clearOfferData,
    (state, action) => ({
        ...state,
        loading: false,
        currentOfferScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE,
        offer: new UserOfferInfo(),
        currentAdress: null,
        allAddress: [],
        allVerticalCategories: [],
        successMessage: null,
        errorMessage: null
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
      currentOfferScreen: action.currentScreen,
      allVerticalCategories: [...state.allVerticalCategories, ...action.allVericalCategories]
    })
  ),
  
  on(
    CreateOfferActions.fetchOfferInitialDataFailure,
    (state, {error}) => ({
      ...state,
      successMessage: null,
      closeOpenedModel:false,
      errorMessage: error,
      // addEditAddressStatus: 'failed'
    })
  ),

  on(
    CreateOfferActions.addSelectedCategory,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'add category successfully',
        errorMessage: null,        
        offer: {
          ...state.offer,
          ...action.formValue,
          category: action.category
        }
    })
  ),

  on(
    CreateOfferActions.removeSelectedCategory,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'remove category successfully',
        errorMessage: null,        
        offer: {
          ...state.offer,
          category: null
        }
    })
  ),

  on(
    CreateOfferActions.removeSelectedDesireCategory,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'remove category successfully',
        errorMessage: null,        
        offer: {
          ...state.offer,
          desireCategory: null
        }
    })
  ),

  on(
    CreateOfferActions.addSelectedDesireCategory,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'add category successfully',
        errorMessage: null,        
        offer: {
          ...state.offer,
          ...action.formValue,
          desireCategory: action.category
        }
    })
  ),

  // on(
  //   CreateOfferActions.storeVerticalCategoryFailure,
  //   (state, action) => ({
  //       ...state,
  //       errorMessage: action.error,
  //       successMessage: null,
  //       loading: false
  //   })
  // ),

  on(
    CreateOfferActions.offerDraftDataSuccess,
    (state, action) => {   
        //let response: UserOfferInfo = {...action.response };
        //response = updateDraftResponse(response)
        return {
          ...state,
          loading: false,
          successMessage: 'Offer Data fetched successfully',
          errorMessage: null,
          offer: {
            ...state.offer,
            ...action.response
          }
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

  // on(
  //   CreateOfferActions.addressDataSuccess,
  //   (state, action) => ({
  //       ...state,
  //       offer: action.id === null ? new UserOfferInfo() : state.offer,
  //       loading: false,
  //       addressLoading: false,
  //       errorMessage: null,
  //       allAddress: action.responseData.map(address => ({ id: address.addressLine, value: address }))
  //   })
  // ),  
  
  on(
    CreateOfferActions.createOfferPostingLoader,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: null,
        currentOfferScreen: CURRENT_OFFER_SCREEN.OFFER_POSTING_LOADER_PAGE
    })
  ),

  on(
    CreateOfferActions.removeDraftOfferSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        currentOfferScreen: action.currentScreen,
        offer: new UserOfferInfo(),
        currentAdress: null,
        allAddress: [],
        successMessage: null,
        errorMessage: null
    })
  ),
  
);

export function createOfferReducerBsbsbsbbs(state: CreateOfferState, action: Action) {
    return _createOfferReducer(state, action);
}
