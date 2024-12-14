export enum FAVOURITE_ACTION_TYPE {
    PAGE_LOADING = '[Favourite] Page Loading',
    PAGE_LOADED = '[Favourite] Page Loaded',

    // favourites
    ADD_REMOVE_OFFER_TO_FAVOURITE_SUCCESS = '[Favourite] Add or remove favourite success',
    ADD_REMOVE_OFFER_TO_FAVOURITE_FAILURE = '[Favourite] Add or remove favourite failure',
    GET_FAVOURITE_OFFER_COUNT = '[Favourite] Get favourite offer count',
    GET_FAVOURITE_OFFER_COUNT_SUCCESS = '[Favourite] Get favourite offer count success',
    GET_FAVOURITE_OFFER_COUNT_FAILURE = '[Favourite] Get favourite offer count failure',
    GET_ALL_FAVOURITE_OFFERS = '[Favourite] Get all favourite offers',
    GET_ALL_FAVOURITE_OFFERS_SUCCESS = '[Favourite] Get all favourite offers success',
    GET_ALL_FAVOURITE_OFFERS_EMPTY = '[Favourite] Get all favourite offers empty',
    GET_ALL_FAVOURITE_OFFERS_FAILURE = '[Favourite] Get all favourite offers failure',
    REMOVE_OFFER_FROM_FAVOURITE_BY_OFFER_ID = '[Favourite] Remove offer from favourite by offer ID',
}
