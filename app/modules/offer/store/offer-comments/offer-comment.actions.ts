import { createAction, props } from "@ngrx/store";
import { OfferCommentInput, AddOfferCommentInput, DeleteOfferCommentInput, DeleteOfferCommentReplyInput, AddOfferCommentReplyInput, EditOfferCommentReplyInput, EditOfferCommentInput, OfferCommentReplyInput} from "../../model/offer-comments.model";
import { OfferAuctionActionEnums, OfferCommentsActionEnums } from "./offer-comment.action-types";

export const getOfferComment = createAction(
    OfferCommentsActionEnums.Get_All_Offer_Comments,
    props<{ payload: OfferCommentInput}>()
)

export const getOfferCommentSuccess = createAction(
    OfferCommentsActionEnums.Get_All_Offer_Comments_Success,
    props<{comments: any}>()
)

export const loadMoreOfferComment = createAction(
    OfferCommentsActionEnums.Load_More_Offer_Comments,
    props<{ payload: OfferCommentInput}>()
)

export const loadMoreOfferCommentReply = createAction(
    OfferCommentsActionEnums.Load_More_Offer_Comments_Reply,
    props<{ payload: OfferCommentReplyInput}>()
)

export const loadMoreOfferCommentSuccess = createAction(
    OfferCommentsActionEnums.Load_More_Offer_Comments_Success,
    props<{comments: any}>()
)

export const loadMoreOfferCommentReplySuccess = createAction(
    OfferCommentsActionEnums.Load_More_Offer_Comments_Reply_Success,
    props<{replies: any, questionId: string}>()
)

export const addOfferComment = createAction(
    OfferCommentsActionEnums.Add_Offer_Comment,
    props<{ payload: AddOfferCommentInput}>()
)

export const addOfferCommentReply = createAction(
    OfferCommentsActionEnums.Add_Offer_Comment_Reply,
    props<{ payload: AddOfferCommentReplyInput}>()
)

export const deleteOfferComment = createAction(
    OfferCommentsActionEnums.Delete_Offer_Comment,
    props<{ payload: DeleteOfferCommentInput}>()
)

export const deleteOfferCommentReply = createAction(
    OfferCommentsActionEnums.Delete_Offer_Comment_Reply,
    props<{ payload: DeleteOfferCommentReplyInput}>()
)

export const getOfferCommentFailure = createAction(
    OfferCommentsActionEnums.Get_All_Offer_Comments_Failure,
    props<{error: any}>()
)

export const editOfferComment = createAction(
    OfferCommentsActionEnums.Edit_Offer_Comment,
    props<{ payload: EditOfferCommentInput}>()
)

export const editOfferCommentReply = createAction(
    OfferCommentsActionEnums.Edit_Offer_Comment_Reply,
    props<{ payload: EditOfferCommentReplyInput}>()
)

export const redirectToAuctionBuy = createAction(
    OfferAuctionActionEnums.OFFER_AUCTION_BUY
)

export const redirectToAuctionSuccess = createAction(
    OfferAuctionActionEnums.OFFER_AUCTION_SUCCESS
)

