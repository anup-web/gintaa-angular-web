import { OfferTypes } from "./my-offer.enum";

export const defaultConfigMyOffer = {
    defaultOfferType:OfferTypes.Published,
    page:1,
    offset:8,
    offerTypes: [OfferTypes.Published, OfferTypes.UnderReview, OfferTypes.Draft, OfferTypes.Rejected, OfferTypes.Hidden]
}