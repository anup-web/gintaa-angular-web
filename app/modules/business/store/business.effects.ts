import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BusinessActions } from './action-types';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BusinessService } from '../services/business.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class BusinessEffects {
    
    fetchBusinessProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessProfile),
            switchMap((action) => {
                return this.businessService.fetchBusinessProfiles().pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessProfileSuccess({
                            businessFormData: resData.payload,
                            message: 'Accounts fetched successfully',
                            redirect: true
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessProfileFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessInvitations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessInvitations),
            switchMap((action) => {
                return this.businessService.fetchBusinessInvitations().pipe(
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

                        return BusinessActions.fetchBusinessInvitationsSuccess({
                            businessInvitations,
                            message: 'Accounts fetched successfully',
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessInvitationsFailure({
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
            ofType(BusinessActions.acceptInvitation),
            switchMap((action) => {
                return this.businessService.acceptInvitation(action.businessId).pipe(
                    map((resData: any) => {
                        if (resData.payload && resData.payload.accepted) {
                            return BusinessActions.acceptInvitationSuccess();
                        }
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.acceptInvitationFailure({
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
            ofType(BusinessActions.rejectInvitation),
            switchMap((action) => {
                return this.businessService.rejectInvitation(action.businessId, action.reason).pipe(
                    map((resData: any) => {
                        return BusinessActions.rejectInvitationSuccess();
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.rejectInvitationFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    activateBusinessProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.activateBusinessProfile),
            switchMap((action) => {
                return this.businessService.activateBusinessProfile().pipe(
                    map((resData: any) => {
                        return BusinessActions.activateBusinessProfileSuccess({
                            message: 'Accounts fetched successfully'
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.activateBusinessProfileFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    deActivateBusinessProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.deActivateBusinessProfile),
            switchMap((action) => {
                return this.businessService.deActivateBusinessProfile().pipe(
                    map((resData: any) => {
                        return BusinessActions.deActivateBusinessProfileSuccess({
                            message: 'Accounts fetched successfully'
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.deActivateBusinessProfileFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessDetails),
            switchMap((action) => {
                return this.businessService.fetchBusinessDetails(action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessDetailsSuccess({
                            message: 'Business Details fetched successfully',
                            businessDetails: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessDetailsFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessDetailsBySlug$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessDetailsBySlug),
            switchMap((action) => {
                return this.businessService.fetchBusinessDetailsBySlug(action.businessSlug).pipe(
                    map((resData: any) => {

                        // if(resData)
                        const businessId = (resData.payload) ? resData.payload.id : null;
                        if(businessId) {
                            this.store.dispatch(
                                BusinessActions.fetchBusinessAllPublishedOffers({
                                    businessId,
                                    showCompletedOffers: true,
                                })
                              );
                            
                            // console.log(':::::::: businessId:', businessId);
                        }

                        return BusinessActions.fetchBusinessDetailsSuccess({
                            message: 'Business Details fetched successfully',
                            businessDetails: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessDetailsFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    uploadBusinessCoverImage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.uploadBusinessCoverImage),
            switchMap((action) => {
                return this.businessService.uploadBusinessCoverImage(action.formData, action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.uploadBusinessCoverImageComplete({
                            responseData: resData.body.payload,
                            businessId: action.businessId
                        });
                    }),
                    catchError(error => of(
                        BusinessActions.uploadBusinessCoverImageFailure({ error })
                    )),
                );
            })
        )
    );

    uploadBusinessLogo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.uploadBusinessLogo),
            switchMap((action) => {
                return this.businessService.uploadBusinessLogo(action.formData, action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.uploadBusinessLogoComplete({
                            responseData: resData.body.payload,
                            businessId: action.businessId
                        });
                    }),
                    catchError(error => of(
                        BusinessActions.uploadBusinessCoverImageFailure({ error })
                    )),
                );
            })
        )
    );

    updateBusinessColor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.updateBusinessColor),
            switchMap((action) => {
                return this.businessService.updateBusinessColor(action.businessId, action.color).pipe(
                    map((resData: any) => {
                        return BusinessActions.updateBusinessColorSuccess({
                            color: action.color,
                            message: resData.message,
                        });
                    }),
                    catchError(error => of(
                        BusinessActions.updateBusinessColorFailure({ error })
                    )),
                );
            })
        )
    );

    deleteBusinessLogo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.deleteBusinessLogo),
            switchMap((action) => {
                return this.businessService.deleteBusinessLogo(action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.deleteBusinessLogoSuccess({
                            message: resData.message
                        });
                    }),
                    catchError(error => of(
                        BusinessActions.deleteBusinessLogoFailure({ error })
                    )),
                );
            })
        )
    );

    addUserAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.addAddress),
            switchMap((action) => {
                return this.businessService.addBusinessAddress(action.address, action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.addAddressSuccess({
                            address: resData.payload,
                            message: 'User address added successfully'
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.addAddressFailure({ error: error.error.message })
                        )
                    }),
                );
            })
        )
    );

    editUserAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.editAddress),
            switchMap((action) => {
                return this.businessService.updateBusinessAddress(action.address, action.addressId, action.businessId).pipe(
                    map((resData: any) => {
                        // console.log('results: ', resData);
                        this.store.dispatch(
                            BusinessActions.editAddressSuccess({
                                address: action.address,
                                message: 'User address update successfully'
                            })
                        );

                        return BusinessActions.fetchBusinessDetails({
                            businessId: action.businessId
                        });
                        
                        // return BusinessActions.editAddressSuccess({
                        //     address: action.address,
                        //     message: 'User address update successfully'
                        // });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.addAddressFailure({ error: error.error.message })
                        )
                    }),
                );
            })
        )
    );

    removeBusinessAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.removeBusinessAddress),
            switchMap((action) => {
                return this.businessService.removeBusinessAddress(action.addressId, action.businessId).pipe(
                    map((resData: any) => {
                        // console.log('results: ', resData);
                        // return BusinessActions.editAddressSuccess({
                        //     address: action.address,
                        //     message: 'User address update successfully'
                        // });
                        return BusinessActions.fetchBusinessDetails({
                            businessId: action.businessId
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.addAddressFailure({ error: error.error.message })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessMembers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessMembers),
            switchMap((action) => {
                return this.businessService.fetchBusinessMembers(action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessMembersSuccess({
                            message: 'Business Details fetched successfully',
                            members: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessMembersFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    updateBusinessMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.updateBusinessMember),
            switchMap((action) => {
                return this.businessService.updateBusinessMember(action.businessId, action.memmberId, action.selectedRoleId ).pipe(
                
                    map((resData: any) => {
                        return BusinessActions.updateBusinessMemberSuccess({
                            userId: action.memmberId, //action.member.userId,
                            message: 'Successfully updated member information'
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.updateBusinessMemberFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    removeBusinessMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.removeBusinessMember),
            switchMap((action) => {
                return this.businessService.removeBusinessMember(action.member).pipe(
                    map((resData: any) => {
                        return BusinessActions.removeBusinessMemberSuccess({
                            userId: '', //action.member.userId,
                            message: 'Successfully removed member information'
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.removeBusinessMemberFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    addBusinessMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.addBusinessMember),
            switchMap((action) => {
                return this.businessService.addBusinessMember(action.members, action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.addBusinessMemberSuccess({
                            userId: '222',
                            message: 'Successfully added member'
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.addBusinessMemberFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    removeInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.removeInvitation),
            switchMap((action) => {
                return this.businessService.removeInvitation(action.userId, action.businessId, action.invitationType).pipe(
                    map((resData: any) => {
                        return BusinessActions.removeInvitationSuccess({
                            message: 'Successfully added member',
                            userId: action.userId
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.removeInvitationFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    resendInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.resendInvitation),
            switchMap((action) => {
                return this.businessService.resendInvitation(action.userId, action.businessId, action.message).pipe(
                    map((resData: any) => {
                        return BusinessActions.resendInvitationSuccess({
                            message: 'Successfully added member',
                            userId: action.userId
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.removeInvitationFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    updateBusinessDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.updateBusinessDetails),
            switchMap((action) => {
                return this.businessService.updateBusinessDetails(action.businessForm, action.businessId).pipe(
                    map((resData: any) => {
                        // return BusinessActions.updateBusinessDetailsSuccess({
                        //     message: 'Successfully updated business information'
                        // });
                        
                        return BusinessActions.fetchBusinessDetails({
                            businessId: action.businessId
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.updateBusinessDetailsFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessMemberDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessMemberDetails),
            switchMap((action) => {
                return this.businessService.fetchBusinessMemberDetails(action.businessId, action.memberId).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessMemberDetailsSuccess({
                            message: 'Business Details fetched successfully',
                            member: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessMemberDetailsFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessOffers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessOffers),
            switchMap((action) => {
                return this.businessService.fetchBusinessOffers(action.page).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessOffersSuccess({
                            message: 'Business Details fetched successfully',
                            offers: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessOffersFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessAllPublishedOffers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessAllPublishedOffers),
            switchMap((action) => {
                return this.businessService.fetchBusinessAllPublishedOffers(action.businessId, action.showCompletedOffers).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessAllPublishedOffersSuccess({
                            message: 'Business Details fetched successfully',
                            offers: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessAllPublishedOffersFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchBusinessOffersByIdentityId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessOffersByIdentityId),
            switchMap((action) => {
                return this.businessService.fetchBusinessOffersByIdentityId(
                    action.identityId,
                    action.states,
                    action.showCompletedOffers
                ).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchBusinessOffersByIdentityIdSuccess({
                            message: 'Business Offers fetched successfully',
                            offers: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessOffersByIdentityIdFailure({
                                error: error.error?.message
                            })
                        )
                    }),
                );
            })
        )
    );

    fetchDealComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchDealComments),
            switchMap((action) => {
                return this.businessService.fetchDealComments(action.businessId).pipe(
                    map((resData: any) => {
                        return BusinessActions.fetchDealCommentsSuccess({
                            message: 'Deal comments fetched successfully',
                            ratings: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchDealCommentsFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );


    fetchAllBusinessRoles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.getAllBusinessRoles),
            switchMap((action) => {
                return this.businessService.getAllBusinessRoles(action.businessId).pipe(
                    map((resData: any) => {

                        return BusinessActions.getAllBusinessRolesSuccess({
                            message: 'Business Roles fetched successfully',
                            roles: resData.payload
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.getAllBusinessRolesFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    

    updateMemberActivationStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.updateMemberActivationStatus),
            switchMap((action) => {
                return this.businessService.updateMemberActivationStatus(action.userId, action.businessId, action.activateStatus).pipe(
                    map((resData: any) => {
                        return BusinessActions.updateMemberActivationStatusSuccess({
                            message: 'Status successfully updated',
                            userId: action.userId
                        });
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.updateMemberActivationStatusFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );

    

    fetchSuggestedUrl$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusinessActions.fetchBusinessSuggestedUrl),
            switchMap((action) => {
                return this.businessService.fetchBusinessSuggestedUrl(action.businessName).pipe(
                    map((resData: any) => {
                        // console.log('business url list', resData);
                        if(!resData.error) {
                            return BusinessActions.fetchBusinessSuggestedUrlSuccess({
                                message: 'Found suggested url',
                                businessUrls: resData.payload
                            });
                        } else{
                            BusinessActions.fetchBusinessSuggestedUrlFailure({
                                error: resData.message
                            })
                        }
                    }),
                    catchError(error => {
                        return of(
                            BusinessActions.fetchBusinessSuggestedUrlFailure({
                                error: error.error.message
                            })
                        )
                    }),
                );
            })
        )
    );




    constructor(
        private store: Store,
        private actions$: Actions,
        private router: Router,
        private businessService: BusinessService,
    ) { }

}