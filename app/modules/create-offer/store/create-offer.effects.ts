// import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
// import { MediaActions, MediaTypes } from '@gintaa/shared/models/media';
// import { Response } from '@gintaa/shared/models/Response';
// import * as gintaaApp from '@gintaa/store/app.reducer';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Store } from '@ngrx/store';
// import { forkJoin, of, zip } from 'rxjs';
// import { delay } from 'rxjs/internal/operators';
// import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
// import { CREATE_OFFER_TYPE, CURRENT_OFFER_SCREEN } from '../configs/create-offer.config';
// import { CreateOfferService } from '../services/create-offer.service';
// import { CreateOfferActions } from './action-types';
// import { submitOfferInfo } from './create-offer.selectors';
// import { UserOfferInfo } from './models/user-offer-info';

// const titleCase = string => string.charAt(0).toUpperCase() + string.charAt(1).toLowerCase();
// @Injectable()
// export class CreateOfferEffects { 

//   uploadOfferMedia$ = createEffect(() =>     
//     this.actions$.pipe(
//       ofType(...[
//         CreateOfferActions.uploadOfferImage,
//         CreateOfferActions.uploadOfferVideo,
//         CreateOfferActions.uploadOfferDocument
//       ]),
//       mergeMap(({ formData, url, mediaType }) => {
//         return this.createOfferService.addOfferMedia(formData, url)
//         .pipe(
//           map((event: any) => {
//             switch (event.type) {  
//               case HttpEventType.UploadProgress:  
//                 //file.progress = Math.round(event.loaded * 100 / event.total); 
//                 CreateOfferActions.uploadOfferMediaProgress(); 
//                 break;
//               case HttpEventType.Response:
//                 if (typeof (event) === 'object') {
//                   const result: Response = event.body;          
//                   if (result.success && result.payload) { 
//                   return CreateOfferActions.uploadOfferMediaSuccess({
//                     response: result.payload,
//                     mediaType
//                   })
//                 }
//               };
//             }            
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.uploadOfferMediaFailure({ error : 'Media Upload Failed' })
//           )),
//         );
//       })
//     )
//   ); 

//   updateOfferMedia$ = createEffect(() =>     
//     this.actions$.pipe(
//       ofType(...[
//         CreateOfferActions.updateDraftOfferDocument,
//         CreateOfferActions.updateDraftOfferImage,
//         CreateOfferActions.updateDraftOfferVideo
//       ]),
//       mergeMap((action) => {
//         return this.createOfferService.updateOfferMedia(action.formData, action.url)
//         .pipe(
//           map((event: any) => {
//             switch (event.type) {  
//               case HttpEventType.UploadProgress:  
//                 //file.progress = Math.round(event.loaded * 100 / event.total); 
//                 CreateOfferActions.uploadOfferMediaProgress(); 
//                 break;
//               case HttpEventType.Response:
//                 if (typeof (event) === 'object') {
//                   const result: Response = event.body;          
//                   if (result.success && result.payload) {  
//                     console.log('Media Type:::', action.mediaType);
//                     let response = result.payload;
//                     switch(action.mediaType) { 
//                       case MediaTypes.DOCUMENT: 
//                         response = response.documents
//                         break;
//                       case MediaTypes.IMAGE:
//                         response = response.images.map(obj=> ({ ...obj, mediaType: action.mediaType }))
//                         break;
//                       case MediaTypes.VIDEO:
//                         response = response.videos.map(obj=> ({ ...obj, mediaType: action.mediaType }))
//                         break;
//                     }
//                   return CreateOfferActions.updateOfferMediaSuccess({
//                     response: response,
//                     mediaType: action.mediaType,
//                     actionType: MediaActions.UPDATE
//                   })
//                 }
//               };
//             }
            
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.uploadOfferMediaFailure({ error : 'Media Upload Failed' })
//           )),
//         );
//       })
//     )
//   );
  
