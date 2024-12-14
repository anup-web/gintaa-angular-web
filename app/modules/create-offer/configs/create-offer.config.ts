export enum CREATE_OFFER_ACTION_TYPE {
    CREATE_OFFER_IMAGE_UPLOAD  = '[CreateOffer] Create Offer Image Upload',    
    CREATE_OFFER_VIDEO_UPLOAD = '[CreateOffer] Create Offer Video Upload',
    CREATE_OFFER_DOC_UPLOAD = '[CreateOffer] Create Offer Document Upload',
    CREATE_DRAFT_OFFER_DOC_UPLOAD = '[CreateOffer] Create Draft Offer Document Upload',
    CREATE_DRAFT_OFFER_IMAGE_UPLOAD  = '[CreateOffer] Create Draft Offer Image Upload',
    CREATE_DRAFT_OFFER_VIDEO_UPLOAD = '[CreateOffer] Create Draft Offer Video Upload',

    CREATE_OFFER_MEDIA_UPLOAD_SUCCESS  = '[CreateOffer] Create Offer Media Upload Success',
    CREATE_OFFER_MEDIA_UPDATE_SUCCESS  = '[CreateOffer] Create Offer Media Update Success',
    CREATE_OFFER_MEDIA_UPLOAD_PROGRESS  = '[CreateOffer] Create Offer Media Upload Progress',
    CREATE_OFFER_MEDIA_UPLOAD_FAILURE  = '[CreateOffer] Create Offer Media Upload Failure',

    
    DRAFT_OFFER_IMAGE_UPLOAD_SUCCESS  = '[CreateOffer] Draft Offer Image Upload Success',
    DRAFT_OFFER_IMAGE_UPLOAD_PROGRESS  = '[CreateOffer] Draft Offer Image Upload Progress',
    DRAFT_OFFER_IMAGE_UPLOAD_FAILURE  = '[CreateOffer] Draft Offer Image Upload Failure',
    
    DRAFT_OFFER_VIDEO_UPLOAD_SUCCESS = '[CreateOffer] Draft Offer Video Upload Success',
    DRAFT_OFFER_VIDEO_UPLOAD_PROGRESS = '[CreateOffer] Draft Offer Video Upload Progress',
    DRAFT_OFFER_VIDEO_UPLOAD_FAILURE = '[CreateOffer] Draft Offer Video Upload Failure',
    
    CREATE_OFFER_REMOVE_MEDIA = '[CreateOffer] Create Offer Remove Media',
    CREATE_OFFER_REMOVE_DRAFT_MEDIA = '[CreateOffer] Create Offer Draft Remove Media',
    CREATE_OFFER_REMOVE_PUBLISHED_MEDIA = '[CreateOffer] Create Offer Published Remove Media',
    CREATE_OFFER_REMOVE_MEDIA_SUCCESS = '[CreateOffer] Create Offer Remove Media Success',
    CREATE_OFFER_REMOVE_MEDIA_FAILURE = '[CreateOffer] Create Offer Remove Media Failure',
    CREATE_OFFER_REMOVE_VIDEO = '[CreateOffer] Create Offer Remove Video',
    CREATE_OFFER_REMOVE_VIDEO_SUCCESS = '[CreateOffer] Create Offer Remove Video Success',
    CREATE_OFFER_REMOVE_VIDEO_FAILURE = '[CreateOffer] Create Offer Remove Video Failure',

    CREATE_OFFER_SET_COVER_MEDIA = '[CreateOffer] Create Offer Set Cover Media',
    
    ADD_CREATE_OFFER_INFO = '[CreateOffer] Add Create Offer Info',
    UPDATE_CREATE_OFFER_LOCATION = '[CreateOffer] Update Create Offer Location',
    CREATE_OFFER_NAVIGATE_SCREEN = '[CreateOffer] Create Offer navigate screen',
    SUBMIT_OFFER = '[CreateOffer] Create Offer submit offer',
    PUT_OFFER = '[CreateOffer] Create Offer update offer',
    SUBMIT_OFFER_SUCCESS = '[CreateOffer] Create Offer submit offer success',
    SUBMIT_OFFER_FAILURE = '[CreateOffer] Create Offer submit offer faileds',

    ADDRESS_FETCH = '[CreateOffer] Fetch User Address',
    ADDRESS_DATA_SUCCESS = '[CreateOffer] Fetch User Address Success',
    ADDRESS_DATA_FAILURE = '[CreateOffer] Fetch User Address Failure',
    ADD_USER_ADDRESS = '[CreateOffer] Add User Address',
    ADD_USER_ADDRESS_SUCCESS = '[CreateOffer] Add User Address Success',
    ADD_USER_ADDRESS_FAILURE = '[CreateOffer] Add User Address Failure',
    RESET_ADDRESS_STATE = '[CreateOffer] Offer Address reset',
    UPDATE_USER_LOCATION = '[CreateOffer] Update User Location',
    UPDATE_USER_ADDRESS = '[CreateOffer] Update User Address',
    CLEAR_OFFER_DATA = '[CreateOffer] Clear Offer Data',

    FETCH_OFFER_INITIAL_DATA = '[CreateOffer] Fetch Offer Initial Data',
    FETCH_OFFER_INITIAL_DATA_SUCCESS = '[CreateOffer] Fetch Offer Initial Data Success',
    FETCH_OFFER_INITIAL_DATA_FAILURE = '[CreateOffer] Fetch Offer Initial Data Failure',

    // categories 

    ADD_SELECTED_CATEGORIES = '[CreateOffer] Add Selected Category',
    ADD_SELECTED_DESIRE_CATEGORIES = '[CreateOffer] Add Selected Desire Category',
    REMOVE_SELECTED_CATEGORIES = '[CreateOffer] Remove Selected Category',
    REMOVE_SELECTED_DESIRE_CATEGORIES = '[CreateOffer] Remove Selected Desire Category',
    CREATE_DRAFT_OFFER = '[CreateOffer] Create Draft offer',
    STORE_VERTICAL_CATEGORIES_FAILURE = '[CreateOffer] Store vertical category failure',

    // draft
    FETCH_OFFER_DRAFT_DATA = '[CreateOffer] Fetch Offer Draft Data',
    FETCH_OFFER_PUBLISHED_DATA = '[CreateOffer] Fetch Offer Published Data',
    OFFER_DRAFT_DATA_SUCCESS = '[CreateOffer] Offer Draft Data success',
    OFFER_DRAFT_DATA_FAILURE = '[CreateOffer] Offer Draft Data failure',
    REMOVE_DRAFT_OFFER = '[CreateOffer] Remove Offer Draft Data',
    REMOVE_DRAFT_OFFER_SUCCESS = '[CreateOffer] Remove Offer Draft Data Success',
    // offer posting loader
    CREATE_OFFER_POSTING_LOADER = '[Create] offer posting loader'
     
}

