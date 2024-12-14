export enum DEAL_ACTION_TYPE {
    PAGE_LOADING = '[Deal] Page Loading',
    PAGE_LOADED = '[Deal] Page Loaded',
    EMPTY_INITIATE_DEAL = '[Deal] Empty initiate Deal',
    
    FETCH_ALL  = '[Deal] Fetch All',
    FETCH_ALL_SUCCESS = '[Deal] Fetch All Success',
    FETCH_ALL_EMPTY = '[Deal] Fetch All Empty',
    FETCH_ALL_FAILURE = '[Deal] Fetch All Failure',

    FETCH_USER_OFFER  = '[Deal] Fetch User Offer',
    FETCH_USER_OFFER_SUCCESS = '[Deal] Fetch User Offer Success',
    FETCH_USER_OFFER_FAILURE = '[Deal] Fetch User Offer Failure',

    FETCH_USER_ADDRESS  = '[Deal] Fetch User Address',
    FETCH_USER_ADDRESS_SUCCESS = '[Deal] Fetch User Address Success',
    FETCH_USER_ADDRESS_FAILURE = '[Deal] Fetch User Address Failure',

    FETCH_USER_ALL_OFFER  = '[Deal] Fetch User All Offer',
    FETCH_USER_ALL_OFFER_SUCCESS = '[Deal] Fetch User All Offer Success',
    FETCH_USER_ALL_OFFER_FAILURE = '[Deal] Fetch User All Offer Failure',

    FETCH_MY_OFFER  = '[Deal] Fetch My Offer',
    FETCH_MY_OFFER_SUCCESS = '[Deal] Fetch My Offer Success',
    FETCH_MY_OFFER_FAILURE = '[Deal] Fetch My Offer Failure',

    UPDATE_RECEIVER_OFFER = '[Deal] Update receiver offer',
    UPDATE_SENDER_OFFER = '[Deal] Update sender offer',

    UPDATE_DELIVERY_MODE = '[Deal] Update Delivery Mode',
    UPDATE_DEAL_COMMENT = '[Deal] Update Deal Comment',
    UPDATE_DEAL_CURRENT_PAGE = '[Deal] Update Deal Current Page',
    
    SUGGEST_DEAL = '[Deal] Suggest Deal',
    SUGGEST_DEAL_SUCCESS = '[Deal] Suggest Deal Success',
    SUGGEST_DEAL_FAILURE = '[Deal] Suggest Deal Failure',

    REVISE_DEAL = '[Deal] Revise Deal',
    REVISE_DEAL_SUCCESS = '[Deal] Revise Deal Success',
    REVISE_DEAL_FAILURE = '[Deal] Revise Deal Failure',


    FAVOURITE_DEAL = '[Deal] Favourite Deal',
    FAVOURITE_DEAL_SUCCESS = '[Deal] Favourite Deal Success',
    FAVOURITE_DEAL_FAILURE = '[Deal] Favourite Deal Failure',

    UPDATE_JUNCTION_MEETING_DATE = '[Deal] Update Junction Meeting Date',
    UPDATE_JUNCTION_MEETING_TIME = '[Deal] Update Junction Meeting Time',
    UPDATE_JUNCTION_ID = '[Deal] Update Junction Id',
    
    FETCH_ALL_JUNCTIONS = '[Deal] fetch All Gintaa Junctions',
    FETCH_ALL_JUNCTIONS_SUCCESS = '[Deal] fetch All Gintaa Junctions Success',
    FETCH_ALL_JUNCTIONS_FAILURE = '[Deal] fetch All Gintaa Junctions Failure',

    FETCH_DEAL_DETAILS  = '[Deal] Fetch Deal Details',
    FETCH_DEAL_DETAILS_MOCK  = '[Deal] Fetch Deal Details Mock',
    FETCH_DEAL_DETAILS_SUCCESS = '[Deal] Fetch Deal Details Success',
    FETCH_DEAL_DETAILS_EMPTY = '[Deal] Fetch Deal Details Empty',
    CLEAR_DEAL_DETAILS_AUTH_ERROR = '[Deal] Clear Deal Details Auth Error',
    FETCH_DEAL_DETAILS_FAILURE = '[Deal] Fetch Deal Details Failure',
    FETCH_DEAL_DETAILS_FROM_FAVOURITES  = '[Deal] Fetch Deal Details From Favourites',

    FETCH_DEAL_SNAPSHOT_MOCK  = '[Deal] Fetch Deal Snapshot Mock',
    FETCH_DEAL_SNAPSHOT_SUCCESS  = '[Deal] Fetch Deal Snapshot Success',

    DEAL_MODEL_CLOSE = '[Deal] Deal model close',    

    ACCEPT_DEAL = '[Deal] Accept Deal',
    ACCEPT_DEAL_DOOR = '[Deal] Accept Deal doorstep',
    ACCEPT_DEAL_SUCCESS = '[Deal] Accept Deal Success',
    ACCEPT_DEAL_FAILURE = '[Deal] Accept Deal Failure',

    REJECT_DEAL = '[Deal] Reject Deal',
    REJECT_DEAL_SUCCESS = '[Deal] Reject Deal Success',
    REJECT_DEAL_FAILURE = '[Deal] Reject Deal Failure',

    RESEND_OTP = '[Deal] Resend Otp',
    RESEND_OTP_SUCCESS = '[Deal] Resend Otp Success',
    RESEND_OTP_FAILURE = '[Deal] Resend Otp Failure',

    CLOSE_DEAL = '[Deal] Close Deal',
    CLOSE_DEAL_SUCCESS = '[Deal] Close Deal Success',
    CLOSE_DEAL_FAILURE = '[Deal] Close Deal Failure',

    GET_RATING_CONF_DEAL = '[Deal] Get Rating conf',
    GET_RATING_CONF_DEAL_SUCCESS = '[Deal] Get Rating conf Success',
    GET_RATING_CONF_DEAL_FAILURE = '[Deal] Get Rating conf Failure',
    
    GET_RATING_QUESTION_DEAL = '[Deal] Get rating question',
    GET_RATING_QUESTION_DEAL_SUCCESS = '[Deal] Get rating question Success',
    GET_RATING_QUESTION_DEAL_FAILURE = '[Deal] Get rating question Failure',

    GET_RATING_QUESTION_DEAL_CONTEXT = '[Deal] Get rating question context',
    GET_RATING_QUESTION_DEAL_CONTEXT_SUCCESS = '[Deal] Get rating question context Success',
    GET_RATING_QUESTION_DEAL_CONTEXT_FAILURE = '[Deal] Get rating question context Failure',
    
    SAVE_DEAL_USER_RATING = '[Deal] Save deal user rating',
    SAVE_DEAL_USER_RATING_SUCCESS = '[Deal] Save deal user rating Success',
    SAVE_DEAL_USER_RATING_FAILURE = '[Deal] Save deal user rating Failure',
    SAVE_DEAL_GINTAA_RATING_FAILURE = '[Deal] Save deal gintaa rating Failure',
    SAVE_DEAL_GINTAA_RATING_SUCCESS = '[Deal] Save deal gintaa rating Success',
    SAVE_DEAL_GINTAA_RATING = '[Deal] Save deal gintaa rating',
    
    RATE_DEAL = '[Deal] User rating',
    CLOSE_DEAL_STATUS = '[Deal] Close deal popup',

    FETCH_THIRD_PARTY_DATA = '[Deal] Third party data',
    FETCH_THIRD_PARTY_DATA_SUCCESS = '[Deal] Third party data success',
    FETCH_THIRD_PARTY_DATA_FAILURE = '[Deal] Third party data failure',

    FETCH_THIRD_PARTY_DATA_SHOW = '[Deal] Third party data show',
    FETCH_THIRD_PARTY_DATA_SHOW_SUCCESS = '[Deal] Third party data show success',
    FETCH_THIRD_PARTY_DATA_SHOW_FAILURE = '[Deal] Third party data show failure',
    UPDATE_THIRD_PARTY_OPTION = '[Deal] Udate third part option',
    CLEAR_QUESTION = '[Deal] Clear Question',
    
    GET_OFFER_BY_IDS = '[Deal] Get offer by ids',
    GET_OFFER_BY_RECEIVER_IDS = '[Deal] Get offer by receiver ids',
    GET_OFFER_BY_IDS_SUCCESS_RECEIVER = '[Deal] Get offer by ids receiver success',
    GET_OFFER_BY_IDS_SUCCESS_SENDER = '[Deal] Get offer by ids sender success',
    GET_OFFER_BY_IDS_FAILURE = '[Deal] Get offer by ids failure',

    FETCH_DEAL_HISTORY = '[Deal] Get deal history by ids',
    FETCH_DEAL_HISTORY_SUCCESS = '[Deal] Get deal history by ids success',
    FETCH_DEAL_HISTORY_FAILURE = '[Deal] Get deal history by ids failure',

    FETCH_USER_LOCATION = '[Deal] Get user location by offer ids',
    FETCH_USER_LOCATION_SUCCESS = '[Deal] Get user location by offer ids success',
    FETCH_USER_LOCATION_FAILURE = '[Deal] Get user location by offer failure',

    FETCH_DEAL_RATING = '[Deal] Get deal rating both',
    FETCH_DEAL_RATING_SUCCESS = '[Deal] Get deal rating both success',
    FETCH_DEAL_RATING_FAILURE = '[Deal] Get deal rating both failure',

    GET_RECEIVER_OFFER_BY_IDS = '[Deal] Get offer by receiver user id',
    GET_RECEIVER_OFFER_BY_IDS_SUCCESS = '[Deal] Get offer by receiver user id success',
    GET_RECEIVER_OFFER_BY_IDS_FAILURE = '[Deal] Get offer by receiver user id failure',
    GET_SENDER_OFFER_BY_IDS = '[Deal] Get offer by sender usre id',
    GET_SENDER_OFFER_BY_IDS_SUCCESS = '[Deal] Get offer by sender user id success',
    GET_SENDER_OFFER_BY_IDS_FAILURE = '[Deal] Get offer by sender user id failure',

    FETCH_THIRD_PARTY_VENDOR = '[Deal] Third party Vendor',
    FETCH_THIRD_PARTY_VENDOR_SUCCESS = '[Deal] Third party Vendor success',
    FETCH_THIRD_PARTY_VENDOR_FAILURE = '[Deal] Third party Vendor failure',
    
    GET_RECEIVER_SIBLING_OFFER = '[Deal] Get receiver sibling offer',
    GET_RECEIVER_SIBLING_OFFER_SUCCESS = '[Deal] Get receiver sibling offer success',
    GET_RECEIVER_SIBLING_OFFER_FAILURE = '[Deal] Get receiver sibling offer failure',
    GET_SENDER_SIBLING_OFFER = '[Deal] Get sender sibling offer id',
    GET_SENDER_SIBLING_OFFER_SUCCESS = '[Deal] Get sender sibling offer success',
    GET_SENDER_SIBLING_OFFER_FAILURE = '[Deal] Get sender sibling offer failure',

}
