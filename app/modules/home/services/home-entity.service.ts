import {Injectable} from '@angular/core';
import {
    EntityCollectionServiceBase, 
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
//import { Offer } from '@gintaa/modules/offer/model/offer';


@Injectable()
export class HomeEntityService
    extends EntityCollectionServiceBase<any> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {
        super("AllOffers", serviceElementsFactory);
    }

}