//   removeOfferMedia$ = createEffect(() =>     
//     this.actions$.pipe(
//       ofType(...[        
//         CreateOfferActions.removeDraftOfferMedia
//       ]),
//       switchMap((action) => {
//         return this.createOfferService.removeDraftOfferMedia(
//           { 
//             resourceId: action.id, 
//             draftOfferId: action.offerId
//           }, action.url)
//         .pipe(
//           map((result: any) => {       
//               if (result.success && result.payload) {  
//                   console.log('Media Type:::', action.mediaType);
//                   let response = result.payload;
//                   switch(action.mediaType) { 
//                     case MediaTypes.DOCUMENT: 
//                       response = response.documents
//                       break;
//                     case MediaTypes.IMAGE:
//                       response = response.images.map(obj=> ({ ...obj, mediaType: action.mediaType }))
//                       break;
//                     case MediaTypes.VIDEO:
//                       response = response.videos.map(obj=> ({ ...obj, mediaType: action.mediaType })) 
//                       break;
//                   }
//                   return CreateOfferActions.updateOfferMediaSuccess({
//                     response: response,
//                     mediaType: action.mediaType,
//                     actionType: MediaActions.DELETE
//                   })
//               }            
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.uploadOfferMediaFailure({ error : 'Media Upload Failed' })
//           )),
//         );
//       })
//     )
//   );

//   removePublishedOfferMedia$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(...[        
//         CreateOfferActions.removePublishedOfferMedia
//       ]),
//       switchMap((action) => {
//         return this.createOfferService.removeDraftOfferMedia(
//           { 
//             resourceId: action.id,
//             offerId: action.offerId
//           }, action.url)
//         .pipe(
//           map((result: any) => {       
//               if (result.success && result.payload) {  
//                   console.log('Media Type:::', action.mediaType);
//                   let response = result.payload;
//                   switch(action.mediaType) { 
//                     case MediaTypes.DOCUMENT: 
//                       response = response.documents
//                       break;
//                     case MediaTypes.IMAGE:
//                       response = response.images.map(obj=> ({ ...obj, mediaType: action.mediaType }))
//                       break;
//                     case MediaTypes.VIDEO:
//                       response = response.videos.map(obj=> ({ ...obj, mediaType: action.mediaType })) 
//                       break;
//                   }
//                   return CreateOfferActions.updateOfferMediaSuccess({
//                     response: response,
//                     mediaType: action.mediaType,
//                     actionType: MediaActions.DELETE
//                   })
//               }            
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.uploadOfferMediaFailure({ error : 'Media Upload Failed' })
//           )),
//         );
//       })
//     )
//   );

//   addUserAddress$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CreateOfferActions.addUserAddress),
//       switchMap((action) => {
//         return this.createOfferService.saveUserAddress(action.address).pipe(
//           map((resData: any) => {
//             console.log('results: ', resData);
//             return CreateOfferActions.addUserAddressSuccess({
//               address: resData.payload,
//               offer: action.offer,
//               message: 'User address added successfully'
//             });
//           }),
//           catchError(error => {
//             console.log('error: ', error);
//             return of(
//               CreateOfferActions.addUserAddressFailure({ error: error.error.message })
//             )
//           }),
//         );
//       })
//     )
//   );
  
