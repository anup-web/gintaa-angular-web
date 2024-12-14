// http://15.206.17.169:8050/gintaa/api/

const sharedApiUrls = {
  sentOtpUrl: 'v1/auth/sms-otp',
  verifyOtpUrl: 'v1/auth/verify-otp',
  logoutUrl: 'v1/logout',
  googleLogIn: 'v1/auth/social/google',

  // profile related paths
  profileUrl: 'users/v1/user/profile',
  profileUpdateUrl: 'users/v1/user',
  allAddressUrl: 'users/v1/user/address/all',
  defaultAddressUrl: 'users/v1/user/address',
  addAddressUrl: 'users/v1/user/address',
  changeDefaultAddress: 'users/v1/user/address/update/default',
  deleteAddressUrl: 'users/v1/user/address/{addressId}',
  uploadProfileImgUrl: 'users/v1/user/images',
  sendNotificationMobileUrl: 'users/v1/user/mobile/initiate',
  sendNotificationEmailUrl: 'users/v1/user/email/initiate',
  verifyMobile: 'users/v1/user/mobile/verify',
  verifyEmail: 'users/v1/user/email/verify',

  // offer related paths
  createDraftItemOffer: 'offers/v1/draft/offers/item',
  createDraftServiceOffer: 'offers/v1/draft/offers/service',
  updateDraftItemOffer: 'offers/v1/draft/offers/item',
  updateDraftServiceOffer: 'offers/v1/draft/offers/service',
  getDraftOfferById: 'offers/v1/draft/offers/{offerId}',
  getOfferById: 'offers/v1/offers/oid/{offerId}',
  getOfferBySeoId: 'offers/v1/offers/seo/{seoId}',
  postDraftItemOffer: 'offers/v1/offers/item',
  postDraftServiceOffer: 'offers/v1/offers/service',
  myAllDraftOffers: 'offers/v1/draft/offers',
  myAllNewOffers: 'offers/v1/offers/all',
  myNewOffers: 'offers/v1/offers',
  userOtherPostedOffers: 'offers/v1/offers/{id}/siblings',
  uploadOfferDocument: 'offers/v1/offers/document',
  updateDraftOfferImage: 'offers/v1/draft/offers/attachments/image',
  updateDraftOfferDocument: 'offers/v1/draft/offers/attachments/document',
  uploadOfferImage: 'offers/v1/offers/images',
  uploadOfferVedio: 'offers/v1/offers/videos',
  updateDraftOfferVedio: 'offers/v1/draft/offers/attachments/video',
  offerStat: 'offers/v1/offers/stats',
  myOffersUrl: 'offers/v1/offers/filter/user/{profileId}',
  offerUrl: 'offers/v1/offers',
  updateOffer: 'offers/v1/offers/update',
  deleteOffer: 'offers/v1/offers/delete/{offerId}',
  offerByBarterType: 'offers/v1/offers/filter/barter/{barterType}',
  offerByTag: 'offers/v1/offers/filter/tag/{tag}',
  offerById: 'offers/v1/offers/filter/tag/{offerId}',
  inactiveOffer: 'offers/v1/offers/update/inactive/{offerId}',

  // serach related paths
  suggestion: 'search/v1/search/suggestion',
  searchHistory: 'search/v1/search-history',
  searchFullText: 'search/v1/search',

  // category related paths
  getUpdateDeleteCategoryUrl: 'categories/v1/categories/{categoryId}',
  getAllCategoryUrl: 'categories/v1/categories/root',
  getAllVerticalCategory: 'categories/v1/verticals',
  getRootCategoryUrl: 'categories/v1/verticals/{verticalId}/category',
  getCategoriesInRootCategory: 'categories/v1/categories/{categoryId}/next',
  getAddTagUrl: 'categories/v1/category-tags/{categoryId}',
  addCategoryUrl: 'categories/v1/categories',
  updateDeleteTagUrl: 'categories/v1/tags/{tagId}/category/{categoryId}',

  // deal related paths
  getInitiateDealUrl: 'deals/v1/deals/initiate',
  getUpdateDealUrl: 'deals/v1/deals/update',
  getExpiryDateUrl: 'deals/v1/deals/expiry',
  getAllJintaaJunctionUrl: 'deals/v1/deals/junctions',
  getDealFromIdUrl: 'deals/v1/deals',
  getDealSnapshotFromIdUrl: 'deals/v1/deals/snapshot',
  getUpdateDealReqUrl: 'deals/v1/deals/update-req',
  getAllDeal: 'deals/v1/deals',
  getCancelDealUrl: 'deals/v1/deals/cancel',
  acceptDeal: 'deals/v1/deals/accept',
  rejectDeal: 'deals/v1/deals/reject',
  closeDealUrl: 'deals/v1/deals/close',
  getDealCount: 'deals/v1/deals/count',

  // rating related paths
  dealRatingConfigUrl: 'ratings/v1/ratings/definition/DEALS',
  dealRatingQuestionsUrl: 'ratings/v1/questions',
  saveDealRatingReview: 'ratings/v1/ratings/user/comments',

  // chat
  blockChatUser: 'chats/v1/chat/block/user/{gcuid}',
  unblockChatUser: 'chats/v1/chat/unblock/user/{gcuid}',
  isUserBlocked: 'chats/v1/chat/block/user/{gcuid}/status',
  offerChatCommunication: 'chats/v1/chat/recent',
  createRoom: 'chats/v1/chat/oid',
  getRoomDetails: 'chats/v1/chat/room',
  getChatMessageRoomUrl: 'chats/v1/message/room',
  getChatDocumentUrl: 'chats/v1/chat/attachment/document',
  getChatImageUrl: 'chats/v1/chat/attachment/image',
  getChatVideoUrl: 'chats/v1/chat/attachment/video',

};

export { sharedApiUrls };