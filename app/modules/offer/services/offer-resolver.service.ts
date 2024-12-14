import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { configUrls } from '@gintaa/config/api-urls.config';
import { Offer } from '@gintaa/shared/models/offer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfferEntityService } from './offer-entity.service';
@Injectable()
export class OfferResolver implements Resolve<Offer> {

    constructor(
        private offerEntityService: OfferEntityService) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Offer> {
        const offerId: string = route.params['id'];
        const offerType: string = route.params['type'];
        // console.log('Offer Type662525235366363::::', offerType);
        this.offerEntityService.clearCache();
        const url: string = offerType === 'share' ? 
        `${configUrls.getOfferBySeoId.replace('{seoId}', offerId)}` : `${configUrls.getOfferById.replace('{offerId}', offerId)}`;
        return this.offerEntityService.getByKey(url); 
        // if(offerType === 'share'){
        //    const url: string = `${configUrls.getOfferBySeoId.replace('{seoId}', offerId)}`;
        //    return this.offerEntityService.getByKey(url)
        //        .pipe(
        //            mergeMap((offer: any)=> {
        //             const offerId = offer && offer.offerId || null;
        //             return this.offerEntityService.getWithQuery(offerId)
        //             .pipe(
        //                 map(offers => !!offers.length),
        //                 first()
        //             );
        //            })
        //        )
        // } else {
        //     const url: string = `${configUrls.getOfferById.replace('{offerId}', offerId)}`;
        //     return this.offerEntityService.getByKey(url).pipe(map(offer => !!offer));            
        // } 
    }
}
