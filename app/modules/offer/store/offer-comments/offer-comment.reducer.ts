import { Action, createReducer, on } from "@ngrx/store";
import copy from 'fast-copy';
import { defaultOfferCommentConfig } from "../../config/default.config";
import { OfferCommentState } from '../../model/offer-comments.model';
import * as offerCommentAction from './offer-comment.actions';

interface Offers {

}

const intialStateOfferComment: OfferCommentState = {
    isNextPageDataAvailable: null,
    comments: [],
    successMessage: null,
    errorMessage: null,
}

const _offerCommentReducer = createReducer(

    intialStateOfferComment,

    on(
        offerCommentAction.getOfferComment, 
        (state, action) => ({
            ...state,
        })
    ),

    on(
        offerCommentAction.getOfferCommentSuccess, 
        (state, action) => ({
            ...state,
            comments: action.comments,
            isNextPageDataAvailable: action.comments.length < defaultOfferCommentConfig.qustionSize ? false: true
        })
    ),

    on(
        offerCommentAction.loadMoreOfferCommentSuccess, 
        (state, action) => ({
            ...state,
            comments: [...state.comments, ...action.comments],
            isNextPageDataAvailable: action.comments.length < defaultOfferCommentConfig.qustionSize ? false: true
        })
    ),

    on(
        offerCommentAction.loadMoreOfferCommentReplySuccess, 
        (state, action) => { 
            const newState = copy(state);
            const comments = newState.comments;
            const index = newState.comments.findIndex((item)=>item.threadId === action.questionId);
            const replies = [...newState.comments[index].replies, ...action.replies];
            comments[index].replies = replies;
            return ({
                ...state,
                comments: comments
            })
        }
    ),

    on(
        offerCommentAction.deleteOfferComment, 
        (state, action) => ({
            ...state,
        })
    ),

    on(
        offerCommentAction.deleteOfferCommentReply, 
        (state, action) => ({
            ...state,
        })
    ),
)

export function offerCommentReducer(state: OfferCommentState | undefined, action: Action) {
    return _offerCommentReducer(state, action);
}
