import { uploadBusinessLogo } from "@gintaa/modules/business/store/business.actions";

export const configUrls = {
    sentOtpUrl: 'v1/auth/sms-otp',
    verifyOtpUrl: 'v1/auth/verify-otp',
    logoutUrl: 'v1/logout',
    googleLogIn: 'v1/auth/social/google',

    // profile related paths
    profileUrl: 'users/v1/user/profile',
    profileUpdateUrl: 'users/v1/user/profile',
    allAddressUrl: 'users/v1/user/address/all',
    defaultAddressUrl: 'users/v1/user/address',
    addAddressUrl: 'users/v1/user/address',
    changeDefaultAddress: 'users/v1/user/address/update/default',
    deleteAddressUrl: 'users/v1/user/address/{addressId}',
    uploadProfileImgUrl: 'users/v1/user/image',
    sendNotificationMobileUrl: 'users/v1/user/mobile/initiate',
    sendNotificationEmailUrl: 'users/v1/user/email/initiate',
    verifyMobileUpdate: 'users/v1/user/mobile/update',
    verifyEmailUpdate: 'users/v1/user/email/update',
    verifyMobile: 'users/v1/user/mobile/verify',
    verifyEmail: 'users/v1/user/email/verify',
    checkForExistingUserMobile: 'users/v1/user/mobile/check/+91',
    checkForExistingUserEmail: 'users/v1/user/email/check/',
    otherProfileUrl: 'users/v1/user/',
    getReportCategories: 'users/v1/user/report/category',
    blockUserProfile: 'users/v1/user/report',
    unBlockUserProfile: 'users/v1/user/report/unblock/',
    checkAlreadyCallerHasBlockedUser: 'users/v1/user/report/check-blocked/',
    checkAlreadyCallerIsBlockedByUser: 'users/v1/user/report/check-blocked-by/',
    checkAlreadyBlockByEachOther: 'users/v1/user/report/check-blocked-both/',
    checkAlreadyCallerHasReportedUser: 'users/v1/user/report/check-reported/',

    // offer related paths
    createDraftOffer: 'offers/v1/draft/offers/',
    getDraftOfferById: 'offers/v1/draft/offers/{offerId}',
    getOfferById: 'offers/v1/offers/oid/{offerId}',
    getOwnerByOfferId: 'offers/v1/offers/{offerId}/owner',
    getOfferBySeoId: 'offers/v1/offers/seo/{seoId}',
    hideOfferByOfferId: 'offers/v1/published/offers/hide/{oid}',
    unhideOfferByOfferId: 'offers/v1/published/offers/unhide/{oid}',
    postDraftOffer: 'offers/v1/offers/',
    postDraftItemOffer: 'offers/v1/offers/item',
    postDraftServiceOffer: 'offers/v1/offers/service',
    loggedInUserHiddenOfferById: 'offers/v1/offers/self/oid/{offerId}',
    removeOfferByOfferId: 'offers/v1/offers/{oid}',

    loggedInUserPublishedOffers: 'offers/v1/offers/all',
    loggedInUserAllOffers: 'offers/v1/offers/filter',
    loggedInUserActiveOffers: 'offers/v1/offers?state=active',
    loggedInUserUnderReviewOffers: 'offers/v1/offers?state=under_review',
    loggedInUserDraftOffers: 'offers/v1/draft/offers',
    loggedInUserRejectedOffers: 'offers/v1/offers?state=rejected',
    loggedInUserHiddenOffers: 'offers/v1/offers/hidden',
    // loggedInUserRejectedOffers:  'offers/v1/reject/offers/all',
    myNewOffers: 'offers/v1/offers',
    otherProfileUserFeedback: 'users/v1/user/rating/all/',

    offerComments: 'qna/v1/qna/offer/',
    offerCommentReport: 'qna/v1/qna/comment/',
    offerCommentReportReasons: 'qna/v1/qna/report/reasons',
    userOtherPostedOffers: 'offers/v1/offers/{offerId}/siblings',
    updateDraftOfferMedia: 'offers/v1/draft/offers/attachments/',
    updatePublishedOfferMedia: 'offers/v1/offers/attachments/',

    offerStat: 'offers/v1/offers/stats',
    myOffersUrl: 'offers/v1/offers/filter/user/{profileId}',
    offerUrl: 'offers/v1/offers',
    updateOffer: 'offers/v1/offers/update',
    deleteOffer: 'offers/v1/offers/delete/{offerId}',
    offerByBarterType: 'offers/v1/offers/filter/barter/{barterType}',
    offerByTag: 'offers/v1/offers/filter/tag/{tag}',
    offerById: 'offers/v1/offers/filter/tag/{offerId}',
    inactiveOffer: 'offers/v1/offers/update/inactive/{offerId}',
    myFavoriteOffers: 'offers/v1/offers/all',
    getAllFavouriteOffers: 'ofavourite/v1/offer/favourites',
    addOfferToFavourite: 'ofavourite/v1/offer/favourites/oid/',
    removeOfferFromFavourite: 'ofavourite/v1/offer/favourites/oid/',
    getFavouriteOfferCount: 'statistics/offer/oid/',
    getFavouriteOfferCountNew: 'statistics/v1/statistics/offer/oid/',
    removeDraftOfferById: 'offers/v1/draft/offers/',
    lastViewedOffer: 'offers/v1/offers/lastViewed',
    getOfferStatistics: 'offers/v1/offers/stats/',
    getSimilarOffers: 'offers/v1/offers/similar/',

    offerByIds: 'offers/v1/offers/list',
    getTrendingOffers: 'statistics/v1/analytics/offers/trending',
    getPopularCategories: 'statistics/v1/analytics/popular/categories',
    getRecommendedOffers: 'statistics/v1/analytics/offers/recommended',

    // offer category details api
    getSuggestedCategories: 'search/v1/search/suggestion/category/multiple',
    getOfferSearch: 'search/v1/search/suggestion/category',    
    getAllVerticalCategory: 'categories/v1/verticals',
    getRootCategoryUrl: 'categories/v1/verticals/{verticalId}/category',
    getCategoriesInRootCategory: 'categories/v1/categories/{categoryId}/next',

    // report offer urls
    getReportOfferCategories: 'offers/v1/offers/report/categories',
    postReportOffer: 'offers/v1/offers/report',

    // search related paths
    suggestion: 'search/v1/search/suggestion',
    searchHistory: 'search/v1/search-history',
    searchFullText: 'search/v1/search',
    deleteSearchHistory: 'search/v1/search-history/clear',

    searchMatchFullText: 'search/v1/search/match-result',
    searchMatchUser: 'search/v1/search/match-result/user',
    searchMatchOffer: 'search/v1/search/match-result/oid',

    // category related paths
    getUpdateDeleteCategoryUrl: 'categories/v1/categories/{categoryId}',
    getAllCategoryUrl: 'categories/v1/categories/root',
    getAllCategories: 'categories/v1/categories',
    getAddTagUrl: 'categories/v1/category-tags/{categoryId}',
    updateDeleteTagUrl: 'categories/v1/tags/{tagId}/category/{categoryId}',
    suggestedCategory: 'search/v1/search/suggestion/category/multiple',
    suggestedTagValues: 'search/v1/search/suggestion/tag-values',
    // deal related paths

    getInitiateDealUrl: 'deals/v1/deals/initiate',
    getUpdateDealUrl: 'deals/v1/deals/update',
    getExpiryDateUrl: 'deals/v1/deals/expiry',
    getAllJintaaJunctionUrl: 'deals/v1/deals/junctions',
    getDealFromIdUrl: 'dview/v1/deals/{dealId}',
    getDealSnapshotFromIdUrl: 'dview/v1/deals/snapshot',
    getDealHistoryFromIdUrl: 'dview/v1/deals/history',
    getUpdateDealReqUrl: 'deals/v1/deals/update-req',
    getAllDeal: 'dview/v1/deals',
    getCancelDealUrl: 'deals/v1/deals/cancel',
    acceptDeal: 'deals/v1/deals/accept',
    rejectDeal: 'deals/v1/deals/reject',
    closeDealUrl: 'deals/v1/deals/close',
    abandonDealUrl: 'deals/v1/deals/abandon',
    reportDealUrl: 'deals/v1/deals/report',
    getDealCount: 'deals/v1/deals/count',
    addDealToFavourite: 'dview/v1/deals/{dealId}/favourites/add',
    removeDealToFavourite: 'dview/v1/deals/{dealId}/favourites/remove',
    getAllFavouriteDeal: 'dview/v1/deals/favourites',
    //generateCloseDealOtp: 'deals/v1/deals/close/regenerate-otp',
    generateCloseDealOtp: 'deals/v1/deals/generateOtpForClose',
    getReviseDealUrl: 'deals/v1/deals/revise',
    getDealLocationUrl: 'deals/v1/deals/location',
    getDealByOfferId: 'deals/v1/deals/offer/{offerId}',

    getDealRevisionDeltaIdUrl: 'dview/v1/deals/revision-delta',
    buyOut: 'deals/v1/deals/direct-buy',
    registerPayment: 'deals/v1/deals/register-payment/{dealId}',

    // rating related paths
    dealDviewRatingQuestionsUrl: 'users/v1/user/rating/question',
    saveDealUserRatingReview: 'users/v1/user/rating',
    getDealRatingFromIdUrl: 'users/v1/user/rating/bothUser',

    dealRatingConfigUrl: 'ratings/v1/ratings/definition/DEALS',
    dealRatingQuestionsUrl: 'ratings/v1/questions',
    saveDealRatingReview: 'ratings/v1/ratings/user/comments',
    dealQuestionsUrl: 'deals/v1/deals/questions',
    shippingCourier: 'shipping/v1/courier/serviceability',
    dealCategoryUrl: 'deals/v1/deals/report/categories',

    // chat
    blockChatUser: 'chats/v1/chat/block/user/{gcuid}',
    unblockChatUser: 'chats/v1/chat/unblock/user/{gcuid}',
    isUserBlocked: 'chats/v1/chat/block/user/{gcuid}/status',
    offerChatCommunication: 'chats/v1/chat/recent',
    getChatHistoryUrl: 'chats/v1/chat',
    getChatMessageRoomUrl: 'chats/v1/message/room',
    getChatDocumentUrl: 'chats/v1/chat/attachment/document',
    getChatImageUrl: 'chats/v1/chat/attachment/image',
    getChatVideoUrl: 'chats/v1/chat/attachment/video',

    // business
    createBusinessProfile: 'business/v1/business/register',
    fetchBusinessProfiles: 'business/v1/business',
    fetchMemberBusinessProfiles: 'business/v1/business/member/business-profiles',
    getBusinessDetails: 'business/v1/business/{businessId}',
    getBusinessDetailsBySlug: 'business/v1/business/url/{businessSlug}',
    updateBusiness: 'business/v1/business/{businessId}',
    uploadBusinessLogo: 'business/v1/business/{businessId}/logo',
    uploadBusinessCoverImage: 'business/v1/business/{businessId}/business-picture',
    deleteBusinessLogo: 'business/v1/business/{businessId}/logo',
    updateBusinessColor: 'business/v1/business/{businessId}/brand-colour',

    // business address
    addBusinessAddress: 'business/v1/business/{businessId}/address',
    getAllBusinessAddress: 'business/v1/business/{businessId}/address',
    updateBusinessAddress: 'business/v1/business/{businessId}/address/{addressId}',
    deleteBusinessAddress: 'business/v1/business/{businessId}/address/{addressId}',

    // business members
    inviteMembers: 'business/v1/business/member/{businessId}/request',
    getAllMembers: 'business/v1/business/member/{businessId}/members',
    getAllBusinessRoles: 'business/v1/business/member/roles',
    deleteBusinessInvitation: 'business/v1/business/member/{businessId}/request?memberRequestIds={memberRequestIds}',
    getMemberDetails: 'business/v1/business/member/{businessId}/member/{memberId}',
    resendMemberInvitation: 'business/v1/business/member/{businessId}/resend-request?comments={comments}',
    removeBusinessMember: 'business/v1/business/member/{businessId}/member/{memberId}/remove?reason={reason}',
    activeInactiveMember: 'business/v1/business/member/{businessId}/member/{memberId}/change-active-status?activate={activeStatus}',
    updateBusinessMemberRole: 'business/v1/business/member/{businessId}/change-role/{memberId}?roleId={roleId}',
    fetchBusinessInvitations: 'business/v1/business/member/invites',
    acceptInvitation: 'business/v1/business/member/{businessId}/accept',
    rejectInvitation: 'business/v1/business/member/{businessId}/deny?reason=',
    removeRejectedInvitation: 'business/v1/business/member/remove-denied/{deniedId}',
    getAllSuggestedURL: 'business/v1/business/profile-url-suggestions?businessName={businessName}&appendLength={appendLength}',

    // business offers
    businessGetAllPublishOffers: 'offers/v1/offers/business/{businessId}?show-completed-offers={showCompleteOffers}', // {showCompleteOffers}=true/false
    delegateBusinessOffer: 'offers/v1/offers/delegate',
    fetchBusinessOffersByIdentity: 'offers/v1/offers/business/filter/{identityId}',
    fetchBusinessAllPublishedOffers: 'offers/v1/offers/business/{businessId}',

    /////////// payment receive credential /////////////
    // For Personal profile
    addReceivePaymentDetails                : 'users/v1/user/receive/payment/details',
    updateReceivePaymentDetails             : 'users/v1/user/receive/payment/details/update',
    getReceivePaymentDetailsList            : 'users/v1/user/receive/payment/details/all',
    getReceivePaymentDetailsById            : 'users/v1/user/receive/payment/details/id/{identityId}/{receivePaymentDetailsId}',
    deleteReceivePaymentDetailsById         : 'users/v1/user/receive/payment/details/id/{receivePaymentDetailsId}',

    // For Business profile
    addReceivePaymentDetailsForBusiness         : 'business/v1/business/receive/payment/details',
    updateReceivePaymentDetailsForBusiness      : 'business/v1/business/receive/payment/details',
    getReceivePaymentDetailsListForBusiness     : 'business/v1/business/receive/payment/details/all/{businessId}',
    deleteReceivePaymentDetailsByIdForBusiness  : 'business/v1/business/receive/payment/details/id/{businessId}/{receivePaymentDetailsId}',

    // for business migration
    getBusinessMigration  : 'business/v1/business/migration'
    
};
