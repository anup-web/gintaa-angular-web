import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { mergeMap, map, catchError } from "rxjs/operators";
import { OfferCommentService } from "../../services/offer-comment.service";
import * as offerCommentAction from "./offer-comment.actions";



@Injectable()
export class OfferCommentEffects {

    constructor(
        private actions$: Actions,
        private myOffersService: OfferCommentService,
    ){} 

    getAllComments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.getOfferComment),
            mergeMap((action)=>{
                return this.myOffersService.getAllComments(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferCommentSuccess({
                            comments: res.payload
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    loadMoreComments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.loadMoreOfferComment),
            mergeMap((action)=>{
                return this.myOffersService.getAllComments(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.loadMoreOfferCommentSuccess({
                            comments: res.payload
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    loadMoreCommentReplies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.loadMoreOfferCommentReply),
            mergeMap((action)=>{
                return this.myOffersService.getAllCommentReplies(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.loadMoreOfferCommentReplySuccess({
                            replies: res.payload,
                            questionId: action.payload.questionId
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    addComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.addOfferComment),
            mergeMap((action)=>{
                return this.myOffersService.addComment(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferComment({
                            payload: {
                                offerId: action.payload.offerId
                            }
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    addCommentReply$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.addOfferCommentReply),
            mergeMap((action)=>{
                return this.myOffersService.addCommentReply(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferComment({
                            payload: {
                                offerId: action.payload.offerId
                            }
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    editComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.editOfferComment),
            mergeMap((action)=>{
                return this.myOffersService.editComment(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferComment({
                            payload: {
                                offerId: action.payload.offerId
                            }
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    editCommentReply$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.editOfferCommentReply),
            mergeMap((action)=>{
                return this.myOffersService.editCommentReply(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferComment({
                            payload: {
                                offerId: action.payload.offerId
                            }
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    deleteComment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.deleteOfferComment),
            mergeMap((action)=>{
                return this.myOffersService.deleteComment(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferComment({
                            payload: {
                                offerId: action.payload.offerId
                            }
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

    deleteCommentReply$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(offerCommentAction.deleteOfferCommentReply),
            mergeMap((action)=>{
                return this.myOffersService.deleteCommentReply(action.payload)
                .pipe(
                    map((res: any) => {
                        return offerCommentAction.getOfferComment({
                            payload: {
                                offerId: action.payload.offerId
                            }
                        })
                    }),
                    catchError((error)=>{
                        return of(offerCommentAction.getOfferCommentFailure({ error }));
                    })
                )
            })
        )
    })

}
