import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import { MemberBusinessProfile, SupportedFireBaseClaims } from '@gintaa/core/models/firebase-claims';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FirebaseAuthService } from '@gintaa/core/services/firebase.auth.service';
import { BusinessService } from '@gintaa/modules/business/services/business.service';
import { CreateOfferService } from '@gintaa/modules/create-offer/services/create-offer.service';
import { Offer } from '@gintaa/shared/models/offer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { HomeDataService } from '../services/home-data.service';
import { UtilityActions } from './action-types';
import * as gintaaApp from '@gintaa/store/app.reducer';

@Injectable()
export class UtilityEffects {

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private homeDataService: HomeDataService,
        private businessService: BusinessService,
        public firebaseAuthService: FirebaseAuthService,
        private analyticsService: FirebaseAnalyticsService,
        private createOfferService: CreateOfferService,        
        private store: Store<gintaaApp.AppState>

    ) { }

    createBusinessProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.createBusinessProfile),
            switchMap((action) => {
                return this.homeDataService.createBusinessProfile(action.requestBody).pipe(
                    map((resData: any) => {
                        // Refetch business profile list
                        this.firebaseAuthService.updateToken();

                        this.callAnalytcsAfterAddProfile();
                        // UtilityActions.clearBusinessProfile();
                        // UtilityActions.reFetchBusinessProfile();

                        return UtilityActions.createBusinessProfileSuccess({
                            businessFormData: resData,
                            message: 'User address added successfully',
                            redirect: true
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.createBusinessProfileFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.createBusinessProfileFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.fetchBusinessProfile),
            switchMap((action) => {
                return this.homeDataService.fetchBusinessProfiles(action.status).pipe(
                    map((resData: any) => {
                        if (resData && resData.payload === null) {
                            return UtilityActions.fetchBusinessProfileEmpty({
                                message: resData.message
                            });
                        } else {
                            let businessData: MemberBusinessProfile[] = [];

                            if (action.status) {
                                resData.payload.forEach((b: any) => {
                                    businessData.push({
                                        businessId: b.id,
                                        businessName: b.name,
                                        logoUrl: b.logoUrl,
                                        businessRole: SupportedFireBaseClaims.BUSINESS_OWNER,
                                        verified: b.profileVerificationStatus,
                                    })
                                });
                            } else {
                                if (resData.payload.UNVERIFIED) {
                                    resData.payload.UNVERIFIED.forEach((b: any) => {
                                        businessData.push({
                                            businessId: b.id,
                                            businessName: b.name,
                                            logoUrl: b.logoUrl,
                                            businessRole: SupportedFireBaseClaims.BUSINESS_OWNER,
                                            verified: b.profileVerificationStatus,
                                        })
                                    });
                                }
                                if (resData.payload.VERIFIED) {
                                    resData.payload.VERIFIED.forEach((b: any) => {
                                        businessData.push({
                                            businessId: b.id,
                                            businessName: b.name,
                                            logoUrl: b.logoUrl,
                                            businessRole: SupportedFireBaseClaims.BUSINESS_OWNER,
                                            verified: b.profileVerificationStatus,
                                        })
                                    });
                                }
                            }

                            return UtilityActions.fetchBusinessProfileSuccess({
                                businessFormData: businessData,
                                message: 'Accounts fetched successfully',
                                redirect: true
                            });
                        }
                    }),
                    catchError(error => {
                        return of(
                            UtilityActions.fetchBusinessProfileFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchMemberBusinessProfiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.fetchMemberBusinessProfiles),
            switchMap((action) => {
                return this.homeDataService.fetchMemberBusinessProfiles().pipe(
                    map((resData: any) => {
                        if (resData && resData.payload === null) {
                            return UtilityActions.fetchMemberBusinessProfilesEmpty({
                                message: resData.message || 'No business is associated with the member'
                            });
                        } else {
                            let businessData = [];

                            if (resData.payload.OWNER) {
                                businessData = [
                                    ...businessData,
                                    ...resData.payload.OWNER.map((b: any) => {
                                        return { ...b, verified: true }
                                    }),
                                ]
                            }
                            if (resData.payload.ADMIN) {
                                businessData = [
                                    ...businessData,
                                    ...resData.payload.ADMIN.map((b: any) => {
                                        return { ...b, verified: true }
                                    }),
                                ]
                            }
                            if (resData.payload.MEMBER) {
                                businessData = [
                                    ...businessData,
                                    ...resData.payload.MEMBER.map((b: any) => {
                                        return { ...b, verified: true }
                                    }),
                                ]
                            }

                            return UtilityActions.fetchMemberBusinessProfilesSuccess({
                                businessData,
                                message: 'Accounts fetched successfully',
                                redirect: true
                            });
                        }
                    }),
                    catchError(error => {
                        return of(
                            UtilityActions.fetchBusinessProfileFailure({
                                error: error?.error?.message
                            })
                        )
                    }),
                );
            })
        )
    );

    businessRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.createBusinessProfileSuccess),
            delay(8000),
            tap(action => action.redirect && this.router.navigate(['business']))
        ), { dispatch: false }
    );

    addOfferToFavourite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.addOfferToFavourite),
            mergeMap((action) => {
                return this.homeDataService.addOfferToFavourite(action.offerId)
                    .pipe(
                        map((res: any) => {
                            
                            this.store.dispatch(
                                UtilityActions.getFavouriteOfferCount({
                                    offerId : action.offerId
                                })
                            )

                            return UtilityActions.addRemoveOfferToFavouriteSuccess({
                                offerId: action.offerId
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.addRemoveOfferToFavouriteFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    })

    removeOfferFromFavourite$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.removeOfferFromFavourite),
            mergeMap((action) => {
                return this.homeDataService.removeOfferFromFavourite(action.offerId)
                    .pipe(
                        map((res: any) => {                            
                            
                            this.store.dispatch(
                                UtilityActions.getFavouriteOfferCount({
                                    offerId : action.offerId
                                })
                            )

                            // remove that offer from store
                            return UtilityActions.removeOfferFromFavouriteSuccess({
                                offerId: action.offerId
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.removeOfferFromFavouriteFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    })

    getFavouriteOfferCount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.getFavouriteOfferCount),
            mergeMap((action) => {
                return this.homeDataService.getFavouriteOfferCount(action.offerId)
                    .pipe(
                        map((res: any) => {
                            return UtilityActions.getFavouriteOfferCountSuccess({
                                response: res.payload
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.getFavouriteOfferCountFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    })

    getOfferStatistics$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.getOfferStatistics),
            mergeMap((action) => {
                return this.homeDataService.getOfferStatistics(action.offerId)
                    .pipe(
                        map((res: any) => {
                            return UtilityActions.getFavouriteOfferCountSuccess({
                                response: res.payload
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.getFavouriteOfferCountFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    })

    getOffersMatchBox$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.getOffersMatchBox),
            mergeMap((action) => {
                return this.homeDataService.getmatchData('5')
                    .pipe(
                        map((res: any) => {
                            return UtilityActions.getOffersMatchBoxSuccess({
                                response: res?.payload ? res.payload : []
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.getOffersMatchBoxFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    })

    getLatestDraftOffer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.fetchLatestDraftOffer),
            mergeMap((action) => {
                return this.homeDataService.getUserDraftOffers()
                    .pipe(
                        map((res: Offer[]) => {
                            return UtilityActions.fetchLatestDraftOfferSuccess({
                                response: res
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.fetchLatestDraftOfferFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    });

    getCurrentBusinessMembers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.getCurrentBusinessActiveMembers),
            mergeMap((action) => {
                return this.businessService.fetchBusinessMembers(action.businessId)
                    .pipe(
                        map((res: any) => {
                            return UtilityActions.getCurrentBusinessActiveMembersSuccess({
                                response: res.payload.Accepted
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.getCurrentBusinessActiveMembersFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    });

    delegateBusinessOffer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UtilityActions.delegateBusinessOffer),
            mergeMap((action) => {
                return this.businessService.delegateBusinessOffer(action.offerId, action.memberIdentityId)
                    .pipe(
                        map((res: any) => {
                            return UtilityActions.delegateBusinessOfferSuccess({
                                payload: res.payload,
                                message: res.message
                            })
                        }),
                        catchError((error) => {
                            return of(UtilityActions.delegateBusinessOfferFailure({
                                message: error.message
                            }));
                        })
                    )
            })
        )
    })

    ///////////////////// Start business invitation //////////////////////////////

    fetchBusinessInvitations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.fetchBusinessInvitations),
            switchMap((action) => {
                return this.homeDataService.fetchBusinessInvitations().pipe(
                    map((resData: any) => {
                        const businessInvitations = [];

                        if (resData.payload && resData.payload.Denied.length > 0) {
                            resData.payload.Denied.forEach(invites => {
                                businessInvitations.push({
                                    ...invites,
                                    status: 'DENIED'
                                })
                            });
                        }

                        if (resData.payload && resData.payload.Pending.length > 0) {
                            resData.payload.Pending.forEach(invites => {
                                businessInvitations.push({
                                    ...invites,
                                    status: 'PENDING'
                                })
                            });
                        }

                        return UtilityActions.fetchBusinessInvitationsSuccess({
                            businessInvitations,
                            message: 'Accounts fetched successfully',
                        });
                    }),
                    catchError(error => {
                        return of(
                            UtilityActions.fetchBusinessInvitationsFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    acceptInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.acceptInvitation),
            switchMap((action) => {
                return this.homeDataService.acceptInvitation(action.businessId).pipe(
                    map((resData: any) => {
                        if (resData.payload && resData.payload.accepted) {
                            this.firebaseAuthService.updateToken();
                            return UtilityActions.acceptInvitationSuccess();
                        }
                    }),
                    catchError(error => {
                        return of(
                            UtilityActions.acceptInvitationFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    rejectInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.rejectInvitation),
            switchMap((action) => {
                return this.homeDataService.rejectInvitation(action.businessId, action.reason).pipe(
                    map((resData: any) => {

                        return UtilityActions.rejectInvitationSuccess();
                    }),
                    catchError(error => {
                        return of(
                            UtilityActions.rejectInvitationFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );    
    ///////////////////// End business invitation ///////////////////////////////

    callAnalytcsAfterAddProfile() {
        let eventName = FirebaseAnalyticsEnum.createBusinessProfile
        this.analyticsService.logEvents(eventName);
    }


    ///////////////// Add bank credential /////////////////////////////////
    

    addReceivePaymentDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.addReceivePaymentDetails),
            switchMap((action) => {
                return this.homeDataService.addReceiveAccountCredential(action.paymentPostObject).pipe(
                    map((resData: any) => {

                        return UtilityActions.addReceivePaymentDetailsSuccess({
                            message: 'Account successfully added'
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.addReceivePaymentDetailsFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.addReceivePaymentDetailsFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );
    updateReceivePaymentDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.updateReceivePaymentDetails),
            switchMap((action) => {
                return this.homeDataService.updateReceivePaymentDetails(action.paymentPostObject).pipe(
                    map((resData: any) => {

                        return UtilityActions.updateReceivePaymentDetailsSuccess({
                            message: resData.message
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.updateReceivePaymentDetailsFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.updateReceivePaymentDetailsFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );



    getAllReceivePaymentList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.getAllReceivePaymentList),
            switchMap((action) => {
                return this.homeDataService.getAllReceiveAccountCredentialList().pipe(
                    map((resData: any) => {                        
                        return UtilityActions.getAllReceivePaymentListSuccess({
                            message: 'Get list successfully',
                            accountList: resData.payload
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.getAllReceivePaymentListFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.getAllReceivePaymentListFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );

    getAllReceivePaymentListForBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.getAllReceivePaymentListForBusiness),
            switchMap((action) => {
                return this.homeDataService.getAllReceivePaymentListForBusiness(action.businessId).pipe(
                    map((resData: any) => {                        
                        return UtilityActions.getAllReceivePaymentListForBusinessSuccess({
                            message: 'Get list successfully',
                            accountList: resData.payload
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.getAllReceivePaymentListForBusinessFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.getAllReceivePaymentListForBusinessFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );

    deleteReceivePaymentAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.deleteReceivePaymentAccount),
            switchMap((action) => {
                return this.homeDataService.deleteReceivePaymentAccount(action.paymentDetailId).pipe(
                    map((resData: any) => {                        
                        return UtilityActions.deleteReceivePaymentAccountSuccess({
                            message: resData.message
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.deleteReceivePaymentAccountFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.deleteReceivePaymentAccountFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );

    deleteReceivePaymentAccountForBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.deleteReceivePaymentAccountForBusiness),
            switchMap((action) => {
                return this.homeDataService.deleteReceivePaymentAccountForBusiness(action.paymentDetailId, action.businessId).pipe(
                    map((resData: any) => {                        
                        return UtilityActions.deleteReceivePaymentAccountSuccess({
                            message: resData.message
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.deleteReceivePaymentAccountFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.deleteReceivePaymentAccountFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );

    

    getMigrationDataForBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UtilityActions.getMigrationDataForBusiness),
            switchMap((action) => {
                return this.homeDataService.getMigrationDataForBusiness().pipe(
                    map((resData: any) => {                        
                        return UtilityActions.getMigrationDataForBusinessSuccess({
                            migrationData: resData.payload
                        });
                    }),
                    catchError(error => {
                        if (error.error.payload) {
                            return of(
                                UtilityActions.getMigrationDataForBusinessFailure({ error: error.error?.payload })
                            )
                        }

                        return of(
                            UtilityActions.getMigrationDataForBusinessFailure({ error: error?.error?.message })
                        )
                    }),
                );
            })
        )
    );

}