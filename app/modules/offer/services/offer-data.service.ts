import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { configUrls } from '@gintaa/config/api-urls.config';
import { environment } from '@gintaa/env';
import { Offer } from '@gintaa/shared/models/offer';
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class OfferDataService extends DefaultDataService<Offer> {

    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger, private route: ActivatedRoute) {
        super('Offers', http, httpUrlGenerator);
        logger.log('Created custom Offer EntityDataService')
    }

    getById(path: string): Observable<Offer> {  
        const url: string = `${environment.serverUrl}${path}`;
            //url = url.replace('{offerId}', id);      
        return this.http.get<Offer>(url)
            .pipe(
                map(res => res["payload"])
            );
    }

    getWithQuery(id: string): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.userOtherPostedOffers}`;
        url = url.replace('{offerId}', id);
        return this.http.get(url)
            .pipe(
                map(res => {
                    const {Item, Service} = res["payload"];
                    const itemOffers: Offer[] = Item || [];
                    const serviceOffers: Offer[] = Service || [];
                    return [...itemOffers, ...serviceOffers];                    
                })
            );
    }

    // getAll(): Observable<Offer[]> {
    //     let url: string = `${environment.serverUrl}${configUrls.userOtherPostedOffers}`;
    //     url = url.replace('{offerId}', id.correlationId);
    //     return this.http.get(url)
    //         .pipe(
    //             map(res => {
    //                 const data = res["payload"];
    //                 const itemOffers: Offer[] = data && data.Item ? data.Item : [];
    //                 const serviceOffers: Offer[] = data && data.Service ? data.Service : [];
    //                 return [...itemOffers, ...serviceOffers]
    //             })
    //         );
    // }



}
