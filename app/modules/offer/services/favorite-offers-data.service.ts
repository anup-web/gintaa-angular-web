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
export class FavoriteOffersDataService extends DefaultDataService<Offer> {

    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger, private route: ActivatedRoute) {
        super('FavoriteOffers', http, httpUrlGenerator);
        logger.log('Created custom Favorite Offers EntityDataService')
    }

    getAll(): Observable<Offer[]> {
        let url: string = `${environment.serverUrl}${configUrls.myFavoriteOffers}`;
        return this.http.get(url)
            .pipe(
                map(res => res["payload"])
            );
    }
}
