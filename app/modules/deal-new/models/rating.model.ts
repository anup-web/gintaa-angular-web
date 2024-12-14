export interface RatingSelectedQuestion {
    selected: boolean;
}

export interface RatingQuestionFormat {
    questionId?: string;
    question?: string;
    active?: boolean;
    answerCharLimit?: number;
    answer?: string;
    answerCharLeft: number;
    rating?: number;
    displayOrderIdx: number;
    optional?: boolean;
    contextId?: string;
    options: Array<string>;
    selectedOptions: RatingSelectedQuestion[];
}

export interface RatingContext {
    activeSince?: string;
    contextId: string;
    maxRating?: number;
    minRating?: number;
    selectedRating?: number;
    ratingId: string;
    questions?: RatingQuestionFormat[];
}
export interface RatingRequest {
    questionAndAnswers?: any[];
    comment?: string;
    rating?: number
}
export interface RatingRequestDeal {
    reviews?: any[];
    comment?: string;
    dealRefId?: string;
    rating?: number
}
export interface SaveRatingRequestComments {
    answers?: Array<string>;
    comments: string;
    questionId: string;
}

export interface SaveRatingRequestObject {
    contextId: string;
    questionCommentsAndAnswers?: SaveRatingRequestComments[];
    rating: number;
    resourceId?: string;
}
