import {Injectable} from '@angular/core';
import { Offer } from '@gintaa/modules/offer/model/offer';
import {
    EntityCollectionServiceBase, 
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';


@Injectable()
export class CreateOfferEntityService
    extends EntityCollectionServiceBase<any> {

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory) {
            super("offerMedias",  serviceElementsFactory);
    }

}