//   postOffer$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CreateOfferActions.submitOffer),
//       withLatestFrom(this.store.select(submitOfferInfo)),
//       switchMap(([action, offerData]) => {
//         if(action.isDraftOffer) {
//           delete offerData.images;
//           delete offerData.videos;
//           delete offerData.documents;          
//         } else {
//             if(offerData.images.length) {
//               let images = offerData.images.map((obj, index) => ({
//                 ...obj,
//                 displayIndex: (index + 1).toString()
//               }))
//               offerData.images = images
//             }
//             if(offerData.videos.length) {
//               let videos = offerData.videos.map((obj, index) => ({
//                 ...obj,
//                 displayIndex: (index + 1).toString()
//               }))
//               offerData.videos = videos
//             }
//             if(offerData.documents.length) {
//               let documents = offerData.documents.map((obj, index) => ({
//                 ...obj,
//                 displayIndex: (index + 1).toString()
//               }))
//               offerData.documents = documents
//             }
//             if(offerData.draftOfferId) {
//               offerData.draftId = offerData.draftOfferId;
//             }
//         }        
//         if(offerData.offerType === CREATE_OFFER_TYPE.SERVICE) {
//           console.log('Initial Offer Timining:::', offerData.serviceTimingInfos);
//           let serviceTiming = offerData.serviceTimingInfos.map(obj => ({
//             ...obj,
//             timingInfoList: obj.timingInfoList.map(o => ({
//               ...o,
//               startTime: this.createOfferService.formatServiceTime(o.startTime),
//               endTime: this.createOfferService.formatServiceTime(o.endTime)
//             }))
//           }))
//           offerData.serviceTimingInfos = serviceTiming;
//           console.log('Offer Data:::', serviceTiming);
//         }
//         let offerPostData: UserOfferInfo = {
//           ...offerData,
//           ...action.formValue
//         }