export enum CURRENT_OFFER_SCREEN {
    PRIMARY_OFFER_PAGE          = 'primary-offer-info',
    ADDITIONAL_OFFER_PAGE       = 'additional-offer-info',
    OFFER_POSTING_LOADER_PAGE   = 'offer-posting-loader',
}

export enum OFFER_CONDITION {
    USABLE = 'Usable',
    GOOD = 'Good',
    EXCELLENT = 'Excellent',
    NEW = 'New',
    USED = 'Used',
    REFURBISHED = 'Refurbished',
    ANTIQUE = 'Antique'
}

export enum OFFER_DESIRE_TYPE {
    ANYTHING = 'Anything',
    ITEM = 'Item',
    SERVICE = 'Service',
    MONEY = 'Money',
    AUCTION = 'Auction',
    PRODUCT = 'Product'
}

export enum SERVICE_DURATION {
    HOURLY = 'Hourly',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly'
}

export const offerDesireTypes = [
    OFFER_DESIRE_TYPE.ANYTHING, 
    OFFER_DESIRE_TYPE.ITEM, 
    OFFER_DESIRE_TYPE.SERVICE, 
    //OFFER_DESIRE_TYPE.MONEY,
    //OFFER_DESIRE_TYPE.AUCTION
];

export const serviceDuration = [
    SERVICE_DURATION.HOURLY, 
    SERVICE_DURATION.MONTHLY, 
    SERVICE_DURATION.WEEKLY,
];

export const offerConditions = [
    OFFER_CONDITION.USABLE, 
    OFFER_CONDITION.GOOD, 
    OFFER_CONDITION.EXCELLENT, 
    OFFER_CONDITION.NEW
];



export enum OFFER_TYPES {
    PUBLISHED = 'Published',
    UNDERREVIEW = 'Under Review',
    DRAFT = 'Draft',
    REJECTED = 'Rejected',
    HIDDEN= 'Hidden',
    CLONE = 'Clone'
}

export enum CREATE_OFFER_TYPE {
    ITEM = 'Item',
    SERVICE = 'Service',
    AUCTION = 'Auction'
}

export enum CREATE_OFFER_IMAGE_TYPE {
    COVER = 'Cover',
    FRONT = 'Front',
    BACK = 'Back',
    LEFT = 'Left',
    RIGHT = 'Right',
    MORE = 'More'
}

export enum CREATE_OFFER_TITLE {
    ITEM_TITLE = 'About your product',
    SERVICE_TITLE = 'About your service',
    AUCTION_TITLE = 'About Auction',
    HEADER_ITEM_TITLE = 'Basic product Info',
    HEADER_SERVICE_TITLE = 'Service Details',
    HEADER_AUCTION_TITLE = 'Auction Details',
    AUCTION_TITLE_HELP = 'Enter product details focusing on key features',
    ITEM_TITLE_HELP = 'Enter product details focusing on key features',
    SERVICE_TITLE_HELP = 'Enter service details focusing on key features',
}

export enum AllDesireTypes {
    OFFER_DESIRE_MONEY = 'Money',
    OFFER_DESIRE_EXCHANGE = 'Barter', // Exchange || Barter
    OFFER_DESIRE_FREE = 'Free'
};

export const OfferExchangeTypes = [
    AllDesireTypes.OFFER_DESIRE_MONEY,
    AllDesireTypes.OFFER_DESIRE_EXCHANGE,
    AllDesireTypes.OFFER_DESIRE_FREE
];

export enum OfferQuantityUnits {
    TYPE_PIECE = 'Piece',
    TYPE_BOX = 'Box',
    TYPE_PACK = 'Pack',
    TYPE_KG = 'Kg',
    TYPE_LITRE = 'Litre'
}

export const ItemOfferQuantityUnits = [
    OfferQuantityUnits.TYPE_PIECE,
    OfferQuantityUnits.TYPE_BOX,
    OfferQuantityUnits.TYPE_PACK,
    OfferQuantityUnits.TYPE_KG,
    OfferQuantityUnits.TYPE_LITRE
];

export enum OFFER_CONDITION_TYPE {
    EXCHANGE = 'Barter', // Exchange || Barter
    FREE = 'Free',
    MONEY = 'Money',
}

export const addressPlaceHolder = 'Select Offer Address';
