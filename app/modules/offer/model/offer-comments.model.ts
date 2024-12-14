export interface Comment  {
    threadId: string,
    question: string,
    user: any,
    offerId: string,
    replies: any,
    timestamp: number,
    edited: boolean
  }

export interface OfferCommentState {
    isNextPageDataAvailable: boolean;
    comments: Comment[],
    successMessage: string,
    errorMessage: string
}

export interface OfferCommentInput {
    offerId: number,
    page?: number,
    size?: number,
}

export interface OfferCommentReplyInput {
    offerId: number,
    questionId: string,
    page?: number,
    size?: number,
}


export interface AddOfferCommentInput {
    offerId: number,
    question: string
}
export interface AddOfferCommentReplyInput {
    offerId: number,
    questionId: string,
    reply: string
}

export interface EditOfferCommentInput {
    offerId: number,
    questionId: string,
    question: string
}

export interface EditOfferCommentReplyInput {
    offerId: number,
    questionId: string,
    replyId: string,
    reply: string
}

export interface DeleteOfferCommentInput {
    offerId: number,
    questionId: string
}

export interface DeleteOfferCommentReplyInput {
    offerId: number,
    questionId: string,
    replyId: string
}

export interface ReportOfferComment {
        offerId: string,
        type: string,
        questionId: string,
        description: string,
        reasons: Array<string>,
        replyId?: string
}