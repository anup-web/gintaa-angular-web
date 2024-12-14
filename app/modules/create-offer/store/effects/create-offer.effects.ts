import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { MediaActions, MediaTypes, UploadResponse } from '@gintaa/shared/models';
import { AvailableTags, Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CREATE_OFFER_TYPE } from '../../configs/create-offer.config';
import { CreateOfferService } from '../../services/create-offer.service';
import { CreateOfferActions } from '../action-types';
import { selectOfferInfo } from '../selectors/create-offer.selectors';
import { FeatureListEnum, FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';

const titleCase = string => string.charAt(0).toUpperCase() + string.charAt(1).toLowerCase();
const customFormData = (files, id, viewType) => {
  const formData: FormData = new FormData();
  const cover = viewType === 'cover'
  for (var i = 0; i < files.length; i++) {
    formData.append("file[]", files[i]);
    formData.append('displayIndex', i.toString());
    formData.append('draftId', id);
    formData.append('viewType', viewType);
    formData.append('cover', cover.toString());
  }
  return formData;
}
@Injectable()
export class CreateOfferEffects {

  createDraftOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.createDraftOffer),
      switchMap((action) => {
        return this.createOfferService.createUpdateDraftOffer(action.offerType).pipe(
          map((response: Offer) => {
            // console.log('results: ', response);
            return CreateOfferActions.updateDraftOfferMedia({
              response,
              formData: customFormData(action.files, response.draftOfferId, action.viewType.toLowerCase()),
              mediaType: action.mediaType,
              viewType: action.viewType
            })
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.offerDraftDataFailure({ error })
            )
          }),
        );
      })
    )
  );

  createCloneOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.createCloneOffer),
      switchMap((action) => {
        const offerData = {          
          ...action.response,
          categoryId: action.response?.category?.categoryId
        }
        return this.createOfferService.createCloneOffer(offerData).pipe(
          map((response: Offer) => {
            // console.log('results: ', response);
            return CreateOfferActions.offerDraftDataSuccess({
              response
            })
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.offerDraftDataFailure({ error })
            )
          }),
        );
      })
    )
  );

  updateDraftOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.updateDraftOffer),
      switchMap((action) => {
        return this.createOfferService.createUpdateDraftOffer(action.offer.offerType, action.offer).pipe(
          map((response: Offer) => {
            // console.log('results123333: ', response);
            if (action.updateSingle) {
              const control = action.updateSingle;
              if (control === 'category') {
                const categoryObj = response.category
                return CreateOfferActions.offerCategoryDataSuccess({
                  response
                })
              }
              if (control === 'facets') {
                // const facetObj = response.facets
                return CreateOfferActions.offerFacetDataSuccess({
                  response
                })
              }
              if (control === 'desire') {
                // const desireObj = response.desire
                return CreateOfferActions.offerDesireDataSuccess({
                  response
                })
              }
            }
            return CreateOfferActions.offerDraftDataSuccess({
              response
            })
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.offerDraftDataFailure({ error })
            )
          }),
        );
      })
    )
  );

  updateDraftOfferSingle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.updateDraftOfferSingle),
      switchMap((action) => {
        return this.createOfferService.createUpdateDraftOffer(action.offer.offerType, action.offer).pipe(
          map((response: Offer) => {
            // console.log('result single: ', response);
            return CreateOfferActions.offerDraftDataSuccess({
              response: null
            })
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.offerDraftDataFailure({ error })
            )
          }),
        );
      })
    )
  );

  updateOfferMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.updateDraftOfferMedia),
      switchMap((action) => {
        return this.createOfferService.updateOfferMedia(action.mediaType, action.formData)
          .pipe(
            map((event: any) => {
              switch (event.type) {
                case HttpEventType.UploadProgress:
                  //file.progress = Math.round(event.loaded * 100 / event.total); 
                  CreateOfferActions.uploadOfferMediaProgress();
                  break;
                case HttpEventType.Response:
                  if (typeof (event) === 'object') {
                    const result: Response = event.body;
                    if (result['success'] && result['payload']) {
                      // console.log('Media Type:::', action.mediaType);
                      let response: Offer = result['payload'];
                      switch (action.mediaType) {
                        // case MediaTypes.DOCUMENT: 
                        //   response = response.documents
                        //   break;
                        case MediaTypes.IMAGE:
                          response = {
                            ...response,
                            images: response.images.map(obj => ({ ...obj, mediaType: action.mediaType }))
                          }
                          break;
                        case MediaTypes.VIDEO:
                          response = {
                            ...response,
                            videos: response.videos.map(obj => ({ ...obj, mediaType: action.mediaType, viewType: action.viewType.toLowerCase() }))
                          }
                          break;
                        default:
                          break;
                      }
                      if (action.mediaType === MediaTypes.IMAGE && action.viewType.toLowerCase() === 'cover') {
                        const imageObjects: string[] = response.images.find(image => image.cover).imageObjects;
                        const offer = {
                          offerType: response.offerType,
                          offerId: response.draftOfferId,
                          originCountry: response.originCountry || 'India',
                          description: response.description || imageObjects.join(",")
                        }
                        if(imageObjects && imageObjects.length) {
                          this.store.dispatch(CreateOfferActions.fetchSuggestedCategories({imageObjects, offerType: action.response.offerType}));
                        }
                        this.store.dispatch(CreateOfferActions.updateDraftOffer({ offer }))
                        this.store.dispatch(CreateOfferActions.enableAccordionOne());
                      }
                      return CreateOfferActions.updateOfferMediaSuccess({
                        response,
                        mediaType: action.mediaType,
                        actionType: MediaActions.UPDATE,
                        viewType: action.viewType
                      })
                    }
                  };
              }

            }),
            catchError((error: HttpErrorResponse) => of(
              CreateOfferActions.uploadOfferMediaFailure({ error: 'Media Upload not successful' })
            )),
          );
      })
    )
  );

  updatePublishedOfferMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.updatePublishedOfferMedia),
      switchMap((action) => {
        return this.createOfferService.updatePublishedOfferMedia(action.mediaType, action.formData)
          .pipe(
            map((event: any) => {
              switch (event.type) {
                case HttpEventType.UploadProgress:
                  //file.progress = Math.round(event.loaded * 100 / event.total); 
                  CreateOfferActions.uploadOfferMediaProgress();
                  break;
                case HttpEventType.Response:
                  if (typeof (event) === 'object') {
                    const result: Response = event.body;
                    if (result['success'] && result['payload']) {
                      // console.log('Media Type:::', action.mediaType);
                      let response: Offer = result['payload'];
                      switch (action.mediaType) {
                        // case MediaTypes.DOCUMENT: 
                        //   response = response.documents
                        //   break;
                        case MediaTypes.IMAGE:
                          response = {
                            ...response,
                            images: response.images.map(obj => ({ ...obj, mediaType: action.mediaType }))
                          }
                          break;
                        case MediaTypes.VIDEO:
                          response = {
                            ...response,
                            videos: response.videos.map(obj => ({ ...obj, mediaType: action.mediaType, viewType: action.viewType.toLowerCase() }))
                          }
                          break;
                        default:
                          break;
                      }
                      if (action.mediaType === MediaTypes.IMAGE && action.viewType.toLowerCase() === 'cover') {
                        const imageObjects: string[] = response.images.find(image => image.cover).imageObjects;
                        const offer = {
                          offerType: response.offerType,
                          offerId: action.draftOfferId,
                          originCountry: response.originCountry || 'India',
                          description: response.description || imageObjects.join(",")
                        }
                        if(imageObjects && imageObjects.length) {
                          this.store.dispatch(CreateOfferActions.fetchSuggestedCategories({imageObjects, offerType: action.response.offerType}));
                        }
                        // this.store.dispatch(CreateOfferActions.updateDraftOffer({ offer }))
                        this.store.dispatch(CreateOfferActions.enableAccordionOne());                        
                      }
                      // enable update button for edit offer image update
                      this.store.dispatch(CreateOfferActions.enablePostOfferSection());
                      return CreateOfferActions.updateOfferMediaSuccess({
                        response,
                        mediaType: action.mediaType,
                        actionType: MediaActions.UPDATE,
                        viewType: action.viewType
                      })
                    }
                  };
              }

            }),
            catchError((error: HttpErrorResponse) => of(
              CreateOfferActions.uploadOfferMediaFailure({ error: 'Media Upload not successful' })
            )),
          );
      })
    )
  );

  postOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.submitOffer),
      switchMap(({formValue}) => {
        // delete formValue.images;
        // delete formValue.videos;
        // delete formValue.documents;
        // if (formValue.offerType === CREATE_OFFER_TYPE.SERVICE) {
        //   console.log('Initial Offer Timining:::', formValue.serviceTimingInfos);
        //   let serviceTiming = formValue.serviceTimingInfos.map(obj => ({
        //     ...obj,
        //     timingInfoList: obj.timingInfoList.map(o => ({
        //       ...o,
        //       startTime: this.createOfferService.formatServiceTime(o.startTime),
        //       endTime: this.createOfferService.formatServiceTime(o.endTime)
        //     }))
        //   }))
        //   formValue.serviceTimingInfos = serviceTiming;
        //   console.log('Offer Data:::', serviceTiming);
        // }

        return this.createOfferService.postOffer({...formValue})
          .pipe(
            map((response: Offer) => {

              // console.log("==========================Succesful");
              // console.log("==========================response",response);

              if (response.auctioned == true){this.gintaaAuctionCreation() }else{if(response.offerType == 'Item'){this.gintaaProductCreation();}else{this.gintaaServiceCreation()}  }
              
              return CreateOfferActions.offerPostsuccess({
                response,
                redirect: true
              })
            }),
            catchError((error: HttpErrorResponse) => {
              // console.log('>>>>>>>>>>>>>>>>>', error);
              return of(
                CreateOfferActions.offerPostFailure({
                  error
                })
              )
            }),
          );
      })
    )
  );

  updateOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.updateOffer),
      switchMap(({formValue, offerId}) => {
        // edit offer remove draft offer is on post
        let offerData = {
          ...formValue,
          offerId
        }
        return this.createOfferService.updateOffer({...offerData})
          .pipe(
            map((response: Offer) => {
              // console.log("==========================update Succesful");
              // console.log("==========================update response",response);
              if (response.auctioned == true) {
                this.gintaaAuctionCreation() 
              } else {
                 if(response.offerType == 'Item') {
                  this.gintaaProductCreation();
                 } else {
                   this.gintaaServiceCreation()
                  }  
                }              
              return CreateOfferActions.offerPostsuccess({
                response,
                redirect: true
              })
            }),
            catchError((error: HttpErrorResponse) => {
              // console.log('>>>>>>>>>>>>>>>>>', error);
              return of(
                CreateOfferActions.offerPostFailure({
                  error
                })
              )
            }),
          );
      })
    )
  );

  offerRedirect$ = createEffect(() => 
      this.actions$.pipe(
        ofType(CreateOfferActions.offerPostsuccess),
        // delay(8000),
        tap(action => action.redirect && this.router.navigate(['offer', action.response.offerId]))
      ), { dispatch: false }
  );

  fetchSuggestedCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.fetchSuggestedCategories),
      switchMap((action) => {
        return this.createOfferService.suggestedCategory(action.imageObjects, action.offerType).pipe(
          map((resData: any) => {
              return CreateOfferActions.suggestedTagsByUpdateMediaSuccess({
                response: resData
              });
          }),
          catchError(error => {
            return of(
              CreateOfferActions.offerDraftDataFailure({
                error: 'Offer Draft Data Suggested Category Failed'
              })
            )
          }),
        );
      })
    )
  );

  removeOfferMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.removeDraftOfferMedia),
      switchMap((action) => {
        return this.createOfferService.removeDraftOfferMedia(
          {
            resourceId: action.id,
            draftOfferId: action.offerId,
          }, action.mediaType)
          .pipe(
            map((result: any) => {
              if (result.success && result.payload) {
                // console.log('Removed Media Type:::', action.mediaType);
                let response = result.payload;
                switch (action.mediaType) {
                  // case MediaTypes.DOCUMENT: 
                  //   response = response.documents
                  //   break;
                  case MediaTypes.IMAGE:
                    response = {
                      ...response,
                      images: response.images.length && response.images.map(obj => ({ ...obj, mediaType: action.mediaType }))
                    }
                    break;
                  case MediaTypes.VIDEO:
                    response = {
                      ...response,
                      videos: response.videos.length && response.videos.map(obj => ({ ...obj, mediaType: action.mediaType, viewType: action.viewType.toLowerCase() }))
                    }
                    break;
                  default:
                    break;
                }
                if (action.mediaType === MediaTypes.IMAGE && action.viewType.toLowerCase() === 'cover') {
                  this.store.dispatch(CreateOfferActions.disableAccordionOne());
                }
                return CreateOfferActions.updateOfferMediaSuccess({
                  response,
                  mediaType: action.mediaType,
                  actionType: MediaActions.DELETE,
                  id: action.id
                })
              }
            }),
            catchError((error: HttpErrorResponse) => of(
              CreateOfferActions.uploadOfferMediaFailure({ error: 'Media Remove Failed' })
            )),
          );
      })
    )
  );

  removePublishedOfferMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.removePublishedOfferMedia),
      switchMap((action) => {
        return this.createOfferService.removePublishedOfferMedia(
          {
            resourceId: action.id,
            offerId: action.offerId,
          }, action.mediaType)
          .pipe(
            map((result: any) => {
              if (result.success && result.payload) {
                // console.log('Removed Media Type:::', action.mediaType);
                let response = result.payload;
                switch (action.mediaType) {
                  // case MediaTypes.DOCUMENT: 
                  //   response = response.documents
                  //   break;
                  case MediaTypes.IMAGE:
                    response = {
                      ...response,
                      images: response.images.length && response.images.map(obj => ({ ...obj, mediaType: action.mediaType }))
                    }
                    break;
                  case MediaTypes.VIDEO:
                    response = {
                      ...response,
                      videos: response.videos.length && response.videos.map(obj => ({ ...obj, mediaType: action.mediaType, viewType: action.viewType.toLowerCase() }))
                    }
                    break;
                  default:
                    break;
                }
                if (action.mediaType === MediaTypes.IMAGE && action.viewType.toLowerCase() === 'cover') {
                  this.store.dispatch(CreateOfferActions.disableAccordionOne());
                  this.store.dispatch(CreateOfferActions.disablePostOfferSection());
                } else {
                  this.store.dispatch(CreateOfferActions.enableAccordionOne());
                  this.store.dispatch(CreateOfferActions.enablePostOfferSection());
                }
                return CreateOfferActions.updateOfferMediaSuccess({
                  response,
                  mediaType: action.mediaType,
                  actionType: MediaActions.DELETE,
                  id: action.id
                })
              }
            }),
            catchError((error: any) => of(
              CreateOfferActions.removeOfferMediaFailure({ error: error || 'Media Remove Failed' })
            )),
          );
      })
    )
  );

  fetchOfferInitialData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.fetchOfferInitialData),
      switchMap(({ offerType }) => {
        const userAddress = this.createOfferService.fetchUserAllAddress();
        const verticalCategory = this.createOfferService.fetchAllCategories(offerType);
        const allCountryLists = this.createOfferService.getCountryList();
        return forkJoin([userAddress, verticalCategory, allCountryLists]).pipe(
          map(([userAddress, verticalCategory, allCountryLists]) => {
            return CreateOfferActions.fetchOfferInitialDataSuccess({
              userAllAddress: userAddress,
              allVerticalCategories: verticalCategory,
              allCountryLists
            });
          }),
          catchError((error: HttpErrorResponse) => of(
            CreateOfferActions.fetchOfferInitialDataFailure({ error })
          )),
        );
      })
    )
  );

  fetchDraftData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.fetchDraftData),
      switchMap((action) => {
        return this.createOfferService.getDraftOfferById(action.id)
          .pipe(
            tap(response => {
              response.images.length && response.images.map(image => image.mediaType = MediaTypes.IMAGE)
              response.videos.length && response.videos.map(video => video.mediaType = MediaTypes.VIDEO)
              response.documents.length && response.documents.map(doc => doc.mediaType = MediaTypes.DOCUMENT)
            }),
            map((response: Offer) => {
              // console.log('Reseseseesesesedgdggdgdgdg:::', response);
              // fetch suggested categories if cover image and description present.
              const coverImage: UploadResponse = response.images.find(image => image.cover);
              if(coverImage) {
                const imageObjects: string[] = coverImage.imageObjects
                if(imageObjects && imageObjects.length) {
                  this.store.dispatch(
                    CreateOfferActions.fetchSuggestedCategories(
                      {
                        imageObjects, 
                        offerType: response.offerType
                      }
                    )
                  );
                }                
                // call tag values for selected category Id
                if (response.description && response.category && response.category.categoryId && coverImage.imageLogos) {                    
                  const reqBody = {
                    categoryId: response.category.categoryId,
                    text: response.description,
                    logo: [...coverImage.imageLogos]
                  }
                  this.store.dispatch(CreateOfferActions.selectedTagsByUserInfo({reqBody}));
                }
              }
              // console.log('response 360 line:::::', response);
              return CreateOfferActions.offerDraftDataSuccess({ response })
            }),
            catchError((error: HttpErrorResponse) => of(
              CreateOfferActions.offerDraftDataFailure({ error: 'Offer Draft Data Fetching Failed' })
            ))
          );
      })
    )
  );

  fetchPublishedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.fetchPublishedData),
      switchMap((action) => {        
        return this.createOfferService.fetchPublishedData(action.id)
        .pipe(
          tap(response => {
            response.images.length && response.images.map(image => image.mediaType = MediaTypes.IMAGE)
            response.videos.length && response.videos.map(video => video.mediaType = MediaTypes.VIDEO)
            response.documents.length && response.documents.map(doc => doc.mediaType = MediaTypes.DOCUMENT)
          }),
          map((response: Offer) => {
            if(response.offerType === CREATE_OFFER_TYPE.SERVICE && response.serviceTimingInfos) {
              response.serviceTimingInfos = response.serviceTimingInfos.map(obj => ({
                  ...obj,
                  state: true,
                  prefix: titleCase(obj.dayOfWeek.slice(0,2)),
                  timingInfoList: obj.timingInfoList.map(o => ({
                    ...o,
                    startTime: o.startTime,
                    endTime: o.endTime
                  }))
                }))
            }
            delete response.offerId;
            return CreateOfferActions.createCloneOffer({response})
          }),
          catchError((error: HttpErrorResponse) => of(
            CreateOfferActions.offerDraftDataFailure({ error : 'Offer Draft Data Fetching Failed' })
          ))
        );
      })
    )
  );

  removeDraftOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.removeDraftOffer),
      switchMap((action) => {
        return this.createOfferService.removeDraftOfferById(action.id)
          .pipe(
            map((resData: any) => {
              // return CreateOfferActions.removeDraftOfferSuccess({
              //   redirect: true
              // });
              return CreateOfferActions.removeDraftOfferSuccess();
            }),
            catchError((error: any) => {
              return of(
                CreateOfferActions.offerDraftDataFailure({ error: 'Offer Draft Data Fetching Failed' })
              )
            }),
          );
      })
    )
  );

  // removeDraftRedirect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CreateOfferActions.removeDraftOfferSuccess),
  //     tap(action => action.redirect && this.router.navigateByUrl('/my-offers'))
  //   ), { dispatch: false }
  // );

  getAllTagsByCategoryId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.getAllTagsByCategoryId),
      withLatestFrom(this.store.select(selectOfferInfo)),
      switchMap(([action, offerData]) => {
        return this.createOfferService.getAllTagsByCategoryId(offerData.category.categoryId).pipe(
          map((response: AvailableTags[]) => {
            // console.log('tag Response: ', response);
            response = response.map(obj => ({...obj, selected: false}))
            return CreateOfferActions.updateTagsByCategoryIdSuccess({
              response
            })
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.offerDraftDataFailure({ error })
            )
          }),
        );
      })
    )
  );

  selectedTagsByUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.selectedTagsByUserInfo),
      switchMap((action) => {
        return this.createOfferService.selectedTagsByUserInfo(action.reqBody).pipe(
          map((response: any) => {
            // console.log('Selected Tag Response: ', response);
            response = Object.keys(response).length ? [
              {
               name: Object.keys(response)[0],
               label: Object.keys(response)[0],
               values: response[Object.keys(response)[0]],
               selected: true,
               mandatory: true
            }
            ] : []
            return CreateOfferActions.selectedTagsByUserInfoSuccess({
              response
            })
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.offerDraftDataFailure({ error })
            )
          }),
        );
      })
    )
  );

  addUserAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.addUserAddress),
      switchMap((action) => {
        return this.createOfferService.saveUserAddress(action.address).pipe(
          map((resData: any) => {
            // console.log('results: ', resData);
            return CreateOfferActions.addUserAddressSuccess({
              address: resData.payload,
              offer: action.offer,
              message: 'User address added successfully'
            });
          }),
          catchError(error => {
            // console.log('error: ', error);
            return of(
              CreateOfferActions.addUserAddressFailure({ error: error.error.message })
            )
          }),
        );
      })
    )
  );

  fetchBusinessDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateOfferActions.fetchBusinessDetails),
      switchMap((action) => {
        return this.createOfferService.fetchBusinessDetails(action.businessId).pipe(
          map((resData: any) => {
            return CreateOfferActions.fetchBusinessDetailsSuccess({
              message: 'Business Details fetched successfully',
              businessDetails: resData.payload
            });
          }),
          catchError(error => {
            return of(
              CreateOfferActions.fetchBusinessDetailsFailure({
                error: error.error.message
              })
            )
          }),
        );
      })
    )
  );

  addBusinessUserAddress$ = createEffect(() =>
      this.actions$.pipe(
          ofType(CreateOfferActions.addBusinessUserAddress),
          switchMap((action) => {
              return this.createOfferService.addBusinessAddress(action.address, action.businessId).pipe(
                  map((resData: any) => {
                      return CreateOfferActions.addBusinessUserSuccess({
                          address: resData.payload,
                          message: 'User address added successfully'
                      });
                  }),
                  catchError(error => {
                      return of(
                        CreateOfferActions.addBusinessUserFailure({ error: error.error.message })
                      )
                  }),
              );
          })
      )
  );

  constructor(
    private actions$: Actions,
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    private createOfferService: CreateOfferService,
    public firebaseAuthService: FirebaseAuthService,
    private analyticsService: FirebaseAnalyticsService
  ) { }

  gintaaProductCreation(){
    let eventName = FirebaseAnalyticsEnum.productCreation
    this.analyticsService.logEvents(eventName);
  }

  gintaaAuctionCreation(){
    let eventName = FirebaseAnalyticsEnum.auctionCreation
    this.analyticsService.logEvents(eventName);
  }

  gintaaServiceCreation(){
    let eventName = FirebaseAnalyticsEnum.serviceCreation
    this.analyticsService.logEvents(eventName);
  }


}
