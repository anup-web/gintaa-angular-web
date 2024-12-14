import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DealService } from '../services/deal.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DealActions } from './action-types';
import localization from '@gintaa/config/localization';

@Injectable()
export class DealEffects {

    constructor(
        private actions$: Actions,
        private dealService: DealService,
    ) { }

    fetchAllDeal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchAllDeal),
            switchMap((action) => {
                return this.dealService.getAllDeal(action.input).pipe(
                    map((response: any) => {
                        if (response && response.success === false) {
                            return DealActions.fetchAllDealFailure({
                                error: {
                                    message: response.message,
                                    status: 403
                                },
                                append: action.append,
                                currentFetch: action.currentFetch
                            })
                        }
                        return DealActions.fetchAllDealSuccess({
                            responseData: response.payload,
                            append: action.append,
                            currentFetch: action.currentFetch
                        });
                    }),
                    catchError(error => {
                        if (error && (error.status === '404' || error.error?.status === '404')) {
                            return of(
                                DealActions.fetchAllDealEmpty()
                            );
                        } else {
                            return of(
                                DealActions.fetchAllDealFailure({
                                    error: error.error,
                                    append: action.append,
                                    currentFetch: action.currentFetch
                                })
                            )
                        }
                    }),
                );
            })
        )
    );

    fetchUserOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchUserOffer),
            switchMap((action) => {
                return this.dealService.getUserOffer(action.offerId).pipe(
                    map((response: any) => {
                        const responseData = response.filter((res) => {
                            return action.offerId == res.offerId;
                        })
                        const selectedOffers = responseData.map((res) => {
                            let selectedQuantity = res?.moq ? res?.moq : 1;
                            return action.offerId == res.offerId ? { selectedOffer: true, offerType: res.offerType, selectedQuantity: selectedQuantity, offerId: res.offerId } : { selectedOffer: false, offerType: res.offerType, selectedQuantity: selectedQuantity, offerId: res.offerId }
                        });
                        return DealActions.fetchUserOfferSuccess({ responseData: responseData, selectedOffers: selectedOffers });
                    }),
                    catchError(error => of(
                        DealActions.fetchUserOfferFailure({ error: error.error })
                    )),
                );
            })
        )
    );

    fetchUserAllOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchUserAllOffer),
            switchMap((action) => {
                return this.dealService.getUserCounterPartyAllOffer(action.userId, action.isBusiness, action.offerId).pipe(
                    map((response: any) => {
                        const responseDataMap = response.filter((res) => action.offerId != res.offerId);
                        const responseDataMapQty = responseDataMap.filter((offer) => {
                            if (offer.auctioned || offer.free || offer.exchangeMode == 'Money') {
                                return false;
                            } else {
                                return offer.offerType == 'Service' ? true : (offer.quantity > 0 ? true : false);
                            }
                        });
                        const selectedOffers = responseDataMapQty.map((res) => {
                            const selectedQuantity = res?.moq ? res?.moq : 1;
                            return action.offerId == res.offerId ? { selectedOffer: true, offerType: res.offerType, selectedQuantity: selectedQuantity, offerId: res.offerId } : { selectedOffer: false, offerType: res.offerType, selectedQuantity: selectedQuantity, offerId: res.offerId }
                        });
                        return DealActions.fetchUserAllOfferSuccess({ responseData: responseDataMapQty, selectedOffers: selectedOffers });
                    }),
                    catchError(error => of(
                        DealActions.fetchUserAllOfferFailure({ error: error.error })
                    )),
                );
            })
        )
    );

    fetchMyOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchMyOffer),
            switchMap((action) => {
                return this.dealService.getUserAllOffer(action.userId, action.isBusiness).pipe(
                    map((response: any) => {
                        const responseDataMapQty = response.filter((offer) => {
                            if (offer.auctioned || offer.free || offer.exchangeMode == 'Money') {
                                return false;
                            } else {
                                return offer.offerType == 'Service' ? true : (offer.quantity > 0 ? true : false);
                            }
                        });
                        const selectedOffers = responseDataMapQty.map((res) => {
                            const selectedQuantity = res?.moq ? res?.moq : 1;
                            return { selectedOffer: false, offerType: res.offerType, selectedQuantity: selectedQuantity, offerId: res.offerId }
                        });
                        return DealActions.fetchMyOfferSuccess({ responseData: responseDataMapQty, selectedOffers: selectedOffers, page: 1 });
                    }),
                    catchError(error => of(
                        DealActions.fetchMyOfferFailure({ error: error.error })
                    )),
                );
            })
        )
    );

    suggestDeal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.suggestDeal),
            switchMap((action) => {
                return this.dealService.initiateDeal(action.initiateDealRequestObject).pipe(
                    map((response: any) => {
                        return DealActions.suggestDealSuccess({ response: response['body']['payload'] });
                    }),
                    catchError(err => of(
                        DealActions.suggestDealFailure({ error: err?.error ? err.error : null })
                    )),
                );
            })
        )
    );

    reviseDeal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.reviseDeal),
            switchMap((action) => {
                return this.dealService.reviseDeal(action.initiateDealRequestObject).pipe(
                    map((response: any) => {
                        return DealActions.suggestDealSuccess({ response: response['body']['payload'] });
                    }),
                    catchError(err => of(
                        DealActions.reviseDealFailure({ error: err?.error ? err.error : null })
                    )),
                );
            })
        )
    );

    addDealInFavourite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.addDealInFavourite),
            switchMap((action) => {
                return this.dealService.addFavouriteDeal(action.dealRefId).pipe(
                    map((response: any) => {
                        return DealActions.addDealInFavouriteSuccess({ response: response });
                    }),
                    catchError(error => of(
                        DealActions.addDealInFavouriteFailure({ error: error?.error ? error.error : null })
                    )),
                );
            })
        )
    );

    fetchAllJunctions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchAllJunctions),
            switchMap((action) => {
                return this.dealService.getJintaaJunctions(action.lat, action.lng, action.destinationOfferId).pipe(
                    map((response: any) => {
                        let responseData = response?.payload ? response.payload : [];
                        return DealActions.fetchAllJunctionsSuccess({ response: responseData });
                    }),
                    catchError(error => of(
                        DealActions.fetchAllJunctionsFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    fetchDealDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchDealDetails),
            switchMap((action) => {
                return this.dealService.getDealDetails(action.dealRefId).pipe(
                    map((response: any) => {
                        if (response.payload) {
                            return DealActions.fetchDealDetailsSuccess({
                                responseData: response.payload
                            });
                        } else {
                            // there must be some data mismatch
                            // set some error message and throw error
                            return DealActions.fetchDealDetailsEmpty({
                                message: response.message
                            });
                        }
                    }),
                    catchError(error => of(
                        DealActions.fetchDealDetailsFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    fetchDealDetailsMock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchDealDetailsMock),
            switchMap((action) => {
                return this.dealService.getDealDetailsMock(action.dealRefId).pipe(
                    map((response: any) => {
                        if (response.payload.length > 0) {
                            return DealActions.fetchDealDetailsSuccess({
                                responseData: response.payload[0]
                            });
                        }
                    }),
                    catchError(error => of(
                        DealActions.fetchDealDetailsFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    fetchDealDetailsFromFavourites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchDealDetailsFromFavourites),
            switchMap((action) => {
                return this.dealService.getAllFavouriteDeal(0, 50).pipe(
                    map((response: any) => {
                        return DealActions.fetchDealDetailsSuccess({ responseData: response });
                    }),
                    catchError(error => of(
                        DealActions.fetchDealDetailsFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    fetchDealSnapshotMock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchDealSnapshotMock),
            switchMap((action) => {
                return this.dealService.getDealSnapshot(action.dealRefId).pipe(
                    map((response: any) => {
                        return DealActions.fetchDealSnapshotSuccess({
                            responseData: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.fetchDealDetailsFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    fetchDealHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchDealHistory),
            switchMap((action) => {
                return this.dealService.getDealHistory(action.dealRefId).pipe(
                    map((response: any) => {
                        return DealActions.fetchDealHistorySuccess({
                            responseData: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.fetchDealHistoryFailure({ error: error.error?.message ? error.error?.message : localization.deal.HISTORY_FAILED })
                    )),
                );
            })
        )
    );

    fetchDealRating$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchDealRating),
            switchMap((action) => {
                return this.dealService.getDealRating(action.dealRefId, action.receiverIdentityId, action.senderIdentityId).pipe(
                    map((response: any) => {
                        return DealActions.fetchDealRatingSuccess({
                            responseData: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.fetchDealRatingFailure({ error: error.message })
                    )),
                );
            })
        )
    );


    fetchUserAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchUserAddress),
            switchMap((action) => {
                return this.dealService.getUserAddress().pipe(
                    map((response: any) => {
                        return DealActions.fetchUserAddressSuccess({
                            responseData: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.fetchUserAddressFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    fetchUserLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchUserLocation),
            switchMap((action) => {
                return this.dealService.getUserLocation(action.offerId, action.currentLocation).pipe(
                    map((response: any) => {
                        return DealActions.fetchUserLocationSuccess({
                            responseData: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.fetchUserLocationFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    acceptDeal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.acceptDeal),
            switchMap((action) => {
                return this.dealService.acceptDeal(action.dealRefId, '').pipe(
                    map((response: any) => {
                        return DealActions.acceptDealSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.acceptDealFailure({ error: error.error?.message ? error.error?.message : localization.deal.DEAL_ACCEPT_FAILED })
                    )),
                );
            })
        )
    );

    acceptDealDoorStep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.acceptDealDoorStep),
            switchMap((action) => {
                return this.dealService.acceptDeal(action.dealRefId, action.doorStepDeliveryInfo).pipe(
                    map((response: any) => {
                        return DealActions.acceptDealSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.acceptDealFailure({ error: error.error?.message ? error.error?.message : localization.deal.DEAL_ACCEPT_FAILED })
                    )),
                );
            })
        )
    );

    rejectDeal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.rejectDeal),
            switchMap((action) => {
                return this.dealService.rejectDeal({ dealRefId: action.dealRefId }).pipe(
                    map((response: any) => {
                        return DealActions.rejectDealSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.rejectDealFailure({ error: error.error })
                    )),
                );
            })
        )
    );

    resendOtpStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.resendOtpStart),
            switchMap((action) => {
                return this.dealService.generateCloseDealOtp(action.dealRefId).pipe(
                    map((response: any) => {
                        return DealActions.resendOtpSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(err => of(
                        DealActions.resendOtpFailure({ error: err?.error ? err.error?.message : localization.deal.OTP_GENERATE_FAILED })
                    )),
                );
            })
        )
    );

    closeDeal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.closeDeal),
            switchMap((action) => {
                return this.dealService.closeDeal(action.dealRefId, action.otp).pipe(
                    map((response: any) => {
                        return DealActions.closeDealSuccess({
                            response: response['payload']['dealState']
                        });
                    }),
                    catchError(err => of(
                        DealActions.closeDealFailure({ error: err?.error ? err.error : 'Failed to validate otp' })
                    )),
                );
            })
        )
    );

    getRatingConfig$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getRatingConfig),
            switchMap((action) => {
                return this.dealService.getRatingConfig().pipe(
                    map((response: any) => {
                        return DealActions.getRatingConfigSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.getRatingConfigFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    getQuestionsForRatingContext$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getQuestionsForRatingContext),
            switchMap((action) => {
                return this.dealService.getQuestionsForRatingContext(action.contextId, action.newValue).pipe(
                    map((response: any) => {
                        return DealActions.getQuestionsForRatingContextSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.getQuestionsForRatingContextFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    getQuestionsForRating$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getQuestionsForRating),
            switchMap((action) => {
                return this.dealService.getQuestionsForRating(action.newValue).pipe(
                    map((response: any) => {
                        return DealActions.getQuestionsForRatingSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(error => of(
                        DealActions.getQuestionsForRatingFailure({ error: error.message })
                    )),
                );
            })
        )
    );

    saveDealUserRating$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.saveDealUserRating),
            switchMap((action) => {
                return this.dealService.saveDealUserRating(action.requestData).pipe(
                    map((response: any) => {
                        return DealActions.saveDealUserRatingSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(err => of(
                        DealActions.saveDealUserRatingFailure({ error: err?.error ? err.error?.message : localization.deal.DEAL_RATING_FAILED })
                    )),
                );
            })
        )
    );

    saveDealGintaaRating$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.saveDealGintaaRating),
            switchMap((action) => {
                return this.dealService.saveDealUserRating(action.requestData).pipe(
                    map((response: any) => {
                        return DealActions.saveDealGintaaRatingSuccess({
                            response: response.payload
                        });
                    }),
                    catchError(err => of(
                        DealActions.saveDealGintaaRatingFailure({ error: err?.error ? err.error?.message : 'Failed to post rating, please try after some time' })
                    )),
                );
            })
        )
    );
    fetchThirdPartyData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchThirdPartyData),
            switchMap((action) => {
                return this.dealService.fetchThirdPartyData().pipe(
                    map((response: any) => {
                        return DealActions.fetchThirdPartyDataSuccess({
                            response: response
                        });
                    }),
                    catchError(err => of(
                        DealActions.fetchThirdPartyDataFailure({ error: err?.error ? err.error?.message : 'Something went wrong, please try after some time' })
                    )),
                );
            })
        )
    );

    fetchThirdPartyVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchThirdPartyVendor),
            switchMap((action) => {
                return this.dealService.fetchThirdPartyVendor(action.query).pipe(
                    map((response: any) => {
                        let responseData = [];
                        if (response['payload'] && response['payload']['data'] && response['payload']['data']['available_courier_companies']) {
                            responseData = response['payload']['data']['available_courier_companies']
                        }
                        return DealActions.fetchThirdPartyVendorSuccess({
                            response: responseData
                        });
                    }),
                    catchError(err => of(
                        DealActions.fetchThirdPartyVendorFailure({ error: err?.error ? err.error?.message : 'Something went wrong, please try after some time' })
                    )),
                );
            })
        )
    );

    fetchThirdPartyDataShow$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.fetchThirdPartyDataShow),
            switchMap((action) => {
                return this.dealService.fetchThirdPartyDataShow().pipe(
                    map((response: any) => {
                        return DealActions.fetchThirdPartyDataShowSuccess({
                            response: response
                        });
                    }),
                    catchError(err => of(
                        DealActions.fetchThirdPartyDataShowFailure({ error: err?.error ? err.error?.message : 'Something went wrong, please try after some time' })
                    )),
                );
            })
        )
    );

    getOfferByIds = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getOfferByIds),
            switchMap((action) => {
                return this.dealService.getOfferByIds(action.offerIds).pipe(
                    map((response: any) => {
                        const responseDataMap = response.map((res) => {
                            const selectedQty = action.offerIds.find((val) => val.offerId == res.offerId);
                            return { ...res, selectedOffer: true, selectedQuantity: selectedQty.offerCount }
                        });
                        return DealActions.getOfferByIdsSuccessSender({
                            response: responseDataMap,
                            usertype: action.usertype
                        });

                    }),
                    catchError(err => of(
                        DealActions.getOfferByIdsFailure({ error: err?.error ? err.error?.message : localization.deal.OFFER_NOT_FOUND })
                    )),
                );
            })
        )
    );

    getOfferByReceiverIds = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getOfferByReceiverIds),
            switchMap((action) => {
                return this.dealService.getOfferByIds(action.offerIds).pipe(
                    map((response: any) => {
                        const responseDataMap = response.map((res) => {
                            const selectedQty = action.offerIds.find((val) => val.offerId == res.offerId);
                            return { ...res, selectedOffer: true, selectedQuantity: selectedQty.offerCount }
                        })
                        return DealActions.getOfferByIdsSuccessReceiver({
                            response: responseDataMap,
                            usertype: action.usertype
                        });
                    }),
                    catchError(err => of(
                        DealActions.getOfferByIdsFailure({ error: err?.error ? err.error?.message : localization.deal.OFFER_NOT_FOUND })
                    )),
                );
            })
        )
    );

    getReceiverOfferByUserId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getReceiverOfferByUserId),
            switchMap((action) => {
                return this.dealService.getUserAllOfferById(action.userId, action.businessId).pipe(
                    map((response: any) => {
                        const responseDataMapQty = response.filter((offer) => {
                            const selectedQty = action.offerIds.find((val) => val.offerId == offer.offerId);
                            if (selectedQty) {
                                return true;
                            } else {
                                if (offer.auctioned || offer.free || offer.exchangeMode == 'Money') {
                                    return false;
                                } else {
                                    return offer.offerType == 'Service' ? true : (offer.quantity > 0 ? true : false);
                                }
                            }
                        });

                        const selectedOffers = responseDataMapQty.map((res) => {
                            const selectedQty = action.offerIds.find((val) => val.offerId == res.offerId);
                            const selectedQuantity = res?.moq ? res?.moq : 1;
                            return selectedQty ? { selectedOffer: true, selectedQuantity: selectedQty.offerCount, offerType: res.offerType, offerId: res.offerId } : { selectedOffer: false, selectedQuantity: selectedQuantity, offerType: res.offerType, offerId: res.offerId }
                        });
                        return DealActions.getReceiverOfferByIdSuccess({ responseData: responseDataMapQty, selectedOffers: selectedOffers });
                    }),
                    catchError(error => of(
                        DealActions.getReceiverOfferByIdFailure({ error: error.error })
                    )),
                );
            })
        )
    );

    getSenderOfferByUserId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DealActions.getSenderOfferByUserId),
            switchMap((action) => {
                return this.dealService.getUserAllOfferById(action.userId, action.businessId).pipe(
                    map((response: any) => {
                        let offerIds = [];
                        if (action.offerIds && Array.isArray(action.offerIds)) {
                            offerIds = action.offerIds;
                        }
                        const responseDataMapQty = response.filter((offer) => {
                            const selectedQty = offerIds.find((val) => val.offerId == offer.offerId);
                            if (selectedQty) {
                                return true;
                            } else {
                                if (offer.auctioned || offer.free || offer.exchangeMode == 'Money') {
                                    return false;
                                } else {
                                    return offer.offerType == 'Service' ? true : (offer.quantity > 0 ? true : false);
                                }
                            }
                        });
                        const selectedOffers = responseDataMapQty.map((res) => {
                            const selectedQty = offerIds.find((val) => val.offerId == res.offerId);
                            const selectedQuantity = res?.moq ? res?.moq : 1;
                            return selectedQty ? { selectedOffer: true, selectedQuantity: selectedQty.offerCount, offerType: res.offerType, offerId: res.offerId } : { selectedOffer: false, selectedQuantity: selectedQuantity, offerType: res.offerType, offerId: res.offerId }
                        });
                        return DealActions.getSenderOfferByIdSuccess({ responseData: responseDataMapQty, selectedOffers: selectedOffers });
                    }),
                    catchError(error => of(
                        DealActions.getSenderOfferByIdFailure({ error: error.error })
                    )),
                );
            })
        )
    );

}
