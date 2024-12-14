export enum APP_CONFIGS {
    VALID_PHONE_REGEX = '^[0-9][0-9]{9}$', // ORIGINAL '^[6-9][0-9]{9}$'/(7|8|9)\d{9}/ /// (0|91)?[7-9][0-9]{9}
    VALID_EMAIL_REGEX = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$',
    VALID_EMAIL_REGEX_ADV = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$',
    HAS_NUMBER = '[0-9]$',
    HAS_UPPERCASE_CHAR = '[A-Z]',
    HAS_LOWERCASE_CHAR = '[a-z]',
    HAS_SPECIAL_CHAR = '[$&+,:;=?@#|<>.^*()%!-]',
    VALID_PAN_REGEX = '[A-Z]{5}[0-9]{4}[A-Z]{1}',
    VALID_CIN_REGEX = '^[A-Za-z0-9]{21}',
    VALID_GST_REGEX = '\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}',
    VALID_GST_REGEX_NEW = '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$',
    VALID_BUSINESS_LEGAL_NAME = '^[a-zA-Z0-9 ._()&!#$\'-]{3,255}$',
    HAS_DECIMAL = '^\\d+(\\.\\d{1,2})?$',
    HAS_NUMBER_ONLY = '^-?(0|[1-9]\\d*)?$',
    HAS_NUMBER_ONLY_2 = '\\d+',
    DIMENSION_PATTERN = '^\\d*\\.?\\d{0,2}$',
    VALID_PHONE_STARTING_REGEX = '^[6-9][0-9]{9}$',
    IFSC_CODE_REGEX = '^[A-Z]{4}0[A-Z0-9]{6}$'
}

  
 export enum FirebaseAnalyticsEnum {
    visitWebSite    = 'gintaa_web_visit_site',
    visitProfile    = 'gintaa_web_visit_profile',
    productDetails  = 'gintaa_product_details',
    visitMyOfferList= 'gintaa_mylistings',
    suggestOffer    = 'gintaa_suggest_offer',
    createBusinessProfile     = 'gintaa_create_business_profile',
    editProfileCount= 'gintaa_edit_profile',
    visitMatchBox   = 'gintaa_visit_match_box',
    visitBusinessPreview   = 'gintaa_visit_business_preview',
    productCreation ='gintaa_product_create',
    serviceCreation ='gintaa_service_create', 
    auctionCreation ='gintaa_auction_create'
}

export enum FirebaseRemotConfigParameterEnum {
    homeBanners                 = 'web_home_banners',
    homePopularCategory         = 'web_home_popularCategory',
    homeTopBrands               = 'web_home_top_brands',
    homeOfferCategories         = 'web_home_offer_categories',
    homeBottomBanners           = 'web_home_bottom_banners',
    homeBuyNewProducts          = 'web_home_buy_new_products',
    homePromotionalBanners      = 'web_home_promotional_banners',
    homeBusinessBanners         = 'web_home_business_banners',
    homeFooterDownloadOurApp    = 'web_home_footer_download_our_app',
    homeAuctionBanners          = 'web_home_auction_banners',
    homeLastViewedListing       = 'web_home_last_viewed_offers',
    homeSocialBanner            = 'web_home_social_banner',
    homeAppPromotionalBanners   = 'web_home_app_promotional_banners',
    countryList                 = 'country_list',
    phaseWiseFeatureRelease     = 'web_phase_wise_feature_release',
    enableAuction               = 'enable_auction'
}


export enum FeatureListEnum {
    listing     = 'listing',
    offer       = 'offer',
    business    = 'business'
}