//         return this.createOfferService.postOffer(offerPostData, action.url)
//         .pipe(
//           map((response: Response) => {
//             return CreateOfferActions.offerPostsuccess({
//               response: response.payload,
//               // currentScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE,
//               currentScreen: CURRENT_OFFER_SCREEN.OFFER_POSTING_LOADER_PAGE,
//               redirect: true
//             }) 
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.offerPostFailure({ 
//               error: error.error.payload,
//               currentScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE
//              })
//           )),
//         );
//       })
//     )
//   ); 

//   putOffer$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CreateOfferActions.putOffer),
//       withLatestFrom(this.store.select(submitOfferInfo)),
//       switchMap(([action, offerData]) => {
//         delete offerData.images;
//         delete offerData.videos;
//         delete offerData.documents;

//         if(offerData.offerType === CREATE_OFFER_TYPE.SERVICE) {
//           let serviceTiming = offerData.serviceTimingInfos.map(obj => ({
//             ...obj,
//             timingInfoList: obj.timingInfoList.map(o => ({
//               ...o,
//               startTime: this.createOfferService.formatServiceTime(o.startTime),
//               endTime: this.createOfferService.formatServiceTime(o.endTime)
//             }))
//           }))
//           offerData.serviceTimingInfos = serviceTiming;
//         }

//         let offerPostData: UserOfferInfo = {
//           ...offerData,
//           ...action.formValue
//         }

//         return this.createOfferService.putOffer(offerPostData, action.url)
//         .pipe(
//           map((response: Response) => {
//             return CreateOfferActions.offerPostsuccess({
//               response: response.payload,
//               currentScreen: CURRENT_OFFER_SCREEN.OFFER_POSTING_LOADER_PAGE,
//               redirect: true
//             }) 
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.offerPostFailure({   
//               error: error.error.payload,
//               currentScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE
//              })
//           )),
//         );
//       })
//     )
//   );

//   offerRedirect$ = createEffect(() => 
//       this.actions$.pipe(
//         ofType(CreateOfferActions.offerPostsuccess),
//         // delay(8000),
//         tap(action => action.redirect && this.router.navigate(['offer', action.response.offerId]))
//       ), { dispatch: false }
//   );

//   fetchOfferInitialData$ = createEffect(() => 
//     this.actions$.pipe(
//       ofType(CreateOfferActions.fetchOfferInitialData),
//       switchMap(({ offerType }) => {
//         const userAddress = this.createOfferService.fetchUserAllAddress();
//         const verticalCategory = this.createOfferService.fetchAllCategories(offerType)
//         return forkJoin([userAddress, verticalCategory]).pipe(
//           map(([userAddress, verticalCategory]) => {
//             return CreateOfferActions.fetchOfferInitialDataSuccess({  
//               userAllAddress: userAddress,
//               allVericalCategories: verticalCategory,
//               // currentScreen: CURRENT_OFFER_SCREEN.ADDITIONAL_OFFER_PAGE
//               currentScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE
//             });
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.fetchOfferInitialDataFailure({ error })
//           )),
//         );
//       })
//     )
//   );

//   fetchDraftData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CreateOfferActions.fetchDraftData),
//       switchMap((action) => {        
//         return this.createOfferService.getDraftOfferById(action.id)
//         .pipe(
//           tap(response => {
//             response.images.length && response.images.map(image => image.mediaType = 'image')
//             response.videos.length && response.videos.map(video => video.mediaType = 'video')
//             response.documents.length && response.documents.map(doc => doc.mediaType = 'document')
//           }),
//           map((response: UserOfferInfo) => {
//             console.log('Resp:::', response);
//             if(response.offerType === CREATE_OFFER_TYPE.SERVICE && response.serviceTimingInfos) {
//               response.serviceTimingInfos = response.serviceTimingInfos.map(obj => ({
//                   ...obj,
//                   state: true,
//                   prefix: titleCase(obj.dayOfWeek.slice(0,2)),
//                   timingInfoList: obj.timingInfoList.map(o => ({
//                     ...o,
//                     startTime: o.startTime,
//                     endTime: o.endTime
//                   }))
//                 }))
//             }
//             return CreateOfferActions.offerDraftDataSuccess({ response }) 
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.offerDraftDataFailure({ error : 'Offer Draft Data Fetching Failed' })
//           ))
//         );
//       })
//     )
//   );

//   removeDraftOffer$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CreateOfferActions.removeDraftOffer),
//       switchMap((action) => {
//         return this.createOfferService.removeDraftOfferById(action.id)
//         .pipe(
//           map((resData: any) => {
//             return CreateOfferActions.removeDraftOfferSuccess({
//               currentScreen: CURRENT_OFFER_SCREEN.PRIMARY_OFFER_PAGE,
//               redirect: true
//             });
//           }),
//           catchError((error: any) => {
//             return of(
//               CreateOfferActions.offerDraftDataFailure({ error : 'Offer Draft Data Fetching Failed' })
//             )
//           }),
//         );
//       })
//     )
//   );

//   removeDraftRedirect$ = createEffect(() => 
//       this.actions$.pipe(
//         ofType(CreateOfferActions.removeDraftOfferSuccess),
//         tap(action => action.redirect && this.router.navigateByUrl('/my-offers'))
//       ), { dispatch: false }
//   );

//   fetchPublishedData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(CreateOfferActions.fetchPublishedData),
//       switchMap((action) => {        
//         return this.createOfferService.fetchPublishedData(action.id)
//         .pipe(
//           tap(response => {
//             response.images.length && response.images.map(image => image.mediaType = 'image')
//             response.videos.length && response.videos.map(video => video.mediaType = 'video')
//             response.documents.length && response.documents.map(doc => doc.mediaType = 'document')
//           }),
//           map((response: UserOfferInfo) => {
//             console.log('Response:::', response);
//             if(response.offerType === CREATE_OFFER_TYPE.SERVICE && response.serviceTimingInfos) {
//               response.serviceTimingInfos = response.serviceTimingInfos.map(obj => ({
//                   ...obj,
//                   state: true,
//                   prefix: titleCase(obj.dayOfWeek.slice(0,2)),
//                   timingInfoList: obj.timingInfoList.map(o => ({
//                     ...o,
//                     startTime: o.startTime,
//                     endTime: o.endTime
//                   }))
//                 }))
//             }
//             return CreateOfferActions.offerDraftDataSuccess({ response }) 
//           }),
//           catchError((error: HttpErrorResponse) => of(
//             CreateOfferActions.offerDraftDataFailure({ error : 'Offer Draft Data Fetching Failed' })
//           ))
//         );
//       })
//     )
//   );
  
//   constructor(
//     private actions$: Actions,
//     private store: Store<gintaaApp.AppState>,
//     private router: Router,
//     private createOfferService: CreateOfferService
//   ) { }
// }
