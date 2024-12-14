import { Offer } from "@gintaa/shared/models/offer";
export interface FavouriteState {
    loading: boolean;
    successMessage: string;
    errorMessage: string;
    myFavoriteOffers: Offer[];
    offerRemovedId: string;
}
