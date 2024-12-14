import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configUrls } from '@gintaa/config/api-urls.config';
import { environment } from '@gintaa/env';
import { Offer } from '@gintaa/shared/models/offer';
import { Observable, throwError } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

//   getOfferDetailsBySeoId(seoId: string): Observable<any>{
//     let url: string = `${environment.serverUrl}${configUrls.getOfferBySeoId}`;
//     url = url.replace('{seoId}', seoId);
//     return this.http.get(url);
//   }

  getOfferMatchesById(offerId): Observable<any[]> {
    const reqUrl = `${environment.serverUrl}${configUrls.searchMatchOffer}?offerId=${offerId}&matchCountMax=9999`;
    return this.http.get(reqUrl)
        .pipe(
            map(res => {
                return res['payload'];
            }, err => {
                return throwError(err)
            }),
            shareReplay()
        );
  }

  getOfferById(offerId): Observable<any> {
    let url: string = `${environment.serverUrl}${configUrls.getOfferById}`;
    url = url.replace('{offerId}', offerId);
    return this.http.get(url)
        .pipe(
            map(res => {
                return res['payload'];
            }, err => {
                return throwError(err)
            })
        );
  }

getReportOfferCategories(): Observable<any[]> {
    const reqUrl = `${environment.serverUrl}${configUrls.getReportOfferCategories}`;
    return this.http.get(reqUrl)
    .pipe(
        map(res => {
            return res['payload'];
        }, err => {
            return throwError(err)
        })
    );
}

addReportOffer(requestBody:any): any {
    const reqUrl = `${environment.serverUrl}${configUrls.postReportOffer}`;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.post(reqUrl, requestBody, { headers, observe: 'response' })
}

getmatchData(): Observable<any[]> {
    const reqUrl = `${environment.serverUrl}${configUrls.searchMatchUser}`;
    return this.http.get(reqUrl)
    .pipe(
        map(res => {
            return res['payload'];
        }, err => {
            return throwError(err)
        })
    );
}

getSimilarOffersData(id: string): Observable<Offer[]> {
    const reqUrl = `${environment.serverUrl}${configUrls.getSimilarOffers}${id}`;
    const httpParams: HttpParams = new HttpParams()
    .set('show-completed-offers', 'false')
    .set('show-my-offers', 'false')
    return this.http.get(reqUrl, {
        params: httpParams
    })
    .pipe(
        map(res => {
            return res['payload'];
        }, err => {
            return throwError(err)
        }),
        shareReplay()
    );
}
  
}
