import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrls } from '@gintaa/config/api-urls.config';
import { LoggerService } from '@gintaa/core/services/logger.service';
import { environment } from '@gintaa/env';
import { } from '@gintaa/modules/my-favorites/models/favourite.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class FavouriteService {
    constructor(
        private http: HttpClient,
        private logger: LoggerService
    ) {}

    getAllFavouriteOffers(page: number = 0): Observable<any[]>{
        let query = '';
        if (page) {
            query += `?page=${page}&size=10`;
        }
        const url = `${environment.serverUrl}${configUrls.getAllFavouriteOffers}${query}`;
        return this.http.get<any[]>(url);
    }

    addOfferToFavourite(offerId: string) {
        const url = `${environment.serverUrl}${configUrls.addOfferToFavourite}${offerId}`;
        return this.http.post<any[]>(url, { offerId });
    }

    removeOfferFromFavourite(offerId: string) {
        const url = `${environment.serverUrl}${configUrls.removeOfferFromFavourite}${offerId}`;
        return this.http.delete<any[]>(url);
    }

    getFavouriteOfferCount(offerId: string) {
        const url = `${environment.serverUrl}${configUrls.getFavouriteOfferCount}${offerId}`;
        return this.http.get<any[]>(url);
    }
}
