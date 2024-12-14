// import {Injectable} from '@angular/core';
// import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
// import { Offer } from '@gintaa/modules/offer/model/offer';
// import {Observable} from 'rxjs';
// import {first, map, mergeMap, tap} from 'rxjs/operators';
// import { OfferService } from './offer.service';


// @Injectable()
// export class OfferResolver implements Resolve<Offer> {

//     constructor(private offerService: OfferService) {

//     }

//     resolve(route: ActivatedRouteSnapshot,
//             state: RouterStateSnapshot): Observable<Offer> {
//         const offerId = route.params['oid'];
//         return this.offerService.getOfferDetail(offerId)
//             .pipe(
//                 map((offer: any) => {
//                   return offer.payload;
//                 })
//             );
//     }     
       
// }

