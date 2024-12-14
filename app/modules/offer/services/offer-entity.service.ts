import {Injectable} from '@angular/core';
import { Offer } from '@gintaa/shared/models/offer';
import {
    EntityCollectionServiceBase, 
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
@Injectable()
export class OfferEntityService
    extends EntityCollectionServiceBase<Offer> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {
                super("Offers",  serviceElementsFactory);
    }

}

