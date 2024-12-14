export const APP_CONSTANTS = {
    INVAILD_USER_INFO : 'Invalid User Info',
    IMAGE_EXT_WHITE_LIST: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'],
    VIDEO_EXT_WHITE_LIST: ['video/mp4', 'video/3gp', 'video/flv', 'video/avi', 'video/wma', 'video/mov', 'video/mpg', 'video/m4v'],
    DOCUMENT_EXT_WHITE_LIST: ['image/jpg', 'image/png', '.doc', '.docx', '.txt', '.pdf', '.odt'],
    MEDIA_LIMIT: 10,
    MEDIA_TYPE: ['video/*','image/*']
}

export const PAGE_SIZE: number = 10;

/* DEAL RELATED CONSTANTS */
export const DEAL_FILTER_TYPE_ALL = 'ALL';
export const DEAL_FILTER_TYPE_INCOMING = 'RECEIVED';
export const DEAL_FILTER_TYPE_SENT = 'SENT';
export const DEAL_FILTER_TYPE_UNKNOWN = 'UNKNOWN';

export const DEAL_STATUS_ALL = 'ALL';
export const DEAL_STATUS_INITIATED = 'INITIATED';
export const DEAL_STATUS_UPDATED = 'UPDATED';
export const DEAL_STATUS_UPDATE_REQUESTED = 'UPDATE_REQUESTED';
export const DEAL_STATUS_ACCEPTED = 'ACCEPTED';
export const DEAL_STATUS_PARTIAL_CLOSED = 'PARTIAL_CLOSED';
export const DEAL_STATUS_CLOSED = 'CLOSED';
export const DEAL_STATUS_REJECTED = 'REJECTED';
export const DEAL_STATUS_VIOLATED = 'VIOLATED';
export const DEAL_STATUS_P_CLOSED = 'PARTIAL_CLOSED';
export const DEAL_STATUS_REVISED = 'REVISED';
export const DEAL_STATUS_ABANDONED = 'ABANDONED';
export const DEAL_STATUS_REPORTED = 'REPORTED';

export const DEAL_SHOW_OFFER_SLIDER_FOR_MIN_OFFER_COUNT = 4;
export const DEAL_DEBUG_OFFER_SLIDER_COUNT = 6;
export const DEAL_DEBUG_OFFER_SLIDER_ITEM = {
  offerId: '1602779442775',
  offerItemCount: '0',
  offerType: 'Item',
  name: 'Debug Offer',
  description: 'This is a debug offer only for development',
  image: 'assets/images/no-image.svg',
  quantity: 1
};


export const DEBOUNCE_TIME: number = 700;

export const MATCH_BOX_FILTER_TYPE_EXISTING = 'EXISTING';
export const MATCH_BOX_FILTER_TYPE_POTENTIAL = 'POTENTIAL';

export const LOCATION_CITIES = [
  {"addressLine":"Mumbai, Maharashtra, India","lat":19.0759837,"lng":72.8776559,"city":"Mumbai","area":"Mumbai","state":"Maharashtra","country":"India"},
  {"addressLine":"Delhi, India","lat":28.6862738,"lng":77.2217831,"city":"Delhi","state":"Delhi","country":"India"},
  {"addressLine":"Bengaluru, Karnataka, India","lat":12.9715987,"lng":77.5945627,"city":"Bengaluru","area":"Bangalore Urban","state":"Karnataka","country":"India"},
  {"addressLine":"Hyderabad, Telangana, India","lat":17.385044,"lng":78.486671,"city":"Hyderabad","state":"Telangana","country":"India"},
  {"addressLine":"Ahmedabad, Gujarat, India","lat":23.022505,"lng":72.5713621,"city":"Ahmedabad","area":"Ahmedabad","state":"Gujarat","country":"India"},
  {"addressLine":"Chennai, Tamil Nadu, India","lat":13.0826802,"lng":80.2707184,"city":"Chennai","area":"Chennai","state":"Tamil Nadu","country":"India"},
  {"addressLine":"Kolkata, West Bengal, India","lat":22.572646,"lng":88.36389500000001,"city":"Kolkata","state":"West Bengal","country":"India"},
  {"addressLine":"Surat, Gujarat, India","lat":21.1702401,"lng":72.83106070000001,"city":"Surat","area":"Surat","state":"Gujarat","country":"India"}
];
export const PACKING_LIST = [
  {
      "id": "1",
      "boxSize": "30cm x 30cm",
      "logo": "assets/images/deal/six-box.svg"
  },
  {
      "id": "2",
      "boxSize": "60cm x 60cm",
      "logo": "assets/images/deal/six-box.svg"
  },
  {
      "id": "3",
      "boxSize": "180cm x 180cm",
      "logo": "assets/images/deal/six-box.svg"
  },
  {
      "id": "4",
      "boxSize": "custom",
      "logo": "assets/images/deal/custom-box.svg"
  }
];